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

// ─── Avatar system ───
const AVATAR_PALETTE = [
  '#ff6b35', // orange
  '#3b82f6', // blue
  '#22c55e', // green
  '#eab308', // gold
  '#a855f7', // purple
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.replace(/^Dr\.\s*/i, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({
  name,
  image,
  size = 80,
  isAI = false,
}: {
  name: string;
  image?: string;
  size?: number;
  isAI?: boolean;
}) {
  const color = AVATAR_PALETTE[hashName(name) % AVATAR_PALETTE.length];
  const initials = isAI ? 'AI' : getInitials(name);
  const fontSize = size >= 96 ? 'text-2xl' : size >= 80 ? 'text-lg' : 'text-base';

  if (image) {
    return (
      <div
        className="relative shrink-0 overflow-hidden rounded-full"
        style={{
          width: size,
          height: size,
          border: '2px solid rgba(255,255,255,0.1)',
        }}
      >
        <Image
          src={image}
          alt={name}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${fontSize}`}
      style={{
        width: size,
        height: size,
        backgroundColor: isAI ? 'rgba(255,255,255,0.05)' : color,
        border: isAI
          ? '2px solid rgba(0,212,255,0.4)'
          : '2px solid rgba(255,255,255,0.1)',
        boxShadow: isAI
          ? '0 0 12px rgba(0,212,255,0.15), inset 0 0 12px rgba(0,212,255,0.05)'
          : `0 0 12px ${color}30`,
        color: isAI ? '#00d4ff' : '#ffffff',
        textShadow: isAI ? '0 0 8px rgba(0,212,255,0.5)' : undefined,
      }}
    >
      {initials}
    </div>
  );
}

const colbyStats = [
  { label: 'INFRASTRUCTURE', value: '$75M+', color: '#ff6b35' },
  { label: 'GREENFIELD FACILITY', value: '$66MM', color: '#ff6b35' },
  { label: 'PLANTS (PSM)', value: '13', color: '#ff6b35' },
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
  'R&D Strategy',
  'Mathematical Modeling',
  'Data Analytics & AI',
  'Model Verification',
  'Scientific Communication',
];

// Team member data — add `image` path when headshots are available
// e.g. image: '/images/team/slade.jpg'
const teamMembers: {
  name: string;
  title: string;
  line: string;
  placeholder: boolean;
  image?: string;
  isAI?: boolean;
}[] = [
  { name: 'Slade', title: 'Principal Engineer', line: '15 years of electrolysis R&D and the architect of Tobe\u2019s modular dry cell. Designs custom AI programs for automated BOM scoping, electrical schematics, and PCB layout. Previously an automation expert programming industrial robots to automate every step of the manufacturing process. An open-ended problem solver who bridges electrochemistry, software, and hardware — and can honestly do anything you put in front of him.', placeholder: false },
  { name: 'Paden', title: 'Mechanical Fabrication Lead', line: 'Mechanical engineering background and a builder his entire life. Has built and deployed energy systems, motors, and field equipment in both Alaska and Antarctica. Responsible for all mechanical fabrication, custom control cabinet integration, and in-house computer builds. The mastermind behind NODE-01 — from concept through container buildout.', placeholder: false },
  { name: 'Austin', title: 'Power Electronics Engineer', line: 'Designs and deploys custom power converters end to end — 3D printing transformer bobbins, winding copper, vacuum insulation, documentation, testing, and parameter modeling. Fabricates PCBs on our in-house CNC and owns all power electronics testing and validation. Also a qualified ASME pressure vessel welder who previously made critical boiler tube repairs under the deck of large ships in hazardous environments.', placeholder: false },
  { name: 'Stealth', title: 'Engineering Physicist', line: 'Previously at a leading nuclear fusion startup, where he served as the scientist responsible for testing experimental configurations and analyzing the data behind the future of nuclear energy. At Tobe, runs the testing and validation program — overseeing data analysis, defining future test metrics, and drawing on deep experience with high-voltage power systems to drive electrolyzer performance.', placeholder: false },
  { name: 'Trey', title: 'Controls & Integration Engineer', line: 'Mechatronics engineering degree. Previously worked on Patriot missile defense systems and ran complex controls infrastructure for USPS automated sorting facilities. Sits at the intersection of controls and mechanical — responsible for integrating every subsystem in the process and building the backend architecture that ties it all together.', placeholder: false },
  { name: 'Ren', title: 'AI Operating Layer', line: 'The intelligence infrastructure behind Tobe Energy\u2019s operations. Manages investor CRM, competitive intelligence, grant tracking, document processing, overnight research, and real-time orchestration across the entire company. Built the data room you\u2019re reading, the financial model dashboard, and the AI assistant answering your questions. Processes thousands of data points daily across email, market signals, and engineering outputs. Never sleeps. Always on.', placeholder: false, isAI: true },
  { name: 'Jane', title: 'Executive Assistant', line: 'The operational backbone of Tobe Energy. Manages executive scheduling, candidate pipelines, investor coordination, office logistics, and vendor relationships. Keeps the machine running so the engineers can build.', placeholder: false },
];

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
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
            <span className="text-[#ff6b35]" style={{ textShadow: '0 0 12px rgba(255,107,53,0.5)' }}>
              Tobe Energy
            </span>
          </motion.h1>


        </div>
      </section>

      {/* ═══ COLBY DEWEESE — CEO & CO-FOUNDER ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── FOUNDER PROFILE ───┐`}
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
              <span className="text-xs font-bold tracking-[0.1em] text-[#ff6b35]">● CEO & CO-FOUNDER</span>
            </div>

            <div className="p-6 md:p-8">
              {/* Name & education */}
              <div className="flex items-start gap-5">
                <Avatar name="Colby DeWeese" size={96} /* image="/images/team/colby.jpg" */ />
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-3xl font-bold md:text-4xl"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.3)' }}
                  >
                    Colby DeWeese
                  </h2>
                  <p className="mt-2 text-sm text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>
                    ▸ CEO & Co-Founder
                  </p>
                  <p className="mt-2 text-xs text-[#ff6b35]">
                    UTulsa B.S. ChemE (Minor: Mathematics) → OU M.L.S. Oil, Gas & Energy Law → Harvard Business School CORe
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    NSF Graduate Research Fellow (Honorable Mention) · FE Certificate Holder
                  </p>
                </div>
              </div>

              {/* Bio narrative */}
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                <p>
                  Chemical engineer with an M.L.S. in Oil, Gas & Energy Law and a track record of delivering complex infrastructure at scale. At{' '}
                  <span className="text-[#ff6b35]">Marathon Petroleum</span>, Colby managed{' '}
                  <span className="text-[#ff6b35]">$75M+ in energy infrastructure</span> — including a{' '}
                  <span className="text-[#ff6b35]">$66MM greenfield natural gas processing facility</span> delivered
                  within 4% contingency with 150 contractors on site. He created company-wide Process Safety Management
                  standards across <span className="text-[#ff6b35]">13 plants</span>,{' '}
                  <span className="text-[#ff6b35]">40+ compressor stations</span>, and{' '}
                  <span className="text-[#ff6b35]">1,000+ miles of pipeline</span>.
                </p>
                <p>
                  At <span className="text-[#ff6b35]">Hydrogen Technologies LLC</span>, he served as Principal Process
                  Engineer, bringing to market the{' '}
                  <span className="text-[#ff6b35]">first-of-its-kind hydrogen boiler</span> — achieving 50% cost
                  reduction and 25% footprint reduction with several patent applications filed. He ran feasibility
                  studies for hydrogen installations at Fortune 500 companies including{' '}
                  <span className="text-white/90">Honda</span>, <span className="text-white/90">Goodyear</span>, and
                  Seattle district energy systems.
                </p>
                <p className="mt-4">
                  This is where he saw the pain of the hydrogen industry firsthand — the problem wasn&apos;t using hydrogen, it was making cost-competitive green hydrogen. Frustrated by project collaborations with industry giants, slipping schedules, and dishonest efficiency metrics, it became baked into his DNA to provide true innovation to the hydrogen industry and make it live up to its zero-emission promise. Tobe started as a garage science project to modernize electrolysis power conversion and morphed into what it is today.
                </p>
                <p className="mt-4">
                  Founded Tobe Energy in 2024. <span className="text-[#ff6b35]">Techstars NYC</span> graduate. Raised{' '}
                  <span className="text-[#ff6b35]">$1.8M pre-seed</span> and built a{' '}
                  <span className="text-[#ff6b35]">$100M+ customer pipeline</span>. Inventor behind Tobe&apos;s core technology — responsible for the chemical and process engineering, process controls and controller programming, safety systems, and separations technologies. TEDx speaker on{' '}
                  <a href="https://www.youtube.com/watch?v=VcGogXRBr1o" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] underline decoration-[#ff6b35]/30 hover:decoration-[#ff6b35]">hydrogen</a>{' '}
                  and{' '}
                  <a href="https://www.youtube.com/watch?v=e4-pm5LzSTI" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] underline decoration-[#ff6b35]/30 hover:decoration-[#ff6b35]">artificial intelligence</a>. Ironman finisher (Florida + Boulder). 100-mile ultramarathon finisher. Black belt in
                  Taekwondo, purple belt in Brazilian Jiu Jitsu.
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
                      className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.05] px-2.5 py-1 text-xs text-[#ff6b35]"
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
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── CO-FOUNDER PROFILE ───┐`}
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
              <span className="text-xs font-bold tracking-[0.2em] text-[#ff6b35]">▸ RECORD 002 // CLR</span>
              <span className="text-xs font-bold tracking-[0.1em] text-[#ff6b35]">● CO-FOUNDER & ADVISOR</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-start gap-5">
                <Avatar name="Dr. Caleb Lareau" size={96} /* image="/images/team/caleb.jpg" */ />
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-2xl font-bold md:text-3xl"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.3)' }}
                  >
                    Dr. Caleb Lareau
                  </h2>
                  <p className="mt-2 text-sm text-[#ff6b35]" style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}>
                    ▸ Co-Founder & President
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-xs font-bold text-[#ff6b35]">
                      Harvard PhD
                    </span>
                    <span className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-xs font-bold text-[#ff6b35]">
                      Stanford Postdoc
                    </span>
                    <span className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-xs font-bold text-[#ff6b35]">
                      Forbes 30 Under 30
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    Harvard PhD in mathematics and biochemistry. Stanford postdoc. Forbes 30 Under 30. Advises on R&amp;D strategy, data analytics, mathematical modeling, model verification, and scientific communication — working at the intersection of AI and research. Passionate about anything that makes the world better. In his day job, leads a team of scientists using AI to literally cure cancer via complex protein modeling.
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
                      className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.05] px-2.5 py-1 text-xs text-[#ff6b35]"
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
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── THE TEAM ───┐`}
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
                className={`rounded border p-5 ${
                  m.isAI
                    ? 'border-[#00d4ff]/20 bg-[#00d4ff]/[0.02]'
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    name={m.name}
                    image={m.image}
                    size={48}
                    isAI={m.isAI}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white/90">{m.name}</h3>
                        <p className={`mt-1 text-xs ${m.isAI ? 'text-[#00d4ff]' : 'text-[#ff6b35]'}`}>{m.title}</p>
                      </div>
                      <span className={`text-[0.6rem] ${m.isAI ? 'text-[#00d4ff]' : 'text-[#ff6b35]'}`}>
                        {m.isAI ? '◆ ONLINE' : '● ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/50">{m.line}</p>
                {m.placeholder && (
                  <p className="mt-2 text-[0.6rem] italic text-white/20">[Details coming]</p>
                )}
              </motion.div>
            ))}

            {/* Hiring roadmap — spans 2 columns, sits next to Ren */}
            <motion.div
              custom={teamMembers.length}
              variants={fadeUp}
              className="rounded border border-[#ff6b35]/20 bg-[#ff6b35]/[0.02] p-5 sm:col-span-1 lg:col-span-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white/90">Scaling to ~16</h3>
                  <p className="mt-1 text-xs text-[#ff6b35]">Next Hires</p>
                </div>
                <span className="text-[0.6rem] text-[#ff6b35]">● HIRING</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-1 text-[0.55rem] tracking-[0.12em] text-[#ff6b35]">COMMERCIAL</p>
                  <p className="text-xs text-white/50">Sales & business development lead to drive customer acquisition and manage key accounts</p>
                </div>
                <div>
                  <p className="mb-1 text-[0.55rem] tracking-[0.12em] text-[#ff6b35]">MACHINING</p>
                  <p className="text-xs text-white/50">Dedicated CNC machinist for full-time cell housing and component production</p>
                </div>
                <div>
                  <p className="mb-1 text-[0.55rem] tracking-[0.12em] text-[#ff6b35]">FABRICATION</p>
                  <p className="text-xs text-white/50">Welders and fabricators for skid assembly, piping, and container buildout</p>
                </div>
                <div>
                  <p className="mb-1 text-[0.55rem] tracking-[0.12em] text-[#ff6b35]">ENGINEERING</p>
                  <p className="text-xs text-white/50">Additional power electronics and controls engineers to support parallel unit production</p>
                </div>
              </div>
              <div className="mt-4 border-t border-white/5 pt-3">
                <p className="text-xs text-white/45">
                  Every hire maps to unit throughput. The team scales with deployments — not ahead of revenue.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ORGANIZATIONAL DNA ═══ */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── ORGANIZATIONAL DNA ───┐`}
          </pre>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="mb-6 border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-6" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
              <p className="font-sans text-[0.95rem] leading-relaxed text-white/70">
                For decades, the green hydrogen industry has been waiting for equipment costs to fall the way solar panels did. The only progress most have made is to ignore innovation and offshore manufacturing — which constantly causes large projects to fail. CF Industries wrote off a $50M electrolysis project. They won&apos;t be the last.
              </p>
              <p className="mt-4 font-sans text-[0.95rem] leading-relaxed text-white/70">
                We know industrial equipment doesn&apos;t follow consumer cost curves. The path to cheaper hydrogen isn&apos;t waiting — it&apos;s engineering.
              </p>
              <p className="mt-4 font-sans text-[0.95rem] leading-relaxed text-white/70">
                Where most startups spend years with contract engineers developing their ideas, we do it in-house. Where others outsource manufacturing, we do it in-house. When we have an issue with a board, we don&apos;t send it back to a third party who doesn&apos;t care about the outcome and wait months for a revision. We test, make the change, and have a new board on the bench the next morning.
              </p>
              <p className="mt-4 font-sans text-[0.95rem] leading-relaxed text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}>
                This is how you compress decades of innovation into a fraction of the time. It&apos;s baked into our DNA from day one, and it&apos;s something that will never change about Tobe Energy.
              </p>
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
