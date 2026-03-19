'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MarginNoteProps {
  children: ReactNode;
  position?: 'left' | 'right';
  style?: 'handwritten' | 'typed' | 'stamp';
  className?: string;
}

export default function MarginNote({
  children,
  position = 'right',
  style = 'handwritten',
  className = '',
}: MarginNoteProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const styleClasses = {
    handwritten: 'font-typewriter italic text-coffee-stain -rotate-2',
    typed: 'font-mono text-ink-faded',
    stamp: 'font-typewriter uppercase text-stamp-red border border-stamp-red px-2 py-1 rotate-1',
  };

  const positionClasses = {
    left: 'lg:-ml-48 lg:text-right',
    right: 'lg:-mr-48 lg:text-left',
  };

  return (
    <motion.aside
      ref={ref}
      initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`
        text-sm my-4
        lg:absolute lg:w-40
        ${position === 'left' ? 'lg:left-0' : 'lg:right-0'}
        ${positionClasses[position]}
        ${styleClasses[style]}
        ${className}
      `}
    >
      {style === 'handwritten' && (
        <span className="mr-1">&ldquo;</span>
      )}
      {children}
      {style === 'handwritten' && (
        <span className="ml-1">&rdquo;</span>
      )}
    </motion.aside>
  );
}
