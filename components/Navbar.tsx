import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { translations } from '../translations';
import { Language } from '../types';

interface NavbarProps {
  onOpenPresale: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const WalletButton: React.FC = () => {
    const { connected, publicKey } = useWallet();
    const { setVisible } = useWalletModal();

    if (!connected || !publicKey) {
        return <WalletMultiButton />;
    }

    const shortAddress = `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`;

    return (
        <button
            onClick={() => setVisible(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 border-2 border-green-500/50 rounded-full text-white font-bold hover:bg-green-500/20 transition-all text-sm"
        >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>{shortAddress}</span>
        </button>
    );
};


const Navbar: React.FC<NavbarProps> = ({ onOpenPresale, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang].navbar;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'tr' ? 'en' : 'tr');
  };

  const navLinks = [
    { name: t.howItWorks, href: '#how-it-works' },
    { name: t.earn, href: '#earn' },
    { name: t.tokenomics, href: '#tokenomics' },
    { name: t.roadmap, href: '#roadmap' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-road-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-road-accent to-road-purple p-2 rounded-lg group-hover:scale-110 transition-transform">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            RoadCoin
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-road-accent transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-bold">{lang.toUpperCase()}</span>
          </button>

          <WalletButton />
          
          <button 
            onClick={onOpenPresale}
            className="px-6 py-2.5 bg-road-accent hover:bg-sky-400 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer"
          >
            {t.joinPresale}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
             <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-gray-300 hover:text-white"
            >
                <span className="text-sm font-bold">{lang.toUpperCase()}</span>
            </button>
            <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-road-dark border-b border-gray-800"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-road-accent text-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-4">
                <WalletButton />
                <button 
                  onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenPresale();
                  }}
                  className="w-full px-6 py-3 bg-road-accent text-white font-bold rounded-lg"
                >
                  {t.joinPresale}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;