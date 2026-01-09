
import React from 'react';
import { MOCK_VEHICLES } from '../constants';

interface InventoryProps {
  onSave?: (id: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ onSave }) => {
  return (
    <section id="inventory" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
            Inventory <span className="text-[#E11D48]">Engine</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm">22 YEARS OF FAMILY TRUST // ASE CERTIFIED INSPECTIONS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_VEHICLES.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 group flex flex-col">
              {/* Image Area */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.model} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                />
                
                {/* Ribbon Badges */}
                <div className="absolute top-4 left-0 flex flex-col gap-2">
                  {vehicle.oneOwner && (
                    <span className="bg-[#E11D48] text-white text-[10px] font-black uppercase px-3 py-1 rounded-r-lg shadow-lg">
                      One Owner
                    </span>
                  )}
                  {vehicle.badges.includes('Low APR') && (
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-r-lg shadow-lg">
                      Low APR
                    </span>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header: Single Row */}
                <div className="mb-6">
                  <h3 className="text-sm font-black text-white leading-tight uppercase tracking-tight">
                    {vehicle.year} <span className="text-slate-400">|</span> {vehicle.make} {vehicle.model} {vehicle.trim}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase mt-1">
                    {vehicle.type} • {vehicle.color}
                  </p>
                </div>

                {/* Price Block */}
                <div className="bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-700/50">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Market Value</span>
                     <span className="text-xs font-medium text-slate-400 line-through">${vehicle.marketValue.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lexdan Discount</span>
                     <span className="text-xs font-bold text-green-400">-${(vehicle.marketValue - vehicle.price).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-end mt-2 pt-2 border-t border-slate-700">
                     <span className="text-xs font-black text-white uppercase tracking-widest">Sale Price</span>
                     <span className="text-2xl font-black text-[#E11D48]">${vehicle.price.toLocaleString()}</span>
                   </div>
                </div>

                {/* Quick Facts Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-2 text-center border border-slate-700">
                    <span className="block text-[9px] font-black text-slate-400 uppercase">Accidents</span>
                    <span className="block text-xs font-bold text-white">{vehicle.cleanCarfax ? 'Zero' : 'Reported'}</span>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-2 text-center border border-slate-700">
                    <span className="block text-[9px] font-black text-slate-400 uppercase">Owners</span>
                    <span className="block text-xs font-bold text-white">{vehicle.oneOwner ? '1' : 'Multiple'}</span>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-2 text-center border border-slate-700">
                    <span className="block text-[9px] font-black text-slate-400 uppercase">Mileage</span>
                    <span className="block text-xs font-bold text-white">{(vehicle.mileage / 1000).toFixed(1)}k</span>
                  </div>
                   <div className="bg-slate-700/30 rounded-lg p-2 text-center border border-slate-700">
                    <span className="block text-[9px] font-black text-slate-400 uppercase">History</span>
                    <span className="block text-xs font-bold text-white">Verified</span>
                  </div>
                </div>

                {/* Common Issues Block */}
                <div className="mb-6 p-3 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-blue-500 text-xs">🔧</span>
                    <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Transparency Report</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                    {vehicle.commonIssues || "Certified inspection passed. No active manufacturer recalls found."}
                  </p>
                </div>

                <div className="mt-auto flex space-x-2">
                  <button className="flex-1 bg-[#E11D48] text-white py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-700 transition shadow-lg">
                    Confirm Availability
                  </button>
                  <button onClick={() => onSave?.(vehicle.id)} className="px-4 border border-slate-600 rounded-lg hover:bg-white hover:text-slate-900 transition text-slate-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inventory;
