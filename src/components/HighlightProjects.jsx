import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    category: 'DYNAMIC WEB PLATFORM',
    location: 'ZURICH, CH',
    client: 'Velox Architekten',
    title: 'MONOLITHIC ARCHIVE',
    blurb: 'Ultra-fast architectural archive engineered with dynamic project filtering, deep-zoom canvas blueprints, and raw monolithic brutalist typography.',
    image: '/assets/project-1.svg',
    accent: '#70B85A',
    metrics: '+310% DWELL TIME // 99 LIGHTHOUSE SCORE',
  },
  {
    id: '02',
    category: 'E-COMMERCE & 3D ATELIER',
    location: 'TOKYO, JP',
    client: 'Kinetic Form Inc.',
    title: 'AVANT-GARDE 3D SHOP',
    blurb: 'High-performance interactive 3D garment customization suite, brutalist grid layouts, and sub-second checkout speeds driving global conversions.',
    image: '/assets/project-2.svg',
    accent: '#DAAF37',
    metrics: '+185% CHECKOUT CONVERSION // 100K+ SESSIONS',
  },
  {
    id: '03',
    category: 'ENTERPRISE WEB APPLICATION',
    location: 'STOCKHOLM, SE',
    client: 'Neo-Lumen Nordic',
    title: 'REAL-TIME TELEMETRY',
    blurb: 'Telemetry matrix dashboard featuring multi-node renewable energy streaming, interactive radar monitoring, and mission-critical cloud stability.',
    image: '/assets/project-3.svg',
    accent: '#38E54D',
    metrics: '0.04s LATENCY // 10M DATA POINTS/SEC',
  },
  {
    id: '04',
    category: 'MONTHLY SOCIAL CADENCE',
    location: 'LONDON, UK',
    client: 'Chrono Labs Global',
    title: 'OMNICHANNEL ENGINE',
    blurb: 'High-impact editorial social media engine, branded multi-slide carousels, and strategic thought leadership driving continuous qualified inbound B2B pipeline.',
    image: '/assets/project-4.svg',
    accent: '#FFFFFF',
    metrics: '420% INBOUND LEAD SURGE // 2.4M IMPRESSIONS',
  },
];

export default function HighlightProjects({ onOpenContact }) {
  const triggerRef = useRef(null);
  const pinRef = useRef(null);
  const slidesRef = useRef([]);
  const imagesRef = useRef([]);
  const textGroupRef = useRef([]);
  const timelineRef = useRef(null);
  const stInstanceRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const trigger = triggerRef.current;
    const pin = pinRef.current;
    if (!trigger || !pin) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      if (prefersReducedMotion) {
        return;
      }

      // Initial state: slide 0 is visible; slides 1, 2, 3 have bottom clip-path
      slidesRef.current.forEach((slide, i) => {
        if (i === 0) {
          gsap.set(slide, { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 });
        } else {
          gsap.set(slide, { clipPath: 'inset(100% 0% 0% 0%)', zIndex: i + 1 });
        }
      });

      // Images initial scale for counter-parallax
      imagesRef.current.forEach((img, i) => {
        gsap.set(img, { scale: i === 0 ? 1 : 1.25, yPercent: i === 0 ? 0 : -10 });
      });

      // Master scrubbing timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: `+=${projects.length * 100}%`,
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(
              projects.length - 1,
              Math.floor(p * projects.length)
            );
            setCurrentIndex(idx);
          },
        },
      });

      timelineRef.current = tl;
      stInstanceRef.current = tl.scrollTrigger;

      // Animate slides sequentially with clip-path wipe and image parallax
      for (let i = 1; i < projects.length; i++) {
        const slide = slidesRef.current[i];
        const img = imagesRef.current[i];
        const prevImg = imagesRef.current[i - 1];
        const textGroup = textGroupRef.current[i];

        // Mask wipe transition: slide wipes over previous from bottom to top
        tl.to(slide, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power2.inOut',
        }, `slide-${i}`)
        // Image counter-parallax: zooms down from 1.25 to 1.0 and translates down
        .to(img, {
          scale: 1,
          yPercent: 0,
          duration: 1,
          ease: 'power2.out',
        }, `slide-${i}`)
        // Subtle exit scale on previous image
        .to(prevImg, {
          scale: 0.92,
          opacity: 0.4,
          duration: 1,
          ease: 'power2.inOut',
        }, `slide-${i}`);

        // Staggered text reveal for the active slide
        if (textGroup) {
          const elements = textGroup.querySelectorAll('.slide-reveal');
          tl.fromTo(
            elements,
            { yPercent: 80, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
            `slide-${i}+=0.2`
          );
        }
      }
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  // Touch swipe support for mobile and tablet devices
  useEffect(() => {
    let startY = 0;
    let startX = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const deltaY = e.changedTouches[0].clientY - startY;
      const deltaX = e.changedTouches[0].clientX - startX;

      if (Math.abs(deltaY) > 40 || Math.abs(deltaX) > 40) {
        if (deltaY < -40 || deltaX < -40) {
          // Swipe up / left -> next slide
          if (currentIndex < projects.length - 1) {
            goToSlide(currentIndex + 1);
          }
        } else if (deltaY > 40 || deltaX > 40) {
          // Swipe down / right -> prev slide
          if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
          }
        }
      }
    };

    const pinEl = pinRef.current;
    if (pinEl) {
      pinEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      pinEl.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (pinEl) {
        pinEl.removeEventListener('touchstart', handleTouchStart);
        pinEl.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex]);

  // Jump to specific slide when arrows are clicked
  const goToSlide = (targetIndex) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, targetIndex));
    if (!stInstanceRef.current) return;

    const st = stInstanceRef.current;
    const totalScroll = st.end - st.start;
    const targetScroll = st.start + (clamped / (projects.length - 1)) * totalScroll;

    window.scrollTo({
      top: targetScroll + 5,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="projects"
      ref={triggerRef}
      className="relative w-full bg-[#050d08] text-white z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.95)]"
      style={{ minHeight: `${projects.length * 100}vh` }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden relative flex flex-col justify-between"
      >
        {/* All Project Slides Stacked Absolutely in the same container */}
        <div className="absolute inset-0 w-full h-full">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (slidesRef.current[index] = el)}
              data-cursor="VIEW"
              className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path] bg-[#050d08]"
            >
              {/* Full-bleed background visual with parallax */}
              <div
                ref={(el) => (imagesRef.current[index] = el)}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover"
                />
                {/* Dark Brutalist Gradients for High Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d08] via-[#050d08]/60 to-[#050d08]/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050d08]/90 via-[#050d08]/40 to-transparent" />
              </div>

              {/* Slide Content Overlay */}
              <div
                ref={(el) => (textGroupRef.current[index] = el)}
                className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-center select-none pt-28 sm:pt-32 pb-16"
              >
                <div className="max-w-3xl">
                  {/* Category & Location Badges */}
                  <div className="slide-reveal flex items-center flex-wrap gap-3 mb-4 sm:mb-6">
                    <span className="px-3 py-1 bg-[#0B1F16] border-2 border-white/80 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-brutal-sm">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 bg-[#0B1F16] border-2 border-[#2E8B3C] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#70B85A] shadow-brutal-sm">
                      {project.location}
                    </span>
                    <span className="hidden sm:inline-block font-mono text-xs text-white/50">
                      CLIENT: {project.client}
                    </span>
                  </div>

                  {/* Huge Project Title */}
                  <h3 className="slide-reveal font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight text-white leading-[0.9] drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] mb-6">
                    {project.title}
                  </h3>

                  {/* Blurb */}
                  <p className="slide-reveal text-sm sm:text-base md:text-lg text-white/85 max-w-xl leading-relaxed mb-6 font-body font-normal border-l-3 border-[#38E54D] pl-4">
                    {project.blurb}
                  </p>

                  {/* Metrics Badge & Action Button */}
                  <div className="slide-reveal flex flex-wrap items-center gap-4">
                    <div className="px-3.5 py-2 bg-[#050d08]/90 border border-[#DAAF37] font-mono text-xs text-[#DAAF37] font-bold">
                      {project.metrics}
                    </div>

                    <button
                      onClick={() => onOpenContact(`Project Inquiry: ${project.title}`)}
                      data-cursor="INQUIRE"
                      className="btn-brutal bg-[#FFFFFF] text-[#0B1F16] px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-[#38E54D]"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Header Floating Status inside pinned container */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pt-24 sm:pt-28 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-[#050d08] border-2 border-[#2E8B3C] px-3 py-1 shadow-brutal-sm pointer-events-auto">
            <span className="w-2 h-2 bg-[#38E54D] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#70B85A] font-bold">
              PINNED SHOWCASE // SCRUB TO WIPE
            </span>
          </div>

          {/* Large Real-Time Numerical Counter (01 / 04) */}
          <div className="bg-[#050d08] border-3 border-white shadow-brutal-white px-4 py-2 font-display text-xl sm:text-2xl text-white pointer-events-auto tracking-wider flex items-center gap-2">
            <span className="text-[#38E54D]">
              {(currentIndex + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-white/40">/</span>
            <span>{projects.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Bottom Navigation Dock & Progress Indicator */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pb-8 sm:pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
          {/* Segmented Progress Bar */}
          <div className="flex items-center gap-2 w-full sm:w-64">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to project ${idx + 1}`}
                className="h-2 flex-1 transition-all duration-300 relative group overflow-hidden border border-white/20"
                style={{
                  backgroundColor: idx <= currentIndex ? '#38E54D' : '#0B1F16',
                  borderColor: idx === currentIndex ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                }}
              >
                <span className="sr-only">Slide {idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Prev / Next Brutalist Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-[11px] text-white/50 uppercase tracking-widest mr-2">
              CLICK OR SCROLL TO SCRUB
            </span>

            <button
              onClick={() => goToSlide(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              data-cursor="PREV"
              className={`p-2.5 sm:p-3 bg-[#0B1F16] border-2 border-white shadow-brutal-sm text-white transition-all ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#2E8B3C] hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => goToSlide(currentIndex + 1)}
              disabled={currentIndex === projects.length - 1}
              aria-label="Next project"
              data-cursor="NEXT"
              className={`p-2.5 sm:p-3 bg-[#38E54D] border-2 border-white shadow-brutal-sm text-[#0B1F16] font-bold transition-all ${
                currentIndex === projects.length - 1
                  ? 'opacity-30 cursor-not-allowed bg-white/40'
                  : 'hover:bg-[#48f060] hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
