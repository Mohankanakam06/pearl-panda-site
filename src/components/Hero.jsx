import React, { useRef } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import HeroScene3D from './HeroScene3D';
import CursorReveal from './CursorReveal';

export default function Hero({ onOpenContact, onNavigate }) {
  const heroContainerRef = useRef(null);

  return (
    <section 
      ref={heroContainerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#050d08] pt-28 pb-24 md:pt-32 md:pb-28"
    >
      {/* 1. Volumetric Overhead Spotlight Beam */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[75vh] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% -5%, rgba(56, 229, 77, 0.28) 0%, rgba(46, 139, 60, 0.16) 40%, rgba(11, 31, 22, 0.05) 75%, transparent 100%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Subtle top light ray cone */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[55vw] max-w-[800px] h-[90vh] pointer-events-none z-0 opacity-40"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 65deg, rgba(72, 208, 104, 0.2) 85deg, rgba(112, 184, 90, 0.25) 90deg, rgba(72, 208, 104, 0.2) 95deg, transparent 115deg)',
          filter: 'blur(35px)',
        }}
      />

      {/* Atmospheric deep vignette borders */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d08] via-transparent to-[#050d08]/60 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050d08]/80 via-transparent to-[#050d08]/80 pointer-events-none z-[1]" />

      {/* 2. Interactive Three.js Volumetric Particle Cloud */}
      <HeroScene3D />

      {/* 3. REVEAL LAYER: Cursor-following 260px soft spotlight reveal */}
      <CursorReveal 
        containerRef={heroContainerRef}
        revealImage="/bg_2.png"
        revealRadius={260}
      />

      {/* 4. Main Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 md:px-14 w-full my-auto">
        
        {/* Top Tagline / Category Badge */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#70B85A]/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38E54D] animate-ping" />
            <span className="font-mono-tag text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#A8F5B8] font-medium">
              | WEBSITES • SOCIAL MEDIA • DIGITAL PRESENCE
            </span>
          </div>
        </div>

        {/* Split Typography Grid framing the central 3D scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Headline + Primary Action Button */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="font-display text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[5.75rem] xl:text-[6.5rem] font-bold tracking-[-0.035em] text-white leading-[0.92] select-none">
              <span className="block drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]">
                Crafting
              </span>
              <span className="block drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)] text-[#FAFAFA]">
                the Digital
              </span>
            </h1>

            {/* Left Primary CTA Pill Button matching reference image */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                className="group relative inline-flex items-center gap-4 pl-6 pr-2.5 py-2.5 rounded-full bg-white text-[#06170d] font-semibold text-sm sm:text-base tracking-tight shadow-[0_15px_35px_rgba(46,139,60,0.25)] hover:shadow-[0_20px_45px_rgba(56,229,77,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="font-semibold text-[#091f13] group-hover:text-black">
                  Contact us
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#38E54D] flex items-center justify-center text-[#06170d] group-hover:rotate-45 transition-transform duration-300 shadow-sm shadow-[#38E54D]/70">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#70B85A]/40 text-xs sm:text-sm text-white/80 hover:text-white transition-all backdrop-blur-sm"
              >
                <span>Explore Capabilities</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#70B85A]" />
              </button>
            </div>
          </div>

          {/* Center visual spacer for particle cloud */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right Column: "on the Dot." + Impact Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-4">
            <h2 className="font-display text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[5.75rem] xl:text-[6.5rem] font-bold tracking-[-0.035em] text-white leading-[0.92] select-none">
              <span className="block drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]">
                on
              </span>
              <span className="block drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)] text-[#F0FDF4]">
                the Dot.
              </span>
            </h2>

            {/* Right Explanatory Paragraph */}
            <div className="mt-6 sm:mt-8 max-w-md">
              <p className="text-sm sm:text-base text-[#D1E7DD]/80 leading-relaxed font-normal tracking-wide">
                We engineer high-performance bespoke websites and orchestrate monthly social media campaigns that elevate ambitious brands and drive measurable business growth.
              </p>

              {/* Agency Distinction Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                <span className="px-2.5 py-1 rounded bg-[#0B1F16] border border-[#2E8B3C]/40 text-[11px] font-mono-tag text-[#A8F5B8]">
                  Bespoke Web Development
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0B1F16] border border-[#2E8B3C]/40 text-[11px] font-mono-tag text-[#A8F5B8]">
                  Monthly Social Growth
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0B1F16] border border-[#DAAF37]/50 text-[11px] font-mono-tag text-[#DAAF37]">
                  Unified Brand Strategy
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Center ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#2E8B3C]/10 blur-3xl" />
    </section>
  );
}
