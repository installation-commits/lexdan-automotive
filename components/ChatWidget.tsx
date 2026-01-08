
import React, { useState, useRef, useEffect } from 'react';
import { chatWithPro } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
  grounding?: any[];
  isThinking?: boolean;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm David from Lexdan Automotive. I see you're looking for high-quality Japanese imports. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
    setMessages(prev => [...prev, { 
      role: 'ai', 
      text: result.text, 
      grounding: result.grounding,
      isThinking: useThinking
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[450px] h-[650px] rounded-[40px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="bg-[#002B5B] p-7 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-black text-lg border-2 border-white/20">D</div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#002B5B] rounded-full"></div>
              </div>
              <div>
                <h4 className="font-black text-sm leading-tight uppercase tracking-tight">David | Senior Advisor</h4>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-blue-300 uppercase font-black tracking-widest">Active Assistant</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition transform active:scale-90 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.isThinking && m.role === 'ai' && (
                  <span className="text-[9px] font-black text-blue-600 mb-1 uppercase tracking-widest ml-1">✓ Deep Reasoning Active</span>
                )}
                <div className={`max-w-[90%] px-5 py-4 rounded-[28px] text-sm leading-relaxed shadow-sm font-medium ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {m.text}
                </div>
                {m.grounding && m.grounding.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.grounding.map((chunk, idx) => {
                      const url = chunk.web?.uri || chunk.maps?.uri;
                      const title = chunk.web?.title || chunk.maps?.title || "Data Source";
                      return url ? (
                        <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-white text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 font-black hover:bg-blue-50 transition shadow-sm uppercase tracking-tighter">
                          🔗 {title.length > 30 ? title.substring(0, 30) + '...' : title}
                        </a>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 px-5 py-4 rounded-3xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-slate-100">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between px-2">
                <button 
                  onClick={() => setUseThinking(!useThinking)}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-full border transition-all ${useThinking ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                >
                  <span className="text-xs">🧠</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{useThinking ? 'Thinking On' : 'Quick Mode'}</span>
                </button>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Grounding: Search & Maps</span>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about Toyota availability..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16 font-medium"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2.5 top-2.5 w-12 h-12 bg-[#002B5B] rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 transition shadow-lg transform active:scale-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#002B5B] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition transform active:scale-95 group relative"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-white animate-pulse"></div>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
