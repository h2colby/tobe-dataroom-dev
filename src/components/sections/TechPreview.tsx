'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import Link from 'next/link';
import { claims } from '@/lib/claims';
import { useRef } from 'react';

// Stacked bar segment type
interface BarSegment {
  percent: number;
  label: string;
  color: string;
  textColor?: string;
}

// Animated stacked horizontal bar component
function StackedBar({
  segments,
  className = '',
  delay = 0
}: {
  segments: BarSegment[];
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {/* Bar container with border */}
      <div
        className="flex h-10 md:h-12 overflow-hidden bg-black-elevated border border-white/5"
        role="img"
        aria-label="Energy allocation breakdown"
      >
        {segments.map((segment, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${segment.percent}%` } : { width: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              duration: 0.8,
              delay: delay + i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={`${segment.color} flex items-center justify-center relative overflow-hidden`}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.6 + i * 0.15 }}
              className={`font-mono text-xs md:text-sm font-bold ${segment.textColor || 'text-white'} whitespace-nowrap`}
            >
              {segment.percent >= 15 ? `${segment.percent}%` : ''}
            </motion.span>
          </motion.div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-y-2 mt-4">
        {segments.map((segment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              duration: 0.4,
              delay: delay + 0.8 + i * 0.1,
            }}
            className={`flex items-center ${i > 0 ? 'ml-6' : ''}`}
          >
            <div className={`w-3 h-3 flex-shrink-0 ${segment.color} mr-1.5`} />
            <span className="text-xs text-gray-400">
              {segment.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Corner marks for industrial aesthetic
function CornerMarks({ color = 'accent' }: { color?: 'accent' | 'gray' }) {
  const borderColor = color === 'accent' ? 'border-accent' : 'border-gray-600';
  const opacity = color === 'accent' ? 'opacity-60' : 'opacity-30';

  return (
    <>
      <div className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 ${borderColor} ${opacity}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 ${borderColor} ${opacity}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 ${borderColor} ${opacity}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 ${borderColor} ${opacity}`} />
    </>
  );
}

export default function TechPreview() {
  const shouldReduceMotion = useReducedMotion();


  return (
    <section
      aria-label="Technology Preview"
      className="relative py-12 md:py-16 bg-black overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 tech-grid" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6">
            <span className="w-6 h-[2px] bg-accent" />
            The Technology
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            THE BIGGEST DROP IN GREEN HYDROGEN COSTS.
            <br />
            <span className="text-accent">IS THIS HYDROGEN&apos;S LED MOMENT?</span>
          </h2>
          <p className="text-lg text-white max-w-2xl">
            The last time a technology became more efficient and cheaper at the same time, we banned the one it replaced <span className="text-white/40">(sorry incandescents)</span>.
          </p>
        </motion.div>

        {/* LCOH Chart Video */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-label="LED Moment — TOBE Energy technology demonstration"
            className="w-full h-auto"
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              if (video.duration - video.currentTime <= 0.2) {
                video.pause();
              }
            }}
          >
            <source src="/deck/LEDMoment.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Conventional */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="group relative bg-black-card border border-white/10 p-6 md:p-8 hover:border-white/20 transition-colors duration-300"
          >
            <CornerMarks color="gray" />

            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Conventional Electrolysis
                </h3>
                <p className="text-gray-500 text-sm font-mono mt-1">The Incandescent Era</p>
              </div>
              <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider px-2 py-1 border border-white/10">
                Legacy
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-500 mb-3">
                Energy allocation
              </p>
              <StackedBar
                delay={0.2}
                segments={[
                  { percent: 40, label: 'Hydrogen produced', color: 'bg-white', textColor: 'text-black' },
                  { percent: 30, label: 'Lost as heat', color: 'bg-red', textColor: 'text-white' },
                  { percent: 30, label: 'Cooling systems', color: 'bg-blue', textColor: 'text-white' },
                ]}
              />
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              60% of input energy wasted. Cooling infrastructure adds cost, complexity, and footprint.
            </p>
          </motion.div>

          {/* TOBE */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative bg-black-card border border-accent/40 p-6 md:p-8 hover:border-accent/60 transition-colors duration-300"
          >
            {/* Top accent bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-0 left-0 w-full h-[3px] bg-accent origin-left"
            />

            <CornerMarks color="accent" />

            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  TOBE
                  <br />
                  Technology
                </h3>
                <p className="text-accent text-sm font-mono mt-1">The LED Moment</p>
              </div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-wider px-2 py-1 border border-accent/40">
                New Standard
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent/70 mb-3">
                Energy allocation
              </p>
              <StackedBar
                delay={0.4}
                segments={[
                  { percent: 92, label: 'Hydrogen produced', color: 'bg-white', textColor: 'text-black' },
                  { percent: 8, label: 'Pumps, controls, other', color: 'bg-gray-600', textColor: 'text-white' },
                ]}
              />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Near-zero heat loss. Runs at {claims.operatingTemp} — no active cooling required.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/technology" className="btn btn-outline group">
            <span>Full Technology Deep-Dive</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Proof pointer */}
          <p className="mt-6 font-mono text-xs text-gray-500">
            Performance claims based on {claims.efficiencyBasis} methodology.{' '}
            <Link href="/whitepapers" className="text-accent hover:text-white transition-colors underline underline-offset-2">
              See our technical whitepapers
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
