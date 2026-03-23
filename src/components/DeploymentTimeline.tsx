'use client';

import { motion, useReducedMotion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const noAnimation = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

type MilestoneStatus = 'contracted' | 'future' | 'speculative';

interface Milestone {
  date: string;
  codename: string;
  title: string;
  capacity: string;
  detail: string;
  status: MilestoneStatus;
}

const milestones: Milestone[] = [
  {
    date: 'Q3 2026',
    codename: 'NODE-01',
    title: 'Internal proving ground — first production unit long-duration testing',
    capacity: '25 kg/day',
    detail: 'T-25 unit. Validates stack life & controls',
    status: 'contracted',
  },
  {
    date: 'Q4 2026',
    codename: 'CARDINAL',
    title: 'First commercial deployment at Zeeco ARC (Broken Arrow, OK)',
    capacity: '12\u00D7 25 kg/day',
    detail: '12 T-25 units',
    status: 'contracted',
  },
  {
    date: 'Q3 2026',
    codename: 'CAMPUS',
    title: 'State university research deployment',
    capacity: '32 kg/day',
    detail: 'Replacing $105/kg bottled supply',
    status: 'contracted',
  },
  {
    date: 'Q1 2027',
    codename: 'REFINERY',
    title: 'Regional specialty chemicals',
    capacity: '500 kg/day',
    detail: 'T-125 skid. 3-year offtake @ $15/kg',
    status: 'contracted',
  },
  {
    date: '2027',
    codename: 'PHOENIX',
    title: 'California e-fuels',
    capacity: '1,250 kg/day',
    detail: '10\u00D7 T-125. Scale proof point',
    status: 'future',
  },
  {
    date: 'Jul 2027',
    codename: 'TRANSIT',
    title: 'Oregon FCEB transit',
    capacity: '500 kg/day',
    detail: '14-bus pilot. Buy America compliant',
    status: 'future',
  },
  {
    date: 'TBD',
    codename: 'FORGE-STEEL',
    title: '7 steel mills across 7 states',
    capacity: '$49M total potential',
    detail: 'Converting from liquid H\u2082',
    status: 'speculative',
  },
];

const statusColors: Record<MilestoneStatus, string> = {
  contracted: '#10b981',
  future: '#3b82f6',
  speculative: '#6b7280',
};

const statusLabels: Record<MilestoneStatus, string> = {
  contracted: 'CONTRACTED',
  future: 'IN PIPELINE',
  speculative: 'SPECULATIVE',
};

export default function DeploymentTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noAnimation : fadeUp;

  return (
    <section className="border-b border-white/10 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`\u250C\u2500\u2500\u2500 SECTION 04.1 \u2500\u2500\u2500 DEPLOYMENT TIMELINE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510`}
        </pre>

        <div className="mb-4 flex items-baseline gap-3">
          <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">01 //</span>
          <h2 className="text-2xl font-bold tracking-tight">Deployment Timeline</h2>
        </div>

        {/* ASCII horizontal timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={variants}
          className="mb-10 overflow-x-auto"
        >
          <pre
            className="text-[0.55rem] leading-tight sm:text-xs"
            style={{ whiteSpace: 'pre', minWidth: '720px' }}
          >
            <span className="text-white/45">{'   Q3 2026      Q3 2026      Q4 2026      Q1 2027       2027       Jul 2027      TBD'}</span>
{`
`}
            <span className="text-white/45">{'      \u2502           \u2502           \u2502           \u2502           \u2502           \u2502          \u2502'}</span>
{`
`}
            <span className="text-[#10b981]">{'\u2500\u2500\u2500\u2500\u2500\u25CF'}</span>
            <span className="text-[#10b981]">{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF'}</span>
            <span className="text-[#10b981]">{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF'}</span>
            <span className="text-[#10b981]">{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF'}</span>
            <span className="text-[#3b82f6]">{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF'}</span>
            <span className="text-[#3b82f6]">{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF'}</span>
            <span className="text-[#6b7280]">{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u2500\u2500\u2500'}</span>
{`
`}
            <span className="text-white/45">{'      \u2502           \u2502           \u2502           \u2502           \u2502           \u2502          \u2502'}</span>
{`
`}
            <span className="text-[#10b981]">{'   NODE-01'}</span>
            <span className="text-[#10b981]">{'      CAMPUS'}</span>
            <span className="text-[#10b981]">{'    CARDINAL'}</span>
            <span className="text-[#10b981]">{'    REFINERY'}</span>
            <span className="text-[#3b82f6]">{'     PHOENIX'}</span>
            <span className="text-[#3b82f6]">{'     TRANSIT'}</span>
            <span className="text-[#6b7280]">{'   FORGE-STEEL'}</span>
          </pre>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={variants}
          className="mb-8 flex flex-wrap gap-6 text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-6 rounded-sm bg-[#10b981]" />
            <span className="text-white/50">Contracted / Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-6 rounded-sm bg-[#3b82f6]" />
            <span className="text-white/50">In Pipeline</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-6 rounded-sm bg-[#6b7280]" />
            <span className="text-white/50">Speculative</span>
          </div>
        </motion.div>

        {/* Milestone cards */}
        <div className="space-y-4">
          {milestones.map((m, i) => {
            const color = statusColors[m.status];
            const label = statusLabels[m.status];

            return (
              <motion.div
                key={m.codename}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 2}
                variants={variants}
                className="rounded-r border-l-2 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]"
                style={{ borderColor: color }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <span
                        className="text-lg font-bold"
                        style={{ color, textShadow: `0 0 8px ${color}40` }}
                      >
                        {m.codename}
                      </span>
                      <span className="text-xs text-white/40">{m.date}</span>
                      <span
                        className="rounded-sm px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider"
                        style={{
                          color,
                          backgroundColor: `${color}10`,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <p className="text-sm text-white/70">{m.title}</p>
                    <p className="mt-1 text-xs text-white/40">{m.detail}</p>
                  </div>
                  <div className="text-right sm:min-w-[120px]">
                    <p
                      className="text-xl font-bold"
                      style={{ color, textShadow: `0 0 10px ${color}50` }}
                    >
                      {m.capacity}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
