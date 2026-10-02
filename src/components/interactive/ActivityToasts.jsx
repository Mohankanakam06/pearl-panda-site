import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import useReducedMotion from '../../hooks/useReducedMotion';
import '../../styles/widgets.css';

const tips = {
  projects: ['WORK / IN FOCUS', 'Explore the kind of digital presence we can build together.'],
  services: ['PANDA FIELD NOTES', 'Three website types. One monthly social package. Or bring them together.'],
  industries: ['FIND YOUR FIT', 'Try the three-question package finder below.'],
  about: ['OUR APPROACH', 'Scope, timeline and deliverables are agreed before work begins.'],
};

export default function ActivityToasts({ activeSection, isContactOpen = false }) {
  const reduced = useReducedMotion();
  const [toasts, setToasts] = useState([]);
  const seen = useRef(new Set());
  const lastShown = useRef(0);
  useEffect(() => {
    if (reduced || isContactOpen || !tips[activeSection] || seen.current.has(activeSection)) return;
    const delay = Math.max(2500, 20000 - (Date.now() - lastShown.current));
    const timer = window.setTimeout(() => {
      seen.current.add(activeSection);
      lastShown.current = Date.now();
      setToasts((items) => [...items.slice(-1), { id: activeSection, copy: tips[activeSection] }]);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [activeSection, reduced, isContactOpen]);
  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => setToasts((items) => items.slice(1)), 8500);
    return () => window.clearTimeout(timer);
  }, [toasts]);
  if (reduced || isContactOpen) return null;
  return <div className="activity-toasts" aria-live="polite" aria-relevant="additions">{toasts.map(({ id, copy }) => <div className="activity-toast" key={id}><ArrowUpRight size={18} aria-hidden="true" /><div><strong>{copy[0]}</strong><p>{copy[1]}</p></div><button onClick={() => setToasts((items) => items.filter((item) => item.id !== id))} aria-label="Dismiss field note"><X size={15} /></button></div>)}</div>;
}
