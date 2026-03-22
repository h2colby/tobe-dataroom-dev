'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavCategory = {
  id: string;
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

const navCategories: NavCategory[] = [
  { id: '01', label: 'OVERVIEW', href: '/' },
  {
    id: '02',
    label: 'BUSINESS',
    items: [
      { label: 'Business Model', href: '/business-model' },
      { label: 'Customers', href: '/customers' },
      { label: 'Financial Model', href: '/financials' },
      { label: 'Tax Credits', href: '/tax-credits' },
    ],
  },
  {
    id: '03',
    label: 'TECHNOLOGY',
    items: [
      { label: 'Overview', href: '/technology' },
      { label: 'Electrolysis Cell', href: '/technology/cell' },
      { label: 'Power Converter', href: '/technology/power-converter' },
      { label: 'Controls', href: '/technology/controls' },
      { label: 'Efficiency & Testing', href: '/technology/efficiency' },
    ],
  },
  {
    id: '04',
    label: 'PEOPLE & PROJECTS',
    items: [
      { label: 'NODE-01', href: '/projects/node-01' },
      { label: 'Zeeco ARC Deployment', href: '/projects/zeeco' },
      { label: 'Validation & Programs', href: '/validation' },
      { label: 'Backed By', href: '/backed-by' },
      { label: 'Team', href: '/team' },
    ],
  },
  {
    id: '05',
    label: 'DOCUMENTS',
    href: '/documents',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [expandedNav, setExpandedNav] = useState<Set<string>>(() => {
    // Auto-expand all categories by default
    const initial = new Set<string>();
    for (const cat of navCategories) {
      if (cat.items) {
        initial.add(cat.id);
      }
    }
    return initial;
  });

  const toggleCategory = (id: string) => {
    setExpandedNav((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isActive = (href: string) => pathname === href;
  const isSubActive = (href: string) => pathname === href;

  return (
    <nav className="flex w-[240px] shrink-0 flex-col border-r border-white/5 bg-[#0a0a0f]/80 py-5 font-mono">
      <div className="mb-2 px-5 text-[0.65rem] font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
        SYSTEM MODULES
      </div>
      {navCategories.map((cat, catIdx) => {
        const active = cat.href ? isActive(cat.href) : false;
        const hovered = hoveredNav === cat.id;
        const expanded = expandedNav.has(cat.id);
        const hasItems = !!cat.items;
        const isLastCat = catIdx === navCategories.length - 1;
        const catBranch = isLastCat ? '└──' : '├──';

        return (
          <div key={cat.id}>
            {hasItems ? (
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                onMouseEnter={() => setHoveredNav(cat.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`group flex w-full items-center px-4 py-2 text-left text-[0.875rem] tracking-[0.05em] transition-all ${
                  hovered
                    ? 'bg-[#00d4ff]/8 text-[#00d4ff]'
                    : 'text-[#b0b0bc]'
                }`}
              >
                <span className="mr-1.5 text-[0.7rem] text-[#5a5a6a]">
                  {catBranch}
                </span>
                <span className="mr-1.5 text-[0.65rem] text-[#6a6a7a]">
                  {expanded ? '▾' : '▸'}
                </span>
                <span className="mr-2 text-[#6a6a7a]">{cat.id}</span>
                {cat.label}
              </button>
            ) : (
              <Link
                href={cat.href!}
                onMouseEnter={() => setHoveredNav(cat.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`group flex items-center px-4 py-2 text-[0.875rem] tracking-[0.05em] transition-all ${
                  active
                    ? 'bg-[#ff6b35]/12 text-[#ff6b35] font-bold'
                    : hovered
                      ? 'bg-[#00d4ff]/8 text-[#00d4ff]'
                      : 'text-[#b0b0bc]'
                }`}
              >
                <span
                  className={`mr-1.5 text-[0.7rem] ${active ? 'text-[#ff6b35]/50' : 'text-[#5a5a6a]'}`}
                >
                  {catBranch}
                </span>
                {active && (
                  <span className="mr-1 text-[#ff6b35]">{'>'}</span>
                )}
                <span
                  className={`mr-2 ${active ? 'text-[#ff6b35]/70' : 'text-[#6a6a7a]'}`}
                >
                  {cat.id}
                </span>
                {cat.label}
                {active && (
                  <span className="ml-1 animate-blink text-[#ff6b35]">
                    █
                  </span>
                )}
              </Link>
            )}

            {hasItems && expanded && (
              <div className="overflow-hidden">
                {cat.items!.map((item, i) => {
                  const subHovered = hoveredNav === `${cat.id}-${i}`;
                  const subActive = isSubActive(item.href);
                  const isLastItem = i === cat.items!.length - 1;
                  const vertLine = isLastCat ? ' ' : '│';
                  const subBranch = isLastItem ? '└──' : '├──';
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onMouseEnter={() =>
                        setHoveredNav(`${cat.id}-${i}`)
                      }
                      onMouseLeave={() => setHoveredNav(null)}
                      className={`group flex items-center py-1.5 pl-9 pr-4 text-[0.825rem] tracking-[0.03em] transition-all ${
                        subActive
                          ? 'bg-[#ff6b35]/12 text-[#ff6b35] font-bold'
                          : subHovered
                            ? 'bg-[#00d4ff]/8 text-[#00d4ff]'
                            : 'text-[#9a9ab0]'
                      }`}
                    >
                      <span
                        className={`mr-1.5 text-[0.65rem] ${subActive ? 'text-[#ff6b35]/40' : 'text-[#4a4a5a]'}`}
                      >
                        {vertLine} {subBranch}
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
