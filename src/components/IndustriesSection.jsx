import React, { useRef, useState } from 'react';
import { Utensils, Calendar, Building2, ShoppingBag, UserCheck, Rocket, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import PandaQuiz from './interactive/PandaQuiz';
import useReveal from '../hooks/useReveal';
import '../styles/industries.css';

const industriesData = [
  {
    id: 'cafes',
    name: 'Cafés & Restaurants',
    icon: Utensils,
    tag: 'HOSPITALITY',
    digitalNeeds: 'Menu / food showcase, location, reservations or enquiries, offers, Instagram content and promotions.',
    socialExamples: 'Food photography posts, menu highlights, offers, reels, ambience and customer-focused content.',
    features: [
      'Interactive digital menu & food showcase',
      'Location, directions & Google Business schema',
      'Table reservations & enquiry routing',
      'Promotional offers & Instagram reels support'
    ]
  },
  {
    id: 'events',
    name: 'Events & Event Companies',
    icon: Calendar,
    tag: 'EXPERIENCES',
    digitalNeeds: 'Event showcase, enquiry forms, event galleries, promotional content and social media campaigns.',
    socialExamples: 'Event promotions, countdowns, highlights, venue content, announcements and post-event content.',
    features: [
      'Comprehensive event showcase & agendas',
      'Direct ticket & attendance enquiry forms',
      'High-resolution event media galleries',
      'Promotional countdowns & hype campaigns'
    ]
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: Building2,
    tag: 'DEVELOPMENT',
    digitalNeeds: 'Property listings, project showcases, enquiry forms, lead-focused landing pages and property content.',
    socialExamples: 'Property showcases, walkthrough content, project updates, location highlights and enquiry-focused posts.',
    features: [
      'Filterable property listings & catalogs',
      'Project showcase pages & spec sheets',
      'Lead-focused landing pages & enquiry forms',
      'Walkthrough videos & property content'
    ]
  },
  {
    id: 'retail',
    name: 'Retail & Local Businesses',
    icon: ShoppingBag,
    tag: 'COMMERCE',
    digitalNeeds: 'Product / service showcase, contact information, promotions and consistent social media content.',
    socialExamples: 'Product showcases, new arrivals, offers, launches and promotional content.',
    features: [
      'Product & service showcase catalog',
      'Direct contact information & local SEO',
      'Seasonal promotional offer banners',
      'Consistent weekly social media assets'
    ]
  },
  {
    id: 'creators',
    name: 'Creators & Personal Brands',
    icon: UserCheck,
    tag: 'MEDIA',
    digitalNeeds: 'Portfolio, personal website, content presence, profile building and social media management.',
    socialExamples: 'Personal content, portfolio highlights, educational / entertainment content and audience engagement.',
    features: [
      'Clean personal portfolio & biography',
      'Audience content presence & newsletter hub',
      'Profile building & brand collaboration forms',
      'Educational carousels & engagement copy'
    ]
  },
  {
    id: 'startups',
    name: 'Startups & Small Businesses',
    icon: Rocket,
    tag: 'VENTURES',
    digitalNeeds: 'Company website, service pages, lead forms, launch content and ongoing social media presence.',
    socialExamples: 'Founder journey, launch announcements, feature highlights, and customer testimonials.',
    features: [
      'Modern company website & service pages',
      'High-converting lead generation forms',
      'Launch content & promotional roadmap',
      'Ongoing monthly social media presence'
    ]
  }
];

export default function IndustriesSection({ onOpenContact }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);
  const activeIndustry = industriesData[selectedIdx];
  const Icon = activeIndustry.icon;
  useReveal(sectionRef);

  const handleKey = (event, index) => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % industriesData.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + industriesData.length - 1) % industriesData.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = industriesData.length - 1;
    else return;
    event.preventDefault();
    setSelectedIdx(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="industries" ref={sectionRef} className="industries-section">
      <div className="industries-shell">
        <header className="industries-heading" data-reveal>
          <div>
            <span className="section-eyebrow">03 / Industries</span>
            <h2>Shaped for<br /><span>your world.</span></h2>
          </div>
          <div className="industries-heading__aside"><p>Our services can be tailored to different industries, with the website and social media style adapted to each business.</p></div>
        </header>

        <div className="industry-tabs" role="tablist" aria-label="Explore industries" data-reveal>
          {industriesData.map((industry, index) => {
            const ItemIcon = industry.icon;
            return <button key={industry.id} ref={(element) => { tabRefs.current[index] = element; }} id={`industry-tab-${industry.id}`} role="tab" aria-selected={selectedIdx === index} aria-controls={`industry-panel-${industry.id}`} tabIndex={selectedIdx === index ? 0 : -1} onClick={() => setSelectedIdx(index)} onKeyDown={(event) => handleKey(event, index)} className="industry-tab" data-cursor="EXPLORE"><span><ItemIcon size={20} /><small>0{index + 1}</small></span><strong>{industry.name}</strong><span className="industry-tab__tag">{industry.tag}<ArrowRight size={13} /></span></button>;
          })}
        </div>

        <div id={`industry-panel-${activeIndustry.id}`} role="tabpanel" aria-labelledby={`industry-tab-${activeIndustry.id}`} tabIndex={0} className="industry-blueprint" key={activeIndustry.id}>
          <div className="industry-blueprint__main">
            <div className="industry-blueprint__title"><span className="industry-blueprint__icon"><Icon size={26} strokeWidth={1.2} /></span><div><span className="widget-kicker">A closer look / 0{selectedIdx + 1}</span><h3>{activeIndustry.name}</h3></div></div>
            <div className="industry-blueprint__needs"><span className="widget-kicker">What your digital presence can do</span><p>{activeIndustry.digitalNeeds}</p></div>
            <ul className="industry-blueprint__features">{activeIndustry.features.map((feature) => <li key={feature}><CheckCircle2 size={16} /><span>{feature}</span></li>)}</ul>
            <button onClick={() => onOpenContact(`Industry Inquiry: ${activeIndustry.name}`)} data-cursor="ASK" className="btn-brutal bg-gold text-ink px-5 sm:px-7 py-4 gap-4"><span>Let’s talk about your business</span><ArrowRight size={18} /></button>
          </div>
          <aside className="industry-blueprint__social">
            <span className="widget-kicker"><Sparkles size={15} strokeWidth={1.2} /> Social media, in your voice</span>
            <h4>A feed that<br />feels <span>like you.</span></h4>
            <p>{activeIndustry.socialExamples}</p>
            <div className="industry-blueprint__cadence"><strong>A considered monthly rhythm</strong><span>Content Planning &amp; Posting Calendar</span><span>Branded Social Posts &amp; Carousels</span><span>Captions, Hooks &amp; Calls-to-Action</span><span>Publishing Support &amp; Monthly Review</span></div>
          </aside>
        </div>
        <PandaQuiz onOpenContact={onOpenContact} />
      </div>
    </section>
  );
}

