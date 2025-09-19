import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const CallToAction = () => {
  const { ref, isVisible } = useScrollReveal();
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/5511988197843?text=Oi";

  return (
    <section id="cta-final" className="py-20 md:py-32 hero-bg px-6 overflow-hidden">
      <div ref={ref} className={`max-w-2xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Pronto para potencializar sua proteção?</h2>
        <div className="bg-white p-4 rounded-xl inline-block shadow-2xl shadow-blue-500/20">
          <img src={qrCodeUrl} alt="QR Code para iniciar conversa no WhatsApp" className="rounded-lg" />
        </div>
        <p className="mt-6 text-lg text-gray-200 font-medium">Aponte a câmera do seu celular e inicie sua avaliação gratuita e personalizada no WhatsApp.</p>
        <p className="mt-4 text-sm text-gray-500">
          🔒 Seus dados são protegidos e tratados de acordo com a LGPD. A conversa é 100% confidencial.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;