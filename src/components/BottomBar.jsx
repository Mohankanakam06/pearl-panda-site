import React from 'react';

export default function BottomBar({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'home', label: '01. HOME' },
    { id: 'projects', label: '02. WORK' },
    { id: 'services', label: '03. SERVICES' },
    { id: 'industries', label: '04. INDUSTRIES' },
    { id: 'about', label: '05. ABOUT' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-3 sm:px-8 md:px-12 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Bottom Left: Quick Top navigation */}
        {activeSection !== 'home' ? (
          <button
            onClick={() => onNavigate('home')}
            data-cursor="TOP"
            className="pointer-events-auto group hidden md:flex items-center gap-2 bg-[#0B1F16] border-2 border-[#FFFFFF] shadow-brutal-white px-3 py-1.5 text-xs text-white hover:bg-[#2E8B3C] transition-colors select-none"
          >
            <span className="font-mono text-[11px] tracking-wider uppercase text-[#38E54D] group-hover:text-white font-bold">
              ↑ TOP
            </span>
          </button>
        ) : (
          <div className="hidden md:block w-16" />
        )}

        {/* Bottom Center: Brutalist Square Dock */}
        <div className="pointer-events-auto relative mx-auto md:mx-0">
          <nav className="flex items-center gap-1 bg-[#0B1F16] border-3 border-[#FFFFFF] shadow-brutal-white p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-2.5 sm:px-3.5 py-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase transition-all duration-100 ${
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

        {/* Bottom Right: PRD Motto Badge */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto px-3.5 py-2 bg-[#0B1F16] border-2 border-[#DAAF37] shadow-brutal-gold text-xs font-mono">
          <span className="w-2 h-2 bg-[#38E54D] animate-ping" />
          <span className="text-[#DAAF37] tracking-wider text-[11px] font-bold">
            CLEAN • FRIENDLY • MODERN • MEMORABLE
          </span>
        </div>

      </div>
    </div>
  );
}
