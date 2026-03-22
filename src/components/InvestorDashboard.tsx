'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Line, LineChart,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

// ═══════════════════════════════════════════════════════════════
// THEME & CONSTANTS
// ═══════════════════════════════════════════════════════════════

const COLORS = {
  bg: '#0a0a0f',
  card: 'rgba(255,255,255,0.02)',
  cardBorder: 'rgba(255,255,255,0.1)',
  green: '#ff6b35',
  orange: '#ff6b35',
  blue: '#ff6b35',
  red: '#ff4444',
  white: '#ffffff',
  white60: 'rgba(255,255,255,0.6)',
  white40: 'rgba(255,255,255,0.4)',
  white10: 'rgba(255,255,255,0.1)',
  grid: 'rgba(255,255,255,0.05)',
};

const TABS = [
  'INVESTMENT THESIS',
  'REVENUE & GROWTH',
  'PROFITABILITY',
  'UNIT ECONOMICS',
  'FACILITY DEPLOYMENT',
  '45V TAX CREDIT',
  'SENSITIVITY',
  'CAP TABLE',
];

// ═══════════════════════════════════════════════════════════════
// DATA — All values extracted from Tobe_Energy_Financial_Model_FINAL.xlsx
// ═══════════════════════════════════════════════════════════════

// Source: P&L tab, rows 7-43
const PL_DATA = {
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
const CF_DATA = {
  opCF:      [-2756761, 2795026, 43220958, 80878380, 119919321, 151428501, 157918189],
  capex:     [-7375000, -10650000, -12150000, -12150000, -30450000, -9000000, 0],
  endCash:   [420830, 47075492, 76136105, 287438712, 305204147, 816649772, 822003047],
};

// Source: Unit Economics tab, rows 6-17
const UNIT_ECON = {
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
const FACILITIES = [
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
const CAPACITY_RAMP = {
  nameplate: [0, 900000, 3600000, 3600000, 5400000, 9000000, 10800000],
  actual:    [0, 472500, 3112500, 5662500, 8437500, 10575000, 10800000],
};

// Source: 45V Tax Credit tab, rows 5-16
const PTC_DATA = {
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
const SENSITIVITY = {
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
const CAP_TABLE = {
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
const USE_OF_FUNDS = [
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

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

const fmt = (n: number, prefix = '$', suffix = '') => {
  if (Math.abs(n) >= 1e9) return `${prefix}${(n / 1e9).toFixed(1)}B${suffix}`;
  if (Math.abs(n) >= 1e6) return `${prefix}${(n / 1e6).toFixed(1)}M${suffix}`;
  if (Math.abs(n) >= 1e3) return `${prefix}${(n / 1e3).toFixed(0)}K${suffix}`;
  return `${prefix}${n.toFixed(2)}${suffix}`;
};

const fmtPct = (n: number) => `${(n * 100).toFixed(1)}%`;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    color: COLORS.orange, textTransform: 'uppercase', letterSpacing: '0.15em',
    fontSize: '0.65rem', fontWeight: 600, marginBottom: 8, fontFamily: 'monospace',
  }}>
    {children}
  </div>
);

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 8, padding: 20, ...style,
  }}>
    {children}
  </div>
);

const GlowNumber = ({ value, color, sub }: { value: string; color: string; sub?: string }) => (
  <div>
    <div style={{
      fontSize: '1.8rem', fontWeight: 700, color, fontFamily: 'monospace',
      textShadow: `0 0 20px ${color}40, 0 0 40px ${color}20`,
      lineHeight: 1.1,
    }}>
      {value}
    </div>
    {sub && <div style={{ color: COLORS.white60, fontSize: '0.75rem', marginTop: 4, fontFamily: 'monospace' }}>{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#111118', border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 6, padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.75rem',
    }}>
      <div style={{ color: COLORS.white60, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {typeof p.value === 'number' && Math.abs(p.value) >= 1000 ? fmt(p.value) : p.value}
          {typeof p.value === 'number' && p.value < 1 && p.value > -1 && p.name?.includes('%') ? '' : ''}
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 1: INVESTMENT THESIS
// ═══════════════════════════════════════════════════════════════

const InvestmentThesis = () => {
  const heroMetrics = [
    { label: 'FY7 REVENUE', value: fmt(PL_DATA.opRevenue[6]), sub: '12 facilities × 3 streams', color: COLORS.green },
    { label: 'FY7 EBITDA', value: fmt(PL_DATA.ebitda[6]), sub: `${(PL_DATA.ebitdaMargin[6] * 100).toFixed(1)}% margin`, color: COLORS.green },
    { label: 'FY7 NET INCOME', value: fmt(PL_DATA.netIncome[6]), sub: `${(PL_DATA.netMargin[6] * 100).toFixed(1)}% margin`, color: COLORS.blue },
    { label: '45V PTC UPSIDE (12 FAC)', value: '$324M', sub: '$27M × 12 facilities over 10yr', color: COLORS.orange },
  ];

  const thesisPoints = [
    { icon: '◆', text: '$226B global market. First electrolyzer under DOE $2/kg target (LCOH $2.06 optimized).', accent: COLORS.green },
    { icon: '◆', text: '79.7% gross margin at $25/kg — all-in cost $5.08/kg, 92% system efficiency.', accent: COLORS.green },
    { icon: '◆', text: '12 facilities planned by FY7, 100+ domestic sites addressable. $37.1M total CapEx.', accent: COLORS.blue },
    { icon: '◆', text: '$20M+ signed LOIs. First deployment Q4 2026 at Zeeco ARC (Broken Arrow, OK).', accent: COLORS.blue },
    { icon: '◆', text: '45V tax credit: $3/kg for 10 years. Conservative $108M → Accelerated $324M cumulative.', accent: COLORS.orange },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {heroMetrics.map((m, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
            <Card style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
              }} />
              <SectionLabel>{m.label}</SectionLabel>
              <GlowNumber value={m.value} color={m.color} sub={m.sub} />
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
        <SectionLabel>WHY THIS INVESTMENT</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {thesisPoints.map((p, i) => (
            <Card key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16 }}>
              <span style={{ color: p.accent, fontSize: '0.8rem', marginTop: 2, flexShrink: 0 }}>{p.icon}</span>
              <span style={{ color: COLORS.white, fontSize: '0.85rem', fontFamily: 'monospace', lineHeight: 1.5 }}>{p.text}</span>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ delay: 0.6 }} style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionLabel>SEED ROUND</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Pre-Money', '$40M'],
              ['Round Size', '$10M'],
              ['Equity', '$7.5M'],
              ['Debt', '$2.5M'],
            ].map(([label, val], i) => (
              <div key={i}>
                <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace' }}>{label}</div>
                <div style={{ color: COLORS.white, fontSize: '1.1rem', fontWeight: 600, fontFamily: 'monospace' }}>{val}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>SEED INVESTOR RETURNS (FY7)</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Bear (8x Rev)', '28.3x'],
              ['Base (10x Rev)', '35.4x'],
              ['Bull (12x Rev)', '42.5x'],
              ['20x EBITDA', '46.7x'],
            ].map(([label, val], i) => (
              <div key={i}>
                <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace' }}>{label}</div>
                <div style={{ color: COLORS.green, fontSize: '1.1rem', fontWeight: 600, fontFamily: 'monospace' }}>{val}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 2: REVENUE & GROWTH
// ═══════════════════════════════════════════════════════════════

const RevenueGrowth = () => {
  const chartData = PL_DATA.years.map((y, i) => ({
    year: y,
    h2: PL_DATA.h2Revenue[i] / 1e6,
    equip: PL_DATA.equipRevenue[i] / 1e6,
    svc: PL_DATA.svcRevenue[i] / 1e6,
    total: PL_DATA.opRevenue[i] / 1e6,
  }));

  const fy7Mix = [
    { name: 'H₂ Production', value: PL_DATA.h2Revenue[6], pct: 82.4 },
    { name: 'Equipment Sales', value: PL_DATA.equipRevenue[6], pct: 15.6 },
    { name: 'Services', value: PL_DATA.svcRevenue[6], pct: 2.0 },
  ];
  const pieColors = [COLORS.green, COLORS.orange, COLORS.blue];

  // Revenue CAGR FY2-FY7 (first revenue year to last)
  const cagr = ((PL_DATA.opRevenue[6] / PL_DATA.opRevenue[1]) ** (1 / 5) - 1) * 100;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>REVENUE BY STREAM ($M) — FY1 TO FY7</SectionLabel>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis dataKey="year" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="h2" stackId="1" fill={COLORS.green} fillOpacity={0.6} stroke={COLORS.green} name="H₂ Revenue ($M)" />
              <Area type="monotone" dataKey="equip" stackId="1" fill={COLORS.orange} fillOpacity={0.6} stroke={COLORS.orange} name="Equipment ($M)" />
              <Area type="monotone" dataKey="svc" stackId="1" fill={COLORS.blue} fillOpacity={0.6} stroke={COLORS.blue} name="Services ($M)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{ width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <SectionLabel>REVENUE CAGR</SectionLabel>
          <GlowNumber value={`${cagr.toFixed(0)}%`} color={COLORS.green} sub="FY2 → FY7" />
          <div style={{ marginTop: 24 }}>
            <SectionLabel>FY7 TOTAL</SectionLabel>
            <GlowNumber value={fmt(PL_DATA.opRevenue[6])} color={COLORS.green} />
          </div>
        </Card>
      </div>

      <Card>
        <SectionLabel>FY7 REVENUE MIX</SectionLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie data={fy7Mix} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                {fy7Mix.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {fy7Mix.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: pieColors[i], flexShrink: 0 }} />
                <span style={{ color: COLORS.white, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {m.name}: {m.pct}% ({fmt(m.value)})
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 3: PROFITABILITY
// ═══════════════════════════════════════════════════════════════

const Profitability = () => {
  const chartData = PL_DATA.years.map((y, i) => ({
    year: y,
    ebitda: PL_DATA.ebitda[i] / 1e6,
    ebitdaMargin: PL_DATA.ebitdaMargin[i] > -1 ? +(PL_DATA.ebitdaMargin[i] * 100).toFixed(1) : null,
    netIncome: PL_DATA.netIncome[i] / 1e6,
    grossMargin: +(PL_DATA.grossMargin[i] * 100).toFixed(1),
  }));

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>EBITDA ($M) + MARGINS — FY1 TO FY7</SectionLabel>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis dataKey="year" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis yAxisId="left" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}M`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `${v}%`} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="ebitda" fill={COLORS.green} fillOpacity={0.7} name="EBITDA ($M)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="ebitdaMargin" stroke={COLORS.orange} strokeWidth={2} dot={{ fill: COLORS.orange, r: 4 }} name="EBITDA Margin %" connectNulls />
              <Line yAxisId="left" type="monotone" dataKey="netIncome" stroke={COLORS.blue} strokeWidth={2} dot={{ fill: COLORS.blue, r: 4 }} name="Net Income ($M)" />
              <Line yAxisId="right" type="monotone" dataKey="grossMargin" stroke={COLORS.white40} strokeWidth={1} strokeDasharray="5 5" dot={false} name="Gross Margin %" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
        <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ textAlign: 'center' }}>
            <SectionLabel>EBITDA POSITIVE</SectionLabel>
            <GlowNumber value="FY2" color={COLORS.green} sub="$3.7M EBITDA in Year 2" />
          </Card>
          <Card style={{ textAlign: 'center' }}>
            <SectionLabel>FY7 EBITDA MARGIN</SectionLabel>
            <GlowNumber value="63.9%" color={COLORS.orange} sub={fmt(PL_DATA.ebitda[6])} />
          </Card>
          <Card style={{ textAlign: 'center' }}>
            <SectionLabel>FY7 NET MARGIN</SectionLabel>
            <GlowNumber value="46.5%" color={COLORS.blue} sub={fmt(PL_DATA.netIncome[6])} />
          </Card>
          <Card>
            <SectionLabel>MARGIN NOTE</SectionLabel>
            <div style={{ color: COLORS.white60, fontSize: '0.72rem', fontFamily: 'monospace', lineHeight: 1.5 }}>
              Gross margins moderate from 82% (FY3) → 79% (FY7) as equipment sales increase in the mix. H₂ production margins stay 85%+.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 4: UNIT ECONOMICS
// ═══════════════════════════════════════════════════════════════

const UnitEconomics = () => {
  // Cost waterfall data
  const waterfall = [
    { name: 'Electricity', value: 1.777, cum: 1.777 },
    { name: 'Compression', value: 0.14, cum: 1.917 },
    { name: 'Transport', value: 0.90, cum: 2.817 },
    { name: 'Water', value: 0.05, cum: 2.867 },
    { name: 'Labor', value: 1.389, cum: 4.256 },
    { name: 'CapEx Alloc', value: 0.407, cum: 4.663 },
    { name: 'Maintenance', value: 0.420, cum: 5.083 },
  ];

  const waterfallChart = waterfall.map(w => ({
    name: w.name,
    base: +(w.cum - w.value).toFixed(3),
    cost: +w.value.toFixed(3),
  }));

  const marginData = UNIT_ECON.margins.map(m => ({
    price: `$${m.price}`,
    margin: m.margin,
    cost: m.cost,
    pct: m.pct,
  }));

  const customerPrices = [
    { customer: 'Zeeco ARC', price: 30, type: 'Contracted' },
    { customer: 'Tulsa Industrial', price: 47, type: 'LOI' },
    { customer: 'Airgas Cylinder', price: 121.31, type: 'Market Ref' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>COST BUILD-UP — ALL-IN $/KG H₂</SectionLabel>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterfallChart} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis dataKey="name" tick={{ fill: COLORS.white60, fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}`} domain={[0, 6]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="base" stackId="a" fill="transparent" name="Base" />
              <Bar dataKey="cost" stackId="a" fill={COLORS.orange} fillOpacity={0.8} name="Cost Component ($/kg)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ color: COLORS.orange, fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace' }}>
              $5.08/kg all-in
            </span>
            <span style={{ color: COLORS.white40, fontSize: '0.75rem', fontFamily: 'monospace', marginLeft: 8 }}>
              (Direct: $2.87/kg)
            </span>
          </div>
        </Card>

        <Card>
          <SectionLabel>ON-SITE VS. DELIVERED COST COMPARISON</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
            {[
              { label: 'Tobe On-Site', cost: '$5.08/kg', color: COLORS.green, width: '10%' },
              { label: 'Grey H₂ Delivered (50mi)', cost: '$5.25/kg', color: COLORS.white40, width: '10.5%' },
              { label: 'Grey H₂ Delivered (150+mi)', cost: '$10.30/kg', color: COLORS.white40, width: '20.6%' },
              { label: 'Market Bulk Price', cost: '$15-36/kg', color: COLORS.orange, width: '50%' },
              { label: 'Airgas Cylinder', cost: '$121.31/kg', color: COLORS.red, width: '100%' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: COLORS.white60, fontSize: '0.72rem', fontFamily: 'monospace' }}>{item.label}</span>
                  <span style={{ color: item.color, fontSize: '0.8rem', fontWeight: 600, fontFamily: 'monospace' }}>{item.cost}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: item.width, background: item.color, borderRadius: 3, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <Card>
          <SectionLabel>MARGIN AT DIFFERENT PRICE POINTS (YEAR 3+)</SectionLabel>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={marginData} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis dataKey="price" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cost" stackId="a" fill={COLORS.red} fillOpacity={0.5} name="All-in Cost ($/kg)" />
              <Bar dataKey="margin" stackId="a" fill={COLORS.green} fillOpacity={0.7} name="Gross Margin ($/kg)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionLabel>CUSTOMER PRICE REALITY</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
            {customerPrices.map((c, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${COLORS.white10}`, paddingBottom: 12 }}>
                <div style={{ color: COLORS.white, fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 600 }}>{c.customer}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ color: COLORS.green, fontSize: '1.3rem', fontWeight: 700, fontFamily: 'monospace' }}>${c.price}/kg</span>
                  <span style={{ color: COLORS.white40, fontSize: '0.7rem', fontFamily: 'monospace', alignSelf: 'flex-end' }}>{c.type}</span>
                </div>
              </div>
            ))}
            <div style={{ color: COLORS.white40, fontSize: '0.68rem', fontFamily: 'monospace', lineHeight: 1.4, marginTop: 4 }}>
              Model uses $25/kg blended ASP. Actual contracted / quoted prices range $15-$121/kg depending on volume, delivery model, and segment.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 5: FACILITY DEPLOYMENT
// ═══════════════════════════════════════════════════════════════

const FacilityDeployment = () => {
  const capData = PL_DATA.years.map((y, i) => ({
    year: y,
    nameplate: CAPACITY_RAMP.nameplate[i] / 1e6,
    actual: CAPACITY_RAMP.actual[i] / 1e6,
  }));

  // AFE data — Source: Facility AFE tab
  const pilotAFE = [
    { cat: 'Electrolyzer System', cost: 700000 },
    { cat: 'Compressor + Storage + Dispensing', cost: 700000 },
    { cat: 'Mfg Equipment (CNC, Winder, 3D)', cost: 260000 },
    { cat: 'Construction & Install', cost: 300000 },
    { cat: 'R&D Materials', cost: 300000 },
    { cat: 'Safety + Water + BOP', cost: 180000 },
    { cat: 'PM + Lab + Tools + Software', cost: 280000 },
    { cat: 'Commissioning + Training', cost: 70000 },
    { cat: 'Facility Lease (1yr)', cost: 70000 },
    { cat: 'Permitting', cost: 50000 },
    { cat: 'Contingency (~15%)', cost: 460000 },
  ];

  const addlAFE = [
    { cat: 'Electrolyzer (10× T-125)', cost: 1500000 },
    { cat: 'Compressor + Storage + Dispensing', cost: 550000 },
    { cat: 'Construction + Commissioning', cost: 310000 },
    { cat: 'Safety + Water + BOP', cost: 200000 },
    { cat: 'PM + Tools + Testing', cost: 280000 },
    { cat: 'R&D Materials', cost: 35000 },
    { cat: 'Load Out Stanchions', cost: 50000 },
    { cat: 'Modularization Savings', cost: -300000 },
    { cat: 'Contingency (~5%)', cost: 150000 },
  ];

  return (
    <div>
      {/* Timeline */}
      <Card style={{ marginBottom: 24, overflowX: 'auto' }}>
        <SectionLabel>12-FACILITY DEPLOYMENT TIMELINE</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6, marginTop: 12 }}>
          {FACILITIES.map((f, i) => (
            <div key={i} style={{
              background: f.ptc > 0 ? `${COLORS.green}15` : `${COLORS.white}05`,
              border: `1px solid ${f.ptc > 0 ? COLORS.green + '40' : COLORS.white10}`,
              borderRadius: 6, padding: '10px 8px', textAlign: 'center', minWidth: 80,
            }}>
              <div style={{ color: f.ptc > 0 ? COLORS.green : COLORS.white60, fontSize: '0.7rem', fontWeight: 700, fontFamily: 'monospace' }}>{f.id}</div>
              <div style={{ color: COLORS.white, fontSize: '0.65rem', fontFamily: 'monospace', marginTop: 2 }}>{f.name}</div>
              <div style={{ color: COLORS.white40, fontSize: '0.58rem', fontFamily: 'monospace', marginTop: 2 }}>{f.loc}</div>
              <div style={{ color: COLORS.orange, fontSize: '0.6rem', fontFamily: 'monospace', marginTop: 4 }}>{f.inService}</div>
              <div style={{ color: COLORS.white40, fontSize: '0.55rem', fontFamily: 'monospace', marginTop: 2 }}>{f.tier}</div>
              {f.ptc > 0 && <div style={{ color: COLORS.green, fontSize: '0.55rem', fontFamily: 'monospace', marginTop: 2 }}>45V ✓</div>}
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>CUMULATIVE CAPACITY (M KG/YR)</SectionLabel>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={capData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis dataKey="year" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="nameplate" fill={COLORS.blue} fillOpacity={0.15} stroke={COLORS.blue} strokeDasharray="5 5" name="Nameplate (M kg)" />
              <Area type="monotone" dataKey="actual" fill={COLORS.green} fillOpacity={0.4} stroke={COLORS.green} name="Actual Production (M kg)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionLabel>PER-FACILITY ECONOMICS (AT NAMEPLATE)</SectionLabel>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.7rem' }}>
              <thead>
                <tr>
                  {['Facility', 'CapEx', 'Ann Rev', 'Gross Profit', 'Payback', 'PTC/yr'].map(h => (
                    <th key={h} style={{ color: COLORS.white40, textAlign: 'left', padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FACILITIES.slice(0, 6).map((f, i) => (
                  <tr key={i}>
                    <td style={{ color: COLORS.white, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{f.id}</td>
                    <td style={{ color: COLORS.white60, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{fmt(f.capex)}</td>
                    <td style={{ color: COLORS.green, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{fmt(f.annRev)}</td>
                    <td style={{ color: COLORS.green, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{fmt(f.grossProfit)}</td>
                    <td style={{ color: COLORS.orange, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{f.payback} mo</td>
                    <td style={{ color: f.ptc > 0 ? COLORS.green : COLORS.white40, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{f.ptc > 0 ? fmt(f.ptc) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <SectionLabel>AFE: PILOT FACILITY (F1) — $3.3M</SectionLabel>
          {pilotAFE.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${COLORS.white10}` }}>
              <span style={{ color: COLORS.white60, fontSize: '0.7rem', fontFamily: 'monospace' }}>{item.cat}</span>
              <span style={{ color: COLORS.white, fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 600 }}>{fmt(item.cost)}</span>
            </div>
          ))}
        </Card>
        <Card>
          <SectionLabel>AFE: ADDITIONAL FACILITY (F2-F12) — $3.075M</SectionLabel>
          {addlAFE.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${COLORS.white10}` }}>
              <span style={{ color: COLORS.white60, fontSize: '0.7rem', fontFamily: 'monospace' }}>{item.cat}</span>
              <span style={{ color: item.cost < 0 ? COLORS.green : COLORS.white, fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 600 }}>
                {item.cost < 0 ? `-${fmt(Math.abs(item.cost))}` : fmt(item.cost)}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 6: 45V TAX CREDIT
// ═══════════════════════════════════════════════════════════════

const TaxCredit45V = () => {
  const ptcChartData = PL_DATA.years.map((y, i) => ({
    year: y,
    ptcRevenue: PTC_DATA.ptcRevenue[i] / 1e6,
    cumPTC: PTC_DATA.cumPTC[i] / 1e6,
  }));

  const scenarios = [
    { label: 'Conservative', fac: 4, cumulative: 108, color: COLORS.white60 },
    { label: 'Accelerated', fac: 8, cumulative: 216, color: COLORS.orange },
    { label: 'Full Deploy', fac: 12, cumulative: 324, color: COLORS.green },
  ];

  return (
    <div>
      {/* Tier qualification visual */}
      <Card style={{ marginBottom: 24 }}>
        <SectionLabel>45V TIER 1 QUALIFICATION</SectionLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative', height: 40, background: 'rgba(255,255,255,0.03)', borderRadius: 6, overflow: 'hidden' }}>
              {/* Threshold line */}
              <div style={{
                position: 'absolute', left: `${(0.45 / 0.5) * 100}%`, top: 0, bottom: 0, width: 2,
                background: COLORS.red, zIndex: 2,
              }} />
              <div style={{
                position: 'absolute', left: `${(0.45 / 0.5) * 100}%`, top: -18, fontSize: '0.6rem',
                color: COLORS.red, fontFamily: 'monospace', transform: 'translateX(-50%)',
              }}>
                Threshold: 0.45
              </div>
              {/* Tobe marker */}
              <div style={{
                position: 'absolute', left: `${(0.03 / 0.5) * 100}%`, top: 4, bottom: 4, width: 20,
                background: COLORS.green, borderRadius: 4, zIndex: 3,
              }} />
              <div style={{
                position: 'absolute', left: `${(0.03 / 0.5) * 100}%`, bottom: -18, fontSize: '0.6rem',
                color: COLORS.green, fontFamily: 'monospace', fontWeight: 700, transform: 'translateX(-50%)',
              }}>
                Tobe: 0.03
              </div>
              {/* Green zone */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(0.45 / 0.5) * 100}%`,
                background: `${COLORS.green}10`,
              }} />
            </div>
            <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace', marginTop: 24 }}>
              kgCO₂e/kg H₂ — Tobe qualifies with 15x margin below threshold
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel>PTC RATE</SectionLabel>
            <GlowNumber value="$3/kg" color={COLORS.green} sub="for 10 years" />
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>ANNUAL PTC REVENUE ($M)</SectionLabel>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={ptcChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis dataKey="year" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis yAxisId="left" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}M`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="ptcRevenue" fill={COLORS.green} fillOpacity={0.7} name="Annual PTC ($M)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="cumPTC" stroke={COLORS.orange} strokeWidth={2} dot={{ fill: COLORS.orange, r: 4 }} name="Cumulative PTC ($M)" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionLabel>PTC SCENARIO ANALYSIS (10-YEAR CUMULATIVE)</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
            {scenarios.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 6,
                border: `1px solid ${s.color}30`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: s.color, fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 600 }}>{s.label}</div>
                  <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace' }}>{s.fac} facilities eligible</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: s.color, fontSize: '1.4rem', fontWeight: 700, fontFamily: 'monospace',
                    textShadow: s.color !== COLORS.white60 ? `0 0 15px ${s.color}40` : 'none',
                  }}>
                    ${s.cumulative}M
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <SectionLabel>PPA ROI PER FACILITY</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 8 }}>
            <div>
              <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace' }}>PPA Cost</div>
              <div style={{ color: COLORS.red, fontSize: '1.1rem', fontWeight: 600, fontFamily: 'monospace' }}>$1.1M/yr</div>
            </div>
            <div>
              <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace' }}>PTC Credit</div>
              <div style={{ color: COLORS.green, fontSize: '1.1rem', fontWeight: 600, fontFamily: 'monospace' }}>$2.7M/yr</div>
            </div>
            <div>
              <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace' }}>Net Benefit</div>
              <div style={{ color: COLORS.green, fontSize: '1.1rem', fontWeight: 600, fontFamily: 'monospace' }}>$1.6M/yr</div>
            </div>
          </div>
        </Card>
        <Card>
          <SectionLabel>SAFE HARBOR PROVISION</SectionLabel>
          <div style={{ color: COLORS.white60, fontSize: '0.75rem', fontFamily: 'monospace', lineHeight: 1.5 }}>
            5% of facility CapEx must be spent by <span style={{ color: COLORS.orange, fontWeight: 600 }}>December 31, 2027</span> to qualify.
            At ~$3.1M per facility, this is ~$154K per site — easily achievable through equipment orders.
          </div>
          <div style={{ color: COLORS.white40, fontSize: '0.68rem', fontFamily: 'monospace', marginTop: 8 }}>
            Key: Model works profitably WITHOUT 45V credits. EBITDA positive from Year 2 in both scenarios. 45V is upside, not dependency.
          </div>
        </Card>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 7: SENSITIVITY & SCENARIOS
// ═══════════════════════════════════════════════════════════════

const SensitivityTab = () => {
  const tornadoData = SENSITIVITY.whatIf.map(w => ({
    variable: w.variable,
    positive: w.dir === 'pos' ? w.impact : 0,
    negative: w.dir === 'neg' ? w.impact : 0,
  }));

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>LCOH SENSITIVITY — ELECTRICITY PRICE</SectionLabel>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={SENSITIVITY.elecLCOH}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis dataKey="elec" tick={{ fill: COLORS.white60, fontSize: 11, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}`} />
              <YAxis yAxisId="left" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `$${v}`} domain={[4, 6]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: COLORS.white60, fontSize: 12, fontFamily: 'monospace' }} tickFormatter={(v: number) => `${v}%`} domain={[74, 84]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="lcoh" fill={COLORS.orange} fillOpacity={0.6} name="LCOH ($/kg)" radius={[4, 4, 0, 0]} barSize={30} />
              <Line yAxisId="right" type="monotone" dataKey="gm" stroke={COLORS.green} strokeWidth={2} dot={{ fill: COLORS.green, r: 4 }} name="Gross Margin % at $25/kg" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionLabel>FY7 EBITDA IMPACT — WHAT-IF ANALYSIS ($M)</SectionLabel>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tornadoData} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
              <XAxis type="number" tick={{ fill: COLORS.white60, fontSize: 11, fontFamily: 'monospace' }} tickFormatter={(v: number) => `${v > 0 ? '+' : ''}$${v}M`} />
              <YAxis type="category" dataKey="variable" width={180} tick={{ fill: COLORS.white60, fontSize: 10, fontFamily: 'monospace' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="positive" fill={COLORS.green} fillOpacity={0.7} name="Positive Impact ($M)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="negative" fill={COLORS.red} fillOpacity={0.7} name="Negative Impact ($M)" radius={[4, 0, 0, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Scenario Table */}
      <Card style={{ marginBottom: 24 }}>
        <SectionLabel>BULL / BASE / BEAR SCENARIOS — FY7</SectionLabel>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.8rem' }}>
            <thead>
              <tr>
                {['Metric', 'Bear', 'Base', 'Bull'].map(h => (
                  <th key={h} style={{
                    color: h === 'Base' ? COLORS.green : COLORS.white40,
                    textAlign: 'left', padding: '10px 16px', borderBottom: `1px solid ${COLORS.white10}`,
                    fontWeight: 600,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['H₂ Price', `$${SENSITIVITY.scenarios.bear.price}/kg`, `$${SENSITIVITY.scenarios.base.price}/kg`, `$${SENSITIVITY.scenarios.bull.price}/kg`],
                ['Facilities', SENSITIVITY.scenarios.bear.facilities, SENSITIVITY.scenarios.base.facilities, SENSITIVITY.scenarios.bull.facilities],
                ['Revenue', `$${SENSITIVITY.scenarios.bear.revenue}M`, `$${SENSITIVITY.scenarios.base.revenue}M`, `$${SENSITIVITY.scenarios.bull.revenue}M`],
                ['EBITDA', `$${SENSITIVITY.scenarios.bear.ebitda}M`, `$${SENSITIVITY.scenarios.base.ebitda}M`, `$${SENSITIVITY.scenarios.bull.ebitda}M`],
                ['EBITDA Margin', `${SENSITIVITY.scenarios.bear.ebitdaMargin}%`, `${SENSITIVITY.scenarios.base.ebitdaMargin}%`, `${SENSITIVITY.scenarios.bull.ebitdaMargin}%`],
                ['Net Income', `$${SENSITIVITY.scenarios.bear.netIncome}M`, `$${SENSITIVITY.scenarios.base.netIncome}M`, `$${SENSITIVITY.scenarios.bull.netIncome}M`],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      color: j === 0 ? COLORS.white60 : j === 2 ? COLORS.green : COLORS.white,
                      padding: '8px 16px', borderBottom: `1px solid ${COLORS.white10}`,
                      fontWeight: j === 2 ? 600 : 400,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Price × Facility Heatmap */}
      <Card>
        <SectionLabel>PRICE × FACILITY COUNT — FY5 REVENUE ($M)</SectionLabel>
        <div style={{ overflowX: 'auto', marginTop: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <thead>
              <tr>
                <th style={{ color: COLORS.white40, padding: 8, textAlign: 'left' }}>Price ↓ / Fac →</th>
                {SENSITIVITY.matrix.facilities.map(f => (
                  <th key={f} style={{ color: COLORS.white60, padding: 8, textAlign: 'center' }}>{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SENSITIVITY.matrix.prices.map((price, pi) => (
                <tr key={pi}>
                  <td style={{ color: price === 25 ? COLORS.green : COLORS.white60, padding: 8, fontWeight: price === 25 ? 600 : 400 }}>
                    ${price}/kg {price === 25 ? '(Base)' : ''}
                  </td>
                  {SENSITIVITY.matrix.data[pi].map((val, fi) => {
                    const intensity = Math.min(1, val / 430);
                    const isBase = price === 25 && SENSITIVITY.matrix.facilities[fi] === 12;
                    return (
                      <td key={fi} style={{
                        padding: 8, textAlign: 'center',
                        color: isBase ? COLORS.green : COLORS.white,
                        fontWeight: isBase ? 700 : 400,
                        background: `rgba(255, 107, 53, ${intensity * 0.15})`,
                        border: isBase ? `1px solid ${COLORS.green}50` : 'none',
                      }}>
                        ${val.toFixed(1)}M
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ color: COLORS.white40, fontSize: '0.68rem', fontFamily: 'monospace', marginTop: 12 }}>
          The model works at $15/kg. At $25/kg it prints money. Green intensity shows relative revenue scale.
        </div>
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// TAB 8: CAP TABLE & FUNDRAISE
// ═══════════════════════════════════════════════════════════════

const CapTableTab = () => {
  const donutData = CAP_TABLE.shareholders.map(s => ({
    name: s.name,
    value: s.postSeed,
  }));
  const donutColors = [COLORS.green, COLORS.blue, COLORS.orange, '#9966ff', '#ff66b2', COLORS.white40, COLORS.green];

  const equityFunds = USE_OF_FUNDS.filter(f => f.type === 'equity');
  const debtFunds = USE_OF_FUNDS.filter(f => f.type === 'debt');

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>POST-SEED OWNERSHIP</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                  {donutData.map((_, i) => <Cell key={i} fill={donutColors[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CAP_TABLE.shareholders.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: donutColors[i], flexShrink: 0 }} />
                  <span style={{ color: COLORS.white, fontFamily: 'monospace', fontSize: '0.72rem' }}>
                    {s.name}: {s.postSeed}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <SectionLabel>INVESTOR TABLE</SectionLabel>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.72rem' }}>
            <thead>
              <tr>
                {['Shareholder', 'Pre-Seed %', 'Post-Seed %', 'Value @ $47.5M'].map(h => (
                  <th key={h} style={{ color: COLORS.white40, textAlign: 'left', padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAP_TABLE.shareholders.map((s, i) => (
                <tr key={i}>
                  <td style={{ color: COLORS.white, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{s.name}</td>
                  <td style={{ color: COLORS.white60, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{s.preSeed > 0 ? `${s.preSeed}%` : '—'}</td>
                  <td style={{ color: COLORS.white, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}`, fontWeight: 600 }}>{s.postSeed}%</td>
                  <td style={{ color: COLORS.green, padding: '6px 8px', borderBottom: `1px solid ${COLORS.white10}` }}>{fmt(s.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card>
          <SectionLabel>USE OF FUNDS — EQUITY ($7.5M)</SectionLabel>
          <div style={{ marginTop: 8 }}>
            {/* Stacked bar */}
            <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 28, marginBottom: 12 }}>
              {equityFunds.map((f, i) => {
                const colors = [COLORS.blue, COLORS.green, COLORS.orange, '#9966ff', COLORS.white40, COLORS.red];
                return (
                  <div key={i} style={{ width: `${f.pct}%`, background: colors[i % colors.length], opacity: 0.7 }}
                    title={`${f.cat}: ${f.pct}%`} />
                );
              })}
            </div>
            {equityFunds.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${COLORS.white10}` }}>
                <span style={{ color: COLORS.white60, fontSize: '0.7rem', fontFamily: 'monospace' }}>{f.cat}</span>
                <span style={{ color: COLORS.white, fontSize: '0.7rem', fontFamily: 'monospace' }}>{fmt(f.amount)} ({f.pct}%)</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>USE OF FUNDS — DEBT ($2.5M — ZEECO FACILITY)</SectionLabel>
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 28, marginBottom: 12 }}>
              {debtFunds.map((f, i) => {
                const colors = [COLORS.orange, COLORS.blue, COLORS.white40];
                return (
                  <div key={i} style={{ width: `${f.pct}%`, background: colors[i % colors.length], opacity: 0.7 }}
                    title={`${f.cat}: ${f.pct}%`} />
                );
              })}
            </div>
            {debtFunds.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${COLORS.white10}` }}>
                <span style={{ color: COLORS.white60, fontSize: '0.7rem', fontFamily: 'monospace' }}>{f.cat}</span>
                <span style={{ color: COLORS.white, fontSize: '0.7rem', fontFamily: 'monospace' }}>{fmt(f.amount)} ({f.pct}%)</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 6 }}>
            <SectionLabel>SEED ROUND TERMS</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
              {[
                ['Pre-Money', '$40M'],
                ['Post-Money', '$47.5M'],
                ['Dilution', '15.8%'],
                ['Structure', '$7.5M eq + $2.5M debt'],
              ].map(([l, v], i) => (
                <div key={i}>
                  <div style={{ color: COLORS.white40, fontSize: '0.6rem', fontFamily: 'monospace' }}>{l}</div>
                  <div style={{ color: COLORS.white, fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <SectionLabel>EXIT VALUATION — SEED INVESTOR RETURNS (FY7)</SectionLabel>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              {['Basis', 'Multiple', 'EV ($M)', 'Seed Value ($M)', 'Seed ROI'].map(h => (
                <th key={h} style={{ color: COLORS.white40, textAlign: 'left', padding: '8px 12px', borderBottom: `1px solid ${COLORS.white10}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SENSITIVITY.exitValuation.map((e, i) => (
              <tr key={i}>
                <td style={{ color: COLORS.white, padding: '8px 12px', borderBottom: `1px solid ${COLORS.white10}` }}>{e.basis}</td>
                <td style={{ color: COLORS.orange, padding: '8px 12px', borderBottom: `1px solid ${COLORS.white10}` }}>{e.mult}</td>
                <td style={{ color: COLORS.white60, padding: '8px 12px', borderBottom: `1px solid ${COLORS.white10}` }}>${e.ev.toLocaleString()}M</td>
                <td style={{ color: COLORS.green, padding: '8px 12px', borderBottom: `1px solid ${COLORS.white10}`, fontWeight: 600 }}>${e.seedVal}M</td>
                <td style={{ color: COLORS.green, padding: '8px 12px', borderBottom: `1px solid ${COLORS.white10}`, fontWeight: 700, fontSize: '0.85rem',
                  textShadow: `0 0 10px ${COLORS.green}30`,
                }}>{e.roi}x</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ color: COLORS.white40, fontSize: '0.68rem', fontFamily: 'monospace', marginTop: 16, lineHeight: 1.5 }}>
          Note: Model shows 12 targeted facilities. Domestic market supports 100+ sites. International expansion not modeled.
          Additional capital may be raised to accelerate beyond base plan. Ownership assumes standard pro-rata dilution through Series A, B, C rounds.
        </div>
      </Card>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN DASHBOARD COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const tabContent = useMemo(() => [
    <InvestmentThesis key={0} />,
    <RevenueGrowth key={1} />,
    <Profitability key={2} />,
    <UnitEconomics key={3} />,
    <FacilityDeployment key={4} />,
    <TaxCredit45V key={5} />,
    <SensitivityTab key={6} />,
    <CapTableTab key={7} />,
  ], []);

  return (
    <div style={{
      background: COLORS.bg, minHeight: '100vh', color: COLORS.white,
      fontFamily: '"IBM Plex Mono", "Courier New", monospace', padding: '24px 32px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ color: COLORS.orange, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            TOBE ENERGY CORP — INVESTOR DATA ROOM
          </div>
          <div style={{ color: COLORS.white, fontSize: '1.4rem', fontWeight: 700, marginTop: 4 }}>
            Financial Model Dashboard
          </div>
          <div style={{ color: COLORS.white40, fontSize: '0.7rem', marginTop: 2 }}>
            Seed Round — $10M at $40M Pre-Money · Membrane-Free Green Hydrogen Electrolysis
          </div>
        </div>
        <div style={{ color: COLORS.white40, fontSize: '0.65rem', textAlign: 'right' }}>
          <div>March 2026 · v1.0</div>
          <div>CONFIDENTIAL</div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: 'flex', gap: 2, marginBottom: 28, overflowX: 'auto',
        borderBottom: `1px solid ${COLORS.white10}`, paddingBottom: 0,
      }}>
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              background: activeTab === i ? `${COLORS.orange}20` : 'transparent',
              border: 'none',
              borderBottom: activeTab === i ? `2px solid ${COLORS.orange}` : '2px solid transparent',
              color: activeTab === i ? COLORS.orange : COLORS.white40,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.65rem',
              fontWeight: 600,
              padding: '10px 16px',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabContent[activeTab]}
      </motion.div>

      {/* Footer */}
      <div style={{
        marginTop: 48, paddingTop: 16, borderTop: `1px solid ${COLORS.white10}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ color: COLORS.white40, fontSize: '0.65rem', fontFamily: 'monospace' }}>
          All figures from Tobe_Energy_Financial_Model_FINAL.xlsx · Model v1.0 · Sources: TEA v3.0, v8.5.3 Financial Model, OU Irani Center
        </div>
        <a href="#" style={{
          color: COLORS.orange, fontSize: '0.7rem', fontFamily: 'monospace',
          textDecoration: 'none', border: `1px solid ${COLORS.orange}40`,
          padding: '6px 14px', borderRadius: 4,
        }}>
          [Download Full Financial Model (.xlsx)]
        </a>
      </div>
    </div>
  );
}
