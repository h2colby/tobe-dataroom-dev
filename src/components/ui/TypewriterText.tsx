'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function TypewriterText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  onComplete,
  showCursor = true,
  as: Component = 'span',
}: TypewriterTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || hasStarted) return;

    if (shouldReduceMotion) {
      setHasStarted(true);
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isInView, hasStarted, text, speed, delay, onComplete, shouldReduceMotion]);

  return (
    <Component ref={ref} className={`${className} inline`}>
      {displayedText}
      {showCursor && !isComplete && !shouldReduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[0.1em] h-[1em] bg-current ml-[0.1em] align-text-bottom"
        />
      )}
    </Component>
  );
}
