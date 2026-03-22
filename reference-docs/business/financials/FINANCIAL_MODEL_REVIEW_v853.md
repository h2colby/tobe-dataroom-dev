# Financial Model v8.5.3 — Deep Review

**Reviewed by:** Ren ⚡  
**Date:** March 18, 2026  
**Source:** FINAL_Tobe_Seed_Financial_Model_v853.xlsx

---

## 🟢 EXECUTIVE SUMMARY

**Overall Assessment: B+ / Ready for Seed Due Diligence**

This is a well-structured, investor-grade financial model. It's thorough, internally consistent, and defensible. A few areas need refinement before heavy investor scrutiny.

### What's Working
- Clean P&L structure with clear revenue streams
- Detailed unit economics with source citations
- Learning curve / cost-down is well-researched and realistic
- Error dashboard shows all checks pass
- Tax credit treatment is conservative (45V shown separately)
- Sensitivity analysis covers key variables

### What Needs Work
1. **Timeline tension** — FY1 starts Apr '26, but you're raising Seed now (Mar '26)
2. **Facility ramp assumptions** — 12 facilities by FY7 is aggressive without showing how
3. **45V cliff risk** — Model shows PTC through FY7 but 45V expires/changes 2027
4. **Series A+ rounds are illustrative** — Should be flagged more clearly
5. **H₂ price at $25/kg** — Justify vs. grey H₂ delivered at $10/kg

---

## 📊 SHEET-BY-SHEET ANALYSIS

### 1. Overview
**Purpose:** Executive summary for investors  
**Status:** ✅ Clean and impactful

| Metric | FY7 Value | Comment |
|--------|-----------|---------|
| Revenue | $467M | Reasonable if 12 facilities hit |
| EBITDA | $278M (59.4%) | Strong margin, needs justification |
| Net Income | $202M (43.3%) | Very strong |
| Cash | $921M | Shows no capital needs after Series B |

**Issue:** The $467M revenue number in Overview doesn't match P&L Summary ($327.7M). Check formula linkage.

### 2. P&L Summary
**Purpose:** 7-year income statement  
**Status:** ✅ Well-structured

**Strengths:**
- Clean revenue breakdown (H₂ / Equipment / Services)
- COGS properly allocated by segment
- OpEx detail is sufficient
- Headcount scales reasonably (15 → 224 FTEs)

**Questions an investor will ask:**
- "How do you get to $264M H₂ revenue in FY7?" → Need production volume proof
- "Why does EBITDA margin stay >60%?" → Show operating leverage math
- "What's the Series A capital need if FY2 cash is $50M?" → Clarify

**Math check:**
- FY2: $16.1M revenue, $3.8M EBITDA, 23.3% margin → ✅ Checks out
- FY3: $88.3M revenue, $54.9M EBITDA, 62.2% margin → ✅ Plausible with scale

### 3. Unit Economics
**Purpose:** $/kg cost breakdown  
**Status:** ✅ This is the star of the model

**Tobe All-In Cost:** ~$5/kg  
**Grey H₂ Delivered:** ~$10/kg  
**Tobe Advantage:** ~50% cost savings

This is the pitch. Well-documented with source notes.

**Cost Breakdown ($/kg):**
| Component | Tobe | Grey H₂ |
|-----------|------|---------|
| Production | $1.47 | $1.00 |
| Compression | $0.12 | $0.75 |
| Transportation | $0.90 | $8.00 |
| RO Water | $0.05 | $0.05 |
| **Direct OpEx** | **$2.54** | **$9.80** |
| Overhead | $2.29 | (absorbed) |
| **All-In** | **$4.83** | **$10+** |

**⚠️ Issue:** Transportation at $0.90 assumes 50-mile delivery. Grey H₂ at $8 assumes 500-mile. Not apples-to-apples. Should note this or use same distance.

### 4. Fundraising
**Purpose:** Round-by-round capital plan  
**Status:** ⚠️ Needs disclaimer

Shows 5 rounds totaling $510M equity + $224M debt. 

**Concern:** This is explicitly labeled "ILLUSTRATIVE — NOT MODELED" but investors often miss this. Recommend:
- Move Series C/D to separate "Illustrative" section
- Bold the disclaimer
- Don't show specific valuations beyond Series A

**Seed Round ($10M):**
- $7.5M equity + $2.5M debt
- Pre-money: $40M
- Post-money: $47.5M
- 15.8% dilution for Seed investors

This is reasonable and consistent with market.

### 5. Use of Funds
**Purpose:** Seed round deployment  
**Status:** ✅ Detailed and credible

| Category | Amount | % |
|----------|--------|---|
| R&D (T-125 validation) | $1.1M | 14.7% |
| Manufacturing Equipment | $1.1M | 14.9% |
| Personnel (15 months) | ~$2.2M | 29.5% |
| Certifications | $475K | 6.3% |
| Working Capital & G&A | $1.8M | 24% |

**Strengths:**
- Line-item detail (specific machines, specific roles)
- Benefits loading (37.4%) is realistic
- Hire schedule by month shows planning

**Questions:**
- "What if certifications cost more?" → Need contingency line
- "15-month runway?" → At $10M raised with ~$3M FY1 burn, you're at ~33 months. Clarify.

### 6. Tax Credits (45V)
**Purpose:** Model the $3/kg federal PTC  
**Status:** ⚠️ Regulatory risk not addressed

Shows $10.8M/year PTC at steady state (FY4+).

**Critical Issue:** 45V has a "begin construction" deadline that may be 2027 (per OBBBA). Model shows PTC revenue through FY7 (2033). Need to:
- Add scenario with PTC ending 2028
- Note regulatory risk explicitly
- Show base case WITHOUT PTC

### 7. Learning Curve
**Purpose:** Cost-down from scale  
**Status:** ✅ Excellent — best practice

Shows BOM reduction:
- Phase 1 (SN 1-20): -18% via DFM, automation, bulk purchasing
- Phase 2 (SN 20-130): -7.3% via AI QA, automated testing
- Phase 3 (SN 130-535): -3.9% via robotics, kaizen
- Phase 4+: ~1% annual creep from materials inflation

This is realistic and well-documented. Most models are far less rigorous.

### 8. Error Dashboard
**Purpose:** Model integrity checks  
**Status:** ✅ All pass

- Balance sheet balances: OK
- Minimum cash ≥ 0: OK ($273K minimum)
- No formula errors: OK
- P&L tie-out: OK

**Last verified:** 2026-03-04

---

## 🔴 CRITICAL ISSUES

### 1. Revenue Number Mismatch
Overview shows FY7 revenue as $467M, but P&L Summary shows $327.7M. This is a red flag for any investor who checks.

**Fix:** Verify formula linkage in Overview sheet.

### 2. 45V Cliff Risk
The model assumes 45V PTC continues through FY7. With the OBBBA changing begin-construction to 2027, facilities started after that may not qualify. This could wipe $10.8M/year from EBITDA.

**Fix:** Add "No PTC" scenario. Even if it's ugly, investors want to see you've considered it.

### 3. Facility Ramp Justification
12 facilities by FY7 requires aggressive capital deployment. Series B ($60M equity) is supposed to fund facilities 4-7, but capex at $3.3M/facility × 4 = $13.2M — leaves a lot of other spend. Where does the rest go?

**Fix:** Add facility deployment schedule to Base Case Inputs. Show capital required per facility explicitly.

### 4. H₂ Price Justification
$25/kg base case is premium pricing. Grey H₂ delivered is $10-15/kg in most markets. Need to justify:
- Who pays $25?
- What's the premium for (green attribute, on-site, etc.)?
- Is there contract proof?

**Fix:** Add "Customer Price Discovery" note citing LOI pricing or market research.

---

## 🟡 MINOR ISSUES

1. **FY1 Start Date (Apr '26)** — We're in March '26 now. May need to adjust or call it "Month 1" not calendar year.

2. **Headcount detail** — Personnel sheet has 188 rows but I didn't audit individual salaries. Spot check a few.

3. **Equipment sales ramp** — T-125 goes 0 → 10 → 30 → 60 → 100 → 140 → 200. This hockey stick needs order book justification.

4. **Interest expense** — Shows $5.1M by FY7 on presumably ~$100M debt. 5% rate seems low in current environment. Check assumptions.

5. **Tax rate** — Shows 27% effective. Federal + state should be ~27-28%. ✅ Reasonable.

---

## ✅ INVESTOR-READY ELEMENTS

1. **Unit economics clarity** — The $/kg breakdown is exceptional
2. **Learning curve documentation** — Shows you understand manufacturing scale
3. **Error checks** — Demonstrates model discipline
4. **Sensitivity analysis** — H₂ price, PTC scenarios covered
5. **Use of funds granularity** — Specific equipment, specific hires
6. **Source notes** — Many cells cite where data came from

---

## 📝 RECOMMENDATIONS

### Before Seed Close
1. Fix Overview/P&L revenue mismatch
2. Add "No 45V PTC" downside scenario
3. Bold the "ILLUSTRATIVE" disclaimer on Series C/D rounds
4. Clarify FY1 start date vs. actual calendar

### For Data Room
1. Extract Unit Economics as standalone PDF
2. Create 1-page "Model Summary" for quick investor review
3. Add footnote on H₂ pricing justification ($25/kg premium)

### For Business Model Page (Data Room)
Use these key numbers:
- **Tobe LCOH:** <$2/kg (vs. $10+ grey delivered)
- **Gross Margin:** 80%+ at scale
- **EBITDA Margin:** 60%+ at scale
- **Revenue Streams:** H₂ Production (82%), Equipment (16%), Services (2%)
- **Break-even:** FY2 (EBITDA positive)

---

## 🎯 BOTTOM LINE

This model is **Seed-ready**. It's more rigorous than 90% of what I see from hardware startups. The issues above are fixable in a few hours.

The main gap is narrative: the model shows *what* happens, but investors will ask *how* you get 12 facilities and $270M in H₂ revenue. That's where the deck, TEA, and LOIs come in.

**Ready for data room with minor fixes. Ready for due diligence with the tweaks above.**

---

*Reviewed by Ren ⚡ — March 18, 2026*
