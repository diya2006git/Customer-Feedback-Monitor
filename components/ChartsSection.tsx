
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AnalysisSummary } from '../types';

interface ChartsProps {
  data: AnalysisSummary;
}

const COLORS = {
  Positive: '#10b981', // Emerald
  Negative: '#f43f5e', // Rose
  Neutral: '#38bdf8'   // Sky Blue (Distinct Neutral)
};

const ChartsSection: React.FC<ChartsProps> = ({ data }) => {
  // Ensure we have entries for all three categories even if count is 0
  const counts = data.reviews.reduce((acc: any, curr) => {
    acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
    return acc;
  }, { Positive: 0, Negative: 0, Neutral: 0 });

  const chartData = [
    { name: 'Positive', value: counts.Positive },
    { name: 'Neutral', value: counts.Neutral },
    { name: 'Negative', value: counts.Negative },
  ];

  const pieData = chartData.map(d => ({ ...d, color: COLORS[d.name as keyof typeof COLORS] }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950 border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{payload[0].name}</p>
          <p className="text-xl font-mono text-white">{payload[0].value} <span className="text-xs text-slate-500 italic">SIGS</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="glass-card p-6 rounded-2xl h-[380px] border border-white/5 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Temporal Sentiment Flux</h3>
          <div className="flex gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse [animation-delay:0.2s]"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse [animation-delay:0.4s]"></div>
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#475569', fontSize: 10}}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)'}} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[9px] text-slate-500 mt-4 text-center uppercase tracking-widest opacity-60">Distribution of linguistic vectors across the polarity spectrum</p>
      </div>

      <div className="glass-card p-6 rounded-2xl h-[380px] border border-white/5 flex flex-col">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-8">Neural Segment Variance</h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={10}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 12px ${entry.color}33)` }} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={40} 
                formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{value}</span>}
                iconType="circle"
                iconSize={6}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[9px] text-slate-500 mt-4 text-center uppercase tracking-widest opacity-60">Neural density composition by emotional resonance segment</p>
      </div>
    </div>
  );
};

export default ChartsSection;
