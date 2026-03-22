# BUSINESS SECTION — Content Improvement Plan

> **Audit Date:** March 21, 2026
> **Auditor:** Ren ⚡ (subagent)
> **Scope:** /business-model, /customers, /tax-credits, /financials
> **Reference docs copied to:** `reference-docs/business/{financials,pipeline,market,legal}/`

---

## EXECUTIVE SUMMARY

The business section is **60% complete**. The financials page is excellent (backed by v8.5.3 model data). The tax-credits page is thorough. But the business-model and customers pages have critical gaps that sophisticated investors will catch immediately:

1. **No TAM/SAM/SOM** — the data exists (`MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf`) but isn't on any page
2. **No competitive landscape** — no named competitors, no funding/valuation comparisons
3. **No cap table** — investors need to see ownership structure before writing a check
4. **No go-to-market strategy** — how does Tobe go from 2 deployments to 12 facilities?
5. **Pipeline uses codenames only** — investors want to see real LOI details, not spy movie labels
6. **Unit economics are good but missing TEA-backed numbers** — the TEA has rigorous cost build-ups

---

## PAGE-BY-PAGE ANALYSIS

---

### 1. /business-model (`src/app/business-model/page.tsx`)

#### What's Currently There
- Unit economics: Tobe cost <$5/kg, market prices $20-50+/kg, 80%+ gross margin
- Market price reality table (Zeeco $30, Tulsa $47, Seattle $30+, Airgas $100+)
- Revenue streams: H₂ Production 82%, Equipment 16%, Services 2%
- 7-year financial trajectory (FY1-FY7 revenue/EBITDA/margin)
- Funding roadmap (Pre-Seed $2M closed, Seed $10M raising)
- Use of funds breakdown
- Competitive moat (4 cards: no membrane, 94% efficiency, near-ambient, vertical integration)

#### What's MISSING

**CRITICAL — Investors will ask for these immediately:**

1. **TAM/SAM/SOM Section**
   - Global TAM: 20-30M tons/yr (~$60-90B at $3/kg)
   - U.S. TAM: ~3M tons/yr
   - SAM (regional): 500K-1M tons/yr (industrial corridors in central U.S.)
   - SOM (single hub): ~30,000 tons/yr by Year 10
   - SOM (multiple hubs): ~90,000-120,000 tons/yr
   - **Source:** `MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf` (extracted in DATAROOM_CONTENT.md lines 291-303)

2. **Competitive Landscape with Named Competitors**
   - Need a comparison table showing: Company, Technology, Efficiency, Funding Raised, Valuation, Status
   - Key competitors from `COMPETITIVE_INTEL.md`:
     - **Nel ASA** — PEM/ALK, 55-60 kWh/kg, Samsung 9.1% stake, stock surging, $500M+ mfg expansion
     - **ITM Power** — PEM, 50-58 kWh/kg, 20MW Wales project, 10-yr service deals
     - **Thyssenkrupp Nucera** — ALK, revenue €120-170M, losses widening, German tender suspended
     - **Bloom Energy** — SOEC, 800°C operation, $188M electrolyzer revenue, 497% stock gain
     - **Enapter** — AEM (membrane), modular, US expansion via channel partners
     - **Plug Power** — PEM, largest pure-play, multi-billion funded, not profitable
     - **Electric Hydrogen** — PEM, well-funded startup
     - **Advanced Ionics** — Steam electrolysis, early stage (comp in `FIN_COMPS_Advanced_Ionics_2025_05_13_17_44_26.pdf`)
   - **Source:** `COMPETITIVE_INTEL.md`, `MKRT_RESEARCH_MarketLandscape_CompetitiveBenchmarking.pdf`, `comps/` folder

3. **Cap Table / Ownership Structure**
   - Pre-conversion cap table exists in DATAROOM_CONTENT.md:
     - Founders (Common): 10,000,000 shares / 70.7%
     - Option Pool (2025 EIP): 1,111,120 / 7.9%
     - All Convertibles: 3,037,038 / 21.5%
   - Pre-seed investors: Techstars ($620K), Cortado ($600K), Wave Function ($350K), Scissortail ($150K), Hurricane ($150K), Angels ($45K)
   - Post-seed dilution: 15.8% (at $40M pre-money)
   - **Source:** `Tobe_Energy_Cap_Table.xlsx`, `DATAROOM_CONTENT.md`

4. **Go-to-Market Strategy**
   - Currently NO GTM section anywhere in the data room
   - Should cover:
     - **Land-and-expand model**: Oklahoma anchor → regional expansion
     - **Geographic focus**: Central U.S. first (cheap electricity, wind PPAs, oil & gas transition), then West Coast, then national
     - **Customer acquisition**: Inbound (Bechtel, Nucor came to Tobe), referral (Zeeco → other industrial), direct (TriMet proposal)
     - **Facility deployment plan**: 1 facility FY1 → 4 by FY4 → 12 by FY7
     - **Channel strategy**: Direct for large offtake, system sales for smaller deployments
   - Source: Inferred from pipeline data and financial model facility ramp

5. **The "On-Site vs. Delivered" Value Proposition (deeper)**
   - DOE data: 75-85% of delivered H₂ cost is transport/storage
   - Airgas cylinder: $121.31/kg effective (from `MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf`)
   - Grey H₂ delivered cost breakdown (from financial model):
     - Production: $1.00/kg
     - Compression: $0.75/kg
     - Transportation: $8.00/kg (500-mile)
     - **Total delivered: $9.80/kg+**
   - Tobe on-site: $2.54/kg direct, $4.83/kg all-in
   - **Source:** `FINANCIAL_MODEL_REVIEW_v853.md`, `MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf`

#### What Needs UPDATING

1. **Financial trajectory numbers are slightly off from the actual model**
   - Page shows FY3 revenue $88M, EBITDA $54.6M — model shows $88.3M, $54.9M (close but sloppy)
   - Page shows FY5 revenue $210M — model shows $287M operating revenue
   - Page shows FY7 revenue $328M — model shows $467M operating revenue
   - **The page is using stale/different numbers than the v8.5.3 model**
   - ⚠️ FY7 revenue mismatch is HUGE: $328M on page vs $467M in model

2. **Pre-Seed amount**: Page says "$2M" but cap table shows $1.92M total convertibles + $20K equity = ~$1.94M. Minor but an investor checking will notice.

3. **Seed structure**: Page says "$7.5M equity + $2.5M debt @ 5.5%" but financial model review says 7% rate on the CSC Leasing debt. Which is correct?

4. **Unit economics cost**: Page says "<$5/kg" but the TEA shows different numbers:
   - TEA Investor Ready: $2.57 direct variable, $4.62 cash operating, $5.25 all-in economic
   - Financial model: $2.54 direct, $4.83 all-in
   - Need to pick one and cite it properly

5. **Moat section**: Claims "94% HHV efficiency" but this is the upside/optimized case. Conservative base case is 85% HHV (~42.8 kWh/kg). Measured is 46.08 kWh/kg. Leading with 94% without context is risky — sophisticated investors will catch this.

---

### 2. /customers (`src/app/customers/page.tsx` + `PipelineNetwork/pipelineData.ts`)

#### What's Currently There
- Pipeline dashboard component with 13 opportunities
- Codename-based display (SHOWROOM, CARDINAL, TRANSIT, etc.)
- Status tags: contracted, LOI signed, active quote, interest
- Pipeline stats: $100M+ total, $32M active quotes, 12 opportunities
- Geographic regions and sector tags
- Values shown for most opportunities

#### What's MISSING

1. **Real Company Names (or at least industry context)**
   - CARDINAL = Zeeco — the world's largest combustion R&D center. Investors need to know this.
   - REFINERY = Tulco Oils — $8.2M/3yr LOI at $15/kg
   - FORGE = Tulsa Combustion — $3.6M/3yr at $25/kg
   - CAMPUS = University of Tulsa — $691K/3yr at $20/kg
   - TRANSIT = TriMet Portland — $19M transit proposal
   - FORGE-STEEL = Nucor/UIG — largest US steel producer
   - PHOENIX = Loa Carbon — e-fuels startup
   - HORIZON = New Day Hydrogen — mobility/fueling
   - TITAN = Bechtel — $44B EPC firm
   - **Decision needed from Colby:** Which names can be revealed? At minimum, Zeeco is public (FEED package exists). Bechtel inbound is probably safe to name.

2. **Offtake Agreement Details**
   - Signed LOI pricing, volumes, and contract terms should be visible
   - Summary table from TEA_PIPELINE_NARRATIVE.md:
     | Customer | kg/day | $/kg | Annual Revenue | Gross Margin |
     |----------|--------|------|----------------|-------------|
     | Tulco | 500 | $15 | $2.74M | 87% |
     | Tulsa Combustion | 133 | $25 | $1.21M | 92% |
     | UTulsa | 32 | $20 | $0.23M | 90% |
   - **Source:** `TEA_PIPELINE_NARRATIVE.md`

3. **Pipeline Progression Metrics**
   - How fast are deals moving? When did each LOI get signed?
   - Conversion rate from interest → LOI → contracted
   - Average deal size by sector

4. **Customer Testimonials / LOI Excerpts**
   - Actual LOI documents exist in `dataroom-assets/lois/LOI-Letters of Intent/`
   - Could show redacted excerpts or pull quotes
   - At minimum, show the LOI Summary document (`MKRT_LOI_Summary.pdf`)

5. **Deployment Timeline**
   - Q2 2026: CARDINAL (Zeeco) — first commercial deployment
   - Q3 2026: CAMPUS (UTulsa)
   - Q1 2027: REFINERY (Tulco)
   - 2027+: PHOENIX, TRANSIT, FORGE-STEEL
   - **Source:** `TEA_PIPELINE_NARRATIVE.md`

6. **Sector Diversity Visualization**
   - 7 sectors is a strength — show it visually
   - Industrial, Mobility, E-fuels, Academic, Steel, Transit, EPC
   - Proves technology is horizontal, not niche

#### What Needs UPDATING

1. **SHOWROOM entry** — not in the original pipeline narrative. Is this the containerized showroom unit? If so, it's internal, not a customer. Should be flagged differently or removed.

2. **CARDINAL contract value is missing** — every other opportunity has a dollar value. Zeeco currently pays $30/kg; at 50 kg/day × 365 × $30 = $547K/yr. Show this.

3. **Pipeline total says "$100M+"** — should break down: $20M+ signed LOIs, $26M+ active quotes, $75M+ scale potential. These numbers are in TEA_PIPELINE_NARRATIVE.md.

4. **VAULT and TITAN have minimal data** — as noted in CONTENT_GAPS.md. Consider keeping them but marking as "Early Stage" more clearly.

5. **EUROPA (Germany)** appears in pipelineData.ts but NOT in TEA_PIPELINE_NARRATIVE.md. Is this real? Source needed.

---

### 3. /tax-credits (`src/app/tax-credits/page.tsx`)

#### What's Currently There
- 45V credit tier ladder (4 tiers, Tobe targeting $3/kg max)
- Oklahoma grid analysis (SPP/Plains emission profile)
- Renewable PPA scenarios (0% to 100% clean)
- PPA ROI analysis ($1.1M PPA cost → $2.7M credit → $1.6M net/yr)
- Efficiency advantage vs PEM/ALK (24-30% less power needed)
- Multi-facility scale ($27M → $108M → $324M over 10 years)
- Risk factors (4 risks: construction deadline, hourly matching, additionality, political)

#### What's MISSING

1. **Updated 45V Regulatory Status**
   - OBBBA (One Big Beautiful Bill Act) implications for construction deadline
   - Current Treasury rule status — is it finalized or still proposed?
   - Timeline pressure: must begin construction by Dec 2027
   - Which facilities qualify: F1-F4 per TEA (F1 Tulsa, F2 OKC, F3 Seattle, F4 Spokane)
   - **Source:** `Tobe_TEA_Narrative_v1.md`, `45V_GREET_ANALYSIS.md`

2. **"Without 45V" Scenario**
   - The financial model review explicitly recommends adding a "No PTC" scenario
   - Even without $3/kg credit, unit economics work: $4.83 all-in cost vs $20-50 selling price
   - The business survives without 45V. Show this. It de-risks the investment thesis.

3. **45V Impact on Financial Projections**
   - Show PTC as a line item in the P&L context
   - FY2: $1.4M PTC, FY3: $8.9M, FY4+: $10.8M/yr
   - Compare EBITDA with and without PTC

#### What Needs UPDATING

1. **"$16M" 10-year net per facility** — the tax-credits page shows $16M net (after PPA costs) but the financials page shows $27M gross. These are both right but confusing. Need consistent framing.

2. **Construction deadline**: Page says "proposed" — need to update based on current regulatory status (OBBBA may have changed this).

#### Assessment
This page is **the strongest of the four business pages**. Minor updates needed, mostly regulatory freshness.

---

### 4. /financials (`src/app/financials/page.tsx` → `FinancialDashboard.tsx`)

#### What's Currently There
- Complete 7-year P&L (stacked area chart + table with 18 rows of data)
- Revenue growth by stream (H₂, Equipment, Services)
- FY7 revenue mix pie chart
- EBITDA & Net Income combo chart with margin line
- OpEx buildup (People, Facilities, Prof Fees, R&D)
- Cash position chart
- Unit economics: cost comparison vs grey H₂, margin sensitivity, product line cards (T-25/T-125/T-2500)
- Fundraising rounds table (Pre-Seed through Series D with step-ups)
- Use of funds breakdown (pie + progress bars)
- 45V tax credit section
- AI-embedded manufacturing / learning curve section
- Download link for Excel model

#### What's MISSING

1. **Current Cash Position & Burn Rate**
   - DATAROOM_CONTENT.md shows Dec 2025 numbers: $1.13M cash, $109K/month burn
   - These are 3 months stale — need March 2026 numbers from Colby
   - **Investors will ask "what's your runway?" — this is table stakes**

2. **Pro Forma Cap Table (Post-Seed)**
   - Pre-conversion shown in DATAROOM_CONTENT.md but no post-seed dilution table
   - Need: Pre-seed ownership → Post-seed ownership with dilution waterfall
   - Seed: $40M pre-money, $7.5M equity, 15.8% dilution
   - **Source:** `Tobe_Energy_Cap_Table.xlsx`, `FINANCIAL_MODEL_REVIEW_v853.md`

3. **Revenue Bridge / Assumptions**
   - How does $0.88M FY1 become $467M FY7?
   - Need facility deployment schedule: 1 → 2 → 4 → 7 → 12
   - H₂ production volume ramp with pricing assumptions
   - Equipment sales pipeline (T-25 → T-125 → T-2500 introduction)

4. **Sensitivity Analysis**
   - H₂ price sensitivity (what if $15/kg instead of $25/kg?)
   - Electricity cost sensitivity
   - Utilization/capacity factor sensitivity
   - The financial model HAS this — extract key scenarios

5. **Key Assumptions Summary**
   - Electricity rate: $0.035/kWh
   - H₂ selling price: $25/kg base case
   - Capacity factor: >85%
   - Facility capex: ~$3.3M each
   - Headcount: 15 → 269 FTEs

#### What Needs UPDATING

1. **Revenue Mismatch Issue**
   - Financial model review flags: "Overview shows FY7 revenue as $467M, but P&L Summary shows $327.7M"
   - The FinancialDashboard.tsx uses $467M (from pnl.opRev array which adds to $466.9M)
   - Need to verify which is correct and ensure consistency

2. **Fundraising table shows Pre-Seed as $2.05M equity** — but cap table shows ~$1.92M convertibles + $20K = $1.94M

3. **Headcount discrepancy**: FinancialDashboard shows 269 at FY7, but DATAROOM_CONTENT.md says 224 FTEs. Different versions of the model?

4. **Download link**: References "v852.xlsx" but the actual file is v853. Update the href.

#### Assessment
This page is **very strong** — the most data-rich page in the entire data room. It's essentially a standalone financial dashboard. Main gaps are current cash position, cap table, and assumptions transparency.

---

## CROSS-CUTTING EVALUATION

### Are financial projections backed by the actual model?
**YES, mostly.** The FinancialDashboard.tsx hardcodes numbers that match the v8.5.3 model review. However:
- The business-model page has stale/mismatched numbers (FY5 shows $210M vs model's $287M, FY7 shows $328M vs $467M)
- The financial model review flags a potential internal mismatch between Overview and P&L sheets

### Does the pipeline page show real LOI data?
**PARTIALLY.** The pipeline data uses real values from signed LOIs, but:
- Uses codenames only (investors can't evaluate customer quality without names)
- Missing Zeeco contract value
- EUROPA entry has no source in the pipeline narrative
- No LOI excerpts or proof points shown

### Is the TAM/SAM/SOM anywhere?
**NO.** Data exists in `MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf` and is extracted in DATAROOM_CONTENT.md, but it appears on zero pages in the data room.

### Is the cap table shown anywhere?
**NO.** Pre-conversion data exists in Tobe_Energy_Cap_Table.xlsx and is extracted in DATAROOM_CONTENT.md. Not rendered on any page.

### Are unit economics using real delivered pricing?
**YES.** Business-model page shows $20-50+/kg with real quotes (Zeeco $30, Tulsa $47, Seattle $30+, Airgas $100+). Explicitly calls out that online prices of $10-15/kg are fantasy. This is excellent.

### Is the competitive landscape shown?
**NO.** The moat section shows 4 advantages (no membrane, efficiency, temperature, BABA) but NO named competitors, NO funding/valuation comparisons, NO technology comparison table.

### Are customer testimonials or LOI excerpts available?
**LOI PDFs exist** in `dataroom-assets/lois/LOI-Letters of Intent/` for Tulco, Loa Carbon, New Day Hydrogen, UTulsa, Tulsa Combustion. No excerpts are shown in the data room.

### What about go-to-market strategy?
**COMPLETELY ABSENT.** No page describes how Tobe acquires customers, expands geographically, or scales from pilot to national footprint. The pipeline SHOWS what's happening but doesn't explain the strategy.

---

## PRIORITY IMPROVEMENTS (Ranked)

| Priority | Gap | Impact | Effort |
|----------|-----|--------|--------|
| 🔴 P0 | Fix business-model financial trajectory (stale numbers) | Data integrity | Low |
| 🔴 P0 | Add TAM/SAM/SOM to business-model page | Investor must-have | Medium |
| 🔴 P0 | Add cap table section (business-model or financials) | Investor must-have | Medium |
| 🔴 P0 | Add competitive landscape section | Investor must-have | Medium |
| 🟡 P1 | Add go-to-market strategy section | Important narrative | Medium |
| 🟡 P1 | Reveal customer names on pipeline (or add industry context) | Credibility | Low (needs Colby OK) |
| 🟡 P1 | Add "without 45V" scenario to tax-credits page | De-risks thesis | Low |
| 🟡 P1 | Add current burn rate / runway to financials | Investor must-have | Low (needs Colby input) |
| 🟡 P1 | Add deployment timeline to customers page | Shows execution plan | Low |
| 🟢 P2 | Add LOI excerpts / social proof | Builds confidence | Medium |
| 🟢 P2 | Add sensitivity analysis to financials | Shows rigor | Medium |
| 🟢 P2 | Add key assumptions summary to financials | Transparency | Low |
| 🟢 P2 | Fix Excel download link (v852 → v853) | Polish | Trivial |

---

## CODING PROMPT — IMPLEMENT ALL IMPROVEMENTS

Below is a detailed prompt for a coding agent to implement every improvement identified above.

---

### CODING PROMPT: Business Section Overhaul

**Context:** Tobe Energy investor data room. Next.js app with NERV/terminal aesthetic (dark bg #0a0a0f, orange #ff6b35, green #00ff88, blue #00d4ff accents). Framer Motion animations. Font: mono. All pages use the same visual language — ASCII art headers, terminal-style progress bars, glowing text shadows.

**Files to modify:**
1. `src/app/business-model/page.tsx` — Major content additions
2. `src/components/PipelineNetwork/pipelineData.ts` — Data updates
3. `src/app/customers/page.tsx` — Add sections
4. `src/app/tax-credits/page.tsx` — Add "without 45V" scenario
5. `src/app/financials/page.tsx` or `src/components/FinancialDashboard.tsx` — Cap table, assumptions, sensitivity

**Reference files (all in `reference-docs/business/`):**
- `financials/FINANCIAL_MODEL_REVIEW_v853.md` — Detailed model review with all numbers
- `pipeline/TEA_PIPELINE_NARRATIVE.md` — Full pipeline details with real names/values
- `market/COMPETITIVE_INTEL.md` — Named competitor data with funding/status
- `market/Tobe_TEA_Narrative_v1.md` — TEA with unit economics, fundraising trajectory

---

#### TASK 1: Fix Business-Model Financial Trajectory

**File:** `src/app/business-model/page.tsx`

Replace the `financials` array with numbers from the actual v8.5.3 model:

```typescript
const financials = [
  { year: 'FY1', revenue: '$0.9M', ebitda: '-$2.7M', margin: '—', note: 'First deployment (Zeeco)' },
  { year: 'FY2', revenue: '$16.1M', ebitda: '$3.8M', margin: '23.3%', note: 'First H₂ revenue + equipment sales' },
  { year: 'FY3', revenue: '$88.3M', ebitda: '$54.9M', margin: '62.2%', note: 'Scale inflection — 4 facilities' },
  { year: 'FY4', revenue: '$176.2M', ebitda: '$110.5M', margin: '62.7%', note: 'T-2500 introduction' },
  { year: 'FY5', revenue: '$287.3M', ebitda: '$177.6M', margin: '61.8%', note: '7 facilities operating' },
  { year: 'FY6', revenue: '$399.4M', ebitda: '$243.1M', margin: '60.9%', note: 'Regional expansion' },
  { year: 'FY7', revenue: '$466.9M', ebitda: '$277.6M', margin: '59.4%', note: '12 facilities — national footprint' },
];
```

**Source:** `FinancialDashboard.tsx` pnl.opRev and pnl.ebitda arrays, `FINANCIAL_MODEL_REVIEW_v853.md`

---

#### TASK 2: Add TAM/SAM/SOM Section to Business-Model

**File:** `src/app/business-model/page.tsx`

Add a new section (SECTION 03.6) after Competitive Moat:

```typescript
const marketSize = {
  tam: { label: 'Global TAM', value: '$60-90B', sub: '20-30M tons/yr green H₂ by mid-2030s' },
  usTam: { label: 'U.S. TAM', value: '~3M tons/yr', sub: '~15% of global, 20-25% green penetration' },
  sam: { label: 'SAM (Regional)', value: '500K-1M tons/yr', sub: 'Industrial corridors — OK, TX, CA, Gulf Coast' },
  som: { label: 'SOM (Year 10)', value: '90-120K tons/yr', sub: '3-4 regional hubs, ~10% of SAM' },
};
```

Visual: Concentric circles or nested bars showing TAM → SAM → SOM funnel. Use the terminal aesthetic — maybe a text-based funnel or stacked bar.

Add note: "Key assumption: Electricity at ~$0.10/kWh in Oklahoma → production cost near ~$1/kg, competitive with SMR. Cost parity with fossil H₂ at electricity rates below $0.138/kWh."

**Source:** `MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf` as extracted in `DATAROOM_CONTENT.md` lines 291-303

---

#### TASK 3: Add Competitive Landscape Section to Business-Model

**File:** `src/app/business-model/page.tsx`

Add section 03.7 — Competitive Landscape. Data:

```typescript
const competitors = [
  {
    name: 'Tobe Energy',
    tech: 'Membrane-Free',
    efficiency: '42-46 kWh/kg',
    opTemp: '~28°C',
    membrane: 'None',
    preciousMetals: 'None',
    funding: '$1.9M (pre-seed)',
    status: 'First deployment Q2 2026',
    highlight: true,
  },
  {
    name: 'Nel ASA',
    tech: 'PEM + Alkaline',
    efficiency: '55-60 kWh/kg',
    opTemp: '60-80°C',
    membrane: 'PEM membrane',
    preciousMetals: 'Iridium, Platinum',
    funding: '$500M+ mfg expansion',
    status: 'Samsung 9.1% stake, 686M NOK orders',
  },
  {
    name: 'ITM Power',
    tech: 'PEM',
    efficiency: '50-58 kWh/kg',
    opTemp: '60-80°C',
    membrane: 'PEM membrane',
    preciousMetals: 'Iridium, Platinum',
    funding: 'Public (LON: ITM)',
    status: '20MW Wales project, 10-yr service deals',
  },
  {
    name: 'Plug Power',
    tech: 'PEM',
    efficiency: '55-60 kWh/kg',
    opTemp: '60-80°C',
    membrane: 'PEM membrane',
    preciousMetals: 'Iridium, Platinum',
    funding: '$5B+ raised',
    status: 'Largest pure-play, not profitable',
  },
  {
    name: 'Bloom Energy',
    tech: 'SOEC',
    efficiency: '37-42 kWh/kg',
    opTemp: '800°C',
    membrane: 'Solid Oxide',
    preciousMetals: 'Various',
    funding: 'Public (NYSE: BE)',
    status: '$188M electrolyzer rev, 497% stock gain',
  },
  {
    name: 'Thyssenkrupp Nucera',
    tech: 'Alkaline',
    efficiency: '51-56 kWh/kg',
    opTemp: '60-80°C',
    membrane: 'Diaphragm',
    preciousMetals: 'None (KOH electrolyte)',
    funding: 'Public (FRA: NCR2)',
    status: 'Revenue €120-170M, losses widening',
  },
  {
    name: 'Enapter',
    tech: 'AEM',
    efficiency: '52-57 kWh/kg',
    opTemp: '60°C',
    membrane: 'AEM membrane',
    preciousMetals: 'Minimal',
    funding: 'Public (FRA: H2O)',
    status: 'US expansion via channel partners',
  },
];
```

Include a callout box: "The hydrogen sector has seen 30 years of survival without profit. Companies survive via recapitalization cycles — hype, funding, burn, repeat. Tobe breaks this cycle with sub-$5/kg all-in cost and 80%+ gross margins from day one."

**Source:** `COMPETITIVE_INTEL.md` (March 18, 2026 update), `TEA_Deep_Research_Report.md`

---

#### TASK 4: Add Cap Table Section

**File:** `src/app/business-model/page.tsx` (new section 03.8) OR `src/components/FinancialDashboard.tsx` (new section)

**Recommended: Add to business-model page** (investors expect ownership info near funding discussion)

```typescript
const capTable = {
  preSeed: [
    { shareholder: 'Founders (Common)', shares: '10,000,000', pct: 70.7 },
    { shareholder: 'Option Pool (2025 EIP)', shares: '1,111,120', pct: 7.9 },
    { shareholder: 'Convertible Notes & SAFEs', shares: '3,037,038', pct: 21.5 },
  ],
  investors: [
    { name: 'Techstars (Accelerator + Ventures)', amount: '$620K', instrument: 'Equity + SAFE', cap: '$3M / $10M' },
    { name: 'Cortado Ventures (Fund II + SSBCI)', amount: '$600K', instrument: 'SAFE', cap: '$10M' },
    { name: 'Wave Function Ventures', amount: '$350K', instrument: 'SAFE', cap: '$10M' },
    { name: 'Scissortail Ventures', amount: '$150K', instrument: 'SAFE', cap: '$10M' },
    { name: 'Hurricane Ventures', amount: '$150K', instrument: 'SAFE', cap: '$10M' },
    { name: 'Individual Angels (3)', amount: '$45K', instrument: 'SAFE', cap: '$10M' },
  ],
  seedTerms: {
    preMoney: '$40M',
    equityRaise: '$7.5M',
    debtRaise: '$2.5M (CSC Leasing, 7%, 36-mo)',
    postMoney: '$47.5M',
    seedDilution: '15.8%',
  },
};
```

Visual: Donut chart showing ownership %, investor table with amounts, and seed terms callout.

**Source:** `Tobe_Energy_Cap_Table.xlsx`, `DATAROOM_CONTENT.md`, `FINANCIAL_MODEL_REVIEW_v853.md`

---

#### TASK 5: Add Go-to-Market Strategy Section

**File:** `src/app/business-model/page.tsx` (new section 03.9)

```typescript
const gtmStrategy = {
  phases: [
    {
      phase: 'Phase 1: Oklahoma Anchor (FY1-FY2)',
      description: 'Prove the model in home territory. Zeeco deployment validates technology. Local offtake agreements (Tulco, UTulsa, Tulsa Combustion) generate recurring revenue. Cheap electricity ($0.035/kWh), strong wind PPAs, oil & gas workforce transition.',
      facilities: '1-2',
      revenue: '$0.9M → $16M',
    },
    {
      phase: 'Phase 2: Regional Expansion (FY3-FY4)',
      description: 'Replicate Tulsa blueprint in OKC, Texas, and West Coast. TriMet Portland and Nucor steel mills provide scale. T-125 commercial production begins.',
      facilities: '3-7',
      revenue: '$88M → $176M',
    },
    {
      phase: 'Phase 3: National Footprint (FY5-FY7)',
      description: 'T-2500 commercial introduction. 12 operating facilities. Multiple hubs serving industrial corridors. Equipment sales to third parties accelerate.',
      facilities: '7-12',
      revenue: '$287M → $467M',
    },
  ],
  channels: [
    { channel: 'Inbound', example: 'Bechtel, Nucor/UIG came to Tobe', pct: '40%' },
    { channel: 'Referral Network', example: 'Zeeco → other industrials via EPC relationship', pct: '35%' },
    { channel: 'Direct Outreach', example: 'TriMet proposal, transit authorities', pct: '25%' },
  ],
  facilityDeployment: [
    { period: 'FY1', facilities: 1, location: 'Tulsa (Zeeco ARC)' },
    { period: 'FY2', facilities: 2, location: '+ OKC' },
    { period: 'FY3', facilities: 4, location: '+ Seattle, Portland' },
    { period: 'FY4', facilities: 7, location: '+ Texas, California' },
    { period: 'FY5-FY7', facilities: 12, location: '+ National' },
  ],
};
```

**Source:** Inferred from `TEA_PIPELINE_NARRATIVE.md` (geographic reach), `FINANCIAL_MODEL_REVIEW_v853.md` (facility ramp), `Tobe_TEA_Narrative_v1.md` (fundraising trajectory mentions geographic expansion)

---

#### TASK 6: Update Pipeline Data with Real Details

**File:** `src/components/PipelineNetwork/pipelineData.ts`

Add these fields to each opportunity (for use in expanded detail views):

```typescript
// Add to Opportunity interface:
export interface Opportunity {
  // ... existing fields ...
  realName?: string;        // Actual company name (if approved for disclosure)
  kgPerDay?: number;        // Capacity in kg/day
  pricePerKg?: string;      // Contract price
  contractTerm?: string;    // e.g., "3 years"
  annualRevenue?: string;   // Annual revenue from this customer
  grossMargin?: string;     // Margin at production cost
  contactName?: string;     // Key contact
  loiDate?: string;         // When LOI was signed
}
```

Update CARDINAL:
```typescript
{
  id: 'cardinal',
  codename: 'CARDINAL',
  realName: 'Zeeco',  // World's largest combustion R&D center
  location: 'Broken Arrow, Oklahoma',
  status: 'contracted',
  value: '$547K/yr',
  capacity: '50 kg/day',
  kgPerDay: 50,
  pricePerKg: '$30/kg (current market)',
  sector: 'Industrial R&D',
  vertical: 'Industrial',
  region: 'oklahoma',
  timeline: 'Q2 2026',
  notes: 'First commercial deployment. FEED package complete. Zeeco has EPC capabilities for future deployments.',
},
```

Update REFINERY:
```typescript
{
  id: 'refinery',
  codename: 'REFINERY',
  realName: 'Tulco Oils',
  ...
  kgPerDay: 500,
  pricePerKg: '$15/kg',
  contractTerm: '3 years',
  annualRevenue: '$2.74M',
  grossMargin: '87%',
  notes: '3-year offtake @ $15/kg. Largest volume LOI. Petroleum refining/chemicals.',
},
```

Similarly for FORGE (Tulsa Combustion, 133 kg/day, $25/kg, $1.21M/yr, 92% margin), CAMPUS (UTulsa, 32 kg/day, $20/kg, $230K/yr, 90% margin), etc.

Add offtake summary to pipelineStats:
```typescript
export const pipelineStats = {
  totalPipeline: '$100M+',
  signedLOIs: '$20M+',
  activeQuotes: '$26M+',
  scalePotential: '$75M+',
  opportunities: 13,
  signedCapacity: '2,165 kg/day',
  sectors: 7,
  regions: 5,
};
```

**Source:** `TEA_PIPELINE_NARRATIVE.md`

---

#### TASK 7: Add Deployment Timeline to Customers Page

**File:** `src/app/customers/page.tsx`

Add a timeline section below the PipelineDashboard component showing the deployment schedule:

```
Q2 2026 ──── CARDINAL (Zeeco) ──── First commercial deployment
Q3 2026 ──── CAMPUS (UTulsa) ──── Academic offtake begins
Q1 2027 ──── REFINERY (Tulco) ──── 500 kg/day industrial offtake
2027    ──── PHOENIX (Loa Carbon) ──── E-fuels system sale
Jul 2027 ─── TRANSIT (TriMet) ──── 14-bus FCEB pilot ($19M)
TBD     ──── FORGE-STEEL (Nucor) ──── 7-site steel mill rollout ($49M potential)
```

Use terminal-aesthetic horizontal timeline with ASCII art.

**Source:** `TEA_PIPELINE_NARRATIVE.md`

---

#### TASK 8: Add "Without 45V" Scenario to Tax Credits

**File:** `src/app/tax-credits/page.tsx`

Add a new section (06.6) titled "The Business Works Without 45V":

```typescript
const without45V = {
  productionCost: '$4.83/kg',
  sellingPrice: '$25/kg (base case)',
  grossMarginWithout: '80.7%',
  message: 'Even with zero tax credits, Tobe\'s unit economics deliver 80%+ gross margins. The 45V credit is upside — not the thesis.',
  comparison: [
    { scenario: 'With 45V ($3/kg credit)', ebitdaFY3: '$54.9M', margin: '62.2%' },
    { scenario: 'Without 45V', ebitdaFY3: '$46.0M', margin: '52.1%' },
    { scenario: 'Difference', ebitdaFY3: '-$8.9M', margin: '-10.1pp' },
  ],
};
```

Callout: "Most hydrogen companies can't survive without subsidies. Tobe is profitable on unit economics alone. The 45V credit accelerates growth — it doesn't create the business."

**Source:** `FINANCIAL_MODEL_REVIEW_v853.md` (recommends "No PTC" scenario), pnl.ptc array in FinancialDashboard.tsx

---

#### TASK 9: Add Key Assumptions & Sensitivity to Financials

**File:** `src/components/FinancialDashboard.tsx`

Add a new section (section 7, before the footer) with:

**Key Model Assumptions:**
```typescript
const assumptions = [
  { param: 'Electricity Rate', value: '$0.035/kWh', note: 'Oklahoma industrial rate' },
  { param: 'H₂ Selling Price', value: '$25/kg', note: 'Base case, weighted avg across customers' },
  { param: 'Capacity Factor', value: '>85%', note: 'On-site model, not weather-dependent' },
  { param: 'Facility Capex', value: '~$3.3M', note: 'Per facility, fully installed' },
  { param: 'Specific Energy', value: '42.8 kWh/kg', note: 'Conservative base case (measured: 46 kWh/kg)' },
  { param: 'Materials Inflation', value: '2.5%/yr', note: 'Offset by automation (see Learning Curve)' },
  { param: 'Benefits Loading', value: '37.4%', note: 'On top of base salary' },
  { param: 'Tax Rate', value: '27%', note: 'Federal + state effective' },
  { param: 'PPA Rate (45V)', value: '$0.03/kWh', note: '100% renewable wind PPA' },
];
```

**Sensitivity table** (what-if scenarios):
```typescript
const sensitivity = [
  { variable: 'H₂ Price = $15/kg', revenue: '$280M', ebitda: '$140M', margin: '50%', note: 'Still highly profitable' },
  { variable: 'H₂ Price = $20/kg', revenue: '$373M', ebitda: '$209M', margin: '56%', note: 'Conservative case' },
  { variable: 'H₂ Price = $25/kg (base)', revenue: '$467M', ebitda: '$278M', margin: '59%', note: 'Base case' },
  { variable: 'H₂ Price = $30/kg', revenue: '$560M', ebitda: '$346M', margin: '62%', note: 'Premium pricing' },
  { variable: 'No 45V PTC', revenue: '$456M', ebitda: '$267M', margin: '58%', note: 'Business works without credits' },
  { variable: '8 facilities (not 12)', revenue: '$311M', ebitda: '$185M', margin: '59%', note: 'Conservative deployment' },
];
```

**Note:** These sensitivity numbers are illustrative and need to be verified against the actual model. The coding agent should cross-reference with `FINAL_Tobe_Seed_Financial_Model_v853.xlsx` if possible.

**Source:** `FINANCIAL_MODEL_REVIEW_v853.md`, FinancialDashboard.tsx existing data

---

#### TASK 10: Fix Download Link

**File:** `src/components/FinancialDashboard.tsx`

Change:
```
href="/Tobe_Seed_Financial_Model_v852.xlsx"
download="Tobe_Seed_Financial_Model_v852.xlsx"
```
To:
```
href="/Tobe_Seed_Financial_Model_v853.xlsx"
download="Tobe_Seed_Financial_Model_v853.xlsx"
```

Also update the footer text from "v8.5.2" to "v8.5.3".

---

#### TASK 11: Update Business-Model Unit Economics with TEA Numbers

**File:** `src/app/business-model/page.tsx`

The current `unitEconomics.tobeCost` is "<$5/kg" which is correct but vague. Add a detailed cost build-up:

```typescript
const costBuildUp = [
  { component: 'Electricity (Production)', cost: '$1.50', note: '42.8 kWh/kg × $0.035/kWh' },
  { component: 'Compression', cost: '$0.12', note: '3.5 kWh/kg × $0.035/kWh' },
  { component: 'Logistics (50 km)', cost: '$0.90', note: 'Tube trailer delivery' },
  { component: 'RO Water', cost: '$0.05', note: '9 L/kg × $0.00556/L' },
  { component: 'Direct Variable Cost', cost: '$2.57', note: '', bold: true },
  { component: 'Maintenance', cost: '$0.42', note: 'Preventive + corrective' },
  { component: 'Fixed Site Operating', cost: '$1.63', note: 'Labor + facility lease' },
  { component: 'Cash Operating Cost', cost: '$4.62', note: '', bold: true },
  { component: 'Annualized Capital', cost: '$0.63', note: 'Depreciation allocation' },
  { component: 'All-In Economic Cost', cost: '$5.25', note: '', bold: true, highlight: true },
];
```

Also add the anchor case returns:
```typescript
const anchorReturns = {
  sellingPrice: '$25.00/kg',
  productionCost: '$2.57/kg (direct)',
  grossMargin: '89.5%',
  siteEBITDA: '$16.5M/year',
  ebitdaMargin: '81.5%',
  projectIRR: '217.7%',
  npv10yr: '$57.5M (12% discount)',
  payback: '<18 months',
  hurdlePrice: '~$6/kg (12% IRR)',
};
```

**Source:** `Tobe_Energy_TEA_Investor_Ready_March_2026.pdf` as extracted in `DATAROOM_CONTENT.md`

---

#### TASK 12: Update Moat Section Efficiency Claim

**File:** `src/app/business-model/page.tsx`

Change the "94% HHV Efficiency" moat card to be more nuanced:

```typescript
{
  title: '>92% System Efficiency',
  stat: '>92%',
  desc: 'HHV system efficiency (measured at 46 kWh/kg, wall-to-plug). Conservative model uses 42.8 kWh/kg (85% HHV). Most competitors only report stack efficiency, ignoring power conversion and BOP losses.'
},
```

**Source:** `DATAROOM_CONTENT.md` technology section, `NOTES_efficiency_calculations.md`

---

### DESIGN NOTES FOR ALL NEW SECTIONS

- Match existing terminal aesthetic: dark bg (#0a0a0f), orange (#ff6b35) section labels, green (#00ff88) highlight numbers, blue (#00d4ff) secondary numbers
- Use ASCII art section headers: `┌─── SECTION XX.X ─── TITLE ─────────────────────┐`
- Use `fadeUp` animation variant (already defined in business-model page)
- Terminal-style progress bars where appropriate: `[████████████░░░░░░░░] 60%`
- Glowing text shadows on key numbers: `textShadow: '0 0 10px rgba(0,255,136,0.5)'`
- All numbers must have hover tooltips or footnotes citing source
- Mobile responsive: use grid with responsive columns (md:grid-cols-X)
- Keep total page load reasonable — these are data-heavy pages

### ITEMS NEEDING COLBY'S INPUT (cannot be hardcoded)

1. **Current cash position (March 2026)** — Dec 2025 number ($1.13M) is stale
2. **Current burn rate** — $109K/month was Q4 2025
3. **Which customer names can be revealed?** — Zeeco is likely safe; others may be NDA'd
4. **Debt interest rate** — 5.5% or 7% on CSC Leasing?
5. **UL certification status/timeline**
6. **CIP patent filing status** — filed or still pending?
7. **EUROPA (Germany) customer** — is H2 Core Systems a real opportunity?
8. **Seed round close timeline** — any indication for investors?

---

*End of Business Section Plan*
*Generated March 21, 2026 by Ren ⚡*
