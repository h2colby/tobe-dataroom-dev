# TOBE ENERGY DATA ROOM — CONSISTENCY AUDIT
**Date:** 2026-03-21  
**Auditor:** Subagent (Comprehensive Review)  
**Scope:** All .tsx files in src/app/ and src/components/

---

## EXECUTIVE SUMMARY

**Total Issues Found:** 6  
**CRITICAL:** 3  
**MEDIUM:** 2  
**LOW:** 1

### Critical Issues
1. **Pre-seed amount incorrect** — Listed as $2M instead of $1.8M
2. **Pulse frequency too specific** — States 16,400 Hz instead of generalized range
3. **"SECTION XX" numbering** — 17 instances of section numbers in ASCII headers (should be removed)

### Medium Issues
1. **"Pipeline Explorer" terminology** — Should be "Customers"
2. **Zeeco timeline inconsistency** — One instance shows Q2 2026 instead of Q4 2026

### Low Issues
1. **Grey H₂ comparison price** — Shows $5.25/kg (this is actually correct as a market comparison, not Tobe's LCOH)

---

## DETAILED FINDINGS

---

### ❌ CRITICAL #1: Pre-Seed Amount Incorrect

**Category:** NUMBER CONSISTENCY  
**Severity:** CRITICAL  
**File:** `src/app/business-model/page.tsx`  
**Line:** 43  
**Current Value:** `$2M`  
**Correct Value:** `$1.8M`  

**Context:**
```tsx
{ round: 'Pre-Seed', amount: '$2M', status: 'CLOSED', detail: 'Technology validation & IP filing' },
```

**Why This Matters:**  
The pre-seed round raised **$1.8M total**, not $2M. This appears in investor-facing financial projections and must be accurate.

**Fix:**
```tsx
{ round: 'Pre-Seed', amount: '$1.8M', status: 'CLOSED', detail: 'Technology validation & IP filing' },
```

---

### ❌ CRITICAL #2: Pulse Frequency Too Specific

**Category:** NUMBER CONSISTENCY  
**Severity:** CRITICAL  
**Files:**
- `src/app/technology/efficiency/page.tsx` (Line 52)
- `src/app/technology/efficiency/page.tsx` (Line 276)

**Current Value:** `16,400 Hz`  
**Correct Value:** `10 kHz - 250 kHz` (generalized range)

**Context (Line 52):**
```tsx
{ label: 'PULSE FREQ', value: '16,400 Hz' },
```

**Context (Line 276):**
```tsx
Operating conditions (all runs): 60% duty cycle, 16,400 Hz pulse frequency, ~28°C stack temp, ~25 psig operating pressure
```

**Why This Matters:**  
The specific 16,400 Hz value is from one test run and is not representative of the full operating range. The cell operates across 10 kHz to 250 kHz. Stating a single frequency is misleading and doesn't reflect the adaptive pulsed waveform architecture.

**Fix (Line 52):**
```tsx
{ label: 'PULSE FREQ', value: '10-250 kHz' },
```

**Fix (Line 276):**
```tsx
Operating conditions (all runs): 60% duty cycle, pulsed waveform (10-250 kHz), ~28°C stack temp, ~25 psig operating pressure
```

---

### ❌ CRITICAL #3: Section Numbers in ASCII Headers

**Category:** FORMATTING CONSISTENCY  
**Severity:** CRITICAL  
**Files & Line Numbers:**

| File | Line | Current Header |
|------|------|----------------|
| `src/app/technology/efficiency/page.tsx` | 135 | `SECTION 01 ─── WALL-TO-PLUG: WHY IT MATTERS` |
| `src/app/technology/efficiency/page.tsx` | 221 | `SECTION 02 ─── TEST RESULTS ─ 4 BENCH RUNS` |
| `src/app/technology/efficiency/page.tsx` | 308 | `SECTION 03 ─── TEA MODELING SCENARIOS` |
| `src/app/technology/efficiency/page.tsx` | 390 | `SECTION 04 ─── OPERATING DATA SNAPSHOT` |
| `src/app/technology/efficiency/page.tsx` | 442 | `SECTION 05 ─── TECHNOLOGY COMPARISON` |
| `src/app/technology/efficiency/page.tsx` | 500 | `SECTION 06 ─── VALIDATION ROADMAP` |
| `src/app/projects/node-01/page.tsx` | 150 | `SECTION 01 ─── WHAT IS NODE-01` |
| `src/app/projects/node-01/page.tsx` | 210 | `SECTION 02 ─── AI-POWERED QUOTING ENGINE` |
| `src/app/projects/node-01/page.tsx` | 306 | `SECTION 03 ─── PREDICTIVE MAINTENANCE AI` |
| `src/app/projects/node-01/page.tsx` | 414 | `SECTION 04 ─── THE EXPERIENCE` |
| `src/app/projects/node-01/page.tsx` | 460 | `SECTION 05 ─── WHY THIS MATTERS` |
| `src/app/projects/zeeco/page.tsx` | 158 | `SECTION 01 ─── PROJECT OVERVIEW` |
| `src/app/projects/zeeco/page.tsx` | 198 | `SECTION 02 ─── SYSTEM SPECIFICATIONS` |
| `src/app/projects/zeeco/page.tsx` | 240 | `SECTION 03 ─── PROCESS FLOW` |
| `src/app/projects/zeeco/page.tsx` | 303 | `SECTION 04 ─── ENGINEERING DOCUMENTS` |
| `src/app/projects/zeeco/page.tsx` | 346 | `SECTION 05 ─── DEPLOYMENT TIMELINE` |
| `src/app/projects/zeeco/page.tsx` | 411 | `SECTION 06 ─── SCOPE OF WORK` |
| `src/app/projects/zeeco/page.tsx` | 468 | `SECTION 07 ─── INVESTOR SIGNIFICANCE` |
| `src/app/team/page.tsx` | 112 | `SECTION 01 ─── FOUNDER PROFILE` |
| `src/app/team/page.tsx` | 242 | `SECTION 02 ─── CO-FOUNDER PROFILE` |
| `src/app/team/page.tsx` | 312 | `SECTION 03 ─── THE TEAM` |
| `src/components/DeploymentTimeline.tsx` | 94 | `SECTION 04.1 ─── DEPLOYMENT TIMELINE` |

**Why This Matters:**  
The design system specifies ASCII headers should NOT include section numbers like "SECTION 01", "SECTION 02", etc. The pattern should be:
```
┌─── TITLE ───┐
```
NOT:
```
┌─── SECTION 01 ─── TITLE ───┐
```

Section numbers are redundant and clutter the visual hierarchy.

**Fix Example:**
```tsx
// BEFORE
{`┌─── SECTION 01 ─── WALL-TO-PLUG: WHY IT MATTERS ──────────┐`}

// AFTER
{`┌─── WALL-TO-PLUG: WHY IT MATTERS ──────────────────────────┐`}
```

Apply this pattern to all 22 instances.

---

### ⚠️ MEDIUM #1: "Pipeline Explorer" Terminology

**Category:** TERMINOLOGY CONSISTENCY  
**Severity:** MEDIUM  
**File:** `src/app/page.tsx`  
**Line:** 109  
**Current Value:** `Pipeline Explorer`  
**Correct Value:** `Customers`

**Context:**
```tsx
{ branch: '├─', name: 'Pipeline Explorer', href: '/customers', desc: '$100M+ across 7 sectors, interactive map' },
```

**Why This Matters:**  
The navigation sidebar and other references use "Customers" as the canonical term. "Pipeline Explorer" is legacy terminology from an earlier design iteration.

**Fix:**
```tsx
{ branch: '├─', name: 'Customers', href: '/customers', desc: '$100M+ across 7 sectors, interactive map' },
```

---

### ⚠️ MEDIUM #2: Zeeco Timeline — Q2 2026 Instead of Q4 2026

**Category:** NUMBER CONSISTENCY  
**Severity:** MEDIUM  
**File:** `src/app/projects/zeeco/page.tsx`  
**Line:** 39  
**Current Value:** `Q2 2026`  
**Correct Value:** `Q4 2026`

**Context:**
```tsx
{ date: 'Q2 2026', label: 'Site Preparation & Equipment Installation', status: 'active' as const },
```

**Why This Matters:**  
The Zeeco ARC deployment timeline shows **Q4 2026** as the target for full production across multiple other references (lines 41, 133). Line 39 incorrectly states Q2 2026 for the site preparation phase, which should align with the overall Q4 2026 timeline.

**Fix:**
Review the actual project timeline. If site prep truly starts in Q2 2026 and production begins Q4 2026, this is correct. If not, update to match the Q4 2026 target consistently.

**Recommended Fix (if site prep is also Q4 2026):**
```tsx
{ date: 'Q4 2026', label: 'Site Preparation & Equipment Installation', status: 'active' as const },
```

**Note:** This may be intentionally phased (Q2 prep → Q4 production). Verify with Colby/project team before changing.

---

### ℹ️ LOW #1: Grey H₂ Price Reference ($5.25/kg)

**Category:** NUMBER CONSISTENCY (False Positive)  
**Severity:** LOW  
**File:** `src/components/InvestorDashboard.tsx`  
**Line:** 572  
**Current Value:** `$5.25/kg`  
**Status:** CORRECT AS-IS

**Context:**
```tsx
{ label: 'Grey H₂ Delivered (50mi)', cost: '$5.25/kg', color: COLORS.white40, width: '10.5%' },
```

**Why This Is Correct:**  
This is a **market comparison reference** for grey hydrogen delivered costs, NOT Tobe's LCOH. Tobe's all-in cost is $5.08/kg. The $5.25/kg figure represents what grey hydrogen costs when delivered 50 miles from source — this is an external benchmark for comparison purposes.

**No action needed.**

---

## NUMBERS VERIFIED ✅

The following key numbers were checked across all files and are **CONSISTENT** with the source of truth (InvestorDashboard.tsx):

| Metric | Value | Status |
|--------|-------|--------|
| FY7 Operating Revenue | $327.7M | ✅ Consistent |
| FY7 EBITDA | $209.4M | ✅ Consistent |
| FY7 EBITDA Margin | 63.9% | ✅ Consistent |
| Tobe All-In LCOH | $5.08/kg | ✅ Consistent |
| H₂ ASP (Base Case) | $25/kg | ✅ Consistent |
| System HHV Efficiency | >92% | ✅ Consistent |
| Stack Efficiency | Up to 94.7% | ✅ Consistent |
| Measured SEC | 46.08 kWh/kg | ✅ Consistent |
| Stack Operating Temp | 27-28°C | ✅ Consistent |
| Seed Round Size | $10M ($7.5M equity + $2.5M debt) | ✅ Consistent |
| Pre-Money Valuation | $40M | ✅ Consistent |
| Pipeline Size | $100M+ | ✅ Consistent |
| Pipeline Opportunities | 11 | ✅ Consistent |
| Signed LOIs | 6 | ✅ Consistent |
| 45V PTC Rate | $3.00/kg | ✅ Consistent |
| 45V PTC Duration | 10 years | ✅ Consistent |
| 45V Emissions Threshold | 0.03 kgCO₂e/kg | ✅ Consistent |
| Target Facility Count | 12 | ✅ Consistent |

---

## TERMINOLOGY VERIFIED ✅

The following terminology was checked and is **CONSISTENT**:

| Term | Status | Notes |
|------|--------|-------|
| "Hydrogen as a Service" | ✅ Consistent | Used correctly (not "HaaS") |
| "membrane-free" | ✅ Consistent | Never uses "membraneless" |
| "control boards" | ✅ Consistent | Never uses "Arduino boards" |
| "on or near site" | ✅ Consistent | Proper phrasing used |
| "T-25" / "T-125" | ✅ Consistent | Always hyphenated |

---

## FORMATTING VERIFIED ✅

The following formatting elements were checked:

| Element | Status | Notes |
|---------|--------|-------|
| Orange labels (`text-[#ff6b35]`) | ✅ Consistent | Used throughout |
| Green metrics (`text-[#00ff88]`) | ✅ Consistent | Used for positive values |
| Blue secondary (`text-[#00d4ff]`) | ✅ Consistent | Used for secondary info |
| Card border (`border-l-[3px] bg-[#12121a]`) | ✅ Consistent | Standard pattern |
| Footer | ✅ Consistent | "TOBE ENERGY CORP // CONFIDENTIAL // 2026" |
| ASCII Headers (excluding section numbers) | ⚠️ See Critical #3 | Remove "SECTION XX" |

---

## STALE REFERENCES — NONE FOUND ✅

The following potentially stale references were searched and **NOT FOUND**:

| Search Term | Status |
|-------------|--------|
| Lou Mounsey / Louis Mounsey | ✅ Not found |
| "showroom" (lowercase, incorrect) | ✅ Only proper references to showroom page/images |
| Customer names on non-project pages | ✅ Not found (Nucor, Bechtel, Tulco, TriMet, Loa Carbon, New Day only appear on appropriate pages) |
| "Arduino" | ✅ Not found |
| $466.9M / $466M | ✅ Not found |

---

## BROKEN LINKS — TO BE VERIFIED

The following pages are referenced in navigation but may need verification:

| Link | Target | Status |
|------|--------|--------|
| `/documents` | Document folder structure | ✓ Page exists |
| `/hmi` | HMI dashboard | ✓ Page exists |
| `/validation` | Validation & Programs | ✓ Page exists |
| `/backed-by` | Investors/backers | ✓ Page exists |
| `/team` | Team page | ✓ Page exists |
| `/people` | People page | ✓ Page exists |
| `/pipeline` | Pipeline page | ✓ Page exists |
| `/customers` | Customers page | ✓ Page exists |
| `/projects/showroom` | Showroom project | ✓ Page exists |
| `/projects/node-01` | NODE-01 project | ✓ Page exists |
| `/projects/zeeco` | Zeeco deployment | ✓ Page exists |

All navigation links appear valid. No broken links found.

---

## RECOMMENDED ACTIONS

### Immediate (Before Next Investor View)
1. ✅ Fix pre-seed amount: $2M → $1.8M
2. ✅ Generalize pulse frequency: 16,400 Hz → 10-250 kHz
3. ✅ Fix "Pipeline Explorer" → "Customers"

### High Priority (This Week)
4. ✅ Remove all "SECTION XX" numbers from ASCII headers (22 instances)
5. ✅ Verify Zeeco Q2 2026 timeline (likely correct as phased deployment)

### Nice to Have
- Review LCOH terminology consistency ($2.79/kg system boundary vs $5.08/kg all-in delivered) — ensure messaging is clear about what each number represents

---

## AUDIT METHODOLOGY

This audit covered:
- ✅ Every .tsx file in `src/app/` (20 files)
- ✅ Every .tsx file in `src/components/` (18 files)
- ✅ All financial numbers from InvestorDashboard.tsx (source of truth)
- ✅ Terminology consistency (membrane-free, control boards, etc.)
- ✅ Formatting patterns (colors, borders, headers, footers)
- ✅ Stale references (Lou Mounsey, old dates, outdated names)
- ✅ Navigation link integrity

**Total files audited:** 38  
**Total lines scanned:** ~15,000+  
**Audit duration:** Comprehensive systematic review

---

**END OF AUDIT**
