
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AnalysisSummary } from '../types';

interface TrendChartProps {
  data: AnalysisSummary;
}

const COLORS = {
  Positive: '#10b981',
  Negative: '#f43f5e',
  Neutral: '#38bdf8'
};

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  // Sort reviews by timestamp to ensure chronological plotting
  const sortedReviews = [...data.reviews].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Group by timestamp (for this demo, we'll treat each unique timestamp or sequential index as a point)
  // In a real app, you'd bucket these by hour/day.
  const chartData = sortedReviews.map((rev, index) => {
    const time = new Date(rev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // We create a "moving count" or state for the trend visualization
    return {
      time: `T-${(sortedReviews.length - index).toString().padStart(2, '0')}`,
      fullTime: time,
      score: rev.sentimentScore,
      Positive: rev.sentiment === 'Positive' ? rev.sentimentScore : null,
      Negative: rev.sentiment === 'Negative' ? rev.sentimentScore : null,
      Neutral: rev.sentiment === 'Neutral' ? rev.sentimentScore : null,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Temporal Node: {payload[0].payload.fullTime}</p>
          {payload.map((entry: any, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-sm font-mono text-white">
                {entry.name}: <span style={{ color: entry.color }}>{entry.value.toFixed(3)}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-white/5 mb-8 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300">Neural Sentiment Velocity</h3>
          <p className="text-[9px] text-slate-600 font-mono mt-1 uppercase tracking-widest">Real-time polarity fluctuation matrix</p>
        </div>
        <div className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded text-[9px] font-mono text-violet-400">
          MODE: CHRONO_FLUX
        </div>
      </div>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#475569', fontSize: 9, fontWeight: 'bold'}} 
              dy={10}
            />
            <YAxis 
              domain={[-1, 1]}
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#475569', fontSize: 9}}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              align="right"
              height={36}
              iconType="circle"
              iconSize={6}
              formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">{value}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="Positive" 
              stroke={COLORS.Positive} 
              strokeWidth={3} 
              dot={{ r: 3, fill: COLORS.Positive, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0, shadow: '0 0 10px rgba(16,185,129,0.5)' }}
              connectNulls
              style={{ filter: `drop-shadow(0 0 8px ${COLORS.Positive}44)` }}
            />
            <Line 
              type="monotone" 
              dataKey="Neutral" 
              stroke={COLORS.Neutral} 
              strokeWidth={3} 
              dot={{ r: 3, fill: COLORS.Neutral, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              connectNulls
              style={{ filter: `drop-shadow(0 0 8px ${COLORS.Neutral}44)` }}
            />
            <Line 
              type="monotone" 
              dataKey="Negative" 
              stroke={COLORS.Negative} 
              strokeWidth={3} 
              dot={{ r: 3, fill: COLORS.Negative, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              connectNulls
              style={{ filter: `drop-shadow(0 0 8px ${COLORS.Negative}44)` }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
