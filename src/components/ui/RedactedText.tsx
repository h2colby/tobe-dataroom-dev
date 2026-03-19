'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RedactedTextProps {
  children: string;
  className?: string;
  revealOnHover?: boolean;
  revealOnScroll?: boolean;
  revealDelay?: number;
}

export default function RedactedText({
  children,
  className = '',
  revealOnHover = true,
  revealOnScroll = false,
  revealDelay = 0.5,
}: RedactedTextProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  // Auto-reveal on scroll if enabled
  const shouldReveal = revealOnScroll && isInView;

  return (
    <motion.span
      ref={ref}
      role="button"
      tabIndex={0}
      className={`
        relative inline-block cursor-pointer select-none
        ${className}
      `}
      onMouseEnter={() => revealOnHover && setIsRevealed(true)}
      onMouseLeave={() => revealOnHover && setIsRevealed(false)}
      onClick={() => setIsRevealed(!isRevealed)}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIsRevealed(!isRevealed); } }}
    >
      {/* Redacted background */}
      <motion.span
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: isRevealed || shouldReveal ? 0 : 1,
        }}
        transition={{
          delay: shouldReveal ? revealDelay : 0,
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="absolute inset-0 bg-redaction-black rounded-sm origin-left"
      />

      {/* Text content */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: isRevealed || shouldReveal ? 1 : 0,
        }}
        transition={{
          delay: shouldReveal ? revealDelay + 0.2 : 0.1,
          duration: 0.2,
        }}
        className="relative"
      >
        {children}
      </motion.span>

      {/* Placeholder text (same width) */}
      <span className="invisible" aria-hidden="true">
        {children}
      </span>
    </motion.span>
  );
}
