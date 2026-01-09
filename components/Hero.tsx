import React, { useState } from 'react';

const BRANDS = [
  { name: 'TOYOTA', logo: 'T', image: '/prologue.png', model: '4RUNNER TRD PRO' },
  { name: 'LEXUS', logo: 'L', image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=1200', model: 'RX 500H' },
  { name: 'HONDA', logo: 'H', image: 'https://images.unsplash.com/photo-1631114407817-293883a45c79?auto=format&fit=crop&q=80&w=1200', model: 'CR-V HYBRID' },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextBrand = () => setActiveIndex((prev) => (prev + 1) % BRANDS.length);

  return (
    <div className="relative min-h-[85vh] bg-slate-950 flex flex-col md:flex-row items-center overflow-hidden px-6 lg:px-20 py-12">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#002B5B_0%,_transparent_70%)] opacity-30 pointer-events-none" />

      {/* LEFT SIDE: DYNAMIC TRANSLUCENT CAROUSEL */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center h-[400px]">
        {/* CENTER LEXDAN LOGO */}
        <div className="z-20 w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)]">
          <span className="text-4xl font-black italic text-slate-900">lexdan</span>
        </div>

        {/* ORBITING TRANSLUCENT LOGOS */}
        {BRANDS.map((brand, idx) => {
          const isFront = idx === activeIndex;
          const offset = (idx - activeIndex + BRANDS.length) % BRANDS.length;
          // Logic for position and translucency
          const styles = [
             "translate-y-[-140px] z-10 scale-100 opacity-100", // Front (Solid)
             "translate-x-[140px] translate-y-[40px] z-0 scale-75 opacity-40", // Right (Translucent)
             "translate-x-[-140px] translate-y-[40px] z-0 scale-75 opacity-40" // Left (Translucent)
          ];

          return (
            <div 
              key={brand.name}
              className={`absolute transition-all duration-700 ease-in-out cursor-pointer ${styles[offset]}`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className={`w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center font-black text-2xl text-white ${isFront ? 'bg-red-600 border-red-500 shadow-[0_0_30px_#ef4444]' : 'backdrop-blur-md'}`}>
                {brand.logo}
              </div>
            </div>
          );
        })}
        
        <button onClick={nextBrand} className="absolute bottom-4 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
          Slide Carousel →
        </button>
      </div>

      {/* RIGHT SIDE: PROJECTION SCREEN */}
      <div className="w-full md:w-1/2 mt-12 md:mt-0 relative">
        <div className="relative z-10 border-l-4 border-red-600 pl-8">
          <h2 className="text-white text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
            {BRANDS[activeIndex].name} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              {BRANDS[activeIndex].model}
            </span>
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm mb-8">Dynamic Projection Engine 1.0</p>
          
          {/* THE "HOLOGRAPHIC" IMAGE SCREEN */}
          <div className="relative group">
            <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <img 
              src={BRANDS[activeIndex].image} 
              alt="Holographic View" 
              className="relative w-full h-[350px] object-cover rounded-2xl border border-white/10 shadow-2xl transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
