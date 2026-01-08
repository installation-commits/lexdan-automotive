
import React from 'react';
import { UserProfile } from '../types';
import { MOCK_VEHICLES } from '../constants';

interface GarageProps {
  user: UserProfile;
  onAction: (type: 'referral' | 'buy') => void;
}

const Garage: React.FC<GarageProps> = ({ user, onAction }) => {
  const savedVehicles = MOCK_VEHICLES.filter(v => user.garageIds.includes(v.id));
  
  // Tier referral caps
  const referralCaps: Record<string, number> = {
    'Standard': 50,
    'Silver VIP': 150,
    'Gold VIP': 300,
    'Platinum VIP': 1000,
  };

  const cap = referralCaps[user.tier] || 50;
  
  // Dynamic referral bonus: $50 for 1st, $100 for 2nd, etc. (capped by tier)
  const currentReferralBonus = Math.min((user.referrals + 1) * 50, cap);
  
  // Total cash earned from referrals (calculated dynamically)
  let totalReferralCash = 0;
  for (let i = 1; i <= user.referrals; i++) {
    const prevCap = referralCaps[user.tier] || 50; // Use current tier for simplicity or history if tracked
    totalReferralCash += Math.min(i * 50, prevCap);
  }

  const platinumBonus = user.tier === 'Platinum VIP' ? 100 : 0;
  const totalBalance = totalReferralCash + platinumBonus;

  return (
    <section id="garage" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 shadow-2xl">
              <div className="flex items-center space-x-5 mb-10">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[24px] flex items-center justify-center text-3xl font-black shadow-xl">
                    {user.name[0]}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-900 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <span className="text-xs">🏆</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{user.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-400 font-black uppercase text-[10px] tracking-[0.2em]">{user.tier}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                    <span className="text-slate-500 text-[10px] font-bold">MEMBER SINCE 2026</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Ownership Tier</p>
                    <span className="text-xs font-bold text-blue-400">{user.carsPurchased} Cars</span>
                  </div>
                  <div className="flex space-x-2 mb-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-700 ${user.carsPurchased >= i ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}></div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic opacity-80">
                    {user.carsPurchased === 0 ? "Unlock Silver VIP with your 1st buy." : 
                     user.carsPurchased === 1 ? "Unlock Gold VIP with 1 more buy." : 
                     user.carsPurchased === 2 ? "Unlock Platinum VIP status next." : 
                     "Elite Platinum VIP Status Unlocked."}
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-600/10 to-blue-900/10 rounded-3xl border border-blue-500/20">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Referral Wallet</p>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">+{user.referrals} REF</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-black text-white">${totalBalance}</span>
                    <span className="text-xs font-bold text-slate-500">AVAILABLE</span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-[10px] font-bold text-slate-400 mb-4 leading-relaxed">
                      Next Reward: <span className="text-green-400 font-black">${currentReferralBonus}</span>
                      <br/><span className="opacity-50 italic">Capped at your {user.tier} limit (${cap}).</span>
                    </p>
                    <button 
                      onClick={() => onAction('referral')}
                      className="w-full bg-white text-[#002B5B] py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-[0.98] shadow-xl"
                    >
                      Invite Friend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-black italic">My Digital Garage</h2>
                <p className="text-slate-400 text-sm mt-2 font-medium">Your curated selection of future drives.</p>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hidden md:block">
                <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Redeem Points</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg ${user.points >= 12000 ? 'text-green-400' : 'text-slate-300'}`}>🛢️</span>
                  <p className="text-xs font-bold">12k = Free Oil Change</p>
                </div>
              </div>
            </div>

            {savedVehicles.length === 0 ? (
              <div className="bg-white/5 border border-dashed border-white/20 rounded-[50px] py-32 text-center group cursor-pointer hover:bg-white/10 transition">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition duration-500">🚗</div>
                <p className="text-slate-400 font-bold mb-8">No favorites saved yet. Let's fill this up.</p>
                <a href="#inventory" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 transition">Discover Inventory</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {savedVehicles.map(v => (
                  <div key={v.id} className="bg-white/5 border border-white/10 rounded-[32px] p-6 flex items-center space-x-6 hover:bg-white/10 transition duration-300 group">
                    <div className="relative">
                      <img src={v.image} className="w-28 h-28 object-cover rounded-2xl border border-white/10 group-hover:scale-105 transition duration-500" alt={v.model} />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs shadow-lg opacity-0 group-hover:opacity-100 transition">❤️</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg leading-tight">{v.year} {v.make}</h4>
                        <span className="text-blue-400 font-black text-sm">${(v.price/1000).toFixed(1)}k</span>
                      </div>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">{v.model}</p>
                      <div className="mt-6 flex space-x-2">
                        <button 
                          onClick={() => onAction('buy')}
                          className="flex-1 bg-white text-[#002B5B] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-blue-50 transition"
                        >
                          Buy Now
                        </button>
                        <button className="bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-white/20 transition">Compare</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-16 pt-16 border-t border-white/5">
              <h5 className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] mb-8">Lexdan VIP Tier Benefits</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { tier: 'Silver VIP', icon: '🥈', benefit: 'Free Detailing', sub: 'On delivery + Priority lane', active: user.tier === 'Silver VIP' || user.tier === 'Gold VIP' || user.tier === 'Platinum VIP' },
                  { tier: 'Gold VIP', icon: '🥇', benefit: 'Priority Service', sub: 'Lifetime Oil Changes', active: user.tier === 'Gold VIP' || user.tier === 'Platinum VIP' },
                  { tier: 'Platinum VIP', icon: '💎', benefit: 'Platinum Shield', sub: 'Free Home Delivery & $100 Cash', active: user.tier === 'Platinum VIP' }
                ].map((t, i) => (
                  <div key={i} className={`p-8 rounded-[32px] border transition-all duration-500 relative overflow-hidden group ${t.active ? 'bg-gradient-to-br from-blue-600/20 to-blue-900/20 border-blue-500/30' : 'bg-white/5 border-white/5 grayscale opacity-40'}`}>
                    {t.active && <div className="absolute top-0 right-0 p-3 bg-blue-600 text-[8px] font-black uppercase rounded-bl-xl shadow-lg">Active</div>}
                    <div className="text-3xl mb-4 group-hover:scale-110 transition duration-300">{t.icon}</div>
                    <p className="text-[10px] font-black uppercase text-blue-400 mb-2">{t.tier}</p>
                    <p className="text-lg font-black text-white mb-1">{t.benefit}</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{t.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Garage;
