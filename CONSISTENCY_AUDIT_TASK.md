# Data Room Consistency Audit — Ralph Loop Task

## Overview
Perform a comprehensive consistency audit and polish of this Next.js investor data room. Iterate through multiple passes until the data room is production-ready.

## Gold Standard
The **technology section pages** (technology/page.tsx, technology/cell/page.tsx, technology/power-converter/page.tsx, technology/controls/page.tsx, technology/efficiency/page.tsx) are the gold standard. All other pages should match their visual language, spacing, font sizes, and component patterns.

## Ralph Loop Process
1. **PASS 1: AUDIT** — Analyze every page, document every inconsistency, generate CURRENT_AUDIT.md
2. **PASS 2: RECOMMENDATIONS** — Write recommendations in AUDIT_RECOMMENDATIONS.md, flag anything wild for Colby review
3. **PASS 3: IMPLEMENT** — Make the fixes
4. **PASS 4: RE-AUDIT** — Screenshot pages, verify fixes, catch new issues
5. **PASS 5: FINAL POLISH** — Last tweaks

## Specific Issues to Fix

### 1. Section Headers — Standardize
Two different patterns exist and they look different:
- Solid: `┌─── BUSINESS MODEL ──────────────────────────────────────┐`
- Dashed: `┌─── TECHNOLOGY / POWER CONVERTER ───┐`
Pick ONE pattern and use it everywhere. The shorter version without trailing padding is cleaner.

### 2. Redundant Section Headers
Many pages have BOTH an ASCII header AND a numbered section title that say the same thing:
```
┌─── WHAT IS NODE-01 ─────────────────────┐
01 //
What Is NODE-01
```
This is triple-redundant. Either the ASCII header adds context beyond the title, or remove it. The `01 //` numbering pattern should only appear if there are multiple sections to navigate.

### 3. Font Sizes & Typography
Ensure consistent font sizes across all pages:
- Page titles: same size everywhere
- Section headers: same size everywhere  
- Body text: same size everywhere
- Stat values: same size everywhere
- Labels/captions: same size everywhere
Compare against technology section pages as baseline.

### 4. Tile/Card Formatting
Cards and tiles should use consistent:
- Border styles (border-l-[3px] pattern vs rounded border pattern)
- Padding values
- Background colors
- Text sizes within cards

### 5. Table Formatting
All data tables should use the same:
- Header styling
- Row alternation pattern
- Text alignment
- Border styles

### 6. Spacing
Section padding and divider spacing should be consistent. Technology pages use py-6 with my-4 dividers. Check all pages match.

### 7. Customers Page
Needs a visual overhaul to match the quality of technology pages. Make it look professional and cohesive.

### 8. Overview Page ↔ Sidebar Consistency
After recent renames, verify:
- Sidebar labels match page titles
- "PROJECTS" in sidebar maps to correct sub-items
- "Efficiency" in sidebar links to efficiency page correctly
- All navigation works

### 9. AI-Generated Copy
Look for and rewrite any copy that sounds obviously AI-generated:
- Phrases like "leveraging", "cutting-edge", "revolutionizing", "game-changing"
- Overly formal or corporate-sounding descriptions
- Repetitive sentence structures
- Unnecessary qualifiers

### 10. Mobile & Responsive
Use Playwright to screenshot pages at these viewports:
- Desktop: 1920×1080, 1440×900
- Laptop: 1366×768
- Tablet: 768×1024
- Mobile: 375×812, 390×844

Check for:
- Text overflow / wrapping issues
- Cards that don't stack properly
- Tables that break on mobile
- Sidebar behavior on narrow screens
- Readability at all sizes

### 11. Suggestions
Flag opportunities for:
- Diagrams that could help (process flows, architecture visuals)
- Content that's too dense and could use visual breaks
- Missing information that investors would expect
- Pages that feel thin vs pages that feel overwhelming

### 12. Additional Checks
- All links work (internal navigation)
- All document download links work
- Images/videos load correctly
- No console errors
- Footer is consistent on every page (should be: "TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024\nCONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY")
- Color usage is consistent (green=#00ff88, cyan=#00d4ff, orange=#ff6b35)

## Output Files
- `CURRENT_AUDIT.md` — Running state of the audit
- `AUDIT_RECOMMENDATIONS.md` — All recommendations with severity (critical/moderate/minor)
- `AUDIT_SCREENSHOTS/` — Directory of page screenshots at various viewports

## Rules
- Do NOT change any data/numbers/technical claims
- Do NOT remove entire sections without flagging
- Do NOT change the NERV aesthetic / color scheme
- DO make the data room look polished and production-ready
- Flag anything uncertain for Colby's review in AUDIT_RECOMMENDATIONS.md
