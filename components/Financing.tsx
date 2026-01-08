
import React, { useState } from 'react';
import { UTMParams } from '../types';

interface FinancingProps {
  utmParams: UTMParams;
}

const Financing: React.FC<FinancingProps> = ({ utmParams }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trafficData = [
    { label: '9AM', value: 20 },
    { label: '11AM', value: 60 },
    { label: '1PM', value: 100 },
    { label: '3PM', value: 80 },
    { label: '5PM', value: 40 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate submission delay for UX
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real Netlify deployment, the form submits natively or via fetch
    }, 1500);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-black text-[#002B5B] mb-8 leading-tight">
              Finance for Real Life. <br/>
              <span className="text-blue-600">No Games.</span>
            </h2>
            
            {/* Dealership Traffic Tracker */}
            <div className="mb-12 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-black text-xs uppercase tracking-widest text-[#002B5B]">Dealership Flow Tracker</h4>
                <span className="text-[10px] font-black uppercase text-green-500 animate-pulse">Low Wait Now</span>
              </div>
              <div className="flex items-end justify-between h-20 space-x-2">
                {trafficData.map(d => (
                  <div key={d.label} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-1000 ${d.value > 80 ? 'bg-red-400' : 'bg-blue-400'}`} 
                      style={{ height: `${d.value}%` }}
                    ></div>
                    <span className="text-[10px] font-bold mt-2 text-slate-400">{d.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-4 text-center font-bold">Best time to visit today: <span className="text-[#002B5B]">Before 10:30 AM or After 4:00 PM</span></p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">Instant Pre-Approval</h4>
                  <p className="text-slate-500">Know your buying power in seconds without affecting your credit score.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl relative">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Lead Sent to CRM</h3>
                  <p className="text-slate-400">David will reach out in <span className="text-white font-bold">&lt; 15 minutes</span>.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Quick Pre-Approval</h3>
                  {/* Netlify Form Configuration */}
                  <form 
                    name="pre-approval" 
                    method="POST" 
                    data-netlify="true" 
                    onSubmit={handleSubmit} 
                    className="space-y-4 mt-6"
                  >
                    <input type="hidden" name="form-name" value="pre-approval" />
                    <input type="text" name="name" placeholder="First Name" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500" />
                    <input type="email" name="email" placeholder="Email Address" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500" />
                    <select name="credit_score" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white appearance-none">
                      <option className="text-slate-900">Estimated Credit Score</option>
                      <option className="text-slate-900">740+ (Excellent)</option>
                      <option className="text-slate-900">670-739 (Good)</option>
                      <option className="text-slate-900">580-669 (Fair)</option>
                    </select>
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl transition transform active:scale-[0.98]">
                      {isLoading ? 'Processing...' : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Financing;
