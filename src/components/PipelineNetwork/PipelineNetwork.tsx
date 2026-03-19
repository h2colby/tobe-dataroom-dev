'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { opportunities, statusColors, statusLabels, pipelineStats, type Opportunity, type OpportunityStatus } from './pipelineData';

// Node positions - distance from center represents deal stage
// Closer = more advanced (contracted), farther = earlier stage (interest)
const getNodePosition = (opp: Opportunity, index: number): { x: number; y: number } => {
  const centerX = 450;
  const centerY = 300;
  
  // Distance rings by status
  const distanceByStatus: Record<OpportunityStatus, number> = {
    contracted: 70,
    loi: 140,
    quoting: 200,
    interest: 260,
  };
  
  const baseDistance = distanceByStatus[opp.status];
  
  // Angle distribution - spread out to avoid overlaps
  const angleMap: Record<string, number> = {
    'cardinal': -90,      // straight up (closest, contracted)
    'refinery': -35,      // OK cluster - spread right
    'forge': -145,        // OK cluster - spread left
    'campus': -55,        // OK cluster  
    'scholar': 95,        // moved to bottom right area
    'transit': 200,       // southwest
    'phoenix': 175,       // west - left
    'forge-steel': 20,    // east - right
    'vault': 215,         // southwest
    'horizon': -15,       // east side
    'titan': 45,          // southeast
    'europa': 70,         // southeast lower
  };
  
  const angle = (angleMap[opp.id] ?? index * 30) * (Math.PI / 180);
  
  return {
    x: Math.round(centerX + Math.cos(angle) * baseDistance),
    y: Math.round(centerY + Math.sin(angle) * baseDistance),
  };
};

// Node size based on value
const getNodeSize = (opp: Opportunity): number => {
  if (!opp.value) return 8;
  const value = opp.value.replace(/[^0-9.]/g, '');
  const num = parseFloat(value) || 0;
  if (num >= 10) return 18;
  if (num >= 5) return 15;
  if (num >= 1) return 12;
  return 10;
};

interface TooltipProps {
  opportunity: Opportunity;
  position: { x: number; y: number };
}

const Tooltip = ({ opportunity, position }: TooltipProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 10 }}
    className="absolute z-50 pointer-events-none"
    style={{
      left: position.x,
      top: position.y + 30,
      transform: 'translateX(-50%)',
    }}
  >
    <div className="bg-[#12121a] border border-[#2a2a3a] px-4 py-3 rounded shadow-xl min-w-[220px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-[#2a2a3a]">
        <span className="font-mono text-sm font-bold text-white">{opportunity.codename}</span>
        <span 
          className="font-mono text-sm font-bold"
          style={{ color: statusColors[opportunity.status] }}
        >
          {opportunity.value || statusLabels[opportunity.status]}
        </span>
      </div>
      
      {/* Vertical & Location */}
      <div className="flex items-center gap-2 mb-2">
        <span 
          className="font-mono text-[10px] px-2 py-0.5 rounded"
          style={{ 
            backgroundColor: `${statusColors[opportunity.status]}20`,
            color: statusColors[opportunity.status]
          }}
        >
          {opportunity.vertical}
        </span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-300">{opportunity.location}</span>
      </div>
      
      {/* Sector */}
      <div className="text-xs text-gray-400 mb-1">{opportunity.sector}</div>
      
      {/* Capacity if available */}
      {opportunity.capacity && (
        <div className="text-xs text-gray-500">
          <span className="text-gray-600">Capacity:</span> {opportunity.capacity}
        </div>
      )}
      
      {/* Notes */}
      {opportunity.notes && (
        <div className="text-[11px] text-gray-500 mt-2 pt-2 border-t border-[#2a2a3a] italic">
          {opportunity.notes}
        </div>
      )}
    </div>
  </motion.div>
);

interface OpportunityNodeProps {
  opportunity: Opportunity;
  position: { x: number; y: number };
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const OpportunityNode = ({ opportunity, position, index, isHovered, onHover }: OpportunityNodeProps) => {
  const size = getNodeSize(opportunity);
  const color = statusColors[opportunity.status];
  
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isHovered ? 1.2 : 1,
      }}
      transition={{ 
        delay: 0.5 + index * 0.08,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
      }}
      onMouseEnter={() => onHover(opportunity.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow effect */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={size + 8}
        fill="none"
        stroke={color}
        strokeWidth={3}
        opacity={isHovered ? 0.6 : 0.2}
        animate={{
          r: [size + 6, size + 10, size + 6],
          opacity: isHovered ? [0.6, 0.3, 0.6] : [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Main circle */}
      <circle
        cx={position.x}
        cy={position.y}
        r={size}
        fill={color}
        stroke="rgba(255,255,255,0.8)"
        strokeWidth={2}
      />
      
      {/* Label */}
      <text
        x={position.x}
        y={position.y - size - 8}
        textAnchor="middle"
        className="font-mono text-[10px] font-semibold fill-white"
      >
        {opportunity.codename}
      </text>
      
      {/* Value label */}
      {opportunity.value && (
        <text
          x={position.x}
          y={position.y + size + 14}
          textAnchor="middle"
          className="font-mono text-[9px] font-bold"
          fill={color}
        >
          {opportunity.value}
        </text>
      )}
    </motion.g>
  );
};

export function PipelineNetwork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const centerX = 450;
  const centerY = 300;
  
  const hoveredOpp = opportunities.find(o => o.id === hoveredId);
  const hoveredPos = hoveredOpp ? getNodePosition(hoveredOpp, opportunities.indexOf(hoveredOpp)) : null;
  
  return (
    <div className="relative w-full bg-[#0a0a0f] rounded-lg overflow-hidden px-2 sm:px-0">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Radial glow from center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 60%)',
        }}
      />
      
      {/* Header stats */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          <div>
            <h3 className="font-mono text-xs text-[#00d4ff] tracking-widest mb-1">PIPELINE NETWORK</h3>
            <p className="font-mono text-[10px] text-gray-500 hidden sm:block">Real-time opportunity visualization</p>
          </div>
          <div className="flex gap-4 sm:gap-6 flex-wrap">
            <div className="text-left sm:text-right">
              <div className="font-mono text-[9px] sm:text-[10px] text-gray-500 tracking-wider">PIPELINE</div>
              <div className="font-mono text-base sm:text-lg font-bold text-[#ff6b35]">{pipelineStats.totalPipeline}</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-mono text-[9px] sm:text-[10px] text-gray-500 tracking-wider">QUOTES</div>
              <div className="font-mono text-base sm:text-lg font-bold text-[#ffcc00]">{pipelineStats.activeQuotes}</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-mono text-[9px] sm:text-[10px] text-gray-500 tracking-wider">OPPS</div>
              <div className="font-mono text-base sm:text-lg font-bold text-[#00d4ff]">{pipelineStats.opportunities}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SVG Network */}
      <svg viewBox="0 0 900 600" className="w-full h-auto" style={{ minHeight: '400px' }}>
        {/* Distance rings */}
        {[80, 150, 220, 280].map((r, i) => (
          <motion.circle
            key={r}
            cx={centerX}
            cy={centerY}
            r={r}
            fill="none"
            stroke="#2a2a3a"
            strokeWidth={1}
            strokeDasharray="4 6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          />
        ))}
        
        {/* Ring labels */}
        <motion.text
          x={centerX}
          y={centerY - 85}
          textAnchor="middle"
          className="font-mono text-[8px] fill-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
        >
          CONTRACTED
        </motion.text>
        <motion.text
          x={centerX}
          y={centerY - 155}
          textAnchor="middle"
          className="font-mono text-[8px] fill-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
        >
          LOI SIGNED
        </motion.text>
        <motion.text
          x={centerX}
          y={centerY - 225}
          textAnchor="middle"
          className="font-mono text-[8px] fill-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.7 }}
        >
          QUOTING
        </motion.text>
        
        {/* Oklahoma cluster boundary */}
        <motion.ellipse
          cx={centerX}
          cy={centerY - 60}
          rx={130}
          ry={100}
          fill="rgba(255, 107, 53, 0.03)"
          stroke="#ff6b35"
          strokeWidth={1}
          strokeDasharray="6 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
        <motion.text
          x={centerX}
          y={centerY + 55}
          textAnchor="middle"
          className="font-mono text-[9px] fill-[#ff6b35]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        >
          OKLAHOMA CLUSTER
        </motion.text>
        
        {/* Connection lines */}
        {opportunities.map((opp, index) => {
          const pos = getNodePosition(opp, index);
          const color = statusColors[opp.status];
          const isActive = hoveredId === opp.id;
          
          return (
            <motion.line
              key={`line-${opp.id}`}
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              stroke={color}
              strokeWidth={isActive ? 2 : 1}
              opacity={isActive ? 0.8 : 0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isActive ? 0.8 : 0.3 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
            />
          );
        })}
        
        {/* HQ Node */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        >
          {/* Outer pulsing ring */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={45}
            fill="none"
            stroke="#ff6b35"
            strokeWidth={1}
            animate={{
              r: [45, 50, 45],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Inner ring */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r={35}
            fill="none"
            stroke="#ff6b35"
            strokeWidth={2}
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Center */}
          <circle
            cx={centerX}
            cy={centerY}
            r={25}
            fill="#0a0a0f"
            stroke="#ff6b35"
            strokeWidth={2}
          />
          
          {/* HQ text */}
          <text
            x={centerX}
            y={centerY + 4}
            textAnchor="middle"
            className="font-mono text-sm font-bold fill-[#ff6b35]"
          >
            HQ
          </text>
          
          {/* Location label */}
          <text
            x={centerX}
            y={centerY + 65}
            textAnchor="middle"
            className="font-mono text-[9px] fill-gray-500 tracking-wider"
          >
            OKLAHOMA CITY
          </text>
        </motion.g>
        
        {/* Opportunity nodes */}
        {opportunities.map((opp, index) => (
          <OpportunityNode
            key={opp.id}
            opportunity={opp}
            position={getNodePosition(opp, index)}
            index={index}
            isHovered={hoveredId === opp.id}
            onHover={setHoveredId}
          />
        ))}
      </svg>
      
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredOpp && hoveredPos && (
          <Tooltip opportunity={hoveredOpp} position={hoveredPos} />
        )}
      </AnimatePresence>
      
      {/* Legend + Footer - stacked on mobile */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          {Object.entries(statusLabels).map(([status, label]) => (
            <div key={status} className="flex items-center gap-1.5">
              <div 
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-white/50"
                style={{ backgroundColor: statusColors[status as OpportunityStatus] }}
              />
              <span className="font-mono text-[8px] sm:text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] text-gray-600 tracking-wider sm:tracking-widest">
          TOBE ENERGY // CONFIDENTIAL
        </div>
      </div>
    </div>
  );
}
