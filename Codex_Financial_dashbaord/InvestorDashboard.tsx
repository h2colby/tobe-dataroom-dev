'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type TabId =
  | 'thesis'
  | 'revenue'
  | 'profitability'
  | 'unit-economics'
  | 'deployment'
  | 'tax-credit'
  | 'sensitivity'
  | 'cap-table';

type TooltipDatum = {
  color?: string;
  dataKey?: string;
  name?: string;
  value?: number | string;
};

const COLORS = {
  bg: '#0a0a0f',
  panel: 'rgba(255,255,255,0.02)',
  border: 'rgba(255,255,255,0.10)',
  text: 'rgba(255,255,255,0.92)',
  muted: 'rgba(255,255,255,0.60)',
  faint: 'rgba(255,255,255,0.38)',
  orange: '#ff6b35',
  green: '#00ff88',
  blue: '#00d4ff',
  red: '#ff4444',
} as const;

const PANEL_STYLE: CSSProperties = {
  background: COLORS.panel,
  border: `1px solid ${COLORS.border}`,
};

const AXIS_TICK = {
  fill: 'rgba(255,255,255,0.60)',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
};

const LEGEND_STYLE = {
  color: 'rgba(255,255,255,0.72)',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
};

const TABS: Array<{ id: TabId; label: string; index: string }> = [
  { id: 'thesis', label: 'Investment Thesis', index: '01' },
  { id: 'revenue', label: 'Revenue & Growth', index: '02' },
  { id: 'profitability', label: 'Profitability', index: '03' },
  { id: 'unit-economics', label: 'Unit Economics', index: '04' },
  { id: 'deployment', label: 'Facility Deployment', index: '05' },
  { id: 'tax-credit', label: '45V Tax Credit', index: '06' },
  { id: 'sensitivity', label: 'Sensitivity & Scenarios', index: '07' },
  { id: 'cap-table', label: 'Cap Table & Fundraise', index: '08' },
];

// Workbook-backed substitutions for gaps in the prompt:
// - The workbook does not contain a DOE "$2/kg target" line item, so the thesis uses the COMPETITIVE LANDSCAPE tab's
//   workbook-backed Tobe base/upside LCOH values instead.
// - The workbook does not contain named quote references for Zeeco/Tulsa in the unit-economics price ladder, so the
//   UI uses the ASSUMPTIONS + UNIT ECONOMICS price points that are explicitly modeled.
// - The CAP TABLE tab provides shareholder classes, not a named investor roster or SAFE schedule.
// - IRR / NPV outputs are not populated anywhere in the workbook; the dashboard flags that directly instead of inventing them.

// Source: P&L rows 7-20 and 28-41; CASH FLOW rows 9, 12, 24; FACILITY RAMP rows 28-29; ASSUMPTIONS rows 105-106;
// 45V TAX CREDIT rows 14-15. Fiscal periods from P&L row 5. All values are workbook extracts from FY1-FY7.
const ANNUALS = [
  {
    year: 'FY1',
    period: "Apr'26-Mar'27",
    h2Revenue: 0,
    equipmentRevenue: 875000,
    servicesRevenue: 0,
    operatingRevenue: 875000,
    totalCogs: 525000,
    grossProfit: 350000,
    grossMargin: 0.4,
    totalOpex: 3003197.6,
    ebitda: -2653197.6,
    ebitdaMargin: -3.0322258285714287,
    netIncome: -2783106.6,
    netMargin: -3.1806932571428574,
    operatingCashFlow: -2756760.6,
    capex: -7375000,
    endingCash: 420830.4000000004,
    nameplateCapacity: 0,
    actualProduction: 0,
    operatingFacilities: 0,
    ptcEligibleProduction: 0,
    ptcRevenue: 0,
  },
  {
    year: 'FY2',
    period: "Apr'27-Mar'28",
    h2Revenue: 11812500,
    equipmentRevenue: 4295000,
    servicesRevenue: 32813,
    operatingRevenue: 16140313,
    totalCogs: 3850225.1,
    grossProfit: 12290087.9,
    grossMargin: 0.7614528850834553,
    totalOpex: 8594842.709199999,
    ebitda: 3695245.190800002,
    ebitdaMargin: 0.2289450762695867,
    netIncome: 2592260.7992840013,
    netMargin: 0.1606078394690364,
    operatingCashFlow: 2795025.7992840013,
    capex: -10650000,
    endingCash: 47075491.799284,
    nameplateCapacity: 900000,
    actualProduction: 472500,
    operatingFacilities: 1,
    ptcEligibleProduction: 472500,
    ptcRevenue: 1417500,
  },
  {
    year: 'FY3',
    period: "Apr'28-Mar'29",
    h2Revenue: 77812500,
    equipmentRevenue: 10260000,
    servicesRevenue: 242113,
    operatingRevenue: 88314613,
    totalCogs: 15928097.6,
    grossProfit: 72386515.4,
    grossMargin: 0.8196436913560388,
    totalOpex: 17840598.0268,
    ebitda: 54545917.37320001,
    ebitdaMargin: 0.6176318450628324,
    netIncome: 44489635.652436,
    netMargin: 0.5037630143092627,
    operatingCashFlow: 43220957.652436,
    capex: -12150000,
    endingCash: 76136104.652436,
    nameplateCapacity: 3600000,
    actualProduction: 3112500,
    operatingFacilities: 4,
    ptcEligibleProduction: 2962500,
    ptcRevenue: 8887500,
  },
  {
    year: 'FY4',
    period: "Apr'29-Mar'30",
    h2Revenue: 141562500,
    equipmentRevenue: 18770000,
    servicesRevenue: 848205,
    operatingRevenue: 161180705,
    totalCogs: 30355041,
    grossProfit: 130825664,
    grossMargin: 0.8116707517813624,
    totalOpex: 26337753.503599998,
    ebitda: 104487910.4964,
    ebitdaMargin: 0.6482656251962665,
    netIncome: 81157013.062372,
    netMargin: 0.5035156848480841,
    operatingCashFlow: 80878380.062372,
    capex: -12150000,
    endingCash: 287438712.06237197,
    nameplateCapacity: 3600000,
    actualProduction: 5662500,
    operatingFacilities: 4,
    ptcEligibleProduction: 3600000,
    ptcRevenue: 10800000,
  },
  {
    year: 'FY5',
    period: "Apr'30-Mar'31",
    h2Revenue: 210937500,
    equipmentRevenue: 28950000,
    servicesRevenue: 2092281,
    operatingRevenue: 241979781,
    totalCogs: 46396893.7,
    grossProfit: 195582887.3,
    grossMargin: 0.8082612790694278,
    totalOpex: 37413009.2116,
    ebitda: 158169878.0884,
    ebitdaMargin: 0.653649149671724,
    netIncome: 118455022.484532,
    netMargin: 0.4895244635523164,
    operatingCashFlow: 119919321.484532,
    capex: -30450000,
    endingCash: 305204147.484532,
    nameplateCapacity: 5400000,
    actualProduction: 8437500,
    operatingFacilities: 6,
    ptcEligibleProduction: 3600000,
    ptcRevenue: 10800000,
  },
  {
    year: 'FY6',
    period: "Apr'31-Mar'32",
    h2Revenue: 264375000,
    equipmentRevenue: 39130000,
    servicesRevenue: 4204952,
    operatingRevenue: 307709952,
    totalCogs: 60891065.4,
    grossProfit: 246818886.6,
    grossMargin: 0.8021153849453657,
    totalOpex: 45099247.0696,
    ebitda: 201719639.53039998,
    ebitdaMargin: 0.6555512365436915,
    netIncome: 148041087.68719196,
    netMargin: 0.48110594644398097,
    operatingCashFlow: 151428500.68719196,
    capex: -9000000,
    endingCash: 816649771.687192,
    nameplateCapacity: 9000000,
    actualProduction: 10575000,
    operatingFacilities: 10,
    ptcEligibleProduction: 3600000,
    ptcRevenue: 10800000,
  },
  {
    year: 'FY7',
    period: "Apr'32-Mar'33",
    h2Revenue: 270000000,
    equipmentRevenue: 51060000,
    servicesRevenue: 6594846,
    operatingRevenue: 327654846,
    totalCogs: 70194169.2,
    grossProfit: 257460676.8,
    grossMargin: 0.7857679504608945,
    totalOpex: 48029557.9016,
    ebitda: 209431118.8984,
    ebitdaMargin: 0.6391821194013411,
    netIncome: 152475470.765832,
    netMargin: 0.4653539315143595,
    operatingCashFlow: 157918188.765832,
    capex: 0,
    endingCash: 822003046.765832,
    nameplateCapacity: 10800000,
    actualProduction: 10800000,
    operatingFacilities: 12,
    ptcEligibleProduction: 3600000,
    ptcRevenue: 10800000,
  },
] as const;

// Source: REVENUE MODEL rows 14-16, FY7 mix percentages.
const FY7_REVENUE_MIX = [
  { name: 'H2 Production', value: 0.82403786574852, color: COLORS.green },
  { name: 'Equipment Sales', value: 0.15583471638933122, color: COLORS.orange },
  { name: 'Services', value: 0.020127417862148757, color: COLORS.blue },
] as const;

// Source: REVENUE MODEL rows 20-29.
const PIPELINE = [
  { customer: 'CARDINAL', status: 'Contracted', annualRevenue: 547500, sector: 'Industrial' },
  { customer: 'REFINERY', status: 'LOI Signed', annualRevenue: 2737500, sector: 'Refining' },
  { customer: 'FORGE', status: 'LOI Signed', annualRevenue: 1214125, sector: 'Manufacturing' },
  { customer: 'CAMPUS', status: 'LOI Signed', annualRevenue: 233600, sector: 'Campus / Institutional' },
  { customer: 'HORIZON', status: 'LOI Signed', annualRevenue: 2281250, sector: 'Mobility / Fueling' },
  { customer: 'PHOENIX', status: 'LOI Signed', annualRevenue: 11406250, sector: 'E-Fuels' },
  { customer: 'TRANSIT', status: 'Proposal', annualRevenue: 4562500, sector: 'Public Transit' },
  { customer: 'FORGE-STEEL', status: 'Quoting', annualRevenue: null, sector: 'Steel Mfg ($7M-$49M)' },
] as const;

// Source: REVENUE MODEL row 29 and EXECUTIVE SUMMARY row 35.
const PIPELINE_SUMMARY = {
  signedLois: 20000000,
  activeQuotes: 26000000,
  sectorCount: 7,
  note: '$20M+ signed LOIs and $26M+ active quotes',
} as const;

// Source: UNIT ECONOMICS rows 6-17, 26, 30-34, 45-49, 53-58.
const UNIT_ECONOMICS = {
  costBuild: [
    { stage: 'Electricity', value: 1.7768421052631582, color: COLORS.green },
    { stage: 'Compression', value: 0.14, color: '#55ffb4' },
    { stage: 'Transport', value: 0.9, color: COLORS.orange },
    { stage: 'Water', value: 0.05004, color: COLORS.blue },
    { stage: 'Direct Opex', value: 2.866882105263158, color: '#ff9367' },
    { stage: 'All-in Cost', value: 5.083289512670566, color: COLORS.red },
  ],
  marginPricePoints: [
    { price: 15, allInCost: 5.083289512670566, grossMarginDollars: 9.916710487329434, grossMarginPct: 0.6611140324886289 },
    { price: 20, allInCost: 5.083289512670566, grossMarginDollars: 14.916710487329434, grossMarginPct: 0.7458355243664717 },
    { price: 25, allInCost: 5.083289512670566, grossMarginDollars: 19.916710487329432, grossMarginPct: 0.7966684194931772 },
    { price: 30, allInCost: 5.083289512670566, grossMarginDollars: 24.916710487329432, grossMarginPct: 0.8305570162443144 },
    { price: 47, allInCost: 5.083289512670566, grossMarginDollars: 41.91671048732943, grossMarginPct: 0.8918449039857326 },
  ],
  allInCost: 5.083289512670566,
  directOpex: 2.866882105263158,
  baseSalePrice: 25,
  grossMarginPerKg: 19.916710487329432,
  breakEvenPrice: 5.083289512670566,
  breakEvenVolume: 21310.448392760198,
  paybackMonthsAt25: 2.209200160236894,
  tobeOnSite: 5.083289512670566,
  greyDelivered50: 5.25,
  greyDelivered150: 10.3,
  bulkMarketRange: '15-36',
  airgasCylinder: 121.31,
  lcohScenarios: [
    { label: 'Conservative', lcoh: 3.61, sec: 42.8, electricity: 0.04 },
    { label: 'Base', lcoh: 2.79, sec: 46.5, electricity: 0.04 },
    { label: 'Optimized', lcoh: 2.06, sec: 39.6, electricity: 0.025 },
  ],
} as const;

// Source: FACILITY RAMP rows 5-16 for names, locations, in-service dates, capex, 45V eligibility.
// Source: ASSUMPTIONS row 22 for 900,000 kg/yr nameplate per facility.
// Note: FACILITY RAMP row-level "Capacity (kg/yr)" cells mirror capex figures and conflict with the ramp schedule.
// The dashboard uses the workbook's internally consistent 900,000 kg/yr per-facility nameplate from ASSUMPTIONS.
const FACILITIES = [
  { facility: 'F1 - Tulsa (Pilot)', location: 'Tulsa, OK', nameplateKgPerYear: 900000, capex: 3300000, inService: 'Apr 2027', tier: 'Tier 1 (24mo)', electricityRate: 0.04, directOpexPerKg: 2.866882105263158, eligible45v: true },
  { facility: 'F2 - OKC', location: 'Oklahoma City, OK', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Oct 2027', tier: 'Tier 2 (18mo)', electricityRate: 0.04, directOpexPerKg: 2.866882105263158, eligible45v: true },
  { facility: 'F3 - Seattle', location: 'Seattle, WA', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Apr 2028', tier: 'Tier 2 (18mo)', electricityRate: 0.0595, directOpexPerKg: 3.8013426315789474, eligible45v: true },
  { facility: 'F4 - Spokane', location: 'Spokane, WA', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Jul 2028', tier: 'Tier 2 (18mo)', electricityRate: 0.0413, directOpexPerKg: 2.929179473684211, eligible45v: true },
  { facility: 'F5 - Albuquerque', location: 'Albuquerque, NM', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Dec 2028', tier: 'Tier 3 (15mo)', electricityRate: 0.0587, directOpexPerKg: 3.7630057894736844, eligible45v: false },
  { facility: 'F6 - Des Moines', location: 'Des Moines, IA', nameplateKgPerYear: 900000, capex: 3075000, inService: 'May 2029', tier: 'Tier 3 (15mo)', electricityRate: 0.0429, directOpexPerKg: 3.005853157894737, eligible45v: false },
  { facility: 'F7', location: 'TBD', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Aug 2029', tier: 'Tier 4 (13mo)', electricityRate: 0.0429, directOpexPerKg: 3.005853157894737, eligible45v: false },
  { facility: 'F8', location: 'TBD', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Dec 2029', tier: 'Tier 4 (13mo)', electricityRate: 0.0429, directOpexPerKg: 3.005853157894737, eligible45v: false },
  { facility: 'F9', location: 'TBD', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Apr 2030', tier: 'Tier 4 (13mo)', electricityRate: 0.0429, directOpexPerKg: 3.005853157894737, eligible45v: false },
  { facility: 'F10', location: 'TBD', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Aug 2030', tier: 'Tier 4 (13mo)', electricityRate: 0.0429, directOpexPerKg: 3.005853157894737, eligible45v: false },
  { facility: 'F11', location: 'TBD', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Dec 2030', tier: 'Tier 4 (13mo)', electricityRate: 0.0429, directOpexPerKg: 3.005853157894737, eligible45v: false },
  { facility: 'F12', location: 'TBD', nameplateKgPerYear: 900000, capex: 3075000, inService: 'Apr 2031', tier: 'Tier 4 (13mo)', electricityRate: 0.0429, directOpexPerKg: 3.005853157894737, eligible45v: false },
] as const;

// Source: FACILITY RAMP rows 34-39.
const FACILITY_ECONOMICS = {
  pilot: {
    capex: 3300000,
    annualRevenue: 22500000,
    annualH2Cogs: 4574594,
    annualGrossProfit: 17925406,
    paybackMonths: 2.2091549837141766,
    annualPtc: 2700000,
  },
  additional: {
    capex: 3075000,
    annualRevenue: 22500000,
    annualH2Cogs: 4574594,
    annualGrossProfit: 17925406,
    paybackMonths: 2.058530780279119,
    annualPtc: 2700000,
  },
  seattleHighPowerCase: {
    capex: 3075000,
    annualRevenue: 22500000,
    annualH2Cogs: 5415608,
    annualGrossProfit: 17084392,
    paybackMonths: 2.159866151514201,
    annualPtc: 2700000,
  },
  totalBuildCapex: 37125000,
  averageFacilityCapex: 3093750,
} as const;

// Source: FACILITY AFE rows 6-31 and 35-51, grouped to the category totals printed below.
const AFE_BREAKDOWN = {
  pilotTotal: 3300000,
  additionalTotal: 3075000,
  pilot: [
    { label: 'Equipment & Materials', value: 1580000 },
    { label: 'Contingency', value: 460000 },
    { label: 'Construction & Installation', value: 300000 },
    { label: 'R&D', value: 300000 },
    { label: 'Manufacturing Equipment', value: 260000 },
    { label: 'Project Management', value: 150000 },
    { label: 'Supporting Equipment', value: 120000 },
    { label: 'Commissioning & Startup', value: 70000 },
    { label: 'Project Dev & Engineering', value: 50000 },
    { label: 'Software & Licenses', value: 10000 },
  ],
  additional: [
    { label: 'Equipment & Materials', value: 2600000 },
    { label: 'Construction & Installation', value: 250000 },
    { label: 'Project Management', value: 150000 },
    { label: 'Contingency', value: 150000 },
    { label: 'Supporting', value: 130000 },
    { label: 'Commissioning', value: 60000 },
    { label: 'R&D', value: 35000 },
    { label: 'Modularization Savings', value: -300000 },
  ],
} as const;

// Source: 45V TAX CREDIT rows 5-10 and 14-26. Scenario totals derive from row 20's 10-year $27M per eligible facility.
// Source for PPA math: ASSUMPTIONS rows 6, 8, 22 + 45V TAX CREDIT row 19.
const TAX_CREDIT = {
  ratePerKg: 3,
  creditPeriodYears: 10,
  intensity: 0.03,
  threshold: 0.45,
  constructionDeadline: 'Dec 31, 2027',
  modeledEligibleFacilities: 4,
  annualPerFacility: 2700000,
  tenYearPerFacility: 27000000,
  annual: ANNUALS.map((year) => ({
    year: year.year,
    eligibleProduction: year.ptcEligibleProduction,
    ptcRevenue: year.ptcRevenue,
  })),
  scenarios: [
    { label: 'Conservative', facilities: 4, totalValue: 108000000, color: COLORS.orange },
    { label: 'Accelerated', facilities: 8, totalValue: 216000000, color: COLORS.blue },
    { label: 'Full', facilities: 12, totalValue: 324000000, color: COLORS.green },
  ],
  annualPpaCostAtWindRate: 1046250,
  annualNetPtcAfterPpa: 1653750,
  ebitdaImpactPerYear: [0, 1417500, 8887500, 10800000, 10800000, 10800000, 10800000],
  ebitdaWithout45vFy7: 205195112,
  note: 'Model works profitably without 45V credits.',
} as const;

// Source: SENSITIVITY rows 6-12, 23-27, 31-39, 53-58.
const SENSITIVITY = {
  electricity: [
    { price: 0.025, lcoh: 4.36, deltaVsBase: -0.72, grossMarginAt25: 0.825 },
    { price: 0.03, lcoh: 4.6, deltaVsBase: -0.48, grossMarginAt25: 0.816 },
    { price: 0.035, lcoh: 4.84, deltaVsBase: -0.24, grossMarginAt25: 0.806 },
    { price: 0.04, lcoh: 5.08, deltaVsBase: 0, grossMarginAt25: 0.797 },
    { price: 0.045, lcoh: 5.32, deltaVsBase: 0.24, grossMarginAt25: 0.787 },
    { price: 0.05, lcoh: 5.56, deltaVsBase: 0.48, grossMarginAt25: 0.777 },
    { price: 0.055, lcoh: 5.8, deltaVsBase: 0.72, grossMarginAt25: 0.768 },
  ],
  scenarios: [
    { case: 'Bear', h2Price: 15, facilities: 6, ptc: 'None', revenue: 106.53, ebitda: 39.4161, ebitdaMargin: 0.37, netIncome: 21.306 },
    { case: 'Base', h2Price: 25, facilities: 12, ptc: '4 facilities', revenue: 327.654846, ebitda: 209.4311188984, ebitdaMargin: 0.639182119401341, netIncome: 152.475470765832 },
    { case: 'Bull', h2Price: 35, facilities: 12, ptc: '4 facilities', revenue: 429.06, ebitda: 304.63259999999997, ebitdaMargin: 0.71, netIncome: 223.1112 },
  ],
  matrix: [
    { price: '$15/kg', facilities3: 52.92857142857143, facilities5: 88.21428571428572, facilities7: 123.5, facilities10: 176.42857142857144, facilities12: 211.71428571428572 },
    { price: '$20/kg', facilities3: 66.42857142857143, facilities5: 110.71428571428572, facilities7: 155, facilities10: 221.42857142857144, facilities12: 265.7142857142857 },
    { price: '$25/kg', facilities3: 79.92857142857143, facilities5: 133.21428571428572, facilities7: 186.5, facilities10: 266.42857142857144, facilities12: 319.7142857142857 },
    { price: '$30/kg', facilities3: 93.42857142857143, facilities5: 155.7142857142857, facilities7: 218, facilities10: 311.4285714285714, facilities12: 373.7142857142857 },
    { price: '$35/kg', facilities3: 106.92857142857143, facilities5: 178.2142857142857, facilities7: 249.5, facilities10: 356.4285714285714, facilities12: 427.7142857142857 },
  ],
  ebitdaImpactVariables: [
    { label: 'Electricity +$0.01/kWh', value: -5.175473684210527 },
    { label: 'H2 ASP -$5/kg', value: -54 },
    { label: '45V PTC eliminated', value: -10.8 },
    { label: '2 fewer facilities', value: -36.288 },
    { label: 'H2 ASP +$5/kg', value: 54 },
    { label: 'Electricity -$0.015/kWh (PPA)', value: 7.763210526315791 },
  ],
} as const;

// Source: MARKET & TAM rows 5, 11-19, 28-34. Domestic site-equivalent count derived from row 19's $9.81B SAM
// divided by FACILITY RAMP row 34's $22.5M annual revenue at nameplate per facility.
const MARKET = {
  globalMarketValue: 226000000000,
  globalMarketVolumeTons: 94000000,
  currentGreenShare: '<1%',
  projected2030GreenShare: '30%',
  usServiceableMarket: 9810000000,
  serviceableCustomers: 32025,
  samPenetrationFy7: 0.03340008623853211,
  siteEquivalentOpportunity: 436,
  segments: [
    { segment: 'Industrial Decarbonization', marketValue: 3465000000, customers: 3000 },
    { segment: 'Heavy-Duty Fueling', marketValue: 1980000000, customers: 6320 },
    { segment: 'Chemical Production & Synth Fuels', marketValue: 990000000, customers: 50 },
    { segment: 'Energy Storage / Grid Balancing', marketValue: 990000000, customers: 79 },
    { segment: 'Urban Fleet Fueling', marketValue: 495000000, customers: 6000 },
    { segment: 'Light & Medium-Duty Commercial', marketValue: 495000000, customers: 5000 },
    { segment: 'Backup Power & Microgrids', marketValue: 495000000, customers: 11500 },
    { segment: 'Already Green (Undercut Incumbent)', marketValue: 900000000, customers: 76 },
  ],
  deliveredCostBand: '$5-$50+/kg',
} as const;

// Source: CAP TABLE rows 5-10, 14-20, 25-35.
const CAP_TABLE = {
  preMoney: 40000000,
  equityRaise: 7500000,
  debtRaise: 2500000,
  totalRaise: 10000000,
  postMoney: 47500000,
  dilution: 0.15789473684210525,
  ownership: [
    { name: 'Founders', postSeedPct: 0.5473684210526316, valueAtPost: 26000000, color: COLORS.green },
    { name: 'Pre-Seed Investors', postSeedPct: 0.12463157894736841, valueAtPost: 5920000, color: COLORS.orange },
    { name: 'Employee Option Pool', postSeedPct: 0.08421052631578947, valueAtPost: 4000000, color: COLORS.blue },
    { name: 'Advisors', postSeedPct: 0.018526315789473682, valueAtPost: 880000, color: '#7ef7ff' },
    { name: 'Techstars', postSeedPct: 0.050526315789473676, valueAtPost: 2400000, color: '#ff9b73' },
    { name: 'Other', postSeedPct: 0.016842105263157894, valueAtPost: 800000, color: '#65ffb0' },
    { name: 'Seed Investors (New)', postSeedPct: 0.15789473684210525, valueAtPost: 7500000, color: COLORS.red },
  ],
  dilutionByRound: [
    { round: 'Post-Seed', dilution: '15.8%', seedPctAfter: '15.8%' },
    { round: 'Post-Series A', dilution: '16.0%', seedPctAfter: '13.3%' },
    { round: 'Post-Series B', dilution: '10.7%', seedPctAfter: '11.9%' },
    { round: 'Post-Series C', dilution: '9.1%', seedPctAfter: '10.8%' },
  ],
  returnScenarios: [
    { scenario: 'Bear (8x Revenue)', seedValue: 282960000, seedRoi: 28.296 },
    { scenario: 'Base (10x Revenue)', seedValue: 354240000, seedRoi: 35.424 },
    { scenario: 'Bull (12x Revenue)', seedValue: 424440000, seedRoi: 42.444 },
    { scenario: 'Base (20x EBITDA)', seedValue: 466560000, seedRoi: 46.656 },
  ],
} as const;

// Source: EXECUTIVE SUMMARY rows 40-49.
const USE_OF_FUNDS = [
  { label: 'R&D: T-125 Validation', amount: 1100000, group: 'Equity' },
  { label: 'Manufacturing Equipment', amount: 1120000, group: 'Equity' },
  { label: 'Personnel (15-month)', amount: 2211496, group: 'Equity' },
  { label: 'Certifications & Compliance', amount: 475000, group: 'Equity' },
  { label: 'Working Capital & G&A', amount: 1911250, group: 'Equity' },
  { label: 'Contingency', amount: 682254, group: 'Equity' },
  { label: 'Zeeco Project CapEx', amount: 1951550, group: 'Debt' },
  { label: 'Utilities & Consumables', amount: 149151, group: 'Debt' },
  { label: 'Debt Service & WC Reserve', amount: 399299, group: 'Debt' },
] as const;

// Source: EXECUTIVE SUMMARY rows 6-14, 30-35, 58; ASSUMPTIONS row 15; COMPETITIVE LANDSCAPE rows 20-21.
const THESIS_NOTES = {
  revenueCagr: 1.6847349948112904,
  h2MarginFy7: 0.85824,
  firstModeledInService: 'Apr 2027',
  targetClose: 'May 2026',
  baseLcohCompetitive: 2.79,
  optimizedLcohCompetitive: 2.06,
  workbookHighlight: '3-engine revenue model: H2 production + equipment sales + recurring services',
} as const;

const HEATMAP_VALUES = SENSITIVITY.matrix.flatMap((row) => [
  row.facilities3,
  row.facilities5,
  row.facilities7,
  row.facilities10,
  row.facilities12,
]);

const HEATMAP_MIN = Math.min(...HEATMAP_VALUES);
const HEATMAP_MAX = Math.max(...HEATMAP_VALUES);

function trimTrailingZeroes(value: string) {
  return value.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
}

function formatCompactMoney(value: number, decimals = 1) {
  const sign = value < 0 ? '-' : '';
  const absolute = Math.abs(value);
  if (absolute >= 1_000_000_000) {
    return `${sign}$${trimTrailingZeroes((absolute / 1_000_000_000).toFixed(decimals))}B`;
  }
  if (absolute >= 1_000_000) {
    return `${sign}$${trimTrailingZeroes((absolute / 1_000_000).toFixed(decimals))}M`;
  }
  if (absolute >= 1_000) {
    return `${sign}$${trimTrailingZeroes((absolute / 1_000).toFixed(decimals))}K`;
  }
  return `${sign}$${trimTrailingZeroes(absolute.toFixed(decimals))}`;
}

function formatCurrency(value: number, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

function formatPercent(value: number, decimals = 1) {
  return `${trimTrailingZeroes((value * 100).toFixed(decimals))}%`;
}

function formatKg(value: number) {
  if (value >= 1_000_000) {
    return `${trimTrailingZeroes((value / 1_000_000).toFixed(1))}M kg`;
  }
  return `${trimTrailingZeroes((value / 1_000).toFixed(0))}K kg`;
}

function glow(color: string) {
  return { textShadow: `0 0 18px ${color}` };
}

function valueGlow(color: string) {
  return { boxShadow: `0 0 28px ${color}22, inset 0 0 0 1px ${COLORS.border}` };
}

function heatBackground(value: number) {
  const ratio = (value - HEATMAP_MIN) / (HEATMAP_MAX - HEATMAP_MIN || 1);
  const greenAlpha = 0.14 + ratio * 0.46;
  const blueAlpha = 0.12 + ratio * 0.28;
  return `linear-gradient(135deg, rgba(0,212,255,${blueAlpha}), rgba(0,255,136,${greenAlpha}))`;
}

function SectionTitle({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-5 space-y-2">
      <p className="text-[0.65rem] uppercase tracking-[0.35em]" style={{ color: COLORS.orange }}>
        {label}
      </p>
      <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      {body ? (
        <p className="max-w-3xl text-sm leading-6" style={{ color: COLORS.muted }}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

function Panel({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`rounded-3xl p-5 md:p-6 ${className}`} style={{ ...PANEL_STYLE, ...style }}>
      {children}
    </div>
  );
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  footnote,
  accent,
}: {
  label: string;
  value: string;
  detail?: string;
  footnote?: string;
  accent: string;
}) {
  return (
    <Panel style={valueGlow(accent)}>
      <div className="space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.35em]" style={{ color: COLORS.orange }}>
          {label}
        </p>
        <div className="text-3xl font-bold md:text-4xl" style={{ color: accent, ...glow(accent) }}>
          {value}
        </div>
        {detail ? (
          <p className="text-sm leading-6" style={{ color: COLORS.text }}>
            {detail}
          </p>
        ) : null}
        {footnote ? (
          <p className="text-xs leading-5" style={{ color: COLORS.muted }}>
            {footnote}
          </p>
        ) : null}
      </div>
    </Panel>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: TooltipDatum[];
  label?: string | number;
  valueFormatter?: (value: number, name?: string) => string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className="min-w-[180px] rounded-2xl border px-3 py-2 text-xs"
      style={{
        background: '#0d0d14',
        borderColor: COLORS.border,
        color: COLORS.text,
      }}
    >
      {label !== undefined ? (
        <div className="mb-2 text-[11px] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
          {label}
        </div>
      ) : null}
      <div className="space-y-1.5">
        {payload.map((item) => {
          const numericValue =
            typeof item.value === 'number'
              ? item.value
              : typeof item.value === 'string'
                ? Number(item.value)
                : 0;
          return (
            <div key={`${item.name}-${item.dataKey}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2" style={{ color: COLORS.muted }}>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: item.color || COLORS.orange }}
                />
                {item.name || item.dataKey}
              </span>
              <span className="font-semibold text-white">
                {valueFormatter ? valueFormatter(numericValue, item.name) : numericValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderMoneyTooltip(props: any) {
  return <ChartTooltip {...props} valueFormatter={(value) => formatCompactMoney(value)} />;
}

function renderPercentTooltip(props: any) {
  return (
    <ChartTooltip
      {...props}
      valueFormatter={(value, name) =>
        name?.toLowerCase().includes('margin') ? formatPercent(value) : formatCompactMoney(value)
      }
    />
  );
}

function BreakdownList({
  items,
  total,
  accent,
}: {
  items: ReadonlyArray<{ label: string; value: number }>;
  total: number;
  accent: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const width = Math.min((Math.abs(item.value) / total) * 100, 100);
        return (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span style={{ color: COLORS.text }}>{item.label}</span>
              <span style={{ color: item.value >= 0 ? COLORS.text : COLORS.red }}>
                {formatCompactMoney(item.value)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${width}%`,
                  background: item.value >= 0 ? accent : COLORS.red,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InvestmentThesisTab() {
  const fy7 = ANNUALS[6];

  const whyCards = [
    {
      title: 'Market Pull',
      value: formatCompactMoney(MARKET.globalMarketValue, 0),
      body: `Global hydrogen TAM with a ${formatCompactMoney(MARKET.usServiceableMarket)} U.S. serviceable market across ${MARKET.serviceableCustomers.toLocaleString()} customers.`,
      accent: COLORS.orange,
    },
    {
      title: 'Unit Economics',
      value: `${formatPercent(UNIT_ECONOMICS.marginPricePoints[2].grossMarginPct)} @ $25/kg`,
      body: `${formatCurrency(UNIT_ECONOMICS.allInCost, 2)}/kg all-in cost. Premium-case margin reaches ${formatPercent(UNIT_ECONOMICS.marginPricePoints[4].grossMarginPct)} at $47/kg.`,
      accent: COLORS.green,
    },
    {
      title: 'Facility Scale',
      value: `${FACILITIES.length} modeled / ${MARKET.siteEquivalentOpportunity} site-equivalent`,
      body: 'Twelve facilities are in the base model. The workbook-implied U.S. SAM supports far more than the modeled rollout.',
      accent: COLORS.blue,
    },
    {
      title: 'Commercial Traction',
      value: PIPELINE_SUMMARY.note,
      body: `The first modeled in-service date is ${THESIS_NOTES.firstModeledInService}, with a seed target close in ${THESIS_NOTES.targetClose}.`,
      accent: COLORS.orange,
    },
    {
      title: '45V Optionality',
      value: '$108M -> $324M',
      body: `${formatCurrency(TAX_CREDIT.ratePerKg, 0)}/kg for ${TAX_CREDIT.creditPeriodYears} years. The base model qualifies 4 facilities, with clear upside if more sites qualify.`,
      accent: COLORS.green,
    },
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="Default View"
          title="The money shot: a profitable hydrogen roll-up with tax-credit optionality."
          body="This view stays inside the workbook. It foregrounds the FY7 operating model, the 12-facility build, and the 45V upside without turning optionality into base-case math."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Reveal delay={0.04}>
          <MetricCard
            label="FY7 Revenue"
            value={formatCompactMoney(fy7.operatingRevenue)}
            detail="Operating revenue from the modeled 12-facility base plan."
            footnote="Source: P&L tab, FY7 operating revenue."
            accent={COLORS.green}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <MetricCard
            label="FY7 EBITDA"
            value={formatCompactMoney(fy7.ebitda)}
            detail={`EBITDA margin: ${formatPercent(fy7.ebitdaMargin)}.`}
            footnote="Source: P&L tab, FY7 EBITDA and EBITDA margin."
            accent={COLORS.orange}
          />
        </Reveal>
        <Reveal delay={0.12}>
          <MetricCard
            label="FY7 Net Income"
            value={formatCompactMoney(fy7.netIncome)}
            detail={`Net margin: ${formatPercent(fy7.netMargin)}.`}
            footnote="Source: P&L tab, FY7 net income and net margin."
            accent={COLORS.blue}
          />
        </Reveal>
        <Reveal delay={0.16}>
          <MetricCard
            label="10-Year 45V Optionality"
            value={formatCompactMoney(TAX_CREDIT.scenarios[2].totalValue, 0)}
            detail="Full 12-facility qualification upside. Modeled base = $108M; accelerated 8-facility case = $216M."
            footnote="Source: 45V TAX CREDIT tab, annual / 10-year facility value."
            accent={COLORS.green}
          />
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <SectionTitle
          label="Why This Investment"
          title="Five model-backed reasons the case is compelling."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {whyCards.map((card, index) => (
          <Reveal key={card.title} delay={0.24 + index * 0.04}>
            <Panel>
              <div className="space-y-3">
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  {card.title}
                </p>
                <div className="text-xl font-bold" style={{ color: card.accent, ...glow(card.accent) }}>
                  {card.value}
                </div>
                <p className="text-sm leading-6" style={{ color: COLORS.muted }}>
                  {card.body}
                </p>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay={0.44}>
          <Panel>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Commercial Pipeline
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Signed demand is already visible in the workbook.</h3>
              </div>
              <div className="text-right text-sm" style={{ color: COLORS.muted }}>
                <div>{PIPELINE_SUMMARY.note}</div>
                <div>{PIPELINE_SUMMARY.sectorCount} sectors represented</div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: COLORS.border }}>
              <table className="min-w-full text-left text-sm">
                <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Sector</th>
                    <th className="px-4 py-3 text-right">Annual Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {PIPELINE.map((entry) => (
                    <tr key={entry.customer} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <td className="px-4 py-3 text-white">{entry.customer}</td>
                      <td className="px-4 py-3" style={{ color: COLORS.muted }}>
                        {entry.status}
                      </td>
                      <td className="px-4 py-3" style={{ color: COLORS.muted }}>
                        {entry.sector}
                      </td>
                      <td className="px-4 py-3 text-right text-white">
                        {entry.annualRevenue ? formatCompactMoney(entry.annualRevenue) : 'Quoted range only'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.48}>
          <Panel className="h-full">
            <div className="space-y-5">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Strategic Read-Through
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Workbook-backed positioning, without narrative overreach.</h3>
              </div>
              <div className="grid gap-3">
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-sm" style={{ color: COLORS.muted }}>
                    Competitive LCOH
                  </div>
                  <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
                    {formatCurrency(THESIS_NOTES.optimizedLcohCompetitive, 2)}/kg
                  </div>
                  <div className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                    Optimized workbook upside case; base TEA-backed LCOH is {formatCurrency(THESIS_NOTES.baseLcohCompetitive, 2)}/kg.
                  </div>
                </div>
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-sm" style={{ color: COLORS.muted }}>
                    H2 Gross Margin
                  </div>
                  <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.blue, ...glow(COLORS.blue) }}>
                    {formatPercent(THESIS_NOTES.h2MarginFy7)}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                    FY7 H2 production-only margin, even after the equipment mix increases.
                  </div>
                </div>
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-sm" style={{ color: COLORS.muted }}>
                    FY7 SOM
                  </div>
                  <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.orange, ...glow(COLORS.orange) }}>
                    {formatPercent(MARKET.samPenetrationFy7, 2)}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                    FY7 operating revenue as a share of the workbook's $9.81B U.S. serviceable market.
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </div>
  );
}

function RevenueGrowthTab() {
  const fy7 = ANNUALS[6];
  const pieData = [
    { name: 'H2 Production', value: fy7.h2Revenue, color: COLORS.green },
    { name: 'Equipment Sales', value: fy7.equipmentRevenue, color: COLORS.orange },
    { name: 'Services', value: fy7.servicesRevenue, color: COLORS.blue },
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="Revenue Engine"
          title="Three revenue streams, one dominant H2 curve."
          body="The model starts with equipment in FY1, then shifts into a predominantly H2-production business by FY3 and beyond."
        />
      </Reveal>

      <Reveal delay={0.04}>
        <Panel>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Stacked Area
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">Revenue by stream, FY1-FY7</h3>
            </div>
            <div className="text-sm" style={{ color: COLORS.muted }}>
              H2 revenue reaches {formatCompactMoney(fy7.h2Revenue)} in FY7.
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={ANNUALS}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(value) => formatCompactMoney(value, 0)} />
              <Tooltip content={renderMoneyTooltip} />
              <Legend wrapperStyle={LEGEND_STYLE} />
              <Area type="monotone" dataKey="h2Revenue" name="H2 Revenue" stackId="revenue" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.22} />
              <Area type="monotone" dataKey="equipmentRevenue" name="Equipment Revenue" stackId="revenue" stroke={COLORS.orange} fill={COLORS.orange} fillOpacity={0.22} />
              <Area type="monotone" dataKey="servicesRevenue" name="Services Revenue" stackId="revenue" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.22} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
        <Reveal delay={0.08}>
          <Panel className="h-full">
            <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
              CAGR Callout
            </p>
            <div className="mt-4 text-4xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
              {formatPercent(THESIS_NOTES.revenueCagr)}
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6" style={{ color: COLORS.muted }}>
              <p>
                Operating revenue scales from {formatCompactMoney(ANNUALS[0].operatingRevenue)} in FY1 to{' '}
                {formatCompactMoney(fy7.operatingRevenue)} in FY7.
              </p>
              <p>{THESIS_NOTES.workbookHighlight}.</p>
              <p>By FY7, H2 production is {formatPercent(FY7_REVENUE_MIX[0].value)} of operating revenue.</p>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.12}>
          <Panel>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  FY7 Mix
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Revenue mix in the exit year</h3>
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                Operating revenue = {formatCompactMoney(fy7.operatingRevenue)}
              </div>
            </div>
            <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={(props: any) => (
                      <ChartTooltip
                        {...props}
                        valueFormatter={(value) => {
                          const pct = value / fy7.operatingRevenue;
                          return `${formatCompactMoney(value)} (${formatPercent(pct)})`;
                        }}
                      />
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {pieData.map((entry) => (
                  <div
                    key={entry.name}
                    className="rounded-2xl border p-4"
                    style={{ borderColor: COLORS.border }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-white">{entry.name}</div>
                        <div className="mt-1 text-xs" style={{ color: COLORS.muted }}>
                          {formatCompactMoney(entry.value)}
                        </div>
                      </div>
                      <div className="text-xl font-bold" style={{ color: entry.color, ...glow(entry.color) }}>
                        {formatPercent(entry.value / fy7.operatingRevenue)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </div>
  );
}

function ProfitabilityTab() {
  const marginInsight =
    'Gross margin peaks at 82.0% in FY3 and settles at 78.6% in FY7 as equipment mix rises to 15.6%; core H2 production margin remains 85.8% in FY7.';

  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="Profitability"
          title="EBITDA positive by FY2, then compounding hard."
          body="The model gets across breakeven quickly, stays strongly cash generative, and preserves very high contribution margins even as the equipment mix broadens."
        />
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.55fr]">
        <Reveal delay={0.04}>
          <Panel>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  EBITDA + Margin
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Profit ramp through FY7</h3>
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                FY2 EBITDA turns positive at {formatCompactMoney(ANNUALS[1].ebitda)}.
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={ANNUALS}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="money"
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => formatCompactMoney(value, 0)}
                />
                <YAxis
                  yAxisId="margin"
                  orientation="right"
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => formatPercent(value, 0)}
                />
                <Tooltip content={renderPercentTooltip} />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Bar yAxisId="money" dataKey="ebitda" name="EBITDA" fill={COLORS.green} radius={[6, 6, 0, 0]} />
                <Line yAxisId="money" type="monotone" dataKey="netIncome" name="Net Income" stroke={COLORS.blue} strokeWidth={3} dot={{ r: 3, fill: COLORS.blue }} />
                <Line yAxisId="margin" type="monotone" dataKey="ebitdaMargin" name="EBITDA Margin" stroke={COLORS.orange} strokeWidth={3} dot={{ r: 3, fill: COLORS.orange }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={0.08}>
            <Panel>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Breakeven
              </p>
              <div className="mt-4 text-3xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
                FY2
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: COLORS.muted }}>
                EBITDA is positive by FY2 and expands to {formatCompactMoney(ANNUALS[6].ebitda)} by FY7.
              </p>
            </Panel>
          </Reveal>

          <Reveal delay={0.12}>
            <Panel>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Margin Read
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6" style={{ color: COLORS.muted }}>
                <p>{marginInsight}</p>
                <div className="grid gap-3 pt-1 sm:grid-cols-2">
                  <div className="rounded-2xl border p-3" style={{ borderColor: COLORS.border }}>
                    <div className="text-xs" style={{ color: COLORS.muted }}>
                      FY7 gross margin
                    </div>
                    <div className="mt-2 text-2xl font-bold text-white">{formatPercent(ANNUALS[6].grossMargin)}</div>
                  </div>
                  <div className="rounded-2xl border p-3" style={{ borderColor: COLORS.border }}>
                    <div className="text-xs" style={{ color: COLORS.muted }}>
                      FY7 H2-only margin
                    </div>
                    <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.blue, ...glow(COLORS.blue) }}>
                      {formatPercent(THESIS_NOTES.h2MarginFy7)}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.16}>
        <Panel>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Gross Margin Trend
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">Gross profit stays above 78% through scale-up</h3>
            </div>
            <div className="text-sm" style={{ color: COLORS.muted }}>
              Equipment mix rises as services layer in.
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ANNUALS}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(value) => formatPercent(value, 0)} />
              <Tooltip
                content={(props: any) => (
                  <ChartTooltip {...props} valueFormatter={(value) => formatPercent(value)} />
                )}
              />
              <Line type="monotone" dataKey="grossMargin" stroke={COLORS.orange} strokeWidth={3} dot={{ r: 3, fill: COLORS.orange }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </Reveal>
    </div>
  );
}

function UnitEconomicsTab() {
  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="Unit Economics"
          title="The per-kg math is where the model de-risks itself."
          body="The workbook shows attractive margins across a wide price band, with direct operating cost below $3/kg and all-in cost just above $5/kg."
        />
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Reveal delay={0.04}>
          <Panel>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Cost Waterfall
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Per-kg build from electricity to all-in cost</h3>
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                All-in cost = {formatCurrency(UNIT_ECONOMICS.allInCost, 2)}/kg
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={UNIT_ECONOMICS.costBuild}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="stage" tick={AXIS_TICK} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  content={(props: any) => (
                    <ChartTooltip {...props} valueFormatter={(value) => `${formatCurrency(value, 2)}/kg`} />
                  )}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {UNIT_ECONOMICS.costBuild.map((entry) => (
                    <Cell key={entry.stage} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={0.08}>
            <Panel>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Cost Position
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-xs" style={{ color: COLORS.muted }}>
                    Tobe on-site
                  </div>
                  <div className="mt-2 text-3xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
                    {formatCurrency(UNIT_ECONOMICS.tobeOnSite, 2)}/kg
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                    <div className="text-xs" style={{ color: COLORS.muted }}>
                      Grey delivered (50-mile)
                    </div>
                    <div className="mt-2 text-2xl font-bold text-white">
                      {formatCurrency(UNIT_ECONOMICS.greyDelivered50, 2)}/kg
                    </div>
                  </div>
                  <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                    <div className="text-xs" style={{ color: COLORS.muted }}>
                      Grey delivered (150+ mile)
                    </div>
                    <div className="mt-2 text-2xl font-bold text-white">
                      {formatCurrency(UNIT_ECONOMICS.greyDelivered150, 2)}/kg
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-xs" style={{ color: COLORS.muted }}>
                    Bulk market band / Airgas cylinder benchmark
                  </div>
                  <div className="mt-2 text-sm leading-6" style={{ color: COLORS.text }}>
                    Bulk market: ${UNIT_ECONOMICS.bulkMarketRange}/kg
                    <br />
                    Airgas cylinder: {formatCurrency(UNIT_ECONOMICS.airgasCylinder, 2)}/kg
                  </div>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.12}>
            <Panel>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Price Ladder
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {UNIT_ECONOMICS.marginPricePoints.map((point) => (
                  <div
                    key={point.price}
                    className="rounded-full border px-3 py-2 text-sm"
                    style={{ borderColor: COLORS.border, color: COLORS.text }}
                  >
                    ${point.price}/kg
                  </div>
                ))}
                <div
                  className="rounded-full border px-3 py-2 text-sm"
                  style={{ borderColor: COLORS.border, color: COLORS.orange }}
                >
                  Airgas $121+
                </div>
              </div>
              <p className="mt-4 text-sm leading-6" style={{ color: COLORS.muted }}>
                The workbook models price points at $15, $20, $25, $30, and $47/kg. Named customer quote labels are not present in the source file, so the dashboard uses the explicit modeled ladder.
              </p>
            </Panel>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.16}>
        <Panel>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Margin Table
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">Margin profile across the workbook's price cases</h3>
            </div>
            <div className="text-sm" style={{ color: COLORS.muted }}>
              Break-even price = {formatCurrency(UNIT_ECONOMICS.breakEvenPrice, 2)}/kg
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: COLORS.border }}>
            <table className="min-w-full text-left text-sm">
              <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
                <tr>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">All-in Cost</th>
                  <th className="px-4 py-3">Gross Margin $/kg</th>
                  <th className="px-4 py-3 text-right">Gross Margin %</th>
                </tr>
              </thead>
              <tbody>
                {UNIT_ECONOMICS.marginPricePoints.map((point) => (
                  <tr key={point.price} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <td className="px-4 py-3 text-white">${point.price}/kg</td>
                    <td className="px-4 py-3" style={{ color: COLORS.muted }}>
                      {formatCurrency(point.allInCost, 2)}
                    </td>
                    <td className="px-4 py-3 text-white">{formatCurrency(point.grossMarginDollars, 2)}</td>
                    <td className="px-4 py-3 text-right font-semibold" style={{ color: COLORS.green }}>
                      {formatPercent(point.grossMarginPct)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}

function FacilityDeploymentTab() {
  const route = 'Tulsa, OK -> Oklahoma City, OK -> Seattle, WA -> Spokane, WA -> Albuquerque, NM -> Des Moines, IA -> TBD national rollout';

  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="Facility Deployment"
          title="A 12-facility rollout, staged by tier and commissioning speed."
          body="The base case moves from a Tulsa pilot into a standardized national rollout. The cumulative ramp gets to 10.8M kg/year of actual production by FY7."
        />
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Reveal delay={0.04}>
          <Panel>
            <div className="mb-4">
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Text Map
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">Geographic rollout path</h3>
              <p className="mt-3 text-sm leading-6" style={{ color: COLORS.muted }}>
                {route}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {FACILITIES.map((facility, index) => (
                <div key={facility.facility} className="relative pl-6">
                  {index < FACILITIES.length - 1 ? (
                    <div className="absolute left-[5px] top-3 h-full w-px bg-white/10" />
                  ) : null}
                  <div
                    className="absolute left-0 top-2 h-3 w-3 rounded-full"
                    style={{ background: facility.eligible45v ? COLORS.green : COLORS.orange }}
                  />
                  <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{facility.facility}</div>
                        <div className="mt-1 text-xs" style={{ color: COLORS.muted }}>
                          {facility.location} | {facility.inService} | {facility.tier}
                        </div>
                      </div>
                      <div className="text-right text-xs" style={{ color: COLORS.muted }}>
                        <div>{formatKg(facility.nameplateKgPerYear)} nameplate</div>
                        <div>{formatCompactMoney(facility.capex)} capex</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5" style={{ color: COLORS.faint }}>
              Source note: facility row capacity cells in the workbook conflict with the cumulative nameplate schedule. This view uses the workbook's internally consistent 900,000 kg/year nameplate from the ASSUMPTIONS tab.
            </p>
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <Panel>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Cumulative Build
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Capacity and production through FY7</h3>
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                FY7 actual production = {formatKg(ANNUALS[6].actualProduction)}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ANNUALS}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(value) => formatKg(value)} />
                <Tooltip
                  content={(props: any) => (
                    <ChartTooltip
                      {...props}
                      valueFormatter={(value) => formatKg(value)}
                    />
                  )}
                />
                <Legend wrapperStyle={LEGEND_STYLE} />
                <Area type="monotone" dataKey="nameplateCapacity" name="Cumulative Nameplate" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.18} />
                <Area type="monotone" dataKey="actualProduction" name="Actual Production" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>
        </Reveal>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Reveal delay={0.12}>
          <Panel>
            <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
              Pilot Facility
            </p>
            <div className="mt-4 space-y-3">
              <div className="text-3xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
                {formatCompactMoney(FACILITY_ECONOMICS.pilot.capex)}
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                CapEx
              </div>
              <div className="grid gap-3 pt-2 text-sm" style={{ color: COLORS.text }}>
                <div className="flex justify-between gap-3">
                  <span>Annual revenue</span>
                  <span>{formatCompactMoney(FACILITY_ECONOMICS.pilot.annualRevenue)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Annual gross profit</span>
                  <span>{formatCompactMoney(FACILITY_ECONOMICS.pilot.annualGrossProfit)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Payback</span>
                  <span>{trimTrailingZeroes(FACILITY_ECONOMICS.pilot.paybackMonths.toFixed(2))} months</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>IRR</span>
                  <span style={{ color: COLORS.muted }}>Not populated in workbook</span>
                </div>
              </div>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.16}>
          <Panel>
            <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
              Additional Facility
            </p>
            <div className="mt-4 space-y-3">
              <div className="text-3xl font-bold" style={{ color: COLORS.blue, ...glow(COLORS.blue) }}>
                {formatCompactMoney(FACILITY_ECONOMICS.additional.capex)}
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                Standardized build cost
              </div>
              <div className="grid gap-3 pt-2 text-sm" style={{ color: COLORS.text }}>
                <div className="flex justify-between gap-3">
                  <span>Annual revenue</span>
                  <span>{formatCompactMoney(FACILITY_ECONOMICS.additional.annualRevenue)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Annual gross profit</span>
                  <span>{formatCompactMoney(FACILITY_ECONOMICS.additional.annualGrossProfit)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Payback</span>
                  <span>{trimTrailingZeroes(FACILITY_ECONOMICS.additional.paybackMonths.toFixed(2))} months</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Annual 45V credit</span>
                  <span>{formatCompactMoney(FACILITY_ECONOMICS.additional.annualPtc)}</span>
                </div>
              </div>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.2}>
          <Panel>
            <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
              Network Build
            </p>
            <div className="mt-4 space-y-3">
              <div className="text-3xl font-bold" style={{ color: COLORS.orange, ...glow(COLORS.orange) }}>
                {formatCompactMoney(FACILITY_ECONOMICS.totalBuildCapex)}
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                Total capex for all 12 facilities
              </div>
              <div className="grid gap-3 pt-2 text-sm" style={{ color: COLORS.text }}>
                <div className="flex justify-between gap-3">
                  <span>Average capex / site</span>
                  <span>{formatCompactMoney(FACILITY_ECONOMICS.averageFacilityCapex)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Operating facilities in FY7</span>
                  <span>{ANNUALS[6].operatingFacilities}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>FY7 production</span>
                  <span>{formatKg(ANNUALS[6].actualProduction)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Eligibility base case</span>
                  <span>{TAX_CREDIT.modeledEligibleFacilities} facilities</span>
                </div>
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Reveal delay={0.24}>
          <Panel>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Pilot AFE
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">{formatCompactMoney(AFE_BREAKDOWN.pilotTotal)} build</h3>
              </div>
            </div>
            <BreakdownList items={AFE_BREAKDOWN.pilot} total={AFE_BREAKDOWN.pilotTotal} accent={COLORS.green} />
          </Panel>
        </Reveal>

        <Reveal delay={0.28}>
          <Panel>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Additional AFE
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">{formatCompactMoney(AFE_BREAKDOWN.additionalTotal)} build</h3>
              </div>
            </div>
            <BreakdownList items={AFE_BREAKDOWN.additional} total={AFE_BREAKDOWN.additionalTotal} accent={COLORS.blue} />
          </Panel>
        </Reveal>
      </div>
    </div>
  );
}

function TaxCreditTab() {
  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="45V Tax Credit"
          title="The biggest unlock is optionality, not dependency."
          body="The source workbook shows the model works without 45V. That makes the credit an upside lever, not a crutch."
        />
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="grid gap-4">
          <Reveal delay={0.04}>
            <Panel>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Tier Qualification
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span style={{ color: COLORS.muted }}>Tobe intensity</span>
                    <span className="text-white">0.03 kgCO2e/kg</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: '6.7%', background: COLORS.green }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span style={{ color: COLORS.muted }}>Tier 1 threshold</span>
                    <span className="text-white">0.45 kgCO2e/kg</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: '100%', background: COLORS.orange }} />
                  </div>
                </div>
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-3xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
                    15x below
                  </div>
                  <p className="mt-2 text-sm leading-6" style={{ color: COLORS.muted }}>
                    The workbook's modeled intensity sits far below the Tier 1 threshold.
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.08}>
            <Panel>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                PPA ROI
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-xs" style={{ color: COLORS.muted }}>
                    Annual wind PPA electricity cost / facility
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">
                    {formatCompactMoney(TAX_CREDIT.annualPpaCostAtWindRate)}
                  </div>
                </div>
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-xs" style={{ color: COLORS.muted }}>
                    Annual 45V credit / eligible facility
                  </div>
                  <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
                    {formatCompactMoney(TAX_CREDIT.annualPerFacility)}
                  </div>
                </div>
                <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                  <div className="text-xs" style={{ color: COLORS.muted }}>
                    Net annual benefit
                  </div>
                  <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.blue, ...glow(COLORS.blue) }}>
                    {formatCompactMoney(TAX_CREDIT.annualNetPtcAfterPpa)}
                  </div>
                </div>
                <p className="text-xs leading-5" style={{ color: COLORS.faint }}>
                  Construction deadline in the workbook: {TAX_CREDIT.constructionDeadline}.
                </p>
              </div>
            </Panel>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <Panel>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Annual PTC Revenue
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Modeled annual 45V revenue by year</h3>
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                Base modeled qualification = {TAX_CREDIT.modeledEligibleFacilities} facilities
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={TAX_CREDIT.annual}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(value) => formatCompactMoney(value, 0)} />
                <Tooltip content={renderMoneyTooltip} />
                <Bar dataKey="ptcRevenue" name="45V Revenue" fill={COLORS.green} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 rounded-2xl border p-4 text-sm leading-6" style={{ borderColor: COLORS.border, color: COLORS.muted }}>
              {TAX_CREDIT.note} The annual EBITDA uplift stabilizes at {formatCompactMoney(10800000)} from FY4 onward.
            </div>
          </Panel>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {TAX_CREDIT.scenarios.map((scenario, index) => (
          <Reveal key={scenario.label} delay={0.16 + index * 0.04}>
            <Panel style={valueGlow(scenario.color)}>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                {scenario.label}
              </p>
              <div className="mt-4 text-4xl font-bold" style={{ color: scenario.color, ...glow(scenario.color) }}>
                {formatCompactMoney(scenario.totalValue, 0)}
              </div>
              <div className="mt-3 text-sm leading-6" style={{ color: COLORS.muted }}>
                {scenario.facilities} facilities x {formatCompactMoney(TAX_CREDIT.tenYearPerFacility, 0)} per facility over 10 years.
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function SensitivityTab() {
  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="Sensitivity"
          title="The model still works at $15/kg. At $25/kg it scales hard."
          body="The sensitivity tab backs two points: electricity matters, and price / facility count drive revenue much more than the tax-credit toggle."
        />
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Reveal delay={0.04}>
          <Panel>
            <div className="mb-5">
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Electricity Sensitivity
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">LCOH delta vs. base case</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={SENSITIVITY.electricity} layout="vertical">
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}`} />
                <YAxis
                  type="category"
                  dataKey="price"
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value.toFixed(3)}/kWh`}
                  width={92}
                />
                <Tooltip
                  content={(props: any) => (
                    <ChartTooltip
                      {...props}
                      valueFormatter={(value) => `${value > 0 ? '+' : ''}${trimTrailingZeroes(value.toFixed(2))} vs base`}
                    />
                  )}
                />
                <Bar dataKey="deltaVsBase" name="LCOH delta">
                  {SENSITIVITY.electricity.map((point) => (
                    <Cell key={point.price} fill={point.deltaVsBase <= 0 ? COLORS.green : COLORS.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm leading-6" style={{ color: COLORS.muted }}>
              At the workbook base power price of ${SENSITIVITY.electricity[3].price.toFixed(3)}/kWh, LCOH is{' '}
              {formatCurrency(SENSITIVITY.electricity[3].lcoh, 2)}/kg.
            </p>
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <Panel>
            <div className="mb-5">
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Bull / Base / Bear
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">FY7 scenario outcomes</h3>
            </div>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: COLORS.border }}>
              <table className="min-w-full text-left text-sm">
                <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <tr>
                    <th className="px-4 py-3">Case</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Facilities</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">EBITDA</th>
                    <th className="px-4 py-3">Net Income</th>
                  </tr>
                </thead>
                <tbody>
                  {SENSITIVITY.scenarios.map((scenario) => (
                    <tr key={scenario.case} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <td className="px-4 py-3 text-white">{scenario.case}</td>
                      <td className="px-4 py-3" style={{ color: COLORS.muted }}>
                        ${scenario.h2Price}/kg
                      </td>
                      <td className="px-4 py-3" style={{ color: COLORS.muted }}>
                        {scenario.facilities}
                      </td>
                      <td className="px-4 py-3 text-white">{formatCompactMoney(scenario.revenue * 1_000_000)}</td>
                      <td className="px-4 py-3 text-white">
                        {formatCompactMoney(scenario.ebitda * 1_000_000)} ({formatPercent(scenario.ebitdaMargin)})
                      </td>
                      <td className="px-4 py-3 text-white">{formatCompactMoney(scenario.netIncome * 1_000_000)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
              <div className="text-sm font-semibold text-white">Key takeaway</div>
              <div className="mt-2 text-sm leading-6" style={{ color: COLORS.muted }}>
                Bear case still reaches {formatCompactMoney(SENSITIVITY.scenarios[0].ebitda * 1_000_000)} EBITDA at $15/kg.
                Base case pushes past {formatCompactMoney(SENSITIVITY.scenarios[1].ebitda * 1_000_000)}.
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay={0.12}>
          <Panel>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  Price x Facility Matrix
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">FY5 revenue heatmap ($M)</h3>
              </div>
              <div className="text-sm" style={{ color: COLORS.muted }}>
                Source: sensitivity matrix in the workbook
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 text-sm">
              <div />
              {['3', '5', '7', '10', '12'].map((count) => (
                <div key={count} className="rounded-xl border px-3 py-2 text-center" style={{ borderColor: COLORS.border, color: COLORS.muted }}>
                  {count} fac
                </div>
              ))}
              {SENSITIVITY.matrix.map((row) => {
                const values = [row.facilities3, row.facilities5, row.facilities7, row.facilities10, row.facilities12];
                return (
                  <FragmentRow key={row.price} label={row.price} values={values} />
                );
              })}
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.16}>
          <Panel>
            <div className="mb-5">
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Variable Impact
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">Estimated FY7 EBITDA swings ($M)</h3>
            </div>
            <div className="space-y-4">
              {SENSITIVITY.ebitdaImpactVariables.map((item) => {
                const width = Math.min((Math.abs(item.value) / 54) * 100, 100);
                return (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span style={{ color: COLORS.text }}>{item.label}</span>
                      <span style={{ color: item.value >= 0 ? COLORS.green : COLORS.red }}>
                        {item.value >= 0 ? '+' : ''}
                        {trimTrailingZeroes(item.value.toFixed(2))}M
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${width}%`,
                          background: item.value >= 0 ? COLORS.green : COLORS.red,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl border p-4 text-sm leading-6" style={{ borderColor: COLORS.border, color: COLORS.muted }}>
              IRR / NPV at discount rates were requested in the prompt, but the workbook does not populate them. This panel leaves that gap explicit.
            </div>
          </Panel>
        </Reveal>
      </div>
    </div>
  );
}

function FragmentRow({
  label,
  values,
}: {
  label: string;
  values: number[];
}) {
  return (
    <>
      <div className="rounded-xl border px-3 py-3 text-center" style={{ borderColor: COLORS.border, color: COLORS.text }}>
        {label}
      </div>
      {values.map((value) => (
        <div
          key={`${label}-${value}`}
          className="rounded-xl border px-3 py-3 text-center font-semibold text-white"
          style={{
            borderColor: COLORS.border,
            background: heatBackground(value),
          }}
        >
          {formatCompactMoney(value * 1_000_000)}
        </div>
      ))}
    </>
  );
}

function CapTableTab() {
  const colorScale = CAP_TABLE.ownership.map((entry) => entry.color);

  return (
    <div className="space-y-8">
      <Reveal>
        <SectionTitle
          label="Cap Table & Fundraise"
          title="Post-seed dilution is modest against the modeled scale outcome."
          body="The workbook gives a clean post-seed pro forma, staged future dilution, and a specific $10M use-of-funds plan split across equity and debt."
        />
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Reveal delay={0.04}>
          <Panel>
            <div className="mb-4">
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Ownership
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">Post-seed pro forma ownership</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CAP_TABLE.ownership}
                  dataKey="postSeedPct"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={108}
                  paddingAngle={3}
                >
                  {colorScale.map((color, index) => (
                    <Cell key={`${color}-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  content={(props: any) => (
                    <ChartTooltip
                      {...props}
                      valueFormatter={(value) => formatPercent(value)}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid gap-2">
              {CAP_TABLE.ownership.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between gap-4 text-sm">
                  <span className="flex items-center gap-2" style={{ color: COLORS.muted }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
                    {entry.name}
                  </span>
                  <span className="text-white">{formatPercent(entry.postSeedPct)}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5" style={{ color: COLORS.faint }}>
              The workbook provides shareholder classes rather than a named investor roster or SAFE instrument schedule.
            </p>
          </Panel>
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Pre-Money" value={formatCompactMoney(CAP_TABLE.preMoney, 0)} accent={COLORS.orange} />
              <MetricCard label="Equity" value={formatCompactMoney(CAP_TABLE.equityRaise, 1)} accent={COLORS.green} />
              <MetricCard label="Debt" value={formatCompactMoney(CAP_TABLE.debtRaise, 1)} accent={COLORS.blue} />
              <MetricCard label="Dilution" value={formatPercent(CAP_TABLE.dilution)} accent={COLORS.red} />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Panel>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                    Shareholder Classes
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">Post-seed value at $47.5M</h3>
                </div>
                <div className="text-sm" style={{ color: COLORS.muted }}>
                  Total post-money: {formatCompactMoney(CAP_TABLE.postMoney, 1)}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: COLORS.border }}>
                <table className="min-w-full text-left text-sm">
                  <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <tr>
                      <th className="px-4 py-3">Holder Class</th>
                      <th className="px-4 py-3">Post-Seed %</th>
                      <th className="px-4 py-3 text-right">Value at $47.5M</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CAP_TABLE.ownership.map((entry) => (
                      <tr key={entry.name} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <td className="px-4 py-3 text-white">{entry.name}</td>
                        <td className="px-4 py-3" style={{ color: COLORS.muted }}>
                          {formatPercent(entry.postSeedPct)}
                        </td>
                        <td className="px-4 py-3 text-right text-white">{formatCompactMoney(entry.valueAtPost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.16}>
        <Panel>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                Use of Funds
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">$10M seed allocation</h3>
            </div>
            <div className="text-sm" style={{ color: COLORS.muted }}>
              Equity: {formatCompactMoney(CAP_TABLE.equityRaise, 1)} | Debt: {formatCompactMoney(CAP_TABLE.debtRaise, 1)}
            </div>
          </div>
          <div className="overflow-hidden rounded-full bg-white/5">
            <div className="flex h-5">
              {USE_OF_FUNDS.map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    width: `${(item.amount / CAP_TABLE.totalRaise) * 100}%`,
                    background: [COLORS.orange, COLORS.green, COLORS.blue, '#ff9b73', '#65ffb0', '#7ef7ff', COLORS.red, '#ff8456', '#3ee1ff'][index],
                  }}
                  title={`${item.label}: ${formatCompactMoney(item.amount)}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {USE_OF_FUNDS.map((item, index) => (
              <div key={item.label} className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-white">{item.label}</div>
                    <div className="mt-1 text-xs" style={{ color: COLORS.muted }}>
                      {item.group}
                    </div>
                  </div>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: [COLORS.orange, COLORS.green, COLORS.blue, '#ff9b73', '#65ffb0', '#7ef7ff', COLORS.red, '#ff8456', '#3ee1ff'][index],
                    }}
                  />
                </div>
                <div className="mt-3 text-xl font-bold text-white">{formatCompactMoney(item.amount)}</div>
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>

      <Reveal delay={0.2}>
        <Panel>
          <p className="text-sm leading-7" style={{ color: COLORS.muted }}>
            Modeled rollout: {FACILITIES.length} facilities. Workbook-implied domestic headroom: {MARKET.siteEquivalentOpportunity} site-equivalents at current per-site revenue.
            International expansion is not modeled. The fundraising schedule extends beyond seed through Series D, which gives management room to accelerate past the base plan.
          </p>
        </Panel>
      </Reveal>
    </div>
  );
}

function renderActiveTab(tab: TabId) {
  switch (tab) {
    case 'thesis':
      return <InvestmentThesisTab />;
    case 'revenue':
      return <RevenueGrowthTab />;
    case 'profitability':
      return <ProfitabilityTab />;
    case 'unit-economics':
      return <UnitEconomicsTab />;
    case 'deployment':
      return <FacilityDeploymentTab />;
    case 'tax-credit':
      return <TaxCreditTab />;
    case 'sensitivity':
      return <SensitivityTab />;
    case 'cap-table':
      return <CapTableTab />;
    default:
      return null;
  }
}

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('thesis');

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-8 font-mono text-white md:px-8 xl:px-10"
      style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 10%, rgba(255,107,53,0.20), transparent 28%), radial-gradient(circle at 90% 12%, rgba(0,212,255,0.14), transparent 24%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 56px 56px, 56px 56px',
        }}
      />

      <div className="relative mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 rounded-[32px] border p-6 md:p-8"
          style={{ ...PANEL_STYLE, boxShadow: '0 0 40px rgba(255,107,53,0.08)' }}
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: COLORS.orange }}>
                TOBE ENERGY // INVESTOR DATA ROOM
              </p>
              <h1 className="max-w-4xl text-3xl font-bold text-white md:text-5xl">
                Financial Dashboard
              </h1>
              <p className="max-w-3xl text-sm leading-7 md:text-base" style={{ color: COLORS.muted }}>
                Workbook-backed dashboard for Tobe_Energy_Financial_Model_FINAL.xlsx. Every financial display value in this component traces to the workbook or to an explicitly noted workbook-derived calculation.
              </p>
            </div>
            <div className="grid gap-3 text-right">
              <div className="rounded-2xl border px-4 py-3" style={{ borderColor: COLORS.border }}>
                <div className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  FY7 Revenue
                </div>
                <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.green, ...glow(COLORS.green) }}>
                  {formatCompactMoney(ANNUALS[6].operatingRevenue)}
                </div>
              </div>
              <div className="rounded-2xl border px-4 py-3" style={{ borderColor: COLORS.border }}>
                <div className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
                  45V Upside
                </div>
                <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.blue, ...glow(COLORS.blue) }}>
                  {formatCompactMoney(TAX_CREDIT.scenarios[2].totalValue, 0)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-8 flex gap-2 overflow-x-auto pb-2"
        >
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex min-w-fit items-center gap-3 rounded-full border px-4 py-3 text-sm transition-colors duration-200"
                style={{
                  borderColor: active ? COLORS.orange : COLORS.border,
                  background: active ? 'rgba(255,107,53,0.14)' : COLORS.panel,
                  color: active ? '#ffffff' : COLORS.muted,
                  boxShadow: active ? '0 0 22px rgba(255,107,53,0.18)' : 'none',
                }}
              >
                <span style={{ color: active ? COLORS.orange : COLORS.faint }}>{tab.index}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {renderActiveTab(activeTab)}
        </motion.div>

        <div className="mt-12 pb-4 text-center">
          <a
            href="#"
            className="inline-flex rounded-full border px-5 py-3 text-sm transition-colors"
            style={{
              borderColor: COLORS.border,
              color: COLORS.orange,
              background: COLORS.panel,
            }}
          >
            [Download Full Financial Model (.xlsx)]
          </a>
        </div>
      </div>
    </div>
  );
}
