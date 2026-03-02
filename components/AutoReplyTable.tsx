
import React from 'react';
import { ReviewData } from '../types';

interface Props {
  reviews: ReviewData[];
}

const AutoReplyTable: React.FC<Props> = ({ reviews }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-8 border border-white/5">
      <div className="px-6 py-5 border-b border-white/5 bg-violet-500/5 flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          AI Generated Replies (Optional)
        </h3>
        <span className="text-[9px] font-mono font-bold uppercase text-violet-400 bg-violet-400/10 px-2 py-1 rounded">Model: Gemini-3-Flash</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Review</th>
              <th className="px-6 py-4">Sentiment</th>
              <th className="px-6 py-4">Auto Reply</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-violet-500/5 transition-colors">
                <td className="px-6 py-4 text-xs text-slate-400 italic max-w-xs truncate">"{rev.text}"</td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    rev.sentiment === 'Positive' ? 'text-emerald-400' :
                    rev.sentiment === 'Negative' ? 'text-rose-400' : 'text-sky-400'
                  }`}>
                    {rev.sentiment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/5 relative group">
                    <p className="text-xs font-medium text-slate-200 leading-relaxed pr-8">{rev.autoReply}</p>
                    <button className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold text-violet-400 uppercase hover:text-white">Copy</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutoReplyTable;
