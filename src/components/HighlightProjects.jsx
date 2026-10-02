import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';
import '../styles/sections.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', type: 'Basic Portfolio Website', industry: 'Cafés & restaurants', title: 'A place at\nyour table.', specimen: ['The Sunday', 'Table'], caption: 'Good food. Familiar faces. A little time to stay.', specimenLinks: ['Our menu', 'Our story', 'Find a table'], description: 'A welcoming first impression, with the essentials beautifully in place: your menu, your story, your location and a clear way to get in touch.', details: ['Responsive pages', 'Menu & location', 'Reservations or enquiries'], accent: 'light' },
  { id: '02', type: 'Website with Backend', industry: 'Events & event companies', title: 'Make an\nentrance.', specimen: ['Gather', 'beautifully.'], caption: 'A home for moments worth coming together for.', specimenLinks: ['What’s on', 'Past moments', 'Enquire'], description: 'Give every event a home. Connect your showcase to a backend and database, so galleries, information and enquiries can keep moving with your business.', details: ['Dynamic information', 'Event galleries', 'Enquiry forms'], accent: 'gold' },
  { id: '03', type: 'Full Backend Website', industry: 'Real estate', title: 'Open the\nnext door.', specimen: ['Space to', 'belong.'], caption: 'Thoughtful places. New possibilities.', specimenLinks: ['Explore places', 'Your account', 'Let’s talk'], description: 'Bring listings, enquiries and customer journeys together in a complete web application, with a database, authentication and the features your business needs.', details: ['Property listings', 'Login & authentication', 'Application features'], accent: 'light' },
  { id: '04', type: 'Website + Social Media Combo', industry: 'Retail, creators & startups', title: 'One voice.\nEverywhere.', specimen: ['A point', 'of view.'], caption: 'A consistent presence, wherever your audience finds you.', specimenLinks: ['Discover', 'The journal', 'Connect'], description: 'A website to anchor your brand, and a monthly social presence to keep the conversation going. One considered visual direction across both.', details: ['Website as a project', 'Social media each month', 'A shared visual direction'], accent: 'gold' },
];

export default function HighlightProjects({ onOpenContact }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const panelsRef = useRef([]);
  const triggerRef = useRef(null);
  const dragRef = useRef(null);
  const activeRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1000px) and (min-height: 720px)').matches);
  const pinned = wide && !reducedMotion;

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1000px) and (min-height: 720px)');
    const update = () => setWide(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const context = gsap.context(() => {
      panelsRef.current.forEach((panel, index) => gsap.set(panel, { clipPath: index ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)', zIndex: index + 1 }));
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: sectionRef.current, start: 'top top', end: () => `+=${window.innerHeight * 2.8}`, pin: viewportRef.current,
        scrub: 0.45, invalidateOnRefresh: true,
        onUpdate: ({ progress }) => { const next = Math.min(projects.length - 1, Math.round(progress * (projects.length - 1))); if (activeRef.current !== next) { activeRef.current = next; setCurrent(next); } },
      } });
      panelsRef.current.slice(1).forEach((panel, i) => {
        timeline.to(panel, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' }, i);
        timeline.fromTo(panel.querySelector('.project-specimen-title'), { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, i);
      });
      triggerRef.current = timeline.scrollTrigger;
    }, sectionRef);
    ScrollTrigger.refresh();
    return () => { triggerRef.current = null; context.revert(); };
  }, [pinned]);

  const select = (index) => {
    const next = Math.max(0, Math.min(projects.length - 1, index));
    const trigger = triggerRef.current;
    if (trigger) window.scrollTo({ top: trigger.start + (next / (projects.length - 1)) * (trigger.end - trigger.start), behavior: 'instant' });
    activeRef.current = next;
    setCurrent(next);
  };

  const onPointerDown = (event) => {
    if (event.target.closest('button, a') || event.button !== 0) return;
    dragRef.current = { x: event.clientX, y: event.clientY, scroll: window.scrollY, start: current, dragging: false };
  };
  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.x;
    if (!drag.dragging && Math.abs(event.clientY - drag.y) > Math.abs(dx)) return;
    if (Math.abs(dx) > 12) { drag.dragging = true; event.currentTarget.setPointerCapture(event.pointerId); }
    const trigger = triggerRef.current;
    if (drag.dragging && trigger) { const distance = (trigger.end - trigger.start) / (projects.length - 1); window.scrollTo({ top: Math.max(trigger.start, Math.min(trigger.end, drag.scroll - dx / Math.min(window.innerWidth * 0.65, 800) * distance)), behavior: 'instant' }); }
  };
  const onPointerUp = (event) => {
    const drag = dragRef.current;
    if (drag?.dragging && !pinned && Math.abs(event.clientX - drag.x) > 45) select(drag.start + (event.clientX < drag.x ? 1 : -1));
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section id="projects" ref={sectionRef} className={`projects-section ${pinned ? 'is-pinned' : ''}`} aria-label="Work and portfolio concepts">
      <div ref={viewportRef} className="projects-viewport section-shell">
        <header className="section-topline projects-topline"><span className="section-kicker">01 / Possibilities, considered</span><span className="project-disclaimer">Illustrative directions for the businesses we work with</span></header>
        <div className="projects-stage" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Explore website concepts with left and right arrow keys" data-cursor="DRAG"
          onKeyDown={(event) => { if (!event.target.closest('button') && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); select(event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1)); } }}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={() => { dragRef.current = null; }}>
          {projects.map((project, index) => (
            <article key={project.id} ref={(element) => { panelsRef.current[index] = element; }} className={`project-panel ${current === index ? 'is-current' : ''}`} inert={current !== index} aria-hidden={current !== index} aria-label={`${index + 1} of ${projects.length}: ${project.type}`}>
              <div className="project-copy"><div className="project-meta"><span>{project.industry}</span><span className={`project-type accent-${project.accent}`}>{project.type}</span></div>
                <h2>{project.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><p className="project-description">{project.description}</p>
                <div className="project-tags">{project.details.map((detail) => <span key={detail}>{detail}</span>)}</div>
                <button className="project-enquire editorial-link" onClick={() => onOpenContact(project.type)} data-cursor="ASK"><span>Explore this possibility</span><ArrowUpRight size={20} /></button>
              </div>
              <div className="project-specimen" aria-hidden="true"><div className="project-specimen-label"><span>A visual study</span><span>No. {project.id}</span></div><div className="project-specimen-title"><span>{project.specimen[0]}</span><em>{project.specimen[1]}</em></div><p>{project.caption}</p><div className="project-specimen-nav">{project.specimenLinks.map((label) => <span key={label}>{label}</span>)}</div></div>
            </article>
          ))}
        </div>
        <footer className="projects-controls"><div className="project-index" aria-live="polite" aria-atomic="true"><span>{String(current + 1).padStart(2, '0')}</span><span>/ 04</span></div>
          <div className="project-rail" role="group" aria-label="Choose a website concept">{projects.map((project, index) => <button key={project.id} aria-label={`Show ${project.type}`} aria-pressed={current === index} className={current === index ? 'is-current' : ''} onClick={() => select(index)}><span>{project.id}</span><i /></button>)}</div>
          <span className="project-drag-hint"><MoveHorizontal size={15} />Drag, scroll, or use the arrows</span>
          <div className="project-arrows"><button aria-label="Previous concept" onClick={() => select(current - 1)} disabled={current === 0}><ArrowLeft size={20} /></button><button aria-label="Next concept" onClick={() => select(current + 1)} disabled={current === projects.length - 1}><ArrowRight size={20} /></button></div>
        </footer>
      </div>
    </section>
  );
}
