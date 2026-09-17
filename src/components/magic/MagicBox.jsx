import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * MagicBox Component
 * An interactive container box featuring spotlight, reactive border glow,
 * perspective 3D tilt, magnetism, particle stars, and click ripples.
 * Strictly respects negative constraints (no purple, no pill shapes).
 */
export const MagicBox = ({
  children,
  className = '',
  enableSpotlight = true,
  enableBorderGlow = true,
  enableStars = false,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 280,
  particleCount = 8,
  glowColor, // RGB string like '59, 130, 246', if omitted will adapt to theme
  style = {},
  onClick,
  role,
  tabIndex
}) => {
  const { isDark } = useTheme();
  const boxRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const magnetismAnimationRef = useRef(null);

  // Institutional legal glow: Azure blue in dark mode, cobalt in light mode (NEVER PURPLE)
  const effectiveGlowColor = glowColor || (isDark ? '59, 130, 246' : '37, 99, 235');

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!enableStars || !boxRef.current || !isHoveredRef.current) return;
    const { width, height } = boxRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !boxRef.current) return;
        const x = Math.random() * width;
        const y = Math.random() * height;

        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: 3.5px;
          height: 3.5px;
          border-radius: 50%;
          background: rgba(${effectiveGlowColor}, 0.9);
          box-shadow: 0 0 6px rgba(${effectiveGlowColor}, 0.7);
          pointer-events: none;
          z-index: 25;
          left: ${x}px;
          top: ${y}px;
        `;

        boxRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(particle, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 0.9, duration: 0.3, ease: 'back.out(1.7)' }
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          rotation: Math.random() * 360,
          duration: 1.8 + Math.random() * 1.5,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
      }, i * 90);
      timeoutsRef.current.push(timeoutId);
    }
  }, [enableStars, particleCount, effectiveGlowColor]);

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (enableStars) animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      if (enableStars) clearAllParticles();
      gsap.to(element, { 
        rotateX: 0, 
        rotateY: 0, 
        x: 0, 
        y: 0, 
        duration: 0.35, 
        ease: 'power2.out' 
      });
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Update CSS variables for spotlight and border glow
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
      element.style.setProperty('--spotlight-radius', `${spotlightRadius}px`);
      element.style.setProperty('--glow-rgb', effectiveGlowColor);

      if (enableTilt && window.innerWidth > 768) {
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        gsap.to(element, { 
          rotateX, 
          rotateY, 
          duration: 0.15, 
          ease: 'power1.out', 
          transformPerspective: 1000 
        });
      }

      if (enableMagnetism && window.innerWidth > 768) {
        const magnetX = (x - centerX) * 0.025;
        const magnetY = (y - centerY) * 0.025;
        magnetismAnimationRef.current = gsap.to(element, { 
          x: magnetX, 
          y: magnetY, 
          duration: 0.25, 
          ease: 'power1.out' 
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(${effectiveGlowColor}, 0.35);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 30;
      `;
      element.appendChild(ripple);
      gsap.fromTo(ripple, 
        { scale: 0, opacity: 0.8 }, 
        { scale: 30, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [enableStars, enableTilt, enableMagnetism, clickEffect, effectiveGlowColor, spotlightRadius, animateParticles, clearAllParticles]);

  return (
    <div
      ref={boxRef}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      className={`magic-box relative overflow-hidden transition-colors duration-200 group ${className}`}
      style={{
        ...style,
        position: 'relative'
      }}
    >
      {/* Spotlight Hover Overlay */}
      {enableSpotlight && (
        <div 
          className="spotlight-overlay absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(var(--spotlight-radius, 280px) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${effectiveGlowColor}, ${isDark ? '0.1' : '0.07'}), transparent 75%)`
          }}
        />
      )}

      {/* Reactive Border Glow */}
      {enableBorderGlow && (
        <div 
          className="border-glow absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-[inherit]"
          style={{
            padding: '1px',
            background: `radial-gradient(var(--spotlight-radius, 280px) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${effectiveGlowColor}, 0.75), transparent 50%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      )}

      {/* Box Contents */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
