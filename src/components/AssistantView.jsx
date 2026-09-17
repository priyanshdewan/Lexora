import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Clock, 
  Key, 
  RotateCcw,
  Layers,
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { ragEngine } from '../services/ragEngine.js';
import { AgentTrace } from './AgentTrace.jsx';
import { DossierPane } from './DossierPane.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicBox, MagicButton } from './magic/index.js';

export const AssistantView = ({ selectedScenarioQuery, onClearSelectedQuery }) => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState(selectedScenarioQuery || '');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const presetScenarios = [
    { label: "Consumer Dispute", query: "Purchased a defective laptop worth 85,000 INR from an online merchant in Mumbai. The merchant refuses repair or replacement despite active statutory warranty. What is the procedure to file a complaint?" },
    { label: "Cheque Dishonour", query: "Received a cheque of 4,50,000 INR from a business partner which was dishonoured by the bank with memo 'Funds Insufficient'. How do I issue a legal notice and prosecute under Section 138?" },
    { label: "Trademark Conflict", query: "A competitor in Bengaluru has started using a brand logo phonetically identical to my registered medical device trademark. What urgent injunction procedure applies?" }
  ];

  React.useEffect(() => {
    if (selectedScenarioQuery) {
      setQuery(selectedScenarioQuery);
      handleExecuteQuery(selectedScenarioQuery);
      if (onClearSelectedQuery) onClearSelectedQuery();
    }
  }, [selectedScenarioQuery]);

  const traceSteps = [
    { title: "Query Analysis and Fact Extraction", detail: "Extract legal domain, user objective, parties, jurisdiction, and procedural stage.", metadata: "Step 1" },
    { title: "Hierarchical Statutory Search", detail: "Querying indexed acts prioritizing Tier 1 Statutes and Tier 2 Regulations.", metadata: "Step 2 & 3" },
    { title: "Conflict Detection and Verification", detail: "Checking cross-statutory limitation periods, deadlines, and authority jurisdiction.", metadata: "Step 3" },
    { title: "10-Step Procedural Dossier Formulation", detail: "Generating step cards, interactive checklist, and source-grounded citations.", metadata: "Step 4 - 10" }
  ];

  const handleExecuteQuery = async (queryText) => {
    const q = queryText || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setActiveStepIndex(0);
    setResponse(null);

    const timer1 = setTimeout(() => setActiveStepIndex(1), 250);
    const timer2 = setTimeout(() => setActiveStepIndex(2), 550);
    const timer3 = setTimeout(() => setActiveStepIndex(3), 850);

    try {
      const result = await ragEngine.processQuery(q, apiKey.trim() || null);
      setResponse(result);
      setActiveStepIndex(4);
    } catch (err) {
      console.error("Agent execution failed", err);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setResponse(null);
    setActiveStepIndex(0);
  };

  return (
    <div className={`h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Left Pane: Query Input, Scenarios, and Manus Agent Trace (approx 42% width) */}
      <div className={`w-full lg:w-[42%] border-b lg:border-b-0 lg:border-r flex flex-col h-full overflow-hidden ${
        isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-white'
      }`}>
        
        {/* Header bar */}
        <div className={`p-4 border-b shrink-0 flex items-center justify-between ${
          isDark ? 'border-slate-850 bg-slate-900/40' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center space-x-2">
            <Scale className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
            <h2 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Procedural Legal Agent</h2>
          </div>

          <MagicButton
            variant="ghost"
            size="sm"
            icon={Key}
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
          >
            {showApiKeyInput ? "Hide API Key" : "API Key (Optional)"}
          </MagicButton>
        </div>

        {/* Scrollable middle area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Optional API Key Input */}
          {showApiKeyInput && (
            <MagicBox 
              enableBorderGlow 
              enableSpotlight 
              enableTilt={false}
              className={`border rounded-md p-3 space-y-1.5 text-xs ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <label className={`block font-medium text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Gemini API Key (Built-in deterministic procedural engine is active by default)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter Gemini API key..."
                className={`w-full border rounded-md px-3 py-1.5 font-mono focus:outline-none text-xs ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </MagicBox>
          )}

          {/* Quick Preset Scenario Chips using MagicButton */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Sample Case Scenarios
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetScenarios.map((sc, idx) => (
                <MagicButton
                  key={idx}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery(sc.query);
                    handleExecuteQuery(sc.query);
                  }}
                  className="text-[11px]"
                >
                  {sc.label}
                </MagicButton>
              ))}
            </div>
          </div>

          {/* Manus Agent Execution Trace */}
          <AgentTrace 
            steps={traceSteps} 
            activeStepIndex={activeStepIndex} 
            isRunning={isLoading} 
          />

          {/* Factual Query Context Card using MagicBox */}
          <MagicBox
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            clickEffect={false}
            className={`border rounded-md p-4 space-y-3 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Factual Legal Query
              </span>
              {query && (
                <MagicButton
                  variant="ghost"
                  size="sm"
                  icon={RotateCcw}
                  onClick={handleReset}
                >
                  Clear
                </MagicButton>
              )}
            </div>

            <textarea
              rows="5"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="State your factual situation: matter type, desired objective, state/jurisdiction, current stage, dates, available documents, and opposite parties..."
              className={`w-full border rounded-md p-3 text-xs leading-relaxed font-sans focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-400'
              }`}
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-slate-400">
                Grounding: Step 9 & 10 Protocol
              </span>

              <MagicButton
                variant="primary"
                size="md"
                onClick={() => handleExecuteQuery()}
                disabled={isLoading || !query.trim()}
                icon={isLoading ? Clock : Search}
                className="font-semibold"
              >
                {isLoading ? "Analyzing Corpus..." : "Run Legal Analysis"}
              </MagicButton>
            </div>
          </MagicBox>

          {/* Procedural Scope Notice using MagicBox */}
          <MagicBox
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            className={`border rounded-md p-3 text-[11px] space-y-1 ${
              isDark ? 'bg-slate-950/80 border-slate-850 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <p className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Statutory Grounding Notice:</p>
            <p>
              Answers are formulated strictly from retrieved primary legal instruments. Where information is absent, the system outputs verification disclaimers without fabricating requirements.
            </p>
          </MagicBox>

        </div>

      </div>

      {/* Right Pane: Live Dossier & Interactive Document Inspector (approx 58% width) */}
      <div className={`flex-1 h-full overflow-hidden p-3 lg:p-4 ${
        isDark ? 'bg-[#090d16]' : 'bg-slate-100'
      }`}>
        <DossierPane 
          responseData={response} 
          isLoading={isLoading} 
          onSelectScenario={(q) => {
            setQuery(q);
            handleExecuteQuery(q);
          }}
        />
      </div>

    </div>
  );
};
