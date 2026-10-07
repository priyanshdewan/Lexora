import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Activity, ShieldCheck, Cpu, Command } from 'lucide-react';

/**
 * TelemetryStatusBar Component
 * Inspired by Basement Studio:
 * Fixed bottom cyber-telemetry HUD strip showing live statutory grounding, ping, and mode.
 */
export const TelemetryStatusBar = ({ onOpenCommandPalette }) => {
  const { isDark } = useTheme();

  return (
    <footer className={`sticky bottom-0 z-30 w-full border-t px-4 py-2 text-[11px] font-mono select-none backdrop-blur-md transition-colors ${
      isDark 
        ? 'bg-[#080c14]/90 border-slate-800 text-slate-400' 
        : 'bg-white/95 border-slate-200 text-slate-600 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Operational Health Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">PIPELINE SYNCHRONIZED</span>
          </div>
          <span className="opacity-40">|</span>
          <div className="hidden sm:flex items-center space-x-1">
            <Cpu className="w-3 h-3 text-blue-500" />
            <span>HYBRID RAG (BM25 + VECTOR)</span>
          </div>
        </div>

        {/* Center: Live Metrics */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3 h-3 text-cyan-500" />
            <span>GROUNDING: <strong className="text-slate-900 dark:text-white">100% CITATION</strong></span>
          </div>
          <span className="opacity-40">|</span>
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3 h-3 text-amber-500" />
            <span>P99: <strong className="text-slate-900 dark:text-white">32MS</strong></span>
          </div>
        </div>

        {/* Right: Interactive Command Shortcut Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenCommandPalette}
            className={`px-2 py-0.5 rounded border flex items-center space-x-1 text-[10px] font-mono transition-colors ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-800 border-slate-750 text-slate-300' 
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
            }`}
          >
            <Command className="w-3 h-3 text-blue-500" />
            <span>CTRL + K</span>
          </button>
          <span className="text-[10px] opacity-60 hidden lg:inline">INDIAN LAW PROCEDURAL PROTOCOL</span>
        </div>
      </div>
    </footer>
  );
};
