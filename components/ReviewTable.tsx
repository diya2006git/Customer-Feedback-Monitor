
import React, { useState } from 'react';
import { ReviewData } from '../types';

interface TableProps {
  reviews: ReviewData[];
}

const ReviewTable: React.FC<TableProps> = ({ reviews }) => {
  const [filter, setFilter] = useState<string>('ALL');
  
  const uniqueLanguages = ['ALL', ...new Set(reviews.map(r => r.language.toUpperCase()))];
  const filteredReviews = filter === 'ALL' ? reviews : reviews.filter(r => r.language.toUpperCase() === filter);

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-8 border border-white/5">
      <div className="px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row justify-between sm:items-center bg-white/5 gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Processed Signals</h3>
          <div className="flex flex-wrap gap-1.5">
            {uniqueLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`text-[8px] px-1.5 py-0.5 rounded font-bold tracking-tighter border transition-all ${
                  filter === lang 
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                  : 'text-slate-600 border-transparent hover:border-white/10'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        <span className="self-start sm:self-center text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded font-mono border border-indigo-500/30">
          VECTOR_LOG: {filteredReviews.length.toString().padStart(3, '0')}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">LID</th>
              <th className="px-6 py-4">Vector Data</th>
              <th className="px-6 py-4">Polarity</th>
              <th className="px-6 py-4 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredReviews.map((review) => (
              <tr key={review.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-800/50 px-1.5 py-0.5 rounded border border-white/5 group-hover:text-cyan-400 transition-colors">
                      {review.language.toUpperCase()}
                    </span>
                    {review.language === '??' && (
                       <span title="Inferred" className="w-1 h-1 rounded-full bg-amber-500 animate-pulse"></span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-md">
                   <p className="truncate text-slate-400 group-hover:text-slate-100 transition-colors font-medium">
                     {review.text}
                   </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                    review.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    review.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    review.sentiment === 'Neutral' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                    'bg-slate-500/10 text-slate-400 border border-slate-500/10'
                  }`}>
                    {review.sentiment}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-[10px] text-slate-500">
                  <span className="text-slate-600 opacity-50">C=</span>{(review.confidence).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredReviews.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-600">No vectors detected for this LID sequence</p>
        </div>
      )}
    </div>
  );
};

export default ReviewTable;
