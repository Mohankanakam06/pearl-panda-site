import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    num: '01',
    title: 'BESPOKE PORTFOLIO & BRAND PLATFORM',
    oneLiner: 'Ultra-fast, mobile-first brand flagships engineered with modern typography, zero-bloat code, and high-converting inquiry capture.',
    deliverables: ['Custom Neo-Brutalist Layouts', 'Sub-second Edge CDN Deployment', 'Interactive Canvas Showcases', 'Automated Lead Notification'],
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
    title: 'DYNAMIC WEB SOFTWARE & CLOUD DATABASE',
    oneLiner: 'Interactive web applications powered by robust cloud databases, automated workflows, client portals, and real-time synchronization.',
    deliverables: ['Cloud Database Architecture', 'Role-Based Authentication', 'Third-Party API Integrations', 'Real-Time Telemetry Panels'],
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
    title: 'INTERACTIVE 3D & DIGITAL EXPERIENCES',
    oneLiner: 'Immersive WebGL and Three.js environments that transform passive website visitors into captivated brand evangelists.',
    deliverables: ['Three.js Volumetric Particle Systems', 'Custom GLSL Shaders', 'Cinematic Product Customizers', 'Hardware-Accelerated 60fps'],
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
    title: 'MONTHLY HIGH-IMPACT SOCIAL CADENCE',
    oneLiner: 'Continuous brand dominance through multi-slide educational carousels, persuasive conversion hooks, and hands-off publishing.',
    deliverables: ['Monthly Editorial Roadmaps', 'Branded Visual Creatives', 'Persuasive Direct-Response Copy', 'Monthly Growth Analytics'],
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

      // Animate clip-path reveal for each service card's image as it enters the viewport
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
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050d08] border-2 border-[#2E8B3C] font-mono text-xs uppercase tracking-widest text-[#70B85A] font-bold mb-4 shadow-brutal-sm">
              <span className="w-2 h-2 bg-[#38E54D]" />
              <span>CORE CAPABILITIES // 01 - 04</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.92]">
              NUMBERED SERVICES <br />
              <span className="text-[#38E54D]">ENGINEERED TO DOMINATE</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/75 font-body leading-relaxed border-l-3 border-[#DAAF37] pl-4">
            Each service functions as a standalone high-impact asset or seamlessly connects into an omnichannel growth machine.
          </p>
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
                        TIER // {service.num} OF 04
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[0.95] mb-4">
                      {service.title}
                    </h3>

                    {/* One-Line Description */}
                    <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed font-body mb-6 font-medium">
                      {service.oneLiner}
                    </p>

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
                      data-cursor="INQUIRE"
                      className="btn-brutal bg-[#DAAF37] text-[#0B1F16] px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold flex items-center gap-3 hover:bg-white"
                    >
                      <span>INQUIRE THIS SERVICE</span>
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
                    {/* Hover Overlay Stamp */}
                    <div className="absolute inset-0 bg-[#0B1F16]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-4 py-2 text-xs font-mono font-bold">
                        EXPAND VIEW // ↗
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
