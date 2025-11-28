import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Database, ShieldCheck, Coins } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface ProblemSolutionProps {
  lang: Language;
}

const ProblemSolution: React.FC<ProblemSolutionProps> = ({ lang }) => {
  const t = translations[lang].problemSolution;

  const solutions = [
    {
      icon: <Coins className="w-6 h-6 text-road-accent" />,
      title: t.solutions[0].title,
      desc: t.solutions[0].desc
    },
    {
      icon: <Database className="w-6 h-6 text-road-accent" />,
      title: t.solutions[1].title,
      desc: t.solutions[1].desc
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-road-accent" />,
      title: t.solutions[2].title,
      desc: t.solutions[2].desc
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left: The Problem */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-400 font-bold tracking-wider text-sm uppercase mb-2 block">{t.currentStatus}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 whitespace-pre-line">{t.problemTitle}</h2>
          
          <div className="space-y-6">
            {t.problems.map((prob, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                <p className="text-gray-300 font-medium">{prob}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: The Solution */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
           {/* Glow Effect */}
           <div className="absolute inset-0 bg-road-accent/20 blur-[100px] rounded-full z-0" />

           <div className="relative z-10 bg-road-dark border border-gray-700 p-8 rounded-3xl shadow-2xl">
            <span className="text-road-accent font-bold tracking-wider text-sm uppercase mb-2 block">{t.solutionBadge}</span>
            <h2 className="text-3xl font-bold mb-8">{t.solutionTitle}</h2>

            <div className="space-y-8">
              {solutions.map((sol, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-road-accent/10 flex items-center justify-center">
                    {sol.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{sol.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{sol.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-800 flex items-center gap-4">
               <CheckCircle className="w-5 h-5 text-green-500" />
               <p className="text-sm text-gray-400">{t.audit}</p>
            </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSolution;