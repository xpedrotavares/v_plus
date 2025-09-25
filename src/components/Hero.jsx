import React from 'react';
import Img from '../assets/imagem_hero.png'
import ShinyText from './ShinyText';
import AnimatedArrow from './AnimatedArrow';
const Hero = () => {
  return (
    <section className="hero-bg min-h-[calc(100vh-70px)] flex items-center justify-center text-center p-4 pt-16 inset-shadow-sm inset-shadow-indigo-100">
      <div className="max-w-3xl space-y-6 pt-5">
        <div className="relative w-full h-[19rem] rounded-[1.5rem] overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md flex items-center justify-center" >
          {/* Aqui você vai colocar sua imagem */}
          <img
            src="/assets/imagem_hero.png" // Seu caminho da imagem
            alt="Exemplo de interface do WhatsApp"
            className="w-full h-full object-cover rounded-[1.5rem] " // Ajuste o border-radius interno
          />
          {/* Inner shadow preta */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] shadow-[inset_0_0_40px_10px_rgba(0,0,0,0.5)]"></div>
          {/* Texto sobreposto com efeito glassmorphism (opcional, como no seu print) */}
          {/* <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-white/20 backdrop-blur-sm text-white text-lg font-semibold">
            Use seu Itaú<br/>No WhatsApp
          </div> */}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          Sua saúde, <span className="text-accent">potencializada.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {/* Descubra, em minutos, o mapa de imunização personalizado que seu corpo precisa para performar no seu máximo. De forma gratuita e inteligente, direto no seu WhatsApp. */}
          O V<span className="text-accent font-black">+</span> é o seu assistente de vacinação pessoal no WhatsApp. Descubra de forma simples e confiável quais vacinas são essenciais para a sua saúde
        </p>
        <span>
          <br/>
        </span>
            <AnimatedArrow />
      </div>
    </section>
  );
};

export default Hero;