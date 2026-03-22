# Content Gaps & Items Needing Input

> **Audit date:** March 19, 2026
> **Files reviewed:** DATAROOM_CONTENT.md, ASSET_INVENTORY.md, COMPONENT_SPECS.md

---

## Gaps in Content

### Team Page
- **Dr. Caleb Lareau bio is skeletal.** Only "Harvard PhD, Forbes 30 Under 30" — no research area, role description, or relevant experience. Every other section has deep sourcing; this stands out. **Needs Colby's input:** full bio, headshot confirmation, current role/responsibilities.
- **No advisors or board listed.** Techstars board bios v2 exists in `/updated-v2/` but wasn't extracted. Are there advisors to feature?

### Pipeline
- **CARDINAL (Zeeco) contract value missing.** Every other LOI has a dollar value or capacity × price. Zeeco shows "$30/kg current" but no total contract value or term.
- **VAULT and TITAN have no capacity, price, or value data.** Listed as "TBD" — fine for early stage, but should these be excluded from the data room or kept as social proof?
- **FORGE-STEEL (Nucor) capacity in kg/day not specified.** Only dollar values ($7M → $49M). Need capacity to match other rows.

### Financial
- **Burn rate and runway sourced from CLAUDE.md, not a financial document.** Dec 2025 cash of $1.13M and $109K/month burn — these should be updated to current (March 2026) figures. **Needs Colby's input:** current cash position, updated burn rate.
- **Cap table pro forma is pre-conversion only.** No post-seed dilution table shown. The seed round section has high-level numbers ($40M pre, 15.8% dilution) but no post-seed cap table breakdown.

### Technology
- **Efficiency number spread is wide (42.2–46.2 kWh/kg) without clear guidance on which to lead with.** COMPONENT_SPECS.md notes this well but the data room needs a single "headline" number. The TEA uses 42.8 kWh/kg. Recommend leading with that.
- **No UL/safety certification status.** Use of funds mentions "Certifications: $475K" but no current status (applied? timeline? which standards?). **Needs Colby's input.**
- **No durability/degradation data.** 80,000-hour stack life is stated but no test hours logged or degradation curve shown. Investors will ask.

### Legal/IP
- **CIP patent application status unclear.** Listed as "under review/pending filing (as of Feb 2026)" — is this now filed? **Needs Colby's input.**
- **No NDA or data room access agreement mentioned.** If trade secrets are behind NDA, the data room should reference this.

### Market
- **TAM/SAM/SOM not extracted.** Asset inventory shows `MKRT_RESEARCH_H2Frontier_TAM_SAM_SOM.pdf` exists but no numbers appear in DATAROOM_CONTENT.md. Should be on the /business or /overview page.
- **Competitive benchmarking not extracted.** `MKRT_RESEARCH_MarketLandscape_CompetitiveBenchmarking.pdf` exists but only a basic PEM/Alkaline comparison table is in the content file. Named competitors (Plug Power, Nel, ITM, etc.) and their funding/valuation would strengthen positioning.

### Resources/Documents
- **Pitch deck password is in the content file.** `investor2026` — this should NOT be in the data room content reference if this file is shared broadly. Flag for Colby.
- **No org chart.** `/updated-v2/` has "org structure v2" but it's not extracted.

---

## Items Confirmed Complete

- Technology specs: deeply sourced, multiple cross-references, clear notes on measurement vs design values
- Pipeline: all 11 opportunities catalogued with status, capacity, geography
- Financial model: revenue projections, unit economics, margins, use of funds all extracted
- 45V tax credit: GREET analysis, PPA ROI, facility eligibility — comprehensive
- FEED package: fully inventoried with all drawing numbers
- Cap table: pre-seed investors, amounts, terms all captured
- Efficiency test data: all 4 runs with methodology notes
- Asset inventory: 94+ files catalogued with page assignments
- Component specs: T-25, T-125, T-2500 all documented with sources

---

## Priority Actions for Colby

1. **Caleb Lareau full bio** — biggest visible gap
2. **Current cash position** — Dec 2025 numbers are stale
3. **UL certification status/timeline**
4. **CIP patent filing status**
5. **Confirm which opportunities to show in data room** (VAULT/TITAN have no data)
6. **TAM/SAM/SOM numbers** for overview page
7. **Remove pitch deck password from shared reference files**
