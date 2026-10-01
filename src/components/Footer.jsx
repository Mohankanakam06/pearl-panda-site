import React from 'react';
import PandaLogo from './PandaLogo';

export default function Footer({ onOpenContact, onNavigate }) {
  return (
    <footer className="relative z-20 bg-[#0B1F16] border-t-4 border-[#FFFFFF] py-16 px-4 sm:px-8 md:px-12 pb-28 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <PandaLogo />
          <p className="text-xs sm:text-sm text-white/70 max-w-sm mt-6 font-body font-bold border-l-4 border-[#38E54D] pl-4">
            PEARL PANDA COMBINES NEO-BRUTALIST WEB ENGINEERING WITH PRECISION SOCIAL MEDIA STRATEGY.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-start md:items-center gap-4 sm:gap-6 lg:gap-10 font-display text-lg uppercase tracking-wide">
          <button onClick={() => onNavigate('home')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">01. HOME</button>
          <button onClick={() => onNavigate('projects')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">02. PROJECTS</button>
          <button onClick={() => onNavigate('services')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">03. SERVICES</button>
          <button onClick={() => onNavigate('about')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">04. PROCESS</button>
          <button onClick={() => onOpenContact()} className="btn-brutal bg-[#38E54D] text-[#0B1F16] hover:bg-[#48f060] px-4 py-2 text-sm border-2 border-[#0B1F16]">INITIATE BRIEF</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-4 border-[#2E8B3C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-[#70B85A] uppercase tracking-widest">
        <div>
          PEARL PANDA STUDIO // HIGH-IMPACT DIGITAL // 2026
        </div>
        <div className="bg-[#2E8B3C] text-white px-2 py-1 border border-[#0B1F16]">
          [ SYSTEM ONLINE // 60FPS ]
        </div>
      </div>
    </footer>
  );
}
