import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    num: '01',
    category: 'WEBSITE DEVELOPMENT',
    title: 'BASIC PORTFOLIO WEBSITE',
    oneLiner: 'Clean responsive informational website with essential pages, navigation, contact / CTA sections and deployment.',
    deliverables: [
      'Responsive pages across mobile, tablet & desktop',
      'Essential navigation & service / work sections',
      'High-converting contact / CTA sections',
      'Direct deployment & fast load performance'
    ],
    examples: 'Café, restaurant, portfolio, local business',
    image: '/assets/service-1.svg',
    cardBg: 'bg-[#0B1F16]',
    textColor: 'text-white',
    numberColor: 'text-[#70B85A]',
    borderColor: 'border-[#FFFFFF]',
    accentColor: '#70B85A',
    shadowClass: 'shadow-brutal-white-lg',
  },
  {
    num: '02',
    category: 'WEBSITE DEVELOPMENT',
    title: 'WEBSITE WITH BACKEND',
    oneLiner: 'Frontend connected to backend and database for dynamic information, forms and required functionality.',
    deliverables: [
      'Frontend + backend + cloud database integration',
      'Dynamic information & structured content data',
      'Dynamic enquiry forms & lead handling',
      'Custom database schema & API connections'
    ],
    examples: 'Event company, business directory, property listings',
    image: '/assets/service-2.svg',
    cardBg: 'bg-[#FFFFFF]',
    textColor: 'text-[#0B1F16]',
    numberColor: 'text-[#2E8B3C]',
    borderColor: 'border-[#0B1F16]',
    accentColor: '#2E8B3C',
    shadowClass: 'shadow-brutal-lg',
  },
  {
    num: '03',
    category: 'WEBSITE DEVELOPMENT',
    title: 'FULL BACKEND WEBSITE',
    oneLiner: 'Complete web application with backend, database, login / authentication and application-specific functionality.',
    deliverables: [
      'Complete web application architecture',
      'Secure login / authentication & permissions',
      'Application-specific functionality & workflows',
      'Customer portals, booking engines & dashboards'
    ],
    examples: 'Real-estate platform, booking system, customer portal',
    image: '/assets/service-3.svg',
    cardBg: 'bg-[#2E8B3C]',
    textColor: 'text-white',
    numberColor: 'text-[#DAAF37]',
    borderColor: 'border-[#FFFFFF]',
    accentColor: '#DAAF37',
    shadowClass: 'shadow-brutal-gold-lg',
  },
  {
    num: '04',
    category: 'MONTHLY SOCIAL MEDIA MANAGEMENT',
    title: 'SOCIAL MEDIA — MONTHLY PACKAGE',
    oneLiner: 'Monthly packages covering content planning, creative content, captions and publishing support adapted to your industry.',
    deliverables: [
      'Content Planning: Monthly ideas, pillars & calendar',
      'Social Creatives: Branded posts, carousels & formats',
      'Captions & Copy: Hooks, CTAs & platform copy',
      'Scheduling, Publishing & Monthly Overview report'
    ],
    examples: 'Cafés, events, real estate, retail, creators, startups',
    image: '/assets/service-4.svg',
    cardBg: 'bg-[#050d08]',
    textColor: 'text-white',
    numberColor: 'text-[#38E54D]',
    borderColor: 'border-[#38E54D]',
    accentColor: '#38E54D',
    shadowClass: 'shadow-brutal-white-lg',
  },
];

export default function NumberedServices({ onOpenContact }) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      imageRefs.current.forEach((imgEl, idx) => {
        if (!imgEl) return;

        gsap.fromTo(
          imgEl,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            scale: 1.15,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRefs.current[idx],
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative z-20 w-full bg-[#0B1F16] text-white py-24 sm:py-32 px-4 sm:px-8 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header from PRD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050d08] border-2 border-[#2E8B3C] font-mono text-xs uppercase tracking-widest text-[#70B85A] font-bold mb-4 shadow-brutal-sm">
              <span className="w-2 h-2 bg-[#38E54D]" />
              <span>SERVICES WE PROVIDE // 01 - 04</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.92]">
              WEBSITE TYPES &amp; <br />
              <span className="text-[#38E54D]">MONTHLY SOCIAL MEDIA</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/80 font-body leading-relaxed border-l-3 border-[#DAAF37] pl-4">
            Pearl Panda develops websites based on the client&apos;s industry and selected website type. Content and creative direction are adapted to the client&apos;s industry, audience and brand style.
          </p>
        </div>

        {/* Highlight Banner: Website + Social Media Combo (from PRD Page 2) */}
        <div className="mb-14 p-6 sm:p-8 bg-[#050d08] border-4 border-[#DAAF37] shadow-brutal-gold-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DAAF37] text-[#0B1F16] font-mono text-xs font-bold uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMBINED OPTION // WEBSITE + SOCIAL MEDIA COMBO</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
                PROJECT BUILD + ONGOING MONTHLY SERVICE
              </h3>
              <p className="text-sm sm:text-base text-white/80 max-w-3xl font-body leading-relaxed">
                The combo package combines website development with a monthly social media package. The website is handled as a project, while social media continues as a monthly service. Website and social media share the same visual direction, colours, typography and content style.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('Website + Social Media Combo')}
              data-cursor="COMBO"
              className="btn-brutal bg-[#DAAF37] text-[#0B1F16] px-6 py-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-white flex-shrink-0"
            >
              <span>ENQUIRE COMBO PACKAGE</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative space-y-12 sm:space-y-16 pb-24">
          {servicesData.map((service, index) => (
            <div
              key={service.num}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`sticky top-20 sm:top-24 w-full p-6 sm:p-10 md:p-14 border-4 ${service.borderColor} ${service.cardBg} ${service.textColor} ${service.shadowClass} transition-transform duration-300 will-change-transform`}
              style={{
                zIndex: index + 1,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                {/* Left Column: Number, Title, Description, Deliverables */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Giant Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-display text-7xl sm:text-8xl md:text-9xl leading-none font-bold select-none ${service.numberColor}`}>
                        {service.num}
                      </span>
                      <div className="font-mono text-xs font-bold uppercase px-3 py-1 border-2 border-current">
                        {service.category}
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[0.95] mb-4">
                      {service.title}
                    </h3>

                    {/* One-Line Description from PRD */}
                    <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed font-body mb-4 font-medium">
                      {service.oneLiner}
                    </p>

                    {/* Typical Examples from PRD */}
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-black/20 border border-current/30 text-xs font-mono">
                      <span className="font-bold opacity-75">EXAMPLES:</span>
                      <span className="font-semibold">{service.examples}</span>
                    </div>

                    {/* Deliverables Checklist Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t-2 border-current/20 mb-8">
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm font-mono">
                          <CheckCircle2 className="w-4 h-4 text-[#DAAF37] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    <button
                      onClick={() => onOpenContact(`Inquire: ${service.title}`)}
                      data-cursor="ENQUIRE"
                      className="btn-brutal bg-[#DAAF37] text-[#0B1F16] px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-3 hover:bg-white"
                    >
                      <span>ENQUIRE THIS SERVICE</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Big Graphic Image with Clip-Path Reveal & Hover Expansion */}
                <div className="lg:col-span-5 relative group cursor-pointer overflow-hidden border-3 border-current">
                  <div
                    ref={(el) => (imageRefs.current[index] = el)}
                    className="w-full aspect-[4/3] overflow-hidden will-change-[clip-path,transform]"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#0B1F16]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-4 py-2 text-xs font-mono font-bold">
                        PRD SPECIFICATION // ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
