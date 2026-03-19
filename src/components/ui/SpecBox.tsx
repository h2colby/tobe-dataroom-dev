'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface Specification {
  label: string;
  value: string;
  unit?: string;
}

interface SpecBoxProps {
  title?: string;
  specs: Specification[];
  className?: string;
  variant?: 'default' | 'blueprint' | 'highlight';
}

export default function SpecBox({
  title,
  specs,
  className = '',
  variant = 'default',
}: SpecBoxProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const variantStyles = {
    default: 'bg-paper-white border-ink-light/30',
    blueprint: 'bg-blueprint-blue border-blueprint-cyan text-paper-white',
    highlight: 'bg-paper-aged border-stamp-red',
  };

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
      className={`
        border-2 p-6
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {title && (
        <div className="mb-4 pb-2 border-b border-current/20">
          <h4 className="font-typewriter text-xs uppercase tracking-[0.2em]">
            {title}
          </h4>
        </div>
      )}

      <div className="space-y-3">
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.1, duration: 0.3 }}
            className="flex items-baseline justify-between gap-4"
          >
            <span className="font-mono text-xs uppercase tracking-wider opacity-70">
              {spec.label}
            </span>
            <span className="font-technical text-lg tabular-nums">
              {spec.value}
              {spec.unit && (
                <span className="text-xs ml-1 opacity-70">{spec.unit}</span>
              )}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-30" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current opacity-30" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current opacity-30" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-30" />
    </motion.div>
  );
}
