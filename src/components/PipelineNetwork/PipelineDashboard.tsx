'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  opportunities,
  statusColors,
  statusLabels,
  pipelineStats,
  type Opportunity,
  type OpportunityStatus,
} from './pipelineData';

// --- Colors & Constants ---
const colors = {
  bgPrimary: '#0a0a0f',
  bgSecondary: '#12121a',
  bgCard: '#1a1a24',
  orange: '#ff6b35',
  cyan: '#00d4ff',
  green: '#00ff88',
  yellow: '#ffcc00',
  purple: '#a855f7',
  blue: '#3b82f6',
  textSecondary: '#8a8a9a',
  border: '#2a2a3a',
};

// --- Stat Cards ---
const statCards = [
  { label: 'TOTAL PIPELINE', value: '$100M+', color: 'orange' as const },
  { label: 'SIGNED / LOI', value: '$20M+', color: 'green' as const },
  { label: 'ACTIVE QUOTES', value: '$32M+', color: 'yellow' as const },
  { label: 'SCALE POTENTIAL', value: '$75M', color: 'purple' as const },
  { label: 'OPPORTUNITIES', value: String(pipelineStats.opportunities), color: 'cyan' as const },
];

const colorMap = {
  orange: colors.orange,
  green: colors.green,
  yellow: colors.yellow,
  purple: colors.purple,
  cyan: colors.cyan,
};

// --- Sector data ---
const sectorData = [
  { label: 'TRANSIT', value: '$19M', pct: 38, colorClass: 'transit', color: colors.yellow },
  { label: 'INDUSTRIAL', value: '$12M', pct: 24, colorClass: 'industrial', color: colors.orange },
  { label: 'STEEL', value: '$7M', pct: 14, colorClass: 'steel', color: colors.purple },
  { label: 'E-FUELS', value: '$6M', pct: 12, colorClass: 'efuels', color: colors.green },
  { label: 'MOBILITY', value: '$3M', pct: 6, colorClass: 'mobility', color: colors.cyan },
];

// --- Regional data ---
const regionalData = [
  { region: 'CENTRAL (OK)', detail: '5 OPP // 715 kg/d', color: colors.orange },
  { region: 'SOUTH (TX)', detail: '2 OPP // 250 kg/d', color: colors.cyan },
  { region: 'NORTHWEST (OR)', detail: '1 OPP // $19M', color: colors.yellow },
  { region: 'NORTHEAST (PA)', detail: '1 OPP // $49M pot.', color: colors.purple },
  { region: 'WEST (CA)', detail: '1 OPP // 1,250 kg/d', color: colors.green },
  { region: 'MOUNTAIN (UT)', detail: '1 OPP // $172K', color: colors.yellow },
];

// --- Top opportunities (sorted by value) ---
const topOpportunities: { opp: Opportunity; displayValue: string; meta: string }[] = [
  {
    opp: opportunities.find(o => o.id === 'transit')!,
    displayValue: '$19M',
    meta: 'Portland, OR \u2022 FCEB Pilot \u2022 500 kg/day',
  },
  {
    opp: opportunities.find(o => o.id === 'refinery')!,
    displayValue: '$8.2M',
    meta: 'Tulsa, OK \u2022 Offtake \u2022 500 kg/day',
  },
  {
    opp: opportunities.find(o => o.id === 'phoenix')!,
    displayValue: '$6-9M',
    meta: 'Los Angeles, CA \u2022 E-Fuels \u2022 10\u00d7 T-125',
  },
  {
    opp: opportunities.find(o => o.id === 'forge-steel')!,
    displayValue: '$7M \u2192 $49M',
    meta: 'Bethlehem, PA \u2022 Steel \u2022 7 sites',
  },
  {
    opp: opportunities.find(o => o.id === 'forge')!,
    displayValue: '$3.6M',
    meta: 'Sand Springs, OK \u2022 Combustion \u2022 133 kg/day',
  },
  {
    opp: opportunities.find(o => o.id === 'cardinal')!,
    displayValue: '\u2713 CONTRACTED',
    meta: 'Broken Arrow, OK \u2022 Q2 2026 \u2022 First Deploy',
  },
];

// --- Map markers (positioned as % of map area) ---
interface MapMarker {
  id: string;
  label: string;
  left: string;
  top: string;
  status: OpportunityStatus;
  size: 'xl' | 'lg' | 'md' | 'sm';
  tooltip: string;
}

const mapMarkers: MapMarker[] = [
  {
    id: 'transit',
    label: 'TRANSIT',
    left: '13.5%',
    top: '33%',
    status: 'quoting',
    size: 'xl',
    tooltip: 'TRANSIT \u2014 Portland, OR\n$19M // 500 kg/day // FCEB Pilot',
  },
  {
    id: 'phoenix',
    label: 'PHOENIX',
    left: '13.5%',
    top: '63%',
    status: 'quoting',
    size: 'lg',
    tooltip: 'PHOENIX \u2014 Los Angeles, CA\n$6-9M // 1,250 kg/day // E-Fuels',
  },
  {
    id: 'vault',
    label: 'VAULT',
    left: '22%',
    top: '42%',
    status: 'quoting',
    size: 'md',
    tooltip: 'VAULT \u2014 Utah\n$50-172K // T-25/T-125 // Facility visit pending',
  },
  {
    id: 'horizon',
    label: 'HORIZON',
    left: '46.5%',
    top: '73%',
    status: 'loi',
    size: 'md',
    tooltip: 'HORIZON \u2014 Texas (Multiple)\n250 kg/day // Mobility // 10\u00d7 T-25',
  },
  {
    id: 'titan',
    label: 'TITAN',
    left: '51%',
    top: '78%',
    status: 'interest',
    size: 'md',
    tooltip: 'TITAN \u2014 Houston, TX\nMajor EPC // Deck Requested',
  },
  {
    id: 'forge-steel',
    label: 'FORGE-STEEL',
    left: '80.5%',
    top: '39%',
    status: 'quoting',
    size: 'lg',
    tooltip: 'FORGE-STEEL \u2014 Bethlehem, PA\n$7M \u2192 $49M // Steel // 7 Sites',
  },
];

// Oklahoma inset markers
const okMarkers: MapMarker[] = [
  {
    id: 'cardinal',
    label: 'CARDINAL',
    left: '75%',
    top: '45%',
    status: 'contracted',
    size: 'md',
    tooltip: 'CARDINAL \u2014 Broken Arrow\n\u2713 CONTRACTED // 50 kg/day',
  },
  {
    id: 'refinery',
    label: 'REFINERY',
    left: '60%',
    top: '35%',
    status: 'loi',
    size: 'lg',
    tooltip: 'REFINERY \u2014 Tulsa\n$8.2M // 500 kg/day // $15/kg',
  },
  {
    id: 'forge',
    label: 'FORGE',
    left: '35%',
    top: '40%',
    status: 'loi',
    size: 'md',
    tooltip: 'FORGE \u2014 Sand Springs\n$3.6M // 133 kg/day // $25/kg',
  },
  {
    id: 'campus',
    label: 'CAMPUS',
    left: '55%',
    top: '55%',
    status: 'loi',
    size: 'sm',
    tooltip: 'CAMPUS \u2014 Tulsa\n$691K // 32 kg/day // Academic',
  },
  {
    id: 'scholar',
    label: 'SCHOLAR',
    left: '65%',
    top: '65%',
    status: 'interest',
    size: 'sm',
    tooltip: 'SCHOLAR \u2014 Tulsa\nResearch Collaboration',
  },
];

const markerSizes = { xl: 24, lg: 20, md: 16, sm: 12 };

// --- Marker Component ---
function Marker({ marker, onHover, isHovered }: { marker: MapMarker; onHover: (id: string | null) => void; isHovered: boolean }) {
  const size = markerSizes[marker.size];
  const color = statusColors[marker.status];

  return (
    <div
      className="absolute z-10 cursor-pointer"
      style={{ left: marker.left, top: marker.top, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => onHover(marker.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Label */}
      <span
        className="absolute left-1/2 -translate-x-1/2 font-mono text-white whitespace-nowrap"
        style={{ top: -22, fontSize: '0.55rem', letterSpacing: '0.1em', textShadow: `0 0 10px ${colors.bgPrimary}` }}
      >
        {marker.label}
      </span>

      {/* Dot */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], boxShadow: [`0 0 20px ${color}`, `0 0 30px ${color}`, `0 0 20px ${color}`] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-full border-2 border-white/80"
        style={{ width: size, height: size, backgroundColor: color }}
      />

      {/* Tooltip */}
      {isHovered && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[1000] whitespace-pre-line"
          style={{ top: size + 8 }}
        >
          <div
            className="relative px-3 py-2 text-white"
            style={{
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              fontSize: '0.7rem',
              minWidth: 180,
            }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: -6,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: `6px solid ${colors.border}`,
              }}
            />
            {marker.tooltip.split('\n').map((line, i) => (
              <div key={i} className={i === 0 ? 'font-bold font-mono' : 'text-gray-300'}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Dashboard ---
export function PipelineDashboard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: colors.bgPrimary, fontFamily: "'Inter', sans-serif" }}>
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1000]"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.02) 2px, rgba(0, 212, 255, 0.02) 4px)`,
        }}
      />

      <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-4 sm:px-6 mb-6"
          style={{
            background: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
            borderLeft: `4px solid ${colors.orange}`,
          }}
        >
          <div>
            <h1 className="font-mono text-lg sm:text-xl font-bold tracking-wide text-white">
              TOBE ENERGY // PIPELINE COMMAND
            </h1>
            <div className="font-mono text-xs mt-1" style={{ color: colors.cyan, letterSpacing: '0.15em' }}>
              HYDROGEN INFRASTRUCTURE DEPLOYMENT TRACKER
            </div>
          </div>
          <div className="text-right font-mono text-xs mt-2 sm:mt-0" style={{ color: colors.textSecondary }}>
            <div className="animate-pulse" style={{ color: colors.green }}>
              &#9673; LIVE
            </div>
            <div>UPDATED: 2026-03-18 // 15:45 CDT</div>
          </div>
        </motion.header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="relative p-4"
              style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="font-mono text-gray-400 mb-2"
                style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}
              >
                {card.label}
              </div>
              <div className="font-mono text-2xl font-bold" style={{ color: colorMap[card.color] }}>
                {card.value}
              </div>
              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 w-full h-0.5"
                style={{ background: colorMap[card.color] }}
              />
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative p-4"
            style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
          >
            {/* Map Header */}
            <div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 mb-4"
              style={{ borderBottom: `1px solid ${colors.border}` }}
            >
              <span className="font-mono text-xs tracking-wider text-white mb-2 sm:mb-0">
                &#9673; GEOGRAPHIC DISTRIBUTION &mdash; CONTINENTAL US
              </span>
              <div className="flex gap-4 flex-wrap" style={{ fontSize: '0.65rem' }}>
                {Object.entries(statusLabels).map(([status, label]) => (
                  <div key={status} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: statusColors[status as OpportunityStatus] }}
                    />
                    <span className="text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Area */}
            <div className="relative w-full" style={{ height: 'clamp(300px, 50vw, 480px)' }}>
              {/* SVG Map */}
              <svg viewBox="0 0 960 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                {/* Oklahoma */}
                <path
                  d="M458,323 L510,323 L510,310 L545,310 L545,340 L560,340 L560,370 L458,370 Z"
                  fill="rgba(255, 107, 53, 0.2)"
                  stroke={colors.orange}
                  strokeWidth={1}
                />
                {/* Texas */}
                <path
                  d="M370,380 L458,370 L470,380 L485,375 L500,395 L520,400 L530,420 L520,460 L490,490 L450,510 L400,500 L365,470 L350,420 L370,380 Z"
                  fill="rgba(0, 212, 255, 0.15)"
                  stroke={colors.cyan}
                  strokeWidth={1}
                />
                {/* California */}
                <path
                  d="M115,240 L145,220 L150,280 L165,340 L150,400 L120,420 L95,380 L85,320 L95,260 L115,240 Z"
                  fill="rgba(255, 107, 53, 0.15)"
                  stroke={colors.orange}
                  strokeWidth={1}
                />
                {/* Oregon */}
                <path
                  d="M95,180 L145,170 L170,180 L175,220 L145,220 L115,240 L95,260 L75,230 L80,195 L95,180 Z"
                  fill="rgba(255, 204, 0, 0.15)"
                  stroke={colors.yellow}
                  strokeWidth={1}
                />
                {/* Pennsylvania */}
                <path
                  d="M750,220 L800,210 L810,230 L800,250 L755,255 L745,235 L750,220 Z"
                  fill="rgba(168, 85, 247, 0.15)"
                  stroke={colors.purple}
                  strokeWidth={1}
                />
                {/* Utah */}
                <path
                  d="M200,240 L260,235 L265,320 L200,325 L200,240 Z"
                  fill="rgba(255, 204, 0, 0.15)"
                  stroke={colors.yellow}
                  strokeWidth={1}
                />
                {/* Other states (dimmed) */}
                {[
                  'M180,170 L220,165 L260,170 L255,190 L225,200 L180,195 L175,180 L180,170 Z',
                  'M175,220 L220,200 L255,195 L275,215 L260,260 L220,280 L175,260 L165,240 L175,220 Z',
                  'M260,170 L320,155 L360,160 L365,195 L345,230 L305,240 L275,215 L255,190 L260,170 Z',
                  'M365,160 L420,150 L460,155 L465,200 L440,235 L390,245 L365,195 L365,160 Z',
                  'M275,260 L345,230 L390,245 L400,290 L365,320 L320,330 L280,315 L260,280 L275,260 Z',
                  'M220,280 L260,260 L280,315 L265,360 L220,375 L185,350 L175,310 L195,290 L220,280 Z',
                  'M365,320 L400,290 L445,295 L458,323 L458,370 L370,380 L340,365 L350,340 L365,320 Z',
                  'M465,200 L510,195 L550,200 L555,245 L545,280 L510,310 L458,323 L445,295 L465,200 Z',
                  'M550,200 L600,190 L640,195 L650,240 L630,280 L590,295 L560,280 L555,245 L550,200 Z',
                  'M600,190 L660,180 L705,190 L720,230 L700,275 L660,285 L630,280 L650,240 L640,195 L600,190 Z',
                  'M560,340 L600,330 L640,340 L660,380 L640,420 L600,430 L560,410 L550,375 L560,340 Z',
                  'M560,280 L590,295 L630,280 L660,285 L675,320 L650,355 L600,330 L560,340 L545,310 L545,280 L560,280 Z',
                  'M660,285 L700,275 L740,295 L745,340 L720,375 L675,365 L675,320 L660,285 Z',
                  'M745,235 L750,220 L790,200 L820,205 L840,230 L830,260 L795,275 L760,275 L755,255 L745,235 Z',
                  'M755,255 L795,275 L820,300 L810,340 L770,355 L745,340 L740,295 L755,255 Z',
                  'M720,230 L745,235 L740,295 L700,275 L720,230 Z',
                  'M830,260 L870,250 L895,270 L890,310 L855,330 L820,300 L830,260 Z',
                  'M820,300 L855,330 L870,365 L840,400 L800,380 L810,340 L820,300 Z',
                  'M460,155 L510,145 L560,150 L580,175 L550,200 L510,195 L465,200 L460,155 Z',
                  'M560,150 L620,140 L665,150 L680,180 L660,180 L600,190 L580,175 L560,150 Z',
                  'M665,150 L720,140 L760,155 L770,185 L750,220 L720,230 L705,190 L680,180 L665,150 Z',
                ].map((d, i) => (
                  <path key={i} d={d} fill="#1a1a24" stroke="#2a2a3a" strokeWidth={0.5} />
                ))}

                {/* Connection lines from Oklahoma HQ */}
                {[
                  { x2: 130, y2: 380 },
                  { x2: 130, y2: 200 },
                  { x2: 450, y2: 450 },
                  { x2: 775, y2: 235 },
                  { x2: 490, y2: 430 },
                  { x2: 232, y2: 280 },
                ].map((line, i) => (
                  <line
                    key={i}
                    x1={505}
                    y1={345}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={colors.orange}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    fill="none"
                    opacity={0.4}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-100"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </line>
                ))}
              </svg>

              {/* HQ Marker */}
              <div
                className="absolute flex items-center justify-center font-mono text-xs font-bold rounded-full"
                style={{
                  left: '52.6%',
                  top: '57.5%',
                  width: 30,
                  height: 30,
                  transform: 'translate(-50%, -50%)',
                  border: `2px solid ${colors.orange}`,
                  color: colors.orange,
                  background: colors.bgPrimary,
                  boxShadow: `0 0 15px rgba(255, 107, 53, 0.5)`,
                }}
              >
                HQ
              </div>

              {/* Map Markers */}
              {mapMarkers.map(m => (
                <Marker
                  key={m.id}
                  marker={m}
                  onHover={setHoveredId}
                  isHovered={hoveredId === m.id}
                />
              ))}

              {/* Oklahoma Inset */}
              <div
                className="absolute hidden sm:block"
                style={{
                  bottom: 20,
                  left: 20,
                  width: 280,
                  height: 200,
                  background: colors.bgSecondary,
                  border: `1px solid ${colors.orange}`,
                  padding: '0.75rem',
                }}
              >
                <div
                  className="flex justify-between font-mono mb-2"
                  style={{ fontSize: '0.65rem', color: colors.orange, letterSpacing: '0.1em' }}
                >
                  <span>&#9673; OKLAHOMA CLUSTER</span>
                  <span>5 OPPORTUNITIES</span>
                </div>
                <div
                  className="relative w-full"
                  style={{
                    height: 'calc(100% - 20px)',
                    background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bgCard} 100%)`,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {okMarkers.map(m => (
                    <Marker
                      key={m.id}
                      marker={m}
                      onHover={setHoveredId}
                      isHovered={hoveredId === m.id}
                    />
                  ))}
                  {/* HQ indicator */}
                  <div
                    className="absolute font-mono"
                    style={{
                      left: '80%',
                      top: '75%',
                      fontSize: '0.5rem',
                      color: colors.orange,
                    }}
                  >
                    &#11044; HQ
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4">
            {/* Top Opportunities */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4"
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
            >
              <div
                className="font-mono text-xs mb-3 pb-2"
                style={{
                  color: colors.cyan,
                  letterSpacing: '0.1em',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                &#9673; TOP OPPORTUNITIES BY VALUE
              </div>
              {topOpportunities.map(({ opp, displayValue, meta }) => (
                <div
                  key={opp.id}
                  className="relative p-3 mb-2 transition-all duration-200 hover:border-[#ff6b35] group"
                  style={{
                    border: `1px solid ${colors.border}`,
                    borderLeft: `3px solid ${statusColors[opp.status]}`,
                  }}
                  onMouseEnter={() => setHoveredId(opp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-sm font-bold text-white">{opp.codename}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: colors.orange }}>
                      {displayValue}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>
                    {meta}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Sector Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4"
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
            >
              <div
                className="font-mono text-xs mb-3 pb-2"
                style={{
                  color: colors.cyan,
                  letterSpacing: '0.1em',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                &#9673; PIPELINE BY SECTOR
              </div>
              {sectorData.map(s => (
                <div key={s.label} className="flex items-center mb-2">
                  <span
                    className="font-mono w-20"
                    style={{ fontSize: '0.6rem', color: colors.textSecondary }}
                  >
                    {s.label}
                  </span>
                  <div
                    className="flex-1 h-2 rounded-sm overflow-hidden"
                    style={{ background: colors.bgSecondary }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-sm"
                      style={{ background: s.color }}
                    />
                  </div>
                  <span
                    className="font-mono w-12 text-right text-white"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Regional Footprint */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-4"
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
            >
              <div
                className="font-mono text-xs mb-3 pb-2"
                style={{
                  color: colors.cyan,
                  letterSpacing: '0.1em',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                &#9673; REGIONAL FOOTPRINT
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {regionalData.map(r => (
                  <div
                    key={r.region}
                    className="p-2"
                    style={{
                      background: colors.bgSecondary,
                      borderLeft: `2px solid ${r.color}`,
                    }}
                  >
                    <div style={{ color: colors.textSecondary, fontSize: '0.6rem' }}>{r.region}</div>
                    <div className="font-mono" style={{ color: r.color, fontSize: '0.65rem' }}>
                      {r.detail}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* International */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="p-4"
              style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderLeft: `3px solid ${colors.cyan}`,
              }}
            >
              <div
                className="font-mono text-xs mb-3 pb-2"
                style={{
                  color: colors.cyan,
                  letterSpacing: '0.1em',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                &#9673; INTERNATIONAL INBOUND
              </div>
              <div
                className="relative p-3 mb-2"
                style={{
                  border: `1px solid ${colors.border}`,
                  borderLeft: `3px solid ${statusColors.interest}`,
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-sm font-bold text-white">EUROPA</span>
                  <span className="font-mono text-xs font-bold" style={{ color: colors.orange }}>
                    $84-168K
                  </span>
                </div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  &#127465;&#127466; Heide, Germany &bull; H2 Core Systems &bull; 2-4&times; T-25
                </div>
              </div>
              <div
                className="italic mt-2"
                style={{ fontSize: '0.6rem', color: colors.textSecondary }}
              >
                Website quote request &bull; 3/1/2026
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-3 text-center font-mono"
          style={{
            background: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
            fontSize: '0.6rem',
            color: colors.textSecondary,
            letterSpacing: '0.15em',
          }}
        >
          TOBE ENERGY CORP // CONFIDENTIAL // INVESTOR DATA ROOM // CLASSIFICATION: RESTRICTED // 2026
        </motion.div>
      </div>
    </div>
  );
}
