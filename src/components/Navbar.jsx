import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import PandaLogo from './PandaLogo';

export default function Navbar({ onOpenContact }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#0B1F16]/90 backdrop-blur-sm border-3 border-[#FFFFFF] shadow-brutal-white px-5 py-3">
        {/* Brand Logo & Name */}
        <PandaLogo />

        {/* Top Right Action Button - Brutalist Pill/Box */}
        <button
          onClick={onOpenContact}
          data-cursor="CONTACT"
          className="btn-brutal bg-[#38E54D] text-[#0B1F16] hover:bg-[#48f060] px-4 sm:px-6 py-2 text-xs sm:text-sm flex items-center gap-2 border-2 border-[#0B1F16]"
        >
          <span>INITIATE BRIEF</span>
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </header>
  );
}
