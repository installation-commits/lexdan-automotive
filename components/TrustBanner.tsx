
import React from 'react';

const TrustBanner: React.FC = () => {
  const items = [
    { label: "Family Owned", sub: "Since 2004", icon: "👨‍👩‍👧‍👦" },
    { label: "4.9 Google Rating", sub: "Tons of Reviews", icon: "⭐" },
    { label: "ASE Certified", sub: "150-Point Inspection", icon: "🔧" },
    { label: "Fast & Easy", sub: "Credit Pre-Approval", icon: "💸" }
  ];

  return (
    <div className="bg-white border-y border-slate-100 py-8 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
        <div className="flex justify-between items-center min-w-[600px] md:min-w-0">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4 px-6 border-r border-slate-100 last:border-0">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="font-bold text-slate-900 leading-tight">{item.label}</h4>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
