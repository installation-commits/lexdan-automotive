
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative">
              {/* 22 Years Wreath Badge Styling */}
              <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center relative">
                <div className="absolute inset-0 border-[12px] border-yellow-400/20 rounded-full"></div>
                <div className="text-center z-10 p-8 bg-white rounded-full shadow-2xl border-4 border-yellow-400">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Celebrating</p>
                  <h3 className="text-6xl md:text-8xl font-black text-[#002B5B] leading-none my-2">22</h3>
                  <p className="text-lg font-black text-[#002B5B] uppercase">Years</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">In Business</p>
                </div>
                {/* Wreath visual elements via CSS or simple divs */}
                <div className="absolute -inset-4 border-[2px] border-dashed border-yellow-400/40 rounded-full animate-[spin_20s_linear_infinite]"></div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              <a href="#" className="hover:text-blue-600">Home</a>
              <span>/</span>
              <span className="text-blue-600">About Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#002B5B] mb-8 italic">Trust Built Over Decades.</h2>
            
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                Lexdan Automotive is empowered to offer you better than expected savings throughout the thirty-one years of experience in Vehicle Sales and Management. Our Company is listed with the <strong>Better Business Bureau with an "A" Rating</strong>. We are celebrating our Twenty-Two years of operation in pre-owned vehicle retail sales in Maplewood.
              </p>
              <p>
                We are an independent dealership, operating on a smaller scale yet, following the same philosophy and process in reconditioning, inspection, servicing, and warranty of the vehicles as franchise dealerships. Often times, we purchase our vehicles at the same locations where the franchise dealerships purchase their pre-owned vehicles.
              </p>
              <p>
                All vehicles are inspected and serviced by <strong>A.S.E. certified Technicians</strong>. We strive to offer you the quality you deserve and the value you expect. Our valued customers from as far north as Quebec, Canada and as far south as San Diego, California have experienced the savings on their purchases.
              </p>
              <p>
                We look forward to meeting your expectations and servicing your automobile needs as well.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-blue-600"></div>
                <div>
                  <h4 className="text-xl font-black text-[#002B5B]">Dennis Keskin</h4>
                  <p className="text-sm font-bold text-blue-600">Dennis@Lexdanauto.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
