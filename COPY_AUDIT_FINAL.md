# COPY AUDIT — Tobe Energy Data Room (FINAL)
**Date:** 2026-03-22
**Reviewer:** Ren (Claude Opus)
**Scope:** All 10 data room pages + sub-pages
**Confidence threshold:** HIGH and MEDIUM only

---

## REMOVE — Text that should be deleted entirely

### R-01 | business-model/page.tsx ~L472 | HIGH
> "When hydrogen costs drop below $2/kg, entire industries flip from fossil to renewable overnight. Tobe doesn't just produce hydrogen — we enable the economics that make the clean transition inevitable."

**Why:** Two sentences of corporate-speak that add zero information. The data cards above already make this point with actual numbers. "Enable the economics that make the clean transition inevitable" is the kind of sentence that makes investors stop reading.

### R-02 | business-model/page.tsx ~L466 | MEDIUM
> "and beyond" (tail of the $1.4T TAM sentence)

**Why:** Filler. Delete the two words. The list already covers the verticals.

### R-03 | page.tsx (overview) ~L468 | MEDIUM
> "We built this data room to make hard tech easier to understand."

**Why:** Meta-commentary. The data room exists; no need to explain why you built it. Keep the second sentence ("Prefer a traditional format? Browse all documents directly.") or shorten to just "Browse all source documents directly."

---

## REWRITE — Text that should be shortened or improved

### RW-01 | page.tsx (overview) ~L378 | HIGH
**Current:** "And how that translates into disrupting the industrial gas monopoly — with category-defining profit potential, scalable to hundreds of markets, and deployable anywhere in the world."

**Problem:** "Category-defining" and "disrupting" are VC buzzwords CLAUDE.md explicitly bans. Sentence is 28 words of connective tissue.

**Suggested:** "That cost advantage breaks the industrial gas monopoly — 70%+ margins, hundreds of addressable markets, no geographic constraints."

### RW-02 | page.tsx (overview) ~L531 | HIGH
**Current:** "Our innovation is two-tiered: a unique cell geometry designed to maximize the output of our purpose-built power electronics optimized specifically for hydrogen production. The result isn't just competing with green hydrogen — it's competing with the entire $226B grey hydrogen market, constrained by geography and logistics, with the flexibility that small modular facilities afford."

**Problem:** 51-word run-on. Modifier chain ("designed to maximize the output of our purpose-built power electronics optimized specifically for") buries the point. "Constrained by geography and logistics, with the flexibility that small modular facilities afford" is ambiguous — what's constrained?

**Suggested:** "Two innovations compound: a unique cell geometry paired with power electronics built from scratch for hydrogen production. The result competes with the entire $226B grey hydrogen market — because on-site production eliminates the logistics chain that makes grey expensive."

### RW-03 | business-model/page.tsx ~L446 | HIGH
**Current:** "Hydrogen isn't just an end product — it's the feedstock for the entire clean economy. Our cost breakthrough cascades downstream, making the technologies of the future economically viable today."

**Problem:** "Cascades downstream", "technologies of the future", "economically viable today" — three AI-sounding phrases in one sentence. Tells the investor nothing they can price.

**Suggested:** "Hydrogen feeds the entire clean supply chain. Cheaper hydrogen means cheaper ammonia, cheaper SAF, cheaper steel."

### RW-04 | business-model/page.tsx ~L454 | MEDIUM
**Current:** "Hydrogen is the largest cost input in synthetic fuel production. Tobe reduces that cost by up to 30%, bringing SAF closer to jet fuel parity and making e-fuels commercially viable at scale."

**Problem:** "Making e-fuels commercially viable at scale" is generic padding.

**Suggested:** "Hydrogen is the largest cost input in SAF production. Tobe cuts it by up to 30%."

### RW-05 | business-model/page.tsx ~L460 | MEDIUM
**Current:** "Ammonia production consumes 1-2% of global energy. Green ammonia from Tobe hydrogen cuts feedstock costs by up to 40%, enabling price parity with fossil-based fertilizer production for the first time."

**Problem:** "Enabling price parity with fossil-based fertilizer production for the first time" — restatement. The 40% number IS the point.

**Suggested:** "Ammonia production consumes 1-2% of global energy. Tobe hydrogen cuts that feedstock cost by up to 40% — parity with fossil fertilizer."

### RW-06 | business-model/page.tsx ~L466 | MEDIUM
**Current:** "With 45V tax credits, Tobe hydrogen is better priced than many legacy fossil-based solutions."

**Problem:** "Legacy fossil-based solutions" is corporate jargon.

**Suggested:** "With 45V credits, Tobe hydrogen undercuts fossil."

### RW-07 | page.tsx (overview) ~L547 | MEDIUM
**Current:** "AI woven from first quote through manufacturing to predictive maintenance. Not bolted on — built in from day one."

**Problem:** "Not bolted on — built in from day one" says the same thing twice. The metaphor is mixed (woven vs. bolted).

**Suggested:** "AI integrated from first quote through manufacturing to predictive maintenance."

### RW-08 | node-01/page.tsx ~L129 | MEDIUM
**Current:** "The Future of Hydrogen Production, Containerized"

**Problem:** Generic tagline. "The Future of X" is the most overused phrase in startup marketing.

**Suggested:** "Hydrogen Production in a Box" or "Solar to Hydrogen. One Container."

### RW-09 | node-01/page.tsx ~L57-58 | MEDIUM
**Current (Solar-to-Hydrogen card):** "2.5 kW of solar hits panels → power flows through the Anker SOLIX E10 → electrolyzer splits water → pure hydrogen output. Grid backup ensures continuous operation. The entire clean energy chain, visible and tangible."

**Problem:** "The entire clean energy chain, visible and tangible" is a summary sentence that restates what the reader just read.

**Suggested:** Delete the last sentence. The flow description speaks for itself.

### RW-10 | node-01/page.tsx ~L67 | MEDIUM
**Current ("Year 3000" card):** "This isn't a gray box in a field. Industrial equipment can be beautiful. Clean lines, purposeful lighting, every detail considered. The future of energy should look like the future."

**Problem:** "The future of energy should look like the future" is circular and reads like ad copy.

**Suggested:** "This isn't a gray box in a field. Industrial equipment can be beautiful. Clean lines, purposeful lighting, every detail considered."

### RW-11 | team/page.tsx ~L144 | MEDIUM
**Current (Colby bio, 3rd paragraph):** "This is where he saw the pain of the hydrogen industry firsthand — the problem wasn't using hydrogen, it was making cost-competitive green hydrogen. Frustrated by project collaborations with industry giants, slipping schedules, and dishonest efficiency metrics, it became baked into his DNA to provide true innovation to the hydrogen industry and make it live up to its zero-emission promise."

**Problem:** "Baked into his DNA" is cliché. "Provide true innovation to the hydrogen industry" is vague. "Make it live up to its zero-emission promise" is generic.

**Suggested:** "This is where he saw the problem firsthand: making hydrogen wasn't hard — making it cheap and green was. Frustrated by slipping schedules and dishonest efficiency metrics from industry partners, he started Tobe to solve it himself."

### RW-12 | team/page.tsx ~L392 | MEDIUM
**Current (Organizational DNA closing):** "This is how you compress decades of innovation into a fraction of the time. It's baked into our DNA from day one, and it's something that will never change about Tobe Energy."

**Problem:** "Baked into our DNA" appears twice on this page (also in Colby's bio). "Something that will never change" is filler.

**Suggested:** "This is how you compress decades of innovation into months."

---

## FLAG — Inconsistencies or claims that need verification

### F-01 | Efficiency numbers across pages | HIGH
**Pages:** overview, comparison, business-model, technology/efficiency

| Location | Claim |
|---|---|
| Overview page L541 | ">92% HHV" |
| Overview page L542 | "We measured 46 [kWh/kg]" |
| Comparison cost table L26 | "42 kWh/kg @ $0.035/kWh" |
| Business model moat L56 | "46 kWh/kg measured in lab; 42.8 kWh/kg conservative model assumption" |
| Business model competitors L74 | "42–46 kWh/kg" |
| Efficiency page test data L15 | "~46.1 kWh/kg" measured (6kW Low TDS) |
| Efficiency page base case L347 | ">92% HHV ~42.8 kWh/kg" |
| Cell page spec table L180 | "42.2 kWh/kg" (stack), "46 kWh/kg" (system) |
| Technology overview L153 | "Beating stated 92%" |
| Efficiency hero L293 | "94.7% HHV (41.6 kWh/kg at stack)" |

**Issue for Colby:** The efficiency page does a great job disambiguating stack vs. system and downside/base/upside. But other pages use different numbers without context. The comparison page cost model uses 42 kWh/kg (the stack number), while the measured system number is 46 kWh/kg. The financial model appears to use 42.8 kWh/kg (conservative base case). An investor jumping between pages will notice the discrepancy. **Recommendation:** Add one parenthetical on the comparison page: "(42 kWh/kg base case — see Efficiency page for measured vs. modeled breakdown)."

### F-02 | All-in cost: $5.40 vs $5.08 vs $5.83 | HIGH
**Pages:** comparison, business-model, InvestorDashboard

| Location | Claim |
|---|---|
| Comparison cost table L32 | Total Breakeven (Yr 3) = $5.40/kg |
| Business model L1130 | ALL-IN COST = $5.08/kg |
| Business model unit econ L232 | "All-in loaded: $5.08/kg" |
| InvestorDashboard L83 | allInCost: 5.083 |

**Issue for Colby:** $5.40 vs $5.08. The comparison page breakdown adds up differently than the business model breakdown. If these use different assumptions (e.g., Yr 1 vs Yr 3, different electricity rates), that should be noted. A careful investor will run the comparison page arithmetic and get $5.40, then see $5.08 on business-model and wonder which is real.

### F-03 | Selling price: $7.05 vs $25 | HIGH
**Pages:** comparison, business-model

| Location | Claim |
|---|---|
| Comparison page L33 | Selling Price = $7.05/kg (30% margin) |
| Business model L1157 | Selling Price = $25/kg (89.5% margin) |

**Issue for Colby:** These are clearly different scenarios (Platts-published transparent pricing vs. market-rate pricing), but the data room doesn't explain the relationship. An investor could read comparison → business-model and think the margin story changed from 30% to 89%. The comparison page is intentionally showing the conservative published price; the business model shows actual market reality. Consider adding a note on the comparison page: "Published at $7.05/kg to demonstrate transparency. Actual market pricing: $20-50+/kg (see Business Model)."

### F-04 | Pipeline claim | MEDIUM
**Pages:** overview, customers

| Location | Claim |
|---|---|
| Overview L410 | "$100M pipeline, $20M signed LOIs" |
| Customers L25 | "$100M pipeline across 12 opportunities" |

**Issue for Colby:** The $20M signed LOIs claim appears only on the overview. The customers page doesn't mention it. If LOIs are signed, they should appear on the customers page too.

### F-05 | Revenue engine percentages vs financial model | MEDIUM
**Pages:** overview, business-model, InvestorDashboard

| Location | Claim |
|---|---|
| Overview + business model | HaaS = 82%, Equipment = 16%, AI Services = 2% |
| InvestorDashboard FY7 data | H2 Revenue = $270M, Equipment = $51M, Services = $6.6M |

**Check:** $270M / $327.7M = 82.4%, $51M / $327.7M = 15.6%, $6.6M / $327.7M = 2.0%. These match. No issue — included for completeness.

### F-06 | 45V tax credit: $2.7M vs $27M | MEDIUM
**Pages:** overview, tax-credits, business-model

| Location | Claim |
|---|---|
| Overview L602 | "~$27M lifetime per qualifying site ($3/kg × 10 years)" |
| Tax credits L409-411 | "Annual: $2.7M (900,000 kg × $3.00/kg)" |
| Tax credits L447 | "10-year credit value per facility: $16M" (net of PPA costs) |

**Issue for Colby:** Overview says "$27M lifetime" (gross). Tax credits page says "$16M" (net of PPA). Both are correct but the overview's $27M is gross and should say so. "$27M gross / ~$16M net of PPA costs" would prevent confusion.

### F-07 | "Producing hydrogen for the last year" — date check | MEDIUM
**Page:** overview L405

> "Producing hydrogen for the last year"

**Issue for Colby:** If this was written in early 2026 and refers to bench testing starting mid-2024, it's roughly correct. But "producing hydrogen" could be read as "commercial production" rather than "bench testing." Consider: "Lab-producing hydrogen since mid-2024" or "Bench testing since 2024."

---

## SUMMARY

| Priority | Count |
|---|---|
| REMOVE | 3 items |
| REWRITE | 12 items |
| FLAG | 7 items |
| **Total** | **22 items** |

**Strongest pages (no changes needed):**
- Comparison — clean, data-driven, direct
- Tax Credits — well-structured, honest about risks
- Efficiency — excellent transparency, good use of scenarios
- Zeeco — project-appropriate detail, no filler
- Proof — fact-based, no puffery

**Pages needing most work:**
- Business Model (Downstream Impact section) — 5 items
- Overview (hero/breakthrough section) — 4 items
- NODE-01 — 3 items
- Team (Colby bio + Org DNA) — 2 items

**Cross-page inconsistencies (requires Colby decision):**
- Efficiency numbers (42 vs 46 kWh/kg) — needs disambiguation notes
- Cost numbers ($5.08 vs $5.40) — needs explanation
- Price anchoring ($7.05 vs $25) — needs context note
- 45V gross vs net ($27M vs $16M) — needs label
