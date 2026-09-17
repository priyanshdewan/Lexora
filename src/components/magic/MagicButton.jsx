import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * MagicButton Component
 * High-performance button with mouse-tracking border glow, 
 * expanding click ripple (GSAP), and subtle magnetic feedback.
 * Strictly adheres to geometric rounded-md (4px radius, no pill buttons)
 * and institutional legal colors (never purple).
 */
export const MagicButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  type = 'button',
  glowColor, // RGB string like '59, 130, 246', if omitted adapts to theme
  enableMagnetism = true,
  enableTilt = false,
  clickEffect = true,
  icon: Icon,
  ...props
}) => {
  const { isDark } = useTheme();
  const buttonRef = useRef(null);
  const magnetismRef = useRef(null);

  const effectiveGlowColor = glowColor || (isDark ? '59, 130, 246' : '37, 99, 235');

  useEffect(() => {
    const element = buttonRef.current;
    if (!element || disabled) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      element.style.setProperty('--btn-mouse-x', `${x}px`);
      element.style.setProperty('--btn-mouse-y', `${y}px`);

      if (enableMagnetism && window.innerWidth > 768) {
        const magnetX = (x - centerX) * 0.08;
        const magnetY = (y - centerY) * 0.08;
        magnetismRef.current = gsap.to(element, { 
          x: magnetX, 
          y: magnetY, 
          duration: 0.2, 
          ease: 'power1.out' 
        });
      }

      if (enableTilt && window.innerWidth > 768) {
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        gsap.to(element, { 
          rotateX, 
          rotateY, 
          duration: 0.15, 
          ease: 'power1.out', 
          transformPerspective: 600 
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, { 
        x: 0, 
        y: 0, 
        rotateX: 0, 
        rotateY: 0, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
    };

    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(${effectiveGlowColor}, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 20;
        transform: translate(-50%, -50%);
      `;
      element.appendChild(ripple);

      gsap.fromTo(ripple,
        { scale: 0, opacity: 1 },
        { scale: 28, opacity: 0, duration: 0.55, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
      magnetismRef.current?.kill();
    };
  }, [disabled, enableMagnetism, enableTilt, clickEffect, effectiveGlowColor]);

  // Variant styling with STRICT geometric rounded-md (never rounded-full)
  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = isDark
      ? 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 shadow-sm'
      : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 shadow-sm';
  } else if (variant === 'secondary') {
    variantClasses = isDark
      ? 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300';
  } else if (variant === 'outline') {
    variantClasses = isDark
      ? 'bg-transparent hover:bg-slate-900 text-slate-300 border border-slate-700'
      : 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300';
  } else if (variant === 'ghost') {
    variantClasses = isDark
      ? 'bg-transparent hover:bg-slate-900 text-slate-400 hover:text-slate-200'
      : 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900';
  }

  // Size styling
  let sizeClasses = 'px-3.5 py-2 text-xs';
  if (size === 'sm') sizeClasses = 'px-2.5 py-1.5 text-[11px]';
  if (size === 'lg') sizeClasses = 'px-5 py-2.5 text-sm';

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`magic-btn relative overflow-hidden rounded-md font-medium transition-colors select-none inline-flex items-center justify-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed group ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {/* Spotlight highlight over button */}
      <span 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: `radial-gradient(120px circle at var(--btn-mouse-x, 50%) var(--btn-mouse-y, 50%), rgba(${effectiveGlowColor}, 0.25), transparent 70%)`
        }}
      />

      {/* Button Content */}
      <span className="relative z-10 inline-flex items-center space-x-1.5 pointer-events-none">
        {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
        <span>{children}</span>
      </span>
    </button>
  );
};
