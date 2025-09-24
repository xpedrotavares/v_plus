import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactSection from './components/ImpactSection';
import SplashScreen from './components/SplashScreen'
import HowItWorks from './components/HowItWorks';
import Credibility from './components/Credibility';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';


function App() {

  // Este estado agora controla se o SplashScreen está no DOM ou não.
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // A função é chamada pelo SplashScreen APÓS sua animação de fade-out terminar.
  // Ela remove o SplashScreen do DOM para liberar recursos.
  const handleAnimationComplete = () => {
    setIsSplashVisible(false);
  };

  return (
    <div className="antialiased">
        {isSplashVisible && <SplashScreen onAnimationComplete={handleAnimationComplete} />}
      <Header />
      <main>
        <Hero />
        <ImpactSection />
        <HowItWorks />
        <Credibility />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;