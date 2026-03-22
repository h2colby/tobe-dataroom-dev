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
    name: 'OVERVIEW & TEA',
    docs: [
      doc('/docs/overview/Tobe_Energy_TEA_Investor_Ready_March_2026.pdf', 'INVESTOR-READY', 'TEA Investor Ready (March 2026)'),
      doc('/docs/overview/tobe-technology-overview-v1.0.pdf', 'INVESTOR-READY', 'Technology Overview'),
      doc('/docs/overview/Tobe_TEA_Narrative_v1.pdf', 'INVESTOR-READY', 'TEA Narrative'),
    ],
  },
  {
    name: 'FINANCIAL MODELS',
    docs: [
      doc('/docs/financial/Tobe_Energy_Financial_Model_FINAL.xlsx', 'CONFIDENTIAL', 'Financial Model (Final)'),
      doc('/docs/financial/Tobe_Energy_Financial_Model_v853.xlsx', 'CONFIDENTIAL', 'Financial Model v8.5.3'),
      doc('/docs/financial/Tobe_Energy_Cap_Table.xlsx', 'CONFIDENTIAL', 'Cap Table'),
      doc('/docs/financial/FIN_PLATTS_H2Pricing_TechReport_v2.pdf', 'CONFIDENTIAL', 'Platts H2 Pricing Tech Report'),
    ],
  },
  {
    name: 'ZEECO ARC FEED PACKAGE',
    docs: [
      doc('/docs/engineering/zeeco-arc/TOBE-FEED-PKG-001.pdf', 'INVESTOR-READY', 'FEED Package Transmittal'),
      doc('/docs/engineering/zeeco-arc/TOBE-PFD-001.pdf', 'INVESTOR-READY', 'Process Flow Diagram'),
      doc('/docs/engineering/zeeco-arc/TOBE-PID-001.pdf', 'INVESTOR-READY', 'P&ID Electrolyzer Skid'),
      doc('/docs/engineering/zeeco-arc/TOBE-EL-001.pdf', 'INVESTOR-READY', 'Electrical One-Line Diagram'),
      doc('/docs/engineering/zeeco-arc/TOBE-GA-001.pdf', 'INVESTOR-READY', 'General Arrangement'),
    ],
  },
  {
    name: 'ENGINEERING SPECIFICATIONS',
    docs: [
      doc('/docs/engineering/specifications/tobe-project-developer-guide-v1.1.pdf', 'INVESTOR-READY', 'Project Developer Guide'),
      doc('/docs/engineering/specifications/ENG_BlockFlowDiagram_Final_v2.pdf', 'INVESTOR-READY', 'Block Flow Diagram (Final)'),
      doc('/docs/engineering/specifications/ENG_Circuit_Efficiency_Testing_Diagram_v2.pdf', 'INVESTOR-READY', 'Circuit Efficiency Testing Diagram'),
      doc('/docs/engineering/specifications/ENG_ComparativeAnalysis_TobeElectrolyzer_v2.pdf', 'INVESTOR-READY', 'Comparative Analysis Tobe Electrolyzer'),
      doc('/docs/engineering/specifications/ENG_Expanding_Maxwell_Draft_AcademicPub_v2.pdf', 'INVESTOR-READY', 'Expanding Maxwell Academic Publication Draft'),
      doc('/docs/engineering/specifications/ENG_ProductRoadmap_Brochure_v2.pdf', 'INVESTOR-READY', 'Product Roadmap Brochure'),
      doc('/docs/engineering/specifications/ENG_Product_Roadmap_and_Technical_Overview_v2.pdf', 'INVESTOR-READY', 'Product Roadmap & Technical Overview'),
      doc('/docs/engineering/specifications/ENG_Provisional_Patent_Advanced_H2_Efficiency_v2.pdf', 'INVESTOR-READY', 'Provisional Patent Advanced H2 Efficiency'),
      doc('/docs/engineering/specifications/ENG_TestingFramework_ComprehensiveEfficiency_v2.pdf', 'INVESTOR-READY', 'Testing Framework Comprehensive Efficiency'),
      doc('/docs/engineering/specifications/ENG_Tobe Energy-IP Fortress_v2.pdf', 'INVESTOR-READY', 'IP Fortress Strategy'),
      doc('/docs/engineering/specifications/01_showroom_enhanced.png', 'INVESTOR-READY', 'Showroom Render Enhanced'),
      doc('/docs/engineering/specifications/02_electrolyzer_detail.png', 'INVESTOR-READY', 'Electrolyzer Detail'),
      doc('/docs/engineering/specifications/03_comparison_pem.png', 'INVESTOR-READY', 'PEM Comparison'),
      doc('/docs/engineering/specifications/04_sankey_efficiency.png', 'INVESTOR-READY', 'Sankey Efficiency Diagram'),
      doc('/docs/engineering/specifications/05_commercial_deployment.png', 'INVESTOR-READY', 'Commercial Deployment'),
      doc('/docs/engineering/specifications/06_thermal_comparison.png', 'INVESTOR-READY', 'Thermal Comparison'),
      doc('/docs/engineering/specifications/fig_1_3_energy_density.png', 'INVESTOR-READY', 'Figure 1.3 Energy Density'),
      doc('/docs/engineering/specifications/fig_2_15_cost_trajectory.png', 'INVESTOR-READY', 'Figure 2.15 Cost Trajectory'),
      doc('/docs/engineering/specifications/fig_2_7_electrolyzer_comparison.png', 'INVESTOR-READY', 'Figure 2.7 Electrolyzer Comparison'),
      doc('/docs/engineering/specifications/fig_3_1_hydrogen_ladder.png', 'INVESTOR-READY', 'Figure 3.1 Hydrogen Ladder'),
    ],
  },
  {
    name: 'TESTING & EFFICIENCY DATA',
    docs: [
      doc('/docs/engineering/testing/ENG_EfficiencyCalculations.xlsx', 'CONFIDENTIAL', 'Efficiency Calculations'),
      doc('/docs/engineering/testing/ENG_PreCommit_SampleOperatingData.xlsx', 'CONFIDENTIAL', 'Pre-Commissioning Sample Operating Data'),
      doc('/docs/engineering/testing/ENG_TestingFramework_ComprehensiveEfficiency_v2.pdf', 'CONFIDENTIAL', 'Testing Framework Comprehensive Efficiency'),
    ],
  },
  {
    name: 'ENGINEERING DATA',
    docs: [
      doc('/docs/engineering/data/ENG_HMB_HeatAndMaterialBalance.xlsx', 'CONFIDENTIAL', 'Heat & Material Balance'),
    ],
  },
  {
    name: 'GRANT APPLICATIONS',
    docs: [
      doc('/docs/engineering/grants/ENG_GRANT_3439-1621_Tobe_Energy_Limited_Liability_Co_Topic_1_Photoel_Concept_Paper_v2.pdf', 'INVESTOR-READY', 'DOE Photoelectrolysis Concept Paper'),
      doc('/docs/engineering/grants/ENG_GRANT_C60-08 G ResonantEdge- Advanced Power Electronics for Hydrogen Electrolysis_v2.pdf', 'INVESTOR-READY', 'ResonantEdge Advanced Power Electronics'),
      doc('/docs/engineering/grants/ENG_GRANT_NavySBIR_N242-070_v2.pdf', 'INVESTOR-READY', 'Navy SBIR N242-070'),
    ],
  },
  {
    name: 'MARKET RESEARCH',
    docs: [
      doc('/docs/market/research/MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM_v2.pdf', 'INVESTOR-READY', 'TAM / SAM / SOM Analysis'),
      doc('/docs/market/research/MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf', 'INVESTOR-READY', 'TAM / SAM / SOM Analysis (Original)'),
      doc('/docs/market/research/MKRT_RESEARCH_MarketLandscape_CompetitiveBenchmarking_v2.pdf', 'INVESTOR-READY', 'Competitive Benchmarking'),
      doc('/docs/market/research/MKRT_RESEARCH_MarketLandscape_CompetitiveBenchmarking.pdf', 'INVESTOR-READY', 'Competitive Benchmarking (Original)'),
      doc('/docs/market/research/MKRT_RESEARCH_GreenH2Revolution_MarketLandscape_v2.pdf', 'INVESTOR-READY', 'Green H2 Revolution Market Landscape'),
      doc('/docs/market/research/MKRT_RESEARCH_GreenH2Revolution_MarketLandscape.pdf', 'INVESTOR-READY', 'Green H2 Revolution Market Landscape (Original)'),
      doc('/docs/market/research/MKRT_RESEARCH_H2Use_NorthAmerica_Trends_v2.pdf', 'INVESTOR-READY', 'North America H2 Trends'),
      doc('/docs/market/research/MKRT_RESEARCH_H2Use_NorthAmerica_Trends.pdf', 'INVESTOR-READY', 'North America H2 Trends (Original)'),
      doc('/docs/market/research/MKRT_RESEARCH_BestUSMarkets_v2.pdf', 'INVESTOR-READY', 'Best U.S. Markets for Green H2'),
      doc('/docs/market/research/MKRT_RESEARCH_BestUSMarkets.pdf', 'INVESTOR-READY', 'Best U.S. Markets for Green H2 (Original)'),
      doc('/docs/market/research/MKRT_RESEARCH_H2Utilization_OKC_TulsaSurvey_v2.pdf', 'INVESTOR-READY', 'OKC/Tulsa Market Survey'),
      doc('/docs/market/research/MKRT_RESEARCH_H2Utilization_OKC_TulsaSurvey.pdf', 'INVESTOR-READY', 'OKC/Tulsa Market Survey (Original)'),
      doc('/docs/market/research/MKRT_RESEARCH_TOBE_MarketExpansion_CostAdvantage_v2.pdf', 'INVESTOR-READY', 'Tobe Cost Advantage Analysis'),
      doc('/docs/market/research/MKRT_RESEARCH_TOBE_MarketExpansion_CostAdvantage.pdf', 'INVESTOR-READY', 'Tobe Cost Advantage Analysis (Original)'),
      doc('/docs/market/research/MRKT_RESEARCH_Investors Guide to 45V_v2.pdf', 'INVESTOR-READY', 'Investors Guide to 45V'),
      doc('/docs/market/research/MRKT_RESEARCH_Investors Guide to 45V.pdf', 'INVESTOR-READY', 'Investors Guide to 45V (Original)'),
      doc('/docs/market/research/MKRT_OPS_CompetitorAcquirerOverview_v2.pdf', 'INVESTOR-READY', 'Competitor & Acquirer Overview'),
      doc('/docs/market/research/MKRT_OPS_GoToMarket_Branding_v2.pdf', 'INVESTOR-READY', 'Go-To-Market & Branding'),
      doc('/docs/market/research/MKRT_OPS_PublicMasterPlan_v2.pdf', 'INVESTOR-READY', 'Public Master Plan'),
      doc('/docs/market/research/MKRT_OTH_NSF_ICorps_FinalPresentation_v2.pdf', 'INVESTOR-READY', 'NSF I-Corps Final Presentation'),
      doc('/docs/market/research/MKRT_OTH_OCAST_ScienceInnovationPlan_v2.pdf', 'INVESTOR-READY', 'OCAST Science Innovation Plan'),
    ],
  },
  {
    name: 'CASE STUDIES',
    docs: [
      doc('/docs/market/case-studies/OU_Case_Study_Final_Report.pdf', 'INVESTOR-READY', 'OU Irani Center Case Study'),
      doc('/docs/market/case-studies/OU_Case_Study_Financial_Model.xlsx', 'INVESTOR-READY', 'OU Case Study Financial Model'),
      doc('/docs/market/case-studies/MKRT_CASE_CostAnalysis_OnSiteAdvantage_v2.pdf', 'INVESTOR-READY', 'Cost Analysis On-Site Advantage'),
      doc('/docs/market/case-studies/MKRT_CASE_H2Hospitals_Integration_v2.pdf', 'INVESTOR-READY', 'H2 Hospitals Integration'),
      doc('/docs/market/case-studies/MKRT_CASE_H2Transport_IndustryUseCases_v2.pdf', 'INVESTOR-READY', 'H2 Transport Industry Use Cases'),
      doc('/docs/market/case-studies/MKRT_CASE_H2forAIDatacenters_v2.pdf', 'INVESTOR-READY', 'H2 for AI Datacenters'),
    ],
  },
  {
    name: 'INTELLECTUAL PROPERTY',
    docs: [
      doc('/docs/legal/ip/ENG_Tobe Energy-IP Fortress_v2.pdf', 'CONFIDENTIAL', 'IP Fortress Strategy'),
      doc('/docs/legal/ip/Patent_Figures.pdf', 'CONFIDENTIAL', 'Patent Figures'),
      doc('/docs/legal/ip/Patent_Specification.pdf', 'CONFIDENTIAL', 'Patent Specification'),
    ],
  },
  {
    name: 'LEGAL & CORPORATE',
    docs: [
      doc('/docs/legal/CORP_MNGT_OrgStructure_LeadershipOverview_v2.pdf', 'INVESTOR-READY', 'Org Structure & Leadership Overview'),
    ],
  },
  {
    name: '45V REGULATORY',
    docs: [
      doc('/docs/legal/regulatory/_SUMMARY.pdf', 'INVESTOR-READY', '45V Regulatory Summary'),
      doc('/docs/legal/regulatory/01_LIFECYCLE_GHG_ANALYSIS.pdf', 'INVESTOR-READY', 'Lifecycle GHG Analysis'),
      doc('/docs/legal/regulatory/02_SENSITIVITY_ANALYSIS.pdf', 'INVESTOR-READY', '45V Sensitivity Analysis'),
      doc('/docs/legal/regulatory/03_45V_COMPLIANCE_MEMO.pdf', 'INVESTOR-READY', '45V Compliance Memo'),
      doc('/docs/legal/regulatory/45V_PPA_ROI_ANALYSIS.pdf', 'INVESTOR-READY', 'PPA ROI Analysis'),
    ],
  },
];

const totalDocs = categories.reduce((sum, cat) => sum + cat.docs.length, 0);

const fileTypeConfig: Record<FileType, { color: string; bg: string }> = {
  PDF: { color: '#ff4444', bg: 'rgba(255, 68, 68, 0.12)' },
  XLSX: { color: '#00ff88', bg: 'rgba(0, 255, 136, 0.12)' },
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
        color: isConfidential ? '#ff6b35' : '#00ff88',
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
        <span className="font-mono text-[0.6rem] text-[#00d4ff]/50 opacity-0 transition-opacity group-hover:opacity-100">
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
      <div className="mx-auto max-w-5xl px-6 py-16">
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
              <div className="font-mono text-lg font-bold text-[#00d4ff]">{stat.value}</div>
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
