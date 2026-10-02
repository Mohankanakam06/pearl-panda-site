import { useEffect } from 'react';
import PandaFace from './PandaFace';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function PandaParade({ onComplete }) {
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const timer = window.setTimeout(onComplete, reducedMotion ? 2200 : 3900);
    return () => window.clearTimeout(timer);
  }, [onComplete, reducedMotion]);
  return <div className={`panda-parade ${reducedMotion ? 'panda-parade--still' : ''}`} role="status"><span className="panda-parade__note">A little company for your journey.</span><div className="panda-parade__crew" aria-hidden="true">{[0, 1, 2, 3, 4].map((index) => <div key={index} style={{ '--panda-delay': `${index * 0.12}s` }}><PandaFace mini celebrate /></div>)}</div></div>;
}
