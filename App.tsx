
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inventory from './components/Inventory';
import Financing from './components/Financing';
import Booking from './components/Booking';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import VoiceConcierge from './components/VoiceConcierge';
import TopTicker from './components/TopTicker';
import TradeCenter from './components/TradeCenter';
import Garage from './components/Garage';
import VehicleGames from './components/VehicleGames';
import CreativeLab from './components/CreativeLab';
import ImageAnalyzer from './components/ImageAnalyzer';
import AboutUs from './components/AboutUs';
import { UTMParams, UserProfile, LoyaltyTier } from './types';

const App: React.FC = () => {
  const [utmParams, setUtmParams] = useState<UTMParams>({ source: 'direct', medium: 'none' });
  const [hasKey, setHasKey] = useState<boolean>(true); 
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

    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const openKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleAction = (type: 'save' | 'game' | 'review' | 'referral' | 'appt' | 'buy') => {
    // Basic point logic for demo
    setUser(prev => ({ ...prev, points: prev.points + 500 }));
  };

  const addToGarage = (id: string) => {
    if (!user.garageIds.includes(id)) {
      setUser(prev => ({ ...prev, garageIds: [...prev.garageIds, id] }));
      handleAction('save');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white font-sans selection:bg-[#E11D48] selection:text-white">
      {!hasKey && (
        <div className="fixed inset-0 z-[100] bg-[#0F172A] flex flex-col items-center justify-center text-white px-6">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-black mb-4 italic">Unlock Premium AI Lab</h2>
            <button 
              onClick={openKeySelector}
              className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-slate-200 transition"
            >
              Select API Key
            </button>
          </div>
        </div>
      )}

      <TopTicker />
      <Navbar user={user} />
      
      <main>
        {/* Module 1: Holographic Hero */}
        <div id="home">
          <Hero />
        </div>
        
        {/* Module 2: Dynamic Inventory Engine */}
        <Inventory onSave={addToGarage} />

        {/* Module 3: Trade Center & VIN Decoder */}
        <TradeCenter />
        
        {/* Module 4: Finance & Protection Suite */}
        <Financing utmParams={utmParams} />
        
        {/* AI Labs Section */}
        <div id="ai-lab" className="border-t border-slate-800">
           <CreativeLab />
        </div>

        <section className="py-24 bg-white text-slate-900">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ImageAnalyzer />
            <div className="flex items-center justify-center p-8 bg-slate-100 rounded-[40px]">
               <AboutUs />
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
           <VehicleGames onPlay={() => handleAction('game')} />
        </section>

        <div id="garage">
          <Garage user={user} onAction={(t) => handleAction(t === 'referral' ? 'referral' : 'buy')} />
        </div>

        {/* Module 5: VIP Booking Dashboard */}
        <Booking onConfirm={() => handleAction('appt')} />
      </main>
      
      <Footer />
      <ChatWidget />
      <VoiceConcierge />
    </div>
  );
};

export default App;
