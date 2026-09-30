import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const targetRef = useRef({ x: -100, y: -100 });
  const reqRef = useRef(null);

  useEffect(() => {
    // Check if touch device or reduced motion
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchCheck || reducedMotion) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered interactive elements for custom labels
      const target = e.target.closest('[data-cursor], button, a, .card-brutal, .card-brutal-white, input, textarea');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (target.tagName === 'BUTTON' || target.tagName === 'A') {
          setCursorText('CLICK');
        } else if (target.classList.contains('card-brutal') || target.classList.contains('card-brutal-white')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Follower smooth interpolation (Damped spring lerp)
    let currentX = -100;
    let currentY = -100;
    const lerpSpeed = 0.18;

    const loop = () => {
      currentX += (targetRef.current.x - currentX) * lerpSpeed;
      currentY += (targetRef.current.y - currentY) * lerpSpeed;
      setFollowerPos({ x: currentX, y: currentY });
      reqRef.current = requestAnimationFrame(loop);
    };
    reqRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 bg-[#38E54D] border border-[#0B1F16]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? '0px' : '8px',
          height: isHovered ? '0px' : '8px',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />

      {/* Brutalist Follower Box with Dynamic Label */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center font-display font-bold uppercase transition-all duration-150 ${
          isHovered
            ? 'bg-[#38E54D] text-[#0B1F16] border-2 border-[#0B1F16] shadow-brutal-sm'
            : 'bg-transparent border-2 border-[#70B85A]/70'
        } ${isClicked ? 'scale-90' : 'scale-100'}`}
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? (cursorText ? '76px' : '44px') : '32px',
          height: isHovered ? (cursorText ? '36px' : '44px') : '32px',
          fontSize: '11px',
          letterSpacing: '0.08em',
        }}
      >
        {isHovered && cursorText && (
          <span className="animate-in fade-in zoom-in duration-100 select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
