'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const creditTiers = [
  { credit: '$3.00/kg', threshold: '< 0.45 kgCO₂e', highlight: true, label: 'TOBE TARGET' },
  { credit: '$1.00/kg', threshold: '< 1.50 kgCO₂e', highlight: false },
  { credit: '$0.75/kg', threshold: '< 2.50 kgCO₂e', highlight: false },
  { credit: '$0.60/kg', threshold: '< 4.00 kgCO₂e', highlight: false },
];

const gridMix = [
  { source: 'Wind', pct: 36.6, color: '#00ff88' },
  { source: 'Coal', pct: 31.8, color: '#ff4444' },
  { source: 'Gas', pct: 21.4, color: '#ff6b35' },
  { source: 'Nuclear', pct: 5.0, color: '#00d4ff' },
  { source: 'Hydro', pct: 4.3, color: '#4488ff' },
  { source: 'Other', pct: 0.6, color: '#6a6a7a' },
];

const ppaScenarios = [
  { clean: '0%', intensity: '18.51', tier: 'None', icon: '❌', credit: '$0' },
  { clean: '50%', intensity: '9.26', tier: 'None', icon: '❌', credit: '$0' },
  { clean: '90%', intensity: '1.85', tier: '$0.75/kg', icon: '⚡', credit: '$0.75/kg' },
  { clean: '95%', intensity: '0.93', tier: '$1.00/kg', icon: '⚡', credit: '$1.00/kg' },
  { clean: '100%', intensity: '0.00', tier: '$3.00/kg', icon: '⭐', credit: '$3.00/kg' },
];

const competitors = [
  { name: 'Tobe', kwh: 42, gwh: '37.8', ppa: '$1.13M', net: '$1.57M', highlight: true },
  { name: 'PEM', kwh: 55, gwh: '49.5', ppa: '$1.49M', net: '$1.21M', highlight: false },
  { name: 'ALK', kwh: 60, gwh: '54.0', ppa: '$1.62M', net: '$1.08M', highlight: false },
];

const risks = [
  { title: 'Begin-Construction Deadline', desc: 'Facilities must begin construction by Dec 2027 (proposed). Timeline pressure for first facilities.' },
  { title: 'Hourly Matching Requirements', desc: 'Treasury may require hourly (not annual) matching of clean energy to hydrogen production. Final rule TBD.' },
  { title: 'Additionality Rules', desc: 'Clean energy sources may need to be "new" capacity built specifically for hydrogen production.' },
  { title: 'Political / Regulatory Risk', desc: 'Future administrations could modify or repeal 45V provisions. 10-year credit window mitigates but does not eliminate.' },
];

export default function TaxCreditsPage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* SECTION 1: 45V OVERVIEW */}
      <section className="relative border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 06 ─── 45V TAX CREDIT STRATEGY ─────────────┐`}
          </pre>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-sm tracking-widest text-[#ff6b35] uppercase"
          >
            ▸ Section 06 // Clean Energy Tax Credits
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            45V:{' '}
            <span className="text-[#00ff88]" style={{ textShadow: '0 0 10px rgba(0,255,136,0.5)' }}>
              $3.00/kg
            </span>{' '}
            Advantage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-white/60"
          >
            Tobe&apos;s efficiency means less clean power needed per kg — turning the 45V production tax credit from a cost center into a profit engine.
          </motion.p>

          {/* Credit tier ladder */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="mb-4 text-sm font-semibold text-[#ff6b35]">▸ 45V CREDIT TIERS — LIFECYCLE EMISSIONS</p>
            <pre className="mb-4 text-[0.65rem] text-white/30 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`    CREDIT         THRESHOLD           STATUS
    ─────────────────────────────────────────────`}
            </pre>
            <div className="space-y-2">
              {creditTiers.map((tier, i) => (
                <motion.div
                  key={tier.credit}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 1}
                  variants={fadeUp}
                  className={`flex items-center gap-4 rounded px-4 py-3 ${
                    tier.highlight
                      ? 'border border-[#00ff88]/30 bg-[#00ff88]/[0.05]'
                      : 'border border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <span
                    className={`w-24 text-xl font-bold ${tier.highlight ? 'text-[#00ff88]' : 'text-white/60'}`}
                    style={tier.highlight ? { textShadow: '0 0 10px rgba(0,255,136,0.5)' } : {}}
                  >
                    {tier.credit}
                  </span>
                  <span className="text-sm text-white/50">←</span>
                  <span className={`text-sm ${tier.highlight ? 'text-white/80' : 'text-white/50'}`}>
                    {tier.threshold}
                  </span>
                  {tier.highlight && (
                    <span className="ml-auto rounded bg-[#00ff88]/10 px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-[#00ff88]">
                      ★ {tier.label}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <pre className="mt-6 text-[0.55rem] leading-tight text-[#00d4ff]/40 sm:text-[0.65rem]" style={{ whiteSpace: 'pre' }}>
{`    ┌─────────────────────────────────────────────────────┐
    │  Lower emissions = Higher credit                    │
    │  Tobe's 42 kWh/kg efficiency + 100% renewable PPA  │
    │  = Effectively ZERO lifecycle emissions             │
    │  = Maximum $3.00/kg credit tier                     │
    └─────────────────────────────────────────────────────┘`}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: OKLAHOMA GRID ANALYSIS */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 06.1 ─── OKLAHOMA GRID ANALYSIS ────────────┐`}
          </pre>
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">01 //</span>
            <h2 className="text-2xl font-bold tracking-tight">SPP/Plains Grid Emission Profile</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="rounded border border-white/10 bg-white/[0.02] p-6"
          >
            {/* Stacked horizontal bar */}
            <p className="mb-4 text-sm font-semibold text-[#ff6b35]">▸ GRID GENERATION MIX — SPP/PLAINS REGION</p>
            <div className="mb-4 flex h-10 w-full overflow-hidden rounded">
              {gridMix.map((g) => (
                <motion.div
                  key={g.source}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${g.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex items-center justify-center text-[0.55rem] font-bold text-black sm:text-[0.65rem]"
                  style={{ backgroundColor: g.color, minWidth: g.pct > 3 ? undefined : '20px' }}
                >
                  {g.pct > 8 ? `${g.source} ${g.pct}%` : ''}
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="mb-6 flex flex-wrap gap-4">
              {gridMix.map((g) => (
                <div key={g.source} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: g.color }} />
                  <span className="text-[0.65rem] text-white/60">{g.source}: {g.pct}%</span>
                </div>
              ))}
            </div>

            {/* Weighted intensity */}
            <div className="mb-4 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Weighted Grid Intensity</span>
                <span
                  className="text-xl font-bold text-[#ff6b35]"
                  style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                >
                  440.8 gCO₂eq/kWh
                </span>
              </div>
            </div>

            <div className="rounded border border-[#00d4ff]/20 bg-[#00d4ff]/[0.03] px-4 py-3">
              <p className="text-xs text-[#00d4ff]">
                ● INSIGHT: Despite 36.6% wind penetration, coal (31.8%) + gas (21.4%) = 53.2% fossil generation.
                Grid-only electrolysis produces ~18.5 kgCO₂e/kgH₂ — far above any 45V tier. A renewable PPA is <span className="font-bold">required</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: RENEWABLE PPA SCENARIOS */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 06.2 ─── RENEWABLE PPA SCENARIOS ───────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">02 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Clean Energy Procurement Scenarios</h2>
          </div>

          {/* Table header */}
          <div className="hidden rounded-t border border-white/10 bg-white/[0.04] px-6 py-3 text-xs tracking-[0.1em] text-[#ff6b35] md:grid md:grid-cols-4 md:gap-4">
            <span>▸ CLEAN ENERGY %</span>
            <span>▸ LIFECYCLE kgCO₂e</span>
            <span>▸ 45V TIER</span>
            <span>▸ CREDIT/kg</span>
          </div>

          {ppaScenarios.map((s, i) => (
            <motion.div
              key={s.clean}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className={`grid grid-cols-2 gap-4 border border-t-0 border-white/10 px-6 py-4 transition-colors first:border-t first:rounded-t md:first:rounded-t-none md:grid-cols-4 ${
                hoveredRow === i
                  ? s.icon === '⭐'
                    ? 'bg-[#00ff88]/[0.06]'
                    : 'bg-white/[0.04]'
                  : s.icon === '⭐'
                    ? 'bg-[#00ff88]/[0.03]'
                    : 'bg-white/[0.02]'
              }`}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div>
                <span className="text-xs text-white/30 md:hidden">CLEAN </span>
                <span className={`font-bold ${s.icon === '⭐' ? 'text-[#00ff88]' : 'text-white/80'}`}>
                  {s.clean}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">CO₂e </span>
                <span className="text-white/60">{s.intensity} kgCO₂e</span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">TIER </span>
                <span>{s.icon} {s.tier}</span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">CREDIT </span>
                <span
                  className={`font-bold ${s.icon === '⭐' ? 'text-[#00ff88]' : s.icon === '⚡' ? 'text-[#00d4ff]' : 'text-white/30'}`}
                  style={s.icon === '⭐' ? { textShadow: '0 0 10px rgba(0,255,136,0.5)' } : {}}
                >
                  {s.credit}
                </span>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            variants={fadeUp}
            className="mt-4 rounded border border-[#00ff88]/20 bg-[#00ff88]/[0.03] px-4 py-3"
          >
            <p className="text-xs text-[#00ff88]">
              ● 100% RENEWABLE PPA = $3.00/kg CREDIT. THE PPA COST IS THE GATEWAY TO $2.7M/yr PER FACILITY.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: PPA ROI — THE MONEY SHOT */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 06.3 ─── PPA RETURN ON INVESTMENT ──────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">03 //</span>
            <h2 className="text-2xl font-bold tracking-tight">The 45V Economics</h2>
          </div>

          {/* Big numbers grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="rounded border border-white/10 bg-white/[0.02] p-6 text-center"
            >
              <p className="mb-1 text-xs tracking-[0.15em] text-[#ff6b35]">▸ ANNUAL PPA COST</p>
              <p className="text-3xl font-bold text-white/70">~$1.1M</p>
              <p className="mt-1 text-xs text-white/40">100% renewable electricity</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="rounded border border-[#00ff88]/30 bg-[#00ff88]/[0.05] p-6 text-center"
            >
              <p className="mb-1 text-xs tracking-[0.15em] text-[#ff6b35]">▸ ANNUAL 45V CREDIT</p>
              <p
                className="text-4xl font-bold text-[#00ff88]"
                style={{ textShadow: '0 0 15px rgba(0,255,136,0.5)' }}
              >
                $2.7M
              </p>
              <p className="mt-1 text-xs text-white/40">900,000 kg × $3.00/kg</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="rounded border border-[#00d4ff]/30 bg-[#00d4ff]/[0.05] p-6 text-center"
            >
              <p className="mb-1 text-xs tracking-[0.15em] text-[#ff6b35]">▸ NET BENEFIT</p>
              <p
                className="text-4xl font-bold text-[#00d4ff]"
                style={{ textShadow: '0 0 15px rgba(0,212,255,0.5)' }}
              >
                $1.6M/yr
              </p>
              <p className="mt-1 text-xs text-white/40">Per facility, per year</p>
            </motion.div>
          </div>

          {/* 10-year callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="mb-8 rounded border border-[#00ff88]/30 bg-[#00ff88]/[0.05] p-8 text-center"
          >
            <p className="mb-2 text-xs tracking-[0.15em] text-[#ff6b35]">▸ 10-YEAR CREDIT VALUE PER FACILITY</p>
            <p
              className="text-6xl font-bold text-[#00ff88] md:text-7xl"
              style={{ textShadow: '0 0 20px rgba(0,255,136,0.5)' }}
            >
              $16M
            </p>
            <p className="mt-2 text-sm text-white/50">Net of PPA costs. Pure upside from clean production.</p>
          </motion.div>

          {/* Multi-facility scale */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="mb-4 text-sm font-semibold text-[#ff6b35]">▸ MULTI-FACILITY SCALE</p>
            {[
              { facilities: 1, annual: '$2.7M', decade: '$27M' },
              { facilities: 4, annual: '$10.8M', decade: '$108M' },
              { facilities: 12, annual: '$32.4M', decade: '$324M' },
            ].map((s, i) => (
              <div key={s.facilities} className="flex items-center justify-between border-b border-white/5 py-3 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white/50">{s.facilities} {s.facilities === 1 ? 'facility' : 'facilities'}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-white/30">annual </span>
                    <span
                      className="font-bold text-[#00d4ff]"
                      style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                    >
                      {s.annual}/yr
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white/30">10-yr </span>
                    <span
                      className="font-bold text-[#00ff88]"
                      style={{ textShadow: '0 0 10px rgba(0,255,136,0.5)' }}
                    >
                      {s.decade}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Progress bars for visual scale */}
            <div className="mt-4 space-y-2">
              {[
                { label: '1×', pct: 8 },
                { label: '4×', pct: 33 },
                { label: '12×', pct: 100 },
              ].map((bar) => (
                <pre key={bar.label} className="text-[0.6rem] text-[#00ff88]" style={{ whiteSpace: 'pre' }}>
{`${bar.label.padStart(3)} [${'█'.repeat(Math.round(bar.pct / 5))}${'░'.repeat(20 - Math.round(bar.pct / 5))}]`}
                </pre>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: EFFICIENCY ADVANTAGE */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 06.4 ─── EFFICIENCY ADVANTAGE ──────────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">04 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Efficiency = Lower PPA = Higher Net</h2>
          </div>

          {/* Competitor comparison table */}
          <div className="hidden rounded-t border border-white/10 bg-white/[0.04] px-6 py-3 text-xs tracking-[0.1em] text-[#ff6b35] md:grid md:grid-cols-5 md:gap-4">
            <span>▸ TECHNOLOGY</span>
            <span>▸ kWh/kg</span>
            <span>▸ GWh/yr</span>
            <span>▸ PPA COST</span>
            <span>▸ NET BENEFIT</span>
          </div>

          {competitors.map((c, i) => (
            <motion.div
              key={c.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className={`grid grid-cols-2 gap-4 border border-t-0 border-white/10 px-6 py-4 first:border-t first:rounded-t md:first:rounded-t-none md:grid-cols-5 ${
                c.highlight
                  ? 'bg-[#00ff88]/[0.05] border-l-2 border-l-[#00ff88]'
                  : 'bg-white/[0.02]'
              }`}
            >
              <div>
                <span className="text-xs text-white/30 md:hidden">TECH </span>
                <span className={`font-bold ${c.highlight ? 'text-[#00ff88]' : 'text-white/60'}`}>
                  {c.highlight && '▸ '}{c.name}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">kWh/kg </span>
                <span className={c.highlight ? 'text-[#00ff88] font-bold' : 'text-white/60'}>
                  {c.kwh} kWh/kg
                </span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">GWh/yr </span>
                <span className="text-white/60">{c.gwh} GWh/yr</span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">PPA </span>
                <span className="text-white/60">{c.ppa}</span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">NET </span>
                <span
                  className={`font-bold ${c.highlight ? 'text-[#00ff88]' : 'text-[#00d4ff]'}`}
                  style={c.highlight ? { textShadow: '0 0 10px rgba(0,255,136,0.5)' } : { textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                >
                  {c.net}/yr
                </span>
              </div>
            </motion.div>
          ))}

          {/* Big callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-8 rounded border border-[#00ff88]/30 bg-[#00ff88]/[0.05] p-8 text-center"
          >
            <pre className="mb-3 text-[0.6rem] text-[#00ff88]/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`╔═══════════════════════════════════════════════════════════╗
║  24-30% LESS CLEAN POWER NEEDED THAN COMPETITORS         ║
╚═══════════════════════════════════════════════════════════╝`}
            </pre>
            <p
              className="text-2xl font-bold text-[#00ff88] md:text-3xl"
              style={{ textShadow: '0 0 15px rgba(0,255,136,0.5)' }}
            >
              24-30% Less Clean Power
            </p>
            <p className="mt-2 text-sm text-white/50">
              Same hydrogen output. Lower PPA cost. Higher net credit value. Efficiency is the moat.
            </p>
          </motion.div>

          {/* ASCII comparison diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            variants={fadeUp}
          >
            <pre className="mt-6 text-[0.55rem] leading-tight text-[#00d4ff]/40 sm:text-[0.65rem]" style={{ whiteSpace: 'pre' }}>
{`    CLEAN ENERGY NEEDED PER 900t H₂/yr:
    ───────────────────────────────────────────────
    Tobe  42 kWh/kg  ████████████████░░░░░░░░  37.8 GWh
    PEM   55 kWh/kg  █████████████████████░░░  49.5 GWh
    ALK   60 kWh/kg  ██████████████████████░░  54.0 GWh
    ───────────────────────────────────────────────
                     Less power = Lower cost = Higher margin`}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: RISKS */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 06.5 ─── RISK FACTORS ──────────────────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">05 //</span>
            <h2 className="text-2xl font-bold tracking-tight">45V Risk Factors</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {risks.map((r, i) => (
              <motion.div
                key={r.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-5"
              >
                <p className="mb-2 text-sm font-semibold text-[#ff6b35]">⚠ {r.title}</p>
                <p className="text-sm leading-relaxed text-white/50">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-4 rounded border border-[#00d4ff]/20 bg-[#00d4ff]/[0.03] px-4 py-3"
          >
            <p className="text-xs text-[#00d4ff]">
              ● MITIGATION: Tobe&apos;s modular design enables rapid begin-construction compliance. Efficiency advantage holds regardless of matching methodology. 10-year credit window provides substantial value even with regulatory changes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-[0.6rem] tracking-[0.1em] text-white/30">
            Source: 45VH2-GREET (Rev. December 2025) · Argonne National Laboratory
          </p>
          <pre className="text-xs text-white/20" style={{ whiteSpace: 'pre' }}>
{`═══════════════════════════════════════════════════════════
 TOBE ENERGY CORP // CONFIDENTIAL // 2026
═══════════════════════════════════════════════════════════`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
