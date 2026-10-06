import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Layers, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * IsometricAuthorityCard Component
 * Interactive 3D isometric stacked hierarchy visualizer for legal precedence.
 * Features 3D perspective tilt and fanning z-axis layer animation on hover.
 */
export const IsometricAuthorityCard = () => {
  const { isDark } = useTheme();
  const cardRef = useRef(null);
  const [activeTier, setActiveTier] = useState(null);

  const tiers = [
    { id: 1, name: 'Tier 1: Parliamentary Acts', desc: 'Supreme primary statutory legislation', color: 'bg-amber-500', border: 'border-amber-400', z: 36 },
    { id: 2, name: 'Tier 2: Statutory Rules', desc: 'Central and state procedural rulemaking', color: 'bg-amber-600', border: 'border-amber-500', z: 26 },
    { id: 3, name: 'Tier 3: Gazette Notifications', desc: 'Official ministerial orders and circulars', color: 'bg-amber-700', border: 'border-amber-600', z: 16 },
    { id: 4, name: 'Tier 4: Administrative Guidelines', desc: 'Regulatory and departmental practice codes', color: 'bg-slate-500', border: 'border-slate-400', z: 6 }
  ];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.25,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: 'power2.out'
    });
    setActiveTier(null);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group overflow-hidden ${
        isDark
          ? 'border-amber-500/40 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950 text-white shadow-amber-950/30'
          : 'border-amber-300 bg-gradient-to-b from-amber-50/50 via-white to-orange-50/40 text-slate-900 shadow-amber-100'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        minHeight: '430px'
      }}
    >
      {/* Ambient Warm Amber Glow */}
      <div 
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-50"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.2) 60%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.15) 60%, transparent 70%)'
        }}
      />

      {/* Header */}
      <div 
        className="relative z-10 space-y-1"
        style={{ transform: 'translateZ(25px)' }}
      >
        <div className="flex items-center space-x-2">
          <Award className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <span className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${
            isDark ? 'text-amber-400' : 'text-amber-700'
          }`}>
            Statutory Hierarchy
          </span>
        </div>
        <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          6-Tier Legal Precedence
        </h3>
      </div>

      {/* 3D Isometric Tier Stack */}
      <div 
        className="relative z-10 my-auto py-4 flex flex-col items-center justify-center space-y-4"
        style={{ transform: 'translateZ(35px)' }}
      >
        <div 
          className="w-56 space-y-2 p-3.5 rounded-lg border backdrop-blur-xs transition-all duration-300"
          style={{
            transform: 'perspective(600px) rotateX(15deg) rotateY(-8deg)',
            transformStyle: 'preserve-3d',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(245, 158, 11, 0.3)' : 'rgba(251, 191, 36, 0.5)'
          }}
        >
          {tiers.map((t, idx) => (
            <div
              key={t.id}
              onMouseEnter={() => setActiveTier(t.id)}
              className={`p-2 rounded-md border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                activeTier === t.id
                  ? isDark 
                    ? 'border-amber-400 bg-amber-950/60 shadow-md translate-x-1' 
                    : 'border-amber-500 bg-amber-50 shadow-md translate-x-1'
                  : isDark 
                    ? 'border-slate-800 bg-slate-900/60' 
                    : 'border-slate-200 bg-slate-50'
              }`}
              style={{
                transform: `translateZ(${t.z}px)`
              }}
            >
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-xs ${t.color}`} />
                <span className={`text-[11px] font-mono font-medium ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {t.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-500 font-semibold">
                Rank #{idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Readout */}
        <div className="text-center space-y-1">
          <div className="flex items-baseline justify-center space-x-1">
            <span className={`text-5xl font-mono font-extrabold tracking-tight ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500' 
                : 'text-slate-900'
            }`}>
              6
            </span>
            <span className={`text-xl font-bold font-mono ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              Tiers
            </span>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {activeTier 
              ? tiers.find(t => t.id === activeTier)?.desc 
              : 'Deterministic priority resolution engine'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="relative z-10 pt-3 border-t flex items-center justify-between text-xs"
        style={{ 
          transform: 'translateZ(20px)',
          borderColor: isDark ? 'rgba(51, 65, 85, 0.6)' : 'rgba(226, 232, 240, 0.9)'
        }}
      >
        <span className={`text-[11px] font-mono flex items-center space-x-1 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Conflict Detection Active</span>
        </span>
        <span className="text-amber-500 font-semibold font-mono text-[11px]">
          Auto-Ranked
        </span>
      </div>
    </div>
  );
};
