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
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-4">
        <div className="space-y-2">
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Built for <span className="font-mono tracking-widest text-amber-500 font-normal">Intelligent</span> Performance
          </h2>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Architecture and Verification Benchmark
          </p>
        </div>

        <p className={`text-xs sm:text-sm max-w-md leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Every statutory procedure is engineered for speed, source grounding, and hierarchical authority, giving legal workflows the verifiable foundation to reason and execute in production.
        </p>
      </div>

      {/* 3 Metric Performance Cards with Vibrant 3D HUD & Perspective */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VibrantLatencyCard />
        <IsometricAuthorityCard />
        <HolographicGroundingCard />
      </div>

      {/* Interactive Bento Grid Showcase */}
      <div className="space-y-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Legal Intelligence Bento Grid
            </h3>
            <p className="text-xs text-slate-400">
              Interactive high-performance modules with 3D tilt, magnetic hover feedback, and particle stars.
            </p>
          </div>
          <span className="text-xs font-mono text-blue-400">Hover cards for 3D Perspective</span>
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
