
import React from 'react';
import { MOCK_SALESMEN } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[85vh] md:h-screen flex items-center overflow-hidden">
      {/* Background Image - Premium Lexus/Toyota focus */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000" 
          alt="Lexus SUV" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Serving Maplewood Since 2004</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 drop-shadow-lg">
            22 Years of Trust. <br/>
            <span className="text-blue-400">Family Owned.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-medium">
            Maplewood’s premier destination for high-quality pre-owned Japanese imports. 
            Toyota, Lexus, and Honda experts providing a stress-free shopping experience.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#inventory" className="bg-white text-[#002B5B] px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-slate-100 transition transform active:scale-95 flex items-center justify-center">
              View Inventory
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#financing" className="bg-blue-600/20 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition transform active:scale-95 text-center flex items-center justify-center">
              Get Pre-Approved
            </a>
          </div>
          
          <div className="mt-12 flex items-center space-x-6">
            <div className="flex -space-x-3">
              {MOCK_SALESMEN.map((salesman) => (
                <img 
                  key={salesman.id} 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                  src={salesman.avatar} 
                  alt={salesman.name} 
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-yellow-400 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-bold">4.9 Star Google Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
