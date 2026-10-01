import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clientLogos = [
  { name: 'VELOX ARCHITECTURE', tag: 'ZURICH' },
  { name: 'KINETIC FORM', tag: 'TOKYO' },
  { name: 'NEO-LUMEN ENERGY', tag: 'STOCKHOLM' },
  { name: 'CHRONO LABS', tag: 'LONDON' },
  { name: 'AETHEL CAPITAL', tag: 'NEW YORK' },
  { name: 'VORTEX MEDIA', tag: 'BERLIN' },
  { name: 'CYBERNETIC CORP', tag: 'HELSINKI' },
  { name: 'SOLIS VENTURES', tag: 'SINGAPORE' },
];

export default function ClientMarquee() {
  const marqueeTrackRef = useRef(null);
  const marqueeWrapperRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Duplicate children smoothly for seamless looping
    let currentX = 0;
    let baseSpeed = 1.2; // pixels per frame
    let velocityMultiplier = 1;
    let direction = -1; // -1 = moving left, 1 = moving right

    // Master continuous ticker loop
    const tickerFunc = () => {
      // Return smoothly to base speed
      velocityMultiplier += (1 - velocityMultiplier) * 0.05;

      currentX += direction * baseSpeed * velocityMultiplier;

      // Wrap-around modulo math based on half width
      const halfWidth = track.scrollWidth / 2;
      if (currentX <= -halfWidth) {
        currentX += halfWidth;
      } else if (currentX >= 0) {
        currentX -= halfWidth;
      }

      gsap.set(track, { x: currentX, force3D: true });
    };

    gsap.ticker.add(tickerFunc);

    // Sync with ScrollTrigger velocity and scroll direction
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = self.getVelocity(); // positive scrolling down, negative scrolling up
        const absVel = Math.abs(vel);

        if (absVel > 30) {
          // Speed up with scroll velocity
          const boost = Math.min(6, 1 + absVel / 350);
          velocityMultiplier = boost;

          // Reverses direction on scroll up!
          if (vel > 0) {
            direction = -1; // scroll down -> marquee moves left
          } else if (vel < 0) {
            direction = 1; // scroll up -> marquee reverses and moves right!
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
            TRUSTED BY AMBITIOUS GLOBAL BRANDS & ENTERPRISE TEAMS
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
          {/* Repeat list twice for seamless infinite wrap */}
          {[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-10 group cursor-pointer"
            >
              <span className="font-display text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase font-bold text-[#0B1F16] group-hover:text-[#2E8B3C] transition-colors">
                {client.name}
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-[#0B1F16] text-[#FFFFFF] border border-[#0B1F16]">
                {client.tag}
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
