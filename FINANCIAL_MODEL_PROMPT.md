# FINANCIAL MODEL BUILD — Comprehensive Prompt

> **Purpose:** Build the definitive Tobe Energy financial model by synthesizing the best elements from all existing models and analyses into a single, investor-ready Excel workbook.
> **Output:** `~/clawd/tobe-dataroom-dev/Tobe_Energy_Financial_Model_FINAL.xlsx`
> **Approach:** Multi-round iteration using Claude Code

---

## ROUND 1 PROMPT — Structure & Data Integration
1. **TEA Narrative (PRIMARY BASIS)** — `~/clawd/tea-agent-inputs/Tobe_TEA_Narrative_v1.md`
   - This is the backbone. Use its structure, assumptions, and methodology as the foundation.
   - Key data: unit economics, cost build-ups, sensitivity analysis, deployment scenarios

2. **Seed Financial Model v8.5.3** — `~/clawd/tea-agent-inputs/FINAL_Tobe_Seed_Financial_Model_v853.xlsx`
   - The most recent model. Has 7-year P&L, facility ramp, revenue projections.
   - Key data: FY1-FY7 revenue/EBITDA/margin, facility count ramp, OpEx structure
   - Also read the review: `~/clawd/dataroom-assets/financial/FINANCIAL_MODEL_REVIEW_v853.md`
   - IMPORTANT: The review found a revenue mismatch — Overview shows $467M FY7 but P&L shows $327.7M. Investigate and resolve.

3. **OU Energy Case Study & Financial Model** — `~/clawd/dataroom-assets/market/OU_Case_Study_Financial_Model.xlsx` + `~/clawd/dataroom-assets/market/OU_Case_Study_Final_Report.docx`
   - Independent third-party validation by University of Oklahoma's Irani Center
   - Key data: $9.81B serviceable market, 8 market segments, $657M profit projection by 2033, 150-mile transportation threshold, HaaS vs equipment sales analysis
   - Executive summary: `~/clawd/dataroom-assets/market/OU_Case_Study_Executive_Summary.md`
   - Overnight summary: `~/clawd/overnight-outputs/01_OU_Case_Study_Summary.md`

4. **TEA Investor-Ready Report** — `~/clawd/tea-agent-inputs/Tobe_Energy_TEA_Investor_Ready_March_2026.pdf`
   - Polished investor-facing TEA with rigorous cost analysis
   - Key data: LCOH breakdown, sensitivity tornado, competitive benchmarking, 45V PTC scenarios

5. **TEA Founder Forward (Editorial Companion)** — `~/clawd/tea-agent-inputs/Tobe_Energy_TEA_Founder_Forward_March_2026.docx`
   - Colby's narrative framing of the TEA for investors
   - Key data: strategic context, go-to-market narrative, founder perspective on numbers

6. **Pre-Seed / Earlier Financial Model v4.3** — `~/clawd/tea-agent-inputs/Fin_FinancialModel_v4.3.0.xlsx`
   - Earlier model from pre-seed round
   - Key data: original assumptions, how projections have evolved, baseline comparisons

### ADDITIONAL REFERENCE FILES

- **Cap Table:** `~/clawd/dataroom-assets/financials/Tobe_Energy_Cap_Table.xlsx`
- **Pipeline Data:** `~/clawd/dataroom-assets/pipeline/TEA_PIPELINE_NARRATIVE.md` + `~/clawd/dataroom-assets/pipeline/PIPELINE_DATA.json`
- **45V GREET Analysis:** `~/clawd/intelligence/greet-analysis/03_45V_COMPLIANCE_MEMO.md`
- **45V PPA ROI:** `~/clawd/intelligence/45V_PPA_ROI_ANALYSIS.md`
- **On-Site Cost Advantage:** `~/clawd/tea-agent-inputs/MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf`
- **Efficiency Test Data:** `~/clawd/tea-agent-inputs/ENG_EfficiencyCalculations.xlsx` + `~/clawd/tea-agent-inputs/ENG_PreCommit_SampleOperatingData.xlsx`
- **Heat & Material Balance:** `~/clawd/tea-agent-inputs/ENG_HMB_HeatAndMaterialBalance.xlsx`
- **Competitive Intel:** `~/clawd/COMPETITIVE_INTEL.md`
- **Financial Model Review:** `~/clawd/dataroom-assets/financial/FINANCIAL_MODEL_REVIEW_v853.md`

### WORKBOOK STRUCTURE

Build the following sheets (tabs), in this order:

#### Tab 1: COVER
- Company name, model version, date, confidentiality notice
- Table of contents with sheet descriptions
- Key contacts: Colby DeWeese, CEO (colby@tobe.energy)

#### Tab 2: EXECUTIVE SUMMARY
- One-page dashboard with key metrics
- Revenue trajectory chart data (FY1-FY7)
- EBITDA margin progression
- Key investment highlights (5-6 bullets)
- Use of funds ($10M seed)
- Current raise terms: $10M seed, $40M pre-money, 15.8% dilution

#### Tab 3: ASSUMPTIONS
- ALL input assumptions in ONE place (yellow-highlighted cells)
- Organized by category:
  - **Electricity:** $0.04/kWh (industrial rate), $0.025/kWh (wind PPA)
  - **Efficiency:** 42.8 kWh/kg (conservative base), 46.08 kWh/kg (measured), 39.6 kWh/kg (optimized)
  - **H₂ Pricing:** $25/kg (blended ASP from pipeline), with range $15-$47/kg from real quotes
  - **Capacity:** T-25 = 25 kg/day, T-125 = 125 kg/day
  - **Utilization:** 85% (Year 1), 90% (Year 2), 95% (steady state)
  - **Capex:** T-25 unit cost, T-125 unit cost, facility buildout
  - **OpEx:** Electricity, water, maintenance, labor, insurance, SGA
  - **Learning curve:** Cost reduction per doubling of cumulative production
  - **45V PTC:** $3.00/kg for 10 years (with and without scenarios)
  - **Facility ramp:** 1 → 2 → 4 → 6 → 8 → 10 → 12 facilities over 7 years
- Source citation for every assumption (comment or adjacent cell)

#### Tab 4: UNIT ECONOMICS
- Per-kg cost build-up (TEA methodology):
  - Direct variable cost: electricity + water + consumables
  - Cash operating cost: + labor + maintenance + insurance
  - All-in economic cost: + depreciation + SGA allocation
- Three scenarios: Conservative (85% HHV), Base (92% HHV), Optimized (94% HHV)
- Revenue per kg at different price points ($15, $20, $25, $30, $47)
- Gross margin at each price point
- Contribution margin analysis
- Break-even analysis (units, revenue, timeline)
- Compare: Tobe on-site ($4.83/kg all-in) vs delivered grey ($20-50/kg market reality)
- Source: TEA Narrative cost tables, FINANCIAL_MODEL_REVIEW_v853.md, actual customer quotes (Zeeco $30, Tulsa $47, Seattle $30+, Airgas $100+)

#### Tab 5: REVENUE MODEL
- Revenue by stream: H₂ Production (recurring), Equipment Sales, Services
- Revenue by customer/opportunity (from pipeline):
  | Customer | Codename | kg/day | $/kg | Annual Rev | Gross Margin |
  |----------|----------|--------|------|------------|-------------|
  | Tulco Oils | REFINERY | 500 | $15 | $2.74M | 87% |
  | Tulsa Combustion | FORGE | 133 | $25 | $1.21M | 92% |
  | UTulsa | CAMPUS | 32 | $20 | $0.23M | 90% |
  | Zeeco | CARDINAL | 50 | $30 | $0.55M | 94% |
  | TriMet Portland | TRANSIT | 500+ | TBD | $19M proposal | — |
  | Nucor/UIG | FORGE-STEEL | TBD | TBD | $7M-$49M | — |
  | Bechtel | TITAN | TBD | TBD | Large scale | — |
- Pipeline summary: $20M+ signed LOIs, $26M+ active quotes, $75M+ scale potential
- Revenue ramp by facility: show how each new facility adds capacity and revenue
- HaaS (Hydrogen-as-a-Service) vs Equipment Sales mix over time
- Source: TEA_PIPELINE_NARRATIVE.md, PIPELINE_DATA.json, v8.5.3 model

#### Tab 6: P&L (7-YEAR)
- Full income statement FY1-FY7
- Revenue (H₂ + Equipment + Services)
- COGS (electricity, water, consumables, direct labor, maintenance)
- Gross Profit & Gross Margin
- Operating Expenses (SGA, R&D, marketing)
- EBITDA & EBITDA Margin
- Depreciation & Amortization
- Interest Expense (CSC Leasing debt component)
- Pre-tax Income
- Tax (with 45V PTC offset)
- Net Income
- Monthly granularity for FY1-FY2, quarterly for FY3-FY4, annual FY5-FY7
- Pull from v8.5.3 model but reconcile the $467M vs $327.7M FY7 discrepancy

#### Tab 7: CASH FLOW
- Operating cash flow
- Capex schedule (facility buildouts, equipment purchases)
- Financing (seed round, future rounds placeholder)
- Free cash flow
- Cash balance over time
- Months of runway calculation
- Current position: $1.13M cash (Dec 2025), ~$109K/month burn → UPDATE TO CURRENT (flag for Colby)

#### Tab 8: FACILITY RAMP
- Facility-by-facility deployment schedule
- Each facility: location, capacity (kg/day), capex, timeline, customer(s) served
- Cumulative capacity build
- Facility unit economics (revenue per facility, cost per facility, payback period)
- Geographic expansion strategy: Oklahoma → Central US → National
- Source: v8.5.3 model facility schedule, TEA deployment scenarios

#### Tab 9: 45V TAX CREDIT ANALYSIS
- Full 45V PTC calculation per facility
- Tier qualification: 0.03 kgCO₂e/kg (Tier 1, $3.00/kg)
- Annual PTC value by facility
- 10-year cumulative PTC
- Scenario analysis: WITH 45V vs WITHOUT 45V
- PPA cost ($1.1M/yr) vs PTC benefit ($2.7M/yr) = $1.6M net/yr
- GREET model compliance summary
- Political/regulatory risk factors
- Source: 03_45V_COMPLIANCE_MEMO.md, 45V_PPA_ROI_ANALYSIS.md

#### Tab 10: MARKET & TAM
- Global hydrogen market: 94M tonnes/yr, $226B
- U.S. market breakdown
- Serviceable market: $9.81B (OU validated)
- 8 market segments with sizing (from OU case study)
- 150-mile transportation cost threshold (OU key finding)
- On-site vs delivered cost comparison
- Grey H₂ delivered cost breakdown: production $1/kg + compression $0.75 + transport $8+ = $9.80+/kg
- Tobe's addressable segment: industrial customers >150 miles from grey hubs
- Source: OU_Case_Study_Financial_Model.xlsx, OU_Case_Study_Final_Report.docx, TEA Narrative

#### Tab 11: COMPETITIVE LANDSCAPE
- Named competitor comparison table:
  | Company | Technology | Efficiency | Funding | Status |
  |---------|-----------|-----------|---------|--------|
  | Tobe Energy | Membrane-free | 42-46 kWh/kg | $1.8M | Raising $10M seed |
  | Nel ASA | PEM/ALK | 55-60 kWh/kg | Samsung 9.1% stake | Public, $500M+ mfg |
  | ITM Power | PEM | 50-58 kWh/kg | — | 20MW Wales project |
  | Plug Power | PEM | 50+ kWh/kg | Multi-billion | Not profitable |
  | Bloom Energy | SOEC | 800°C op | — | $188M electrolyzer rev |
  | Electric Hydrogen | PEM | — | Well-funded | Startup |
  | Enapter | AEM | — | — | Modular, US expanding |
  | Advanced Ionics | Steam | — | Early stage | Different approach |
- Tobe's differentiation: no membrane, no rare earths, near-ambient, lowest $/kg
- Source: COMPETITIVE_INTEL.md, comps folder in dataroom-assets

#### Tab 12: CAP TABLE
- Pre-seed cap table (pull from Tobe_Energy_Cap_Table.xlsx):
  - Founders (Common): 10,000,000 shares / 70.7%
  - Option Pool (2025 EIP): 1,111,120 / 7.9%
  - Convertible Notes: 3,037,038 / 21.5%
- Pre-seed investors: Techstars ($620K), Cortado ($600K), Wave Function ($350K), Scissortail ($150K), Hurricane ($150K), Angels ($45K)
- Post-seed pro forma at $40M pre-money, $10M raise, 15.8% dilution
- SAFEs and note conversion mechanics
- Source: Tobe_Energy_Cap_Table.xlsx

#### Tab 13: SENSITIVITY ANALYSIS
- Tornado chart data for LCOH sensitivity:
  - Electricity price (±$0.02/kWh)
  - System efficiency (±10%)
  - H₂ selling price (±$5/kg)
  - Utilization rate (±10%)
  - 45V PTC (with/without)
  - Capex (±20%)
- Scenario matrix: Bull / Base / Bear for each key variable
- Monte Carlo-style ranges if tractable
- IRR and NPV at different discount rates (10%, 15%, 20%, 25%)
- Source: TEA sensitivity tables, v8.5.3 model

#### Tab 14: SOURCES & NOTES
- Complete source citation for every major assumption
- Methodology notes
- Glossary of terms (HHV, LHV, LCOH, PTC, PPA, etc.)
- Data vintage dates
- Disclaimer / confidentiality notice

### FORMATTING REQUIREMENTS
- Use `openpyxl` (NOT pandas) for building — this is a live model with formulas
- ALL derived values should be FORMULAS referencing the Assumptions tab, not hardcoded
- Yellow highlight for input assumptions
- Blue for calculated outputs
- Green for positive results, red for negative
- Consistent number formatting: $#,##0 for currency, #,##0 for units, 0.0% for percentages
- Freeze panes on header rows
- Print area set for each sheet
- Named ranges for key assumptions
- Error checking: no #REF, #DIV/0, #VALUE, #NAME errors
- Comments on non-obvious cells explaining the logic

### CRITICAL RULES
1. Every number must trace back to a source document — no making up data
2. When sources conflict, use the most recent (v8.5.3 > v4.3 > OU model)
3. The TEA Narrative is the methodological backbone — use its cost build-up approach
4. The OU case study provides independent market validation — use its TAM/SAM/SOM
5. Flag any number you're uncertain about with a comment "⚠️ NEEDS VERIFICATION"
6. The model must work WITHOUT 45V credits (show it both ways)
7. Use $0.04/kWh electricity everywhere (not the old $0.035)
8. Stack SEC = 42.2 kWh/kg, System SEC = 46.5 kWh/kg — keep this distinction consistent
9. Do NOT include the pitch deck password in the model

### EXECUTION APPROACH
1. First, read ALL source files thoroughly
2. Build the Assumptions tab first — everything flows from here
3. Build Unit Economics next — this validates the core thesis
4. Build P&L and Cash Flow — these are what investors scrutinize most
5. Add supporting tabs (Market, Competitive, Cap Table)
6. Run error checks on every sheet
7. Save and verify the file opens correctly

---

## ROUND 2 PROMPT — Polish & Investor-Ready Formatting

After Round 1 produces a working model, use this prompt for the polish pass:

You have a working financial model at `~/clawd/tobe-dataroom-dev/Tobe_Energy_Financial_Model_FINAL.xlsx`. Now make it investor-ready.

### VISUAL POLISH
1. **Cover sheet**: Add Tobe Energy branding — use the orange (#ff6b35) and dark (#0a0a0f) color scheme
2. **Executive Summary**: Make this a printable one-pager with chart-ready data
3. **Consistent styling across ALL tabs**:
   - Header row: dark background (#1a1a2e), white text, bold
   - Assumption inputs: yellow fill (#FFF2CC), bold border
   - Calculated cells: light blue fill (#D6EAF8)
   - Totals/subtotals: bold, top border
   - Negative numbers: red text
   - Section headers within sheets: merged cells, dark fill
4. **Column widths**: Auto-fit with minimum 12 characters
5. **Number formats**: Consistent across all sheets
   - Currency: $#,##0 (no decimals for large numbers), $#,##0.00 (for per-unit)
   - Percentages: 0.0% or 0.00%
   - Dates: MMM-YY
   - Large numbers: $#,##0,, "M" where appropriate
6. **Print setup**: Landscape, fit to width, headers/footers with company name and page numbers
7. **Freeze panes**: Row headers and column labels frozen on every sheet

### DATA VALIDATION
1. Run a formula audit — every formula should reference Assumptions tab where applicable
2. Check for hardcoded numbers that should be formulas
3. Verify all cross-sheet references resolve correctly
4. Test scenarios: change electricity price on Assumptions tab → verify it flows through ALL sheets
5. Ensure the P&L balances (revenue - costs = profit on every line)
6. Verify the cap table percentages sum to 100%
7. Confirm the 45V analysis matches the GREET memo numbers exactly

### INVESTOR-FACING TOUCHES
1. Add a "How to Use This Model" note on the Cover tab
2. Add data validation dropdowns for scenario selection (Bull/Base/Bear)
3. Add conditional formatting for key thresholds (e.g., margin < 20% = red)
4. Ensure every tab can stand alone as a printed page
5. Add page breaks at logical points
6. Remove any internal notes, TODOs, or draft markers
7. Final proofread: company name spelling, consistent terminology, no typos

### DELIVERABLES
- Save polished version as: `~/clawd/tobe-dataroom-dev/Tobe_Energy_Financial_Model_FINAL.xlsx`
- Also export a PDF of the Executive Summary tab: `~/clawd/tobe-dataroom-dev/Tobe_Energy_Financial_Summary.pdf`

---

## ITEMS REQUIRING COLBY'S INPUT (flag these, don't guess)

1. **Current cash position** — model has Dec 2025 ($1.13M). What's the March 2026 number?
2. **Current burn rate** — was $109K/month in Dec 2025. Has it changed?
3. **Debt terms** — is the CSC Leasing rate 5.5% or 7%? Sources conflict.
4. **Seed round structure** — confirm: $7.5M equity + $2.5M debt? Or different split?
5. **Which pipeline customers can be named vs. codenames only?**
6. **T-125 unit cost** — is there a firm number or still estimated?
7. **Facility buildout capex** — what does a full production facility cost?
8. **Current team headcount and burn allocation** — for SGA projections
9. **Any LOIs signed since March 19?**
10. **Confirm FY1 start date** — the v8.5.3 model uses April 2026. Still accurate?
