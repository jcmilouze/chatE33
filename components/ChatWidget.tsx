import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Bot } from 'lucide-react';
import { Message, N8nResponse } from '../types';

// URL de l'image de fond.
const CHAT_BACKGROUND_IMAGE = "https://filedn.eu/l2dkKFuRGueFx6uQAnQW97B/site%20e33/chat%20bot.jpeg";

interface ChatWidgetProps {}

// Nouvelle URL correcte pour le webhook n8n
const WEBHOOK_URL = 'https://n8n.bessacvps.fr/webhook/5e56a263-3a40-44bd-bc9d-1cfb3bc2a87d/chat';

const SYSTEM_INSTRUCTIONS = `
IMPORTANT - RESPECTE STRICTEMENT CES CONSIGNES DE FORMATAGE :

Formate toujours ta réponse en Markdown ainsi :

1. 1 courte phrase d’introduction.
2. Une liste à puces avec - pour les idées ou étapes importantes.
3. Des phrases courtes (1 à 2 lignes max par puce).
4. Termine par une question de relance en une phrase.

Mise en forme :
- Utilise le gras pour mettre en avant les mots importants.
- Tu peux ajouter quelques emojis pertinents pour rendre la lecture plus agréable (1 ou 2 par paragraphe maximum).
- Ne mets jamais tout le texte sur une seule ligne : utilise des retours à la ligne pour séparer les paragraphes et les listes.

Contenu :
- Si l’utilisateur demande des idées d’actions, propose 3 à 6 idées concrètes sous forme de liste.
- Si l’utilisateur demande une définition, donne une définition courte + un exemple appliqué au commerce / relation client.

Pour chaque réponse, termine par une question courte du type :
“Souhaites‑tu un exemple appliqué à un magasin physique ? 🙂”
“Veux‑tu que je t’aide à construire un plan ?”
“Tu veux qu’on fasse un exemple chiffré ensemble ?”
`;

export const ChatWidget: React.FC<ChatWidgetProps> = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      text: "Bonjour ! Je suis ton assistant pédagogique virtuel 🤖.\n\n🔒 Confidentialité :\n\nNos échanges sont utilisés uniquement pour t'aider dans tes révisions.\n\nMerci de ne pas écrire d'informations personnelles (ton nom complet, adresse, mots de passe) dans ce chat.\n\nLes réponses sont générées par une IA et peuvent parfois être imprécises, pense à vérifier avec tes cours !\n\nPose-moi ta question sur le E33 ou la relation client !",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstMessage = useRef(true);

  const getSessionId = () => {
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('chat_session_id', sessionId);
    }
    return sessionId;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToApi = async (text: string) => {
    setIsLoading(true);
    try {
      const sessionId = getSessionId();
      
      // On injecte les consignes système avec le premier message de la session (ou après un refresh)
      let apiInput = text;
      if (isFirstMessage.current) {
        apiInput = `${SYSTEM_INSTRUCTIONS}\n\n---\nQuestion de l'élève : ${text}`;
        isFirstMessage.current = false;
      }
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: apiInput, sessionId: sessionId }),
      });

      if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

      const data: N8nResponse = await response.json();
      
      let botResponseText = "Je n'ai pas compris la réponse du serveur.";
      if (Array.isArray(data)) {
          const firstItem = data[0];
          if (firstItem) {
              botResponseText = firstItem.output || firstItem.text || firstItem.response || JSON.stringify(firstItem);
          }
      } else {
          botResponseText = data.output || data.text || data.response || botResponseText;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oups ! J'ai du mal à joindre le serveur. Vérifie ta connexion internet.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const text = inputValue;
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    await sendMessageToApi(text);
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl border border-slate-700 flex flex-col h-[600px] md:h-[700px] overflow-hidden relative"
      style={{
        backgroundImage: `url(${CHAT_BACKGROUND_IMAGE})`,
        backgroundSize: 'contain', // Affiche l'image entière sans la couper
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0f172a' // Couleur de fond (slate-900) pour remplir les espaces vides
      }}
    >
      {/* Overlay sombre pour la lisibilité - ajusté pour laisser voir le robot */}
      <div className="absolute inset-0 bg-slate-900/75 z-0"></div>

      {/* Header */}
      <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex items-center justify-between px-6 relative z-10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg relative shadow-lg shadow-indigo-500/20">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Coach E33</h3>
            <p className="text-xs text-slate-400">Assistant virtuel intelligent</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          En ligne
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide relative z-10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-2xl p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-md whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-700 text-slate-100 border border-slate-600 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start w-full animate-pulse">
             <div className="bg-slate-700 text-slate-400 p-4 rounded-2xl rounded-tl-none border border-slate-600 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Analyse en cours...</span>
             </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Controls Area */}
      <div className="bg-slate-900/80 p-4 border-t border-slate-700 relative z-10 backdrop-blur-md">
        {/* Input */}
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pose ta question ici..."
            className="flex-1 bg-slate-800/80 text-white placeholder-slate-500 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700 transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-900/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};