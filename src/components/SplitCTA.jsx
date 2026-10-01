import React, { useState } from 'react';
import { ArrowUpRight, FileSpreadsheet, MessageSquare, Sparkles, Check } from 'lucide-react';

export default function SplitCTA({ onOpenContact }) {
  const [activeSide, setActiveSide] = useState(null); // 'left' | 'right' | null

  return (
    <section id="cta" className="relative z-20 w-full min-h-[75vh] md:min-h-[85vh] bg-[#050d08] text-white overflow-hidden border-t-4 border-[#0B1F16] flex flex-col justify-between select-none">
      {/* Dual Expanding Halves */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* LEFT HALF: WEBSITE DEVELOPMENT */}
        <div
          onMouseEnter={() => setActiveSide('left')}
          onMouseLeave={() => setActiveSide(null)}
          onClick={() => onOpenContact('Website Development Quote')}
          data-cursor="WEBSITE"
          className={`relative cursor-pointer transition-all duration-500 ease-out p-8 sm:p-12 md:p-16 pt-20 sm:pt-24 md:pt-24 flex flex-col justify-between overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-[#FFFFFF] ${
            activeSide === 'left'
              ? 'md:w-[62%] bg-[#0B1F16]'
              : activeSide === 'right'
              ? 'md:w-[38%] bg-[#081710] opacity-80'
              : 'md:w-1/2 bg-[#0B1F16]'
          }`}
        >
          {/* Background Graphic Asset with Subtle Parallax Zoom */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/assets/cta-quote.svg"
              alt="Website Quote"
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 ${
                activeSide === 'left' ? 'scale-110 opacity-40' : 'scale-100 opacity-20'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F16] via-[#0B1F16]/75 to-transparent" />
          </div>

          {/* Top Content from PRD */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050d08] border-2 border-[#DAAF37] text-[#DAAF37] font-mono text-xs font-bold uppercase tracking-wider mb-6 shadow-brutal-sm">
              <FileSpreadsheet className="w-4 h-4 text-[#DAAF37]" />
              <span>PACKAGE &amp; PRICING // SECTION 9</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-[0.92] mb-4 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
              WEBSITE SERVICES <br />
              <span className="text-[#DAAF37]">CUSTOM QUOTE</span>
            </h2>

            <p className="text-sm sm:text-base text-white/85 max-w-md font-body leading-relaxed border-l-3 border-[#DAAF37] pl-4">
              Website services are quoted according to the selected website type and project requirements. Package contents and deliverables are confirmed before work begins.
            </p>

            {/* Website Type Options from PRD */}
            <div className="mt-6 space-y-2 font-mono text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#DAAF37]" />
                <span>1. Basic Portfolio Website</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#DAAF37]" />
                <span>2. Website with Backend</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#DAAF37]" />
                <span>3. Full Backend Website</span>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="relative z-10 mt-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenContact('Website Development Quote');
              }}
              data-cursor="QUOTE"
              className="btn-brutal bg-[#DAAF37] text-[#0B1F16] px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-bold flex items-center justify-between w-full sm:w-auto gap-4 border-3 border-[#FFFFFF] shadow-brutal-white hover:bg-white transition-all"
            >
              <span>ENQUIRE WEBSITE RATES</span>
              <div className="w-7 h-7 bg-[#0B1F16] text-[#DAAF37] flex items-center justify-center font-bold">
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT HALF: SOCIAL MEDIA & COMBO */}
        <div
          onMouseEnter={() => setActiveSide('right')}
          onMouseLeave={() => setActiveSide(null)}
          onClick={() => onOpenContact('Social Media / Combo Package')}
          data-cursor="SOCIAL"
          className={`relative cursor-pointer transition-all duration-500 ease-out p-8 sm:p-12 md:p-16 pt-20 sm:pt-24 md:pt-24 flex flex-col justify-between overflow-hidden ${
            activeSide === 'right'
              ? 'md:w-[62%] bg-[#06140c]'
              : activeSide === 'left'
              ? 'md:w-[38%] bg-[#040d07] opacity-80'
              : 'md:w-1/2 bg-[#06140c]'
          }`}
        >
          {/* Background Graphic Asset with Subtle Parallax Zoom */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/assets/cta-contact.svg"
              alt="Social Media Package"
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 ${
                activeSide === 'right' ? 'scale-110 opacity-40' : 'scale-100 opacity-20'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06140c] via-[#06140c]/75 to-transparent" />
          </div>

          {/* Top Content from PRD */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1F16] border-2 border-[#38E54D] text-[#70B85A] font-mono text-xs font-bold uppercase tracking-wider mb-6 shadow-brutal-sm">
              <MessageSquare className="w-4 h-4 text-[#38E54D]" />
              <span>MONTHLY PACKAGES &amp; COMBO</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-[0.92] mb-4 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
              SOCIAL MEDIA <br />
              <span className="text-[#38E54D]">&amp; COMBO OPTION</span>
            </h2>

            <p className="text-sm sm:text-base text-white/85 max-w-md font-body leading-relaxed border-l-3 border-[#38E54D] pl-4">
              Social media services are offered as monthly packages. Website + Social Media is also available as a combined package with unified visual direction.
            </p>

            {/* Included Services from PRD */}
            <div className="mt-6 space-y-2 font-mono text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#38E54D]" />
                <span>Content Planning &amp; Social Creatives</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#38E54D]" />
                <span>Captions, Copy &amp; Scheduled Publishing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#38E54D]" />
                <span>Website + Social Media Combo Available</span>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="relative z-10 mt-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenContact('Social Media / Combo Package');
              }}
              data-cursor="COMBO"
              className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-bold flex items-center justify-between w-full sm:w-auto gap-4 border-3 border-[#FFFFFF] shadow-brutal-white hover:bg-[#48f060] transition-all"
            >
              <span>ENQUIRE MONTHLY PACKAGES</span>
              <div className="w-7 h-7 bg-[#0B1F16] text-[#38E54D] flex items-center justify-center font-bold">
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main PRD Footer Call-to-Action Strip */}
      <div className="relative z-10 w-full bg-[#0B1F16] border-t-4 border-[#FFFFFF] py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display text-base sm:text-xl text-[#FFFFFF] uppercase tracking-wide text-center sm:text-left">
          CONTACT PEARL PANDA FOR CURRENT RATES AND PACKAGE DETAILS.
        </div>
        <div className="font-mono text-xs sm:text-sm text-[#DAAF37] uppercase font-bold tracking-widest text-center sm:text-right">
          Clean. Friendly. Modern. Memorable.
        </div>
      </div>
    </section>
  );
}
