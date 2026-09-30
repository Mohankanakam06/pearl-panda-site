import React from 'react';
import PandaLogo from './PandaLogo';

export default function Footer({ onOpenContact, onNavigate }) {
  return (
    <footer className="relative z-20 bg-[#040905] border-t border-[#184225]/40 py-16 px-6 sm:px-10 md:px-14 pb-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <PandaLogo />
          <p className="text-xs text-white/50 max-w-sm mt-3 leading-relaxed">
            Pearl Panda provides modern digital services for businesses and organizations that want a stronger online presence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono-tag text-white/60">
          <button onClick={() => onNavigate('home')} className="hover:text-[#38E54D] transition">Home</button>
          <button onClick={() => onNavigate('services')} className="hover:text-[#38E54D] transition">Services</button>
          <button onClick={() => onNavigate('industries')} className="hover:text-[#38E54D] transition">Industries</button>
          <button onClick={() => onNavigate('about')} className="hover:text-[#38E54D] transition">About</button>
          <button onClick={() => onOpenContact()} className="text-[#38E54D] hover:underline transition font-bold">Start a Project</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tag text-white/40">
        <div>
          Pearl Panda Studio • Bespoke Web & Social Growth • 2026
        </div>
        <div className="text-white/60 italic font-display">
          Clean. Friendly. Modern. Memorable.
        </div>
      </div>
    </footer>
  );
}
