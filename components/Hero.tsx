import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Twitter, Facebook, Linkedin } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const t = translations[lang].hero;

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleWhitepaperClick = () => {
    alert(t.downloadAlert);
  };

  const handleDiscoverClick = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pageUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const shareText = encodeURIComponent(t.shareText);
  const shareTitle = encodeURIComponent(t.shareTitle);

  return (
    <div 
      ref={ref} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80")',
                filter: 'brightness(0.4)'
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-road-dark/30 via-transparent to-road-dark" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium text-green-200">{t.networkLive}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight">
            {t.titleStart} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-road-accent via-road-purple to-road-green">
              {t.titleEnd}
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
                onClick={handleWhitepaperClick}
                className="px-8 py-4 bg-white text-road-dark font-bold text-lg rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 group"
            >
              {t.readWhitepaper}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
                onClick={handleDiscoverClick}
                className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Zap className="w-5 h-5 text-yellow-400" />
              {t.exploreSystem}
            </button>
          </div>
          
          <motion.div 
            className="flex justify-center items-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-sm text-gray-400">{t.shareOn}</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4 text-white" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${shareTitle}&summary=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={handleDiscoverClick}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;