import React, { useState } from 'react';
import { Globe, Check, X, Shield, Server, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export const DomainSettingsModal = ({ isOpen, onClose, currentDomain, onSaveDomain }) => {
  const { isDark } = useTheme();
  const [domainInput, setDomainInput] = useState(currentDomain);
  const [sslStatus, setSslStatus] = useState('Active');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (domainInput.trim()) {
      onSaveDomain(domainInput.trim());
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 900);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className={`border rounded-md w-full max-w-lg shadow-2xl overflow-hidden transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-850' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center space-x-2">
            <Globe className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
            <h2 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Custom Domain Configuration</h2>
          </div>
          <button 
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Production Hostname / Custom Domain
            </label>
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="e.g. legal-rag.internal or counsel.yourfirm.com"
              className={`w-full border rounded-md px-3.5 py-2.5 text-sm font-mono focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-slate-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
              }`}
            />
            <p className={`text-xs mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Specify the fully qualified domain name (FQDN) assigned to this instance.
            </p>
          </div>

          {/* DNS Configuration Reference */}
          <div className={`border rounded-md p-3.5 space-y-2 text-xs font-mono transition-colors ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`flex items-center justify-between pb-2 border-b font-sans font-medium ${
              isDark ? 'text-slate-300 border-slate-850' : 'text-slate-700 border-slate-200'
            }`}>
              <span className="flex items-center space-x-1.5">
                <Server className="w-4 h-4 text-slate-400" />
                <span>DNS Verification Status</span>
              </span>
              <span className="text-emerald-500 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>CNAME Propagated</span>
              </span>
            </div>

            <div className={`grid grid-cols-3 gap-2 pt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <div>
                <span className={`block text-[10px] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Record</span>
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>CNAME</span>
              </div>
              <div>
                <span className={`block text-[10px] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Host</span>
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>@ / legal</span>
              </div>
              <div>
                <span className={`block text-[10px] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Target</span>
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>cname.internal.legal</span>
              </div>
            </div>
          </div>

          {/* SSL Certificate Details */}
          <div className={`flex items-center justify-between p-3 border rounded-md text-xs transition-colors ${
            isDark ? 'bg-slate-850 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <div>
                <span className={`font-medium block ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>TLS 1.3 Encryption</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Automated Let's Encrypt Certificate</span>
              </div>
            </div>
            <span className={`px-2 py-0.5 border rounded-sm font-mono text-[11px] ${
              isDark ? 'bg-emerald-950 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
            }`}>
              {sslStatus}
            </span>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-medium border rounded-md transition-colors ${
                isDark ? 'text-slate-300 bg-slate-800 hover:bg-slate-750 border-slate-700' : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-xs font-medium border rounded-md transition-colors flex items-center space-x-1.5 ${
                isDark ? 'text-white bg-slate-700 hover:bg-slate-600 border-slate-600' : 'text-white bg-slate-900 hover:bg-slate-800 border-slate-900'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Domain Saved</span>
                </>
              ) : (
                <span>Save Domain Settings</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
