
import React from 'react';
import { ReviewData } from '../types';

interface Props {
  reviews: ReviewData[];
}

const PriorityTickets: React.FC<Props> = ({ reviews }) => {
  // Only show tickets for negative feedback or medium/high severity
  const tickets = reviews.filter(r => r.severity !== 'Low' || r.sentiment === 'Negative');

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-8 border border-white/5">
      <div className="px-6 py-5 border-b border-white/5 bg-rose-500/5 flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Priority Tickets (Optional)
        </h3>
        <span className="text-[9px] font-mono font-bold uppercase text-rose-400 bg-rose-400/10 px-2 py-1 rounded">Protocol: Support_Escalation</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Review</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tickets.length > 0 ? tickets.map((rev) => (
              <tr key={rev.id} className="hover:bg-rose-500/5 transition-colors">
                <td className="px-6 py-4 text-xs text-slate-400 italic max-w-sm truncate">"{rev.text}"</td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded border ${
                    rev.severity === 'High' ? 'bg-rose-600/20 text-rose-400 border-rose-500/30' :
                    rev.severity === 'Medium' ? 'bg-amber-600/20 text-amber-400 border-amber-500/30' : 
                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {rev.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-200">{rev.recommendedAction}</span>
                    <button className="text-[9px] font-bold text-rose-400 uppercase hover:text-white underline underline-offset-4">Create Ticket</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-[10px] font-mono uppercase tracking-widest text-slate-600">No high-severity friction points identified</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriorityTickets;
