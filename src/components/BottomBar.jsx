import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function BottomBar({ activeSection, onNavigate }) {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const navItems = [
    { id: 'home', label: '01. HOME' },
    { id: 'services', label: '02. SERVICES +', hasDropdown: true },
    { id: 'industries', label: '03. INDUSTRIES' },
    { id: 'about', label: '04. PROCESS' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 sm:px-8 md:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Bottom Left: Scroll to explore */}
        <button
          onClick={() => onNavigate('services')}
          data-cursor="SCROLL"
          className="pointer-events-auto group hidden sm:flex items-center gap-3 bg-[#0B1F16] border-2 border-[#FFFFFF] shadow-brutal-white px-3 py-1.5 text-xs text-white hover:bg-[#2E8B3C] transition-colors select-none"
        >
          <div className="w-4 h-4 bg-[#38E54D] text-[#0B1F16] flex items-center justify-center font-bold">
            <ArrowDown className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="font-mono text-[11px] tracking-wider uppercase text-[#38E54D] group-hover:text-white font-bold">
            EXPLORE WORK
          </span>
        </button>

        {/* Bottom Center: Brutalist Square Dock */}
        <div className="pointer-events-auto relative mx-auto sm:mx-0">

          {/* Services Quick Dropdown Menu */}
          {showServicesDropdown && (
            <div
              onMouseLeave={() => setShowServicesDropdown(false)}
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 sm:w-80 p-3 bg-[#0B1F16] border-3 border-[#FFFFFF] shadow-brutal-white animate-in fade-in slide-in-from-bottom-2 duration-150"
            >
              <div className="text-[10px] font-mono text-[#38E54D] uppercase tracking-widest px-2 py-1 font-bold border-b border-[#38E54D]/30 mb-2">
                AGENCY CAPABILITIES
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onNavigate('services');
                    setShowServicesDropdown(false);
                  }}
                  className="w-full text-left p-2 bg-[#050d08] hover:bg-[#2E8B3C] border border-[#70B85A]/40 text-white transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-display text-sm tracking-wide">WEB DEVELOPMENT</div>
                    <div className="text-[10px] font-mono text-white/70">Portfolios, Platforms & Web Apps</div>
                  </div>
                  <span className="font-bold text-[#38E54D]">→</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('services');
                    setShowServicesDropdown(false);
                  }}
                  className="w-full text-left p-2 bg-[#050d08] hover:bg-[#2E8B3C] border border-[#70B85A]/40 text-white transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-display text-sm tracking-wide">MONTHLY SOCIAL MEDIA</div>
                    <div className="text-[10px] font-mono text-white/70">Strategy, Creatives & Growth</div>
                  </div>
                  <span className="font-bold text-[#38E54D]">→</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('services');
                    setShowServicesDropdown(false);
                  }}
                  className="w-full text-left p-2 bg-[#DAAF37] hover:bg-[#e0b73c] text-[#0B1F16] border-2 border-[#0B1F16] transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-display text-sm tracking-wide text-[#0B1F16]">UNIFIED DIGITAL COMBO</div>
                    <div className="text-[10px] font-mono text-[#0B1F16]/90 font-semibold">Complete Web + Social Growth</div>
                  </div>
                  <span className="font-bold text-[#0B1F16]">★</span>
                </button>
              </div>
            </div>
          )}

          {/* Neo-Brutalist Dock Nav */}
          <nav className="flex items-center gap-1 bg-[#0B1F16] border-3 border-[#FFFFFF] shadow-brutal-white p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.hasDropdown) {
                      setShowServicesDropdown(!showServicesDropdown);
                    }
                    onNavigate(item.id);
                  }}
                  onMouseEnter={() => {
                    if (item.hasDropdown) setShowServicesDropdown(true);
                  }}
                  className={`px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs font-bold uppercase transition-all duration-100 ${
                    isActive
                      ? 'bg-[#38E54D] text-[#0B1F16] shadow-brutal-sm'
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
            AVAILABLE FOR Q2/Q3 BUILDS
          </span>
        </div>

      </div>
    </div>
  );
}
