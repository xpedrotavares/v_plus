import React from 'react';
import ShinyText from './ShinyText'; // Importando o novo componente de botão

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-lg p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src="/assets/logo.png" alt="Vaccine+" className="w-44" />
        {/* Usando o novo componente ShinyButton */}
        <a href="https://wa.me/15556654247?text=Ol%C3%A1%2C%20quero%20iniciar%20minha%20avalia%C3%A7%C3%A3o%20vacinal!" className='border rounded-[15px]  border-[#353535] bg-[#111]'>
            
        <ShinyText
          text="Fazer Avaliação"
          disabled={false}
          speed={3}
          className=' font-bold text-lg p-3 px-3'
          />
          </a>
      </div>
    </header>
  );
};

export default Header;
