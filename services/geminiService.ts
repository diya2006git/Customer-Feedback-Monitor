
import { GoogleGenAI, Type } from "@google/genai";
import { ReviewData, AnalysisSummary, SentimentType, EmotionType, IntentType, SeverityType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const classifyByScore = (score: number): SentimentType => {
  if (score > 0.3) return 'Positive';
  if (score < -0.3) return 'Negative';
  return 'Neutral';
};

export const analyzeSentiment = async (reviews: string[]): Promise<AnalysisSummary> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Perform a Comprehensive Neural Analysis for Customer Feedback. 
    
    For each review entry, extract:
    1. Language Code (EN, TA, HI, etc.).
    2. Sentiment Score (-1 to 1).
    3. Emotion: Choose from [Happy, Angry, Sad, Neutral, Excited, Frustrated].
    4. Intent: Choose from [Complaint, Praise, Inquiry, Suggestion, Feedback].
    5. Toxicity: Identify abusive/hate speech (isToxic: boolean) and toxicityScore (0-1).
    6. Aspect-Based Sentiment Analysis (ABSA): Extract specific aspects (Camera, Service, Price, etc.) and their sentiment.
    7. Auto-Reply: Generate a 1-sentence professional response. Apologetic for negatives, appreciative for positives.
    8. Severity: If review is strongly negative/critical set to "High". If moderately negative set to "Medium". Otherwise "Low".
    9. Recommended Action: A short specific action (e.g., "Contact customer", "Escalate to support", "None").

    Aggregate Insights:
    10. Top 5 praises and 5 complaints.
    11. Satisfaction index (0-100).
    12. Keywords and recommendations.
    13. Executive summary.

    Reviews:
    ${reviews.map((r, i) => `${i + 1}. ${r}`).join('\n')}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reviews: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                sentimentScore: { type: Type.NUMBER },
                confidence: { type: Type.NUMBER },
                language: { type: Type.STRING },
                emotion: { type: Type.STRING },
                intent: { type: Type.STRING },
                isToxic: { type: Type.BOOLEAN },
                toxicityScore: { type: Type.NUMBER },
                autoReply: { type: Type.STRING },
                severity: { type: Type.STRING },
                recommendedAction: { type: Type.STRING },
                aspects: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      aspect: { type: Type.STRING },
                      sentiment: { type: Type.STRING },
                      confidence: { type: Type.NUMBER }
                    }
                  }
                }
              },
              required: ["text", "sentimentScore", "confidence", "language", "emotion", "intent", "isToxic", "toxicityScore", "autoReply", "severity", "recommendedAction", "aspects"]
            }
          },
          insights: {
            type: Type.OBJECT,
            properties: {
              praises: { type: Type.ARRAY, items: { type: Type.STRING } },
              complaints: { type: Type.ARRAY, items: { type: Type.STRING } },
              commonWords: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { word: { type: Type.STRING }, count: { type: Type.NUMBER } }
                }
              },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              narrativeSummary: { type: Type.STRING }
            }
          },
          overallScore: { type: Type.NUMBER }
        },
        required: ["reviews", "insights", "overallScore"]
      }
    }
  });

  const rawData = JSON.parse(response.text || '{}');
  const now = Date.now();
  
  const formattedReviews: ReviewData[] = rawData.reviews.map((r: any, idx: number) => ({
    id: `rev-${idx}-${now}`,
    text: r.text,
    sentiment: classifyByScore(r.sentimentScore),
    sentimentScore: r.sentimentScore,
    confidence: r.confidence,
    language: r.language || '??',
    emotion: r.emotion as EmotionType,
    intent: r.intent as IntentType,
    isToxic: r.isToxic,
    toxicityScore: r.toxicityScore,
    aspects: r.aspects,
    autoReply: r.autoReply,
    severity: (r.severity as SeverityType) || 'Low',
    recommendedAction: r.recommendedAction || 'None',
    timestamp: new Date(now - (rawData.reviews.length - idx) * 60000).toISOString()
  }));

  const total = formattedReviews.length || 1;
  const posPct = (formattedReviews.filter(r => r.sentiment === 'Positive').length / total) * 100;
  const negPct = (formattedReviews.filter(r => r.sentiment === 'Negative').length / total) * 100;
  const neuPct = (formattedReviews.filter(r => r.sentiment === 'Neutral').length / total) * 100;

  const baselinePos = 60;
  const baselineNeg = 15;
  const baselineNeu = 25;

  return {
    reviews: formattedReviews,
    insights: rawData.insights,
    overallScore: rawData.overallScore,
    trends: {
      positive: { label: 'Positive', value: `${(posPct - baselinePos).toFixed(1)}%`, isPositive: posPct >= baselinePos },
      negative: { label: 'Negative', value: `${(negPct - baselineNeg).toFixed(1)}%`, isPositive: negPct <= baselineNeg },
      neutral: { label: 'Neutral', value: `${(neuPct - baselineNeu).toFixed(1)}%`, isPositive: true }
    }
  };
};
