'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlueprintProps {
  children?: ReactNode;
  title?: string;
  reference?: string;
  className?: string;
}

export default function Blueprint({
  children,
  title,
  reference = 'FIG. 1',
  className = '',
}: BlueprintProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className={`relative bg-blueprint-blue p-6 border-2 border-blueprint-cyan ${className}`}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Title bar */}
      {title && (
        <div className="relative mb-4 pb-2 border-b border-blueprint-cyan/30">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-blueprint-cyan uppercase tracking-wider">
              {reference}
            </span>
            <span className="font-typewriter text-sm text-paper-white uppercase tracking-wider">
              {title}
            </span>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="relative min-h-[200px] flex items-center justify-center">
        {children || <ElectrolyzerDiagram isInView={isInView} />}
      </div>

      {/* Corner markers */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blueprint-cyan" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blueprint-cyan" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blueprint-cyan" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blueprint-cyan" />
    </motion.div>
  );
}

// Default electrolyzer diagram
function ElectrolyzerDiagram({ isInView }: { isInView: boolean }) {
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full max-w-md"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* Main cell container */}
      <motion.rect
        x="100"
        y="50"
        width="200"
        height="150"
        stroke="#00D4FF"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* Membrane */}
      <motion.line
        x1="200"
        y1="50"
        x2="200"
        y2="200"
        stroke="#00D4FF"
        strokeWidth="1"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Anode */}
      <motion.rect
        x="120"
        y="70"
        width="60"
        height="110"
        stroke="#00D4FF"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      />

      {/* Cathode */}
      <motion.rect
        x="220"
        y="70"
        width="60"
        height="110"
        stroke="#00D4FF"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
      />

      {/* H2O input */}
      <motion.path
        d="M50 125 L100 125"
        stroke="#00D4FF"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
      <motion.polygon
        points="95,120 100,125 95,130"
        fill="#00D4FF"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
      />

      {/* H2 output */}
      <motion.path
        d="M300 100 L350 100"
        stroke="#00D4FF"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.4 }}
      />
      <motion.polygon
        points="345,95 350,100 345,105"
        fill="#00D4FF"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      />

      {/* O2 output */}
      <motion.path
        d="M300 150 L350 150"
        stroke="#00D4FF"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.6 }}
      />
      <motion.polygon
        points="345,145 350,150 345,155"
        fill="#00D4FF"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
      />

      {/* Labels */}
      <motion.text
        x="30"
        y="130"
        fill="#00D4FF"
        fontSize="12"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
      >
        H₂O
      </motion.text>
      <motion.text
        x="360"
        y="105"
        fill="#00D4FF"
        fontSize="12"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
      >
        H₂
      </motion.text>
      <motion.text
        x="360"
        y="155"
        fill="#00D4FF"
        fontSize="12"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        O₂
      </motion.text>
      <motion.text
        x="130"
        y="220"
        fill="#00D4FF"
        fontSize="10"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
      >
        ANODE
      </motion.text>
      <motion.text
        x="225"
        y="220"
        fill="#00D4FF"
        fontSize="10"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
      >
        CATHODE
      </motion.text>
    </svg>
  );
}
