import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

import Skills from './components/Skills';
import DSASection from './components/DSASection';

import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const username = "bbaskey2026";

  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="portfolio-page">
      <Navbar currentTime={currentTime} />
      <HeroSection />
      
      <Skills />
      <DSASection />
     
      <ProjectsSection username={username} />
      <ContactSection />
      <Footer />
    </div>
  );
}