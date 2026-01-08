
import React, { useState, useRef } from 'react';
import { connectLiveConcierge, decodePCM, decodeAudioBuffer, encodePCM, transcribeAudio } from '../services/geminiService';

const VoiceConcierge: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputCtx = new AudioContext({ sampleRate: 16000 });
      
      const sessionPromise = connectLiveConcierge({
        onAudioChunk: async (base64) => {
          if (!audioContextRef.current) return;
          const ctx = audioContextRef.current;
          nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
          const buffer = await decodeAudioBuffer(decodePCM(base64), ctx, 24000);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start(nextStartTimeRef.current);
          nextStartTimeRef.current += buffer.duration;
          sourcesRef.current.add(source);
          source.onended = () => sourcesRef.current.delete(source);
        },
        onInterrupted: () => {
          sourcesRef.current.forEach(s => s.stop());
          sourcesRef.current.clear();
          nextStartTimeRef.current = 0;
        },
        onTranscription: (text) => setTranscription(text)
      });

      const session = await sessionPromise;
      sessionRef.current = session;

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm = encodePCM(inputData);
        session.sendRealtimeInput({ media: { data: pcm, mimeType: 'audio/pcm;rate=16000' } });
      };
      source.connect(processor);
      processor.connect(inputCtx.destination);
      
      setIsActive(true);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Please enable microphone access to use the Voice Concierge.");
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    setIsActive(false);
    setTranscription('');
  };

  const handleAudioTranscription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsTranscribing(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const text = await transcribeAudio(base64, file.type);
      setTranscription(text);
      setIsTranscribing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {isActive && (
        <div className="bg-[#002B5B] p-7 rounded-[32px] shadow-2xl text-white w-80 mb-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center animate-pulse border-2 border-white/20">
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>
              </div>
              <div>
                <p className="font-black text-xs uppercase tracking-tight">AI Concierge</p>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
                  <p className="text-[9px] text-blue-300 uppercase tracking-widest font-black">Native Audio Live</p>
                </div>
              </div>
            </div>
            <button onClick={stopSession} className="text-white/40 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl min-h-[80px] border border-white/5">
            <p className="text-[11px] font-medium leading-relaxed italic opacity-90">
              {transcription || "Say something to David..."}
            </p>
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest mt-4 text-blue-400 opacity-60 text-center">Connected to Lexdan Secure Link</p>
        </div>
      )}

      <div className="flex items-center space-x-3">
        {/* Quick Transcription Affordance */}
        <label className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#002B5B] cursor-pointer hover:bg-slate-50 transition border border-slate-100 relative group">
          <input type="file" accept="audio/*" className="hidden" onChange={handleAudioTranscription} />
          {isTranscribing ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
          )}
          <span className="absolute right-14 bg-white text-[#002B5B] px-3 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md border border-slate-100 pointer-events-none uppercase tracking-widest">Transcribe File</span>
        </label>

        <button 
          onClick={isActive ? stopSession : startSession}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition transform active:scale-95 relative group ${isActive ? 'bg-red-500' : 'bg-[#002B5B] hover:bg-blue-600'}`}
        >
          {isActive && <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></div>}
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
          <span className="absolute right-20 bg-white text-[#002B5B] px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg border border-slate-100 pointer-events-none uppercase tracking-widest">
            {isActive ? 'Stop Listening' : 'Voice Concierge'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default VoiceConcierge;
