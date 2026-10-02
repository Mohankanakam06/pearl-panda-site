import { useEffect } from 'react';
import gsap from 'gsap';
import useReducedMotion from './useReducedMotion';
export default function useMagnetic() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let target, rect, x, y;
    const clear = () => {
      if (!target) return;
      x?.tween.kill(); y?.tween.kill();
      gsap.set(target, { clearProps: 'transform' }); target = null;
    };
    const over = (event) => {
      const button = event.target.closest?.('[data-magnetic]');
      if (button === target) return;
      clear();
      if (!button) return;
      target = button; rect = target.getBoundingClientRect();
      x = gsap.quickTo(target, 'x', { duration: .35, ease: 'power3.out' });
      y = gsap.quickTo(target, 'y', { duration: .35, ease: 'power3.out' });
    };
    const move = (event) => {
      if (!target) return;
      x((event.clientX - rect.left - rect.width / 2) * .13);
      y((event.clientY - rect.top - rect.height / 2) * .13);
    };
    document.addEventListener('pointerover', over);
    document.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', clear, { passive: true });
    return () => { clear(); document.removeEventListener('pointerover', over); document.removeEventListener('pointermove', move); window.removeEventListener('scroll', clear); };
  }, [reduced]);
}
