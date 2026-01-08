
import React, { useState } from 'react';
import { MOCK_SALESMEN } from '../constants';

interface BookingProps {
  onConfirm?: () => void;
}

const Booking: React.FC<BookingProps> = ({ onConfirm }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const times = ['9:00 AM', '11:00 AM', '1:30 PM', '3:00 PM', '5:00 PM'];
  const [selectedDay, setSelectedDay] = useState('Wed');
  const [selectedTime, setSelectedTime] = useState('1:30 PM');
  const [selectedSalesman, setSelectedSalesman] = useState(MOCK_SALESMEN[0].id);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    const salesman = MOCK_SALESMEN.find(s => s.id === selectedSalesman);
    
    // Simulate DriveCentric CRM Sync
    console.log(`[DriveCentric] Lead Pushed: Appointment with ${salesman?.name} on ${selectedDay} @ ${selectedTime}`);
    alert(`Syncing appointment request to DriveCentric CRM for ${salesman?.name}...`);

    setConfirmed(true);
    onConfirm?.();

    // Open Google Calendar
    const eventTitle = `Test Drive at Lexdan with ${salesman?.name}`;
    const eventDetails = `Appointment for test drive. Salesman: ${salesman?.name}. Time: ${selectedTime}`;
    const location = "Lexdan Automotive, Maplewood, MN 55109";
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-black text-[#002B5B] mb-4">Experience Quality.</h2>
        <p className="text-slate-500 mb-12 max-w-xl mx-auto">Choose your salesman and skip the line. We'll have the keys ready for your arrival.</p>
        
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-[#002B5B] p-10 text-white">
            <h3 className="text-2xl font-bold mb-8">Select Your Expert</h3>
            <div className="space-y-4">
              {MOCK_SALESMEN.map(s => (
                <button 
                  key={s.id}
                  onClick={() => setSelectedSalesman(s.id)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-3xl border transition ${selectedSalesman === s.id ? 'bg-white/10 border-blue-400' : 'border-white/5 hover:bg-white/5'}`}
                >
                  <img src={s.avatar} className="w-12 h-12 rounded-full border-2 border-white/20" alt={s.name} />
                  <div className="text-left">
                    <p className="font-bold text-sm">{s.name}</p>
                    <p className="text-[10px] text-blue-300 uppercase tracking-widest">{s.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-10">
            {confirmed ? (
              <div className="h-full flex flex-col items-center justify-center py-10 animate-in zoom-in">
                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 text-4xl shadow-lg">🎉</div>
                <h4 className="text-2xl font-black text-[#002B5B] mb-2">You're All Set!</h4>
                <p className="text-slate-500 font-bold mb-4">Appointment with {MOCK_SALESMEN.find(s => s.id === selectedSalesman)?.name} <br/> on {selectedDay} at {selectedTime}</p>
                <p className="text-xs text-blue-500">Google Calendar invite opened in new tab.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-6 gap-2 mb-8">
                  {days.map(day => (
                    <button 
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`py-4 rounded-2xl text-xs font-bold transition ${selectedDay === day ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                  {times.map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl text-xs font-bold transition border ${selectedTime === time ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleConfirm}
                  className="w-full bg-[#002B5B] text-white py-5 rounded-2xl font-black shadow-xl shadow-blue-900/10 hover:scale-[1.02] transition"
                >
                  Book Appointment (+1,000 PTS)
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
