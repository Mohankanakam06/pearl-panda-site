import { useEffect, useRef, useState } from 'react';
import PandaLogo from './PandaLogo';
import useReducedMotion from '../hooks/useReducedMotion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      const skip = window.setTimeout(() => completeRef.current(), 60);
      return () => window.clearTimeout(skip);
    }
    const start = performance.now();
    const timers = [];
    const interval = window.setInterval(() => {
      const current = Math.min(100, Math.round((performance.now() - start) / 9));
      setProgress(current);
      if (current === 100) {
        window.clearInterval(interval);
        timers.push(window.setTimeout(() => setFading(true), 80));
        timers.push(window.setTimeout(() => completeRef.current(), 560));
      }
    }, 60);
    return () => { window.clearInterval(interval); timers.forEach((timer) => window.clearTimeout(timer)); };
  }, [reduced]);
  return <div className={`studio-preloader ${fading ? 'is-fading' : ''}`} role="status" aria-label="Welcome to Pearl Panda"><div className="studio-preloader__card"><PandaLogo /><p>A thoughtful presence.<br /><em>A lasting impression.</em></p><div className="studio-preloader__meter" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div><span className="studio-preloader__caption">Good things are taking shape.</span></div></div>;
}

