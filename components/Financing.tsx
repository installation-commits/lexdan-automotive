
import React, { useState } from 'react';
import { UTMParams } from '../types';

interface FinancingProps {
  utmParams: UTMParams;
}

const Financing: React.FC<FinancingProps> = ({ utmParams }) => {
  const [mileage, setMileage] = useState('');
  const [upsellActive, setUpsellActive] = useState(false);

  const isWarrantyEligible = mileage && parseInt(mileage) < 70000;

  return (
    <section id="financing" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">
              Finance & <span className="text-[#E11D48]">Protection</span>
            </h2>
            <p className="text-slate-400 mb-12">
              Simple pre-approval. No games. Protection plans designed for high-mileage imports.
            </p>

            <form className="bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-4">
              <h3 className="text-lg font-black text-white mb-4">Quick Pre-Approval</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-slate-900 border border-slate-600 rounded-lg p-4 text-white text-sm focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Last Name" className="bg-slate-900 border border-slate-600 rounded-lg p-4 text-white text-sm focus:border-blue-500 outline-none" />
              </div>
              <input type="text" placeholder="Street Address" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-white text-sm focus:border-blue-500 outline-none" />
              <input type="password" placeholder="SSN (Encrypted)" className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-white text-sm focus:border-blue-500 outline-none" />
              <button className="w-full bg-white text-slate-900 py-4 rounded-lg font-black uppercase tracking-widest hover:bg-slate-200 transition">
                Check Rates
              </button>
              <p className="text-[10px] text-slate-500 text-center">Secure 256-bit SSL Connection. Soft Pull Only.</p>
            </form>
          </div>

          <div className="space-y-8">
            {/* Warranty Logic */}
            <div className="bg-blue-900/20 p-8 rounded-3xl border border-blue-500/30">
              <h3 className="text-xl font-black text-white mb-4">Coverage Eligibility</h3>
              <div className="flex items-center space-x-4 mb-6">
                <input 
                  type="number" 
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="Enter Vehicle Mileage" 
                  className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white text-sm w-48"
                />
              </div>

              {mileage && (
                <div className={`p-4 rounded-xl border ${isWarrantyEligible ? 'bg-green-900/20 border-green-500/50' : 'bg-slate-800 border-slate-600'}`}>
                   {isWarrantyEligible ? (
                     <div className="flex items-center space-x-3">
                       <span className="text-green-500 text-xl">🛡️</span>
                       <div>
                         <p className="text-white font-bold text-sm">Qualified: Free 1 Month Powertrain</p>
                         <p className="text-slate-400 text-xs">Included automatically on vehicles under 70k miles.</p>
                       </div>
                     </div>
                   ) : (
                     <p className="text-slate-400 text-xs">Mileage exceeds standard warranty limit. See extended options below.</p>
                   )}
                </div>
              )}
            </div>

            {/* Upsell Module */}
            <div 
              className={`p-8 rounded-3xl border transition-all cursor-pointer ${upsellActive ? 'bg-[#E11D48] border-red-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
              onClick={() => setUpsellActive(!upsellActive)}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className={`font-black uppercase tracking-widest ${upsellActive ? 'text-white' : 'text-slate-300'}`}>Platinum Guard</h4>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${upsellActive ? 'border-white bg-white text-red-600' : 'border-slate-500'}`}>
                  {upsellActive && '✓'}
                </div>
              </div>
              <p className={`text-sm mb-4 font-medium ${upsellActive ? 'text-red-100' : 'text-slate-500'}`}>
                Extend coverage to 60mo / 120k miles. Includes roadside assistance and rental reimbursement.
              </p>
              <div className="flex justify-between items-end">
                 <span className={`text-3xl font-black ${upsellActive ? 'text-white' : 'text-white'}`}>$29<span className="text-sm font-normal">/mo</span></span>
                 <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2 py-1 rounded">Add to Finance</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Financing;
