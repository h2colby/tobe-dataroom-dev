'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type NavCategory = {
  id: string;
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

const navCategories: NavCategory[] = [
  { id: '01', label: 'OVERVIEW', href: '/' },
  {
    id: '02',
    label: 'BUSINESS',
    items: [
      { label: 'Business Model', href: '/business-model' },
      { label: 'Customers', href: '/customers' },
      { label: 'Financial Model', href: '/financials' },
      { label: 'Tax Credits', href: '/tax-credits' },
    ],
  },
  {
    id: '03',
    label: 'TECHNOLOGY',
    items: [
      { label: 'Overview', href: '/technology' },
      { label: 'Electrolysis Cell', href: '/technology/cell' },
      { label: 'Power Converter', href: '/technology/power-converter' },
      { label: 'Controls', href: '/technology/controls' },
      { label: 'Efficiency & Testing', href: '/technology/efficiency' },
    ],
  },
  {
    id: '04',
    label: 'PEOPLE & PROJECTS',
    items: [
      { label: 'NODE-01', href: '/projects/node-01' },
      { label: 'Zeeco ARC Deployment', href: '/projects/zeeco' },
      { label: 'Validation & Programs', href: '/validation' },
      { label: 'Backed By', href: '/backed-by' },
      { label: 'Team', href: '/team' },
    ],
  },
  {
    id: '05',
    label: 'DOCUMENTS',
    items: [{ label: 'Document Library', href: '/documents' }],
  },
];

const bootLines = [
  'INITIALIZING SECURE CONNECTION...',
  'LOADING INVESTOR MODULES...',
  'AUTHENTICATION: VERIFIED',
  'SYSTEM READY',
];

const ASCII_HEADER = `  ████████╗ ██████╗ ██████╗ ███████╗
  ╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
     ██║   ██║   ██║██████╔╝█████╗
     ██║   ██║   ██║██╔══██╗██╔══╝
     ██║   ╚██████╔╝██████╔╝███████╗
     ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝  E N E R G Y`;

const ASCII_FOOTER = `TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024
CONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY`;

/* ── Click sound ──────────────────────────────────────── */

function useClickSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(false);

  const play = useCallback(() => {
    if (!enabledRef.current) return;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 800 + Math.random() * 400;
    gain.gain.value = 0.015;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }, []);

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  return { play, toggle };
}

/* ── Page ──────────────────────────────────────────────── */

export default function Home() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [expandedNav, setExpandedNav] = useState<Set<string>>(new Set());
  const [bootStage, setBootStage] = useState(0);
  const [booted, setBooted] = useState(false);

  // Typewriter state
  const [skipAnim] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('overview-animated') === '1';
  });
  const [headerChars, setHeaderChars] = useState(skipAnim ? ASCII_HEADER.length : 0);
  const [phase, setPhase] = useState<'header' | 'done'>(skipAnim ? 'done' : 'header');
  const [soundOn, setSoundOn] = useState(false);
  const { play: clickSound, toggle: toggleSound } = useClickSound();

  const toggleCategory = (id: string) => {
    setExpandedNav((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Boot sequence
  useEffect(() => {
    if (booted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setBootStage(i + 1), (i + 1) * 500));
    });
    timers.push(
      setTimeout(() => setBooted(true), bootLines.length * 500 + 800),
    );
    return () => timers.forEach(clearTimeout);
  }, [booted]);

  // Typewriter sequencer (header only)
  useEffect(() => {
    if (!booted || skipAnim) return;

    if (phase === 'header') {
      const id = setInterval(() => {
        setHeaderChars((c) => {
          clickSound();
          if (c >= ASCII_HEADER.length) {
            clearInterval(id);
            setPhase('done');
            sessionStorage.setItem('overview-animated', '1');
            return c;
          }
          return c + 3; // 3 chars per tick for speed
        });
      }, 8);
      return () => clearInterval(id);
    }
  }, [booted, phase, skipAnim, clickSound]);

  // Boot screen
  if (!booted) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] font-mono crt-vignette">
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
              <div className="h-full bg-[#ff6b35] transition-all duration-700" style={{ width: '100%' }} />
            </div>
          )}
        </div>
      </div>
    );
  }

  const cursor = phase !== 'done' ? <span className="animate-blink text-[#ff6b35]">█</span> : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0f] font-mono crt-vignette animate-[fadeIn_0.5s_ease-out]">
      <div className="scanlines pointer-events-none fixed inset-0 z-[100]" />
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
        <div className="text-sm font-bold tracking-[0.15em] text-[#ff6b35] glow-orange" style={{ transform: 'scaleX(0.85)' }}>
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
        <nav className="flex w-[240px] shrink-0 flex-col border-r border-white/5 bg-[#0a0a0f]/80 py-5">
          <div className="mb-2 px-5 text-[0.65rem] font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
            SYSTEM MODULES
          </div>
          {navCategories.map((cat, catIdx) => {
            const isActive = cat.id === '01';
            const isHovered = hoveredNav === cat.id;
            const isExpanded = expandedNav.has(cat.id);
            const hasItems = !!cat.items;
            const isLastCat = catIdx === navCategories.length - 1;
            const catBranch = isLastCat ? '└──' : '├──';

            return (
              <div key={cat.id}>
                {hasItems ? (
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    onMouseEnter={() => setHoveredNav(cat.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`group flex w-full items-center px-4 py-2 text-left text-[0.875rem] tracking-[0.05em] transition-all ${
                      isHovered ? 'bg-[#00d4ff]/8 text-[#00d4ff]' : 'text-[#b0b0bc]'
                    }`}
                  >
                    <span className="mr-1.5 text-[0.7rem] text-[#5a5a6a]">{catBranch}</span>
                    <span className="mr-1.5 text-[0.65rem] text-[#6a6a7a]">{isExpanded ? '▾' : '▸'}</span>
                    <span className="mr-2 text-[#6a6a7a]">{cat.id}</span>
                    {cat.label}
                  </button>
                ) : (
                  <Link
                    href={cat.href!}
                    onMouseEnter={() => setHoveredNav(cat.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`group flex items-center px-4 py-2 text-[0.875rem] tracking-[0.05em] transition-all ${
                      isActive
                        ? 'bg-[#ff6b35]/12 font-bold text-[#ff6b35]'
                        : isHovered
                          ? 'bg-[#00d4ff]/8 text-[#00d4ff]'
                          : 'text-[#b0b0bc]'
                    }`}
                  >
                    <span className={`mr-1.5 text-[0.7rem] ${isActive ? 'text-[#ff6b35]/50' : 'text-[#5a5a6a]'}`}>
                      {catBranch}
                    </span>
                    {isActive && <span className="mr-1 text-[#ff6b35]">{'>'}</span>}
                    <span className={`mr-2 ${isActive ? 'text-[#ff6b35]/70' : 'text-[#6a6a7a]'}`}>{cat.id}</span>
                    {cat.label}
                    {isActive && <span className="ml-1 animate-blink text-[#ff6b35]">█</span>}
                  </Link>
                )}

                {hasItems && isExpanded && (
                  <div className="overflow-hidden">
                    {cat.items!.map((item, i) => {
                      const isSubHovered = hoveredNav === `${cat.id}-${i}`;
                      const isLastItem = i === cat.items!.length - 1;
                      const vertLine = isLastCat ? ' ' : '│';
                      const subBranch = isLastItem ? '└──' : '├──';
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onMouseEnter={() => setHoveredNav(`${cat.id}-${i}`)}
                          onMouseLeave={() => setHoveredNav(null)}
                          className={`group flex items-center py-1.5 pl-9 pr-4 text-[0.825rem] tracking-[0.03em] transition-all ${
                            isSubHovered ? 'bg-[#00d4ff]/8 text-[#00d4ff]' : 'text-[#9a9ab0]'
                          }`}
                        >
                          <span className="mr-1.5 text-[0.65rem] text-[#4a4a5a]">{vertLine} {subBranch}</span>
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Sound toggle */}
          <button
            type="button"
            onClick={() => setSoundOn(toggleSound())}
            className="fixed right-8 top-16 z-20 text-[0.6rem] tracking-[0.1em] text-[#3a3a4a] transition-colors hover:text-[#6a6a7a]"
          >
            {soundOn ? '♪ SFX ON' : '♪ SFX OFF'}
          </button>

          {/* ASCII Art Header */}
          <div className="mb-8 overflow-hidden border border-[#ff6b35]/30 bg-[#0a0a0f]/80 p-4">
            <pre
              className="text-[0.5rem] leading-[1.2] text-[#ff6b35] glow-orange sm:text-[0.6rem] md:text-[0.7rem]"
              aria-label="TOBE ENERGY"
            >
              {ASCII_HEADER.slice(0, headerChars)}
              {phase === 'header' && cursor}
            </pre>
          </div>

          {/* Overview content (shows after header is done) */}
          {headerChars >= ASCII_HEADER.length && (
            <>
              {/* 1. Hero Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {[
                  { number: '$226B', label: 'Market Size' },
                  { number: '>92%', label: 'System Efficiency' },
                  { number: '$5.08/kg', label: 'All-In Cost' },
                  { number: '6', label: 'Signed LOIs' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="border border-[#ff6b35]/20 bg-[#0a0a0f]/60 p-5 text-center transition-all hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/5"
                  >
                    <div
                      className="mb-1 text-3xl font-bold text-[#ff6b35]"
                      style={{ textShadow: '0 0 12px rgba(255,107,53,0.4)' }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-xs tracking-[0.1em] text-[#6a6a7a]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* 2. The Pitch */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12 border-l-4 border-[#00ff88] pl-6"
              >
                <p className="text-lg leading-relaxed text-[#00ff88]" style={{ textShadow: '0 0 8px rgba(0,255,136,0.15)' }}>
                  Tobe Energy produces hydrogen on or near site using membrane-free electrolysis. No precious metals. No membranes. No rare earths. No cooling system. First electrolyzer under DOE's $2/kg target at industrial electricity rates. Three revenue engines: Hydrogen as a Service, equipment sales, and AI-powered maintenance.
                </p>
              </motion.div>

              {/* 3. Three Revenue Engines */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                  THREE REVENUE ENGINES
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    {
                      title: 'Hydrogen as a Service',
                      subtitle: '82% of FY7 revenue',
                      desc: 'Own & operate, recurring high-margin',
                    },
                    {
                      title: 'Equipment Sales',
                      subtitle: '16%',
                      desc: 'Direct sales for industry-defining projects',
                    },
                    {
                      title: 'AI Services & Maintenance',
                      subtitle: '2%, growing',
                      desc: 'Predictive maintenance on every deployment',
                    },
                  ].map((engine, i) => (
                    <Link
                      key={i}
                      href="/business-model"
                      className="group border border-[#00ff88]/20 bg-[#0a0a0f]/60 p-5 transition-all hover:border-[#00ff88]/50 hover:bg-[#00ff88]/5"
                    >
                      <h3 className="mb-1 text-base font-bold text-[#00ff88] transition-colors group-hover:text-[#00ff88]">
                        {engine.title}
                      </h3>
                      <div className="mb-2 text-xs text-[#ff6b35]">{engine.subtitle}</div>
                      <p className="text-sm text-[#9a9ab0]">{engine.desc}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="border border-[#00d4ff]/20 bg-[#0a0a0f]/60 p-6"
              >
                <div className="mb-3 text-xs tracking-[0.15em] text-[#00d4ff]">
                  AI ASSISTANT AVAILABLE
                </div>
                <p className="mb-4 text-sm text-[#9a9ab0]">
                  AI assistant available on every page — ask anything about Tobe Energy.
                </p>
                <div className="flex items-center gap-2 border border-[#00d4ff]/20 bg-black/40 px-4 py-2">
                  <span className="text-sm text-[#6a6a7a]">{'>'}</span>
                  <span className="animate-blink text-sm text-[#00d4ff]">█</span>
                </div>
              </motion.div>

              {/* 4. Technology Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                  TECHNOLOGY HIGHLIGHT
                </h2>
                <div className="grid grid-cols-1 gap-6 border border-[#00d4ff]/20 bg-[#0a0a0f]/60 p-6 md:grid-cols-2">
                  <div className="flex items-center justify-center bg-black/40">
                    <img
                      src="/media/manufacturing/cnc-electrolysis-housing-poster.jpg"
                      alt="CNC machining"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Measured Efficiency', value: '46.08 kWh/kg' },
                        { label: 'Operating Temp', value: '28°C' },
                        { label: 'Stack Swap', value: '30-min' },
                        { label: 'Stack Life', value: '80,000+ hr' },
                      ].map((stat, i) => (
                        <div key={i}>
                          <div className="text-lg font-bold text-[#00d4ff]">{stat.value}</div>
                          <div className="text-xs text-[#6a6a7a]">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#9a9ab0]">
                      Vertically integrated. We CNC our own cells, etch our own PCBs, wind our own transformers.
                    </p>
                    <Link
                      href="/technology"
                      className="inline-block text-sm text-[#00d4ff] transition-colors hover:text-[#00d4ff]/80"
                    >
                      Explore the Technology →
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* 5. Financial Snapshot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                  FINANCIAL SNAPSHOT
                </h2>
                <div className="border border-[#00ff88]/20 bg-[#0a0a0f]/60 p-6">
                  <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                      { label: 'FY7 Revenue', value: '$327.7M' },
                      { label: 'FY7 EBITDA', value: '$209.4M', sub: '63.9% margin' },
                      { label: 'FY7 Net Income', value: '$152.5M' },
                      { label: '45V PTC Upside', value: '$108M-$324M', sub: 'cumulative' },
                    ].map((metric, i) => (
                      <div key={i}>
                        <div className="text-xl font-bold text-[#00ff88]">{metric.value}</div>
                        <div className="text-xs text-[#6a6a7a]">{metric.label}</div>
                        {metric.sub && <div className="text-xs text-[#6a6a7a]/60">{metric.sub}</div>}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/financials"
                    className="inline-block text-sm text-[#00ff88] transition-colors hover:text-[#00ff88]/80"
                  >
                    View Financial Model →
                  </Link>
                </div>
              </motion.div>

              {/* 6. Active Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                  ACTIVE PROJECTS
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Link
                    href="/projects/node-01"
                    className="group border border-[#00d4ff]/20 bg-[#0a0a0f]/60 transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/5"
                  >
                    <div className="h-48 overflow-hidden bg-black/40">
                      <img
                        src="/images/showroom-inspo.jpg"
                        alt="NODE-01 Showroom"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 text-base font-bold text-[#00d4ff]">NODE-01</h3>
                      <p className="text-sm text-[#9a9ab0]">
                        AI-integrated containerized showroom. Completion: April 2026.
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/projects/zeeco"
                    className="group border border-[#00d4ff]/20 bg-[#0a0a0f]/60 p-6 transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/5"
                  >
                    <h3 className="mb-2 text-base font-bold text-[#00d4ff]">Zeeco ARC</h3>
                    <p className="text-sm text-[#9a9ab0]">
                      First commercial deployment. 12× T-25. 600kW. Q4 2026.
                    </p>
                  </Link>
                </div>
              </motion.div>

              {/* 7. Team Teaser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-12 border-l-4 border-[#ff6b35] pl-6"
              >
                <p className="mb-2 text-base text-[#b0b0bc]">
                  Founded by Colby DeWeese (ChemE, $75M+ energy infrastructure) and Dr. Caleb Lareau (Harvard PhD, Forbes 30 Under 30). 9 engineers who CNC their own PCBs.
                </p>
                <Link
                  href="/team"
                  className="inline-block text-sm text-[#ff6b35] transition-colors hover:text-[#ff6b35]/80"
                >
                  Meet the Team →
                </Link>
              </motion.div>

              {/* 8. Section Directory */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-12"
              >
                <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                  SECTION DIRECTORY
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'BUSINESS',
                      color: '#00ff88',
                      items: [
                        { name: 'Business Model', href: '/business-model' },
                        { name: 'Customers', href: '/customers' },
                        { name: 'Financial Model', href: '/financials' },
                        { name: 'Tax Credits', href: '/tax-credits' },
                      ],
                    },
                    {
                      title: 'TECHNOLOGY',
                      color: '#00d4ff',
                      items: [
                        { name: 'Overview', href: '/technology' },
                        { name: 'Cell', href: '/technology/cell' },
                        { name: 'Power Converter', href: '/technology/power-converter' },
                        { name: 'Controls', href: '/technology/controls' },
                        { name: 'Efficiency', href: '/technology/efficiency' },
                      ],
                    },
                    {
                      title: 'PEOPLE & PROJECTS',
                      color: '#ff6b35',
                      items: [
                        { name: 'NODE-01', href: '/projects/node-01' },
                        { name: 'Zeeco ARC', href: '/projects/zeeco' },
                        { name: 'Validation', href: '/validation' },
                        { name: 'Backed By', href: '/backed-by' },
                        { name: 'Team', href: '/team' },
                      ],
                    },
                    {
                      title: 'DOCUMENTS',
                      color: '#7a7a8a',
                      items: [{ name: 'Document Library', href: '/documents' }],
                    },
                  ].map((section, i) => (
                    <div key={i}>
                      <h3
                        className="mb-2 text-sm font-bold tracking-[0.15em]"
                        style={{ color: section.color, textShadow: `0 0 8px ${section.color}40` }}
                      >
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item, j) => (
                          <Link
                            key={j}
                            href={item.href}
                            className="group flex items-baseline transition-colors hover:bg-white/[0.02]"
                          >
                            <span className="mr-2 text-sm text-[#6a6a7a]">
                              {j === section.items.length - 1 ? '└─' : '├─'}
                            </span>
                            <span
                              className="text-sm transition-colors"
                              style={{ color: section.color }}
                            >
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 9. AI Assistant placeholder */}
              
            </>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 shrink-0 border-t border-[#ff6b35]/20 bg-[#0a0a0f] px-6 py-2">
        <pre className="text-center text-[0.55rem] leading-[1.4] text-[#ff6b35]/50 sm:text-[0.6rem]">
          {ASCII_FOOTER}
        </pre>
      </footer>
    </div>
  );
}
