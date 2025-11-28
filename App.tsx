import React, { useState, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import SystemWorkflow from './components/SystemWorkflow';
import FeaturesSlider from './components/FeaturesSlider';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import PresaleModal from './components/PresaleModal';
import Partners from './components/Partners';
import { Language } from './types';

const App: React.FC = () => {
  const [isPresaleModalOpen, setIsPresaleModalOpen] = useState(false);
  const [lang, setLang] = useState<Language>('tr');

  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = 'devnet';
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-road-dark text-white selection:bg-road-accent selection:text-road-dark">
            <Navbar 
              onOpenPresale={() => setIsPresaleModalOpen(true)} 
              lang={lang} 
              setLang={setLang}
            />
            <main>
              <Hero lang={lang} />
              <ProblemSolution lang={lang} />
              <SystemWorkflow lang={lang} />
              <Partners lang={lang} />
              <FeaturesSlider 
                  onOpenPresale={() => setIsPresaleModalOpen(true)} 
                  lang={lang}
              />
              <Tokenomics lang={lang} />
              <Roadmap lang={lang} />
            </main>
            <Footer lang={lang} />
            <PresaleModal 
              isOpen={isPresaleModalOpen} 
              onClose={() => setIsPresaleModalOpen(false)} 
              lang={lang}
            />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;