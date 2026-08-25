import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer-capable desktop screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, .btn, .tech-chip, .tilt-card, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  useEffect(() => {
    let animationFrameId;
    const updateTrailer = () => {
      setTrailerPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2
      }));
      animationFrameId = requestAnimationFrame(updateTrailer);
    };
    animationFrameId = requestAnimationFrame(updateTrailer);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        style={{
          position: 'fixed',
          top: trailerPos.y,
          left: trailerPos.x,
          width: isHovered ? '48px' : isClicking ? '26px' : '36px',
          height: isHovered ? '48px' : isClicking ? '26px' : '36px',
          borderRadius: '50%',
          border: '1.5px solid var(--primary)',
          background: isHovered ? 'rgba(var(--primary-rgb), 0.12)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: isHovered ? '0 0 15px var(--primary-glow)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease',
          backdropFilter: isHovered ? 'blur(2px)' : 'none'
        }}
      />

      {/* Inner Precision Dot */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: isClicking ? '10px' : isHovered ? '6px' : '8px',
          height: isClicking ? '10px' : isHovered ? '6px' : '8px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'var(--secondary)' : 'var(--primary)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 100000,
          boxShadow: '0 0 8px var(--primary)',
          transition: 'width 0.1s ease, height 0.1s ease, background-color 0.2s ease'
        }}
      />
    </>
  );
}
