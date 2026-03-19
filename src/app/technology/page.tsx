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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-mono text-sm tracking-widest text-[#ff6b35] uppercase">
            Technology Overview
          </p>
          <h1 className="mb-4 font-mono text-4xl font-bold tracking-tight md:text-5xl">
            Membrane-Free{' '}
            <span className="text-[#00d4ff]">Hydrogen Electrolysis</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60">
            A fundamentally simpler path to green hydrogen — higher efficiency,
            lower cost, zero critical mineral dependency.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-b border-white/10 px-6 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded border border-white/10 bg-white/[0.02] p-5"
            >
              <p className="font-mono text-3xl font-bold text-[#00d4ff]">
                {s.value}
              </p>
              <p className="mt-1 font-mono text-sm text-[#ff6b35]">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-white/40">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 font-mono text-2xl font-bold tracking-tight">
            Core Advantages
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-mono text-lg font-semibold text-[#ff6b35]">
                    {a.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 font-mono text-2xl font-bold tracking-tight">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Water In',
                text: 'Standard feedwater enters the electrolyzer stack — no ultra-pure water requirements.',
              },
              {
                step: '02',
                title: 'Electrolysis',
                text: 'Proprietary electrode geometry splits H₂O at 94% efficiency without a membrane barrier.',
              },
              {
                step: '03',
                title: 'Hydrogen Out',
                text: 'High-purity hydrogen is separated, compressed, and delivered to point of use.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded border border-white/10 bg-white/[0.02] p-6"
              >
                <span className="font-mono text-3xl font-bold text-[#00d4ff]/30">
                  {s.step}
                </span>
                <h3 className="mt-2 font-mono font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
