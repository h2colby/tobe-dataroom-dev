'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const specs = [
  { param: 'Form Factor', value: "20' Shipping Container" },
  { param: 'Electrolyzer', value: 'Single T-25 Unit' },
  { param: 'Power Source', value: '2.5 kW Solar + Grid Backup' },
  { param: 'Energy Storage', value: 'Anker SOLIX E10 (6 kWh LiFePO4, NEMA 4 & 3R)' },
  { param: 'Solar Panels', value: '2× 400W + additional array (9 kW system capacity)' },
  { param: 'Battery Backup', value: 'Manual backup with smart savings' },
  { param: 'Enclosure Rating', value: 'NEMA 4 & 3R' },
  { param: 'Location', value: 'Oklahoma City, OK' },
  { param: 'H₂ Output', value: '25 kg/day (nameplate)' },
  { param: 'Operating Temp', value: '~28°C (no cooling required)' },
];

const quotingSteps = [
  { label: 'Requirements captured in real-time', status: 'COMPLETE' },
  { label: 'PFD generated', status: 'COMPLETE' },
  { label: 'P&ID generated', status: 'COMPLETE' },
  { label: 'Electrical one-line', status: 'COMPLETE' },
  { label: 'Scope assessment', status: 'COMPLETE' },
  { label: 'Bill of materials', status: 'COMPLETE' },
  { label: 'FEED study package', status: 'COMPLETE' },
  { label: 'Project economics', status: 'COMPLETE' },
];

const experienceCards = [
  {
    title: 'Interactive LED Process Flow',
    desc: 'LED lighting traces the hydrogen production process through the container in real-time. Visitors see water become hydrogen, visually, as it happens. Color changes indicate system state.',
    color: '#ff6b35',
  },
  {
    title: 'Live Stack Changeout Demo',
    desc: 'Watch a T-25 electrolyzer stack get swapped in under 30 minutes. No cranes. No specialists. Just field-serviceable simplicity.',
    color: '#ff6b35',
  },
  {
    title: 'One-Button Commissioning',
    desc: 'See the entire system go from cold iron to producing hydrogen. No week-long startup procedures. No commissioning engineers flying in from Germany.',
    color: '#ff6b35',
  },
  {
    title: 'Solar-to-Hydrogen, Live',
    desc: '2.5 kW of solar hits panels → power flows through the Anker SOLIX E10 → electrolyzer splits water → pure hydrogen output. Grid backup ensures continuous operation. The entire clean energy chain, visible and tangible.',
    color: '#ff6b35',
  },
  {
    title: 'AI Copilot Interface',
    desc: "A display showing the AI reading process data in real-time, making predictions, generating insights. Not a dashboard — an intelligence.",
    color: '#ff6b35',
  },
  {
    title: "The 'Year 3000' Aesthetic",
    desc: "This isn't a gray box in a field. Industrial equipment can be beautiful. Clean lines, purposeful lighting, every detail considered. The future of energy should look like the future.",
    color: '#ff6b35',
  },
];

const investorPoints = [
  { label: 'Sales accelerator', desc: 'Turns a months-long engineering sales cycle into a single visit' },
  { label: 'Proof of deployment simplicity', desc: 'Container arrives, plugs in, produces hydrogen. Period.' },
  { label: 'AI differentiation', desc: 'No other electrolyzer company has AI woven from quote through operations' },
  { label: 'Scalable template', desc: 'NODE-01 becomes the blueprint for NODE-02, NODE-03... every deployment' },
  { label: '45V qualification built in', desc: 'Every FEED study generated is structured for tax credit qualification' },
  { label: 'Zero failed projects', desc: 'Predictive maintenance + simplified operations = 100% project success rate target' },
  { label: 'Brand asset', desc: 'This is the thing investors, customers, and press remember' },
];

export default function Node01Page() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">

      {/* ═══ HERO — FULL-WIDTH IMAGE ═══ */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="/images/showroom-inspo.jpg"
          alt="NODE-01 containerized hydrogen production unit"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/40" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-block rounded border border-[#ff6b35]/40 bg-[#ff6b35]/10 px-3 py-1"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#ff6b35]">
                COMPLETION: END OF APRIL 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 text-5xl font-bold tracking-tight md:text-7xl"
            >
              NODE-01
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-xl text-[#ff6b35] md:text-2xl"
              style={{ textShadow: '0 0 20px rgba(255,107,53,0.3)' }}
            >
              The Future of Hydrogen Production, Containerized
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
            >
              First intelligent, solar-powered, AI-integrated hydrogen production node.
              A 20-foot container that turns sunlight into hydrogen — and engineers months
              of work into minutes.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS NODE-01 ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">01 //</span>
            <h2 className="text-2xl font-bold tracking-tight">What Is NODE-01</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-10 space-y-4 text-sm leading-relaxed text-white/70"
          >
            <p>
              NODE-01 is Tobe Energy&apos;s containerized demonstration unit — a fully self-contained,
              solar-powered hydrogen production system inside a standard{' '}
              <span className="text-[#ff6b35]">20-foot shipping container</span>. But it&apos;s more than
              a demo. It&apos;s a proof of concept for how Tobe deploys:{' '}
              <span className="text-[#ff6b35]">AI-first, zero-complexity, beautiful</span>.
            </p>
          </motion.div>

          {/* Specs table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="overflow-hidden rounded border border-white/10 bg-white/[0.02]"
          >
            <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-xs tracking-[0.15em] text-[#ff6b35]">▸ NODE-01 — SYSTEM CONFIGURATION</span>
            </div>
            <div className="divide-y divide-white/5">
              {specs.map((s, i) => (
                <motion.div
                  key={s.param}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm text-white/50">{s.param}</span>
                  <span className="text-right text-sm font-semibold text-[#ff6b35]">{s.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ AI-POWERED QUOTING ENGINE ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">02 //</span>
            <h2 className="text-2xl font-bold tracking-tight">AI-Powered Quoting Engine</h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 text-lg font-semibold text-[#ff6b35]"
            style={{ textShadow: '0 0 15px rgba(255,107,53,0.3)' }}
          >
            ▸ WALK IN WITH A QUESTION. WALK OUT WITH A PROJECT.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="mb-8 space-y-4 text-sm leading-relaxed text-white/70"
          >
            <p>
              When a potential customer tours NODE-01, an <span className="text-[#ff6b35]">AI agent</span> accompanies
              them through the experience. As they walk through the container and discuss their project,
              the AI is working in the background — gathering requirements through natural conversation,
              generating engineering deliverables, and building a complete project specification.
            </p>
          </motion.div>

          {/* Terminal-style quoting flow */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="overflow-hidden rounded border border-[#ff6b35]/20 bg-[#0a0a0f]"
          >
            <div className="border-b border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] px-4 py-2">
              <span className="text-xs tracking-[0.15em] text-[#ff6b35]">▸ AI QUOTING ENGINE — LIVE PROCESS</span>
            </div>
            <div className="p-6">
              <pre className="text-xs leading-loose text-[#ff6b35]/80 sm:text-sm" style={{ whiteSpace: 'pre-wrap' }}>
{`VISITOR ENTERS → `}<span className="text-[#ff6b35]">AI AGENT ACTIVATES</span>{` → CONVERSATION BEGINS`}
              </pre>
              <div className="my-4 space-y-2 border-l-2 border-[#ff6b35]/20 pl-4">
                {quotingSteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i + 3}
                    variants={fadeUp}
                    className="flex items-center justify-between font-mono text-xs sm:text-sm"
                  >
                    <span className="text-white/60">→ {step.label}</span>
                    <span className={step.status === "COMPLETE" ? "text-[#00ff88]" : "text-[#ff6b35]"}>[{step.status}]</span>
                  </motion.div>
                ))}
              </div>
              <pre className="text-xs leading-loose text-[#ff6b35]/80 sm:text-sm" style={{ whiteSpace: 'pre-wrap' }}>
{`VISITOR EXITS → `}<span className="text-[#ff6b35] font-bold">COMPLETE PROJECT SPECIFICATION IN HAND</span>
              </pre>
            </div>
          </motion.div>

          {/* Callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-8 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] p-6"
          >
            <p className="text-center text-sm font-semibold text-[#ff6b35] md:text-base"
              style={{ textShadow: '0 0 12px rgba(255,107,53,0.3)' }}
            >
              What normally takes months of engineering and multiple vendor coordination,
              NODE-01 delivers before you finish your coffee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ PREDICTIVE MAINTENANCE AI ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">03 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Predictive Maintenance AI</h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 text-lg font-semibold text-[#ff6b35]"
            style={{ textShadow: '0 0 15px rgba(255,107,53,0.3)' }}
          >
            ▸ NO MORE FAILED ENERGY PROJECTS
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="mb-8 space-y-3 text-sm leading-relaxed text-white/70"
          >
            <p>
              The AI doesn&apos;t stop at quoting. Every NODE runs a{' '}
              <span className="text-[#ff6b35]">persistent intelligence layer</span> that reads live
              process data from every sensor in real-time, detects failures before they happen,
              and enables planned maintenance — never emergency maintenance.
            </p>
          </motion.div>

          {/* Terminal-style monitoring display */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="overflow-hidden rounded border border-[#ff6b35]/20 bg-[#0a0a0f]"
          >
            <div className="border-b border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] px-4 py-2 flex items-center justify-between">
              <span className="text-xs tracking-[0.15em] text-[#ff6b35]">▸ SYSTEM MONITOR — NODE-01</span>
              <span className="text-[0.6rem] text-[#ff6b35]/50">LIVE</span>
            </div>
            <div className="p-5 space-y-2 text-sm font-mono">
              <div className="mb-3 text-xs font-bold text-[#00ff88]" style={{ textShadow: '0 0 8px rgba(0,255,136,0.3)' }}>SYSTEM: NOMINAL</div>
              {[
                { label: 'Stack Voltage', value: '3.2 kV', status: 'NORMAL', color: '#00ff88' },
                { label: 'H₂ Flow Rate', value: '1.04 kg/hr', status: 'NORMAL', color: '#00ff88' },
                { label: 'Stack Temperature', value: '27.8°C', status: 'NORMAL', color: '#00ff88' },
                { label: 'Valve V-101', value: 'Chatter detected', status: 'ATTENTION', color: '#f59e0b', note: 'maintenance window: 14 days' },
                { label: 'Sensor PT-103', value: '0.3% drift', status: 'WATCHING', color: '#eab308', note: 'calibration due: 30 days' },
                { label: 'System Efficiency', value: '93.2% HHV', status: 'OPTIMAL', color: '#00ff88' },
              ].map((row, i, arr) => (
                <div key={row.label} className="flex items-start gap-3 border-l border-white/10 pl-4" style={{ borderColor: i === arr.length - 1 ? 'transparent' : undefined }}>
                  <div className="h-2 w-2 mt-1.5 rounded-full shrink-0" style={{ backgroundColor: row.color, boxShadow: `0 0 6px ${row.color}60` }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-white/40 text-xs">{row.label}</span>
                      <span className="text-xs font-bold tracking-[0.08em]" style={{ color: row.color }}>{row.status}</span>
                    </div>
                    <div className="text-white/80 text-sm">{row.value}</div>
                    {row.note && <div className="text-[0.65rem] text-white/45 mt-0.5">{row.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI capabilities list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {[
              'Reads live process data from every sensor in real-time',
              'Detects valve chatter before it becomes valve failure',
              'Identifies sensor drift and flags calibration needs',
              'Monitors efficiency trends and predicts degradation',
              'Sends alerts to BOTH Tobe AND the operator',
              'Enables planned maintenance, never emergency maintenance',
              'Learns from every operating hour across the entire fleet',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/60">
                <span className="mt-0.5 text-[#ff6b35]">▸</span>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Thesis callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-8 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] p-6"
          >
            <p className="text-center text-sm font-semibold text-[#ff6b35] md:text-base"
              style={{ textShadow: '0 0 12px rgba(255,107,53,0.3)' }}
            >
              Energy projects don&apos;t fail because of technology.
              They fail because of complexity. NODE-01 eliminates complexity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE EXPERIENCE ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">04 //</span>
            <h2 className="text-2xl font-bold tracking-tight">The Experience</h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 text-lg font-semibold text-[#ff6b35]"
            style={{ textShadow: '0 0 15px rgba(255,107,53,0.3)' }}
          >
            ▸ DESIGNED TO INSPIRE
          </motion.p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experienceCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]"
                style={{ borderColor: `${card.color}20` }}
              >
                <div className="mb-3 text-[0.65rem] font-bold tracking-[0.15em]" style={{ color: card.color }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-2 text-sm font-bold text-white/90">{card.title}</h3>
                <p className="text-xs leading-relaxed text-white/50">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY THIS MATTERS ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">05 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Why This Matters</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6"
          >
            <div className="mb-4 text-xs font-bold tracking-[0.2em] text-[#ff6b35]">
              ▸ INVESTOR SIGNIFICANCE
            </div>
            <div className="space-y-4">
              {investorPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 1}
                  variants={fadeUp}
                  className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[0.6rem] font-bold text-[#0a0a0f]"
                    style={{ backgroundColor: '#ff6b35' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-white/90">{point.label}</span>
                    <span className="text-sm text-white/50"> — {point.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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
