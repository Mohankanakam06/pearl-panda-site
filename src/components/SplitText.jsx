import { useRef } from 'react';
import useReveal from '../hooks/useReveal';
export default function SplitText({ children, as: Tag = 'span', className = '' }) {
  const ref = useRef(null);
  useReveal(ref, { selector: '[data-word]', stagger: .035 });
  const words = String(children).split(' ');
  return <Tag ref={ref} className={`split-text ${className}`} aria-label={String(children)}>{words.map((word, index) => <span key={`${word}-${index}`} className="split-text__mask" aria-hidden="true"><span data-word>{word}</span>{' '}</span>)}</Tag>;
}
