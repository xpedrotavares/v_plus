import React, { useState, useEffect, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ShinyText from './ShinyText';
// Função de easing (do código anterior)
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Componente AnimatedNumber
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

// Componente StaggeredText
const StaggeredText = ({ text, isVisible }) => {
  const words = text.split(' ');
  return (
    <p className={`text-xl md:text-2xl text-gray-100 mt-4 stagger-container ${isVisible ? 'visible' : ''}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="staggered-word"
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          {word + ' '}
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
  ctaLink, // 2. Nova prop para o link do botão
  ctaText   // 3. Nova prop para o texto do botão
}) => {
  const { ref, isVisible } = useScrollReveal();
  const [isNumberFinished, setIsNumberFinished] = useState(false);
  const [isTextFinished, setIsTextFinished] = useState(false); // 4. Novo estado para o botão

  const handleAnimationComplete = useCallback(() => {
    setTimeout(() => {
      setIsNumberFinished(true);
    }, 300);
  }, []);

  // Efeito para resetar os estados quando o slide sai da tela
  useEffect(() => {
    if (!isVisible) {
      setIsNumberFinished(false);
      setIsTextFinished(false);
    } else if (!number) {
      setIsNumberFinished(true); // Se não houver número, inicia a animação do texto
    }
  }, [isVisible, number]);

  // 5. Efeito que observa quando a animação do texto começa,
  // e então agenda a aparição do botão para o final dela.
  useEffect(() => {
    if (isNumberFinished) {
      const words = description.split(' ');
      // Duração = (atraso da última palavra) + (duração da transição da palavra)
      const textAnimationDuration = (words.length - 1) * 60 + 500;
      
      const timer = setTimeout(() => {
        setIsTextFinished(true);
      }, textAnimationDuration);

      return () => clearTimeout(timer); // Limpa o timer
    }
  }, [isNumberFinished, description]);

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
            
            <StaggeredText text={description} isVisible={isNumberFinished} />
            
            {/* 6. O botão só é renderizado se as props ctaLink e ctaText existirem */}
            {ctaLink && ctaText && (
              <a
                href={ctaLink}
                className={`border rounded-[15px] mt-16 border-[#353535] bg-[#111] inline-block text-white font-bold py-4 px-8 text-lg transform hover:scale-105 transition-transform duration-300 fade-in-button ${isTextFinished ? 'visible' : ''}`}
              >
                <ShinyText
                  text={ctaText}
                  disabled={false}
                  speed={3}
                  className='font-bold text-lg'
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const ImpactSection = () => {
  return (
    <section className="bg-black overflow-hidden">
      <ImpactSlide
        imageUrl="./../assets/Gemini_Generated_Image_wc6lamwc6lamwc6l.png"
        number={90}
        numberSuffix="%"
        description="É a redução do risco de câncer de colo do útero em mulheres vacinadas contra o HPV. Uma única decisão que protege para a vida toda."
        // 7. Passe as novas props apenas para o slide que deve ter o botão
        ctaLink="https://wa.me/15556654247?text=Ol%C3%A1%2C%20quero%20iniciar%20minha%20avalia%C3%A7%C3%A3o%20vacinal!"
        ctaText="Iniciar Avaliação Agora"
      />
      
      <ImpactSlide
        imageUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto-format&fit=crop"
        number={14}
        numberSuffix=" DIAS"
        description="É o tempo médio que uma gripe forte pode te afastar dos treinos. A imunização anual reduz o impacto na sua performance. Mantenha seu ritmo."
             ctaLink="https://wa.me/15556654247?text=Ol%C3%A1%2C%20quero%20iniciar%20minha%20avalia%C3%A7%C3%A3o%20vacinal!"
        ctaText="Iniciar Avaliação Agora"
      />
      <ImpactSlide
        imageUrl="./../assets/Gemini_Generated_Image_wc6lamwc6lamwc6l.png"
        numberJsx={
          <>
            1 <span className="text-4xl md:text-7xl align-middle text-gray-200">a cada 3</span>
          </>
        }
        description="Pessoas irá desenvolver Herpes Zóster ao longo da vida, com dores debilitantes. A vacina é a prevenção mais eficaz para uma longevidade saudável."
             ctaLink="https://wa.me/15556654247?text=Ol%C3%A1%2C%20quero%20iniciar%20minha%20avalia%C3%A7%C3%A3o%20vacinal!"
        ctaText="Iniciar Avaliação Agora"
      />
    </section>
  );
};

export default ImpactSection;