import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function BottomBar({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'home', label: '01. HOME' },
    { id: 'projects', label: '02. PROJECTS' },
    { id: 'services', label: '03. SERVICES' },
    { id: 'about', label: '04. PROCESS' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 sm:px-8 md:px-12 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Bottom Left: Scroll to explore (only shown after leaving hero) */}
        {activeSection !== 'home' ? (
          <button
            onClick={() => onNavigate('home')}
            data-cursor="TOP"
            className="pointer-events-auto group hidden sm:flex items-center gap-3 bg-[#0B1F16] border-2 border-[#FFFFFF] shadow-brutal-white px-3 py-1.5 text-xs text-white hover:bg-[#2E8B3C] transition-colors select-none"
          >
            <span className="font-mono text-[11px] tracking-wider uppercase text-[#38E54D] group-hover:text-white font-bold">
              ↑ TOP
            </span>
          </button>
        ) : (
          <div className="hidden sm:block w-16" />
        )}

        {/* Bottom Center: Brutalist Square Dock */}
        <div className="pointer-events-auto relative mx-auto sm:mx-0">
          <nav className="flex items-center gap-1 bg-[#0B1F16] border-3 border-[#FFFFFF] shadow-brutal-white p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs font-bold uppercase transition-all duration-100 ${
                    isActive
                      ? 'bg-[#38E54D] text-[#0B1F16] shadow-brutal-sm font-bold'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Right: Live Status Badge */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto px-3.5 py-2 bg-[#0B1F16] border-2 border-[#DAAF37] shadow-brutal-gold text-xs font-mono">
          <span className="w-2 h-2 bg-[#38E54D] animate-ping" />
          <span className="text-[#DAAF37] tracking-wider text-[11px] font-bold">
            AVAILABLE FOR NEW BUILDS
          </span>
        </div>

      </div>
    </div>
  );
}
