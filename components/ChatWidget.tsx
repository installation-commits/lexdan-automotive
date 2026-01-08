
import React, { useState, useRef, useEffect } from 'react';
import { chatWithPro } from '../services/geminiService';
import { MOCK_SALESMEN } from '../constants';

interface Message {
  role: 'user' | 'ai';
  text: string;
  grounding?: any[];
  isThinking?: boolean;
}

const ChatWidget: React.FC<{ selectedCar?: string }> = ({ selectedCar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'staff'>('ai');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm David from Lexdan. I can answer technical specs or connect you with our specialists. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Direct SMS Logic for Staff
  const startStaffChat = (salesman: any) => {
    const message = `Hi ${salesman.name}, I'm on the Lexdan site looking at the ${selectedCar || 'inventory'}. Can you help me?`;
    window.location.href = `sms:${salesman.phone}?body=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, activeTab]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const result = await chatWithPro(userMsg, history, useThinking);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: result.text, grounding: result.grounding, isThinking: useThinking }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[450px] h-[650px] rounded-[40px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header with Tab Switcher */}
          <div className="bg-[#002B5B] p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-black">L</div>
                <div>
                  <h4 className="font-black text-sm uppercase italic">Lexdan Concierge</h4>
                  <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest">Powered by Gemini & DriveCentric</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex bg-black/20 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'ai' ? 'bg-white text-[#002B5B]' : 'text-white/60'}`}
              >
                🤖 AI ADVISOR
              </button>
              <button 
                onClick={() => setActiveTab('staff')}
                className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'staff' ? 'bg-white text-[#002B5B]' : 'text-white/60'}`}
              >
                👤 TALK TO STAFF
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-slate-50">
            {activeTab === 'ai' ? (
              <div className="space-y-5">
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[90%] px-5 py-4 rounded-[24px] text-sm font-medium ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-[10px] font-black text-blue-400 animate-pulse uppercase tracking-widest">David is thinking...</div>}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-[11px] font-black text-slate-400 uppercase mb-4">Click a specialist to text them directly</p>
                {MOCK_SALESMEN.map(s => (
                  <button key={s.id} onClick={() => startStaffChat(s)} className="w-full bg-white p-4 rounded-2xl flex items-center border border-slate-100 hover:border-blue-500 transition-all shadow-sm group">
                    <img src={s.avatar} className="w-12 h-12 rounded-full object-cover mr-4" alt={s.name} />
                    <div className="text-left flex-1">
                      <p className="font-black text-slate-900 text-sm">{s.name}</p>
                      <p className="text-[10px] font-bold text-blue-600 uppercase">{s.role}</p>
                    </div>
                    <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse mr-2"></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area (Only for AI tab) */}
          {activeTab === 'ai' && (
            <div className="p-5 bg-white border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about inventory..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-14"
                />
                <button onClick={handleSend} className="absolute right-2 top-2 w-10 h-10 bg-[#002B5B] rounded-xl flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-[#002B5B] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
