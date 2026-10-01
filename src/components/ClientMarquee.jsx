import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industriesList = [
  { name: 'CAFÉS & RESTAURANTS', tag: 'HOSPITALITY' },
  { name: 'EVENTS & EVENT COMPANIES', tag: 'EXPERIENCES' },
  { name: 'REAL ESTATE', tag: 'DEVELOPMENT' },
  { name: 'RETAIL & LOCAL BUSINESSES', tag: 'COMMERCE' },
  { name: 'CREATORS & PERSONAL BRANDS', tag: 'PROFILE BUILDING' },
  { name: 'STARTUPS & SMALL BUSINESSES', tag: 'LAUNCH & GROWTH' },
];

export default function ClientMarquee() {
  const marqueeTrackRef = useRef(null);
  const marqueeWrapperRef = useRef(null);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let currentX = 0;
    let baseSpeed = 1.2;
    let velocityMultiplier = 1;
    let direction = -1; // -1 = moving left, 1 = moving right

    const tickerFunc = () => {
      velocityMultiplier += (1 - velocityMultiplier) * 0.05;
      currentX += direction * baseSpeed * velocityMultiplier;

      const halfWidth = track.scrollWidth / 2;
      if (currentX <= -halfWidth) {
        currentX += halfWidth;
      } else if (currentX >= 0) {
        currentX -= halfWidth;
      }

      gsap.set(track, { x: currentX, force3D: true });
    };

    gsap.ticker.add(tickerFunc);

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = self.getVelocity();
        const absVel = Math.abs(vel);

        if (absVel > 30) {
          const boost = Math.min(6, 1 + absVel / 350);
          velocityMultiplier = boost;

          if (vel > 0) {
            direction = -1;
          } else if (vel < 0) {
            direction = 1;
          }
        }
      },
    });

    return () => {
      gsap.ticker.remove(tickerFunc);
      st.kill();
    };
  }, []);

  return (
    <section className="relative z-20 w-full bg-[#FFFFFF] text-[#0B1F16] border-y-4 border-[#0B1F16] py-10 sm:py-14 overflow-hidden select-none shadow-brutal">
      {/* Top Banner Tag */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#0B1F16]/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#2E8B3C]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0B1F16]">
            INDUSTRIES WE SERVE // TAILORED DIGITAL SERVICES &amp; ADAPTED STYLES
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-[#2E8B3C] uppercase tracking-wider">
          VELOCITY-SYNCHRONIZED // DIRECTION SENSITIVE
        </span>
      </div>

      {/* Infinite Seamless Marquee Track */}
      <div ref={marqueeWrapperRef} className="w-full overflow-hidden flex">
        <div
          ref={marqueeTrackRef}
          className="flex items-center whitespace-nowrap will-change-transform py-2"
        >
          {[...industriesList, ...industriesList, ...industriesList].map((ind, idx) => (
            <div
              key={`${ind.name}-${idx}`}
              className="inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-10 group cursor-pointer"
            >
              <span className="font-display text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase font-bold text-[#0B1F16] group-hover:text-[#2E8B3C] transition-colors">
                {ind.name}
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-[#0B1F16] text-[#FFFFFF] border border-[#0B1F16]">
                {ind.tag}
              </span>
              <span className="text-[#DAAF37] font-display text-2xl sm:text-3xl ml-2">
                ★
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
