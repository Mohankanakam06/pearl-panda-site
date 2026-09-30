import React, { useState, useEffect } from 'react';
import PandaLogo from './PandaLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING BRUTALIST ENGINE...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'SYNCHRONIZING GSAP TIMELINES...' },
      { at: 45, text: 'EXTRUDING 3D GEOMETRY...' },
      { at: 75, text: 'CALIBRATING NEO-BRUTALIST MATRICES...' },
      { at: 95, text: 'STUDIO READY...' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const capped = next > 100 ? 100 : next;

        const currentStatus = statuses.slice().reverse().find((s) => capped >= s.at);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }

        return capped;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#0B1F16] flex flex-col items-center justify-center p-6 transition-transform duration-500 ease-in-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background Tech Grid Lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#70B85A 1px, transparent 1px), linear-gradient(90deg, #70B85A 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Brand Logo Container */}
        <div className="relative mb-8 bg-[#FFFFFF] p-6 border-4 border-[#0B1F16] shadow-brutal-white animate-bounce-subtle">
          <PandaLogo className="w-20 h-20 text-[#0B1F16]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-display uppercase tracking-wider text-white mb-2">
          PEARL PANDA
        </h1>
        <p className="font-mono text-xs tracking-widest text-[#70B85A] uppercase mb-8">
          WEB & SOCIAL MEDIA STUDIO // EST. 2026
        </p>

        {/* Brutalist Progress Bar Frame */}
        <div className="w-full bg-[#050d08] border-3 border-[#FFFFFF] shadow-brutal-white p-1 mb-4">
          <div
            className="h-6 bg-[#38E54D] transition-all duration-75 flex items-center justify-end pr-2 font-mono text-xs font-bold text-[#0B1F16]"
            style={{ width: `${progress}%` }}
          >
            {progress > 15 && `${progress}%`}
          </div>
        </div>

        {/* Live Status Readout */}
        <div className="flex justify-between items-center w-full font-mono text-xs text-[#DAAF37]">
          <span>{statusText}</span>
          <span className="font-bold font-mono">[{progress.toString().padStart(3, '0')}%]</span>
        </div>
      </div>
    </div>
  );
}
