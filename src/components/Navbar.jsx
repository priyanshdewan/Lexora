import React from 'react';
import { Scale, Database, ShieldCheck, FileCheck, Globe } from 'lucide-react';

export const Navbar = ({ currentView, setView, docCount, openDomainModal, currentDomain }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900 text-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity (No emojis, crisp geometric design) */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('assistant')}>
          <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-md flex items-center justify-center text-slate-200">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white">Lexora</span>
              <span className="text-[10px] font-mono uppercase bg-slate-800 border border-slate-700 text-slate-300 px-1.5 py-0.5 rounded-sm">
                Engine v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal">Source-Grounded Procedural Legal Intelligence</p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 font-medium text-sm">
          <button
            onClick={() => setView('assistant')}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentView === 'assistant'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            Assistant
          </button>

          <button
            onClick={() => setView('knowledge')}
            className={`px-3 py-2 rounded-md flex items-center space-x-1.5 transition-colors ${
              currentView === 'knowledge'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Database className="w-4 h-4 text-slate-400" />
            <span>Knowledge Base</span>
            <span className="ml-1 text-xs bg-slate-800 border border-slate-700 px-1.5 py-0.2 rounded-sm text-slate-300">
              {docCount}
            </span>
          </button>

          <button
            onClick={() => setView('privacy')}
            className={`px-3 py-2 rounded-md flex items-center space-x-1.5 transition-colors ${
              currentView === 'privacy'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setView('terms')}
            className={`px-3 py-2 rounded-md flex items-center space-x-1.5 transition-colors ${
              currentView === 'terms'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <FileCheck className="w-4 h-4 text-slate-400" />
            <span>Terms and Conditions</span>
          </button>
        </nav>

        {/* Right: Custom Domain Configuration Badge (No pill buttons) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openDomainModal}
            className="flex items-center space-x-2 text-xs font-mono bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-md transition-colors"
            title="Configure Custom Domain and Network Settings"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Domain:</span>
            <span className="text-slate-100 font-semibold">{currentDomain}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
