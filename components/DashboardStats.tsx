
import React from 'react';
import { AnalysisSummary } from '../types';

interface StatsProps {
  data: AnalysisSummary;
}

const DashboardStats: React.FC<StatsProps> = ({ data }) => {
  const total = data.reviews.length || 1;
  const positive = data.reviews.filter(r => r.sentiment === 'Positive').length;
  const negative = data.reviews.filter(r => r.sentiment === 'Negative').length;
  const neutral = data.reviews.filter(r => r.sentiment === 'Neutral').length;

  const stats = [
    { 
      label: 'Signal Intake', 
      value: data.reviews.length, 
      sub: 'Total Vectors Ingested',
      color: 'text-cyan-400', 
      border: 'border-cyan-500/20' 
    },
    { 
      label: 'Optimized Resonance', 
      value: `${((positive / total) * 100).toFixed(0)}%`, 
      sub: 'Positive Polarity',
      color: 'text-emerald-400', 
      border: 'border-emerald-500/20' 
    },
    { 
      label: 'Balanced Signal', 
      value: `${((neutral / total) * 100).toFixed(0)}%`, 
      sub: 'Neutral Equilibrium',
      color: 'text-sky-400', 
      border: 'border-sky-500/20' 
    },
    { 
      label: 'Critical Friction', 
      value: `${((negative / total) * 100).toFixed(0)}%`, 
      sub: 'Negative Entropy',
      color: 'text-rose-400', 
      border: 'border-rose-500/20' 
    },
    { 
      label: 'Sentira Index (SX)', 
      value: data.overallScore, 
      sub: 'Neural Satisfaction score',
      color: 'text-violet-400', 
      border: 'border-violet-500/20',
      span: 'md:col-span-4 mt-2'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className={`glass-card p-6 rounded-2xl border ${stat.border} transition-all duration-300 hover:scale-[1.01] ${stat.span || ''}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-3">{stat.label}</p>
          <div className="flex items-baseline gap-3">
            <p className={`text-4xl font-bold font-mono tracking-tighter ${stat.color} glow-cyan`}>{stat.value}</p>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{stat.sub}</span>
          </div>
          <div className="w-full bg-slate-800/50 h-1.5 mt-5 rounded-full overflow-hidden">
             <div 
               className={`h-full transition-all duration-1000 ${stat.color.replace('text', 'bg')}`}
               style={{ width: typeof stat.value === 'string' && stat.value.includes('%') ? stat.value : '100%' }}
             />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
