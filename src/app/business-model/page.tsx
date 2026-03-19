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

const unitEconomics = {
  tobeCost: '<$5/kg',
  marketPrices: [
    { source: 'Zeeco (Broken Arrow, OK)', price: '$30/kg', note: 'Actual quote' },
    { source: 'Tulsa Industrial', price: '$47/kg', note: 'Delivered w/ logistics' },
    { source: 'Seattle Metro', price: '$30+/kg', note: 'West Coast delivered' },
    { source: 'Airgas Bottles (15-pack)', price: '$100+/kg', note: 'Small-volume retail' },
  ],
};

const revenueStreams = [
  { label: 'H\u2082 Production', pct: 82, desc: 'Recurring, high-margin on-site hydrogen delivery', color: '#00d4ff' },
  { label: 'Equipment Sales', pct: 16, desc: 'T-25 and T-125 electrolyzer units', color: '#ff6b35' },
  { label: 'Services', pct: 2, desc: 'Maintenance, monitoring, and support contracts', color: '#00ff88' },
];

const financials = [
  { year: 'FY1', revenue: '$0.8M', ebitda: '\u2014', margin: '\u2014', note: 'Equipment sales only' },
  { year: 'FY2', revenue: '$16M', ebitda: 'Positive', margin: '~15%', note: 'First H\u2082 revenue' },
  { year: 'FY3', revenue: '$88M', ebitda: '$54.6M', margin: '62%', note: 'Scale inflection' },
  { year: 'FY5', revenue: '$210M', ebitda: '$136M', margin: '65%', note: 'Regional expansion' },
  { year: 'FY7', revenue: '$328M', ebitda: '$216M', margin: '66%', note: 'National footprint' },
];

const funding = [
  { round: 'Pre-Seed', amount: '$2M', status: 'CLOSED', detail: 'Technology validation & IP filing' },
  { round: 'Seed', amount: '$10M', status: 'RAISING', detail: '$7.5M equity + $2.5M debt @ 5.5%' },
];

const seedUse = [
  { label: 'T-125 Validation & Certification', pct: 35 },
  { label: 'Manufacturing Equipment', pct: 30 },
  { label: 'Team Scale (Eng + BD)', pct: 20 },
  { label: 'Working Capital', pct: 15 },
];

const moat = [
  { title: 'No Membrane', stat: '$0', desc: 'No rare earths = full supply chain independence. No iridium, no platinum, no geopolitical risk.' },
  { title: '94% HHV Efficiency', stat: '94%', desc: 'Lowest electricity cost per kg H\u2082. Near-theoretical maximum energy conversion.' },
  { title: 'Near-Ambient Operation', stat: '~25\u00b0C', desc: 'No cooling capex, no thermal management complexity. Simpler. Cheaper. Safer.' },
  { title: 'Vertical Integration', stat: 'OK, USA', desc: 'Oklahoma manufacturing = BABA compliant. Domestic supply chain end to end.' },
];

export default function BusinessModelPage() {
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

      {/* Hero */}
      <section className="relative border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 03 ─── BUSINESS MODEL ───────────────────────┐`}
          </pre>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-sm tracking-widest text-[#ff6b35] uppercase"
          >
            ▸ Section 03 // Business Model
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            How Tobe{' '}
            <span className="text-[#00ff88]" style={{ textShadow: '0 0 10px rgba(0,255,136,0.5)' }}>
              Makes Money
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-white/60"
          >
            Produce hydrogen for under $5/kg. Sell it at $20-50+/kg.
            80%+ gross margin at scale. Recurring revenue. No commodity dependency.
          </motion.p>

          {/* ASCII revenue flow diagram */}
          <pre className="mt-8 text-[0.6rem] leading-tight text-[#00ff88]/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`    ┌──────────┐     ┌───────────┐     ┌──────────┐
    │ PRODUCE  │────▶│   SELL    │────▶│  MARGIN  │
    │ <$5/kg   │     │ $20-50+  │     │  80%+    │
    └──────────┘     └───────────┘     └──────────┘
         │                │                 │
    Membrane-free    On-site delivery   Recurring
    low-cost mfg     long-term PPAs     cash flow`}
          </pre>
        </div>
      </section>

      {/* UNIT ECONOMICS */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 03.1 ─── UNIT ECONOMICS ─────────────────────┐`}
          </pre>
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">01 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Unit Economics</h2>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Tobe cost */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="rounded border border-[#00ff88]/20 bg-[#00ff88]/[0.03] p-6"
            >
              <p className="mb-1 text-xs tracking-[0.15em] text-[#ff6b35]">▸ TOBE ALL-IN COST</p>
              <p
                className="text-5xl font-bold text-[#00ff88]"
                style={{ textShadow: '0 0 10px rgba(0,255,136,0.5)' }}
              >
                {unitEconomics.tobeCost}
              </p>
              <p className="mt-2 text-sm text-white/50">Production + delivery. Fully loaded.</p>
            </motion.div>

            {/* Gross margin */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="rounded border border-[#00d4ff]/20 bg-[#00d4ff]/[0.03] p-6"
            >
              <p className="mb-1 text-xs tracking-[0.15em] text-[#ff6b35]">▸ GROSS MARGIN AT SCALE</p>
              <p
                className="text-5xl font-bold text-[#00d4ff]"
                style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
              >
                80%+
              </p>
              <p className="mt-2 text-sm text-white/50">Market sells at $20-50+. We produce at &lt;$5.</p>
            </motion.div>
          </div>

          {/* Market reality table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <p className="text-sm font-semibold text-[#ff6b35]">
                ▸ DELIVERED H&#x2082; MARKET REALITY
              </p>
              <span className="text-[0.65rem] text-white/30">// NOT ONLINE FANTASY</span>
            </div>
            <p className="mb-4 text-sm text-white/50">
              Online says $10-15/kg. The reality for delivered hydrogen is $20-50+. These are real quotes.
            </p>
            <div className="space-y-3">
              {unitEconomics.marketPrices.map((p, i) => (
                <motion.div
                  key={p.source}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 3}
                  variants={fadeUp}
                  className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0"
                >
                  <div>
                    <p className="text-sm text-white/80">{p.source}</p>
                    <p className="text-xs text-white/40">{p.note}</p>
                  </div>
                  <p
                    className="text-xl font-bold text-[#00d4ff]"
                    style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                  >
                    {p.price}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] px-4 py-3">
              <p className="text-xs text-[#ff6b35]">
                ● TAKEAWAY: The gap between Tobe&apos;s cost (&lt;$5) and market reality ($20-50+) is the business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVENUE STREAMS */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 03.2 ─── REVENUE STREAMS ────────────────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">02 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Revenue Streams</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {revenueStreams.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <p
                  className="text-4xl font-bold"
                  style={{ color: s.color, textShadow: `0 0 10px ${s.color}80` }}
                >
                  {s.pct}%
                </p>
                <p className="mt-2 text-sm font-semibold text-[#ff6b35]">▸ {s.label}</p>
                <p className="mt-1 text-sm text-white/50">{s.desc}</p>
                {/* Terminal-style progress bar */}
                <div className="mt-4">
                  <pre className="text-[0.6rem]" style={{ whiteSpace: 'pre', color: s.color }}>
{`[${'█'.repeat(Math.round(s.pct / 5))}${'░'.repeat(20 - Math.round(s.pct / 5))}] ${s.pct}%`}
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCIAL TRAJECTORY */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 03.3 ─── FINANCIAL TRAJECTORY ───────────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">03 //</span>
            <h2 className="text-2xl font-bold tracking-tight">7-Year Financial Trajectory</h2>
          </div>

          {/* Table header */}
          <div className="hidden rounded-t border border-white/10 bg-white/[0.04] px-6 py-3 text-xs tracking-[0.1em] text-[#ff6b35] md:grid md:grid-cols-5 md:gap-4">
            <span>▸ YEAR</span>
            <span>▸ REVENUE</span>
            <span>▸ EBITDA</span>
            <span>▸ MARGIN</span>
            <span>▸ MILESTONE</span>
          </div>

          {/* Table rows */}
          {financials.map((f, i) => (
            <motion.div
              key={f.year}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="grid grid-cols-2 gap-4 border border-t-0 border-white/10 bg-white/[0.02] px-6 py-4 first:border-t first:rounded-t md:first:rounded-t-none md:grid-cols-5"
            >
              <div>
                <span className="text-xs text-white/30 md:hidden">YEAR </span>
                <span className="font-bold text-white/80">{f.year}</span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">REV </span>
                <span
                  className="font-bold text-[#00ff88]"
                  style={{ textShadow: '0 0 10px rgba(0,255,136,0.5)' }}
                >
                  {f.revenue}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">EBITDA </span>
                <span
                  className="text-[#00d4ff]"
                  style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                >
                  {f.ebitda}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">MARGIN </span>
                <span className="text-white/70">{f.margin}</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-sm text-white/40">{f.note}</span>
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
              ● EBITDA POSITIVE BY YEAR 2. 66% MARGIN AT SCALE. CAPITAL-EFFICIENT GROWTH.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FUNDING ROADMAP */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 03.4 ─── FUNDING ROADMAP ────────────────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">04 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Funding Roadmap</h2>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {funding.map((f, i) => (
              <motion.div
                key={f.round}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#ff6b35]">▸ {f.round}</p>
                  <span
                    className={`rounded px-2 py-0.5 text-[0.65rem] font-bold tracking-wider ${
                      f.status === 'CLOSED'
                        ? 'bg-[#00ff88]/10 text-[#00ff88]'
                        : 'bg-[#ff6b35]/10 text-[#ff6b35]'
                    }`}
                  >
                    ● {f.status}
                  </span>
                </div>
                <p
                  className="text-3xl font-bold text-[#00d4ff]"
                  style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                >
                  {f.amount}
                </p>
                <p className="mt-2 text-sm text-white/50">{f.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Seed use of funds */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="mb-4 text-sm font-semibold text-[#ff6b35]">▸ SEED USE OF FUNDS</p>
            <div className="space-y-4">
              {seedUse.map((s, i) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-white/70">{s.label}</span>
                    <span
                      className="text-sm font-bold text-[#00d4ff]"
                      style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                    >
                      {s.pct}%
                    </span>
                  </div>
                  {/* Terminal-style progress bar */}
                  <pre className="text-[0.6rem] text-[#00d4ff]" style={{ whiteSpace: 'pre' }}>
{`[${'█'.repeat(Math.round(s.pct / 5))}${'░'.repeat(20 - Math.round(s.pct / 5))}]`}
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPETITIVE MOAT */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 03.5 ─── COMPETITIVE MOAT ───────────────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">05 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Competitive Moat</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {moat.map((m, i) => (
              <motion.div
                key={m.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="mb-3 flex items-center gap-4">
                  <span
                    className="text-3xl font-bold text-[#00d4ff]"
                    style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                  >
                    {m.stat}
                  </span>
                </div>
                <p
                  className="text-sm font-semibold text-[#ff6b35]"
                  style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                >
                  ▸ {m.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-8 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6 text-center"
          >
            <pre className="mb-3 text-[0.6rem] text-[#ff6b35]/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`╔═══════════════════════════════════════════════════════╗
║  NO MEMBRANE · NO RARE EARTHS · NO COOLING · NO IMP  ║
╚═══════════════════════════════════════════════════════╝`}
            </pre>
            <p className="text-lg font-bold text-white/80">
              Just hydrogen, cheaper and cleaner than anyone else.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto max-w-5xl text-center">
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
