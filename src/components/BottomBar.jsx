import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function BottomBar({ activeSection, onNavigate }) {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', hasDot: true },
    { id: 'services', label: 'Services +', hasDropdown: true },
    { id: 'industries', label: 'Industries' },
    { id: 'about', label: 'Process' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-6 sm:px-10 md:px-14 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Bottom Left: Scroll to explore */}
        <button
          onClick={() => onNavigate('services')}
          className="pointer-events-auto group flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-300 select-none"
        >
          <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-[#70B85A] flex items-center justify-center transition-colors">
            <ArrowDown className="w-3 h-3 text-[#70B85A] animate-bounce" />
          </div>
          <span className="font-mono-tag tracking-wider uppercase text-[11px] text-[#A8F5B8]/80 group-hover:text-white">
            Explore Capabilities
          </span>
        </button>

        {/* Bottom Center: Floating Frosted Pill Dock */}
        <div className="pointer-events-auto relative">
          
          {/* Services Quick Dropdown Menu */}
          {showServicesDropdown && (
            <div 
              onMouseLeave={() => setShowServicesDropdown(false)}
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-3 rounded-2xl bg-[#091f14]/95 backdrop-blur-xl border border-[#70B85A]/30 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="text-[10px] font-mono-tag text-[#70B85A] uppercase tracking-wider px-2 py-1 font-semibold">
                Agency Capabilities
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => {
                    onNavigate('services');
                    setShowServicesDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/90 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-white">Web Development</div>
                    <div className="text-[10px] text-white/50">Portfolios, Platforms & Web Apps</div>
                  </div>
                  <span className="text-[#38E54D]">→</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('services');
                    setShowServicesDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/90 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-white">Monthly Social Media</div>
                    <div className="text-[10px] text-white/50">Strategy, Creatives & Copywriting</div>
                  </div>
                  <span className="text-[#38E54D]">→</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('services');
                    setShowServicesDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#DAAF37] hover:bg-[#DAAF37]/15 transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-[#DAAF37]">Unified Digital Combo</div>
                    <div className="text-[10px] text-[#DAAF37]/80">Full website + ongoing social growth</div>
                  </div>
                  <span className="text-[#DAAF37]">★</span>
                </button>
              </div>
            </div>
          )}

          {/* Capsule Dock */}
          <nav className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.07] hover:bg-white/[0.1] backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all">
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
                  className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-white/15 shadow-sm font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.hasDot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38E54D] inline-block shadow-[0_0_8px_#38E54D]" />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Right: Live Status Badge */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto px-3.5 py-1.5 rounded-full bg-[#0b1f16]/80 backdrop-blur-md border border-[#2E8B3C]/40 text-xs font-mono-tag">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38E54D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38E54D]"></span>
          </span>
          <span className="text-[#A8F5B8] tracking-wider text-[11px]">
            ACCEPTING Q2/Q3 PROJECTS
          </span>
        </div>

      </div>
    </div>
  );
}
