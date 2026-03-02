
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ReviewData } from '../types';

interface Props {
  reviews: ReviewData[];
}

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981', '#06b6d4', '#3b82f6'];

const LanguageChart: React.FC<Props> = ({ reviews }) => {
  const langCounts = reviews.reduce((acc: any, curr) => {
    const lang = curr.language.toUpperCase();
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(langCounts).map(name => ({
    name,
    value: langCounts[name]
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="glass-card p-8 rounded-3xl border border-white/5 h-[400px] flex flex-col">
      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">Linguistic Distribution</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#f8fafc', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
            />
            <Legend 
               formatter={(value) => <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;
