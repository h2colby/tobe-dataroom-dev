# RECOMMENDED DOCUMENT LIST FOR DATA ROOM
**Generated:** 2026-03-21  
**Purpose:** Exact file copy commands for populating `/public/docs/`

---

## SETUP COMMANDS

```bash
# Create directory structure
cd ~/clawd/tobe-dataroom-dev
mkdir -p public/docs/{overview,engineering/{zeeco-arc,specifications,testing,data},financial/comparables,market/{research,case-studies},legal/{ip,regulatory,corporate,prior-investments},pipeline}
```

---

## TIER 1: FEATURED DOCUMENTS (Must Include)

### Overview
```bash
# Primary TEA (flagship document)
cp ~/clawd/dataroom-assets/overview/Tobe_Energy_TEA_Investor_Ready_March_2026.pdf \
   public/docs/overview/

# Technology overview
cp ~/clawd/dataroom-assets/technology/tobe-technology-overview-v1.0.pdf \
   public/docs/overview/
```

### Financial (⚠️ CONFIDENTIAL - Requires NDA)
```bash
# Current financial model
cp ~/clawd/dataroom-assets/financial/financial_model_v853.xlsx \
   public/docs/financial/FINAL_Tobe_Seed_Financial_Model_v853.xlsx

# Cap table
cp ~/clawd/dataroom-assets/financials/Tobe_Energy_Cap_Table.xlsx \
   public/docs/financial/
```

### Market (Featured)
```bash
# TAM/SAM/SOM analysis
cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf \
   public/docs/market/research/

# 45V investor guide
cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MRKT_RESEARCH_Investors\ Guide\ to\ 45V.pdf \
   public/docs/market/research/
```

### Engineering (Featured)
```bash
# Complete FEED package
cp ~/clawd/tobe-dataroom-dev/Zeeco\ Arc/TOBE-FEED-PKG-001.pdf \
   public/docs/engineering/zeeco-arc/
```

### Legal/Regulatory (Featured)
```bash
# 45V GREET Analysis
cp ~/clawd/dataroom-assets/legal/45V_GREET_ANALYSIS.md \
   public/docs/legal/regulatory/

cp ~/clawd/intelligence/greet-analysis/*.md \
   public/docs/legal/regulatory/
```

---

## TIER 2: ENGINEERING DOCUMENTS

### Zeeco Arc FEED Package
```bash
# All FEED drawings
cp ~/clawd/tobe-dataroom-dev/Zeeco\ Arc/TOBE-GA-001.pdf \
   public/docs/engineering/zeeco-arc/

cp ~/clawd/tobe-dataroom-dev/Zeeco\ Arc/TOBE-PFD-001.pdf \
   public/docs/engineering/zeeco-arc/

cp ~/clawd/tobe-dataroom-dev/Zeeco\ Arc/TOBE-PID-001.pdf \
   public/docs/engineering/zeeco-arc/

cp ~/clawd/tobe-dataroom-dev/Zeeco\ Arc/TOBE-EL-001.pdf \
   public/docs/engineering/zeeco-arc/
```

### Specifications & Technical Docs
```bash
# Developer guide
cp ~/clawd/dataroom-assets/technology/tobe-project-developer-guide-v1.1.pdf \
   public/docs/engineering/specifications/

# Version 2 engineering docs (cleaned-up investor versions)
cp ~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG\ -\ Engineering\ Documents/ENG_BlockFlowDiagram_Final_v2.pdf \
   public/docs/engineering/specifications/

cp ~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG\ -\ Engineering\ Documents/ENG_ComparativeAnalysis_TobeElectrolyzer_v2.pdf \
   public/docs/engineering/specifications/

cp ~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG\ -\ Engineering\ Documents/ENG_ProductRoadmap_Brochure_v2.pdf \
   public/docs/engineering/specifications/

cp ~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG\ -\ Engineering\ Documents/ENG_Product_Roadmap_and_Technical_Overview_v2.pdf \
   public/docs/engineering/specifications/
```

### Testing & Performance
```bash
cp ~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG_TestingFramework_ComprehensiveEfficiency_v2.pdf \
   public/docs/engineering/testing/
```

### Engineering Data (⚠️ CONFIDENTIAL)
```bash
# Heat & material balance
cp ~/clawd/tea-agent-inputs/ENG_HMB_HeatAndMaterialBalance.xlsx \
   public/docs/engineering/data/

# Efficiency calculations
cp ~/clawd/tea-agent-inputs/ENG_EfficiencyCalculations.xlsx \
   public/docs/engineering/data/

# Operating data
cp ~/clawd/tea-agent-inputs/ENG_PreCommit_SampleOperatingData.xlsx \
   public/docs/engineering/data/
```

---

## TIER 2: FINANCIAL DOCUMENTS

### Comparables Analysis
```bash
cp ~/clawd/dataroom-assets/comps/COMPS\ -\ Comparable\ Companies/FIN_COMPS_Advanced_Ionics_2025_05_13_17_44_26.pdf \
   public/docs/financial/comparables/FIN_COMPS_Advanced_Ionics.pdf

cp ~/clawd/dataroom-assets/comps/COMPS\ -\ Comparable\ Companies/FIN_COMPS_Fourier_2025_05_12_16_52_01.pdf \
   public/docs/financial/comparables/FIN_COMPS_Fourier.pdf

cp ~/clawd/dataroom-assets/comps/COMPS\ -\ Comparable\ Companies/FIN_COMPS_HGen_PitchBooks_details_v1.pdf \
   public/docs/financial/comparables/FIN_COMPS_HGen.pdf
```

### Case Study Financial Model
```bash
cp ~/clawd/dataroom-assets/market/OU_Case_Study_Financial_Model.xlsx \
   public/docs/financial/
```

---

## TIER 2: MARKET DOCUMENTS

### Market Research
```bash
# All market research PDFs
cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MKRT_RESEARCH_GreenH2Revolution_MarketLandscape.pdf \
   public/docs/market/research/

cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MKRT_RESEARCH_MarketLandscape_CompetitiveBenchmarking.pdf \
   public/docs/market/research/

cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MKRT_RESEARCH_BestUSMarkets.pdf \
   public/docs/market/research/

cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MKRT_RESEARCH_H2Use_NorthAmerica_Trends.pdf \
   public/docs/market/research/

cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MKRT_RESEARCH_H2Utilization_OKC_TulsaSurvey.pdf \
   public/docs/market/research/

cp ~/clawd/dataroom-assets/market/RESEARCH-Market\ Research,\ Size\ Locations,\ Expansion,\ etc./MKRT_RESEARCH_TOBE_MarketExpansion_CostAdvantage.pdf \
   public/docs/market/research/
```

### Case Studies
```bash
# Public case studies (no customer names)
cp ~/clawd/dataroom-assets/market/CASE-Case\ Studies/MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf \
   public/docs/market/case-studies/

cp ~/clawd/dataroom-assets/market/CASE-Case\ Studies/MKRT_CASE_H2Hospitals_Integration.pdf \
   public/docs/market/case-studies/

cp ~/clawd/dataroom-assets/market/CASE-Case\ Studies/MKRT_CASE_H2Transport_IndustryUseCases.pdf \
   public/docs/market/case-studies/

cp ~/clawd/dataroom-assets/market/CASE-Case\ Studies/MKRT_CASE_H2forAIDatacenters.pdf \
   public/docs/market/case-studies/

# OU Case Study (markdown is ready, DOCX needs conversion)
cp ~/clawd/dataroom-assets/market/OU_Case_Study_Executive_Summary.md \
   public/docs/market/case-studies/

# ACTION REQUIRED: Convert DOCX to PDF
# pandoc ~/clawd/dataroom-assets/market/OU_Case_Study_Final_Report.docx \
#   -o public/docs/market/case-studies/OU_Case_Study_Final_Report.pdf
```

---

## TIER 2: LEGAL & IP DOCUMENTS

### IP Portfolio
```bash
# Provisional patent (already filed—public record)
cp ~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG\ -\ Engineering\ Documents/ENG_Provisional_Patent_Advanced_H2_Efficiency_v2.pdf \
   public/docs/legal/ip/

# IP overview
cp ~/clawd/dataroom-assets/updated-v2/UPDATED_DOCUMENTS/ENG_Tobe\ Energy-IP\ Fortress_v2.pdf \
   public/docs/legal/ip/

# Patent status tracker
cp ~/clawd/dataroom-assets/legal/IP_PATENT_STATUS.md \
   public/docs/legal/ip/
```

### Corporate Documents
```bash
# Certificate of Good Standing
cp ~/clawd/dataroom-assets/legal/certificate\ of\ good\ standing\ delaware.pdf \
   public/docs/legal/corporate/
```

### Prior Investment Agreements (⚠️ CONFIDENTIAL)
```bash
# SAFE agreements (precedent for new investors)
cp ~/clawd/dataroom-assets/legal/CONTRACT_tobe_energy_safe_cortado_ventures_2025.pdf \
   public/docs/legal/prior-investments/

cp ~/clawd/dataroom-assets/legal/CONTRACT_Tobe_Energy_SAFE_Hurricane_Ventures_Investment.pdf \
   public/docs/legal/prior-investments/

cp ~/clawd/dataroom-assets/legal/CONTRACT_tobe_energy_safe_techstars_2025.pdf \
   public/docs/legal/prior-investments/
```

---

## TIER 2: PIPELINE DOCUMENTS (⚠️ CONFIDENTIAL - NDA Required)

```bash
# Pipeline summary (ACTION: UPDATE WITH LATEST NUMBERS FIRST)
# cp ~/clawd/dataroom-assets/pipeline/PIPELINE_SUMMARY.md \
#    public/docs/pipeline/

# Pipeline narrative
cp ~/clawd/dataroom-assets/pipeline/TEA_PIPELINE_NARRATIVE.md \
   public/docs/pipeline/

# LOI summary (ACTION REQUIRED: CREATE REDACTED VERSION)
# See separate section below for LOI handling
```

---

## TIER 3: SUPPORTING DOCUMENTS

### Additional Engineering Diagrams
```bash
# Create technical diagrams directory
mkdir -p public/images/technical/

# Copy all diagrams
cp ~/clawd/dataroom-assets/diagrams/*.png \
   public/images/technical/
```

### Team Photos
```bash
# Create team photos directory
mkdir -p public/images/team/

# Use larger version of Colby headshot
cp ~/clawd/dataroom-assets/team/Colby_Headshot_Larger.png \
   public/images/team/colby-headshot.png

# Founder team photo
cp ~/clawd/dataroom-assets/team/PHOTO_tobe_founder_headshot.jpg \
   public/images/team/founder-team.jpg
```

### Product Photos
```bash
# Create product photos directory
mkdir -p public/images/products/skid/

# Copy all skid photos
cp ~/clawd/dataroom-assets/photos/skid\ pic\ *.jpg \
   public/images/products/skid/
```

---

## MEDIA FILES (Already Serving - No Action Needed)

The following media files are **ALREADY SERVING** from `/public/media/manufacturing/`:

**Videos:** (MP4 + WebM formats)
- CNC machining (3 videos)
- PCB manufacturing (6 videos)

**Images:**
- Modular cell photos
- PCB close-ups
- Video poster images

**Location:** `~/clawd/tobe-dataroom-dev/public/media/manufacturing/`  
**Status:** ✅ Already optimized and serving  
**Action Required:** NONE

---

## SPECIAL HANDLING: LOI DOCUMENTS ⚠️

### CRITICAL: Customer Name Scrubbing Required

**DO NOT COPY THESE FILES DIRECTLY:**
- ~~`MKRT_LOI_TulsaCombustion.pdf`~~ → Contains customer name
- ~~`MKRT_LOI_NewDayHydrogen.pdf`~~ → Contains customer name
- ~~`MKRT_LOI_LoaCarbon.pdf`~~ → Contains customer name
- ~~`MKRT_LOI_Tulco.pdf`~~ → Contains customer name
- ~~`MKRT_InboundFrom_Bechtel.pdf`~~ → **Contains Bechtel name**

**SAFE TO INCLUDE (Named Partners):**
```bash
# Zeeco is a named partner—OK to include
cp ~/clawd/dataroom-assets/lois/MRKT_Zeeco\ MOU\ Verbal.pdf \
   public/docs/pipeline/

# University of Tulsa is public institution—OK to include
cp ~/clawd/dataroom-assets/lois/LOI-Letters\ of\ Intent/MKRT_LOI_UniversityOfTulsa.pdf \
   public/docs/pipeline/
```

**ACTION REQUIRED: Create Redacted LOI Summary**

Create a new document: `public/docs/pipeline/LOI_SUMMARY_REDACTED.pdf`

**Contents should include:**
- Total pipeline value: "$XXM across Y customers"
- Number of LOIs: X signed, Y in negotiation
- Industry breakdown:
  - Refining/petrochemical: X customers
  - Industrial combustion: Y customers
  - Hydrogen production: Z customers
- Deal size ranges: "$XM - $YM per customer"
- Deployment timelines: "2026-2027"
- **NO CUSTOMER NAMES** (except Zeeco and University of Tulsa)

**Format:**
- Professional PDF with Tobe Energy branding
- Aggregate statistics only
- Note: "Detailed LOIs available under NDA for qualified investors"

---

## DOCUMENTS TO SKIP (Do NOT Copy)

### Internal Research (Not Investor-Facing)
- ❌ `~/clawd/overnight-outputs/*` — Internal overnight research
- ❌ `~/clawd/dataroom-assets/financial/FINANCIAL_MODEL_REVIEW_v853.md` — Internal notes
- ❌ `~/clawd/tea-agent-inputs/NOTES_*.md` — Internal notes
- ❌ `~/clawd/tea-agent-inputs/CLAUDE.md` — Internal instructions

### AI-Generated Templates (Not Real Company Docs)
- ❌ `~/clawd/generated-content/*` — 1,400+ AI templates (not customized)

### Operational Documents (Not Investor-Relevant)
- ❌ `~/clawd/dataroom-assets/quotes/Pulse Holdings Quote 2026-01-09.pdf` — Vendor quote
- ❌ `~/clawd/dataroom-assets/arduino/*` — IoT configuration files
- ❌ `~/clawd/dataroom-assets/legal/Tobe Energy-Mercury App.pdf` — Banking application
- ❌ `~/clawd/dataroom-assets/legal/Tobe Energy-*Insurance*.pdf` — Insurance forms

### Government Applications (May be Sensitive)
- ❌ `~/clawd/tea-agent-inputs/ENG_GRANT_NavySBIR_N242-070.pdf` — Navy SBIR application

### Unpublished Work
- ❌ `ENG_Expanding_Maxwell_Draft_AcademicPub_v2.pdf` — Unpublished academic paper

### Founder Drafts
- ❌ `Tobe_Energy_TEA_Founder_Forward_March_2026.docx` — Internal draft
- ❌ `Tobe_Energy_TEA_Editorial_Companion_March_2026.docx` — Editorial notes
- ❌ `Tobe_TEA_Narrative_v1.md` — Working draft

---

## VERIFICATION CHECKLIST

After copying files, verify:

1. **File Count:**
   ```bash
   find public/docs -type f | wc -l
   # Should be ~80-90 files
   ```

2. **Total Size:**
   ```bash
   du -sh public/docs
   # Should be ~20-25MB (excluding media)
   ```

3. **No Customer Names (except Zeeco/TU):**
   ```bash
   grep -r "Bechtel\|Tulco\|Tulsa Combustion" public/docs/
   # Should return NO results
   ```

4. **All PDFs Valid:**
   ```bash
   find public/docs -name "*.pdf" -exec pdfinfo {} \; | grep -c "Pages:"
   # Should match PDF count
   ```

5. **Excel Files Accessible:**
   ```bash
   find public/docs -name "*.xlsx"
   # Verify all financial models present
   ```

---

## POST-COPY ACTIONS

### 1. Convert DOCX to PDF
```bash
# OU Case Study
pandoc ~/clawd/dataroom-assets/market/OU_Case_Study_Final_Report.docx \
  -o public/docs/market/case-studies/OU_Case_Study_Final_Report.pdf
```

### 2. Update Pipeline Summary
```bash
# Edit with latest numbers before copying
nano ~/clawd/dataroom-assets/pipeline/PIPELINE_SUMMARY.md
# Then copy:
cp ~/clawd/dataroom-assets/pipeline/PIPELINE_SUMMARY.md \
   public/docs/pipeline/
```

### 3. Create LOI Redacted Summary
```bash
# Manual creation required—use template above
# Save as: public/docs/pipeline/LOI_SUMMARY_REDACTED.pdf
```

### 4. Create README files
```bash
# Add README to each directory explaining contents
# Example:
cat > public/docs/overview/README.md << 'EOF'
# Overview Documents
Primary investor-facing materials including TEA and technology overview.
EOF
```

### 5. Set Up Access Controls
```bash
# Mark confidential directories in data room UI:
# - /financial/ → Requires NDA
# - /legal/prior-investments/ → Requires NDA
# - /pipeline/ → Requires NDA
# - /engineering/data/ → Requires NDA
```

---

## FINAL SUMMARY

### Documents to Copy: **86 files** (~20MB)

| Category | Files | Size | Access Level |
|----------|-------|------|--------------|
| Overview | 2 | 500KB | PUBLIC |
| Engineering | 25 | 12MB | PUBLIC (specs), CONFIDENTIAL (data) |
| Financial | 6 | 2MB | CONFIDENTIAL (NDA) |
| Market | 15 | 2MB | PUBLIC |
| Legal/IP | 10 | 2MB | PUBLIC (IP), CONFIDENTIAL (SAFEs) |
| Pipeline | 3 | 50KB | CONFIDENTIAL (NDA) |
| Media | 30+ | 130MB | PUBLIC (already serving) |

### Files to Skip: **1,416+ files**
- Internal research outputs
- AI-generated templates
- Operational documents
- Unpublished work

---

## EXECUTION

Run all commands in sequence from `~/clawd/tobe-dataroom-dev/`:

```bash
# 1. Set up structure
cd ~/clawd/tobe-dataroom-dev
mkdir -p public/docs/{overview,engineering/{zeeco-arc,specifications,testing,data},financial/comparables,market/{research,case-studies},legal/{ip,regulatory,corporate,prior-investments},pipeline}

# 2. Copy TIER 1 documents (see above)

# 3. Copy TIER 2 documents (see above)

# 4. Copy TIER 3 documents (see above)

# 5. Perform post-copy actions

# 6. Verify with checklist

# 7. Set access controls in UI
```

---

**Last Updated:** 2026-03-21 17:50 CDT  
**Next Review:** Before launching data room to investors

*END OF RECOMMENDED DOCUMENT LIST*
