import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface HeroProps {
  // No props needed anymore
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative bg-slate-900 overflow-hidden pt-12 pb-6">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
          
        <div className="inline-flex items-center gap-2 bg-indigo-900/50 text-indigo-200 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-700/50 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Coach E33 en ligne
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Réussis ton épreuve <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            E33 sans stress.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Fidélisation, relation client, dossier, oral... Le Coach répond à tes questions instantanément.
        </p>

        <div className="flex justify-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Bac Pro MCV</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Option A & B</span>
          </div>
        </div>
      </div>
    </section>
  );
};