
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Mission */}
        <div className="space-y-4">
          <h2 className="text-[#002B5B] font-black text-2xl tracking-tighter">LEXDAN<span className="text-blue-600 italic">AUTOMOTIVE</span></h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Family owned and operated for 22 years. Proudly serving Maplewood and the Twin Cities area with quality pre-owned Japanese vehicles.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://facebook.com/lexdan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#002B5B] hover:bg-blue-600 hover:text-white transition font-bold">FB</a>
            <a href="https://instagram.com/lexdan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#002B5B] hover:bg-blue-600 hover:text-white transition font-bold">IG</a>
            <a href="https://youtube.com/lexdan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#002B5B] hover:bg-blue-600 hover:text-white transition font-bold">YT</a>
          </div>
        </div>

        {/* Inventory Column */}
        <div>
          <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Inventory</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li><a href="#inventory" className="hover:text-blue-600">Browse All Cars</a></li>
            <li><a href="?make=Toyota#inventory" className="hover:text-blue-600">Toyota 4Runner</a></li>
            <li><a href="?make=Lexus#inventory" className="hover:text-blue-600">Lexus RX</a></li>
            <li><a href="?type=Trucks#inventory" className="hover:text-blue-600">Trucks & 4x4s</a></li>
            <li><a href="?make=Honda#inventory" className="hover:text-blue-600">Honda CR-V</a></li>
          </ul>
        </div>

        {/* Finance Column */}
        <div>
          <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Financing</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li><a href="#financing" className="hover:text-blue-600">Quick Pre-Approval</a></li>
            <li><a href="#financing" className="hover:text-blue-600">Payment Calculator</a></li>
            <li><a href="#financing" className="hover:text-blue-600">Value Your Trade</a></li>
            <li><a href="#financing" className="hover:text-blue-600">Credit Help</a></li>
          </ul>
        </div>

        {/* Contact/Visit Column */}
        <div>
          <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Visit Our Store</h3>
          <p className="text-sm text-slate-600 mb-2 font-medium">2525 Maplewood Dr</p>
          <p className="text-sm text-slate-600 mb-4 font-medium">Maplewood, MN 55109</p>
          <p className="text-[#002B5B] font-black text-lg">(651) 555-0123</p>
          <div className="mt-4 flex items-center space-x-1">
             <div className="flex text-yellow-400 text-sm">
               <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase ml-2">Google Reviews</p>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400">© {currentYear} Lexdan Automotive. All Rights Reserved.</p>
        <div className="flex space-x-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
          <a href="#" className="hover:text-slate-900">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900">Terms of Service</a>
          <a href="#" className="hover:text-slate-900">ADA Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
