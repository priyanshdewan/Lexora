import React from 'react';
import { FileCheck, AlertTriangle, Scale, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export const TermsView = () => {
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
          <FileCheck className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
          <span>Statutory Terms of Use and Legal Disclaimers</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>Terms and Conditions</h1>
        <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Last Revised: September 15, 2026. Binding terms governing procedural guidance and RAG retrieval.
        </p>
      </div>

      {/* Critical Legal Disclaimer Alert */}
      <div className={`border-l-4 border-amber-600 border-t border-r border-b p-4 rounded-r-md space-y-2 ${
        isDark ? 'bg-slate-900 border-slate-850' : 'bg-amber-50/60 border-amber-200/80'
      }`}>
        <div className={`flex items-center space-x-2 font-semibold text-sm ${
          isDark ? 'text-amber-400' : 'text-amber-800'
        }`}>
          <AlertTriangle className="w-4 h-4" />
          <span>Statutory Disclaimer: Informational Guidance Only</span>
        </div>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Lexora is an automated procedural guidance engine powered by Retrieval-Augmented Generation. It does not provide formal legal advice, representation, or advocacy. Use of this application does not create an attorney-client relationship under any jurisdiction.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          1. Acceptance of Terms
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          By accessing or utilizing Lexora, you agree to be bound by these Terms and Conditions. If you do not agree with any provision herein, you must discontinue use of the software immediately.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          2. Nature of Guidance and No Legal Representation
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          The information, workflows, checklists, and document citations provided by this system are compiled for educational and procedural clarification purposes only. You must verify all dates, court fees, jurisdiction boundaries, and filing requirements directly with the competent court registry or statutory authority before initiating any legal action.
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          3. Source-Grounded Answering and RAG Boundaries
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          The assistant bases its outputs strictly on the legal documents currently indexed in its database. When sufficient statutory provisions are not retrieved, the assistant will explicitly state that evidence is missing. The system does not guarantee that indexed documents reflect recent legislative amendments or judicial precedents.
        </p>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          4. Limitation of Liability
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Under no circumstances shall the operators, contributors, or software authors be liable for any direct, indirect, incidental, special, or consequential damages resulting from missed filing deadlines, application rejections, adverse court judgments, or statutory penalties arising from reliance upon guidance generated by this software.
        </p>
      </section>

      {/* Section 5 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          5. Mandatory Verification with Qualified Counsel
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          You are advised to engage a licensed attorney or legal practitioner admitted to practice before the competent bar or court whenever:
        </p>
        <ul className={`list-disc list-inside text-sm space-y-1.5 pl-2 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <li>The matter involves substantial financial stakes or business contracts.</li>
          <li>Criminal liability or penal consequences are asserted.</li>
          <li>You have received a formal court summons, warrant, or statutory notice.</li>
          <li>Contradictory state and central regulations apply to your dispute.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section className="space-y-3">
        <h2 className={`text-lg font-semibold border-l-2 pl-3 ${
          isDark ? 'text-white border-slate-600' : 'text-slate-900 border-slate-400'
        }`}>
          6. Amendments and Governing Principles
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          These Terms may be revised periodically to incorporate updated statutory rules or regulatory instructions. Continuous use of this application constitutes acceptance of modified terms.
        </p>
      </section>

      {/* Footer stamp */}
      <div className={`pt-6 border-t flex items-center justify-between text-xs ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
      }`}>
        <span>Verified Document Version: TC-2026.09</span>
        <span>Status: Legally Binding</span>
      </div>

    </div>
  );
};
