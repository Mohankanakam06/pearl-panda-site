import { ArrowUpRight, ArrowUp } from 'lucide-react';
import PandaLogo from './PandaLogo';

export default function Footer({ onOpenContact, onNavigate }) {
  return <footer className="studio-footer">
    <div className="studio-footer__top"><span className="studio-footer__eyebrow">A conversation is a good place to start.</span><button onClick={() => onOpenContact('Website + Social Media Combo')} data-cursor="LET’S TALK" className="studio-footer__invitation"><span>Your next chapter<br /><em>starts here.</em></span><ArrowUpRight aria-hidden="true" /></button></div>
    <div className="studio-footer__grid">
      <div><button onClick={() => onNavigate('home')} aria-label="Pearl Panda — home"><PandaLogo /></button><p>Thoughtful websites and a considered social presence, made for the way your business grows.</p><span className="studio-footer__motto">Clear in purpose. Full of personality.</span></div>
      <nav aria-label="Footer navigation"><span className="studio-footer__label">Look around</span>{[['home', 'Home'], ['projects', 'Work'], ['services', 'Services'], ['industries', 'Industries'], ['about', 'The studio']].map(([id, label]) => <button key={id} onClick={() => onNavigate(id)} className="footer-link">{label}<ArrowUpRight size={16} aria-hidden="true" /></button>)}</nav>
      <div><span className="studio-footer__label">Something in mind?</span><p>A new beginning, a fresh direction, or a little more possibility.</p><button onClick={() => onOpenContact('General Inquiry')} className="btn-brutal studio-footer__cta">Discuss your project<ArrowUpRight size={18} aria-hidden="true" /></button><p className="studio-footer__small">Clear scope. Thoughtful details.<br />A plan that feels right for you.</p></div>
    </div>
    <div className="studio-footer__bottom"><span>© {new Date().getFullYear()} Pearl Panda</span><span>Websites &amp; social media, with intention.</span><button onClick={() => onNavigate('home')}>Back to the beginning <ArrowUp size={14} aria-hidden="true" /></button></div>
  </footer>;
}

