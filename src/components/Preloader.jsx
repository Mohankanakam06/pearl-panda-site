import React, { useState, useEffect } from 'react';
import PandaLogo from './PandaLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING GSAP TIMELINES...');
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'SYNCHRONIZING LENIS SMOOTH MOMENTUM...' },
      { at: 40, text: 'PREPARING PINNED PROJECT SLIDERS...' },
      { at: 70, text: 'CALIBRATING VELOCITY MARQUEE ENGINES...' },
      { at: 92, text: 'STUDIO READY // ENTERING CINEMATIC VIEW...' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsWiping(true);
            setTimeout(onComplete, 850);
          }, 250);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 9) + 4;
        const capped = next > 100 ? 100 : next;

        const currentStatus = statuses.slice().reverse().find((s) => capped >= s.at);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }

        return capped;
      });
    }, 38);

    return () => clearInterval(interval);
  }, [onComplete]);

  const blockColors = ['#0B1F16', '#123824', '#050d08', '#2E8B3C', '#0B1F16'];

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none select-none">
      {/* 5-Column Neo-Brutalist Block Wipe Curtains */}
      <div className="absolute inset-0 flex w-full h-full">
        {blockColors.map((color, idx) => (
          <div
            key={idx}
            className="flex-1 h-full transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform"
            style={{
              backgroundColor: color,
              transform: isWiping ? 'translateY(-100%)' : 'translateY(0%)',
              transitionDelay: `${idx * 75}ms`,
            }}
          />
        ))}
      </div>

      {/* Foreground Content Card (Fades out when wipe begins) */}
      <div
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
          isWiping ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Subtle Tech Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#70B85A 1px, transparent 1px), linear-gradient(90deg, #70B85A 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
          {/* Brand Mark Box */}
          <div className="relative mb-8 bg-[#FFFFFF] p-6 border-4 border-[#0B1F16] shadow-brutal-white">
            <PandaLogo className="w-16 h-16 sm:w-20 sm:h-20 text-[#0B1F16]" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white mb-2">
            PEARL PANDA
          </h1>
          <p className="font-mono text-[11px] sm:text-xs tracking-widest text-[#70B85A] uppercase mb-8 font-bold">
            NEO-BRUTALIST DIGITAL STUDIO // 2026
          </p>

          {/* Brutalist Progress Bar Frame */}
          <div className="w-full bg-[#050d08] border-3 border-[#FFFFFF] shadow-brutal-white p-1 mb-4">
            <div
              className="h-6 bg-[#38E54D] transition-all duration-75 flex items-center justify-end pr-2 font-mono text-xs font-bold text-[#0B1F16]"
              style={{ width: `${progress}%` }}
            >
              {progress > 12 && `${progress}%`}
            </div>
          </div>

          {/* Live Status Readout */}
          <div className="flex justify-between items-center w-full font-mono text-[11px] sm:text-xs text-[#DAAF37]">
            <span className="truncate pr-2">{statusText}</span>
            <span className="font-bold font-mono">[{progress.toString().padStart(3, '0')}%]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
