# Tobe Energy — Data Room Content Reference

> **Generated:** March 19, 2026
> **Sources:** All data extracted from ~/clawd/dataroom-assets/ and ~/clawd/tea-agent-inputs/
> **Purpose:** Single reference file for building data room pages. Every number has a source.

---

## /overview

### Company One-Liner

Tobe Energy produces hydrogen on-site using membrane-free electrolysis with pulsed waveform architecture. No precious metals, no membranes, no rare earths, no cooling system.
*Source: Tobe_TEA_Narrative_v1.md*

### Key Metrics

| Metric | Value | Source |
|--------|-------|--------|
| System Efficiency (HHV) | >92% (up to 94.7% at stack) | Tobe_TEA_Narrative_v1.md |
| Specific Energy | 46.08 kWh/kg (measured) | ENG_PreCommit_SampleOperatingData.xlsx (Run_Info) |
| Stack Temperature | ~28°C (near ambient) | ENG_PreCommit_SampleOperatingData.xlsx |
| H₂ Production Cost | <$2/kg at industrial electricity | Tobe_TEA_Narrative_v1.md |
| Pipeline | $100M+ across 11 opportunities | TEA_PIPELINE_NARRATIVE.md |
| Sectors Served | 7 (Industrial, Mobility, E-fuels, Academic, Steel, Transit, EPC) | PIPELINE_DATA.json |
| Pre-Seed Raised | $1.8M (Cortado, Hurricane, Techstars) | Tobe_Energy_Cap_Table.xlsx |
| Seed Round | $10M raising now | FINAL_Tobe_Seed_Financial_Model_v853.xlsx |

### 4-Card Summary

1. **Technology** — Membrane-free, PGM-free, near-ambient electrolysis. 46 kWh/kg measured. No cooling system.
2. **Business** — $100M+ pipeline. 11 opportunities. 7 sectors. $20M+ signed LOIs. First deployment Q2 2026.
3. **Team** — Colby DeWeese (CEO, chemical engineer, $75M+ energy infrastructure). Dr. Caleb Lareau (Co-founder, Harvard PhD, Forbes 30 Under 30).
4. **Resources** — Pitch deck, FEED package, financial model, engineering drawings, patent applications.

---

## /technology

### How the Electrolyzer Works

Tobe's platform is a membrane-free, PGM-free, near-ambient electrolysis system built primarily from 304 stainless steel and commodity industrial components. Key architecture elements:

- **Capacitive electrolysis** with pulsed waveform architecture
- **No membrane** — eliminates primary degradation mechanism of PEM systems
- **No precious metals** — no iridium, platinum, or rare earths
- **No cooling system** — operates at 27-28°C (PEM runs at 60-80°C)
- **Pulsed waveform** — 16,400 Hz pulse frequency, 60% duty cycle (measured)
- **LLC resonant converter** topology for power delivery

*Source: TOBE-PFD-001.pdf, ENG_PreCommit_SampleOperatingData.xlsx, ENG_GRANT_NavySBIR_N242-070.pdf*

### Key Specifications

| Parameter | Value | Source |
|-----------|-------|--------|
| Specific Energy Consumption | 46.08 kWh/kg (measured at 6kW) | ENG_PreCommit_SampleOperatingData.xlsx |
| Stack Energy (H&MB) | 46.2 kWh/kg (1,154 kWh/day for 25 kg/day) | ENG_HMB_HeatAndMaterialBalance.xlsx |
| Electrolyzer Efficiency (PFD) | 42.2 kWh/kg H₂ | TOBE-PFD-001.pdf (Energy Balance) |
| Stack Efficiency (HHV) | ~93% | TOBE-PFD-001.pdf (Energy Balance) |
| Stack Temperature | 27-28°C | ENG_HMB_HeatAndMaterialBalance.xlsx, ENG_PreCommit_SampleOperatingData.xlsx |
| Operating Pressure | 2.75 bar(g) stack / ~25 psig | ENG_HMB_HeatAndMaterialBalance.xlsx |
| H₂ Output Pressure | 3.08 bar(g) / 50 psig at stack | ENG_HMB_HeatAndMaterialBalance.xlsx, TOBE-PFD-001.pdf |
| H₂ Purity | ≥99.99% (after purification/drying) | TOBE-PFD-001.pdf |
| Heat Rejection | <50 kW (12× T-25 system) | TOBE-PFD-001.pdf |
| Water Consumption | 10 kg H₂O per 1 kg H₂ | TOBE-PFD-001.pdf (Design Basis) |
| O₂ Production | 8 kg O₂ per 1 kg H₂ (stoichiometric) | TOBE-PFD-001.pdf (Design Basis) |
| Duty Cycle | 60% | ENG_PreCommit_SampleOperatingData.xlsx |
| Pulse Frequency | 16,400 Hz | ENG_PreCommit_SampleOperatingData.xlsx |
| Stack Life (design) | 80,000+ hours | Tobe_Energy_TEA_Investor_Ready_March_2026.pdf |
| Field Serviceability | 30-minute T-25 swap demonstrated | Tobe_Energy_TEA_Investor_Ready_March_2026.pdf |

### Efficiency Test Results

All efficiencies are **true wall-to-plug** (AC input → H₂ output), not idealized stack efficiencies.
Tests used a standard DC bench power supply — conservative floor. Optimized pulsed waveform topology achieves higher.

| Test Run | Power (W) | TDS | Mass Produced (kg) | Daily Rate (kg/day) | LHV Efficiency | Source |
|----------|-----------|-----|--------------------|--------------------|----------------|--------|
| 6kW Low TDS | 6,012 | Low | 0.78 | 2.32 | 72.4% | ENG_EfficiencyCalculations.xlsx |
| 6kW High TDS | 6,143 | High | 0.78 | 2.30 | 70.1% | ENG_EfficiencyCalculations.xlsx |
| 15kW Low TDS | 14,972 | Low | 1.94 | 5.76 | 72.1% | ENG_EfficiencyCalculations.xlsx |
| 15kW High TDS | 15,096 | High | 0.94 | 1.39 | 69.1% | ENG_EfficiencyCalculations.xlsx |

**Note:** Navy SBIR proposal (N242-070) labels these as "1kW" and "2.5kW" — this is a typo. Correct labels are 6kW and 15kW per actual power readings.

**TEA Modeling Cases:**
- **Conservative base case:** 85% HHV (~42.8 kWh/kg)
- **Downside case:** 72% LHV (~85% HHV) — bench power supply, unoptimized
- **Upside case:** 94% HHV — optimized pulsed waveform, clean water, resonant LLC topology

*Source: NOTES_efficiency_calculations.md, ENG_EfficiencyCalculations.xlsx*

### Comparison vs PEM/Alkaline

| Parameter | Tobe | PEM (Industry) | Alkaline (Industry) | Source |
|-----------|------|----------------|--------------------:|--------|
| Specific Energy (kWh/kg) | 42-46 | 50-58 | 51-56 | TEA_Deep_Research_Report.md, ENG_PreCommit_SampleOperatingData.xlsx |
| Operating Temp (°C) | 27-28 | 60-80 | 60-80 | ENG_PreCommit_SampleOperatingData.xlsx |
| Membrane | None | PEM (degrades) | Diaphragm | Technology architecture |
| Precious Metals | None | Iridium, Platinum | None (but KOH electrolyte) | Technology architecture |
| Cooling System | Not required | Required | Required | TOBE-PFD-001.pdf |
| Installed CAPEX ($/kW) | $500 (T-25 base) | $1,400-2,500 | $500-1,000 | TEA_Deep_Research_Report.md, Tobe_TEA_Narrative_v1.md |

### Wall-to-Plug Efficiency (Critical Differentiator)

Most competitors report **stack efficiency** only, which ignores power conversion losses, BOP, and auxiliary systems. Tobe reports **true wall-to-plug efficiency** (AC input to H₂ output), as explicitly stated in the SBIR proposal and measured data.

- **NREL PEM benchmark:** Stack ~51 kWh/kg + BOP ~4.2 kWh/kg = ~55 kWh/kg system
- **DOE PEM reference:** ~57.5 kWh/kg average system consumption
- **Tobe measured:** 46.08 kWh/kg (wall-to-plug, 6kW prototype, bench power supply)

*Source: TEA_Deep_Research_Report.md, ENG_PreCommit_SampleOperatingData.xlsx*

---

## /technology/system

### Process Flow

**Power → Power Electronics → Controls → Electrolyzer → Gas Separation → H₂ + O₂**

From TOBE-PFD-001.pdf (Zeeco ARC deployment):

1. **Water Treatment** (Zeeco scope): Municipal water → RO-101 (8,000 kg/day capacity, 80% recovery) → DI-101 polishing → TK-101 buffer tank
2. **Electrolysis** (Tobe scope): DI water → EL-101 (12× T-25 electrolyzers, 600 kW total, 300 kg H₂/day) → PLC-101 (Control & Monitoring)
3. **Gas Separation**: Wet gas → SEP-101 (H₂ separator) + SEP-102 (O₂ separator)
4. **Purification & Drying**: H₂ → PU-101 (Catalytic DeOx) → DR-101 (Mole Sieve Dryer) → ≥99.99% dry H₂
5. **Destination**: FL-101 (flare, Phase 1 Zeeco scope)
6. **Future Phase 2**: VS-101 stack (250 kW T-125, 125 kg H₂/day)

*Source: TOBE-PFD-001.pdf*

### Stream Table (Single T-25 Unit, 25 kg/day)

| Stream | Description | Temp (°C) | Pressure bar(g) | Phase | Mass Flow (kg/hr) |
|--------|-------------|-----------|-----------------|-------|--------------------|
| 1 | City Water | 24 | 2 | Liquid | 15.625 |
| 2 | RO Permeate | 28 | 2 | Liquid | 9.375 |
| 3 | Stack Gas | 27 | 2.75 | Gas | 9.308 |
| 4 | Pure H₂ | 27 | 3.08 | Gas | 1.042 |
| 5 | Pure O₂ | 27 | 3.08 | Gas | 8.938 |
| 6 | RO Brine | 24 | 2 | Liquid | 6.250 |
| 7 | Elec to Stack | — | — | Electrical | 1,154 kWh/day |
| 8 | Elec to Booster | — | — | Electrical | 2 kWh/day |

*Source: ENG_HMB_HeatAndMaterialBalance.xlsx (Sheet: "25 kg_day")*

### Zeeco ARC Full Facility (12× T-25)

| Parameter | Current (12× T-25) | Future (+1× T-125) | Units | Source |
|-----------|--------------------|--------------------|-------|--------|
| H₂ Production | 300 | 425 | kg/day | TOBE-PFD-001.pdf |
| Total Facility Power | 600 | 850 | kW | TOBE-PFD-001.pdf |
| Electrolyzer Efficiency | 42.2 | 42.2 | kWh/kg H₂ | TOBE-PFD-001.pdf |
| H₂ Energy (HHV basis) | 492 | 697 | kW | TOBE-PFD-001.pdf |
| Stack Efficiency (HHV) | ~93% | ~93% | % | TOBE-PFD-001.pdf |
| Heat Rejection | <50 | <70 | kW | TOBE-PFD-001.pdf |
| Operating Temperature | <40 | <40 | °C | TOBE-PFD-001.pdf |
| Municipal Water In | 3,750 | 5,312 | kg/day | TOBE-PFD-001.pdf |
| RO Reject | 750 | 1,062 | kg/day | TOBE-PFD-001.pdf |
| Dry H₂ Product | 300 | 425 | kg/day | TOBE-PFD-001.pdf |
| Grid Power | 600 (current) / 850 (future) | — | kW | TOBE-PFD-001.pdf |

### Controls System

- 5 Arduino boards, ~100 cloud variables
- 8 Modbus slaves on RS-485 bus, 1.5s poll cycle
- Sensors: pressure (kPa/psi), temperature, flow (L/min), pH, dissolved O₂, conductivity, noise, ozone
- Safety: 3 gas detectors (2× H₂, 1× O₂) at 1Hz polling
- Environmental monitoring: O₂ concentration, relative humidity

*Source: CLOUD_VARIABLES_CATALOG.md*

---

## /hmi

Already built. 5 instrumentation screens with NERV terminal UI. Displays real-time sensor data from Arduino cloud variables.

---

## /business/pipeline

### Pipeline Summary

| Metric | Value | Source |
|--------|-------|--------|
| Total Pipeline | $100M+ | TEA_PIPELINE_NARRATIVE.md |
| Signed LOIs + Contract | $20M+ | TEA_PIPELINE_NARRATIVE.md |
| Active Quotes | $26M+ (TriMet + Nucor first site) | TEA_PIPELINE_NARRATIVE.md |
| Scale Potential | $75M+ (Nucor 7-site + Loa expansion) | TEA_PIPELINE_NARRATIVE.md |
| Signed Capacity | 2,165 kg/day | TEA_PIPELINE_NARRATIVE.md |
| Geographic Reach | 5 regions (OK, TX, CA, OR, PA) | PIPELINE_DATA.json |
| Total Opportunities | 11 | PIPELINE_DATA.json |
| Sectors | 7 | TEA_PIPELINE_NARRATIVE.md |

### All 11 Opportunities

| # | Codename | Type | Capacity (kg/day) | Sector | Location | Price | Value | Status | Source |
|---|----------|------|-------------------|--------|----------|-------|-------|--------|--------|
| 1 | CARDINAL | System Sale | 50 | Industrial R&D | Broken Arrow, OK | $30/kg current | — | CONTRACTED | TEA_PIPELINE_NARRATIVE.md |
| 2 | REFINERY | Offtake | 500 | Chemicals | Tulsa, OK | $15/kg | $8.2M/3yr | LOI Signed | TEA_PIPELINE_NARRATIVE.md |
| 3 | FORGE | Offtake | 133 | Combustion | Sand Springs, OK | $25/kg | $3.6M/3yr | LOI Signed | TEA_PIPELINE_NARRATIVE.md |
| 4 | CAMPUS | Offtake | 32 | Academic | Tulsa, OK | $20/kg | $691K/3yr | LOI Signed | TEA_PIPELINE_NARRATIVE.md |
| 5 | HORIZON | System Sale | 250 | Mobility/Fueling | TX (Multiple) | — | — | LOI Signed | TEA_PIPELINE_NARRATIVE.md |
| 6 | PHOENIX | System Sale | 1,250 | E-Fuels | Los Angeles, CA | — | — | LOI Signed | TEA_PIPELINE_NARRATIVE.md |
| 7 | TRANSIT | Proposal | 500 | Transit/FCEB | Portland, OR | — | $19M | Quoted | PIPELINE_DATA.json |
| 8 | FORGE-STEEL | Quoting | — | Steel | Bethlehem, PA | — | $7M (→$49M) | Quoting | TEA_PIPELINE_NARRATIVE.md |
| 9 | VAULT | Inbound | — | Industrial | TBD | — | TBD | Facility Visit Pending | PIPELINE_DATA.json |
| 10 | TITAN | Inbound | — | EPC/Infra | Houston, TX | — | — | Deck Requested | PIPELINE_DATA.json |
| 11 | SCHOLAR | Research | N/A | Academic | Tulsa, OK | — | — | Active | PIPELINE_DATA.json |

### Offtake Agreement Summary

| Customer | kg/day | $/kg | Annual Revenue | Gross Margin (at $2/kg LCOH) | Source |
|----------|--------|------|----------------|------------------------------|--------|
| Tulco (REFINERY) | 500 | $15 | $2.74M | 87% | TEA_PIPELINE_NARRATIVE.md |
| Tulsa Combustion (FORGE) | 133 | $25 | $1.21M | 92% | TEA_PIPELINE_NARRATIVE.md |
| University of Tulsa (CAMPUS) | 32 | $20 | $0.23M | 90% | TEA_PIPELINE_NARRATIVE.md |
| **Total Offtake** | **665** | **$17.2 avg** | **$4.18M** | **~88%** | TEA_PIPELINE_NARRATIVE.md |

### System Sales

- 10× T-25 units (25 kg/day each) — $1.5-2.5M
- 10× T-125 units (125 kg/day each) — $4.5-6.5M
- **Total system sales:** $6-9M one-time revenue

*Source: TEA_PIPELINE_NARRATIVE.md*

### Revenue Structure

| Stream | Value | Type |
|--------|-------|------|
| System Sales | $6-9M | One-time |
| Offtake Agreements | $12.5M | 3-year recurring |
| **Total Signed** | **$18.5-21.5M** | |

*Source: PIPELINE_SUMMARY.md*

### Geographic Distribution

| Region | Opportunities | Capacity (kg/day) | Key Sectors |
|--------|--------------|-------------------|-------------|
| Central (OK) | 5 | 715 | Industrial R&D, Chemicals, Combustion, Academic |
| West (CA) | 1 | 1,250 (+5,000 expansion) | E-Fuels |
| South (TX) | 2 | 250 | Mobility, EPC |
| Northwest (OR) | 1 | 500 | Transit/FCEB |
| Northeast (PA) | 1 | $7M initial ($49M potential) | Steel |

*Source: PIPELINE_DATA.json*

### Deployment Timeline

| Target | Opportunity | Type |
|--------|------------|------|
| Q2 2026 | CARDINAL (Zeeco) | First commercial deployment |
| Q3 2026 | CAMPUS (UTulsa) | Offtake |
| Q1 2027 | REFINERY (Tulco) | Offtake |
| 2027+ | PHOENIX (Loa Carbon) | System sale |
| July 2027 | TRANSIT (TriMet) | Proposal |
| TBD | HORIZON (New Day H₂) | System sale |
| TBD | FORGE-STEEL (Nucor/UIG) | Quoting |

*Source: PIPELINE_SUMMARY.md, TEA_PIPELINE_NARRATIVE.md*

---

## /business/model

### Dual Revenue Streams

1. **Hardware/System Sales** — Sell T-25 and T-125 electrolyzer units outright
   - T-25 base: $25,000 / optioned: $35,000
   - T-125 base: $120,000 / optioned: $167,000
2. **Hydrogen Offtake (HaaS)** — Produce and sell hydrogen on-site
   - Recurring revenue at $15-30/kg
   - Gross margins 85-93%

*Source: Tobe_TEA_Narrative_v1.md*

### Unit Economics — Cost Build-Up (Repeat-Commercial Facility)

| Component | $/kg | Formula Basis | Source |
|-----------|------|---------------|--------|
| Electricity | $1.50 | 42.8 kWh/kg × $0.035/kWh | TEA_Investor_Ready_March_2026.pdf |
| Compression | $0.12 | 3.5 kWh/kg × $0.035/kWh | TEA_Investor_Ready_March_2026.pdf |
| Logistics | $0.90 | Tube trailer, 50 km | TEA_Investor_Ready_March_2026.pdf |
| Water | $0.05 | 9 L/kg × $0.00556/L | TEA_Investor_Ready_March_2026.pdf |
| **Direct Delivered Variable Cost** | **$2.57** | | |
| Maintenance | $0.42 | Model basis | TEA_Investor_Ready_March_2026.pdf |
| Fixed Site Operating Cost | $1.63 | Labor + lease | TEA_Investor_Ready_March_2026.pdf |
| **Cash Operating Cost** | **$4.62** | | |
| Annualized Capital | $0.63 | | TEA_Investor_Ready_March_2026.pdf |
| **All-In Economic Cost** | **$5.25** | | |

### Anchor Case Returns (Repeat-Commercial, Unsubsidized)

| Metric | Value | Source |
|--------|-------|--------|
| Selling Price | $25.00/kg delivered | TEA_Investor_Ready_March_2026.pdf |
| Production Cost | $2.57/kg (direct variable) | TEA_Investor_Ready_March_2026.pdf |
| Gross Margin | 89.5% | TEA_Investor_Ready_March_2026.pdf |
| Site EBITDA | $16.5M/year | TEA_Investor_Ready_March_2026.pdf |
| EBITDA Margin | 81.5% | TEA_Investor_Ready_March_2026.pdf |
| Project IRR | 217.7% | TEA_Investor_Ready_March_2026.pdf |
| 10-Year NPV (12% discount) | $57.5M | TEA_Investor_Ready_March_2026.pdf |
| Payback | <18 months | Tobe_TEA_Narrative_v1.md |
| Hurdle Selling Price (12% IRR) | ~$6/kg | TEA_Investor_Ready_March_2026.pdf |

### Market Sizing (TAM / SAM / SOM)

All figures are Year 10 projections (mid-2030s) for green hydrogen.

| Metric | Value | Notes | Source |
|--------|-------|-------|--------|
| **Global TAM** | 20–30 million tons/yr | ~20–25% of total H₂ demand goes green | MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf |
| **U.S. TAM** | ~3 million tons/yr | ~15% of global demand, 20–25% green | MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf |
| **SAM (Regional)** | 500,000–1,000,000 tons/yr | Industrial corridors in central U.S. near Tobe operations | MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf |
| **SOM (Single Hub)** | ~30,000 tons/yr (~3–6% of SAM) | One facility at 82,500 kg/day by Year 10 | MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf |
| **SOM (Multiple Hubs)** | ~90,000–120,000 tons/yr (~10%+ of SAM) | 3–4 locations replicating Tulsa blueprint | MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf |

**Key assumptions:**
- Electricity at ~$0.10/kWh in Oklahoma → production cost near ~$1/kg, competitive with SMR
- Capacity ramp: 2,500 kg/day at Year 2, adding 10,000 kg/day per year (2,500 kg/day every 3 months)
- Target sectors: fertilizer/ammonia, refineries, steelmaking (DRI), chemical feedstocks
- Cost parity with fossil-based H₂ achieved at electricity rates below $0.138/kWh

*Source: MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf (December 2024, v1.0)*

### The On-Site Advantage

DOE data shows 75-85% of delivered hydrogen cost is transport and storage. Real market pricing evidence:

| Source | Delivered Price | Source Document |
|--------|----------------|-----------------|
| Zeeco (Broken Arrow, OK) | $30/kg | TEA_PIPELINE_NARRATIVE.md |
| Tulsa market | $47/kg | CLAUDE.md (company facts) |
| Seattle | $30+/kg | CLAUDE.md |
| Airgas cylinder (Tulsa) | $121.31/kg | MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf |

Airgas quote details: Size 300 cylinder, 2,500 psi, ~0.693 kg H₂, $84.05 = **$121.31/kg effective delivered cost** for small-volume users.

*Source: MKRT_CASE_CostAnalysis_OnSiteAdvantage.pdf*

### Financial Model Unit Economics (v8.5.3)

| Component | Tobe ($/kg) | Grey H₂ Delivered ($/kg) | Source |
|-----------|-------------|--------------------------|--------|
| Production | $1.47 | $1.00 | FINANCIAL_MODEL_REVIEW_v853.md |
| Compression | $0.12 | $0.75 | FINANCIAL_MODEL_REVIEW_v853.md |
| Transportation | $0.90 | $8.00 | FINANCIAL_MODEL_REVIEW_v853.md |
| RO Water | $0.05 | $0.05 | FINANCIAL_MODEL_REVIEW_v853.md |
| **Direct OpEx** | **$2.54** | **$9.80** | FINANCIAL_MODEL_REVIEW_v853.md |
| Overhead | $2.29 | (absorbed) | FINANCIAL_MODEL_REVIEW_v853.md |
| **All-In** | **$4.83** | **$10+** | FINANCIAL_MODEL_REVIEW_v853.md |

---

## /financials

### Revenue Projections (Financial Model v8.5.3)

| Fiscal Year | H₂ Production | Equipment Sales | Services | EBITDA | Net Income | Cash |
|-------------|---------------|-----------------|----------|--------|------------|------|
| FY1 (Apr '26–Mar '27) | $0M | $0.88M | $0M | -$2.65M | -$2.78M | $1.31M |
| FY2 | $11.81M | $4.30M | $0.02M | $3.75M | $3.36M | $49.63M |
| FY3 | $77.81M | $10.26M | $0.25M | $54.91M | $44.78M | $139.50M |
| FY4 | $141.56M | $33.77M | $0.85M | $110.52M | $85.56M | $227.79M |
| FY5 | $210.94M | $73.95M | $2.43M | $177.64M | $132.66M | $494.44M |
| FY6 | $264.38M | $129.13M | $5.87M | $243.10M | $178.25M | $728.15M |
| FY7 | $270.00M | $186.06M | $10.86M | $277.57M | $202.22M | $921.02M |

*Source: FINAL_Tobe_Seed_Financial_Model_v853.xlsx (Overview sheet)*

### Key Financial Metrics

| Metric | Value | Source |
|--------|-------|--------|
| FY7 Total Revenue | $467M | Financial Model Overview |
| FY7 EBITDA | $278M (59.4% margin) | Financial Model Overview |
| FY7 Net Income | $202M (43.3% margin) | Financial Model Overview |
| EBITDA Positive | FY2 | Financial Model Overview |
| Revenue Mix (FY7) | H₂ 58%, Equipment 40%, Services 2% | Financial Model Overview |
| Headcount (FY1→FY7) | 15 → 224 FTEs | FINANCIAL_MODEL_REVIEW_v853.md |
| Facilities (FY7) | 12 | Financial Model Overview |

### Margin Profile

| Metric | FY3 | FY5 | FY7 | Source |
|--------|-----|-----|-----|--------|
| Gross Margin | 83.0% | 82.5% | 85.0% | Tobe_TEA_Narrative_v1.md |
| EBITDA Margin | 69.0% | 67.5% | 69.0% | Tobe_TEA_Narrative_v1.md |
| Net Margin | 48.0% | 49.0% | 47.0% | Tobe_TEA_Narrative_v1.md |

### Burn Rate & Runway

| Metric | Value | Source |
|--------|-------|--------|
| Monthly Burn | ~$109K/month | CLAUDE.md (company facts) |
| Cash (Dec 2025) | $1.13M | CLAUDE.md |
| Runway | ~10 months | CLAUDE.md |

### Funding History & Cap Table

**Pre-Seed Investors ($1.92M total convertibles):**

| Investor | Type | Amount | Cap | Discount | Date |
|----------|------|--------|-----|----------|------|
| Techstars Accelerator 2024 | 6% equity | $20K | — | — | Jan 2025 |
| Techstars Accelerator 2024 | Conv. Note | $100K | $3M | 20% | Mar 2025 |
| Techstars Ventures 2022 | SAFE | $500K | $10M | 20% | Jul 2025 |
| Wave Function Ventures | SAFE | $350K | $10M | 20% | Jul 2025 |
| Cortado Ventures Fund II | SAFE | $400K | $10M | 20% | Jul 2025 |
| Cortado Ventures SSBCI | SAFE | $200K | $10M | 20% | Jul 2025 |
| Scissortail Ventures | SAFE | $150K | $10M | 20% | Jul 2025 |
| Hurricane Ventures | SAFE | $150K | $10M | 20% | Jul 2025 |
| Individual angels (3) | SAFE | $45K total | $10M | 20% | Jul-Aug 2025 |

*Source: Tobe_Energy_Cap_Table.xlsx*

**Pro Forma Cap Table (pre-conversion):**

| Shareholder | Shares | Ownership % |
|-------------|--------|-------------|
| Founders (Common) | 10,000,000 | 70.7% |
| Option Pool (2025 EIP) | 1,111,120 | 7.9% |
| All Convertibles | 3,037,038 | 21.5% |
| **Total FD** | **14,148,158** | **100%** |

*Source: Tobe_Energy_Cap_Table.xlsx (Pro Forma Cap Table)*

### Seed Round ($10M)

| Detail | Value | Source |
|--------|-------|--------|
| Equity | $7.5M | FINANCIAL_MODEL_REVIEW_v853.md |
| Debt (CSC Leasing) | $2.5M (7% rate, 36-month) | Tobe_TEA_Narrative_v1.md |
| Pre-Money Valuation | $40M | FINANCIAL_MODEL_REVIEW_v853.md |
| Post-Money | $47.5M | FINANCIAL_MODEL_REVIEW_v853.md |
| Seed Dilution | 15.8% | FINANCIAL_MODEL_REVIEW_v853.md |

### Use of Funds ($10M Seed)

| Category | Amount | % | Source |
|----------|--------|---|--------|
| R&D (T-125 validation) | $1.1M | 14.7% | FINANCIAL_MODEL_REVIEW_v853.md |
| Manufacturing Equipment | $1.1M | 14.9% | FINANCIAL_MODEL_REVIEW_v853.md |
| Personnel (15 months) | ~$2.2M | 29.5% | FINANCIAL_MODEL_REVIEW_v853.md |
| Certifications | $475K | 6.3% | FINANCIAL_MODEL_REVIEW_v853.md |
| Working Capital & G&A | $1.8M | 24.0% | FINANCIAL_MODEL_REVIEW_v853.md |
| Zeeco Deployment | $2.5M | — | Tobe_TEA_Narrative_v1.md |

### Fundraising Trajectory

| Round | Timing | Amount | Post-Money | Primary Use | Source |
|-------|--------|--------|------------|-------------|--------|
| Pre-Seed | Complete | $2.0M | — | Prototype, team | Tobe_TEA_Narrative_v1.md |
| **Seed** | **Now** | **$10.0M** | **$45M** | First MW, UL cert | Tobe_TEA_Narrative_v1.md |
| Series A | Q2 2027 | $57.0M | $200M | Mfg scale-up | Tobe_TEA_Narrative_v1.md |
| Series B | Q1 2029 | $60.0M | $425M | Geographic expansion | Tobe_TEA_Narrative_v1.md |
| Series C | Q4 2030 | $225.0M | $1.1B | National footprint | Tobe_TEA_Narrative_v1.md |

*Note: Series A+ rounds are illustrative, not modeled.*

### Learning Curve / Manufacturing Cost-Down

| Phase | Cumulative Units | T-125 BOM | $/kW | Gross Margin | Source |
|-------|-----------------|-----------|------|--------------|--------|
| Launch (Y2) | 10 | $100,000 | $400 | 40.1% | Tobe_TEA_Narrative_v1.md |
| Volume (Y3) | 40 | $96,000 | $384 | 42.5% | Tobe_TEA_Narrative_v1.md |
| Optimized (Y4) | 100 | $92,500 | $370 | 44.6% | Tobe_TEA_Narrative_v1.md |
| Mature (Y5) | 200 | $87,500 | $350 | 47.6% | Tobe_TEA_Narrative_v1.md |
| Scale (Y7) | 520 | $77,500 | $310 | 53.6% | Tobe_TEA_Narrative_v1.md |

---

## /tax-credits

### 45V Production Tax Credit

| Lifecycle GHG (kgCO₂e/kgH₂) | Credit Tier | Source |
|------------------------------|-------------|--------|
| < 0.45 | $3.00/kg (max) | 45V_GREET_ANALYSIS.md |
| 0.45 - 1.5 | $1.00/kg | 45V_GREET_ANALYSIS.md |
| 1.5 - 2.5 | $0.75/kg | 45V_GREET_ANALYSIS.md |
| 2.5 - 4.0 | $0.60/kg | 45V_GREET_ANALYSIS.md |

### GREET Analysis Results (Oklahoma, 42 kWh/kg)

| Scenario | Grid % | Clean % | kgCO₂e/kg | Credit | Source |
|----------|--------|---------|-----------|--------|--------|
| Grid only | 100% | 0% | 18.51 | None | 45V_GREET_ANALYSIS.md |
| 10% grid | 10% | 90% | 1.85 | $0.75/kg | 45V_GREET_ANALYSIS.md |
| 5% grid | 5% | 95% | 0.93 | $1.00/kg | 45V_GREET_ANALYSIS.md |
| 100% clean | 0% | 100% | 0.00 | $3.00/kg | 45V_GREET_ANALYSIS.md |

**Oklahoma Grid (Plains Region):** 31.8% coal, 21.4% gas, 36.6% wind, 5% nuclear, 4.3% hydro → 440.8 gCO₂eq/kWh. Too high for any 45V tier without clean power.

### PPA ROI Analysis

| Metric | Value | Source |
|--------|-------|--------|
| Required for $3/kg tier | 100% renewable PPA | 45V_GREET_ANALYSIS.md |
| Oklahoma wind PPA rate | $0.025-0.035/kWh | 45V_GREET_ANALYSIS.md |
| Annual electricity per facility | 37.8 GWh | 45V_GREET_ANALYSIS.md |
| Annual PPA cost | $945K-$1.3M | 45V_GREET_ANALYSIS.md |
| Annual 45V credit ($3/kg) | $2.7M | 45V_GREET_ANALYSIS.md |
| **Net annual benefit per facility** | **$1.4-1.7M** | 45V_GREET_ANALYSIS.md |
| 10-year PTC per eligible facility | $27M | Tobe_TEA_Narrative_v1.md |

### Facility Eligibility

Construction must begin before Dec 31, 2027 per IRS guidance.

| Facility | Construction Start | 45V Eligible | Source |
|----------|-------------------|--------------|--------|
| F1 Tulsa | Apr 2026 | Yes | Tobe_TEA_Narrative_v1.md |
| F2 OKC | Oct 2026 | Yes | Tobe_TEA_Narrative_v1.md |
| F3 Seattle | Apr 2027 | Yes | Tobe_TEA_Narrative_v1.md |
| F4 Spokane | Sep 2027 | Yes | Tobe_TEA_Narrative_v1.md |
| F5+ | 2028+ | No | Tobe_TEA_Narrative_v1.md |

---

## /team

### Colby DeWeese — CEO & Co-Founder

**Education:**
- B.S. Chemical Engineering, University of Tulsa (GPA 3.35, Omega Chi Epsilon)
- M.L.S. Oil, Gas & Energy Law, University of Oklahoma
- Harvard Business School CORe (Credential of Readiness)

**Experience:**
- **Tobe Energy Corp (2024-Present)** — Founded company, Techstars NYC 2024, raised $1.8M pre-seed, built $100M+ pipeline, vertically integrated 5,000 sq ft OKC facility
- **Hydrogen Technologies, LLC (2021-2024)** — Principal Process Engineer. Brought to market first-of-its-kind hydrogen boiler (50% cost reduction, 25% footprint reduction, new patents, novel oxy-fired H₂ burner). Directed team through 5 size/pressure variations (3,000-28,000 kg/hr steam, 15-40 bar)
- **Marathon Petroleum (2016-2021)** — Project Engineer II (FE Certificate). Managed $66MM greenfield NGL plant (P&ID → commissioning → startup, 150 contractors, within 4% contingency). Created company-wide Mechanical Integrity Standard and Facility Siting Study Standard.

**Highlights:** TEDx speaker, AIChE Tulsa Secretary (400+ members), NSF Graduate Research Fellow (Honorable Mention), Ironman finisher, 100-mile ultramarathon finisher.

*Source: ~/clawd/memory/colby-resume.md*

### Dr. Caleb Lareau — Co-Founder

- Harvard PhD
- Forbes 30 Under 30

*Source: CLAUDE.md*

### Company Background

- **Entity:** Tobe Energy Corp (Delaware C-Corp)
- **Location:** Oklahoma City, OK
- **Manufacturing:** 5,000 sq ft vertically integrated facility (BABA compliant)
- **Founded:** 2024
- **Accelerator:** Techstars NYC 2024
- **Good Standing:** Certificate of Good Standing, Delaware (on file)

*Source: Tobe_Energy_Pitch_Copy.md, certificate of good standing delaware.pdf*

---

## /resources

### Pitch Deck

- **Link:** tobe.energy/deck
- **Password:** [password shared separately]
- **Latest version:** V8 (Tobe_Energy V8.pptx in dataroom-assets/overview/)

*Source: Tobe_Energy_Pitch_Copy.md*

### IP / Patent Status

- **Law Firm:** The Plus IP Firm PLLC (Fort Lauderdale, FL)
- **Primary Contact:** Austin R. Nowacki, Esq.
- **Provisional Patent:** Filed August 2024 — "Advanced Electrolyzer Utilizing Capacitively Coupled Resonant Effects for Enhanced Hydrogen Production Efficiency"
- **CIP Application:** Under review/pending filing (as of Feb 2026)
- **Key Claims:** Capacitively coupled resonant effects, pulsed waveform architecture, series impedance element configuration, near-ambient temperature operation
- **Trade Secrets:** Specific waveform parameters, LLC converter tuning, electrode surface treatment, control algorithms (NDA required)

*Source: IP_PATENT_STATUS.md*

### FEED Package (Zeeco ARC)

Complete engineering package issued for review (Rev A, Feb 26, 2026):
- TOBE-PFD-001: Process Flow Diagram
- TOBE-PID-001: P&ID - Electrolyzer Skid
- TOBE-EL-001: Electrical One-Line Diagram
- TOBE-GA-001: General Arrangements
- TOBE-FEED-PKG-001: Full FEED Package Transmittal (26 pages)
- TOBE-SCOPE-001: Scope Split Matrix
- TOBE-BL-001: Battery Limits & Tie-Ins

*Source: TOBE-FEED-PKG-001.pdf*

### Key Data Room Documents Available

| Document | Category | Status |
|----------|----------|--------|
| TEA Investor Ready (March 2026) | Core | Ready |
| Financial Model v8.5.3 | Financial | Ready |
| Cap Table | Financial | Ready |
| FEED Package (Zeeco ARC) | Engineering | Ready |
| LOI Summary + individual LOIs | Pipeline | Ready |
| IP Fortress overview | Legal | Review with counsel |
| Provisional Patent | Legal | Ready (redacted) |
| SAFEs (all investors) | Legal | Ready |
| DE Certificate of Good Standing | Legal | Ready |
| Efficiency test data | Technical | Ready |
| Navy SBIR N242-070 | Technical | Ready |

---

*This document is a reference for building data room UI pages. Every number has a source file path.*
*Generated from files in ~/clawd/dataroom-assets/ and ~/clawd/tea-agent-inputs/*
