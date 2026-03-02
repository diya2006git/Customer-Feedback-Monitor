
import React, { useState, useEffect } from 'react';
import { analyzeSentiment } from './services/geminiService';
import { AnalysisSummary, ReviewData } from './types';
import DashboardStats from './components/DashboardStats';
import ChartsSection from './components/ChartsSection';
import TrendChart from './components/TrendChart';
import ReviewTable from './components/ReviewTable';
import InsightsSummary from './components/InsightsSummary';
import WordCloud from './components/WordCloud';
import LanguageChart from './components/LanguageChart';
import TrendComparison from './components/TrendComparison';
import AutoReplyTable from './components/AutoReplyTable';

const SAMPLE_DATA = [
  "The camera quality is stunning but the battery life is very poor.",
  "Great service at the store today, very helpful staff!",
  "Delivery was delayed by 4 days, extremely frustrated.",
  "ഈ ഉൽപ്പന്നം അത്ഭുതകരമാണ്!",
  "Can you tell me more about the refund policy?",
  "Please add more color options for the phone case.",
  "Worst experience ever, I will never buy from you again!",
  "The user interface is very slick and modern, love it."
];

type Tab = 'Home' | 'AI Insights' | 'Multilingual' | 'Reports' | 'Deep Analytics' | 'Customer Care';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<AnalysisSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // NEW THEME STATE (ADD-ONLY)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Apply class to body based on theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  const startAnalysis = async (customData?: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const target = customData || input.split('\n').filter(l => l.trim());
      if (target.length === 0) throw new Error("Initialize buffer with signals first.");
      const res = await analyzeSentiment(target);
      setData(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const navItems: Tab[] = ['Home', 'AI Insights', 'Multilingual', 'Reports', 'Deep Analytics', 'Customer Care'];

  const getEmotionEmoji = (emo: string) => {
    switch (emo) {
      case 'Happy': return '😊';
      case 'Angry': return '😡';
      case 'Sad': return '😞';
      case 'Excited': return '🤩';
      case 'Frustrated': return '😤';
      default: return '😐';
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 glass-card border-b border-white/5 px-6 py-4 flex justify-between items-center mb-8 backdrop-blur-3xl">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
             <span className="font-syne font-black text-white text-sm">S</span>
           </div>
           <span className="hidden md:block text-xs font-syne font-black text-white tracking-widest uppercase">Sentira Core</span>
        </div>
        
        <div className="flex gap-1 overflow-x-auto no-scrollbar md:gap-4">
          {navItems.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full transition-all ${
                activeTab === tab 
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab === 'Home' ? 'Dashboard' : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* THEME TOGGLE BUTTON (ADD-ONLY) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-cyan-500/30 transition-all bg-white/5"
            title="Toggle Appearance"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {isDarkMode ? '🌙 Dark' : '☀️ Light'}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Neural Link: Stable</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        
        {activeTab === 'Home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.5)]">
                       <span className="font-syne font-black text-white text-lg">S</span>
                     </div>
                     <h1 className="text-3xl font-syne font-extrabold text-white tracking-wider uppercase">
                       Sentira <span className="text-cyan-400">Core</span>
                     </h1>
                  </div>
                  <p className="text-slate-400 text-[11px] font-bold tracking-[0.4em] uppercase opacity-80 max-w-md">
                    Decipher the hidden emotional landscape of your user base with neural precision.
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => startAnalysis(SAMPLE_DATA)}
                    className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase text-slate-400 border border-white/10 rounded-full hover:bg-white/5 hover:text-white transition-all"
                  >
                    Load Sample Stream
                  </button>
                  <label className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 cursor-pointer transition-all">
                    Ingest Signal Archive
                    <input type="file" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const r = new FileReader();
                      r.onload = (ev) => setInput(ev.target?.result as string);
                      r.readAsText(file);
                    }} />
                  </label>
                </div>
              </header>

              {!data && !loading && (
                <div className="max-w-3xl mx-auto mt-12 glass-card p-10 rounded-[2.5rem] border border-white/10">
                  <textarea
                    className="w-full h-56 bg-slate-950/40 p-8 rounded-3xl border border-white/5 focus:border-cyan-500/30 outline-none text-slate-200 font-mono text-sm mb-4 resize-none leading-relaxed"
                    placeholder="Transmit feedback data streams..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button onClick={() => startAnalysis()} className="w-full py-5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-[2rem] font-syne font-black text-sm uppercase tracking-[0.5em] transition-all">
                    Run Full AI Analysis
                  </button>
                  {error && <p className="text-rose-400 mt-8 text-[11px] font-bold uppercase tracking-widest text-center">{error}</p>}
                </div>
              )}

              {data && !loading && (
                <>
                  <div className="flex justify-end mb-6">
                    <button 
                      onClick={() => setData(null)}
                      className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 bg-white/5 border border-white/10 rounded-lg hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                      Back to Input
                    </button>
                  </div>
                  <DashboardStats data={data} />
                  <ChartsSection data={data} />
                  <TrendChart data={data} />
                  
                  {/* FEATURE 5: TREND COMPARISON (ADD-ONLY) */}
                  <TrendComparison data={data} />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 space-y-8">
                       <InsightsSummary insights={data.insights} />
                       <ReviewTable reviews={data.reviews} />
                       
                       {/* FEATURE 4: AUTO REPLY GENERATOR (ADD-ONLY) */}
                       <AutoReplyTable reviews={data.reviews} />
                    </div>
                    <div className="lg:col-span-1">
                       <WordCloud words={data.insights.commonWords} />
                    </div>
                  </div>
                </>
              )}
          </div>
        )}

        {/* --- DEEP ANALYTICS --- */}
        {activeTab === 'Deep Analytics' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            {!data ? (
               <div className="py-40 text-center text-slate-500 uppercase tracking-[0.3em] text-[10px] font-bold">Awaiting neural data ingest...</div>
            ) : (
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-card p-8 rounded-3xl border-violet-500/20">
                       <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-8 text-center">Emotion Matrix</h3>
                       <div className="flex flex-wrap justify-center gap-4">
                          {['Happy', 'Angry', 'Sad', 'Neutral', 'Excited', 'Frustrated'].map(emo => {
                             const count = data.reviews.filter(r => r.emotion === emo).length;
                             return (
                               <div key={emo} className="bg-white/5 p-4 rounded-2xl flex flex-col items-center min-w-[100px] border border-white/5">
                                  <span className="text-2xl mb-2">{getEmotionEmoji(emo)}</span>
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{emo}</span>
                                  <span className="text-xl font-mono text-white mt-1">{count}</span>
                               </div>
                             );
                          })}
                       </div>
                    </div>

                    <div className="glass-card p-8 rounded-3xl border-cyan-500/20">
                       <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 mb-8 text-center">Intent Distribution</h3>
                       <div className="grid grid-cols-2 gap-4">
                          {['Complaint', 'Praise', 'Inquiry', 'Suggestion', 'Feedback'].map(intent => {
                             const count = data.reviews.filter(r => r.intent === intent).length;
                             return (
                               <div key={intent} className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group">
                                  <div className="flex justify-between items-center mb-2">
                                     <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">{intent}</span>
                                     <span className="text-[10px] font-mono text-cyan-400">{count}</span>
                                  </div>
                                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-cyan-500" style={{ width: `${(count / data.reviews.length) * 100}%` }}></div>
                                  </div>
                               </div>
                             );
                          })}
                       </div>
                    </div>
                 </div>

                 <div className="glass-card p-8 rounded-3xl border border-white/10">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-8">Aspect-Based Sentiment Map (ABSA)</h3>
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-white/5">
                             <tr>
                                <th className="pb-4 px-4">Review Segment</th>
                                <th className="pb-4 px-4">Identified Aspects</th>
                                <th className="pb-4 px-4">Emotion</th>
                                <th className="pb-4 px-4 text-right">Confidence</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             {data.reviews.map(rev => (
                               <tr key={rev.id} className="hover:bg-white/5 transition-colors group">
                                  <td className="py-6 px-4 max-w-sm">
                                     <p className="text-xs text-slate-300 italic opacity-80 leading-relaxed truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">"{rev.text}"</p>
                                  </td>
                                  <td className="py-6 px-4">
                                     <div className="flex flex-wrap gap-2">
                                        {rev.aspects.map((asp, i) => (
                                          <span key={i} className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                                            asp.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                            asp.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                                            'bg-sky-500/10 text-sky-400 border-sky-500/20'
                                          }`}>
                                            {asp.aspect}
                                          </span>
                                        ))}
                                     </div>
                                  </td>
                                  <td className="py-6 px-4">
                                     <div className="flex items-center gap-2">
                                        <span className="text-base">{getEmotionEmoji(rev.emotion)}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{rev.emotion}</span>
                                     </div>
                                  </td>
                                  <td className="py-6 px-4 text-right font-mono text-[10px] text-slate-600">
                                     {(rev.confidence * 100).toFixed(1)}%
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* --- CUSTOMER CARE --- */}
        {activeTab === 'Customer Care' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            {!data ? (
               <div className="py-40 text-center text-slate-500 uppercase tracking-[0.3em] text-[10px] font-bold">System offline. Data ingestion required.</div>
            ) : (
              <div className="space-y-8">
                 <div className="glass-card p-8 rounded-3xl border-rose-500/20 bg-rose-500/5">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400 mb-6 flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 16c-.77 1.333.192 3 1.732 3z" /></svg>
                       Toxicity Guard: Abusive Signal Detection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {data.reviews.filter(r => r.isToxic).length === 0 ? (
                         <div className="col-span-2 py-8 text-center text-[10px] font-bold uppercase text-slate-600 tracking-widest">Zero toxic signals detected in the current stream.</div>
                       ) : (
                         data.reviews.filter(r => r.isToxic).map(rev => (
                           <div key={rev.id} className="bg-slate-900/60 p-5 rounded-2xl border border-rose-500/30 flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 animate-pulse text-lg">⚠️</div>
                              <div className="flex-1">
                                 <p className="text-xs text-rose-100 font-medium mb-2 italic">"{rev.text}"</p>
                                 <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                    <span>Toxicity: {(rev.toxicityScore * 100).toFixed(0)}%</span>
                                    <span className="text-rose-400 underline cursor-pointer hover:text-white transition-colors">Action: Soft Mod Response</span>
                                 </div>
                              </div>
                           </div>
                         ))
                       )}
                    </div>
                 </div>

                 <div className="glass-card p-8 rounded-3xl border border-white/10">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-8">AI Response Engine: Professional Auto-Replies</h3>
                    <div className="space-y-4">
                       {data.reviews.map(rev => (
                         <div key={rev.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-cyan-500/30 transition-all flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-1/3">
                               <div className="flex items-center gap-3 mb-2">
                                  <span className={`text-[8px] font-black px-2 py-0.5 rounded tracking-widest ${
                                    rev.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                    rev.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                                  }`}>{rev.sentiment}</span>
                                  {rev.isToxic && <span className="text-rose-500 text-xs">⚠️</span>}
                               </div>
                               <p className="text-xs text-slate-400 italic">"{rev.text}"</p>
                            </div>
                            <div className="flex-1 bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/10 relative">
                               <span className="absolute -top-2 left-4 px-2 py-0.5 bg-cyan-500 text-slate-950 font-black text-[7px] uppercase tracking-widest rounded shadow-lg">Neural Draft</span>
                               <p className="text-xs font-semibold text-cyan-500/90 leading-relaxed mb-4">
                                  {rev.autoReply}
                               </p>
                               <div className="flex justify-end gap-4">
                                  <button className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Copy</button>
                                  <button className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Send</button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'AI Insights' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             {!data ? (
               <div className="py-40 text-center text-slate-500 uppercase tracking-widest text-[10px]">No signal data detected. Run analysis on Dashboard.</div>
             ) : (
               <div className="space-y-8">
                  <div className="glass-card p-8 rounded-3xl border-violet-500/20">
                     <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-6">Neural Narrative Summary</h3>
                     <p className="text-lg leading-relaxed text-slate-200 font-medium italic opacity-90">
                       "{data.insights.narrativeSummary || "Processing detailed summary..."}"
                     </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <InsightsSummary insights={data.insights} />
                  </div>
                  <div className="glass-card p-8 rounded-3xl border-emerald-500/20">
                     <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-8">System Optimization Protocol</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.insights.recommendations?.map((rec, i) => (
                           <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                              <span className="text-emerald-500/50 font-mono text-[10px] mb-4 block tracking-tighter">0{i+1}. ACTION_VECTOR</span>
                              <p className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors leading-relaxed">{rec}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
             )}
          </div>
        )}

        {activeTab === 'Multilingual' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             {!data ? (
               <div className="py-40 text-center text-slate-500 uppercase tracking-widest text-[10px]">Linguistic buffer empty.</div>
             ) : (
               <div className="space-y-8">
                  <LanguageChart reviews={data.reviews} />
                  <ReviewTable reviews={data.reviews} />
               </div>
             )}
          </div>
        )}

        {activeTab === 'Reports' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             {!data ? (
               <div className="py-40 text-center text-slate-500 uppercase tracking-widest text-[10px]">No reports available for export.</div>
             ) : (
               <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-syne font-black text-white uppercase tracking-widest">Report Archive</h2>
                  </div>
                  <div className="glass-card p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 text-[10px] font-mono text-slate-700">SIG_ARC_v6.0</div>
                     <div className="mb-12 pb-12 border-b border-white/5">
                        <div className="flex justify-between items-baseline mb-6">
                           <h3 className="text-3xl font-syne font-black text-white uppercase italic">Sentira Synthesis Report</h3>
                           <span className="font-mono text-slate-500 text-xs">{new Date().toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                          Comprehensive analysis across {new Set(data.reviews.map(r => r.language)).size} detected language vectors. 
                          Satisfaction index calculated at {data.overallScore}% with high confidence resonance.
                        </p>
                     </div>
                     <div className="grid grid-cols-3 gap-12 mb-12">
                        <div>
                           <div className="text-[10px] font-bold text-slate-600 uppercase mb-2">Total Signals</div>
                           <div className="text-4xl font-mono text-white">{data.reviews.length}</div>
                        </div>
                        <div>
                           <div className="text-[10px] font-bold text-slate-600 uppercase mb-2">Confidence Avg</div>
                           <div className="text-4xl font-mono text-violet-400">96.4</div>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center">
             <div className="w-16 h-16 rounded-full border-t-2 border-cyan-500 animate-spin mb-6"></div>
             <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-cyan-400 animate-pulse">Synchronizing Advanced Matrices...</p>
          </div>
        )}
      </div>

      <footer className="max-w-7xl mx-auto px-12 py-16 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-600">
         <span className="uppercase tracking-widest">Sentira Core v3.6.0</span>
         <span className="uppercase tracking-[0.3em]">Neural Persistence: Linked</span>
      </footer>
    </div>
  );
};

export default App;
