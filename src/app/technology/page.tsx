export const metadata = {
  title: 'Technology | Tobe Energy',
  description: 'Membrane-free hydrogen electrolysis technology overview',
};

const stats = [
  { label: 'System Efficiency', value: '94%', detail: 'Near-theoretical maximum' },
  { label: 'Membrane Cost', value: '$0', detail: 'Membrane-free architecture' },
  { label: 'Rare Earth Metals', value: 'Zero', detail: 'No critical mineral dependency' },
  { label: 'Stack Lifetime', value: '80k+ hrs', detail: 'Reduced degradation pathways' },
];

const advantages = [
  {
    title: 'Membrane-Free Design',
    description:
      'Eliminates the most expensive and failure-prone component in conventional electrolyzers. No proton exchange membrane means lower cost, simpler maintenance, and dramatically longer operational life.',
  },
  {
    title: '94% System Efficiency',
    description:
      'Our proprietary electrode geometry and flow dynamics achieve near-theoretical energy conversion. More hydrogen per kilowatt-hour means faster payback and lower levelized cost.',
  },
  {
    title: 'No Rare Earth Dependency',
    description:
      'Built entirely from abundant, domestically sourced materials. No iridium, no platinum, no supply chain bottlenecks. Scalable without geopolitical risk.',
  },
  {
    title: 'Modular & Scalable',
    description:
      'Stack-based architecture scales from kilowatt pilot units to multi-megawatt deployments. Drop-in integration with existing renewable energy and industrial hydrogen infrastructure.',
  },
];

export default function TechnologyPage() {
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
{`┌─── SECTION 01 ─── TECHNOLOGY OVERVIEW ──────────────────┐`}
          </pre>
          <p className="mb-3 text-sm tracking-widest text-[#ff6b35] uppercase">
            ▸ Technology Overview
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Membrane-Free{' '}
            <span className="text-[#00d4ff]" style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>
              Hydrogen Electrolysis
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60">
            A fundamentally simpler path to green hydrogen — higher efficiency,
            lower cost, zero critical mineral dependency.
          </p>

          {/* ASCII electrolyzer diagram */}
          <pre className="mt-8 text-[0.6rem] leading-tight text-[#00d4ff]/60 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`          ╔══════════════════════════════╗
          ║    MEMBRANE-FREE STACK       ║
          ║                              ║
  H₂O ──▶ ║  ┌──────┐    ┌──────┐       ║ ──▶ H₂
          ║  │ANODE │    │CATH- │       ║
          ║  │  (+) │    │ODE(-)│       ║ ──▶ O₂
          ║  └──────┘    └──────┘       ║
          ║     NO MEMBRANE BARRIER     ║
          ╚══════════════════════════════╝
             94% HHV  ·  ~25°C  ·  $0 PEM`}
          </pre>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-b border-white/10 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 02 ─── KEY METRICS ──────────────────────────┐`}
          </pre>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded border border-white/10 bg-white/[0.02] p-5"
              >
                <p className="text-xs text-white/30">▸ {s.label}</p>
                <p
                  className="mt-1 text-3xl font-bold text-[#00d4ff]"
                  style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-white/40">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 03 ─── CORE ADVANTAGES ──────────────────────┐`}
          </pre>
          <div className="grid gap-8 md:grid-cols-2">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <pre className="mb-3 text-[0.65rem] text-white/20" style={{ whiteSpace: 'pre' }}>
{`╔${'═'.repeat(46)}╗`}
                </pre>
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs text-white/30">
                    ║ {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-lg font-semibold text-[#ff6b35]"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                  >
                    {a.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  {a.description}
                </p>
                <pre className="mt-3 text-[0.65rem] text-white/20" style={{ whiteSpace: 'pre' }}>
{`╚${'═'.repeat(46)}╝`}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 04 ─── PROCESS FLOW ─────────────────────────┐`}
          </pre>

          {/* ASCII process flow */}
          <pre className="mb-8 text-[0.6rem] leading-tight text-[#00ff88]/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`    ┌─────────┐      ┌──────────────┐      ┌──────────┐
    │ WATER   │ ───▶ │ ELECTROLYSIS │ ───▶ │ H₂ OUT   │
    │  INPUT  │      │   94% HHV    │      │ 99.999%  │
    └─────────┘      └──────────────┘      └──────────┘
         │                  │                    │
    Standard         No membrane           High-purity
    feedwater         barrier              compressed`}
          </pre>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Water In',
                text: 'Standard feedwater enters the electrolyzer stack — no ultra-pure water requirements.',
                status: '● ACTIVE',
              },
              {
                step: '02',
                title: 'Electrolysis',
                text: 'Proprietary electrode geometry splits H₂O at 94% efficiency without a membrane barrier.',
                status: '● ACTIVE',
              },
              {
                step: '03',
                title: 'Hydrogen Out',
                text: 'High-purity hydrogen is separated, compressed, and delivered to point of use.',
                status: '● ACTIVE',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="text-3xl font-bold text-[#00d4ff]/30"
                    style={{ textShadow: '0 0 10px rgba(0,212,255,0.3)' }}
                  >
                    {s.step}
                  </span>
                  <span className="text-[0.65rem] text-[#00ff88]">{s.status}</span>
                </div>
                <h3 className="mt-2 font-semibold text-white">
                  ▸ {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 05 ─── TOBE vs CONVENTIONAL ─────────────────┐`}
          </pre>

          <div className="rounded border border-white/10 bg-white/[0.02] p-6">
            <pre className="overflow-x-auto text-[0.6rem] leading-relaxed text-white/70 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`╔═══════════════════╦════════════════╦════════════════════╗
║     METRIC        ║  CONVENTIONAL  ║   TOBE ENERGY      ║
╠═══════════════════╬════════════════╬════════════════════╣
║ Membrane          ║  PEM / AEM     ║   NONE             ║
║ Rare Earths       ║  Ir, Pt, etc.  ║   ZERO             ║
║ System Efficiency ║  60-75%        ║   94% HHV          ║
║ Operating Temp    ║  60-80°C       ║   ~25°C            ║
║ Stack Lifetime    ║  40-60k hrs    ║   80k+ hrs         ║
║ LCOH Target       ║  $4-8/kg      ║   <$3/kg           ║
╚═══════════════════╩════════════════╩════════════════════╝`}
            </pre>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#00ff88]">
              <span>●</span>
              <span>TOBE ADVANTAGE: Lower cost, longer life, simpler system</span>
            </div>
          </div>
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
