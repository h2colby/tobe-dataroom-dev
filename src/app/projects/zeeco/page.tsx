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

const specs = [
  { param: 'Configuration', value: '12× T-25 Electrolyzers' },
  { param: 'Total Power', value: '600 kW' },
  { param: 'H₂ Output', value: '300 kg/day' },
  { param: 'H₂ Purity', value: '≥99.99%' },
  { param: 'Output Pressure', value: '50 psig (3.08 bar)' },
  { param: 'Operating Temp', value: '~28°C (near ambient)' },
  { param: 'Water Consumption', value: '10 kg H₂O per kg H₂' },
  { param: 'Heat Rejection', value: '<50 kW total' },
  { param: 'Electrical Supply', value: '480VAC 3-Phase' },
  { param: 'Stack Life', value: '80,000+ hours' },
  { param: 'Field Swap Time', value: '30 minutes (demonstrated)' },
];

const documents = [
  { number: 'TOBE-FEED-PKG-001', title: 'FEED Package Transmittal', file: 'proj-feed-zeeco-package.pdf', desc: 'Complete front-end engineering design package (26 pages)', size: '4.2 MB' },
  { number: 'TOBE-PFD-001', title: 'Process Flow Diagram', file: 'proj-feed-zeeco-pfd.pdf', desc: 'Full process flow with energy balance and stream data', size: '1.8 MB' },
  { number: 'TOBE-PID-001', title: 'P&ID - Electrolyzer Skid', file: 'proj-feed-zeeco-pid.pdf', desc: 'Piping and instrumentation diagram for the electrolyzer system', size: '2.1 MB' },
  { number: 'TOBE-EL-001', title: 'Electrical One-Line', file: 'proj-feed-zeeco-electrical.pdf', desc: 'Electrical distribution one-line diagram (480VAC)', size: '1.4 MB' },
  { number: 'TOBE-GA-001', title: 'General Arrangement', file: 'proj-feed-zeeco-general-arrangement.pdf', desc: 'Site layout and equipment general arrangement drawings', size: '3.6 MB' },
];

const timeline = [
  { date: 'Q4 2025', label: 'FEED Package Issued (Rev A)', status: 'complete' as const },
  { date: 'Q1 2026', label: 'Transmittal #1 Review', status: 'complete' as const },
  { date: 'Q3 2026', label: 'Site Preparation & Equipment Installation', status: 'active' as const },
  { date: 'Q3 2026', label: 'Commissioning & Startup', status: 'upcoming' as const },
  { date: 'Q4 2026', label: 'Full Production & Performance Validation', status: 'upcoming' as const },
  { date: '2027+', label: 'Phase 2 — T-125 (250 kW) Validation Unit', status: 'upcoming' as const },
];

const tobeScope = [
  'Electrolyzers (12× T-25)',
  'Power electronics',
  'Control system (PLC-101)',
  'Gas separation (SEP-101/102)',
  'H₂ purification (PU-101, DR-101)',
  'Commissioning & startup',
];

const zeecoScope = [
  'Water treatment (RO-101, DI-101, TK-101)',
  'Electrical infrastructure (480VAC)',
  'Flare system (FL-101)',
  'Site preparation',
  'Civil/structural',
  'Utilities connections',
];

const investorPoints = [
  'First commercial validation of membrane-free electrolysis at scale',
  '12-unit deployment proves manufacturing repeatability',
  'World-class partner validates the technology (Zeeco = B+ revenue, 1000+ employees)',
  'Zeeco currently pays $30/kg for delivered hydrogen — Tobe produces at <$5/kg',
  'Path to Phase 2 (T-125) built into the contract',
  'Generates real-world performance data for investor diligence',
];

export default function ZeecoPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── PROJECT 001 ─── ZEECO ARC DEPLOYMENT ───┐`}
          </pre>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block rounded border border-[#ff6b35]/40 bg-[#ff6b35]/10 px-3 py-1"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[#00ff88]">● CONTRACTED</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-3 text-sm tracking-widest text-[#ff6b35] uppercase"
          >
            ▸ First Commercial Installation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            Zeeco ARC{' '}
            <span className="text-[#ff6b35]" style={{ textShadow: '0 0 12px rgba(255,107,53,0.5)' }}>
              Deployment
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-white/60"
          >
            12× T-25 electrolyzers at the world&apos;s largest combustion equipment
            manufacturer. Broken Arrow, Oklahoma. Proof of technology at commercial scale.
          </motion.p>

          {/* Technical Hero Diagram — 12× T-25 Unit Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-10 overflow-hidden rounded-lg border border-[#ff6b35]/20 bg-[#0c0c14]"
          >
            <div className="border-b border-[#ff6b35]/15 bg-[#ff6b35]/[0.04] px-5 py-3 flex items-center justify-between">
              <span className="text-xs tracking-[0.15em] text-[#ff6b35] font-bold">▸ SYSTEM LAYOUT — 12× T-25 ELECTROLYZERS</span>
              <span className="text-[0.65rem] tracking-[0.1em] text-white/40">TOP-DOWN VIEW</span>
            </div>
            <div className="p-6 sm:p-8">
              <svg viewBox="0 0 680 280" className="mx-auto w-full max-w-5xl" style={{ maxHeight: '420px' }}>
                <defs>
                  <filter id="orangeGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="greenGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Grid background lines */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={`vg-${i}`} x1={Math.round(i * 50)} y1={0} x2={Math.round(i * 50)} y2={280} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={`hg-${i}`} x1={0} y1={Math.round(i * 50)} x2={680} y2={Math.round(i * 50)} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                ))}

                {/* Shared bus bar (horizontal) */}
                <rect x={60} y={128} width={420} height={6} fill="rgba(255,107,53,0.25)" rx={3} />
                <rect x={60} y={130} width={420} height={2} fill="rgba(255,107,53,0.6)" rx={1} />
                <text x={270} y={122} textAnchor="middle" fill="rgba(255,107,53,0.85)" fontSize="10" fontFamily="monospace" fontWeight="bold">480VAC BUS</text>

                {/* T-25 units — Row 1 (top, 6 units) */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const x = Math.round(70 + i * 68);
                  const y = 40;
                  return (
                    <g key={`t1-${i}`} filter="url(#orangeGlow)">
                      <rect x={x} y={y} width={52} height={70} rx={4} fill="rgba(255,107,53,0.1)" stroke="rgba(255,107,53,0.55)" strokeWidth={1.5} />
                      <text x={Math.round(x + 26)} y={Math.round(y + 26)} textAnchor="middle" fill="#ff6b35" fontSize="11" fontFamily="monospace" fontWeight="bold">{`T-25`}</text>
                      <text x={Math.round(x + 26)} y={Math.round(y + 41)} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace">{`#${String(i + 1).padStart(2, '0')}`}</text>
                      <text x={Math.round(x + 26)} y={Math.round(y + 56)} textAnchor="middle" fill="rgba(255,107,53,0.9)" fontSize="9" fontFamily="monospace" fontWeight="bold">50kW</text>
                      {/* Connection line to bus */}
                      <line x1={Math.round(x + 26)} y1={Math.round(y + 70)} x2={Math.round(x + 26)} y2={128} stroke="rgba(255,107,53,0.4)" strokeWidth={1.5} strokeDasharray="4,3" />
                    </g>
                  );
                })}

                {/* T-25 units — Row 2 (bottom, 6 units) */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const x = Math.round(70 + i * 68);
                  const y = 152;
                  return (
                    <g key={`t2-${i}`} filter="url(#orangeGlow)">
                      <rect x={x} y={y} width={52} height={70} rx={4} fill="rgba(255,107,53,0.1)" stroke="rgba(255,107,53,0.55)" strokeWidth={1.5} />
                      <text x={Math.round(x + 26)} y={Math.round(y + 26)} textAnchor="middle" fill="#ff6b35" fontSize="11" fontFamily="monospace" fontWeight="bold">{`T-25`}</text>
                      <text x={Math.round(x + 26)} y={Math.round(y + 41)} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace">{`#${String(i + 7).padStart(2, '0')}`}</text>
                      <text x={Math.round(x + 26)} y={Math.round(y + 56)} textAnchor="middle" fill="rgba(255,107,53,0.9)" fontSize="9" fontFamily="monospace" fontWeight="bold">50kW</text>
                      {/* Connection line to bus */}
                      <line x1={Math.round(x + 26)} y1={y} x2={Math.round(x + 26)} y2={134} stroke="rgba(255,107,53,0.4)" strokeWidth={1.5} strokeDasharray="4,3" />
                    </g>
                  );
                })}

                {/* Shared infrastructure block — right side */}
                <rect x={520} y={40} width={140} height={182} rx={5} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
                <text x={590} y={60} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="0.12em">SHARED INFRA</text>

                {/* Sub-blocks */}
                <rect x={530} y={72} width={120} height={28} rx={3} fill="rgba(255,107,53,0.08)" stroke="rgba(255,107,53,0.4)" strokeWidth={1} />
                <text x={590} y={90} textAnchor="middle" fill="rgba(255,107,53,0.9)" fontSize="9" fontFamily="monospace">PLC-101 Controls</text>

                <rect x={530} y={108} width={120} height={28} rx={3} fill="rgba(255,107,53,0.08)" stroke="rgba(255,107,53,0.4)" strokeWidth={1} />
                <text x={590} y={126} textAnchor="middle" fill="rgba(255,107,53,0.9)" fontSize="9" fontFamily="monospace">SEP-101/102 Gas Sep</text>

                <rect x={530} y={144} width={120} height={28} rx={3} fill="rgba(255,107,53,0.08)" stroke="rgba(255,107,53,0.4)" strokeWidth={1} />
                <text x={590} y={162} textAnchor="middle" fill="rgba(255,107,53,0.9)" fontSize="9" fontFamily="monospace">PU-101 Purification</text>

                <rect x={530} y={180} width={120} height={28} rx={3} fill="rgba(0,255,136,0.08)" stroke="rgba(0,255,136,0.4)" strokeWidth={1.5} filter="url(#greenGlow)" />
                <text x={590} y={198} textAnchor="middle" fill="rgba(0,255,136,0.9)" fontSize="9" fontFamily="monospace" fontWeight="bold">H&#8322; OUT: 99.99%</text>

                {/* Connection line from bus to infra */}
                <line x1={480} y1={131} x2={520} y2={131} stroke="rgba(255,107,53,0.6)" strokeWidth={3} />
                <polygon points="514,126 526,131 514,136" fill="rgba(255,107,53,0.7)" />
              </svg>

              {/* Specs bar below diagram */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-[#ff6b35]/10 pt-5">
                {[
                  { label: '600 kW', sub: 'total power' },
                  { label: '300 kg H\u2082/day', sub: 'output' },
                  { label: '12\u00D7 T-25', sub: 'electrolyzers' },
                  { label: 'Q2 2026', sub: 'deployment' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="text-xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 12px rgba(255,107,53,0.4)' }}>{stat.label}</span>
                    <span className="ml-2 text-xs tracking-[0.1em] text-white/50 uppercase">{stat.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              { label: 'UNITS', value: '12× T-25', color: '#ff6b35' },
              { label: 'TOTAL POWER', value: '600 kW', color: '#ff6b35' },
              { label: 'H₂ OUTPUT', value: '300 kg/day', color: '#ff6b35' },
              { label: 'TARGET', value: 'Q4 2026', color: '#ff6b35' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-4 text-center"
              >
                <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">{s.label}</p>
                <p
                  className="text-2xl font-bold md:text-3xl"
                  style={{ color: s.color, textShadow: `0 0 10px ${s.color}50` }}
                >
                  {s.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT ZEECO ═══ */}
      <section className="border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded border border-white/10 border-l-[3px] border-l-[#ff6b35] bg-white/[0.02] p-5"
          >
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-white/45 uppercase">About Zeeco</p>
            <p className="text-sm leading-relaxed text-white/80">
              Zeeco is a global leader in combustion and environmental solutions, headquartered
              in Broken Arrow, Oklahoma. With operations in 150+ countries and 30+ years of
              engineering leadership, their selection of Tobe Energy for on-site hydrogen
              production validates the technology at an industrial scale. The Zeeco ARC deployment
              represents Tobe&apos;s first commercial installation&nbsp;&mdash;&nbsp;
              <span className="text-[#ff6b35]">600 kW</span>,{' '}
              <span className="text-[#ff6b35]">12 T-25 units</span>, producing{' '}
              <span className="text-[#ff6b35]">300 kg H&#8322;/day</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROJECT OVERVIEW ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── PROJECT OVERVIEW ───┐`}
          </pre>
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">01 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Project Overview</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="space-y-4 text-sm leading-relaxed text-white/70"
          >
            <p>
              <span className="text-[#ff6b35]">Zeeco Inc.</span> is the world&apos;s largest combustion
              equipment manufacturer — a privately held company with B+ annual revenue, 1,000+ employees,
              and installations in over 100 countries. Their{' '}
              <span className="text-[#ff6b35]">Advanced Research Center (ARC)</span> in Broken Arrow,
              Oklahoma is one of the largest combustion R&amp;D facilities on the planet, where they test
              and validate combustion systems for the world&apos;s biggest energy companies.
            </p>
            <p>
              <span className="text-white/90">Why this matters:</span> Zeeco&apos;s ARC clients are already
              asking for hydrogen. The combustion industry is transitioning to hydrogen-blended and pure
              hydrogen fuels, and Zeeco is <span className="text-[#ff6b35]">actively pitching Tobe as
              their hydrogen production partner</span> to these clients. This isn&apos;t just a single
              deployment — it&apos;s a channel into Zeeco&apos;s global customer base.
            </p>
            <p>
              <span className="text-white/90">Why Zeeco accelerates us:</span> Zeeco handles all{' '}
              <span className="text-[#ff6b35]">OSBL (outside battery limits) engineering, procurement,
              and construction</span> — water treatment, electrical infrastructure, civil/structural,
              flare systems, and utilities connections. This lets our small team stay focused on what&apos;s
              novel: the electrolyzers, power electronics, and controls. We don&apos;t waste time
              re-engineering commodity infrastructure that&apos;s been done a thousand times before.
            </p>
            <p>
              <span className="text-white/90">Permitting advantage:</span> Our installation falls under{' '}
              <span className="text-[#ff6b35]">Zeeco&apos;s existing facility permits</span>. What isn&apos;t
              already covered is handled through the city of Broken Arrow, and Zeeco has already initiated
              those conversations. This <span className="text-[#ff6b35]">dramatically compresses our
              time to market</span> — no multi-year permitting cycles, no environmental impact studies
              for a greenfield site. We plug into an existing industrial facility with an existing
              relationship with regulators.
            </p>
            <p className="text-white/50">
              Zeeco currently pays <span className="text-[#ff6b35]">$30/kg</span> for delivered hydrogen.
              Tobe produces at <span className="text-[#ff6b35]">&lt;$5/kg</span>. Phase 2 adds a{' '}
              <span className="text-[#ff6b35]">T-125 validation unit</span> (250 kW, 125 kg/day) to
              demonstrate the next-generation platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ SYSTEM SPECIFICATIONS ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SYSTEM SPECIFICATIONS ───┐`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">02 //</span>
            <h2 className="text-2xl font-bold tracking-tight">System Specifications</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="overflow-hidden rounded border border-white/10 bg-white/[0.02]"
          >
            <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-xs tracking-[0.15em] text-[#ff6b35]">▸ ZEECO ARC — PHASE 1 CONFIGURATION</span>
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
                  <span className="text-sm font-semibold text-[#ff6b35]">{s.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROCESS FLOW ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── PROCESS FLOW ───┐`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">03 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Process Flow</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="rounded border border-white/10 bg-[#0a0a0f] p-6"
          >
            {/* Stage 1: Water Treatment */}
            <div className="mb-2">
              <span className="text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">WATER TREATMENT — ZEECO SCOPE</span>
            </div>
            <div className="mb-1 flex items-center gap-2">
              {[
                { id: 'RO-101', label: 'Reverse Osmosis', sub: '8,000 kg/d' },
                { id: 'DI-101', label: 'DI Polishing', sub: '' },
                { id: 'TK-101', label: 'Buffer Tank', sub: '' },
              ].map((eq, i) => (
                <div key={eq.id} className="flex items-center gap-2">
                  <div className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] px-3 py-2 text-center min-w-[100px]">
                    <p className="text-[0.6rem] font-bold text-[#ff6b35]">{eq.id}</p>
                    <p className="text-[0.5rem] text-white/40">{eq.label}</p>
                    {eq.sub && <p className="text-[0.5rem] text-white/25">{eq.sub}</p>}
                  </div>
                  {i < 2 && <span className="text-[#ff6b35]/40">→</span>}
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div className="my-3 flex justify-center">
              <div className="h-6 w-px bg-gradient-to-b from-[#ff6b35]/30 to-[#ff6b35]/30" />
            </div>

            {/* Stage 2: Electrolysis */}
            <div className="mb-2">
              <span className="text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">ELECTROLYSIS — TOBE SCOPE</span>
            </div>
            <div className="mb-1 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#ff6b35]">EL-101 · 12× T-25 Electrolyzers</p>
                  <p className="text-xs text-white/40">600 kW total · PLC-101 Controls</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>300 kg/day</p>
                  <p className="text-[0.5rem] text-white/45">H₂ OUTPUT</p>
                </div>
              </div>
            </div>

            {/* Arrow down split */}
            <div className="my-3 flex justify-center">
              <div className="h-6 w-px bg-gradient-to-b from-[#ff6b35]/30 to-[#ff6b35]/30" />
            </div>

            {/* Stage 3: Gas Separation */}
            <div className="mb-2">
              <span className="text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">GAS SEPARATION</span>
            </div>
            <div className="mb-1 flex items-center gap-4">
              <div className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] px-3 py-2 text-center min-w-[100px]">
                <p className="text-[0.6rem] font-bold text-[#ff6b35]">SEP-101</p>
                <p className="text-[0.5rem] text-white/40">H₂ Stream</p>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-center min-w-[100px]">
                <p className="text-[0.6rem] font-bold text-white/50">SEP-102</p>
                <p className="text-[0.5rem] text-white/45">O₂ Vent</p>
              </div>
            </div>

            {/* Arrow down */}
            <div className="my-3 flex justify-center">
              <div className="h-6 w-px bg-gradient-to-b from-[#ff6b35]/30 to-[#ff6b35]/30" />
            </div>

            {/* Stage 4: Purification */}
            <div className="mb-2">
              <span className="text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">PURIFICATION</span>
            </div>
            <div className="mb-1 flex items-center gap-2">
              {[
                { id: 'PU-101', label: 'Catalytic DeOx' },
                { id: 'DR-101', label: 'Mole Sieve Dryer' },
              ].map((eq, i) => (
                <div key={eq.id} className="flex items-center gap-2">
                  <div className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] px-3 py-2 text-center min-w-[100px]">
                    <p className="text-[0.6rem] font-bold text-[#ff6b35]">{eq.id}</p>
                    <p className="text-[0.5rem] text-white/40">{eq.label}</p>
                  </div>
                  {i < 1 && <span className="text-[#ff6b35]/40">→</span>}
                </div>
              ))}
              <span className="text-[#ff6b35]/40">→</span>
              <div className="rounded border border-[#ff6b35]/40 bg-[#ff6b35]/[0.08] px-3 py-2 text-center min-w-[100px]">
                <p className="text-sm font-bold text-[#ff6b35]">≥99.99%</p>
                <p className="text-[0.5rem] text-white/40">Dry H₂</p>
              </div>
            </div>

            {/* Arrow down split to phases */}
            <div className="my-3 flex justify-center">
              <div className="h-6 w-px bg-gradient-to-b from-[#ff6b35]/30 to-white/10" />
            </div>

            {/* Phase 1 + Phase 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] px-4 py-3 text-center">
                <p className="mb-1 text-[0.55rem] tracking-[0.15em] text-[#ff6b35]">PHASE 1</p>
                <p className="text-sm font-bold text-white/70">FL-101 · Flare</p>
                <p className="text-[0.5rem] text-white/45">Zeeco scope · Commissioning validation</p>
              </div>
              <div className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/[0.05] px-4 py-3 text-center">
                <p className="mb-1 text-[0.55rem] tracking-[0.15em] text-[#ff6b35]">PHASE 2</p>
                <p className="text-sm font-bold text-white/70">VS-101 · T-125</p>
                <p className="text-[0.5rem] text-white/45">250 kW · 125 kg/day · Next-gen validation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEED PACKAGE / ENGINEERING DOCUMENTS ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── ENGINEERING DOCUMENTS ───┐`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">04 //</span>
            <h2 className="text-2xl font-bold tracking-tight">FEED Package &amp; Engineering Documents</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {documents.map((doc, i) => (
              <motion.a
                key={doc.number}
                href={`/docs/proj/feed/${doc.file}`}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group block rounded border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#ff6b35]/30 hover:bg-[#ff6b35]/[0.03]"
              >
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">{doc.number}</span>
                  <span className="text-[0.6rem] text-white/45">{doc.size}</span>
                </div>
                <p className="mb-1 text-sm font-semibold text-white/90 group-hover:text-[#ff6b35]">
                  {doc.title}
                </p>
                <p className="mb-3 text-xs text-white/40">{doc.desc}</p>
                <div className="flex items-center gap-2 text-xs text-white/45 group-hover:text-[#ff6b35]/60">
                  <span>↓</span>
                  <span className="font-mono">{doc.file}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEPLOYMENT TIMELINE ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── DEPLOYMENT TIMELINE ───┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">05 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Deployment Timeline</h2>
          </div>

          <div className="relative ml-4 border-l-2 border-white/10 pl-8">
            {timeline.map((t, i) => (
              <motion.div
                key={`${t.date}-${i}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="relative mb-8 last:mb-0"
              >
                {/* Node */}
                <div
                  className={`absolute -left-[2.55rem] top-1 h-3 w-3 rounded-full border-2 ${
                    t.status === 'complete'
                      ? 'border-[#00ff88] bg-[#00ff88]'
                      : t.status === 'active'
                      ? 'border-[#ff6b35] bg-[#ff6b35]'
                      : 'border-white/30 bg-transparent'
                  }`}
                  style={
                    t.status === 'complete'
                      ? { boxShadow: '0 0 8px rgba(0,255,136,0.5)' }
                      : t.status === 'active'
                      ? { boxShadow: '0 0 8px rgba(255,107,53,0.5)' }
                      : {}
                  }
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span
                    className={`text-sm font-bold ${
                      t.status === 'complete'
                        ? 'text-[#00ff88]'
                        : t.status === 'active'
                        ? 'text-[#ff6b35]'
                        : 'text-white/40'
                    }`}
                  >
                    {t.date}
                  </span>
                  <span className="text-sm text-white/70">{t.label}</span>
                  {t.status === 'complete' && (
                    <span className="text-xs font-bold tracking-[0.1em] text-[#00ff88]">✓ COMPLETE</span>
                  )}
                  {t.status === 'active' && (
                    <span className="text-xs font-bold tracking-[0.1em] text-[#ff6b35]">▸ IN PROGRESS</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCOPE SPLIT ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SCOPE OF WORK ───┐`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">06 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Scope Split</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6"
            >
              <div className="mb-4 border-b border-[#ff6b35]/20 pb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-[#ff6b35]">TOBE SCOPE</span>
              </div>
              <div className="space-y-3">
                {tobeScope.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#ff6b35]">▸</span>
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.03] p-6"
            >
              <div className="mb-4 border-b border-[#ff6b35]/20 pb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-[#ff6b35]">ZEECO SCOPE</span>
              </div>
              <div className="space-y-3">
                {zeecoScope.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#ff6b35]">▸</span>
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ WHY THIS MATTERS ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── INVESTOR SIGNIFICANCE ───┐`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">07 //</span>
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
              ▸ MILESTONE SIGNIFICANCE
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
                  <span className="text-sm text-white/70">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div className="h-16" />
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
