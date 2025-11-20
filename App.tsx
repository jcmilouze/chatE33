import React from 'react';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden bg-slate-900">
      {/* Bandeau d'avertissement fiabilité */}
      <div className="bg-amber-600/90 text-white px-4 py-2 text-center text-sm font-medium shadow-md relative z-50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <span>⚠️</span>
          <p>
            Attention : Ce coach est un robot. L'humain sera toujours plus fiable que l'IA. En cas de doute, valide avec ton enseignant.
          </p>
        </div>
      </div>

      <Hero />
      
      <div className="container mx-auto px-4 pb-20 flex-1">
        <ChatWidget />
      </div>
      
      <Footer />
    </main>
  );
};

export default App;