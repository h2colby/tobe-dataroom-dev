'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

function SectionDivider() {
  return (
    <div className="my-4 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
      <span className="font-mono text-xs tracking-[0.3em] text-[#ff6b35]/30"
        style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}>═══════</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
    </div>
  );
}

const costBreakdown = [
  ['Electricity (42 kWh/kg @ $0.035/kWh)', '$1.47/kg'],
  ['Compression & Purification', '$0.12/kg'],
  ['Transportation (50 mi)', '$0.90/kg'],
  ['RO Water', '$0.05/kg'],
  ['Direct OpEx', '$2.54/kg'],
  ['CAPEX & Personnel', '$2.86/kg'],
  ['Total Breakeven (Yr 3)', '$5.40/kg'],
  ['Selling Price (30% margin)', '$7.05/kg delivered'],
];

const pricingComparison = [
  { source: 'Tobe Energy', price: '$7.05', terms: 'Delivered 50 mi, 30% margin', subsidies: 'None', highlight: true },
  { source: 'Tobe Energy', price: '~$4.05', terms: 'Delivered 50 mi, 30% margin', subsidies: 'With 45V', highlight: true },
  { source: 'Plug Power (conventional)', price: '$7.20–13.90', terms: 'Pickup only, liquid, no delivery', subsidies: 'None', highlight: false },
  { source: 'Grey H₂ (spot, delivered)', price: '$8–15', terms: 'Delivered, spot', subsidies: 'None', highlight: false },
  { source: 'Grey H₂ (pipeline)', price: '$0.90–1.00', terms: 'Pipeline, USGC contract', subsidies: 'None', highlight: false },
  { source: 'Green H₂ (California)', price: '$10–19', terms: 'At gate', subsidies: 'Excl. 45V', highlight: false },
  { source: 'Retail pump (CA)', price: '$29.99–36', terms: 'Dispensed', subsidies: 'Various', highlight: false },
];

const startupComparison = [
  { label: 'Founded', tobe: '2024', ai: '2017', fourier: '2021', hgen: '2021' },
  { label: 'Employees', tobe: '9', ai: '26', fourier: '5', hgen: '6' },
  { label: 'Total Raised', tobe: '$1.8M', ai: '$21.1M', fourier: '$23.6M', hgen: '$7M' },
  { label: 'Lead Investors', tobe: 'Cortado Ventures', ai: 'bp, Mitsubishi', fourier: 'Airbus, General Catalyst', hgen: '776, Founders Fund' },
  { label: 'Valuation', tobe: 'Raising seed', ai: '$42.3M (pre)', fourier: '$62M (pre)', hgen: '$25M (post)' },
  { label: 'Electrolysis Type', tobe: 'Isothermal, membrane-free', ai: 'Vapor-phase (300°C)', fourier: 'PEM (conventional)', hgen: 'Modular electrolyzer' },
  { label: 'Operating Temp', tobe: '<30°C', ai: '~300°C', fourier: '60–80°C', hgen: 'Unknown' },
  { label: 'Membrane', tobe: 'None', ai: 'None (vapor)', fourier: 'PEM (degrades)', hgen: 'Unknown' },
  { label: 'Rare Earths', tobe: 'None', ai: 'Nickel + SS', fourier: 'Pt, IrO₂', hgen: 'Unknown' },
  { label: 'Pilot Active Area', tobe: '6,400 cm²', ai: '800 cm²', fourier: '~500 cm²', hgen: 'Small' },
  { label: 'Pilot Cost', tobe: '~$300K', ai: '~$4M', fourier: '~$5M', hgen: 'Unknown' },
  { label: 'Key Investors', tobe: 'Cortado, Techstars', ai: 'bp, Mitsubishi', fourier: 'Airbus, General Catalyst', hgen: '776, Founders Fund, Breakthrough Energy' },
  { label: 'Manufacturing', tobe: 'Full in-house', ai: 'Partnered', fourier: 'Assembly only', hgen: 'Hawthorne, CA' },
  { label: 'Commercial Deploy', tobe: 'Q4 2026 (Zeeco)', ai: 'Not yet', fourier: 'Not yet', hgen: 'Not yet' },
  { label: 'Published Pricing', tobe: 'Yes (Platts)', ai: 'No', fourier: 'No', hgen: 'No' },
];

const timelineEvents = [
  { year: '2017', label: 'Advanced Ionics founded', type: 'competitor' as const },
  { year: '2021', label: 'Fourier + HGen founded', type: 'competitor' as const },
  { year: '2024', label: 'Tobe Energy founded', type: 'tobe' as const },
  { year: 'Nov 2024', label: 'Advanced Ionics raises $16.7M Series A', type: 'competitor' as const },
  { year: 'Dec 2024', label: 'Fourier raises $18.5M Series A', type: 'competitor' as const },
  { year: '2025', label: 'Tobe raises $1.8M pre-seed', type: 'tobe' as const },
  { year: 'Q4 2026', label: 'Tobe deploys 600kW commercial system at Zeeco ARC', type: 'milestone' as const },
  { year: '2026+', label: 'Advanced Ionics, Fourier, HGen — still at lab scale', type: 'stale' as const },
];

export default function ComparisonPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── COMPETITIVE ANALYSIS ───┐`}
          </pre>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-4xl font-bold tracking-tight md:text-5xl"
          >
            The Comparison{' '}
            <span className="text-[#ff6b35]" style={{ textShadow: '0 0 12px rgba(255,107,53,0.5)' }}>
              Nobody Else Will Make
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-xl font-bold tracking-tight text-[#ff6b35] md:text-2xl"
            style={{ textShadow: '0 0 12px rgba(255,107,53,0.3)' }}
          >
            Published pricing. Real benchmarks. Transparent methodology.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl font-sans text-lg leading-relaxed text-white/60"
          >
            Most hydrogen companies avoid direct comparisons because the assumptions are never
            apples-to-apples. We submitted our full cost methodology to S&amp;P Global Platts.
            Here&apos;s how we stack up.
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">

        {/* ═══ SECTION 1: WHY HYDROGEN PRICING IS BROKEN ═══ */}
        <section className="py-6">
          <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── WHY HYDROGEN PRICING IS BROKEN ───┐
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="border-l-[3px] border-[#ff4444] bg-[#12121a] px-6 py-6"
            style={{ borderTop: '1px solid rgba(255,68,68,0.08)', borderRight: '1px solid rgba(255,68,68,0.08)', borderBottom: '1px solid rgba(255,68,68,0.08)' }}
          >
            <div className="mb-3 text-[0.7rem] tracking-[0.18em] text-[#ff4444]/80">THE PROBLEM</div>
            <div className="space-y-3 font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
              <p>
                Hydrogen cost claims are built on sand. Some companies report <span className="text-white/90">stack-only efficiency</span> and
                ignore system losses. Electricity assumptions vary wildly — from $0.02/kWh to $0.06/kWh — and are
                rarely disclosed. The DOE estimates <span className="text-[#ff6b35]">delivery is 75–85% of total hydrogen cost</span>,
                yet most &ldquo;cost per kg&rdquo; figures exclude it entirely.
              </p>
              <p>
                Margins are sometimes included, sometimes not. Subsidies are baked in or excluded without disclosure.
                The result: <span className="text-white/90">everyone sounds cheap when they pick their own assumptions</span>.
                We decided to let a third party check ours.
              </p>
            </div>
          </motion.div>
        </section>

        <SectionDivider />

        {/* ═══ SECTION 2: PLATTS PUBLISHED PRICING ═══ */}
        <section className="py-6">
          <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── PLATTS PUBLISHED PRICING ───┐
          </div>

          <div className="mb-2 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">01 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Our Cost Breakdown</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 overflow-hidden border border-white/5 bg-[#12121a]"
          >
            <div className="grid grid-cols-2 border-b border-white/10 bg-[#0e0e16]">
              <div className="px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#6a6a7a]">COMPONENT</div>
              <div className="border-l border-white/5 px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#6a6a7a]">COST</div>
            </div>
            {costBreakdown.map(([component, cost], i) => {
              const isTotal = i >= 6;
              return (
                <div key={component} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'} ${isTotal ? 'border-t border-white/10' : ''}`}>
                  <div className={`px-5 py-3 text-sm ${isTotal ? 'font-bold text-white/80' : 'text-white/60'}`}>{component}</div>
                  <div className={`border-l border-white/5 px-5 py-3 text-sm font-bold ${isTotal ? 'text-[#ff6b35]' : 'text-[#ff6b35]'}`}
                    style={isTotal ? { textShadow: '0 0 6px rgba(255,107,53,0.15)' } : {}}>{cost}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Pricing comparison table */}
          <div className="mb-2 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">02 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Market Price Comparison</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="mb-6 overflow-x-auto"
          >
            <div className="min-w-[700px] overflow-hidden border border-white/5 bg-[#12121a]">
              <div className="grid grid-cols-4 border-b border-white/10 bg-[#0e0e16]">
                <div className="px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#6a6a7a]">SOURCE</div>
                <div className="border-l border-white/5 px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#6a6a7a]">$/KG</div>
                <div className="border-l border-white/5 px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#6a6a7a]">TERMS</div>
                <div className="border-l border-white/5 px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#6a6a7a]">SUBSIDIES</div>
              </div>
              {pricingComparison.map((row, i) => (
                <div key={`${row.source}-${row.price}`} className={`grid grid-cols-4 ${row.highlight ? 'bg-[#ff6b35]/[0.04]' : i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'}`}>
                  <div className={`px-5 py-3 text-sm ${row.highlight ? 'font-bold text-[#ff6b35]' : 'text-white/60'}`}
                    style={row.highlight ? { textShadow: '0 0 6px rgba(255,107,53,0.15)' } : {}}>{row.source}</div>
                  <div className={`border-l border-white/5 px-5 py-3 text-sm font-bold ${row.highlight ? 'text-[#ff6b35]' : 'text-white/50'}`}
                    style={row.highlight ? { textShadow: '0 0 6px rgba(255,107,53,0.15)' } : {}}>{row.price}</div>
                  <div className="border-l border-white/5 px-5 py-3 text-sm text-white/40">{row.terms}</div>
                  <div className="border-l border-white/5 px-5 py-3 text-sm text-white/40">{row.subsidies}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Callout card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="mb-4 border-l-[3px] border-[#ff6b35] bg-[#ff6b35]/[0.04] px-6 py-6"
            style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}
          >
            <p className="font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
              <span className="text-white/90">Plug Power</span>, with <span className="text-[#ff6b35]">$5B+ in funding</span>,
              sells conventional hydrogen at <span className="text-white/90">$7–14/kg pickup only</span>.
              We deliver green hydrogen at{' '}
              <span className="text-[#ff6b35] font-bold" style={{ textShadow: '0 0 6px rgba(255,107,53,0.2)' }}>$7.05/kg</span>{' '}
              with a 30% margin built in.{' '}
              <span className="text-white/90">Without any subsidies.</span>
            </p>
          </motion.div>

          <p className="text-xs text-[#6a6a7a]">
            Source: S&amp;P Global Commodity Insights / Platts Hydrogen Price Index
          </p>
        </section>

        <SectionDivider />

        {/* ═══ SECTION 3: NON-CONVENTIONAL ELECTROLYSIS STARTUPS ═══ */}
        <section className="py-6">
          <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── NON-CONVENTIONAL ELECTROLYSIS STARTUPS ───┐
          </div>

          <div className="mb-2 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">03 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Startup Benchmarks</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-6 border-l-[3px] border-[#ff6b35] pl-5"
          >
            <p className="font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
              Before raising our pre-seed, we had a larger, more capable pilot than companies that raised{' '}
              <span className="text-[#ff6b35]">10× more capital</span>.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="overflow-x-auto"
          >
            <div className="min-w-[800px] overflow-hidden border border-white/5 bg-[#12121a]">
              <div className="grid grid-cols-5 border-b border-white/10 bg-[#0e0e16]">
                <div className="px-4 py-3 text-[0.6rem] tracking-[0.15em] text-[#6a6a7a]">METRIC</div>
                <div className="border-l border-white/5 px-4 py-3 text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">TOBE ENERGY</div>
                <div className="border-l border-white/5 px-4 py-3 text-[0.6rem] tracking-[0.15em] text-[#6a6a7a]">ADVANCED IONICS</div>
                <div className="border-l border-white/5 px-4 py-3 text-[0.6rem] tracking-[0.15em] text-[#6a6a7a]">FOURIER</div>
                <div className="border-l border-white/5 px-4 py-3 text-[0.6rem] tracking-[0.15em] text-[#6a6a7a]">HGEN</div>
              </div>
              {startupComparison.map((row, i) => {
                const tobeWins = ['None', '<30°C', '6,400 cm²', '~$300K', 'Full in-house', 'Q4 2026 (Zeeco)', 'Yes (Platts)', 'Isothermal, membrane-free'].includes(row.tobe);
                return (
                  <div key={row.label} className={`grid grid-cols-5 ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'}`}>
                    <div className="px-4 py-3 text-[0.8rem] text-white/50">{row.label}</div>
                    <div className={`border-l border-white/5 px-4 py-3 text-[0.8rem] font-bold ${tobeWins ? 'text-[#ff6b35]' : 'text-[#ff6b35]'}`}
                      style={tobeWins ? { textShadow: '0 0 6px rgba(255,107,53,0.15)' } : {}}>{row.tobe}</div>
                    <div className="border-l border-white/5 px-4 py-3 text-[0.8rem] text-white/35">{row.ai}</div>
                    <div className="border-l border-white/5 px-4 py-3 text-[0.8rem] text-white/35">{row.fourier}</div>
                    <div className="border-l border-white/5 px-4 py-3 text-[0.8rem] text-white/35">{row.hgen}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <SectionDivider />

        {/* ═══ SECTION 4: CAPITAL EFFICIENCY ═══ */}
        <section className="py-6">
          <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── CAPITAL EFFICIENCY ───┐
          </div>

          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">04 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Cost Per cm² of Active Pilot Area</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6 grid gap-4 md:grid-cols-3"
          >
            {/* Tobe — hero stat */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="relative overflow-hidden rounded border-2 border-[#ff6b35]/40 bg-[#ff6b35]/[0.06] p-8 text-center"
              style={{ boxShadow: '0 0 30px rgba(255,107,53,0.1), inset 0 0 30px rgba(255,107,53,0.03)' }}
            >
              <div className="mb-2 text-[0.65rem] tracking-[0.2em] text-[#ff6b35]">TOBE ENERGY</div>
              <div className="text-5xl font-bold text-[#ff6b35] md:text-6xl"
                style={{ textShadow: '0 0 20px rgba(255,107,53,0.4), 0 0 40px rgba(255,107,53,0.15)' }}>
                $47
              </div>
              <div className="mt-1 text-sm text-[#ff6b35]/60">per cm²</div>
            </motion.div>

            {/* Advanced Ionics */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="rounded border border-white/10 bg-[#12121a] p-8 text-center"
            >
              <div className="mb-2 text-[0.65rem] tracking-[0.2em] text-[#6a6a7a]">ADVANCED IONICS</div>
              <div className="text-5xl font-bold text-white/25 md:text-6xl">$5,000</div>
              <div className="mt-1 text-sm text-white/20">per cm²</div>
            </motion.div>

            {/* Fourier */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="rounded border border-white/10 bg-[#12121a] p-8 text-center"
            >
              <div className="mb-2 text-[0.65rem] tracking-[0.2em] text-[#6a6a7a]">FOURIER</div>
              <div className="text-5xl font-bold text-white/25 md:text-6xl">~$10K</div>
              <div className="mt-1 text-sm text-white/20">per cm²</div>
            </motion.div>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="mb-4 text-center font-sans text-sm text-white/40"
          >
            100× more capital efficient than the next closest non-conventional startup.
          </motion.p>

          {/* Callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="border-l-[3px] border-[#ff6b35] bg-[#ff6b35]/[0.04] px-6 py-5"
            style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}
          >
            <p className="font-sans text-[0.95rem] italic leading-relaxed text-[#b0b0c0]">
              &ldquo;This is what happens when the welders CNC their own PCBs.&rdquo;
            </p>
          </motion.div>
        </section>

        <SectionDivider />

        {/* ═══ SECTION 5: TIMELINE ═══ */}
        <section className="py-6">
          <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── TIMELINE ───┐
          </div>

          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">05 //</span>
            <h2 className="text-2xl font-bold tracking-tight">From Founded to Deployed</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative ml-4 border-l-2 border-white/10 pl-8"
          >
            {timelineEvents.map((t, i) => {
              const color = t.type === 'tobe' ? '#00ff88'
                : t.type === 'milestone' ? '#00ff88'
                : t.type === 'stale' ? '#ff4444'
                : '#6a6a7a';
              const filled = t.type === 'tobe' || t.type === 'milestone';

              return (
                <motion.div
                  key={`${t.year}-${i}`}
                  custom={i}
                  variants={fadeUp}
                  className="relative mb-8 last:mb-0"
                >
                  <div
                    className="absolute -left-[2.55rem] top-1 h-3 w-3 rounded-full border-2"
                    style={{
                      borderColor: color,
                      backgroundColor: filled ? color : 'transparent',
                      boxShadow: filled ? `0 0 8px ${color}80` : 'none',
                    }}
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <span className="text-sm font-bold" style={{ color }}>
                      {t.year}
                    </span>
                    <span className={`text-sm ${t.type === 'stale' ? 'text-white/30 italic' : 'text-white/70'}`}>
                      {t.label}
                    </span>
                    {t.type === 'milestone' && (
                      <span className="inline-block rounded border border-[#00ff88]/40 bg-[#00ff88]/10 px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.15em] text-[#00ff88]">
                        COMMERCIAL DEPLOYMENT
                      </span>
                    )}
                    {t.type === 'stale' && (
                      <span className="inline-block rounded border border-[#ff4444]/30 bg-[#ff4444]/10 px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.15em] text-[#ff4444]/70">
                        LAB SCALE
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>


        </section>

        <SectionDivider />
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl text-center">
          <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
{`TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024
CONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
