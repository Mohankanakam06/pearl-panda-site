import React, { useState } from 'react';
import { Utensils, Calendar, Building2, ShoppingBag, UserCheck, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IndustriesSection({ onOpenContact }) {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      id: 'cafes',
      name: 'Cafés & Restaurants',
      icon: Utensils,
      tag: 'Hospitality & Dining',
      headline: 'Mouthwatering menus & irresistible Instagram feeds',
      digitalNeeds: 'High-speed digital menus with QR integration, Google Maps & local discovery optimization, online reservations, seasonal promotions, and appetite-inducing Instagram reels.',
      socialExamples: 'High-resolution food photography, chef specials, behind-the-counter reels, customer reposts, and weekly promotional stories.',
      features: ['Interactive digital menu with QR support', 'Reservation & table enquiry system', 'Local SEO & Google Business profile schema', 'Monthly reels & stories production calendar']
    },
    {
      id: 'events',
      name: 'Events & Event Companies',
      icon: Calendar,
      tag: 'Conferences & Festivals',
      headline: 'High-energy ticket sales & captivating highlight reels',
      digitalNeeds: 'High-conversion event showcases, speaker rosters, interactive agendas, countdown timers, media galleries, and coordinated social hype campaigns.',
      socialExamples: 'Speaker announcements, artist spotlights, ticket tier countdowns, on-site real-time event coverage, and post-event recap videos.',
      features: ['Sleek agenda & speaker schedules', 'Direct ticketing / registration redirects', 'Dynamic video galleries with fast streaming', 'Social media launch hype campaign']
    },
    {
      id: 'realestate',
      name: 'Real Estate',
      icon: Building2,
      tag: 'Developments & Properties',
      headline: 'Architectural elegance and qualified lead generation',
      digitalNeeds: 'Interactive property listings, high-resolution project showcases, downloadable brochures, virtual tour embeds, and lead-focused landing pages.',
      socialExamples: 'Property walkthrough reels, development milestones, neighborhood highlights, investor carousels, and qualified buyer lead ads.',
      features: ['Filterable property catalogs & spec sheets', 'High-converting lead capture forms', 'Virtual tour & floor plan embeds', 'Targeted investor & buyer creative assets']
    },
    {
      id: 'retail',
      name: 'Retail & Local Businesses',
      icon: ShoppingBag,
      tag: 'Boutiques & Shops',
      headline: 'Foot traffic, online trust, and local market dominance',
      digitalNeeds: 'High-impact product and service showcases, location directions, click-to-contact CTAs, customer review displays, and consistent weekly social content.',
      socialExamples: 'New product drops, unboxings, seasonal sale flyers, local community stories, and behind-the-scenes founder videos.',
      features: ['Product catalogs & collection showcases', 'Click-to-WhatsApp / Direct Call CTAs', 'Local SEO ranking & schema markup', 'Monthly product photoshoot guides']
    },
    {
      id: 'creators',
      name: 'Creators & Personal Brands',
      icon: UserCheck,
      tag: 'Influencers & Leaders',
      headline: 'An unmistakable digital home for your audience & sponsors',
      digitalNeeds: 'Clean personal website, interactive media kit, content hub, newsletter capture, speaking inquiry forms, and multi-platform social media direction.',
      socialExamples: 'Branded thought leadership carousels, video short cuts, podcast clips, milestone celebrations, and sponsor integration posts.',
      features: ['Personal portfolio & press mentions', 'Brand partnership / sponsor media kit', 'Newsletter & link-in-bio hub', 'Platform-specific hook & caption copywriting']
    },
    {
      id: 'startups',
      name: 'Startups & Modern Ventures',
      icon: Rocket,
      tag: 'Tech & Growth Brands',
      headline: 'Instant credibility, rapid validation, and launch momentum',
      digitalNeeds: 'High-conversion corporate website, product demo pages, interactive lead capture, investor deck downloads, and authority-building social presence.',
      socialExamples: 'Product teasers, founder journey updates, customer case studies, industry benchmarks, and viral feature demonstrations.',
      features: ['Modern tech stack (React / Vite / Cloud)', 'Interactive demo & feature walk-throughs', 'Lead magnets & investor pitch decks', 'Early-access waitlist capture']
    }
  ];

  const current = industries[selectedIndustry];
  const IconComponent = current.icon;

  return (
    <section id="industries" className="relative z-20 py-28 px-6 sm:px-10 md:px-14 bg-[#050e08] border-t border-[#184225]/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F16] border border-[#2E8B3C]/50 text-[11px] font-mono-tag uppercase tracking-widest text-[#70B85A] mb-4">
            <span>SPECIALIZED DOMAINS</span>
            <span>•</span>
            <span>PROVEN INDUSTRY FIT</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Tailored for Your Industry
          </h2>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base leading-relaxed">
            Every market has its own visual language and customer expectations. We engineer websites and social media strategies precisely adapted to your sector.
          </p>
        </div>

        {/* Industry Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-10">
          {industries.map((ind, idx) => {
            const IndIcon = ind.icon;
            const isSelected = idx === selectedIndustry;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#0e2c19] border-[#38E54D] shadow-[0_0_25px_rgba(56,229,77,0.25)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className={`p-2.5 rounded-xl w-fit mb-3 ${isSelected ? 'bg-[#38E54D] text-[#050e08]' : 'bg-white/5 text-[#70B85A]'}`}>
                  <IndIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className={`font-display text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-white/80'}`}>
                    {ind.name}
                  </div>
                  <div className="text-[10px] text-white/50 mt-1 font-mono-tag truncate">
                    {ind.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Detail Showcase */}
        <div className="rounded-3xl bg-[#091a10] border border-[#234b2f] p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-3 rounded-2xl bg-[#38E54D]/10 border border-[#38E54D]/30 text-[#38E54D]">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono-tag text-xs text-[#70B85A] uppercase tracking-wider font-semibold">
                    {current.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {current.name}
                  </h3>
                </div>
              </div>

              <div className="text-lg sm:text-xl font-medium text-white/90 mb-6 italic">
                "{current.headline}"
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="font-mono-tag text-xs uppercase text-[#70B85A] font-semibold mb-1.5">
                    Strategic Web Architecture
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {current.digitalNeeds}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="font-mono-tag text-xs uppercase text-[#DAAF37] font-semibold mb-1.5">
                    Creative Social Direction
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {current.socialExamples}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenContact(`Industry: ${current.name}`)}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#38E54D] text-[#050e08] font-bold text-sm tracking-wide shadow-lg shadow-[#38E54D]/25 hover:scale-105 transition duration-300"
              >
                <span>Inquire for {current.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-5 bg-[#050d08]/85 rounded-2xl border border-white/10 p-6 sm:p-8">
              <div className="font-mono-tag text-xs uppercase tracking-wider text-white/50 mb-5 pb-3 border-b border-white/10">
                Core Deliverables
              </div>
              <div className="space-y-4">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#38E54D] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-tag uppercase text-white/40">Dedicated Framework for</div>
                  <div className="text-xs font-semibold text-[#70B85A]">{current.name}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2E8B3C]/20 border border-[#2E8B3C]/50 text-xs font-mono-tag text-[#38E54D]">
                  Custom Scope Ready
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
