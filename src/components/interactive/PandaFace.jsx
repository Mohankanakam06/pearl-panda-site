import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useReducedMotion from '../../hooks/useReducedMotion';
import useInView from '../../hooks/useInView';

const sections = ['home', 'projects', 'services', 'industries', 'about'];

export default function PandaFace({ activeSection = 'home', celebrate = false, mini = false, className = '' }) {
  const rootRef = useRef(null);
  const eyesRef = useRef(null);
  const squintRef = useRef(null);
  const pupilsRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(rootRef);
  const active = Math.max(0, sections.indexOf(activeSection));

  useEffect(() => {
    if (reducedMotion || !inView) return undefined;
    let removeListeners;
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(pupilsRef.current, 'x', { duration: 0.35, ease: 'power4.out' });
      const yTo = gsap.quickTo(pupilsRef.current, 'y', { duration: 0.35, ease: 'power4.out' });
      gsap.set(squintRef.current, { transformOrigin: '50% 50%' });
      const squintTo = gsap.quickTo(squintRef.current, 'scaleY', { duration: 0.18, ease: 'power4.out' });
      const blink = gsap.timeline({ repeat: -1, repeatDelay: 4.6 })
        .to(eyesRef.current, { scaleY: 0.12, duration: 0.09, transformOrigin: '50% 50%' })
        .to(eyesRef.current, { scaleY: 1, duration: 0.12 });
      const track = (event) => {
        const bounds = rootRef.current.getBoundingClientRect();
        xTo(gsap.utils.clamp(-5, 5, (event.clientX - bounds.left - bounds.width / 2) / 65));
        yTo(gsap.utils.clamp(-3, 3, (event.clientY - bounds.top - bounds.height / 2) / 85));
      };
      const squint = (event) => {
        const isCTA = event.target instanceof Element && event.target.closest('.btn-brutal, [data-panda-trigger]');
        if (isCTA) blink.pause();
        else blink.resume();
        squintTo(isCTA ? 0.6 : 1);
      };
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        window.addEventListener('pointermove', track, { passive: true });
        document.addEventListener('pointerover', squint, { passive: true });
      }
      removeListeners = () => {
        window.removeEventListener('pointermove', track);
        document.removeEventListener('pointerover', squint);
      };
    }, rootRef);
    return () => { removeListeners?.(); ctx.revert(); };
  }, [inView, reducedMotion]);

  useEffect(() => {
    if (!celebrate || reducedMotion || !inView) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline().to('.panda-face__drawing', { y: -12, rotation: -7, duration: 0.18 })
        .to('.panda-face__drawing', { y: 0, rotation: 6, duration: 0.2 })
        .to('.panda-face__drawing', { y: -8, rotation: -4, duration: 0.18 })
        .to('.panda-face__drawing', { y: 0, rotation: 0, duration: 0.25, ease: 'power4.out' });
    }, rootRef);
    return () => ctx.revert();
  }, [celebrate, inView, reducedMotion]);

  return (
    <div ref={rootRef} className={`panda-face ${mini ? 'panda-face--mini' : ''} ${className}`} aria-hidden="true">
      <svg className="panda-face__drawing" viewBox="0 0 180 164" fill="none">
        <path d="M31 59C12 48 15 23 32 21C48 18 57 29 57 42M123 42C124 28 133 18 149 22C165 27 167 48 150 60" fill="var(--color-ink)" stroke="var(--color-light)" strokeWidth="1.5" />
        <path d="M27 87C24 53 46 31 88 30C131 28 156 55 153 88C151 118 127 134 91 135C55 136 29 121 27 87Z" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <path d="M42 74C44 58 59 55 70 66C80 76 75 94 64 98C52 102 39 91 42 74ZM110 66C121 55 136 58 139 74C142 91 129 102 117 98C106 94 100 76 110 66Z" fill="var(--color-ink)" />
        <g ref={squintRef}><g ref={eyesRef}><g ref={pupilsRef} fill="var(--color-cream)"><ellipse cx="61" cy="77" rx="6" ry="7" /><ellipse cx="120" cy="77" rx="6" ry="7" /><circle cx="63" cy="76" r="2.5" fill="var(--color-ink)" /><circle cx="118" cy="76" r="2.5" fill="var(--color-ink)" /></g></g></g>
        <path d="M82 99C84 94 96 94 99 99C98 104 93 107 90 107C87 107 83 104 82 99Z" fill="var(--color-ink)" />
        <path d={celebrate ? 'M77 111C83 122 99 122 105 111' : 'M80 113Q86 119 91 111Q96 118 102 113'} stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
        {sections.map((section, index) => <circle key={section} cx={66 + index * 12} cy="152" r={index === active ? 2.8 : 1.6} fill={celebrate || index === active ? 'var(--color-gold)' : 'var(--color-light)'} opacity={celebrate || index === active ? 1 : 0.45} />)}
      </svg>
      {!mini && <span className="panda-face__status">{celebrate ? 'A lovely place to begin.' : 'A little curiosity goes a long way.'}</span>}
    </div>
  );
}
