import { useEffect, useRef } from 'react';

const sections = [['home', 'Home'], ['projects', 'Work'], ['services', 'Services'], ['industries', 'Industries'], ['about', 'About']];

export default function ScrollProgressBar({ activeSection = 'home', onNavigate }) {
  const fillRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  return <nav className="studio-progress" aria-label="Reading progress and sections"><div className="studio-progress__fill" ref={fillRef} />{sections.map(([id, label]) => <button key={id} onClick={() => onNavigate?.(id)} aria-label={`Go to ${label}`} aria-current={id === activeSection ? 'location' : undefined}><span>{label}</span></button>)}</nav>;
}

