'use client';

import { useState, useEffect, useCallback } from 'react';

type FileType = 'PDF' | 'XLSX' | 'PNG' | 'DOCX';

interface DocFile {
  title: string;
  path: string;
  type: FileType;
}

interface SubFolder {
  name: string;
  files: DocFile[];
}

interface Folder {
  name: string;
  description?: string;
  files?: DocFile[];
  subfolders?: SubFolder[];
}

function getType(path: string): FileType {
  const ext = path.split('.').pop()?.toLowerCase();
  if (ext === 'xlsx') return 'XLSX';
  if (ext === 'png') return 'PNG';
  if (ext === 'docx') return 'DOCX';
  return 'PDF';
}

function f(path: string, title: string): DocFile {
  return { title, path, type: getType(path) };
}

const folders: Folder[] = [
  {
    name: 'CORPORATE — FORMATION',
    description: 'Incorporation, bylaws, EIN, state registrations',
    files: [
      f('/docs/corp/formation/corp-formation-certificate-of-incorporation.pdf', 'Certificate of Incorporation (as filed)'),
      f('/docs/corp/formation/corp-formation-bylaws.pdf', 'Bylaws'),
      f('/docs/corp/formation/corp-formation-action-by-sole-incorporator.pdf', 'Action by Sole Incorporator'),
      f('/docs/corp/formation/corp-formation-ein.pdf', 'EIN Assignment'),
      f('/docs/corp/formation/corp-formation-oklahoma-foreign-qualification.pdf', 'Oklahoma Foreign Corp Qualification'),
      f('/docs/corp/formation/corp-formation-delaware-good-standing.pdf', 'Delaware Certificate of Good Standing'),
    ],
  },
  {
    name: 'CORPORATE — GOVERNANCE',
    description: 'Board actions, resolutions, stockholder consents',
    files: [
      f('/docs/corp/governance/corp-governance-initial-board-action.pdf', 'Initial Board Action'),
      f('/docs/corp/governance/corp-governance-stockholder-consent-equity-plan.pdf', 'Stockholder Consent — Equity Plan'),
      f('/docs/corp/governance/corp-governance-board-consent-techstars.pdf', 'Board Consent — Techstars'),
      f('/docs/corp/governance/corp-governance-board-resolution-vehicle-lease.pdf', 'Board Resolution — Vehicle Lease'),
      f('/docs/corp/governance/corp-governance-resignation-mounsey.pdf', 'Officer Resignation — Mounsey'),
      f('/docs/corp/governance/corp-governance-cortado-audit-confirmation.pdf', 'Cortado Audit Confirmation'),
    ],
  },
  {
    name: 'CORPORATE — AGREEMENTS',
    description: 'Employee and founder agreements',
    subfolders: [
      {
        name: 'Confidential Information & Inventions (CIAA)',
        files: [
          f('/docs/corp/agreements/ciaa/corp-agreement-ciaa-colby-deweese.pdf', 'CIAA — Colby DeWeese'),
          f('/docs/corp/agreements/ciaa/corp-agreement-ciaa-caleb-lareau.pdf', 'CIAA — Caleb Lareau'),
          f('/docs/corp/agreements/ciaa/corp-agreement-ciaa-louis-mounsey.pdf', 'CIAA — Louis Mounsey'),
        ],
      },
      {
        name: 'Common Stock Purchase (CSPA)',
        files: [
          f('/docs/corp/agreements/cspa/corp-agreement-cspa-colby-deweese.pdf', 'CSPA — Colby DeWeese (9,800,000 shares)'),
          f('/docs/corp/agreements/cspa/corp-agreement-cspa-caleb-lareau.pdf', 'CSPA — Caleb Lareau (100,000 shares)'),
          f('/docs/corp/agreements/cspa/corp-agreement-cspa-louis-mounsey.pdf', 'CSPA — Louis Mounsey (100,000 shares)'),
        ],
      },
      {
        name: 'Indemnification Agreements',
        files: [
          f('/docs/corp/agreements/indemnification/corp-agreement-indemnification-colby-deweese.pdf', 'Indemnification — Colby DeWeese'),
          f('/docs/corp/agreements/indemnification/corp-agreement-indemnification-caleb-lareau.pdf', 'Indemnification — Caleb Lareau'),
          f('/docs/corp/agreements/indemnification/corp-agreement-indemnification-louis-mounsey.pdf', 'Indemnification — Louis Mounsey'),
        ],
      },
      {
        name: 'IP Assignment Agreements',
        files: [
          f('/docs/corp/agreements/ip-assignment/corp-agreement-ip-assignment-colby-deweese.pdf', 'IP Assignment — Colby DeWeese'),
          f('/docs/corp/agreements/ip-assignment/corp-agreement-ip-assignment-caleb-lareau.pdf', 'IP Assignment — Caleb Lareau'),
          f('/docs/corp/agreements/ip-assignment/corp-agreement-ip-assignment-louis-mounsey.pdf', 'IP Assignment — Louis Mounsey'),
          f('/docs/corp/agreements/ip-assignment/corp-agreement-ip-assignment-ok-to-de-transfer.pdf', 'IP Transfer — OK Corp → DE Corp'),
        ],
      },
    ],
  },
  {
    name: 'CORPORATE — INVESTMENTS',
    description: 'SAFEs, convertible instruments, cap table — $1.95M total',
    subfolders: [
      {
        name: 'SAFEs ($1,830,000)',
        files: [
          f('/docs/corp/invest/safe/corp-invest-safe-cortado-ventures-fund-ii.pdf', 'Cortado Ventures Fund II — $400,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-techstars-ventures.pdf', 'Techstars Ventures 2022 — $500,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-wavefunction-ventures.pdf', 'Wavefunction Ventures — $350,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-cortado-ventures-ssbci.pdf', 'Cortado Ventures SSBCI — $200,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-hurricane-ventures.pdf', 'Hurricane Ventures — $150,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-scissortail-ventures.pdf', 'Scissortail Ventures — $150,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-jeff-moore.pdf', 'Jeff Moore — $25,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-ryan-fathi.pdf', 'Ryan Fathi — $20,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-david-velasquez.pdf', 'David Velasquez — $15,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-tianyi-cai.pdf', 'Tianyi Cai — $10,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-beck-kloss.pdf', 'Beck Kloss — $5,000'),
          f('/docs/corp/invest/safe/corp-invest-safe-sam-walker.pdf', 'Sam Walker — $5,000'),
        ],
      },
      {
        name: 'Convertible Instruments ($120,000)',
        files: [
          f('/docs/corp/invest/convertible/corp-invest-convertible-note-techstars-accelerator.pdf', 'Convertible Note — Techstars ($100,000)'),
          f('/docs/corp/invest/convertible/corp-invest-convertible-equity-techstars-accelerator.pdf', 'Convertible Equity — Techstars ($20,000)'),
        ],
      },
      {
        name: 'Cap Table',
        files: [
          f('/docs/corp/invest/corp-invest-cap-table.xlsx', 'Cap Table'),
        ],
      },
    ],
  },
  {
    name: 'CORPORATE — INSURANCE',
    description: 'Active policies',
    files: [
      f('/docs/corp/insurance/corp-insurance-general-liability.pdf', 'General Liability Policy'),
      f('/docs/corp/insurance/corp-insurance-automobile.pdf', 'Automobile Policy'),
      f('/docs/corp/insurance/corp-insurance-workers-comp.pdf', 'Workers Compensation Policy'),
      f('/docs/corp/insurance/corp-insurance-consultant-liability.pdf', 'Consultant Liability Policy'),
    ],
  },
  {
    name: 'CORPORATE — TAX & FINANCIALS',
    description: 'Tax filings, franchise reports, financial statements',
    files: [
      f('/docs/corp/tax/corp-tax-financials-2025.xlsx', '2025 Financial Statements'),
      f('/docs/corp/tax/corp-tax-delaware-franchise-report-2025.pdf', 'Delaware Franchise Tax Report TY2025'),
      f('/docs/corp/tax/corp-tax-delaware-franchise-confirmation.pdf', 'Franchise Tax Filing Confirmation'),
    ],
  },
  {
    name: 'CORPORATE — FACILITIES',
    files: [
      f('/docs/corp/facilities/corp-facilities-lease-1820-se-22nd-okc.pdf', 'Facility Lease — 1820 SE 22nd St, OKC'),
    ],
  },
  {
    name: 'CORPORATE — INTELLECTUAL PROPERTY',
    description: 'Patents, IP strategy',
    files: [
      f('/docs/corp/ip/corp-ip-fortress-overview.pdf', 'IP Fortress Strategy'),
      f('/docs/corp/ip/corp-ip-patent-figures.pdf', 'Patent Figures'),
      f('/docs/corp/ip/corp-ip-patent-specification.pdf', 'Patent Specification'),
    ],
  },
  {
    name: 'CORPORATE — REGULATORY & 45V',
    description: 'GREET analysis, 45V compliance, PPA modeling',
    files: [
      f('/docs/corp/reg/corp-reg-greet-summary.pdf', 'GREET Analysis Summary'),
      f('/docs/corp/reg/corp-reg-lifecycle-ghg-analysis.pdf', 'Lifecycle GHG Analysis'),
      f('/docs/corp/reg/corp-reg-sensitivity-analysis.pdf', '45V Sensitivity Analysis'),
      f('/docs/corp/reg/corp-reg-45v-compliance-memo.pdf', '45V Compliance Memo'),
      f('/docs/corp/reg/corp-reg-45v-ppa-roi-analysis.pdf', 'PPA ROI Analysis'),
    ],
  },
  {
    name: 'CORPORATE — ORGANIZATION',
    files: [
      f('/docs/corp/org/corp-org-leadership-overview.pdf', 'Leadership & Org Structure'),
    ],
  },
  {
    name: 'FINANCIAL',
    description: 'Financial models, pricing reports',
    files: [
      f('/docs/fin/model/fin-model-seed-financial.xlsx', 'Seed Financial Model'),
      f('/docs/fin/model/fin-model-cap-table.xlsx', 'Cap Table'),
      f('/docs/fin/pricing/fin-pricing-platts-h2-report.pdf', 'Platts H2 Pricing Report'),
    ],
  },
  {
    name: 'ENGINEERING — SPECIFICATIONS',
    description: 'Technical documentation, roadmaps, analysis',
    files: [
      f('/docs/eng/spec/eng-spec-techno-economic-analysis.pdf', 'Techno-Economic Analysis (TEA)'),
      f('/docs/eng/spec/eng-spec-technology-overview.pdf', 'Technology Overview'),
      f('/docs/eng/spec/eng-spec-project-developer-guide.pdf', 'Project Developer Guide'),
      f('/docs/eng/spec/eng-spec-product-roadmap-brochure.pdf', 'Product Roadmap Brochure'),
      f('/docs/eng/spec/eng-spec-product-roadmap-technical.pdf', 'Product Roadmap — Technical'),
      f('/docs/eng/spec/eng-spec-block-flow-diagram.pdf', 'Block Flow Diagram'),
      f('/docs/eng/spec/eng-spec-circuit-efficiency-diagram.pdf', 'Circuit Efficiency Diagram'),
      f('/docs/eng/spec/eng-spec-electrolyzer-comparison.pdf', 'Electrolyzer Comparative Analysis'),
      f('/docs/eng/spec/eng-spec-maxwell-academic-draft.pdf', 'Maxwell Expansion — Academic Draft'),
      f('/docs/eng/spec/eng-spec-testing-framework.pdf', 'Testing Framework'),
      f('/docs/eng/spec/eng-spec-provisional-patent-efficiency.pdf', 'Provisional Patent — H2 Efficiency'),
    ],
  },
  {
    name: 'ENGINEERING — TESTING & DATA',
    files: [
      f('/docs/eng/test/eng-test-efficiency-calculations.xlsx', 'Efficiency Calculations'),
      f('/docs/eng/test/eng-test-sample-operating-data.xlsx', 'Sample Operating Data'),
      f('/docs/eng/test/eng-test-heat-material-balance.xlsx', 'Heat & Material Balance'),
      f('/docs/eng/test/eng-test-framework-comprehensive.pdf', 'Comprehensive Test Framework'),
    ],
  },
  {
    name: 'ENGINEERING — GRANTS',
    files: [
      f('/docs/eng/grant/eng-grant-doe-photoelectrolysis-concept.pdf', 'DOE Photoelectrolysis Concept'),
      f('/docs/eng/grant/eng-grant-resonantedge-power-electronics.pdf', 'ResonantEdge Power Electronics'),
      f('/docs/eng/grant/eng-grant-navy-sbir-n242.pdf', 'Navy SBIR N242-070'),
    ],
  },
  {
    name: 'PROJECTS — ZEECO ARC FEED PACKAGE',
    description: 'First commercial deployment engineering documents',
    files: [
      f('/docs/proj/feed/proj-feed-zeeco-package.pdf', 'FEED Package Transmittal'),
      f('/docs/proj/feed/proj-feed-zeeco-pfd.pdf', 'Process Flow Diagram'),
      f('/docs/proj/feed/proj-feed-zeeco-pid.pdf', 'P&ID Electrolyzer Skid'),
      f('/docs/proj/feed/proj-feed-zeeco-electrical.pdf', 'Electrical One-Line Diagram'),
      f('/docs/proj/feed/proj-feed-zeeco-general-arrangement.pdf', 'General Arrangement'),
    ],
  },
  {
    name: 'MARKET — RESEARCH',
    description: 'TAM/SAM analysis, competitive benchmarking, regional surveys',
    files: [
      f('/docs/mkt/research/mkt-research-tam-sam-som.pdf', 'TAM / SAM / SOM Analysis'),
      f('/docs/mkt/research/mkt-research-competitive-benchmarking.pdf', 'Competitive Benchmarking'),
      f('/docs/mkt/research/mkt-research-green-h2-landscape.pdf', 'Green H2 Market Landscape'),
      f('/docs/mkt/research/mkt-research-h2-north-america-trends.pdf', 'North America H2 Trends'),
      f('/docs/mkt/research/mkt-research-best-us-markets.pdf', 'Best U.S. Markets'),
      f('/docs/mkt/research/mkt-research-h2-okc-tulsa-survey.pdf', 'OKC/Tulsa Market Survey'),
      f('/docs/mkt/research/mkt-research-market-expansion-cost.pdf', 'Market Expansion & Cost Advantage'),
      f('/docs/mkt/research/mkt-research-investors-guide-45v.pdf', 'Investors Guide to 45V'),
      f('/docs/mkt/research/mkt-research-competitor-acquirer-overview.pdf', 'Competitor & Acquirer Overview'),
      f('/docs/mkt/research/mkt-research-go-to-market-branding.pdf', 'Go-To-Market & Branding'),
      f('/docs/mkt/research/mkt-research-public-master-plan.pdf', 'Public Master Plan'),
      f('/docs/mkt/research/mkt-research-nsf-icorps-presentation.pdf', 'NSF I-Corps Presentation'),
      f('/docs/mkt/research/mkt-research-ocast-innovation-plan.pdf', 'OCAST Innovation Plan'),
    ],
  },
  {
    name: 'MARKET — CASE STUDIES',
    description: 'Independent validation and market analysis',
    files: [
      f('/docs/mkt/case/mkt-case-ou-iccew-report.pdf', 'OU I-CCEW Case Study'),
      f('/docs/mkt/case/mkt-case-ou-iccew-financial-model.xlsx', 'OU Case Study Financial Model'),
      f('/docs/mkt/case/mkt-case-onsite-cost-advantage.pdf', 'On-Site Cost Advantage'),
      f('/docs/mkt/case/mkt-case-h2-ai-datacenters.pdf', 'H2 for AI Datacenters'),
      f('/docs/mkt/case/mkt-case-h2-hospitals.pdf', 'H2 for Hospitals'),
      f('/docs/mkt/case/mkt-case-h2-transport-industry.pdf', 'H2 Transport & Industry'),
    ],
  },
];

interface Section {
  name: string;
  folders: Folder[];
}

const sections: Section[] = [
  { name: 'CORPORATE', folders: folders.filter(f => f.name.startsWith('CORPORATE')) },
  { name: 'FINANCIAL', folders: folders.filter(f => f.name === 'FINANCIAL') },
  { name: 'ENGINEERING', folders: folders.filter(f => f.name.startsWith('ENGINEERING')) },
  { name: 'PROJECTS', folders: folders.filter(f => f.name.startsWith('PROJECTS')) },
  { name: 'MARKET', folders: folders.filter(f => f.name.startsWith('MARKET')) },
];

function getAllFiles(): DocFile[] {
  const all: DocFile[] = [];
  folders.forEach(folder => {
    folder.files?.forEach(file => all.push(file));
    folder.subfolders?.forEach(sf => sf.files.forEach(file => all.push(file)));
  });
  return all;
}

const totalFiles = getAllFiles().length;

// ── Inline Document Viewer ──

function DocumentViewer({ file, allFiles, onClose, onNavigate }: {
  file: DocFile;
  allFiles: DocFile[];
  onClose: () => void;
  onNavigate: (file: DocFile) => void;
}) {
  const currentIndex = allFiles.findIndex(f => f.path === file.path);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < allFiles.length - 1;
  const isPDF = file.type === 'PDF';
  const isPNG = file.type === 'PNG';

  const goPrev = useCallback(() => {
    if (canPrev) onNavigate(allFiles[currentIndex - 1]);
  }, [canPrev, currentIndex, allFiles, onNavigate]);

  const goNext = useCallback(() => {
    if (canNext) onNavigate(allFiles[currentIndex + 1]);
  }, [canNext, currentIndex, allFiles, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext, onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[#0a0a0f]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#12121a] px-4 py-2 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[0.55rem] font-bold tracking-[0.1em] px-1.5 py-0.5 rounded text-[#ff6b35]"
            style={{ border: '1px solid rgba(255,107,53,0.3)' }}>
            {file.type}
          </span>
          <span className="text-sm text-white/80 truncate">{file.title}</span>
          <span className="text-[0.55rem] text-white/20 shrink-0">{currentIndex + 1} / {allFiles.length}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={goPrev} disabled={!canPrev}
            className="px-2 py-1 text-xs text-white/40 hover:text-white disabled:opacity-20 transition-colors"
            title="Previous (←)">
            ← Prev
          </button>
          <button onClick={goNext} disabled={!canNext}
            className="px-2 py-1 text-xs text-white/40 hover:text-white disabled:opacity-20 transition-colors"
            title="Next (→)">
            Next →
          </button>
          <a href={file.path} target="_blank" rel="noopener noreferrer"
            className="px-2 py-1 text-xs text-[#ff6b35]/60 hover:text-[#ff6b35] transition-colors">
            Open ↗
          </a>
          <button onClick={onClose}
            className="px-2 py-1 text-xs text-white/40 hover:text-white transition-colors"
            title="Close (Esc)">
            ✕
          </button>
        </div>
      </div>

      {/* Document content */}
      <div className="flex-1 overflow-hidden">
        {isPDF ? (
          <iframe src={`${file.path}#toolbar=1`} className="w-full h-full border-0" title={file.title} />
        ) : isPNG ? (
          <div className="w-full h-full flex items-center justify-center p-8 overflow-auto">
            <img src={file.path} alt={file.title} className="max-w-full max-h-full object-contain" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/40 text-sm mb-4">{file.type} files cannot be previewed inline</p>
              <a href={file.path} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-[#ff6b35] border border-[#ff6b35]/30 rounded hover:bg-[#ff6b35]/10 transition-colors">
                Download {file.title}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Components ──

function FileTypeIcon({ type }: { type: FileType }) {
  return (
    <span className="text-[0.55rem] font-bold tracking-[0.1em] px-1.5 py-0.5 rounded text-[#ff6b35] shrink-0"
      style={{ border: '1px solid rgba(255,107,53,0.25)' }}>
      {type}
    </span>
  );
}

function FileRow({ file, onClick }: { file: DocFile; onClick: (f: DocFile) => void }) {
  return (
    <button onClick={() => onClick(file)}
      className="group flex items-center justify-between w-full py-2.5 px-3 -mx-3 rounded transition-all hover:bg-white/[0.04] text-left">
      <div className="flex items-center gap-3 min-w-0">
        <FileTypeIcon type={file.type} />
        <span className="text-[0.85rem] text-white/80 group-hover:text-white truncate transition-colors">
          {file.title}
        </span>
      </div>
      <span className="text-[0.6rem] text-[#ff6b35]/0 group-hover:text-[#ff6b35]/60 transition-all shrink-0 ml-3">
        VIEW
      </span>
    </button>
  );
}

function SubFolderSection({ subfolder, onFileClick }: { subfolder: SubFolder; onFileClick: (f: DocFile) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 w-full py-2.5 text-left group">
        <span className="text-xs text-[#ff6b35]/40 transition-transform shrink-0"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
        <span className="text-[0.8rem] font-semibold text-white/70 group-hover:text-white/90 transition-colors">
          {subfolder.name}
        </span>
        <span className="text-[0.55rem] text-white/30">{subfolder.files.length}</span>
      </button>
      {open && (
        <div className="ml-5 border-l border-white/[0.06] pl-4">
          {subfolder.files.map(file => <FileRow key={file.path} file={file} onClick={onFileClick} />)}
        </div>
      )}
    </div>
  );
}

function FolderSection({ folder, onFileClick }: { folder: Folder; onFileClick: (f: DocFile) => void }) {
  const [open, setOpen] = useState(false);
  const fileCount = (folder.files?.length || 0) + (folder.subfolders?.reduce((s, sf) => s + sf.files.length, 0) || 0);
  // Strip the "CORPORATE — " / "ENGINEERING — " prefix since the section provides context
  const displayName = folder.name.includes(' — ') ? folder.name.split(' — ')[1] : folder.name;

  return (
    <div className="border-b border-white/[0.04]">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 px-2 text-left group">
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-[#ff6b35]/40 transition-transform shrink-0"
            style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
          <div>
            <span className="text-[0.8rem] font-semibold text-white/80 group-hover:text-white transition-colors">
              {displayName}
            </span>
            {folder.description && (
              <p className="text-[0.65rem] text-white/35 mt-0.5">{folder.description}</p>
            )}
          </div>
        </div>
        <span className="text-[0.55rem] text-white/20 shrink-0">{fileCount}</span>
      </button>
      {open && (
        <div className="pb-3 px-8">
          {folder.files?.map(file => <FileRow key={file.path} file={file} onClick={onFileClick} />)}
          {folder.subfolders?.map(sf => <SubFolderSection key={sf.name} subfolder={sf} onFileClick={onFileClick} />)}
        </div>
      )}
    </div>
  );
}

function SectionGroup({ section, onFileClick }: { section: Section; onFileClick: (f: DocFile) => void }) {
  const [open, setOpen] = useState(false);
  const totalCount = section.folders.reduce((sum, folder) => {
    return sum + (folder.files?.length || 0) + (folder.subfolders?.reduce((s, sf) => s + sf.files.length, 0) || 0);
  }, 0);

  return (
    <div className="mb-1">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 px-1 text-left group border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#ff6b35] transition-transform shrink-0"
            style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
          <span className="text-[0.85rem] font-bold tracking-[0.12em] text-white group-hover:text-[#ff6b35] transition-colors">
            {section.name}
          </span>
        </div>
        <span className="text-[0.6rem] text-white/25 shrink-0">{totalCount} files</span>
      </button>
      {open && (
        <div className="ml-5 border-l border-[#ff6b35]/10">
          {section.folders.map(folder => <FolderSection key={folder.name} folder={folder} onFileClick={onFileClick} />)}
        </div>
      )}
    </div>
  );
}

// ── Page ──

export default function DocumentsPage() {
  const [viewingFile, setViewingFile] = useState<DocFile | null>(null);
  const allFiles = getAllFiles();

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Inline viewer overlay */}
      {viewingFile && (
        <DocumentViewer
          file={viewingFile}
          allFiles={allFiles}
          onClose={() => setViewingFile(null)}
          onNavigate={setViewingFile}
        />
      )}

      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 text-[0.7rem] tracking-[0.2em] text-[#ff6b35]">
            ┌─── DOCUMENT LIBRARY ───┐
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight">
            Data Room Documents
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/50">
            {totalFiles} documents organized for diligence. Click any file to preview inline — use arrow keys to navigate between documents, Esc to close.
          </p>
        </div>
      </section>

      {/* Readme callout */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="border-l-[3px] border-[#ff6b35] bg-[#ff6b35]/[0.04] px-5 py-4 mb-6"
          style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
          <p className="text-sm text-white/70 leading-relaxed">
            <span className="text-[#ff6b35] font-bold">Delaware C-Corp, fully documented.</span> Bylaws, board resolutions, all investment agreements (14 instruments, $1.95M), IP assignments, insurance, tax filings, and engineering documentation. All founder agreements executed via Cooley LLP. For additional materials, contact{' '}
            <a href="mailto:colby@tobe.energy" className="text-[#ff6b35]/70 hover:text-[#ff6b35]">colby@tobe.energy</a>.
          </p>
        </div>
      </div>

      {/* Folder tree */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        {sections.map(section => <SectionGroup key={section.name} section={section} onFileClick={setViewingFile} />)}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl text-center">
          <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
            {`TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
