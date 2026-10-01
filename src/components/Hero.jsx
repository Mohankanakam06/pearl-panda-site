import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenContact, onNavigate }) {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const videoRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const tagRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const scrollHintRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Line-by-line masked reveal on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, tagRef.current, subtextRef.current, ctaGroupRef.current, scrollHintRef.current], {
          yPercent: 0,
          opacity: 1,
        });
        return;
      }

      // Initial state: hidden beneath clipping masks
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        yPercent: 125,
        opacity: 0,
      });
      gsap.set([tagRef.current, subtextRef.current, ctaGroupRef.current, scrollHintRef.current], {
        opacity: 0,
        y: 24,
      });

      const tl = gsap.timeline({ delay: 0.2 });

      // Staggered masked reveal of huge headline lines
      tl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        stagger: 0.16,
        ease: 'power4.out',
      })
      .to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.8')
      .to([subtextRef.current, ctaGroupRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.6')
      .to(scrollHintRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4');

      // Stacking-card transition on scroll:
      // Hero scales down slightly (0.94), dims opacity and slides back while the next section stacks over it
      gsap.to(heroContentRef.current, {
        scale: 0.94,
        opacity: 0.25,
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Video background subtle zoom & dim on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.12,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Scroll hint fades out immediately upon initiating scroll
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          y: -20,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top+=50',
            end: 'top top+=200',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0B1F16] text-white flex flex-col justify-between select-none"
      style={{ zIndex: 1 }}
    >
      {/* 1. Full-Viewport Looping Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/hero-reel.mp4"
          poster="/assets/project-1.svg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-40' : 'opacity-20'
          }`}
        />
        {/* Brutalist Neo-Green Atmosphere Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F16] via-[#0B1F16]/65 to-[#0B1F16]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(#2E8B3C_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* 2. Top Header Spacer for Fixed Nav */}
      <div className="relative z-10 w-full pt-24 sm:pt-28" />

      {/* 3. Hero Core Content (Scales down on scroll) */}
      <div
        ref={heroContentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 my-auto will-change-transform"
      >
        {/* Category Tag */}
        <div ref={tagRef} className="mb-6 flex items-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#050d08] border-2 border-[#2E8B3C] shadow-brutal-sm text-[#70B85A] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-[#38E54D] animate-ping" />
            <span>NEO-BRUTALIST DIGITAL STUDIO // 2026</span>
          </div>
        </div>

        {/* Huge Headline Split into Masked Overflow Containers */}
        <div className="font-display uppercase text-white tracking-tight leading-[0.88] text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[7.6rem] xl:text-[8.5rem]">
          {/* Line 1 */}
          <div className="overflow-hidden pb-1 sm:pb-2">
            <div ref={line1Ref} className="will-change-transform drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
              HIGH-IMPACT
            </div>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden pb-1 sm:pb-2">
            <div ref={line2Ref} className="will-change-transform text-[#38E54D] drop-shadow-[0_10px_25px_rgba(46,139,60,0.4)]">
              WEBSITES & SOCIAL
            </div>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden pb-1 sm:pb-2 flex items-center gap-4 flex-wrap">
            <div ref={line3Ref} className="will-change-transform text-[#FAFAFA] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
              ENGINEERED TO LEAD.
            </div>
          </div>
        </div>

        {/* Subtext and Direct Project CTAs */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div ref={subtextRef} className="lg:col-span-7">
            <p className="text-white/80 font-body text-base sm:text-lg md:text-xl font-medium max-w-2xl leading-relaxed border-l-4 border-[#DAAF37] pl-4">
              We engineer bespoke high-performance websites and run monthly social media engines for forward-thinking brands who refuse to look ordinary.
            </p>
          </div>

          <div ref={ctaGroupRef} className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
            <button
              onClick={() => onOpenContact('Hero Consultation')}
              data-cursor="QUOTE"
              className="btn-brutal bg-[#38E54D] text-[#0B1F16] px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold flex items-center gap-3 border-3 border-[#FFFFFF] shadow-brutal-white hover:bg-[#48f060]"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onNavigate('projects')}
              data-cursor="VIEW"
              className="btn-brutal bg-[#050d08] text-white px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-mono border-2 border-white/40 hover:border-[#38E54D] hover:text-[#38E54D]"
            >
              EXPLORE WORK
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Utilities: Scroll Hint (Left) & Audio Toggle (Right) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pb-20 sm:pb-24 flex items-center justify-between pointer-events-auto">
        {/* Scroll Hint */}
        <div
          ref={scrollHintRef}
          onClick={() => onNavigate('projects')}
          data-cursor="SCROLL"
          className="cursor-pointer group flex items-center gap-3 bg-[#050d08]/90 border-2 border-[#70B85A] px-3.5 py-2 shadow-brutal-sm hover:border-[#38E54D] transition-colors"
        >
          <div className="w-5 h-5 bg-[#38E54D] text-[#0B1F16] flex items-center justify-center font-bold animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#A8F5B8] font-bold">
              SCROLL TO EXPLORE
            </span>
            <span className="font-mono text-[9px] text-white/60">
              IVENTIONS-STYLE CINEMATIC SCROLL
            </span>
          </div>
        </div>

        {/* Audio Mute / Unmute Toggle Button */}
        <button
          onClick={toggleMute}
          data-cursor="SOUND"
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="group flex items-center gap-2.5 bg-[#050d08] border-2 border-white shadow-brutal-white px-3.5 py-2 text-xs font-mono font-bold uppercase hover:bg-[#2E8B3C] transition-all"
        >
          <div className="w-4 h-4 flex items-center justify-center text-[#38E54D] group-hover:text-white">
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#38E54D] animate-pulse" />
            )}
          </div>
          <span className="text-white group-hover:text-white tracking-wider">
            {isMuted ? 'MUTE [OFF]' : 'SOUND [ON]'}
          </span>
          {/* Sound wave visualizer bars */}
          <div className="flex items-center gap-0.5 ml-1">
            <span
              className={`w-1 bg-[#38E54D] transition-all ${
                isMuted ? 'h-1.5 opacity-40' : 'h-3.5 animate-pulse'
              }`}
            />
            <span
              className={`w-1 bg-[#38E54D] transition-all ${
                isMuted ? 'h-1.5 opacity-40' : 'h-2.5 animate-pulse delay-75'
              }`}
            />
            <span
              className={`w-1 bg-[#38E54D] transition-all ${
                isMuted ? 'h-1.5 opacity-40' : 'h-4 animate-pulse delay-150'
              }`}
            />
          </div>
        </button>
      </div>
    </section>
  );
}
