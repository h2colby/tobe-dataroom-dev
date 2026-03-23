'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import RenPanel from '@/components/RenPanel';

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
      { label: 'Comparison', href: '/comparison' },
      { label: 'Business Model', href: '/business-model' },
      { label: 'Financial Model', href: '/financials' },
      { label: 'Customers', href: '/customers' },
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
      { label: 'Efficiency', href: '/technology/efficiency' },
    ],
  },
  {
    id: '04',
    label: 'PROJECTS',
    items: [
      { label: 'NODE-01', href: '/projects/node-01' },
      { label: 'Zeeco ARC', href: '/projects/zeeco' },
    ],
  },
  {
    id: '05',
    label: 'PEOPLE',
    items: [
      { label: 'Proof', href: '/proof' },
      { label: 'Team', href: '/team' },
    ],
  },
  {
    id: '06',
    label: 'DOCUMENTS',
    href: '/documents',
  },
  {
    id: '07',
    label: 'ASK REN',
    href: '#ask-ai',
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
  const prefersReducedMotion = useReducedMotion();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [expandedNav, setExpandedNav] = useState<Set<string>>(new Set());
  const [bootStage, setBootStage] = useState(0);
  const [booted, setBooted] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  // Typewriter state — skip all animation if reduced motion is preferred
  const [skipAnim, setSkipAnim] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('overview-animated') === '1';
  });
  const [headerChars, setHeaderChars] = useState(skipAnim ? ASCII_HEADER.length : 0);
  const [phase, setPhase] = useState<'header' | 'done'>(skipAnim ? 'done' : 'header');
  const [soundOn, setSoundOn] = useState(false);
  const { play: clickSound, toggle: toggleSound } = useClickSound();

  // Reduced motion: skip directly to final state on mount
  useEffect(() => {
    if (prefersReducedMotion && !booted) {
      setBootStage(bootLines.length);
      setBooted(true);
      setHeaderChars(ASCII_HEADER.length);
      setPhase('done');
      setSkipAnim(true);
      setShowSkip(false);
      sessionStorage.setItem('overview-animated', '1');
    }
  }, [prefersReducedMotion, booted]);

  // Show skip button after 1 second delay
  useEffect(() => {
    if (skipAnim) return;
    const timer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(timer);
  }, [skipAnim]);

  // Skip handler: jump to fully loaded state
  const handleSkip = useCallback(() => {
    setBootStage(bootLines.length);
    setBooted(true);
    setHeaderChars(ASCII_HEADER.length);
    setPhase('done');
    setSkipAnim(true);
    setShowSkip(false);
    sessionStorage.setItem('overview-animated', '1');
  }, []);

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
                  ? 'text-[#ff6b35] glow-orange'
                  : line.includes('READY')
                    ? 'text-[#ff6b35] glow-orange'
                    : 'text-[#8a8a9a]'
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
        {showSkip && (
          <button
            type="button"
            onClick={handleSkip}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSkip(); } }}
            tabIndex={0}
            role="button"
            aria-label="Skip boot animation"
            className="fixed bottom-6 right-6 z-[110] font-mono text-xs tracking-[0.1em] text-white/45 transition-colors hover:text-white/50"
          >
            SKIP ▸
          </button>
        )}
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
        <Link href="/" className="flex items-center">
          <img src="/images/tobe-logo.svg" alt="Tobe Energy" className="h-7" />
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-[0.65rem] tracking-[0.1em] text-[#8a8a9a]">
            SESSION: <span className="text-[#ff6b35] glow-orange">INV-2026-0318</span>
          </span>
          <span className="text-[0.65rem] tracking-[0.1em] text-[#8a8a9a]">
            STATUS: <span className="text-[#ff6b35] glow-orange">● ACTIVE</span>
          </span>
          <span className="text-[0.65rem] tracking-[0.1em] text-[#8a8a9a]">
            CLASSIFICATION: <span className="text-[#ff6b35] glow-orange">INVESTOR</span>
          </span>
        </div>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1">
        {/* LEFT SIDEBAR */}
        <nav className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-white/5 bg-[#0a0a0f]/80 py-5">
          <div className="mb-2 px-5 text-[0.65rem] font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
            SYSTEM MODULES
          </div>
          {navCategories.map((cat, catIdx) => {
            const isActive = cat.id === '01';
            const isHovered = hoveredNav === cat.id;
            const isExpanded = expandedNav.has(cat.id);
            const hasItems = !!cat.items;
            const isLastCat = catIdx === navCategories.length - 1;
            const catBranch = isLastCat ? '└─' : '├─';

            return (
              <div key={cat.id}>
                {hasItems ? (
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    onMouseEnter={() => setHoveredNav(cat.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`group flex w-full items-center px-4 py-2 text-left text-[0.825rem] tracking-[0.05em] transition-all ${
                      isHovered ? 'bg-[#ff6b35]/8 text-[#ff6b35]' : 'text-[#b0b0bc]'
                    }`}
                  >
                    <span className="mr-1.5 text-[0.7rem] text-[#7a7a8a] shrink-0">{catBranch}</span>
                    <span className={`mr-2 shrink-0 text-[#8a8a9a]`}>{cat.id}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ) : cat.href === '#ask-ai' ? (
                  <button
                    type="button"
                    onClick={() => {
                      const chatBtn = document.querySelector('[class*="fixed bottom-6 right-6"] button') as HTMLElement;
                      if (chatBtn) chatBtn.click();
                    }}
                    onMouseEnter={() => setHoveredNav(cat.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`group flex w-full items-center px-4 py-2 text-left text-[0.825rem] tracking-[0.05em] transition-all ${
                      isHovered
                        ? 'bg-[#ff6b35]/8 text-[#ff6b35]'
                        : 'text-[#ff6b35]/70'
                    }`}
                  >
                    <span className="mr-1.5 text-[0.7rem] text-[#7a7a8a] shrink-0">└─</span>
                    <span className="mr-2 text-[#8a8a9a] shrink-0">{cat.id}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ) : (
                  <Link
                    href={cat.href!}
                    onMouseEnter={() => setHoveredNav(cat.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`group flex items-center px-4 py-2 text-[0.825rem] tracking-[0.05em] transition-all ${
                      isActive
                        ? 'bg-[#ff6b35]/12 font-bold text-[#ff6b35]'
                        : isHovered
                          ? 'bg-[#ff6b35]/8 text-[#ff6b35]'
                          : 'text-[#b0b0bc]'
                    }`}
                  >
                    <span className={`mr-1.5 text-[0.7rem] shrink-0 ${isActive ? 'text-[#ff6b35]/50' : 'text-[#7a7a8a]'}`}>
                      {catBranch}
                    </span>
                    <span className={`mr-2 shrink-0 ${isActive ? 'text-[#ff6b35]/70' : 'text-[#8a8a9a]'}`}>{cat.id}</span>
                    <span className="truncate">{cat.label}</span>
                    {isActive && <span className="ml-1 animate-blink text-[#ff6b35] shrink-0">█</span>}
                  </Link>
                )}

                {hasItems && isExpanded && (
                  <div className="overflow-hidden">
                    {cat.items!.map((item, i) => {
                      const isSubHovered = hoveredNav === `${cat.id}-${i}`;
                      const isLastItem = i === cat.items!.length - 1;
                      const vertLine = isLastCat ? ' ' : '│';
                      const subBranch = isLastItem ? '└─' : '├─';
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onMouseEnter={() => setHoveredNav(`${cat.id}-${i}`)}
                          onMouseLeave={() => setHoveredNav(null)}
                          className={`group flex items-center py-1.5 pl-9 pr-4 text-[0.775rem] tracking-[0.03em] transition-all ${
                            isSubHovered ? 'bg-[#ff6b35]/8 text-[#ff6b35]' : 'text-[#9a9ab0]'
                          }`}
                        >
                          <span className="mr-1.5 text-[0.6rem] shrink-0 text-[#7a7a8a]">{vertLine} {subBranch}</span>
                          <span className="truncate">{item.label}</span>
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
          {/* Skip button during typewriter animation */}
          {phase === 'header' && (
            <button
              type="button"
              onClick={handleSkip}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSkip(); } }}
              tabIndex={0}
              role="button"
              aria-label="Skip boot animation"
              className="fixed bottom-6 right-6 z-[110] font-mono text-xs tracking-[0.1em] text-white/45 transition-colors hover:text-white/50"
            >
              SKIP ▸
            </button>
          )}
          {/* Sound toggle */}
          <button
            type="button"
            onClick={() => setSoundOn(toggleSound())}
            className="fixed right-8 top-16 z-20 text-[0.6rem] tracking-[0.1em] text-[#3a3a4a] transition-colors hover:text-[#8a8a9a]"
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
              {/* 1. Hero Statement */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                  THE BIGGEST DROP IN<br />
                  GREEN HYDROGEN COSTS.<br />
                  <span className="glitch inline-block text-[#ff6b35]" data-text="EVER." style={{ textShadow: '0 0 15px rgba(255,107,53,0.5)' }}>EVER.</span>
                </h2>
                <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/50">
                  And how that translates into disrupting the industrial gas monopoly — with category-defining profit potential, scalable to hundreds of markets, and deployable anywhere in the world.
                </p>
              </motion.div>

              {/* 2. The Pitch */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                {/* Headline */}
                <h2 className="mb-6 text-2xl font-bold leading-tight text-white md:text-3xl">
                  We make the cheapest hydrogen, and do it{' '}
                  <span className="text-[#ff6b35]" style={{ textShadow: '0 0 12px rgba(255,107,53,0.4)' }}>on site.</span>
                </h2>

                {/* Problem → Solution */}
                <p className="mb-8 font-sans text-[0.95rem] leading-relaxed text-white/50">
                  Industrial hydrogen is a <span className="text-white font-semibold">$226B market</span> — and it&apos;s grey. Made from natural gas, trucked hundreds of miles. That supply chain is expensive and fragile. We make hydrogen from water, on or near site. Delivered cheaper and more reliably than grey — with <span className="text-[#ff6b35] font-semibold">margins &gt;70%</span> in most markets. Our economics are so good we can <span className="text-[#ff6b35] font-semibold">compete directly with grey hydrogen and win</span>.
                </p>

                {/* Where We Are + Team — matched cards */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-4" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
                    <p className="mb-3 text-[0.7rem] font-bold tracking-[0.2em] text-[#ff6b35]">WHERE WE ARE</p>
                    <div className="space-y-2 font-sans text-sm text-white/60">
                      <p>▸ Producing hydrogen for the last year</p>
                      <p>▸ 50kW system in multi-unit production</p>
                      <p className="ml-4 text-white/40">Vertically integrated, Oklahoma, BABA compliant</p>
                      <p>▸ First deployment Q4 2026 → <span className="text-[#ff6b35]">$250k/mo revenue</span></p>
                      <p>▸ MW-scale contracted (world&apos;s largest combustion R&amp;D facility)</p>
                      <p>▸ <span className="text-[#ff6b35]">$100M pipeline</span>, $20M signed LOIs</p>
                    </div>
                  </div>
                  <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-4" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
                    <p className="mb-3 text-[0.7rem] font-bold tracking-[0.2em] text-[#ff6b35]">TEAM</p>
                    <p className="mb-3 font-sans text-sm leading-relaxed text-white/60">
                      Colby DeWeese (CEO) managed $75M+ in energy infra and first-of-a-kind hydrogen combustion tech. Behind him: 20+ years electrolyzer R&amp;D, Patriot missile defense engineers, equipment deployed from Antarctica to Alaska, and a shop where the welders CNC their own PCBs.
                    </p>
                    <Link href="/team" className="text-sm text-[#ff6b35] transition-colors hover:text-[#ff6b35]/80">Meet the Team →</Link>
                  </div>
                </div>

              </motion.div>

              {/* AI + Documents — two column */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-10 grid gap-4 md:grid-cols-2"
              >
                {/* AI Assistant */}
                <div
                  className="rounded border border-[#ff6b35]/30 bg-gradient-to-r from-[#ff6b35]/[0.08] to-[#ff6b35]/[0.05] px-6 py-5 cursor-pointer transition-all hover:border-[#ff6b35]/50 hover:shadow-[0_0_20px_rgba(255,107,53,0.1)]"
                  onClick={() => {
                    const chatBtn = document.querySelector('[class*="fixed bottom-6 right-6"] button') as HTMLElement;
                    if (chatBtn) chatBtn.click();
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/10 animate-pulse">
                      <span className="text-2xl" style={{ textShadow: '0 0 12px rgba(255,107,53,0.6)' }}>⚡</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>
                        ASK REN
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        Trained on this data room. Every number, every spec. Ask anything.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <Link
                  href="/documents"
                  className="rounded border border-[#ff6b35]/20 bg-gradient-to-r from-[#ff6b35]/[0.05] to-transparent px-6 py-5 transition-all hover:border-[#ff6b35]/40 hover:shadow-[0_0_20px_rgba(255,107,53,0.08)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/10">
                      <span className="text-xl text-[#ff6b35]">📄</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>
                        DOCUMENT LIBRARY
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        We built this data room to make hard tech easier to understand. Prefer a traditional format? Browse all documents directly.
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 3. Three Revenue Engines */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
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
                      className="group border border-[#ff6b35]/20 bg-[#0a0a0f]/60 p-5 transition-all hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/5"
                    >
                      <h3 className="mb-1 text-base font-bold text-[#ff6b35] transition-colors group-hover:text-[#ff6b35]">
                        {engine.title}
                      </h3>
                      <div className="mb-2 text-xs text-[#ff6b35]">{engine.subtitle}</div>
                      <p className="text-sm text-[#9a9ab0]">{engine.desc}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* 4. Technology — Why It Matters */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="mb-6 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                  THE BREAKTHROUGH
                </h2>

                <div className="mb-6 border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-5" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
                  <p className="font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
                    Our innovation is two-tiered: a <span className="text-[#ff6b35] font-semibold">unique cell geometry</span> designed to maximize the output of our <span className="text-[#ff6b35] font-semibold">purpose-built power electronics optimized specifically for hydrogen production</span>. The result isn&apos;t just competing with green hydrogen — it&apos;s competing with the entire <span className="text-white font-semibold">$226B grey hydrogen market</span>, constrained by geography and logistics, with the flexibility that small modular facilities afford.
                    {' '}<Link href="/technology#ip" className="text-xs tracking-[0.1em] text-white/70 transition-colors hover:text-white">
                    2 patents filed, 1 in progress, registered trademark →
                  </Link>
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-5" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
                    <p className="mb-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">EFFICIENCY IS THE MOAT</p>
                    <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>&gt;92% HHV</p>
                    <p className="mt-2 text-xs text-white/40">System efficiency. PEM competitors run 50-58 kWh/kg. We measured 46. Every kWh/kg is margin.</p>
                  </div>
                  <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-5" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
                    <p className="mb-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">AI-EMBEDDED MANUFACTURING</p>
                    <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>End to End</p>
                    <p className="mt-2 text-xs text-white/40">AI woven from first quote through manufacturing to predictive maintenance. Not bolted on — built in from day one.</p>
                  </div>
                  <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-5" style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
                    <p className="mb-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">MADE IN AMERICA</p>
                    <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>Oklahoma</p>
                    <p className="mt-2 text-xs text-white/40">Vertically integrated. We CNC our cells, etch our PCBs, wind our transformers. 95% U.S.-sourced. BABA compliant.</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/technology"
                    className="text-sm text-[#ff6b35] transition-colors hover:text-[#ff6b35]/80"
                  >
                    Explore the Technology →
                  </Link>
                </div>
              </motion.div>

              {/* 5. Financial Snapshot */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                  FINANCIAL SNAPSHOT
                </h2>
                <div className="border border-[#ff6b35]/20 bg-[#0a0a0f]/60 p-6">
                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    {/* HaaS */}
                    <div className="border-l-[3px] border-[#ff6b35] bg-[#0a0a0f]/60 px-5 py-4" style={{ borderTop: '1px solid rgba(255,107,53,0.06)', borderRight: '1px solid rgba(255,107,53,0.06)', borderBottom: '1px solid rgba(255,107,53,0.06)' }}>
                      <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">HYDROGEN AS A SERVICE</p>
                      <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>~$22.5M/yr</p>
                      <p className="mt-1 text-xs text-white/40">Average annual revenue per HaaS site</p>
                      <p className="mt-1 text-xs text-white/45">Recurring, high-margin, long-term offtake</p>
                    </div>
                    {/* Equipment + Services */}
                    <div className="border-l-[3px] border-[#ff6b35] bg-[#0a0a0f]/60 px-5 py-4" style={{ borderTop: '1px solid rgba(255,107,53,0.06)', borderRight: '1px solid rgba(255,107,53,0.06)', borderBottom: '1px solid rgba(255,107,53,0.06)' }}>
                      <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">EQUIPMENT &amp; SERVICES</p>
                      <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>$197M</p>
                      <p className="mt-1 text-xs text-white/40">FY7 equipment sales + AI services revenue</p>
                      <p className="mt-1 text-xs text-white/45">Direct sales, maintenance, predictive AI</p>
                    </div>
                    {/* Scale */}
                    <div className="border-l-[3px] border-[#ff6b35] bg-[#0a0a0f]/60 px-5 py-4" style={{ borderTop: '1px solid rgba(255,107,53,0.06)', borderRight: '1px solid rgba(255,107,53,0.06)', borderBottom: '1px solid rgba(255,107,53,0.06)' }}>
                      <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">DEPLOYMENT SCALE</p>
                      <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>12 sites modeled</p>
                      <p className="mt-1 text-xs text-white/40">Hundreds more available across North America</p>
                      <p className="mt-1 text-xs text-white/45">Every grey hydrogen delivery point is a target</p>
                    </div>
                    {/* 45V PTC */}
                    <div className="border-l-[3px] border-[#ff6b35] bg-[#0a0a0f]/60 px-5 py-4" style={{ borderTop: '1px solid rgba(255,107,53,0.06)', borderRight: '1px solid rgba(255,107,53,0.06)', borderBottom: '1px solid rgba(255,107,53,0.06)' }}>
                      <p className="mb-1 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">45V PRODUCTION TAX CREDIT</p>
                      <p className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>~$27M lifetime</p>
                      <p className="mt-1 text-xs text-white/40">Per qualifying site ($3/kg × 10 years)</p>
                      <p className="mt-1 text-xs text-white/45">The faster we deploy, the more sites qualify — pure margin upside</p>
                    </div>
                  </div>
                  <Link
                    href="/financials"
                    className="inline-block text-sm text-[#ff6b35] transition-colors hover:text-[#ff6b35]/80"
                  >
                    View Financial Model →
                  </Link>
                </div>
              </motion.div>

              {/* 6. Active Projects */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
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
                    className="group border border-[#ff6b35]/20 bg-[#0a0a0f]/60 transition-all hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/5"
                  >
                    <div className="h-48 overflow-hidden bg-black/40">
                      <img
                        src="/images/showroom-inspo.jpg"
                        alt="NODE-01 Showroom"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 text-base font-bold text-[#ff6b35]">NODE-01</h3>
                      <p className="text-sm text-[#9a9ab0]">
                        AI-integrated containerized showroom. Completion: April 2026.
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/projects/zeeco"
                    className="group border border-[#ff6b35]/20 bg-[#0a0a0f]/60 transition-all hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/5"
                  >
                    <div className="h-48 overflow-hidden bg-black/40">
                      <img
                        src="/images/zeeco-deployment.png"
                        alt="Zeeco ARC Commercial Deployment"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 text-base font-bold text-[#ff6b35]">Zeeco ARC</h3>
                      <p className="text-sm text-[#9a9ab0]">
                        First commercial deployment. 12× T-25. 600kW. Q4 2026.
                      </p>
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* 8. Directory + AI Assistant — two column */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-12 grid gap-6 md:grid-cols-2"
              >
                {/* LEFT: Section Directory */}
                <div>
                  <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
                    SECTION DIRECTORY
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'BUSINESS',
                        color: '#ff6b35',
                        items: [
                          { name: 'Business Model', href: '/business-model' },
                          { name: 'Customers', href: '/customers' },
                          { name: 'Financial Model', href: '/financials' },
                          { name: 'Tax Credits', href: '/tax-credits' },
                        ],
                      },
                      {
                        title: 'TECHNOLOGY',
                        color: '#ff6b35',
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
                          { name: 'Proof', href: '/proof' },
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
                              <span className="mr-2 text-sm text-[#8a8a9a]">
                                {j === section.items.length - 1 ? '└─' : '├─'}
                              </span>
                              <span className="text-sm transition-colors" style={{ color: section.color }}>
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: AI Assistant — The Lightning Bolt */}
                <RenPanel />
              </motion.div>

              
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
