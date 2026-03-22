# Data Room Consistency Audit — PASS 1

**Date:** March 22, 2026
**Gold Standard:** Technology section pages (technology/, technology/cell/, technology/power-converter/, technology/controls/, technology/efficiency/)
**Total Pages Audited:** 21 (including 2 redirects: hmi→controls, showroom→node-01)
**Screenshots Captured:** AUDIT_SCREENSHOTS/ (1440x900 desktop + 375x812 mobile)

---

## EXECUTIVE SUMMARY

The technology sub-pages (cell, power-converter, controls) are the most polished and consistent. However, even the gold standard has internal inconsistency — the efficiency page diverges from cell/converter in max-width (`max-w-5xl` vs `max-w-6xl`) and header format. The biggest issues are:

1. **Two competing ASCII header formats** used inconsistently across pages
2. **Two different container widths** (`max-w-5xl` vs `max-w-6xl`) with no clear logic
3. **Footer color inconsistency** — some pages use `text-[#ff6b35]/20`, others `text-white/20`
4. **Footer padding inconsistency** — `py-6` vs `py-8`
5. **Sidebar ↔ Overview nav mismatch** — different labels, missing pages
6. **NODE-01 has triple-redundant headers** (ASCII + numbered section + title)
7. **Duplicate content** between Proof page and Backed By page (same investor data)
8. **Duplicate content** between Proof page and Validation page (same programs)

---

## 1. ASCII HEADER PATTERNS

### TWO FORMATS IN USE:

**Format A — SHORT (clean, gold standard tech overview/cell/converter/controls):**
```
┌─── THE TECHNOLOGY ───┐
┌─── TECHNOLOGY / ELECTROLYSIS CELL ───┐
┌─── HOW IT WORKS ───┐
```
Rendered inline: `text-[0.7rem] tracking-[0.2em]` in a `<div>`

**Format B — LONG with trailing dashes (business-model, tax-credits, customers, efficiency hero, zeeco, node-01, team sections):**
```
┌─── BUSINESS MODEL ──────────────────────────────────────┐
┌─── 45V TAX CREDIT STRATEGY ─────────────────────────────┐
┌─── CUSTOMER PIPELINE ───────────────────────────────────┐
```
Rendered as `<pre>` with `text-xs` or `text-xs sm:text-sm`

### PAGES USING EACH FORMAT:

| Page | Header Format | Notes |
|------|--------------|-------|
| technology/ | A (short) | Gold standard |
| technology/cell/ | A (short) | Gold standard |
| technology/power-converter/ | A (short) | Gold standard |
| technology/controls/ | A (short) | Gold standard |
| technology/efficiency/ | **B (long)** | DEVIATES from gold standard |
| business-model/ | B (long) | All 12 section headers are long |
| tax-credits/ | **MIXED** | Hero=B, "THE KEY POINT"=A |
| customers/ | B (long) | Single header |
| team/ | **MIXED** | Hero=A, sections=B |
| backed-by/ | A (short) | Uses SectionHeader component |
| validation/ | A (short) | Uses SectionHeader component |
| people/ | A (short) | Consistent |
| proof/ | A (short) | Consistent |
| projects/node-01/ | B (long) | All sections |
| projects/zeeco/ | B (long) | All sections |

### VERDICT:
The short format (A) is the gold standard. 8 pages use it consistently, 4 use long format, 3 mix formats. The efficiency page — supposedly gold standard — uses long format. This is the most visible inconsistency.

---

## 2. REDUNDANT SECTION HEADERS

### NODE-01 page (worst offender):
```
┌─── WHAT IS NODE-01 ─────────────────────┐
01 //
What Is NODE-01
```
Triple redundancy: ASCII header + numbered prefix + section title.

This `01 //` pattern appears in 5 sections on node-01. No other page uses this pattern.

### Efficiency page:
```
┌─── TECHNOLOGY ─── EFFICIENCY & TEST RESULTS ─────────────────┐
▸ Measured Performance Data
Efficiency & Test Results
```
Triple redundancy: ASCII header + orange subtitle + main title.

### Team page:
```
┌─── THE TEAM ───┐
▸ Personnel
The People Building Tobe Energy
```
Same triple pattern as efficiency.

### Zeeco page:
```
┌─── PROJECT 001 ─── ZEECO ARC DEPLOYMENT ────────────────┐
● CONTRACTED
▸ First Commercial Installation
```
This is less redundant — the status badge and subtitle add context.

---

## 3. CONTAINER WIDTH (max-w)

| Width | Pages |
|-------|-------|
| `max-w-6xl` | technology/, cell/, converter/, backed-by/, people/, validation/, proof/ |
| `max-w-5xl` | business-model/, tax-credits/, efficiency/, team/, zeeco/, node-01/, documents/ |
| `max-w-7xl` | controls/ (special case — dashboard), customers/ (header only, dashboard has its own) |

**Issue:** No clear logic for why some pages use 5xl and others 6xl. The gold standard tech overview uses 6xl, but the gold standard efficiency uses 5xl.

---

## 4. FOOTER INCONSISTENCIES

### Footer text color:
| Color | Pages |
|-------|-------|
| `text-[#ff6b35]/20` (orange, gold standard) | technology/, cell/, converter/, backed-by/, people/, validation/, proof/, team/, zeeco/, node-01/, efficiency/ |
| `text-white/20` (white) | customers/, business-model/, tax-credits/ |

### Footer padding:
| Padding | Pages |
|---------|-------|
| `py-6` (gold standard) | technology/, cell/, converter/, backed-by/, people/, validation/, proof/, team/, zeeco/, node-01/, efficiency/ |
| `py-8` | customers/, business-model/, tax-credits/ |

### Overview footer:
Completely different: `py-2`, `border-[#ff6b35]/20` border color (not white/10), and a single-line footer.

---

## 5. HERO SECTION PATTERNS

### Hero padding:
| Padding | Pages |
|---------|-------|
| `py-10` (no hero section) | technology/ (overview) |
| `py-16` | cell/, converter/, backed-by/, people/, validation/, proof/ |
| `py-20` | business-model/, tax-credits/, efficiency/, team/, zeeco/ |
| Custom (70vh image) | node-01/ |
| `py-6` | customers/ |

**Gold standard sub-pages use `py-16`.** Pages using `py-20` have extra spacing that doesn't match.

### Hero border-b:
All pages except technology/ overview have `border-b border-white/10`. The overview has no border because it flows differently.

### Hero h1 size:
| Size | Pages |
|------|-------|
| `text-2xl sm:text-3xl` | technology/ (overview — intentionally smaller) |
| `text-4xl md:text-5xl` | cell/, converter/, backed-by/, people/, validation/, proof/, business-model/, tax-credits/, efficiency/, team/, zeeco/ |
| `text-5xl md:text-7xl` | node-01/ (intentionally larger — hero page) |

H1 sizes are mostly consistent across detail pages.

---

## 6. CARD/TILE PATTERNS

### Gold standard card (cell/, converter/):
```
border-l-[3px] border-COLOR bg-[#12121a] px-6 py-6
```
With subtle side borders via inline style: `borderTop/Right/Bottom: '1px solid rgba(...)'`

### Variations found:
- **business-model hero cards**: Add `rounded` class (gold standard does NOT use rounded on cards)
- **proof investor cards**: Use `px-5 py-6` (slightly less padding than gold standard `px-6 py-6`)
- **backed-by investor cards**: Use `px-6 py-7` (more padding)
- **technology overview module cards**: Use `px-5 py-5` (less padding, different pattern — link cards)

### Verdict:
Cards are mostly consistent with minor padding variations. The `rounded` class on business-model hero cards is the main deviation.

---

## 7. TABLE FORMATTING

### Gold standard (technology/ overview, cell/):
```
3-column grid, border border-white/5, bg-[#12121a]
Header: bg-[#0e0e16], text-[0.7rem] tracking-[0.15em] text-[#6a6a7a]
Rows: alternating bg-[#12121a] / bg-[#0f0f17]
Values: text-sm font-bold text-[#00ff88]
```

### Pages with tables:
- technology/ — comparison table ✓ consistent
- technology/cell/ — specs + comparison ✓ consistent
- technology/power-converter/ — signal chain (different format — intentional)
- technology/efficiency/ — test data + comparison ✓ uses same pattern with motion wrapper
- business-model/ — financials table, competitor table ✓ same alternating pattern
- tax-credits/ — PPA scenarios table ✓ consistent pattern
- projects/node-01/ — specs table ✓ consistent
- projects/zeeco/ — specs + scope + timeline tables ✓ consistent

**Tables are well-standardized.** Minor variations in header text sizes (0.65rem vs 0.7rem) but visually close.

---

## 8. SECTION DIVIDERS

### Gold standard (cell/, converter/):
```jsx
<SectionDivider /> // my-4
```
Component: `my-4`, orange gradient lines with `═══════` center

### Variations:
| Spacing | Pages |
|---------|-------|
| `my-4` | cell/, converter/, proof/ |
| `my-8` | technology/ (inline, not component) |
| `my-12` | validation/ |

### Pages with NO section dividers:
- business-model/ — uses `border-b border-white/10` between sections instead
- tax-credits/ — uses `border-b border-white/10` between sections
- team/ — uses `border-b border-white/10` between sections
- node-01/ — uses `border-b border-white/10` between sections
- zeeco/ — uses `border-b border-white/10` between sections

**Two different section separation patterns exist:** SectionDivider (tech pages) vs border-b (content-heavy pages). Both work but are visually distinct.

---

## 9. SIDEBAR ↔ OVERVIEW NAV MISMATCH

### Sidebar (Sidebar.tsx):
```
04 PROJECTS
  → NODE-01
  → Zeeco ARC
  → Proof
  → Team
```

### Overview page (page.tsx):
```
04 PEOPLE & PROJECTS
  → NODE-01
  → Zeeco ARC Deployment
  → Proof
  → Team
```

### Mismatches:
1. **Category label**: "PROJECTS" (sidebar) vs "PEOPLE & PROJECTS" (overview)
2. **Sub-item label**: "Zeeco ARC" (sidebar) vs "Zeeco ARC Deployment" (overview)
3. **Sidebar sub-item label**: "Efficiency" vs overview "Efficiency & Testing"

### Missing from sidebar:
- `/people` page (index page) — no sidebar link
- `/backed-by` page — no sidebar link (only accessible from /people index or /proof)
- `/validation` page — no sidebar link (only accessible from /people index or /proof)

### Orphaned pages:
The `/people` page serves as an index to validation, backed-by, and team. But neither `/backed-by` nor `/validation` appear in the sidebar. Users can only find them through the /people index or the /proof page. This is a navigation gap.

---

## 10. AI-GENERATED COPY

### Flagged instances:
1. **team/page.tsx line 41 (Connor bio)**: "leveraging deep experience" — replace with "drawing on" or "applying"
2. **business-model/page.tsx line 753**: "Leverage fleet data" — acceptable in strategic context, but could be "Use fleet data"

### No other banned phrases found:
- "cutting-edge" — NOT FOUND
- "revolutionary" — NOT FOUND
- "groundbreaking" — NOT FOUND
- "game-changing" — NOT FOUND

---

## 11. DUPLICATE CONTENT BETWEEN PAGES

### Proof page vs Backed-By page:
The `/proof` page contains a full investor section (Cortado, 46 Ventures, Wavefunction, Techstars) with nearly identical data as `/backed-by`. Same investor names, same descriptions, same amounts. This is redundant.

### Proof page vs Validation page:
The `/proof` page has a "THIRD-PARTY VALIDATION" section with OU I-CCEW, NSF I-Corps, Prof. Weston, UTulsa Physics — which overlaps significantly with the standalone `/validation` page.

### People page:
The `/people` page is a thin index that links to /validation, /backed-by, and /team. But the /proof page essentially IS a combined version of all three. Question: **Do we need both /proof and /people?**

---

## 12. OVERVIEW PAGE

The overview page has a boot animation sequence that prevents Playwright from capturing content. The screenshot shows a mostly dark page. This animation:
- Types out the ASCII TOBE ENERGY header
- Then reveals content with motion animations
- May cause delays for impatient users

The overview page has a unique structure (no sidebar in initial view, boot sequence) that is intentionally different from other pages, so consistency findings don't apply to it.

---

## 13. DOCUMENTS PAGE

Uses `max-w-5xl`. Footer not checked (large component). The page has a clean document library layout with categories and file cards. Consistent styling.

---

## 14. FINANCIALS PAGE

Wraps `InvestorDashboard` component. Has its own tabbed interface. Consistent within its own design system. The tab bar at the top is unique to this page.

---

## 15. CONTROLS PAGE

Uses `max-w-7xl` — widest container. This is intentional for the dashboard layout. The page is unique with animated gauges, terminal readouts, and tabbed sensor views. It follows the gold standard color scheme but has its own visual language appropriate for an HMI dashboard.

---

## 16. COLOR CONSISTENCY

### Brand colors used correctly:
- Green: `#00ff88` — ✓ consistent everywhere
- Cyan: `#00d4ff` — ✓ consistent everywhere
- Orange: `#ff6b35` — ✓ consistent everywhere
- Red (competitors/warnings): `#ff4444` — ✓ consistent
- Background: `#0a0a0f` — ✓ consistent
- Card bg: `#12121a` — ✓ consistent
- Alt row: `#0f0f17` — ✓ consistent

Colors are well-standardized across all pages.

---

## 17. MOBILE/RESPONSIVE NOTES

Mobile screenshots captured at 375x812. Quick visual scan shows:
- Grid cards properly stacking to single column on mobile
- Tables may overflow on very narrow screens (need to scroll)
- Sidebar collapses appropriately
- ASCII headers with long trailing dashes may overflow on mobile (the long format is worse for mobile)

Detailed mobile audit pending full screenshot review.

---

## SEVERITY SUMMARY

| Issue | Severity | Count |
|-------|----------|-------|
| ASCII header format inconsistency | **CRITICAL** | All pages |
| Footer color/padding inconsistency | **MODERATE** | 3 pages |
| Container width inconsistency | **MODERATE** | ~7 pages |
| Sidebar ↔ Overview nav mismatch | **CRITICAL** | Sidebar + Overview |
| Redundant headers (node-01) | **MODERATE** | 1 page |
| Triple-redundant headers (efficiency, team) | **MINOR** | 2 pages |
| Duplicate content (proof vs backed-by/validation) | **MODERATE** | 3 pages |
| Hero padding inconsistency | **MINOR** | ~5 pages |
| AI copy ("leveraging") | **MINOR** | 1 instance |
| Section divider spacing inconsistency | **MINOR** | 1 page (validation my-12) |
| Card border-radius inconsistency | **MINOR** | 1 page (business-model) |
| Missing sidebar links (backed-by, validation, people) | **MODERATE** | 3 pages |
