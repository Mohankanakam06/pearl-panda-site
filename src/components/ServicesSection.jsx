import React from 'react';
import { Globe, Share2, Sparkles, Check, ArrowRight, ShieldCheck, Database, Layout } from 'lucide-react';

export default function ServicesSection({ onOpenContact }) {
  const websiteTypes = [
    {
      num: '01',
      title: 'Bespoke Portfolio & Brand Showcase',
      badge: 'Fast Turnaround',
      description: 'Ultra-fast, mobile-first brand website engineered with modern typography, smooth interactions, and high-converting inquiry capture.',
      coreFeatures: [
        'Responsive layout across mobile, tablet & desktop',
        'Custom neo-brutalist / modern editorial styling',
        'Visual project showcase & interactive services gallery',
        'Instant inquiry capture & direct lead routing',
        'Sub-second load times & technical SEO foundation'
      ],
      idealFor: 'Cafés, Restaurants, Portfolios, Local Businesses, Consultants',
      accent: '#70B85A'
    },
    {
      num: '02',
      title: 'Dynamic Web Platform & Database',
      badge: 'Scalable & Dynamic',
      description: 'Interactive frontend powered by a robust backend and database for dynamic content management, real-time forms, and automated business workflows.',
      coreFeatures: [
        'Dynamic database integration & real-time updates',
        'Custom inquiry routing & automated lead notification',
        'Content management setup for easy client updates',
        'Third-party API integrations (booking, CRM, payments)',
        'Enhanced caching & cloud database security'
      ],
      idealFor: 'Event Companies, Directories, Property Showcases, Growing Agencies',
      accent: '#2E8B3C'
    },
    {
      num: '03',
      title: 'Custom Web Application & Digital Product',
      badge: 'Enterprise Architecture',
      description: 'End-to-end custom web software engineered with secure authentication, sophisticated application logic, client dashboards, and scalable infrastructure.',
      coreFeatures: [
        'Secure user authentication & permission controls',
        'Tailored application architecture & database schema',
        'Interactive client portals & analytics dashboards',
        'Payment gateway & custom scheduling engines',
        'High-concurrency cloud hosting & continuous monitoring'
      ],
      idealFor: 'Real-Estate Platforms, Booking Systems, Client Portals, SaaS MVPs',
      accent: '#DAAF37'
    }
  ];

  const socialMediaFeatures = [
    { title: 'Strategic Content Planning', desc: 'Monthly editorial calendar, high-converting hooks, industry pillars, and strategic theme development.' },
    { title: 'Branded Social Creatives', desc: 'Striking visual post designs, multi-slide educational carousels, stories, and platform-specific formats.' },
    { title: 'Persuasive Captions & Copy', desc: 'Engaging storytelling, psychological hooks, and actionable calls-to-action that drive real conversion.' },
    { title: 'Scheduled Publishing', desc: 'Hands-off consistency with scheduled publishing across your core social channels at peak engagement times.' },
    { title: 'Monthly Insights & Review', desc: 'Clear performance breakdown, audience growth metrics, and iterative strategy improvements.' }
  ];

  return (
    <section id="services" className="relative z-20 py-28 px-6 sm:px-10 md:px-14 bg-[#06120a] border-t border-[#184225]/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F16] border border-[#2E8B3C]/50 text-[11px] font-mono-tag uppercase tracking-widest text-[#70B85A] mb-4">
              <span>OUR CAPABILITIES</span>
              <span>•</span>
              <span>DIGITAL CRAFT & ENGINEERING</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Bespoke Websites & <br />
              <span className="text-[#38E54D]">Monthly Social Growth</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/70 leading-relaxed">
            We adapt every digital touchpoint to your specific audience. Clean aesthetic direction, robust software engineering, and continuous brand relevance.
          </p>
        </div>

        {/* 1. Website Development: The 3 Tiers */}
        <div className="mb-24">
          <div className="flex items-center gap-3.5 mb-10">
            <div className="p-3 rounded-2xl bg-[#0B1F16] border border-[#2E8B3C]/50 text-[#38E54D]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Web Development Tiers
              </h3>
              <p className="text-xs sm:text-sm text-white/60">
                Tailored architectural solutions to match your business scope and growth ambitions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {websiteTypes.map((tier) => (
              <div 
                key={tier.num}
                className="group relative rounded-3xl bg-[#091a10] border border-[#1b3b25] p-8 flex flex-col justify-between hover:border-[#38E54D]/50 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono-tag text-xs font-semibold text-[#70B85A] tracking-wider">
                      TIER {tier.num}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-mono-tag tracking-wider uppercase font-semibold"
                      style={{ 
                        backgroundColor: `${tier.accent}15`, 
                        color: tier.accent, 
                        border: `1px solid ${tier.accent}40` 
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#38E54D] transition-colors leading-tight">
                    {tier.title}
                  </h4>

                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-3 pt-5 border-t border-white/10 mb-6">
                    <div className="text-[11px] font-mono-tag uppercase tracking-wider text-white/50 mb-2">
                      Key Highlights
                    </div>
                    {tier.coreFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-[#38E54D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10">
                  <div className="text-[11px] font-mono-tag text-white/40 mb-1 uppercase tracking-wider">
                    Recommended For:
                  </div>
                  <div className="text-xs text-[#70B85A] font-medium mb-6">
                    {tier.idealFor}
                  </div>

                  <button
                    onClick={() => onOpenContact(tier.title)}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#38E54D] text-white hover:text-black text-xs font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-[#38E54D]"
                  >
                    <span>Request Proposal for Tier {tier.num}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Monthly Social Media & 3. Combo Package */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Social Media Monthly Retainer */}
          <div className="lg:col-span-7 rounded-3xl bg-[#08180e] border border-[#1d4029] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-2xl bg-[#0B1F16] border border-[#2E8B3C]/50 text-[#38E54D]">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Monthly Social Media Direction
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    High-touch creative strategy and scheduled content tailored to your industry
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {socialMediaFeatures.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#70B85A]/30 transition">
                    <div className="font-display text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38E54D]" />
                      {item.title}
                    </div>
                    <div className="text-xs text-white/65 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-white/60">
                Retained monthly partnership with senior creative direction.
              </span>
              <button
                onClick={() => onOpenContact('Monthly Social Media')}
                className="py-2.5 px-6 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold transition duration-300"
              >
                Inquire for Social Packages →
              </button>
            </div>
          </div>

          {/* Unified Digital Presence Combo */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#11301c] to-[#07170e] border border-[#DAAF37]/50 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-48 h-48 bg-[#DAAF37]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DAAF37]/20 border border-[#DAAF37]/50 text-[#DAAF37] font-mono-tag text-[10px] uppercase tracking-widest font-bold mb-4">
                <Sparkles className="w-3 h-3" />
                FLAGSHIP PARTNERSHIP
              </div>

              <h3 className="font-display text-3xl font-bold text-white mb-3">
                Website + Social Media Combo
              </h3>

              <p className="text-sm text-white/80 leading-relaxed mb-6">
                The complete digital engine. A bespoke website engineered as your brand headquarters, paired with ongoing monthly social execution for sustained reach and conversion.
              </p>

              <div className="space-y-3.5 bg-black/40 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 text-xs text-white/90">
                  <span className="font-mono-tag text-[#DAAF37] font-bold">1.</span>
                  <div>
                    <span className="font-semibold text-white">Custom Web Architecture:</span> Choose from Portfolio, Dynamic Platform, or Full Web Application.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-white/90">
                  <span className="font-mono-tag text-[#DAAF37] font-bold">2.</span>
                  <div>
                    <span className="font-semibold text-white">Monthly Social Engine:</span> Branded graphics, high-converting carousels, and strategic publishing.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-white/90">
                  <span className="font-mono-tag text-[#DAAF37] font-bold">3.</span>
                  <div>
                    <span className="font-semibold text-white">Unified Identity:</span> Cohesive typography, tone of voice, visual styling, and messaging across all touchpoints.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => onOpenContact('Website + Social Media Combo')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#DAAF37] hover:bg-[#ebbf46] text-[#07170e] font-display font-bold text-sm tracking-wide transition shadow-lg shadow-[#DAAF37]/25 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Get Combo Package Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
