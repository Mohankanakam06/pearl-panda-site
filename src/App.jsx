import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HighlightProjects from './components/HighlightProjects';
import ClientMarquee from './components/ClientMarquee';
import NumberedServices from './components/NumberedServices';
import IndustriesSection from './components/IndustriesSection';
import AboutSection from './components/AboutSection';
import SplitCTA from './components/SplitCTA';
import Footer from './components/Footer';
import BottomBar from './components/BottomBar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgressBar from './components/ScrollProgressBar';
import LiveStatsStrip from './components/interactive/LiveStatsStrip';
import ActivityToasts from './components/interactive/ActivityToasts';
import useReducedMotion from './hooks/useReducedMotion';
const AskPandaWidget = lazy(() => import('./components/interactive/AskPandaWidget'));
const ContactModal = lazy(() => import('./components/ContactModal'));
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(() => new URLSearchParams(window.location.search).get('nopreloader') !== 'true');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const lenisRef = useRef(null);
  const contactOpenerRef = useRef(null);
  const reduced = useReducedMotion();
  const completeLoading = useCallback(() => { setIsLoading(false); ScrollTrigger.refresh(); }, []);
  const handleOpenContact = useCallback((service = '') => { contactOpenerRef.current = document.activeElement; setSelectedService(service); setIsContactOpen(true); }, []);
  const closeContact = useCallback(() => {
    setIsContactOpen(false);
    requestAnimationFrame(() => {
      const opener = contactOpenerRef.current;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
      else document.querySelector('.ask-panda__launcher')?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.05, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), smoothWheel: true, touchMultiplier: 1.2 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null; };
  }, [reduced]);

  useEffect(() => {
    if (isContactOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [isContactOpen, reduced]);

  const handleNavigate = useCallback((sectionId) => {
    const id = sectionId.replace(/-(websites|social|combo)$/, '');
    const element = document.getElementById(id);
    if (!element) return;
    if (lenisRef.current) lenisRef.current.scrollTo(id === 'home' ? 0 : element, { offset: id === 'home' ? 0 : -90, duration: 1.1 });
    else window.scrollTo({ top: id === 'home' ? 0 : element.getBoundingClientRect().top + window.scrollY - 90, behavior: reduced ? 'instant' : 'smooth' });
    element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
    setActiveSection(id);
  }, [reduced]);

  useEffect(() => {
    let frame;
    const update = () => {
      frame = null;
      let current = 'home';
      for (const id of ['projects', 'services', 'industries', 'about']) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 260) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true }); update();
    const targetY = Number(new URLSearchParams(window.location.search).get('scroll'));
    const timer = targetY > 0 ? setTimeout(() => window.scrollTo(0, targetY), 600) : null;
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; clearTimeout(timer); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);

  return <>
    <div className="site-shell" inert={isContactOpen || undefined}>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgressBar activeSection={activeSection} onNavigate={handleNavigate} />
      <Navbar onOpenContact={() => handleOpenContact('General Inquiry')} onNavigate={handleNavigate} activeSection={activeSection} />
      <main id="main" tabIndex={-1}>
        <Hero onOpenContact={handleOpenContact} onNavigate={handleNavigate} activeSection={activeSection} />
        <LiveStatsStrip />
        <HighlightProjects onOpenContact={handleOpenContact} />
        <ClientMarquee onNavigate={handleNavigate} />
        <NumberedServices onOpenContact={handleOpenContact} />
        <IndustriesSection onOpenContact={handleOpenContact} />
        <AboutSection onOpenContact={handleOpenContact} />
        <SplitCTA onOpenContact={handleOpenContact} />
      </main>
      <Footer onOpenContact={() => handleOpenContact('General Inquiry')} onNavigate={handleNavigate} />
      <BottomBar activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
    <CustomCursor />
    {!isLoading && <Suspense fallback={null}><AskPandaWidget onOpenContact={handleOpenContact} onNavigate={handleNavigate} isContactOpen={isContactOpen} /></Suspense>}
    {!isLoading && <ActivityToasts activeSection={activeSection} isContactOpen={isContactOpen} />}
    {isContactOpen && <Suspense fallback={<div className="modal-loading" role="status">Opening your brief…</div>}><ContactModal isOpen={isContactOpen} onClose={closeContact} initialService={selectedService} /></Suspense>}
    {isLoading && <Preloader onComplete={completeLoading} />}
  </>;
}
