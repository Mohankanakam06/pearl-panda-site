import React, { useRef } from 'react';
import { ArrowUpRight, Check, Code2, MessageSquare } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import SiteScanBadge from './interactive/SiteScanBadge';

const options = [
  { id: '01', type: 'Website development', title: ['Something new', 'starts here.'], subtitle: 'A website, made around you', description: 'Tell us what you’re building. We’ll help you choose the right website type and put together a quote around your requirements.', inclusions: ['Basic portfolio websites', 'Websites with a backend', 'Complete web applications'], service: 'Website Development Quote', cta: 'Discuss your website', icon: Code2, tone: 'gold' },
  { id: '02', type: 'Social media & combined packages', title: ['Keep the', 'conversation going.'], subtitle: 'A considered monthly presence', description: 'Stay present with content planning, creative work and publishing support. Add a website for one consistent direction across everything.', inclusions: ['Content planning & social creatives', 'Captions, copy & publishing support', 'Website + social media packages'], service: 'Social Media / Combo Package', cta: 'Explore monthly packages', icon: MessageSquare, tone: 'light' },
];

export default function SplitCTA({ onOpenContact }) {
  const sectionRef = useRef(null);
  useReveal(sectionRef);
  return (
    <section id="cta" ref={sectionRef} className="split-cta-section">
      <div className="section-shell split-cta-heading" data-reveal><span className="section-kicker">05 / An open invitation</span><span className="split-cta-note">We’d love to hear what you have in mind.</span></div>
      <div className="split-cta-grid">
        {options.map((option) => <article className={`split-cta-panel cta-tone-${option.tone}`} key={option.id}>
          <div className="split-cta-panel-top"><span><option.icon size={17} />{option.type}</span><span className="split-cta-number">/{option.id}</span></div>
          <div className="split-cta-content"><p className="split-cta-subtitle">{option.subtitle}</p><h2>{option.title[0]}<br /><span>{option.title[1]}</span></h2><p className="split-cta-description">{option.description}</p><ul>{option.inclusions.map((item) => <li key={item}><Check size={15} strokeWidth={3} />{item}</li>)}</ul></div>
          <button onClick={() => onOpenContact(option.service)} className="editorial-link split-cta-action" data-cursor="ASK"><span>{option.cta}</span><ArrowUpRight size={24} /></button>
        </article>)}
      </div>
      <div className="split-cta-footer section-shell"><p>Get in touch for current rates and package details.</p><span>Scope and deliverables agreed before we begin.</span></div>
      <div className="cta-scan-wrap section-shell"><SiteScanBadge onOpenContact={onOpenContact} /></div>
    </section>
  );
}
