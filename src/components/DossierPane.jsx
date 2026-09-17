import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  BookOpen, 
  Copy, 
  Check, 
  FileText,
  Clock,
  Download,
  LayoutGrid,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ResponseRenderer } from './ResponseRenderer.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicBox, MagicButton, MagicBento } from './magic/index.js';

export const DossierPane = ({ responseData, isLoading, onSelectScenario }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('dossier');
  const [checkedDocs, setCheckedDocs] = useState({});
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <MagicBox
        enableSpotlight={true}
        enableBorderGlow={true}
        className={`h-full flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-md border ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <Clock className="w-8 h-8 text-slate-400 animate-spin" />
        <div className="space-y-1">
          <p className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Synthesizing Procedural Dossier</p>
          <p className="text-xs text-slate-400 font-mono">
            Scanning 6 statutory acts | Ranking priority hierarchy | Formulating 10-section protocol
          </p>
        </div>
      </MagicBox>
    );
  }

  if (!responseData) {
    return (
      <div className="h-full flex flex-col space-y-4 overflow-y-auto">
        <MagicBox
          enableSpotlight={true}
          enableBorderGlow={true}
          className={`p-6 text-center space-y-3 rounded-md border text-slate-400 shrink-0 ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex justify-center">
            <div className={`w-12 h-12 rounded-md border flex items-center justify-center ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Procedural Dossier & Interactive Bento Architecture
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit a factual situation on the left, click any sample scenario, or explore the full interactive Legal Intelligence Bento Grid below.
            </p>
          </div>
        </MagicBox>

        {/* Embedded Interactive Bento Grid in the empty state */}
        <div className="flex-1">
          <div className="flex items-center justify-between pb-2 px-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Interactive Architecture Bento Grid</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Hover for 3D Tilt, Magnetism & Particles</span>
          </div>
          <MagicBento 
            enableStars={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            onSelectFeature={(id) => {
              if (id === 'statutory-search' && onSelectScenario) {
                onSelectScenario("What is the limitation period and procedure for filing a consumer complaint under Section 35 of the Consumer Protection Act 2019?");
              } else if (id === 'conflict-engine' && onSelectScenario) {
                onSelectScenario("Received a bounced cheque of 4,50,000 INR. What is the statutory notice period and jurisdiction under Section 138 of Negotiable Instruments Act?");
              }
            }}
          />
        </div>
      </div>
    );
  }

  const toggleDoc = (idx) => {
    setCheckedDocs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const checklistCount = responseData.documentChecklist ? responseData.documentChecklist.length : 0;
  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;

  const handleCopyMemo = () => {
    let text = `PROCEDURAL LEGAL MEMORANDUM\n`;
    text += `================================================\n\n`;
    text += `1. SITUATION ANALYSIS:\n${responseData.understanding}\n\n`;
    text += `2. APPLICABLE LEGAL PROCESS:\n${responseData.applicableProcess}\n\n`;
    text += `3. CHRONOLOGICAL PROCEDURE:\n`;
    responseData.procedureSteps?.forEach(s => {
      text += `[Step ${s.stepNumber}] ${s.action}\n- Action: ${s.whatYouNeedToDo}\n- Purpose: ${s.whyRequired}\n- Where to submit: ${s.whereToSubmit}\n- Fee: ${s.fees}\n- Deadline: ${s.deadline}\n- Source: ${s.source}\n\n`;
    });
    text += `4. DOCUMENT CHECKLIST:\n`;
    responseData.documentChecklist?.forEach(d => {
      text += `[ ] ${d.name} (${d.requiredType}) - Purpose: ${d.why} - Submit to: ${d.submitTo}\n`;
    });
    text += `\n5. AUTHORITIES & PORTALS:\n${responseData.authoritiesPortals}\n\n`;
    text += `6. FEES & STATUTORY LIMITATIONS:\n${responseData.feesAndDeadlines}\n\n`;
    text += `7. ACTION PLAN:\n`;
    text += `Today:\n` + responseData.actionPlan?.today?.map(t => `- ${t}`).join('\n') + `\n`;
    text += `After submission:\n` + responseData.actionPlan?.afterSubmission?.map(t => `- ${t}`).join('\n') + `\n`;
    text += `Before deadline:\n` + responseData.actionPlan?.beforeDeadline?.map(t => `- ${t}`).join('\n') + `\n\n`;
    text += `8. MISSING FACTUAL INFORMATION:\n` + responseData.missingInfo?.map(m => `- ${m.item} (Reason: ${m.whyItMatters})`).join('\n') + `\n\n`;
    text += `9. RISKS & STATUTORY WARNINGS:\n` + responseData.risks?.map(r => `- ${r}`).join('\n') + `\n\n`;
    text += `10. CITATIONS & AUTHORITIES:\n` + responseData.sources?.map(s => `- ${s.documentTitle}, ${s.sectionNumber} (Page ${s.pageNumber})`).join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`border rounded-md flex flex-col h-full overflow-hidden ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      
      {/* Dossier Header with Tabs */}
      <div className={`border-b px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0 ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center gap-1">
          <MagicButton
            variant={activeTab === 'dossier' ? 'primary' : 'ghost'}
            size="sm"
            icon={FileText}
            onClick={() => setActiveTab('dossier')}
          >
            10-Step Dossier
          </MagicButton>

          <MagicButton
            variant={activeTab === 'checklist' ? 'primary' : 'ghost'}
            size="sm"
            icon={CheckSquare}
            onClick={() => setActiveTab('checklist')}
          >
            <span>Checklist & Plan</span>
            {checklistCount > 0 && (
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-sm ml-1 ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {checkedCount}/{checklistCount}
              </span>
            )}
          </MagicButton>

          <MagicButton
            variant={activeTab === 'statutes' ? 'primary' : 'ghost'}
            size="sm"
            icon={BookOpen}
            onClick={() => setActiveTab('statutes')}
          >
            <span>Statute Sources</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-sm ml-1 ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
            }`}>
              {responseData.sources ? responseData.sources.length : 0}
            </span>
          </MagicButton>

          <MagicButton
            variant={activeTab === 'bento' ? 'primary' : 'ghost'}
            size="sm"
            icon={LayoutGrid}
            onClick={() => setActiveTab('bento')}
          >
            Architecture (Bento)
          </MagicButton>

          <MagicButton
            variant={activeTab === 'export' ? 'primary' : 'ghost'}
            size="sm"
            icon={Download}
            onClick={() => setActiveTab('export')}
          >
            Plain Memo
          </MagicButton>
        </div>

        <MagicButton
          variant="secondary"
          size="sm"
          icon={copied ? Check : Copy}
          onClick={handleCopyMemo}
        >
          {copied ? "Copied" : "Copy Report"}
        </MagicButton>
      </div>

      {/* Dossier Body Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'dossier' && (
          <ResponseRenderer responseData={responseData} />
        )}

        {activeTab === 'bento' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-850/40">
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Legal Process Intelligence Architecture (Bento Grid)
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive multi-tier statutory processing with GSAP 3D perspective tilt, magnetic pull, and reactive border glow.
                </p>
              </div>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded-sm">
                Active Engine
              </span>
            </div>
            <MagicBento 
              enableStars={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
            />
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-6">
            
            {/* Checklist Progress */}
            <MagicBox
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false}
              className={`border rounded-md p-4 space-y-3 ${
                isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Document Readiness Score</span>
                <span className="font-mono text-emerald-500 font-bold">
                  {checklistCount > 0 ? Math.round((checkedCount / checklistCount) * 100) : 0}% Complete
                </span>
              </div>
              <div className={`w-full h-2 rounded-sm overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${checklistCount > 0 ? (checkedCount / checklistCount) * 100 : 0}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Check off documents as they are collated, certified, or notarized.
              </p>
            </MagicBox>

            {/* Document Cards */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Required Statutory Documents
              </h4>
              {responseData.documentChecklist?.map((doc, idx) => {
                const isChecked = !!checkedDocs[idx];
                return (
                  <MagicBox
                    key={idx}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    clickEffect={true}
                    onClick={() => toggleDoc(idx)}
                    className={`cursor-pointer border rounded-md p-3.5 transition-colors flex items-start space-x-3 ${
                      isChecked
                        ? (isDark ? 'bg-slate-950/90 border-emerald-900/80 text-slate-300' : 'bg-emerald-50/50 border-emerald-300 text-slate-600')
                        : (isDark ? 'bg-slate-950/90 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs')
                    }`}
                  >
                    <button type="button" className="mt-0.5 text-slate-400">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <div className="flex-1 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${isChecked ? 'line-through text-slate-400' : (isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold')}`}>
                          {doc.name}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-sm ${
                          isDark ? 'bg-slate-850 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}>
                          {doc.requiredType}
                        </span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <strong>Purpose:</strong> {doc.why}
                      </p>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <strong>Submit To:</strong> {doc.submitTo}
                      </p>
                    </div>
                  </MagicBox>
                );
              })}
            </div>

            {/* Action Plan */}
            <div className={`space-y-3 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Chronological Execution Plan
              </h4>

              <div className="space-y-3 text-xs">
                <MagicBox
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={false}
                  className={`border rounded-md p-3.5 space-y-2 ${
                    isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`font-semibold text-[11px] block border-b pb-1 ${
                    isDark ? 'text-slate-200 border-slate-850' : 'text-slate-800 border-slate-200'
                  }`}>
                    Today
                  </span>
                  <ul className={`space-y-1 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {responseData.actionPlan?.today?.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </MagicBox>

                <MagicBox
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={false}
                  className={`border rounded-md p-3.5 space-y-2 ${
                    isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`font-semibold text-[11px] block border-b pb-1 ${
                    isDark ? 'text-slate-200 border-slate-850' : 'text-slate-800 border-slate-200'
                  }`}>
                    After Submission
                  </span>
                  <ul className={`space-y-1 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {responseData.actionPlan?.afterSubmission?.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </MagicBox>

                <MagicBox
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={false}
                  className={`border rounded-md p-3.5 space-y-2 ${
                    isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`font-semibold text-[11px] block border-b pb-1 ${
                    isDark ? 'text-slate-200 border-slate-850' : 'text-slate-800 border-slate-200'
                  }`}>
                    Before Deadline
                  </span>
                  <ul className={`space-y-1 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {responseData.actionPlan?.beforeDeadline?.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </MagicBox>
              </div>

            </div>

          </div>
        )}

        {activeTab === 'statutes' && (
          <div className="space-y-4">
            <div className={`border rounded-md p-3.5 text-xs text-slate-400 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              Retrieved statutory chunks prioritizing: Tier 1 Statutes &gt; Tier 2 Rules &gt; Tier 3 Notifications &gt; Tier 4 Guidelines.
            </div>

            <div className="space-y-3">
              {responseData.sources?.map((src, idx) => (
                <MagicBox
                  key={idx}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  className={`border rounded-md p-4 space-y-3 text-xs ${
                    isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className={`flex items-center justify-between border-b pb-2 ${
                    isDark ? 'border-slate-850' : 'border-slate-100'
                  }`}>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{src.documentTitle}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-sm ${
                      isDark ? 'bg-slate-850 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      Tier {src.tier} Priority
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
                    <div><strong>Section:</strong> {src.sectionNumber}</div>
                    <div><strong>Clause:</strong> {src.clause || 'General'}</div>
                    <div><strong>Page:</strong> {src.pageNumber}</div>
                    <div><strong>Authority:</strong> {src.authority}</div>
                  </div>

                  <div className={`border p-3 rounded-md leading-relaxed font-sans ${
                    isDark ? 'bg-slate-900 border-slate-850 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    "{src.content}"
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span><strong>Fee:</strong> {src.fees}</span>
                    <span className="text-amber-500 font-medium"><strong>Deadline:</strong> {src.deadlines}</span>
                  </div>
                </MagicBox>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Formatted Plain Text Memorandum</span>
              <button
                onClick={handleCopyMemo}
                className={`px-2.5 py-1 border rounded-md text-xs font-mono ${
                  isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                }`}
              >
                {copied ? "Copied" : "Copy to Clipboard"}
              </button>
            </div>
            <textarea
              readOnly
              rows="20"
              className={`w-full border rounded-md p-4 text-xs font-mono leading-relaxed focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
              value={`PROCEDURAL LEGAL MEMORANDUM\n\n1. SITUATION ANALYSIS:\n${responseData.understanding}\n\n2. APPLICABLE LEGAL PROCESS:\n${responseData.applicableProcess}\n\n3. CHRONOLOGICAL PROCEDURE:\n` + 
                responseData.procedureSteps?.map(s => `[Step ${s.stepNumber}] ${s.action}\n- Action: ${s.whatYouNeedToDo}\n- Purpose: ${s.whyRequired}\n- Where to submit: ${s.whereToSubmit}\n- Fee: ${s.fees}\n- Deadline: ${s.deadline}\n- Source: ${s.source}\n`).join('\n') +
                `\n4. REQUIRED DOCUMENTS:\n` +
                responseData.documentChecklist?.map(d => `[ ] ${d.name} (${d.requiredType}) - Purpose: ${d.why}`).join('\n') +
                `\n\n5. AUTHORITIES & PORTALS:\n${responseData.authoritiesPortals}\n\n6. FEES & DEADLINES:\n${responseData.feesAndDeadlines}\n\n7. ACTION PLAN:\nToday:\n` +
                responseData.actionPlan?.today?.map(t => `- ${t}`).join('\n') +
                `\n\n8. MISSING INFORMATION:\n` +
                responseData.missingInfo?.map(m => `- ${m.item}: ${m.whyItMatters}`).join('\n') +
                `\n\n9. RISKS & WARNINGS:\n` +
                responseData.risks?.map(r => `- ${r}`).join('\n') +
                `\n\n10. SOURCES:\n` +
                responseData.sources?.map(s => `- ${s.documentTitle}, ${s.sectionNumber} (Page ${s.pageNumber})`).join('\n')
              }
            />
          </div>
        )}
      </div>

    </div>
  );
};
