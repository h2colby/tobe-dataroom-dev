'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import HeroVideo from '@/components/ui/HeroVideo';
import { claims, heroStats } from '@/lib/claims';

// Technical grid overlay - subtle, industrial
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 107, 53, 1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 107, 53, 1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

// Corner registration marks - like technical drawings
function CornerMarks() {
  return (
    <>
      {/* Top left */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-accent opacity-40" />
      {/* Top right */}
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-accent opacity-40" />
      {/* Bottom left */}
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-accent opacity-40" />
      {/* Bottom right */}
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-accent opacity-40" />
    </>
  );
}

// Stat pill component - monospace, technical
function StatPill({
  value,
  label,
  delay = 0
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="border-l-2 border-accent pl-4 py-1"
    >
      <div className="font-mono text-2xl md:text-3xl font-bold text-accent tracking-tight">
        {value}
      </div>
      <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 mt-1">
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
  };

  return (
    <section
      aria-label="TOBE Energy Hero - Isothermal Electrolysis Technology"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Hero video background - fixed position, renders behind everything */}
      <HeroVideo opacity={0.5} />

      {/* Grid overlay */}
      <GridOverlay />

      {/* Corner marks */}
      <CornerMarks />

      {/* Accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

      {/* Content */}
      <div className="container relative z-10 py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Classification label */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
              <span className="w-6 h-[2px] bg-accent" />
              Electrolyzer Technology
            </span>
          </motion.div>

          {/* Main headline - Technology first */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-6"
          >
            ISOTHERMAL
            <br />
            ELECTROLYSIS.
            <br />
            <span className="text-accent">{claims.efficiency} EFFICIENCY.</span>
          </motion.h1>

          {/* Subtitle - technical but clear */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed font-mono"
          >
            Pulsed waveform architecture eliminates waste heat.
            No platinum. No iridium. No compromise on performance.
            Industrial-grade hydrogen production at unprecedented efficiency.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          >
            <Link href="/calculator" className="btn btn-primary group">
              <span>Size Your System</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link href="/technology" className="btn btn-outline">
              Technical Specifications
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {heroStats.map((stat, index) => (
                <StatPill
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Source citation */}
          <motion.div
            variants={itemVariants}
            className="mt-8 font-mono text-[10px] uppercase tracking-wider text-gray-600"
          >
            {claims.taglines.technical}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
