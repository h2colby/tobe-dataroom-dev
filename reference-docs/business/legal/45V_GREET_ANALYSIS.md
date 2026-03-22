# 45VH2-GREET Analysis Tool — Completion Guide

**Tool:** 45VH2-GREET (Rev. December 2025)  
**Source:** Argonne National Laboratory / UChicago Argonne, LLC  
**Purpose:** Calculate lifecycle GHG emissions for 45V Production Tax Credit qualification

---

## What This Tool Does

The 45V Clean Hydrogen Production Tax Credit requires hydrogen to have lifecycle GHG emissions below certain thresholds to qualify for different credit tiers:

| Lifecycle GHG (kgCO2e/kgH2) | Credit Tier |
|-----------------------------|-------------|
| < 0.45 | $3.00/kg (max) |
| 0.45 - 1.5 | $1.00/kg |
| 1.5 - 2.5 | $0.75/kg |
| 2.5 - 4.0 | $0.60/kg |

To qualify for the **$3/kg tier**, Tobe must demonstrate **< 0.45 kgCO2e/kgH2** lifecycle emissions.

---

## Tool Structure

### Sheets:
1. **Copyright** — Legal notice (Argonne)
2. **Instructions** — References GREET1_2025.xlsm dependency
3. **H2_User_Inputs** — Main input sheet (currently blank)
4. **Needs_Regions_Details** — Regional electricity grid mixes
5. **NG_Supply_Chain** — Natural gas supply chain emissions (N/A for electrolysis)

### Dependency:
- Requires `GREET1_2025.xlsm` (27MB) in `/GREET1_dependency/` folder

---

## Inputs Needed from Tobe Energy

### 1. Hydrogen Production Pathway
- **Technology:** Low Temperature Electrolysis (PEM/AEL hybrid? Classify as LTE)
- **Primary Feedstock:** Water (electricity-driven)

### 2. Electricity Source
**This is the critical input — determines 45V qualification**

Options:
- Grid electricity (need to specify region)
- Renewable PPA (need contract details)
- On-site generation (need specs)

**Oklahoma Grid Mix (from tool's "Plains" region):**
- Natural Gas: 21.4%
- Coal: 31.8%
- Nuclear: 5.0%
- Wind/Solar: ~35%
- Hydro: 4.3%
- Other: 2.5%

**Plains Region GHG:** ~500-600 gCO2e/kWh (estimated)

### 3. Electricity Consumption
- **Tobe spec:** 42 kWh/kg H₂
- Compare: Industry standard PEM is 50-55 kWh/kg
- Tobe's efficiency advantage helps here

### 4. Other Process Inputs
- Water consumption: ~9 L/kg H₂
- Compression energy: 3.5 kWh/kg (to 350 bar?)
- Any natural gas usage? (No — fully electric)

---

## Preliminary 45V Analysis

### Scenario A: Oklahoma Grid Electricity (No PPA)
```
Grid intensity: ~500 gCO2e/kWh (Plains region)
Electricity: 42 kWh/kg H₂
Process emissions: 42 × 0.5 = 21 kgCO2e/kgH2

Result: WAY OVER 0.45 threshold
Credit tier: NONE (without clean power)
```

### Scenario B: 100% Renewable PPA
```
Grid intensity: ~0-50 gCO2e/kWh (wind/solar + accounting)
Electricity: 42 kWh/kg H₂
Process emissions: 42 × 0.02 = 0.84 kgCO2e/kgH2

Result: Qualifies for $0.75-$1.00/kg tier
Credit tier: $0.75 - $1.00/kg
```

### Scenario C: Hourly-Matched Clean Energy
```
Hourly matching with additionality
Process emissions: < 0.45 kgCO2e/kgH2

Result: Qualifies for $3.00/kg MAX tier
Credit tier: $3.00/kg ⭐
```

---

## Electricity Strategy (Confirmed by Colby)

**Oklahoma Advantage:** Oklahoma's grid is already one of the most renewable in the nation (~3rd highest renewable penetration). This provides a strong baseline.

**Supplemental Strategy (cost-benefit driven):**
1. **Solar PPA** — Most likely first step, good economics in OK
2. **On-site solar** — Capital intensive but best for hourly matching
3. **Hourly matching** — Required for $3/kg tier, evaluate ROI

**GREET-Calculated Results (Plains Region, 42 kWh/kg):**

| Scenario | Grid % | Clean % | kgCO2e/kg | 45V Credit |
|----------|--------|---------|-----------|------------|
| Grid only | 100% | 0% | 18.51 | ❌ None |
| 75% grid | 75% | 25% | 13.88 | ❌ None |
| 50/50 | 50% | 50% | 9.26 | ❌ None |
| 25% grid | 25% | 75% | 4.63 | ❌ None |
| 10% grid | 10% | 90% | 1.85 | $0.75/kg |
| 5% grid | 5% | 95% | 0.93 | $1.00/kg |
| 100% clean | 0% | 100% | 0.00 | $3.00/kg ⭐ |

**Key Finding:** Oklahoma's grid is 36.6% wind but still 31.8% coal and 21.4% gas.
Weighted grid intensity: **440.8 gCO2eq/kWh** — too high for any 45V tier on grid alone.
Need **≥90% clean power** to qualify for even the lowest tier.

**Recommended Path:** 100% renewable PPA for $3.00/kg tier
- 45V at $3/kg × 900,000 kg/year = $2.7M/year per facility
- 10-year credit window = $27M per facility
- Oklahoma wind PPAs available at $25-35/MWh ($0.025-0.035/kWh)
- At 42 kWh/kg × 900,000 kg = 37.8 GWh/year per facility
- PPA cost: ~$945K-$1.3M/year → NET BENEFIT: $1.4-1.7M/year per facility

---

## Completing the Tool

Once I have the electricity source details, I can:

1. Fill in H2_User_Inputs sheet with:
   - Production pathway: Low Temperature Electrolysis
   - Feedstock: Water
   - Electricity source: [your input]
   - Region: [Oklahoma / customer specific]
   - kWh/kg: 42 (or actual measured)
   
2. Run GREET1 dependency calculations

3. Generate lifecycle GHG result

4. Determine 45V credit tier qualification

---

## Bottom Line

**Without clean power, Tobe doesn't qualify for 45V.**

The good news: at 42 kWh/kg efficiency, you need LESS clean power than competitors to hit the same threshold. Your efficiency is your 45V advantage.

The path to $3/kg:
- Renewable PPA with hourly matching
- Or on-site generation
- Or customer-provided clean power (transfer credits)

---

*Analysis prepared for Tobe Energy — March 2026*
