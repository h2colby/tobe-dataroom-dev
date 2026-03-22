'use client';

import Link from 'next/link';

/* ── Helpers ──────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div className="my-12 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
      <span
        className="font-mono text-xs tracking-[0.3em] text-[#ff6b35]/30"
        style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}
      >
        ═══════
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
    </div>
  );
}

function SectionHeader({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    orange: 'text-[#ff6b35] glow-orange',
    cyan: 'text-[#00d4ff] glow-cyan',
    green: 'text-[#00ff88] glow-green',
  };
  return (
    <div className="mb-6">
      <div
        className={`text-[0.7rem] tracking-[0.2em] ${colorMap[color] || colorMap.orange}`}
      >
        ┌─── {label} ───┐
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function ValidationPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Inline animation styles */}
      <style>{`
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
        .fade-in-d6 { animation-delay: 0.3s; }
        .fade-in-d7 { animation-delay: 0.35s; }
      `}</style>

      {/* ─── PAGE HEADER ─────────────────────────────── */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 text-[0.7rem] tracking-[0.2em] text-[#00d4ff] glow-cyan">
            ┌─── VALIDATION & PROGRAMS ───┐
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Third-Party{' '}
            <span
              className="text-[#00d4ff]"
              style={{ textShadow: '0 0 15px rgba(0,212,255,0.4)' }}
            >
              Validation
            </span>
          </h1>

          <div className="max-w-2xl border-l-2 border-[#00d4ff]/50 pl-6">
            <p
              className="font-sans text-lg leading-relaxed text-white/70"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.05)' }}
            >
              Federal programs, university research, and industry partnerships.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <section className="py-12">
          <SectionHeader label="VALIDATION & PROGRAMS" color="cyan" />

          <p className="mb-6 font-sans text-[0.95rem] leading-relaxed text-[#8a8a9a]">
            Third-party validation from federal programs, university research, and industry partnerships.
          </p>

          <div className="space-y-3">
            {/* University of Oklahoma — featured with stats */}
            <div className="fade-in fade-in-d1 flex gap-5 border-l-[3px] border-[#00d4ff] bg-[#11131e] px-6 py-6 transition-all hover:bg-[#14161f]"
              style={{ borderTop: '1px solid rgba(0,212,255,0.12)', borderRight: '1px solid rgba(0,212,255,0.12)', borderBottom: '1px solid rgba(0,212,255,0.12)' }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl">
                🎓
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold text-white">
                    University of Oklahoma, I-CCEW
                  </h3>
                  <span className="text-xs tracking-[0.1em] text-[#00d4ff]">
                    Fall 2025
                  </span>
                  <span className="rounded-sm bg-[#00d4ff]/10 px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.1em] text-[#00d4ff]">
                    INDEPENDENT VALIDATION
                  </span>
                </div>
                <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2">
                  <div>
                    <span
                      className="text-xl font-bold text-[#00ff88]"
                      style={{ textShadow: '0 0 8px rgba(0,255,136,0.25)' }}
                    >
                      $9.81B
                    </span>
                    <span className="ml-2 text-[0.6rem] tracking-[0.1em] text-[#6a6a7a]">
                      SERVICEABLE MARKET
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-xl font-bold text-[#00ff88]"
                      style={{ textShadow: '0 0 8px rgba(0,255,136,0.25)' }}
                    >
                      $657M
                    </span>
                    <span className="ml-2 text-[0.6rem] tracking-[0.1em] text-[#6a6a7a]">
                      PROJECTED PROFIT
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-xl font-bold text-[#00ff88]"
                      style={{ textShadow: '0 0 8px rgba(0,255,136,0.25)' }}
                    >
                      8
                    </span>
                    <span className="ml-2 text-[0.6rem] tracking-[0.1em] text-[#6a6a7a]">
                      SEGMENTS
                    </span>
                  </div>
                </div>
                <p className="mb-3 font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
                  The Ronnie K. Irani Center for the Creation of Economic Wealth
                  assigned 5 consulting interns to analyze Tobe&apos;s
                  technology, market, and business model over a full semester.
                  Through extensive market analysis and 7 industry expert
                  interviews, they independently identified the serviceable
                  market and projected profit potential by 2033.
                </p>
                <Link
                  href="/documents"
                  className="inline-block border border-[#00d4ff]/30 bg-[#00d4ff]/5 px-4 py-2 text-sm tracking-[0.05em] text-[#00d4ff] transition-all hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/10"
                  style={{ textShadow: '0 0 8px rgba(0,212,255,0.3)' }}
                >
                  View Full Report →
                </Link>
              </div>
            </div>

            {/* Remaining validation & program partners */}
            {[
              {
                icon: '🔬',
                name: 'NSF I-Corps',
                year: '2025',
                accent: '#00d4ff',
                description:
                  'National Science Foundation customer discovery program. Federal validation of commercial potential.',
              },
              {
                icon: '👨‍🔬',
                name: 'Prof. Javen Weston, UTulsa',
                year: '2025–26',
                accent: '#00d4ff',
                description:
                  'Sabbatical researcher embedded at Tobe. Mechanical Engineering professor conducting research on electrolysis optimization.',
              },
              {
                icon: '🔭',
                name: 'UTulsa Physics',
                year: '2025–26',
                accent: '#00d4ff',
                description:
                  'Active SBIR collaboration on frac water remediation. Exploring electrochemical treatment of produced water.',
              },
              {
                icon: '🏭',
                name: 'Oklahoma Manufacturing Alliance',
                year: '2025–26',
                accent: 'rgba(255,255,255,0.4)',
                description:
                  'Manufacturing process optimization and cost reduction partnership.',
              },
              {
                icon: '🚀',
                name: 'Techstars NYC',
                year: '2025',
                accent: '#ff6b35',
                description:
                  'Selected for Spring 2025 cohort. Global top-tier startup accelerator with 3,000+ portfolio companies.',
              },
            ].map((p, i) => (
              <div
                key={p.name}
                className={`fade-in fade-in-d${i + 2} flex gap-5 bg-[#12121a] px-6 py-5 transition-all hover:bg-[#14141e]`}
                style={{
                  borderLeft: `3px solid ${p.accent}`,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl">
                  {p.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-xl font-bold text-white">{p.name}</h3>
                    <span className="text-xs tracking-[0.1em] text-[#00d4ff]">
                      {p.year}
                    </span>
                  </div>
                  <p className="font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl text-center">
          <pre
            className="text-xs text-[#ff6b35]/20"
            style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}
          >
            {`═══════════════════════════════════════════════════════════
 TOBE ENERGY CORP // CONFIDENTIAL // 2026
═══════════════════════════════════════════════════════════`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
