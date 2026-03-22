# Tobe Energy — Component Specifications

> **Generated:** March 19, 2026
> **Sources:** ENG_HMB_HeatAndMaterialBalance.xlsx, ENG_PreCommit_SampleOperatingData.xlsx, ENG_EfficiencyCalculations.xlsx, TOBE-PFD-001.pdf, Tobe_Energy_TEA_Investor_Ready_March_2026.pdf, Tobe_TEA_Narrative_v1.md
> **Purpose:** Technical reference for data room page development

---

## T-25 Unit Specifications

| Parameter | Value | Source |
|-----------|-------|--------|
| **Model** | T-25 | Tobe_TEA_Narrative_v1.md |
| **Nameplate Output** | 25 kg H₂/day | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **H₂ Mass Flow** | 1.042 kg/hr | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **Nameplate Power** | 50 kW | Tobe_TEA_Narrative_v1.md |
| **Stack Energy** | 1,154 kWh/day (46.2 kWh/kg) | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **Booster Energy** | 2 kWh/day (negligible) | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **Stack Temperature** | 27°C | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **Stack Pressure** | 2.75 bar(g) | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **H₂ Output Pressure** | 3.08 bar(g) / ~50 psig | ENG_HMB_HeatAndMaterialBalance.xlsx, TOBE-PFD-001.pdf |
| **H₂ Purity** | ≥99.99% (after purification/drying) | TOBE-PFD-001.pdf |
| **Water Input** | 15.625 kg/hr city water → 9.375 kg/hr after RO | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **Water Consumption** | 10 kg H₂O per 1 kg H₂ | TOBE-PFD-001.pdf |
| **O₂ Output** | 8.938 kg/hr (8 kg O₂ per kg H₂) | ENG_HMB_HeatAndMaterialBalance.xlsx |
| **RO Recovery** | 80% | TOBE-PFD-001.pdf |
| **Electrical Supply** | 480VAC 3-Phase | TOBE-PFD-001.pdf |
| **Stack Life (design)** | 80,000+ hours | TEA_Investor_Ready_March_2026.pdf |
| **Field Swap Time** | 30 minutes (demonstrated) | TEA_Investor_Ready_March_2026.pdf |
| **Base Price** | $25,000 | Tobe_TEA_Narrative_v1.md |
| **Optioned Price** | $35,000 (remote monitoring, SCADA, consumables, extended warranty) | Tobe_TEA_Narrative_v1.md |
| **$/kW** | $500 (base) / $700 (optioned) | Calculated from above |
| **Target Market** | Industrial gas distributors, fleet depots, research institutions | Tobe_TEA_Narrative_v1.md |

---

## T-125 Unit Specifications

| Parameter | Value | Source |
|-----------|-------|--------|
| **Model** | T-125 | Tobe_TEA_Narrative_v1.md |
| **Nameplate Output** | 125 kg H₂/day | Tobe_TEA_Narrative_v1.md |
| **Nameplate Power** | 250 kW | Tobe_TEA_Narrative_v1.md |
| **Efficiency** | 42.2 kWh/kg H₂ (same as T-25) | TOBE-PFD-001.pdf |
| **Base Price** | $120,000 | Tobe_TEA_Narrative_v1.md |
| **Optioned Price** | $167,000 | Tobe_TEA_Narrative_v1.md |
| **$/kW** | $480 (base) / $668 (optioned) | Calculated from above |
| **Target Market** | Manufacturing facilities, food processing, ammonia producers | Tobe_TEA_Narrative_v1.md |
| **Status** | In development (Zeeco Phase 2) | NOTES_heat_material_balance.md |

**Note:** T-125 swap-time claim should not be extended from T-25's 30-minute demonstrated time without supplemental evidence.
*Source: TEA_Investor_Ready_March_2026.pdf*

---

## T-2500 Unit Specifications (In Development)

| Parameter | Value | Source |
|-----------|-------|--------|
| **Model** | T-2500 | Tobe_TEA_Narrative_v1.md |
| **Nameplate Output** | 2,500 kg H₂/day (20× T-125) | Tobe_TEA_Narrative_v1.md |
| **Nameplate Power** | 5 MW | Tobe_TEA_Narrative_v1.md |
| **Target Price** | $3,000,000 | Tobe_TEA_Narrative_v1.md |
| **$/kW** | $600 | Calculated from above |
| **R&D Timeline** | Design complete FY3, production FY4 | Tobe_TEA_Narrative_v1.md |
| **Target Market** | Refineries, chemical plants, large industrial consumers | Tobe_TEA_Narrative_v1.md |

---

## System Energy Consumption Breakdown

### Per kg H₂ Produced

| Component | Energy | Source |
|-----------|--------|--------|
| **Electrolysis (stack)** | 42.2-46.2 kWh/kg | TOBE-PFD-001.pdf, ENG_HMB_HeatAndMaterialBalance.xlsx |
| **Booster/compression** | 0.08 kWh/kg (stack booster) | ENG_HMB_HeatAndMaterialBalance.xlsx (2 kWh/day ÷ 25 kg/day) |
| **Compression to 200 bar** | 3.5 kWh/kg | TEA_Investor_Ready_March_2026.pdf |
| **Total (at stack outlet)** | ~42.3-46.3 kWh/kg | Calculated |
| **Total (delivered at 200 bar)** | ~45.7-49.7 kWh/kg | Calculated |

### Energy Basis Comparison

| Basis | Value | Source |
|-------|-------|--------|
| H&MB (T-25 unit) | 46.2 kWh/kg | ENG_HMB_HeatAndMaterialBalance.xlsx |
| PFD Energy Balance (Zeeco facility) | 42.2 kWh/kg | TOBE-PFD-001.pdf |
| TEA conservative basis | 42.8 kWh/kg AC-to-product | TEA_Investor_Ready_March_2026.pdf |
| Measured (6kW prototype) | 46.08 kWh/kg | ENG_PreCommit_SampleOperatingData.xlsx |

**Note on variation:** The 42.2 kWh/kg in the PFD is the design target for the commercial system. The 46.08-46.2 kWh/kg values represent measured prototype data (bench power supply, 60% duty cycle). The TEA uses 42.8 kWh/kg as a conservative commercial modeled basis.

---

## Water Consumption

| Parameter | Value | Source |
|-----------|-------|--------|
| **Water per kg H₂ (stoichiometric)** | 9 L/kg (9 kg/kg) | TOBE-PFD-001.pdf, TEA_Investor_Ready_March_2026.pdf |
| **Municipal water intake (with RO)** | 12.5 L/kg (10 kg H₂O per kg H₂ at 80% RO) | TOBE-PFD-001.pdf |
| **RO Recovery Rate** | 80% | TOBE-PFD-001.pdf |
| **RO System Capacity** | 8,000 kg/day (1.5× future requirement) | TOBE-PFD-001.pdf |
| **Water Cost** | $0.05/kg H₂ (9 L/kg × $0.00556/L) | TEA_Investor_Ready_March_2026.pdf |

### Water Flow (Single T-25 Unit)

| Stream | Flow Rate | Source |
|--------|-----------|--------|
| City Water In | 15.625 kg/hr | ENG_HMB_HeatAndMaterialBalance.xlsx |
| RO Permeate | 9.375 kg/hr | ENG_HMB_HeatAndMaterialBalance.xlsx |
| RO Brine (reject) | 6.250 kg/hr | ENG_HMB_HeatAndMaterialBalance.xlsx |

---

## Operating Conditions Summary

### Measured Operating Data (6kW Prototype, August 18, 2024)

| Parameter | Value | Source |
|-----------|-------|--------|
| **Run ID** | 6kW_Low_TDS | ENG_PreCommit_SampleOperatingData.xlsx |
| **Date** | August 18, 2024 | ENG_PreCommit_SampleOperatingData.xlsx |
| **AC Power** | ~6,012 W steady-state | ENG_PreCommit_SampleOperatingData.xlsx |
| **Stack Temperature** | ~28°C | ENG_PreCommit_SampleOperatingData.xlsx |
| **Ambient Temperature** | ~24°C | ENG_PreCommit_SampleOperatingData.xlsx |
| **Stack Pressure** | ~25.3 psig | ENG_PreCommit_SampleOperatingData.xlsx |
| **H₂ Flow Rate** | ~9.8 LPM average | ENG_EfficiencyCalculations.xlsx |
| **H₂ Mass Produced** | 782.66 g total run | ENG_PreCommit_SampleOperatingData.xlsx |
| **Duty Cycle** | 60% | ENG_PreCommit_SampleOperatingData.xlsx |
| **Pulse Frequency** | 16,400 Hz | ENG_PreCommit_SampleOperatingData.xlsx |
| **Production Efficiency** | 46.08 kWh/kg | ENG_PreCommit_SampleOperatingData.xlsx |
| **H₂ Density (operating)** | 0.222 g/L @ 25.3 psig and 28°C | ENG_PreCommit_SampleOperatingData.xlsx |
| **Data Points** | 22,103 at 5-second intervals | ENG_PreCommit_SampleOperatingData.xlsx |
| **Sensors** | Water level, pressure, flow, stack temp, gas temp, ambient temp, H₂ pressure, H₂ flow, H₂ mass, AC power, AC energy, DC voltage | ENG_PreCommit_SampleOperatingData.xlsx |

### Design Operating Conditions (Zeeco ARC Facility)

| Parameter | Current (12× T-25) | Future (+1× T-125) | Source |
|-----------|--------------------|--------------------|--------|
| H₂ Production | 300 kg/day | 425 kg/day | TOBE-PFD-001.pdf |
| Total Power | 600 kW | 850 kW | TOBE-PFD-001.pdf |
| Efficiency | 42.2 kWh/kg | 42.2 kWh/kg | TOBE-PFD-001.pdf |
| Stack Temp | <40°C | <40°C | TOBE-PFD-001.pdf |
| H₂ Output Pressure | 50 psig at stack | 50 psig at stack | TOBE-PFD-001.pdf |
| H₂ Final Purity | ≥99.99% | ≥99.99% | TOBE-PFD-001.pdf |
| Heat Rejection | <50 kW | <70 kW | TOBE-PFD-001.pdf |
| Grid Power | 480VAC 3-Phase | 480VAC 3-Phase | TOBE-PFD-001.pdf |

---

## Efficiency Test Matrix

All tests used standard DC bench power supply (not optimized pulsed waveform). True wall-to-plug efficiency.

| Test | Power (W) | Duration (hr) | TDS | Vol Flow (LPM) | Mass (kg) | Daily Rate (kg/day) | LHV Eff (%) | Source |
|------|-----------|---------------|-----|-----------------|-----------|---------------------|-------------|--------|
| 6kW Low TDS | 6,012 | 6 | Low (~25 ppm) | 9.8 | 0.783 | 2.32 | 72.4% | ENG_EfficiencyCalculations.xlsx |
| 6kW High TDS | 6,143 | 6 | High (~10,000 ppm) | 9.7 | 0.775 | 2.30 | 70.1% | ENG_EfficiencyCalculations.xlsx |
| 15kW Low TDS | 14,972 | 6 | Low | 24.3 | 1.942 | 5.76 | 72.1% | ENG_EfficiencyCalculations.xlsx |
| 15kW High TDS | 15,096 | 2* | High | 23.5 | 0.939 | 1.39** | 69.1% | ENG_EfficiencyCalculations.xlsx |

\* Test ended early due to diode failure
\*\* Daily rate extrapolated from 2-hour run

### Hydrogen Properties Used in Calculations

| Property | Value | Source |
|----------|-------|--------|
| Lower Heating Value (LHV) | 120 MJ/kg (52,217 BTU/lb) | ENG_EfficiencyCalculations.xlsx |
| Higher Heating Value (HHV) | 142 MJ/kg (60,941 BTU/lb) | ENG_EfficiencyCalculations.xlsx |
| Density at RT & 2 atm | 0.1646 g/L | ENG_EfficiencyCalculations.xlsx |
| Density at operating conditions | 0.222 g/L @ 25.3 psig and 28°C | ENG_EfficiencyCalculations.xlsx |
| Gasoline equivalent | 3.2 kg gasoline per kg H₂ | ENG_EfficiencyCalculations.xlsx |

### Efficiency Modeling Cases

| Case | Efficiency | kWh/kg (approx) | Conditions | Source |
|------|-----------|-----------------|------------|--------|
| **Measured floor** | 69-72% LHV | ~46-48 | Bench PSU, unoptimized, high TDS | ENG_EfficiencyCalculations.xlsx |
| **Conservative base** | 85% HHV | ~42.8 | Between measured floor and ceiling | TEA_Investor_Ready_March_2026.pdf |
| **Demonstrated ceiling** | 94% HHV | ~39.5 | Optimized pulsed waveform, clean water, resonant LLC | NOTES_efficiency_calculations.md |

---

## Repeat-Commercial Facility Specifications (TEA Basis)

| Parameter | Value | Source |
|-----------|-------|--------|
| **Class** | ~5 MW | TEA_Investor_Ready_March_2026.pdf |
| **Nameplate Output** | 900,000 kg/yr | TEA_Investor_Ready_March_2026.pdf |
| **Steady-State Output** | 810,000 kg/yr (90% availability) | TEA_Investor_Ready_March_2026.pdf |
| **System Energy** | 42.8 kWh/kg AC-to-product | TEA_Investor_Ready_March_2026.pdf |
| **Delivery Pressure** | 200 bar | TEA_Investor_Ready_March_2026.pdf |
| **Delivery Radius** | ≤50 km by tube trailer | TEA_Investor_Ready_March_2026.pdf |
| **H₂ Purity** | ≥99.95% dry basis | TEA_Investor_Ready_March_2026.pdf |
| **Capital Basis (fully built)** | $4.575M | TEA_Investor_Ready_March_2026.pdf |
| **Facility Ops Crew** | 7-person site crew | TEA_Investor_Ready_March_2026.pdf |
| **Annual Labor** | $1.214M | TEA_Investor_Ready_March_2026.pdf |
| **Site Lease** | $0.105M/year | TEA_Investor_Ready_March_2026.pdf |
| **Availability** | 90% (anchor), 85% (downside) | TEA_Investor_Ready_March_2026.pdf |
| **Operating Hours (9-yr)** | ~70,956 hrs (at 90%) | TEA_Investor_Ready_March_2026.pdf |
| **Stack Replacement Reserve** | None (within 80,000-hr design life) | TEA_Investor_Ready_March_2026.pdf |

### Downside Case

| Parameter | Anchor | Downside | Source |
|-----------|--------|----------|--------|
| Price | $25/kg | $20/kg | TEA_Investor_Ready_March_2026.pdf |
| Availability | 90% | 85% | TEA_Investor_Ready_March_2026.pdf |
| Steady Output | 810,000 kg/yr | 765,000 kg/yr | TEA_Investor_Ready_March_2026.pdf |
| Maintenance | $0.42/kg | $0.57/kg | TEA_Investor_Ready_March_2026.pdf |
| Cash Operating Cost | $4.62/kg | $4.80/kg | TEA_Investor_Ready_March_2026.pdf |
| All-In Cost | $5.25/kg | $5.46/kg | TEA_Investor_Ready_March_2026.pdf |
| EBITDA | $16.5M | $11.58M | TEA_Investor_Ready_March_2026.pdf |

---

## Controls & Instrumentation

### Arduino Cloud Platform

| Component | Detail | Source |
|-----------|--------|--------|
| **Boards** | 5 Arduino boards | CLOUD_VARIABLES_CATALOG.md |
| **Cloud Variables** | ~100 | CLOUD_VARIABLES_CATALOG.md |
| **Modbus Slaves** | 8 on RS-485 bus | CLOUD_VARIABLES_CATALOG.md |
| **Modbus Poll Cycle** | 1.5 seconds | CLOUD_VARIABLES_CATALOG.md |
| **Safety Gas Polling** | 1 Hz | CLOUD_VARIABLES_CATALOG.md |
| **Control System** | PLC-101 (Control & Monitoring) | TOBE-PFD-001.pdf |

### Sensor Summary

| Category | Sensors | Source |
|----------|---------|--------|
| Process | Pressure (kPa/psi), temperature, flow (L/min), velocity, cumulative flow | CLOUD_VARIABLES_CATALOG.md |
| Water Quality | pH, conductivity (mS/cm), dissolved O₂, TDS | CLOUD_VARIABLES_CATALOG.md |
| Safety | 2× H₂ detectors (ppm), 1× O₂ detector (%), ozone (ppm) | CLOUD_VARIABLES_CATALOG.md |
| Environmental | O₂ concentration (%), relative humidity (%), noise (dBA) | CLOUD_VARIABLES_CATALOG.md |

---

## Manufacturing Cost-Down (T-125)

| Phase | Cumulative Units | BOM Cost | $/kW | Gross Margin | Key Drivers | Source |
|-------|-----------------|----------|------|--------------|-------------|--------|
| Launch (Y2) | 10 | $100,000 | $400 | 40.1% | Initial production | Tobe_TEA_Narrative_v1.md |
| Volume (Y3) | 40 | $96,000 | $384 | 42.5% | DFM, automation, bulk purchasing | Tobe_TEA_Narrative_v1.md |
| Optimized (Y4) | 100 | $92,500 | $370 | 44.6% | AI QA, automated testing | Tobe_TEA_Narrative_v1.md |
| Mature (Y5) | 200 | $87,500 | $350 | 47.6% | Robotics, kaizen | Tobe_TEA_Narrative_v1.md |
| Scale (Y7) | 520 | $77,500 | $310 | 53.6% | Volume maturity | Tobe_TEA_Narrative_v1.md |

**Learning rate:** ~5% compound annual BOM reduction on T-125.
*Source: FINANCIAL_MODEL_REVIEW_v853.md, Tobe_TEA_Narrative_v1.md*

---

*All data extracted from source files. No fabricated values. Source file paths provided for every number.*
