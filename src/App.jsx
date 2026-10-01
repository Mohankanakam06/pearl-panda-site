import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HighlightProjects from './components/HighlightProjects';
import ClientMarquee from './components/ClientMarquee';
import NumberedServices from './components/NumberedServices';
import AboutSection from './components/AboutSection';
import SplitCTA from './components/SplitCTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import BottomBar from './components/BottomBar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgressBar from './components/ScrollProgressBar';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('nopreloader') !== 'true';
    }
    return true;
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const lenisRef = useRef(null);

  // Programmatic scroll helper via query param (?scroll=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      const targetY = parseInt(scrollTarget, 10);
      setTimeout(() => {
        window.scrollTo(0, targetY);
      }, 400);
    }
  }, []);

  // Initialize Lenis Smooth Momentum Scrolling synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

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
    const id = sectionId.replace('-websites', '').replace('-social', '').replace('-combo', '');
    setActiveSection(id);

    if (id === 'home') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetEl = document.getElementById(id);
    if (targetEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetEl, { offset: -60, duration: 1.2 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Track active section for navigation indicators
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const projectsEl = document.getElementById('projects');
      const servicesEl = document.getElementById('services');
      const aboutEl = document.getElementById('about');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        setActiveSection('projects');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B1F16] text-white selection:bg-[#38E54D] selection:text-[#0B1F16]">
      {/* 1. Global Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 2. Interactive Neo-Brutalist Custom Cursor with contextual labels */}
      <CustomCursor />

      {/* 3. Neo-Brutalist Preloader with Block Wipes Curtain Transition */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* 4. Fixed Top Navbar */}
      <Navbar onOpenContact={() => handleOpenContact('General Inquiry')} />

      {/* 5. Section 1: Hero (Full-viewport video background, masked reveals, audio toggle, stacking transition) */}
      <Hero
        onOpenContact={handleOpenContact}
        onNavigate={handleNavigate}
      />

      {/* 6. Section 2: Highlight Projects (Full-bleed pinned slider, clip-path mask wipes, counter 01/04, prev/next) */}
      <HighlightProjects
        onOpenContact={handleOpenContact}
      />

      {/* 7. Section 3: Client Logo Marquee (Velocity-coupled speed & direction-reversal on scroll up, #FFFFFF background) */}
      <ClientMarquee />

      {/* 8. Section 4: Numbered Services 01-04 (Sticky stacking cards, clip-path image reveals, hover expansion, #0B1F16 background) */}
      <NumberedServices
        onOpenContact={handleOpenContact}
      />

      {/* 9. Agency Process & Standards (#2E8B3C emerald background alternating rhythm) */}
      <AboutSection
        onOpenContact={handleOpenContact}
      />

      {/* 10. Section 5: Split CTA Quote / Contact (Expanding halves on hover, brutalist hard-shadow buttons) */}
      <SplitCTA
        onOpenContact={handleOpenContact}
      />

      {/* 11. Footer */}
      <Footer
        onOpenContact={() => handleOpenContact('Footer Inquiry')}
        onNavigate={handleNavigate}
      />

      {/* 12. Bottom Floating Navigation Dock */}
      <BottomBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 13. Contact & Custom Proposal Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
