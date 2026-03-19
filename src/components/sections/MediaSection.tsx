'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Types
type CoverageCategory = 'all' | 'features' | 'trade' | 'local' | 'press-release';

interface CoverageItem {
  id: string;
  outlet: string;
  title: string;
  url: string;
  date: string;
  category: CoverageCategory;
  description?: string;
  tags?: string[];
  featured?: boolean;
}

// Media coverage data
const coverageItems: CoverageItem[] = [
  {
    id: 'cleantechnica',
    outlet: 'CleanTechnica',
    title: 'A Green Hydrogen Innovator In Oklahoma Has A Message For Texas: Hold My Beer',
    url: 'https://cleantechnica.com/2026/01/01/a-green-hydrogen-innovator-in-oklahoma-has-a-message-for-texas-hold-my-beer/',
    date: 'Jan 1, 2026',
    category: 'features',
    description: 'In-depth feature on TOBE Energy\'s breakthrough electrolyzer technology and Oklahoma\'s emerging role in the clean hydrogen economy.',
    tags: ['Funding', 'Electrolyzer', 'Manufacturing', 'Hydrogen'],
    featured: true,
  },
  {
    id: 'chemeng',
    outlet: 'Chemical Engineering',
    title: 'TOBE Energy Novel Electrolyzer Reshapes Power Conversion and Efficiency for Green Hydrogen Production',
    url: 'https://www.chemengonline.com/tobe-energy-novel-electrolyzer-reshapes-power-conversion-and-efficiency-for-green-hydrogen-production/',
    date: '2025',
    category: 'trade',
    featured: true,
  },
  {
    id: 'journal-record',
    outlet: 'The Journal Record',
    title: 'Tulsa Startup TOBE Energy',
    url: 'https://journalrecord.com/2025/11/05/tulsa-startup-tobe-energy/',
    date: 'Nov 5, 2025',
    category: 'local',
    featured: true,
  },
  {
    id: 'ktul',
    outlet: 'KTUL News',
    title: 'Tulsa Emerges as a Clean Energy Hub With New Hydrogen Pilot Project by Local Firms',
    url: 'https://ktul.com/news/local/tulsa-emerges-as-a-clean-energy-hub-with-new-hydrogen-pilot-project-by-local-firms',
    date: '2025',
    category: 'local',
    featured: true,
  },
  {
    id: 'renewables-now',
    outlet: 'Renewables Now',
    title: 'University of Tulsa Invests in Electrolysis Start-up TOBE Energy',
    url: 'https://renewablesnow.com/news/university-of-tulsa-invests-in-electrolysis-start-up-tobe-energy-1287314/',
    date: '2025',
    category: 'trade',
    featured: true,
  },
  {
    id: 'prnewswire',
    outlet: 'PR Newswire',
    title: 'UTulsa\'s Hurricane Ventures Announces Investment in TOBE Energy',
    url: 'https://www.prnewswire.com/news-releases/utulsas-hurricane-ventures-announces-investment-in-tobe-energy-302649084.html',
    date: '2025',
    category: 'press-release',
  },
  {
    id: 'fuelcellsworks',
    outlet: 'FuelCellsWorks',
    title: 'Cortado Ventures Leads $1.8M Investment in Green Hydrogen Pioneer TOBE Energy',
    url: 'https://fuelcellsworks.com/2025/09/10/h2/cortado-ventures-leads-1-8m-investment-in-green-hydrogen-pioneer-tobe-energy',
    date: 'Sep 10, 2025',
    category: 'trade',
  },
  {
    id: 'chemanalyst',
    outlet: 'ChemAnalyst',
    title: 'UTulsa-backed Hurricane Ventures Invests in Clean Hydrogen Startup',
    url: 'https://www.chemanalyst.com/NewsAndDeals/NewsDetails/utulsa-backed-hurricane-ventures-invests-in-clean-hydrogen-startup-40578',
    date: '2025',
    category: 'trade',
  },
  {
    id: 'energynews',
    outlet: 'EnergyNews.pro',
    title: 'TOBE Energy Secures Funding to Scale Up Membrane-free Electrolyser',
    url: 'https://energynews.pro/en/tobe-energy-secures-funding-to-scale-up-membrane-free-electrolyser/',
    date: '2025',
    category: 'trade',
  },
  {
    id: 'tedx',
    outlet: 'TEDx',
    title: 'How Hydrogen Could Change Everything',
    url: 'https://www.youtube.com/watch?v=VcGogXRBr1o',
    date: '2024',
    category: 'features',
    tags: ['Video', 'Talk'],
  },
];

// Logo data for "As Featured In" strip
const outletLogos = [
  { name: 'CleanTechnica', id: 'cleantechnica' },
  { name: 'Chemical Engineering', id: 'chemeng' },
  { name: 'The Journal Record', id: 'journal-record' },
  { name: 'Renewables Now', id: 'renewables-now' },
  { name: 'KTUL', id: 'ktul' },
  { name: 'PR Newswire', id: 'prnewswire' },
];

// Filter categories
const filterCategories = [
  { value: 'all' as CoverageCategory, label: 'All Coverage' },
  { value: 'features' as CoverageCategory, label: 'Features' },
  { value: 'trade' as CoverageCategory, label: 'Trade Press' },
  { value: 'local' as CoverageCategory, label: 'Local News' },
  { value: 'press-release' as CoverageCategory, label: 'Press Releases' },
];

// Hero feature (CleanTechnica)
function HeroFeature() {
  const shouldReduceMotion = useReducedMotion();
  const heroArticle = coverageItems.find((item) => item.id === 'cleantechnica')!;

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <a
        href={heroArticle.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-black-card border border-white/10 hover:border-accent/40 transition-all duration-300 p-8 md:p-12">
          {/* Outlet badge */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-accent uppercase tracking-wider px-3 py-1 border border-accent/40">
              Featured
            </span>
            <span className="font-mono text-sm text-gray-400">{heroArticle.outlet}</span>
            <span className="text-gray-600">•</span>
            <span className="font-mono text-sm text-gray-500">{heroArticle.date}</span>
          </div>

          {/* Headline */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-accent transition-colors">
            &ldquo;{heroArticle.title}&rdquo;
          </h3>

          {/* Description */}
          {heroArticle.description && (
            <p className="text-gray-400 text-lg mb-6 max-w-3xl">
              {heroArticle.description}
            </p>
          )}

          {/* Tags */}
          {heroArticle.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {heroArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-gray-500 uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-4">
            <span className="btn btn-primary">
              Read Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// Logo strip
function LogoStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <p className="font-mono text-xs text-gray-500 uppercase tracking-[0.2em] text-center mb-8">
        As Featured In
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {outletLogos.map((logo) => (
          <div
            key={logo.id}
            className="text-gray-500 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
          >
            {logo.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Coverage card
function CoverageCard({ item, index }: { item: CoverageItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="block bg-black-card border border-white/10 p-6 hover:border-accent/40 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-accent uppercase tracking-wider">
          {item.outlet}
        </span>
        <span className="font-mono text-xs text-gray-600">{item.date}</span>
      </div>
      <h4 className="text-white font-medium mb-4 group-hover:text-accent transition-colors line-clamp-2">
        {item.title}
      </h4>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span>Read more</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.a>
  );
}

// Coverage grid with filters
function CoverageGrid() {
  const [activeFilter, setActiveFilter] = useState<CoverageCategory>('all');
  const shouldReduceMotion = useReducedMotion();

  // Filter and sort items (featured first, then by date)
  const filteredItems = useMemo(
    () =>
      coverageItems
        .filter((item) => {
          if (activeFilter === 'all') return item.id !== 'cleantechnica'; // Exclude hero
          return item.category === activeFilter && item.id !== 'cleantechnica';
        })
        .sort((a, b) => {
          // Featured items first
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        }),
    [activeFilter]
  );

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterCategories.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
              activeFilter === filter.value
                ? 'border-accent text-accent bg-accent/10'
                : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <CoverageCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

// Main component
export default function MediaSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Media Coverage"
      className="relative py-12 md:py-16 bg-black overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-6">
            <span className="w-6 h-[2px] bg-accent" />
            In The News
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            FEATURED
            <br />
            <span className="text-accent">COVERAGE</span>
          </h2>
        </motion.div>

        {/* Hero feature */}
        <HeroFeature />

        {/* Logo strip */}
        <LogoStrip />

        {/* Coverage grid */}
        <CoverageGrid />
      </div>
    </section>
  );
}
