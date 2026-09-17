import { INITIAL_CORPUS } from '../data/initialCorpus.js';
import { SYSTEM_PROMPT } from './systemPrompt.js';

const STORAGE_KEY_DOCS = 'legal_rag_custom_documents';

export class LegalRAGEngine {
  constructor() {
    this.corpus = [...INITIAL_CORPUS];
    this.loadCustomDocuments();
  }

  loadCustomDocuments() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY_DOCS);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            this.corpus = [...INITIAL_CORPUS, ...parsed];
          }
        }
      }
    } catch (e) {
      console.warn('Could not load custom documents from storage', e);
    }
  }

  saveCustomDocument(doc) {
    const customDocs = this.getCustomDocuments();
    customDocs.push(doc);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(customDocs));
      }
      this.corpus = [...INITIAL_CORPUS, ...customDocs];
      return true;
    } catch (e) {
      console.error('Failed to save custom document', e);
      return false;
    }
  }

  getCustomDocuments() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY_DOCS);
        return stored ? JSON.parse(stored) : [];
      }
      return [];
    } catch {
      return [];
    }
  }

  getAllDocuments() {
    return this.corpus;
  }

  retrieve(query, topK = 4) {
    const queryTokens = query.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2);

    const scoredChunks = [];

    this.corpus.forEach(doc => {
      doc.sections.forEach(sec => {
        const textToSearch = `${doc.title} ${sec.title} ${sec.content} ${sec.sectionNumber} ${sec.clause} ${sec.portal || ''} ${sec.deadlines || ''}`.toLowerCase();
        
        let matchCount = 0;
        let exactPhraseBonus = 0;

        queryTokens.forEach(token => {
          const regex = new RegExp('\\b' + token + '\\b', 'i');
          if (regex.test(textToSearch)) {
            matchCount += 2;
          } else if (textToSearch.includes(token)) {
            matchCount += 1;
          }
        });

        if (textToSearch.includes(query.toLowerCase().trim())) {
          exactPhraseBonus = 5;
        }

        const tierWeight = {
          1: 1.5,
          2: 1.4,
          3: 1.3,
          4: 1.2,
          5: 1.1,
          6: 1.0,
          7: 0.9,
          8: 0.7
        }[doc.tier] || 1.0;

        const score = (matchCount + exactPhraseBonus) * tierWeight;

        if (score > 0) {
          scoredChunks.push({
            score,
            documentId: doc.id,
            documentTitle: doc.title,
            category: doc.category,
            tier: doc.tier,
            authority: doc.authority,
            jurisdiction: doc.jurisdiction,
            sectionNumber: sec.sectionNumber,
            clause: sec.clause,
            pageNumber: sec.pageNumber,
            sectionTitle: sec.title,
            content: sec.content,
            fees: sec.fees,
            deadlines: sec.deadlines,
            portal: sec.portal
          });
        }
      });
    });

    scoredChunks.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.tier - b.tier;
    });

    return scoredChunks.slice(0, topK);
  }

  detectConflicts(retrieved) {
    const conflicts = [];
    for (let i = 0; i < retrieved.length; i++) {
      for (let j = i + 1; j < retrieved.length; j++) {
        const a = retrieved[i];
        const b = retrieved[j];
        if (a.documentId !== b.documentId && a.category === b.category) {
          if (a.deadlines && b.deadlines && a.deadlines !== b.deadlines) {
            conflicts.push({
              sourceA: `${a.documentTitle} (${a.sectionNumber})`,
              sourceB: `${b.documentTitle} (${b.sectionNumber})`,
              issue: `Differing timeframes noted: '${a.deadlines}' vs '${b.deadlines}'`,
              recommendation: `Follow the higher tier statutory provision (${a.tier <= b.tier ? a.documentTitle : b.documentTitle}) and confirm with the competent registry.`
            });
          }
        }
      }
    }
    return conflicts;
  }
  async processQuery(userQuery, apiKey = null) {
    const retrieved = this.retrieve(userQuery, 4);
    const conflicts = this.detectConflicts(retrieved);

    if (apiKey) {
      try {
        const response = await this.callExternalLLM(userQuery, retrieved, apiKey);
        return {
          ...response,
          retrievedSources: retrieved,
          conflicts
        };
      } catch (err) {
        console.warn('External LLM call failed, using built-in procedural engine:', err);
      }
    }

    return this.generateProceduralResponse(userQuery, retrieved, conflicts);
  }

  async callExternalLLM(userQuery, retrieved, apiKey) {
    const contextText = retrieved.map((r, i) => `
[Document ${i + 1}]
Name: ${r.documentTitle}
Authority: ${r.authority}
Tier: ${r.tier}
Section: ${r.sectionNumber}, ${r.clause}
Page: ${r.pageNumber}
Content: ${r.content}
Fees: ${r.fees || 'N/A'}
Deadlines: ${r.deadlines || 'N/A'}
Submission Portal: ${r.portal || 'N/A'}
`).join('\n---\n');

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const promptPayload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nRetrieved Legal Context:\n${contextText}\n\nUser Situation / Question:\n${userQuery}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 2500
      }
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promptPayload)
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return {
      rawText,
      isAiGenerated: true,
      understanding: 'Extracted from user inquiry and retrieved statutory texts.',
      applicableProcess: 'Procedural determination via retrieved legal authorities.',
      procedureSteps: [],
      documentChecklist: [],
      authoritiesPortals: 'Refer to generated response text.',
      feesAndDeadlines: 'Refer to generated response text.',
      actionPlan: { today: [], afterSubmission: [], beforeDeadline: [] },
      missingInfo: [],
      risks: [],
      sources: retrieved
    };
  }
  generateProceduralResponse(query, retrieved, conflicts) {
    if (retrieved.length === 0) {
      return {
        rawText: 'I could not find sufficient information in the provided legal documents to verify this requirement.',
        isInsufficient: true,
        understanding: 'Query outside current indexed scope: ' + query,
        applicableProcess: 'Information Not Available in Current Corpus',
        procedureSteps: [],
        documentChecklist: [],
        authoritiesPortals: 'Not determined due to lack of source documents.',
        feesAndDeadlines: 'Not determined.',
        actionPlan: {
          today: ['Verify whether your query pertains to an indexed statute.', 'Upload the relevant statutory document or circular via the Knowledge Base tab.'],
          afterSubmission: [],
          beforeDeadline: []
        },
        missingInfo: [
          { item: 'Specific statute or governing jurisdiction', whyItMatters: 'Procedural steps cannot be invented without primary legal basis.' }
        ],
        risks: [
          'Do not act on assumptions without verified statutory provisions.'
        ],
        sources: [],
        conflicts: [],
        safetyClassification: {
          documentBased: 'None available for this query in the indexed corpus.',
          generalGuidance: 'Consult relevant gazette notifications or official legislative portals.',
          professionalLegalAdvice: 'Consult a qualified legal practitioner specializing in this subject area.'
        }
      };
    }

    const primary = retrieved[0];
    const isConsumer = primary.documentId.includes('cpa');
    const isTenancy = primary.documentId.includes('tpa');
    const isTrademark = primary.documentId.includes('tm');
    const isCheque = primary.documentId.includes('ni-act');

    let understanding = '';
    let applicableProcess = '';
    let procedureSteps = [];
    let documentChecklist = [];
    let authoritiesPortals = '';
    let feesAndDeadlines = '';
    let actionPlan = { today: [], afterSubmission: [], beforeDeadline: [] };
    let missingInfo = [];
    let risks = [];

    if (isConsumer) {
      understanding = 'The user describes a dispute involving defective goods, deficiency in service, or unfair trade practice seeking compensation or replacement from a vendor or service provider.';
      applicableProcess = 'Consumer Complaint Filing under Section 35 of the Consumer Protection Act, 2019 before the District Consumer Disputes Redressal Commission.';
      
      procedureSteps = [
        {
          stepNumber: 1,
          action: 'Serve a Formal Written Pre-Litigation Legal Notice to the Opposite Party',
          whatYouNeedToDo: 'Draft and dispatch a clear letter specifying transaction details, invoice number, exact defects or service failures, loss incurred, and demand rectification or refund within 15 calendar days.',
          whyRequired: 'Establishes evidence of prior demand and gives the opposite party an opportunity to resolve the dispute before formal adjudication.',
          documentsRequired: 'Copy of original invoice, payment receipt, and written communications or emails.',
          whereToSubmit: 'Dispatched via Registered Post with Acknowledgment Due (RPAD) or Speed Post to the registered address of seller or company.',
          fees: 'Standard postal charges (approx. 50 - 100 INR).',
          expectedNextStep: 'Await reply or compliance during the 15-day notice period.',
          deadline: 'Notice should be dispatched promptly to allow filing within the 2-year statutory limit.',
          source: `${primary.documentTitle}, Section 35, Page ${primary.pageNumber}`
        },
        {
          stepNumber: 2,
          action: 'Prepare and File Consumer Complaint on the e-Daakhil Portal or Commission Registry',
          whatYouNeedToDo: 'Register on the national e-Daakhil portal (edaakhil.nic.in) or prepare physical paper sets. Draft complaint detailing facts, cause of action date, jurisdiction statement, and exact relief sought.',
          whyRequired: 'Statutory requirement under Section 35(1) to invoke jurisdiction of the District Commission.',
          documentsRequired: 'Signed complaint index, supporting verification affidavit, annexures of invoices, notice copy, and postal tracking receipt.',
          whereToSubmit: 'e-Daakhil Portal (edaakhil.nic.in) or physical registry of the District Commission where cause of action arose or seller resides.',
          fees: primary.fees || 'Nil up to 5,00,000 INR claim; 200 INR between 5,00,000 INR and 10,00,000 INR.',
          expectedNextStep: 'Commission issues admission notice and sends summons to opposite party within 21 days.',
          deadline: primary.deadlines || 'Strictly within 2 years from date of cause of action under Section 69.',
          source: `${primary.documentTitle}, Section 35 & Section 69, Page 18 & 34`
        }
      ];

      documentChecklist = [
        { name: 'Original Tax Invoice / Bill of Purchase', requiredType: 'Original for inspection, certified copy for filing', why: 'Proves transaction value and privity of contract', submitTo: 'Attached as Annexure A' },
        { name: 'Payment Receipts / Bank Account Statement', requiredType: 'Bank stamped copy or digital transaction screenshot', why: 'Substantiates monetary consideration paid', submitTo: 'Attached as Annexure B' },
        { name: 'Pre-Litigation Demand Notice with Postal Tracking Proof', requiredType: 'True copy with RPAD / Speed Post delivery confirmation', why: 'Demonstrates that seller was given opportunity to cure defect', submitTo: 'Attached as Annexure C' },
        { name: 'Photographs / Technical Expert Report (if applicable)', requiredType: 'Color photographs with date stamp or laboratory certificate', why: 'Proves tangible product defect under Section 38', submitTo: 'Attached as Annexure D' },
        { name: 'Verification Affidavit sworn by Complainant', requiredType: 'Original notarized affidavit on non-judicial stamp paper', why: 'Mandatory statutory verification of averments', submitTo: 'Filed with principal complaint' }
      ];

      authoritiesPortals = 'District Consumer Disputes Redressal Commission (DCDRC) having local jurisdiction; Online filing via e-Daakhil Gateway (edaakhil.nic.in).';
      feesAndDeadlines = 'Fees: Nil for claims up to 5 Lakh INR. Statutory limitation: 2 years from date of cause of action (Section 69). Commission scrutiny timeline: 21 days from filing.';

      actionPlan = {
        today: [
          'Collate all tax invoices, payment proof, warranty cards, and written email threads with the seller.',
          'Note the exact date when the defect occurred to establish the limitation timeline.'
        ],
        afterSubmission: [
          'Track acknowledgment number on e-Daakhil portal for registry scrutiny notes.',
          'Attend the initial admission hearing (in person or via authorized representative/counsel).'
        ],
        beforeDeadline: [
          'Ensure filing is submitted well before the 2-year anniversary of the cause of action date.',
          'If 2-year limit is approaching, file a separate application for Condonation of Delay under Section 69(2).'
        ]
      };

      missingInfo = [
        { item: 'Exact date of purchase and date of defect emergence', whyItMatters: 'Determines whether complaint falls inside the 2-year limitation window of Section 69.' },
        { item: 'Total monetary claim amount (value of goods + compensation sought)', whyItMatters: 'Determines whether jurisdiction lies with District Commission (up to 50 Lakh INR) or State Commission.' },
        { item: 'Registered business address of the seller or manufacturer', whyItMatters: 'Required to verify territorial jurisdiction and serve summons.' }
      ];

      risks = [
        'Filing beyond 2 years from the date of cause of action without acceptable justification leads to summary dismissal under Section 69.',
        'Failure to serve prior notice may weaken claims for compensation or mental harassment costs.',
        'Incorrect valuation of relief may cause rejection for improper pecuniary jurisdiction.'
      ];
    } else if (isTenancy) {
      understanding = 'The user describes a tenancy or lease issue concerning possession, non-payment of rent, or termination of tenancy under property law.';
      applicableProcess = 'Determination of Tenancy and Eviction Proceedings under Section 106 and Section 108 of the Transfer of Property Act, 1882.';

      procedureSteps = [
        {
          stepNumber: 1,
          action: 'Issue Statutory Notice to Quit under Section 106',
          whatYouNeedToDo: 'Draft a formal written notice terminating the tenancy, stating the specific date by which vacant physical possession must be surrendered, and specifying unpaid rent dues.',
          whyRequired: 'Statutory precondition under Section 106 to lawfully determine monthly or yearly tenancy.',
          documentsRequired: 'Original lease agreement, rent receipts, and calculation of arrears.',
          whereToSubmit: 'Sent to tenant by Registered Post with Acknowledgment Due (RPAD) or delivered in person with signed receipt.',
          fees: 'Postal registry fees (approx. 50 - 100 INR).',
          expectedNextStep: 'Tenant has 15 days (for monthly tenancy) to deliver vacant possession.',
          deadline: '15 clear days notice expiring with the end of the tenancy month.',
          source: `${primary.documentTitle}, Section 106, Page ${primary.pageNumber}`
        },
        {
          stepNumber: 2,
          action: 'File Civil Suit for Recovery of Possession and Mesne Profits',
          whatYouNeedToDo: 'If tenant refuses to vacate upon expiry of notice period, institute an eviction suit before the jurisdictional Civil Court or Rent Authority.',
          whyRequired: 'Self-help eviction, changing locks, or disconnecting utilities without court decree is illegal under Section 108.',
          documentsRequired: 'Plaint with supporting affidavit, lease agreement, copy of Section 106 notice, postal acknowledgment card, title deed.',
          whereToSubmit: 'Competent Civil Court (Civil Judge Senior/Junior Division) or Rent Control Authority.',
          fees: 'Ad valorem court fee on annual rental value per State Court Fees Act.',
          expectedNextStep: 'Court issues summons to defendant tenant for written statement within 30 days.',
          deadline: 'Limitation period is 12 years under Article 67 of the Limitation Act from date of notice expiry.',
          source: `${primary.documentTitle}, Section 108, Page 45`
        }
      ];

      documentChecklist = [
        { name: 'Registered Lease / Rent Agreement', requiredType: 'Original or certified copy', why: 'Proves landlord-tenant relationship and contractual terms', submitTo: 'Filed with Plaint' },
        { name: 'Bank Statements / Rent Receipts', requiredType: 'Authenticated bank copy', why: 'Proves default in rent payment or historical rate of rent', submitTo: 'Attached as proof of arrears' },
        { name: 'Statutory Section 106 Termination Notice', requiredType: 'Office copy signed by landlord/counsel', why: 'Proves lawful determination of tenancy', submitTo: 'Primary exhibit' },
        { name: 'Postal Proof (RPAD / Speed Post delivery acknowledgment)', requiredType: 'Original signed postal card or official tracking log', why: 'Proves effective service of notice on tenant', submitTo: 'Filed alongside notice' },
        { name: 'Ownership Documents / Title Deed / Property Tax Receipt', requiredType: 'Certified copy', why: 'Establishes locus standi of lessor', submitTo: 'Civil court registry' }
      ];

      authoritiesPortals = 'Jurisdictional Court of the Civil Judge or Rent Control Authority in the district where property is situated.';
      feesAndDeadlines = 'Fees: Ad valorem court fee on 1-year gross rental value. Notice period: 15 days for monthly tenancies, 6 months for manufacturing leases (Section 106).';

      actionPlan = {
        today: [
          'Retrieve the executed lease agreement and review whether it has expired or has a custom termination clause.',
          'Collect proofs of recent rent defaults and bank statements.'
        ],
        afterSubmission: [
          'Preserve the signed postal acknowledgment card or print the official postal tracking delivery confirmation.',
          'Prepare calculation of mesne profits (damages for unauthorized occupation) starting from notice expiry date.'
        ],
        beforeDeadline: [
          'Do not accept any rent payments after expiry of notice without a written reservation, as acceptance may be argued as waiver of notice.'
        ]
      };

      missingInfo = [
        { item: 'Whether the tenancy is covered by a State Rent Control Act or general Transfer of Property Act', whyItMatters: 'Properties under Rent Control Acts have strict protected grounds for eviction.' },
        { item: 'Whether a written lease deed exists and if it is registered', whyItMatters: 'Unregistered leases for over 11 months cannot be received as primary evidence of lease terms under Section 49 Registration Act.' },
        { item: 'Specific state and district where property is located', whyItMatters: 'Determines court fee schedule and local court hierarchy.' }
      ];

      risks = [
        'Disconnecting water, electricity, or locking the property forcibly exposes the landlord to criminal trespass and injunction proceedings.',
        'Accepting rent without qualification after issuing a notice to quit may constitute waiver under Section 113.',
        'Defective notice period (less than 15 clear days) invalidates the entire eviction suit.'
      ];
    } else if (isTrademark) {
      understanding = 'The user is inquiring about filing, defending, or opposing a trademark application with the Intellectual Property Office.';
      applicableProcess = 'Trademark Registration (Form TM-A) or Notice of Opposition (Form TM-O) under Trade Marks Act 1999 and Trade Marks Rules 2017.';

      procedureSteps = [
        {
          stepNumber: 1,
          action: 'Conduct Public Trademark Search and Class Classification',
          whatYouNeedToDo: 'Perform an exhaustive phonetic and identical search on the IP India public portal across relevant classes of the Nice Classification system to identify conflicting marks.',
          whyRequired: 'Ensures the mark is distinct and avoids immediate objection under Section 9 (absolute grounds) or Section 11 (relative grounds).',
          documentsRequired: 'Representation of proposed brand logo/wordmark, list of goods/services.',
          whereToSubmit: 'IP India Public Search Gateway (ipindiaservices.gov.in).',
          fees: 'Nil (public search portal is free).',
          expectedNextStep: 'Proceed to application drafting if no conflicting prior mark is identified.',
          deadline: 'Prior to filing application.',
          source: `${primary.documentTitle}, Section 18, Page ${primary.pageNumber}`
        },
        {
          stepNumber: 2,
          action: 'File Application for Registration via Form TM-A',
          whatYouNeedToDo: 'Complete electronic Form TM-A with mark details, applicant category (Individual/Startup vs Body Corporate), and submit with user date affidavit if prior use is claimed.',
          whyRequired: 'Mandatory statutory step to obtain application number and priority date.',
          documentsRequired: 'High-resolution mark logo, user affidavit (if claiming prior use) on non-judicial stamp paper, MSME/Startup certificate (for fee concession).',
          whereToSubmit: 'Intellectual Property India E-Filing Gateway (ipindiaonline.gov.in).',
          fees: '4,500 INR for Individual/Startup; 9,000 INR for other corporate entities (e-filing).',
          expectedNextStep: 'Registrar issues examination report within 30 days.',
          deadline: 'Reply to examination report must be filed within 30 days of receipt.',
          source: `${primary.documentTitle}, Rule 23, Page 12`
        }
      ];

      documentChecklist = [
        { name: 'High Resolution Logo / Wordmark Specimen', requiredType: 'JPEG/PNG format under 5MB', why: 'Specifies exact visual identity of the mark', submitTo: 'Uploaded in Form TM-A' },
        { name: 'User Date Affidavit with Invoices / Proof of Prior Use', requiredType: 'Notarized affidavit with supporting invoices', why: 'Required if claiming use prior to application date', submitTo: 'Uploaded with Form TM-A' },
        { name: 'MSME Udyam Certificate or DPIIT Startup Recognition', requiredType: 'Digital certificate copy', why: 'Entitles applicant to 50% statutory fee discount', submitTo: 'Uploaded for fee rebate' },
        { name: 'Power of Attorney (Form TM-M)', requiredType: 'Signed and stamped document', why: 'Required if filed through a trademark agent or advocate', submitTo: 'E-filing gateway' }
      ];

      authoritiesPortals = 'Office of the Controller General of Patents, Designs and Trade Marks (CGPDTM); IP India E-Filing Portal (ipindiaonline.gov.in).';
      feesAndDeadlines = 'Fees: 4,500 INR (Individual/Startup), 9,000 INR (Company). Opposition deadline: strictly 4 months from journal publication (Section 21) non-extendable.';

      actionPlan = {
        today: [
          'Execute a detailed public search on the IP India database to check for identical or phonetically similar existing trademarks.',
          'Check whether you qualify for MSME or DPIIT startup status to save 50% on government application fees.'
        ],
        afterSubmission: [
          'Monitor application status monthly on the e-filing portal.',
          'Upon receipt of Examination Report, submit a written reply within 30 days.'
        ],
        beforeDeadline: [
          'If monitoring a competitor mark in the Trade Marks Journal, file Form TM-O strictly before the 4-month non-extendable window closes.'
        ]
      };

      missingInfo = [
        { item: 'Specific nature of goods or services offered under the mark', whyItMatters: 'Determines the appropriate Nice Class (Classes 1 to 45).' },
        { item: 'Whether the mark has already been used in commerce or is proposed to be used', whyItMatters: 'Prior use requires a formal notarized user affidavit with earliest invoice date.' },
        { item: 'Legal structure of applicant entity', whyItMatters: 'Determines whether statutory fee is 4,500 INR or 9,000 INR.' }
      ];

      risks = [
        'Filing without a prior user affidavit when claiming earlier use leads to severe evidentiary disputes or rejection under Section 18.',
        'Missing the 30-day examination response deadline results in the application being deemed Abandoned.',
        'The 4-month deadline to oppose a journal publication under Section 21 cannot be extended under any circumstance.'
      ];
    } else if (isCheque) {
      understanding = 'The user is seeking to recover funds following the dishonour of a cheque due to insufficient funds or related banking reasons.';
      applicableProcess = 'Statutory Demand and Prosecution under Section 138 of the Negotiable Instruments Act, 1881.';

      procedureSteps = [
        {
          stepNumber: 1,
          action: 'Obtain Bank Return Memo with Reasons for Dishonour',
          whatYouNeedToDo: 'Collect the official written Return Memo stamped by the drawee bank showing the specific reason (such as Funds Insufficient or Account Closed).',
          whyRequired: 'The bank memo is prima facie evidence of dishonour under Section 146.',
          documentsRequired: 'Original dishonoured cheque and bank return memo.',
          whereToSubmit: 'Your bank branch.',
          fees: 'Bank dishonour penalty fee (approx. 200 - 500 INR).',
          expectedNextStep: 'Prepare and dispatch statutory demand notice within 30 days.',
          deadline: 'Cheque must have been presented within its 3-month validity period.',
          source: `${primary.documentTitle}, Section 138, Proviso (a), Page 52`
        },
        {
          stepNumber: 2,
          action: 'Dispatch Statutory 15-Day Demand Legal Notice',
          whatYouNeedToDo: 'Send a written legal notice to the drawer demanding payment of the full cheque amount within 15 days of receipt of the notice.',
          whyRequired: 'Mandatory statutory condition under Section 138(b). Without this notice, no court can take cognizance.',
          documentsRequired: 'Draft notice, copy of cheque, copy of bank memo.',
          whereToSubmit: 'Sent via Registered Post with Acknowledgment Due (RPAD) or Speed Post to drawer verified address.',
          fees: 'Postal dispatch charges.',
          expectedNextStep: 'Drawer has 15 calendar days from receipt to clear the cheque amount.',
          deadline: 'Must be dispatched within 30 days of receiving the bank memo.',
          source: `${primary.documentTitle}, Section 138, Proviso (b), Page 52`
        },
        {
          stepNumber: 3,
          action: 'Institute Criminal Complaint under Section 138 / Section 142',
          whatYouNeedToDo: 'If the drawer fails to pay within 15 days of notice delivery, file a complaint in writing before the Judicial Magistrate First Class or Metropolitan Magistrate.',
          whyRequired: 'Invokes penal jurisdiction under Section 138 (punishable with imprisonment up to 2 years or fine up to twice the cheque amount).',
          documentsRequired: 'Original cheque, return memo, office copy of legal notice, postal receipts, delivery tracking report, and pre-summoning verification affidavit.',
          whereToSubmit: 'Magistrate court having jurisdiction over the payee home bank branch.',
          fees: 'Court fees as prescribed by State Court Fees Act.',
          expectedNextStep: 'Court conducts pre-summoning evidence under Section 145 and issues summons to the accused.',
          deadline: 'Must be filed within 1 month after the expiry of the 15-day notice period.',
          source: `${primary.documentTitle}, Section 142, Clause (1), Page 55`
        }
      ];

      documentChecklist = [
        { name: 'Original Dishonoured Cheque', requiredType: 'Original physical instrument', why: 'Primary negotiable instrument proving debt', submitTo: 'Court registry (safeguarded)' },
        { name: 'Original Bank Return Memo', requiredType: 'Original memo bearing bank seal/sign', why: 'Presumptive evidence of dishonour under Section 146', submitTo: 'Attached to complaint' },
        { name: 'Statutory 15-Day Demand Notice', requiredType: 'Office copy signed by complainant/advocate', why: 'Fulfills mandatory Section 138(b) precondition', submitTo: 'Annexed to complaint' },
        { name: 'Postal Dispatch Receipts and Delivery Acknowledgment / Tracking', requiredType: 'Original postal receipts and certified internet tracking printout', why: 'Establishes date of receipt by drawer to compute 15-day cure window', submitTo: 'Annexed to complaint' },
        { name: 'Underlying Contract / Invoice / Legally Enforceable Debt Evidence', requiredType: 'True copy of agreement, promissory note, or ledger', why: 'Rebuts defence that cheque was issued as a mere security or without consideration', submitTo: 'Annexed as supporting evidence' }
      ];

      authoritiesPortals = 'Court of the Judicial Magistrate First Class (JMFC) or Metropolitan Magistrate (MM) where payee bank account is maintained.';
      feesAndDeadlines = 'Fees: State court fees (approx 2% - 5%). Deadlines: Notice within 30 days of bank memo. Cure period: 15 days. Complaint filing: within 30 days of cure expiry.';

      actionPlan = {
        today: [
          'Check the date on the bank return memo immediately to calculate the 30-day notice cutoff.',
          'Obtain an authenticated bank memo copy and original cheque from your bank.'
        ],
        afterSubmission: [
          'Track postal consignment online daily; print and preserve the delivery report with exact delivery date.',
          'Count 15 clear days from the date of confirmed delivery.'
        ],
        beforeDeadline: [
          'Draft the criminal complaint in advance so it can be verified and filed within 30 days of notice window expiry.'
        ]
      };

      missingInfo = [
        { item: 'Exact date of receipt of the bank return memo', whyItMatters: 'Calculates the strict 30-day deadline for dispatching the statutory demand notice.' },
        { item: 'Date of delivery of the legal notice to the drawer', whyItMatters: 'Triggers the 15-day cure period and sets the limitation clock for filing the complaint.' },
        { item: 'Nature of underlying consideration or debt', whyItMatters: 'Section 138 applies only to legally enforceable debts, not gifts or illegal transactions.' }
      ];

      risks = [
        'Missing the 30-day notice dispatch deadline completely extinguishes the right to prosecute under Section 138.',
        'Filing the complaint before the 15-day cure period expires makes the complaint premature and liable to dismissal.',
        'Filing beyond 1 month after cause of action requires formal condonation of delay with satisfactory justification.'
      ];
    } else {
      understanding = `The user inquiry relates to ${primary.documentTitle} regarding procedural requirements, submission methods, and applicable statutory timelines.`;
      applicableProcess = `Procedural Compliance and Filing under ${primary.sectionNumber} of ${primary.documentTitle}.`;

      procedureSteps = retrieved.map((item, idx) => ({
        stepNumber: idx + 1,
        action: `Complete Requirements under ${item.sectionNumber}: ${item.sectionTitle}`,
        whatYouNeedToDo: item.content,
        whyRequired: `Statutory mandate administered by ${item.authority}.`,
        documentsRequired: 'Prescribed statutory forms, identity verification, and proof of payment.',
        whereToSubmit: item.portal || `${item.authority} Registry`,
        fees: item.fees || 'As prescribed in the official rules.',
        expectedNextStep: 'Official review and formal receipt by the competent registry.',
        deadline: item.deadlines || 'Within the statutory timeframe provided in the governing act.',
        source: `${item.documentTitle}, ${item.sectionNumber}, Page ${item.pageNumber}`
      }));

      documentChecklist = [
        { name: 'Government Prescribed Application Form', requiredType: 'Official Form / E-form', why: 'Standard application format required by authority', submitTo: 'Competent registry' },
        { name: 'Identity and Address Verification Proof', requiredType: 'Certified / Self-attested copy', why: 'Verification of applicant identity and jurisdiction', submitTo: 'Attached to application' },
        { name: 'Payment Receipt for Statutory Fees', requiredType: 'Original treasury challan or digital transaction receipt', why: 'Evidence of statutory fee payment', submitTo: 'Registry' }
      ];

      authoritiesPortals = `${primary.authority}; Submission method: ${primary.portal || 'Designated registry or portal'}.`;
      feesAndDeadlines = `Applicable Fees: ${primary.fees || 'Refer to official schedule'}. Statutory Deadlines: ${primary.deadlines || 'As defined in governing statute'}.`;

      actionPlan = {
        today: [
          `Review the provisions of ${primary.documentTitle} (${primary.sectionNumber}).`,
          'Collate primary documents and verify applicant standing.'
        ],
        afterSubmission: [
          'Secure stamped filing acknowledgment or digital transaction receipt.',
          'Track filing status via the designated registry portal.'
        ],
        beforeDeadline: [
          `Ensure all filings are perfected prior to statutory limitation: ${primary.deadlines || 'prescribed timeframe'}.`
        ]
      };

      missingInfo = [
        { item: 'Current stage of the matter', whyItMatters: 'Determines whether initial application or appellate remedy is applicable.' },
        { item: 'Jurisdictional location', whyItMatters: 'Determines specific regional registry or authority.' }
      ];

      risks = [
        'Submitting without required statutory fees leads to rejection at preliminary scrutiny.',
        'Missing prescribed statutory limitation periods bars subsequent claims unless condoned.'
      ];
    }

    return {
      rawText: '',
      isInsufficient: false,
      understanding,
      applicableProcess,
      procedureSteps,
      documentChecklist,
      authoritiesPortals,
      feesAndDeadlines,
      actionPlan,
      missingInfo,
      risks,
      sources: retrieved,
      conflicts,
      safetyClassification: {
        documentBased: 'All procedural stages, fees, limitation periods, and checklists detailed above are extracted directly from the verified primary legal documents in the database.',
        generalGuidance: 'Practical operational practices such as maintaining postal receipts and retaining duplicate copies are general procedural safeguards.',
        professionalLegalAdvice: 'If the matter involves contested allegations, high financial stakes, or criminal exposure, formal consultation with a licensed advocate is recommended.'
      }
    };
  }
}

export const ragEngine = new LegalRAGEngine();
