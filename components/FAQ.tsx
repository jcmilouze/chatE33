import React from 'react';
import { Plus } from 'lucide-react';

interface FAQProps {
  onOpenChat: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenChat }) => {
  const questions = [
    "C'est quoi la différence entre option A et B pour l'E33 ?",
    "Combien de pages doit faire le dossier ?",
    "Est-ce que je peux utiliser une tablette à l'oral ?",
    "Quelles annexes sont obligatoires ?"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Questions fréquentes</h2>
          <p className="text-slate-500 mt-2">Les autres élèves demandent souvent ça :</p>
        </div>

        <div className="grid gap-4">
          {questions.map((q, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md cursor-pointer transition-all group"
              onClick={onOpenChat}
            >
              <span className="font-medium text-slate-700">{q}</span>
              <div className="bg-white p-1 rounded-full border border-slate-200 group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-colors">
                <Plus className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-slate-600 mb-4">Ta question n'est pas dans la liste ?</p>
          <button onClick={onOpenChat} className="text-indigo-600 font-bold hover:underline">
            Pose-la directement au bot →
          </button>
        </div>
      </div>
    </section>
  );
};