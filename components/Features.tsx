import React from 'react';
import { FileText, Mic, Lightbulb, Target } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    title: "Ton Dossier E33",
    description: "Structure, contenu, méthodologie... Le bot t'aide à ne rien oublier pour être conforme au référentiel."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Idées d'actions",
    description: "En panne d'inspiration pour la fidélisation ? Trouve des idées concrètes adaptées à ton lieu de stage (PFMP)."
  },
  {
    icon: <Mic className="w-8 h-8 text-purple-500" />,
    title: "L'Oral & l'Entretien",
    description: "Entraîne-toi à répondre aux questions du jury. Anticipe les pièges et gagne en confiance."
  },
  {
    icon: <Target className="w-8 h-8 text-red-500" />,
    title: "Comprendre le Barème",
    description: "Savoir exactement ce qui rapporte des points. Pas de jargon, juste des conseils clairs."
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tout pour assurer le jour J
          </h2>
          <p className="text-lg text-slate-600">
            L'épreuve E33 demande de la méthode. Ton assistant virtuel est programmé spécialement pour le Bac Pro MCV.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100 group">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};