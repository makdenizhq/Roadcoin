import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import TokenVisual from './TokenVisual';
import { translations } from '../translations';
import { Language } from '../types';

interface TokenomicsProps {
  lang: Language;
}

const Tokenomics: React.FC<TokenomicsProps> = ({ lang }) => {
  const t = translations[lang].tokenomics;

  const data = [
    { name: t.chart.presale, value: 30, color: '#38bdf8' }, // sky-400
    { name: t.chart.rewards, value: 40, color: '#34d399' }, // emerald-400
    { name: t.chart.team, value: 15, color: '#818cf8' }, // indigo-400
    { name: t.chart.marketing, value: 10, color: '#f472b6' }, // pink-400
    { name: t.chart.liquidity, value: 5, color: '#94a3b8' }, // slate-400
  ];

  return (
    <section id="tokenomics" className="py-24 bg-road-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.title} <span className="text-road-green">{t.titleHighlight}</span></h2>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          
          {/* AI Token Visual */}
          <div className="order-2 md:order-1 col-span-1">
             <div className="text-center mb-6">
                 <h4 className="text-white font-bold mb-2">{t.visualTitle}</h4>
                 <p className="text-xs text-gray-500">{t.visualDesc}</p>
             </div>
             <TokenVisual lang={lang} />
          </div>

          {/* Chart */}
          <div className="h-[400px] w-full order-1 md:order-2 col-span-1 md:col-span-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Info */}
          <div className="space-y-6 order-3 col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">{t.detailsTitle}</h3>
            
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{t.symbol}</p>
                    <p className="text-xl font-bold text-road-accent">$ROAD</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{t.supply}</p>
                    <p className="text-xl font-bold text-white">1,000,000,000</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{t.blockchain}</p>
                    <p className="text-xl font-bold text-road-purple">Solana</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{t.contract}</p>
                    <p className="text-sm font-mono text-gray-300">0x71C...9B</p>
                </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 italic">
                {t.lockNote}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Tokenomics;