import React from 'react';
import { CheckCircle2, Clock, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicBox } from './magic/index.js';

export const AgentTrace = ({ steps, activeStepIndex, isRunning }) => {
  const { isDark } = useTheme();

  return (
    <MagicBox
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={false}
      clickEffect={false}
      className={`border rounded-md p-4 space-y-3 ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className={`flex items-center justify-between border-b pb-2 ${
        isDark ? 'border-slate-850' : 'border-slate-200'
      }`}>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
          <span>Agent Execution Trace (Manus Protocol)</span>
        </div>
        {isRunning ? (
          <span className="flex items-center space-x-1 text-[11px] font-mono text-amber-500">
            <Clock className="w-3 h-3 animate-spin" />
            <span>Executing...</span>
          </span>
        ) : (
          <span className="text-[11px] font-mono text-emerald-500 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Analysis Verified</span>
          </span>
        )}
      </div>

      <div className="space-y-2 text-xs">
        {steps.map((step, idx) => {
          const isDone = idx < activeStepIndex || !isRunning;
          const isCurrent = idx === activeStepIndex && isRunning;

          return (
            <div 
              key={idx} 
              className={`flex items-start space-x-2.5 p-2 rounded-md transition-colors ${
                isCurrent 
                  ? (isDark ? 'bg-slate-900 border border-slate-700 text-white' : 'bg-white border border-slate-300 text-slate-900 shadow-xs')
                  : isDone 
                  ? (isDark ? 'text-slate-300' : 'text-slate-700')
                  : 'text-slate-400'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                ) : (
                  <div className={`w-3.5 h-3.5 rounded-full border ${isDark ? 'border-slate-700' : 'border-slate-300'}`} />
                )}
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[11px]">{step.title}</span>
                  {step.metadata && (
                    <span className="text-[10px] font-mono text-slate-400">{step.metadata}</span>
                  )}
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </MagicBox>
  );
};
