import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImpactSection from "./components/ImpactSection";
import SplashScreen from "./components/SplashScreen";
import HowItWorks from "./components/HowItWorks";
import Credibility from "./components/Credibility";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";

const PRIVACY_PATH = "/privacidade";

function App() {
  // Este estado agora controla se o SplashScreen está no DOM ou não.
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(
    window.location.pathname.replace(/\/$/, "") === PRIVACY_PATH
  );

  // A função é chamada pelo SplashScreen APÓS sua animação de fade-out terminar.
  // Ela remove o SplashScreen do DOM para liberar recursos.
  const handleAnimationComplete = () => {
    setIsSplashVisible(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      setShowPrivacyPolicy(
        window.location.pathname.replace(/\/$/, "") === PRIVACY_PATH
      );
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openPrivacyPage = () => {
    window.history.pushState({}, "", PRIVACY_PATH);
    setShowPrivacyPolicy(true);
  };

  const closePrivacyPage = () => {
    window.history.pushState({}, "", "/");
    setShowPrivacyPolicy(false);
  };

  return (
    <div className="antialiased">
      {isSplashVisible && (
        <SplashScreen onAnimationComplete={handleAnimationComplete} />
      )}
      <Header />
      <main>
        {showPrivacyPolicy ? (
          <PrivacyPolicy onBack={closePrivacyPage} />
        ) : (
          <>
            <Hero />
            <ImpactSection />
            <HowItWorks />
            <Credibility />
            <CallToAction />
          </>
        )}
      </main>
      <Footer onOpenPrivacy={openPrivacyPage} />
    </div>
  );
}

export default App;
