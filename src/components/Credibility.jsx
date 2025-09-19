import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Credibility = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-20 md:py-24 px-6 overflow-hidden">
      <div ref={ref} className={`max-w-3xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Baseado em ciência, validado por especialistas.</h2>
        <p className="text-lg md:text-xl text-gray-400">
          O Vaccine+ não é um "quiz" genérico. Nosso sistema processa suas informações com base nas diretrizes da Sociedade Brasileira de Imunizações (SBIm) e do Ministério da Saúde.
        </p>
        <div className="flex justify-center items-center gap-8 mt-8 opacity-60">
          <p className="font-semibold text-lg">SBIm</p>
          <p className="font-semibold text-lg">PNI / MS</p>
        </div>
      </div>
    </section>
  );
};

export default Credibility;