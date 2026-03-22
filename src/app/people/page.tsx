'use client';

import Link from 'next/link';

const sections = [
  {
    label: 'VALIDATION & PROGRAMS',
    href: '/validation',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.12)',
    description: 'Federal programs, university research, and industry partnerships that independently validate our technology.',
    tag: 'OU I-CCEW · NSF I-Corps · UTulsa Physics',
  },
  {
    label: 'BACKED BY',
    href: '/backed-by',
    color: '#ff6b35',
    glow: 'rgba(255,107,53,0.12)',
    description: 'Pre-seed round led by Cortado Ventures. $1.8M raised from top-tier deep-tech investors.',
    tag: 'Cortado · 46VC · Wavefunction · Techstars',
  },
  {
    label: 'THE TEAM',
    href: '/team',
    color: '#00ff88',
    glow: 'rgba(0,255,136,0.12)',
    description: 'Engineers who CNC their own PCBs, design power electronics, and write firmware. 2 founders + 7 team members.',
    tag: 'Colby DeWeese · Dr. Caleb Lareau · 7 engineers',
  },
];

export default function PeopleIndexPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* ─── PAGE HEADER ─────────────────────────────── */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 text-[0.7rem] tracking-[0.2em] text-[#00d4ff] glow-cyan">
            ┌─── THE PEOPLE ───┐
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            The Ecosystem Behind{' '}
            <span
              className="text-[#00d4ff]"
              style={{ textShadow: '0 0 15px rgba(0,212,255,0.4)' }}
            >
              Tobe Energy
            </span>
          </h1>

          <div className="max-w-2xl border-l-2 border-[#ff6b35]/50 pl-6">
            <p
              className="font-sans text-lg leading-relaxed text-white/70"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.05)' }}
            >
              Validated by federal programs. Funded by top-tier investors. Built by engineers who CNC their own PCBs.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION CARDS ────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group flex flex-col border-l-[3px] bg-[#12121a] px-6 py-7 transition-all hover:bg-[#14141e]"
              style={{
                borderLeftColor: s.color,
                borderTop: `1px solid ${s.glow}`,
                borderRight: `1px solid ${s.glow}`,
                borderBottom: `1px solid ${s.glow}`,
              }}
            >
              <div
                className="mb-3 text-[0.7rem] tracking-[0.18em]"
                style={{ color: s.color }}
              >
                {s.label}
              </div>
              <p className="mb-4 flex-1 font-sans text-[0.9rem] leading-relaxed text-[#a0a0b0]">
                {s.description}
              </p>
              <div className="mb-3 text-[0.65rem] tracking-[0.05em] text-[#6a6a7a]">
                {s.tag}
              </div>
              <span
                className="text-sm tracking-[0.05em] transition-colors"
                style={{ color: s.color }}
              >
                View details →
              </span>
            </Link>
          ))}
        </div>
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
