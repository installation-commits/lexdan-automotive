
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_VEHICLES } from '../constants';

interface InventoryProps {
  onSave?: (id: string) => void;
}

const trackEvent = (eventName: string, vehicleId: string, vehicleName: string) => {
  console.log(`[GA4 EVENT]: ${eventName} | Vehicle: ${vehicleName} (ID: ${vehicleId})`);
};

const Inventory: React.FC<InventoryProps> = ({ onSave }) => {
  const [filterMake, setFilterMake] = useState('All');
  const [filterBody, setFilterBody] = useState('All');
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sortBy, setSortBy] = useState('Price: High to Low');
  const [searchTerm, setSearchTerm] = useState('');

  const makes = ['All', 'Toyota', 'Lexus', 'Honda', 'BMW', 'Volkswagen'];
  const bodyStyles = ['All', 'SUV', 'Truck', 'Van', 'Sedan'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const make = params.get('make');
    if (make && makes.includes(make)) {
      setFilterMake(make);
    }
    const type = params.get('type');
    if (type) {
       // Simple mapping for 'Trucks' to Body Style
       if (type === 'Trucks') setFilterBody('Truck');
    }
  }, []);

  const filteredVehicles = useMemo(() => {
    let list = [...MOCK_VEHICLES];
    
    // Search Term
    if (searchTerm) {
      list = list.filter(v => 
        `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Make
    if (filterMake !== 'All') {
      list = list.filter(v => v.make === filterMake);
    }

    // Filter by Body Style (using Badges or basic matching)
    if (filterBody !== 'All') {
      list = list.filter(v => 
        v.badges.some(b => b.includes(filterBody)) || 
        v.model.toLowerCase().includes(filterBody.toLowerCase())
      );
    }

    // Filter by Price
    list = list.filter(v => v.price <= maxPrice);

    // Sorting
    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [filterMake, filterBody, maxPrice, sortBy, searchTerm]);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="w-full md:w-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#002B5B] mb-4 italic tracking-tighter">Premier Inventory</h2>
          <p className="text-slate-500 max-w-xl font-medium mb-6">
            Over <span className="text-[#002B5B] font-bold">22 years</span> of curating the finest Japanese pre-owned vehicles. 
            Rigorous 150-point ASE certification.
          </p>
          <input 
            type="text" 
            placeholder="Search by model, make, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="w-full md:w-auto bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Vehicle Make</label>
            <select 
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {makes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Body Style</label>
            <select 
              value={filterBody}
              onChange={(e) => setFilterBody(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {bodyStyles.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Max Price: ${maxPrice.toLocaleString()}</label>
            <input 
              type="range" 
              min="5000" 
              max="60000" 
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 ml-1">Sort</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredVehicles.map((v) => (
          <div key={v.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-slate-100 group relative">
            {/* Maintenance Wrench */}
            {v.maintenanceRecords && v.maintenanceRecords.length > 0 && (
              <div className="absolute top-5 right-5 z-20 flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-pulse rotate-12">
                <span className="text-xl">🔧</span>
              </div>
            )}

            <div className="relative h-72 overflow-hidden">
              <img 
                src={v.image} 
                alt={`${v.year} ${v.make} ${v.model}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute top-5 left-5 flex flex-col space-y-2 items-start">
                {v.price < v.marketValue && (
                  <div className="bg-green-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl flex items-center">
                    <span className="mr-2">💰</span>
                    SAVE ${(v.marketValue - v.price).toLocaleString()}
                  </div>
                )}
                {v.oneOwner && (
                  <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    1 Owner
                  </span>
                )}
              </div>
              <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center border border-white/20">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                {v.photosCount}+ High-Res
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black text-[#002B5B] tracking-tight">
                  {v.year} {v.make} <br/>
                  <span className="text-slate-400 font-bold text-lg">{v.model}</span>
                </h3>
                <div className="text-right">
                  {v.price < v.marketValue && (
                     <div className="text-xs font-bold text-slate-400 mb-1">
                        Market Value: <span className="line-through decoration-red-400 decoration-2">${v.marketValue.toLocaleString()}</span>
                     </div>
                  )}
                  <span className="text-blue-600 font-black text-2xl block leading-none">
                    ${v.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-black text-[#002B5B] uppercase tracking-widest block mt-1">
                    Our Sale Price
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 mb-8">
                <div className="flex items-center text-xs font-bold text-slate-500">
                  <svg className="w-4 h-4 mr-1.5 text-blue-500 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {v.mileage} Mi
                </div>
                <div className="h-4 w-px bg-slate-200"></div>
                <div className="flex items-center text-xs font-bold text-slate-500">
                  <span className="mr-1.5">⚡</span>
                  AWD
                </div>
              </div>

              {v.maintenanceRecords && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {v.maintenanceRecords.slice(0, 2).map((m, i) => (
                    <span key={i} className="text-[10px] font-black uppercase text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100 flex items-center">
                      <span className="mr-1.5 text-xs">✨</span> {m}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                <a href="#book-appt" className="bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-600/20 text-center flex items-center justify-center">
                  Book Test Drive
                </a>
                <button 
                  onClick={() => trackEvent('call_now', v.id, `${v.year} ${v.model}`)}
                  className="bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition active:scale-95 shadow-lg shadow-slate-900/20"
                >
                  Call Now
                </button>
              </div>
              
              <button 
                onClick={() => {
                  trackEvent('saved_to_garage', v.id, `${v.year} ${v.model}`);
                  onSave?.(v.id);
                }}
                className="w-full bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl hover:bg-blue-100 transition active:scale-95 group font-bold text-sm flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Save to My Garage
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredVehicles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-bold text-lg">No vehicles found matching your criteria.</p>
          <button onClick={() => {setFilterMake('All'); setFilterBody('All'); setSearchTerm('');}} className="mt-4 text-blue-600 font-bold underline">Reset Filters</button>
        </div>
      )}
    </section>
  );
};

export default Inventory;
