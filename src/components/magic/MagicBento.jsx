import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { 
  Scale, 
  Layers, 
  ShieldCheck, 
  FileCheck, 
  AlertTriangle, 
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * MagicBento Grid Component for Legal Assistant
 * Features spotlight overlays, particle stars, 3D tilt, magnetism, 
 * and reactive border glow. Strictly respects all negative constraints
 * (never purple, never pill buttons, no emojis, no em dashes).
 */
export const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = 280,
  particleCount = 10,
  enableTilt = true,
  glowColor,
  clickEffect = true,
  enableMagnetism = true,
  onSelectFeature
}) => {
  const { isDark } = useTheme();
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Institutional legal colors: Azure blue in dark mode, cobalt in light mode (NEVER PURPLE)
  const effectiveGlowColor = glowColor || (isDark ? '59, 130, 246' : '37, 99, 235');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableAnimations = disableAnimations || isMobile;

  // Global mouse move for card spotlight and border glow coordinates
  useEffect(() => {
    if (!enableSpotlight || shouldDisableAnimations || !gridRef.current) return;

    const handleMouseMove = (e) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.legal-bento-card');

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.setProperty('--spotlight-radius', `${spotlightRadius}px`);
        card.style.setProperty('--glow-color', `rgba(${effectiveGlowColor}, ${isDark ? '0.12' : '0.08'})`);
        card.style.setProperty('--border-glow-color', `rgba(${effectiveGlowColor}, 0.75)`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableSpotlight, shouldDisableAnimations, spotlightRadius, effectiveGlowColor, isDark]);

  const cards = [
    {
      id: 'statutory-search',
      title: 'Hierarchical Statutory Search',
      category: 'Tiers 1 to 6',
      description: 'Prioritizes primary Acts, Central Regulations, and Notifications over subordinate circulars using BM25 and exact citation matching.',
      icon: Scale,
      tag: 'Tier 1 to 6 Ranking',
      span: 'col-span-1 row-span-1',
      accentColor: isDark ? 'text-blue-400' : 'text-blue-700'
    },
    {
      id: 'conflict-engine',
      title: 'Cross-Statute Conflict Detector',
      category: 'Verification',
      description: 'Flags overlapping deadlines and statutory limitation discrepancies rather than silently picking arbitrary dates.',
      icon: AlertTriangle,
      tag: 'Conflict Engine',
      span: 'col-span-1 row-span-1',
      accentColor: isDark ? 'text-amber-400' : 'text-amber-700'
    },
    {
      id: 'procedural-steps',
      title: '10-Step Procedural Dossier',
      category: 'Procedural Action',
      description: 'Synthesizes filing gates, statutory fees, registry locations, and chronological action steps grounded in section chunks.',
      icon: Layers,
      tag: 'Action Plan',
      span: 'col-span-1 row-span-1',
      accentColor: isDark ? 'text-cyan-400' : 'text-cyan-700'
    },
    {
      id: 'hallucination-firewall',
      title: 'Hallucination Fallback Firewall',
      category: 'Safety Boundary',
      description: 'Strictly halts generation when statutory backing is missing, issuing formal verification disclaimers without fabrication.',
      icon: ShieldCheck,
      tag: 'Grounding Firewall',
      span: 'col-span-1 row-span-1',
      accentColor: isDark ? 'text-emerald-400' : 'text-emerald-700'
    },
    {
      id: 'evidence-checklist',
      title: 'Interactive Evidence Checklist',
      category: 'Evidentiary Audit',
      description: 'Itemizes required certified copies, sworn affidavits, statutory receipts, and identity proofs for competent court registries.',
      icon: FileCheck,
      tag: 'Evidence Audit',
      span: 'col-span-1 row-span-1',
      accentColor: isDark ? 'text-blue-400' : 'text-blue-700'
    },
    {
      id: 'registry-portals',
      title: 'Statutory Registry Gateways',
      category: 'Jurisdiction',
      description: 'Maps competent adjudicatory bodies, e-filing portals, and regional territorial limits across Indian consumer and commercial law.',
      icon: Building2,
      tag: 'Registry Gateways',
      span: 'col-span-1 row-span-1',
      accentColor: isDark ? 'text-slate-300' : 'text-slate-800'
    }
  ];

  return (
    <div className="w-full">
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
      >
        {cards.map((card, idx) => {
          const Icon = card.icon;

          return (
            <BentoCardItem
              key={card.id}
              card={card}
              index={idx}
              Icon={Icon}
              enableStars={enableStars}
              enableTilt={enableTilt}
              enableMagnetism={enableMagnetism}
              clickEffect={clickEffect}
              enableBorderGlow={enableBorderGlow}
              disableAnimations={shouldDisableAnimations}
              particleCount={particleCount}
              glowColor={effectiveGlowColor}
              textAutoHide={textAutoHide}
              isDark={isDark}
              onSelect={() => onSelectFeature && onSelectFeature(card.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

// Sub-component handling card animations & particles
const BentoCardItem = ({
  card,
  index,
  Icon,
  enableStars,
  enableTilt,
  enableMagnetism,
  clickEffect,
  enableBorderGlow,
  disableAnimations,
  particleCount,
  glowColor,
  textAutoHide,
  isDark,
  onSelect
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const magnetismRef = useRef(null);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismRef.current?.kill();
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => particle.parentNode?.removeChild(particle)
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!enableStars || !cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const x = Math.random() * width;
        const y = Math.random() * height;

        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: 3.5px;
          height: 3.5px;
          border-radius: 50%;
          background: rgba(${glowColor}, 0.85);
          box-shadow: 0 0 5px rgba(${glowColor}, 0.6);
          pointer-events: none;
          z-index: 25;
          left: ${x}px;
          top: ${y}px;
        `;

        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(particle, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 0.85, duration: 0.3, ease: 'back.out(1.7)' }
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 50,
          y: (Math.random() - 0.5) * 50,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 1.5,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
      }, i * 90);
      timeoutsRef.current.push(timeoutId);
    }
  }, [enableStars, particleCount, glowColor]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

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

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        gsap.to(element, { 
          rotateX, 
          rotateY, 
          duration: 0.15, 
          ease: 'power1.out', 
          transformPerspective: 1000 
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;
        magnetismRef.current = gsap.to(element, { 
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
        background: rgba(${glowColor}, 0.35);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 30;
      `;
      element.appendChild(ripple);
      gsap.fromTo(ripple, 
        { scale: 0, opacity: 0.8 }, 
        { scale: 40, opacity: 0, duration: 0.65, ease: 'power2.out', onComplete: () => ripple.remove() }
      );

      if (onSelect) onSelect();
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
  }, [disableAnimations, enableStars, enableTilt, enableMagnetism, clickEffect, glowColor, onSelect, animateParticles, clearAllParticles]);

  return (
    <div
      ref={cardRef}
      className={`legal-bento-card relative rounded-xl border p-5 flex flex-col justify-between group cursor-pointer overflow-hidden transition-colors duration-200 h-full min-h-[220px] ${card.span} ${
        isDark 
          ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-white' 
          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-xs'
      }`}
    >
      {/* Spotlight Overlay */}
      <div 
        className="spotlight-overlay absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(var(--spotlight-radius, 280px) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-color, rgba(${glowColor}, 0.1)), transparent 80%)`
        }}
      />

      {/* Reactive Border Glow with Mask */}
      {enableBorderGlow && (
        <div 
          className="border-glow absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-[inherit]"
          style={{
            padding: '1px',
            background: `radial-gradient(var(--spotlight-radius, 280px) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--border-glow-color, rgba(${glowColor}, 0.75)), transparent 50%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      )}

      {/* Header with Icon and Label */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-md border flex items-center justify-center ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-wider ${card.accentColor}`}>
            {card.category}
          </span>
        </div>

        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${
          isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          {card.tag}
        </span>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 space-y-1.5 my-auto">
        <h3 className={`font-semibold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {card.title}
        </h3>
        <p className={`text-xs leading-relaxed ${textAutoHide ? 'line-clamp-3' : ''} ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {card.description}
        </p>
      </div>

      {/* Footer Link / Explore indicator */}
      <div className="relative z-10 pt-2 flex items-center justify-between border-t border-slate-850/30 text-[11px] font-medium text-slate-400 group-hover:text-blue-400 transition-colors">
        <span className="flex items-center space-x-1">
          <span>Explore Architecture</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
        <span className="text-[10px] font-mono opacity-60">
          Module {index + 1}
        </span>
      </div>
    </div>
  );
};
