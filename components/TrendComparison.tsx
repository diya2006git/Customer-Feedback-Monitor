
import React from 'react';
import { AnalysisSummary } from '../types';

interface Props {
  data: AnalysisSummary;
}

const TrendComparison: React.FC<Props> = ({ data }) => {
  if (!data.trends) return null;

  const items = [
    { ...data.trends.positive, icon: '📈' },
    { ...data.trends.negative, icon: '📉' },
    { ...data.trends.neutral, icon: '📊' },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/5 mb-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Sentiment Trend Comparison (Before vs After)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-mono font-bold ${item.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.value.startsWith('-') ? '' : '+'}{item.value}
                </span>
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">vs Baseline</span>
              </div>
            </div>
            <span className="text-2xl opacity-40">{item.icon}</span>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-slate-600 mt-4 uppercase tracking-[0.2em] italic text-center">
        * Comparison mapped against historical 24h neural intake baseline.
      </p>
    </div>
  );
};

export default TrendComparison;
