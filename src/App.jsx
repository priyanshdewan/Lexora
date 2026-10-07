import React, { useState } from 'react';
import { HeroConsole } from './components/HeroConsole.jsx';
import { PerformanceSection } from './components/PerformanceSection.jsx';
import { AssistantView } from './components/AssistantView.jsx';
import { KnowledgeBaseView } from './components/KnowledgeBaseView.jsx';
import { PrivacyPolicyView } from './components/PrivacyPolicyView.jsx';
import { TermsView } from './components/TermsView.jsx';
import { DomainSettingsModal } from './components/DomainSettingsModal.jsx';
import { LenisProvider } from './components/smooth/LenisProvider.jsx';
import { CommandPalette } from './components/ui/CommandPalette.jsx';
import { TelemetryStatusBar } from './components/ui/TelemetryStatusBar.jsx';
import { Search, Command } from 'lucide-react';
import { ragEngine } from './services/ragEngine.js';
import { 
  Scale, 
  Globe, 
  Database, 
  ShieldCheck, 
  FileCheck, 
  Cpu, 
  MessageSquare, 
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from './context/ThemeContext.jsx';

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('overview'); // 'overview' | 'assistant' | 'performance' | 'knowledge' | 'privacy' | 'terms'
  const [docCount, setDocCount] = useState(ragEngine.getAllDocuments().length);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [selectedScenarioQuery, setSelectedScenarioQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const [currentDomain, setCurrentDomain] = useState(() => {
    return localStorage.getItem('legal_rag_custom_domain') || 'legal-rag.internal';
  });

  const handleSaveDomain = (newDomain) => {
    setCurrentDomain(newDomain);
    localStorage.setItem('legal_rag_custom_domain', newDomain);
  };

  const handleCorpusUpdated = () => {
    setDocCount(ragEngine.getAllDocuments().length);
  };

  const handleSelectQueryFromHero = (queryText) => {
    setSelectedScenarioQuery(queryText);
    setCurrentView('assistant');
  };

  return (
    <LenisProvider>
      <div className={`min-h-screen relative font-sans selection:bg-blue-600 selection:text-white flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-[#080c14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Subtle ambient micro-pattern to break digital flatness */}
      <div 
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Navbar */}
      <header className={`sticky top-0 z-40 h-16 border-b backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors duration-200 ${
        isDark ? 'border-slate-800/90 bg-[#080c14]/90 text-slate-100' : 'border-slate-200/90 bg-white/95 text-slate-900 shadow-xs'
      }`}>
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('overview')}
          className="flex items-center space-x-3 cursor-pointer select-none group"
        >
          <div className={`w-9 h-9 border rounded-md flex items-center justify-center shadow-xs transition-all duration-200 ${
            isDark ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 group-hover:border-blue-400' : 'bg-blue-600 border-blue-700 text-white group-hover:bg-blue-700'
          }`}>
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`font-bold text-sm sm:text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>Lexora</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 border rounded-sm font-semibold ${
                isDark ? 'bg-blue-950/70 border-blue-800/80 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                v2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">Procedural Legal Intelligence Engine</p>
          </div>
        </div>

        {/* Navigation Links in Segmented Container */}
        <nav className={`hidden md:flex items-center p-1 rounded-lg border text-xs font-medium space-x-1 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100/90 border-slate-200'
        }`}>
          <button
            onClick={() => setCurrentView('overview')}
            className={`px-3 py-1.5 rounded-md transition-all duration-150 ${
              currentView === 'overview'
                ? (isDark ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/30 border border-blue-500' : 'bg-blue-600 text-white font-semibold shadow-xs border border-blue-700')
                : (isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-blue-700 hover:bg-white/80')
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setCurrentView('assistant')}
            className={`px-3 py-1.5 rounded-md transition-all duration-150 flex items-center space-x-1.5 ${
              currentView === 'assistant'
                ? (isDark ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/30 border border-blue-500' : 'bg-blue-600 text-white font-semibold shadow-xs border border-blue-700')
                : (isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-blue-700 hover:bg-white/80')
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Agent Workspace</span>
          </button>

          <button
            onClick={() => setCurrentView('performance')}
            className={`px-3 py-1.5 rounded-md transition-all duration-150 flex items-center space-x-1.5 ${
              currentView === 'performance'
                ? (isDark ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/30 border border-blue-500' : 'bg-blue-600 text-white font-semibold shadow-xs border border-blue-700')
                : (isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-blue-700 hover:bg-white/80')
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Performance</span>
          </button>

          <button
            onClick={() => setCurrentView('knowledge')}
            className={`px-3 py-1.5 rounded-md transition-all duration-150 flex items-center space-x-1.5 ${
              currentView === 'knowledge'
                ? (isDark ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/30 border border-blue-500' : 'bg-blue-600 text-white font-semibold shadow-xs border border-blue-700')
                : (isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-blue-700 hover:bg-white/80')
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Corpus</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold transition-colors ${
              currentView === 'knowledge'
                ? 'bg-blue-700 text-white border border-blue-400/40'
                : (isDark ? 'bg-slate-800 border border-slate-700 text-slate-300' : 'bg-blue-100 border border-blue-200 text-blue-800')
            }`}>
              {docCount}
            </span>
          </button>

          <button
            onClick={() => setCurrentView('privacy')}
            className={`px-3 py-1.5 rounded-md transition-all duration-150 ${
              currentView === 'privacy'
                ? (isDark ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/30 border border-blue-500' : 'bg-blue-600 text-white font-semibold shadow-xs border border-blue-700')
                : (isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-blue-700 hover:bg-white/80')
            }`}
          >
            Privacy
          </button>

          <button
            onClick={() => setCurrentView('terms')}
            className={`px-3 py-1.5 rounded-md transition-all duration-150 ${
              currentView === 'terms'
                ? (isDark ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-900/30 border border-blue-500' : 'bg-blue-600 text-white font-semibold shadow-xs border border-blue-700')
                : (isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-blue-700 hover:bg-white/80')
            }`}
          >
            Terms
          </button>
        </nav>

        {/* Right CTA, Command Search & Theme Switcher */}
        <div className="flex items-center space-x-2">
          {/* Quick Command Launcher button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className={`hidden lg:flex items-center space-x-2 px-2.5 py-1.5 border rounded-md text-xs font-mono transition-colors ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300' 
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-600 shadow-2xs'
            }`}
            title="Open Command Kernel (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-blue-500" />
            <span>Search or jump...</span>
            <kbd className={`px-1.5 py-0.2 rounded border text-[10px] ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'
            }`}>
              ⌘K
            </kbd>
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 border rounded-md transition-all flex items-center justify-center ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-amber-400' 
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-2xs hover:text-blue-600'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle light or dark theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsDomainModalOpen(true)}
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 border rounded-md text-xs font-mono transition-colors ${
              isDark ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-2xs'
            }`}
          >
            <Globe className="w-3 h-3 text-blue-500" />
            <span>{currentDomain}</span>
          </button>

          <button
            onClick={() => setCurrentView('assistant')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all shadow-xs flex items-center space-x-1.5 ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 shadow-blue-900/30' 
                : 'bg-slate-950 hover:bg-blue-700 text-white border border-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Launch Agent</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b p-4 space-y-1.5 text-xs transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
        }`}>
          <button 
            onClick={() => { setCurrentView('overview'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              currentView === 'overview' 
                ? 'bg-blue-600 text-white font-semibold' 
                : (isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100')
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => { setCurrentView('assistant'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              currentView === 'assistant' 
                ? 'bg-blue-600 text-white font-semibold' 
                : (isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100')
            }`}
          >
            Agent Workspace
          </button>
          <button 
            onClick={() => { setCurrentView('performance'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              currentView === 'performance' 
                ? 'bg-blue-600 text-white font-semibold' 
                : (isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100')
            }`}
          >
            Performance
          </button>
          <button 
            onClick={() => { setCurrentView('knowledge'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left px-3 py-2 rounded-md font-medium flex items-center justify-between ${
              currentView === 'knowledge' 
                ? 'bg-blue-600 text-white font-semibold' 
                : (isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100')
            }`}
          >
            <span>Corpus</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 dark:bg-slate-800 dark:text-slate-200">
              {docCount}
            </span>
          </button>
          <button 
            onClick={() => { setCurrentView('privacy'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              currentView === 'privacy' 
                ? 'bg-blue-600 text-white font-semibold' 
                : (isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100')
            }`}
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => { setCurrentView('terms'); setMobileMenuOpen(false); }} 
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              currentView === 'terms' 
                ? 'bg-blue-600 text-white font-semibold' 
                : (isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100')
            }`}
          >
            Terms and Conditions
          </button>
          <button 
            onClick={() => { setIsDomainModalOpen(true); setMobileMenuOpen(false); }} 
            className={`block w-full text-left px-3 py-2 rounded-md font-mono ${isDark ? 'text-slate-400 hover:bg-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            Domain: {currentDomain}
          </button>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1">
        {currentView === 'overview' && (
          <div className="space-y-4">
            <HeroConsole
              onSelectQuery={handleSelectQueryFromHero}
              onNavigateToView={setCurrentView}
              activeDocCount={docCount}
            />
            <div className={`border-t ${isDark ? 'border-slate-850' : 'border-slate-200'}`}>
              <PerformanceSection onSelectCategory={(cat) => setCurrentView('assistant')} />
            </div>
          </div>
        )}

        {currentView === 'assistant' && (
          <AssistantView
            selectedScenarioQuery={selectedScenarioQuery}
            onClearSelectedQuery={() => setSelectedScenarioQuery('')}
          />
        )}

        {currentView === 'performance' && (
          <PerformanceSection onSelectCategory={(cat) => setCurrentView('assistant')} />
        )}

        {currentView === 'knowledge' && (
          <KnowledgeBaseView onCorpusUpdated={handleCorpusUpdated} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyView />
        )}

        {currentView === 'terms' && (
          <TermsView />
        )}
      </main>

      {/* Institutional Legal Footer */}
      <footer className={`border-t text-xs py-8 mt-auto transition-colors ${
        isDark ? 'border-slate-850 bg-slate-950 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 border rounded-md flex items-center justify-center ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>
              <Scale className="w-3 h-3" />
            </div>
            <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Lexora</span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>|</span>
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Procedural Legal Intelligence Platform</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('overview')} className={`transition-colors ${isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'}`}>Overview</button>
            <button onClick={() => setCurrentView('assistant')} className={`transition-colors ${isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'}`}>Workspace</button>
            <button onClick={() => setCurrentView('knowledge')} className={`transition-colors ${isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'}`}>Corpus</button>
            <button onClick={() => setCurrentView('privacy')} className={`transition-colors ${isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'}`}>Privacy Policy</button>
            <button onClick={() => setCurrentView('terms')} className={`transition-colors ${isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'}`}>Terms</button>
          </div>

          <div className={`flex items-center space-x-2 text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Globe className="w-3 h-3 text-slate-400" />
            <span>Host: {currentDomain}</span>
          </div>

        </div>

        <div className={`max-w-6xl mx-auto px-4 mt-4 pt-4 border-t text-center text-[11px] ${
          isDark ? 'border-slate-900 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          This system is an automated procedural guidance engine based on retrieved statutory documents. It does not constitute formal legal representation or advocacy.
        </div>
      </footer>

      {/* Domain Settings Modal */}
      <DomainSettingsModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
        currentDomain={currentDomain}
        onSaveDomain={handleSaveDomain}
      />

      {/* 21st.dev / unicorn.studio Command Palette Terminal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectScenario={handleSelectQueryFromHero}
        onNavigate={setCurrentView}
      />

      {/* Basement Studio Sticky Bottom Telemetry Status HUD */}
      <TelemetryStatusBar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      </div>
    </LenisProvider>
  );
}
