import React, { useEffect, useRef, useState } from 'react';

/**
 * CursorReveal Component
 * - Reveals REVEAL_IMAGE (BG_IMAGE_2 / bg_2.png) through a circular spotlight centered at the cursor
 * - Reveal radius: 260px with soft feathered edge
 * - Smooth cursor-following movement with easing/lerp
 * - CSS radial-gradient mask via mask-image and -webkit-mask-image
 * - pointer-events: none on the reveal layer
 * - Hidden completely when cursor leaves hero
 * - Positioned above existing hero background, below text and UI elements
 */
export default function CursorReveal({ 
  revealImage = '/bg_2.png',
  baseImage = null,
  revealRadius = 260,
  containerRef
}) {
  const [isInside, setIsInside] = useState(false);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });

  const targetCoords = useRef({ x: -1000, y: -1000 });
  const currentCoords = useRef({ x: -1000, y: -1000 });
  const animFrameId = useRef(null);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMouseEnter = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetCoords.current = { x, y };
      currentCoords.current = { x, y };
      setCoords({ x, y });
      setIsInside(true);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetCoords.current = { x, y };
      if (!isInside) setIsInside(true);
    };

    const handleMouseLeave = () => {
      setIsInside(false);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Lerp loop for smooth cursor-following easing
    const lerpFactor = 0.12;
    const animate = () => {
      currentCoords.current.x += (targetCoords.current.x - currentCoords.current.x) * lerpFactor;
      currentCoords.current.y += (targetCoords.current.y - currentCoords.current.y) * lerpFactor;

      setCoords({
        x: Math.round(currentCoords.current.x * 10) / 10,
        y: Math.round(currentCoords.current.y * 10) / 10,
      });

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [containerRef, isInside]);

  // Mask string with exact 260px radius and soft feathered edge
  const maskStyleValue = isInside
    ? `radial-gradient(circle ${revealRadius}px at ${coords.x}px ${coords.y}px, black 0%, black ${Math.round(revealRadius * 0.55)}px, rgba(0,0,0,0.5) ${Math.round(revealRadius * 0.82)}px, transparent ${revealRadius}px)`
    : 'none';

  return (
    <>
      {/* Optional Base Image layer if enabled */}
      {baseImage && (
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-[12] overflow-hidden opacity-40 mix-blend-screen"
          aria-hidden="true"
        >
          <img 
            src={baseImage} 
            alt="" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* REVEAL LAYER: Positioned above hero background (z-0, z-10) and below UI/text (z-20) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-[15] overflow-hidden transition-opacity duration-300 ease-out"
        style={{
          opacity: isInside ? 1 : 0,
          maskImage: maskStyleValue,
          WebkitMaskImage: maskStyleValue,
        }}
        aria-hidden="true"
      >
        <img 
          src={revealImage} 
          alt="Bamboo Reveal Asset" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Soft circular glowing spotlight aura around the cursor */}
      <div
        className="absolute pointer-events-none select-none z-[16] transition-opacity duration-300 rounded-full"
        style={{
          width: `${revealRadius * 2}px`,
          height: `${revealRadius * 2}px`,
          left: `${coords.x - revealRadius}px`,
          top: `${coords.y - revealRadius}px`,
          opacity: isInside ? 0.4 : 0,
          background: 'radial-gradient(circle, transparent 70%, rgba(56, 229, 77, 0.12) 85%, rgba(56, 229, 77, 0.25) 96%, transparent 100%)',
          boxShadow: '0 0 35px rgba(56, 229, 77, 0.15)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
