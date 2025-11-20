import React from 'react';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden bg-slate-900">
      <Hero />
      
      <div className="container mx-auto px-4 pb-20 flex-1">
        <ChatWidget />
      </div>
      
      <Footer />
    </main>
  );
};

export default App;