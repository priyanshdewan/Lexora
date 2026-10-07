import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Edit3, 
  Eye, 
  Scale, 
  Building, 
  Calendar, 
  User, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { MagicButton } from './magic/index.js';

/**
 * LegalNoticeDrafter Component
 * Generates an authentic, court-ready pre-litigation legal notice or complaint petition
 * based on synthesized RAG dossier data and statutory Indian law provisions.
 * Supports live customizable party details, A4 legal bond preview, and 1-click PDF print/export.
 */
export const LegalNoticeDrafter = ({ responseData }) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Auto-detect notice type from retrieved statutory sources
  const detectedType = useMemo(() => {
    if (!responseData || !responseData.sources || responseData.sources.length === 0) {
      return 'general';
    }
    const docId = responseData.sources[0]?.documentId || '';
    if (docId.includes('ni-act')) return 'ni138';
    if (docId.includes('cpa')) return 'consumer';
    if (docId.includes('tpa')) return 'tenancy';
    if (docId.includes('tm')) return 'trademark';
    return 'general';
  }, [responseData]);

  const [noticeType, setNoticeType] = useState(detectedType);

  // Form details state with intelligent defaults based on query
  const [senderName, setSenderName] = useState('Rajesh Sharma');
  const [senderAddress, setSenderAddress] = useState('Flat 402, Green Valley Enclave, Sector 62, Noida, Uttar Pradesh 201309');
  const [recipientName, setRecipientName] = useState('M/s Apex Commercial Enterprises Pvt. Ltd.');
  const [recipientAddress, setRecipientAddress] = useState('Corporate Towers, 5th Floor, Bandra-Kurla Complex, Mumbai, Maharashtra 400051');
  const [disputedAmount, setDisputedAmount] = useState('INR 85,000');
  const [advocateName, setAdvocateName] = useState('Adv. Priya K. Dewan');
  const [advocateBarCouncil, setAdvocateBarCouncil] = useState('Bar Council of Delhi (Enrollment No. D/1482/2019)');
  const [advocateChamber, setAdvocateChamber] = useState('Chamber No. 418, Lawyers Block, High Court of Delhi, New Delhi 110003');
  const [noticeDate, setNoticeDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [referenceNo, setReferenceNo] = useState(() => `LEX/NOT/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`);

  // Document metadata based on selected notice template
  const templateConfig = useMemo(() => {
    switch (noticeType) {
      case 'ni138':
        return {
          title: 'STATUTORY DEMAND NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881',
          dispatchMode: 'REGISTERED POST WITH ACKNOWLEDGMENT DUE (RPAD) & SPEED POST',
          statuteCite: 'Section 138 read with Section 142 of the Negotiable Instruments Act, 1881 (as amended)',
          complianceWindow: '15 (Fifteen) Days from the date of receipt of this notice',
          causeDescription: 'Dishonour of Cheque upon presentment with banker return memo marked "Funds Insufficient"',
          legalConsequence: 'Institution of Criminal Prosecution under Section 138 carrying imprisonment up to 2 years and fine up to twice the cheque amount'
        };
      case 'consumer':
        return {
          title: 'FORMAL LEGAL NOTICE FOR DEFICIENCY IN SERVICE AND PRODUCT DEFECT UNDER CONSUMER PROTECTION ACT, 2019',
          dispatchMode: 'REGISTERED POST WITH A.D. & SPEED POST / REGISTERED EMAIL',
          statuteCite: 'Section 35 read with Section 38 & Section 69 of the Consumer Protection Act, 2019',
          complianceWindow: '15 (Fifteen) Days from the date of receipt of this notice',
          causeDescription: 'Supplying defective industrial goods / deficiency in service and subsequent failure to rectify under statutory warranty',
          legalConsequence: 'Filing of formal consumer complaint before the competent District Consumer Disputes Redressal Commission claiming replacement, full refund, damages, and punitive costs'
        };
      case 'tenancy':
        return {
          title: 'NOTICE TO QUIT AND VACATE PREMISES UNDER SECTION 106 OF THE TRANSFER OF PROPERTY ACT, 1882',
          dispatchMode: 'REGISTERED POST WITH A.D. & SPEED POST & AFFIXATION',
          statuteCite: 'Section 106 read with Section 108(q) & Section 111 of the Transfer of Property Act, 1882',
          complianceWindow: '15 (Fifteen) Days expiring with the end of the tenancy month',
          causeDescription: 'Determination of tenancy due to non-payment of rent arrears and expiry of permissible occupation',
          legalConsequence: 'Institution of Civil Suit for Eviction, recovery of physical possession, mesne profits, and damages before the competent Civil Court'
        };
      case 'trademark':
        return {
          title: 'CEASE AND DESIST LEGAL NOTICE UNDER TRADE MARKS ACT, 1999',
          dispatchMode: 'REGISTERED POST WITH A.D. & SPEED POST',
          statuteCite: 'Section 21 read with Section 29 & Section 135 of the Trade Marks Act, 1999',
          complianceWindow: '7 (Seven) Days from the date of receipt of this notice',
          causeDescription: 'Unauthorised adoption, phonetic infringement, and passing off of identical deceptive trademark',
          legalConsequence: 'Filing of Notice of Opposition (Form TM-O) before the Trade Marks Registry and Commercial Court Injunction Suit'
        };
      default:
        return {
          title: 'FORMAL STATUTORY LEGAL NOTICE OF DEMAND',
          dispatchMode: 'REGISTERED POST WITH ACKNOWLEDGMENT DUE & SPEED POST',
          statuteCite: responseData?.sources?.[0]?.documentTitle || 'Applicable Statutory Provisions',
          complianceWindow: '15 (Fifteen) Days from receipt of this notice',
          causeDescription: 'Failure of contractual and statutory obligations causing civil injury and pecuniary loss',
          legalConsequence: 'Institution of competent statutory and civil court proceedings at your sole risk and costs'
        };
    }
  }, [noticeType, responseData]);

  // Generate plain text version for copying
  const formattedNoticeText = useMemo(() => {
    const documentsList = responseData?.documentChecklist?.map((d, i) => `    ${String.fromCharCode(65 + i)}. ${d.name} (${d.requiredType})`).join('\n') || '    A. Relevant transactional receipts and statutory correspondences.';

    return `================================================================================
${templateConfig.title}
================================================================================
DISPATCHED VIA: ${templateConfig.dispatchMode}
REFERENCE NO: ${referenceNo}
DATED: ${noticeDate}

FROM:
${advocateName}, Advocate
${advocateBarCouncil}
Chamber Address: ${advocateChamber}

UNDER INSTRUCTIONS FROM AND ON BEHALF OF MY CLIENT:
${senderName}
Residing/Situated at: ${senderAddress}
(Hereinafter referred to as "My Client")

TO:
${recipientName}
Principal / Registered Office at: ${recipientAddress}
(Hereinafter referred to as "You / The Addressee")

SUBJECT: FORMAL STATUTORY DEMAND NOTICE UNDER ${templateConfig.statuteCite.toUpperCase()}

SIR / MADAM,

Under instructions from and on behalf of my client named above, I do hereby serve upon you the following Statutory Legal Notice:

1. That my Client is a law-abiding citizen / registered entity who entered into transactions in good faith, having fulfilled all reciprocal obligations without default.

2. That on relevant dates, you the Addressee entered into obligations involving the principal sum/consideration of ${disputedAmount}.

3. That despite receipt of due consideration and reminders, you have defaulted and committed statutory breaches, specifically: ${templateConfig.causeDescription}.

4. That by reason of your aforementioned wrongful defaults, my client has been subjected to severe pecuniary loss, mental agony, and disruption of lawful business.

5. That in accordance with ${templateConfig.statuteCite}, you are legally mandated to cure the default, discharge the statutory obligation, and pay the disputed sum of ${disputedAmount} together with interest and notice expenses.

NOW THEREFORE, I, on behalf of my Client, hereby call upon you to comply with the following demands within ${templateConfig.complianceWindow}:
    a) Pay the principal disputed sum of ${disputedAmount} to my Client;
    b) Cure and rectify all statutory defects and contractual breaches;
    c) Pay a sum of INR 5,500 towards the professional expenses of this Legal Notice.

TAKE NOTICE that in the event of your failure to comply with the requisitions of this notice within the stipulated window of ${templateConfig.complianceWindow}, my Client has given me peremptory instructions to initiate ${templateConfig.legalConsequence}, holding you fully liable for all consequent legal costs, interest, and damages.

A copy of this notice is retained in my chamber records for production before the competent Court / Adjudicatory Authority.

SCHEDULE OF RELIED DOCUMENTS / ANNEXURES PRESERVED:
${documentsList}

Yours faithfully,

[Signature & Seal]
${advocateName}
Advocate for the Client
Enrollment No: ${advocateBarCouncil}`;
  }, [
    templateConfig, 
    referenceNo, 
    noticeDate, 
    advocateName, 
    advocateBarCouncil, 
    advocateChamber, 
    senderName, 
    senderAddress, 
    recipientName, 
    recipientAddress, 
    disputedAmount, 
    responseData
  ]);

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(formattedNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([formattedNoticeText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Legal_Notice_${referenceNo.replace(/\//g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Toolbar */}
      <div className={`p-4 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50/90 border-slate-200'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-blue-500" />
            <h3 className={`font-bold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Procedural Legal Notice & Pleading Drafter
            </h3>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
              isDark ? 'bg-blue-950/70 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              Court-Ready Pleading
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Synthesized directly from statutory citations, party averments, and mandatory compliance timelines.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border flex items-center space-x-1.5 transition-colors ${
              isEditMode 
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : (isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-2xs')
            }`}
          >
            {isEditMode ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditMode ? "Preview Notice" : "Edit Parties & Facts"}</span>
          </button>

          <button
            onClick={handleCopyNotice}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border flex items-center space-x-1.5 transition-colors ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-700'
                : (isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-2xs')
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Pleading" : "Copy Pleading"}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border flex items-center space-x-1.5 transition-colors ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-2xs'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .txt</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-xs flex items-center space-x-1.5 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Document</span>
          </button>
        </div>
      </div>

      {/* Notice Template Switcher */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2">
        <span className="text-xs font-mono text-slate-400 mr-1">Statutory Template:</span>
        {[
          { id: 'ni138', label: 'Section 138 NI Act (Cheque)', statute: 'NI Act 1881' },
          { id: 'consumer', label: 'Consumer Notice (Defect/Service)', statute: 'CPA 2019' },
          { id: 'tenancy', label: 'Section 106 Tenancy Notice', statute: 'TPA 1882' },
          { id: 'trademark', label: 'Trade Mark Cease & Desist', statute: 'TM Act 1999' },
          { id: 'general', label: 'General Statutory Notice', statute: 'General Civil' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setNoticeType(t.id)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
              noticeType === t.id
                ? 'bg-blue-600 text-white border-blue-700 font-semibold shadow-2xs'
                : (isDark ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100')
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Optional Interactive Customizer Form */}
      {isEditMode && (
        <div className={`p-5 rounded-lg border space-y-4 transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
            <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Customize Pleading Parties, Reference & Advocate Details
            </h4>
            <span className="text-[11px] text-slate-400">Edits update the document preview in real time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Sender / Complainant */}
            <div className="space-y-2">
              <label className="font-semibold block text-slate-700 dark:text-slate-300">
                Client / Sender (Complainant) Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <label className="font-semibold block text-slate-700 dark:text-slate-300 mt-2">
                Client Address
              </label>
              <textarea
                rows={2}
                value={senderAddress}
                onChange={e => setSenderAddress(e.target.value)}
                className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Recipient / Opposite Party */}
            <div className="space-y-2">
              <label className="font-semibold block text-slate-700 dark:text-slate-300">
                Addressee / Opposite Party Name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={e => setRecipientName(e.target.value)}
                className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <label className="font-semibold block text-slate-700 dark:text-slate-300 mt-2">
                Addressee Registered Address
              </label>
              <textarea
                rows={2}
                value={recipientAddress}
                onChange={e => setRecipientAddress(e.target.value)}
                className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Financial Claim & Reference */}
            <div className="space-y-2">
              <label className="font-semibold block text-slate-700 dark:text-slate-300">
                Principal Disputed Amount / Claim
              </label>
              <input
                type="text"
                value={disputedAmount}
                onChange={e => setDisputedAmount(e.target.value)}
                className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold block text-slate-700 dark:text-slate-300">
                Notice Reference Number
              </label>
              <input
                type="text"
                value={referenceNo}
                onChange={e => setReferenceNo(e.target.value)}
                className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Advocate Details */}
            <div className="space-y-2 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-slate-700 dark:text-slate-300">
                    Advocate Name & Bar Enrollment
                  </label>
                  <input
                    type="text"
                    value={advocateName}
                    onChange={e => setAdvocateName(e.target.value)}
                    className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="font-semibold block text-slate-700 dark:text-slate-300">
                    Chambers / Office Address
                  </label>
                  <input
                    type="text"
                    value={advocateChamber}
                    onChange={e => setAdvocateChamber(e.target.value)}
                    className={`w-full p-2 rounded-md border text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authentic Legal Bond Paper Document Visualizer */}
      <div 
        id="printableLegalNotice"
        className="legal-pleading-canvas bg-white text-slate-900 border border-slate-300 rounded-lg p-8 sm:p-12 shadow-xl space-y-6 max-w-4xl mx-auto font-serif leading-relaxed text-sm"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Advocate Letterhead Header */}
        <div className="border-b-2 border-slate-900 pb-5 text-center space-y-1">
          <div className="text-xl sm:text-2xl font-bold tracking-wider font-serif text-slate-950 uppercase">
            {advocateName}
          </div>
          <div className="text-xs font-sans tracking-wide text-slate-700">
            ADVOCATE, HIGH COURT & DISTRICT COURTS
          </div>
          <div className="text-[11px] font-sans text-slate-600">
            {advocateBarCouncil}
          </div>
          <div className="text-[11px] font-sans text-slate-500">
            Chambers: {advocateChamber}
          </div>
        </div>

        {/* Reference and Tracking Box */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans pt-2 border-b border-slate-200 pb-3 gap-2">
          <div>
            <span className="font-bold">REF NO:</span> <span className="font-mono text-slate-800">{referenceNo}</span>
          </div>
          <div className="font-semibold text-blue-900 uppercase tracking-wide text-[11px]">
            DISPATCHED VIA: {templateConfig.dispatchMode}
          </div>
          <div>
            <span className="font-bold">DATE:</span> <span className="font-mono text-slate-800">{noticeDate}</span>
          </div>
        </div>

        {/* Memo of Parties */}
        <div className="space-y-4 font-sans text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider block text-slate-800 mb-1">
              TO (THE ADDRESSEE / OPPOSITE PARTY):
            </span>
            <div className="pl-4 border-l-2 border-slate-300 space-y-0.5 font-medium text-slate-900">
              <div className="font-bold">{recipientName}</div>
              <div className="text-slate-700">{recipientAddress}</div>
            </div>
          </div>

          <div>
            <span className="font-bold uppercase tracking-wider block text-slate-800 mb-1">
              UNDER INSTRUCTIONS FROM AND ON BEHALF OF MY CLIENT:
            </span>
            <div className="pl-4 border-l-2 border-slate-300 space-y-0.5 font-medium text-slate-900">
              <div className="font-bold">{senderName}</div>
              <div className="text-slate-700">{senderAddress}</div>
              <div className="text-[11px] text-slate-500 italic">(Hereinafter referred to as "My Client")</div>
            </div>
          </div>
        </div>

        {/* Formal Notice Title Banner */}
        <div className="text-center py-3 border-y-2 border-slate-900 font-sans my-4 bg-slate-50">
          <h2 className="font-bold text-xs sm:text-sm tracking-wide text-slate-950 uppercase leading-snug">
            {templateConfig.title}
          </h2>
          <div className="text-[11px] font-semibold text-blue-900 mt-0.5">
            MANDATORY COMPLIANCE WINDOW: {templateConfig.complianceWindow.toUpperCase()}
          </div>
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-4 text-justify font-serif text-[13px] sm:text-sm leading-relaxed text-slate-900">
          <p className="font-sans text-xs font-semibold">
            SIR / MADAM,
          </p>

          <p>
            Under instructions from and on behalf of my client named above, I do hereby serve upon you this formal Statutory Legal Notice and state as under:
          </p>

          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Bona Fide Transaction:</strong> That my Client is a respectable and law-abiding party who engaged with you, the Addressee, in ordinary course of commercial dealings, having promptly fulfilled all agreed terms, statutory conditions, and financial obligations without failure or default.
            </li>

            <li>
              <strong>Factual Genesis & Consideration:</strong> That in the course of the aforementioned transaction, you, the Addressee, undertook specific binding legal commitments involving the principal sum / consideration of <strong>{disputedAmount}</strong>, for which valid receipts, invoices, and bank transaction instruments were issued.
            </li>

            <li>
              <strong>Breach & Statutory Default:</strong> That contrary to statutory warranties and express undertakings, you, the Addressee, committed grave and continuing default, to wit: <em>{templateConfig.causeDescription}</em>. Despite repeated verbal requests and written requisitions by my client, you neglected, avoided, and refused to perform your statutory obligations.
            </li>

            <li>
              <strong>Pecuniary Injury & Harassment:</strong> That by virtue of your illegal, arbitrary, and wrongful conduct, my Client has been subjected to severe pecuniary loss, mental agony, commercial disruption, and financial hardship, for which you are jointly and severally liable under the law of the land.
            </li>

            <li>
              <strong>Statutory Liability & Precedence:</strong> That under the mandatory provisions of <strong>{templateConfig.statuteCite}</strong>, you have incurred clear statutory liability, and no further indulgence can be granted in respect of the default.
            </li>
          </ol>

          {/* Mandatory Requisitions Box */}
          <div className="my-6 p-4 border-2 border-slate-900 bg-slate-50/70 font-sans text-xs space-y-2">
            <div className="font-bold text-slate-950 uppercase tracking-wide">
              MANDATORY REQUISITIONS & DEMAND:
            </div>
            <p className="text-slate-800">
              NOW THEREFORE, I, on behalf of my Client, hereby call upon you to comply with the following demands within <strong>{templateConfig.complianceWindow}</strong>:
            </p>
            <div className="space-y-1.5 pl-4 font-medium text-slate-900">
              <div>(a) Immediately pay / refund the principal sum of <strong>{disputedAmount}</strong> to my Client via Demand Draft or verified RTGS;</div>
              <div>(b) Rectify, perform, and discharge all pending statutory defects and contractual obligations;</div>
              <div>(c) Pay an amount of <strong>INR 5,500/-</strong> towards the professional fee and miscellaneous expenses of this Legal Notice.</div>
            </div>
          </div>

          <p className="font-sans text-xs leading-relaxed text-slate-800 font-medium">
            <strong>TAKE NOTICE</strong> that in the event of your failure to strictly comply with the aforesaid demands within the stipulated window of <strong>{templateConfig.complianceWindow}</strong>, my Client has given me peremptory instructions to initiate <strong>{templateConfig.legalConsequence}</strong>, without any further notice or reference to you, in which event you shall be held solely responsible for all consequential costs, interest, and punitive damages.
          </p>

          <p className="text-xs text-slate-600 italic">
            A copy of this Legal Notice is retained in my chamber records for production before the competent Court / Tribunal as proof of statutory notice under law.
          </p>
        </div>

        {/* Schedule of Relied Annexures */}
        <div className="pt-4 border-t border-slate-300 font-sans text-xs space-y-2">
          <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            SCHEDULE OF RELIED DOCUMENTS PRESERVED IN EVIDENCE:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
            {responseData?.documentChecklist?.slice(0, 4).map((doc, idx) => (
              <div key={idx} className="flex items-start space-x-1.5 bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-bold text-slate-900">{String.fromCharCode(65 + idx)}.</span>
                <div>
                  <div className="font-semibold text-slate-900">{doc.name}</div>
                  <div className="text-[10px] text-slate-500">{doc.requiredType}</div>
                </div>
              </div>
            )) || (
              <div className="text-slate-500 italic">Relevant invoices, receipts, and communications appended.</div>
            )}
          </div>
        </div>

        {/* Signature & Seal Block */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-end text-xs font-sans text-slate-900 gap-6">
          <div className="space-y-1">
            <div className="font-semibold text-slate-700">Client Authorization:</div>
            <div className="w-44 border-b border-slate-400 pt-6"></div>
            <div className="font-bold">{senderName}</div>
            <div className="text-[10px] text-slate-500">Complainant / Authorizing Client</div>
          </div>

          <div className="text-right space-y-1">
            <div className="font-semibold text-slate-700">Yours Faithfully,</div>
            <div className="w-48 border-b border-slate-400 pt-6 ml-auto"></div>
            <div className="font-bold text-sm">{advocateName}</div>
            <div className="text-[11px] text-slate-700">Advocate for the Client</div>
            <div className="text-[10px] text-slate-500">{advocateBarCouncil}</div>
          </div>
        </div>

      </div>

    </div>
  );
};
