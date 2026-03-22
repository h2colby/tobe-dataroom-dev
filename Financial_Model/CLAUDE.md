# CLAUDE.md — Financial Model Build Instructions

## Project

Build a comprehensive, investor-grade financial model for Tobe Energy Corp — a membrane-free hydrogen electrolysis company raising a $10M seed round. Output a single `.xlsx` workbook that synthesizes the best parts of all source files in this folder.

## Source Files (READ ALL BEFORE WRITING ANY CODE)

| File | What It Is | Priority |
|------|-----------|----------|
| `Final_Tobe_TEA.docx` | Techno-Economic Analysis — THE BACKBONE. Use its methodology, cost build-ups, and assumptions as the foundation. | **PRIMARY** |
| `FINAL_Tobe_Seed_Financial_Model_v853.xlsx` | Most recent financial model. 7-year P&L, facility ramp, revenue projections. | **PRIMARY** |
| `Clean_FinancialModel_Tobe_Seed.xlsx` | Cleaned version of the seed model. Check for any differences vs v853. | HIGH |
| `OU_TOBE financial model.xlsx` | Independent financial model built by University of Oklahoma's Irani Center. Third-party market validation. Key: $9.81B serviceable market, 8 segments, $657M profit projection, 150-mile threshold. | HIGH |
| `OU_Tobe Energy Final Report.docx` | Full OU case study report. Market sizing, competitive analysis, go-to-market recommendations. | HIGH |
| `Tobe_Energy_TEA_Editorial_Companion_March_2026.docx` | Founder's narrative companion to the TEA. Strategic context and investor framing. | MEDIUM |
| `Tobe_Energy_Model_Review_v852.docx` | External review/critique of an earlier model version. Shows what investors will scrutinize. | MEDIUM |
| `FIN_FinancialModel.xlsx` | Pre-seed era financial model (May 2025). Use for baseline comparison and assumption evolution. | REFERENCE |

## Output

**File:** `Tobe_Energy_Financial_Model_FINAL.xlsx`
**Location:** This folder (`Financial_Model/`)

## Workbook Structure (14 Tabs)

Build these tabs in order:

### 1. COVER
- Company: Tobe Energy Corp
- Title: Comprehensive Financial Model — Seed Round
- Date, version, confidentiality notice
- Table of contents listing all tabs with descriptions
- Contact: Colby DeWeese, CEO, colby@tobe.energy

### 2. EXECUTIVE SUMMARY
- Dashboard layout: key metrics at a glance
- Revenue trajectory FY1-FY7
- EBITDA margin progression
- 5-6 key investment highlights
- Use of funds ($10M seed breakdown)
- Raise terms: $10M seed, $40M pre-money valuation

### 3. ASSUMPTIONS
- **ALL input assumptions in ONE place** — yellow-highlighted cells
- Every derived value in the entire workbook should reference cells on THIS sheet
- Categories:
  - Electricity: $0.04/kWh industrial, $0.025/kWh wind PPA
  - Efficiency: 42.8 kWh/kg conservative, 46.08 kWh/kg measured, 39.6 kWh/kg optimized
  - H₂ Pricing: blended $25/kg ASP (range $15-$47 from real customer quotes)
  - Capacity: T-25 = 25 kg/day, T-125 = 125 kg/day
  - Utilization: 85% → 90% → 95% ramp
  - Capex per unit, facility buildout costs
  - OpEx: electricity, water, maintenance, labor, insurance, SGA
  - Learning curve cost reduction
  - 45V PTC: $3.00/kg for 10 years
  - Facility ramp schedule
- **Source citation** for every assumption (cell comment or adjacent column)

### 4. UNIT ECONOMICS
- Per-kg cost build-up using TEA methodology:
  - Direct variable: electricity + water + consumables
  - Cash operating: + labor + maintenance + insurance
  - All-in economic: + depreciation + SGA
- Three efficiency scenarios (Conservative / Base / Optimized)
- Revenue per kg at multiple price points ($15, $20, $25, $30, $47)
- Gross margin at each price point
- Break-even analysis
- On-site vs delivered comparison ($4.83/kg Tobe vs $20-50/kg market)

### 5. REVENUE MODEL
- Revenue by stream (H₂ Production, Equipment Sales, Services)
- Revenue by customer from pipeline data
- Pipeline summary: $20M+ signed LOIs, $26M+ active quotes
- HaaS vs Equipment Sales mix over time
- Revenue ramp by facility

### 6. P&L (7-YEAR)
- Full income statement FY1-FY7
- Monthly granularity FY1-FY2, quarterly FY3-FY4, annual FY5-FY7
- Revenue → COGS → Gross Profit → OpEx → EBITDA → D&A → Interest → Tax → Net Income
- Reconcile the known discrepancy: v853 Overview shows $467M FY7 but P&L shows $327.7M

### 7. CASH FLOW
- Operating, investing, financing cash flows
- Capex schedule, facility buildouts
- Seed round and future round placeholders
- Free cash flow, cash balance, runway calculation

### 8. FACILITY RAMP
- Facility-by-facility: location, capacity, capex, timeline, customer(s)
- Cumulative capacity build
- Per-facility economics and payback period
- Geographic expansion: Oklahoma → Central US → National

### 9. 45V TAX CREDIT
- Per-facility PTC calculation
- Tier 1 qualification: 0.03 kgCO₂e/kg (vs 0.45 threshold)
- Annual and 10-year cumulative PTC value
- WITH vs WITHOUT 45V scenarios (critical — model must work without credits)
- PPA cost vs PTC benefit analysis

### 10. MARKET & TAM
- Global: 94M tonnes/yr, $226B
- U.S. breakdown
- Serviceable market: $9.81B (OU validated)
- 8 segments with sizing from OU case study
- 150-mile transportation threshold
- On-site vs delivered cost comparison

### 11. COMPETITIVE LANDSCAPE
- Named competitors: Nel, ITM, Plug Power, Bloom, Electric Hydrogen, Enapter, Advanced Ionics
- Comparison: technology, efficiency, funding, status
- Tobe's differentiation summary

### 12. CAP TABLE
- Pre-seed ownership structure from cap table file
- Post-seed pro forma (15.8% dilution at $40M pre)
- Investor list with amounts

### 13. SENSITIVITY ANALYSIS
- LCOH sensitivity to key variables (tornado chart data)
- Scenario matrix: Bull / Base / Bear
- IRR and NPV at 10%, 15%, 20%, 25% discount rates
- What-if: electricity price, efficiency, utilization, H₂ price, 45V on/off

### 14. SOURCES & NOTES
- Complete source citations
- Methodology notes
- Glossary (HHV, LHV, LCOH, PTC, PPA, SEC, etc.)
- Disclaimers

## Critical Rules

1. **Use `openpyxl` for everything** — this must be a live workbook with real formulas, not a data dump
2. **ALL derived values = FORMULAS** referencing the Assumptions tab. No hardcoded calculated numbers.
3. **Every number must trace to a source file.** If you can't find a source, add comment "⚠️ NEEDS VERIFICATION"
4. **When sources conflict**, prefer: v853 model > Clean model > TEA > OU model > v4.3 model
5. **The model must work WITHOUT 45V credits** — always show both scenarios
6. **Use $0.04/kWh everywhere** (not the older $0.035)
7. **Stack SEC = 42.2 kWh/kg vs System SEC = 46.5 kWh/kg** — keep this distinction consistent throughout
8. **No formula errors** — zero #REF!, #DIV/0!, #VALUE!, #NAME?, or circular refs
9. **Yellow fill for input cells, blue fill for calculated cells** — investors need to see what they can change
10. **Named ranges** for key assumptions so formulas are readable

## Formatting

- Header rows: dark background, white text, bold
- Assumption inputs: yellow fill (#FFF2CC)
- Calculated cells: light blue fill (#D6EAF8)
- Totals: bold with top border
- Negative numbers: red text
- Currency: `$#,##0` for large, `$#,##0.00` for per-unit
- Percentages: `0.0%`
- Freeze panes on every sheet (headers visible when scrolling)
- Column widths: auto-fit, minimum 12 chars
- Print setup: landscape, fit to width

## Reading Excel Files

To read the .xlsx source files, use `openpyxl`:
```python
from openpyxl import load_workbook
wb = load_workbook('FINAL_Tobe_Seed_Financial_Model_v853.xlsx', data_only=True)
# data_only=True reads cached values instead of formulas
for sheet in wb.sheetnames:
    print(f"Sheet: {sheet}")
    ws = wb[sheet]
    for row in ws.iter_rows(min_row=1, max_row=min(20, ws.max_row), values_only=False):
        print([cell.value for cell in row])
```

To read .docx files, use `python-docx`:
```python
from docx import Document
doc = Document('Final_Tobe_TEA.docx')
for para in doc.paragraphs:
    print(para.text)
for table in doc.tables:
    for row in table.rows:
        print([cell.text for cell in row.cells])
```

Install if needed: `pip install openpyxl python-docx`

## Process

1. **Read ALL 8 source files first.** Extract key data, assumptions, and structure from each.
2. **Build Assumptions tab first** — everything flows from here.
3. **Build Unit Economics** — validates the core thesis.
4. **Build P&L and Cash Flow** — what investors scrutinize most.
5. **Add supporting tabs** (Market, Competitive, Cap Table, Sensitivity).
6. **Error check every sheet** — no formula errors, no hardcoded calculations.
7. **Format and polish** — investor-ready presentation.
8. **Save and verify** the file.

## What NOT To Do

- Don't invent numbers. If a data point isn't in the source files, flag it.
- Don't skip reading the .docx files — the TEA and OU report have critical data.
- Don't hardcode derived values — use formulas.
- Don't forget the "without 45V" scenario — this de-risks the thesis.
- Don't include the pitch deck password anywhere in the model.
- Don't use pandas to write the Excel file — use openpyxl for formula preservation.
