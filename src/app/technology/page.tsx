'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AutoplayVideo } from '@/components/AutoplayVideo';
import Link from 'next/link';

function useAutoplayVideos() {
  useEffect(() => {
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach((v) => {
      const video = v as HTMLVideoElement;
      video.muted = true;
      video.play().catch(() => {});
    });
    // Also retry on scroll (Safari sometimes needs interaction context)
    const handleScroll = () => {
      videos.forEach((v) => {
        const video = v as HTMLVideoElement;
        if (video.paused) video.play().catch(() => {});
      });
    };
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

export default function TechnologyPage() {
  useAutoplayVideos();
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      <style>{`
        .tech-card {
          transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
        }
        .tech-card:hover {
          background-color: #14141e;
          box-shadow: 0 0 20px var(--glow, rgba(255,107,53,0.08));
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* ═══ HEADER ═══ */}
        <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
          ┌─── THE TECHNOLOGY ───┐
        </div>

        {/* ═══ HERO SECTION ═══ */}
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white/90 sm:text-3xl"
          style={{ textShadow: '0 0 12px rgba(255,107,53,0.15)' }}>
          Vertically Integrated. First Principle to Finished Product.
        </h1>
        <p className="mb-8 max-w-3xl font-sans text-[0.95rem] leading-relaxed text-[#8a8a9a]">
          All in-house. From engineering to manufacturing. Entering serialized production to support our first 1MW deployment. Building the container of the future.
        </p>

        {/* ═══ VISUAL HERO ROW ═══ */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {/* CNC Video */}
          <div className="overflow-hidden rounded border border-white/10 bg-[#12121a]">
            <AutoplayVideo src="/media/manufacturing/cnc-electrolysis-housing.mp4" poster="/media/manufacturing/cnc-electrolysis-housing-poster.jpg" className="w-full aspect-video object-cover" />
            <div className="px-4 py-3">
              <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">CNC MACHINING — Cell Housing</p>
              <p className="mt-1 text-xs text-white/40">304 stainless steel, machined in-house on Langmuir MR-1</p>
            </div>
          </div>

          {/* PCB Video */}
          <div className="overflow-hidden rounded border border-white/10 bg-[#12121a]">
            <AutoplayVideo src="/media/manufacturing/pcb-mfg-11.mp4" poster="/media/manufacturing/pcb-mfg-11-poster.jpg" className="w-full aspect-video object-cover" />
            <div className="px-4 py-3">
              <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">PCB FABRICATION — Power Electronics</p>
              <p className="mt-1 text-xs text-white/40">Designed in KiCad, laser-etched and assembled on-site</p>
            </div>
          </div>
        </div>

        {/* ═══ SYSTEM ARCHITECTURE DIAGRAM ═══ */}
        <div className="mb-10">
          <div className="mb-3 text-xs tracking-[0.2em] uppercase text-white/45">
            SYSTEM ARCHITECTURE
          </div>
          <motion.div
            className="mx-auto max-w-3xl"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <svg
              viewBox="0 0 700 340"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ fontFamily: 'monospace' }}
            >
              {/* Arrowhead markers */}
              <defs>
                <marker id="arrow-white" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                </marker>
                <marker id="arrow-orange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="#ff6b35" strokeWidth="1" />
                </marker>
                <marker id="arrow-cyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="none" stroke="#00d4ff" strokeWidth="1" />
                </marker>
              </defs>

              {/* ── Water Input ── */}
              <text x="20" y="108" fill="rgba(255,255,255,0.8)" fontSize="13" fontWeight="bold">H₂O</text>
              <text x="12" y="124" fill="rgba(255,255,255,0.4)" fontSize="10">WATER IN</text>
              {/* Water → Cell (solid white, material flow) */}
              <line x1="62" y1="106" x2="168" y2="106" stroke="rgba(255,255,255,0.7)" strokeWidth="2" markerEnd="url(#arrow-white)" />

              {/* ── Electrolysis Cell (central, largest, orange border) ── */}
              <rect x="178" y="65" width="200" height="90" rx="6" fill="rgba(255,107,53,0.06)" stroke="#ff6b35" strokeWidth="1.5" />
              <text x="278" y="96" fill="#ff6b35" fontSize="14" fontWeight="bold" textAnchor="middle">ELECTROLYSIS CELL</text>
              <text x="278" y="116" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Membrane-free capacitive splitting</text>
              <text x="278" y="134" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">No rare earths | Near-ambient temp</text>

              {/* ── H₂ Output ── */}
              {/* Cell → H₂ (solid orange, material flow) */}
              <line x1="378" y1="94" x2="478" y2="94" stroke="#ff6b35" strokeWidth="2" markerEnd="url(#arrow-orange)" />
              <rect x="488" y="76" width="88" height="38" rx="4" fill="rgba(255,107,53,0.08)" stroke="rgba(255,107,53,0.4)" strokeWidth="1" />
              <text x="532" y="99" fill="#ff6b35" fontSize="13" fontWeight="bold" textAnchor="middle">H₂</text>
              <text x="594" y="99" fill="rgba(255,255,255,0.5)" fontSize="10">OUTPUT</text>

              {/* ── O₂ Output ── */}
              {/* Cell → O₂ (solid white, material flow) */}
              <line x1="378" y1="132" x2="488" y2="172" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" markerEnd="url(#arrow-white)" />
              <rect x="498" y="158" width="76" height="34" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <text x="536" y="180" fill="rgba(255,255,255,0.5)" fontSize="13" fontWeight="bold" textAnchor="middle">O₂</text>
              <text x="586" y="180" fill="rgba(255,255,255,0.4)" fontSize="9">VENT</text>

              {/* ── Power Converter ── */}
              <rect x="70" y="220" width="170" height="65" rx="5" fill="rgba(255,107,53,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="155" y="247" fill="rgba(255,255,255,0.8)" fontSize="14" fontWeight="bold" textAnchor="middle">POWER CONVERTER</text>
              <text x="155" y="265" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">LLC resonant | Pulsed DC</text>
              {/* Converter → Cell (solid orange, power flow) */}
              <line x1="192" y1="220" x2="238" y2="155" stroke="#ff6b35" strokeWidth="2" markerEnd="url(#arrow-orange)" />
              <text x="196" y="192" fill="rgba(255,107,53,0.6)" fontSize="9">POWER</text>

              {/* ── Controls / HMI ── */}
              <rect x="310" y="230" width="200" height="65" rx="5" fill="rgba(0,212,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="410" y="257" fill="rgba(255,255,255,0.8)" fontSize="14" fontWeight="bold" textAnchor="middle">CONTROLS / HMI</text>
              <text x="410" y="275" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">5 Arduinos | 100 cloud vars | 8 Modbus</text>

              {/* Controls → Cell (dashed cyan, data flow) */}
              <line x1="360" y1="230" x2="310" y2="155" stroke="#00d4ff" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrow-cyan)" />
              <text x="318" y="200" fill="rgba(0,212,255,0.6)" fontSize="9">DATA</text>

              {/* Controls → Converter (dashed cyan, data flow) */}
              <line x1="310" y1="262" x2="240" y2="262" stroke="#00d4ff" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrow-cyan)" />

              {/* Controls → H₂ output monitoring (dashed cyan) */}
              <line x1="510" y1="236" x2="535" y2="114" stroke="#00d4ff" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrow-cyan)" />
              <text x="542" y="180" fill="rgba(0,212,255,0.6)" fontSize="9">MONITOR</text>

              {/* Controls label: monitors all */}
              <text x="410" y="312" fill="rgba(0,212,255,0.35)" fontSize="9" textAnchor="middle">(monitors all subsystems)</text>

              {/* ── Legend ── */}
              <line x1="20" y1="328" x2="50" y2="328" stroke="#ff6b35" strokeWidth="2" />
              <text x="56" y="332" fill="rgba(255,255,255,0.4)" fontSize="9">POWER / MATERIAL</text>
              <line x1="190" y1="328" x2="220" y2="328" stroke="#00d4ff" strokeWidth="1" strokeDasharray="4 3" />
              <text x="226" y="332" fill="rgba(255,255,255,0.4)" fontSize="9">DATA / CONTROL</text>
            </svg>
          </motion.div>
        </div>

        {/* ═══ 4 ASCII ART MODULE CARDS ═══ */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* CELL */}
          <Link
            href="/technology/cell"
            className="tech-card block border border-[#ff6b35]/15 bg-[#12121a] px-5 py-5"
            style={{ '--glow': 'rgba(255,107,53,0.1)' } as React.CSSProperties}
          >
            <pre className="mb-3 text-[0.6rem] leading-[1.3] text-[#ff6b35]/50">{`  ┌─┬─┬─┐
  │ │ │ │
  │H₂│O₂│
  └─┴─┴─┘`}</pre>
            <div className="mb-1 text-base font-bold text-[#ff6b35]"
              style={{ textShadow: '0 0 6px rgba(255,107,53,0.2)' }}>
              CELL
            </div>
            <div className="text-xs text-[#8a8a9a]">
              Membrane-free. No rare earths.
            </div>
            <div className="mt-2 text-xs text-[#ff6b35]/50">────→</div>
          </Link>

          {/* CONVERTER */}
          <Link
            href="/technology/power-converter"
            className="tech-card block border border-[#ff6b35]/15 bg-[#12121a] px-5 py-5"
            style={{ '--glow': 'rgba(255,107,53,0.1)' } as React.CSSProperties}
          >
            <pre className="mb-3 text-[0.6rem] leading-[1.3] text-[#ff6b35]/50">{`  ╔═══╗
  ║ ~ ║
  ╠═╦═╣
  ║▓║▓║`}</pre>
            <div className="mb-1 text-base font-bold text-[#ff6b35]"
              style={{ textShadow: '0 0 6px rgba(255,107,53,0.2)' }}>
              CONVERTER
            </div>
            <div className="text-xs text-[#8a8a9a]">
              Custom LLC resonant topology.
            </div>
            <div className="mt-2 text-xs text-[#ff6b35]/50">────→</div>
          </Link>

          {/* CONTROLS */}
          <Link
            href="/technology/controls"
            className="tech-card block border border-[#ff6b35]/15 bg-[#12121a] px-5 py-5"
            style={{ '--glow': 'rgba(255,107,53,0.1)' } as React.CSSProperties}
          >
            <pre className="mb-3 text-[0.6rem] leading-[1.3] text-[#ff6b35]/50">{`  ┌──────┐
  │ >_   │
  │ T:28 │
  │ P:25 │`}</pre>
            <div className="mb-1 text-base font-bold text-[#ff6b35]"
              style={{ textShadow: '0 0 6px rgba(255,107,53,0.2)' }}>
              CONTROLS
            </div>
            <div className="text-xs text-[#8a8a9a]">
              Real-time HMI. 100 cloud variables.
            </div>
            <div className="mt-2 text-xs text-[#ff6b35]/50">────→</div>
          </Link>

          {/* TESTING */}
          <Link
            href="/technology/efficiency"
            className="tech-card block border border-[#ff6b35]/15 bg-[#12121a] px-5 py-5"
            style={{ '--glow': 'rgba(255,107,53,0.1)' } as React.CSSProperties}
          >
            <pre className="mb-3 text-[0.6rem] leading-[1.3] text-[#ff6b35]/50">{`  ▁▂▃▅▆▇
  ▔▔▔▔▔▔
  46 kWh
  /kg H₂`}</pre>
            <div className="mb-1 text-base font-bold text-[#ff6b35]"
              style={{ textShadow: '0 0 6px rgba(255,107,53,0.2)' }}>
              TESTING
            </div>
            <div className="text-xs text-[#8a8a9a]">
              46 kWh/kg measured. Beating stated 92%.
            </div>
            <div className="mt-2 text-xs text-[#ff6b35]/50">────→</div>
          </Link>
        </div>

        {/* ═══ STATS ROW ═══ */}
        <div className="mb-6 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-center">
          <span className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.25)' }}>
            {'>'}92% EFFICIENCY
          </span>
          <span className="text-lg text-[#3a3a4a]">·</span>
          <span className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.25)' }}>
            {'<'}30°C OPERATING
          </span>
          <span className="text-lg text-[#3a3a4a]">·</span>
          <span className="text-2xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.25)' }}>
            ZERO RARE EARTHS
          </span>
          <span className="text-lg text-[#3a3a4a]">·</span>
          <span className="text-2xl font-bold text-white/80">
            80K+ HOUR STACK LIFE
          </span>
        </div>

        {/* One paragraph */}
        <div className="mx-auto mb-10 max-w-3xl border-l-[3px] border-[#ff6b35] pl-5">
          <p className="font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
            Two fundamental differences: a capacitive cell that splits water
            without membranes or precious metals, and a pulsed power converter
            that eliminates waste heat at the source. The result is a system
            already exceeding its 92% efficiency target on the production unit.
            Everything above is the proof.
          </p>
        </div>

        {/* ═══ DIVIDER ═══ */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
          <span className="text-xs tracking-[0.3em] text-[#ff6b35]/30"
            style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}>═══════</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
        </div>

        {/* ═══ COMPARISON TABLE ═══ */}
        <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
          ┌─── TOBE vs CONVENTIONAL ───┐
        </div>

        <div className="overflow-hidden border border-white/5 bg-[#12121a]">
          <div className="grid grid-cols-3 border-b border-white/10 bg-[#0e0e16]">
            <div className="px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#8a8a9a]">METRIC</div>
            <div className="border-l border-white/5 px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#ff4444]/60">CONVENTIONAL</div>
            <div className="border-l border-white/5 px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#ff6b35]">TOBE ENERGY</div>
          </div>
          {[
            ['Membrane', 'PEM / AEM', 'NONE'],
            ['Rare Earths', 'Ir, Pt required', 'ZERO'],
            ['System Efficiency', '60–75% HHV', '>92% HHV'],
            ['Operating Temp', '60–80°C', '<30°C'],
            ['LCOH', '$4–8/kg', '<$2/kg'],
            ['Cooling Required', 'Active cooling', 'NONE'],
          ].map(([metric, conv, tobe], i) => (
            <div key={metric} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'}`}>
              <div className="px-5 py-3 text-sm text-white/60">{metric}</div>
              <div className="border-l border-white/5 px-5 py-3 text-sm text-white/40">{conv}</div>
              <div className="border-l border-white/5 px-5 py-3 text-sm font-bold text-[#ff6b35]"
                style={{ textShadow: '0 0 6px rgba(255,107,53,0.2)' }}>{tobe}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ INTELLECTUAL PROPERTY ═══ */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
          ┌─── INTELLECTUAL PROPERTY ───┐
        </div>
        <div className="border-l-2 border-[#ff6b35]/30 bg-[#12121a] px-6 py-5"
          style={{ borderTop: '1px solid rgba(255,107,53,0.06)', borderRight: '1px solid rgba(255,107,53,0.06)', borderBottom: '1px solid rgba(255,107,53,0.06)' }}>
          <div className="mb-4 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]/60">
            WHOLLY OWNED — NOT SHARED WITH ANY OTHER ENTITY
          </div>
          <div className="mb-4 space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="text-[#ff6b35]">●</span>
              <div>
                <span className="font-bold text-white/80">U.S. Provisional 63/570,102</span>
                <span className="text-white/40"> — March 2024. Capacitively coupled resonant electrolysis.</span>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#ff6b35]">●</span>
              <div>
                <span className="font-bold text-white/80">U.S. Non-Provisional 19/088,007</span>
                <span className="text-white/40"> — March 2025. Advanced resonant electrolysis system.</span>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#ff6b35]">●</span>
              <div>
                <span className="font-bold text-white/80">CIP Application (TOBE-CIP-001)</span>
                <span className="text-white/40"> — Filing imminent. 14 figures. Expanded claims.</span>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#ff6b35]">●</span>
              <div>
                <span className="font-bold text-white/80">TOBE ENERGY&trade; Trademark</span>
                <span className="text-white/40"> — Application No. 99537135, December 2025.</span>
              </div>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-white/45">
            Specific waveform parameters, converter tuning ratios, and control algorithms are maintained as trade secrets.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="h-16" />
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl text-center">
          <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
            {`TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024
CONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
