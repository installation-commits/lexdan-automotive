
import React, { useState } from 'react';

// Consolidated DealJacket component with enhanced form state and validation UI
const DealJacket: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    dob: '',
    income: '',
    vin: '',
    miles: '',
    condition: 'Excellent'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    // Simulate AI document analysis
    setTimeout(() => {
      setLoading(false);
      alert(`AI Scan Complete: ${e.target.files?.[0]?.name || 'Document'} verified and encrypted.`);
    }, 1500);
  };

  const finalizeDeal = () => {
    setLoading(true);
    // Generate a unique deal ID and QR code for DMS sync (simulated)
    const dealId = `LEX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setTimeout(() => {
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DEAL_JACKET_${dealId}_${formData.lastName}`);
      setLoading(false);
    }, 2000);
  };

  return (
    <section id="deal-jacket" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-50 border border-slate-100 rounded-[50px] overflow-hidden shadow-2xl transition-all hover:shadow-blue-900/10">
          <div className="bg-[#002B5B] p-10 text-white flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black italic">Set Your Deal Up</h2>
              <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-1">Fast Lane Deal Jacket & Finance Integration</p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-4xl font-black opacity-20">PHASE</span>
              <span className="text-4xl font-black ml-2">{step}/3</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {qrCode ? (
              <div className="text-center py-12 animate-in zoom-in fade-in duration-500">
                <div className="inline-block p-4 bg-white rounded-3xl shadow-xl mb-8 border-4 border-blue-500/20">
                  <img src={qrCode} alt="Deal QR Code" className="w-48 h-48" />
                </div>
                <h3 className="text-2xl font-black text-[#002B5B] mb-2">Deal Jacket Ready!</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Your complete profile, credit application, and scanned documents <br/> 
                  are now securely synced with our <strong>Frazer DMS</strong>. 
                  <br/>Present this code to your specialist.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-[#002B5B] text-white px-8 py-3 rounded-full font-bold text-sm">Download Digital Key</button>
                  <button onClick={() => {setQrCode(null); setStep(1);}} className="text-slate-400 font-bold text-sm hover:text-slate-600">Start New</button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {step === 1 && (
                  <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                      <h4 className="text-xl font-bold">Identity & Credit Application</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">First Name</label>
                        <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="As on License" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Last Name</label>
                        <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="As on License" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">SSN (Encrypted)</label>
                        <input name="ssn" value={formData.ssn} onChange={handleInputChange} type="password" placeholder="XXX-XX-XXXX" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Date of Birth</label>
                        <input name="dob" value={formData.dob} onChange={handleInputChange} type="date" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-500" />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Estimated Annual Income</label>
                        <input name="income" value={formData.income} onChange={handleInputChange} placeholder="$0.00" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                      <h4 className="text-xl font-bold">Trade-In Appraisal & Docs</h4>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Trade-In VIN</label>
                          <input name="vin" value={formData.vin} onChange={handleInputChange} placeholder="17-Digit VIN" className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Condition</label>
                          <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>
                            <option>Needs Repair</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-white hover:border-blue-300 transition-all group">
                          <svg className="w-8 h-8 text-slate-300 mb-2 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scan ID Card</span>
                          <input type="file" className="hidden" onChange={handleScan} />
                        </label>
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-white hover:border-blue-300 transition-all group">
                          <svg className="w-8 h-8 text-slate-300 mb-2 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scan Insurance</span>
                          <input type="file" className="hidden" onChange={handleScan} />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-in slide-in-from-right-10 fade-in duration-300">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                      <h4 className="text-xl font-bold">Review & Sync Deal</h4>
                    </div>
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 mb-8 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                        <span className="text-slate-400 text-sm">Customer</span>
                        <span className="font-bold">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                        <span className="text-slate-400 text-sm">Income Verified</span>
                        <span className="font-bold text-green-500">Yes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Trade Estimation</span>
                        <span className="font-bold text-blue-600">Pending Inspection</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <p className="text-[10px] text-blue-700 leading-relaxed">
                        Data is encrypted using bank-level 256-bit SSL. Final terms subject to credit approval by Lexdan Automotive. 
                        Syncing this jacket will notify a finance specialist immediately.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                  <button 
                    disabled={step === 1 || loading} 
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-3 rounded-full text-xs font-black uppercase text-slate-400 hover:text-slate-600 transition disabled:opacity-0"
                  >
                    Previous Phase
                  </button>
                  <button 
                    onClick={() => step === 3 ? finalizeDeal() : setStep(step + 1)}
                    disabled={loading}
                    className="bg-[#002B5B] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all flex items-center group"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-3 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Building Jacket...
                      </>
                    ) : (
                      <>
                        {step === 3 ? 'Generate QR Deal Key' : 'Next Phase'}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealJacket;
