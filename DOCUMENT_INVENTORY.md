# TOBE ENERGY INVESTOR DATA ROOM - COMPLETE DOCUMENT INVENTORY
**Generated:** 2026-03-21  
**Working Directory:** ~/clawd/tobe-dataroom-dev  
**Purpose:** Comprehensive audit of all investor-relevant documents across workspace

---

## EXECUTIVE SUMMARY

**Total Storage Analyzed:** ~511MB across 7 primary locations  
**Documents Found:** 1,618+ files (PDFs, Excel, Word, MD, images, videos)  
**Categories:** Engineering, Financial, Technical, Market, Legal, Media  

**Key Directories:**
- `dataroom-assets/` — 353MB organized investor materials
- `tobe-dataroom-dev/public/media/` — 130MB manufacturing videos/images
- `tea-agent-inputs/` — 7.3MB TEA & financial models
- `Zeeco Arc/` — 6.3MB FEED package engineering drawings
- `Financial_Model/` — 7.6MB financial models and TEA documents

---

## 1. ENGINEERING DOCUMENTS

### 1.1 FEED Package (Zeeco Arc Partnership)
**Location:** `~/clawd/tobe-dataroom-dev/Zeeco Arc/`  
**Total Size:** 6.3MB

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `TOBE-FEED-PKG-001.pdf` | 897KB | Complete FEED package | **INVESTOR-READY** | INCLUDE AS-IS |
| `TOBE-GA-001.pdf` | 4.4MB | General Arrangement drawings | **INVESTOR-READY** | INCLUDE AS-IS |
| `TOBE-PFD-001.pdf` | 140KB | Process Flow Diagram | **INVESTOR-READY** | INCLUDE AS-IS |
| `TOBE-PID-001.pdf` | 58KB | Piping & Instrumentation Diagram | **INVESTOR-READY** | INCLUDE AS-IS |
| `TOBE-EL-001.pdf` | 203KB | Electrical single-line diagram | **INVESTOR-READY** | INCLUDE AS-IS |

**Notes:**
- All PDFs are investor-ready technical documentation
- Zeeco is a named partner (OK to include)
- Professional engineering deliverables from FEED study
- **RECOMMEND:** Create `/docs/engineering/zeeco-arc/` directory

---

### 1.2 Hardware & Prototype Documentation
**Location:** `~/clawd/dataroom-assets/hardware/`

| File | Size | Type | Description | Sensitivity | Action |
|------|------|------|-------------|-------------|---------|
| `ENG_HARDWARE_6kW_Operation_Video.mov` | — | Video | 6kW prototype in operation | **PUBLIC** | MOVE TO public/media/ |
| `ENG_HARDWARE_6kW_Thermal_Efficiency.png` | — | Image | Thermal camera efficiency data | **INVESTOR-READY** | INCLUDE |
| `ENG_HARDWARE_6kW_Breadboard_Test_Install.jpg` | — | Image | Lab setup photo | **PUBLIC** | INCLUDE |
| `ENG_HARDWARE_F360_Detailed_Build_Screenshot_[1-3].png` | — | Image | Fusion 360 CAD screenshots | **INVESTOR-READY** | INCLUDE |
| `ENG_HARDWARE_6kW_Controls_Breadboard.jpg` | — | Image | Control system breadboard | **INVESTOR-READY** | INCLUDE |

**RECOMMEND:** Convert `.mov` files to `.mp4` for web compatibility

---

### 1.3 Engineering Specifications
**Location:** `~/clawd/dataroom-assets/technology/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `tobe-technology-overview-v1.0.pdf` | 181KB | High-level tech overview | **PUBLIC** | INCLUDE AS-IS |
| `tobe-project-developer-guide-v1.1.pdf` | 372KB | Developer/integrator guide | **INVESTOR-READY** | INCLUDE AS-IS |
| `SPEC_electrolysis_power_conversion_specifications.docx` | 1.5MB | Power electronics specs | **CONFIDENTIAL** | CONVERT TO PDF + SCRUB |
| `SPEC_pulser_overview_specification.docx` | 39KB | Pulser module spec | **CONFIDENTIAL** | CONVERT TO PDF + SCRUB |

**Notes:**
- `.docx` files contain detailed technical specs—may reveal trade secrets
- **ACTION REQUIRED:** Review for IP sensitivity before including
- Consider generating executive summary version

---

### 1.4 Engineering Calculations & Data
**Location:** `~/clawd/tea-agent-inputs/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `ENG_EfficiencyCalculations.xlsx` | 12KB | Efficiency calculation model | **CONFIDENTIAL** | INCLUDE (investors need this) |
| `ENG_HMB_HeatAndMaterialBalance.xlsx` | 67KB | Heat & material balance | **CONFIDENTIAL** | INCLUDE |
| `ENG_PreCommit_SampleOperatingData.xlsx` | 1.6MB | Pre-commercial operating data | **CONFIDENTIAL** | INCLUDE |
| `ENG_GRANT_NavySBIR_N242-070.pdf` | 1.1MB | Navy SBIR application | **INTERNAL-ONLY** | SKIP (SBIR data) |

**Notes:**
- Excel files are critical for due diligence—investors NEED these
- Navy SBIR: Mark as **INTERNAL-ONLY** per rules
- **RECOMMEND:** Include with NDA requirement

---

### 1.5 Updated Engineering Documents (Version 2)
**Location:** `~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG - Engineering Documents/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `ENG_BlockFlowDiagram_Final_v2.pdf` | 32KB | Block flow diagram | **INVESTOR-READY** | INCLUDE AS-IS |
| `ENG_Circuit_Efficiency_Testing_Diagram_v2.pdf` | 21KB | Test circuit diagram | **INVESTOR-READY** | INCLUDE AS-IS |
| `ENG_ComparativeAnalysis_TobeElectrolyzer_v2.pdf` | 31KB | Competitive comparison | **INVESTOR-READY** | INCLUDE AS-IS |
| `ENG_ProductRoadmap_Brochure_v2.pdf` | 51KB | Product roadmap brochure | **PUBLIC** | INCLUDE AS-IS |
| `ENG_Product_Roadmap_and_Technical_Overview_v2.pdf` | 34KB | Technical roadmap | **INVESTOR-READY** | INCLUDE AS-IS |
| `ENG_Provisional_Patent_Advanced_H2_Efficiency_v2.pdf` | 204KB | Provisional patent filing | **CONFIDENTIAL** | INCLUDE (already filed) |
| `ENG_TestingFramework_ComprehensiveEfficiency_v2.pdf` | 164KB | Testing methodology | **INVESTOR-READY** | INCLUDE AS-IS |
| `ENG_Tobe Energy-IP Fortress_v2.pdf` | 74KB | IP portfolio overview | **INVESTOR-READY** | INCLUDE AS-IS |
| `ENG_Expanding_Maxwell_Draft_AcademicPub_v2.pdf` | 860KB | Academic paper draft | **CONFIDENTIAL** | SKIP (pre-publication) |

**Notes:**
- Version 2 documents appear to be cleaned-up investor versions
- Academic paper: Hold until published
- **RECOMMEND:** Use v2 versions as primary where available

---

## 2. FINANCIAL DOCUMENTS

### 2.1 Financial Models
**Location:** `~/clawd/dataroom-assets/financial/` & `~/clawd/tobe-dataroom-dev/Financial_Model/`

| File | Size | Description | Sensitivity | Current? | Action |
|------|------|-------------|-------------|----------|---------|
| `FINAL_Tobe_Seed_Financial_Model_v853.xlsx` | 682KB | **PRIMARY SEED MODEL** | **CONFIDENTIAL** | ✅ Current | **INCLUDE (CRITICAL)** |
| `Tobe_Energy_Cap_Table.xlsx` | 22KB | Cap table | **CONFIDENTIAL** | ✅ Current | **INCLUDE** |
| `FINANCIAL_MODEL_REVIEW_v853.md` | 8.8KB | Model review notes | **INTERNAL-ONLY** | ✅ Current | SKIP (internal notes) |
| `Fin_FinancialModel_v4.3.0.xlsx` | 800KB | Older version | **CONFIDENTIAL** | ❌ Superseded | SKIP (use v853) |
| `Clean_FinancialModel_Tobe_Seed.xlsx` | — | Clean version | **CONFIDENTIAL** | ? | CHECK vs v853 |
| `OU_Case_Study_Financial_Model.xlsx` | 52KB | OU case study model | **INVESTOR-READY** | ✅ Current | INCLUDE |

**Notes:**
- **v853** is the current seed round model—MUST INCLUDE
- Cap table is sensitive but necessary for serious investors
- **ACTION:** Verify "Clean" version vs v853—may be duplicate

---

### 2.2 Comparable Companies Analysis
**Location:** `~/clawd/dataroom-assets/comps/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `FIN_COMPS_Advanced_Ionics_2025_05_13_17_44_26.pdf` | 252KB | Advanced Ionics analysis | **INVESTOR-READY** | INCLUDE |
| `FIN_COMPS_Fourier_2025_05_12_16_52_01.pdf` | 145KB | Fourier analysis | **INVESTOR-READY** | INCLUDE |
| `FIN_COMPS_HGen_PitchBooks_details_v1.pdf` | 250KB | HGen (competitor) analysis | **INVESTOR-READY** | INCLUDE |

**Notes:**
- Competitive intelligence—valuable for investors
- Shows market landscape understanding
- **RECOMMEND:** Create `/docs/financial/comparables/` directory

---

### 2.3 Techno-Economic Analysis (TEA)
**Location:** Multiple locations

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| **PRIMARY TEA:** | | | | |
| `Tobe_Energy_TEA_Investor_Ready_March_2026.pdf` | 294KB | **MAIN INVESTOR TEA** | **INVESTOR-READY** | **INCLUDE (FEATURED)** |
| `Tobe_Energy_TEA_Founder_Forward_March_2026.docx` | 55KB | Founder's cover letter version | **INTERNAL-ONLY** | SKIP (internal) |
| `Tobe_Energy_TEA_Editorial_Companion_March_2026.docx` | — | Editorial notes | **INTERNAL-ONLY** | SKIP (internal) |
| **SUPPORTING:** | | | | |
| `TEA_Deep_Research_Report.md` | 45KB | Detailed research notes | **INTERNAL-ONLY** | SKIP (internal) |
| `Tobe_TEA_Narrative_v1.md` | 9.4KB | Narrative version | **INTERNAL-ONLY** | SKIP (use PDF) |
| `TEA_PIPELINE_NARRATIVE.md` | 8.7KB | Pipeline context | **INVESTOR-READY** | INCLUDE (markdown) |

**Notes:**
- **March 2026 PDF** is the polished investor version—flagship document
- .docx versions are working drafts—not for external distribution
- **RECOMMEND:** Feature TEA PDF prominently in data room

---

## 3. LEGAL & IP DOCUMENTS

### 3.1 Patents & IP
**Location:** `~/clawd/dataroom-assets/legal/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `ENG_Provisional_Patent_Advanced_H2_Efficiency_v1.pdf` | 112KB | Provisional patent filing | **CONFIDENTIAL** | INCLUDE (already filed) |
| `ENG_Tobe Energy-IP Fortress.pdf` | 48KB | IP portfolio summary | **INVESTOR-READY** | INCLUDE AS-IS |
| `IP_PATENT_STATUS.md` | 2.7KB | Patent status tracker | **INVESTOR-READY** | INCLUDE AS-IS |

**Notes:**
- Provisional patent is public record once filed
- IP Fortress doc is investor-friendly overview
- **RECOMMEND:** Create `/docs/legal/ip/` directory

---

### 3.2 Regulatory & Compliance
**Location:** `~/clawd/dataroom-assets/legal/` & `~/clawd/intelligence/greet-analysis/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `45V_GREET_ANALYSIS.md` | 5.1KB | 45V tax credit GREET analysis | **INVESTOR-READY** | INCLUDE AS-IS |
| **GREET ANALYSIS SUITE:** | | | | |
| `01_LIFECYCLE_GHG_ANALYSIS.md` | 11KB | Lifecycle GHG analysis | **INVESTOR-READY** | INCLUDE |
| `02_SENSITIVITY_ANALYSIS.md` | 11KB | Sensitivity analysis | **INVESTOR-READY** | INCLUDE |
| `03_45V_COMPLIANCE_MEMO.md` | 8.5KB | Compliance memo | **INVESTOR-READY** | INCLUDE |
| `_SUMMARY.md` | 450B | Summary overview | **INVESTOR-READY** | INCLUDE |

**Notes:**
- 45V compliance is CRITICAL for US investors—showcases tax credit eligibility
- GREET analysis demonstrates regulatory readiness
- **RECOMMEND:** Feature prominently—major value driver

---

### 3.3 Corporate Documents
**Location:** `~/clawd/dataroom-assets/legal/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `certificate of good standing delaware.pdf` | 483KB | DE certificate | **INVESTOR-READY** | INCLUDE AS-IS |
| `Tobe Energy supplemental 2025.pdf` | 0B | Supplemental docs | **INVESTOR-READY** | CHECK SIZE |
| `Tobe Energy-Mercury App.pdf` | 0B | Mercury banking app? | **INTERNAL-ONLY** | SKIP (banking) |
| `Tobe Energy-Undisclosed Drivers Selection Form.pdf` | 0B | Insurance form | **INTERNAL-ONLY** | SKIP (insurance) |
| `Tobe Energy-Uninsured Motorists Form.pdf` | 0B | Insurance form | **INTERNAL-ONLY** | SKIP (insurance) |

**Notes:**
- Certificate of Good Standing is standard investor request
- Insurance forms are NOT investor-relevant
- 0B files may be empty—check before including

---

### 3.4 Investment Agreements (EXISTING)
**Location:** `~/clawd/dataroom-assets/legal/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `CONTRACT_tobe_energy_safe_cortado_ventures_2025.pdf` | 307KB | Cortado Ventures SAFE | **CONFIDENTIAL** | INCLUDE (precedent) |
| `CONTRACT_Tobe_Energy_SAFE_Hurricane_Ventures_Investment.pdf` | 379KB | Hurricane Ventures SAFE | **CONFIDENTIAL** | INCLUDE (precedent) |
| `CONTRACT_tobe_energy_safe_techstars_2025.pdf` | 293KB | Techstars SAFE | **CONFIDENTIAL** | INCLUDE (precedent) |

**Notes:**
- Prior SAFE agreements show fundraising history
- Standard investor due diligence—shows terms precedent
- **RECOMMEND:** Include with note "Prior Round Terms - Reference Only"

---

## 4. MARKET & BUSINESS DOCUMENTS

### 4.1 Market Research
**Location:** `~/clawd/dataroom-assets/market/RESEARCH-Market Research, Size Locations, Expansion, etc./`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `MKRT_RESEARCH_GreenH2Revolution_MarketLandscape.pdf` | 117KB | Market landscape analysis | **INVESTOR-READY** | INCLUDE AS-IS |
| `MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf` | 175KB | **TAM/SAM/SOM analysis** | **INVESTOR-READY** | **INCLUDE (FEATURED)** |
| `MKRT_RESEARCH_MarketLandscape_CompetitiveBenchmarking.pdf` | 164KB | Competitive benchmarking | **INVESTOR-READY** | INCLUDE AS-IS |
| `MKRT_RESEARCH_BestUSMarkets.pdf` | 166KB | Best US markets analysis | **INVESTOR-READY** | INCLUDE AS-IS |
| `MKRT_RESEARCH_H2Use_NorthAmerica_Trends.pdf` | 181KB | North America trends | **INVESTOR-READY** | INCLUDE AS-IS |
| `MKRT_RESEARCH_H2Utilization_OKC_TulsaSurvey.pdf` | 133KB | OKC/Tulsa market survey | **INVESTOR-READY** | INCLUDE AS-IS |
| `MKRT_RESEARCH_TOBE_MarketExpansion_CostAdvantage.pdf` | 100KB | Cost advantage analysis | **INVESTOR-READY** | INCLUDE AS-IS |
| `MRKT_RESEARCH_Investors Guide to 45V.pdf` | 128KB | **45V investor guide** | **INVESTOR-READY** | **INCLUDE (FEATURED)** |

**Notes:**
- TAM/SAM/SOM is CRITICAL—investors NEED this
- 45V guide is valuable educational resource
- All research appears investor-ready
- **RECOMMEND:** Create `/docs/market/research/` directory

---

### 4.2 Case Studies
**Location:** `~/clawd/dataroom-assets/market/CASE-Case Studies/`

| File | Size | Description | Customer Names? | Sensitivity | Action |
|------|------|-------------|-----------------|-------------|---------|
| `MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf` | 95KB | On-site cost advantage | No | **PUBLIC** | INCLUDE AS-IS |
| `MKRT_CASE_H2Hospitals_Integration.pdf` | 170KB | Hospital application | Generic | **PUBLIC** | INCLUDE AS-IS |
| `MKRT_CASE_H2Transport_IndustryUseCases.pdf` | 198KB | Transport industry uses | Generic | **PUBLIC** | INCLUDE AS-IS |
| `MKRT_CASE_H2forAIDatacenters.pdf` | 330KB | AI datacenter use case | Generic | **PUBLIC** | INCLUDE AS-IS |

**Notes:**
- All case studies use generic examples (no customer names)
- Ready for public distribution
- **RECOMMEND:** Feature on public-facing data room page

---

### 4.3 University of Oklahoma Case Study
**Location:** `~/clawd/dataroom-assets/market/` & `~/clawd/overnight-outputs/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `OU_Case_Study_Final_Report.docx` | 4.9MB | Full case study report | **INVESTOR-READY** | CONVERT TO PDF + INCLUDE |
| `OU_Case_Study_Executive_Summary.md` | 8.9KB | Executive summary | **INVESTOR-READY** | INCLUDE AS-IS |
| `OU_Case_Study_Financial_Model.xlsx` | 52KB | OU case financial model | **INVESTOR-READY** | INCLUDE AS-IS |
| `01_OU_Case_Study_Summary.md` | 9.1KB | Overnight summary | **INTERNAL-ONLY** | SKIP (use above) |

**Notes:**
- OU partnership is PUBLIC and positive
- Convert .docx to PDF for professional presentation
- Financial model shows real-world application
- **RECOMMEND:** Feature as flagship case study

---

### 4.4 Pipeline & Business Development
**Location:** `~/clawd/dataroom-assets/pipeline/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `PIPELINE_SUMMARY.md` | 12KB | Sales pipeline summary | **CONFIDENTIAL** | INCLUDE (investors need this) |
| `TEA_PIPELINE_NARRATIVE.md` | 8.7KB | Pipeline narrative context | **INVESTOR-READY** | INCLUDE AS-IS |

**Notes:**
- Pipeline data is critical for investment decision
- Shows traction and sales momentum
- **RECOMMEND:** Update with latest numbers before sharing

---

## 5. LETTERS OF INTENT (LOIs) ⚠️ **SENSITIVE**

### 5.1 LOI Documents
**Location:** `~/clawd/dataroom-assets/lois/LOI-Letters of Intent/`

| File | Size | Customer | Sensitivity | Action |
|------|------|----------|-------------|---------|
| `MKRT_LOI_Summary.pdf` | 55KB | Summary overview | **INTERNAL-ONLY** | **SCRUB NAMES** + INCLUDE |
| `MKRT_Zeeco MOU Verbal.pdf` | 145KB | Zeeco (PARTNER) | **INVESTOR-READY** | INCLUDE AS-IS (Zeeco OK) |
| `MKRT_LOI_TulsaCombustion.pdf` | 314KB | Tulsa Combustion | **INTERNAL-ONLY** | **SCRUB NAME** or SKIP |
| `MKRT_LOI_NewDayHydrogen.pdf` | 109KB | New Day Hydrogen | **INTERNAL-ONLY** | **SCRUB NAME** or SKIP |
| `MKRT_LOI_LoaCarbon.pdf` | 79KB | Loa Carbon | **INTERNAL-ONLY** | **SCRUB NAME** or SKIP |
| `MKRT_LOI_Tulco.pdf` | 151KB | Tulco | **INTERNAL-ONLY** | **SCRUB NAME** or SKIP |
| `MKRT_LOI_UniversityOfTulsa.pdf` | 137KB | University of Tulsa | **INVESTOR-READY** | INCLUDE (university OK) |
| `MKRT_LOI_TUProfessor_Sabbatical.pdf` | 70KB | TU Professor | **INTERNAL-ONLY** | SKIP (HR matter) |
| `MKRT_InboundFrom_Bechtel.pdf` | 83KB | **Bechtel (inbound)** | **INTERNAL-ONLY** | **SCRUB NAME** or SKIP |

**⚠️ CRITICAL NOTES:**
- **Zeeco:** Named partner—OK to include
- **University of Tulsa:** Public institution—OK to include  
- **Bechtel, Tulco, Tulsa Combustion, etc.:** **MUST SCRUB** customer names per rules
- **Professor Sabbatical:** Not investor-relevant—SKIP

**RECOMMENDED ACTION:**
1. Create **redacted LOI summary** showing:
   - "$XXM pipeline across X customers"
   - Industry verticals (refining, combustion, etc.)
   - Deal sizes and timelines
   - **NO customer names** (except Zeeco/TU)

2. Keep unredacted LOIs in **SECURE FOLDER** for:
   - Serious investors post-term sheet
   - NDA-required deep due diligence

---

## 6. MEDIA & VISUAL ASSETS

### 6.1 Manufacturing Process Videos/Images
**Location:** `~/clawd/tobe-dataroom-dev/public/media/manufacturing/`  
**Total Size:** ~130MB

**CNC Machining Videos:**
| File | Size | Format | Description | Action |
|------|------|--------|-------------|---------|
| `cnc-electrolysis-housing.mp4` | 9.0MB | MP4 | CNC machining housing | **ALREADY SERVING** ✅ |
| `cnc-electrolysis-housing-2.mp4` | 11MB | MP4 | CNC machining (angle 2) | **ALREADY SERVING** ✅ |
| `cnc-electrolysis-housing-5.mp4` | 9.3MB | MP4 | CNC machining (angle 5) | **ALREADY SERVING** ✅ |
| `cnc-electrolysis-housing.webm` | 5.8MB | WebM | Web-optimized version | **ALREADY SERVING** ✅ |
| `cnc-electrolysis-housing-2.webm` | 7.4MB | WebM | Web-optimized version | **ALREADY SERVING** ✅ |
| `cnc-electrolysis-housing-5.webm` | 7.5MB | WebM | Web-optimized version | **ALREADY SERVING** ✅ |

**PCB Manufacturing Videos:**
| File | Size | Format | Description | Action |
|------|------|--------|-------------|---------|
| `pcb-mfg-1.mp4` | 9.6MB | MP4 | PCB manufacturing process | **ALREADY SERVING** ✅ |
| `pcb-mfg-4.mp4` | 4.7MB | MP4 | PCB process step 4 | **ALREADY SERVING** ✅ |
| `pcb-mfg-7.mp4` | 10MB | MP4 | PCB process step 7 | **ALREADY SERVING** ✅ |
| `pcb-mfg-8.mp4` | 7.5MB | MP4 | PCB process step 8 | **ALREADY SERVING** ✅ |
| `pcb-mfg-9.mp4` | 6.4MB | MP4 | PCB process step 9 | **ALREADY SERVING** ✅ |
| `pcb-mfg-11.mp4` | 7.3MB | MP4 | PCB process step 11 | **ALREADY SERVING** ✅ |

**Product Images:**
| File | Size | Format | Description | Action |
|------|------|--------|-------------|---------|
| `modular-cell.jpg` | 40KB | JPG | Modular cell photo | **ALREADY SERVING** ✅ |
| `modular-cell-2.jpg` | 40KB | JPG | Modular cell (angle 2) | **ALREADY SERVING** ✅ |
| `modular-dry-cell.png` | 1.0MB | PNG | Dry cell configuration | **ALREADY SERVING** ✅ |
| `pcb.png` | 156KB | PNG | PCB close-up | **ALREADY SERVING** ✅ |
| `pcb-mfg-12.jpg` | 4.8MB | JPG | PCB final product | **ALREADY SERVING** ✅ |

**Poster Images (for video previews):**
- `cnc-electrolysis-housing-poster.jpg` (133KB)
- `cnc-electrolysis-housing-2-poster.jpg` (182KB)
- `cnc-electrolysis-housing-5-poster.jpg` (134KB)
- `pcb-mfg-1-poster.jpg` (99KB)
- `pcb-mfg-4-poster.jpg` (164KB)
- `pcb-mfg-7-poster.jpg` (63KB)
- `pcb-mfg-8-poster.jpg` (133KB)
- `pcb-mfg-9-poster.jpg` (87KB)
- `pcb-mfg-11-poster.jpg` (161KB)

**Notes:**
- All media files are **ALREADY SERVING** at `/public/media/manufacturing/`
- Videos have both MP4 (compatibility) and WebM (efficiency) formats
- Poster images provide video preview thumbnails
- **NO ACTION NEEDED**—media infrastructure is complete

---

### 6.2 Diagrams & Technical Illustrations
**Location:** `~/clawd/dataroom-assets/diagrams/`

| File | Size | Description | Action |
|------|------|-------------|---------|
| `01_showroom_enhanced.png` | — | Enhanced showroom rendering | INCLUDE |
| `02_electrolyzer_detail.png` | — | Electrolyzer detail cutaway | INCLUDE |
| `03_comparison_pem.png` | — | PEM comparison chart | INCLUDE |
| `04_sankey_efficiency.png` | — | Sankey efficiency diagram | INCLUDE |
| `05_commercial_deployment.png` | — | Commercial deployment scenario | INCLUDE |
| `06_thermal_comparison.png` | — | Thermal performance comparison | INCLUDE |
| `fig_1_3_energy_density.png` | — | Energy density comparison | INCLUDE |
| `fig_2_7_electrolyzer_comparison.png` | — | Electrolyzer technology comparison | INCLUDE |
| `fig_2_15_cost_trajectory.png` | — | Cost trajectory projection | INCLUDE |
| `fig_3_1_hydrogen_ladder.png` | — | Hydrogen application ladder | INCLUDE |

**Notes:**
- All diagrams are investor-ready visual assets
- **RECOMMEND:** Copy to `/public/images/technical/` for easy access

---

### 6.3 Team Photos
**Location:** `~/clawd/dataroom-assets/team/`

| File | Size | Description | Action |
|------|------|-------------|---------|
| `colby-headshot.png` | — | Colby headshot (original) | INCLUDE |
| `Colby_Headshot_Larger.png` | — | Colby headshot (larger) | INCLUDE (use this) |
| `PHOTO_tobe_founder_headshot.jpg` | — | Founder team photo | INCLUDE |

**Notes:**
- Professional team photos for About page
- Use larger version for better quality

---

### 6.4 Skid/Product Photos
**Location:** `~/clawd/dataroom-assets/photos/`

| File | Count | Description | Action |
|------|-------|-------------|---------|
| `skid pic [1-8].jpg` | 8 photos | Product skid photos from various angles | INCLUDE ALL |

**Notes:**
- Real product photos—valuable for investors
- **RECOMMEND:** Copy to `/public/images/products/skid/`

---

### 6.5 Additional Marketing Videos
**Location:** `~/clawd/dataroom-assets/videos/`

| File | Size | Description | Action |
|------|------|-------------|---------|
| `LCOH-Chartmovie.mp4` | — | LCOH animation | INCLUDE (public-facing) |
| `HeroEvaCockpit-Vertical.mp4` | — | Hero video (vertical) | INCLUDE |
| `HeroEvaCockpit-Smaller.mp4` | — | Hero video (compressed) | INCLUDE |
| `HeroEvaCockpit-Red1.mp4` | — | Hero video (red theme v1) | INCLUDE |
| `HeroEvaCockpit-Red.mp4` | — | Hero video (red theme) | INCLUDE |
| `HeroEvaCockpit-orange.mp4` | — | Hero video (orange theme) | INCLUDE |
| `NEWHEROVID.mp4` | — | New hero video | INCLUDE (likely latest) |
| `SystemArchitecture.mp4` | — | System architecture animation | INCLUDE |
| `ContainerSkid-Cinematic.mov` | — | Container skid cinematic | CONVERT TO MP4 + INCLUDE |

**Notes:**
- Hero videos are for homepage/marketing
- `.mov` file needs conversion to `.mp4` for web
- **RECOMMEND:** Serve from `/public/media/marketing/`

---

## 7. OVERNIGHT RESEARCH OUTPUTS

**Location:** `~/clawd/overnight-outputs/`  
**Total Size:** 88KB

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `01_OU_Case_Study_Summary.md` | 9.1KB | OU case study summary | **INTERNAL-ONLY** | SKIP (use official docs) |
| `02_TEA_Audit_Report.md` | 27KB | TEA audit notes | **INTERNAL-ONLY** | SKIP (internal review) |
| `03_Content_Gap_Fill.md` | 13KB | Content gap analysis | **INTERNAL-ONLY** | SKIP (internal) |
| `04_Investor_Email_Templates.md` | 5.1KB | Email templates | **INTERNAL-ONLY** | SKIP (operations) |
| `05_DataRoom_Page_Content.md` | 7.6KB | Page content drafts | **INTERNAL-ONLY** | SKIP (internal) |
| `_SUMMARY.md` | 655B | Summary file | **INTERNAL-ONLY** | SKIP |

**Notes:**
- These are internal research outputs—not investor-facing
- Useful for internal reference but should NOT go in data room
- **NO ACTION NEEDED**—keep internal only

---

## 8. GENERATED CONTENT (AI-GENERATED TEMPLATES)

**Location:** `~/clawd/generated-content/`

This directory contains **1,400+ AI-generated template documents** including:
- Case studies (ammonia, refinery, semiconductor)
- HAZOP analyses
- FMEA documents
- Commissioning protocols
- Design guides
- Engineering calculations
- Industry implementation guides
- Regulatory compliance guides
- Sales documents
- Training modules
- Troubleshooting guides

**RECOMMENDATION:** **SKIP ALL GENERATED CONTENT**
- These are AI-generated templates, not real company documents
- Not yet customized/validated for Tobe Energy
- Could create confusion if included in investor data room
- **EXCEPTION:** If specific docs have been customized and approved, include individually

---

## 9. ADDITIONAL LOCATIONS TO CHECK

### 9.1 Tech Videos from Alternative Location
**Location:** `~/clawd/tobe-dataroom-dev/Tech_Videos/`

**CNC Videos:**
- `CNC Electrolysis Housing.mov` through `CNC Electrolysis Housing 6.mov`

**PCB Manufacturing:**
- `PCB Mfg 1.mov` through `PCB MFG 12.jpg`

**Product Images:**
- `modular-cell.jpg`, `modular-cell-2.jpg`, `modular-dry-cell.png`, `pcb.png`

**Notes:**
- These appear to be SOURCE FILES for the media already in `/public/media/`
- **NO ACTION NEEDED**—already processed and serving

---

### 9.2 Quotes & Vendor Documents
**Location:** `~/clawd/dataroom-assets/quotes/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `Pulse Holdings Quote 2026-01-09.pdf` | 349KB | Vendor quote | **INTERNAL-ONLY** | SKIP (operational) |

**Notes:**
- Vendor quotes are not investor-relevant
- Keep for operations but exclude from data room

---

### 9.3 Arduino/IoT Documentation
**Location:** `~/clawd/dataroom-assets/arduino/`

| File | Size | Description | Sensitivity | Action |
|------|------|-------------|-------------|---------|
| `CLOUD_VARIABLES_CATALOG.md` | 5.2KB | IoT variable catalog | **CONFIDENTIAL** | SKIP (too technical) |
| `thingProperties_all.md` | 2.7KB | Thing properties config | **CONFIDENTIAL** | SKIP (too technical) |

**Notes:**
- Low-level IoT implementation details
- Not investor-relevant unless specifically requested
- **SKIP for general data room**

---

## RECOMMENDED DOCUMENT STRUCTURE FOR DATA ROOM

### `/public/docs/` Directory Structure

```
/public/docs/
├── /overview/
│   ├── Tobe_Energy_TEA_Investor_Ready_March_2026.pdf ⭐ FEATURED
│   └── tobe-technology-overview-v1.0.pdf
│
├── /engineering/
│   ├── /zeeco-arc/
│   │   ├── TOBE-FEED-PKG-001.pdf
│   │   ├── TOBE-GA-001.pdf
│   │   ├── TOBE-PFD-001.pdf
│   │   ├── TOBE-PID-001.pdf
│   │   └── TOBE-EL-001.pdf
│   ├── /specifications/
│   │   ├── ENG_ProductRoadmap_Brochure_v2.pdf
│   │   ├── ENG_ComparativeAnalysis_TobeElectrolyzer_v2.pdf
│   │   └── tobe-project-developer-guide-v1.1.pdf
│   └── /testing/
│       └── ENG_TestingFramework_ComprehensiveEfficiency_v2.pdf
│
├── /financial/
│   ├── FINAL_Tobe_Seed_Financial_Model_v853.xlsx ⚠️ CONFIDENTIAL
│   ├── Tobe_Energy_Cap_Table.xlsx ⚠️ CONFIDENTIAL
│   ├── OU_Case_Study_Financial_Model.xlsx
│   └── /comparables/
│       ├── FIN_COMPS_Advanced_Ionics.pdf
│       ├── FIN_COMPS_Fourier.pdf
│       └── FIN_COMPS_HGen.pdf
│
├── /market/
│   ├── /research/
│   │   ├── MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf ⭐ FEATURED
│   │   ├── MRKT_RESEARCH_Investors_Guide_to_45V.pdf ⭐ FEATURED
│   │   ├── MKRT_RESEARCH_GreenH2Revolution_MarketLandscape.pdf
│   │   ├── MKRT_RESEARCH_MarketLandscape_CompetitiveBenchmarking.pdf
│   │   ├── MKRT_RESEARCH_BestUSMarkets.pdf
│   │   ├── MKRT_RESEARCH_H2Use_NorthAmerica_Trends.pdf
│   │   └── MKRT_RESEARCH_TOBE_MarketExpansion_CostAdvantage.pdf
│   └── /case-studies/
│       ├── OU_Case_Study_Final_Report.pdf (convert from .docx)
│       ├── OU_Case_Study_Executive_Summary.md
│       ├── MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf
│       ├── MKRT_CASE_H2Hospitals_Integration.pdf
│       ├── MKRT_CASE_H2Transport_IndustryUseCases.pdf
│       └── MKRT_CASE_H2forAIDatacenters.pdf
│
├── /legal/
│   ├── /ip/
│   │   ├── ENG_Provisional_Patent_Advanced_H2_Efficiency_v2.pdf
│   │   ├── ENG_Tobe_Energy-IP_Fortress_v2.pdf
│   │   └── IP_PATENT_STATUS.md
│   ├── /regulatory/
│   │   ├── 45V_GREET_ANALYSIS.md
│   │   ├── 01_LIFECYCLE_GHG_ANALYSIS.md
│   │   ├── 02_SENSITIVITY_ANALYSIS.md
│   │   └── 03_45V_COMPLIANCE_MEMO.md
│   ├── /corporate/
│   │   └── certificate_of_good_standing_delaware.pdf
│   └── /prior-investments/ ⚠️ CONFIDENTIAL
│       ├── CONTRACT_tobe_energy_safe_cortado_ventures_2025.pdf
│       ├── CONTRACT_Tobe_Energy_SAFE_Hurricane_Ventures_Investment.pdf
│       └── CONTRACT_tobe_energy_safe_techstars_2025.pdf
│
└── /pipeline/ ⚠️ CONFIDENTIAL (NDA Required)
    ├── PIPELINE_SUMMARY.md (UPDATE WITH LATEST)
    ├── TEA_PIPELINE_NARRATIVE.md
    └── LOI_SUMMARY_REDACTED.pdf (CREATE THIS)
```

---

## SUMMARY OF ACTIONS REQUIRED

### IMMEDIATE ACTIONS (Before Data Room Launch)

1. **LOI REDACTION** ⚠️ **CRITICAL**
   - Create `LOI_SUMMARY_REDACTED.pdf` showing pipeline without customer names
   - Keep Zeeco and University of Tulsa (public/partners)
   - Scrub: Bechtel, Tulco, Tulsa Combustion, New Day Hydrogen, Loa Carbon

2. **FILE CONVERSIONS**
   - Convert `OU_Case_Study_Final_Report.docx` → PDF
   - Convert `ContainerSkid-Cinematic.mov` → MP4
   - Review and potentially convert power electronics specs (`.docx` → PDF with scrubbing)

3. **VERIFICATION CHECKS**
   - Verify `FINAL_Tobe_Seed_Financial_Model_v853.xlsx` is current
   - Check 0-byte files (insurance forms, supplements)—delete if empty
   - Confirm `Clean_FinancialModel_Tobe_Seed.xlsx` vs v853—avoid duplicates

4. **PIPELINE UPDATE**
   - Update `PIPELINE_SUMMARY.md` with latest numbers
   - Ensure dates are current (Q1 2026)

5. **SKIP ENTIRELY**
   - `~/clawd/generated-content/` (1,400+ AI templates—not real docs)
   - `~/clawd/overnight-outputs/` (internal research notes)
   - SBIR applications (`ENG_GRANT_NavySBIR_N242-070.pdf`)
   - Founder drafts (`Tobe_Energy_TEA_Founder_Forward...`, editorial notes)
   - Vendor quotes (`Pulse Holdings Quote`)
   - Arduino/IoT configs (too technical, not investor-relevant)
   - Insurance forms
   - Banking applications

---

### RECOMMENDED DOCUMENT LIST FOR `/public/docs/`

#### **TIER 1: MUST INCLUDE (Featured Documents)**
1. ✅ `Tobe_Energy_TEA_Investor_Ready_March_2026.pdf` — Primary TEA
2. ✅ `FINAL_Tobe_Seed_Financial_Model_v853.xlsx` — Current financial model
3. ✅ `Tobe_Energy_Cap_Table.xlsx` — Cap table
4. ✅ `MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf` — Market sizing
5. ✅ `MRKT_RESEARCH_Investors_Guide_to_45V.pdf` — Tax credit guide
6. ✅ `TOBE-FEED-PKG-001.pdf` — Complete FEED package
7. ✅ `45V_GREET_ANALYSIS.md` + full GREET suite — Regulatory compliance

#### **TIER 2: SHOULD INCLUDE (Due Diligence)**
8. ✅ All Zeeco Arc PDFs (GA, PFD, PID, EL drawings)
9. ✅ Engineering calculations (HMB, Efficiency, Operating Data `.xlsx`)
10. ✅ Prior SAFE agreements (Cortado, Hurricane, Techstars)
11. ✅ Comparables analysis (Advanced Ionics, Fourier, HGen)
12. ✅ OU Case Study (report, summary, financial model)
13. ✅ All market research PDFs (7 documents)
14. ✅ All case studies (4 PDFs—hospitals, transport, datacenters, cost)
15. ✅ IP documentation (patent, IP Fortress, status tracker)
16. ✅ Product guides (tech overview, developer guide)
17. ✅ Pipeline summary (UPDATED) + TEA narrative
18. ✅ LOI summary (REDACTED version)

#### **TIER 3: NICE TO HAVE (Supporting)**
19. ✅ Engineering specs v2 (block flow, comparative analysis, roadmap, testing)
20. ✅ All technical diagrams (10 PNG files)
21. ✅ Certificate of Good Standing (Delaware)
22. ✅ Team photos (Colby headshot, founder team)
23. ✅ Product photos (8 skid photos)

#### **ALREADY SERVING (No Action Needed)**
- ✅ Manufacturing videos (CNC, PCB) — `/public/media/manufacturing/`
- ✅ Manufacturing images (modular cells, PCB) — `/public/media/manufacturing/`

---

### DOCUMENTS TO **SKIP** (Not for Data Room)

**Internal-Only:**
- Overnight research outputs (6 files)
- AI-generated templates (1,400+ files)
- Founder drafts & editorial notes
- Internal model reviews
- Email templates

**Operational (Not Investor-Relevant):**
- Vendor quotes
- Insurance forms
- Arduino/IoT configs
- Banking applications

**Pre-Publication:**
- `ENG_Expanding_Maxwell_Draft_AcademicPub_v2.pdf` (unpublished paper)

**Government (May be Sensitive):**
- `ENG_GRANT_NavySBIR_N242-070.pdf` (SBIR application)

---

## FINAL STATISTICS

### Documents Recommended for Data Room

| Category | Count | Total Size | Notes |
|----------|-------|------------|-------|
| **Engineering** | 25 docs | ~15MB | FEED pkg, specs, calcs, diagrams |
| **Financial** | 6 docs | ~2MB | Models, cap table, comparables |
| **Market** | 15 docs | ~2MB | Research, case studies, OU |
| **Legal/IP** | 10 docs | ~2MB | Patents, 45V, corporate, SAFEs |
| **Media (Already Serving)** | 30+ files | ~130MB | Videos, images, posters |
| **TOTAL** | **86 documents** | **~151MB** | Curated investor data room |

### Documents to Skip

| Category | Count | Reason |
|----------|-------|---------|
| **Internal Research** | 6 files | Overnight outputs, drafts |
| **AI Templates** | 1,400+ | Not real company docs |
| **Operational** | 10 files | Quotes, IoT, banking |
| **Total Excluded** | **1,416+** | Not investor-relevant |

---

## CONTACT FOR QUESTIONS

**Data Room Owner:** Colby DeWeese (CEO)  
**Technical Contact:** Ren (AI Operating Layer)  
**Location:** `~/clawd/tobe-dataroom-dev/`

**Last Updated:** 2026-03-21 17:45 CDT  
**Next Review:** Before seed round close

---

*END OF DOCUMENT INVENTORY*
