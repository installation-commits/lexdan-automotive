
import { GoogleGenAI, Type, Modality, LiveServerMessage } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Audio Helper Functions (PCM Encoding/Decoding)
export const encodePCM = (data: Float32Array): string => {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  const bytes = new Uint8Array(int16.buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const decodePCM = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export async function decodeAudioBuffer(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

// 1. Live API: Conversational Voice Concierge (Gemini 2.5 Native Audio)
export const connectLiveConcierge = (callbacks: {
  onAudioChunk: (base64: string) => void;
  onInterrupted: () => void;
  onTranscription: (text: string) => void;
}) => {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks: {
      onopen: () => console.log("Live Concierge Connected"),
      onmessage: async (message: LiveServerMessage) => {
        const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (audio) callbacks.onAudioChunk(audio);
        if (message.serverContent?.interrupted) callbacks.onInterrupted();
        if (message.serverContent?.outputTranscription) {
          callbacks.onTranscription(message.serverContent.outputTranscription.text);
        }
      },
      onerror: (e) => console.error("Live Error", e),
      onclose: () => console.log("Live Closed"),
    },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
      },
      systemInstruction: 'You are the Lexdan Automotive Voice Concierge. Be friendly and helpful. Assist with inventory and financing.',
      inputAudioTranscription: {},
      outputAudioTranscription: {}
    },
  });
};

// 2. Chat with Pro: Complex reasoning + Search/Maps Grounding + Thinking Budget
export const chatWithPro = async (userMessage: string, history: any[], useThinking: boolean = true) => {
  const ai = getAI();
  try {
    const config: any = {
      systemInstruction: `You are the Lexdan Automotive Senior Advisor. 
      Use Google Search for latest news and Google Maps for local data.
      Always list URLs for search results. 
      If thinking is enabled, provide deep reasoning.`,
      tools: [{ googleSearch: {} }, { googleMaps: {} }],
    };

    if (useThinking) {
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config
    });
    
    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Pro Chat Error:", error);
    return { text: "Error connecting to advisor. Please try again.", grounding: [] };
  }
};

// 3. Audio Transcription (Gemini 3 Flash Preview)
export const transcribeAudio = async (base64Data: string, mimeType: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: "Transcribe the audio in this file accurately. Return only the transcription." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Transcription Error:", error);
    return "Could not transcribe audio.";
  }
};

// 4. Text-To-Speech (TTS) (Gemini 2.5 Flash Preview TTS)
export const speakMessage = async (text: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: `Say in a professional dealership tone: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error", error);
    return null;
  }
};

// 5. Image Generation (Gemini 3 Pro Image Preview)
export const generateCarImage = async (prompt: string, aspectRatio: string = "1:1", imageSize: string = "1K") => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: aspectRatio as any, imageSize: imageSize as any }
      }
    });
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

// 6. Image Editing (Gemini 2.5 Flash Image)
export const editVehicleImage = async (base64Data: string, mimeType: string, prompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: prompt }
        ]
      }
    });
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : null;
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};

// 7. Image & Video Understanding (Gemini 3 Pro Preview)
export const analyzeMedia = async (base64Data: string, mimeType: string, isVideo: boolean = false) => {
  const ai = getAI();
  try {
    const prompt = isVideo 
      ? "Analyze this video of a vehicle. Identify the model, movement, and condition. Provide a summary of key information including features visible."
      : "Analyze this vehicle image. Identify year, make, model if possible. List key features and pros/cons based on visual condition.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Analysis Error", error);
    return `Could not analyze ${isVideo ? 'video' : 'image'}.`;
  }
};

// 8. Veo Video Generation (Prompt or Image based)
export const generateVeoVideo = async (prompt: string, image?: { data: string, mime: string }, aspectRatio: '16:9' | '9:16' = '16:9') => {
  const ai = getAI();
  try {
    const config: any = { 
      model: 'veo-3.1-fast-generate-preview', 
      prompt, 
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio } 
    };
    if (image) {
      config.image = { imageBytes: image.data, mimeType: image.mime };
    }
    
    let operation = await ai.models.generateVideos(config);
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Veo Error", error);
    throw error;
  }
};

// 9. Fast AI Responses (Gemini 2.5 Flash Lite)
export const getVehicleQuickStats = async (vehicleInfo: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `Provide 3 quick facts about this vehicle: ${vehicleInfo}. Be concise.`,
    });
    return response.text;
  } catch (error) {
    return "Quality Lexdan import.";
  }
};

// 10. Vehicle Battle Verdict (Gemini 3 Flash Preview)
// Fix for Error in components/VehicleGames.tsx: Missing export getVehicleBattleStats
export const getVehicleBattleStats = async (v1Info: string, v2Info: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compare these two vehicles for a 'Battle of the Imports' game: ${v1Info} vs ${v2Info}. 
      Decide a winner based on typical reliability, resale value, and Lexdan Automotive high standards. 
      Be fun, punchy, and professional. Provide a clear 'Verdict'.`,
    });
    return response.text || "Both vehicles pass the Lexdan quality test!";
  } catch (error) {
    console.error("Battle Error", error);
    return "The comparison engine is recalibrating. Both vehicles are winners at Lexdan!";
  }
};
