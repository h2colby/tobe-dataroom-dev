'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ctaStats } from '@/lib/claims';

const benefits = [
  {
    title: 'No Rare Earth Materials',
    desc: '100% commodity materials for reliable supply chains.',
  },
  {
    title: 'Modular Architecture',
    desc: 'Scale by replication, not re-engineering.',
  },
  {
    title: 'American Manufacturing',
    desc: '95% U.S. sourced, built in Oklahoma City.',
  },
];

export default function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Get Started"
      className="relative py-12 md:py-16 overflow-hidden bg-black"
      style={{ zIndex: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-50" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6">
              <span className="w-6 h-[2px] bg-accent" />
              Get Started
              <span className="w-6 h-[2px] bg-accent" />
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              SIZE YOUR SYSTEM
              <br />
              <span className="text-accent">IN 2 MINUTES</span>
            </h2>

            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Get a budgetary quote for your hydrogen production needs.
              No commitment required.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {ctaStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-black-card border border-white/10 p-4 text-center"
              >
                <div className="font-mono text-2xl md:text-3xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Benefits + CTA */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Benefits list */}
            <div className="bg-black-card border border-white/10 p-6">
              <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
                Why TOBE Technology
              </h3>
              <ul className="space-y-4">
                {benefits.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-accent mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="square"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <span className="font-semibold text-white text-sm">
                        {item.title}
                      </span>
                      <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="relative bg-black-card border-2 border-accent/40 p-6 flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />

              <div>
                <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
                  Interactive Calculator
                </h3>
                <p className="text-white font-bold text-lg mb-2">
                  Get Your Budgetary Quote
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Enter your production requirements and receive a detailed system
                  configuration with pricing.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/calculator" className="btn btn-primary w-full group">
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
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <a href="mailto:lou@tobe.energy" className="btn btn-outline w-full">
                  Talk to an Engineer
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
