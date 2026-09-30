import React from 'react';

export default function PandaLogo({ showText = true, className = "" }) {
  return (
    <div className={`flex items-center gap-3.5 group cursor-pointer select-none ${className}`}>
      {/* Panda Emblem - Brutalist Square Box */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-10 h-10 md:w-12 md:h-12 bg-[#FFFFFF] border-3 border-[#0B1F16] shadow-brutal-sm flex items-center justify-center overflow-hidden transition-transform duration-150 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-brutal">
          <img
            src="/logo.jpg"
            alt="Pearl Panda Logo"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold tracking-wider text-white text-lg md:text-xl leading-none group-hover:text-[#38E54D] transition-colors">
              PEARL PANDA
            </span>
            <span className="inline-block w-2 h-2 bg-[#38E54D]"></span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#70B85A] mt-1 font-bold">
            WEB & SOCIAL STUDIO
          </span>
        </div>
      )}
    </div>
  );
}
