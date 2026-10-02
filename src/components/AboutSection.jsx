import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Check, Asterisk } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';
import useReveal from '../hooks/useReveal';

const statement = 'We help good businesses find their place online, with thoughtful websites and a consistent social presence.';
const steps = [
  ['First, we listen.', 'We get to know your business, your audience and what you want to do next.'],
  ['Find the right fit.', 'Together, we choose the website type or monthly social package that makes sense for you.'],
  ['Make a clear plan.', 'Scope, content, timeline and deliverables are agreed before we begin.'],
  ['Bring it to life.', 'We design, develop and prepare the content your digital presence needs.'],
  ['Refine, together.', 'You review the work. We make the agreed revisions and get the details right.'],
  ['Out into the world.', 'Your website goes live, or your approved social content is ready to publish.'],
];
const principles = [
  'A clear story, with room for your personality.',
  'Thoughtful typography and a considered visual direction.',
  'An experience that works across phones, tablets and desktops.',
  'Useful content and a clear next step for your audience.',
];

export default function AboutSection({ onOpenContact }) {
  const sectionRef = useRef(null);
  const statementRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();
  useReveal(sectionRef);

  useEffect(() => {
    if (reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo('.about-word-highlight', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', stagger: .12, ease: 'none', scrollTrigger: { trigger: statementRef.current, start: 'top 80%', end: 'bottom 38%', scrub: .4 } });
    }, sectionRef);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="section-shell">
        <header className="section-topline" data-reveal><span className="section-kicker">04 / A little about us</span><Asterisk className="about-asterisk" aria-hidden="true" /></header>
        <p className="about-statement" ref={statementRef}>{statement.split(' ').map((word, index) => <React.Fragment key={`${word}-${index}`}><span className="about-word">{word}<span className="about-word-highlight" aria-hidden="true">{word}</span></span>{' '}</React.Fragment>)}</p>
        <div className="about-intro-bottom" data-reveal><span className="about-note">Clear in purpose.<br /><em>Distinct in character.</em></span><p>Web development and monthly social media, shaped around the people behind your business.</p></div>
        <div className="about-process">
          <header className="process-heading"><div><span className="section-kicker">A simple, shared process</span><h2>Good work begins<br /><em>with a conversation.</em></h2></div><p>No two businesses need exactly the same thing. We agree on the work, the timeline and the price together, before we begin.</p></header>
          <div className="process-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(activeStep + 1) / steps.length})` }} /></div>
          <ol className="process-grid">{steps.map(([title, description], index) => <li key={title}><button className={`process-step ${activeStep === index ? 'is-active' : ''}`} aria-pressed={activeStep === index} onClick={() => setActiveStep(index)}><span className="process-step-top"><span className="process-step-number">{String(index + 1).padStart(2, '0')}</span><span className="process-step-check"><Check size={16} strokeWidth={2} /></span></span><h3>{title}</h3><p>{description}</p><span className="process-step-label">{activeStep === index ? 'A closer look' : 'Explore this stage'}<ArrowUpRight size={14} /></span></button></li>)}</ol>
          <div className="process-foot"><span className="section-kicker">Step {String(activeStep + 1).padStart(2, '0')} / 06</span><span>{steps[activeStep][0]}</span></div>
        </div>
        <div className="about-manifesto"><div data-reveal><span className="section-kicker">Our point of view</span><h3>Less noise.<br /><em>More meaning.</em></h3><p>The best digital experiences feel like the business behind them. We look for the details that make yours distinct, and give them room to speak.</p><button className="editorial-link about-action" onClick={() => onOpenContact('Process Inquiry')} data-cursor="ASK">Let’s discuss your project<ArrowUpRight size={18} /></button></div><ul className="principles-list">{principles.map((principle, index) => <li key={principle} data-reveal><span>{String(index + 1).padStart(2, '0')}</span>{principle}</li>)}</ul></div>
      </div>
    </section>
  );
}
