import React, { useState } from 'react';
import { HeroConsole } from './components/HeroConsole.jsx';
import { PerformanceSection } from './components/PerformanceSection.jsx';
import { AssistantView } from './components/AssistantView.jsx';
import { KnowledgeBaseView } from './components/KnowledgeBaseView.jsx';
import { PrivacyPolicyView } from './components/PrivacyPolicyView.jsx';
import { TermsView } from './components/TermsView.jsx';
import { DomainSettingsModal } from './components/DomainSettingsModal.jsx';
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
    <div className={`min-h-screen font-sans selection:bg-rose-900/50 selection:text-white flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-[#080c14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Top Navbar matching Image 1 & 2 */}
      <header className={`sticky top-0 z-40 h-16 border-b backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors duration-200 ${
        isDark ? 'border-slate-800/90 bg-[#080c14]/90 text-slate-100' : 'border-slate-200/90 bg-white/95 text-slate-900 shadow-xs'
      }`}>
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('overview')}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <div className={`w-9 h-9 border rounded-md flex items-center justify-center shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'
          }`}>
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`font-bold text-sm sm:text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Lexora</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 border rounded-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'
              }`}>
                v2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Procedural Legal Intelligence Engine</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 text-xs font-medium">
          <button
            onClick={() => setCurrentView('overview')}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentView === 'overview'
                ? (isDark ? 'bg-slate-850 text-white font-semibold border border-slate-700' : 'bg-slate-100 text-slate-900 font-semibold border border-slate-300 shadow-xs')
                : (isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setCurrentView('assistant')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-1.5 ${
              currentView === 'assistant'
                ? (isDark ? 'bg-slate-850 text-white font-semibold border border-slate-700' : 'bg-slate-100 text-slate-900 font-semibold border border-slate-300 shadow-xs')
                : (isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Agent Workspace</span>
          </button>

          <button
            onClick={() => setCurrentView('performance')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-1.5 ${
              currentView === 'performance'
                ? (isDark ? 'bg-slate-850 text-white font-semibold border border-slate-700' : 'bg-slate-100 text-slate-900 font-semibold border border-slate-300 shadow-xs')
                : (isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Performance</span>
          </button>

          <button
            onClick={() => setCurrentView('knowledge')}
            className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-1.5 ${
              currentView === 'knowledge'
                ? (isDark ? 'bg-slate-850 text-white font-semibold border border-slate-700' : 'bg-slate-100 text-slate-900 font-semibold border border-slate-300 shadow-xs')
                : (isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Corpus</span>
            <span className={`text-[10px] font-mono px-1 py-0.2 rounded-sm ${
              isDark ? 'bg-slate-900 border border-slate-800 text-slate-400' : 'bg-slate-200 border border-slate-300 text-slate-700'
            }`}>
              {docCount}
            </span>
          </button>

          <button
            onClick={() => setCurrentView('privacy')}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentView === 'privacy'
                ? (isDark ? 'bg-slate-850 text-white font-semibold border border-slate-700' : 'bg-slate-100 text-slate-900 font-semibold border border-slate-300 shadow-xs')
                : (isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
            }`}
          >
            Privacy
          </button>

          <button
            onClick={() => setCurrentView('terms')}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentView === 'terms'
                ? (isDark ? 'bg-slate-850 text-white font-semibold border border-slate-700' : 'bg-slate-100 text-slate-900 font-semibold border border-slate-300 shadow-xs')
                : (isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
            }`}
          >
            Terms
          </button>
        </nav>

        {/* Right CTA, Custom Domain & Theme Switcher */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={toggleTheme}
            className={`p-2 border rounded-md transition-colors flex items-center justify-center ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-amber-400' 
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-xs'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle light or dark theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsDomainModalOpen(true)}
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 border rounded-md text-xs font-mono transition-colors ${
              isDark ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
            }`}
          >
            <Globe className="w-3 h-3 text-slate-400" />
            <span>{currentDomain}</span>
          </button>

          <button
            onClick={() => setCurrentView('assistant')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm ${
              isDark ? 'bg-slate-100 hover:bg-white text-slate-950' : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            Launch Agent
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-slate-400 hover:text-slate-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b p-4 space-y-2 text-xs transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
        }`}>
          <button onClick={() => { setCurrentView('overview'); setMobileMenuOpen(false); }} className={`block w-full text-left py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Overview</button>
          <button onClick={() => { setCurrentView('assistant'); setMobileMenuOpen(false); }} className={`block w-full text-left py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Agent Workspace</button>
          <button onClick={() => { setCurrentView('performance'); setMobileMenuOpen(false); }} className={`block w-full text-left py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Performance</button>
          <button onClick={() => { setCurrentView('knowledge'); setMobileMenuOpen(false); }} className={`block w-full text-left py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Corpus ({docCount})</button>
          <button onClick={() => { setCurrentView('privacy'); setMobileMenuOpen(false); }} className={`block w-full text-left py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Privacy Policy</button>
          <button onClick={() => { setCurrentView('terms'); setMobileMenuOpen(false); }} className={`block w-full text-left py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Terms and Conditions</button>
          <button onClick={() => { setIsDomainModalOpen(true); setMobileMenuOpen(false); }} className={`block w-full text-left py-1.5 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Domain: {currentDomain}</button>
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

    </div>
  );
}
