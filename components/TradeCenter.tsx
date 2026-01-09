
import React, { useState } from 'react';

const TradeCenter: React.FC = () => {
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleAnalyze = () => {
    if (!vin) return;
    setAnalyzing(true);
    // Simulate API delay and Generate Report
    setTimeout(() => {
      setAnalyzing(false);
      const baseValue = 24000;
      setReport({
        vehicle: "2017 Toyota Tundra SR5",
        retail: baseValue + 3000,
        private: baseValue + 1500,
        trade: baseValue,
        adjustments: [
          { label: 'New Tires', value: 500, type: 'add' },
          { label: 'Market Demand', value: 200, type: 'add' },
          { label: 'Reconditioning', value: -400, type: 'minus' }
        ],
        marketGraph: [
          { label: 'Local A', price: 23500 },
          { label: 'Local B', price: 24200 },
          { label: 'Local C', price: 23900 },
          { label: 'Your Trade', price: 24700, active: true },
        ]
      });
    }, 2000);
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <section id="trade" className="py-24 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Input Section */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">
              Trade <span className="text-[#E11D48]">Center</span>
            </h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed font-medium">
              We use real-time market data to value your vehicle. Enter your VIN to decode specific trim features that other tools miss.
            </p>

            <div className="space-y-4 bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-xl">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Vehicle VIN</label>
                <input 
                  type="text" 
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  placeholder="17 Character VIN" 
                  className="w-full bg-slate-800 border border-slate-600 text-white p-4 rounded-xl font-mono text-sm focus:border-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Current Mileage</label>
                <input 
                  type="number" 
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="e.g. 65000" 
                  className="w-full bg-slate-800 border border-slate-600 text-white p-4 rounded-xl font-mono text-sm focus:border-blue-500 outline-none transition"
                />
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={analyzing || !vin}
                className="w-full bg-[#E11D48] text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? 'Decoding VIN...' : 'Analyze Market'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="md:w-2/3">
            {report ? (
              <div className="bg-slate-900 rounded-[40px] border border-slate-700 p-8 md:p-10 animate-in slide-in-from-right-10 shadow-2xl">
                <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white italic">{report.vehicle}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                       <p className="text-green-500 text-xs font-bold uppercase tracking-wider">Live Market Match Found</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Est. Trade Value</p>
                    <p className="text-4xl font-black text-white tracking-tighter">${report.trade.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Market Graph */}
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Market Conditions</h4>
                    <div className="h-48 flex items-end justify-between space-x-3 bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                      {report.marketGraph.map((item: any, i: number) => (
                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                          <div 
                            className={`w-full rounded-t-lg transition-all duration-1000 relative ${item.active ? 'bg-blue-500' : 'bg-slate-700 opacity-60'}`} 
                            style={{ height: `${(item.price / 30000) * 100}%` }}
                          >
                            {item.active && <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[9px] font-bold px-2 py-1 rounded">YOU</div>}
                          </div>
                          <span className={`text-[9px] font-bold mt-3 uppercase ${item.active ? 'text-blue-400' : 'text-slate-600'}`}>
                            {item.active ? 'Offer' : 'Comp'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2">
                       {report.adjustments.map((adj: any, i: number) => (
                         <div key={i} className="flex justify-between text-xs">
                           <span className="text-slate-400 font-medium">{adj.label}</span>
                           <span className={`font-bold ${adj.type === 'minus' ? 'text-red-400' : 'text-green-400'}`}>
                             {adj.type === 'minus' ? '-' : '+'}${Math.abs(adj.value)}
                           </span>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Certificate */}
                  <div className="bg-white text-slate-900 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[250px] shadow-xl transform rotate-1 hover:rotate-0 transition duration-500">
                    <div className="absolute top-0 left-0 w-full h-3 bg-[#E11D48]"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-2xl -mr-10 -mb-10"></div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-6 pt-2">
                        <span className="font-black text-xl italic tracking-tighter">LEXDAN</span>
                        <span className="text-[9px] font-black border-2 border-slate-900 px-2 py-0.5 rounded uppercase">Verified Offer</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800 mb-2">
                        Acquisition Offer: <span className="text-2xl font-black">${report.trade.toLocaleString()}</span>
                        </p>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">
                        This certificate guarantees the trade-in value for 7 days or 250 miles. Present to manager.
                        </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-200 pt-4 relative z-10">
                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-400">Issued On</p>
                        <p className="font-mono font-bold text-sm text-slate-900">{currentDate}</p>
                      </div>
                      <div className="text-right">
                         <div className="font-script text-2xl text-blue-800 -rotate-6">Dennis Keskin</div>
                         <p className="text-[9px] uppercase font-black text-slate-400 mt-1">Authorized Sig.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-[40px] min-h-[400px] bg-white/5">
                <div className="text-center opacity-40">
                  <span className="text-7xl mb-4 block">📉</span>
                  <p className="text-sm font-black uppercase tracking-widest text-white">Live Market Data Waiting...</p>
                  <p className="text-xs text-slate-400 mt-2">Enter VIN to sync with Manheim & vAuto</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeCenter;
