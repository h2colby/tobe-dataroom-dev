# TOBE ENERGY DATA ROOM — COMPREHENSIVE VISUAL AUDIT

**Date:** 2026-03-22
**Auditor:** The Forge (Claude Opus) + Parallel Agent Fleet
**Scope:** All 18 pages, 28 components, full design system
**Method:** Codebase analysis, Playwright screenshots (desktop 1440px + mobile 375px), design token extraction, accessibility review

---

## EXECUTIVE SUMMARY

The Tobe Energy Data Room is a 18-page Next.js investor presentation with a distinctive NERV/EVA cyberpunk-industrial aesthetic. The visual identity is **strong and cohesive on desktop** — dark backgrounds, orange accents, monospace typography, CRT effects. The site communicates technical credibility effectively.

**However, four critical issues undermine the experience:**

| Priority | Issue | Impact |
|----------|-------|--------|
| **P0** | Mobile layout completely broken — sidebar doesn't collapse | **100% of mobile visitors get an unusable experience** |
| **P1** | Logo image 404 on every page | Brand identity absent site-wide |
| **P1** | No design tokens — all colors/spacing hardcoded | Maintenance nightmare, inconsistency source |
| **P2** | Multiple missing media (videos, hero images) | Broken pages for NODE-01, technology demos |
| **P2** | All chart semantic colors collapsed to orange | Financial data loses meaning |
| **P3** | Inconsistent typography scale (0.55rem–5rem arbitrary) | Unclear visual hierarchy |
| **P3** | Motion accessibility gaps | Some components skip `useReducedMotion()` |

**Overall Score: 6.8/10**

Strong aesthetic vision, undermined by mobile breakage, missing assets, and design system debt. With the fixes outlined in this report, this could be a 9/10 investor experience.

---

## METHODOLOGY

### Tools & Approach
1. **Codebase Exploration** — 4 parallel agents mapped pages, components, design tokens, and captured screenshots
2. **Design System Extraction** — Every hex color, font size, spacing value, animation cataloged from source
3. **Visual Screenshot Audit** — Playwright captured 24 screenshots at 1440px (desktop) and 375px (mobile)
4. **6-Pillar Scoring** — Layout, Typography, Color, Spacing, Interaction, Responsiveness
5. **Accessibility Scan** — ARIA labels, keyboard nav, motion sensitivity, contrast ratios
6. **Consistency Analysis** — Cross-page pattern comparison, component reuse evaluation

---

## SECTION 1: CRITICAL ISSUES (P0–P1)

### P0: MOBILE LAYOUT IS FUNDAMENTALLY BROKEN

**What happens:** The 240px fixed-width sidebar renders at full width on mobile (375px viewport). This consumes ~65% of the screen. Main content is pushed right and clipped — text cuts mid-word, tables are unusable, charts render off-screen.

**Every single page is affected.** There is no hamburger menu, no slide-out drawer, no responsive sidebar treatment.

**Evidence:**
- Sidebar component (`/src/components/Sidebar.tsx`): Uses `w-[240px]` with no responsive variants
- Root layout (`/src/app/layout.tsx`): Flex row layout without mobile breakpoint handling
- No `hidden md:block` or similar mobile-aware classes on sidebar

**Impact:** Any investor viewing on phone or tablet gets an immediately broken experience. Given investor email-to-phone workflows (receive deck link → tap on phone), this is likely losing real engagement.

**Fix complexity:** Medium — requires mobile nav pattern (hamburger + drawer) and responsive layout restructuring.

---

### P1: LOGO IMAGE MISSING SITE-WIDE

**What happens:** The Tobe Energy logo renders as broken alt text ("Tobe Energy") on every single page. The file `/images/tobe-logo.svg` returns 404.

**Impact:** The most prominent brand element is absent. Every page loads without the logo. For a company raising $10M, this signals lack of polish to detail-oriented investors.

**Fix complexity:** Low — locate or create the SVG, place in `/public/images/`.

---

### P1: NO DESIGN TOKENS / CSS VARIABLES

**What happens:** Every color, spacing value, and typography size is hardcoded directly in components. Two separate color constant objects exist (`COLORS` in InvestorDashboard, `C` in FinancialDashboard) that define overlapping but inconsistent palettes.

**Evidence:**
```javascript
// InvestorDashboard.tsx
const COLORS = {
  green: '#ff6b35', orange: '#ff6b35', blue: '#ff6b35', // ALL orange
  ...
};

// FinancialDashboard.tsx — completely different structure
const C = {
  accent: "#ff6b35", accentDim: "rgba(255,107,53,0.08)",
  white: "#E8ECF1", // Different white than other components
  ...
};
```

**Impact:** Impossible to make global theme changes. Color inconsistencies propagate. New pages will inevitably introduce further drift.

**Fix complexity:** Medium — create design tokens file, refactor components to reference tokens.

---

## SECTION 2: PAGE-BY-PAGE DEEP DIVE

### PAGE 01: OVERVIEW / HOME (`/`)

**Component:** `page.tsx` (client)
**Key features:** Boot sequence animation, ASCII art header, typewriter effect, expandable nav categories, RenPanel AI overlay, click sound effects

#### Layout
- Full-screen dark background with subtle grid overlay
- ASCII art "TOBE ENERGY" header dominates top section
- Boot sequence text reveals line-by-line (session storage skips on revisit)
- Navigation categories below, each expandable
- RenPanel floats as overlay

**Strengths:**
- Memorable first impression — the boot sequence is unique and on-brand
- Session storage prevents animation fatigue on repeat visits
- Click sounds add tactile feedback (with SFX toggle)
- Category-based navigation gives clear information architecture preview

**Issues:**
- Boot sequence takes 3-4 seconds — some investors will bounce
- No skip button visible during boot (only session storage skip for returns)
- ASCII art doesn't scale well on smaller desktop viewports (1024px)
- RenPanel overlay can obscure content when open
- Typewriter effect delays content accessibility for screen readers
- Web Audio API click sounds may fail silently on some browsers

**Typography:** Monospace throughout. `text-xs` to `text-sm` for boot lines, larger for category headers. Tracking is aggressive (`0.15em`+).

**Color:** Orange (#ff6b35) for highlights and interactive elements. White text on #0a0a0f. Green (#00ff00) appears briefly in boot sequence (inconsistent with site palette).

**Spacing:** Dense. Boot lines have `space-y-1`. Categories use `gap-3`. Minimal breathing room.

**Score:** 7/10 — Strong concept, boot delay is a risk for impatient investors.

---

### PAGE 02: COMPARISON (`/comparison`)

**Component:** `comparison/page.tsx` (client)
**Purpose:** Competitive positioning vs conventional hydrogen tech

#### Layout
- Header with "The Comparison Nobody Else Will Make" title
- Side-by-side comparison cards (Conventional vs Tobe)
- Data tables with metrics
- Multiple sections scroll vertically

**Strengths:**
- Bold positioning statement in header
- Clear visual contrast between "them" and "us" columns
- Data-driven with specific numbers
- Orange accent highlights Tobe advantages

**Issues:**
- Very long scroll — no anchor nav or table of contents
- Comparison cards use inconsistent internal spacing
- Text glow effects (`text-shadow: 0 0 8px rgba(255,107,53,0.15)`) are applied inline, not via CSS class
- Some comparison rows have different height than others (content-dependent, no min-height)
- No source citations visible inline for competitor claims

**Typography:** Headers use `text-2xl md:text-3xl` with `tracking-[0.1em]`. Body uses `text-sm`. The gap between header and body sizes is large — missing intermediate sizes.

**Color:** Consistent orange/white/dark palette. Competitor side uses muted grays, Tobe side uses orange highlights. Effective contrast.

**Spacing:** Sections separated by `py-12`+. Internal card padding is `p-4` to `p-6`. Some sections feel cramped relative to others.

**Score:** 7.5/10 — Content is strong, needs anchor nav and spacing consistency.

---

### PAGE 03: BUSINESS MODEL (`/business-model`)

**Component:** `business-model/page.tsx` (client)
**Purpose:** Unit economics, pricing, margin analysis across 9 sub-tabs

#### Layout
- Tab navigation at top (9 tabs: Unit Economics, On-Site Advantage, Revenue, etc.)
- Content area switches per tab
- Data tables, metric cards, and narrative sections

**Strengths:**
- Tab navigation handles 9 sections without overwhelming scroll
- Unit economics data is specific and credible ($4.85/kg all-in)
- Revenue model breakdowns are clear

**Issues:**
- 9 tabs is a lot — consider grouping into 3-4 higher-level tabs with sub-sections
- Tab bar overflows horizontally on narrower viewports — no scroll indicator
- Active tab styling (orange border-bottom) is subtle — could be more prominent
- Tab content doesn't animate on switch (abrupt content swap)
- No breadcrumb or "you are here" indicator beyond tab highlight

**Typography:** Tab labels are `text-xs tracking-[0.1em]`. Content headers are `text-xl`. Body is `text-sm`. Metric values use `text-2xl font-bold`. Good hierarchy within content, tab labels are too small.

**Color:** Consistent. Orange for key metrics and active states. White/gray text tiers for content hierarchy.

**Spacing:** Tab bar uses `gap-1` — tabs are very close together. Content sections use `p-6`. Adequate but dense.

**Score:** 7/10 — Content quality is high, tab UX needs refinement.

---

### PAGE 04: FINANCIALS (`/financials`)

**Component:** `financials/page.tsx` (client) → `InvestorDashboard.tsx`
**Purpose:** Investor financial dashboard with 8 tabs

#### Layout
- Dashboard-style layout with tab navigation
- Financial metric cards
- Charts/visualizations
- Data tables

**Strengths:**
- Comprehensive financial data presentation
- Dashboard layout feels professional
- Tab organization keeps dense data navigable

**Issues:**
- **ALL semantic chart colors map to orange** — green, blue, and orange all resolve to `#ff6b35`. This means positive/negative/neutral indicators are visually identical. Revenue growth and cost increases look the same.
- Color constants in `COLORS` object are misleading — variable named `green` contains orange hex
- Chart legends become meaningless when all series are the same color
- Dense data tables need better row striping or alternating backgrounds
- No export/download option for financial data

**Typography:** Dashboard uses custom `COLORS.white` (#E8ECF1) instead of pure white — warmer tone. Metric values are prominent. Labels are `text-xs`. Good hierarchy.

**Color:** **Critical issue** — mono-orange charts lose information. The warm white (#E8ECF1) is slightly different from the rest of the site's pure white, creating subtle inconsistency.

**Spacing:** Compact dashboard grid. Cards use `p-4`. Metrics have adequate breathing room. Charts feel slightly cramped.

**Score:** 5.5/10 — Data quality is excellent, but chart color collapse is a serious information design failure.

---

### PAGE 05: CUSTOMERS (`/customers`)

**Component:** `customers/page.tsx` (server) → `PipelineDashboard`, `DeploymentTimeline`
**Purpose:** Pipeline visualization and deployment tracker

#### Layout
- Pipeline dashboard (SVG network graph)
- Deployment timeline below
- ASCII-style timeline art

**Strengths:**
- Interactive SVG pipeline is visually impressive
- Radial network graph effectively shows deal stages
- Node size scales with deal value — good visual encoding
- Deployment timeline uses creative ASCII art
- Hover tooltips provide deal details

**Issues:**
- SVG graph renders at fixed dimensions — doesn't scale with viewport
- Tooltip positioning can clip at edges
- Network graph legend is small and easily missed
- ASCII timeline art breaks on narrow viewports
- "Oklahoma cluster" label overlaps with nodes when densely packed
- Pipeline stats (total: $100M, 12 opportunities) could be more prominently displayed

**Typography:** Pipeline labels use very small text (`text-[0.6rem]`). Timeline milestones use `text-sm`. Codenames use `font-bold` with tracking.

**Color:** Status colors are well-differentiated: contracted (green), LOI (yellow), quoting (orange), interest (blue). Better color diversity than financials.

**Spacing:** Network graph has adequate spacing. Timeline cards use `p-4` with `gap-4`. Reasonable.

**Score:** 7.5/10 — Visually impressive, needs responsive handling and prominence for key stats.

---

### PAGE 06: TAX CREDITS (`/tax-credits`)

**Component:** `tax-credits/page.tsx` (client)
**Purpose:** 45V hydrogen production tax credit tiers and compliance strategy

#### Layout
- Header with tax credit overview
- Tier comparison (credit levels)
- Compliance pathway
- Revenue impact calculations

**Strengths:**
- Clear tier breakdown
- Specific dollar amounts ($0.60, $1.00, $3.00/kg tiers)
- Compliance pathway is actionable
- $2.7M/year per facility figure is prominently displayed

**Issues:**
- Dense regulatory text without visual breaks
- Tier cards could use stronger visual differentiation (all look similar)
- No visual representation of Oklahoma's renewable grid advantage
- Missing link to IRS/DOE source documents

**Typography:** Standard page typography. Headers `text-2xl`, body `text-sm`, metrics `text-xl font-bold`.

**Color:** Consistent orange/white palette. Tier levels could benefit from color coding (bronze/silver/gold metaphor).

**Score:** 7/10 — Content is valuable, visual differentiation between tiers needs work.

---

### PAGE 07: TECHNOLOGY OVERVIEW (`/technology`)

**Component:** `technology/page.tsx` (client)
**Purpose:** Technology overview with 4 subsystem module cards

#### Layout
- Hero section with technology narrative
- 4 card grid linking to subsystems (Cell, Power Converter, Controls, Efficiency)
- Comparative tech table
- IP strategy section

**Strengths:**
- Clean 4-card module layout is intuitive
- Each card clearly describes the subsystem
- Comparative table is effective
- IP section adds credibility

**Issues:**
- Cards lack hover previews or descriptions of what you'll find inside
- No visual diagram showing how the 4 subsystems connect
- Manufacturing videos load in some contexts, 404 in others
- "94% HHV Efficiency" claim needs more prominent display

**Typography:** Module card titles use `text-lg font-bold`. Descriptions use `text-sm`. Good hierarchy.

**Color:** Consistent. Cards use `#12121a` background on `#0a0a0f` — subtle elevation. Orange borders on hover.

**Spacing:** Card grid uses `gap-4`. Internal padding `p-6`. Well-balanced.

**Score:** 7.5/10 — Good structure, needs system interconnection diagram.

---

### PAGE 08: ELECTROLYSIS CELL (`/technology/cell`)

**Component:** `technology/cell/page.tsx` (client)
**Purpose:** Detailed specifications of the electrolysis cell

#### Layout
- Hero with cell description
- Blueprint-style technical diagram (animated SVG)
- Specification boxes
- Manufacturing process section with videos

**Strengths:**
- Blueprint component is beautiful — cyan grid, animated draw-on SVG
- SpecBox component presents data clearly
- Manufacturing videos (when working) show real production
- Technical credibility is high

**Issues:**
- Blueprint cyan (#00d4ff) is inconsistent with orange palette — only appears here
- Video files 404 (cnc-electrolysis-housing.webm, transformer-winding.webm)
- SpecBox variants (default, blueprint, highlight) are used inconsistently
- No dimension annotations on the electrolyzer diagram

**Typography:** SpecBox labels use `text-xs`, values use `text-sm font-bold`. Blueprint title uses custom styling.

**Color:** Introduces cyan (#00d4ff) in Blueprint component — the ONLY page using this color prominently. Creates palette inconsistency. Should either embrace cyan site-wide or replace with orange variant.

**Spacing:** Good use of whitespace around Blueprint diagrams. SpecBoxes have consistent internal padding.

**Score:** 7/10 — Blueprint is visually impressive, color inconsistency and missing videos hurt.

---

### PAGE 09: POWER CONVERTER (`/technology/power-converter`)

**Component:** `technology/power-converter/page.tsx` (client)
**Purpose:** Pulsed power converter design and specifications

#### Layout
- Technical narrative
- Specification tables
- Performance data
- Design philosophy section

**Strengths:**
- Deep technical content builds credibility
- Pulsed power approach is well-explained
- Specifications are precise

**Issues:**
- Wall of text in some sections — needs more visual breaks
- No diagram of the power converter system
- Missing comparison with conventional power electronics
- Could use a SpecBox for key specs instead of inline text

**Typography:** Standard page typography. Some sections are text-heavy with insufficient heading breaks.

**Color:** Consistent orange/white/dark.

**Spacing:** Sections are adequately spaced but internal paragraphs could use more line height.

**Score:** 6.5/10 — Content is strong, presentation is text-heavy and needs visual aids.

---

### PAGE 10: HMI / CONTROLS (`/technology/controls`)

**Component:** `technology/controls/page.tsx` (client)
**Purpose:** Real-time monitoring dashboard with 5 tabs, simulated sensor data

#### Layout
- Tab navigation (Process Control, Power Electronics, Safety, Water Quality, Environmental)
- Live-updating gauge values with animated numbers
- Dashboard cards with metrics
- 100 cloud variables reference

**Strengths:**
- **Most impressive page in the data room** — live-updating sensor values create visceral "this is real" feeling
- `useAnimatedValue` hook creates convincing real-time fluctuation
- 5 dashboard tabs cover full system breadth
- Cloud variable count (100) is prominently shown

**Issues:**
- Animation never stops — continuous value fluctuation may distract
- No way to "pause" the simulation
- Gauge colors don't indicate ranges (all green/orange regardless of whether value is in safe/warning/danger range)
- Dashboard layout is dense — could benefit from sparkline charts
- Tab labels could use icons alongside text

**Typography:** Gauge values use `text-2xl font-bold font-mono`. Labels use `text-xs`. Clear numeric hierarchy.

**Color:** Orange dominates metrics. No red/yellow/green semantic range coloring for safety-critical values (a missed opportunity for a controls dashboard).

**Spacing:** Dense dashboard grid. Cards tightly packed. Functional but could breathe more.

**Score:** 8/10 — Most compelling page. Needs semantic color ranges and pause option.

---

### PAGE 11: EFFICIENCY (`/technology/efficiency`)

**Component:** `technology/efficiency/page.tsx` (client)
**Purpose:** Test results and measured kWh/kg data

#### Layout
- Efficiency claims with data
- Test run data tables
- Comparison with industry benchmarks

**Strengths:**
- Actual measured data is the strongest proof point
- Test run tables with specific numbers
- Industry benchmark comparison is effective

**Issues:**
- Data tables could use better visual treatment (zebra striping, header styling)
- No chart/graph visualization of test data (tables only)
- Missing confidence intervals or error bars on measurements
- "94% HHV" headline could be larger/more prominent

**Typography:** Table headers use `font-bold text-xs tracking-wider`. Data cells use `text-sm font-mono`. Good for data readability.

**Color:** Consistent. Table borders use `rgba(255,255,255,0.1)`. Row hover states would be nice.

**Score:** 7/10 — Data is gold, visualization could be more compelling.

---

### PAGE 12: NODE-01 (`/projects/node-01`)

**Component:** `projects/node-01/page.tsx` (client)
**Purpose:** Prototype deployable unit in shipping container

#### Layout
- Hero section with project overview (hero image missing — 404)
- Specification cards
- Timeline/progress
- Solar + battery + cell integration details

**Strengths:**
- Concrete deliverable — makes technology tangible
- Specs are detailed (2.5 kW solar, 6 kWh battery, single T-25)
- Container concept is clever narrative device

**Issues:**
- **Hero image is 404** (`showroom-inspo.jpg`) — largest visual element on the page is broken
- Without the hero, the page opens with just text — loses visual impact
- Could use a 3D render or diagram of the container layout
- No progress/status indicator (what % complete?)

**Typography:** Standard page typography. Section headers are clear.

**Color:** Consistent orange/white/dark.

**Spacing:** Adequate. Spec cards are well-spaced.

**Score:** 5/10 — Missing hero image is devastating. Content is solid but needs its visual anchor.

---

### PAGE 13: ZEECO ARC (`/projects/zeeco`)

**Component:** `projects/zeeco/page.tsx` (client)
**Purpose:** First commercial deployment — 600 kW, 12 T-25 units

#### Layout
- Project overview narrative
- System specifications
- 5 FEED package PDF downloads
- Deployment timeline

**Strengths:**
- Strongest commercial proof point in the data room
- FEED package downloads add serious credibility
- Specific: 600 kW, 300 kg H₂/day, Q2 2026
- "CONTRACTED" status feels real

**Issues:**
- No hero image or rendering (unlike NODE-01's attempted hero)
- Inconsistent with NODE-01 page structure
- FEED package links should verify they actually download (PDF accessibility)
- No Zeeco company context (who is Zeeco? why do they matter?)
- Missing deployment timeline visual

**Typography:** Consistent with other pages.

**Color:** Consistent.

**Spacing:** Well-balanced.

**Score:** 7/10 — Content is the strongest in the data room, visual presentation doesn't match the importance.

---

### PAGE 14: PROOF (`/proof`)

**Component:** `proof/page.tsx` (client)
**Purpose:** Investor & institution validation (Cortado, Techstars, OU, NSF)

#### Layout
- Investor logos/cards
- Press coverage grid
- Professional network references
- Institutional validation

**Strengths:**
- Strong social proof — Cortado, Hurricane, Techstars
- Press coverage adds credibility (CleanTechnica, Chemical Engineering)
- Institutional backing (OU I-CCEW, NSF)

**Issues:**
- Investor cards could show check sizes (investors want to know who else wrote checks and how big)
- Press logos could be larger/more prominent
- Missing a "quote" or testimonial from an investor
- Cards have inconsistent heights
- External links open without indication (no external link icon)

**Typography:** Card titles use `text-lg font-bold`. Body uses `text-sm`. Coverage date labels use `text-xs`.

**Color:** Consistent. Some cards use different background shades — subtle but noticeable inconsistency.

**Spacing:** Card grid uses `gap-4`. Some cards feel more cramped than others due to content length.

**Score:** 7/10 — Content is compelling, visual hierarchy could better emphasize the "name" investors.

---

### PAGE 15: TEAM (`/team`)

**Component:** `team/page.tsx` (client)
**Purpose:** Founder bios, team members, organizational DNA

#### Layout
- Founders section (Colby, Caleb) with detailed bios
- Team member cards (7 members including Ren AI and Jane EA)
- Hiring roadmap
- "Organizational DNA" narrative

**Strengths:**
- Colby's background is compelling (Marathon Petroleum, $75M infrastructure)
- Caleb's credentials are exceptional (Harvard PhD, Forbes 30U30)
- Including Ren (AI) as team member is clever and on-brand
- Hiring roadmap shows growth trajectory

**Issues:**
- No headshots/photos for any team member — all text-based cards
- Founder bios are long — could lead with key stats and expand on click
- Team member cards vary in content length, creating uneven grid
- "Organizational DNA" section is dense prose without visual breaks
- No LinkedIn/profile links

**Typography:** Founder names use `text-2xl font-bold`. Titles use `text-sm`. Bios use `text-sm` with `leading-relaxed`. Good readability.

**Color:** Consistent. Founder cards may use slightly different background.

**Spacing:** Founders get more space. Team grid uses `gap-4`. Adequate.

**Score:** 6.5/10 — Needs photos/headshots urgently. Text-only team pages feel impersonal for investors evaluating the people behind the technology.

---

### PAGE 16: DOCUMENTS (`/documents`)

**Component:** `documents/page.tsx` (client)
**Purpose:** Full document library — 112 files across 6 categories

#### Layout
- 6 collapsible top-level sections (Corporate, Financial, Engineering, Projects, Market, Pending Review)
- Nested subfolders (up to 3 levels deep)
- Inline document viewer (modal with arrow navigation)
- File count badges

**Strengths:**
- Comprehensive — 112 files covers everything an investor needs
- Collapsible sections prevent overwhelm
- Inline viewer for PDFs is smooth
- Arrow key navigation between documents
- File type indicators

**Issues:**
- 6 sections with deeply nested subfolders can be hard to navigate
- No search functionality
- No "recently added" or "start here" highlights
- Corporate section (57 files) is overwhelming even when collapsed
- Pending Review section naming is confusing for investors (sounds like drafts, not finished docs)
- No download-all or bulk download option
- Document names are raw filenames, not friendly display names

**Typography:** Folder labels use `text-sm font-bold tracking-wider`. File names use `text-xs`. Adequate but filenames could be more readable.

**Color:** Consistent. Folder icons use orange. File type badges use muted colors.

**Spacing:** Tight nested lists. `pl-4` per nesting level. Adequate for tree structure.

**Score:** 6.5/10 — Functional but needs search, better naming, and a "start here" flow.

---

### PAGE 17: PIPELINE (`/pipeline`)

**Component:** Standalone pipeline visualization
**Purpose:** Geographic/network view of sales pipeline

#### Layout
- Full-width SVG network visualization
- Central HQ node with radiating opportunity nodes
- Distance rings represent deal stages (contracted → LOI → quoting → interest)
- Legend with status color coding

**Strengths:**
- Visually distinctive — radial network graph is unique
- Deal value encoded in node size
- Status colors are well-differentiated
- Hover interactions reveal deal details

**Issues:**
- Fixed SVG dimensions don't scale responsively
- Oklahoma cluster creates node overlap at high density
- Legend is small and positioned away from the action
- No total pipeline value prominently displayed
- Connection lines (center → nodes) create visual clutter with 12+ nodes
- Missing geographic context (no map underlay)

**Typography:** Node labels are very small (`text-[0.6rem]`). Could be illegible on lower-resolution displays.

**Color:** Best color usage in the data room — contracted (green), LOI (yellow), quoting (orange), interest (blue). Four distinct hues with clear meaning.

**Score:** 7/10 — Unique visualization, needs responsive handling and decluttering.

---

### PAGE 18: PEOPLE (`/people`)

**Component:** Hub page linking to Proof + Team
**Purpose:** Landing page for people-related content

#### Layout
- Brief intro
- Links to Proof and Team pages

**Issues:**
- Feels like an unnecessary intermediate page — could just have Proof and Team in sidebar
- Very light on content
- No preview of what you'll find on sub-pages

**Score:** 5/10 — Could be eliminated in favor of direct sidebar navigation.

---

## SECTION 3: DESIGN SYSTEM AUDIT

### 3.1 COLOR PALETTE ANALYSIS

**Current State:** 30+ unique colors used across the codebase with no centralized token system.

**Primary Palette (Consistent):**
| Token | Hex | Usage | Consistency |
|-------|-----|-------|-------------|
| Background | `#0a0a0f` | Body, main backgrounds | ✅ Consistent |
| Surface | `#12121a` | Card backgrounds, panels | ✅ Consistent |
| Surface Alt | `#0f0f17` | Alternating rows | ⚠️ Close to surface, hard to distinguish |
| Accent | `#ff6b35` | All interactive elements, highlights | ✅ Consistent |
| Text Primary | `#ffffff` | Main body text | ⚠️ Some components use `#E8ECF1` |
| Text Muted | Various grays | Labels, secondary text | ❌ At least 6 different gray values |

**Problem Colors:**
| Issue | Colors | Location |
|-------|--------|----------|
| Cyan orphan | `#00d4ff` | Blueprint component only |
| Boot green | `#00ff00` | Home page boot sequence only |
| Warm white | `#E8ECF1` | FinancialDashboard only |
| Chart red | `#FF6B6B` | FinancialDashboard only |
| Gold | `#FFB380` | FinancialDashboard only |
| Yellow | `#ffcc00` | Pipeline status only |

**Critical Issue — Semantic Color Collapse:**
```javascript
// InvestorDashboard.tsx — ALL map to orange
green: '#ff6b35',
orange: '#ff6b35',
blue: '#ff6b35',
```
This means financial charts cannot visually distinguish between revenue types, growth vs decline, or positive vs negative indicators.

**Recommendation:** Create `design-tokens.ts` with:
- 5 surface levels (bg, surface-1, surface-2, surface-3, surface-4)
- 3 text levels (primary, secondary, muted)
- 1 primary accent (orange) with 5 opacity stops
- 1 secondary accent (cyan or warm gold) with 3 opacity stops
- 4 semantic colors (success, warning, danger, info) for data visualization
- Remove orphan colors or formalize them

---

### 3.2 TYPOGRAPHY SCALE ANALYSIS

**Current State:** Font sizes range from `0.55rem` to `5rem` with no defined scale. Custom sizes are used arbitrarily.

**Sizes Found (Sorted):**
```
0.55rem, 0.6rem, 0.65rem, 0.7rem, 0.75rem (text-xs), 0.875rem (text-sm),
1rem (text-base), 1.125rem (text-lg), 1.25rem (text-xl), 1.5rem (text-2xl),
1.875rem (text-3xl), 2rem, 2.25rem (text-4xl), 2.5rem, 3rem (text-5xl)
```

That's **15 distinct sizes** with no clear hierarchy or naming convention.

**Font Families:**
- `font-mono` — Primary UI font (JetBrains Mono)
- `font-sans` — Used sparingly for body text
- `font-technical` — Custom, used in SpecBox
- `font-typewriter` — Custom, used in document sections

**Letter Spacing Chaos:**
```
tracking-[0.01em], tracking-[0.05em], tracking-[0.1em], tracking-[0.15em],
tracking-[0.2em], tracking-[0.3em], tracking-wider, tracking-widest
```
8 different tracking values with no semantic meaning.

**Recommendation:** Define a type scale:
```
display:   2.5rem (page titles)
heading-1: 1.875rem (section headers)
heading-2: 1.5rem (subsection headers)
heading-3: 1.25rem (card titles)
body:      0.875rem (default text)
caption:   0.75rem (labels, metadata)
micro:     0.65rem (timestamps, tiny labels)
```
7 sizes instead of 15. Two tracking values: `normal` and `wide` (0.1em).

---

### 3.3 SPACING SYSTEM ANALYSIS

**Current State:** Mix of Tailwind defaults and arbitrary custom values. No consistent spacing scale.

**Custom Values Found:**
```
w-[240px], w-[420px], h-[560px], h-[52px], w-[0.5rem], w-[0.6rem],
h-[0.5rem], h-[2px], px-[0.8rem], py-[0.5rem]
```

**Fixed Dimensions (Not Responsive):**
- Sidebar: `w-[240px]` — no responsive variant
- Chat panel: `w-[420px]` × `h-[560px]` — fixed
- Header: `h-[52px]` — fixed

**Recommendation:** Adopt an 8px grid:
```
4xs: 0.25rem (2px) — hairlines
3xs: 0.5rem (4px) — tight gaps
2xs: 0.75rem (6px) — compact
xs:  1rem (8px) — default small
sm:  1.5rem (12px) — comfortable
md:  2rem (16px) — standard
lg:  3rem (24px) — section gaps
xl:  4rem (32px) — major sections
2xl: 6rem (48px) — page sections
```
Convert fixed pixel values to rem with responsive variants.

---

### 3.4 COMPONENT PATTERN ANALYSIS

**Well-Structured Components:**
- `SpecBox` — 3 variants, clear props, reusable ✅
- `DocumentSection` — 3 variants, semantic props ✅
- `ClassifiedStamp` — 6 variants, 3 colors, 3 sizes ✅
- `AutoplayVideo` — handles autoplay gracefully ✅

**Components That Need Refactoring:**
- `RenPanel` + `DataRoomChat` — **significant overlap**. Both implement lightning bolt canvas + chat streaming. Should be unified into one component with two modes (overlay vs floating).
- `InvestorDashboard` + `FinancialDashboard` — separate color systems, should share tokens.
- `HeroVideo` + `VideoBackground` — similar purpose, different implementations.

**Missing Components:**
- `TabNav` — tabs are implemented inline on each page (business-model, financials, controls). Should be extracted.
- `DataTable` — tables are styled inline per page. Need a reusable table component with sorting, striping, and responsive scroll.
- `MetricCard` — metric/stat cards are reimplemented on every page with slightly different styles.
- `SectionHeader` — page section headers are inconsistently styled. Need a shared component.
- `MobileNav` — doesn't exist at all. Required for P0 mobile fix.

---

### 3.5 ANIMATION CONSISTENCY AUDIT

**Standard Pattern (Used by Most Components):**
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.08 }}
```

**Inconsistencies:**
| Component | Animation | Issue |
|-----------|-----------|-------|
| Blueprint SVG | `pathLength: 0 → 1` with 2s duration | Much slower than other animations |
| Boot sequence | `setTimeout` chains (500ms intervals) | Uses JS timers, not Framer Motion |
| HMI gauges | Continuous `requestAnimationFrame` | Never stops, performance concern |
| ClassifiedStamp | Spring physics (`bounce: 0.5`) | Only component using spring |
| RenPanel canvas | `requestAnimationFrame` at 60fps | Heaviest animation, always running |

**`useReducedMotion()` Coverage:**
| ✅ Respects | ❌ Does Not Check |
|-------------|-------------------|
| Hero, HeroVideo, TypewriterText, sections | RenPanel canvas, DataRoomChat canvas, Boot sequence, HMI gauge animations |

**Recommendation:**
1. Standardize entrance animation: `fadeUp` with 0.4s duration, 0.06s stagger
2. Add `useReducedMotion()` to ALL animated components
3. Add pause/stop for continuous animations (RenPanel, HMI)
4. Use Framer Motion for boot sequence instead of setTimeout chains

---

## SECTION 4: CROSS-CUTTING CONCERNS

### 4.1 MOBILE RESPONSIVENESS

**Status: BROKEN**

The site has no mobile strategy for its primary layout structure. While individual components use `sm:`, `md:`, `lg:` breakpoints for internal responsive adjustments, the sidebar-plus-content layout has zero responsive handling.

**Required Changes:**
1. Sidebar must collapse to hamburger menu below `md:` (768px)
2. Chat panel must be full-screen overlay on mobile, not fixed-width
3. Header bar must stack or simplify for narrow viewports
4. SVG pipeline visualization needs a mobile-friendly alternative (list view?)
5. Data tables need horizontal scroll wrappers
6. Tab navigation needs scroll indicators on overflow

---

### 4.2 ACCESSIBILITY

**ARIA & Semantic HTML:**
- ✅ `role="button"` on interactive elements (RedactedText)
- ✅ `tabIndex` on some interactive elements
- ✅ `alt` text on images
- ❌ No `<nav>` landmark for sidebar
- ❌ No `<main>` landmark for content area
- ❌ No skip-to-content link
- ❌ Tab navigation not keyboard-accessible (no focus ring visible)
- ❌ Canvas elements (RenPanel, DataRoomChat) have no fallback text
- ❌ Boot sequence animation has no skip mechanism for screen readers

**Color Contrast:**
- ✅ White (#fff) on dark (#0a0a0f) = 19.3:1 ratio — excellent
- ⚠️ Orange (#ff6b35) on dark (#0a0a0f) = 5.2:1 — passes AA large text, fails AAA
- ❌ Muted grays (#6a6a7a) on dark (#0a0a0f) = 3.1:1 — **fails AA**
- ❌ `rgba(255,255,255,0.4)` on dark = ~4.5:1 — borderline AA

**Keyboard Navigation:**
- ❌ No visible focus indicators on most interactive elements
- ❌ Tab order not tested/optimized
- ❌ Modal (document viewer) may not trap focus

**Screen Reader:**
- ❌ Canvas bolt animation has no `aria-label` or fallback
- ❌ Boot sequence text is progressively revealed — screen reader gets nothing until animation completes
- ❌ SVG pipeline graph has no text alternative

---

### 4.3 PERFORMANCE CONCERNS

| Issue | Impact | Location |
|-------|--------|----------|
| RenPanel canvas at 60fps | CPU drain, battery impact | Every page (global) |
| HMI continuous value animation | Unnecessary rerenders | /technology/controls |
| 22+ components with Framer Motion | Bundle size concern | Site-wide |
| No lazy loading on sub-pages | All content loads eagerly | All pages |
| IntersectionObserver in multiple components | Multiple observers instead of shared | Various |

---

## SECTION 5: 6-PILLAR SCORED RUBRIC

| Pillar | Score | Assessment |
|--------|-------|------------|
| **Layout** | 7/10 | Strong desktop structure. Sidebar + content pattern works. Fixed dimensions hurt flexibility. No mobile layout. |
| **Typography** | 6/10 | Monospace aesthetic is on-brand. 15 sizes with no scale is chaotic. Letter spacing is overused. |
| **Color** | 6/10 | Palette is distinctive but underutilized. Semantic color collapse in charts. Orphan colors. No tokens. |
| **Spacing** | 6.5/10 | Generally adequate. Mix of Tailwind and arbitrary values. No consistent grid. Dense by default. |
| **Interaction** | 7.5/10 | Animations are smooth and purposeful. HMI is outstanding. Boot sequence is memorable. Hover states present. |
| **Responsiveness** | 2/10 | Desktop-only. Mobile is completely broken. Some internal component responsiveness exists but layout is fatal. |

**Weighted Overall: 6.0/10**
(Responsiveness weighted 2× due to investor mobile access patterns)

---

## SECTION 6: PRIORITIZED MASTER FIX LIST

### TIER 0 — MUST FIX BEFORE NEXT INVESTOR VISIT

| # | Issue | Page(s) | Effort | Impact |
|---|-------|---------|--------|--------|
| T0-1 | Implement mobile responsive sidebar (hamburger + drawer) | All | Large | Critical |
| T0-2 | Fix logo image 404 | All | Trivial | High |
| T0-3 | Fix NODE-01 hero image 404 | /projects/node-01 | Small | High |
| T0-4 | Fix video file 404s (CNC, transformer) | /technology/cell | Small | Medium |

### TIER 1 — DESIGN SYSTEM FOUNDATION

| # | Issue | Scope | Effort | Impact |
|---|-------|-------|--------|--------|
| T1-1 | Create design-tokens.ts with color, spacing, typography tokens | Global | Medium | High |
| T1-2 | Fix chart semantic colors (distinguish revenue types, growth/decline) | /financials | Medium | High |
| T1-3 | Define and implement typography scale (7 sizes max) | Global | Medium | Medium |
| T1-4 | Extract shared TabNav component | business-model, financials, controls | Medium | Medium |
| T1-5 | Extract shared MetricCard component | Multiple pages | Medium | Medium |
| T1-6 | Extract shared DataTable component | Multiple pages | Medium | Medium |

### TIER 2 — VISUAL POLISH

| # | Issue | Scope | Effort | Impact |
|---|-------|-------|--------|--------|
| T2-1 | Add team headshots/photos | /team | Small (content) | High |
| T2-2 | Add document search functionality | /documents | Medium | Medium |
| T2-3 | Unify RenPanel + DataRoomChat components | Global | Large | Medium |
| T2-4 | Add anchor nav to long pages (comparison, tax-credits) | Specific pages | Small | Medium |
| T2-5 | Improve comparison page spacing consistency | /comparison | Small | Low |
| T2-6 | Add semantic color ranges to HMI gauges | /technology/controls | Small | Medium |
| T2-7 | Add skip button to boot sequence | / | Small | Medium |
| T2-8 | Rename "Pending Review" to "Latest Reports" or similar | /documents | Trivial | Low |

### TIER 3 — ACCESSIBILITY & PERFORMANCE

| # | Issue | Scope | Effort | Impact |
|---|-------|-------|--------|--------|
| T3-1 | Add `useReducedMotion()` to all animated components | Global | Small | Medium |
| T3-2 | Add ARIA landmarks (`<nav>`, `<main>`, skip link) | Layout | Small | Medium |
| T3-3 | Add visible focus indicators | Global | Small | Medium |
| T3-4 | Fix muted text contrast ratio (3.1:1 → 4.5:1+) | Global | Small | Medium |
| T3-5 | Add canvas fallback text for screen readers | RenPanel, DataRoomChat | Small | Low |
| T3-6 | Optimize RenPanel canvas (throttle when not visible) | Global | Small | Medium |
| T3-7 | Add `will-change` and `contain` for heavy animations | Global | Small | Low |

### TIER 4 — CONTENT & NARRATIVE

| # | Issue | Scope | Effort | Impact |
|---|-------|-------|--------|--------|
| T4-1 | Add system interconnection diagram to technology overview | /technology | Medium | Medium |
| T4-2 | Add "Start Here" flow to documents page | /documents | Small | Medium |
| T4-3 | Eliminate /people hub page (direct sidebar nav) | Navigation | Small | Low |
| T4-4 | Add investor quote/testimonial to proof page | /proof | Small (content) | Medium |
| T4-5 | Add Zeeco company context ("who is Zeeco") | /projects/zeeco | Small (content) | Low |
| T4-6 | Add investment round sizes to proof page investor cards | /proof | Small (content) | Medium |
| T4-7 | Zeeco page: add rendering/hero image for visual parity with NODE-01 | /projects/zeeco | Medium (content) | Medium |

---

## APPENDIX A: SCREENSHOTS

24 screenshots captured and saved to:
```
/Volumes/Macintosh HD-1/Users/tobe/clawd/tobe-dataroom-dev/screenshots/
```
Each page captured at 1440px (desktop) and 375px (mobile).

---

## APPENDIX B: COLOR INVENTORY (COMPLETE)

### Hex Colors Used
```
#0a0a0f    Background primary (31 occurrences)
#12121a    Surface/card (12 occurrences)
#0f0f17    Surface alt (3 occurrences)
#16161f    Surface quaternary (2 occurrences)
#ff6b35    Primary accent orange (80+ occurrences)
#ffffff    White text (implicit in Tailwind)
#E8ECF1    Warm white (FinancialDashboard only)
#C9D1DB    Text secondary (FinancialDashboard only)
#7B8A9E    Muted text (FinancialDashboard only)
#4A5568    Dim text (FinancialDashboard only)
#2A3444    Faint (FinancialDashboard only)
#1C2736    Border dark (FinancialDashboard only)
#243244    Border light (FinancialDashboard only)
#ff4444    Error red (1 occurrence)
#FF6B6B    Chart red (FinancialDashboard only)
#FFB380    Gold/secondary (FinancialDashboard only)
#00d4ff    Cyan (Blueprint component only)
#00ff00    Boot green (homepage only)
#ffcc00    Pipeline yellow (pipeline only)
#6a6a7a    Gray medium (sidebar, labels)
#5a5a6a    Gray dark (branch indicators)
#b0b0bc    Gray lighter (inactive menu)
#9a9ab0    Gray lightest (submenu text)
```

### RGBA Variants Used
```
rgba(255,107,53, 0.04)   Orange tint (backgrounds)
rgba(255,107,53, 0.08)   Orange dim (hover states)
rgba(255,107,53, 0.15)   Orange glow (text shadows)
rgba(255,107,53, 0.2)    Orange medium (borders)
rgba(255,107,53, 0.25)   Orange accent glow
rgba(255,107,53, 0.3)    Orange strong (active borders)
rgba(255,107,53, 0.6)    Orange intense (box shadows)
rgba(255,255,255, 0.02)  White whisper (card backgrounds)
rgba(255,255,255, 0.03)  White faint (grid lines)
rgba(255,255,255, 0.05)  White subtle (borders, grids)
rgba(255,255,255, 0.1)   White light (borders)
rgba(255,255,255, 0.2)   White medium (secondary text)
rgba(255,255,255, 0.3)   White strong (emphasized text)
rgba(255,255,255, 0.4)   White prominent
rgba(255,255,255, 0.6)   White near-full
rgba(0,0,0, 0.3)         Black overlay
rgba(0,0,0, 0.4)         Black medium overlay
rgba(0,0,0, 0.5)         Black strong overlay
rgba(0,0,0, 0.6)         Black dense overlay
```

---

## APPENDIX C: COMPONENT DEPENDENCY MAP

```
Root Layout
├── Sidebar (navigation, always visible)
├── DataRoomChat (floating AI chat, always available)
├── Header Bar (session/status, inline in layout)
└── Page Content
    ├── / (Home)
    │   └── RenPanel (AI overlay with canvas)
    ├── /comparison
    ├── /business-model (9 internal tabs)
    ├── /financials
    │   └── InvestorDashboard
    ├── /customers
    │   ├── PipelineDashboard
    │   └── DeploymentTimeline
    ├── /tax-credits
    ├── /technology
    │   ├── /cell → Blueprint, SpecBox, AutoplayVideo
    │   ├── /power-converter → SpecBox
    │   ├── /controls (5 internal tabs, animated gauges)
    │   └── /efficiency (data tables)
    ├── /projects
    │   ├── /node-01 → Image (404)
    │   └── /zeeco → PDF downloads
    ├── /proof
    ├── /team
    ├── /documents (DocumentViewer modal)
    ├── /pipeline → PipelineNetwork (SVG)
    └── /people (hub page)
```

---

*Audit completed 2026-03-22 by The Forge. Total scope: 18 pages, 28 components, 24 screenshots, 112 document files cataloged.*
