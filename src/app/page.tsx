'use client';

import { useState, useEffect } from 'react';
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

const bootLines = [
  'INITIALIZING SECURE CONNECTION...',
  'LOADING INVESTOR MODULES...',
  'AUTHENTICATION: VERIFIED',
  'SYSTEM READY',
];

const ASCII_HEADER = `╔══════════════════════════════════════════════════════════════╗
║  ████████╗ ██████╗ ██████╗ ███████╗                         ║
║  ╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝                         ║
║     ██║   ██║   ██║██████╔╝█████╗                            ║
║     ██║   ██║   ██║██╔══██╗██╔══╝                            ║
║     ██║   ╚██████╔╝██████╔╝███████╗                          ║
║     ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝  E N E R G Y            ║
║                                                              ║
║  INVESTOR DATA ROOM // CLASSIFIED: CONFIDENTIAL             ║
║  SESSION: INV-2026-0318 // STATUS: ● ACTIVE                 ║
╚══════════════════════════════════════════════════════════════╝`;

const ASCII_FOOTER = `╔══════════════════════════════════════════════════════════════╗
║ TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024        ║
║ CONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY             ║
║ ████████████████████░░░░ SYSTEM INTEGRITY: 94%             ║
╚══════════════════════════════════════════════════════════════╝`;

export default function Home() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [bootStage, setBootStage] = useState(0);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (booted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => setBootStage(i + 1), (i + 1) * 500)
      );
    });
    timers.push(
      setTimeout(() => setBooted(true), bootLines.length * 500 + 800)
    );
    return () => timers.forEach(clearTimeout);
  }, [booted]);

  // Boot screen
  if (!booted) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] font-mono crt-vignette">
        {/* Scanlines on boot */}
        <div className="scanlines pointer-events-none fixed inset-0 z-[100]" />
        <div className="space-y-3">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className={`text-sm tracking-[0.1em] transition-opacity duration-300 ${
                i < bootStage ? 'opacity-100' : 'opacity-0'
              } ${
                line.includes('VERIFIED')
                  ? 'text-[#00ff88] glow-green'
                  : line.includes('READY')
                    ? 'text-[#ff6b35] glow-orange'
                    : 'text-[#6a6a7a]'
              }`}
            >
              {'> '}{line}
            </div>
          ))}
          {bootStage >= bootLines.length && (
            <div className="mt-4 h-0.5 w-48 overflow-hidden bg-[#1a1a2a]">
              <div
                className="h-full bg-[#ff6b35] transition-all duration-700"
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0f] font-mono crt-vignette animate-[fadeIn_0.5s_ease-out]">
      {/* Scanline overlay */}
      <div className="scanlines pointer-events-none fixed inset-0 z-[100]" />

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
          className="text-sm font-bold tracking-[0.15em] text-[#ff6b35] glow-orange"
          style={{ transform: 'scaleX(0.85)' }}
        >
          TOBE ENERGY
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
            SESSION: <span className="text-[#00ff88] glow-green">INV-2026-0318</span>
          </span>
          <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
            STATUS: <span className="text-[#00ff88] glow-green">● ACTIVE</span>
          </span>
          <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
            CLASSIFICATION: <span className="text-[#ff6b35] glow-orange">INVESTOR</span>
          </span>
        </div>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1">
        {/* LEFT SIDEBAR */}
        <nav className="flex w-[220px] shrink-0 flex-col border-r border-white/5 bg-[#0a0a0f]/80 py-5">
          <div className="mb-2 px-5 text-[0.6rem] font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
            SYSTEM MODULES
          </div>
          {systemModules.map((item, i) => {
            const isActive = item.id === '01';
            const isHovered = hoveredNav === item.id;
            const isLast = i === systemModules.length - 1;
            const branch = isLast ? '└──' : '├──';
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center px-4 py-1.5 text-[0.75rem] tracking-[0.05em] transition-all ${
                  isActive
                    ? 'bg-[#ff6b35]/5 text-[#ff6b35]'
                    : isHovered
                      ? 'bg-[#00d4ff]/5 text-[#00d4ff]'
                      : 'text-[#8a8a9a]'
                }`}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <span className={`mr-1 text-[0.65rem] ${isActive ? 'text-[#ff6b35]/40' : 'text-[#3a3a4a]'}`}>
                  {branch}
                </span>
                {isActive && <span className="mr-1 text-[#ff6b35]">{'>'}</span>}
                <span className={`mr-2 ${isActive ? 'text-[#ff6b35]/60' : 'text-[#4a4a5a]'}`}>{item.id}</span>
                {item.label}
                {isActive && <span className="ml-1 animate-blink text-[#ff6b35]">█</span>}
              </Link>
            );
          })}

          <div className="mb-2 mt-5 px-5 text-[0.6rem] font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
            RESOURCES
          </div>
          {resources.map((item, i) => {
            const isHovered = hoveredNav === item.id;
            const isLast = i === resources.length - 1;
            const branch = isLast ? '└──' : '├──';
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center px-4 py-1.5 text-[0.75rem] tracking-[0.05em] transition-all ${
                  isHovered
                    ? 'bg-[#00d4ff]/5 text-[#00d4ff]'
                    : 'text-[#8a8a9a]'
                }`}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <span className="mr-1 text-[0.65rem] text-[#3a3a4a]">{branch}</span>
                <span className="mr-2 text-[#4a4a5a]">{item.id}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* ASCII Art Header */}
          <pre
            className="mb-6 overflow-x-auto text-[0.5rem] leading-[1.1] text-[#ff6b35] glow-orange sm:text-[0.6rem] md:text-[0.7rem]"
            aria-label="TOBE ENERGY - Investor Data Room"
          >
            {ASCII_HEADER}
          </pre>

          {/* Section header with ASCII decorator */}
          <div className="mb-6 border-b border-white/5 pb-4">
            <div className="mb-2 text-[0.7rem] tracking-[0.1em] text-[#00d4ff] glow-cyan">
              ┌─── SECTION 01 ─── MISSION OVERVIEW ───┐
            </div>
            <h1
              className="text-2xl font-bold tracking-[0.1em] text-[#c0c0c8] uppercase"
              style={{ transform: 'scaleX(0.88)', transformOrigin: 'left' }}
            >
              Mission Overview
            </h1>
          </div>

          {/* Stats row */}
          <div className="mb-6 border border-white/5 bg-[#0a0a0f]/60 p-5">
            <div className="mb-3 text-[0.6rem] tracking-[0.15em] text-[#00d4ff] glow-cyan">
              ┌─── CORE METRICS ───┐
            </div>
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[#00ff88] glow-green">
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
              <span className="text-[0.6rem] tracking-[0.15em] text-[#00d4ff] glow-cyan">
                ┌─── PIPELINE NETWORK ─── LIVE DATA ───┐
              </span>
            </div>
            <div className="h-[420px] overflow-hidden">
              <PipelineNetwork />
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 shrink-0 border-t border-white/5 bg-[#0a0a0f] px-6 py-2">
        <pre className="text-center text-[0.45rem] leading-[1.2] text-[#ff6b35]/60 sm:text-[0.5rem] md:text-[0.55rem]">
          {ASCII_FOOTER}
        </pre>
      </footer>
    </div>
  );
}
