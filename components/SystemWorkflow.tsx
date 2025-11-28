import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wallet, ArrowRight, BrainCircuit, CheckCircle, TrendingUp } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface SystemWorkflowProps {
  lang: Language;
}

const SystemWorkflow: React.FC<SystemWorkflowProps> = ({ lang }) => {
  const t = translations[lang].systemWorkflow;

  const steps = [
    {
      icon: <Cpu className="w-10 h-10 text-white" />,
      title: t.steps[0].title,
      desc: t.steps[0].desc,
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <BrainCircuit className="w-10 h-10 text-white" />,
      title: t.steps[1].title,
      desc: t.steps[1].desc,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Wallet className="w-10 h-10 text-white" />,
      title: t.steps[2].title,
      desc: t.steps[2].desc,
      details: t.steps[2].details,
      stakingInfo: t.steps[2].stakingInfo,
      color: "from-emerald-400 to-green-600"
    }
  ];

  return (
    <section className="py-24 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-road-accent to-road-purple">{t.titleHighlight}</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-8 rounded-3xl hover:border-road-accent transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] h-full flex flex-col">
                
                {/* Floating Number */}
                <div className="absolute -top-6 left-8 text-6xl font-black text-gray-800 select-none group-hover:text-gray-700 transition-colors">
                    0{index + 1}
                </div>

                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-6 mx-auto md:mx-0 relative z-10 transform group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 text-center md:text-left">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left">
                  {step.desc}
                </p>
                
                {step.details && (
                  <ul className="mt-4 space-y-2 text-center md:text-left">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {step.stakingInfo && (
                  <div className="mt-4 pt-4 border-t border-gray-700/50 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 mb-2 text-center md:text-left justify-center md:justify-start">
                        <TrendingUp className="w-5 h-5 text-road-accent" />
                        <h4 className="font-bold text-white">{step.stakingInfo.title}</h4>
                    </div>
                    <ul className="space-y-1 text-center md:text-left">
                      {step.stakingInfo.list.map((item, i) => (
                        <li key={i} className="text-xs text-gray-400 bg-gray-900/50 px-2 py-1 rounded-md">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mobile Arrow */}
                {index < 2 && (
                    <div className="md:hidden flex justify-center mt-6">
                        <ArrowRight className="text-gray-600 animate-bounce" />
                    </div>
                )}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default SystemWorkflow;