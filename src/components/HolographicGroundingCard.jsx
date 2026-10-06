import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Network, CheckCircle, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * HolographicGroundingCard Component
 * Interactive 3D perspective node-network visualizer for the 10-step
 * zero-hallucination verification protocol.
 */
export const HolographicGroundingCard = () => {
  const { isDark } = useTheme();
  const cardRef = useRef(null);

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
  };

  const pipelineNodes = [
    { title: 'Ingest', label: 'Dispute Facts', color: 'bg-emerald-500' },
    { title: 'Retrieve', label: '6 Acts Corpus', color: 'bg-teal-500' },
    { title: 'Verify', label: 'Firewall Gate', color: 'bg-cyan-500' },
    { title: 'Synthesize', label: 'Dossier Brief', color: 'bg-emerald-400' }
  ];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group overflow-hidden ${
        isDark
          ? 'border-emerald-500/40 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950 text-white shadow-emerald-950/30'
          : 'border-emerald-300 bg-gradient-to-b from-emerald-50/50 via-white to-teal-50/40 text-slate-900 shadow-emerald-100'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        minHeight: '430px'
      }}
    >
      {/* Ambient Emerald Glow */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-50"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(13, 148, 136, 0.2) 60%, transparent 70%)'
            : 'radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, rgba(16, 185, 129, 0.15) 60%, transparent 70%)'
        }}
      />

      {/* Header */}
      <div 
        className="relative z-10 space-y-1"
        style={{ transform: 'translateZ(25px)' }}
      >
        <div className="flex items-center space-x-2">
          <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <span className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${
            isDark ? 'text-emerald-400' : 'text-emerald-700'
          }`}>
            Grounding Protocol
          </span>
        </div>
        <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Zero-Hallucination Framework
        </h3>
      </div>

      {/* 3D Node Pipeline Visual */}
      <div 
        className="relative z-10 my-auto py-4 flex flex-col items-center justify-center space-y-4"
        style={{ transform: 'translateZ(35px)' }}
      >
        {/* Animated 3D Node Path */}
        <div className="w-full max-w-[270px] relative px-2 py-4">
          <div className="flex items-center justify-between relative z-10">
            {pipelineNodes.map((node, i) => (
              <div key={i} className="flex flex-col items-center space-y-1.5 group/node">
                <div className={`w-7 h-7 rounded-md border flex items-center justify-center shadow-md transition-transform group-hover/node:scale-110 ${
                  isDark ? 'bg-slate-900 border-emerald-500/60 text-emerald-300' : 'bg-white border-emerald-400 text-emerald-700'
                }`}>
                  <span className="text-[10px] font-mono font-bold">0{i + 1}</span>
                </div>
                <span className={`text-[9px] font-mono uppercase tracking-tight text-center ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {node.title}
                </span>
              </div>
            ))}
          </div>

          {/* Glowing connecting track line */}
          <div 
            className="absolute top-7.5 left-6 right-6 h-0.5 pointer-events-none z-0"
            style={{
              background: isDark 
                ? 'linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #10b981 100%)' 
                : 'linear-gradient(90deg, #34d399 0%, #38bdf8 50%, #34d399 100%)'
            }}
          />
        </div>

        {/* Digital Readout */}
        <div className="text-center space-y-1">
          <div className="flex items-baseline justify-center space-x-1">
            <span className={`text-5xl font-mono font-extrabold tracking-tight ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400' 
                : 'text-slate-900'
            }`}>
              10
            </span>
            <span className={`text-xl font-bold font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Steps
            </span>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Traceable section, clause, and subsection grounding
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
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strict Fallback Protocol</span>
        </span>
        <span className="text-emerald-500 font-semibold font-mono text-[11px]">
          100% Grounded
        </span>
      </div>
    </div>
  );
};
