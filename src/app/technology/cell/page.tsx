'use client';

import { useEffect } from 'react';
import { AutoplayVideo } from '@/components/AutoplayVideo';
import Link from 'next/link';

function useAutoplayVideos() {
  useEffect(() => {
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach((v) => { const video = v as HTMLVideoElement; video.muted = true; video.play().catch(() => {}); });
    const handleScroll = () => { document.querySelectorAll('video[autoplay]').forEach((v) => { const video = v as HTMLVideoElement; if (video.paused) video.play().catch(() => {}); }); };
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

function SectionDivider() {
  return (
    <div className="my-12 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
      <span className="font-mono text-xs tracking-[0.3em] text-[#ff6b35]/30"
        style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}>═══════</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
    </div>
  );
}

export default function ElectrolysisCellPage() {
  useAutoplayVideos();
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 text-[0.7rem] tracking-[0.2em] text-[#00d4ff] glow-cyan">
            ┌─── TECHNOLOGY / ELECTROLYSIS CELL ───┐
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
            The Capacitive Cell
          </h1>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#00d4ff] md:text-3xl"
            style={{ textShadow: '0 0 12px rgba(0,212,255,0.3)' }}>
            Membrane-free by design, not by compromise.
          </h2>
          <p className="max-w-3xl font-sans text-lg leading-relaxed text-white/60">
            Conventional electrolyzers use a proton exchange membrane to separate
            hydrogen and oxygen. That membrane is the most expensive, most
            failure-prone, and most supply-chain-constrained component in the
            system. We eliminated it.
          </p>
        </div>
      </section>

      {/* Two-Column: Image + How It Works */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          {/* LEFT — Cell Image (40%) */}
          <div className="flex w-full justify-center md:w-[40%]">
            <div>
              <img
                src="/media/manufacturing/modular-dry-cell.png"
                alt="T-25 Electrolysis Cell — Modular, Field-Swappable Design"
                className="rounded border border-white/10"
                style={{ maxWidth: '400px', width: '100%' }}
              />
              <p className="mt-3 text-center text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">T-25 ELECTROLYSIS CELL — MODULAR, FIELD-SWAPPABLE DESIGN</p>
            </div>
          </div>

          {/* RIGHT — How It Works (60%) */}
          <div className="w-full md:w-[60%]">
            <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
              ┌─── HOW IT WORKS ───┐
            </div>
            <h2 className="mb-6 text-2xl font-bold text-white">
              Capacitive Electrolysis
            </h2>
            <ul className="space-y-3 font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
              {[
                'Capacitive electrolysis with pulsed waveform architecture',
                'No membrane — eliminates the primary degradation mechanism',
                'No precious metals — no iridium, platinum, or rare earths',
                'No cooling system — operates at ~28°C',
                'Pulse frequency range: 10 kHz – 250 kHz',
                '304 stainless steel construction',
                '30-minute field swap demonstrated',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[2px] text-[#ff6b35]">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Operating Conditions */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: 'STACK TEMP', value: '27–28°C', note: 'Near-ambient, no cooling required' },
                { label: 'STACK PRESSURE', value: '2.75 bar', note: '~25 psig operating' },
                { label: 'H₂ OUTPUT', value: '50 psig', note: '3.08 bar(g) delivery pressure' },
                { label: 'WATER INPUT', value: 'Municipal', note: 'TDS tolerant, RO + DI polishing' },
              ].map((c) => (
                <div key={c.label} className="border-l-2 border-[#00d4ff]/30 bg-[#00d4ff]/[0.03] px-3 py-2">
                  <p className="text-[0.6rem] tracking-[0.12em] text-[#00d4ff]/70">{c.label}</p>
                  <p className="text-lg font-bold text-[#00d4ff]" style={{ textShadow: '0 0 8px rgba(0,212,255,0.3)' }}>{c.value}</p>
                  <p className="text-[0.65rem] text-white/40">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/40">
              Operating at near-ambient temperature means no active cooling infrastructure. In a conventional electrolyzer, 30–60% of input energy becomes waste heat requiring chillers, heat exchangers, and cooling loops. Tobe&apos;s isothermal operation eliminates this entirely — heat rejection for a 12-unit facility is &lt;50 kW.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider />

        {/* ═══ HOW IT'S MADE ═══ */}
        <section className="py-12">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── HOW IT&apos;S MADE ───┐
          </div>

          <div className="mb-8 max-w-3xl border-l-[3px] border-[#ff6b35] pl-5">
            <p className="font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
              304 stainless steel. CNC machined in-house. No rare earths. No
              membranes.
            </p>
          </div>

          {/* CNC videos — main left, two stacked right */}
          <div className="grid gap-4 md:grid-cols-5">
            {/* Left — hero video (3/5 width) */}
            <div className="md:col-span-3 overflow-hidden rounded border border-white/10 bg-[#12121a]">
              <AutoplayVideo src="/media/manufacturing/cnc-electrolysis-housing.mp4" poster="/media/manufacturing/cnc-electrolysis-housing-poster.jpg" className="w-full aspect-video object-cover" />
              <div className="px-4 py-3">
                <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">CNC MACHINING — ELECTROLYSIS CELL HOUSING</p>
                <p className="mt-1 text-xs text-white/40">Langmuir MR-1 cutting 304 stainless steel. From raw stock to finished housing in a single setup.</p>
              </div>
            </div>

            {/* Right — two stacked (2/5 width) */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="overflow-hidden rounded border border-white/10 bg-[#12121a]">
                <AutoplayVideo src="/media/manufacturing/cnc-electrolysis-housing-2.mp4" poster="/media/manufacturing/cnc-electrolysis-housing-2-poster.jpg" className="w-full aspect-video object-cover" />
                <div className="px-4 py-2">
                  <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">PRECISION MACHINING DETAIL</p>
                </div>
              </div>
              <div className="overflow-hidden rounded border border-white/10 bg-[#12121a]">
                <AutoplayVideo src="/media/manufacturing/cnc-electrolysis-housing-5.mp4" poster="/media/manufacturing/cnc-electrolysis-housing-5-poster.jpg" className="w-full aspect-video object-cover" />
                <div className="px-4 py-2">
                  <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">FINISHED CELL HOUSING</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ SPEC TABLE ═══ */}
        <section className="py-12">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#00d4ff] glow-cyan">
            ┌─── PERFORMANCE SPECIFICATIONS ───┐
          </div>

          <div className="overflow-hidden border border-white/5 bg-[#12121a]">
            <div className="grid grid-cols-3 border-b border-white/10 bg-[#0e0e16]">
              <div className="px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#6a6a7a]">PARAMETER</div>
              <div className="border-l border-white/5 px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#6a6a7a]">T-25</div>
              <div className="border-l border-white/5 px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#6a6a7a]">T-125</div>
            </div>
            {[
              ['Nameplate Power', '50 kW', '250 kW'],
              ['H₂ Production', '25 kg/day', '125 kg/day'],
              ['Stack Efficiency (HHV)', '~93%', '~93%'],
              ['Specific Energy (stack)', '42.2 kWh/kg', '42.2 kWh/kg'],
              ['Specific Energy (system)', '46 kWh/kg', '46 kWh/kg'],
              ['H₂ Purity (post-purification)', '≥99.99%', '≥99.99%'],
              ['Operating Temperature', '27–28°C', '27–28°C'],
              ['Stack Pressure', '2.75 bar(g)', '2.75 bar(g)'],
              ['H₂ Delivery Pressure', '50 psig', '50 psig'],
              ['Water Consumption', '10 kg/kg H₂', '10 kg/kg H₂'],
              ['Stack Design Life', '80,000+ hrs', '80,000+ hrs'],
              ['Field Swap Time', '30 min', '30 min'],
              ['Power Supply', '480VAC 3-phase', '480VAC 3-phase'],
            ].map(([param, t25, t125], i) => (
              <div key={param} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'}`}>
                <div className="px-5 py-3 text-sm text-white/60">{param}</div>
                <div className="border-l border-white/5 px-5 py-3 text-sm font-bold text-[#00ff88]"
                  style={{ textShadow: '0 0 6px rgba(0,255,136,0.15)' }}>{t25}</div>
                <div className="border-l border-white/5 px-5 py-3 text-sm font-bold text-[#00ff88]"
                  style={{ textShadow: '0 0 6px rgba(0,255,136,0.15)' }}>{t125}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 font-sans text-xs text-[#6a6a7a]">
            Source: January 2026 engineering quote. ISO 22734
            certification path in progress.
          </div>
        </section>

        <SectionDivider />

        {/* ═══ WHY STAINLESS STEEL ═══ */}
        <section className="py-12">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#00d4ff] glow-cyan">
            ┌─── MATERIALS ───┐
          </div>

          <h2 className="mb-6 text-2xl font-bold text-white">
            304 Stainless Steel. Not Platinum.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Conventional */}
            <div className="border-l-[3px] border-[#ff4444] bg-[#12121a] px-6 py-6"
              style={{ borderTop: '1px solid rgba(255,68,68,0.08)', borderRight: '1px solid rgba(255,68,68,0.08)', borderBottom: '1px solid rgba(255,68,68,0.08)' }}>
              <div className="mb-3 text-[0.7rem] tracking-[0.18em] text-[#ff4444]/80">CONVENTIONAL PEM</div>
              <div className="space-y-2 font-sans text-sm text-[#9a9aaa]">
                <p>Iridium catalyst — $5,000+/oz, geopolitically concentrated (South Africa, Russia)</p>
                <p>Platinum catalyst — $1,000+/oz, limited global supply</p>
                <p>Nafion membrane — $500–2,000/m², degrades over 40–60k hours</p>
                <p className="pt-2 text-[#ff4444]/70">Primary failure mode: membrane degradation</p>
              </div>
            </div>

            {/* Tobe */}
            <div className="border-l-[3px] border-[#00ff88] bg-[#12121a] px-6 py-6"
              style={{ borderTop: '1px solid rgba(0,255,136,0.08)', borderRight: '1px solid rgba(0,255,136,0.08)', borderBottom: '1px solid rgba(0,255,136,0.08)' }}>
              <div className="mb-3 text-[0.7rem] tracking-[0.18em] text-[#00ff88]">TOBE ENERGY</div>
              <div className="space-y-2 font-sans text-sm text-[#b0b0c0]">
                <p>304 stainless steel — commodity industrial material, globally abundant</p>
                <p>No precious metals — zero iridium, zero platinum</p>
                <p>No membrane — eliminates primary degradation mechanism</p>
                <p className="pt-2 font-bold text-[#00ff88]">Design stack life: 80,000+ hours</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ COMPARISON ═══ */}
        <section className="py-12">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── vs CONVENTIONAL ELECTROLYZERS ───┐
          </div>

          <div className="overflow-hidden border border-white/5 bg-[#12121a]">
            <div className="grid grid-cols-4 border-b border-white/10 bg-[#0e0e16]">
              <div className="px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#6a6a7a]">PARAMETER</div>
              <div className="border-l border-white/5 px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#00ff88]">TOBE</div>
              <div className="border-l border-white/5 px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#ff4444]/60">PEM</div>
              <div className="border-l border-white/5 px-5 py-3 text-[0.65rem] tracking-[0.15em] text-[#ff4444]/60">ALKALINE</div>
            </div>
            {[
              ['Specific Energy (kWh/kg)', '42–46', '50–58', '51–56'],
              ['Operating Temp (°C)', '27–28', '60–80', '60–80'],
              ['Membrane', 'None', 'PEM (degrades)', 'Diaphragm'],
              ['Precious Metals', 'None', 'Ir, Pt', 'None (KOH)'],
              ['Cooling System', 'Not required', 'Required', 'Required'],
              ['Installed CAPEX ($/kW)', '~$500', '$1,400–2,500', '$500–1,000'],
              ['Stack Lifetime (hrs)', '80,000+', '40–60k', '60–80k'],
            ].map(([param, tobe, pem, alk], i) => (
              <div key={param} className={`grid grid-cols-4 ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'}`}>
                <div className="px-5 py-3 text-sm text-white/60">{param}</div>
                <div className="border-l border-white/5 px-5 py-3 text-sm font-bold text-[#00ff88]"
                  style={{ textShadow: '0 0 6px rgba(0,255,136,0.15)' }}>{tobe}</div>
                <div className="border-l border-white/5 px-5 py-3 text-sm text-white/40">{pem}</div>
                <div className="border-l border-white/5 px-5 py-3 text-sm text-white/40">{alk}</div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ═══ NAVIGATE ═══ */}
        <section className="py-12">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/technology/power-converter"
              className="group border-l-[3px] border-[#00d4ff] bg-[#12121a] px-6 py-6 transition-all hover:bg-[#14141e]"
              style={{ borderTop: '1px solid rgba(0,212,255,0.08)', borderRight: '1px solid rgba(0,212,255,0.08)', borderBottom: '1px solid rgba(0,212,255,0.08)' }}>
              <h3 className="mb-2 text-lg font-bold text-white">Power Converter →</h3>
              <p className="font-sans text-sm text-[#8a8a9a]">
                Custom resonant LLC topology. From waveform generation to hydrogen output.
              </p>
            </Link>
            <Link href="/technology/controls"
              className="group border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-6 transition-all hover:bg-[#14141e]"
              style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
              <h3 className="mb-2 text-lg font-bold text-white">Controls & Instrumentation →</h3>
              <p className="font-sans text-sm text-[#8a8a9a]">
                5 boards, 100 cloud variables, 8 Modbus slaves. Live HMI dashboard.
              </p>
            </Link>
          </div>
        </section>
      </div>

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
