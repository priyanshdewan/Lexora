import React from 'react';
import { Gauge, Layers, Network, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicBento } from './magic/index.js';

export const PerformanceSection = ({ onSelectCategory }) => {
  const { isDark } = useTheme();

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header matching Image 2 */}
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

      {/* 3 Metric Performance Cards directly inspired by Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Retrieval Speed / Response Latency */}
        <div className={`relative rounded-md overflow-hidden border p-6 flex flex-col justify-between h-96 shadow-lg transition-transform hover:-translate-y-0.5 ${
          isDark 
            ? 'border-rose-900/40 bg-gradient-to-b from-rose-950/40 via-slate-900/90 to-slate-950' 
            : 'border-rose-200 bg-gradient-to-b from-rose-50/70 via-white to-slate-50'
        }`}>
          <div className="space-y-1">
            <span className={`text-xs font-semibold block ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>Retrieval Latency</span>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Sub-Second Statutory Indexing</h3>
          </div>

          {/* Speedometer Gauge Visual */}
          <div className="my-auto flex flex-col items-center justify-center space-y-4">
            <div className="relative w-40 h-24 flex items-end justify-center overflow-hidden">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={isDark ? "#334155" : "#e2e8f0"}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#fb7185"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset="120"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-2 text-center">
                <Gauge className={`w-5 h-5 mx-auto ${isDark ? 'text-rose-400 opacity-70' : 'text-rose-600'}`} />
              </div>
            </div>

            {/* Dot Matrix Style Number Display */}
            <div className="text-center space-y-1">
              <div className={`text-4xl sm:text-5xl font-mono font-bold tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>
                32<span className="text-lg font-normal text-rose-500 ml-1 font-sans">ms</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Average multi-tier search latency
              </p>
            </div>
          </div>

          <div className={`pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-rose-950/80' : 'border-rose-100'}`}>
            <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>BM25 + Vector Hybrid</span>
            <span className="text-rose-500 font-medium">99.9% Uptime</span>
          </div>
        </div>

        {/* Card 2: Authority Hierarchy / Priority Tiers */}
        <div className={`relative rounded-md overflow-hidden border p-6 flex flex-col justify-between h-96 shadow-lg transition-transform hover:-translate-y-0.5 ${
          isDark 
            ? 'border-amber-900/40 bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950' 
            : 'border-amber-200 bg-gradient-to-b from-amber-50/70 via-white to-slate-50'
        }`}>
          <div className="space-y-1">
            <span className={`text-xs font-semibold block ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>Authority Hierarchy</span>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Multi-Tier Legal Precedence</h3>
          </div>

          {/* Layered Stack Visual */}
          <div className="my-auto flex flex-col items-center justify-center space-y-4">
            <div className={`w-44 space-y-1.5 p-3 rounded-md border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="h-2.5 bg-amber-500 rounded-sm w-full" title="Tier 1: Statutes" />
              <div className="h-2 bg-amber-600/80 rounded-sm w-[85%]" title="Tier 2: Rules" />
              <div className="h-1.5 bg-amber-700/60 rounded-sm w-[70%]" title="Tier 3: Notifications" />
              <div className="h-1.5 bg-slate-400 rounded-sm w-[55%]" title="Tier 4: Guidelines" />
            </div>

            {/* Dot Matrix Style Number Display */}
            <div className="text-center space-y-1">
              <div className={`text-4xl sm:text-5xl font-mono font-bold tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>
                6<span className="text-lg font-normal text-amber-500 ml-1 font-sans">Tiers</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Official hierarchy precedence
              </p>
            </div>
          </div>

          <div className={`pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-amber-950/80' : 'border-amber-100'}`}>
            <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Conflict Resolution Active</span>
            <span className="text-amber-500 font-medium">Auto-Ranked</span>
          </div>
        </div>

        {/* Card 3: Grounding Protocol / Zero Hallucination */}
        <div className={`relative rounded-md overflow-hidden border p-6 flex flex-col justify-between h-96 shadow-lg transition-transform hover:-translate-y-0.5 ${
          isDark 
            ? 'border-orange-900/40 bg-gradient-to-b from-orange-950/40 via-slate-900/90 to-slate-950' 
            : 'border-orange-200 bg-gradient-to-b from-orange-50/70 via-white to-slate-50'
        }`}>
          <div className="space-y-1">
            <span className={`text-xs font-semibold block ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Grounding Protocol</span>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Zero-Hallucination Framework</h3>
          </div>

          {/* Node Connection Graph Visual */}
          <div className="my-auto flex flex-col items-center justify-center space-y-4">
            <div className="w-44 h-16 relative flex items-center justify-between px-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mx-2" />
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-2" />
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
            </div>

            {/* Dot Matrix Style Number Display */}
            <div className="text-center space-y-1">
              <div className={`text-4xl sm:text-5xl font-mono font-bold tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>
                10<span className="text-lg font-normal text-orange-500 ml-1 font-sans">Steps</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Traceable section & clause citations
              </p>
            </div>
          </div>

          <div className={`pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-orange-950/80' : 'border-orange-100'}`}>
            <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Section 9 & 10 Protocol</span>
            <span className="text-orange-500 font-medium">Strict Fallback</span>
          </div>
        </div>

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
