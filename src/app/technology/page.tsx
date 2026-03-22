'use client';

import { useEffect } from 'react';
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
        <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#00d4ff] glow-cyan">
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

        {/* ═══ 4 ASCII ART MODULE CARDS ═══ */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* CELL */}
          <Link
            href="/technology/cell"
            className="tech-card block border border-[#00ff88]/15 bg-[#12121a] px-5 py-5"
            style={{ '--glow': 'rgba(0,255,136,0.1)' } as React.CSSProperties}
          >
            <pre className="mb-3 text-[0.6rem] leading-[1.3] text-[#00ff88]/50">{`  ┌─┬─┬─┐
  │ │ │ │
  │H₂│O₂│
  └─┴─┴─┘`}</pre>
            <div className="mb-1 text-base font-bold text-[#00ff88]"
              style={{ textShadow: '0 0 6px rgba(0,255,136,0.2)' }}>
              CELL
            </div>
            <div className="text-xs text-[#8a8a9a]">
              Membrane-free. No rare earths.
            </div>
            <div className="mt-2 text-xs text-[#00ff88]/50">────→</div>
          </Link>

          {/* CONVERTER */}
          <Link
            href="/technology/power-converter"
            className="tech-card block border border-[#00d4ff]/15 bg-[#12121a] px-5 py-5"
            style={{ '--glow': 'rgba(0,212,255,0.1)' } as React.CSSProperties}
          >
            <pre className="mb-3 text-[0.6rem] leading-[1.3] text-[#00d4ff]/50">{`  ╔═══╗
  ║ ~ ║
  ╠═╦═╣
  ║▓║▓║`}</pre>
            <div className="mb-1 text-base font-bold text-[#00d4ff]"
              style={{ textShadow: '0 0 6px rgba(0,212,255,0.2)' }}>
              CONVERTER
            </div>
            <div className="text-xs text-[#8a8a9a]">
              Custom LLC resonant topology.
            </div>
            <div className="mt-2 text-xs text-[#00d4ff]/50">────→</div>
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
            className="tech-card block border border-white/10 bg-[#12121a] px-5 py-5"
            style={{ '--glow': 'rgba(255,255,255,0.05)' } as React.CSSProperties}
          >
            <pre className="mb-3 text-[0.6rem] leading-[1.3] text-white/30">{`  ▁▂▃▅▆▇
  ▔▔▔▔▔▔
  46 kWh
  /kg H₂`}</pre>
            <div className="mb-1 text-base font-bold text-white/80">
              TESTING
            </div>
            <div className="text-xs text-[#8a8a9a]">
              46 kWh/kg measured. Beating stated 92%.
            </div>
            <div className="mt-2 text-xs text-white/30">────→</div>
          </Link>
        </div>

        {/* ═══ STATS ROW ═══ */}
        <div className="mb-6 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-center">
          <span className="text-2xl font-bold text-[#00ff88]" style={{ textShadow: '0 0 8px rgba(0,255,136,0.25)' }}>
            {'>'}92% EFFICIENCY
          </span>
          <span className="text-lg text-[#3a3a4a]">·</span>
          <span className="text-2xl font-bold text-[#00d4ff]" style={{ textShadow: '0 0 8px rgba(0,212,255,0.25)' }}>
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
        <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#00d4ff] glow-cyan">
          ┌─── TOBE vs CONVENTIONAL ───┐
        </div>

        <div className="overflow-hidden border border-white/5 bg-[#12121a]">
          <div className="grid grid-cols-3 border-b border-white/10 bg-[#0e0e16]">
            <div className="px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#6a6a7a]">METRIC</div>
            <div className="border-l border-white/5 px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#ff4444]/60">CONVENTIONAL</div>
            <div className="border-l border-white/5 px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#00ff88]">TOBE ENERGY</div>
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
              <div className="border-l border-white/5 px-5 py-3 text-sm font-bold text-[#00ff88]"
                style={{ textShadow: '0 0 6px rgba(0,255,136,0.2)' }}>{tobe}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="h-16" />
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
