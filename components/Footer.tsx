import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} Coach E33 - Bac Pro MCV.</p>
          <p className="mt-1 text-slate-500">Conçu pour aider les élèves à réussir.</p>
        </div>
        <div className="flex gap-6 text-sm items-center">
          <a 
            href="mailto:fayollelpbort@gmail.com" 
            className="hover:text-white cursor-pointer transition-colors"
          >
            fayollelpbort@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};