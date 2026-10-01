import React from 'react';
import PandaLogo from './PandaLogo';

export default function Footer({ onOpenContact, onNavigate }) {
  return (
    <footer className="relative z-20 bg-[#0B1F16] border-t-4 border-[#FFFFFF] py-16 px-4 sm:px-8 md:px-12 pb-28 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <PandaLogo />
          <p className="text-xs sm:text-sm text-white/80 max-w-sm mt-4 font-body font-normal border-l-4 border-[#38E54D] pl-4">
            Pearl Panda provides modern digital services for businesses and organizations that want a stronger online presence. Websites • Social Media • Digital Presence.
          </p>
          <div className="mt-3 font-mono text-xs text-[#DAAF37] uppercase font-bold pl-4">
            Clean. Friendly. Modern. Memorable.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-start md:items-center gap-4 sm:gap-6 lg:gap-8 font-display text-base sm:text-lg uppercase tracking-wide">
          <button onClick={() => onNavigate('home')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">01. HOME</button>
          <button onClick={() => onNavigate('projects')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">02. WORK</button>
          <button onClick={() => onNavigate('services')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">03. SERVICES</button>
          <button onClick={() => onNavigate('industries')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">04. INDUSTRIES</button>
          <button onClick={() => onNavigate('about')} data-cursor="GO" className="text-white hover:text-[#38E54D] hover:-translate-y-1 transition-transform">05. ABOUT</button>
          <button onClick={() => onOpenContact('Footer Inquiry')} className="btn-brutal bg-[#38E54D] text-[#0B1F16] hover:bg-[#48f060] px-4 py-2 text-xs sm:text-sm border-2 border-[#0B1F16]">ENQUIRE RATES</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t-4 border-[#2E8B3C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-[#70B85A] uppercase tracking-widest">
        <div>
          PEARL PANDA • WEB SERVICES &amp; SOCIAL MEDIA • 2026
        </div>
        <div className="bg-[#2E8B3C] text-white px-2 py-1 border border-[#0B1F16]">
          [ DIGITAL SERVICES ONLINE ]
        </div>
      </div>
    </footer>
  );
}
