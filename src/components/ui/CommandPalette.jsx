import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Command, 
  Scale, 
  MessageSquare, 
  Cpu, 
  Database, 
  FileText, 
  Sun, 
  Moon, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * CommandPalette Component
 * Inspired by 21st.dev & unicorn.studio:
 * Keyboard-first command terminal (Ctrl+K / Cmd+K) allowing lightning-fast navigation,
 * dispute query execution, and document generation.
 */
export const CommandPalette = ({ isOpen, onClose, onSelectScenario, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'sc-consumer',
      title: 'Run Consumer Dispute Analysis',
      subtitle: 'Defective laptop, 15-day notice under CPA 2019 Section 35',
      category: 'Verified Scenarios',
      icon: Scale,
      onRun: () => {
        onSelectScenario("I purchased an industrial laptop for 85,000 INR from a registered dealer 4 months ago. The motherboard failed within 30 days and the seller refuses to repair or refund despite 1-year warranty. What is the legal process, which consumer forum handles this, what documents do I need to prepare, and what are my deadlines?");
        onClose();
      }
    },
    {
      id: 'sc-cheque',
      title: 'Run Cheque Bouncing Prosecution (S.138)',
      subtitle: 'Section 138 statutory demand notice and 30-day complaint window',
      category: 'Verified Scenarios',
      icon: Scale,
      onRun: () => {
        onSelectScenario("A business client issued a cheque of 4,50,000 INR for goods supplied, which was returned by my bank with the return memo stating 'Funds Insufficient' dated 5 days ago. What is the statutory notice procedure under Section 138 of the Negotiable Instruments Act, what are the mandatory timelines for notice and court complaint, and what documents must be preserved?");
        onClose();
      }
    },
    {
      id: 'sc-tenancy',
      title: 'Run Commercial Lease Termination (S.106)',
      subtitle: 'Eviction notice, rent arrears, and Transfer of Property Act',
      category: 'Verified Scenarios',
      icon: Scale,
      onRun: () => {
        onSelectScenario("My commercial tenant has not paid rent for the last 3 months under an unexpired monthly lease deed. I want to terminate the tenancy lawfully and regain physical possession of the shop. How do I serve the statutory notice under the Transfer of Property Act, what are the notice periods, and what civil court steps follow if they refuse to vacate?");
        onClose();
      }
    },
    {
      id: 'sc-trademark',
      title: 'Run Trademark Opposition Procedure',
      subtitle: 'Form TM-A & Form TM-O timelines under Trade Marks Act 1999',
      category: 'Verified Scenarios',
      icon: Scale,
      onRun: () => {
        onSelectScenario("I want to register a trademark for my software startup under Nice Class 42. What is the procedure for Form TM-A on IP India, what are the official fees for startups, and if a conflicting mark was published in the Trade Marks Journal 2 months ago, how much time do I have to file Form TM-O opposition?");
        onClose();
      }
    },
    {
      id: 'nav-assistant',
      title: 'Open Agent Workspace & Dossier Pane',
      subtitle: 'Interactive multi-turn legal consultation workspace',
      category: 'Navigation',
      icon: MessageSquare,
      onRun: () => {
        onNavigate('assistant');
        onClose();
      }
    },
    {
      id: 'nav-performance',
      title: 'Inspect Performance & 3D Telemetry',
      subtitle: 'Dual-ring tachometer, isometric authority hierarchy, and bento grid',
      category: 'Navigation',
      icon: Cpu,
      onRun: () => {
        onNavigate('performance');
        onClose();
      }
    },
    {
      id: 'nav-corpus',
      title: 'Explore Statutory Corpus Repository',
      subtitle: 'Search through 13 indexed section chunks across 6 primary acts',
      category: 'Navigation',
      icon: Database,
      onRun: () => {
        onNavigate('knowledge');
        onClose();
      }
    },
    {
      id: 'theme-toggle',
      title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle application color scheme',
      category: 'Preferences',
      icon: isDark ? Sun : Moon,
      onRun: () => {
        toggleTheme();
        onClose();
      }
    }
  ];

  const filteredActions = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // Toggle
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].onRun();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden flex flex-col transition-colors ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-blue-950/30' : 'bg-white border-slate-300 text-slate-900 shadow-xl'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Search Header */}
        <div className={`p-3.5 border-b flex items-center space-x-3 ${
          isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'
        }`}>
          <Search className="w-4 h-4 text-blue-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, statute, or scenario..."
            className={`w-full bg-transparent text-sm focus:outline-hidden placeholder-slate-400 font-sans ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          />
          <kbd className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${
            isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-200 border-slate-300 text-slate-600'
          }`}>
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              No matching legal procedures or commands found.
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const Icon = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={action.onRun}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected 
                      ? (isDark ? 'bg-blue-600/20 border border-blue-500/40 text-white' : 'bg-blue-50 border border-blue-200 text-blue-900')
                      : 'border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-8 h-8 rounded-md border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? (isDark ? 'bg-blue-600 text-white border-blue-500' : 'bg-blue-600 text-white border-blue-700')
                        : (isDark ? 'bg-slate-850 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700')
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs tracking-tight truncate">{action.title}</div>
                      <div className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {action.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 pl-2">
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                      isDark ? 'bg-slate-800 border-slate-750 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {action.category}
                    </span>
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className={`p-2.5 border-t text-[11px] font-mono flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/60 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
        }`}>
          <div className="flex items-center space-x-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>Lexora Command Kernel</span>
        </div>
      </div>
    </div>
  );
};
