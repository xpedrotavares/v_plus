import React from 'react';
import Img from '../assets/imagem-1.png'

const Hero = () => {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center text-center p-6 pt-20">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          Sua saúde, <span className="text-accent">potencializada.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Descubra, em minutos, o mapa de imunização personalizado que seu corpo precisa para performar no seu máximo. De forma gratuita e inteligente, direto no seu WhatsApp.
        </p>
        <a
          href="#cta-final"
          className="inline-block bg-accent text-white font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300"
        >
          🚀 Iniciar Avaliação Inteligente
        </a>
        <div className="relative w-full  rounded-[3rem] overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex items-center justify-center">
          {/* Aqui você vai colocar sua imagem */}
          <img
            src="/assets/imagem-1.png" // Seu caminho da imagem
            alt="Exemplo de interface do WhatsApp"
            className="w-full h-full object-cover rounded-[2.5rem]" // Ajuste o border-radius interno
          />
          {/* Texto sobreposto com efeito glassmorphism (opcional, como no seu print) */}
          {/* <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-white/20 backdrop-blur-sm text-white text-lg font-semibold">
            Use seu Itaú<br/>No WhatsApp
          </div> */}
        </div>
      </div>

    </section>
  );
};

export default Hero;