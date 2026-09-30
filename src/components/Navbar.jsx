import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import PandaLogo from './PandaLogo';

export default function Navbar({ onOpenContact }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-14 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <PandaLogo />

        {/* Top Right Action Button - Contact us Pill */}
        <button
          onClick={onOpenContact}
          className="group relative inline-flex items-center gap-3.5 pl-5 pr-2 py-2 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-[#70B85A]/50 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-[#2E8B3C]/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-white transition-colors">
            Contact us
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#38E54D] group-hover:bg-[#48f060] flex items-center justify-center text-[#050d08] transition-all duration-300 group-hover:rotate-45 shadow-sm shadow-[#38E54D]/50">
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </header>
  );
}
