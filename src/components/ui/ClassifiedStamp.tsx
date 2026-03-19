'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type StampVariant = 'classified' | 'declassified' | 'approved' | 'preliminary' | 'operational' | 'custom';
type StampColor = 'red' | 'blue' | 'black';

interface ClassifiedStampProps {
  variant?: StampVariant;
  text?: string;
  color?: StampColor;
  className?: string;
  delay?: number;
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
}

const stampTexts: Record<StampVariant, string> = {
  classified: 'CLASSIFIED',
  declassified: 'DECLASSIFIED',
  approved: 'APPROVED',
  preliminary: 'PRELIMINARY',
  operational: 'OPERATIONAL',
  custom: '',
};

const colorClasses: Record<StampColor, string> = {
  red: 'text-stamp-red border-stamp-red',
  blue: 'text-blueprint-blue border-blueprint-blue',
  black: 'text-ink-black border-ink-black',
};

const sizeClasses: Record<string, string> = {
  sm: 'text-xs px-2 py-1 border-2',
  md: 'text-sm px-4 py-2 border-3',
  lg: 'text-lg px-6 py-3 border-4',
};

export default function ClassifiedStamp({
  variant = 'declassified',
  text,
  color = 'red',
  className = '',
  delay = 0,
  rotation = -3,
  size = 'md',
}: ClassifiedStampProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const displayText = text || stampTexts[variant];

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 2, rotate: rotation - 10 }}
      animate={
        isInView
          ? {
              opacity: 0.85,
              scale: 1,
              rotate: rotation,
            }
          : {}
      }
      transition={shouldReduceMotion ? { duration: 0 } : {
        delay,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // Spring-like bounce
      }}
      className={`
        inline-block font-typewriter uppercase tracking-[0.15em]
        border-current rounded
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${className}
      `}
      style={{ transformOrigin: 'center center' }}
    >
      {displayText}
    </motion.div>
  );
}
