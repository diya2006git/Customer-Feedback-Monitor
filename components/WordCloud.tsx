
import React from 'react';

interface WordCloudProps {
  words: { word: string; count: number }[];
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/5 mb-6">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Keyword Density Matrix</h3>
      <div className="flex flex-wrap gap-4 justify-center items-center py-4 min-h-[220px]">
        {words.map((item, i) => {
          const fontSize = Math.max(0.7, Math.min(2.0, item.count * 0.4)) + 'rem';
          const opacity = Math.max(0.3, Math.min(1, item.count / 10));
          const colorClasses = [
            'text-cyan-400', 'text-violet-400', 'text-blue-400', 
            'text-emerald-400', 'text-rose-400', 'text-amber-400'
          ];
          const color = colorClasses[i % colorClasses.length];
          
          return (
            <span
              key={i}
              className={`${color} font-bold transition-all hover:scale-125 cursor-default hover:drop-shadow-[0_0_8px_currentColor]`}
              style={{ fontSize, opacity }}
            >
              {item.word.toUpperCase()}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordCloud;
