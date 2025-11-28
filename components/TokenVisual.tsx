import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface TokenVisualProps {
    lang?: Language;
}

const TokenVisual: React.FC<TokenVisualProps> = ({ lang }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateToken = async () => {
    // Check if API key is available in the environment
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        setError("API Anahtarı bulunamadı.");
        return;
    }

    try {
      setLoading(true);
      setError(null);
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A futuristic 3D cryptocurrency coin design for "RoadCoin". The coin is gold and platinum with glowing cyan neon accents. It features a stylized tire track pattern embossed on the rim. The center has a holographic logo resembling a location pin combined with a rocket. High resolution, 8k render, cinematic studio lighting, dark background, photorealistic.',
            },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const url = `data:image/png;base64,${base64EncodeString}`;
            setImageUrl(url);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("Görüntü oluşturulamadı. Lütfen tekrar deneyin.");
      }

    } catch (err) {
      console.error(err);
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-generate on mount if not exists
    if (!imageUrl) {
        generateToken();
    }
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      <div className="absolute inset-0 bg-road-accent/10 rounded-full blur-2xl animate-pulse" />
      
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 bg-gray-900 flex items-center justify-center shadow-2xl shadow-road-accent/20 group">
        {loading ? (
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-road-accent animate-spin" />
                <span className="text-xs text-road-accent animate-pulse">Token Tasarlanıyor...</span>
            </div>
        ) : imageUrl ? (
            <>
                <img 
                    src={imageUrl} 
                    alt="Generated RoadCoin Token" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <button 
                    onClick={generateToken}
                    className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-road-accent"
                    title="Yeniden Üret"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </>
        ) : (
            <div className="text-center p-6">
                <p className="text-red-400 text-sm mb-4">{error || "Görsel yüklenemedi"}</p>
                <button 
                    onClick={generateToken}
                    className="px-4 py-2 bg-road-accent text-white rounded-lg text-sm hover:bg-sky-400"
                >
                    Tekrar Dene
                </button>
            </div>
        )}
      </div>
      
      {/* Decorative Orbit */}
      {!loading && imageUrl && (
        <div className="absolute inset-0 border border-road-accent/30 rounded-full animate-[spin_10s_linear_infinite]" />
      )}
    </div>
  );
};

export default TokenVisual;