import React from 'react';
import { Zap, Code, Palette, Users, ArrowUpRight, Sparkles, Check } from 'lucide-react';

export default function AboutSection({ onOpenContact }) {
  const steps = [
    {
      step: '01',
      title: 'DISCOVERY & VISION',
      desc: 'Market analysis, direct competitor audit, client persona mapping, and architectural technical blueprinting.'
    },
    {
      step: '02',
      title: 'ROADMAP & ARCHITECTURE',
      desc: 'Selection of optimal web framework (React / Vite / GSAP / Three.js) and tailored monthly social cadence.'
    },
    {
      step: '03',
      title: 'TRANSPARENT SCOPE',
      desc: 'Milestones, deliverables, fixed investment schedules, and zero hidden scope creep confirmed upfront.'
    },
    {
      step: '04',
      title: 'CRAFT & ENGINEERING',
      desc: 'Bespoke design, sub-second code execution, 60fps animations, and striking branded creative production.'
    },
    {
      step: '05',
      title: 'STAGING & VALIDATION',
      desc: 'Rigorous cross-device testing across mobile, tablet, and ultra-wide displays before launch approval.'
    },
    {
      step: '06',
      title: 'GLOBAL DEPLOYMENT',
      desc: 'High-speed edge CDN deployment, DNS setup, and rollout of scheduled monthly social media distribution.'
    }
  ];

  const pillars = [
    {
      icon: Zap,
      title: 'SUB-SECOND SPEED',
      desc: 'Clean DOM hierarchies and edge CDN delivery achieving 98+ Google Lighthouse performance scores.'
    },
    {
      icon: Code,
      title: '100% BESPOKE CODE',
      desc: 'Zero generic templates or bloated page-builders. Pure custom code crafted for brand dominance.'
    },
    {
      icon: Palette,
      title: 'OMNICHANNEL HARMONY',
      desc: 'Websites and social feeds share matching brutalist typography, color psychology, and conversion voice.'
    },
    {
      icon: Users,
      title: 'DIRECT SENIOR ACCESS',
      desc: 'Communicate directly with senior engineering directors. Fast iterations with zero account middlemen.'
    }
  ];

  return (
    <section id="about" className="relative z-20 py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#2E8B3C] text-white border-y-4 border-[#0B1F16] select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1F16] border-2 border-white text-[#DAAF37] font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-brutal-white">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PEARL STANDARD // 6-STAGE EXECUTION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.92]">
              RIGOROUS PROCESS. <br />
              <span className="text-[#DAAF37]">UNCOMPROMISING SPEED.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/90 font-body leading-relaxed border-l-4 border-white pl-4 font-medium">
            Pearl Panda eliminates agency bloat. We combine bold neo-brutalist aesthetics with frictionless engineering so every build delivers tangible business velocity.
          </p>
        </div>

        {/* 6 Steps: How We Work */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st) => (
              <div 
                key={st.step}
                className="p-6 sm:p-8 bg-[#0B1F16] border-3 border-white shadow-brutal-white transition duration-200 relative group hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-3">
                  <span className="font-mono text-xs font-bold text-[#38E54D] px-2 py-0.5 bg-[#050d08] border border-[#38E54D]">
                    STAGE // {st.step}
                  </span>
                  <span className="text-[#DAAF37] font-display text-lg">
                    ★
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#38E54D] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars of Engineering Excellence */}
        <div className="bg-[#0B1F16] border-4 border-white shadow-brutal-white-lg p-8 sm:p-12 relative overflow-hidden">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#DAAF37] mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            STANDARDS OF CRAFT
          </div>
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tight">
            WHY VISIONARY BRANDS PARTNER WITH PEARL PANDA
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-6 bg-[#050d08] border-2 border-[#70B85A] flex flex-col justify-between hover:border-white transition shadow-brutal-sm">
                  <div>
                    <div className="w-10 h-10 bg-[#2E8B3C] text-white flex items-center justify-center font-bold mb-4 border border-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-display text-lg text-white mb-2 uppercase tracking-wide">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed font-body">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action strip */}
          <div className="pt-6 border-t-2 border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-white/80 uppercase tracking-widest">
              FIXED TIMELINES // ZERO GUESSWORK // 100% OWNERSHIP
            </span>
            <button
              onClick={() => onOpenContact('Process Inquiry')}
              data-cursor="START"
              className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-6 py-3 text-xs font-bold flex items-center gap-2 border-2 border-white hover:bg-white"
            >
              <span>DISCUSS YOUR TIMELINE</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
