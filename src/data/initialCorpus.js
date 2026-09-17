// Curated Legal Documents Corpus with Hierarchical Classification
// Priority tiers:
// 1. Official laws and statutes
// 2. Government rules and regulations
// 3. Official government notifications
// 4. Official procedural guidelines
// 5. Official forms and instructions
// 6. Court rules and judgments
// 7. Other authoritative legal documents
// 8. Secondary explanatory documents

export const INITIAL_CORPUS = [
  {
    id: "doc-cpa-2019",
    title: "Consumer Protection Act, 2019 (Act No. 35 of 2019)",
    category: "statute",
    tier: 1,
    authority: "Ministry of Consumer Affairs, Food and Public Distribution",
    jurisdiction: "National",
    publicationDate: "2019-08-09",
    effectiveDate: "2020-07-20",
    sections: [
      {
        sectionNumber: "Section 35",
        clause: "Clause (1)",
        pageNumber: 18,
        title: "Manner in Which Complaint Shall Be Made",
        content: "A complaint, in relation to any goods sold or delivered or agreed to be sold or delivered or any service provided or agreed to be provided, may be filed with a District Commission by the consumer, any recognized consumer association, or the Central Authority. The complaint can be filed either in person, through authorized agent, or online through the e-Daakhil portal accompanied by prescribed fees and supporting affidavits.",
        fees: "Nil for claims up to 5,00,000 INR. 200 INR for claims between 5,00,000 INR and 10,00,000 INR.",
        deadlines: "Must be admitted or rejected within 21 days from filing date.",
        portal: "e-Daakhil Portal (edaakhil.nic.in) or physical filing at District Consumer Disputes Redressal Commission."
      },
      {
        sectionNumber: "Section 69",
        clause: "Clause (1) & (2)",
        pageNumber: 34,
        title: "Limitation Period for Filing Complaints",
        content: "The District Commission, the State Commission or the National Commission shall not admit a complaint unless it is filed within two years from the date on which the cause of action has arisen. Provided that a complaint may be entertained after the specified period if the complainant satisfies the Commission that there was sufficient cause for not filing within such period.",
        fees: "None for condonation application.",
        deadlines: "2 years from the date the defect, deficiency, or unfair trade practice occurred.",
        portal: "Respective Consumer Commission registry."
      },
      {
        sectionNumber: "Section 41",
        clause: "Clause (1)",
        pageNumber: 22,
        title: "Appeal Against Order of District Commission",
        content: "Any person aggrieved by an order made by the District Commission may prefer an appeal against such order to the State Commission on grounds of facts or law within a period of forty-five days from the date of the order, in such form and manner as may be prescribed. 50 percent of the awarded amount must be deposited before appeal is entertained.",
        fees: "50% statutory deposit of awarded amount.",
        deadlines: "45 days from the date of the order.",
        portal: "State Consumer Disputes Redressal Commission registry."
      }
    ]
  },
  {
    id: "doc-tpa-1882",
    title: "Transfer of Property Act, 1882: Lease and Eviction Guidelines",
    category: "statute",
    tier: 1,
    authority: "Legislative Department, Ministry of Law and Justice",
    jurisdiction: "Civil Courts / Rent Control Authorities",
    publicationDate: "1882-02-17",
    effectiveDate: "1882-07-01",
    sections: [
      {
        sectionNumber: "Section 106",
        clause: "Clause (1) - (4)",
        pageNumber: 42,
        title: "Duration of Certain Leases in Absence of Written Contract and Notice to Terminate",
        content: "In the absence of a contract or local law or usage to the contrary, a lease of immovable property for agricultural or manufacturing purposes shall be deemed to be a lease from year to year, terminable on six months notice; and a lease for any other purpose shall be deemed to be a lease from month to month, terminable on fifteen days notice. Every notice under sub-section (1) must be in writing, signed by or on behalf of the person giving it, and either sent by post to the party or tendered personally.",
        fees: "Postal registration and speed post delivery charges (approx. 50 - 100 INR).",
        deadlines: "15 days notice for residential/commercial monthly tenancies; 6 months for manufacturing/agricultural leases.",
        portal: "Registered Post with Acknowledgment Due (RPAD) or Speed Post."
      },
      {
        sectionNumber: "Section 108",
        clause: "Clause (q)",
        pageNumber: 45,
        title: "Rights and Liabilities of Lessee: Restoration of Possession",
        content: "On the determination of the lease, the lessee is bound to put the lessor into possession of the property. If tenant fails to vacate upon expiry of notice period, landlord must file a civil eviction suit or petition before the Rent Control Authority. Self-help evictions or locking the premises forcibly without court decree are unlawful.",
        fees: "Court fees calculated ad valorem on the annual rental value according to State Court Fees Act.",
        deadlines: "Suit must be filed within 12 years under Article 67 of the Limitation Act 1963 from determination of tenancy.",
        portal: "Jurisdictional Civil Court (Civil Judge Senior/Junior Division) or Rent Authority."
      }
    ]
  },
  {
    id: "doc-tm-act-1999",
    title: "Trade Marks Act, 1999 & Trade Marks Rules, 2017",
    category: "statute",
    tier: 1,
    authority: "Controller General of Patents, Designs and Trade Marks (CGPDTM)",
    jurisdiction: "Intellectual Property Office (National)",
    publicationDate: "1999-12-30",
    effectiveDate: "2003-09-15",
    sections: [
      {
        sectionNumber: "Section 18",
        clause: "Rule 23 (Trade Marks Rules 2017)",
        pageNumber: 12,
        title: "Application for Registration of Trademark (Form TM-A)",
        content: "Any person claiming to be the proprietor of a trade mark used or proposed to be used may apply in writing using Form TM-A on the IP India e-filing portal. The application must specify the class of goods or services under the Nice Classification, representation of the mark, applicant name and address, and user affidavit if prior use is claimed.",
        fees: "4,500 INR for Individual/Startup/Small Enterprise (e-filing); 9,000 INR for other corporate entities (e-filing). 10% surcharge for physical filing.",
        deadlines: "Examination report issued within 30 days. Reply to examination report due within 30 days from date of receipt.",
        portal: "Intellectual Property India E-Filing Gateway (ipindiaonline.gov.in)."
      },
      {
        sectionNumber: "Section 21",
        clause: "Rule 42 (Trade Marks Rules 2017)",
        pageNumber: 15,
        title: "Opposition to Registration (Form TM-O)",
        content: "Any person may, within four months from the date of the advertisement or re-advertisement of an application for registration in the Trade Marks Journal, give notice in writing to the Registrar in Form TM-O of opposition to the registration. This four-month deadline is strict and cannot be extended under any circumstance.",
        fees: "2,700 INR for e-filing Form TM-O.",
        deadlines: "Strictly 4 months from publication date in Trade Marks Journal. Non-extendable.",
        portal: "IP India Trade Marks Portal (ipindiaonline.gov.in)."
      }
    ]
  },
  {
    id: "doc-companies-act-2013",
    title: "Companies Act, 2013 & Companies (Incorporation) Rules, 2014",
    category: "statute",
    tier: 1,
    authority: "Ministry of Corporate Affairs (MCA)",
    jurisdiction: "Registrar of Companies (National)",
    publicationDate: "2013-08-29",
    effectiveDate: "2014-04-01",
    sections: [
      {
        sectionNumber: "Section 7",
        clause: "Rule 38 (SPICe+ Integrated Incorporation)",
        pageNumber: 8,
        title: "Incorporation of Company via SPICe+ (INC-32)",
        content: "An application for incorporation of a private limited company is filed through web form SPICe+ (Part A for Name Reservation, Part B for Incorporation, DIN allocation, PAN, TAN, EPFO, ESIC, Professional Tax, and Bank Account opening). Accompanied by e-MOA (INC-33), e-AOA (INC-34), and Agile-Pro-S.",
        fees: "Zero MCA filing fees for authorized capital up to 15,00,000 INR for SPICe+ form; State stamp duty applicable based on registered office state.",
        deadlines: "Name approval reserved for 20 days. Resubmission window of 15 days if defects raised by CRC.",
        portal: "MCA21 V3 Portal (mca.gov.in)."
      },
      {
        sectionNumber: "Section 10A",
        clause: "Rule 23A",
        pageNumber: 14,
        title: "Commencement of Business (Form INC-20A)",
        content: "A company incorporated after 2nd November 2018 having share capital shall not commence business or exercise borrowing powers unless a director files a declaration in Form INC-20A within 180 days of incorporation confirming that every subscriber to the MOA has paid the agreed value of shares.",
        fees: "300 INR to 600 INR based on authorized share capital.",
        deadlines: "Strictly within 180 days from incorporation date. Late penalty: 50,000 INR on company and 1,000 INR per day on directors.",
        portal: "MCA21 V3 Portal (mca.gov.in)."
      }
    ]
  },
  {
    id: "doc-ni-act-1881",
    title: "Negotiable Instruments Act, 1881: Dishonour of Cheque",
    category: "statute",
    tier: 1,
    authority: "Ministry of Finance / High Courts & Subordinate Judiciary",
    jurisdiction: "Judicial Magistrate First Class / Metropolitan Magistrate",
    publicationDate: "1881-12-09",
    effectiveDate: "1882-03-01",
    sections: [
      {
        sectionNumber: "Section 138",
        clause: "Provisos (a), (b), (c)",
        pageNumber: 52,
        title: "Dishonour of Cheque for Insufficiency of Funds in Account",
        content: "Where any cheque drawn by a person is returned unpaid by the bank for insufficiency of funds or exceeding arrangements, such person shall be deemed to have committed an offence punishable with imprisonment up to two years or fine up to twice the amount of cheque or both. Conditions: (a) Cheque presented within 3 months of validity; (b) Statutory demand notice served in writing within 30 days of receiving bank return memo; (c) Drawer fails to pay within 15 days of receiving notice.",
        fees: "Court fee as per State Court Fees Act (typically 2% to 5% of cheque amount).",
        deadlines: "Statutory legal notice must be dispatched within 30 days of bank memo. Complaint must be filed within 1 month after expiry of 15-day cure period.",
        portal: "Jurisdictional Court of Judicial Magistrate First Class or Metropolitan Magistrate."
      },
      {
        sectionNumber: "Section 142",
        clause: "Clause (1) & (2)",
        pageNumber: 55,
        title: "Cognizance of Offences and Territorial Jurisdiction",
        content: "The court shall take cognizance only upon a complaint in writing by the payee or holder in due course within one month of cause of action. Territorial jurisdiction lies where the branch of the bank where payee maintains account is situated (if cheque delivered for collection through payee's account).",
        fees: "Process fee and court stamps.",
        deadlines: "Within 30 days from expiry of 15-day notice period. Condonation of delay permissible under Section 142(1)(b) upon showing sufficient cause.",
        portal: "Judicial Magistrate Court having local jurisdiction over payee's home bank branch."
      }
    ]
  },
  {
    id: "doc-rti-act-2005",
    title: "Right to Information Act, 2005",
    category: "statute",
    tier: 1,
    authority: "Department of Personnel and Training (DoPT)",
    jurisdiction: "Public Authorities (Central and State)",
    publicationDate: "2005-06-21",
    effectiveDate: "2005-10-12",
    sections: [
      {
        sectionNumber: "Section 6",
        clause: "Clause (1)",
        pageNumber: 5,
        title: "Request for Obtaining Information",
        content: "A person who desires to obtain any information under this Act shall make a request in writing or through electronic means in English or Hindi or official language accompanying such fee as may be prescribed to the Central Public Information Officer (CPIO) or State Public Information Officer (SPIO). Applicant is not required to give reason for requesting information.",
        fees: "10 INR application fee (exempted for Below Poverty Line applicants).",
        deadlines: "Information must be provided within 30 days of receipt; or within 48 hours if information concerns life or liberty of a person.",
        portal: "RTI Online Portal (rtionline.gov.in) for Central Government authorities, or postal submission."
      },
      {
        sectionNumber: "Section 19",
        clause: "Clause (1) & (3)",
        pageNumber: 11,
        title: "Appeals: First Appeal and Second Appeal",
        content: "Any person who does not receive a decision within the specified time or is aggrieved by decision of CPIO may prefer a First Appeal within thirty days from expiry of such period to the First Appellate Authority (FAA). A Second Appeal lies before Central Information Commission (CIC) within ninety days from date on which decision should have been made.",
        fees: "Nil fee for First Appeal and Second Appeal under Central RTI Rules.",
        deadlines: "First Appeal: within 30 days from decision or expiry of 30-day response window. Second Appeal: within 90 days from First Appeal order.",
        portal: "RTI Online Portal (rtionline.gov.in) or Central Information Commission (cic.gov.in)."
      }
    ]
  }
];
