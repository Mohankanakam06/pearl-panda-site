import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useReducedMotion from '../hooks/useReducedMotion';
import useMagnetic from '../hooks/useMagnetic';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const stampRef = useRef(null);
  const reduced = useReducedMotion();
  useMagnetic();
  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cursor = cursorRef.current;
    const stamp = stampRef.current;
    const context = gsap.context(() => gsap.set(cursor, { x: -100, y: -100 }));
    const x = gsap.quickTo(cursor, 'x', { duration: .18, ease: 'power3.out' });
    const y = gsap.quickTo(cursor, 'y', { duration: .18, ease: 'power3.out' });
    let stampAnimation;
    const move = (event) => { x(event.clientX + 14); y(event.clientY + 14); cursor.style.opacity = '1'; };
    const over = (event) => {
      const target = event.target.closest?.('[data-cursor],button,a,input,textarea');
      const label = target?.dataset.cursor || (target?.matches('input,textarea') ? 'TYPE' : target ? 'OPEN' : '');
      labelRef.current.textContent = label;
      cursor.dataset.active = String(Boolean(label));
    };
    const leave = () => { cursor.style.opacity = '0'; };
    const press = (event) => {
      stampAnimation?.kill();
      gsap.set(stamp, { x: event.clientX - 16, y: event.clientY - 16, scale: .5, opacity: .8, rotation: -12 });
      stampAnimation = gsap.to(stamp, { scale: 2, opacity: 0, rotation: 0, duration: .4, ease: 'power3.out' });
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerdown', press);
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      x.tween.kill(); y.tween.kill(); stampAnimation?.kill(); context.revert();
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerdown', press); document.removeEventListener('pointerleave', leave); window.removeEventListener('blur', leave);
    };
  }, [reduced]);
  return <div className="studio-cursor" aria-hidden="true"><div ref={cursorRef} className="studio-cursor__label"><span ref={labelRef} /></div><div ref={stampRef} className="studio-cursor__stamp" /></div>;
}
