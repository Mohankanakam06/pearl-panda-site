import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Calendar, Pause, Play, Rocket, ShoppingBag, UserCheck, Utensils } from 'lucide-react';
import gsap from 'gsap';
import useReducedMotion from '../hooks/useReducedMotion';
import useInView from '../hooks/useInView';
import '../styles/industries.css';
import '../styles/widgets.css';

const industries = [
  { name: 'Cafés & Restaurants', icon: Utensils, tag: 'HOSPITALITY', focus: 'Menus, reservations & food stories' },
  { name: 'Events & Event Companies', icon: Calendar, tag: 'EXPERIENCES', focus: 'Event showcases & enquiries' },
  { name: 'Real Estate', icon: Building2, tag: 'DEVELOPMENT', focus: 'Property listings & walkthroughs' },
  { name: 'Retail & Local Businesses', icon: ShoppingBag, tag: 'COMMERCE', focus: 'Products, offers & new arrivals' },
  { name: 'Creators & Personal Brands', icon: UserCheck, tag: 'PROFILE BUILDING', focus: 'Portfolios & audience engagement' },
  { name: 'Startups & Small Businesses', icon: Rocket, tag: 'LAUNCH & GROWTH', focus: 'Company websites & launch content' },
];

export default function ClientMarquee({ onNavigate }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const controllerRef = useRef(null);
  const draggedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const reduced = useReducedMotion();
  const visible = useInView(viewportRef);
  const visibleRef = useRef(visible);
  pausedRef.current = paused;
  visibleRef.current = visible;

  useEffect(() => {
    if (reduced) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    let x = 0;
    let limit = 0;
    let speed = -0.35;
    let velocity = 0;
    let pointerId = null;
    let lastPointerX = 0;
    let initialPointerX = 0;
    let hover = false;
    let focus = false;
    const setX = gsap.quickSetter(track, 'x', 'px');
    const clamp = () => { x = Math.max(-limit, Math.min(0, x)); setX(x); };
    const measure = () => { limit = Math.max(0, track.scrollWidth - viewport.clientWidth + 48); clamp(); };
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    resize.observe(track);
    measure();
    const animate = (_time, deltaTime) => {
      if (!visibleRef.current || pointerId !== null) return;
      const delta = Math.min(2, deltaTime / 16.67);
      if (Math.abs(velocity) > 0.1) { x += velocity * delta; velocity *= Math.pow(0.92, delta); }
      else if (!pausedRef.current && !hover && !focus && !document.hidden) {
        x += speed * delta;
        if (x <= -limit || x >= 0) speed *= -1;
      }
      clamp();
    };
    gsap.ticker.add(animate);
    const pointerDown = (event) => {
      if (event.button !== 0) return;
      pointerId = event.pointerId;
      initialPointerX = lastPointerX = event.clientX;
      velocity = 0;
      draggedRef.current = false;
    };
    const pointerMove = (event) => {
      if (pointerId !== event.pointerId) return;
      const distance = event.clientX - lastPointerX;
      if (Math.abs(event.clientX - initialPointerX) > 6) {
        if (!draggedRef.current) viewport.setPointerCapture(event.pointerId);
        draggedRef.current = true;
      }
      if (draggedRef.current) { x += distance; velocity = distance; clamp(); }
      lastPointerX = event.clientX;
    };
    const pointerUp = (event) => {
      if (pointerId !== event.pointerId) return;
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      pointerId = null;
    };
    const enter = () => { hover = true; };
    const leave = () => { hover = false; };
    const focusIn = (event) => {
      focus = true;
      velocity = 0;
      const item = event.target.closest('.client-wall__tile');
      if (!item) return;
      const left = item.offsetLeft + x;
      if (left < 0) x -= left;
      else if (left + item.offsetWidth > viewport.clientWidth - 48) x -= left + item.offsetWidth - viewport.clientWidth + 48;
      clamp();
    };
    const focusOut = (event) => { if (!viewport.contains(event.relatedTarget)) focus = false; };
    controllerRef.current = (direction) => { velocity = direction * -24; speed = direction * -Math.abs(speed); };
    viewport.addEventListener('pointerdown', pointerDown);
    viewport.addEventListener('pointermove', pointerMove);
    viewport.addEventListener('pointerup', pointerUp);
    viewport.addEventListener('pointercancel', pointerUp);
    window.addEventListener('pointerup', pointerUp);
    window.addEventListener('pointercancel', pointerUp);
    viewport.addEventListener('pointerenter', enter);
    viewport.addEventListener('pointerleave', leave);
    viewport.addEventListener('focusin', focusIn);
    viewport.addEventListener('focusout', focusOut);
    return () => {
      gsap.ticker.remove(animate);
      resize.disconnect();
      viewport.removeEventListener('pointerdown', pointerDown);
      viewport.removeEventListener('pointermove', pointerMove);
      viewport.removeEventListener('pointerup', pointerUp);
      viewport.removeEventListener('pointercancel', pointerUp);
      window.removeEventListener('pointerup', pointerUp);
      window.removeEventListener('pointercancel', pointerUp);
      viewport.removeEventListener('pointerenter', enter);
      viewport.removeEventListener('pointerleave', leave);
      viewport.removeEventListener('focusin', focusIn);
      viewport.removeEventListener('focusout', focusOut);
      gsap.set(track, { clearProps: 'transform' });
      controllerRef.current = null;
    };
  }, [reduced]);

  const navigate = () => {
    if (draggedRef.current) { draggedRef.current = false; return; }
    if (onNavigate) onNavigate('industries');
    else document.getElementById('industries')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section className="client-wall" aria-labelledby="client-wall-title">
      <header className="client-wall__heading"><div><span className="widget-kicker">A few of the worlds we work in</span><h2 id="client-wall-title">A place for your point of view.</h2></div><div className="client-wall__controls"><span>Drag to explore</span><button onClick={() => controllerRef.current?.(-1)} aria-label="Previous industries"><ArrowLeft size={16} /></button><button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play industry wall' : 'Pause industry wall'} aria-pressed={paused}>{paused ? <Play size={15} /> : <Pause size={15} />}</button><button onClick={() => controllerRef.current?.(1)} aria-label="Next industries"><ArrowRight size={16} /></button></div></header>
      <div ref={viewportRef} className="client-wall__viewport" data-cursor="DRAG" aria-label="Industry wall; drag to explore" onKeyDown={(event) => { if (!reduced && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) { event.preventDefault(); controllerRef.current?.(event.key === 'ArrowRight' ? 1 : -1); } }}>
        <div ref={trackRef} className="client-wall__track">{industries.map(({ name, icon: Icon, tag, focus }, index) => <button key={name} className="client-wall__tile" onClick={navigate} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') draggedRef.current = false; }}><span className="client-wall__tile__top"><Icon size={22} /><span>{tag} / 0{index + 1}</span></span><strong>{name}</strong><span className="client-wall__tile__detail"><b>A tailored approach</b>{focus}</span><ArrowUpRight className="client-wall__tile__arrow" size={20} /></button>)}</div>
      </div>
      <p className="client-wall__note">Six industries, with a digital presence shaped around each one.</p>
    </section>
  );
}

