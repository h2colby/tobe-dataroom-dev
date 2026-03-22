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

const colbyStats = [
  { label: 'INFRASTRUCTURE', value: '$75M+', color: '#00ff88' },
  { label: 'GREENFIELD FACILITY', value: '$66MM', color: '#00d4ff' },
  { label: 'PLANTS (PSM)', value: '13', color: '#00ff88' },
  { label: 'PIPELINE MILES', value: '1,000+', color: '#ff6b35' },
];

const colbyFocus = [
  'Strategy & Vision',
  'Business Development',
  'Investor Relations',
  'Hardware Engineering',
  'Process Engineering',
];

const calebFocus = [
  'Electrode Design',
  'System Architecture',
  'R&D Strategy',
  'Data Analysis',
];

const teamMembers = [
  { name: 'Donald Trammell', title: '[Title TBD]', line: '[Bio to be provided by Colby]', placeholder: true },
  { name: 'Tirth', title: '[Title TBD]', line: '[Bio to be provided by Colby]', placeholder: true },
  { name: 'Trey', title: '[Title TBD]', line: 'Sensors & Instrumentation', placeholder: true },
  { name: 'Slade', title: '[Title TBD]', line: 'Power Engineering', placeholder: true },
  { name: 'Paden', title: '[Title TBD]', line: 'Fabrication & Manufacturing', placeholder: true },
  { name: 'Austin', title: '[Title TBD]', line: 'Transformer Design', placeholder: true },
  { name: 'Jane Quilates', title: 'Executive Assistant', line: 'Operations coordination, scheduling, candidate tracking, office logistics', placeholder: false },
];

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── THE TEAM ───┐`}
          </pre>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-3 text-sm tracking-widest text-[#ff6b35] uppercase"
          >
            ▸ Personnel
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            The People Building{' '}
            <span className="text-[#00d4ff]" style={{ textShadow: '0 0 12px rgba(0,212,255,0.5)' }}>
              Tobe Energy
            </span>
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              { label: 'FOUNDERS', value: '2', color: '#00ff88' },
              { label: 'TEAM', value: '9', color: '#00d4ff' },
              { label: 'RAISED', value: '$1.8M', color: '#00ff88' },
              { label: 'PIPELINE', value: '$100M+', color: '#ff6b35' },
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

      {/* ═══ COLBY DEWEESE — CEO & CO-FOUNDER ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── FOUNDER PROFILE ─────────────────────┐`}
          </pre>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="overflow-hidden rounded border border-[#ff6b35]/20 bg-white/[0.02]"
          >
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#ff6b35]/[0.05] px-6 py-3">
              <span className="text-xs font-bold tracking-[0.2em] text-[#ff6b35]">▸ RECORD 001 // CDW</span>
              <span className="text-xs font-bold tracking-[0.1em] text-[#00ff88]">● CEO & CO-FOUNDER</span>
            </div>

            <div className="p-6 md:p-8">
              {/* Name & education */}
              <h2
                className="text-3xl font-bold md:text-4xl"
                style={{ textShadow: '0 0 10px rgba(0,212,255,0.3)' }}
              >
                Colby DeWeese
              </h2>
              <p className="mt-2 text-sm text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>
                ▸ CEO & Co-Founder
              </p>
              <p className="mt-2 text-xs text-[#00d4ff]">
                UTulsa B.S. ChemE (Minor: Mathematics) → OU M.L.S. Oil, Gas & Energy Law → Harvard Business School CORe
              </p>
              <p className="mt-1 text-xs text-white/40">
                NSF Graduate Research Fellow (Honorable Mention) · FE Certificate Holder
              </p>

              {/* Bio narrative */}
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                <p>
                  Chemical engineer and energy lawyer with a track record of delivering complex infrastructure at scale. At{' '}
                  <span className="text-[#00ff88]">Marathon Petroleum</span>, Colby managed{' '}
                  <span className="text-[#00ff88]">$75M+ in energy infrastructure</span> — including a{' '}
                  <span className="text-[#00d4ff]">$66MM greenfield natural gas processing facility</span> delivered
                  within 4% contingency with 150 contractors on site. He created company-wide Process Safety Management
                  standards across <span className="text-[#00ff88]">13 plants</span>,{' '}
                  <span className="text-[#00ff88]">40+ compressor stations</span>, and{' '}
                  <span className="text-[#00ff88]">1,000+ miles of pipeline</span>.
                </p>
                <p>
                  At <span className="text-[#00d4ff]">Hydrogen Technologies LLC</span>, he served as Principal Process
                  Engineer, bringing to market the{' '}
                  <span className="text-[#00ff88]">first-of-its-kind hydrogen boiler</span> — achieving 50% cost
                  reduction and 25% footprint reduction with several patent applications filed. He ran feasibility
                  studies for hydrogen installations at Fortune 500 companies including{' '}
                  <span className="text-white/90">Honda</span>, <span className="text-white/90">Goodyear</span>, and
                  Seattle district energy systems.
                </p>
                <p>
                  Founded Tobe Energy in 2024. <span className="text-[#ff6b35]">Techstars NYC</span> graduate. Raised{' '}
                  <span className="text-[#00ff88]">$1.8M pre-seed</span> and built a{' '}
                  <span className="text-[#00ff88]">$100M+ customer pipeline</span>. Personally runs CNC machines,
                  designs PCBs in KiCad, programs firmware, and tests every unit that ships. TEDx speaker on{' '}
                  <a href="https://www.youtube.com/watch?v=VcGogXRBr1o" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] underline decoration-[#00d4ff]/30 hover:decoration-[#00d4ff]">hydrogen</a>{' '}
                  and AI/genomics. Ironman finisher (Florida + Boulder). 100-mile ultramarathon finisher. Black belt in
                  Taekwondo, blue belt in Brazilian Jiu Jitsu.
                </p>
              </div>

              {/* Key stats row */}
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {colbyStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i + 1}
                    variants={fadeUp}
                    className="rounded border border-white/10 bg-white/[0.03] p-3 text-center"
                  >
                    <p className="mb-1 text-[0.6rem] tracking-[0.12em] text-[#ff6b35]">{s.label}</p>
                    <p
                      className="text-xl font-bold md:text-2xl"
                      style={{ color: s.color, textShadow: `0 0 8px ${s.color}40` }}
                    >
                      {s.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Additional stat badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'First-of-kind H₂ boiler to market',
                  'Fortune 500 feasibility studies',
                  'Techstars NYC 2024',
                  'FE Certificate',
                  '40+ compressor stations (PSM)',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-[0.6rem] text-white/50"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Focus areas */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="mb-2 text-[0.65rem] tracking-widest text-[#ff6b35]/70">FOCUS AREAS:</p>
                <div className="flex flex-wrap gap-2">
                  {colbyFocus.map((f) => (
                    <span
                      key={f}
                      className="rounded border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] px-2.5 py-1 text-xs text-[#00d4ff]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DR. CALEB LAREAU — CO-FOUNDER & ADVISOR ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── CO-FOUNDER PROFILE ──────────────────┐`}
          </pre>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="overflow-hidden rounded border border-[#00d4ff]/20 bg-white/[0.02]"
          >
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#00d4ff]/[0.05] px-6 py-3">
              <span className="text-xs font-bold tracking-[0.2em] text-[#00d4ff]">▸ RECORD 002 // CLR</span>
              <span className="text-xs font-bold tracking-[0.1em] text-[#00ff88]">● CO-FOUNDER & ADVISOR</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h2
                    className="text-2xl font-bold md:text-3xl"
                    style={{ textShadow: '0 0 10px rgba(0,212,255,0.3)' }}
                  >
                    Dr. Caleb Lareau
                  </h2>
                  <p className="mt-2 text-sm text-[#00d4ff]" style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>
                    ▸ Co-Founder & Advisor
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded border border-[#00ff88]/30 bg-[#00ff88]/10 px-2.5 py-1 text-xs font-bold text-[#00ff88]">
                      Harvard PhD
                    </span>
                    <span className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-xs font-bold text-[#ff6b35]">
                      Forbes 30 Under 30
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    Harvard PhD in mathematics and biochemistry. Advises on data analysis, research methodology, and
                    technical strategy. His work on electrode design and system architecture underpins Tobe&apos;s{' '}
                    <span className="text-[#00ff88]">94% HHV efficiency</span> benchmark.
                  </p>
                </div>
              </div>

              {/* Focus areas */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="mb-2 text-[0.65rem] tracking-widest text-[#ff6b35]/70">FOCUS AREAS:</p>
                <div className="flex flex-wrap gap-2">
                  {calebFocus.map((f) => (
                    <span
                      key={f}
                      className="rounded border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] px-2.5 py-1 text-xs text-[#00d4ff]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TEAM GRID ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── THE TEAM ────────────────────────────┐`}
          </pre>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">03 //</span>
            <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                custom={i}
                variants={fadeUp}
                className="rounded border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white/90">{m.name}</h3>
                    <p className="mt-1 text-xs text-[#ff6b35]">{m.title}</p>
                  </div>
                  <span className="text-[0.6rem] text-[#00ff88]">● ACTIVE</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/50">{m.line}</p>
                {m.placeholder && (
                  <p className="mt-2 text-[0.6rem] italic text-white/20">[Details coming]</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ORGANIZATIONAL DNA ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── ORGANIZATIONAL DNA ──────────────────────────────────┐`}
          </pre>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="rounded border border-white/10 bg-white/[0.02] p-6"
          >
            <pre className="overflow-x-auto text-[0.6rem] leading-relaxed text-white/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  FOUNDING PRINCIPLE:                                  ║
║  Engineers who CNC their own PCBs, design their       ║
║  own power electronics, and write their own firmware.  ║
║                                                       ║
║  > 2 founders + 7 team members                        ║
║  > Vertically integrated — design to deployment       ║
║  > Oklahoma-based. Domestically manufactured.         ║
║                                                       ║
║  TEAM SIZE: 9                                         ║
║  LOCATION: Oklahoma, USA                              ║
║  FOUNDED:  2024                                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝`}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-5xl text-center">
          <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
{`═══════════════════════════════════════════════════════════
 TOBE ENERGY CORP // CONFIDENTIAL // 2026
═══════════════════════════════════════════════════════════`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
