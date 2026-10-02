import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import useReducedMotion from '../hooks/useReducedMotion';
import useScrollVelocity from '../hooks/useScrollVelocity';
import PandaFace from './interactive/PandaFace';
import LanguageCycler from './interactive/LanguageCycler';
import SplitText from './SplitText';
import { motion } from '../lib/motion';
import '../styles/hero.css';

const clamp = (value) => Math.max(0, Math.min(1, value));
export default function Hero({ onOpenContact, onNavigate, activeSection = 'home' }) {
  const ref = useRef(null);
  const titleRef = useRef(null);
  const reduced = useReducedMotion();
  useScrollVelocity(titleRef);

  useEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.fromTo('[data-hero-line]', { yPercent: 108 }, { yPercent: 0, stagger: .1, duration: 1, ease: motion.ease.reveal, delay: .15 });
    }, ref);
    return () => context.revert();
  }, [reduced]);

  useEffect(() => {
    const section = ref.current;
    let frame = 0;
    const render = () => {
      frame = 0;
      const distance = section.offsetHeight - section.firstElementChild.offsetHeight;
      const p = reduced || distance <= 0 ? 0 : clamp(-section.getBoundingClientRect().top / distance);
      const intro = 1 - clamp((p - .1) / .32);
      const closing = clamp((p - .53) / .3);
      section.style.setProperty('--hero-progress', p);
      section.style.setProperty('--hero-intro', intro);
      section.style.setProperty('--hero-intro-y', `${(1 - intro) * -22}px`);
      section.style.setProperty('--hero-closing', closing);
      section.style.setProperty('--hero-closing-y', `${(1 - closing) * 22}px`);
      section.querySelector('.hero-intro')?.setAttribute('aria-hidden', String(intro < .05));
      section.querySelector('.hero-closing')?.setAttribute('aria-hidden', String(closing < .05));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const resize = new ResizeObserver(schedule);
    resize.observe(section); resize.observe(section.firstElementChild);
    window.addEventListener('scroll', schedule, { passive: true });
    render();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', schedule); };
  }, [reduced]);

  return <section ref={ref} id="home" className="studio-hero" aria-label="Pearl Panda digital studio">
    <div className="studio-hero__stage">
      <div className="hero-edition studio-wrap"><span>Websites, social & everything between.</span><span>Independent thinking. Thoughtful making.</span></div>
      <div className="hero-layout studio-wrap">
        <div className="hero-copy">
          <div className="hero-eyebrow"><SplitText>A digital studio for businesses with a point of view</SplitText></div>
          <div className="hero-story">
            <div className="hero-intro">
              <h1 ref={titleRef}><span className="hero-mask"><span data-hero-line>A considered</span></span><span className="hero-mask hero-accent"><span data-hero-line><em>presence.</em></span></span><span className="hero-mask"><span data-hero-line>A lasting impression.</span></span></h1>
              <p>We make websites and social media feel like they belong together. Clear in purpose, thoughtful in detail, and unmistakably yours.</p>
            </div>
            <div className="hero-closing" aria-hidden="true"><span className="hero-small">Good work begins with understanding.</span><h2>Made to feel<br /><em>like you.</em></h2><p>From the first page to the next post, we help your business show up with a little more clarity, character and confidence.</p></div>
          </div>
          <div className="hero-actions"><button className="hero-primary" data-magnetic data-cursor="HELLO" onClick={() => onOpenContact('General Inquiry')}>Let’s make something <ArrowUpRight size={18} /></button><button className="hero-text-link" onClick={() => onNavigate('services')}>Explore our services <ArrowUpRight size={15} /></button></div>
        </div>
        <aside className="hero-companion" aria-label="Meet Panda, your studio companion">
          <div className="hero-companion__label">A little character goes a long way.</div>
          <div className="hero-face-stage"><PandaFace activeSection={activeSection} /></div>
          <div className="hero-greeting"><LanguageCycler /><p>Different languages.<br />The same warm welcome.</p></div>
        </aside>
      </div>
      <div className="hero-controls studio-wrap"><span>Thoughtfully built. Naturally you.</span><button onClick={() => onNavigate('projects')} className="hero-skip">A few possibilities <ArrowDown size={15} /></button><span className="hero-page-number">01 — Introduction</span></div>
      <div className="hero-progress" aria-hidden="true"><span /></div>
    </div>
  </section>;
}
