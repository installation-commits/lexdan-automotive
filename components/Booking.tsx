
import React, { useState } from 'react';
import { MOCK_SALESMEN } from '../constants';

interface BookingProps {
  onConfirm?: () => void;
}

const Booking: React.FC<BookingProps> = ({ onConfirm }) => {
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const selectedStaff = MOCK_SALESMEN.find(s => s.id === selectedStaffId);
  const availableDays = selectedStaff ? Object.keys(selectedStaff.schedule) : [];
  const availableTimes = selectedStaff && selectedDay ? selectedStaff.schedule[selectedDay] : [];

  const handleBook = () => {
    setConfirmed(true);
    onConfirm?.();
  };

  return (
    <section id="book-appt" className="py-24 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-2">
            VIP <span className="text-blue-500">Access</span>
          </h2>
          <p className="text-slate-400">Skip the lot walk. Book a dedicated time with our senior staff.</p>
        </div>

        {confirmed ? (
           <div className="bg-[#E11D48] rounded-[40px] p-12 text-center animate-in zoom-in text-white shadow-2xl shadow-red-900/50">
             <div className="text-6xl mb-6">🎉</div>
             <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Confirmed!</h3>
             <p className="text-lg font-medium mb-8">
               You are booked with <span className="font-black border-b-2 border-white">{selectedStaff?.name}</span> on {selectedDay} at {selectedTime}.
             </p>
             <button className="bg-white text-red-600 px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-100">
               Add to Calendar
             </button>
             <p className="text-xs mt-6 opacity-80">SMS Confirmation sent to your profile.</p>
           </div>
        ) : (
          <div className="bg-slate-900 rounded-[40px] border border-slate-700 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Staff Selection */}
            <div className="lg:w-1/3 border-r border-slate-700 p-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">1. Select Specialist</h3>
              <div className="space-y-4">
                {MOCK_SALESMEN.map(staff => (
                  <button
                    key={staff.id}
                    onClick={() => { setSelectedStaffId(staff.id); setSelectedDay(null); setSelectedTime(null); }}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl border transition-all ${selectedStaffId === staff.id ? 'bg-blue-600 border-blue-500 shadow-lg' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
                  >
                    <img src={staff.avatar} className="w-12 h-12 rounded-full border-2 border-slate-500" alt={staff.name} />
                    <div className="text-left">
                      <p className="text-white font-bold">{staff.name}</p>
                      <p className="text-slate-400 text-xs uppercase">{staff.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Selection */}
            <div className="flex-1 p-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">2. Select Time</h3>
              
              {!selectedStaff ? (
                <div className="h-full flex items-center justify-center text-slate-600 text-sm font-bold">
                  Select a specialist to view availability.
                </div>
              ) : (
                <div className="animate-in fade-in">
                  {/* Days */}
                  <div className="flex space-x-3 mb-8">
                    {availableDays.map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-6 py-3 rounded-lg font-black text-sm uppercase transition ${selectedDay === day ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  {/* Times */}
                  {selectedDay && (
                    <div className="grid grid-cols-3 gap-4 mb-10">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 border rounded-lg text-sm font-bold transition ${selectedTime === time ? 'border-blue-500 text-blue-400 bg-blue-900/20' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}

                  <button 
                    disabled={!selectedTime}
                    onClick={handleBook}
                    className="w-full bg-[#E11D48] text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    Confirm Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Booking;
