import React from 'react';

export default function PandaLogo({ showText = true }) {
  return (
    <div className="flex items-center gap-3.5 group cursor-pointer select-none">
      {/* Panda Emblem with glowing emerald halo */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#2E8B3C] to-[#70B85A] rounded-full blur-sm opacity-40 group-hover:opacity-75 transition duration-300"></div>
        <div className="relative w-10 h-10 rounded-full bg-[#07170e] border border-[#70B85A]/40 flex items-center justify-center overflow-hidden shadow-lg shadow-black/50">
          <img 
            src="/logo.jpg" 
            alt="Pearl Panda Logo" 
            className="w-full h-[128%] object-cover object-top filter contrast-125 translate-y-[-2px]"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold tracking-[0.18em] text-white text-base leading-none group-hover:text-[#70B85A] transition-colors">
              PEARL PANDA
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38E54D] animate-pulse"></span>
          </div>
          <span className="font-mono-tag text-[9px] uppercase tracking-[0.25em] text-[#70B85A]/80 mt-0.5 font-medium">
            DIGITAL STUDIO
          </span>
        </div>
      )}
    </div>
  );
}
