import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, AlertTriangle, Leaf, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface FeaturesSliderProps {
    onOpenPresale?: () => void;
    lang: Language;
}

const FeaturesSlider: React.FC<FeaturesSliderProps> = ({ onOpenPresale, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[lang].features;

  const slidesData = [
    { icon: "Car", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { icon: "AlertTriangle", image: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
    { icon: "Leaf", image: "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }
  ];

  const slides = slidesData.map((data, index) => ({
      ...data,
      id: index + 1,
      title: t.slides[index].title,
      description: t.slides[index].description
  }));

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-8 h-8 text-white" />;
      case 'AlertTriangle': return <AlertTriangle className="w-8 h-8 text-white" />;
      case 'Leaf': return <Leaf className="w-8 h-8 text-white" />;
      default: return <BarChart3 className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section id="earn" className="py-24 bg-road-dark relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-road-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-road-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.title} <span className="text-road-accent">{t.titleHighlight}</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.description}</p>
        </div>

        <div className="relative h-[500px] w-full max-w-5xl mx-auto bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                <img 
                    src={slides[currentIndex].image} 
                    alt={slides[currentIndex].title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/90 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-gray-900/80 backdrop-blur-sm md:bg-transparent">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-road-accent to-road-purple mb-6 shadow-lg shadow-road-accent/20">
                  {getIcon(slides[currentIndex].icon)}
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-white">{slides[currentIndex].title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {slides[currentIndex].description}
                </p>

                <button 
                  onClick={() => onOpenPresale && onOpenPresale()}
                  className="self-start px-6 py-3 border border-road-accent text-road-accent hover:bg-road-accent hover:text-white rounded-lg transition-all font-medium"
                >
                  {t.startNow}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-6 right-6 flex gap-4 z-20">
            <button 
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all text-white"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={nextSlide}
                className="p-3 rounded-full bg-road-accent hover:bg-sky-400 border border-transparent transition-all text-white shadow-lg"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-8 left-8 flex gap-2 z-20">
            {slides.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? 'w-8 bg-road-accent' : 'w-2 bg-gray-600'
                    }`}
                />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSlider;