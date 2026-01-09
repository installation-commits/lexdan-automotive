
import React, { useState } from 'react';
import { BRANDS } from '../constants';

const Hero: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const rotateTo = (idx: number) => {
    const anglePerItem = 360 / BRANDS.length;
    const newRotation = idx * -anglePerItem;
    setRotation(newRotation);
    setActiveIdx(idx);
  };

  return (
    <section className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2500" 
          alt="Toyota Tundra Background" 
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950"></div>
      </div>

      {/* 1. CENTRAL HUB (THE SUN) */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.4)] border-4 border-slate-100 relative group z-30 transition-transform duration-500 hover:scale-105">
           {/* Inner Glow */}
           <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-pulse"></div>
           <div className="relative z-10 text-center">
              <span className="block text-4xl font-black italic text-slate-900 leading-none tracking-tighter">lexdan</span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Automotive</span>
           </div>
        </div>

        {/* PROJECTION DATA UNDER THE HUB */}
        <div className="mt-20 text-center animate-in fade-in zoom-in duration-700 relative z-20">
           <h2 className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tighter drop-shadow-2xl">
             {BRANDS[activeIdx].name}
           </h2>
           <p className="text-[#E11D48] font-black tracking-[0.5em] uppercase text-sm mt-3 animate-pulse">{BRANDS[activeIdx].model}</p>
        </div>
      </div>

      {/* 2. THE ORBITAL RING (SATURN'S RINGS) */}
      <div 
        className="absolute w-[600px] h-[600px] md:w-[700px] md:h-[700px] rounded-full border border-white/5 transition-transform duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Orbit Path Visuals */}
        <div className="absolute inset-0 rounded-full border border-white/5"></div>
        <div className="absolute inset-4 rounded-full border border-white/5 border-dashed opacity-30"></div>

        {BRANDS.map((brand, idx) => {
          const angle = (idx * (360 / BRANDS.length));
          const isActive = activeIdx === idx;

          return (
            <div 
              key={brand.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `rotate(${angle}deg) translateY(-300px) md:translateY(-350px)` }}
            >
              {/* PLANETARY BODY (LOGO) */}
              <button 
                onClick={() => rotateTo(idx)}
                style={{ transform: `rotate(-${angle + rotation}deg)` }} // Counter-rotation
                className={`
                  relative rounded-full flex items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${isActive 
                    ? 'w-28 h-28 bg-white border-4 border-[#E11D48] scale-125 z-50 shadow-[0_0_50px_rgba(225,29,72,0.6)] opacity-100' 
                    : 'w-20 h-20 bg-slate-800/80 border-2 border-white/10 opacity-40 blur-[1px] hover:opacity-100 hover:blur-0 hover:scale-110 hover:border-white'
                  }
                `}
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className={`object-contain transition-all duration-500 ${isActive ? 'w-16 h-16' : 'w-10 h-10 grayscale opacity-70'}`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'; 
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-black text-slate-900">${brand.name[0]}</span>`;
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. SYNCHRONIZED PROJECTION SCREEN (RIGHT) */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none overflow-hidden hidden lg:block">
        <div className="relative w-full h-full">
           {/* Mask Gradient */}
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10"></div>
           
           {/* Holographic Image */}
           <img 
             key={activeIdx}
             src={BRANDS[activeIdx].image} 
             className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-4xl object-contain opacity-40 mix-blend-screen animate-in fade-in slide-in-from-right-10 duration-1000 origin-right"
             alt="Hologram"
           />
           
           {/* Holographic Scanlines & Noise */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 background-size-[100%_2px,3px_100%] opacity-20"></div>
        </div>
      </div>

      {/* ATMOSPHERIC PARTICLES */}
      <div className="absolute w-[1000px] h-[1000px] border border-white/5 rounded-full pointer-events-none animate-[spin_120s_linear_infinite]" />
      <div className="absolute w-[1400px] h-[1400px] border border-white/5 rounded-full pointer-events-none animate-[spin_180s_linear_infinite_reverse]" />
      
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 z-0 bg-radial-at-c from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
