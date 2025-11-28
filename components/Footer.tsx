import React, { useState } from 'react';
import { Twitter, Send, Github, Linkedin, Rocket, AlertCircle } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const t = translations[lang].footer;

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubscribe = () => {
    setError(null);
    if (!email) {
        setError(t.errors.required);
        return;
    }
    if (!validateEmail(email)) {
        setError(t.errors.invalidEmail);
        return;
    }
    
    // Simulate API call
    alert(`${email} ${t.success}`);
    setEmail('');
  };

  return (
    <footer className="bg-black py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-road-accent" />
                <span className="text-2xl font-bold text-white">RoadCoin</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t.desc}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t.platform}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-road-accent">{t.links.download}</a></li>
                <li><a href="#" className="hover:text-road-accent">{t.links.staking}</a></li>
                <li><a href="#" className="hover:text-road-accent">{t.links.nft}</a></li>
                <li><a href="#" className="hover:text-road-accent">{t.links.dao}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t.resources}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-road-accent">{t.links.whitepaper}</a></li>
                <li><a href="#" className="hover:text-road-accent">{t.links.audit}</a></li>
                <li><a href="#" className="hover:text-road-accent">{t.links.brand}</a></li>
                <li><a href="#" className="hover:text-road-accent">{t.links.faq}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t.community}</h4>
            <div className="flex gap-4">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-road-accent hover:text-white transition-colors text-gray-400">
                    <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-road-accent hover:text-white transition-colors text-gray-400">
                    <Send className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-road-accent hover:text-white transition-colors text-gray-400">
                    <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-road-accent hover:text-white transition-colors text-gray-400">
                    <Linkedin className="w-5 h-5" />
                </a>
            </div>
            <div className="mt-6">
                <p className="text-xs text-gray-600">{t.subscribe}</p>
                <div className="mt-2 flex">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if(error) setError(null);
                        }}
                        placeholder={t.placeholder} 
                        className={`bg-gray-800 text-white text-sm px-4 py-2 rounded-l-lg outline-none w-full border ${error ? 'border-red-500' : 'border-gray-700'} focus:border-road-accent`} 
                    />
                    <button 
                        onClick={handleSubscribe}
                        className="bg-road-accent text-white px-4 py-2 rounded-r-lg font-bold hover:bg-road-accent/80"
                    >
                        →
                    </button>
                </div>
                {error && (
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>&copy; 2024 {t.rights}</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-gray-400">{t.links.privacy}</a>
                <a href="#" className="hover:text-gray-400">{t.links.terms}</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;