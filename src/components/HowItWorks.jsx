import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Step = ({ icon, title, description, delayClass }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`flex flex-col items-center reveal ${delayClass} ${isVisible ? 'visible' : ''}`}>
      <div className="bg-gray-800 p-5 rounded-full mb-4 border border-gray-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-20 md:py-24 bg-gray-900/50 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 ref={ref} className={`opacity-90 text-3xl md:text-4xl font-bold mb-12 reveal ${isVisible ? 'visible' : ''}`}>
          Simples, Rápido e Seguro.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Step
            delayClass="reveal-delay-1"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>}
            title="1. Clique e Comece"
            description="Clique em 'Fazer Avaliação' no topo da tela para abrir a conversa direto no seu WhatsApp. Sem cadastros, sem apps."
          />
          <Step
            delayClass="reveal-delay-2"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
            title="2. Responda e Descubra"
            description="Nossa IA, com curadoria de imunologistas, fará algumas perguntas para entender seu perfil."
          />
          <Step
            delayClass="reveal-delay-3"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>}
            title="3. Receba seu Mapa"
            description="Em instantes, você recebe suas recomendações de vacinas de forma clara e justificada."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
