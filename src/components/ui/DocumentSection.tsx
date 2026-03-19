'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface DocumentSectionProps {
  children: ReactNode;
  id?: string;
  title?: string;
  classification?: string;
  sectionNumber?: string;
  className?: string;
  variant?: 'default' | 'blueprint' | 'aged';
}

export default function DocumentSection({
  children,
  id,
  title,
  classification = 'UNCLASSIFIED',
  sectionNumber,
  className = '',
  variant = 'default',
}: DocumentSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variantClasses = {
    default: 'bg-paper-white',
    blueprint: 'bg-blueprint-blue text-paper-white',
    aged: 'bg-paper-aged',
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        relative py-12 px-6 md:px-12
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {/* Section Header */}
      {(title || sectionNumber) && (
        <div className="mb-8 pb-4 border-b border-current/20">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-baseline gap-4">
              {sectionNumber && (
                <span className="font-mono text-sm text-ink-faded">
                  {sectionNumber}
                </span>
              )}
              {title && (
                <h2 className="font-typewriter text-2xl uppercase tracking-wider">
                  {title}
                </h2>
              )}
            </div>
            <span className="font-mono text-xs uppercase tracking-wider opacity-60">
              {classification}
            </span>
          </div>
        </div>
      )}

      {/* Section Content */}
      <div className="relative">
        {children}
      </div>

      {/* Decorative fold line */}
      <div className="fold-horizontal absolute bottom-0 left-0 right-0" />
    </motion.section>
  );
}
