export const metadata = {
  title: 'Team | Tobe Energy',
  description: 'Meet the founders of Tobe Energy',
};

const team = [
  {
    name: 'Colby DeWeese',
    role: 'Co-Founder & CEO',
    handle: 'CDW',
    clearance: 'LEVEL-5',
    bio: 'Colby leads strategy, business development, and investor relations at Tobe Energy. With a background spanning energy markets and technology commercialization, he drives the company\u2019s go-to-market execution and partnership development across industrial hydrogen verticals.',
    focus: ['Strategy & Vision', 'Business Development', 'Investor Relations', 'Partnership Development'],
  },
  {
    name: 'Dr. Caleb Lareau',
    role: 'Co-Founder & CTO',
    handle: 'CLR',
    clearance: 'LEVEL-5',
    bio: 'Caleb leads the engineering and R&D efforts behind Tobe\u2019s membrane-free electrolysis platform. His work on electrode design and system architecture underpins the company\u2019s 94% efficiency benchmark and scalable stack-based deployment model.',
    focus: ['Electrode Design', 'System Architecture', 'R&D Leadership', 'Stack Engineering'],
  },
];

export default function TeamPage() {
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

      {/* Header */}
      <section className="relative border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 05 ─── PERSONNEL FILES ──────────────────────┐`}
          </pre>
          <p className="mb-3 text-sm tracking-widest text-[#ff6b35] uppercase">
            ▸ Leadership
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            The Team Behind{' '}
            <span className="text-[#00d4ff]" style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}>
              Tobe Energy
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60">
            Brothers building the infrastructure layer for the hydrogen economy.
          </p>

          {/* ASCII art */}
          <pre className="mt-8 text-[0.6rem] leading-tight text-[#00d4ff]/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`    ╔══════════════════════════════════════╗
    ║  PERSONNEL DATABASE v2.1            ║
    ║  RECORDS: 2 / 2                     ║
    ║  STATUS: ● ALL ACTIVE               ║
    ║  CLEARANCE: LEVEL-5 // FOUNDERS     ║
    ╚══════════════════════════════════════╝`}
          </pre>
        </div>
      </section>

      {/* Team Cards */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-8 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── PERSONNEL RECORDS ───────────────────────────────────┐`}
          </pre>

          <div className="grid gap-10 md:grid-cols-2">
            {team.map((member, idx) => (
              <div
                key={member.name}
                className="rounded border border-white/10 bg-white/[0.02] p-0 overflow-hidden"
              >
                {/* Terminal header bar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
                  <span className="text-[0.65rem] text-[#ff6b35]">
                    RECORD {String(idx + 1).padStart(3, '0')} // {member.handle}
                  </span>
                  <span className="text-[0.65rem] text-[#00ff88]">● ACTIVE</span>
                </div>

                <div className="p-6">
                  {/* Terminal-style profile */}
                  <pre className="mb-4 text-[0.6rem] leading-tight text-white/30 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`╔════════════════════════════════════════╗
║  ┌──────┐                              ║
║  │      │  CLEARANCE: ${member.clearance.padEnd(16)}║
║  │  ${member.name.split(' ').map(n => n[0]).join('').padEnd(2)}  │  STATUS: ACTIVE              ║
║  │      │  ROLE: ${member.role.length > 18 ? member.role.substring(0, 18) : member.role.padEnd(18)}║
║  └──────┘                              ║
╚════════════════════════════════════════╝`}
                  </pre>

                  <h2
                    className="text-xl font-bold"
                    style={{ textShadow: '0 0 10px rgba(0,212,255,0.3)' }}
                  >
                    {member.name}
                  </h2>
                  <p
                    className="mt-1 text-sm text-[#ff6b35]"
                    style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                  >
                    ▸ {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {member.bio}
                  </p>

                  {/* Focus areas */}
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="mb-2 text-[0.65rem] tracking-widest text-[#ff6b35]/70">FOCUS AREAS:</p>
                    {member.focus.map((f) => (
                      <div key={f} className="flex items-center gap-2 py-0.5">
                        <span className="text-[0.65rem] text-[#00d4ff]">▸</span>
                        <span className="text-xs text-white/50">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company DNA */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <pre className="mb-6 text-xs text-[#ff6b35]/70" style={{ whiteSpace: 'pre' }}>
{`┌─── ORGANIZATIONAL DNA ──────────────────────────────────┐`}
          </pre>

          <div className="rounded border border-white/10 bg-white/[0.02] p-6">
            <pre className="overflow-x-auto text-[0.6rem] leading-relaxed text-white/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  FOUNDING PRINCIPLE:                                  ║
║  Brothers who build hardware that works.              ║
║                                                       ║
║  > CEO handles the market. CTO handles the machine.   ║
║  > No bloat. No committees. Ship and iterate.         ║
║  > Oklahoma-based. Domestically manufactured.         ║
║                                                       ║
║  TEAM SIZE: 2 founders + scaling                      ║
║  LOCATION: Oklahoma, USA                              ║
║  FOUNDED:  2024                                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝`}
            </pre>
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
