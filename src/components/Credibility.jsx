import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Credibility = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-20 md:py-24 px-6 overflow-hidden">
      <div ref={ref} className={`max-w-3xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-90">Baseado em ciência, <span className="text-accent text-[1.7rem]">validado por especialistas.</span></h2>
        <p className="text-lg md:text-xl text-gray-400">
          O Vaccine<span className="text-accent">+</span> não é um "quiz" genérico. Nosso sistema processa suas informações com base nas diretrizes da Sociedade Brasileira de Imunizações (SBIm) e do Ministério da Saúde e revisadas por imunologistas.
        </p>
      </div>
    </section>
  );
};

export default Credibility;