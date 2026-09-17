import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  BookOpen, 
  Copy, 
  Check, 
  FileCheck2,
  HelpCircle, 
  ShieldAlert
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicBox, MagicButton } from './magic/index.js';

export const ResponseRenderer = ({ responseData }) => {
  const { isDark } = useTheme();
  const [checkedDocs, setCheckedDocs] = useState({});
  const [copied, setCopied] = useState(false);

  if (!responseData) return null;

  const toggleDoc = (index) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isFallback = responseData.isInsufficient;

  const handleCopy = () => {
    let fullText = `LEXORA: PROCEDURAL LEGAL GUIDANCE REPORT\n\n`;
    fullText += `1. UNDERSTANDING YOUR SITUATION:\n${responseData.understanding}\n\n`;
    fullText += `2. APPLICABLE LEGAL PROCESS:\n${responseData.applicableProcess}\n\n`;
    fullText += `3. STEP-BY-STEP PROCEDURE:\n`;
    responseData.procedureSteps?.forEach(step => {
      fullText += `Step ${step.stepNumber}: ${step.action}\n`;
      fullText += `What you need to do: ${step.whatYouNeedToDo}\n`;
      fullText += `Why it is required: ${step.whyRequired}\n`;
      fullText += `Documents required: ${step.documentsRequired}\n`;
      fullText += `Where to submit: ${step.whereToSubmit}\n`;
      fullText += `Fees: ${step.fees}\n`;
      fullText += `Expected next step: ${step.expectedNextStep}\n`;
      fullText += `Deadline: ${step.deadline}\n`;
      fullText += `Source: ${step.source}\n\n`;
    });
    fullText += `4. REQUIRED DOCUMENTS:\n`;
    responseData.documentChecklist?.forEach(doc => {
      fullText += `[ ] ${doc.name} (${doc.requiredType}) - Why: ${doc.why} - Submit to: ${doc.submitTo}\n`;
    });
    fullText += `\n5. AUTHORITIES / OFFICES / PORTALS:\n${responseData.authoritiesPortals}\n\n`;
    fullText += `6. FEES AND DEADLINES:\n${responseData.feesAndDeadlines}\n\n`;
    fullText += `7. WHAT YOU SHOULD DO NOW:\n`;
    fullText += `Today:\n` + responseData.actionPlan?.today?.map(t => `- ${t}`).join('\n') + `\n`;
    fullText += `After submission:\n` + responseData.actionPlan?.afterSubmission?.map(t => `- ${t}`).join('\n') + `\n`;
    fullText += `Before deadline:\n` + responseData.actionPlan?.beforeDeadline?.map(t => `- ${t}`).join('\n') + `\n\n`;
    fullText += `8. MISSING INFORMATION:\n` + responseData.missingInfo?.map(m => `- ${m.item}: ${m.whyItMatters}`).join('\n') + `\n\n`;
    fullText += `9. RISKS / IMPORTANT CONSIDERATIONS:\n` + responseData.risks?.map(r => `- ${r}`).join('\n') + `\n\n`;
    fullText += `10. SOURCES:\n` + responseData.sources?.map(s => `- ${s.documentTitle}, ${s.sectionNumber}, Page ${s.pageNumber}`).join('\n');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-6 animate-none ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>

      {/* Top Action Bar */}
      <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <FileCheck2 className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
          <span>Procedural Dossier: 10-Section Legal Specification</span>
        </div>
        <MagicButton
          variant="secondary"
          size="sm"
          icon={copied ? Check : Copy}
          onClick={handleCopy}
        >
          {copied ? "Dossier Copied" : "Copy Full Report"}
        </MagicButton>
      </div>

      {/* Conflict Detection Banner */}
      {responseData.conflicts && responseData.conflicts.length > 0 && (
        <div className={`border rounded-md p-4 space-y-2 ${
          isDark ? 'bg-amber-950/40 border-amber-800/80 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Statutory Conflict Identified across Retrieved Sources</span>
          </div>
          {responseData.conflicts.map((conf, idx) => (
            <div key={idx} className="text-xs space-y-1 pl-6">
              <p><strong>Conflict:</strong> {conf.issue}</p>
              <p><strong>Compared Sources:</strong> {conf.sourceA} vs {conf.sourceB}</p>
              <p><strong>Procedural Guidance:</strong> {conf.recommendation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Fallback Notice */}
      {isFallback && (
        <div className={`border rounded-md p-5 text-center space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
        }`}>
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            "I could not find sufficient information in the provided legal documents to verify this requirement."
          </p>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            The Lexora legal engine enforces strict hallucination prevention. You may add the applicable statutory act, rule, or circular via the Knowledge Base tab to generate grounded guidance.
          </p>
        </div>
      )}

      {/* Raw LLM text */}
      {responseData.rawText && !isFallback && (
        <div className={`border rounded-md p-5 text-sm whitespace-pre-wrap font-sans leading-relaxed ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          {responseData.rawText}
        </div>
      )}

      {/* Section 1: Understanding Your Situation */}
      {responseData.understanding && (
        <section className={`border rounded-md p-5 space-y-2.5 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>1</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Understanding Your Situation</h3>
          </div>
          <p className={`text-sm pl-8 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {responseData.understanding}
          </p>
        </section>
      )}

      {/* Section 2: Applicable Legal Process */}
      {responseData.applicableProcess && (
        <section className={`border rounded-md p-5 space-y-2.5 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>2</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Applicable Legal Process</h3>
          </div>
          <div className="pl-8">
            <div className={`inline-block border font-medium px-3 py-1.5 rounded-md text-sm ${
              isDark ? 'bg-slate-850 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'
            }`}>
              {responseData.applicableProcess}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Step-by-Step Procedure */}
      {responseData.procedureSteps && responseData.procedureSteps.length > 0 && (
        <section className={`border rounded-md p-5 space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>3</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Step-by-Step Procedure</h3>
          </div>

          <div className="space-y-4 pl-0 sm:pl-8">
            {responseData.procedureSteps.map((step, idx) => (
              <MagicBox
                key={idx}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={false}
                className={`border rounded-md p-4 space-y-3 ${
                  isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`flex items-start justify-between border-b pb-2.5 ${
                  isDark ? 'border-slate-850' : 'border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 border text-[11px] font-mono rounded-sm ${
                      isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-800'
                    }`}>
                      Step {step.stepNumber}
                    </span>
                    <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.action}</h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium block">What you need to do:</span>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{step.whatYouNeedToDo}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium block">Why it is required:</span>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{step.whyRequired}</p>
                  </div>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t text-xs ${
                  isDark ? 'border-slate-850' : 'border-slate-200'
                }`}>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Where to submit:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{step.whereToSubmit}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Statutory Fee:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{step.fees}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Prescribed Deadline:</span>
                    <span className="text-amber-500 font-medium">{step.deadline}</span>
                  </div>
                </div>

                <div className={`flex flex-wrap items-center justify-between text-[11px] pt-2 p-2 rounded-sm border ${
                  isDark ? 'bg-slate-900/50 border-slate-850 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  <span><strong>Expected next step:</strong> {step.expectedNextStep}</span>
                  <span className="font-mono text-slate-400">Source: {step.source}</span>
                </div>
              </MagicBox>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: Required Documents */}
      {responseData.documentChecklist && responseData.documentChecklist.length > 0 && (
        <section className={`border rounded-md p-5 space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-semibold text-sm">
              <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}>4</span>
              <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Required Documents Checklist</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {Object.values(checkedDocs).filter(Boolean).length} of {responseData.documentChecklist.length} Prepared
            </span>
          </div>

          <div className="space-y-2.5 pl-0 sm:pl-8">
            {responseData.documentChecklist.map((doc, idx) => {
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
                      ? (isDark ? 'bg-slate-950/80 border-emerald-900/70 text-slate-300' : 'bg-emerald-50/50 border-emerald-300 text-slate-600')
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
                        isDark ? 'bg-slate-850 border-slate-700 text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-700'
                      }`}>
                        {doc.requiredType}
                      </span>
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <strong>Purpose:</strong> {doc.why}
                    </p>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <strong>Filing Destination:</strong> {doc.submitTo}
                    </p>
                  </div>
                </MagicBox>
              );
            })}
          </div>
        </section>
      )}

      {/* Section 5: Authorities / Offices / Portals */}
      {responseData.authoritiesPortals && (
        <section className={`border rounded-md p-5 space-y-2 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>5</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Authorities, Offices, and Portals</h3>
          </div>
          <p className={`text-sm pl-8 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {responseData.authoritiesPortals}
          </p>
        </section>
      )}

      {/* Section 6: Fees and Deadlines */}
      {responseData.feesAndDeadlines && (
        <section className={`border rounded-md p-5 space-y-2 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>6</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Fees and Deadlines</h3>
          </div>
          <div className={`pl-8 p-3 rounded-md text-xs border ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            {responseData.feesAndDeadlines}
          </div>
        </section>
      )}

      {/* Section 7: What You Should Do Now */}
      {responseData.actionPlan && (
        <section className={`border rounded-md p-5 space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>7</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>What You Should Do Now (Action Plan)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-0 sm:pl-8 text-xs">
            <MagicBox
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false}
              className={`border rounded-md p-3.5 space-y-2 ${
                isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className={`font-semibold uppercase tracking-wider text-[11px] block border-b pb-1 ${
                isDark ? 'text-slate-200 border-slate-800' : 'text-slate-800 border-slate-200'
              }`}>Today</span>
              <ul className={`space-y-1.5 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {responseData.actionPlan.today?.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
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
              <span className={`font-semibold uppercase tracking-wider text-[11px] block border-b pb-1 ${
                isDark ? 'text-slate-200 border-slate-800' : 'text-slate-800 border-slate-200'
              }`}>After Submission</span>
              <ul className={`space-y-1.5 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {responseData.actionPlan.afterSubmission?.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
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
              <span className={`font-semibold uppercase tracking-wider text-[11px] block border-b pb-1 ${
                isDark ? 'text-slate-200 border-slate-800' : 'text-slate-800 border-slate-200'
              }`}>Before Deadline</span>
              <ul className={`space-y-1.5 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {responseData.actionPlan.beforeDeadline?.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </MagicBox>
          </div>
        </section>
      )}

      {/* Section 8: Missing Information */}
      {responseData.missingInfo && responseData.missingInfo.length > 0 && (
        <section className={`border rounded-md p-5 space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>8</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Missing Information</h3>
          </div>
          <div className="space-y-2 pl-0 sm:pl-8">
            {responseData.missingInfo.map((item, idx) => (
              <div key={idx} className={`border p-3 rounded-md text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`font-semibold block mb-0.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.item}</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Why it matters: {item.whyItMatters}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 9: Risks / Important Considerations */}
      {responseData.risks && responseData.risks.length > 0 && (
        <section className={`border rounded-md p-5 space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>9</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Risks and Important Considerations</h3>
          </div>
          <div className="pl-0 sm:pl-8 space-y-2">
            {responseData.risks.map((risk, idx) => (
              <div key={idx} className={`flex items-start space-x-2 text-xs p-3 rounded-md border ${
                isDark ? 'text-amber-200 bg-amber-950/20 border-amber-900/40' : 'text-amber-900 bg-amber-50 border-amber-200'
              }`}>
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{risk}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 10: Sources */}
      {responseData.sources && responseData.sources.length > 0 && (
        <section className={`border rounded-md p-5 space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <span className={`w-6 h-6 text-xs flex items-center justify-center rounded-md font-mono border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>10</span>
            <h3 className={isDark ? 'text-slate-200' : 'text-slate-900'}>Retrieved Statutory Sources and Authority Hierarchy</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-8">
            {responseData.sources.map((src, idx) => (
              <MagicBox
                key={idx}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                className={`border rounded-md p-3.5 space-y-2 text-xs ${
                  isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold line-clamp-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{src.documentTitle}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 border rounded-sm ${
                    isDark ? 'bg-slate-850 border-slate-700 text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-700'
                  }`}>
                    Tier {src.tier}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <p><strong>Section:</strong> {src.sectionNumber} {src.clause ? `(${src.clause})` : ''}</p>
                  <p><strong>Page:</strong> {src.pageNumber} | <strong>Authority:</strong> {src.authority}</p>
                </div>
                <p className={`text-[11px] italic line-clamp-2 p-1.5 rounded-sm border ${
                  isDark ? 'bg-slate-900 border-slate-850 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  "{src.content}"
                </p>
              </MagicBox>
            ))}
          </div>
        </section>
      )}

      {/* Legal Advice Safety Breakdown */}
      {responseData.safetyClassification && (
        <div className={`border rounded-md p-4 space-y-3 text-xs ${
          isDark ? 'border-slate-800 bg-slate-850' : 'border-slate-200 bg-slate-100/70'
        }`}>
          <div className="flex items-center space-x-2 font-semibold uppercase tracking-wider text-[11px] text-slate-400">
            <ShieldAlert className="w-4 h-4 text-slate-400" />
            <span>Legal Advice Safety Classification</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`border p-2.5 rounded-md ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className={`font-medium block mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Document-Based Information:</span>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{responseData.safetyClassification.documentBased}</p>
            </div>
            <div className={`border p-2.5 rounded-md ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className={`font-medium block mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>General Guidance:</span>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{responseData.safetyClassification.generalGuidance}</p>
            </div>
            <div className={`border p-2.5 rounded-md ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className={`font-medium block mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Professional Legal Advice:</span>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{responseData.safetyClassification.professionalLegalAdvice}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
