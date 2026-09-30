import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicStorySection from './components/CinematicStorySection';
import ServicesSection from './components/ServicesSection';
import IndustriesSection from './components/IndustriesSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import BottomBar from './components/BottomBar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  // Initialize Lenis Smooth Momentum Scrolling synchronized with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleOpenContact = (service = '') => {
    setSelectedService(service);
    setIsContactOpen(true);
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId.replace('-websites', '').replace('-social', '').replace('-combo', ''));
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(sectionId) || document.getElementById(sectionId.split('-')[0]);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 300;
      const servicesEl = document.getElementById('services');
      const industriesEl = document.getElementById('industries');
      const aboutEl = document.getElementById('about');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else if (industriesEl && scrollPos >= industriesEl.offsetTop) {
        setActiveSection('industries');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050d08] text-white selection:bg-[#38E54D] selection:text-[#050d08]">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Interactive Neo-Brutalist Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Top Navbar */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      {/* Hero Section */}
      <Hero
        onOpenContact={() => handleOpenContact()}
        onNavigate={handleNavigate}
      />

      {/* Cinematic Scroll-Driven Storytelling Section (Directly after Hero on Pure Black) */}
      <CinematicStorySection />

      {/* Agency Services Showcase: 3 Tiers & Monthly Social */}
      <ServicesSection onOpenContact={handleOpenContact} />

      {/* Industry Solutions */}
      <IndustriesSection onOpenContact={handleOpenContact} />

      {/* Agency Process & Standards */}
      <AboutSection onOpenContact={handleOpenContact} />

      {/* Footer */}
      <Footer
        onOpenContact={() => handleOpenContact()}
        onNavigate={handleNavigate}
      />

      {/* Bottom Floating Navigation Dock */}
      <BottomBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Contact & Custom Proposal Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
