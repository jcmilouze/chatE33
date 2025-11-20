import React from 'react';
import { ArrowRight, HelpCircle, FolderOpen, Presentation } from 'lucide-react';

interface PathwaysProps {
  onOpenChat: () => void;
}

export const Pathways: React.FC<PathwaysProps> = ({ onOpenChat }) => {
  const pathways = [
    {
      title: "Je ne comprends rien à l'épreuve",
      subtitle: "On reprend les bases ensemble.",
      icon: <HelpCircle className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-700",
      action: "Explique-moi l'E33"
    },
    {
      title: "Je dois faire mon dossier",
      subtitle: "Construction pas à pas.",
      icon: <FolderOpen className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-700",
      action: "Aide dossier E33"
    },
    {
      title: "Je prépare mon oral",
      subtitle: "Simulation et questions types.",
      icon: <Presentation className="w-6 h-6" />,
      color: "bg-green-100 text-green-700",
      action: "Entraînement oral"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Par où commencer ?</h2>
            <p className="text-slate-600 text-lg">
              Choisis ta situation actuelle, le bot te guidera vers la solution.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pathways.map((path, index) => (
            <button 
              key={index}
              onClick={onOpenChat}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left border border-slate-100 flex flex-col h-full group"
            >
              <div className={`${path.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                {path.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{path.title}</h3>
              <p className="text-slate-500 mb-6 flex-1">{path.subtitle}</p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                Lancer le guide <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};