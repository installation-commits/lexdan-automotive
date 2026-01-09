
import React, { useState } from 'react';
import { MOCK_VEHICLES } from '../constants';
import { getVehicleBattleStats } from '../services/geminiService';

interface VehicleGamesProps {
  onPlay: () => void;
}

const VehicleGames: React.FC<VehicleGamesProps> = ({ onPlay }) => {
  // Default to RAV4 (ID 5) vs Ridgeline (ID 2) for "Battle of the Imports"
  // Fixed: ID 7 and index 6 do not exist in MOCK_VEHICLES
  const [v1, setV1] = useState(MOCK_VEHICLES.find(v => v.id === '5') || MOCK_VEHICLES[0]);
  const [v2, setV2] = useState(MOCK_VEHICLES.find(v => v.id === '2') || MOCK_VEHICLES[1]);
  const [battleResult, setBattleResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runBattle = async () => {
    setLoading(true);
    onPlay();
    const result = await getVehicleBattleStats(`${v1.year} ${v1.model}`, `${v2.year} ${v2.model}`);
    setBattleResult(result);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-full mb-4">
          <span className="text-xs font-black uppercase tracking-widest">Gamified Value Challenge</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-[#002B5B] mb-4">Battle of the Imports</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Compare Lexdan quality vs. the competition. Play to earn 200 PTS instantly!</p>
      </div>

      <div className="bg-slate-50 rounded-[50px] p-8 md:p-16 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        {/* Decorative VS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[150px] md:text-[300px] font-black text-slate-200/50 italic tracking-tighter">VS</span>
        </div>

        <div className="flex-1 w-full flex flex-col items-center relative z-10">
          <div className="w-full bg-white p-6 rounded-[32px] shadow-xl border border-slate-100">
            <img src={v1.image} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-sm" alt={v1.model} />
            <select 
              value={v1.id} 
              onChange={(e) => setV1(MOCK_VEHICLES.find(v => v.id === e.target.value)!)}
              className="w-full font-black text-lg text-[#002B5B] focus:outline-none mb-4"
            >
              {MOCK_VEHICLES.map(v => <option key={v.id} value={v.id}>{v.year} {v.model}</option>)}
            </select>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-400"><span>Reliability</span><span className="text-blue-600">9.8/10</span></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="w-[98%] h-full bg-blue-500"></div></div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <button 
            onClick={runBattle}
            disabled={loading}
            className={`w-24 h-24 rounded-full font-black text-white shadow-2xl transition transform active:scale-90 flex items-center justify-center ${loading ? 'bg-slate-400 animate-pulse' : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'}`}
          >
            {loading ? '...' : 'FIGHT!'}
          </button>
        </div>

        <div className="flex-1 w-full flex flex-col items-center relative z-10">
          <div className="w-full bg-white p-6 rounded-[32px] shadow-xl border border-slate-100">
            <img src={v2.image} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-sm" alt={v2.model} />
            <select 
              value={v2.id} 
              onChange={(e) => setV2(MOCK_VEHICLES.find(v => v.id === e.target.value)!)}
              className="w-full font-black text-lg text-[#002B5B] focus:outline-none mb-4"
            >
              {MOCK_VEHICLES.map(v => <option key={v.id} value={v.id}>{v.year} {v.model}</option>)}
            </select>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-400"><span>Reliability</span><span className="text-blue-600">9.4/10</span></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="w-[94%] h-full bg-blue-500"></div></div>
            </div>
          </div>
        </div>
      </div>

      {battleResult && (
        <div className="mt-12 p-10 bg-blue-900 text-white rounded-[40px] shadow-2xl animate-in slide-in-from-bottom-10 fade-in">
          <h4 className="text-2xl font-black mb-6 italic flex items-center">
            <span className="mr-3">🏆</span> Gemini Battle Verdict
          </h4>
          <div className="text-lg leading-relaxed text-blue-100 font-medium whitespace-pre-wrap">
            {battleResult}
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">+200 Points Added to Wallet</p>
            <button onClick={() => setBattleResult(null)} className="text-white/50 text-xs font-bold uppercase hover:text-white transition">Close Verdict</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleGames;
