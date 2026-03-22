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

const testRuns = [
  { run: '6kW Low TDS', power: '6,012', water: 'Low TDS', h2: '0.78', rate: '2.32', sec: '~46.1', hhv: '85.5%' },
  { run: '6kW High TDS', power: '6,143', water: 'High TDS', h2: '0.78', rate: '2.30', sec: '~47.0', hhv: '83.9%' },
  { run: '15kW Low TDS', power: '14,972', water: 'Low TDS', h2: '1.94', rate: '5.76', sec: '~46.2', hhv: '85.3%' },
  { run: '15kW High TDS', power: '15,096', water: 'High TDS', h2: '0.94', rate: '1.39', sec: '\u2014', hhv: '\u2014' },
];

const comparisonRows = [
  { param: 'Specific Energy (kWh/kg)', tobe: '42\u201346', pem: '50\u201358', alk: '51\u201356' },
  { param: 'Operating Temp (\u00b0C)', tobe: '27\u201328', pem: '60\u201380', alk: '60\u201380' },
  { param: 'Membrane', tobe: 'None', pem: 'PEM (degrades)', alk: 'Diaphragm' },
  { param: 'Precious Metals', tobe: 'None', pem: 'Iridium, Platinum', alk: 'None (KOH electrolyte)' },
  { param: 'Cooling System', tobe: 'Not required', pem: 'Required', alk: 'Required' },
  { param: 'CAPEX ($/kW)', tobe: '$500 (base)', pem: '$1,400\u20132,500', alk: '$500\u20131,000' },
  { param: 'Stack Life', tobe: '80,000+ hrs (design)', pem: '40,000\u201380,000 hrs', alk: '60,000\u201390,000 hrs' },
  { param: 'Field Swap Time', tobe: '30 minutes', pem: 'Hours\u2013days', alk: 'Hours\u2013days' },
  { param: 'Water Consumption', tobe: '10 kg/kg H\u2082', pem: '10\u201312 kg/kg H\u2082', alk: '10\u201312 kg/kg H\u2082' },
  { param: 'H\u2082 Purity', tobe: '\u226599.99%', pem: '\u226599.99%', alk: '99.5\u201399.9%' },
];

const roadmap = [
  { icon: '\u2705', status: 'complete' as const, label: 'Prototype bench testing (6kW, 15kW) \u2014 4 test runs, 22K+ data points' },
  { icon: '\u2705', status: 'complete' as const, label: 'Navy SBIR N242-070 proposal with published data' },
  { icon: '\u2705', status: 'complete' as const, label: 'TEA with investment-grade efficiency analysis' },
  { icon: '\ud83d\udd04', status: 'active' as const, label: 'T-50 entering serialized production' },
  { icon: '\ud83d\udd04', status: 'active' as const, label: 'Long-duration reliability testing' },
  { icon: '\ud83d\udd04', status: 'active' as const, label: 'UL 2264A certification package (targeting Q4 2026)' },
  { icon: '\u2b1c', status: 'planned' as const, label: 'Third-party independent efficiency validation' },
  { icon: '\u2b1c', status: 'planned' as const, label: 'T-125 scale-up testing at Zeeco ARC' },
];

const operatingData = [
  { label: 'RUN ID', value: '6kW_Low_TDS' },
  { label: 'DATE', value: 'August 18, 2024' },
  { label: 'DATA POINTS', value: '22,103 @ 5-second intervals' },
  { label: 'DURATION', value: '~30.7 hours continuous' },
  { label: 'SEC', value: '46.08 kWh/kg' },
  { label: 'DUTY CYCLE', value: '60%' },
  { label: 'PULSE FREQ', value: '10-250 kHz' },
  { label: 'STACK TEMP', value: '~28\u00b0C (near ambient)' },
  { label: 'H\u2082 PRODUCED', value: '782.66g total' },
  { label: 'AC POWER', value: '~6kW steady state' },
  { label: 'PRESSURE', value: '~25 psig' },
];

export default function EfficiencyPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500 TECHNOLOGY \u2500\u2500\u2500 EFFICIENCY & TEST RESULTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
          </pre>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-3 text-sm tracking-widest text-[#ff6b35] uppercase"
          >
            \u25b8 Measured Performance Data
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            Efficiency &{' '}
            <span className="text-[#00ff88]" style={{ textShadow: '0 0 12px rgba(0,255,136,0.5)' }}>
              Test Results
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-3xl text-lg text-white/60"
          >
            Every number on this page is measured, not modeled. Wall-to-plug. AC input to H&#x2082; output. No asterisks.
          </motion.p>

          {/* Key stat cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { label: 'MEASURED SEC', value: '46.08', unit: 'kWh/kg', color: '#00ff88' },
              { label: 'OPERATING TEMP', value: '~28\u00b0C', unit: 'Near Ambient', color: '#00d4ff' },
              { label: 'DATA POINTS', value: '22,103', unit: 'Logged Samples', color: '#ff6b35' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-5 text-center"
              >
                <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">{s.label}</p>
                <p
                  className="text-3xl font-bold md:text-4xl"
                  style={{ color: s.color, textShadow: `0 0 10px ${s.color}50` }}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-white/40">{s.unit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ WALL-TO-PLUG: WHY IT MATTERS ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500 WALL-TO-PLUG: WHY IT MATTERS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
          </pre>
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">01 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Wall-to-Plug: Why It Matters</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 space-y-4 text-sm leading-relaxed text-white/70"
          >
            <p>
              Most electrolyzer companies report <span className="text-[#ff6b35]">stack efficiency</span> &mdash; the number looks great because it ignores everything else.
              Power conversion losses, balance of plant, compression, controls &mdash; all excluded.
            </p>
            <p>
              Tobe reports <span className="text-[#00ff88] font-semibold">wall-to-plug efficiency</span>: AC power in, hydrogen out.
              The number an operator actually sees on their electric bill.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="overflow-hidden rounded border border-white/10 bg-white/[0.02]"
          >
            <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-xs tracking-[0.15em] text-[#ff6b35]">\u25b8 EFFICIENCY COMPARISON &mdash; WHAT&apos;S ACTUALLY MEASURED</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="px-4 py-3 text-xs tracking-wider text-white/40">What&apos;s Measured</th>
                    <th className="px-4 py-3 text-xs tracking-wider text-white/40">PEM (Industry)</th>
                    <th className="px-4 py-3 text-xs tracking-wider text-[#00ff88]">Tobe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-4 py-3 text-white/60">Stack only</td>
                    <td className="px-4 py-3 text-white/50">50&ndash;55 kWh/kg</td>
                    <td className="px-4 py-3 font-semibold text-[#00ff88]">42.2 kWh/kg</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white/60">+ BOP &amp; auxiliaries</td>
                    <td className="px-4 py-3 text-white/50">+4&ndash;8 kWh/kg</td>
                    <td className="px-4 py-3 font-semibold text-[#00ff88]">included</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-semibold text-white/80">TRUE System (wall-to-plug)</td>
                    <td className="px-4 py-3 text-[#ff6b35]">55&ndash;63 kWh/kg</td>
                    <td className="px-4 py-3 font-bold text-[#00ff88]" style={{ textShadow: '0 0 8px rgba(0,255,136,0.4)' }}>46.08 kWh/kg</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white/60">NREL PEM benchmark</td>
                    <td className="px-4 py-3 text-white/50">~55 kWh/kg system</td>
                    <td className="px-4 py-3 text-white/30">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white/60">DOE PEM reference</td>
                    <td className="px-4 py-3 text-white/50">~57.5 kWh/kg avg</td>
                    <td className="px-4 py-3 text-white/30">&mdash;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-t border-white/5 px-4 py-2">
              <span className="text-[0.6rem] text-white/30">Source: TEA Deep Research Report, NREL ATB, ENG_PreCommit_SampleOperatingData.xlsx</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TEST RESULTS — 4 BENCH RUNS ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500 TEST RESULTS \u2500 4 BENCH RUNS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">02 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Test Results &mdash; 4 Bench Runs</h2>
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
              <span className="text-xs tracking-[0.15em] text-[#ff6b35]">\u25b8 BENCH TEST DATA &mdash; PROTOTYPE ELECTROLYZER</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">Test Run</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">Power (W)</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">Water</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">H&#x2082; (kg)</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">kg/day</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-[#00ff88]">SEC (kWh/kg)</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-[#00d4ff]">HHV Eff.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {testRuns.map((r, i) => (
                    <motion.tr
                      key={r.run}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i + 1}
                      variants={fadeUp}
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-white/80">{r.run}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white/50">{r.power}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white/50">{r.water}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white/50">{r.h2}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white/50">{r.rate}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-[#00ff88]">{r.sec}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-[#00d4ff]">{r.hhv}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-white/5 px-4 py-3">
              <p className="text-[0.65rem] text-white/40">
                Operating conditions (all runs): 60% duty cycle, pulsed waveform (10-250 kHz), ~28&deg;C stack temp, ~25 psig operating pressure
              </p>
            </div>
          </motion.div>

          {/* Callout: bench supply conservative floor */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="mt-6 rounded border-l-2 border-[#00ff88]/40 bg-[#00ff88]/[0.03] px-5 py-4"
          >
            <p className="text-sm leading-relaxed text-white/70">
              These results use a <span className="font-semibold text-[#00ff88]">standard DC bench power supply</span> &mdash; the conservative floor.
              The optimized pulsed waveform topology with resonant LLC converter achieves the{' '}
              <span className="font-bold text-[#00ff88]" style={{ textShadow: '0 0 8px rgba(0,255,136,0.4)' }}>94.7% HHV (41.6 kWh/kg at stack)</span>{' '}
              demonstrated at stack level.
            </p>
          </motion.div>

          <div className="mt-3 text-[0.6rem] text-white/30">
            Source: ENG_EfficiencyCalculations.xlsx, ENG_PreCommit_SampleOperatingData.xlsx
          </div>
        </div>
      </section>

      {/* ═══ TEA MODELING SCENARIOS ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500 TEA MODELING SCENARIOS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">03 //</span>
            <h2 className="text-2xl font-bold tracking-tight">TEA Modeling Scenarios</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {/* DOWNSIDE */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="rounded border border-red-500/30 bg-red-500/[0.03] p-5"
            >
              <div className="mb-3 border-b border-red-500/20 pb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-red-400">DOWNSIDE</span>
              </div>
              <p className="mb-1 text-2xl font-bold text-red-400">85.5% HHV</p>
              <p className="mb-1 text-sm text-white/50">~46 kWh/kg system</p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Bench power supply, unoptimized, conservative floor
              </p>
            </motion.div>

            {/* BASE CASE */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="rounded border border-[#00d4ff]/30 bg-[#00d4ff]/[0.03] p-5"
            >
              <div className="mb-3 border-b border-[#00d4ff]/20 pb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-[#00d4ff]">BASE CASE</span>
              </div>
              <p className="mb-1 text-2xl font-bold text-[#00d4ff]">&gt;92% HHV</p>
              <p className="mb-1 text-sm text-white/50">~42.8 kWh/kg</p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Conservative modeling assumption, between measured floor and demonstrated ceiling
              </p>
            </motion.div>

            {/* UPSIDE */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="rounded border border-[#00ff88]/30 bg-[#00ff88]/[0.03] p-5"
            >
              <div className="mb-3 border-b border-[#00ff88]/20 pb-2">
                <span className="text-xs font-bold tracking-[0.2em] text-[#00ff88]">UPSIDE</span>
              </div>
              <p className="mb-1 text-2xl font-bold text-[#00ff88]" style={{ textShadow: '0 0 8px rgba(0,255,136,0.4)' }}>94% HHV</p>
              <p className="mb-1 text-sm text-white/50">~41.6 kWh/kg stack</p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Optimized pulsed waveform, clean water, resonant LLC topology, demonstrated at stack level
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="mt-6 rounded border-l-2 border-[#00d4ff]/40 bg-[#00d4ff]/[0.03] px-5 py-4"
          >
            <p className="text-sm leading-relaxed text-white/70">
              The base case deliberately sits <span className="font-semibold text-[#00d4ff]">below measured performance</span>.
              If the financial model works at the conservative 42.8 kWh/kg base case, it only gets better as we optimize the full system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ OPERATING DATA SNAPSHOT ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500 OPERATING DATA SNAPSHOT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">04 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Operating Data Snapshot</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="overflow-hidden rounded border border-[#00ff88]/20 bg-[#0a0a0f]"
          >
            <div className="border-b border-[#00ff88]/20 bg-[#00ff88]/[0.05] px-4 py-2">
              <span className="text-xs tracking-[0.15em] text-[#00ff88]">
                &#x25cf; LIVE DATA LOGGER &mdash; RUN 6kW_Low_TDS &mdash; 22,103 SAMPLES
              </span>
            </div>
            <div className="p-4 font-mono text-sm">
              <pre className="text-[#00ff88]/60 text-[0.6rem]" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  TOBE ENERGY \u2500 DATA ACQUISITION SYSTEM       \u2502
\u2502  Run: 6kW_Low_TDS  |  Status: COMPLETE         \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`}
              </pre>
              <div className="mt-3 divide-y divide-white/5">
                {operatingData.map((d, i) => (
                  <div key={d.label} className="flex items-center justify-between py-2">
                    <span className="text-[0.65rem] tracking-[0.1em] text-[#ff6b35]">{d.label}</span>
                    <span className={`text-sm ${i === 4 ? 'font-bold text-[#00ff88]' : 'text-white/70'}`}
                      style={i === 4 ? { textShadow: '0 0 8px rgba(0,255,136,0.4)' } : {}}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
              <pre className="mt-3 text-[#00ff88]/40 text-[0.6rem]" style={{ whiteSpace: 'pre' }}>
{`\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
END OF LOG  |  5-sec intervals  |  22,103 pts`}
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TECHNOLOGY COMPARISON TABLE ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500 TECHNOLOGY COMPARISON \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
          </pre>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">05 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Technology Comparison</h2>
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
              <span className="text-xs tracking-[0.15em] text-[#ff6b35]">\u25b8 TOBE vs PEM vs ALKALINE</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">Parameter</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-[#00ff88]">Tobe</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">PEM (Industry)</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs tracking-wider text-white/40">Alkaline (Industry)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonRows.map((r, i) => (
                    <motion.tr
                      key={r.param}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      variants={fadeUp}
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-white/60">{r.param}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-[#00ff88]">{r.tobe}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white/50">{r.pem}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-white/50">{r.alk}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-white/5 px-4 py-2">
              <span className="text-[0.6rem] text-white/30">Source: TEA_Deep_Research_Report.md, Tobe_TEA_Narrative_v1.md, ENG data</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ VALIDATION ROADMAP ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`\u250c\u2500\u2500\u2500 VALIDATION ROADMAP \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">06 //</span>
            <h2 className="text-2xl font-bold tracking-tight">What&apos;s Next &mdash; Validation Roadmap</h2>
          </div>

          <div className="relative ml-4 border-l-2 border-white/10 pl-8">
            {roadmap.map((r, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="relative mb-6 last:mb-0"
              >
                <div
                  className={`absolute -left-[2.55rem] top-1 h-3 w-3 rounded-full border-2 ${
                    r.status === 'complete'
                      ? 'border-[#00ff88] bg-[#00ff88]'
                      : r.status === 'active'
                      ? 'border-[#ff6b35] bg-[#ff6b35]'
                      : 'border-white/30 bg-transparent'
                  }`}
                  style={
                    r.status === 'complete'
                      ? { boxShadow: '0 0 8px rgba(0,255,136,0.5)' }
                      : r.status === 'active'
                      ? { boxShadow: '0 0 8px rgba(255,107,53,0.5)' }
                      : {}
                  }
                />
                <div className="flex items-start gap-3">
                  <span
                    className={`text-sm font-semibold ${
                      r.status === 'complete'
                        ? 'text-[#00ff88]'
                        : r.status === 'active'
                        ? 'text-[#ff6b35]'
                        : 'text-white/40'
                    }`}
                  >
                    {r.status === 'complete' ? 'COMPLETE' : r.status === 'active' ? 'IN PROGRESS' : 'PLANNED'}
                  </span>
                  <span className="text-sm text-white/70">{r.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div className="h-16" />
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-5xl text-center">
          <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
{`\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
 TOBE ENERGY CORP // CONFIDENTIAL // 2026
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
