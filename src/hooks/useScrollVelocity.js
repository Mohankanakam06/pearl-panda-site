import { useEffect } from 'react';
import gsap from 'gsap';
import useReducedMotion from './useReducedMotion';
export default function useScrollVelocity(ref) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const element = ref.current;
    let previous = window.scrollY;
    let time = performance.now();
    let reset;
    const skew = gsap.quickTo(element, 'skewY', { duration: 0.35, ease: 'power3.out' });
    const scroll = () => {
      const now = performance.now();
      const velocity = (window.scrollY - previous) / Math.max(now - time, 16);
      previous = window.scrollY; time = now;
      skew(gsap.utils.clamp(-1.8, 1.8, velocity * -0.6));
      clearTimeout(reset);
      reset = setTimeout(() => skew(0), 110);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', scroll);
      clearTimeout(reset); skew.tween.kill(); gsap.set(element, { clearProps: 'transform' });
    };
  }, [ref, reduced]);
}
