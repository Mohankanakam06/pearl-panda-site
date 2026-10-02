import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import useReducedMotion from '../hooks/useReducedMotion';
import { motion } from '../lib/motion';

const services = [
  { number: '01', category: 'WEBSITE DEVELOPMENT', title: 'BASIC PORTFOLIO WEBSITE', description: 'Clean responsive informational website with essential pages, navigation, contact / CTA sections and deployment.', deliverables: ['Responsive pages across mobile, tablet & desktop', 'Navigation and service / work sections', 'Contact / calls-to-action', 'Deployment'], examples: 'Café, restaurant, portfolio, local business', image: '/assets/service-1.svg', theme: 'ink' },
  { number: '02', category: 'WEBSITE DEVELOPMENT', title: 'WEBSITE WITH BACKEND', description: 'Frontend connected to backend and database for dynamic information, forms and required functionality.', deliverables: ['Frontend + backend', 'Database integration', 'Dynamic information & data', 'Forms and required functionality'], examples: 'Event company, business directory, property listings', image: '/assets/service-2.svg', theme: 'cream' },
  { number: '03', category: 'WEBSITE DEVELOPMENT', title: 'FULL BACKEND WEBSITE', description: 'Complete web application with backend, database, login / authentication and application-specific functionality.', deliverables: ['Frontend + backend', 'Database', 'Login / authentication', 'Application-specific features'], examples: 'Real-estate platform, booking system, customer portal', image: '/assets/service-3.svg', theme: 'primary' },
  { number: '04', category: 'MONTHLY SOCIAL MEDIA MANAGEMENT', title: 'SOCIAL MEDIA — MONTHLY PACKAGE', description: "Social media services are offered as a monthly package. Content and creative direction are adapted to the client's industry, audience and brand style.", deliverables: ['Content Planning: Monthly ideas, themes, content pillars and posting calendar.', 'Social Creatives: Branded posts, carousels and other agreed social media formats.', 'Captions & Copy: Captions, hooks, calls-to-action and platform-specific copy.', 'Scheduling / Publishing: Approved content where included.', 'Monthly Overview: Simple summary of published content and social media activity.'], examples: 'Cafés, events, real estate, retail, creators, startups', image: '/assets/service-4.svg', theme: 'ink' },
];

export default function NumberedServices({ onOpenContact }) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [exploring, setExploring] = useState(null);
  useReveal(sectionRef);

  useEffect(() => {
    if (reducedMotion) return;
    const context = gsap.context(() => {
      sectionRef.current.querySelectorAll('.service-card').forEach((card) => {
        gsap.fromTo(card.querySelectorAll('.service-tick'), { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: .4, stagger: .12, ease: motion.ease.reveal, scrollTrigger: { trigger: card, start: 'top 70%', toggleActions: 'play none none reverse' } });
        gsap.fromTo(card.querySelector('.service-number'), { rotateX: -80, opacity: 0 }, { rotateX: 0, opacity: 1, duration: .7, ease: motion.ease.reveal, scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' } });
      });
    }, sectionRef);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <div className="section-shell">
        <div className="section-topline" data-reveal><span className="section-kicker">02 / Our practice</span><span className="services-caption">A thoughtful presence, from the first impression onwards.</span></div>
        <header className="section-heading-grid"><h2 className="section-title" data-reveal>Good things,<br /><em>made for you.</em></h2><p className="section-intro" data-reveal>A clear website. A consistent social presence. We shape both around your business, your audience and the way you want to be seen.</p></header>
        <div className="service-deck">
          {services.map((service, index) => (
            <article className={`service-card service-theme-${service.theme} ${exploring === index ? 'is-exploring' : ''}`} key={service.number} style={{ '--card-order': index }}>
              <div className="service-card-top"><div className="service-number" aria-label={`Service ${service.number}`}><span aria-hidden="true">{service.number}<span>{service.number}</span></span></div><span className="service-category">{service.category.toLowerCase()}</span><span className="service-card-corner" aria-hidden="true"><ArrowUpRight /></span></div>
              <div className="service-card-grid"><div className="service-main"><h3>{service.title.toLowerCase().replace(/^./, (letter) => letter.toUpperCase())}</h3><p className="service-description">{service.description}</p><ul className="service-checklist">{service.deliverables.map((item) => <li key={item}><span className="service-tick"><Check size={13} strokeWidth={2} /></span><span>{item}</span></li>)}</ul><button onClick={() => onOpenContact(service.title)} className="editorial-link service-action" data-cursor="ASK"><span>Let’s talk about this</span><ArrowUpRight size={19} /></button></div>
                <div className="service-aside"><p className="service-aside-number" aria-hidden="true">{['A first\nimpression.', 'Room\nto grow.', 'Built around\nyour world.', 'A continuing\nconversation.'][index].split('\n').map((line) => <span key={line}>{line}</span>)}</p><p className="service-examples"><span>A natural fit for</span>{service.examples}</p><button className="service-detail-toggle" onClick={() => setExploring(exploring === index ? null : index)} aria-expanded={exploring === index} aria-controls={`service-note-${index}`}><span>Our approach</span><Plus size={16} /></button><p id={`service-note-${index}`} className="service-note" hidden={exploring !== index}>We agree on scope, content, timeline and deliverables together before work begins.</p></div>
              </div>
            </article>
          ))}
        </div>
        <aside className="service-combo" data-reveal><div><span className="section-kicker">Better, together</span><h3>A website and a social presence.<br /><em>One shared point of view.</em></h3><p>Choose any website type alongside a monthly social media package. Your website is a project; your social presence is an ongoing conversation. Both can share the same colours, typography and content direction.</p></div><button onClick={() => onOpenContact('Website + Social Media Combo')} className="editorial-link service-action" data-cursor="ASK"><span>Explore the combined package</span><ArrowUpRight size={19} /></button></aside>
      </div>
    </section>
  );
}
