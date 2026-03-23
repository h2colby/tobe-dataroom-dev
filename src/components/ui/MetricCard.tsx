'use client';

import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  variant?: 'default' | 'highlight' | 'compact';
  className?: string;
}

export function MetricCard({ label, value, unit, subtitle, variant = 'default', className = '' }: MetricCardProps) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        <p className="mb-0.5 text-[0.65rem] tracking-[0.1em] text-white/40 uppercase font-mono">
          {label}
        </p>
        <p className="text-xl font-bold text-white font-mono">
          {value}
          {unit && <span className="text-xs text-white/40 ml-1">{unit}</span>}
        </p>
        {subtitle && <p className="text-[0.6rem] text-white/40 mt-0.5">{subtitle}</p>}
      </motion.div>
    );
  }

  const isHighlight = variant === 'highlight';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white/[0.02] border rounded p-4 ${
        isHighlight
          ? 'border-[#ff6b35]/20 border-l-2 border-l-[#ff6b35]'
          : 'border-white/10'
      } ${className}`}
    >
      <p className="text-xs tracking-[0.1em] text-white/40 uppercase font-mono mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold font-mono ${isHighlight ? 'text-[#ff6b35]' : 'text-white'}`}
        style={isHighlight ? { textShadow: '0 0 10px rgba(255,107,53,0.5)' } : {}}
      >
        {value}
        {unit && <span className="text-sm text-white/40 ml-1">{unit}</span>}
      </p>
      {subtitle && <p className="text-xs text-white/40 mt-1">{subtitle}</p>}
    </motion.div>
  );
}
