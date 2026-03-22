'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── TYPES ──────────────────────────────────────────────────────
type Tab = 'process' | 'power' | 'safety' | 'water' | 'environmental';

interface SensorReading {
  label: string;
  unit: string;
  min: number;
  max: number;
  phase: number;
  decimals?: number;
}

// ─── ANIMATED VALUE HOOK ────────────────────────────────────────
function useAnimatedValue(min: number, max: number, phase: number, speed = 0.0005) {
  const [value, setValue] = useState(min + (max - min) * 0.5);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      const t = Date.now() * speed + phase;
      const normalized = (Math.sin(t) + 1) / 2;
      // Add subtle noise
      const noise = Math.sin(t * 7.3) * 0.03 + Math.sin(t * 13.1) * 0.02;
      const clamped = Math.max(0, Math.min(1, normalized + noise));
      setValue(min + (max - min) * clamped);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [min, max, phase, speed]);
  return value;
}

// ─── CLOCK HOOK ─────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toISOString().slice(11, 23));
    };
    tick();
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── BLINKING CURSOR ────────────────────────────────────────────
function Cursor() {
  return <span className="animate-blink text-[#ff6b35]">_</span>;
}

// ─── TERMINAL READOUT ───────────────────────────────────────────
function TerminalReadout({ label, value, unit, color = '#ff6b35', decimals = 1 }: {
  label: string; value: number; unit: string; color?: string; decimals?: number;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/5 py-2 font-mono text-sm">
      <span className="text-white/60 uppercase tracking-wider">{label}</span>
      <span className="flex items-baseline gap-1.5">
        <span style={{ color, textShadow: `0 0 8px ${color}40` }} className="text-base font-bold tabular-nums">
          {value.toFixed(decimals)}
        </span>
        <span className="text-white/40">{unit}</span>
        <Cursor />
      </span>
    </div>
  );
}

// ─── PROGRESS BAR ───────────────────────────────────────────────
function TerminalBar({ label, value, max, unit, color = '#ff6b35' }: {
  label: string; value: number; max: number; unit: string; color?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const filled = Math.round(pct / 5);
  const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
  return (
    <div className="font-mono text-sm py-1.5">
      <div className="flex justify-between text-white/60 mb-1">
        <span className="uppercase tracking-wider">{label}</span>
        <span className="font-bold">{value.toFixed(1)} {unit}</span>
      </div>
      <div style={{ color }} className="tracking-[2px]">{bar} <span className="text-white/40">{Math.round(pct)}%</span></div>
    </div>
  );
}

// ─── GAUGE COMPONENT ────────────────────────────────────────────
function Gauge({ label, value, max, unit, safeMin, safeMax, color = '#ff6b35', size = 120 }: {
  label: string; value: number; max: number; unit: string;
  safeMin?: number; safeMax?: number; color?: string; size?: number;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const isSafe = (safeMin === undefined || value >= safeMin) && (safeMax === undefined || value <= safeMax);
  const gaugeColor = isSafe ? color : '#ff3333';
  const r = Math.round(size * 0.38);
  const cx = Math.round(size / 2);
  const cy = Math.round(size / 2 + 5);
  const startAngle = -220;
  const endAngle = 40;
  const angle = startAngle + (endAngle - startAngle) * pct;
  const toRad = (d: number) => (d * Math.PI) / 180;

  const arcPath = (start: number, end: number) => {
    const x1 = Math.round(cx + r * Math.cos(toRad(start)));
    const y1 = Math.round(cy + r * Math.sin(toRad(start)));
    const x2 = Math.round(cx + r * Math.cos(toRad(end)));
    const y2 = Math.round(cy + r * Math.sin(toRad(end)));
    const large = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const needleX = Math.round(cx + (r - 8) * Math.cos(toRad(angle)));
  const needleY = Math.round(cy + (r - 8) * Math.sin(toRad(angle)));

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={Math.round(size * 0.75)} viewBox={`0 0 ${size} ${Math.round(size * 0.75)}`}>
        {/* Track */}
        <path d={arcPath(startAngle, endAngle)} fill="none" stroke="white" strokeOpacity={0.1} strokeWidth={3} />
        {/* Value arc */}
        <path d={arcPath(startAngle, angle)} fill="none" stroke={gaugeColor} strokeWidth={3}
          style={{ filter: `drop-shadow(0 0 4px ${gaugeColor})` }} />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke={gaugeColor} strokeWidth={1.5}
          style={{ filter: `drop-shadow(0 0 3px ${gaugeColor})` }} />
        <circle cx={cx} cy={cy} r={3} fill={gaugeColor} />
        {/* Value text */}
        <text x={cx} y={cy - 12} textAnchor="middle" fill={gaugeColor} fontSize={16} fontFamily="monospace" fontWeight="bold">
          {value.toFixed(1)}
        </text>
        <text x={cx} y={cy + 2} textAnchor="middle" fill="white" fillOpacity={0.5} fontSize={10} fontFamily="monospace">
          {unit}
        </text>
      </svg>
      <span className="font-mono text-sm text-white/60 uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

// ─── OSCILLOSCOPE ───────────────────────────────────────────────
function Oscilloscope({ frequency }: { frequency: number; waveform: string }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setOffset(Date.now() * 0.003);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const w = 400;
  const h = 100;
  // High-voltage pulses with frequency sweep — sharp rising/falling edges
  const pulseWidth = 0.6; // 60% duty cycle
  const points: string[] = [];
  // Slowly vary the period to show frequency sweep
  const sweepFactor = 1 + 0.3 * Math.sin(offset * 0.05);
  const period = (w / 8) * sweepFactor;
  for (let x = 0; x < w; x += 1) {
    const phase = ((x + offset * 15) % period) / period;
    // Sharp square pulse with slight ringing on edges
    let y: number;
    if (phase < 0.02) {
      // Rising edge
      y = 85 - (85 - 15) * (phase / 0.02);
    } else if (phase < pulseWidth) {
      // High state with tiny ripple
      y = 15 + 2 * Math.sin(x * 0.8);
    } else if (phase < pulseWidth + 0.02) {
      // Falling edge
      const fallPhase = (phase - pulseWidth) / 0.02;
      y = 15 + (85 - 15) * fallPhase;
    } else {
      // Low state
      y = 85 - 1 * Math.sin(x * 0.5);
    }
    points.push(`${x},${Math.round(Math.max(5, Math.min(95, y)))}`);
  }

  return (
    <div className="rounded border border-white/10 bg-black/40 p-3">
      <div className="flex items-center justify-between mb-2 font-mono text-xs text-white/50">
        <span>OSCILLOSCOPE // CH1</span>
        <span>{(frequency / 1000).toFixed(1)} kHz // HV PULSE</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
        {/* Grid */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1={0} y1={y} x2={w} y2={y} stroke="white" strokeOpacity={0.05} />
        ))}
        {Array.from({ length: 9 }, (_, i) => Math.round((i + 1) * (w / 10))).map(x => (
          <line key={x} x1={x} y1={0} x2={x} y2={h} stroke="white" strokeOpacity={0.05} />
        ))}
        {/* Center line */}
        <line x1={0} y1={50} x2={w} y2={50} stroke="#ff6b35" strokeOpacity={0.2} strokeDasharray="4,4" />
        {/* Waveform */}
        <polyline points={points.join(' ')} fill="none" stroke="#ff6b35" strokeWidth={1.5}
          style={{ filter: 'drop-shadow(0 0 4px #ff6b35)' }} />
      </svg>
    </div>
  );
}

// ─── STATUS BADGE ───────────────────────────────────────────────
function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="inline-flex items-center gap-2 rounded border px-3 py-1.5 font-mono text-sm"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}10`, color }}
    >
      <span style={{ textShadow: `0 0 8px ${color}` }}>●</span>
      <span className="uppercase tracking-widest">{status}</span>
    </motion.div>
  );
}

// ─── SECTION FRAME ──────────────────────────────────────────────
function SectionFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.02] p-5">
      <div className="font-mono text-sm text-[#ff6b35] tracking-widest uppercase mb-3 flex items-center gap-2">
        <span className="text-white/40">├──</span> {title}
      </div>
      {children}
    </div>
  );
}

// ─── SPINNING FAN ───────────────────────────────────────────────
function SpinningFan({ pwm }: { pwm: number }) {
  const speed = Math.max(0.2, 2 - (pwm / 100) * 1.8);
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      className="inline-block text-lg"
      style={{ color: '#ff6b35' }}
    >
      ⟳
    </motion.span>
  );
}

// ─── ASCII HEADERS ──────────────────────────────────────────────
// Block letter ASCII art — rendered without box borders to avoid clipping
const ASCII_HEADERS: Record<Tab, { art: string; sub: string }> = {
  process: {
    art: `██████╗ ██████╗  ██████╗  ██████╗███████╗███████╗███████╗
██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝██╔════╝
██████╔╝██████╔╝██║   ██║██║     █████╗  ███████╗███████╗
██╔═══╝ ██╔══██╗██║   ██║██║     ██╔══╝  ╚════██║╚════██║
██║     ██║  ██║╚██████╔╝╚██████╗███████╗███████║███████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚══════╝╚══════╝╚══════╝`,
    sub: 'ELECTROLYZER PROCESS CONTROL // 8 MODBUS SLAVES',
  },
  power: {
    art: `██████╗  ██████╗ ██╗    ██╗███████╗██████╗
██╔══██╗██╔═══██╗██║    ██║██╔════╝██╔══██╗
██████╔╝██║   ██║██║ █╗ ██║█████╗  ██████╔╝
██╔═══╝ ██║   ██║██║███╗██║██╔══╝  ██╔══██╗
██║     ╚██████╔╝╚███╔███╔╝███████╗██║  ██║
╚═╝      ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝`,
    sub: 'DDS + GATE GENERATOR // PULSE WAVEFORM CONTROL',
  },
  safety: {
    art: `███████╗ █████╗ ███████╗███████╗████████╗██╗   ██╗
██╔════╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝
███████╗███████║█████╗  █████╗     ██║    ╚████╔╝
╚════██║██╔══██║██╔══╝  ██╔══╝     ██║     ╚██╔╝
███████║██║  ██║██║     ███████╗   ██║      ██║
╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝   ╚═╝      ╚═╝`,
    sub: 'DUAL-REDUNDANT GAS DETECTION // H₂ + O₂',
  },
  water: {
    art: `██╗    ██╗ █████╗ ████████╗███████╗██████╗
██║    ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
██║ █╗ ██║███████║   ██║   █████╗  ██████╔╝
██║███╗██║██╔══██║   ██║   ██╔══╝  ██╔══██╗
╚███╔███╔╝██║  ██║   ██║   ███████╗██║  ██║
 ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`,
    sub: 'FILTRATION SYSTEM // ATLAS EZO I2C + HALL FLOW',
  },
  environmental: {
    art: `███████╗███╗   ██╗██╗   ██╗██╗██████╗  ██████╗
██╔════╝████╗  ██║██║   ██║██║██╔══██╗██╔═══██╗
█████╗  ██╔██╗ ██║██║   ██║██║██████╔╝██║   ██║
██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██║██╔══██╗██║   ██║
███████╗██║ ╚████║ ╚████╔╝ ██║██║  ██║╚██████╔╝
╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚═╝  ╚═╝ ╚═════╝`,
    sub: 'ENVIRONMENTAL MONITORING // O₂ + RH + PRESSURE',
  },
};

// ─── TAB CONFIG ─────────────────────────────────────────────────
const TABS: { key: Tab; label: string; shortLabel: string }[] = [
  { key: 'process', label: 'PROCESS CONTROL', shortLabel: 'PROCESS' },
  { key: 'power', label: 'POWER ELECTRONICS', shortLabel: 'POWER' },
  { key: 'safety', label: 'SAFETY SYSTEMS', shortLabel: 'SAFETY' },
  { key: 'water', label: 'WATER QUALITY', shortLabel: 'WATER' },
  { key: 'environmental', label: 'ENVIRONMENTAL', shortLabel: 'ENVIRO' },
];

// ═══════════════════════════════════════════════════════════════
// SCREEN 1: PROCESS CONTROL
// ═══════════════════════════════════════════════════════════════
function ProcessControl() {
  const p_kpa = useAnimatedValue(101, 104, 0);
  const p_psi = useAnimatedValue(14.6, 15.1, 0.5);
  const t2_c = useAnimatedValue(26, 29, 1.2);
  const noise = useAnimatedValue(48, 54, 2.1);
  const ec = useAnimatedValue(220, 260, 3.3);
  const ph = useAnimatedValue(7.0, 7.2, 4.0);
  const phTemp = useAnimatedValue(26.5, 27.5, 4.5);
  const doMgl = useAnimatedValue(7.5, 8.2, 5.1);
  const doPct = useAnimatedValue(88, 95, 5.5);
  const doTemp = useAnimatedValue(26.8, 27.4, 5.8);
  const o3 = useAnimatedValue(0.02, 0.04, 6.2);
  const flow = useAnimatedValue(2.8, 3.4, 7.0);
  const flowTemp = useAnimatedValue(26.5, 27.5, 7.3);
  const total = useAnimatedValue(1280, 1310, 7.8, 0.0001);
  const errTotal = useAnimatedValue(0, 3, 8.5, 0.0002);

  return (
    <div className="space-y-4">
      <div className="font-mono text-xs text-white/50 flex items-center gap-4">
        <span>RS-485 BUS</span>
        <span className="text-[#ff6b35]">● CONNECTED</span>
        <span>POLL CYCLE: 1.5s</span>
        <span>SLAVES: 8/8 ONLINE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SectionFrame title="PRESSURE">
          <TerminalReadout label="p_kpa" value={p_kpa} unit="kPa" color="#ff6b35" />
          <TerminalReadout label="p_psi" value={p_psi} unit="PSI" color="#ff6b35" />
          <div className="mt-2 font-mono text-xs text-white/40 flex items-center gap-2">
            <span className="text-[#ff6b35]">◆</span> TARE: ZEROED
          </div>
        </SectionFrame>

        <SectionFrame title="TEMPERATURE">
          <TerminalReadout label="t2_c" value={t2_c} unit="°C" color="#ff6b35" />
          <TerminalBar label="THERMAL" value={t2_c} max={60} unit="°C" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="NOISE LEVEL">
          <TerminalReadout label="noise_dba" value={noise} unit="dBA" color="#ff6b35" />
          <TerminalBar label="AMBIENT" value={noise} max={100} unit="dBA" />
        </SectionFrame>

        <SectionFrame title="CONDUCTIVITY">
          <TerminalReadout label="ec_uScm" value={ec} unit="µS/cm" color="#ff6b35" decimals={0} />
          <TerminalBar label="EC" value={ec} max={500} unit="µS/cm" />
        </SectionFrame>

        <SectionFrame title="pH">
          <TerminalReadout label="ph" value={ph} unit="pH" color="#ff6b35" decimals={2} />
          <TerminalReadout label="ph_tempC" value={phTemp} unit="°C" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="DISSOLVED OXYGEN">
          <TerminalReadout label="do_mgl" value={doMgl} unit="mg/L" color="#ff6b35" />
          <TerminalReadout label="do_pct" value={doPct} unit="%" color="#ff6b35" />
          <TerminalReadout label="do_tempC" value={doTemp} unit="°C" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="OZONE">
          <TerminalReadout label="o3_ppm" value={o3} unit="ppm" color="#ff6b35" decimals={3} />
          <TerminalBar label="O3 LEVEL" value={o3} max={0.1} unit="ppm" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="MASS FLOW">
          <TerminalReadout label="flow" value={flow} unit="L/min" color="#ff6b35" decimals={2} />
          <TerminalReadout label="flow_tempC" value={flowTemp} unit="°C" color="#ff6b35" />
          <TerminalReadout label="total" value={total} unit="L" color="#ff6b35" decimals={0} />
          <div className="mt-1 font-mono text-xs text-white/40">↑ CUMULATIVE TOTALIZER</div>
        </SectionFrame>

        <SectionFrame title="BUS HEALTH">
          <TerminalReadout label="err_total" value={Math.round(errTotal)} unit="errs" color={errTotal > 2 ? '#ff3333' : '#ff6b35'} decimals={0} />
          <div className="mt-2 font-mono text-xs text-[#00ff88]">
            STATUS: ALL_SENSORS_OK <Cursor />
          </div>
        </SectionFrame>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 2: POWER ELECTRONICS
// ═══════════════════════════════════════════════════════════════
function PowerElectronics() {
  const freq = useAnimatedValue(16000, 16800, 0, 0.0003);
  const onCount = useAnimatedValue(280, 320, 1.0);
  const offCount = useAnimatedValue(180, 210, 1.5);
  const dutyPct = useAnimatedValue(58, 62, 2.0);
  const actualDuty = useAnimatedValue(58, 62, 2.3);
  const thresholdV = useAnimatedValue(3.1, 3.3, 2.8);
  const rampStart = useAnimatedValue(100, 500, 3.0, 0.0001);
  const rampStop = useAnimatedValue(50000, 200000, 3.3, 0.0001);
  const rampDuration = useAnimatedValue(5, 30, 3.6, 0.0002);
  const curr0A = useAnimatedValue(1.8, 2.2, 4.0);
  const curr0V = useAnimatedValue(3100, 3300, 4.3);
  const curr1A = useAnimatedValue(1.6, 2.0, 4.6);
  const curr1V = useAnimatedValue(3050, 3250, 4.9);
  const tempC = useAnimatedValue(27, 29, 5.2);
  const fanPwm = useAnimatedValue(30, 85, 5.5);

  const [waveform] = useState<'triangle'>('triangle');
  useEffect(() => {
    // Triangle waveform fixed — generates square pulses through the system
    // Controls duty cycle via triangle modulation
    return () => {};
  }, []);

  return (
    <div className="space-y-4">
      <div className="font-mono text-xs text-white/50 flex items-center gap-4">
        <span>DDS + GATE GENERATOR</span>
        <span className="text-[#ff6b35]">● ACTIVE</span>
        <span>CURRENT SENSING: DUAL CH</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionFrame title="DDS FREQUENCY SYNTHESIZER">
          <TerminalReadout label="currentFrequencyHz" value={freq} unit="Hz" color="#ff6b35" decimals={1} />
          <div className="mt-2 font-mono text-xs text-white/50">
            RANGE: 0.1 Hz → 1 MHz
          </div>
          <div className="mt-1 font-mono text-xs">
            ddsWaveform: <span className="text-[#ff6b35]">{waveform.toUpperCase()}</span> <Cursor />
          </div>
        </SectionFrame>

        <SectionFrame title="GATE TIMING">
          <TerminalReadout label="onCount" value={onCount} unit="ticks" color="#ff6b35" decimals={0} />
          <TerminalReadout label="offCount" value={offCount} unit="ticks" color="#ff6b35" decimals={0} />
          <div className="mt-2 font-mono text-xs text-white/40">
            PULSE: {'▓'.repeat(Math.round(onCount / 50))}{'░'.repeat(Math.round(offCount / 50))}
          </div>
        </SectionFrame>

        <SectionFrame title="DUTY CYCLE">
          <TerminalReadout label="dutyPct" value={dutyPct} unit="%" color="#ff6b35" />
          <TerminalReadout label="actualDutyPct" value={actualDuty} unit="%" color="#ff6b35" />
          <TerminalReadout label="thresholdV" value={thresholdV} unit="V" color="#ff6b35" />
          <TerminalBar label="DUTY" value={dutyPct} max={100} unit="%" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="FREQUENCY SWEEP">
          <TerminalReadout label="rampStartHz" value={rampStart} unit="Hz" color="#ff6b35" decimals={0} />
          <TerminalReadout label="rampStopHz" value={rampStop} unit="Hz" color="#ff6b35" decimals={0} />
          <TerminalReadout label="rampDurationSec" value={rampDuration} unit="s" color="#ff6b35" />
          <div className="mt-2 font-mono text-xs text-white/40">
            rampLog: <span className="text-[#ff6b35]">LOGARITHMIC SWEEP</span>
          </div>
          <motion.div
            className="mt-1 h-1 rounded-full bg-[#ff6b35]"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: rampDuration, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 4px #ff6b35)' }}
          />
        </SectionFrame>

        <SectionFrame title="CURRENT SENSING">
          <div className="font-mono text-xs text-white/45 mb-1">── CHANNEL 0 ──</div>
          <TerminalReadout label="curr0_A" value={curr0A} unit="A" color="#ff6b35" decimals={2} />
          <TerminalReadout label="curr0_V" value={curr0V} unit="V" color="#ff6b35" />
          <div className="font-mono text-xs text-white/45 mt-2 mb-1">── CHANNEL 1 ──</div>
          <TerminalReadout label="curr1_A" value={curr1A} unit="A" color="#ff6b35" decimals={2} />
          <TerminalReadout label="curr1_V" value={curr1V} unit="V" color="#ff6b35" />
          <div className="mt-2 font-mono text-xs text-white/40">
            P_total: <span className="text-[#ff6b35]">{(curr0A * curr0V + curr1A * curr1V).toFixed(1)} W</span>
          </div>
        </SectionFrame>

        <SectionFrame title="THERMAL MANAGEMENT">
          <TerminalReadout label="temp_C" value={tempC} unit="°C" color={tempC > 55 ? '#ff3333' : '#ff6b35'} />
          <TerminalBar label="HEATSINK" value={tempC} max={85} unit="°C" color={tempC > 55 ? '#ff3333' : '#ff6b35'} />
          <div className="mt-2 flex items-center gap-2 font-mono text-xs">
            <span className="text-white/50">OVERTEMP LATCH:</span>
            <span className="text-[#ff6b35]">CLEAR</span>
          </div>
          <div className="mt-2 flex items-center gap-2 font-mono text-xs">
            <span className="text-white/50">fan_pwm_pct:</span>
            <span className="text-[#ff6b35]">{fanPwm.toFixed(0)}%</span>
            <SpinningFan pwm={fanPwm} />
          </div>
          <TerminalBar label="FAN" value={fanPwm} max={100} unit="%" color="#ff6b35" />
        </SectionFrame>
      </div>

      {/* Oscilloscope */}
      <Oscilloscope frequency={freq} waveform={waveform} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 3: SAFETY SYSTEMS
// ═══════════════════════════════════════════════════════════════
function SafetySystems() {
  const h2a = useAnimatedValue(0, 15, 0, 0.0003);
  const h2b = useAnimatedValue(0, 12, 0.5, 0.0003);
  const o2 = useAnimatedValue(20.5, 21.2, 1.0, 0.0004);
  const errsH2a = useAnimatedValue(0, 2, 2.0, 0.0001);
  const errsO2 = useAnimatedValue(0, 1, 2.5, 0.0001);
  const errsH2b = useAnimatedValue(0, 2, 3.0, 0.0001);
  const fcH2a = useAnimatedValue(3, 4, 3.5, 0.0001);
  const fcO2 = useAnimatedValue(3, 4, 4.0, 0.0001);
  const fcH2b = useAnimatedValue(3, 4, 4.5, 0.0001);

  return (
    <div className="space-y-4">
      {/* BIG STATUS INDICATOR */}
      <div className="flex flex-col items-center gap-3 py-6 rounded border border-[#ff6b35]/20 bg-[#ff6b35]/5">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-4xl font-bold text-[#ff6b35]"
          style={{ textShadow: '0 0 20px #ff6b3560, 0 0 40px #ff6b3530' }}
        >
          STATUS: SAFE
        </motion.div>
        <StatusBadge status="MONITORING" color="#ff6b35" />
        <div className="font-mono text-xs text-white/50">
          DUAL-REDUNDANT // CONTINUOUS // ADAPTIVE PROTOCOL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* H2 Sensor A */}
        <SectionFrame title="H2 SENSOR A (PRIMARY)">
          <div className="flex justify-center py-2">
            <Gauge label="h2a_ppm" value={h2a} max={200} unit="ppm" safeMax={50} color="#ff6b35" size={140} />
          </div>
          <TerminalReadout label="h2a_ppm" value={h2a} unit="ppm" color="#ff6b35" />
          <div className="mt-2 font-mono text-xs text-white/40">
            errs_h2a: <span className="text-white/40">{Math.round(errsH2a)}</span>
          </div>
          <div className="font-mono text-xs text-white/40">
            fc_h2a: <span className="text-[#ff6b35]">FC{Math.round(fcH2a)}</span> AUTO-LEARN
          </div>
        </SectionFrame>

        {/* H2 Sensor B */}
        <SectionFrame title="H2 SENSOR B (REDUNDANT)">
          <div className="flex justify-center py-2">
            <Gauge label="h2b_ppm" value={h2b} max={200} unit="ppm" safeMax={50} color="#ff6b35" size={140} />
          </div>
          <TerminalReadout label="h2b_ppm" value={h2b} unit="ppm" color="#ff6b35" />
          <div className="mt-2 font-mono text-xs text-white/40">
            errs_h2b: <span className="text-white/40">{Math.round(errsH2b)}</span>
          </div>
          <div className="font-mono text-xs text-white/40">
            fc_h2b: <span className="text-[#ff6b35]">FC{Math.round(fcH2b)}</span> AUTO-LEARN
          </div>
        </SectionFrame>

        {/* O2 */}
        <SectionFrame title="O2 MONITOR">
          <div className="flex justify-center py-2">
            <Gauge label="o2_pct" value={o2} max={25} unit="%" safeMin={19.5} safeMax={23.5} color="#ff6b35" size={140} />
          </div>
          <TerminalReadout label="o2_pct" value={o2} unit="%" color="#ff6b35" decimals={1} />
          <div className="mt-2 font-mono text-xs text-white/40">
            errs_o2: <span className="text-white/40">{Math.round(errsO2)}</span>
          </div>
          <div className="font-mono text-xs text-white/40">
            fc_o2: <span className="text-[#ff6b35]">FC{Math.round(fcO2)}</span> AUTO-LEARN
          </div>
          <div className="mt-1 font-mono text-xs text-[#00ff88]">
            NOMINAL: 20.9% <Cursor />
          </div>
        </SectionFrame>
      </div>

      <SectionFrame title="SYSTEM STATUS">
        <div className="font-mono text-xs text-[#00ff88]">
          status_txt: <span className="text-white/60">ALL_CLEAR // NO_ALARMS // SENSORS_NOMINAL</span> <Cursor />
        </div>
        <div className="mt-2 font-mono text-xs text-white/40">
          ADAPTIVE PROTOCOL: FC3 (holding register) / FC4 (input register) — auto-selects per slave capability
        </div>
      </SectionFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 4: WATER QUALITY
// ═══════════════════════════════════════════════════════════════
function WaterQuality() {
  const flowLpm = useAnimatedValue(2.0, 8.5, 0);
  const totalLiters = useAnimatedValue(4500, 4650, 0.3, 0.0001);
  const tcC = useAnimatedValue(18, 28, 1.0);
  const pressurePsi = useAnimatedValue(25, 55, 1.5);
  const pH = useAnimatedValue(6.9, 7.6, 2.0);
  const orp = useAnimatedValue(200, 450, 2.5);
  const doMgL = useAnimatedValue(6.0, 9.0, 3.0);
  const doPct = useAnimatedValue(72, 105, 3.3);
  const ec = useAnimatedValue(100, 400, 4.0);
  const tds = useAnimatedValue(50, 200, 4.3);
  const sal = useAnimatedValue(0.05, 0.25, 4.6);
  const sg = useAnimatedValue(0.998, 1.002, 4.9, 0.0003);

  return (
    <div className="space-y-4">
      <div className="font-mono text-xs text-white/50 flex flex-wrap items-center gap-4">
        <span>ATLAS EZO I2C BUS</span>
        <span className="text-[#00ff88]">● ALL SENSORS OK</span>
        <span>PT100 RTD (MAX31865)</span>
        <span>4-20mA PRESSURE</span>
        <span>HALL EFFECT FLOW</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SectionFrame title="FLOW (HALL EFFECT)">
          <TerminalReadout label="flowLpm" value={flowLpm} unit="L/min" color="#ff6b35" decimals={2} />
          <TerminalReadout label="totalLiters" value={totalLiters} unit="L" color="#ff6b35" decimals={0} />
          <TerminalBar label="FLOW RATE" value={flowLpm} max={10} unit="L/min" color="#ff6b35" />
          <div className="mt-1 font-mono text-xs text-white/40">
            EMA SMOOTHING: <span className="text-[#ff6b35]">α = 0.15</span>
          </div>
        </SectionFrame>

        <SectionFrame title="TEMPERATURE (PT100 RTD)">
          <TerminalReadout label="tcC" value={tcC} unit="°C" color="#ff6b35" decimals={2} />
          <TerminalBar label="TEMP" value={tcC} max={50} unit="°C" color="#ff6b35" />
          <div className="mt-1 font-mono text-xs text-white/40">
            VIA MAX31865 // 3-WIRE
          </div>
        </SectionFrame>

        <SectionFrame title="PRESSURE (4-20mA)">
          <TerminalReadout label="pressurePsi" value={pressurePsi} unit="PSI" color="#ff6b35" />
          <TerminalBar label="LINE PRESSURE" value={pressurePsi} max={80} unit="PSI" />
          <div className="mt-1 font-mono text-xs text-white/40">
            TRANSDUCER: 0-100 PSI
          </div>
        </SectionFrame>

        <SectionFrame title="pH (ATLAS EZO)">
          <div className="flex justify-center py-2">
            <Gauge label="pH" value={pH} max={14} unit="pH" safeMin={6.5} safeMax={8.5} color="#ff6b35" />
          </div>
          <TerminalReadout label="pH" value={pH} unit="pH" color="#ff6b35" decimals={2} />
        </SectionFrame>

        <SectionFrame title="ORP (ATLAS EZO)">
          <TerminalReadout label="orp_mV" value={orp} unit="mV" color="#ff6b35" decimals={0} />
          <TerminalBar label="ORP" value={orp} max={600} unit="mV" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="DISSOLVED OXYGEN">
          <TerminalReadout label="do_mgL" value={doMgL} unit="mg/L" color="#ff6b35" />
          <TerminalReadout label="do_pct" value={doPct} unit="%" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="CONDUCTIVITY">
          <TerminalReadout label="ec_uScm" value={ec} unit="µS/cm" color="#ff6b35" decimals={0} />
          <TerminalReadout label="tds_ppm" value={tds} unit="ppm" color="#ff6b35" decimals={0} />
          <TerminalReadout label="sal_psu" value={sal} unit="PSU" color="#ff6b35" decimals={3} />
          <TerminalReadout label="sg" value={sg} unit="" color="#ff6b35" decimals={4} />
        </SectionFrame>
      </div>

      <SectionFrame title="SENSOR STATUS">
        <div className="font-mono text-xs text-[#00ff88]">
          sensor_ok: <span className="text-white/60">TRUE // ALL EZO CIRCUITS RESPONDING</span> <Cursor />
        </div>
      </SectionFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCREEN 5: ENVIRONMENTAL
// ═══════════════════════════════════════════════════════════════
function Environmental() {
  const o2 = useAnimatedValue(20.6, 21.1, 0, 0.0004);
  const rh = useAnimatedValue(35, 65, 1.0);
  const o2Sample = useAnimatedValue(1.8, 2.2, 2.0, 0.0002);
  const rhSample = useAnimatedValue(0.9, 1.1, 2.5, 0.0002);

  return (
    <div className="space-y-4">
      <div className="font-mono text-xs text-white/50 flex items-center gap-4">
        <span>AMBIENT MONITORING</span>
        <span className="text-[#ff6b35]">● ACTIVE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionFrame title="OXYGEN">
          <div className="flex justify-center py-4">
            <Gauge label="o2_pct" value={o2} max={25} unit="%" safeMin={19.5} safeMax={23.5} color="#ff6b35" size={160} />
          </div>
          <TerminalReadout label="o2_pct" value={o2} unit="%" color="#ff6b35" decimals={1} />
          <TerminalBar label="O2 LEVEL" value={o2} max={25} unit="%" color="#ff6b35" />
          <div className="mt-2 font-mono text-xs text-white/40">
            o2SampleSec: <span className="text-[#ff6b35]">{o2Sample.toFixed(1)}s</span>
          </div>
          <div className="font-mono text-xs text-[#00ff88]">NOMINAL: 20.9%</div>
        </SectionFrame>

        <SectionFrame title="HUMIDITY">
          <div className="flex justify-center py-4">
            <Gauge label="rh_pct" value={rh} max={100} unit="%" safeMin={20} safeMax={80} color="#ff6b35" size={160} />
          </div>
          <TerminalReadout label="rh_pct" value={rh} unit="%" color="#ff6b35" />
          <TerminalBar label="RELATIVE HUMIDITY" value={rh} max={100} unit="%" color="#ff6b35" />
          <div className="mt-2 font-mono text-xs text-white/40">
            rhSampleSec: <span className="text-[#ff6b35]">{rhSample.toFixed(1)}s</span>
          </div>
        </SectionFrame>
      </div>

      <SectionFrame title="ENVIRONMENT STATUS">
        <div className="font-mono text-xs text-[#00ff88]">
          ALL PARAMETERS WITHIN SAFE OPERATING ENVELOPE <Cursor />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs">
          <div className="text-white/50">O2 ALARM THRESHOLD: <span className="text-[#ff3333]">&lt;19.5%</span></div>
          <div className="text-white/50">RH ALARM THRESHOLD: <span className="text-[#ff3333]">&gt;80%</span></div>
        </div>
      </SectionFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
function useAutoplayVideos() {
  useEffect(() => {
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach((v) => { const video = v as HTMLVideoElement; video.muted = true; video.play().catch(() => {}); });
    const handleScroll = () => { document.querySelectorAll('video[autoplay]').forEach((v) => { const video = v as HTMLVideoElement; if (video.paused) video.play().catch(() => {}); }); };
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

export default function HMIPage() {
  useAutoplayVideos();
  const [activeTab, setActiveTab] = useState<Tab>('process');
  const clock = useClock();

  const renderScreen = useCallback(() => {
    switch (activeTab) {
      case 'process': return <ProcessControl />;
      case 'power': return <PowerElectronics />;
      case 'safety': return <SafetySystems />;
      case 'water': return <WaterQuality />;
      case 'environmental': return <Environmental />;
    }
  }, [activeTab]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 font-mono">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl text-[#ff6b35] tracking-widest font-bold" style={{ textShadow: '0 0 10px #ff6b3540' }}>
                HUMAN MACHINE INTERFACE
              </h1>
              <div className="text-xs text-white/50 mt-1 tracking-wide">
                TOBE ENERGY // REAL-TIME INSTRUMENTATION DASHBOARD
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#ff6b35] tabular-nums" style={{ textShadow: '0 0 8px #ff6b3540' }}>
                {clock}
              </div>
              <StatusBadge status="ALL SYSTEMS NOMINAL" color="#00ff88" />
            </div>
          </div>

        </div>

        {/* ═══ INTELLIGENCE LAYER OVERVIEW ═══ */}
        <div className="mb-10">
          <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.3)' }}>
            ┌─── INTELLIGENCE LAYER ───┐
          </div>

          <p className="mb-8 max-w-3xl font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0]">
            Every Tobe electrolyzer runs a persistent intelligence layer. Custom firmware across 5 control boards tracks 100+ cloud-monitored variables in real time. AI analyzes every data point for valve chatter, sensor drift, efficiency degradation, and failure precursors — alerting both Tobe and the operator before anything breaks.
          </p>

          {/* 4-card highlight grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'CUSTOM FIRMWARE', desc: "Thousands of lines of purpose-built code controlling every parameter — voltage, current, temperature, pressure, flow, timing. Not off-the-shelf PLCs.", color: '#ff6b35' },
              { title: 'CLOUD MONITORING', desc: '100+ variables streamed to the cloud in real time. Every electrolyzer in the fleet, every sensor, every actuator — visible from anywhere.', color: '#ff6b35' },
              { title: 'PREDICTIVE AI', desc: 'Machine learning layered on top of process data. Detects valve chatter, sensor calibration drift, and efficiency trends. Maintenance is planned, never emergency.', color: '#ff6b35' },
              { title: 'CUSTOM HARDWARE', desc: 'Built on PCBs we designed and manufactured in-house. See the Power Converter section for our full PCB fabrication process.', color: '#ff6b35' },
            ].map((card) => (
              <div key={card.title} className="border-l-[3px] bg-[#12121a] px-5 py-5"
                style={{
                  borderLeftColor: card.color,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                <div className="mb-2 text-[0.65rem] tracking-[0.15em]" style={{ color: card.color }}>{card.title}</div>
                <p className="font-sans text-sm leading-relaxed text-[#9a9aaa]">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Terminal-style system status readout */}
          <div className="mb-8 overflow-hidden rounded border border-white/10 bg-black/40 px-5 py-4 font-mono text-sm">
            <div className="mb-3 text-[0.65rem] tracking-[0.15em] text-white/60">SYSTEM STATUS: <span className="text-[#00ff88]">● NOMINAL</span></div>
            <div className="space-y-1 text-white/70">
              <div>├─ Stack Voltage: <span className="text-white">3.2 kV</span>         <span className="text-[#00ff88]">● NORMAL</span></div>
              <div>├─ H₂ Flow Rate: <span className="text-white">1.04 kg/hr</span>     <span className="text-[#00ff88]">● NORMAL</span></div>
              <div>├─ Stack Temp: <span className="text-white">27.8°C</span>            <span className="text-[#00ff88]">● NORMAL</span></div>
              <div>├─ Valve V-101: <span className="text-white">chatter detected</span> <span className="text-[#f59e0b]">● ATTENTION</span> <span className="text-white/40">— maintenance window: 14 days</span></div>
              <div>├─ Sensor PT-103: <span className="text-white">0.3% drift</span>     <span className="text-[#f59e0b]">● WATCHING</span> <span className="text-white/40">— calibration due: 30 days</span></div>
              <div>└─ System Efficiency: <span className="text-white">93.2% HHV</span>  <span className="text-[#00ff88]">● OPTIMAL</span></div>
            </div>
          </div>

          {/* Callout */}
          <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-5"
            style={{ borderTop: '1px solid rgba(255,107,53,0.06)', borderRight: '1px solid rgba(255,107,53,0.06)', borderBottom: '1px solid rgba(255,107,53,0.06)' }}>
            <p className="font-sans text-[0.95rem] leading-relaxed text-[#b0b0c0] italic">
              Energy projects don&apos;t fail because of bad technology. They fail because nobody was watching. We are always watching.
            </p>
          </div>
        </div>

        {/* ASCII Header — switches with active dashboard tab */}
        <div className="mb-6">
          <pre className="text-[0.45rem] sm:text-[0.55rem] md:text-xs leading-none text-[#ff6b35]/70 overflow-x-auto" style={{ whiteSpace: 'pre', textShadow: '0 0 8px rgba(255,107,53,0.2)' }}>
            {ASCII_HEADERS[activeTab].art}
          </pre>
          <div className="mt-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]/50">
            {ASCII_HEADERS[activeTab].sub}
          </div>
        </div>

        {/* ═══ EXPLORE THE DASHBOARDS ═══ */}
        <div className="mb-4 text-[0.7rem] tracking-[0.2em] text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}>
          ┌─── EXPLORE THE DASHBOARDS ───┐
        </div>

        {/* Tab Bar */}
        <div className="mb-6 flex flex-wrap gap-1 border-b border-white/10 pb-2">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-xs sm:text-sm tracking-wider transition-all rounded-t border border-b-0 ${
                activeTab === tab.key
                  ? 'bg-white/5 text-[#ff6b35] border-white/20 font-bold'
                  : 'text-white/40 border-transparent hover:text-white/70 hover:bg-white/[0.02]'
              }`}
            >
              <span className="text-white/50 mr-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Screen Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-white/40">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center">
              <span className="text-[#ff6b35]">100 CLOUD VARIABLES</span>
              <span className="text-white/30">//</span>
              <span className="text-[#ff6b35]">5 CONTROL BOARDS</span>
              <span className="text-white/30">//</span>
              <span className="text-[#ff6b35]">8 MODBUS SLAVES</span>
              <span className="text-white/30">//</span>
              <span className="text-[#ff6b35]">REAL-TIME</span>
            </div>
            <div className="text-white/15">
              HMI v2.1.0 // TOBE ENERGY CORP
            </div>
          </div>
          <div className="mt-2 text-center font-mono text-xs text-white/30">
            ╔══════════════════════════════════════════════════════════════════════════════════╗
          </div>
          <div className="text-center font-mono text-xs text-white/30">
            ║ DEMO MODE — SIMULATED VALUES ONLY — NO REAL DATA, WAVEFORM PARAMETERS,        ║
          </div>
          <div className="text-center font-mono text-xs text-white/30">
            ║ CONTROL ALGORITHMS, OR CALIBRATION DATA ARE EXPOSED IN THIS INTERFACE           ║
          </div>
          <div className="text-center font-mono text-xs text-white/30">
            ╚══════════════════════════════════════════════════════════════════════════════════╝
          </div>
        </div>
      </div>
    </div>
  );
}
