import React from 'react';
import { Check, Compass, Code, Rocket, Palette, Sparkles, Zap, Shield, Trophy, Users } from 'lucide-react';

export default function AboutSection({ onOpenContact }) {
  const steps = [
    {
      step: '01',
      title: 'Discovery & Vision',
      desc: 'We analyze your market, study your direct competitors, understand your ideal clients, and map out your strategic objectives.'
    },
    {
      step: '02',
      title: 'Tier & Roadmap',
      desc: 'We select the perfect web architecture tier and tailor a monthly social media cadence designed around your conversion goals.'
    },
    {
      step: '03',
      title: 'Scope Confirmation',
      desc: 'Transparent milestones, deliverables, tech specifications, and fixed timelines confirmed with zero ambiguity before work begins.'
    },
    {
      step: '04',
      title: 'Craft & Engineering',
      desc: 'Bespoke design, high-performance clean code development, and high-aesthetic branded creative asset production.'
    },
    {
      step: '05',
      title: 'Interactive Review',
      desc: 'Private staging environment testing, responsive device validation, and agreed revisions polished to perfection.'
    },
    {
      step: '06',
      title: 'Global Launch',
      desc: 'Production deployment to high-speed cloud edge networks, DNS setup, and the start of scheduled monthly social media distribution.'
    }
  ];

  const pillars = [
    {
      icon: Zap,
      title: 'Sub-Second Performance',
      desc: 'Optimized assets, clean DOM hierarchies, and edge CDN delivery achieving 95+ Google Lighthouse speed scores.'
    },
    {
      icon: Code,
      title: '100% Bespoke Codebase',
      desc: 'Zero bloated page-builders or cookie-cutter templates. Modern React, Three.js shaders, and custom UI engineered for longevity.'
    },
    {
      icon: Palette,
      title: 'Omnichannel Harmony',
      desc: 'Your website and social media presence share the same bold typography, color psychology, and persuasive voice.'
    },
    {
      icon: Users,
      title: 'Direct Senior Access',
      desc: 'Communicate directly with senior creators and engineers. Transparent communication, rapid iterations, and personal attention.'
    }
  ];

  return (
    <section id="about" className="relative z-20 py-28 px-6 sm:px-10 md:px-14 bg-[#06120a] border-t border-[#184225]/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F16] border border-[#2E8B3C]/50 text-[11px] font-mono-tag uppercase tracking-widest text-[#70B85A] mb-4">
              <span>HOW WE WORK</span>
              <span>•</span>
              <span>THE PEARL STANDARD</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Clean. Friendly. <br />
              <span className="text-[#38E54D]">Modern. Memorable.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/70 leading-relaxed">
            Pearl Panda eliminates unnecessary fluff. We pair bold, neo-brutalist visual clarity with friendly, frictionless digital experiences that turn visitors into devoted advocates.
          </p>
        </div>

        {/* 6 Steps: How We Work */}
        <div className="mb-24">
          <div className="text-xs font-mono-tag uppercase tracking-widest text-[#70B85A] mb-8 font-semibold">
            Our 6-Stage Execution Process
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st) => (
              <div 
                key={st.step}
                className="p-7 rounded-2xl bg-[#091a10] border border-[#1a3824] hover:border-[#38E54D]/40 transition duration-300 relative group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tag text-xs font-bold text-[#38E54D] px-2.5 py-1 rounded-lg bg-[#38E54D]/10 border border-[#38E54D]/30">
                    STAGE {st.step}
                  </span>
                  <span className="text-white/20 group-hover:text-white/40 transition text-sm font-mono-tag">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2.5 group-hover:text-[#38E54D] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars of Engineering & Design Excellence */}
        <div className="rounded-3xl bg-[#08180f] border border-[#234b30] p-8 sm:p-12 relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-[#DAAF37] mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            STANDARDS OF CRAFT
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mb-8">
            Why Visionary Brands Partner with Pearl Panda
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-[#70B85A]/40 transition">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0B1F16] border border-[#2E8B3C]/50 flex items-center justify-center text-[#38E54D] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-display font-bold text-base text-white mb-2">
                      {pillar.title}
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-white/70">
              Ready to elevate your digital presence? We take on a limited number of clients each quarter to ensure uncompromised quality.
            </div>
            <button
              onClick={() => onOpenContact('General Project')}
              className="px-7 py-3 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#38E54D] transition duration-300 shadow-lg shadow-black/40 hover:scale-105"
            >
              Start Your Project →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
