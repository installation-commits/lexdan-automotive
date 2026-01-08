
import React from 'react';
import { MOCK_VEHICLES } from '../constants';

const TopTicker: React.FC = () => {
  const deals = MOCK_VEHICLES.filter(v => v.price < v.marketValue);

  return (
    <div className="bg-slate-900 text-white py-2 overflow-hidden border-b border-white/5 relative z-[60]">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...deals, ...deals].map((v, i) => (
          <div key={i} className="flex items-center space-x-4 px-8 border-r border-white/10">
            <div className="w-5 h-5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] flex items-center justify-center text-[10px] font-black">L</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Underpriced Deal</span>
            <span className="text-xs font-bold">{v.year} {v.make} {v.model} — save ${(v.marketValue - v.price).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TopTicker;
