'use client';

import Link from 'next/link';

/* ── Helpers ──────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div className="my-4 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
      <span className="font-mono text-xs tracking-[0.3em] text-[#ff6b35]/30"
        style={{ textShadow: '0 0 8px rgba(255,107,53,0.15)' }}>═══════</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent" />
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────── */

const investors = [
  {
    name: 'Cortado Ventures',
    tag: 'LEAD INVESTOR',
    tagColor: '#ff6b35',
    borderColor: '#ff6b35',
    amount: '$1.8M',
    amountLabel: 'PRE-SEED',
    description: "Oklahoma's leading deep-tech VC. Focus on energy, aerospace, and advanced manufacturing.",
    url: 'https://cortado.ventures',
  },
  {
    name: '46 Ventures',
    tag: 'INVESTOR',
    tagColor: '#ff6b35',
    borderColor: '#ff6b35',
    amount: null,
    amountLabel: null,
    description: 'Administers Hurricane Ventures (University of Tulsa). Early-stage technology investor.',
    url: 'https://46vc.com',
  },
  {
    name: 'Wavefunction Capital',
    tag: 'INVESTOR',
    tagColor: '#ff6b35',
    borderColor: '#ff6b35',
    amount: null,
    amountLabel: null,
    description: 'Deep-tech venture capital focused on frontier science and engineering.',
    url: 'https://www.wavefunction.vc',
  },
  {
    name: 'Techstars NYC',
    tag: 'ACCELERATOR + INVESTOR',
    tagColor: 'rgba(255,255,255,0.7)',
    borderColor: 'rgba(255,255,255,0.6)',
    amount: 'FOLLOW-ON',
    amountLabel: 'INVESTMENT',
    description: 'Spring 2025 cohort. Top-tier global accelerator with 3,000+ portfolio companies. Significant follow-on investment beyond standard program terms.',
    url: 'https://www.techstars.com',
  },
];

const pressArticles = [
  {
    outlet: 'CleanTechnica',
    date: 'Jan 2026',
    title: 'A Green Hydrogen Innovator In Oklahoma Has A Message For Texas: Hold My Beer',
    url: 'https://cleantechnica.com/2026/01/01/a-green-hydrogen-innovator-in-oklahoma-has-a-message-for-texas-hold-my-beer/',
    featured: true,
  },
  {
    outlet: 'Chemical Engineering',
    date: '2025',
    title: 'TOBE Energy Novel Electrolyzer Reshapes Power Conversion and Efficiency for Green Hydrogen Production',
    url: 'https://www.chemengonline.com/tobe-energy-novel-electrolyzer-reshapes-power-conversion-and-efficiency-for-green-hydrogen-production/',
  },
  {
    outlet: 'The Journal Record',
    date: 'Nov 2025',
    title: 'Tulsa Startup TOBE Energy',
    url: 'https://journalrecord.com/2025/11/05/tulsa-startup-tobe-energy/',
  },
  {
    outlet: 'KTUL News',
    date: '2025',
    title: 'Tulsa Emerges as a Clean Energy Hub With New Hydrogen Pilot Project by Local Firms',
    url: 'https://ktul.com/news/local/tulsa-emerges-as-a-clean-energy-hub-with-new-hydrogen-pilot-project-by-local-firms',
  },
  {
    outlet: 'Renewables Now',
    date: '2025',
    title: 'University of Tulsa Invests in Electrolysis Start-up TOBE Energy',
    url: 'https://renewablesnow.com/news/university-of-tulsa-invests-in-electrolysis-start-up-tobe-energy-1287314/',
  },
  {
    outlet: 'PR Newswire',
    date: '2025',
    title: "UTulsa's Hurricane Ventures Announces Investment in TOBE Energy",
    url: 'https://www.prnewswire.com/news-releases/utulsas-hurricane-ventures-announces-investment-in-tobe-energy-302649084.html',
  },
  {
    outlet: 'FuelCellsWorks',
    date: 'Sep 2025',
    title: 'Cortado Ventures Leads $1.8M Investment in Green Hydrogen Pioneer TOBE Energy',
    url: 'https://fuelcellsworks.com/2025/09/10/h2/cortado-ventures-leads-1-8m-investment-in-green-hydrogen-pioneer-tobe-energy',
  },
  {
    outlet: 'ChemAnalyst',
    date: '2025',
    title: 'UTulsa-backed Hurricane Ventures Invests in Clean Hydrogen Startup',
    url: 'https://www.chemanalyst.com/NewsAndDeals/NewsDetails/utulsa-backed-hurricane-ventures-invests-in-clean-hydrogen-startup-40578',
  },
  {
    outlet: 'EnergyNews.pro',
    date: '2025',
    title: 'TOBE Energy Secures Funding to Scale Up Membrane-free Electrolyser',
    url: 'https://energynews.pro/en/tobe-energy-secures-funding-to-scale-up-membrane-free-electrolyser/',
  },
  {
    outlet: 'TEDx',
    date: '2024',
    title: 'How Hydrogen Could Change Everything — Colby DeWeese',
    url: 'https://www.youtube.com/watch?v=VcGogXRBr1o',
  },
];

/* ── Page ──────────────────────────────────────────────── */

export default function ProofPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── PROOF ───┐
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Who&apos;s Behind{' '}
            <span className="text-[#ff6b35]" style={{ textShadow: '0 0 15px rgba(255,107,53,0.4)' }}>
              This.
            </span>
          </h1>
          <div className="max-w-2xl border-l-2 border-[#ff6b35]/50 pl-6">
            <p className="font-sans text-lg leading-relaxed text-white/70">
              Investors, institutions, press, and professional networks.
              The receipts.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">

        {/* ═══ INVESTORS ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── BACKED BY ───┐
          </div>
          <p className="mb-6 font-sans text-[0.95rem] text-white/50">
            $1.8M pre-seed led by Cortado Ventures. Backed by institutional VCs, a top-tier accelerator, and angels from across energy, tech, and climate.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {investors.map((inv) => (
              <a
                key={inv.name}
                href={inv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[220px] flex-col border-l-[3px] bg-[#12121a] px-5 py-6 transition-all hover:bg-[#16161f]"
                style={{
                  borderLeftColor: inv.borderColor,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div className="mb-2 text-[0.6rem] tracking-[0.18em]" style={{ color: inv.tagColor }}>
                  {inv.tag}
                </div>
                <h3 className="mb-1 text-xl font-bold tracking-tight text-white">
                  {inv.name}
                </h3>
                {inv.amount && (
                  <div className="mb-3">
                    <span className="text-xl font-bold text-[#ff6b35]"
                      style={{ textShadow: '0 0 10px rgba(255,107,53,0.3)' }}>
                      {inv.amount}
                    </span>
                    {inv.amountLabel && (
                      <span className="ml-2 text-[0.6rem] tracking-[0.1em] text-[#8a8a9a]">
                        {inv.amountLabel}
                      </span>
                    )}
                  </div>
                )}
                <p className="mt-auto font-sans text-[0.85rem] leading-relaxed text-[#8a8a9a]">
                  {inv.description}
                </p>
                <div className="mt-3 text-[0.55rem] tracking-[0.1em] text-[#ff6b35]/40">
                  {inv.url.replace('https://', '').replace('www.', '')} ↗
                </div>
              </a>
            ))}
          </div>

          {/* Angels */}
          <div className="mt-4 border-l-[3px] border-[#ff6b35] bg-[#12121a] px-5 py-5"
            style={{ borderTop: '1px solid rgba(255,107,53,0.06)', borderRight: '1px solid rgba(255,107,53,0.06)', borderBottom: '1px solid rgba(255,107,53,0.06)' }}>
            <div className="mb-2 text-[0.6rem] tracking-[0.18em] text-[#ff6b35]">ANGELS & ADVISORS</div>
            <p className="font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
              Our angel syndicate includes university professors, technology executives, early Waymo team members, and dedicated climate investors — people who understand both the technology and the market.
            </p>
          </div>

          {/* Cap table link */}
          <Link href="/financials"
            className="mt-4 group flex items-center justify-between border border-white/10 bg-[#12121a] px-5 py-4 transition-all hover:border-[#ff6b35]/30 hover:bg-[#14141e]">
            <div>
              <p className="text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">VIEW FULL CAP TABLE</p>
              <p className="mt-1 font-sans text-xs text-white/40">Ownership structure, SAFE terms, and post-seed pro forma.</p>
            </div>
            <span className="text-xl text-[#ff6b35]/50 transition-all group-hover:text-[#ff6b35] group-hover:translate-x-1">→</span>
          </Link>
        </section>

        <SectionDivider />

        {/* ═══ THIRD-PARTY VALIDATION ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── THIRD-PARTY VALIDATION ───┐
          </div>

          <div className="space-y-3">
            {/* OU I-CCEW — featured */}
            <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-6"
              style={{ borderTop: '1px solid rgba(255,107,53,0.1)', borderRight: '1px solid rgba(255,107,53,0.1)', borderBottom: '1px solid rgba(255,107,53,0.1)' }}>
              <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <h3 className="text-xl font-bold text-white">University of Oklahoma, I-CCEW</h3>
                <span className="text-xs tracking-[0.1em] text-[#ff6b35]">Fall 2025</span>
                <span className="rounded-sm bg-[#ff6b35]/10 px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.1em] text-[#ff6b35]">
                  INDEPENDENT VALIDATION
                </span>
              </div>
              <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2">
                <div>
                  <span className="text-xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.25)' }}>$9.81B</span>
                  <span className="ml-2 text-[0.55rem] tracking-[0.1em] text-[#8a8a9a]">SERVICEABLE MARKET</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.25)' }}>$657M</span>
                  <span className="ml-2 text-[0.55rem] tracking-[0.1em] text-[#8a8a9a]">PROJECTED PROFIT</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-[#ff6b35]" style={{ textShadow: '0 0 8px rgba(255,107,53,0.25)' }}>8</span>
                  <span className="ml-2 text-[0.55rem] tracking-[0.1em] text-[#8a8a9a]">SEGMENTS</span>
                </div>
              </div>
              <p className="mb-3 font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
                The Ronnie K. Irani Center for the Creation of Economic Wealth assigned 5 consulting interns to analyze Tobe&apos;s technology, market, and business model over a full semester. Through extensive market analysis and 7 industry expert interviews, they independently identified the serviceable market and projected profit potential by 2033.
              </p>
              <a href="/docs/mkt/case/mkt-case-ou-iccew-report.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-block border border-[#ff6b35]/30 bg-[#ff6b35]/5 px-4 py-2 text-sm tracking-[0.05em] text-[#ff6b35] transition-all hover:border-[#ff6b35]/60 hover:bg-[#ff6b35]/10">
                View Full Report (PDF) →
              </a>
            </div>

            {/* NSF I-Corps */}
            <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="mb-1 flex items-baseline gap-4">
                <h3 className="text-lg font-bold text-white">NSF I-Corps</h3>
                <span className="text-xs tracking-[0.1em] text-[#ff6b35]">2025</span>
              </div>
              <p className="font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
                National Science Foundation customer discovery program. Federal validation of commercial potential.
              </p>
            </div>

            {/* Prof. Weston */}
            <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="mb-1 flex items-baseline gap-4">
                <h3 className="text-lg font-bold text-white">Prof. Javen Weston, UTulsa</h3>
                <span className="text-xs tracking-[0.1em] text-[#ff6b35]">2025–26</span>
              </div>
              <p className="font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
                Sabbatical researcher embedded at Tobe. Mechanical Engineering professor conducting research on electrolysis optimization.
              </p>
            </div>

            {/* UTulsa Physics */}
            <div className="border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="mb-1 flex items-baseline gap-4">
                <h3 className="text-lg font-bold text-white">UTulsa Physics Department</h3>
                <span className="text-xs tracking-[0.1em] text-[#ff6b35]">2025–26</span>
              </div>
              <p className="font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
                Active SBIR collaboration on off-grid, solar-powered remediation of frac water — heated using on-site hydrogen production as part of the treatment process.
              </p>
            </div>

            {/* Oklahoma Manufacturing Alliance */}
            <div className="border-l-[3px] border-white/20 bg-[#12121a] px-6 py-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderRight: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="mb-1 flex items-baseline gap-4">
                <h3 className="text-lg font-bold text-white">Oklahoma Manufacturing Alliance</h3>
                <span className="text-xs tracking-[0.1em] text-white/40">2025–26</span>
              </div>
              <p className="font-sans text-[0.9rem] leading-relaxed text-[#8a8a9a]">
                Manufacturing process optimization and cost reduction partnership.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ MEMBERSHIPS & NETWORKS ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── MEMBERSHIPS & NETWORKS ───┐
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'IEEE', desc: 'Institute of Electrical and Electronics Engineers', color: '#ff6b35' },
              { name: 'AIChE', desc: 'American Institute of Chemical Engineers', color: '#ff6b35' },
              { name: 'Tulsa Renewable Business Alliance', desc: 'Regional clean energy industry coalition', color: '#ff6b35' },
              { name: 'Drone Supply Chain Working Group', desc: 'Defense & industrial UAS supply chain consortium', color: '#ff6b35' },
            ].map((org) => (
              <div key={org.name} className="border-l-[3px] bg-[#12121a] px-5 py-4"
                style={{
                  borderLeftColor: org.color,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                <h3 className="mb-1 text-base font-bold text-white">{org.name}</h3>
                <p className="font-sans text-xs leading-relaxed text-[#8a8a9a]">{org.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ═══ PRESS ═══ */}
        <section className="py-6">
          <div className="mb-6 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── IN THE PRESS ───┐
          </div>

          {/* Featured outlets bar */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border border-white/5 bg-[#12121a] px-4 py-3">
            {['CleanTechnica', 'Chemical Engineering', 'The Journal Record', 'Renewables Now', 'KTUL', 'PR Newswire', 'FuelCellsWorks', 'TEDx'].map((name) => (
              <span key={name} className="text-[0.65rem] tracking-[0.1em] text-white/45 transition-colors hover:text-white/60">
                {name}
              </span>
            ))}
          </div>

          {/* Featured article */}
          <a href={pressArticles[0].url} target="_blank" rel="noopener noreferrer"
            className="mb-4 block border-l-[3px] border-[#ff6b35] bg-[#12121a] px-6 py-6 transition-all hover:bg-[#16161f]"
            style={{ borderTop: '1px solid rgba(255,107,53,0.1)', borderRight: '1px solid rgba(255,107,53,0.1)', borderBottom: '1px solid rgba(255,107,53,0.1)' }}>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-sm bg-[#ff6b35]/10 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.1em] text-[#ff6b35]">FEATURED</span>
              <span className="text-xs text-white/40">{pressArticles[0].outlet}</span>
              <span className="text-[0.6rem] text-white/20">{pressArticles[0].date}</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white transition-colors hover:text-[#ff6b35]">
              &ldquo;{pressArticles[0].title}&rdquo;
            </h3>
            <p className="font-sans text-sm text-[#8a8a9a]">
              In-depth feature on Tobe Energy&apos;s breakthrough electrolyzer technology and Oklahoma&apos;s emerging role in the clean hydrogen economy.
            </p>
          </a>

          {/* Rest of articles */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pressArticles.slice(1).map((article) => (
              <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer"
                className="border border-white/5 bg-[#12121a] px-5 py-4 transition-all hover:border-white/15 hover:bg-[#14141e]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[0.6rem] tracking-[0.1em] text-[#ff6b35]">{article.outlet}</span>
                  <span className="text-[0.55rem] text-white/20">{article.date}</span>
                </div>
                <h4 className="mb-2 text-sm font-bold text-white/80 transition-colors hover:text-[#ff6b35]">
                  {article.title}
                </h4>
                <span className="text-[0.6rem] tracking-[0.05em] text-white/45">Read ↗</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl text-center">
          <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
            {`TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024
CONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
