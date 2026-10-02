import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import useInView from '../../hooks/useInView';
import '../../styles/widgets.css';

const words = [
  { text: 'Hello.', lang: 'en', label: 'English' },
  { text: 'నమస్కారం.', lang: 'te', label: 'Telugu' },
  { text: 'नमस्ते.', lang: 'hi', label: 'Hindi' },
];

export default function LanguageCycler() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (reduced || paused || hovered || !visible) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 3200);
    return () => window.clearInterval(timer);
  }, [reduced, paused, hovered, visible]);

  return (
    <button ref={ref} type="button" className="language-cycler" onClick={() => setPaused(!paused)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}
      aria-label={`${paused ? 'Resume' : 'Pause'} multilingual greeting`} aria-pressed={paused}>
      <span className="language-cycler__mask" aria-hidden="true">
        <span key={index} lang={words[index].lang} className="language-cycler__word">{words[index].text}</span>
      </span>
      <span className="language-cycler__label" aria-hidden="true">{words[index].label} / {paused ? 'Paused' : 'A warm welcome'}</span>
    </button>
  );
}
