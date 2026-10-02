import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from './useReducedMotion';
import { motion } from '../lib/motion';
gsap.registerPlugin(ScrollTrigger);
export default function useReveal(ref, { selector = '[data-reveal]', stagger = motion.stagger } = {}) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const context = gsap.context(() => {
      const items = gsap.utils.toArray(selector, ref.current);
      items.forEach((element, index) => {
        gsap.fromTo(element, { y: 28, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, {
          y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: motion.duration.reveal,
          delay: (index % 4) * stagger, ease: motion.ease.reveal,
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
    }, ref);
    return () => context.revert();
  }, [ref, reduced, selector, stagger]);
}
