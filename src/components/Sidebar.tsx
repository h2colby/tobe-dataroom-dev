'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
      { label: 'Comparison', href: '/comparison' },
      { label: 'Business Model', href: '/business-model' },
      { label: 'Financial Model', href: '/financials' },
      { label: 'Customers', href: '/customers' },
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
      { label: 'Efficiency', href: '/technology/efficiency' },
    ],
  },
  {
    id: '04',
    label: 'PROJECTS',
    items: [
      { label: 'NODE-01', href: '/projects/node-01' },
      { label: 'Zeeco ARC', href: '/projects/zeeco' },
    ],
  },
  {
    id: '05',
    label: 'PEOPLE',
    items: [
      { label: 'Proof', href: '/proof' },
      { label: 'Team', href: '/team' },
    ],
  },
  {
    id: '06',
    label: 'DOCUMENTS',
    href: '/documents',
  },
  {
    id: '07',
    label: 'ASK REN',
    href: '#ask-ai',
  },
];

/* ------------------------------------------------------------------ */
/*  SidebarNav — the actual navigation content (shared desktop/mobile) */
/* ------------------------------------------------------------------ */
function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [expandedNav, setExpandedNav] = useState<Set<string>>(() => {
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

  return (
    <>
      <div className="mb-2 px-5 text-[0.65rem] font-bold tracking-[0.2em] text-[#ff6b35] glow-orange">
        SYSTEM MODULES
      </div>
      {navCategories.map((cat, catIdx) => {
        const active = cat.href ? isActive(cat.href) : false;
        const hovered = hoveredNav === cat.id;
        const expanded = expandedNav.has(cat.id);
        const hasItems = !!cat.items;
        const isLastCat = catIdx === navCategories.length - 1;
        const catBranch = isLastCat ? '\u2514\u2500' : '\u251C\u2500';
        const isAskAi = cat.href === '#ask-ai';

        const catContent = (
          <>
            <span className="mr-1.5 text-[0.7rem] text-[#7a7a8a] shrink-0">{catBranch}</span>
            <span className={`mr-2 shrink-0 ${active ? 'text-[#ff6b35]/70' : isAskAi ? 'text-[#8a8a9a]' : 'text-[#8a8a9a]'}`}>{cat.id}</span>
            <span className="truncate">{cat.label}</span>
            {active && <span className="ml-1 animate-blink text-[#ff6b35] shrink-0">{'\u2588'}</span>}
          </>
        );

        return (
          <div key={cat.id}>
            {hasItems ? (
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                onMouseEnter={() => setHoveredNav(cat.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`group flex w-full items-center px-4 py-2 text-left text-[0.825rem] tracking-[0.05em] transition-all ${
                  hovered ? 'bg-[#ff6b35]/8 text-[#ff6b35]' : 'text-[#b0b0bc]'
                }`}
              >
                {catContent}
              </button>
            ) : isAskAi ? (
              <button
                type="button"
                onClick={() => {
                  onNavigate?.();
                  const chatBtn = document.querySelector('[class*="fixed bottom-6 right-6"] button') as HTMLElement;
                  if (chatBtn) chatBtn.click();
                }}
                onMouseEnter={() => setHoveredNav(cat.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`group flex w-full items-center px-4 py-2 text-left text-[0.825rem] tracking-[0.05em] transition-all ${
                  hovered ? 'bg-[#ff6b35]/8 text-[#ff6b35]' : 'text-[#ff6b35]/70'
                }`}
              >
                {catContent}
              </button>
            ) : (
              <Link
                href={cat.href!}
                onClick={() => onNavigate?.()}
                onMouseEnter={() => setHoveredNav(cat.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`group flex items-center px-4 py-2 text-[0.825rem] tracking-[0.05em] transition-all ${
                  active
                    ? 'bg-[#ff6b35]/12 text-[#ff6b35] font-bold'
                    : hovered
                      ? 'bg-[#ff6b35]/8 text-[#ff6b35]'
                      : 'text-[#b0b0bc]'
                }`}
              >
                {catContent}
              </Link>
            )}

            {hasItems && expanded && (
              <div className="overflow-hidden">
                {cat.items!.map((item, i) => {
                  const subHovered = hoveredNav === `${cat.id}-${i}`;
                  const subActive = isActive(item.href);
                  const isLastItem = i === cat.items!.length - 1;
                  const vertLine = isLastCat ? ' ' : '\u2502';
                  const subBranch = isLastItem ? '\u2514\u2500' : '\u251C\u2500';
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => onNavigate?.()}
                      onMouseEnter={() => setHoveredNav(`${cat.id}-${i}`)}
                      onMouseLeave={() => setHoveredNav(null)}
                      className={`group flex items-center py-1.5 pl-9 pr-4 text-[0.775rem] tracking-[0.03em] transition-all ${
                        subActive
                          ? 'bg-[#ff6b35]/12 text-[#ff6b35] font-bold'
                          : subHovered
                            ? 'bg-[#ff6b35]/8 text-[#ff6b35]'
                            : 'text-[#9a9ab0]'
                      }`}
                    >
                      <span className={`mr-1.5 text-[0.6rem] shrink-0 ${subActive ? 'text-[#ff6b35]/40' : 'text-[#7a7a8a]'}`}>
                        {vertLine} {subBranch}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar — desktop static sidebar (hidden on mobile)               */
/* ------------------------------------------------------------------ */
export function Sidebar() {
  return (
    <nav data-sidebar aria-label="Main navigation" className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-white/5 bg-[#0a0a0f]/80 py-5 font-mono overflow-y-auto">
      <SidebarNav />
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileDrawer — slide-out sidebar for small screens                */
/* ------------------------------------------------------------------ */
export function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.nav
            aria-label="Main navigation"
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute left-0 top-0 flex h-full w-[240px] flex-col border-r border-white/5 bg-[#0a0a0f] py-5 font-mono overflow-y-auto"
          >
            <SidebarNav onNavigate={onClose} />
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
