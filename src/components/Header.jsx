import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-lg p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white">
          Vaccine<span className="text-accent">+</span>
        </a>
        <a
          href="#cta-final"
          className="hidden sm:inline-block bg-accent text-white font-bold py-2 px-5 rounded-lg text-sm transform hover:scale-105 transition-transform duration-300"
        >
          Iniciar Avaliação
        </a>
      </div>
    </header>
  );
};

export default Header;