import React, { useState, useEffect, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

// Função de easing (do código anterior)
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const AnimatedNumber = ({ target, isVisible, duration = 2000, onAnimationComplete = () => {} }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentNumber(0);
      return;
    }
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const nextNumber = Math.floor(easedProgress * target);
      
      setCurrentNumber(nextNumber);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentNumber(target);
        onAnimationComplete();
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, target, duration, onAnimationComplete]);

  return <span>{currentNumber}</span>;
};


// A alteração principal está aqui, no ImpactSlide:
const StaggeredText = ({ text, isVisible }) => {
  const words = text.split(' '); // Divide o texto em um array de palavras

  return (
    <p className={`text-xl md:text-2xl text-gray-100 mt-4 stagger-container ${isVisible ? 'visible' : ''}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="staggered-word"
          // A mágica acontece aqui! Cada palavra tem um atraso maior que a anterior.
          style={{ transitionDelay: `${index * 60}ms` }} 
        >
          {word}
        </span>
      ))}
    </p>
  );
};


const ImpactSlide = ({
  imageUrl,
  number,
  numberSuffix,
  numberJsx,
  description,
  align = 'left',
}) => {
  const { ref, isVisible } = useScrollReveal();
  const [isNumberFinished, setIsNumberFinished] = useState(false);

  // A MUDANÇA ESTÁ AQUI: Adicionamos um setTimeout para o atraso
  const handleAnimationComplete = useCallback(() => {
    // Espera 300ms após o número terminar antes de iniciar a animação do texto
    setTimeout(() => {
      setIsNumberFinished(true);
    }, 300); 
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsNumberFinished(false);
    } else if (!number) { // Se for visível e não tiver número, inicia a animação do texto
      setIsNumberFinished(true);
    }
  }, [isVisible, number]);

  // ... (definição de classes de alinhamento permanece a mesma)
  const alignmentClass = align === 'right' ? 'justify-end' : '';
  const textAlignmentClass = align === 'right' ? 'text-right' : '';
  const overlayClass = align === 'right' ? 'right' : '';
  const marginClass = align === 'right' ? 'ml-auto' : '';

  return (
    <div
      ref={ref}
      className={`image-section min-h-[70vh] md:min-h-screen flex items-center reveal ${alignmentClass} ${isVisible ? 'visible' : ''}`}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className={`image-overlay ${overlayClass}`}>
        <div className={`image-content max-w-7xl mx-auto px-6 md:px-12 ${textAlignmentClass}`}>
          <div className={`md:w-1/2 ${marginClass}`}>
            <h2 className="number-animation text-accent">
              {number && (
                <AnimatedNumber
                  target={number}
                  isVisible={isVisible}
                  duration={1500}
                  onAnimationComplete={handleAnimationComplete}
                />
              )}
              {numberSuffix}
              {numberJsx}
            </h2>
            
            {/* USAMOS O NOVO COMPONENTE AQUI */}
            <StaggeredText text={description} isVisible={isNumberFinished} />

          </div>
        </div>
      </div>
    </div>
  );
};


const ImpactSection = () => {
  return (
    <section className="bg-black overflow-hidden ">
      <ImpactSlide
        imageUrl="./../assets/Gemini_Generated_Image_wc6lamwc6lamwc6l.png"
        number={90}
        numberSuffix="%"
        description="É a redução do risco de câncer de colo do útero em mulheres vacinadas contra o HPV. Uma única decisão que protege para a vida toda."
      />
      <ImpactSlide
        imageUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop"
        number={14}
        numberSuffix=" DIAS"
        description="É o tempo médio que uma gripe forte pode te afastar dos treinos. A imunização anual reduz o impacto na sua performance. Mantenha seu ritmo."
        
      />
      <ImpactSlide
        imageUrl="./../assets/Gemini_Generated_Image_wc6lamwc6lamwc6l.png"
        numberJsx={
          <>
            1 <span className="text-4xl md:text-7xl align-middle text-gray-200">a cada 3</span>
          </>
        }
        description="Pessoas irá desenvolver Herpes Zóster ao longo da vida, com dores debilitantes. A vacina é a prevenção mais eficaz para uma longevidade saudável."
      />
    </section>
  );
};

export default ImpactSection;