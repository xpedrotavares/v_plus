import React from 'react';

const AnimatedArrow = () => {
  const scrollToNextSection = () => {
    // Procura pela seção com o id 'impact-section' e rola suavemente até ela.
    const nextSection = document.getElementById('impact-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="arrow-container" onClick={scrollToNextSection}>
      <div className="arrow-down"></div>
    </div>
  );
};

export default AnimatedArrow;
