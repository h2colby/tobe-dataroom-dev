# Audit Recommendations — Data Room Consistency Polish

**Date:** March 22, 2026
**Based on:** CURRENT_AUDIT.md (Pass 1 findings)
**Gold Standard:** technology/cell/ and technology/power-converter/ pages

---

## How to read this document

Each recommendation has:
- **Severity**: CRITICAL (investor-visible, looks unprofessional), MODERATE (noticeable inconsistency), MINOR (polish item)
- **Scope**: Which files need changes
- **Action**: What to do
- **Flag for Colby**: Items needing human judgment are flagged

---

## CRITICAL RECOMMENDATIONS

### C1. Standardize ASCII Headers to Short Format
**Severity:** CRITICAL
**Scope:** 8 files (business-model, tax-credits, customers, efficiency, team, zeeco, node-01 section headers)
**Action:**
Convert all ASCII headers from long format:
```
┌─── BUSINESS MODEL ──────────────────────────────────────┐
```
To short format (gold standard):
```
┌─── BUSINESS MODEL ───┐
```

Also convert from `<pre>` tags to `<div>` tags with `text-[0.7rem] tracking-[0.2em]` classes, matching the gold standard pattern.

**Rationale:** The short format is cleaner, more readable, better on mobile (no overflow), and matches the gold standard tech pages. The trailing dashes add visual noise without information value.

**Files to change:**
- `src/app/business-model/page.tsx` (12 headers)
- `src/app/tax-credits/page.tsx` (8 headers)
- `src/app/customers/page.tsx` (1 header)
- `src/app/technology/efficiency/page.tsx` (1 hero header — bring into gold standard)
- `src/app/team/page.tsx` (3 section headers that use long format)
- `src/app/projects/zeeco/page.tsx` (8 headers)
- `src/app/projects/node-01/page.tsx` (5 headers)

---

### C2. Fix Sidebar ↔ Overview Navigation Mismatch
**Severity:** CRITICAL
**Scope:** `src/components/Sidebar.tsx`, `src/app/page.tsx`
**Action:**
1. Align sidebar category label: "PROJECTS" → "PEOPLE & PROJECTS" (or vice versa — one must win)
2. Align sub-item labels: "Zeeco ARC" → "Zeeco ARC Deployment" (or vice versa)
3. Align "Efficiency" → "Efficiency & Testing" (or vice versa)
4. Add missing sidebar links for `/backed-by` and `/validation`

**FLAG FOR COLBY:**
- Should sidebar section 04 be "PROJECTS" or "PEOPLE & PROJECTS"?
- Should backed-by and validation get their own sidebar entries, or remain accessible only through /proof?
- Currently, the sidebar group 04 mixes projects (NODE-01, Zeeco) with people (Team) and credibility (Proof). Should this be reorganized?

**Suggested sidebar restructure:**
```
04 PROJECTS
  → NODE-01
  → Zeeco ARC
05 PROOF & PEOPLE
  → Proof
  → Team
  → Backed By
  → Validation
06 DOCUMENTS
07 ASK REN
```

---

## MODERATE RECOMMENDATIONS

### M1. Standardize Footer Color and Padding
**Severity:** MODERATE
**Scope:** 3 files
**Action:**
Change footer `<pre>` color from `text-white/20` to `text-[#ff6b35]/20` and add `textShadow` on these pages:
- `src/app/customers/page.tsx`
- `src/app/business-model/page.tsx`
- `src/app/tax-credits/page.tsx`

Change footer padding from `py-8` to `py-6` on the same 3 pages.

Match gold standard footer exactly:
```jsx
<footer className="border-t border-white/10 px-6 py-6">
  <div className="mx-auto max-w-6xl text-center">
    <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
      {`TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024
CONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY`}
    </pre>
  </div>
</footer>
```

---

### M2. Standardize Container Width
**Severity:** MODERATE
**Scope:** 7 files
**Action:**
Change `max-w-5xl` to `max-w-6xl` on these pages to match gold standard:
- `src/app/business-model/page.tsx`
- `src/app/tax-credits/page.tsx`
- `src/app/technology/efficiency/page.tsx`
- `src/app/team/page.tsx`
- `src/app/projects/zeeco/page.tsx`
- `src/app/projects/node-01/page.tsx`
- `src/app/documents/page.tsx`

**FLAG FOR COLBY:**
The `max-w-5xl` (1024px) vs `max-w-6xl` (1152px) difference is subtle but noticeable side-by-side. Business model and tax-credits are very content-heavy pages — the narrower width may have been intentional for readability. If you prefer narrower for text-heavy pages, we can keep `max-w-5xl` on business-model, tax-credits, and efficiency, and only fix zeeco/node-01/team/documents.

---

### M3. Remove Triple-Redundant Headers on NODE-01
**Severity:** MODERATE
**Scope:** `src/app/projects/node-01/page.tsx`
**Action:**
Remove the `01 //` numbered prefixes. The ASCII header already provides section labeling. Change:
```
┌─── WHAT IS NODE-01 ───┐
01 //
What Is NODE-01
```
To:
```
┌─── WHAT IS NODE-01 ───┐
What Is NODE-01
```

Or even better — since the ASCII header already says the section name, make the h2 the descriptive title:
```
┌─── WHAT IS NODE-01 ───┐
A Containerized Hydrogen Production System
```

**FLAG FOR COLBY:** The `01 //` numbering pattern was likely intentional for a multi-section navigation feel. If you like it, keep it. But it's redundant with the ASCII header on every section. Your call.

---

### M4. Address Proof Page Duplication
**Severity:** MODERATE
**Scope:** `src/app/proof/page.tsx`, `src/app/backed-by/page.tsx`, `src/app/validation/page.tsx`, `src/app/people/page.tsx`
**Action:** No code changes yet — needs Colby decision.

**FLAG FOR COLBY:**
The `/proof` page is essentially a combined version of `/backed-by` + `/validation` + press coverage. Three options:

**Option A: Keep /proof as the canonical page, simplify /backed-by and /validation**
- Make /backed-by and /validation thin pages that redirect or link to /proof sections
- Pro: Single source of truth, no duplicate content
- Con: Backed-by and validation pages have more detail than proof's summary

**Option B: Keep all three pages, remove investor/validation sections from /proof**
- Make /proof focus only on press/memberships/networks
- Rename it to something like "Press & Networks"
- Pro: Each page has its own purpose
- Con: /proof becomes thinner

**Option C: Keep everything as-is**
- Accept the duplication as intentional reinforcement
- Pro: Multiple entry points to the same information
- Con: If data changes, you need to update 2-3 places

**Recommendation:** Option A or B. Duplicate data is a maintenance risk.

---

### M5. Add Missing Sidebar Navigation Links
**Severity:** MODERATE
**Scope:** `src/components/Sidebar.tsx`
**Action:**
At minimum, add `/backed-by` and `/validation` to the sidebar. Currently these pages are only discoverable through `/people` index or `/proof` page. An investor exploring via sidebar will never find them.

This ties into C2 (sidebar restructure). Wait for Colby's decision on sidebar organization before implementing.

---

## MINOR RECOMMENDATIONS

### N1. Standardize Hero Padding
**Severity:** MINOR
**Scope:** 5 files
**Action:**
Change hero `py-20` to `py-16` on:
- `src/app/business-model/page.tsx`
- `src/app/tax-credits/page.tsx`
- `src/app/technology/efficiency/page.tsx`
- `src/app/team/page.tsx`
- `src/app/projects/zeeco/page.tsx`

And change customers hero `py-6` to `py-16` (currently feels too cramped).

---

### N2. Fix AI Copy — "leveraging"
**Severity:** MINOR
**Scope:** `src/app/team/page.tsx` line 41
**Action:**
Change Connor's bio:
- From: "leveraging deep experience with high-voltage power systems"
- To: "drawing on deep experience with high-voltage power systems"

---

### N3. Remove `rounded` from Business Model Hero Cards
**Severity:** MINOR
**Scope:** `src/app/business-model/page.tsx`
**Action:**
Remove `rounded` class from the three revenue engine cards in the hero section. Gold standard cards don't use `rounded`.

---

### N4. Fix Section Divider Spacing on Validation Page
**Severity:** MINOR
**Scope:** `src/app/validation/page.tsx`
**Action:**
Change `SectionDivider` component's `my-12` to `my-4` to match gold standard cell/converter pages.

Wait — the validation page imports its own `SectionDivider` with `my-12`. Change to `my-4`.

---

### N5. Standardize Hero Subtitle Pattern
**Severity:** MINOR
**Scope:** efficiency/, team/ hero sections
**Action:**
The efficiency and team pages have a `▸ Subtitle` line between the ASCII header and h1:
```
▸ Measured Performance Data
Efficiency & Test Results
```
This pattern doesn't appear on cell/, converter/, backed-by/, or validation pages. Consider removing the `▸ Subtitle` lines for consistency, or adding them to all pages.

**FLAG FOR COLBY:** The `▸ Subtitle` adds nice context. If you like it, we should add it to all sub-pages for consistency. If not, remove from efficiency/team.

---

### N6. Customers Page — Minimal Hero
**Severity:** MINOR
**Scope:** `src/app/customers/page.tsx`
**Action:**
The customers page has only an ASCII header and then jumps directly to the PipelineDashboard component. Consider adding a brief hero section with an h1 and subtitle to match other pages:
```
┌─── CUSTOMER PIPELINE ───┐
Pipeline & Deployments
$100M pipeline across 12 opportunities.
```

---

## ITEMS NOT RECOMMENDED TO CHANGE

### Keep as-is:
1. **Controls page max-w-7xl** — Intentional for dashboard layout
2. **Overview page boot animation** — Intentional brand experience
3. **NODE-01 full-width hero image** — Intentional for visual impact
4. **Business model sticky nav** — Unique to this page, adds navigation value
5. **Section dividers vs border-b separation** — Content-heavy pages (business-model, tax-credits) use border-b because they have more sections. This is an intentional density choice, not inconsistency.

---

## IMPLEMENTATION PRIORITY ORDER

If approved, implement in this order:

1. **C1** — ASCII headers (most visible, touches most files)
2. **M1** — Footer standardization (quick fix, high impact)
3. **M2** — Container widths (after Colby decision on narrow preference)
4. **N1** — Hero padding (quick fix)
5. **N2** — AI copy fix (one line)
6. **N3** — Card rounded removal (one line)
7. **N4** — Divider spacing (one line)
8. **C2 + M5** — Sidebar/nav (needs Colby decision first)
9. **M3** — NODE-01 headers (needs Colby decision)
10. **M4** — Proof/backed-by/validation dedup (needs Colby decision)

---

## ESTIMATED SCOPE

- **Automated fixes (no decisions needed):** C1, M1, N1-N4 = ~30 min
- **Decision-dependent fixes:** C2, M2-M5, N5-N6 = waiting on Colby
- **Total files touched:** ~14 page files + 1 sidebar component

---

## STOP POINT

**Do NOT implement any changes until Colby reviews this document and makes decisions on flagged items.**

Items flagged for decision:
1. Sidebar structure (C2)
2. Container width preference (M2)
3. NODE-01 numbered headers (M3)
4. Proof page duplication strategy (M4)
5. Hero subtitle pattern (N5)
