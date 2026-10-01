import React, { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-[#0B1F16]/90 border-b border-[#2E8B3C]/50 pointer-events-none select-none">
      {/* Dynamic Progress Fill with Gradient */}
      <div
        className="h-full bg-gradient-to-r from-[#2E8B3C] via-[#38E54D] to-[#DAAF37] transition-all duration-75 ease-out origin-left will-change-transform"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
