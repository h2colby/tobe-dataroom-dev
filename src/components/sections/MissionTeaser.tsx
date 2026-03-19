'use client';

import { motion, useReducedMotion } from 'framer-motion';

function MarketStat({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={`font-mono text-4xl md:text-5xl font-bold mb-2 ${
          highlight ? 'text-accent' : 'text-white'
        }`}
      >
        {value}
      </div>
      <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function MissionTeaser() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Market Opportunity"
      className="relative py-12 md:py-16 bg-black overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left content */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6">
              <span className="w-6 h-[2px] bg-accent" />
              The Market
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              THE $226B INDUSTRY
              <br />
              <span className="text-accent">YOU CAN&apos;T ELECTRIFY</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-300">
                Modern industry runs on hydrogen.
              </p>
              <p className="text-gray-500">
                Decarbonizing the foundation of fertilizer, food, and fuel that
                direct electrification cannot touch.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 font-mono text-xs uppercase tracking-wider text-gray-500">
              <span>Fertilizer</span>
              <span className="text-accent">/</span>
              <span>Fuel</span>
              <span className="text-accent">/</span>
              <span>Food</span>
              <span className="text-accent">/</span>
              <span>Pharma</span>
              <span className="text-accent">/</span>
              <span>Steel</span>
            </div>

            <div className="mt-6 mb-8 p-4 border-l-2 border-accent bg-black-card">
              <p className="text-sm text-gray-400">
                These industries consume <span className="text-white">94 million tonnes</span> of
                hydrogen annually — 99% from fossil fuels.
              </p>
            </div>

          </motion.div>

          {/* Right - Market expansion */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                BELOW $2/KG, <span className="text-accent">EVERYTHING CHANGES</span>
              </h3>
              <p className="text-gray-500">
                At cost parity with grey hydrogen, the market doesn&apos;t gradually transition.
                It flips.
              </p>
            </div>

            <div className="bg-black-card border border-white/10 p-6 md:p-8">
              <div className="grid grid-cols-3 gap-4 md:gap-6 items-center">
                <MarketStat value="$226B" label="Current Market" />
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 md:w-12 h-[3px] bg-accent" />
                    <span className="font-mono text-accent text-xl md:text-2xl font-bold">6×</span>
                    <div className="w-8 md:w-12 h-[3px] bg-accent" />
                  </div>
                </div>
                <MarketStat value="$1.4T" label="TAM by 2040" highlight />
              </div>

              {/* Future expansion use cases */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-4">
                  Future expansion markets
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-accent mt-1">→</span>
                    <div>
                      <p className="text-sm text-white font-medium">24/7 Renewables Without Batteries</p>
                      <p className="text-xs text-gray-500">No battery, no problem</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent mt-1">→</span>
                    <div>
                      <p className="text-sm text-white font-medium">AI Data Centers</p>
                      <p className="text-xs text-gray-500">Give GPUs the volts they want</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent mt-1">→</span>
                    <div>
                      <p className="text-sm text-white font-medium">E-Fuels</p>
                      <p className="text-xs text-gray-500">Fossil fuel performance without the emissions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider text-center">
                  Source: McKinsey Hydrogen Council • IEA Net Zero Scenario
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* LCOH Chart */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 md:mt-16"
        >
          <div className="relative bg-black-card border border-white/10 p-4 md:p-6">
            <video
              autoPlay
              muted
              playsInline
              preload="metadata"
              aria-label="Levelized cost of hydrogen comparison chart animation"
              className="w-full h-auto"
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                if (video.duration - video.currentTime <= 0.2) {
                  video.pause();
                }
              }}
            >
              <source src="/videos/LCOH-Chartmovie.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
