import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import { Language } from '../types';

interface PartnersProps {
    lang: Language;
}

const Partners: React.FC<PartnersProps> = ({ lang }) => {
    const t = translations[lang].partners;

    const partners = [
        { name: "Solana Foundation", color: "#9945FF" },
        { name: "Chainlink", color: "#375BD2" },
        { name: "Tesla API", color: "#E31937" },
        { name: "Mapbox", color: "#4264fb" },
        { name: "Binance Labs", color: "#F0B90B" },
        { name: "Sequoia", color: "#2E8B57" }
    ];

    return (
        <section className="py-16 bg-black border-y border-gray-900">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
                    <p className="text-gray-500 text-sm">{t.subtitle}</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, color: partner.color }}
                            className="text-gray-600 font-bold text-xl md:text-2xl cursor-default transition-colors duration-300 flex items-center gap-2"
                        >
                            {/* Placeholder Icon */}
                            <div className="w-8 h-8 rounded-full bg-current opacity-20" />
                            {partner.name}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;