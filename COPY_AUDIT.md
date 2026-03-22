# COPY AUDIT — Tobe Energy Data Room
**Date:** 2026-03-22
**Status:** IN PROGRESS

---

## 1. src/app/page.tsx (Overview)

### OV-01 | AI-Sounding / Wordy | HIGH
**Line ~378:**
> "And how that translates into disrupting the industrial gas monopoly — with category-defining profit potential, scalable to hundreds of markets, and deployable anywhere in the world."

**Problem:** "Category-defining profit potential" and "disrupting" are VC pitch clichés. Sentence tries to do too much.
**Fix:** "That cost advantage breaks the industrial gas monopoly — with 70%+ margins, hundreds of addressable markets, and no geographic constraints."

### OV-02 | Wordy / Run-on | HIGH
**Line ~531:**
> "Our innovation is two-tiered: a unique cell geometry designed to maximize the output of our purpose-built power electronics optimized specifically for hydrogen production. The result isn't just competing with green hydrogen — it's competing with the entire $226B grey hydrogen market, constrained by geography and logistics, with the flexibility that small modular facilities afford."

**Problem:** 51-word sentence. "Designed to maximize the output of our purpose-built power electronics optimized specifically for" is a nesting doll of modifiers. "Constrained by geography and logistics, with the flexibility that small modular facilities afford" is muddled — what is constrained?
**Fix:** "Two innovations compound: a unique cell geometry paired with power electronics built from scratch for hydrogen production. The result competes not just with green hydrogen but with the entire $226B grey hydrogen market — because on-site production eliminates the logistics chain that makes grey expensive."

### OV-03 | Filler | MEDIUM
**Line ~468-469:**
> "We built this data room to make hard tech easier to understand. Prefer a traditional format? Browse all documents directly."

**Problem:** First sentence is meta-commentary about the data room itself. Investors don't need to be told why you built it.
**Fix:** "All source documents, specs, and financials. Browse directly." OR just "Browse all documents directly."

### OV-04 | Wordy | MEDIUM
**Line ~547:**
> "AI woven from first quote through manufacturing to predictive maintenance. Not bolted on — built in from day one."

**Problem:** "Not bolted on — built in from day one" says the same thing twice.
**Fix:** "AI integrated from first quote through manufacturing to predictive maintenance."

---

## 2. src/app/comparison/page.tsx

### CP-01 | Clean
This page is well-written. Direct, data-heavy, minimal filler. The strongest copy in the data room.

No issues found above LOW confidence.

---

## 3. src/app/business-model/page.tsx

### BM-01 | AI-Sounding | HIGH
**Line ~446:**
> "Hydrogen isn't just an end product — it's the feedstock for the entire clean economy. Our cost breakthrough cascades downstream, making the technologies of the future economically viable today."

**Problem:** "Cascades downstream", "technologies of the future", "economically viable today" — generic clean-energy pitch language. Says nothing specific.
**Fix:** "Hydrogen feeds the entire clean supply chain. Cheaper hydrogen means cheaper ammonia, cheaper SAF, cheaper steel. Here's how our cost advantage compounds."

### BM-02 | AI-Sounding / Filler | HIGH
**Line ~472:**
> "When hydrogen costs drop below $2/kg, entire industries flip from fossil to renewable overnight. Tobe doesn't just produce hydrogen — we enable the economics that make the clean transition inevitable."

**Problem:** "Enable the economics that make the clean transition inevitable" is corporate-speak. "Flip from fossil to renewable overnight" is hyperbolic.
**Fix:** "Below $2/kg, hydrogen replaces fossil fuels on cost alone — no mandates needed. That's where we're headed." OR REMOVE (the point is already made by the data above it).

### BM-03 | Wordy | MEDIUM
**Line ~454:**
> "Hydrogen is the largest cost input in synthetic fuel production. Tobe reduces that cost by up to 30%, bringing SAF closer to jet fuel parity and making e-fuels commercially viable at scale."

**Problem:** "Making e-fuels commercially viable at scale" is generic. The 30% number is the point.
**Fix:** "Hydrogen is the largest cost input in SAF production. Tobe cuts it by up to 30%."

### BM-04 | Wordy | MEDIUM
**Line ~460:**
> "Ammonia production consumes 1-2% of global energy. Green ammonia from Tobe hydrogen cuts feedstock costs by up to 40%, enabling price parity with fossil-based fertilizer production for the first time."

**Problem:** "Enabling price parity with fossil-based fertilizer production for the first time" — the stat does the talking.
**Fix:** "Ammonia production consumes 1-2% of global energy. Tobe hydrogen cuts that feedstock cost by up to 40% — reaching parity with fossil-based fertilizer."

### BM-05 | Filler | MEDIUM
**Line ~466:**
> "With 45V tax credits, Tobe hydrogen is better priced than many legacy fossil-based solutions. This unlocks what Deloitte estimates as a $1.4T addressable market — steel, ammonia, e-fuels, mobility, and beyond."

**Problem:** "And beyond" is filler. "Legacy fossil-based solutions" is corporate speak.
**Fix:** "With 45V credits, Tobe hydrogen undercuts fossil. Deloitte estimates the addressable market at $1.4T — steel, ammonia, e-fuels, and mobility."

### BM-06 | Redundancy | MEDIUM
**Lines 27-29 vs 167-197:**
The three revenue engines are described in both the `revenueStreams` data array AND the hero cards. The hero card descriptions are near-identical to the array descriptions.

**Problem:** Same content appears twice on the same page — once in the hero section and again in the "Revenue Streams" section below.
**Fix:** Make hero cards briefer (just name + % + one-line), save the full descriptions for the Revenue Streams section only.

---

## POTENTIAL INCONSISTENCIES (Cross-page)

### INC-01 | Efficiency Numbers | FLAG
- Overview page: ">92% HHV" and "We measured 46 [kWh/kg]"
- Comparison page cost table: "42 kWh/kg @ $0.035/kWh"
- Business model moat section: "46 kWh/kg measured in lab; 42.8 kWh/kg conservative model assumption"
- Business model competitors table: "42–46 kWh/kg"

**Issue:** The overview page uses 46 kWh/kg as the measured number but the comparison page's cost model uses 42 kWh/kg. The business model clarifies both exist (measured vs. model), but the overview and comparison pages don't explain which they're using. An investor reading comparison → overview would see different electricity cost assumptions.

### INC-02 | All-in Cost | FLAG
- Comparison page: Total Breakeven = $5.40/kg (Yr 3), Selling Price = $7.05/kg (30% margin)
- Business model: All-in Cost = $5.08/kg, Selling Price = $25/kg (89.5% margin)
- Business model: Direct Variable Cost = $2.57/kg

**Issue:** $5.40 vs $5.08 all-in. These may reflect different time horizons or assumptions but the discrepancy will catch an investor's eye.

---

## 4. src/app/financials/page.tsx (InvestorDashboard)
### FN-01 | Clean
Dashboard is almost entirely data labels and charts. No prose copy to audit. No issues.

---

## 5. src/app/customers/page.tsx
### CU-01 | Clean
Minimal copy — just a subtitle and two embedded components. Clean and direct.

---

## 6. src/app/tax-credits/page.tsx
### TC-01 | Clean
Well-structured page. Honest about risks. Data-heavy. No filler detected above LOW confidence.

---

## 7. src/app/technology/ (overview + cell + power-converter + controls + efficiency)
### TECH-01 | Clean
Technology pages are among the strongest in the data room. Technical, direct, no filler. The efficiency page in particular does an excellent job of showing data transparency (downside/base/upside scenarios, measured vs modeled).

No issues found above LOW confidence.

---

## 8. src/app/projects/zeeco/page.tsx
### ZC-01 | Clean
Project-appropriate detail. Direct. Well-organized with scope splits, timelines, and engineering documents. No filler.

---

## 9. src/app/projects/node-01/page.tsx
### ND-01 | AI-Sounding | MEDIUM
**Line ~129:** "The Future of Hydrogen Production, Containerized"
**Problem:** "The Future of X" is the most overused startup tagline format.
**Fix:** "Hydrogen Production in a Box" or "Solar to Hydrogen. One Container."

### ND-02 | Filler | MEDIUM
**Line ~57-58 (Solar-to-Hydrogen card):** "The entire clean energy chain, visible and tangible."
**Problem:** Summary sentence that restates what the reader just read.
**Fix:** REMOVE the last sentence.

### ND-03 | AI-Sounding | MEDIUM
**Line ~67 ("Year 3000" card):** "The future of energy should look like the future."
**Problem:** Circular statement. Sounds like ad copy.
**Fix:** Delete this sentence. The preceding sentences are stronger without it.

---

## 10. src/app/proof/page.tsx
### PR-01 | Clean
Fact-based page with investors, validation, press. No puffery or filler detected.

---

## 11. src/app/team/page.tsx
### TM-01 | Wordy / AI-Sounding | MEDIUM
**Line ~144 (Colby bio):** "it became baked into his DNA to provide true innovation to the hydrogen industry and make it live up to its zero-emission promise"
**Problem:** "Baked into his DNA" is cliché. "Provide true innovation" is vague.
**Fix:** "he started Tobe to solve it himself."

### TM-02 | Redundancy | MEDIUM
**Line ~392 (Organizational DNA closing):** "It's baked into our DNA from day one, and it's something that will never change about Tobe Energy."
**Problem:** "Baked into our DNA" used twice on same page (also in Colby's bio). "Something that will never change" is empty filler.
**Fix:** Just end with "This is how you compress decades of innovation into months."

---

## STATUS: COMPLETE
All 10 pages reviewed. Final output in COPY_AUDIT_FINAL.md.
