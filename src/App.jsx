import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactSection from './components/ImpactSection';
import HowItWorks from './components/HowItWorks';
import Credibility from './components/Credibility';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="antialiased">
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