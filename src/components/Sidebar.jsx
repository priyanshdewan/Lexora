import React from 'react';
import { 
  Scale, 
  MessageSquare, 
  Database, 
  ShieldCheck, 
  FileCheck, 
  Globe, 
  History, 
  Plus, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

import { useTheme } from '../context/ThemeContext.jsx';

export const Sidebar = ({ 
  currentView, 
  setView, 
  docCount, 
  openDomainModal, 
  currentDomain,
  recentQueries,
  onSelectRecentQuery,
  onNewSession
}) => {
  const { isDark } = useTheme();

  return (
    <aside className={`w-64 border-r flex flex-col h-screen shrink-0 select-none transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
    }`}>
      
      {/* Brand Header */}
      <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-slate-850' : 'border-slate-200'}`}>
        <div 
          onClick={() => setView('assistant')}
          className="flex items-center space-x-2.5 cursor-pointer"
        >
          <div className={`w-8 h-8 border rounded-md flex items-center justify-center ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'
          }`}>
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className={`font-bold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Lexora</span>
              <span className={`text-[10px] font-mono border px-1 py-0.2 rounded-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'
              }`}>
                AGENT
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Procedural Legal Workspace</p>
          </div>
        </div>
      </div>

      {/* New Session Button */}
      <div className="p-3 border-b border-slate-850">
        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-750 text-slate-200 rounded-md text-xs font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-slate-300" />
          <span>New Legal Analysis</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        
        {/* Workspace Modules */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 block mb-1">
            Workspace
          </span>

          <button
            onClick={() => setView('assistant')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
              currentView === 'assistant'
                ? 'bg-slate-900 text-white border border-slate-750 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Procedural Agent</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 px-1 rounded-sm">
              Live
            </span>
          </button>

          <button
            onClick={() => setView('knowledge')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
              currentView === 'knowledge'
                ? 'bg-slate-900 text-white border border-slate-750 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              <span>Statutory Corpus</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded-sm">
              {docCount}
            </span>
          </button>
        </div>

        {/* Recent Cases / Queries */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Active Cases
            </span>
            <History className="w-3 h-3 text-slate-400" />
          </div>

          <div className="space-y-1">
            {recentQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectRecentQuery(item)}
                className="w-full text-left px-2.5 py-1.5 rounded-md text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-colors truncate block"
                title={item.query}
              >
                <div className="font-medium text-slate-300 text-[11px] truncate">
                  {item.label}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {item.category}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Legal & Compliance Pages */}
        <div className="space-y-1 pt-2 border-t border-slate-850">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 block mb-1">
            Legal & Compliance
          </span>

          <button
            onClick={() => setView('privacy')}
            className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
              currentView === 'privacy'
                ? 'bg-slate-900 text-white border border-slate-750 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setView('terms')}
            className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
              currentView === 'terms'
                ? 'bg-slate-900 text-white border border-slate-750 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Terms and Conditions</span>
          </button>
        </div>

      </div>

      {/* Bottom Domain & Host Bar */}
      <div className="p-3 border-t border-slate-850 bg-slate-950">
        <button
          onClick={openDomainModal}
          className="w-full flex items-center justify-between px-2.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-md text-xs font-mono text-slate-400 transition-colors"
        >
          <div className="flex items-center space-x-1.5 truncate">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-200 truncate">{currentDomain}</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase">Config</span>
        </button>
      </div>

    </aside>
  );
};
