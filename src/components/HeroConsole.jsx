import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Calendar,
  Layers
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicBox, MagicButton } from './magic/index.js';

export const HeroConsole = ({ onSelectQuery, onNavigateToView, activeDocCount }) => {
  const { isDark } = useTheme();

  const cases = [
    {
      title: "Consumer Protection: Laptop Defect",
      statute: "Consumer Protection Act, 2019 (Section 35)",
      status: "Notice Stage",
      query: "I purchased an industrial laptop for 85,000 INR from a registered dealer 4 months ago. The motherboard failed within 30 days and the seller refuses to repair or refund despite 1-year warranty. What is the legal process, which consumer forum handles this, what documents do I need to prepare, and what are my deadlines?"
    },
    {
      title: "Commercial Tenancy: Section 106 Notice",
      statute: "Transfer of Property Act, 1882 (Section 106)",
      status: "Pre-Litigation",
      query: "My commercial tenant has not paid rent for the last 3 months under an unexpired monthly lease deed. I want to terminate the tenancy lawfully and regain physical possession of the shop. How do I serve the statutory notice under the Transfer of Property Act, what are the notice periods, and what civil court steps follow if they refuse to vacate?"
    },
    {
      title: "Cheque Dishonour: Section 138 Notice",
      statute: "Negotiable Instruments Act, 1881 (Section 138)",
      status: "30-Day Window",
      query: "A business client issued a cheque of 4,50,000 INR for goods supplied, which was returned by my bank with the return memo stating 'Funds Insufficient' dated 5 days ago. What is the statutory notice procedure under Section 138 of the Negotiable Instruments Act, what are the mandatory timelines for notice and court complaint, and what documents must be preserved?"
    },
    {
      title: "Trademark Opposition: Form TM-O",
      statute: "Trade Marks Act, 1999 (Section 21)",
      status: "Journal Period",
      query: "I want to register a trademark for my software startup under Nice Class 42. What is the procedure for Form TM-A on IP India, what are the official fees for startups, and if a conflicting mark was published in the Trade Marks Journal 2 months ago, how much time do I have to file Form TM-O opposition?"
    }
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 pt-8 pb-12">
      
      {/* Hero Header matching Image 1 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <Scale className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
            <span>Lexora: Procedural Legal Platform</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-bold tracking-tight leading-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Build Systems That Think and Act
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Lexora Source-Grounded Procedural Legal Guidance Engine
          </p>
        </div>

        <div className="max-w-sm space-y-4">
          <p className={`text-xs sm:text-sm leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Automate statutory analysis, document checklists, and submission timelines grounded in official legislation in real time.
          </p>
          <MagicButton
            variant="primary"
            size="lg"
            onClick={() => onSelectQuery(cases[0].query)}
            className="font-semibold shadow-md"
          >
            <span>Start Legal Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </MagicButton>
        </div>
      </div>

      {/* Central Framed Dashboard Preview Container matching Image 1 */}
      <div className={`relative rounded-lg p-2 sm:p-4 border shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-orange-500/20 border-slate-750' 
          : 'bg-gradient-to-r from-amber-100/60 via-rose-100/60 to-orange-100/60 border-slate-200'
      }`}>
        <div className={`rounded-md border overflow-hidden ${
          isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          
          {/* Top Dashboard Header */}
          <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900/60 border-slate-850' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  readOnly
                  value="Search verified statutes, sections, and procedural rules..."
                  className={`w-full border rounded-md pl-8 pr-3 py-1.5 text-xs focus:outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className={`px-2.5 py-1 border rounded-md flex items-center space-x-1.5 ${
                isDark 
                  ? 'bg-emerald-950/70 border-emerald-900/80 text-emerald-400' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                <span>RAG Verified: 100% Grounding</span>
              </span>
            </div>
          </div>

          {/* Top 3 Stat Cards directly matching Image 1 */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-px border-b ${
            isDark ? 'bg-slate-800 border-slate-850' : 'bg-slate-200 border-slate-200'
          }`}>
            <div className={`p-5 space-y-1 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <span className="text-xs text-slate-400 font-sans">Statutory Grounding</span>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>100%</span>
                <span className="text-xs text-emerald-500 font-mono flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> Step 9 & 10
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Zero-hallucination citation protocol</p>
            </div>

            <div className={`p-5 space-y-1 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <span className="text-xs text-slate-400 font-sans">Corpus Sections</span>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>13 Chunks</span>
                <span className="text-xs text-amber-500 font-mono">6 Acts</span>
              </div>
              <p className="text-[11px] text-slate-400">Official laws, codes, and rules</p>
            </div>

            <div className={`p-5 space-y-1 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <span className="text-xs text-slate-400 font-sans">Retrieval Latency</span>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>32 ms</span>
                <span className="text-xs text-rose-500 font-mono">Sub-second</span>
              </div>
              <p className="text-[11px] text-slate-400">Multi-tier priority indexation</p>
            </div>
          </div>

          {/* Middle Body: Timeline Graph + Active Legal Cases */}
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-px ${
            isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`}>
            
            {/* Left Graph: Statutory Limitation Deadlines visual */}
            <div className={`lg:col-span-7 p-6 space-y-4 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Statutory Limitation Timelines</h3>
                  <p className="text-xs text-slate-400">Prescribed procedural windows across legal domains</p>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 border rounded-sm ${
                  isDark ? 'text-slate-400 bg-slate-900 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
                }`}>
                  Active Periods
                </span>
              </div>

              {/* SVG Timeline Curve */}
              <div className="h-44 w-full relative pt-4">
                <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroCurveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  <line x1="0" y1="30" x2="500" y2="30" stroke={isDark ? "#1e293b" : "#f1f5f9"} strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke={isDark ? "#1e293b" : "#f1f5f9"} strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke={isDark ? "#1e293b" : "#f1f5f9"} strokeDasharray="3 3" />

                  <path
                    d="M 0 130 L 60 110 L 140 120 L 220 70 L 300 95 L 380 40 L 440 60 L 500 20 L 500 150 L 0 150 Z"
                    fill="url(#heroCurveGradient)"
                  />

                  <path
                    d="M 0 130 L 60 110 L 140 120 L 220 70 L 300 95 L 380 40 L 440 60 L 500 20"
                    fill="none"
                    stroke="#fb7185"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  <circle cx="220" cy="70" r="4" fill="#fb7185" />
                  <circle cx="380" cy="40" r="4" fill="#fb7185" />
                  <circle cx="500" cy="20" r="4" fill="#fb7185" />
                </svg>

                <div className={`flex justify-between text-[10px] font-mono pt-2 border-t ${
                  isDark ? 'text-slate-400 border-slate-900' : 'text-slate-500 border-slate-100'
                }`}>
                  <span>15-Day Cure</span>
                  <span>30-Day Notice</span>
                  <span>45-Day Appeal</span>
                  <span>180-Day Compliance</span>
                  <span>2-Year Limitation</span>
                </div>
              </div>
            </div>

            {/* Right: Active Legal Cases */}
            <div className={`lg:col-span-5 p-6 space-y-4 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Verified Legal Scenarios</h3>
                  <p className="text-xs text-slate-400">Click any matter to run instant procedural analysis</p>
                </div>
                <span className="text-xs font-mono text-slate-400">4 Scenarios</span>
              </div>

              <div className="space-y-2">
                {cases.map((c, idx) => (
                  <MagicBox
                    key={idx}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    clickEffect={true}
                    onClick={() => onSelectQuery(c.query)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors flex items-center justify-between text-xs ${
                      isDark 
                        ? 'bg-slate-900/60 border-slate-800' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.title}</div>
                      <div className="text-[11px] text-slate-400">{c.statute}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className={`px-2 py-0.5 font-mono text-[10px] rounded-sm ${
                        isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </MagicBox>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
