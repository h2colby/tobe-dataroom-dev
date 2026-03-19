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
function TerminalReadout({ label, value, unit, color = '#00d4ff', decimals = 1 }: {
  label: string; value: number; unit: string; color?: string; decimals?: number;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/5 py-1.5 font-mono text-xs">
      <span className="text-white/40 uppercase tracking-wider">{label}</span>
      <span className="flex items-baseline gap-1">
        <span style={{ color, textShadow: `0 0 8px ${color}40` }} className="text-sm tabular-nums">
          {value.toFixed(decimals)}
        </span>
        <span className="text-white/25">{unit}</span>
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
    <div className="font-mono text-xs py-1">
      <div className="flex justify-between text-white/40 mb-0.5">
        <span className="uppercase tracking-wider">{label}</span>
        <span>{value.toFixed(1)} {unit}</span>
      </div>
      <div style={{ color }} className="tracking-[2px]">{bar} <span className="text-white/25">{Math.round(pct)}%</span></div>
    </div>
  );
}

// ─── GAUGE COMPONENT ────────────────────────────────────────────
function Gauge({ label, value, max, unit, safeMin, safeMax, color = '#00ff88', size = 120 }: {
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
        <text x={cx} y={cy - 12} textAnchor="middle" fill={gaugeColor} fontSize={14} fontFamily="monospace" fontWeight="bold">
          {value.toFixed(1)}
        </text>
        <text x={cx} y={cy + 2} textAnchor="middle" fill="white" fillOpacity={0.3} fontSize={8} fontFamily="monospace">
          {unit}
        </text>
      </svg>
      <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

// ─── OSCILLOSCOPE ───────────────────────────────────────────────
function Oscilloscope({ frequency, waveform }: { frequency: number; waveform: string }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setOffset(Date.now() * 0.002);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const w = 400;
  const h = 100;
  const points: string[] = [];
  for (let x = 0; x < w; x += 2) {
    const t = (x / w) * Math.PI * 6 + offset;
    let y: number;
    if (waveform === 'square') {
      y = Math.sin(t) > 0 ? 25 : 75;
    } else if (waveform === 'triangle') {
      y = 50 + 25 * (2 * Math.abs(2 * ((t / (2 * Math.PI)) % 1) - 1) - 1);
    } else {
      y = 50 + 25 * Math.sin(t);
    }
    points.push(`${x},${Math.round(y)}`);
  }

  return (
    <div className="rounded border border-white/10 bg-black/40 p-3">
      <div className="flex items-center justify-between mb-2 font-mono text-[10px] text-white/30">
        <span>OSCILLOSCOPE // CH1</span>
        <span>{frequency.toFixed(1)} Hz // {waveform.toUpperCase()}</span>
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
        <polyline points={points.join(' ')} fill="none" stroke="#00d4ff" strokeWidth={1.5}
          style={{ filter: 'drop-shadow(0 0 4px #00d4ff)' }} />
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
      className="inline-flex items-center gap-2 rounded border px-3 py-1.5 font-mono text-xs"
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
    <div className="rounded border border-white/10 bg-white/[0.02] p-4">
      <div className="font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase mb-3 flex items-center gap-2">
        <span className="text-white/20">├──</span> {title}
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
      style={{ color: '#00d4ff' }}
    >
      ⟳
    </motion.span>
  );
}

// ─── ASCII HEADERS ──────────────────────────────────────────────
const ASCII_HEADERS: Record<Tab, string> = {
  process: `┌─────────────────────────────────────────────────────┐
│  ██████╗ ██████╗  ██████╗  ██████╗███████╗███████╗  │
│  ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝  │
│  ██████╔╝██████╔╝██║   ██║██║     █████╗  ███████╗  │
│  ██╔═══╝ ██╔══██╗██║   ██║██║     ██╔══╝  ╚════██║  │
│  ██║     ██║  ██║╚██████╔╝╚██████╗███████╗███████║  │
│  ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚══════╝╚══════╝  │
│  ELECTROLYZER PROCESS CONTROL // 8 MODBUS SLAVES     │
└─────────────────────────────────────────────────────┘`,

  power: `┌─────────────────────────────────────────────────────┐
│  ██████╗  ██████╗ ██╗    ██╗███████╗██████╗         │
│  ██╔══██╗██╔═══██╗██║    ██║██╔════╝██╔══██╗        │
│  ██████╔╝██║   ██║██║ █╗ ██║█████╗  ██████╔╝        │
│  ██╔═══╝ ██║   ██║██║███╗██║██╔══╝  ██╔══██╗        │
│  ██║     ╚██████╔╝╚███╔███╔╝███████╗██║  ██║        │
│  ╚═╝      ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝        │
│  VACUUM TUBE CONTROLLER // DDS + GATE GENERATOR      │
└─────────────────────────────────────────────────────┘`,

  safety: `┌─────────────────────────────────────────────────────┐
│  ███████╗ █████╗ ███████╗███████╗████████╗██╗   ██╗ │
│  ██╔════╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝ │
│  ███████╗███████║█████╗  █████╗     ██║    ╚████╔╝  │
│  ╚════██║██╔══██║██╔══╝  ██╔══╝     ██║     ╚██╔╝   │
│  ███████║██║  ██║██║     ███████╗   ██║      ██║    │
│  ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝   ╚═╝      ╚═╝    │
│  DUAL-REDUNDANT GAS DETECTION // H2 + O2            │
└─────────────────────────────────────────────────────┘`,

  water: `┌─────────────────────────────────────────────────────┐
│  ██╗    ██╗ █████╗ ████████╗███████╗██████╗         │
│  ██║    ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗        │
│  ██║ █╗ ██║███████║   ██║   █████╗  ██████╔╝        │
│  ██║███╗██║██╔══██║   ██║   ██╔══╝  ██╔══██╗        │
│  ╚███╔███╔╝██║  ██║   ██║   ███████╗██║  ██║        │
│   ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝        │
│  FILTRATION SYSTEM // ATLAS EZO I2C + HALL FLOW      │
└─────────────────────────────────────────────────────┘`,

  environmental: `┌─────────────────────────────────────────────────────┐
│  ███████╗███╗   ██╗██╗   ██╗██╗██████╗  ██████╗     │
│  ██╔════╝████╗  ██║██║   ██║██║██╔══██╗██╔═══██╗    │
│  █████╗  ██╔██╗ ██║██║   ██║██║██████╔╝██║   ██║    │
│  ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██║██╔══██╗██║   ██║    │
│  ███████╗██║ ╚████║ ╚████╔╝ ██║██║  ██║╚██████╔╝    │
│  ╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚═╝  ╚═╝ ╚═════╝     │
│  ENVIRONMENTAL MONITORING // O2 + RH                 │
└─────────────────────────────────────────────────────┘`,
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
  const p_kpa = useAnimatedValue(95, 115, 0);
  const p_psi = useAnimatedValue(13.8, 16.7, 0.5);
  const t2_c = useAnimatedValue(22, 38, 1.2);
  const noise = useAnimatedValue(42, 68, 2.1);
  const ec = useAnimatedValue(180, 350, 3.3);
  const ph = useAnimatedValue(6.8, 7.4, 4.0);
  const phTemp = useAnimatedValue(23, 27, 4.5);
  const doMgl = useAnimatedValue(6.0, 9.5, 5.1);
  const doPct = useAnimatedValue(70, 110, 5.5);
  const doTemp = useAnimatedValue(22, 26, 5.8);
  const o3 = useAnimatedValue(0.01, 0.08, 6.2);
  const flow = useAnimatedValue(1.2, 4.8, 7.0);
  const flowTemp = useAnimatedValue(23, 28, 7.3);
  const total = useAnimatedValue(1200, 1350, 7.8, 0.0001);
  const errTotal = useAnimatedValue(0, 3, 8.5, 0.0002);

  return (
    <div className="space-y-4">
      <div className="font-mono text-[10px] text-white/30 flex items-center gap-4">
        <span>RS-485 BUS</span>
        <span className="text-[#00ff88]">● CONNECTED</span>
        <span>POLL CYCLE: 1.5s</span>
        <span>SLAVES: 8/8 ONLINE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SectionFrame title="PRESSURE">
          <TerminalReadout label="p_kpa" value={p_kpa} unit="kPa" color="#00d4ff" />
          <TerminalReadout label="p_psi" value={p_psi} unit="PSI" color="#00d4ff" />
          <div className="mt-2 font-mono text-[10px] text-white/20 flex items-center gap-2">
            <span className="text-[#ff6b35]">◆</span> TARE: ZEROED
          </div>
        </SectionFrame>

        <SectionFrame title="TEMPERATURE">
          <TerminalReadout label="t2_c" value={t2_c} unit="°C" color="#ff6b35" />
          <TerminalBar label="THERMAL" value={t2_c} max={60} unit="°C" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="NOISE LEVEL">
          <TerminalReadout label="noise_dba" value={noise} unit="dBA" color="#00d4ff" />
          <TerminalBar label="AMBIENT" value={noise} max={100} unit="dBA" />
        </SectionFrame>

        <SectionFrame title="CONDUCTIVITY">
          <TerminalReadout label="ec_uScm" value={ec} unit="µS/cm" color="#00d4ff" decimals={0} />
          <TerminalBar label="EC" value={ec} max={500} unit="µS/cm" />
        </SectionFrame>

        <SectionFrame title="pH">
          <TerminalReadout label="ph" value={ph} unit="pH" color="#00ff88" decimals={2} />
          <TerminalReadout label="ph_tempC" value={phTemp} unit="°C" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="DISSOLVED OXYGEN">
          <TerminalReadout label="do_mgl" value={doMgl} unit="mg/L" color="#00d4ff" />
          <TerminalReadout label="do_pct" value={doPct} unit="%" color="#00d4ff" />
          <TerminalReadout label="do_tempC" value={doTemp} unit="°C" color="#ff6b35" />
        </SectionFrame>

        <SectionFrame title="OZONE">
          <TerminalReadout label="o3_ppm" value={o3} unit="ppm" color="#00ff88" decimals={3} />
          <TerminalBar label="O3 LEVEL" value={o3} max={0.1} unit="ppm" color="#00ff88" />
        </SectionFrame>

        <SectionFrame title="MASS FLOW">
          <TerminalReadout label="flow" value={flow} unit="L/min" color="#00d4ff" decimals={2} />
          <TerminalReadout label="flow_tempC" value={flowTemp} unit="°C" color="#ff6b35" />
          <TerminalReadout label="total" value={total} unit="L" color="#00d4ff" decimals={0} />
          <div className="mt-1 font-mono text-[10px] text-white/20">↑ CUMULATIVE TOTALIZER</div>
        </SectionFrame>

        <SectionFrame title="BUS HEALTH">
          <TerminalReadout label="err_total" value={Math.round(errTotal)} unit="errs" color={errTotal > 2 ? '#ff3333' : '#00ff88'} decimals={0} />
          <div className="mt-2 font-mono text-[10px] text-[#00ff88]">
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
  const freq = useAnimatedValue(800, 25000, 0, 0.0003);
  const onCount = useAnimatedValue(100, 500, 1.0);
  const offCount = useAnimatedValue(50, 300, 1.5);
  const dutyPct = useAnimatedValue(20, 80, 2.0);
  const actualDuty = useAnimatedValue(18, 78, 2.3);
  const thresholdV = useAnimatedValue(2.5, 4.5, 2.8);
  const rampStart = useAnimatedValue(100, 500, 3.0, 0.0001);
  const rampStop = useAnimatedValue(50000, 200000, 3.3, 0.0001);
  const rampDuration = useAnimatedValue(5, 30, 3.6, 0.0002);
  const curr0A = useAnimatedValue(0.5, 3.5, 4.0);
  const curr0V = useAnimatedValue(12, 48, 4.3);
  const curr1A = useAnimatedValue(0.3, 2.8, 4.6);
  const curr1V = useAnimatedValue(12, 48, 4.9);
  const tempC = useAnimatedValue(35, 65, 5.2);
  const fanPwm = useAnimatedValue(30, 85, 5.5);

  const [waveform, setWaveform] = useState<'sine' | 'triangle' | 'square'>('sine');
  useEffect(() => {
    const id = setInterval(() => {
      setWaveform(prev => {
        const forms: ('sine' | 'triangle' | 'square')[] = ['sine', 'triangle', 'square'];
        const idx = (forms.indexOf(prev) + 1) % forms.length;
        return forms[idx];
      });
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <div className="font-mono text-[10px] text-white/30 flex items-center gap-4">
        <span>DDS + GATE GENERATOR</span>
        <span className="text-[#00ff88]">● ACTIVE</span>
        <span>CURRENT SENSING: DUAL CH</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionFrame title="DDS FREQUENCY SYNTHESIZER">
          <TerminalReadout label="currentFrequencyHz" value={freq} unit="Hz" color="#00d4ff" decimals={1} />
          <div className="mt-2 font-mono text-[10px] text-white/30">
            RANGE: 0.1 Hz → 1 MHz
          </div>
          <div className="mt-1 font-mono text-[10px]">
            ddsWaveform: <span className="text-[#ff6b35]">{waveform.toUpperCase()}</span> <Cursor />
          </div>
        </SectionFrame>

        <SectionFrame title="GATE TIMING">
          <TerminalReadout label="onCount" value={onCount} unit="ticks" color="#ff6b35" decimals={0} />
          <TerminalReadout label="offCount" value={offCount} unit="ticks" color="#ff6b35" decimals={0} />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            PULSE: {'▓'.repeat(Math.round(onCount / 50))}{'░'.repeat(Math.round(offCount / 50))}
          </div>
        </SectionFrame>

        <SectionFrame title="DUTY CYCLE">
          <TerminalReadout label="dutyPct" value={dutyPct} unit="%" color="#00d4ff" />
          <TerminalReadout label="actualDutyPct" value={actualDuty} unit="%" color="#00d4ff" />
          <TerminalReadout label="thresholdV" value={thresholdV} unit="V" color="#ff6b35" />
          <TerminalBar label="DUTY" value={dutyPct} max={100} unit="%" color="#00d4ff" />
        </SectionFrame>

        <SectionFrame title="FREQUENCY SWEEP">
          <TerminalReadout label="rampStartHz" value={rampStart} unit="Hz" color="#ff6b35" decimals={0} />
          <TerminalReadout label="rampStopHz" value={rampStop} unit="Hz" color="#ff6b35" decimals={0} />
          <TerminalReadout label="rampDurationSec" value={rampDuration} unit="s" color="#00d4ff" />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            rampLog: <span className="text-[#00ff88]">LOGARITHMIC SWEEP</span>
          </div>
          <motion.div
            className="mt-1 h-1 rounded-full bg-[#ff6b35]"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: rampDuration, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 4px #ff6b35)' }}
          />
        </SectionFrame>

        <SectionFrame title="CURRENT SENSING">
          <div className="font-mono text-[10px] text-white/25 mb-1">── CHANNEL 0 ──</div>
          <TerminalReadout label="curr0_A" value={curr0A} unit="A" color="#00d4ff" decimals={2} />
          <TerminalReadout label="curr0_V" value={curr0V} unit="V" color="#00d4ff" />
          <div className="font-mono text-[10px] text-white/25 mt-2 mb-1">── CHANNEL 1 ──</div>
          <TerminalReadout label="curr1_A" value={curr1A} unit="A" color="#00d4ff" decimals={2} />
          <TerminalReadout label="curr1_V" value={curr1V} unit="V" color="#00d4ff" />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            P_total: <span className="text-[#ff6b35]">{(curr0A * curr0V + curr1A * curr1V).toFixed(1)} W</span>
          </div>
        </SectionFrame>

        <SectionFrame title="THERMAL MANAGEMENT">
          <TerminalReadout label="temp_C" value={tempC} unit="°C" color={tempC > 55 ? '#ff3333' : '#ff6b35'} />
          <TerminalBar label="HEATSINK" value={tempC} max={85} unit="°C" color={tempC > 55 ? '#ff3333' : '#ff6b35'} />
          <div className="mt-2 flex items-center gap-2 font-mono text-[10px]">
            <span className="text-white/30">OVERTEMP LATCH:</span>
            <span className="text-[#00ff88]">CLEAR</span>
          </div>
          <div className="mt-2 flex items-center gap-2 font-mono text-[10px]">
            <span className="text-white/30">fan_pwm_pct:</span>
            <span className="text-[#00d4ff]">{fanPwm.toFixed(0)}%</span>
            <SpinningFan pwm={fanPwm} />
          </div>
          <TerminalBar label="FAN" value={fanPwm} max={100} unit="%" color="#00d4ff" />
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
      <div className="flex flex-col items-center gap-3 py-6 rounded border border-[#00ff88]/20 bg-[#00ff88]/5">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-4xl font-bold text-[#00ff88]"
          style={{ textShadow: '0 0 20px #00ff8860, 0 0 40px #00ff8830' }}
        >
          STATUS: SAFE
        </motion.div>
        <StatusBadge status="MONITORING" color="#00ff88" />
        <div className="font-mono text-[10px] text-white/30">
          DUAL-REDUNDANT // CONTINUOUS // ADAPTIVE PROTOCOL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* H2 Sensor A */}
        <SectionFrame title="H2 SENSOR A (PRIMARY)">
          <div className="flex justify-center py-2">
            <Gauge label="h2a_ppm" value={h2a} max={200} unit="ppm" safeMax={50} color="#00ff88" size={140} />
          </div>
          <TerminalReadout label="h2a_ppm" value={h2a} unit="ppm" color="#00ff88" />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            errs_h2a: <span className="text-white/40">{Math.round(errsH2a)}</span>
          </div>
          <div className="font-mono text-[10px] text-white/20">
            fc_h2a: <span className="text-[#00d4ff]">FC{Math.round(fcH2a)}</span> AUTO-LEARN
          </div>
        </SectionFrame>

        {/* H2 Sensor B */}
        <SectionFrame title="H2 SENSOR B (REDUNDANT)">
          <div className="flex justify-center py-2">
            <Gauge label="h2b_ppm" value={h2b} max={200} unit="ppm" safeMax={50} color="#00ff88" size={140} />
          </div>
          <TerminalReadout label="h2b_ppm" value={h2b} unit="ppm" color="#00ff88" />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            errs_h2b: <span className="text-white/40">{Math.round(errsH2b)}</span>
          </div>
          <div className="font-mono text-[10px] text-white/20">
            fc_h2b: <span className="text-[#00d4ff]">FC{Math.round(fcH2b)}</span> AUTO-LEARN
          </div>
        </SectionFrame>

        {/* O2 */}
        <SectionFrame title="O2 MONITOR">
          <div className="flex justify-center py-2">
            <Gauge label="o2_pct" value={o2} max={25} unit="%" safeMin={19.5} safeMax={23.5} color="#00ff88" size={140} />
          </div>
          <TerminalReadout label="o2_pct" value={o2} unit="%" color="#00ff88" decimals={1} />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            errs_o2: <span className="text-white/40">{Math.round(errsO2)}</span>
          </div>
          <div className="font-mono text-[10px] text-white/20">
            fc_o2: <span className="text-[#00d4ff]">FC{Math.round(fcO2)}</span> AUTO-LEARN
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#00ff88]">
            NOMINAL: 20.9% <Cursor />
          </div>
        </SectionFrame>
      </div>

      <SectionFrame title="SYSTEM STATUS">
        <div className="font-mono text-xs text-[#00ff88]">
          status_txt: <span className="text-white/60">ALL_CLEAR // NO_ALARMS // SENSORS_NOMINAL</span> <Cursor />
        </div>
        <div className="mt-2 font-mono text-[10px] text-white/20">
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
      <div className="font-mono text-[10px] text-white/30 flex flex-wrap items-center gap-4">
        <span>ATLAS EZO I2C BUS</span>
        <span className="text-[#00ff88]">● ALL SENSORS OK</span>
        <span>PT100 RTD (MAX31865)</span>
        <span>4-20mA PRESSURE</span>
        <span>HALL EFFECT FLOW</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SectionFrame title="FLOW (HALL EFFECT)">
          <TerminalReadout label="flowLpm" value={flowLpm} unit="L/min" color="#00d4ff" decimals={2} />
          <TerminalReadout label="totalLiters" value={totalLiters} unit="L" color="#00d4ff" decimals={0} />
          <TerminalBar label="FLOW RATE" value={flowLpm} max={10} unit="L/min" color="#00d4ff" />
          <div className="mt-1 font-mono text-[10px] text-white/20">
            EMA SMOOTHING: <span className="text-[#ff6b35]">α = 0.15</span>
          </div>
        </SectionFrame>

        <SectionFrame title="TEMPERATURE (PT100 RTD)">
          <TerminalReadout label="tcC" value={tcC} unit="°C" color="#ff6b35" decimals={2} />
          <TerminalBar label="TEMP" value={tcC} max={50} unit="°C" color="#ff6b35" />
          <div className="mt-1 font-mono text-[10px] text-white/20">
            VIA MAX31865 // 3-WIRE
          </div>
        </SectionFrame>

        <SectionFrame title="PRESSURE (4-20mA)">
          <TerminalReadout label="pressurePsi" value={pressurePsi} unit="PSI" color="#00d4ff" />
          <TerminalBar label="LINE PRESSURE" value={pressurePsi} max={80} unit="PSI" />
          <div className="mt-1 font-mono text-[10px] text-white/20">
            TRANSDUCER: 0-100 PSI
          </div>
        </SectionFrame>

        <SectionFrame title="pH (ATLAS EZO)">
          <div className="flex justify-center py-2">
            <Gauge label="pH" value={pH} max={14} unit="pH" safeMin={6.5} safeMax={8.5} color="#00ff88" />
          </div>
          <TerminalReadout label="pH" value={pH} unit="pH" color="#00ff88" decimals={2} />
        </SectionFrame>

        <SectionFrame title="ORP (ATLAS EZO)">
          <TerminalReadout label="orp_mV" value={orp} unit="mV" color="#00d4ff" decimals={0} />
          <TerminalBar label="ORP" value={orp} max={600} unit="mV" color="#00d4ff" />
        </SectionFrame>

        <SectionFrame title="DISSOLVED OXYGEN">
          <TerminalReadout label="do_mgL" value={doMgL} unit="mg/L" color="#00d4ff" />
          <TerminalReadout label="do_pct" value={doPct} unit="%" color="#00d4ff" />
        </SectionFrame>

        <SectionFrame title="CONDUCTIVITY">
          <TerminalReadout label="ec_uScm" value={ec} unit="µS/cm" color="#00d4ff" decimals={0} />
          <TerminalReadout label="tds_ppm" value={tds} unit="ppm" color="#00d4ff" decimals={0} />
          <TerminalReadout label="sal_psu" value={sal} unit="PSU" color="#00d4ff" decimals={3} />
          <TerminalReadout label="sg" value={sg} unit="" color="#00d4ff" decimals={4} />
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
      <div className="font-mono text-[10px] text-white/30 flex items-center gap-4">
        <span>AMBIENT MONITORING</span>
        <span className="text-[#00ff88]">● ACTIVE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionFrame title="OXYGEN">
          <div className="flex justify-center py-4">
            <Gauge label="o2_pct" value={o2} max={25} unit="%" safeMin={19.5} safeMax={23.5} color="#00ff88" size={160} />
          </div>
          <TerminalReadout label="o2_pct" value={o2} unit="%" color="#00ff88" decimals={1} />
          <TerminalBar label="O2 LEVEL" value={o2} max={25} unit="%" color="#00ff88" />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            o2SampleSec: <span className="text-[#00d4ff]">{o2Sample.toFixed(1)}s</span>
          </div>
          <div className="font-mono text-[10px] text-[#00ff88]">NOMINAL: 20.9%</div>
        </SectionFrame>

        <SectionFrame title="HUMIDITY">
          <div className="flex justify-center py-4">
            <Gauge label="rh_pct" value={rh} max={100} unit="%" safeMin={20} safeMax={80} color="#00d4ff" size={160} />
          </div>
          <TerminalReadout label="rh_pct" value={rh} unit="%" color="#00d4ff" />
          <TerminalBar label="RELATIVE HUMIDITY" value={rh} max={100} unit="%" color="#00d4ff" />
          <div className="mt-2 font-mono text-[10px] text-white/20">
            rhSampleSec: <span className="text-[#00d4ff]">{rhSample.toFixed(1)}s</span>
          </div>
        </SectionFrame>
      </div>

      <SectionFrame title="ENVIRONMENT STATUS">
        <div className="font-mono text-xs text-[#00ff88]">
          ALL PARAMETERS WITHIN SAFE OPERATING ENVELOPE <Cursor />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[10px]">
          <div className="text-white/30">O2 ALARM THRESHOLD: <span className="text-[#ff3333]">&lt;19.5%</span></div>
          <div className="text-white/30">RH ALARM THRESHOLD: <span className="text-[#ff3333]">&gt;80%</span></div>
        </div>
      </SectionFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function HMIPage() {
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
      {/* Scanlines */}
      <div className="scanlines pointer-events-none fixed inset-0 z-50" />
      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#ff6b35 1px, transparent 1px), linear-gradient(90deg, #ff6b35 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 font-mono">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h1 className="text-lg sm:text-xl text-[#ff6b35] tracking-widest" style={{ textShadow: '0 0 10px #ff6b3540' }}>
                HUMAN MACHINE INTERFACE
              </h1>
              <div className="text-[10px] text-white/30 mt-1">
                TOBE ENERGY // REAL-TIME INSTRUMENTATION DASHBOARD
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#00d4ff] tabular-nums" style={{ textShadow: '0 0 8px #00d4ff40' }}>
                {clock}
              </div>
              <StatusBadge status="ALL SYSTEMS NOMINAL" color="#00ff88" />
            </div>
          </div>

          {/* ASCII Header */}
          <pre className="text-[7px] sm:text-[9px] leading-tight text-[#ff6b35]/60 overflow-x-auto whitespace-pre">
            {ASCII_HEADERS[activeTab]}
          </pre>
        </div>

        {/* Tab Bar */}
        <div className="mb-6 flex flex-wrap gap-1 border-b border-white/10 pb-2">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-[10px] sm:text-xs tracking-wider transition-all rounded-t border border-b-0 ${
                activeTab === tab.key
                  ? 'bg-white/5 text-[#ff6b35] border-white/20'
                  : 'text-white/30 border-transparent hover:text-white/60 hover:bg-white/[0.02]'
              }`}
            >
              <span className="text-white/20 mr-1">{String(i + 1).padStart(2, '0')}</span>
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-white/20">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center">
              <span className="text-[#ff6b35]">100 CLOUD VARIABLES</span>
              <span className="text-white/10">//</span>
              <span className="text-[#00d4ff]">5 CONTROL BOARDS</span>
              <span className="text-white/10">//</span>
              <span className="text-[#00ff88]">8 MODBUS SLAVES</span>
              <span className="text-white/10">//</span>
              <span className="text-[#ff6b35]">REAL-TIME</span>
            </div>
            <div className="text-white/15">
              HMI v2.1.0 // TOBE ENERGY CORP
            </div>
          </div>
          <div className="mt-2 text-center font-mono text-[9px] text-white/10">
            ╔══════════════════════════════════════════════════════════════════════════════════╗
          </div>
          <div className="text-center font-mono text-[9px] text-white/10">
            ║ DEMO MODE — SIMULATED VALUES ONLY — NO REAL DATA, WAVEFORM PARAMETERS,        ║
          </div>
          <div className="text-center font-mono text-[9px] text-white/10">
            ║ CONTROL ALGORITHMS, OR CALIBRATION DATA ARE EXPOSED IN THIS INTERFACE           ║
          </div>
          <div className="text-center font-mono text-[9px] text-white/10">
            ╚══════════════════════════════════════════════════════════════════════════════════╝
          </div>
        </div>
      </div>
    </div>
  );
}
