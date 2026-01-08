
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBanner from './components/TrustBanner';
import Inventory from './components/Inventory';
import Reviews from './components/Reviews';
import Financing from './components/Financing';
import Booking from './components/Booking';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Garage from './components/Garage';
import VehicleGames from './components/VehicleGames';
import VoiceConcierge from './components/VoiceConcierge';
import TopTicker from './components/TopTicker';
import AboutUs from './components/AboutUs';
import { UTMParams, UserProfile, LoyaltyTier } from './types';

const App: React.FC = () => {
  const [utmParams, setUtmParams] = useState<UTMParams>({ source: 'direct', medium: 'none' });
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Driver',
    carsPurchased: 0,
    referrals: 0,
    points: 0,
    garageIds: [],
    tier: 'Standard'
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('utm_source') || 'direct';
    const medium = urlParams.get('utm_medium') || 'none';
    const campaign = urlParams.get('utm_campaign') || undefined;
    setUtmParams({ source, medium, campaign });
  }, []);

  const addPoints = (pts: number) => {
    setUser(prev => ({ ...prev, points: prev.points + pts }));
  };

  const handleAction = (type: 'save' | 'game' | 'review' | 'referral' | 'appt' | 'buy') => {
    const rewards: Record<string, number> = {
      save: 1000,
      game: 200,
      review: 2000,
      referral: 5000,
      appt: 1000,
      buy: 10000
    };
    
    addPoints(rewards[type]);
    
    if (type === 'buy') {
      setUser(prev => {
        const newCount = prev.carsPurchased + 1;
        let newTier: LoyaltyTier = 'Standard';
        if (newCount >= 3) newTier = 'Platinum VIP';
        else if (newCount >= 2) newTier = 'Gold VIP';
        else if (newCount >= 1) newTier = 'Silver VIP';
        return { ...prev, carsPurchased: newCount, tier: newTier };
      });
    }

    if (type === 'referral') {
      setUser(prev => ({ ...prev, referrals: prev.referrals + 1 }));
    }
  };

  const addToGarage = (id: string) => {
    if (!user.garageIds.includes(id)) {
      setUser(prev => ({ ...prev, garageIds: [...prev.garageIds, id] }));
      handleAction('save');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <TopTicker />
      <Navbar user={user} />
      <main>
        <div id="home">
          <Hero />
        </div>
        
        <TrustBanner />
        
        {/* Real-time Rewards Dashboard */}
        <section className="glass-nav py-6 border-b border-slate-100 shadow-sm sticky top-[64px] md:top-[80px] z-40">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-5">
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 text-center md:text-left">Current Tier</p>
                <div className="bg-blue-600 px-4 py-1.5 rounded-full text-white font-black text-xs shadow-lg shadow-blue-900/10">
                  {user.tier}
                </div>
              </div>
              <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
              <div className="flex-1 w-full md:w-auto">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Service Progress (12k PTS)</p>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-[120px] h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50 relative">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)] shimmer-effect" 
                      style={{ width: `${Math.min((user.points / 12000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-black text-[#002B5B] whitespace-nowrap">{user.points.toLocaleString()} <span className="text-slate-300">/</span> 12k</span>
                </div>
              </div>
            </div>
            {user.points >= 12000 ? (
              <div className="animate-bounce bg-green-500 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase shadow-xl shadow-green-500/20 flex items-center">
                <span className="mr-2">🎉</span> Free Oil Change Earned!
              </div>
            ) : (
              <div className="text-[10px] font-bold text-slate-400 italic">
                {Math.max(0, 12000 - user.points).toLocaleString()} PTS to your next free service
              </div>
            )}
          </div>
        </section>

        <section id="inventory">
          <Inventory onSave={addToGarage} />
        </section>
        
        {/* Updated ID to 'about-us' to match Navbar link */}
        <section id="about-us">
          <AboutUs />
          <Reviews onWrite={() => handleAction('review')} />
        </section>

        <section className="py-12 bg-white">
           <VehicleGames onPlay={() => handleAction('game')} />
        </section>

        <section id="garage">
          <Garage user={user} onAction={handleAction} />
        </section>
        
        <div className="h-24 bg-gradient-to-b from-slate-900 to-white"></div>
        
        <section id="financing">
          <Financing utmParams={utmParams} />
        </section>
        
        <section id="book-appt">
          <Booking onConfirm={() => handleAction('appt')} />
        </section>
      </main>
      
      <Footer />
      <ChatWidget />
      <VoiceConcierge />
    </div>
  );
};

export default App;
