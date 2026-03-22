'use client';

import Link from 'next/link';

/* ── Helpers ──────────────────────────────────────────── */

function SectionHeader({ label, color }: { label: string; color: string }) {
  const colorMap: Record<string, string> = {
    orange: 'text-[#ff6b35] glow-orange',
    cyan: 'text-[#00d4ff] glow-cyan',
    green: 'text-[#00ff88] glow-green',
  };
  return (
    <div className="mb-6">
      <div className={`text-[0.7rem] tracking-[0.2em] ${colorMap[color] || colorMap.orange}`}>
        ┌─── {label} ───┐
      </div>
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────── */

const investors = [
  {
    name: 'Cortado Ventures',
    subtitle: null,
    tag: 'LEAD INVESTOR',
    tagColor: '#ff6b35',
    borderColor: '#ff6b35',
    amount: '$1.8M',
    amountLabel: 'PRE-SEED',
    description: "Oklahoma's leading deep-tech VC. Focus on energy, aerospace, and advanced manufacturing.",
    url: 'https://cortado.ventures',
    glowColor: 'rgba(255,107,53,0.12)',
    glowInner: 'rgba(255,107,53,0.04)',
  },
  {
    name: '46 Ventures',
    subtitle: 'Administers Hurricane Ventures (University of Tulsa)',
    tag: 'INVESTOR',
    tagColor: '#00d4ff',
    borderColor: '#00d4ff',
    amount: null,
    amountLabel: null,
    description: 'Early-stage technology investor. Manages the Hurricane Ventures fund on behalf of the University of Tulsa.',
    url: 'https://46vc.com',
    glowColor: 'rgba(0,212,255,0.1)',
    glowInner: 'rgba(0,212,255,0.03)',
  },
  {
    name: 'Wavefunction Capital',
    subtitle: null,
    tag: 'INVESTOR',
    tagColor: '#00ff88',
    borderColor: '#00ff88',
    amount: null,
    amountLabel: null,
    description: 'Deep-tech venture capital focused on frontier science and engineering.',
    url: 'https://www.wavefunction.vc',
    glowColor: 'rgba(0,255,136,0.1)',
    glowInner: 'rgba(0,255,136,0.03)',
  },
  {
    name: 'Techstars NYC',
    subtitle: 'Spring 2025 Cohort',
    tag: 'ACCELERATOR + INVESTOR',
    tagColor: 'rgba(255,255,255,0.7)',
    borderColor: 'rgba(255,255,255,0.6)',
    amount: 'FOLLOW-ON',
    amountLabel: 'INVESTMENT',
    description: 'Top-tier global accelerator. 3,000+ portfolio companies. Significant follow-on investment beyond standard program terms.',
    url: 'https://www.techstars.com',
    glowColor: 'rgba(255,255,255,0.06)',
    glowInner: 'rgba(255,255,255,0.02)',
  },
];

/* ── Page ──────────────────────────────────────────────── */

export default function BackedByPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      <style>{`
        .card-glow:hover {
          box-shadow: 0 0 25px var(--glow-color, rgba(255,107,53,0.1)),
                      inset 0 0 40px var(--glow-color-inner, rgba(255,107,53,0.03));
        }
        .card-glow {
          transition: box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.5s ease-out both; }
        .fade-in-d1 { animation-delay: 0.05s; }
        .fade-in-d2 { animation-delay: 0.1s; }
        .fade-in-d3 { animation-delay: 0.15s; }
        .fade-in-d4 { animation-delay: 0.2s; }
        .fade-in-d5 { animation-delay: 0.25s; }
      `}</style>

      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── BACKED BY ───┐
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Our{' '}
            <span className="text-[#ff6b35]" style={{ textShadow: '0 0 15px rgba(255,107,53,0.4)' }}>
              Investors
            </span>
          </h1>
          <div className="max-w-2xl border-l-2 border-[#ff6b35]/50 pl-6">
            <p className="font-sans text-lg leading-relaxed text-white/70">
              $1.8M pre-seed led by Cortado Ventures. Backed by institutional VCs, a top-tier accelerator, and angels from across energy, tech, and climate.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* ─── VC INVESTORS ─────────────────────── */}
        <section className="py-12">
          <SectionHeader label="INSTITUTIONAL INVESTORS" color="orange" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {investors.map((inv, i) => (
              <a
                key={inv.name}
                href={inv.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-glow fade-in fade-in-d${i + 1} flex min-h-[240px] flex-col border-l-[3px] bg-[#12121a] px-6 py-7 transition-all hover:bg-[#16161f]`}
                style={{
                  '--glow-color': inv.glowColor,
                  '--glow-color-inner': inv.glowInner,
                  borderLeftColor: inv.borderColor,
                  borderTop: `1px solid ${inv.glowColor}`,
                  borderRight: `1px solid ${inv.glowColor}`,
                  borderBottom: `1px solid ${inv.glowColor}`,
                } as React.CSSProperties}
              >
                <div className="mb-3 text-[0.7rem] tracking-[0.18em]" style={{ color: inv.tagColor }}>
                  {inv.tag}
                </div>
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-white">
                  {inv.name}
                </h3>
                {inv.subtitle && (
                  <div className="mb-3 text-sm text-[#6a6a7a]">{inv.subtitle}</div>
                )}
                {inv.amount && (
                  <div className="mb-4">
                    <span
                      className="text-2xl font-bold text-[#00ff88]"
                      style={{ textShadow: '0 0 10px rgba(0,255,136,0.3)' }}
                    >
                      {inv.amount}
                    </span>
                    {inv.amountLabel && (
                      <span className="ml-2 text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
                        {inv.amountLabel}
                      </span>
                    )}
                  </div>
                )}
                <p className="mt-auto font-sans text-[0.9rem] leading-relaxed text-[#a0a0b0]">
                  {inv.description}
                </p>
                <div className="mt-3 text-[0.6rem] tracking-[0.1em] text-[#00d4ff]/50">
                  {inv.url.replace('https://', '').replace('www.', '')} ↗
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ─── ANGEL INVESTORS ─────────────────── */}
        <section className="py-12">
          <SectionHeader label="ANGEL INVESTORS" color="green" />

          <div className="fade-in fade-in-d5 border-l-[3px] border-[#00ff88] bg-[#12121a] px-6 py-7"
            style={{
              borderTop: '1px solid rgba(0,255,136,0.08)',
              borderRight: '1px solid rgba(0,255,136,0.08)',
              borderBottom: '1px solid rgba(0,255,136,0.08)',
            }}
          >
            <div className="mb-3 text-[0.7rem] tracking-[0.18em] text-[#00ff88]">
              ANGELS & ADVISORS
            </div>
            <h3 className="mb-4 text-xl font-bold tracking-tight text-white">
              Individual Investors
            </h3>
            <p className="mb-6 font-sans text-[0.95rem] leading-relaxed text-[#a0a0b0]">
              Our angel syndicate includes university professors, technology executives, early Waymo team members, and dedicated climate investors — people who understand both the technology and the market.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Professors', 'Tech Executives', 'Early Waymo', 'Climate Investors'].map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[#00ff88]/20 bg-[#00ff88]/[0.05] px-3 py-1.5 text-[0.7rem] tracking-[0.1em] text-[#00ff88]"
                  style={{ textShadow: '0 0 6px rgba(0,255,136,0.3)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CAP TABLE LINK ─────────────────── */}
        <section className="pb-12">
          <Link
            href="/financials"
            className="group flex items-center justify-between border border-white/10 bg-[#12121a] px-6 py-5 transition-all hover:border-[#ff6b35]/30 hover:bg-[#14141e]"
          >
            <div>
              <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">VIEW FULL CAP TABLE</p>
              <p className="mt-1 font-sans text-sm text-white/50">
                Detailed ownership structure, SAFE terms, and post-seed pro forma in the Financial Model dashboard.
              </p>
            </div>
            <span className="text-2xl text-[#ff6b35]/50 transition-all group-hover:text-[#ff6b35] group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl text-center">
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
