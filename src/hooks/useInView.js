import { useEffect, useState } from 'react';
export default function useInView(ref, { threshold = 0.1, rootMargin = '0px', once = false } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (once && entry.isIntersecting) observer.disconnect();
    }, { threshold, rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);
  return inView;
}
