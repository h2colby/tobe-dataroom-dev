'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PipelineNetwork } from '@/components/PipelineNetwork';

const systemModules = [
  { id: '01', label: 'Overview', href: '/' },
  { id: '02', label: 'Technology', href: '/technology' },
  { id: '03', label: 'Business Model', href: '/business-model' },
  { id: '04', label: 'Financials', href: '#' },
  { id: '05', label: 'Team', href: '/team' },
];

const resources = [
  { id: '06', label: 'Pitch Deck', href: '#' },
  { id: '07', label: 'Legal & IP', href: '#' },
  { id: '08', label: 'Media Assets', href: '#' },
];

const stats = [
  { value: '>92%', label: 'SYSTEM EFFICIENCY' },
  { value: '<$2', label: 'LCOH ($/KG)' },
  { value: '$100M', label: 'PIPELINE' },
  { value: '$10M', label: 'RAISING' },
];

export default function Home() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0f] font-mono">
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

      {/* TOP HEADER BAR */}
      <header className="relative z-10 flex h-[52px] shrink-0 items-center justify-between border-b border-[#ff6b35]/20 bg-[#0a0a0f] px-6">
        <div
          className="text-sm font-bold tracking-[0.15em] text-[#ff6b35]"
          style={{ transform: 'scaleX(0.85)' }}
        >
          TOBE ENERGY
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
            SESSION: <span className="text-[#00ff88]">INV-2026-0318</span>
          </span>
          <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
            STATUS: <span className="text-[#00ff88]">ACTIVE</span>
          </span>
          <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
            CLASSIFICATION: <span className="text-[#ff6b35]">INVESTOR</span>
          </span>
        </div>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1">
        {/* LEFT SIDEBAR */}
        <nav className="flex w-[200px] shrink-0 flex-col border-r border-white/5 bg-[#0a0a0f]/80 py-5">
          <div className="mb-1 px-5 text-[0.6rem] font-bold tracking-[0.2em] text-[#ff6b35]">
            SYSTEM MODULES
          </div>
          {systemModules.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`block border-l-2 px-5 py-2 text-[0.75rem] tracking-[0.05em] transition-all ${
                item.id === '01'
                  ? 'border-l-[#ff6b35] bg-[#ff6b35]/5 text-[#ff6b35]'
                  : hoveredNav === item.id
                    ? 'border-l-[#00d4ff] bg-[#00d4ff]/5 text-[#00d4ff]'
                    : 'border-l-transparent text-[#8a8a9a]'
              }`}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <span className="mr-2 text-[#4a4a5a]">{item.id}</span>
              {item.label}
            </Link>
          ))}

          <div className="mb-1 mt-5 px-5 text-[0.6rem] font-bold tracking-[0.2em] text-[#ff6b35]">
            RESOURCES
          </div>
          {resources.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`block border-l-2 px-5 py-2 text-[0.75rem] tracking-[0.05em] transition-all ${
                hoveredNav === item.id
                  ? 'border-l-[#00d4ff] bg-[#00d4ff]/5 text-[#00d4ff]'
                  : 'border-l-transparent text-[#8a8a9a]'
              }`}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <span className="mr-2 text-[#4a4a5a]">{item.id}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Section header */}
          <div className="mb-6 flex items-baseline gap-3 border-b border-white/5 pb-4">
            <span className="text-[0.7rem] tracking-[0.1em] text-[#ff6b35]">
              SECTION 01 //
            </span>
            <h1
              className="text-2xl font-bold tracking-[0.1em] text-[#c0c0c8] uppercase"
              style={{ transform: 'scaleX(0.88)', transformOrigin: 'left' }}
            >
              Mission Overview
            </h1>
          </div>

          {/* Stats row */}
          <div className="mb-6 border border-white/5 bg-[#0a0a0f]/60 p-5">
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[#00ff88]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline visualization */}
          <div className="border border-white/5 bg-[#0a0a0f]/60 p-4">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-[0.6rem] tracking-[0.2em] text-[#ff6b35]">
                PIPELINE NETWORK
              </span>
              <span className="text-[0.55rem] tracking-[0.1em] text-[#4a4a5a]">
                // LIVE DATA
              </span>
            </div>
            <div className="h-[420px] overflow-hidden">
              <PipelineNetwork />
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 flex h-8 shrink-0 items-center justify-center gap-8 border-t border-white/5 bg-[#0a0a0f] text-[0.6rem] tracking-[0.15em] text-[#4a4a5a]">
        <span>TOBE ENERGY CORP</span>
        <span className="text-[#ff6b35]">CONFIDENTIAL — INVESTOR USE ONLY</span>
        <span>OKLAHOMA CITY, USA</span>
      </footer>
    </div>
  );
}
