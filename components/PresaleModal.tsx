import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Check, AlertTriangle } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface PresaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const PresaleModal: React.FC<PresaleModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const t = translations[lang].presale;

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
        setError(t.errors.invalidEmail);
        return;
    }

    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const reset = () => {
      setStep('form');
      setEmail('');
      setError(null);
      onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl z-[101]"
          >
            <button
              onClick={reset}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 'form' ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-road-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-6 h-6 text-road-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
                <p className="text-gray-400 text-sm mb-6">
                  {t.desc}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text" // changed from email to text to validate manually for better UX control
                      value={email}
                      onChange={(e) => {
                          setEmail(e.target.value);
                          if(error) setError(null);
                      }}
                      placeholder={t.emailPlaceholder}
                      className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-road-accent transition-colors ${error ? 'border-red-500' : 'border-gray-700'}`}
                    />
                    {error && (
                        <div className="flex items-center gap-1 mt-2 text-red-500 text-xs text-left">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{error}</span>
                        </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={t.walletPlaceholder}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-road-accent transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-road-accent to-road-purple hover:opacity-90 text-white font-bold py-3 rounded-lg transition-all"
                  >
                    {t.button}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.successTitle}</h3>
                <p className="text-gray-400 text-sm mb-6">
                  {t.successDesc} {email}.
                </p>
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
                >
                  {t.close}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PresaleModal;