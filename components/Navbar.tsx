
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="text-xl md:text-2xl font-black tracking-tighter text-[#002B5B]">
              LEXDAN<span className="text-blue-600 italic">AUTOMOTIVE</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#inventory" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition">Inventory</a>
            <a href="#about-us" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition">About Us</a>
            <a href="#garage" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition flex items-center">
              Garage 
              <span className="ml-1.5 bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full">{user.garageIds.length}</span>
            </a>
            <a href="#financing" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition">Financing</a>
            
            <div className="h-8 w-px bg-slate-200"></div>

            <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">
                {user.points >= 12000 ? '⭐' : 'LX'}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">{user.tier}</span>
                <span className="text-xs font-bold text-slate-700">{user.points.toLocaleString()} PTS</span>
              </div>
            </div>

            <a 
              href="#book-appt" 
              className="bg-[#002B5B] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:scale-105 transition transform active:scale-95 animate-pulse"
            >
              Book Appt
            </a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-2">
          <div className="px-3 py-4 mb-2 bg-slate-50 rounded-2xl">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{user.tier}</p>
            <p className="font-bold text-blue-600">{user.points.toLocaleString()} Points</p>
          </div>
          <a href="#inventory" className="block px-3 py-2 text-base font-semibold text-slate-700" onClick={() => setIsOpen(false)}>Inventory</a>
          <a href="#about-us" className="block px-3 py-2 text-base font-semibold text-slate-700" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="#garage" className="block px-3 py-2 text-base font-semibold text-slate-700" onClick={() => setIsOpen(false)}>My Garage</a>
          <a href="#financing" className="block px-3 py-2 text-base font-semibold text-slate-700" onClick={() => setIsOpen(false)}>Financing</a>
          <a href="#book-appt" className="block px-3 py-2 bg-blue-600 text-white text-center rounded-lg font-bold" onClick={() => setIsOpen(false)}>Schedule Test Drive</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
