'use client';
import { AutoplayVideo } from '@/components/AutoplayVideo';

import { useEffect } from 'react';
import Link from 'next/link';

function useAutoplayVideos() {
  useEffect(() => {
    const play = () => document.querySelectorAll('video[autoplay]').forEach((v) => { const vid = v as HTMLVideoElement; vid.muted = true; vid.play().catch(() => {}); });
    play();
    window.addEventListener('scroll', play, { once: true });
    return () => window.removeEventListener('scroll', play);
  }, []);
}

function SectionDivider() {
  return (
    <div className="my-4 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
      <span className="font-mono text-xs tracking-[0.3em] text-[#ff6b35]/30"
        style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}>═══════</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
    </div>
  );
}

export default function PowerConverterPage() {
  useAutoplayVideos();

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── TECHNOLOGY / POWER CONVERTER ───┐
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
            Custom Power Electronics
          </h1>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#ff6b35] md:text-3xl"
            style={{ textShadow: '0 0 12px rgba(255,107,53,0.3)' }}>
            We control every waveform. That&apos;s why we win.
          </h2>
          <p className="max-w-3xl font-sans text-lg leading-relaxed text-white/60">
            No other electrolyzer company even reports their converter efficiency
            — they use off-the-shelf rectifiers and bolt them on. We designed the
            entire power path from scratch. High voltage for ionization, in lieu
            of caustic electrolyte that is hard to handle and complex to dispose
            of. The waveform parameters ARE the efficiency.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* ═══ PCB HERO — DESIGN + FINISHED SIDE BY SIDE ═══ */}
        <section className="py-6">
          <div className="grid gap-4 sm:grid-cols-2" style={{ height: '450px' }}>
            {/* Left — Schematic (rotated 90°) */}
            <div className="overflow-hidden rounded border border-white/10 bg-[#12121a] flex flex-col">
              <div className="flex-1 overflow-hidden flex items-center justify-center bg-[#0a0a0f]">
                <img src="/media/manufacturing/pcb.png" alt="PCB schematic layout" className="w-full h-full object-contain p-4" />
              </div>
              <div className="px-4 py-3">
                <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">BOARD DESIGN — KiCad</p>
                <p className="mt-1 text-xs text-white/40">Current sensing (LA55-P), precision op-amps (OPA277P), TOBE.ENERGY branded.</p>
              </div>
            </div>
            {/* Right — Finished boards (cropped tighter) */}
            <div className="overflow-hidden rounded border border-white/10 bg-[#12121a] flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img src="/media/manufacturing/pcb-mfg-12.jpg" alt="Finished PCB boards" className="w-full h-full object-cover" style={{ objectPosition: 'center 45%' }} />
              </div>
              <div className="px-4 py-3">
                <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">FINISHED BOARDS</p>
                <p className="mt-1 text-xs text-white/40">From schematic to finished product — designed, etched, populated, and tested in-house.</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ WHY CUSTOM ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── WHY CUSTOM POWER ELECTRONICS ───┐
          </div>

          <h2 className="mb-6 text-2xl font-bold text-white">
            The converter IS the competitive advantage.
          </h2>

          <div className="mb-8 max-w-3xl border-l-2 border-[#ff6b35]/50 pl-5 font-sans text-[0.95rem] leading-relaxed text-white/70">
            The industry uses commodity rectifiers because they don&apos;t
            understand power conversion as a competitive lever. We do. Our
            converter efficiency directly determines our hydrogen production
            cost — every percentage point matters.
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Dynamic Waveform Control',
                description: 'Direct Digital Synthesis generates the optimized waveform profile, dynamically adjusting frequency and duty cycle in real-time to maximize efficiency across varying water quality and contaminant concentrations.',
                accent: '#ff6b35',
              },
              {
                title: 'Purpose-Built Transformers',
                description: 'In-house wound transformers optimized for our operating point. Potted in epoxy for environmental protection and tested to several times their rated operating voltage. Designed, wound, and validated entirely in-house.',
                accent: '#ff6b35',
              },
              {
                title: 'SiC Power Stage',
                description: 'Silicon carbide MOSFETs in a high-voltage switching configuration with isolated gate drivers. Lower switching losses and higher frequency capability than silicon — critical for maintaining efficiency at the voltages we operate at.',
                accent: '#ff6b35',
              },
            ].map((a) => (
              <div key={a.title} className="border-l-[3px] bg-[#12121a] px-6 py-6 transition-all hover:bg-[#14141e]"
                style={{
                  borderLeftColor: a.accent,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                <h3 className="mb-2 text-base font-bold text-white">{a.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-[#9a9aaa]">{a.description}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ═══ POWER ELECTRONICS MANUFACTURING ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── POWER ELECTRONICS MANUFACTURING ───┐
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { src: 'pcb-mfg-11-stable.mp4', caption: 'CNC Trace Isolation', type: 'video' as const },
              { src: 'pcb-mfg-9-still.jpg', caption: 'UV Solder Mask Curing', type: 'image' as const },
              { src: 'pcb-mfg-7-stable.mp4', caption: 'Solder Mask Removal', type: 'video' as const },
              { src: 'transformer-winding.mp4', caption: 'Transformer Winding', type: 'video' as const },
            ].map((v) => (
              <div key={v.caption} className="overflow-hidden rounded border border-white/10 bg-[#12121a]">
                {v.type === 'image' ? (
                  <img src={`/media/manufacturing/${v.src}`} alt={v.caption} className="w-full aspect-video object-cover" />
                ) : (
                  <AutoplayVideo className="w-full aspect-video object-cover" src={`/media/manufacturing/${v.src}`} poster={`/media/manufacturing/${v.src!.replace(".mp4", "-poster.jpg")}`} />
                )}
                <div className="px-4 py-3">
                  <div className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">{v.caption.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>


        </section>

        <SectionDivider />

        {/* ═══ ARCHITECTURE ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── TWO-STAGE ARCHITECTURE ───┐
          </div>

          <div className="mb-8 max-w-3xl font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
            <p className="mb-4">
              The power converter uses a two-stage architecture purpose-built for
              capacitive electrolysis:
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Stage 1 */}
            <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-7"
              style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
              <div className="mb-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">STAGE 1</div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Resonant Power Conversion
              </h3>
              <p className="mb-4 font-sans text-sm leading-relaxed text-[#9a9aaa]">
                Converts AC mains to an isolated high-voltage DC bus using a combination of LLC resonant and dual active bridge topologies, selected and combined based on the target voltage and power requirements. Soft switching across the full load range minimizes switching losses.
              </p>
              <div className="flex gap-4">
                <div>
                  <div className="text-lg font-bold text-[#ff6b35]" style={{ textShadow: '0 0 6px rgba(255,107,53,0.25)' }}>~100 kHz</div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-[#8a8a9a]">SWITCHING FREQ</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#ff6b35]" style={{ textShadow: '0 0 6px rgba(255,107,53,0.25)' }}>480VAC</div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-[#8a8a9a]">INPUT</div>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-7"
              style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
              <div className="mb-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">STAGE 2</div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Pulsed Waveform Generator
              </h3>
              <p className="mb-4 font-sans text-sm leading-relaxed text-[#9a9aaa]">
                A high-voltage switching stage delivers precisely shaped pulsed DC to the capacitive cell. Frequency and duty cycle are dynamically adjusted in real-time to maximize efficiency as the system responds to varying water quality, contaminant concentrations, and operating conditions.
              </p>
              <div className="flex gap-4">
                <div>
                  <div className="text-lg font-bold text-[#ff6b35]" style={{ textShadow: '0 0 6px rgba(255,107,53,0.25)' }}>10–250 kHz</div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-[#8a8a9a]">PULSE RANGE</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#ff6b35]" style={{ textShadow: '0 0 6px rgba(255,107,53,0.25)' }}>≥3 kV</div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-[#8a8a9a]">OUTPUT</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        

        {/* ═══ VERTICAL INTEGRATION ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── VERTICAL INTEGRATION ───┐
          </div>

          <h2 className="mb-6 text-2xl font-bold text-white">
            Full-stack control. Waveform to hydrogen.
          </h2>

          <div className="mb-8 max-w-3xl font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
            <p>
              We don&apos;t just assemble components — we design the PCBs in
              KiCad, wind the transformers by hand, machine the cell bodies on
              our CNC, and write the firmware that ties it all together. This
              level of vertical integration means we can iterate on the entire
              system in days, not months.
            </p>
          </div>

          {/* Signal chain */}
          <div className="overflow-hidden border border-white/5 bg-[#12121a]">
            <div className="border-b border-white/10 bg-[#0e0e16] px-5 py-3 text-[0.7rem] tracking-[0.15em] text-[#8a8a9a]">
              SIGNAL CHAINS: AC MAINS + SOLAR INTEGRATION
            </div>
            <div className="grid md:grid-cols-2">
            <div>
            <div className="border-b border-white/10 bg-[#0e0e16] px-5 py-2 text-[0.65rem] tracking-[0.1em] text-[#ff6b35]">AC MAINS PATH</div>
            {[
              { step: '01', name: '480VAC 3-Phase Input', detail: 'Utility grid connection', color: '#8a8a9a' },
              { step: '02', name: 'Resonant Power Conversion', detail: 'Soft-switched AC/DC conversion, ~100 kHz', color: '#ff6b35' },
              { step: '03', name: 'Isolated HV DC Bus', detail: 'High-voltage intermediate rail', color: '#8a8a9a' },
              { step: '04', name: 'Waveform Controller', detail: 'DDS synthesis, dynamic real-time tuning', color: '#ff6b35' },
              { step: '05', name: 'SiC Half-Bridge Output', detail: 'Pulsed DC delivery to cell, 10–250 kHz', color: '#ff6b35' },
              { step: '06', name: 'Purpose-Built Transformer', detail: 'Epoxy-potted, rated for several times operating voltage', color: '#ff6b35' },
              { step: '07', name: 'Capacitive Electrolysis Cell', detail: 'H₂O → H₂ + O₂ at 27°C, >92% HHV', color: '#ff6b35' },
              { step: '08', name: 'Gas Separation & Purification', detail: 'DeOx + mole sieve dryer → ≥99.99% H₂', color: '#ff6b35' },
            ].map((s, i) => (
              <div key={s.step} className={`flex items-center gap-4 px-5 py-3 ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'}`}>
                <span className="w-8 text-center text-sm font-bold" style={{ color: s.color, textShadow: `0 0 6px ${s.color}30` }}>
                  {s.step}
                </span>
                <div className="text-xs text-[#3a3a4a]">→</div>
                <div>
                  <div className="text-sm font-bold text-white/80">{s.name}</div>
                  <div className="text-xs text-[#8a8a9a]">{s.detail}</div>
                </div>
              </div>
            ))}
            </div>
            <div>
              <div className="border-b border-white/10 bg-[#0e0e16] px-5 py-2 text-[0.65rem] tracking-[0.1em] text-[#ff6b35]">SOLAR INTEGRATION PATH</div>
              {[
                { step: '01', name: '1500V DC Solar Bus', detail: 'Standard utility-scale solar string voltage', color: '#ff6b35' },
                { step: '02', name: 'High-Voltage DC Switching', detail: 'Direct DC-DC conversion, no AC intermediate', color: '#ff6b35' },
                { step: '03', name: 'Isolated HV DC Bus', detail: 'Matched to electrolyzer operating point', color: '#8a8a9a' },
                { step: '04', name: 'Waveform Controller', detail: 'DDS synthesis, dynamic real-time tuning', color: '#ff6b35' },
                { step: '05', name: 'SiC Switching Stage', detail: 'Pulsed DC delivery to cell', color: '#ff6b35' },
                { step: '06', name: 'Purpose-Built Transformer', detail: 'Epoxy-potted, voltage step-up', color: '#ff6b35' },
                { step: '07', name: 'Capacitive Electrolysis Cell', detail: 'H₂O → H₂ + O₂ at 27°C, >92% HHV', color: '#ff6b35' },
                { step: '08', name: 'Gas Separation & Purification', detail: 'DeOx + mole sieve dryer → ≥99.99% H₂', color: '#ff6b35' },
              ].map((s, i) => (
                <div key={`solar-${s.step}`} className={`flex items-center gap-4 px-5 py-3 ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0f0f17]'}`}>
                  <span className="w-8 text-center text-sm font-bold" style={{ color: s.color, textShadow: `0 0 6px ${s.color}30` }}>
                    {s.step}
                  </span>
                  <div className="text-xs text-[#3a3a4a]">→</div>
                  <div>
                    <div className="text-sm font-bold text-white/80">{s.name}</div>
                    <div className="text-xs text-[#8a8a9a]">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ NAVIGATE ═══ */}
        <section className="py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/technology/cell"
              className="group border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-6 transition-all hover:bg-[#14141e]"
              style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
              <h3 className="mb-2 text-lg font-bold text-white">← Electrolysis Cell</h3>
              <p className="font-sans text-sm text-[#8a8a9a]">
                Capacitive cell design, materials, operating conditions, and performance specs.
              </p>
            </Link>
            <Link href="/technology/controls"
              className="group border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-6 transition-all hover:bg-[#14141e]"
              style={{ borderTop: '1px solid rgba(255,107,53,0.08)', borderRight: '1px solid rgba(255,107,53,0.08)', borderBottom: '1px solid rgba(255,107,53,0.08)' }}>
              <h3 className="mb-2 text-lg font-bold text-white">Controls & AI →</h3>
              <p className="font-sans text-sm text-[#8a8a9a]">
                See how we monitor, optimize, and predict across 100+ cloud variables
              </p>
            </Link>
          </div>
        </section>
      </div>

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
