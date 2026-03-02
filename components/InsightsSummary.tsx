
import React from 'react';
import { InsightData } from '../types';

interface InsightsProps {
  insights: InsightData;
}

const InsightsSummary: React.FC<InsightsProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="glass-card p-6 rounded-2xl border-emerald-500/10 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Growth Catalysts</h3>
            <p className="text-[10px] text-slate-500 font-mono">Neural Confidence: High</p>
          </div>
        </div>
        <ul className="space-y-4">
          {insights.praises.map((praise, i) => (
            <li key={i} className="flex items-start gap-4 text-slate-300 group/item">
              <span className="text-emerald-500/50 font-mono text-xs pt-1">0{i+1}</span>
              <span className="text-sm leading-relaxed font-medium group-hover/item:text-emerald-300 transition-colors">{praise}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-card p-6 rounded-2xl border-rose-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Entropy Alerts</h3>
            <p className="text-[10px] text-slate-500 font-mono">System Friction Detected</p>
          </div>
        </div>
        <ul className="space-y-4">
          {insights.complaints.map((complaint, i) => (
            <li key={i} className="flex items-start gap-4 text-slate-300 group/item">
              <span className="text-rose-500/50 font-mono text-xs pt-1">!{i+1}</span>
              <span className="text-sm leading-relaxed font-medium group-hover/item:text-rose-300 transition-colors">{complaint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightsSummary;
