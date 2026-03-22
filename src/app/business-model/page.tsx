'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const unitEconomics = {
  tobeCost: '$5.08',
  directCost: '$2.57',
  marketPrices: [
    { source: 'Industrial Partner (Oklahoma)', price: '$30/kg', note: 'Actual quote' },
    { source: 'Tulsa Industrial', price: '$47/kg', note: 'Delivered w/ logistics' },
    { source: 'Seattle Metro', price: '$30+/kg', note: 'West Coast delivered' },
    { source: 'National Gas Distributor (15-pack)', price: '$100+/kg', note: 'Small-volume retail' },
  ],
};

const revenueStreams = [
  { label: 'Hydrogen as a Service', pct: 82, desc: 'We own and operate electrolyzers near industrial end users. More capital intensive upfront, but generates recurring, high-margin revenue with long-term offtake agreements. The core of the business.', color: '#ff6b35' },
  { label: 'Equipment Sales', pct: 16, desc: 'Direct sale of T-25 and T-125 electrolyzer systems to support industry-defining projects — making steel production, ammonia synthesis, and refining more renewable. Customer owns the asset.', color: '#ff6b35' },
  { label: 'AI Services & Maintenance', pct: 2, desc: 'Preventive and predictive maintenance powered by AI — valve chatter detection, sensor drift analysis, efficiency optimization. Plus traditional service contracts. Stacked on every deployment.', color: '#ff6b35' },
];

const financials = [
  { year: 'FY1', revenue: '$0.9M', ebitda: '-$2.1M', margin: '\u2014', note: 'Equipment sales only', revNum: 0.9, ebitdaNum: -2.1 },
  { year: 'FY2', revenue: '$16.1M', ebitda: '$7.5M', margin: '46.7%', note: 'First H\u2082 revenue', revNum: 16.1, ebitdaNum: 7.5 },
  { year: 'FY3', revenue: '$88.3M', ebitda: '$54.5M', margin: '61.7%', note: 'Scale inflection', revNum: 88.3, ebitdaNum: 54.5 },
  { year: 'FY4', revenue: '$161.2M', ebitda: '$100.5M', margin: '62.3%', note: 'Full production ramp', revNum: 161.2, ebitdaNum: 100.5 },
  { year: 'FY5', revenue: '$242.0M', ebitda: '$153.2M', margin: '63.3%', note: 'Regional expansion', revNum: 242.0, ebitdaNum: 153.2 },
  { year: 'FY6', revenue: '$307.7M', ebitda: '$194.1M', margin: '63.1%', note: 'Multi-facility scale', revNum: 307.7, ebitdaNum: 194.1 },
  { year: 'FY7', revenue: '$327.7M', ebitda: '$209.4M', margin: '63.9%', note: 'National footprint', revNum: 327.7, ebitdaNum: 209.4 },
];

const funding = [
  { round: 'Pre-Seed', amount: '$1.8M', status: 'CLOSED', detail: 'Technology validation & IP filing' },
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
  { title: '>92% System Efficiency', stat: '>92%', desc: '46 kWh/kg measured in lab; 42.8 kWh/kg conservative model assumption. Lowest electricity cost per kg H\u2082.' },
  { title: 'Near-Ambient Operation', stat: '~25\u00b0C', desc: 'No cooling capex, no thermal management complexity. Simpler. Cheaper. Safer.' },
  { title: 'Vertical Integration', stat: 'OK, USA', desc: 'Oklahoma manufacturing = BABA compliant. Domestic supply chain end to end.' },
];

const sectionNav = [
  { label: 'Unit Economics', id: 'unit-economics' },
  { label: 'On-Site Advantage', id: 'on-site' },
  { label: 'Revenue', id: 'revenue' },
  { label: 'Financials', id: 'financials' },
  { label: 'Funding', id: 'funding' },
  { label: 'Go-to-Market', id: 'gtm' },
  { label: 'Market', id: 'market' },
  { label: 'Competitive', id: 'competitive' },
  { label: 'Moat', id: 'moat' },
];

const competitors = [
  { name: 'TOBE ENERGY', tech: 'Membrane-Free', eff: '42\u201346 kWh/kg', funding: '$1.8M raised', weakness: 'Pre-revenue (but that\u2019s about to change)', highlight: true },
  { name: 'Nel ASA', tech: 'PEM / ALK', eff: '55\u201360 kWh/kg', funding: '$800M+', weakness: 'Samsung 9.1% stake; legacy technology' },
  { name: 'ITM Power', tech: 'PEM', eff: '50\u201358 kWh/kg', funding: '$400M+', weakness: 'UK-based; modular but membrane-dependent' },
  { name: 'Plug Power', tech: 'PEM', eff: '52\u201358 kWh/kg', funding: '$5B+', weakness: 'Massive losses; not profitable' },
  { name: 'Bloom Energy', tech: 'SOEC', eff: 'N/A (800\u00b0C)', funding: 'Public', weakness: 'Requires extreme heat; different market' },
  { name: 'Electric Hydrogen', tech: 'PEM', eff: '~50 kWh/kg', funding: 'Well-funded', weakness: 'Still membrane + rare earth dependent' },
  { name: 'Enapter', tech: 'AEM', eff: '~50 kWh/kg', funding: 'IPO\u2019d', weakness: 'AEM membranes still degrade' },
];

function StickyNav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    for (const s of sectionNav) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-2 scrollbar-hide">
        {sectionNav.map((s) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={`whitespace-nowrap rounded px-3 py-1.5 font-mono text-[0.65rem] tracking-wider transition-colors ${
              active === s.id
                ? 'bg-[#ff6b35]/20 text-[#ff6b35]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function BusinessModelPage() {
  const maxRev = Math.max(...financials.map((f) => f.revNum));

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── BUSINESS MODEL ───┐`}
          </pre>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            How Tobe{' '}
            <span className="text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>
              Makes Money
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-white/60"
          >
            Three revenue engines. Produce hydrogen for under $3/kg direct cost. Sell it at $20-50+/kg. Stack AI services on every deployment.
          </motion.p>

          {/* Three Revenue Engines — Hero Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-6"
              style={{ borderTop: '1px solid rgba(255,107,53,0.1)', borderRight: '1px solid rgba(255,107,53,0.1)', borderBottom: '1px solid rgba(255,107,53,0.1)' }}
            >
              <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">ENGINE 01</p>
              <h3 className="mb-2 text-xl font-bold text-white">Hydrogen as a Service</h3>
              <p className="mb-3 text-sm text-white/50">Own &amp; operate electrolyzers near industrial end users. Long-term offtake agreements. Recurring, high-margin revenue.</p>
              <p className="text-3xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>82%</p>
              <p className="text-[0.6rem] text-white/30">OF FY7 REVENUE</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-6"
              style={{ borderTop: '1px solid rgba(255,107,53,0.1)', borderRight: '1px solid rgba(255,107,53,0.1)', borderBottom: '1px solid rgba(255,107,53,0.1)' }}
            >
              <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">ENGINE 02</p>
              <h3 className="mb-2 text-xl font-bold text-white">Equipment Sales</h3>
              <p className="mb-3 text-sm text-white/50">Direct sale of T-25 and T-125 systems for industry-defining projects — making steel, ammonia, and refining more renewable.</p>
              <p className="text-3xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>16%</p>
              <p className="text-[0.6rem] text-white/30">OF FY7 REVENUE</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-6"
              style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}
            >
              <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">ENGINE 03</p>
              <h3 className="mb-2 text-xl font-bold text-white">AI Services &amp; Maintenance</h3>
              <p className="mb-3 text-sm text-white/50">Predictive maintenance AI — valve chatter, sensor drift, efficiency optimization. Plus service contracts. Stacked on every deployment.</p>
              <p className="text-3xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>2%</p>
              <p className="text-[0.6rem] text-white/30">OF FY7 REVENUE (GROWING)</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Section Nav */}
      <StickyNav />



      {/* UNIT ECONOMICS */}
      <section id="unit-economics" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── UNIT ECONOMICS ───┐`}
          </pre>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Tobe cost */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6"
            >
              <p className="mb-1 text-xs tracking-[0.15em] text-[#ff6b35]">▸ TOBE DIRECT VARIABLE COST</p>
              <p
                className="text-5xl font-bold text-[#ff6b35]"
                style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
              >
                {unitEconomics.directCost}
              </p>
              <p className="mt-2 text-sm text-white/50">Direct variable cost per kg. All-in loaded: {unitEconomics.tobeCost}/kg.</p>
            </motion.div>

            {/* Gross margin */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6"
            >
              <p className="mb-1 text-xs tracking-[0.15em] text-[#ff6b35]">▸ GROSS MARGIN AT SCALE</p>
              <p
                className="text-5xl font-bold text-[#ff6b35]"
                style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
              >
                80%+
              </p>
              <p className="mt-2 text-sm text-white/50">Market sells at $20-50+. We produce at $5.08 all-in.</p>
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
                    className="text-xl font-bold text-[#ff6b35]"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                  >
                    {p.price}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] px-4 py-3">
              <p className="text-xs text-[#ff6b35]">
                ● TAKEAWAY: The gap between Tobe&apos;s cost ($5.08) and market reality ($20-50+) is the business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY ON-SITE WINS */}
      <section id="on-site" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── WHY ON-SITE WINS ───┐`}
          </pre>

          {/* DOE stat callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] p-6 text-center"
          >
            <p className="mb-2 text-xs tracking-[0.15em] text-[#ff6b35]">▸ DOE HYDROGEN PROGRAM RECORD 24005</p>
            <p className="text-3xl font-bold text-white md:text-4xl">
              <span className="text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>75-85%</span> of delivered hydrogen cost
            </p>
            <p className="mt-2 text-lg text-white/60">is transport and storage — not production.</p>
          </motion.div>

          {/* Cost waterfall comparison */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Grey H2 Delivered */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="rounded border border-red-500/20 bg-red-500/[0.03] p-6"
            >
              <p className="mb-4 text-xs tracking-[0.15em] text-red-400">▸ GREY H₂ DELIVERED</p>
              <div className="space-y-3">
                {[
                  { label: 'Production', cost: '$1.00', width: '10%', color: 'bg-white/20' },
                  { label: 'Compression', cost: '$0.75', width: '8%', color: 'bg-white/20' },
                  { label: 'Transportation', cost: '$8.00+', width: '82%', color: 'bg-red-500/60' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-white/60">{item.label}</span>
                      <span className="font-bold text-white/80">{item.cost}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded bg-white/5">
                      <div className={`h-full rounded ${item.color}`} style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
                <div className="mt-2 border-t border-red-500/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-red-400">TOTAL DELIVERED</span>
                    <span className="text-xl font-bold text-red-400">$9.80+/kg</span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">Real quotes: $20-50+/kg. The &quot;cheap&quot; number is the fantasy.</p>
                </div>
              </div>
            </motion.div>

            {/* Tobe On-Site */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6"
            >
              <p className="mb-4 text-xs tracking-[0.15em] text-[#ff6b35]">▸ TOBE — ON OR NEAR SITE</p>
              <div className="space-y-3">
                {[
                  { label: 'Production (electricity + water)', cost: '$2.57', width: '50%', color: 'bg-[#ff6b35]/60' },
                  { label: 'Compression (included)', cost: '$0.17', width: '3%', color: 'bg-[#ff6b35]/40' },
                  { label: 'Short-distance transport (included)', cost: '$0.91', width: '18%', color: 'bg-[#ff6b35]/40' },
                  { label: 'All-in delivered', cost: '$5.08', width: '100%', color: 'bg-[#ff6b35]/80' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-white/60">{item.label}</span>
                      <span className="font-bold text-white/80">{item.cost}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded bg-white/5">
                      {item.width !== '0%' && (
                        <div className={`h-full rounded ${item.color}`} style={{ width: item.width }} />
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-2 border-t border-[#ff6b35]/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-[#ff6b35]">ALL-IN ON-SITE</span>
                    <span
                      className="text-xl font-bold text-[#ff6b35]"
                      style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                    >
                      $5.08/kg
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">No trucks. No compression facilities. No logistics chain.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key insight */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] p-6 text-center"
          >
            <p
              className="text-lg font-bold text-[#ff6b35] md:text-xl"
              style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
            >
              Tobe eliminates the 75-85% of cost that isn&apos;t hydrogen.
            </p>
            <p className="mt-2 text-xs text-white/40">Source: DOE Hydrogen Program Record 24005</p>
          </motion.div>
        </div>
      </section>

      {/* DOWNSTREAM IMPACT */}
      <section className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── DOWNSTREAM IMPACT ───┐`}
          </pre>

          <div className="mb-6 border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-5" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
            <p className="font-sans text-lg leading-relaxed text-white/80">
              We&apos;re your favorite e-fuels startup&apos;s favorite green hydrogen provider.
            </p>
          </div>

          <p className="mb-8 max-w-3xl font-sans text-[0.95rem] leading-relaxed text-white/60">
            Hydrogen isn&apos;t just an end product — it&apos;s the feedstock for the entire clean economy. Our cost breakthrough cascades downstream, making the technologies of the future economically viable today.
          </p>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6">
              <p className="mb-2 text-4xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.4)' }}>30%</p>
              <p className="mb-1 text-sm font-semibold text-[#ff6b35]">▸ Sustainable Aviation Fuel &amp; E-Fuels</p>
              <p className="text-sm text-white/50">Hydrogen is the largest cost input in synthetic fuel production. Tobe reduces that cost by up to 30%, bringing SAF closer to jet fuel parity and making e-fuels commercially viable at scale.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6">
              <p className="mb-2 text-4xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.4)' }}>40%</p>
              <p className="mb-1 text-sm font-semibold text-[#ff6b35]">▸ Green Ammonia &amp; Fertilizer</p>
              <p className="text-sm text-white/50">Ammonia production consumes 1-2% of global energy. Green ammonia from Tobe hydrogen cuts feedstock costs by up to 40%, enabling price parity with fossil-based fertilizer production for the first time.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6">
              <p className="mb-2 text-4xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.4)' }}>$1.4T</p>
              <p className="mb-1 text-sm font-semibold text-[#ff6b35]">▸ Unlocked TAM</p>
              <p className="text-sm text-white/50">With 45V tax credits, Tobe hydrogen is better priced than many legacy fossil-based solutions. This unlocks what Deloitte estimates as a $1.4T addressable market — steel, ammonia, e-fuels, mobility, and beyond.</p>
            </motion.div>
          </div>

          <div className="rounded border border-white/10 bg-white/[0.02] px-6 py-4">
            <p className="text-xs text-white/40">
              ● When hydrogen costs drop below $2/kg, entire industries flip from fossil to renewable overnight. Tobe doesn&apos;t just produce hydrogen — we enable the economics that make the clean transition inevitable.
            </p>
          </div>
        </div>
      </section>

      {/* REVENUE STREAMS */}
      <section id="revenue" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── REVENUE STREAMS ───┐`}
          </pre>

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
      <section id="financials" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── FINANCIAL TRAJECTORY ───┐`}
          </pre>

          {/* Revenue Growth Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="mb-6 text-sm font-semibold text-[#ff6b35]">▸ REVENUE &amp; EBITDA GROWTH</p>
            <div className="flex items-end gap-3 md:gap-4" style={{ height: '200px' }}>
              {financials.map((f, i) => {
                const revHeight = Math.max(Math.round((f.revNum / maxRev) * 180), 4);
                const ebitdaHeight = f.ebitdaNum > 0 ? Math.max(Math.round((f.ebitdaNum / maxRev) * 180), 4) : 0;
                return (
                  <div key={f.year} className="flex flex-1 flex-col items-center justify-end gap-1">
                    <span className="text-[0.55rem] font-bold text-[#ff6b35]">{f.revenue}</span>
                    <div className="relative flex w-full justify-center gap-0.5">
                      <div
                        className="w-1/2 rounded-t"
                        style={{
                          height: `${revHeight}px`,
                          backgroundColor: '#ff6b35',
                          boxShadow: '0 0 8px rgba(255,107,53,0.4)',
                        }}
                      />
                      {ebitdaHeight > 0 && (
                        <div
                          className="w-1/2 rounded-t"
                          style={{
                            height: `${ebitdaHeight}px`,
                            backgroundColor: '#ff6b35',
                            boxShadow: '0 0 8px rgba(255,107,53,0.4)',
                          }}
                        />
                      )}
                    </div>
                    <span className="text-[0.6rem] text-white/50">{f.year}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex gap-6 text-[0.65rem] text-white/40">
              <span><span className="mr-1 inline-block h-2 w-2 rounded" style={{ backgroundColor: '#ff6b35' }} /> Revenue</span>
              <span><span className="mr-1 inline-block h-2 w-2 rounded" style={{ backgroundColor: '#ff6b35' }} /> EBITDA</span>
            </div>
          </motion.div>

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
                  className="font-bold text-[#ff6b35]"
                  style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                >
                  {f.revenue}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/30 md:hidden">EBITDA </span>
                <span
                  className="text-[#ff6b35]"
                  style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
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
            className="mt-4 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] px-4 py-3"
          >
            <p className="text-xs text-[#ff6b35]">
              ● EBITDA POSITIVE BY YEAR 2. 63.9% MARGIN AT SCALE. $327.7M FY7 REVENUE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FUNDING ROADMAP */}
      <section id="funding" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── FUNDING ROADMAP ───┐`}
          </pre>

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
                        ? 'bg-[#ff6b35]/10 text-[#ff6b35]'
                        : 'bg-[#ff6b35]/10 text-[#ff6b35]'
                    }`}
                  >
                    ● {f.status}
                  </span>
                </div>
                <p
                  className="text-3xl font-bold text-[#ff6b35]"
                  style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
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
              {seedUse.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-white/70">{s.label}</span>
                    <span
                      className="text-sm font-bold text-[#ff6b35]"
                      style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                    >
                      {s.pct}%
                    </span>
                  </div>
                  {/* Terminal-style progress bar */}
                  <pre className="text-[0.6rem] text-[#ff6b35]" style={{ whiteSpace: 'pre' }}>
{`[${'█'.repeat(Math.round(s.pct / 5))}${'░'.repeat(20 - Math.round(s.pct / 5))}]`}
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GO-TO-MARKET STRATEGY */}
      <section id="gtm" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── GO-TO-MARKET STRATEGY ───┐`}
          </pre>

          {/* Phase cards */}
          <div className="mb-8 space-y-6">
            {[
              {
                phase: 'Phase 1: Oklahoma Anchor',
                timeline: 'FY1\u2013FY2',
                facilities: '1\u20132 facilities',
                color: '#ff6b35',
                items: [
                  'First commercial deployment — prove unit economics with anchor HaaS customer',
                  'University research contract (CAMPUS) \u2014 academic validation',
                  'Build reference customers in home market',
                  'Establish manufacturing line in Tulsa',
                ],
              },
              {
                phase: 'Phase 2: Regional Scale',
                timeline: 'FY2\u2013FY4',
                facilities: '4 facilities across Central US',
                color: '#ff6b35',
                items: [
                  'Target industrial corridors with cheap electricity + wind PPAs',
                  'Expand to Texas (HORIZON), California (PHOENIX), Oregon (TRANSIT)',
                  'T-125 commercial production at scale',
                  'Steel mill rollout begins (FORGE-STEEL)',
                ],
              },
              {
                phase: 'Phase 3: National Expansion',
                timeline: 'FY4\u2013FY7',
                facilities: '12 facilities total',
                color: '#ff6b35',
                items: [
                  'West Coast + Southeast expansion',
                  'Leverage fleet data + AI ops for rapid deployment',
                  'T-2500 commercial deployment for large-scale sites',
                  '$327.7M revenue target with 63.9% EBITDA margin',
                ],
              },
            ].map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
                style={{ borderLeft: `3px solid ${phase.color}` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold" style={{ color: phase.color }}>▸ {phase.phase}</p>
                    <p className="text-xs text-white/40">{phase.timeline} | {phase.facilities}</p>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  {phase.items.map((item, j) => (
                    <p key={j} className="text-sm text-white/60">
                      <span style={{ color: phase.color }}>· </span>{item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Customer acquisition channels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="mb-8 rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="mb-4 text-sm font-semibold text-[#ff6b35]">▸ CUSTOMER ACQUISITION</p>
            <div className="space-y-4">
              {[
                { label: 'Inbound (Fortune 500 + major industrials via website, conferences, RFPs)', pct: 40, color: '#ff6b35' },
                { label: 'Referral (partner network, customer-to-customer)', pct: 35, color: '#ff6b35' },
                { label: 'Direct Outbound (BD team)', pct: 25, color: '#ff6b35' },
              ].map((ch) => (
                <div key={ch.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-white/70">{ch.label}</span>
                    <span className="text-sm font-bold" style={{ color: ch.color }}>{ch.pct}%</span>
                  </div>
                  <pre className="text-[0.6rem]" style={{ whiteSpace: 'pre', color: ch.color }}>
{`[${'█'.repeat(Math.round(ch.pct / 5))}${'░'.repeat(20 - Math.round(ch.pct / 5))}] ${ch.pct}%`}
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Facility deployment table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="overflow-x-auto rounded border border-white/10"
          >
            <p className="border-b border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-[#ff6b35]">
              ▸ FACILITY DEPLOYMENT SCHEDULE
            </p>
            <div className="grid grid-cols-7 text-center text-sm">
              {['FY1', 'FY2', 'FY3', 'FY4', 'FY5', 'FY6', 'FY7'].map((fy) => (
                <div key={fy} className="border-b border-white/10 bg-white/[0.03] px-3 py-2 text-xs tracking-[0.1em] text-[#ff6b35]">
                  {fy}
                </div>
              ))}
              {[1, 2, 4, 5, 7, 10, 12].map((n, i) => (
                <div
                  key={i}
                  className="border-r border-white/5 bg-white/[0.02] px-3 py-3 last:border-r-0"
                >
                  <span
                    className="text-lg font-bold text-[#ff6b35]"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                  >
                    {n}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TAM / SAM / SOM */}
      <section id="market" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── ADDRESSABLE MARKET ───┐`}
          </pre>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Global TAM', value: '$226B', desc: 'Total global hydrogen market — 94M tonnes/yr. Tobe competes with ALL hydrogen, not just green. On-site at <$5/kg beats delivered grey at $20-50/kg.' },
              { title: 'U.S. TAM', value: '~3M tons/yr', desc: 'Current U.S. hydrogen consumption across refining, ammonia, and industrial. Grey + green — Tobe is cost-competitive with both.' },
              { title: 'SAM', value: '500K-1M tons/yr', desc: 'Distributed, on-site industrial H\u2082 in Tobe\u2019s target verticals and geographies.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="mb-1 text-xs tracking-[0.1em] text-[#ff6b35]">▸ {item.title}</p>
                <p
                  className="text-2xl font-bold text-[#ff6b35]"
                  style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                >
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              { title: 'SOM', value: '90-120K tons/yr', desc: 'Achievable capture with 12 facilities at full capacity by FY7.' },
              { title: 'Upside TAM', value: '$1.4T', desc: 'Addressable market with cost-competitive green hydrogen (Deloitte). New demand from steel, ammonia, e-fuels, and mobility unlocked below $2/kg.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="mb-1 text-xs tracking-[0.1em] text-[#ff6b35]">▸ {item.title}</p>
                <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>{item.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-4 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] px-4 py-3"
          >
            <p className="text-xs text-[#ff6b35]">
              ● Oklahoma electricity at $0.10/kWh (PPA) translates to ~$1/kg production electricity cost. Combined with zero membrane costs, Tobe achieves structural cost advantage in the SAM.
            </p>
          </motion.div>

          {/* OU Validation Callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            variants={fadeUp}
            className="mt-6 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] p-6"
          >
            <p className="mb-3 text-sm font-bold text-[#ff6b35]">▸ INDEPENDENT VALIDATION</p>
            <p className="text-sm leading-relaxed text-white/70">
              University of Oklahoma&apos;s Ronnie K. Irani Center for Economic Wealth conducted a semester-long independent analysis.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              {[
                { label: 'Serviceable Market', value: '$9.81B' },
                { label: 'Cost-Competitive Radius', value: '150 mi' },
                { label: 'Profit Projection (2033)', value: '$657M' },
                { label: 'Expert Interviews', value: '7' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-[0.65rem] tracking-[0.1em] text-[#ff6b35]">{item.label}</p>
                  <p
                    className="text-xl font-bold text-white"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.3)' }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40">
              This was not commissioned by Tobe — it was an independent academic study across 8 market segments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPETITIVE LANDSCAPE */}
      <section id="competitive" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── COMPETITIVE LANDSCAPE ───┐`}
          </pre>

          {/* Comparison table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="overflow-x-auto rounded border border-white/10"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-xs tracking-[0.1em] text-[#ff6b35]">
                  <th className="px-4 py-3 text-left">COMPANY</th>
                  <th className="px-4 py-3 text-left">TECH</th>
                  <th className="px-4 py-3 text-left">EFFICIENCY</th>
                  <th className="px-4 py-3 text-left">FUNDING</th>
                  <th className="px-4 py-3 text-left">KEY WEAKNESS</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr
                    key={c.name}
                    className={`border-b border-white/5 ${
                      c.highlight
                        ? 'bg-[#ff6b35]/[0.06] border-l-2 border-l-[#ff6b35]'
                        : 'bg-white/[0.02]'
                    }`}
                  >
                    <td className={`px-4 py-3 font-bold ${c.highlight ? 'text-[#ff6b35]' : 'text-white/70'}`}>
                      {c.highlight && '▸ '}{c.name}
                    </td>
                    <td className={`px-4 py-3 ${c.highlight ? 'font-bold text-[#ff6b35]' : 'text-white/60'}`}>{c.tech}</td>
                    <td className={`px-4 py-3 ${c.highlight ? 'font-bold text-[#ff6b35]' : 'text-white/60'}`}>{c.eff}</td>
                    <td className="px-4 py-3 text-white/60">{c.funding}</td>
                    <td className="px-4 py-3 text-white/50 text-xs">{c.weakness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="mt-2 text-right text-[0.6rem] text-white/30">Data as of Q1 2026</p>

          {/* Membrane callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="mt-6 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] p-6 text-center"
          >
            <p
              className="text-sm font-bold leading-relaxed text-[#ff6b35] md:text-base"
              style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
            >
              Every competitor above uses membranes. Every membrane degrades.
              <br />
              Tobe is the only architecture that eliminates the primary failure mode.
            </p>
          </motion.div>

          {/* The cycle callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="mt-6 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6"
          >
            <p className="text-sm leading-relaxed text-white/60">
              <span className="font-bold text-[#ff6b35]">▸ THE CYCLE:</span>{' '}
              Incumbents have spent 30 years and billions of dollars on membrane-based electrolysis without achieving profitability. PEM requires iridium ($150K+/kg, geopolitically concentrated). ALK requires large footprints and high temperatures. Tobe skips the membrane entirely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPETITIVE MOAT */}
      <section id="moat" className="scroll-mt-16 border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── COMPETITIVE MOAT ───┐`}
          </pre>

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
                    className="text-3xl font-bold text-[#ff6b35]"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
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

      {/* DETAILED COST BUILD-UP */}
      <section className="border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── DETAILED COST BUILD-UP ───┐`}
          </pre>

          {/* Cost table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="mb-4 text-sm font-semibold text-[#ff6b35]">▸ ALL-IN COST PER KG H₂ — FULL PRODUCTION</p>
            <div className="space-y-2">
              {[
                { label: 'Electricity (Production)', cost: '$1.50', sub: false },
                { label: 'Compression & Purification', cost: '$0.12', sub: false },
                { label: 'Logistics (50-mi radius)', cost: '$0.90', sub: false },
                { label: 'RO Water', cost: '$0.05', sub: false },
                { label: 'DIRECT VARIABLE COST', cost: '$2.57', sub: true },
                { label: 'Maintenance & Consumables', cost: '$0.42', sub: false },
                { label: 'Fixed Site Costs', cost: '$1.63', sub: false },
                { label: 'CASH OPERATING COST', cost: '$4.62', sub: true },
                { label: 'Annualized Capital Recovery', cost: '$0.63', sub: false },
                { label: 'ALL-IN COST', cost: '$5.08', sub: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-4 py-2 ${
                    item.sub
                      ? 'rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03]'
                      : 'border-b border-white/5'
                  }`}
                >
                  <span className={`text-sm ${item.sub ? 'font-bold text-[#ff6b35]' : 'text-white/60'}`}>
                    {item.sub ? '▸ ' : '  '}{item.label}
                  </span>
                  <span
                    className={`font-mono text-sm ${item.sub ? 'font-bold text-[#ff6b35]' : 'text-white/80'}`}
                    style={item.sub ? { textShadow: '0 0 10px rgba(255,107,53,0.5)' } : {}}
                  >
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Anchor returns grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-5">
            {[
              { label: 'SELLING PRICE', value: '$25/kg', color: '#ff6b35' },
              { label: 'GROSS MARGIN', value: '89.5%', color: '#ff6b35' },
              { label: 'SITE EBITDA', value: '$16.5M/yr', color: '#ff6b35' },
              { label: 'PROJECT IRR', value: '217.7%', color: '#ff6b35' },
              { label: 'PAYBACK', value: '<18 mo', color: '#ff6b35' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-4 text-center"
              >
                <p className="mb-1 text-[0.65rem] tracking-[0.1em] text-[#ff6b35]">▸ {item.label}</p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: item.color, textShadow: `0 0 10px ${item.color}80` }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
