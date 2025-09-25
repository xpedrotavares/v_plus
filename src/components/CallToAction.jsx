import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ShinyText from './ShinyText';
const CallToAction = () => {
  const { ref, isVisible } = useScrollReveal();
  //const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/5511988197843?text=Oi";

  return (
    <section id="cta-final" className="py-20 md:py-32 hero-bg bg-[#000013] px-6 overflow-hidden">
      <div ref={ref} className={`max-w-2xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 opacity-85">Pronto para potencializar sua proteção?</h2>
       <a
          href="https://wa.me/15556654247?text=Ol%C3%A1%2C%20quero%20iniciar%20minha%20avalia%C3%A7%C3%A3o%20vacinal!"
          className="border rounded-[15px] mt-4 border-[#353535] bg-[#111] inline-block text-white font-bold py-4 px-8 text-lg transform hover:scale-105 transition-transform duration-300"
        >
           <ShinyText
          text="Iniciar Avaliação Agora"
          disabled={false}
          speed={2}
          className=' font-bold text-lg'
          />
        </a>
        {/* <p className="mt-6 text-lg text-gray-200 font-medium">Aponte a câmera do seu celular e inicie sua avaliação gratuita e personalizada no WhatsApp.</p> */}
        <p className="mt-12 text-sm text-gray-500">
          🔒 Seus dados são protegidos e tratados de acordo com a LGPD. A conversa é 100% confidencial.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;