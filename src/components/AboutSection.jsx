import React from 'react';
import { ArrowUpRight, Sparkles, Check, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onOpenContact }) {
  // Exact 6 steps from PRD Page 2 (Section 5: HOW WE WORK)
  const steps = [
    {
      step: '01',
      title: 'UNDERSTAND THE BUSINESS',
      desc: 'Understand the business, industry, audience and requirements.'
    },
    {
      step: '02',
      title: 'SELECT THE PACKAGE',
      desc: 'Select the website type and/or social media package.'
    },
    {
      step: '03',
      title: 'CONFIRM SCOPE & TIMELINE',
      desc: 'Confirm scope, content requirements, timeline and deliverables.'
    },
    {
      step: '04',
      title: 'DESIGN & DEVELOP',
      desc: 'Design, develop and prepare the required digital content.'
    },
    {
      step: '05',
      title: 'REVIEW & REVISE',
      desc: 'Share work for review and complete agreed revisions.'
    },
    {
      step: '06',
      title: 'LAUNCH & PUBLISH',
      desc: 'Launch the website and/or publish approved social media content.'
    }
  ];

  // Exact Brutalist principles from PRD Page 3 (Section 7: WEBSITE THEME — BRUTALISM)
  const brutalistPrinciples = [
    'Bold typography and strong visual hierarchy.',
    'Hard edges, visible borders and block-based layouts.',
    'High contrast using white, deep green / black and primary green.',
    'Gold used selectively as a premium accent.',
    'Strong buttons and direct calls-to-action.',
    'Minimal unnecessary decoration; typography, spacing and shapes create the visual character.',
    'Responsive across mobile, tablet and desktop.',
    'Usability and accessibility remain important.'
  ];

  return (
    <section id="about" className="relative z-20 py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#2E8B3C] text-white border-y-4 border-[#0B1F16] select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header from PRD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1F16] border-2 border-white text-[#DAAF37] font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-brutal-white">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HOW WE WORK // PRD SECTION 5</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.92]">
              OUR 6-STAGE <br />
              <span className="text-[#DAAF37]">EXECUTION PROCESS</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/95 font-body leading-relaxed border-l-4 border-white pl-4 font-medium">
            Package contents and deliverables are confirmed before work begins. Rates are not fixed on the website; visitors are directed to contact Pearl Panda for current pricing.
          </p>
        </div>

        {/* 6 Steps: How We Work (PRD Page 2) */}
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

        {/* Section 7 from PRD: WEBSITE THEME — BRUTALISM */}
        <div className="bg-[#0B1F16] border-4 border-white shadow-brutal-white-lg p-8 sm:p-12 relative overflow-hidden">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#DAAF37] mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            BRAND &amp; WEBSITE STYLE // PRD SECTION 7
          </div>
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 uppercase tracking-tight">
            WEBSITE THEME — BRUTALISM
          </h3>
          <p className="text-sm sm:text-base text-white/80 font-body max-w-2xl mb-8 leading-relaxed">
            The Pearl Panda website follows a Brutalist / Neo-Brutalist visual direction: bold, direct, distinctive and intentionally raw while remaining practical and easy to use.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {brutalistPrinciples.map((principle, idx) => (
              <div key={idx} className="p-4 bg-[#050d08] border-2 border-[#70B85A] flex items-start gap-3 shadow-brutal-sm">
                <CheckCircle2 className="w-4 h-4 text-[#38E54D] flex-shrink-0 mt-0.5" />
                <span className="text-xs font-mono text-white/90 leading-relaxed">
                  {principle}
                </span>
              </div>
            ))}
          </div>

          {/* PRD Motto & Direct Action */}
          <div className="pt-6 border-t-2 border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#DAAF37] uppercase tracking-widest font-bold">
              CLEAN. FRIENDLY. MODERN. MEMORABLE.
            </span>
            <button
              onClick={() => onOpenContact('Process Inquiry')}
              data-cursor="ENQUIRE"
              className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-6 py-3 text-xs font-bold flex items-center gap-2 border-2 border-white hover:bg-white"
            >
              <span>CONTACT FOR CURRENT RATES</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
