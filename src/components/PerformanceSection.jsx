import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicBento } from './magic/index.js';
import { VibrantLatencyCard } from './VibrantLatencyCard.jsx';
import { IsometricAuthorityCard } from './IsometricAuthorityCard.jsx';
import { HolographicGroundingCard } from './HolographicGroundingCard.jsx';

export const PerformanceSection = ({ onSelectCategory }) => {
  const { isDark } = useTheme();

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
        <div className="space-y-3 max-w-xl">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md border text-xs font-mono font-medium tracking-wide uppercase transition-colors shadow-2xs ${
            isDark ? 'bg-amber-950/60 border-amber-800/80 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-700'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Architecture & Verification Telemetry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans leading-tight">
            <span className={isDark ? 'text-white' : 'text-slate-950'}>Engineered for </span>
            <span className={
              isDark 
                ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent'
            }>
              Sub-50ms Precision
            </span>
          </h2>
          
          <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Every statutory procedure is engineered for real-time speed, source grounding, and hierarchical authority, giving legal workflows the verifiable foundation to reason and execute in production.
          </p>
        </div>

        <div className={`p-4 border rounded-lg space-y-1.5 max-w-xs shrink-0 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Active Pipeline</span>
            <span className="text-emerald-500 font-semibold">100% Deterministic</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            BM25 Lexical + Dense Vector + Citation Firewall
          </div>
        </div>
      </div>

      {/* 3 Metric Performance Cards with Vibrant 3D HUD & Perspective */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VibrantLatencyCard />
        <IsometricAuthorityCard />
        <HolographicGroundingCard />
      </div>

      {/* Interactive Bento Grid Showcase */}
      <div className="space-y-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Core Architectural Modules
              </h3>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                isDark ? 'bg-blue-950/60 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                6 Pillars
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              High-performance legal reasoning modules with 3D tilt, magnetic hover feedback, and particle stars.
            </p>
          </div>
          <span className={`text-xs font-mono px-2.5 py-1 rounded border self-start sm:self-auto ${
            isDark ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-slate-100 border-slate-200 text-blue-700'
          }`}>
            Hover cards for 3D Perspective
          </span>
        </div>

        <MagicBento 
          enableStars={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          onSelectFeature={(id) => {
            if (onSelectCategory) onSelectCategory(id);
          }}
        />
      </div>

    </section>
  );
};
