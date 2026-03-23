/**
 * financial-data.ts — Single source of truth for Tobe Energy financial model data
 *
 * All values extracted from Tobe_Energy_Financial_Model_FINAL.xlsx
 * Model v1.0 · Sources: TEA v3.0, v8.5.3 Financial Model, OU Irani Center
 *
 * Used by: InvestorDashboard, business-model page, and any component
 * that needs financial model numbers. Edit HERE, not in components.
 */

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface PLData {
  years: string[];
  h2Revenue: number[];
  equipRevenue: number[];
  svcRevenue: number[];
  opRevenue: number[];
  ptcRevenue: number[];
  totalCOGS: number[];
  grossProfit: number[];
  grossMargin: number[];
  totalOpEx: number[];
  ebitda: number[];
  ebitdaMargin: number[];
  netIncome: number[];
  netMargin: number[];
  cash: number[];
}

export interface CFData {
  opCF: number[];
  capex: number[];
  endCash: number[];
}

export interface CostBuildItem {
  name: string;
  value: number;
  grey: number;
}

export interface MarginItem {
  price: number;
  cost: number;
  margin: number;
  pct: number;
}

export interface UnitEconData {
  costBuild: CostBuildItem[];
  directOpex: number;
  allocLabor: number;
  allocCapex: number;
  maintenance: number;
  allInCost: number;
  margins: MarginItem[];
}

export interface Facility {
  id: string;
  name: string;
  loc: string;
  cap: number;
  capex: number;
  inService: string;
  tier: string;
  elec: number;
  opex: number;
  annRev: number;
  grossProfit: number;
  payback: number;
  ptc: number;
}

export interface CapacityRampData {
  nameplate: number[];
  actual: number[];
}

export interface PTCDataType {
  rate: number;
  period: number;
  co2: number;
  threshold: number;
  eligible: number;
  annPerFacility: number;
  tenYrPerFacility: number;
  eligibleH2: number[];
  ptcRevenue: number[];
  cumPTC: number[];
}

export interface ElecLCOHItem {
  elec: number;
  lcoh: number;
  vs: number;
  gm: number;
}

export interface ScenarioData {
  price: number;
  facilities: number;
  revenue: number;
  ebitda: number;
  ebitdaMargin: number;
  netIncome: number;
}

export interface ExitValuationItem {
  basis: string;
  mult: string;
  ev: number;
  seedVal: number;
  roi: number;
}

export interface WhatIfItem {
  variable: string;
  impact: number;
  dir: string;
}

export interface SensitivityData {
  elecLCOH: ElecLCOHItem[];
  scenarios: {
    bear: ScenarioData;
    base: ScenarioData;
    bull: ScenarioData;
  };
  matrix: {
    prices: number[];
    facilities: number[];
    data: number[][];
  };
  whatIf: WhatIfItem[];
  exitValuation: ExitValuationItem[];
}

export interface Shareholder {
  name: string;
  preSeed: number;
  postSeed: number;
  value: number;
}

export interface ReturnAnalysisItem {
  scenario: string;
  ev: number;
  seedValue: number;
  roi: number;
}

export interface CapTableData {
  preMoney: number;
  equity: number;
  postMoney: number;
  debt: number;
  totalRound: number;
  dilution: number;
  shareholders: Shareholder[];
  returnAnalysis: ReturnAnalysisItem[];
}

export interface UseOfFundsItem {
  cat: string;
  amount: number;
  pct: number;
  type: string;
}

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

// Source: P&L tab, rows 7-43
export const PL_DATA: PLData = {
  years: ['FY1', 'FY2', 'FY3', 'FY4', 'FY5', 'FY6', 'FY7'],
  h2Revenue:    [0, 11812500, 77812500, 141562500, 210937500, 264375000, 270000000],
  equipRevenue: [875000, 4295000, 10260000, 18770000, 28950000, 39130000, 51060000],
  svcRevenue:   [0, 32813, 242113, 848205, 2092281, 4204952, 6594846],
  opRevenue:    [875000, 16140313, 88314613, 161180705, 241979781, 307709952, 327654846],
  ptcRevenue:   [0, 1417500, 8887500, 10800000, 10800000, 10800000, 10800000],
  totalCOGS:    [525000, 3850225, 15928098, 30355041, 46396894, 60891065, 70194169],
  grossProfit:  [350000, 12290088, 72386515, 130825664, 195582887, 246818887, 257460677],
  grossMargin:  [0.40, 0.761, 0.820, 0.812, 0.808, 0.802, 0.786],
  totalOpEx:    [3003198, 8594843, 17840598, 26337754, 37413009, 45099247, 48029558],
  ebitda:       [-2653198, 3695245, 54545917, 104487910, 158169878, 201719640, 209431119],
  ebitdaMargin: [-3.032, 0.229, 0.618, 0.648, 0.654, 0.656, 0.639],
  netIncome:    [-2783107, 2592261, 44489636, 81157013, 118455022, 148041088, 152475471],
  netMargin:    [-3.181, 0.161, 0.504, 0.504, 0.489, 0.481, 0.465],
  cash:         [1289092, 49613513, 139487718, 224151798, 478384683, 684959946, 832781983],
};

// Source: Cash Flow tab, rows 9-24
export const CF_DATA: CFData = {
  opCF:      [-2756761, 2795026, 43220958, 80878380, 119919321, 151428501, 157918189],
  capex:     [-7375000, -10650000, -12150000, -12150000, -30450000, -9000000, 0],
  endCash:   [420830, 47075492, 76136105, 287438712, 305204147, 816649772, 822003047],
};

// Source: Unit Economics tab, rows 6-17
export const UNIT_ECON: UnitEconData = {
  costBuild: [
    { name: 'Electricity', value: 1.777, grey: 1.25 },
    { name: 'Compression', value: 0.14, grey: 0.75 },
    { name: 'Transport', value: 0.90, grey: 8.25 },
    { name: 'Water', value: 0.05, grey: 0.05 },
  ],
  directOpex: 2.867,   // row 10
  allocLabor: 1.389,   // row 12
  allocCapex: 0.407,   // row 13
  maintenance: 0.420,  // row 14
  allInCost: 5.083,    // row 15
  margins: [
    { price: 15, cost: 5.08, margin: 9.92, pct: 66.1 },
    { price: 20, cost: 5.08, margin: 14.92, pct: 74.6 },
    { price: 25, cost: 5.08, margin: 19.92, pct: 79.7 },
    { price: 30, cost: 5.08, margin: 24.92, pct: 83.1 },
    { price: 47, cost: 5.08, margin: 41.92, pct: 89.2 },
  ],
};

// Source: Facility Ramp tab, rows 5-16
export const FACILITIES: Facility[] = [
  { id: 'F1', name: 'Tulsa (Pilot)', loc: 'Tulsa, OK', cap: 900000, capex: 3300000, inService: 'Apr 2027', tier: 'Tier 1 (24mo)', elec: 0.040, opex: 2.87, annRev: 22500000, grossProfit: 17925406, payback: 2.2, ptc: 2700000 },
  { id: 'F2', name: 'OKC', loc: 'Oklahoma City, OK', cap: 900000, capex: 3075000, inService: 'Oct 2027', tier: 'Tier 2 (18mo)', elec: 0.040, opex: 2.87, annRev: 22500000, grossProfit: 17925406, payback: 2.1, ptc: 2700000 },
  { id: 'F3', name: 'Seattle', loc: 'Seattle, WA', cap: 900000, capex: 3075000, inService: 'Apr 2028', tier: 'Tier 2 (18mo)', elec: 0.060, opex: 3.80, annRev: 22500000, grossProfit: 17084392, payback: 2.2, ptc: 2700000 },
  { id: 'F4', name: 'Spokane', loc: 'Spokane, WA', cap: 900000, capex: 3075000, inService: 'Jul 2028', tier: 'Tier 2 (18mo)', elec: 0.041, opex: 2.93, annRev: 22500000, grossProfit: 17869338, payback: 2.1, ptc: 2700000 },
  { id: 'F5', name: 'Albuquerque', loc: 'Albuquerque, NM', cap: 900000, capex: 3075000, inService: 'Dec 2028', tier: 'Tier 3 (15mo)', elec: 0.059, opex: 3.76, annRev: 22500000, grossProfit: 17118895, payback: 2.2, ptc: 0 },
  { id: 'F6', name: 'Des Moines', loc: 'Des Moines, IA', cap: 900000, capex: 3075000, inService: 'May 2029', tier: 'Tier 3 (15mo)', elec: 0.043, opex: 3.01, annRev: 22500000, grossProfit: 17800332, payback: 2.1, ptc: 0 },
  { id: 'F7', name: 'TBD', loc: 'TBD', cap: 900000, capex: 3075000, inService: 'Aug 2029', tier: 'Tier 4 (13mo)', elec: 0.043, opex: 3.01, annRev: 22500000, grossProfit: 17800332, payback: 2.1, ptc: 0 },
  { id: 'F8', name: 'TBD', loc: 'TBD', cap: 900000, capex: 3075000, inService: 'Dec 2029', tier: 'Tier 4 (13mo)', elec: 0.043, opex: 3.01, annRev: 22500000, grossProfit: 17800332, payback: 2.1, ptc: 0 },
  { id: 'F9', name: 'TBD', loc: 'TBD', cap: 900000, capex: 3075000, inService: 'Apr 2030', tier: 'Tier 4 (13mo)', elec: 0.043, opex: 3.01, annRev: 22500000, grossProfit: 17800332, payback: 2.1, ptc: 0 },
  { id: 'F10', name: 'TBD', loc: 'TBD', cap: 900000, capex: 3075000, inService: 'Aug 2030', tier: 'Tier 4 (13mo)', elec: 0.043, opex: 3.01, annRev: 22500000, grossProfit: 17800332, payback: 2.1, ptc: 0 },
  { id: 'F11', name: 'TBD', loc: 'TBD', cap: 900000, capex: 3075000, inService: 'Dec 2030', tier: 'Tier 4 (13mo)', elec: 0.043, opex: 3.01, annRev: 22500000, grossProfit: 17800332, payback: 2.1, ptc: 0 },
  { id: 'F12', name: 'TBD', loc: 'TBD', cap: 900000, capex: 3075000, inService: 'Apr 2031', tier: 'Tier 4 (13mo)', elec: 0.043, opex: 3.01, annRev: 22500000, grossProfit: 17800332, payback: 2.1, ptc: 0 },
];

// Source: Facility Ramp tab, rows 28-29
export const CAPACITY_RAMP: CapacityRampData = {
  nameplate: [0, 900000, 3600000, 3600000, 5400000, 9000000, 10800000],
  actual:    [0, 472500, 3112500, 5662500, 8437500, 10575000, 10800000],
};

// Source: 45V Tax Credit tab, rows 5-16
export const PTC_DATA: PTCDataType = {
  rate: 3,           // row 5
  period: 10,        // row 6
  co2: 0.03,         // row 7
  threshold: 0.45,   // row 8
  eligible: 4,       // row 10
  annPerFacility: 2700000, // row 19
  tenYrPerFacility: 27000000, // row 20
  eligibleH2:  [0, 472500, 2962500, 3600000, 3600000, 3600000, 3600000],
  ptcRevenue:  [0, 1417500, 8887500, 10800000, 10800000, 10800000, 10800000],
  cumPTC:      [0, 1417500, 10305000, 21105000, 31905000, 42705000, 53505000],
};

// Source: Sensitivity tab
export const SENSITIVITY: SensitivityData = {
  elecLCOH: [
    { elec: 0.025, lcoh: 4.36, vs: -0.72, gm: 82.5 },
    { elec: 0.030, lcoh: 4.60, vs: -0.48, gm: 81.6 },
    { elec: 0.035, lcoh: 4.84, vs: -0.24, gm: 80.6 },
    { elec: 0.040, lcoh: 5.08, vs: 0,     gm: 79.7 },
    { elec: 0.045, lcoh: 5.32, vs: 0.24,  gm: 78.7 },
    { elec: 0.050, lcoh: 5.56, vs: 0.48,  gm: 77.7 },
    { elec: 0.055, lcoh: 5.80, vs: 0.72,  gm: 76.8 },
  ],
  scenarios: {
    bear: { price: 15, facilities: 6, revenue: 106.53, ebitda: 39.42, ebitdaMargin: 37, netIncome: 21.31 },
    base: { price: 25, facilities: 12, revenue: 327.65, ebitda: 209.43, ebitdaMargin: 63.9, netIncome: 152.48 },
    bull: { price: 35, facilities: 12, revenue: 429.06, ebitda: 304.63, ebitdaMargin: 71, netIncome: 223.11 },
  },
  // Source: rows 22-27 — Price × Facility matrix (FY5 Revenue $M)
  matrix: {
    prices: [15, 20, 25, 30, 35],
    facilities: [3, 5, 7, 10, 12],
    data: [
      [52.9, 88.2, 123.5, 176.4, 211.7],
      [66.4, 110.7, 155.0, 221.4, 265.7],
      [79.9, 133.2, 186.5, 266.4, 319.7],
      [93.4, 155.7, 218.0, 311.4, 373.7],
      [106.9, 178.2, 249.5, 356.4, 427.7],
    ],
  },
  // Source: rows 52-58
  whatIf: [
    { variable: 'Electricity +$0.01/kWh', impact: -5.18, dir: 'neg' },
    { variable: 'H₂ ASP -$5/kg', impact: -54.0, dir: 'neg' },
    { variable: '45V PTC eliminated', impact: -10.8, dir: 'neg' },
    { variable: '2 fewer facilities', impact: -36.3, dir: 'neg' },
    { variable: 'H₂ ASP +$5/kg', impact: 54.0, dir: 'pos' },
    { variable: 'Electricity -$0.015 (PPA)', impact: 7.76, dir: 'pos' },
  ],
  // Source: rows 43-48
  exitValuation: [
    { basis: 'Revenue (Bear)', mult: '8x', ev: 2621, seedVal: 283, roi: 28.3 },
    { basis: 'Revenue (Base)', mult: '10x', ev: 3277, seedVal: 354, roi: 35.4 },
    { basis: 'Revenue (Bull)', mult: '12x', ev: 3932, seedVal: 425, roi: 42.5 },
    { basis: 'EBITDA (Bear)', mult: '15x', ev: 3141, seedVal: 339, roi: 33.9 },
    { basis: 'EBITDA (Base)', mult: '20x', ev: 4189, seedVal: 452, roi: 45.2 },
    { basis: 'EBITDA (Bull)', mult: '25x', ev: 5236, seedVal: 565, roi: 56.5 },
  ],
};

// Source: Cap Table tab, rows 5-37
export const CAP_TABLE: CapTableData = {
  preMoney: 40000000,
  equity: 7500000,
  postMoney: 47500000,
  debt: 2500000,
  totalRound: 10000000,
  dilution: 15.8,
  shareholders: [
    { name: 'Founders', preSeed: 65.0, postSeed: 54.7, value: 26000000 },
    { name: 'Pre-Seed Investors', preSeed: 14.8, postSeed: 12.5, value: 5920000 },
    { name: 'Employee Options', preSeed: 10.0, postSeed: 8.4, value: 4000000 },
    { name: 'Advisors', preSeed: 2.2, postSeed: 1.9, value: 880000 },
    { name: 'Techstars', preSeed: 6.0, postSeed: 5.1, value: 2400000 },
    { name: 'Other', preSeed: 2.0, postSeed: 1.7, value: 800000 },
    { name: 'Seed Investors (New)', preSeed: 0, postSeed: 15.8, value: 7500000 },
  ],
  returnAnalysis: [
    { scenario: 'Bear (8x Rev)', ev: 2.62, seedValue: 283, roi: 28.3 },
    { scenario: 'Base (10x Rev)', ev: 3.28, seedValue: 354, roi: 35.4 },
    { scenario: 'Bull (12x Rev)', ev: 3.93, seedValue: 425, roi: 42.5 },
    { scenario: 'Base (20x EBITDA)', ev: 4.32, seedValue: 467, roi: 46.7 },
  ],
};

// Source: Executive Summary tab, rows 39-49
export const USE_OF_FUNDS: UseOfFundsItem[] = [
  { cat: 'R&D: T-125 Validation', amount: 1100000, pct: 14.7, type: 'equity' },
  { cat: 'Mfg Equipment', amount: 1120000, pct: 14.9, type: 'equity' },
  { cat: 'Personnel (15-mo)', amount: 2211496, pct: 29.5, type: 'equity' },
  { cat: 'Certifications', amount: 475000, pct: 6.3, type: 'equity' },
  { cat: 'Working Capital & G&A', amount: 1911250, pct: 25.5, type: 'equity' },
  { cat: 'Contingency', amount: 682254, pct: 9.1, type: 'equity' },
  { cat: 'Zeeco CapEx', amount: 1951550, pct: 78.1, type: 'debt' },
  { cat: 'Utilities & Consumables', amount: 149151, pct: 6.0, type: 'debt' },
  { cat: 'Debt Service & WC', amount: 399299, pct: 16.0, type: 'debt' },
];
