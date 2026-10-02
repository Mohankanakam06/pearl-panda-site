import { useCallback, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PandaLogo from './PandaLogo';
import PandaParade from './interactive/PandaParade';
import '../styles/chrome.css';

export default function Navbar({ onOpenContact, onNavigate, activeSection = 'home' }) {
  const clicks = useRef({ count: 0, last: 0 });
  const [parade, setParade] = useState(false);
  const finishParade = useCallback(() => setParade(false), []);
  const handleLogo = () => {
    const now = Date.now();
    clicks.current.count = now - clicks.current.last < 1800 ? clicks.current.count + 1 : 1;
    clicks.current.last = now;
    if (clicks.current.count === 5) { setParade(true); clicks.current.count = 0; }
    onNavigate?.('home');
  };
  return <>
    <header className="studio-navbar"><div className="studio-navbar__inner">
      <button className="studio-navbar__brand" onClick={handleLogo} aria-label="Pearl Panda — back to home" data-cursor="HOME"><PandaLogo /></button>
      <nav className="studio-navbar__links" aria-label="Primary navigation">
        {[['projects', 'Our work'], ['services', 'What we do']].map(([id, label]) => <button key={id} onClick={() => onNavigate?.(id)} aria-current={activeSection === id ? 'location' : undefined} className="nav-ticker"><span><span>{label} ↗</span><span aria-hidden="true">{label} ↗</span></span></button>)}
      </nav>
      <button onClick={() => onOpenContact()} data-cursor="LET’S TALK" data-magnetic className="btn-brutal studio-navbar__cta"><span>Let’s talk</span><ArrowUpRight size={18} aria-hidden="true" /></button>
    </div></header>
    {parade && <PandaParade onComplete={finishParade} />}
  </>;
}

