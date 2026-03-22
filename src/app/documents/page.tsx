'use client';

type Sensitivity = 'INVESTOR-READY' | 'CONFIDENTIAL';
type FileType = 'PDF' | 'XLSX' | 'PNG';

interface Document {
  title: string;
  path: string;
  type: FileType;
  sensitivity: Sensitivity;
}

interface Category {
  name: string;
  docs: Document[];
}

function getFileType(filename: string): FileType {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext === 'xlsx') return 'XLSX';
  if (ext === 'png') return 'PNG';
  return 'PDF';
}

function doc(path: string, sensitivity: Sensitivity, title: string): Document {
  const filename = path.split('/').pop() || '';
  return { title, path, type: getFileType(filename), sensitivity };
}

const categories: Category[] = [
  {
    name: 'ENGINEERING — SPECIFICATIONS',
    docs: [
      doc('/docs/eng/spec/eng-spec-techno-economic-analysis.pdf', 'INVESTOR-READY', 'Techno-Economic Analysis (TEA)'),
      doc('/docs/eng/spec/eng-spec-technology-overview.pdf', 'INVESTOR-READY', 'Technology Overview'),
      doc('/docs/eng/spec/eng-spec-project-developer-guide.pdf', 'INVESTOR-READY', 'Project Developer Guide'),
      doc('/docs/eng/spec/eng-spec-product-roadmap-brochure.pdf', 'INVESTOR-READY', 'Product Roadmap Brochure'),
      doc('/docs/eng/spec/eng-spec-product-roadmap-technical.pdf', 'INVESTOR-READY', 'Product Roadmap — Technical'),
      doc('/docs/eng/spec/eng-spec-block-flow-diagram.pdf', 'INVESTOR-READY', 'Block Flow Diagram'),
      doc('/docs/eng/spec/eng-spec-circuit-efficiency-diagram.pdf', 'INVESTOR-READY', 'Circuit Efficiency Testing Diagram'),
      doc('/docs/eng/spec/eng-spec-electrolyzer-comparison.pdf', 'INVESTOR-READY', 'Electrolyzer Comparative Analysis'),
      doc('/docs/eng/spec/eng-spec-maxwell-academic-draft.pdf', 'INVESTOR-READY', 'Maxwell Expansion — Academic Draft'),
      doc('/docs/eng/spec/eng-spec-testing-framework.pdf', 'INVESTOR-READY', 'Testing Framework'),
      doc('/docs/eng/spec/eng-spec-provisional-patent-efficiency.pdf', 'INVESTOR-READY', 'Provisional Patent — H2 Efficiency'),
    ],
  },
  {
    name: 'ENGINEERING — TESTING & DATA',
    docs: [
      doc('/docs/eng/test/eng-test-efficiency-calculations.xlsx', 'CONFIDENTIAL', 'Efficiency Calculations'),
      doc('/docs/eng/test/eng-test-sample-operating-data.xlsx', 'CONFIDENTIAL', 'Sample Operating Data'),
      doc('/docs/eng/test/eng-test-heat-material-balance.xlsx', 'CONFIDENTIAL', 'Heat & Material Balance'),
      doc('/docs/eng/test/eng-test-framework-comprehensive.pdf', 'CONFIDENTIAL', 'Comprehensive Test Framework'),
    ],
  },
  {
    name: 'ENGINEERING — FIGURES',
    docs: [
      doc('/docs/eng/fig/eng-fig-showroom-enhanced.png', 'INVESTOR-READY', 'Showroom Render'),
      doc('/docs/eng/fig/eng-fig-electrolyzer-detail.png', 'INVESTOR-READY', 'Electrolyzer Detail'),
      doc('/docs/eng/fig/eng-fig-comparison-pem.png', 'INVESTOR-READY', 'PEM Comparison'),
      doc('/docs/eng/fig/eng-fig-sankey-efficiency.png', 'INVESTOR-READY', 'Sankey Efficiency Diagram'),
      doc('/docs/eng/fig/eng-fig-commercial-deployment.png', 'INVESTOR-READY', 'Commercial Deployment'),
      doc('/docs/eng/fig/eng-fig-thermal-comparison.png', 'INVESTOR-READY', 'Thermal Comparison'),
      doc('/docs/eng/fig/eng-fig-energy-density.png', 'INVESTOR-READY', 'Energy Density'),
      doc('/docs/eng/fig/eng-fig-cost-trajectory.png', 'INVESTOR-READY', 'Cost Trajectory'),
      doc('/docs/eng/fig/eng-fig-electrolyzer-comparison.png', 'INVESTOR-READY', 'Electrolyzer Comparison'),
      doc('/docs/eng/fig/eng-fig-hydrogen-ladder.png', 'INVESTOR-READY', 'Hydrogen Ladder'),
    ],
  },
  {
    name: 'ENGINEERING — GRANTS',
    docs: [
      doc('/docs/eng/grant/eng-grant-doe-photoelectrolysis-concept.pdf', 'INVESTOR-READY', 'DOE Photoelectrolysis Concept Paper'),
      doc('/docs/eng/grant/eng-grant-resonantedge-power-electronics.pdf', 'INVESTOR-READY', 'ResonantEdge Power Electronics'),
      doc('/docs/eng/grant/eng-grant-navy-sbir-n242.pdf', 'INVESTOR-READY', 'Navy SBIR N242-070'),
    ],
  },
  {
    name: 'FINANCIAL',
    docs: [
      doc('/docs/fin/model/fin-model-seed-financial.xlsx', 'CONFIDENTIAL', 'Seed Financial Model'),
      doc('/docs/fin/model/fin-model-cap-table.xlsx', 'CONFIDENTIAL', 'Cap Table'),
      doc('/docs/fin/pricing/fin-pricing-platts-h2-report.pdf', 'CONFIDENTIAL', 'Platts H2 Pricing Report'),
    ],
  },
  {
    name: 'PROJECTS — ZEECO ARC FEED PACKAGE',
    docs: [
      doc('/docs/proj/feed/proj-feed-zeeco-package.pdf', 'INVESTOR-READY', 'FEED Package Transmittal'),
      doc('/docs/proj/feed/proj-feed-zeeco-pfd.pdf', 'INVESTOR-READY', 'Process Flow Diagram'),
      doc('/docs/proj/feed/proj-feed-zeeco-pid.pdf', 'INVESTOR-READY', 'P&ID Electrolyzer Skid'),
      doc('/docs/proj/feed/proj-feed-zeeco-electrical.pdf', 'INVESTOR-READY', 'Electrical One-Line Diagram'),
      doc('/docs/proj/feed/proj-feed-zeeco-general-arrangement.pdf', 'INVESTOR-READY', 'General Arrangement'),
    ],
  },
  {
    name: 'MARKET — RESEARCH',
    docs: [
      doc('/docs/mkt/research/mkt-research-tam-sam-som.pdf', 'INVESTOR-READY', 'TAM / SAM / SOM Analysis'),
      doc('/docs/mkt/research/mkt-research-competitive-benchmarking.pdf', 'INVESTOR-READY', 'Competitive Benchmarking'),
      doc('/docs/mkt/research/mkt-research-green-h2-landscape.pdf', 'INVESTOR-READY', 'Green H2 Market Landscape'),
      doc('/docs/mkt/research/mkt-research-h2-north-america-trends.pdf', 'INVESTOR-READY', 'North America H2 Trends'),
      doc('/docs/mkt/research/mkt-research-best-us-markets.pdf', 'INVESTOR-READY', 'Best U.S. Markets for Green H2'),
      doc('/docs/mkt/research/mkt-research-h2-okc-tulsa-survey.pdf', 'INVESTOR-READY', 'OKC/Tulsa Market Survey'),
      doc('/docs/mkt/research/mkt-research-market-expansion-cost.pdf', 'INVESTOR-READY', 'Market Expansion & Cost Advantage'),
      doc('/docs/mkt/research/mkt-research-investors-guide-45v.pdf', 'INVESTOR-READY', 'Investors Guide to 45V'),
      doc('/docs/mkt/research/mkt-research-competitor-acquirer-overview.pdf', 'INVESTOR-READY', 'Competitor & Acquirer Overview'),
      doc('/docs/mkt/research/mkt-research-go-to-market-branding.pdf', 'INVESTOR-READY', 'Go-To-Market & Branding'),
      doc('/docs/mkt/research/mkt-research-public-master-plan.pdf', 'INVESTOR-READY', 'Public Master Plan'),
      doc('/docs/mkt/research/mkt-research-nsf-icorps-presentation.pdf', 'INVESTOR-READY', 'NSF I-Corps Final Presentation'),
      doc('/docs/mkt/research/mkt-research-ocast-innovation-plan.pdf', 'INVESTOR-READY', 'OCAST Innovation Plan'),
    ],
  },
  {
    name: 'MARKET — CASE STUDIES',
    docs: [
      doc('/docs/mkt/case/mkt-case-ou-iccew-report.pdf', 'INVESTOR-READY', 'OU I-CCEW Case Study'),
      doc('/docs/mkt/case/mkt-case-ou-iccew-financial-model.xlsx', 'INVESTOR-READY', 'OU Case Study Financial Model'),
      doc('/docs/mkt/case/mkt-case-onsite-cost-advantage.pdf', 'INVESTOR-READY', 'On-Site Cost Advantage'),
      doc('/docs/mkt/case/mkt-case-h2-ai-datacenters.pdf', 'INVESTOR-READY', 'H2 for AI Datacenters'),
      doc('/docs/mkt/case/mkt-case-h2-hospitals.pdf', 'INVESTOR-READY', 'H2 for Hospitals'),
      doc('/docs/mkt/case/mkt-case-h2-transport-industry.pdf', 'INVESTOR-READY', 'H2 Transport & Industry'),
    ],
  },
  {
    name: 'CORPORATE — INTELLECTUAL PROPERTY',
    docs: [
      doc('/docs/corp/ip/corp-ip-fortress-overview.pdf', 'CONFIDENTIAL', 'IP Fortress Strategy'),
      doc('/docs/corp/ip/corp-ip-patent-figures.pdf', 'CONFIDENTIAL', 'Patent Figures'),
      doc('/docs/corp/ip/corp-ip-patent-specification.pdf', 'CONFIDENTIAL', 'Patent Specification'),
    ],
  },
  {
    name: 'CORPORATE — ORGANIZATION',
    docs: [
      doc('/docs/corp/org/corp-org-leadership-overview.pdf', 'INVESTOR-READY', 'Leadership & Org Structure'),
    ],
  },
  {
    name: 'CORPORATE — REGULATORY & 45V',
    docs: [
      doc('/docs/corp/reg/corp-reg-greet-summary.pdf', 'INVESTOR-READY', 'GREET Analysis Summary'),
      doc('/docs/corp/reg/corp-reg-lifecycle-ghg-analysis.pdf', 'INVESTOR-READY', 'Lifecycle GHG Analysis'),
      doc('/docs/corp/reg/corp-reg-sensitivity-analysis.pdf', 'INVESTOR-READY', '45V Sensitivity Analysis'),
      doc('/docs/corp/reg/corp-reg-45v-compliance-memo.pdf', 'INVESTOR-READY', '45V Compliance Memo'),
      doc('/docs/corp/reg/corp-reg-45v-ppa-roi-analysis.pdf', 'INVESTOR-READY', 'PPA ROI Analysis'),
    ],
  },
];

const totalDocs = categories.reduce((sum, cat) => sum + cat.docs.length, 0);

const fileTypeConfig: Record<FileType, { color: string; bg: string }> = {
  PDF: { color: '#ff4444', bg: 'rgba(255, 68, 68, 0.12)' },
  XLSX: { color: '#ff6b35', bg: 'rgba(0, 255, 136, 0.12)' },
  PNG: { color: '#4488ff', bg: 'rgba(68, 136, 255, 0.12)' },
};

function FileTypeBadge({ type }: { type: FileType }) {
  const config = fileTypeConfig[type];
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[0.6rem] font-bold tracking-wider"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {type}
    </span>
  );
}

function SensitivityBadge({ sensitivity }: { sensitivity: Sensitivity }) {
  const isConfidential = sensitivity === 'CONFIDENTIAL';
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[0.55rem] font-medium tracking-wider"
      style={{
        color: isConfidential ? '#ff6b35' : '#ff6b35',
        backgroundColor: isConfidential ? 'rgba(255, 107, 53, 0.12)' : 'rgba(0, 255, 136, 0.10)',
        border: `1px solid ${isConfidential ? 'rgba(255, 107, 53, 0.25)' : 'rgba(0, 255, 136, 0.20)'}`,
      }}
    >
      {sensitivity}
    </span>
  );
}

function DocumentCard({ doc }: { doc: Document }) {
  const borderColor = fileTypeConfig[doc.type].color;
  return (
    <a
      href={doc.path}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded border border-white/[0.06] transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02]"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderLeft: `3px solid ${borderColor}`,
      }}
    >
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <FileTypeBadge type={doc.type} />
          <SensitivityBadge sensitivity={doc.sensitivity} />
        </div>
        <h3 className="mb-1.5 font-mono text-sm font-bold text-white/90 group-hover:text-white transition-colors">
          {doc.title}
        </h3>
        <span className="font-mono text-[0.6rem] text-[#ff6b35]/50 opacity-0 transition-opacity group-hover:opacity-100">
          OPEN
        </span>
      </div>
    </a>
  );
}

function CategorySection({ category }: { category: Category }) {
  const hasConfidential = category.docs.some((d) => d.sensitivity === 'CONFIDENTIAL');
  return (
    <section className="mb-12">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h2 className="font-mono text-xs font-bold tracking-[0.12em] text-[#c0c0c8] uppercase">
            {category.name}
          </h2>
          <div className="flex-1 border-b border-white/[0.06]" />
          <span className="font-mono text-[0.55rem] text-white/20">
            {category.docs.length} {category.docs.length === 1 ? 'file' : 'files'}
          </span>
          {hasConfidential && (
            <span className="font-mono text-[0.5rem] tracking-wider text-[#ff6b35]/60">
              CONFIDENTIAL
            </span>
          )}
        </div>
      </div>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {category.docs.map((d) => (
          <DocumentCard key={d.path} doc={d} />
        ))}
      </div>
    </section>
  );
}

export default function DocumentsPage() {
  return (
    <div className="min-h-screen font-mono" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <h1 className="mb-4 text-2xl font-bold tracking-[0.1em] text-[#c0c0c8] uppercase sm:text-3xl font-mono">
            Document Library
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/40 font-mono">
            {totalDocs} documents across {categories.length} categories. Engineering drawings,
            financial models, market research, and regulatory analysis.
          </p>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: `${totalDocs}`, label: 'Documents' },
            { value: `${categories.length}`, label: 'Categories' },
            { value: 'COMPLETE', label: 'FEED Package' },
            { value: 'MAR 2026', label: 'TEA Updated' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded border border-white/[0.06] px-4 py-3"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
            >
              <div className="font-mono text-lg font-bold text-[#ff6b35]">{stat.value}</div>
              <div className="font-mono text-[0.6rem] tracking-[0.1em] text-white/30 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {categories.map((category) => (
          <CategorySection key={category.name} category={category} />
        ))}

        <div className="mt-16 border-t border-white/[0.06] pt-8">
          <p className="text-center font-mono text-[0.65rem] leading-relaxed text-white/25">
            Contact{' '}
            <a
              href="mailto:colby@tobe.energy"
              className="text-[#ff6b35]/60 transition-colors hover:text-[#ff6b35]"
            >
              colby@tobe.energy
            </a>{' '}
            for additional materials
          </p>
        </div>
      </div>
    </div>
  );
}
