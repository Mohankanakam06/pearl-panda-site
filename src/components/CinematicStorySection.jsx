import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowDown, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicStorySection() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageElementRef = useRef(null);
  const glowBackdropRef = useRef(null);
  const hintRef = useRef(null);
  const cornerTagsRef = useRef(null);

  // Text layer refs for organized chaos animation
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const text6Ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const glowBackdrop = glowBackdropRef.current;

    if (!section || !pinContainer || !imageWrapper) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback for reduced motion: clean static presentation
        gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current, text5Ref.current, text6Ref.current], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      // Master Scroll-driven timeline with pinned scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial micro hint fades out immediately
      if (hintRef.current) {
        tl.to(hintRef.current, {
          opacity: 0,
          y: -25,
          duration: 0.15,
          ease: 'power2.out',
        }, 0);
      }

      // 2. Corner badge elements on the 9:16 card fade out early
      if (cornerTagsRef.current) {
        tl.to(cornerTagsRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, 0.05);
      }

      // 3. Staggered exit animations of surrounding editorial text (organized chaos)
      if (text1Ref.current) {
        tl.to(text1Ref.current, {
          x: -140,
          y: -90,
          rotation: -16,
          opacity: 0,
          scale: 0.8,
          duration: 0.38,
          ease: 'power2.inOut',
        }, 0.05);
      }

      if (text2Ref.current) {
        tl.to(text2Ref.current, {
          x: 140,
          y: -80,
          rotation: 14,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: 'power2.inOut',
        }, 0.08);
      }

      if (text3Ref.current) {
        tl.to(text3Ref.current, {
          x: -180,
          y: 30,
          rotation: -10,
          opacity: 0,
          scale: 0.75,
          duration: 0.42,
          ease: 'power2.inOut',
        }, 0.12);
      }

      if (text4Ref.current) {
        tl.to(text4Ref.current, {
          x: 180,
          y: -20,
          rotation: 12,
          opacity: 0,
          scale: 0.75,
          duration: 0.44,
          ease: 'power2.inOut',
        }, 0.14);
      }

      if (text5Ref.current) {
        tl.to(text5Ref.current, {
          x: -120,
          y: 120,
          rotation: -12,
          opacity: 0,
          scale: 0.78,
          duration: 0.44,
          ease: 'power2.inOut',
        }, 0.16);
      }

      if (text6Ref.current) {
        tl.to(text6Ref.current, {
          x: 130,
          y: 110,
          rotation: 16,
          opacity: 0,
          scale: 0.78,
          duration: 0.46,
          ease: 'power2.inOut',
        }, 0.18);
      }

      // 4. Smooth scale of 9:16 portrait image to full viewport 100vw x 100vh
      tl.to(imageWrapper, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        borderWidth: '0px',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0.12);

      // Subtle parallax on the inner image element for cinematic depth
      if (imageElementRef.current) {
        tl.fromTo(imageElementRef.current, 
          { scale: 1.1 },
          { scale: 1.0, duration: 0.8, ease: 'power2.out' },
          0.12
        );
      }

      // Ambient backdrop glow fades out smoothly as image expands
      if (glowBackdrop) {
        tl.to(glowBackdrop, {
          opacity: 0,
          scale: 1.8,
          duration: 0.55,
          ease: 'power2.out',
        }, 0.2);
      }

      // 5. Final State: Fullscreen immersion hold before pin releases
      tl.to({}, { duration: 0.22 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-black text-white selection:bg-[#38E54D] selection:text-black z-30"
    >
      {/* Pinned Viewport Container */}
      <div 
        ref={pinContainerRef} 
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        {/* Deep ambient vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none z-10" />

        {/* Ambient emerald backlight behind the initial portrait card */}
        <div 
          ref={glowBackdropRef}
          className="absolute w-[360px] h-[580px] rounded-full bg-[#2E8B3C]/25 blur-[100px] pointer-events-none transition-all"
        />

        {/* Top Hint: Scroll to Expand */}
        <div 
          ref={hintRef}
          className="absolute top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#38E54D] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono-tag uppercase tracking-[0.2em] text-[#A8F5B8]">
            SCROLL TO ENTER THE SANCTUM
          </span>
          <ArrowDown className="w-3 h-3 text-[#38E54D] animate-bounce ml-0.5" />
        </div>

        {/* ========================================================================= */}
        {/* SURROUNDING EDITORIAL TEXT: Asymmetric "Organized Chaos" Layout           */}
        {/* ========================================================================= */}

        {/* 1. Top Left: Architectural Essence */}
        <div 
          ref={text1Ref}
          className="absolute z-20 pointer-events-none select-none
                     top-[8%] sm:top-[12%] left-[4%] sm:left-[6%] lg:left-[8%]
                     max-w-[180px] sm:max-w-[240px] lg:max-w-[280px]
                     -rotate-3 transition-transform"
        >
          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#091a10]/80 backdrop-blur-md border border-[#2E8B3C]/35 shadow-2xl">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono-tag uppercase tracking-widest text-[#70B85A] mb-1">
              <span>01 // THE ESSENCE</span>
            </div>
            <div className="font-display font-bold text-sm sm:text-base lg:text-lg text-white leading-snug">
              Organic Harmony & Cybernetic Craft
            </div>
            <p className="text-[10px] sm:text-[11px] text-white/60 mt-1 leading-relaxed hidden sm:block">
              Living geometry sculpted in obsidian space. Natural bamboo ethos engineered with mathematical precision.
            </p>
          </div>
        </div>

        {/* 2. Top Right: The Digital Sanctuary */}
        <div 
          ref={text2Ref}
          className="absolute z-20 pointer-events-none select-none
                     top-[8%] sm:top-[10%] right-[4%] sm:right-[6%] lg:right-[9%]
                     max-w-[160px] sm:max-w-[220px] lg:max-w-[260px]
                     rotate-[2.5deg] text-right"
        >
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DAAF37]/15 border border-[#DAAF37]/40 text-[#DAAF37] font-mono-tag text-[9px] sm:text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
            <Sparkles className="w-2.5 h-2.5" />
            EDITION 01 // 2026
          </div>
          <h3 className="font-display text-xl sm:text-2xl lg:text-4xl font-extrabold text-white tracking-tight leading-none">
            DIGITAL <br />
            <span className="text-[#38E54D]">SANCTUARY</span>
          </h3>
          <p className="text-[9px] sm:text-[11px] font-mono-tag text-[#70B85A]/80 mt-1.5 hidden sm:block">
            A dimension beyond ordinary web design.
          </p>
        </div>

        {/* 3. Mid Left: Studio Metric Pill (Desktop & Tablet) */}
        <div 
          ref={text3Ref}
          className="hidden sm:block absolute z-20 pointer-events-none select-none
                     top-[50%] -translate-y-1/2 left-[3%] sm:left-[4%] lg:left-[6%]
                     -rotate-[1.5deg]"
        >
          <div className="px-4 py-3 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-[#38E54D]/35 shadow-xl max-w-[190px] lg:max-w-[220px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#38E54D] shadow-[0_0_8px_#38E54D]" />
              <span className="font-mono-tag text-[10px] uppercase tracking-wider text-white/90 font-bold">
                100% BESPOKE
              </span>
            </div>
            <div className="text-[11px] text-white/70 leading-snug">
              Every curve, light beam, and line of code crafted exclusively for your brand.
            </div>
          </div>
        </div>

        {/* 4. Mid Right: Manifesto Quote (Desktop & Tablet) */}
        <div 
          ref={text4Ref}
          className="hidden sm:block absolute z-20 pointer-events-none select-none
                     top-[50%] -translate-y-1/2 right-[3%] sm:right-[4%] lg:right-[7%]
                     rotate-[3deg]"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-[#07170e]/85 backdrop-blur-xl border border-white/10 shadow-2xl max-w-[200px] lg:max-w-[240px]">
            <div className="text-xs sm:text-sm font-display font-semibold italic text-white/90 leading-snug">
              "Where high art converges with sub-second engineering."
            </div>
            <div className="text-[9px] font-mono-tag uppercase tracking-widest text-[#DAAF37] mt-2 font-bold">
              — PEARL PANDA
            </div>
          </div>
        </div>

        {/* 5. Bottom Left: Coordinates & Architecture */}
        <div 
          ref={text5Ref}
          className="absolute z-20 pointer-events-none select-none
                     bottom-[8%] sm:bottom-[10%] left-[4%] sm:left-[6%] lg:left-[8%]
                     max-w-[180px] sm:max-w-[240px]
                     rotate-2"
        >
          <div className="font-mono-tag text-[9px] sm:text-[11px] text-white/50 space-y-0.5 leading-tight">
            <div className="text-[#38E54D] font-bold">COORDINATES: 22.3193° N // 114.1694° E</div>
            <div className="hidden sm:block">SHADERS: PERLIN CURL NOISE // THREE.JS</div>
            <div>STATUS: LIVING WIREFRAME REALM</div>
          </div>
        </div>

        {/* 6. Bottom Right: Exhibition Caption Card */}
        <div 
          ref={text6Ref}
          className="absolute z-20 pointer-events-none select-none
                     bottom-[8%] sm:bottom-[10%] right-[4%] sm:right-[6%] lg:right-[9%]
                     max-w-[160px] sm:max-w-[220px]
                     -rotate-2"
        >
          <div className="p-3 sm:p-4 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-right">
            <span className="text-[9px] sm:text-[10px] font-mono-tag uppercase tracking-widest text-[#70B85A] font-semibold block mb-0.5">
              FIGURE 02 // MATRIX EMBLEM
            </span>
            <span className="font-display text-xs sm:text-sm font-bold text-white block">
              The Bamboo Grove
            </span>
            <span className="text-[9px] text-white/40 font-mono-tag hidden sm:block">
              Immersion depth: 100%
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER IMAGE: 9:16 Portrait Card Expanding to Full Screen Viewport        */}
        {/* ========================================================================= */}
        <div 
          ref={imageWrapperRef}
          className="relative z-25 overflow-hidden flex items-center justify-center select-none
                     w-[180px] h-[320px] sm:w-[240px] sm:h-[426px] md:w-[280px] md:h-[498px]
                     rounded-[24px] border border-[#38E54D]/40
                     shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(56,229,77,0.25)]
                     transition-shadow duration-300"
          style={{
            aspectRatio: '9 / 16',
          }}
        >
          {/* Inner Image with focal point cover centered */}
          <img 
            ref={imageElementRef}
            src="/bg_2.png" 
            alt="Pearl Panda Cinematic Bamboo Sanctum" 
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            style={{
              objectPosition: '50% 50%',
            }}
          />

          {/* Minimalist interactive corner badges on the initial portrait card */}
          <div ref={cornerTagsRef} className="pointer-events-none">
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-mono-tag text-[#38E54D]">
              9:16 PORTRAIT
            </div>
            <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80">
              <Maximize2 className="w-3 h-3 text-[#38E54D]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
