import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Scale, Cpu, ShieldCheck, Activity, Terminal, Database } from 'lucide-react';

/**
 * BasementMarquee Component
 * Inspired by Basement Studio:
 * Brutalist technical tape ticker with razor-sharp borders, crosshair corner markers,
 * and live kinetic legal-engineering telemetry.
 */
export const BasementMarquee = () => {
  const { isDark } = useTheme();

  const items = [
    { label: "DETERMINISTIC RETRIEVAL ENGINE", icon: Cpu, stat: "32MS P99" },
    { label: "ZERO FABRICATION FIREWALL", icon: ShieldCheck, stat: "100% GROUNDED" },
    { label: "CENTRAL ACTS & REGULATIONS", icon: Scale, stat: "TIERS 1-6" },
    { label: "COURT-READY PLEADING GENERATOR", icon: Terminal, stat: "A4 EXPORT" },
    { label: "CROSS-STATUTE CONFLICT MATRIX", icon: Activity, stat: "S.138 / CPA / TPA" },
    { label: "VECTOR EMBEDDINGS & BM25", icon: Database, stat: "HYBRID RAG" },
  ];

  return (
    <div className={`relative w-full border-y overflow-hidden select-none py-2.5 transition-colors ${
      isDark 
        ? 'bg-slate-950/90 border-slate-800 text-slate-300' 
        : 'bg-slate-100/90 border-slate-200 text-slate-800'
    }`}>
      {/* Corner crosshairs matching Basement Studio visual precision */}
      <span className="absolute left-2 top-0.5 text-[9px] font-mono text-slate-400 select-none">+</span>
      <span className="absolute right-2 top-0.5 text-[9px] font-mono text-slate-400 select-none">+</span>
      <span className="absolute left-2 bottom-0.5 text-[9px] font-mono text-slate-400 select-none">+</span>
      <span className="absolute right-2 bottom-0.5 text-[9px] font-mono text-slate-400 select-none">+</span>

      <div className="flex w-max animate-marquee space-x-8 items-center text-xs font-mono tracking-wider uppercase">
        {/* Render twice for seamless loop */}
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-blue-600'}`} />
              <Icon className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-semibold">{item.label}</span>
              <span className={`px-1.5 py-0.2 text-[10px] rounded border font-mono ${
                isDark ? 'bg-slate-900 border-slate-800 text-cyan-300' : 'bg-white border-slate-300 text-blue-700'
              }`}>
                {item.stat}
              </span>
              <span className="text-slate-400 dark:text-slate-600 font-sans pl-2">//</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
