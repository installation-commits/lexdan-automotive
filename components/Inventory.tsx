import React, { useState } from 'react';
import { MOCK_VEHICLES } from '../constants';

const Inventory = ({ onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('All');

  // Logic to filter the cars based on user input
  const filteredVehicles = MOCK_VEHICLES.filter(car => {
    const matchesSearch = `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMake = selectedMake === 'All' || car.make === selectedMake;
    return matchesSearch && matchesMake;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <input 
          type="text" 
          placeholder="Search Lexdan Inventory (e.g. 4Runner)..." 
          className="p-4 border-2 border-slate-100 rounded-2xl w-full md:w-1/2 shadow-sm focus:border-[#002B5B] outline-none transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 justify-center">
          {['All', 'Toyota', 'Honda', 'Lexus'].map(make => (
            <button 
              key={make}
              onClick={() => setSelectedMake(make)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${selectedMake === make ? 'bg-[#002B5B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {make}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map(car => (
          <div key={car.id} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden group">
             {/* Use real car images here from your constants */}
            <img src={car.image} alt={car.model} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-xl">{car.year} {car.make} {car.model}</h3>
                <span className="bg-green-100 text-green-700 text-xs font-black px-2 py-1 rounded">SAVE ${(car.marketValue - car.price).toLocaleString()}</span>
              </div>
              <p className="text-[#002B5B] font-black text-2xl mb-4">${car.price.toLocaleString()}</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => onSave(car.id)} className="bg-slate-50 text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-slate-100">Save to Garage</button>
                <a href="#book-appt" className="bg-[#002B5B] text-white py-3 rounded-xl font-bold text-sm text-center hover:bg-blue-700">Book Appt</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredVehicles.length === 0 && (
        <p className="text-center py-20 text-slate-400 font-medium text-lg">No vehicles found matching your search.</p>
      )}
    </div>
  );
};

export default Inventory;
