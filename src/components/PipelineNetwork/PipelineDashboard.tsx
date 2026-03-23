'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  opportunities, 
  statusColors, 
  statusLabels, 
  pipelineStats, 
  type Opportunity, 
  type OpportunityStatus 
} from './pipelineData';

// Calculate sector totals
const sectorTotals = opportunities.reduce((acc, opp) => {
  const vertical = opp.vertical;
  const value = opp.value ? parseFloat(opp.value.replace(/[^0-9.]/g, '')) || 0 : 0;
  acc[vertical] = (acc[vertical] || 0) + value;
  return acc;
}, {} as Record<string, number>);

const sectorData = [
  { name: 'Transit', value: 19, color: '#ffcc00' },
  { name: 'Industrial', value: 12, color: '#ff6b35' },
  { name: 'Steel', value: 7, color: '#3b82f6' },
  { name: 'E-Fuels', value: 6, color: '#22c55e' },
  { name: 'Mobility', value: 3, color: '#eab308' },
];

const maxSectorValue = Math.max(...sectorData.map(s => s.value));

// Node positions - distance from center represents deal stage
const getNodePosition = (opp: Opportunity, index: number): { x: number; y: number } => {
  const centerX = 400;
  const centerY = 220;

  const distanceByStatus: Record<OpportunityStatus, number> = {
    contracted: 60,
    loi: 120,
    quoting: 180,
    interest: 230,
  };
  
  const baseDistance = distanceByStatus[opp.status];
  
  const angleMap: Record<string, number> = {
    'cardinal': -90,
    'refinery': -35,
    'forge': -145,
    'campus': -55,
    'scholar': 95,
    'transit': 200,
    'phoenix': 175,
    'forge-steel': 20,
    'vault': 215,
    'horizon': -15,
    'titan': 45,
    'europa': 70,
  };
  
  const angle = (angleMap[opp.id] ?? index * 30) * (Math.PI / 180);
  
  return {
    x: Math.round(centerX + Math.cos(angle) * baseDistance),
    y: Math.round(centerY + Math.sin(angle) * baseDistance),
  };
};

const getNodeSize = (opp: Opportunity): number => {
  if (!opp.value) return 8;
  const value = opp.value.replace(/[^0-9.]/g, '');
  const num = parseFloat(value) || 0;
  if (num >= 10) return 16;
  if (num >= 5) return 13;
  if (num >= 1) return 10;
  return 8;
};

// Sort opportunities by value for sidebar
const sortedOpportunities = [...opportunities].sort((a, b) => {
  const aVal = a.value ? parseFloat(a.value.replace(/[^0-9.]/g, '')) || 0 : 0;
  const bVal = b.value ? parseFloat(b.value.replace(/[^0-9.]/g, '')) || 0 : 0;
  return bVal - aVal;
}).slice(0, 7); // Top 7

export function PipelineDashboard() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const centerX = 400;
  const centerY = 220;
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 lg:p-6">
      {/* Grid background */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="max-w-[1600px] mx-auto relative">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-[#12121a] border border-[#2a2a3a] border-l-4 border-l-[#ff6b35] mb-6">
          <div>
            <h1 className="font-mono text-lg sm:text-xl font-bold tracking-wide">
              TOBE ENERGY // PIPELINE COMMAND
            </h1>
            <p className="font-mono text-[10px] sm:text-xs text-[#ff6b35] tracking-widest mt-1">
              HYDROGEN INFRASTRUCTURE DEPLOYMENT TRACKER
            </p>
          </div>
          <div className="text-right font-mono text-xs text-gray-500">
            <div className="text-[#ff6b35] animate-pulse">◉ LIVE</div>
            <div>UPDATED: {new Date().toLocaleDateString()}</div>
          </div>
        </header>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'TOTAL PIPELINE', value: '$100M+', color: 'orange' },
            { label: 'SIGNED / LOI', value: '$20M+', color: 'green' },
            { label: 'ACTIVE QUOTES', value: '$32M', color: 'yellow' },
            { label: 'SCALE POTENTIAL', value: '$75M', color: 'purple' },
            { label: 'OPPORTUNITIES', value: '12', color: 'cyan' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#1a1a24] border border-[#2a2a3a] p-4 relative`}
            >
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ 
                  backgroundColor: stat.color === 'orange' ? '#ff6b35' :
                    stat.color === 'green' ? '#ff6b35' :
                    stat.color === 'yellow' ? '#ffcc00' :
                    stat.color === 'purple' ? '#ff6b35' : '#ff6b35'
                }}
              />
              <div className="font-mono text-[10px] text-gray-500 tracking-wider mb-2">
                {stat.label}
              </div>
              <div 
                className="font-mono text-xl sm:text-2xl font-bold"
                style={{ 
                  color: stat.color === 'orange' ? '#ff6b35' :
                    stat.color === 'green' ? '#ff6b35' :
                    stat.color === 'yellow' ? '#ffcc00' :
                    stat.color === 'purple' ? '#ff6b35' : '#ff6b35'
                }}
              >
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Network Visualization */}
          <div className="bg-[#1a1a24] border border-[#2a2a3a] p-4 relative min-h-[500px]">
            {/* Map Header */}
            <div className="flex flex-wrap justify-between items-center pb-3 mb-4 border-b border-[#2a2a3a]">
              <span className="font-mono text-xs tracking-wider">◉ GEOGRAPHIC DISTRIBUTION — CONTINENTAL US</span>
              <div className="flex gap-4 text-[10px] mt-2 sm:mt-0">
                {Object.entries(statusLabels).map(([status, label]) => (
                  <div key={status} className="flex items-center gap-1.5">
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: statusColors[status as OpportunityStatus] }}
                    />
                    <span className="text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* SVG Network */}
            <svg viewBox="0 0 800 520" className="w-full h-auto">
              {/* Distance rings */}
              {[70, 130, 190, 240].map((r, i) => (
                <motion.circle
                  key={r}
                  cx={centerX}
                  cy={centerY}
                  r={r}
                  fill="none"
                  stroke="#2a2a3a"
                  strokeWidth={1}
                  strokeDasharray="4 6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
              
              {/* Oklahoma cluster */}
              <motion.ellipse
                cx={centerX}
                cy={centerY - 50}
                rx={110}
                ry={85}
                fill="rgba(255, 107, 53, 0.03)"
                stroke="#ff6b35"
                strokeWidth={1}
                strokeDasharray="6 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
              />
              <text
                x={centerX}
                y={centerY + 50}
                textAnchor="middle"
                className="font-mono text-[9px] fill-[#ff6b35]"
              >
                OKLAHOMA CLUSTER
              </text>
              
              {/* Connection lines */}
              {opportunities.map((opp, index) => {
                const pos = getNodePosition(opp, index);
                const isActive = hoveredId === opp.id;
                
                return (
                  <motion.line
                    key={`line-${opp.id}`}
                    x1={centerX}
                    y1={centerY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={statusColors[opp.status]}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={isActive ? 0.8 : 0.3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                  />
                );
              })}
              
              {/* HQ Node */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r={40}
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth={1}
                  animate={{ r: [40, 45, 40], opacity: [0.3, 0.15, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <circle cx={centerX} cy={centerY} r={30} fill="none" stroke="#ff6b35" strokeWidth={2} />
                <circle cx={centerX} cy={centerY} r={22} fill="#0a0a0f" stroke="#ff6b35" strokeWidth={2} />
                <text x={centerX} y={centerY + 4} textAnchor="middle" className="font-mono text-sm font-bold fill-[#ff6b35]">
                  HQ
                </text>
              </motion.g>
              
              {/* Opportunity nodes */}
              {opportunities.map((opp, index) => {
                const pos = getNodePosition(opp, index);
                const size = getNodeSize(opp);
                const isHovered = hoveredId === opp.id;
                
                return (
                  <motion.g
                    key={opp.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.15 : 1 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    onMouseEnter={() => setHoveredId(opp.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Glow */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size + 6}
                      fill="none"
                      stroke={statusColors[opp.status]}
                      strokeWidth={2}
                      opacity={isHovered ? 0.6 : 0.2}
                      animate={{ r: [size + 4, size + 8, size + 4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Main circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size}
                      fill={statusColors[opp.status]}
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth={2}
                    />
                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y - size - 8}
                      textAnchor="middle"
                      className="font-mono text-[9px] font-semibold fill-white"
                    >
                      {opp.codename}
                    </text>
                    {/* Value */}
                    {opp.value && (
                      <text
                        x={pos.x}
                        y={pos.y + size + 12}
                        textAnchor="middle"
                        className="font-mono text-[8px] font-bold"
                        fill={statusColors[opp.status]}
                      >
                        {opp.value}
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </svg>
            
            {/* Hover Tooltip */}
            <AnimatePresence>
              {hoveredId && (() => {
                const opp = opportunities.find(o => o.id === hoveredId);
                if (!opp) return null;
                const pos = getNodePosition(opp, opportunities.indexOf(opp));
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bg-[#12121a] border border-[#2a2a3a] px-4 py-3 rounded shadow-xl z-50"
                    style={{ 
                      left: `${(pos.x / 800) * 100}%`, 
                      top: `${(pos.y / 500) * 100 + 15}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-[#2a2a3a]">
                      <span className="font-mono text-sm font-bold">{opp.codename}</span>
                      <span 
                        className="font-mono text-sm font-bold"
                        style={{ color: statusColors[opp.status] }}
                      >
                        {opp.value || statusLabels[opp.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="font-mono text-[10px] px-2 py-0.5 rounded"
                        style={{ 
                          backgroundColor: `${statusColors[opp.status]}20`,
                          color: statusColors[opp.status]
                        }}
                      >
                        {opp.vertical}
                      </span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-xs text-gray-300">{opp.location}</span>
                    </div>
                    <div className="text-xs text-gray-400">{opp.sector}</div>
                    {opp.capacity && (
                      <div className="text-xs text-gray-500 mt-1">Capacity: {opp.capacity}</div>
                    )}
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
          
          {/* Right Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Top Opportunities */}
            <div className="bg-[#1a1a24] border border-[#2a2a3a] p-4">
              <h3 className="font-mono text-xs tracking-wider text-[#ff6b35] mb-4 pb-2 border-b border-[#2a2a3a]">
                ◉ TOP OPPORTUNITIES BY VALUE
              </h3>
              <div className="space-y-3">
                {sortedOpportunities.map((opp, i) => (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center justify-between p-3 bg-[#12121a] border-l-2"
                    style={{ borderColor: statusColors[opp.status] }}
                  >
                    <div>
                      <div className="font-mono text-sm font-bold">{opp.codename}</div>
                      <div className="text-[10px] text-gray-500">
                        {opp.location} • {opp.sector}
                      </div>
                    </div>
                    <div 
                      className="font-mono text-sm font-bold"
                      style={{ color: statusColors[opp.status] }}
                    >
                      {opp.value || (opp.status === 'contracted' ? '✓ CONTRACTED' : '—')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Sector Breakdown */}
            <div className="bg-[#1a1a24] border border-[#2a2a3a] p-4">
              <h3 className="font-mono text-xs tracking-wider text-[#ff6b35] mb-4 pb-2 border-b border-[#2a2a3a]">
                ◉ PIPELINE BY SECTOR
              </h3>
              <div className="space-y-3">
                {sectorData.map((sector, i) => (
                  <motion.div
                    key={sector.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="font-mono text-[10px] w-20 text-gray-500 uppercase">
                      {sector.name}
                    </span>
                    <div className="flex-1 h-2 bg-[#12121a] rounded overflow-hidden">
                      <motion.div
                        className="h-full rounded"
                        style={{ backgroundColor: sector.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(sector.value / maxSectorValue) * 100}%` }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                      />
                    </div>
                    <span className="font-mono text-xs w-12 text-right" style={{ color: sector.color }}>
                      ${sector.value}M
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center font-mono text-[10px] text-gray-600 tracking-widest">
          TOBE ENERGY CORP // CONFIDENTIAL // INVESTOR DATA ROOM // 2026
        </div>
      </div>
    </div>
  );
}
