import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import { Language } from '../types';

interface RoadmapProps {
  lang: Language;
}

const Roadmap: React.FC<RoadmapProps> = ({ lang }) => {
  const t = translations[lang].roadmap;

  const phases = [
    {
      phase: "1",
      date: "Q3 2024",
      active: true,
      title: t.phases[0].title,
      items: t.phases[0].items
    },
    {
      phase: "2",
      date: "Q4 2024",
      active: false,
      title: t.phases[1].title,
      items: t.phases[1].items
    },
    {
      phase: "3",
      date: "Q1 2025",
      active: false,
      title: t.phases[2].title,
      items: t.phases[2].items
    },
    {
      phase: "4",
      date: "Q2 2025",
      active: false,
      title: t.phases[3].title,
      items: t.phases[3].items
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
            <span className="text-road-purple font-bold tracking-widest uppercase">{t.badge}</span>
            <h2 className="text-4xl font-bold mt-2">{t.title}</h2>
        </div>

        <div className="relative">
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 w-full md:w-auto">
                    <div className={`p-8 rounded-2xl border ${phase.active ? 'bg-gray-800/80 border-road-accent shadow-[0_0_30px_rgba(56,189,248,0.1)]' : 'bg-gray-800/30 border-gray-700'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${phase.active ? 'bg-road-accent text-road-dark' : 'bg-gray-700 text-gray-400'}`}>
                                    Phase {phase.phase}
                                </span>
                                <span className="ml-3 text-gray-500 text-sm font-mono">{phase.date}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                        <ul className="space-y-2">
                            {phase.items.map((item, i) => (
                                <li key={i} className="flex items-center text-gray-400 text-sm">
                                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${phase.active ? 'bg-road-accent' : 'bg-gray-600'}`} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Center Node */}
                <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border-4 border-gray-800">
                    <div className={`w-4 h-4 rounded-full ${phase.active ? 'bg-road-accent animate-pulse' : 'bg-gray-600'}`} />
                </div>

                {/* Empty Side for Layout Balance */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;