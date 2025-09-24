import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onAnimationComplete }) => {
  const title = "vaccine+";
  const subtitle = "seu assistente pessoal de vacinação.";
  const subtitleWords = subtitle.split(' ');

  // Controla os estágios da animação: 'title', 'subtitle', 'fading'
  const [stage, setStage] = useState('idle');

  useEffect(() => {
    const timers = [];

    // Inicia a animação do título após um breve momento
    timers.push(setTimeout(() => setStage('title'), 100));

    // Após a animação do título, inicia a do subtítulo
    // Duração: 100ms (start) + 1000ms (anim) + 200ms (pause)
    timers.push(setTimeout(() => setStage('subtitle'), 1300));

    // Após a animação do subtítulo, inicia o fade-out
    const subtitleDuration = subtitleWords.length * 80 + 500; // Duração da animação palavra por palavra
    // Duração total: 1300ms (até subtitle) + subtitleDuration + 500ms (pause)
    timers.push(setTimeout(() => setStage('fading'), 1300 + subtitleDuration + 800));

    // Após o fade-out, avisa que a animação terminou
    // Duração total: (tempo até fade) + 1000ms (duração do fade)
    timers.push(setTimeout(() => {
      onAnimationComplete();
    }, 1300 + subtitleDuration + 500 + 1000));

    // Limpa todos os timers se o componente for desmontado
    return () => timers.forEach(clearTimeout);
  }, [onAnimationComplete, subtitleWords.length]);

  return (
    <div className={`splash-screen ${stage === 'fading' ? 'fade-out' : ''}`}>
      {/* O container agora usa flexbox para garantir o alinhamento perfeito */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* --- TÍTULO --- */}
        <p
          className={`animated-text ${stage === 'title' || stage === 'subtitle' || stage === 'fading' ? 'animate' : ''}`}
          style={{ textAlign: 'center', fontWeight: 100 }}
        >
          <span
            className="word"
            style={{
              fontWeight: 100, // Light
              letterSpacing: '0.2em',
              fontSize: '3.5rem',
              // Atraso para o início da animação do título
              transitionDelay: '100ms',
              animationDelay: '100ms',
            }}
          >
            {title.slice(0, -1)}<span style={{ color: '#FC3060' }}>{title.slice(-1)}</span>
          </span>
        </p>

        {/* --- SUBTÍTULO --- */}
        <p
          className={`animated-text ${stage === 'subtitle' || stage === 'fading' ? 'animate' : ''}`}
          style={{ textAlign: 'center' }}
        >
          {subtitleWords.map((word, index) => (
            <React.Fragment key={index}>
              <span
                className="word"
                style={{
                  fontWeight: 100, // Regular
                  lineHeight: '0.5',

                  // Atraso para cada palavra do subtítulo
                  transitionDelay: `${index * 80}ms`,
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {word}
              </span>
              {' '}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

