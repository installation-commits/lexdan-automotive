
import React, { useState } from 'react';
import { generateCarImage, generateVeoVideo, editVehicleImage } from '../services/geminiService';

const CreativeLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gen' | 'video' | 'edit'>('gen');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [selectedFile, setSelectedFile] = useState<{data: string, mime: string} | null>(null);

  const handleProcess = async () => {
    setLoading(true);
    setResult(null);
    try {
      if (activeTab === 'gen') {
        const img = await generateCarImage(prompt, aspectRatio, imageSize);
        setResult(img);
      } else if (activeTab === 'edit') {
        if (!selectedFile) {
          alert("Please upload an image to edit.");
          setLoading(false);
          return;
        }
        const img = await editVehicleImage(selectedFile.data, selectedFile.mime, prompt);
        setResult(img);
      } else {
        const video = await generateVeoVideo(prompt, selectedFile || undefined, aspectRatio as any);
        setResult(video);
      }
    } catch (e) {
      alert("AI Process failed. Ensure your API key is correctly configured for these models.");
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile({ data: (reader.result as string).split(',')[1], mime: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#002B5B] mb-4 uppercase tracking-tight">Lexdan AI Creative Lab</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Generate, edit, or animate vehicles with Pro-grade Gemini & Veo models.</p>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          <div className="lg:w-1/3 p-10 border-r border-slate-100 bg-slate-50/50">
            <div className="flex space-x-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm">
              {(['gen', 'edit', 'video'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => { setActiveTab(tab); setResult(null); }}
                  className={`flex-1 py-3 rounded-xl font-black text-[10px] transition uppercase tracking-widest ${activeTab === tab ? 'bg-[#002B5B] text-white shadow-lg' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  {tab === 'gen' ? 'Generate' : tab === 'edit' ? 'Edit' : 'Video'}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {(activeTab === 'video' || activeTab === 'edit') && (
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">
                    {activeTab === 'edit' ? 'Source Image (Required)' : 'Reference Photo (Optional)'}
                  </label>
                  <div className="relative">
                    <input type="file" onChange={onFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-blue-400 transition">
                      <span className="text-xs font-bold text-slate-500">{selectedFile ? '✓ Media Attached' : 'Select Media File'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">
                  {activeTab === 'edit' ? 'Editing Instruction' : 'AI Prompt'}
                </label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={activeTab === 'gen' ? "A hyper-realistic 2026 Toyota Land Cruiser driving through mountain trails..." : activeTab === 'edit' ? "Change the car's color to candy red and add a sunset background..." : "The SUV accelerating on a wet highway with cinematic lighting..."}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-sm min-h-[120px] focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Aspect Ratio</label>
                  <select 
                    value={aspectRatio} 
                    onChange={(e) => setAspectRatio(e.target.value)} 
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-black appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="1:1">1:1 Square</option>
                    <option value="4:3">4:3 Standard</option>
                    <option value="16:9">16:9 Landscape</option>
                    <option value="9:16">9:16 Portrait</option>
                    <option value="21:9">21:9 Ultra-Wide</option>
                    <option value="3:4">3:4 Vertical</option>
                    <option value="2:3">2:3 Classic</option>
                    <option value="3:2">3:2 DSLR</option>
                  </select>
                </div>
                {activeTab === 'gen' && (
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Resolution</label>
                    <select 
                      value={imageSize} 
                      onChange={(e) => setImageSize(e.target.value)} 
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-black appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="1K">1K Quality</option>
                      <option value="2K">2K High-Res</option>
                      <option value="4K">4K Ultra-Res</option>
                    </select>
                  </div>
                )}
              </div>

              <button 
                onClick={handleProcess}
                disabled={loading || !prompt || (activeTab === 'edit' && !selectedFile)}
                className="w-full py-5 rounded-2xl font-black bg-[#002B5B] text-white hover:bg-blue-600 transition shadow-2xl disabled:bg-slate-200 disabled:shadow-none transform active:scale-[0.98] uppercase tracking-[0.2em] text-[11px]"
              >
                {loading ? 'Processing Vision...' : activeTab === 'gen' ? 'Generate Visual' : activeTab === 'edit' ? 'Apply Edit' : 'Create Video'}
              </button>
            </div>
          </div>

          <div className="flex-1 p-10 flex flex-col items-center justify-center bg-slate-50 relative group">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
              <span className="text-[200px] font-black rotate-12 -translate-x-1/2 -translate-y-1/2 block">AI</span>
            </div>
            {loading ? (
              <div className="text-center z-10">
                <div className="w-20 h-20 border-8 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-[#002B5B] font-black uppercase text-xs tracking-[0.3em] animate-pulse">Consulting Gemini Neural Engines...</p>
              </div>
            ) : result ? (
              <div className="animate-in zoom-in duration-700 flex flex-col items-center z-10">
                {activeTab !== 'video' ? (
                  <div className="relative shadow-2xl rounded-3xl overflow-hidden border-4 border-white bg-white">
                    <img src={result} className="max-w-full max-h-[500px]" alt="AI Work" />
                  </div>
                ) : (
                  <div className="relative shadow-2xl rounded-3xl overflow-hidden border-4 border-white bg-black">
                    <video src={result} controls autoPlay loop className="max-w-full max-h-[500px]" />
                  </div>
                )}
                <div className="flex space-x-4 mt-8">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = result;
                      link.download = `lexdan-creative-${Date.now()}.${activeTab === 'video' ? 'mp4' : 'png'}`;
                      link.click();
                    }}
                    className="bg-white text-[#002B5B] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition"
                  >
                    Download File
                  </button>
                  <button onClick={() => setResult(null)} className="text-slate-400 font-bold text-[10px] uppercase hover:text-slate-600 transition tracking-widest">Discard</button>
                </div>
              </div>
            ) : (
              <div className="text-center z-10 opacity-30">
                <div className="text-8xl mb-4">🎨</div>
                <p className="text-[#002B5B] font-black uppercase text-sm tracking-[0.4em]">Ready for Creation</p>
                <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-widest italic">Powered by Veo 3 & Gemini 3 Pro</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeLab;
