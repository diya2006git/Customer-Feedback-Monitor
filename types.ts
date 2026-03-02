
export type SentimentType = 'Positive' | 'Negative' | 'Neutral';
export type EmotionType = 'Happy' | 'Angry' | 'Sad' | 'Neutral' | 'Excited' | 'Frustrated';
export type IntentType = 'Complaint' | 'Praise' | 'Inquiry' | 'Suggestion' | 'Feedback';
export type SeverityType = 'High' | 'Medium' | 'Low';

export interface AspectData {
  aspect: string;
  sentiment: SentimentType;
  confidence: number;
}

export interface ReviewData {
  id: string;
  text: string;
  sentiment: SentimentType;
  sentimentScore: number; 
  confidence: number;
  timestamp: string;
  language: string;
  emotion: EmotionType;
  intent: IntentType;
  isToxic: boolean;
  toxicityScore: number;
  aspects: AspectData[];
  autoReply: string;
  severity: SeverityType;
  recommendedAction: string;
}

export interface InsightData {
  praises: string[];
  complaints: string[];
  commonWords: { word: string; count: number }[];
  recommendations: string[];
  narrativeSummary: string;
}

export interface TrendDelta {
  label: string;
  value: string;
  isPositive: boolean;
}

export interface AnalysisSummary {
  reviews: ReviewData[];
  insights: InsightData;
  overallScore: number;
  trends?: {
    positive: TrendDelta;
    negative: TrendDelta;
    neutral: TrendDelta;
  };
}
