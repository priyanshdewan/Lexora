import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export const PrivacyPolicyView = () => {
  const { isDark } = useTheme();

  return (
    <div className={`max-w-4xl mx-auto px-4 py-10 space-y-8 transition-colors ${
      isDark ? 'text-slate-200' : 'text-slate-800'
    }`}>
      
      {/* Header */}
      <div className={`border-b pb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className={`flex items-center space-x-2 text-xs font-mono uppercase tracking-wider mb-2 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
          <span>Governance and Compliance Protocol</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>Privacy Policy</h1>
        <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Effective Date: September 15, 2026. Official Data Protection and Document Retention Notice.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          1. Scope and Procedural Nature of Service
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          This Privacy Policy outlines how Lexora processes queries, handles user-uploaded statutory documents, and safeguards session integrity. This system operates as an informational retrieval tool designed to synthesize statutory provisions and procedural checklists.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          2. Client Case Information and Query Processing
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          The application is engineered with a local-first privacy boundary:
        </p>
        <ul className={`list-disc list-inside text-sm space-y-1.5 pl-2 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <li>Queries submitted through the built-in deterministic engine are processed in client memory and local browser storage.</li>
          <li>No queries, document contents, or identifying case details are logged to third-party tracking or advertising networks.</li>
          <li>If you explicitly configure an external API credential, queries and retrieved document chunks are routed strictly through encrypted HTTPS endpoints according to the respective provider API privacy terms.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          3. Non-Attorney Client Privilege Clarification
        </h2>
        <div className={`p-4 rounded-md border text-sm space-y-2 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-750'
        }`}>
          <p className={`font-semibold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
            Important Notice on Legal Privilege:
          </p>
          <p>
            Communications submitted through this assistant do NOT create an attorney-client relationship and are not protected by attorney-client privilege or work product confidentiality doctrines. Users should redact sensitive personal identifiers (such as national identity numbers or private bank credentials) prior to submitting queries.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          4. Document Uploads and Storage Retention
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Statutory acts, circulars, or forms added to the Knowledge Base are stored locally within your browser sandbox (Web Storage API). You retain complete control to inspect, export, or purge custom uploaded documents at any time via the Knowledge Base management view.
        </p>
      </section>

      {/* Section 5 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          5. Security and Cryptographic Standards
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          All network communications are secured using Transport Layer Security (TLS 1.3). No cookies, cross-site beacons, tracking pixels, or automated session replay recording tools are employed within this application.
        </p>
      </section>

      {/* Section 6 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          6. Contact and Administrative Information
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          For technical questions or audit requests concerning data handling under this deployment, direct inquiries to the designated internal system administrator.
        </p>
      </section>

      {/* Footer stamp */}
      <div className={`pt-6 border-t flex items-center justify-between text-xs ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
      }`}>
        <span>Verified Document Version: PP-2026.09</span>
        <span>Status: Formally Enacted</span>
      </div>

    </div>
  );
};
