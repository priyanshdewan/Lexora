# Lexora: Procedural Legal Intelligence Platform

Lexora is an institutional procedural legal intelligence system engineered with Retrieval-Augmented Generation (RAG). It synthesizes complex statutory codes, procedural rules, and gazette notifications into structured, actionable legal dossiers with zero hallucination.

---

## Key Capabilities

- **Factual Legal Query Processing**: Automatically parses dispute narratives, extracts statutory objectives, maps jurisdiction, and classifies matter categories (consumer disputes, cheque dishonor, tenancy eviction, administrative appeals, commercial recovery, unpaid remuneration).
- **6-Tier Authority Hierarchy**: Automatically ranks legal authority according to institutional precedence:
  - Tier 1: Parliamentary / Primary Legislative Acts
  - Tier 2: Statutory Procedural Rules
  - Tier 3: Government Gazette Notifications and Circulars
  - Tier 4: Administrative Regulatory Guidelines
  - Tier 5: Prescribed Statutory Forms and Affidavits
  - Tier 6: High Court and Forum Practice Directions
- **Statutory Conflict Detection**: Scans overlapping legal sources to detect and highlight timeline or requirement discrepancies instead of guessing.
- **10-Step Structured Procedural Dossier**: Produces exhaustive step cards with actions, legal justifications, competent filing registries, prescribed court fees, and limitation deadlines.
- **Interactive Evidence Checklist**: Dynamic, actionable evidence checklist indicating required document form (original, certified copy, attested photocopy), evidentiary purpose, and submission destination.
- **Strict Hallucination Prevention Firewall**: Operates on a verified statutory corpus. When provisions are missing or unverifiable, the system enforces a strict fallback: *"I could not find sufficient information in the provided legal documents to verify this requirement."*
- **Split-Pane Agent Workspace**: Real-time agent thought stream, live millisecond retrieval metrics, and multi-tab dossier inspector.
- **Knowledge Base & Corpus Uploader**: Comes pre-indexed with 6 foundational statutory codes and supports indexing custom acts and notifications.
- **Magic Bento Interactive Interface**: Interactive spotlight overlays, reactive border glow, GSAP 3D perspective tilt, magnetic cursor tracking, and shockwave click feedback.
- **Dual Mode Palette**: Dark mode and light mode with OS preference detection and local storage persistence.

---

## Tech Stack

- **Frontend**: React 19, Vite 6
- **Styling**: Tailwind CSS v4
- **Animation & Physics**: GSAP 3, Anime.js 4, Motion 12
- **Iconography**: Lucide React (vector SVG)
- **Tooling**: Node.js, PostCSS

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone repository
git clone https://github.com/priyanshdewan/Lexora.git
cd Lexora

# Install dependencies
npm install
```

### Development
```bash
# Start local development server
npm run dev
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview -- --port 3000
```

---

## Compliance and Design Standards

- **Color Architecture**: Institutional slate, navy, and azure blue palette. Strict prohibition of purple gradients.
- **Geometry**: Sharp geometric elements (`rounded-md` 4px radius). Zero pill-shaped buttons.
- **Iconography**: Crisp Lucide vector SVGs. Zero emoji icons.
- **Typography & Punctuation**: Clean system typography. Zero Unicode em dashes (\u2014). Hyphens and colons used exclusively.
- **Data Integrity**: Real operational telemetry only. Zero vanity metrics, fake counters, or AI watermarks.

---

## License

This project is licensed under the MIT License.
