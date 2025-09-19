import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal'; // Hook que criaremos a seguir

const ImpactSlide = ({
  imageUrl,
  numberText,
  description,
  align = 'left',
}) => {
  const { ref, isVisible } = useScrollReveal();
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
            <h2 className="number-animation text-accent">{numberText}</h2>
            <p className="text-xl md:text-2xl text-gray-100 mt-4">
              {description}
            </p>
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
        imageUrl="https://images.unsplash.com/photo-1591280063444-d3c435b651ec?q=80&w=2070&auto=format&fit=crop"
        numberText="90%"
        description="É a redução do risco de câncer de colo do útero em mulheres vacinadas contra o HPV. Uma única decisão que protege para a vida toda."
      />
      <ImpactSlide
        imageUrl="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop"
        numberText="14 DIAS"
        description="É o tempo médio que uma gripe forte pode te afastar dos treinos. A imunização anual reduz o impacto na sua performance. Mantenha seu ritmo."
        align="right"
      />
      <ImpactSlide
        imageUrl="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
        numberText={
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