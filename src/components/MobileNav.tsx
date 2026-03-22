'use client';

import { useState, useCallback } from 'react';
import { MobileDrawer } from '@/components/Sidebar';

/**
 * Hamburger button + mobile drawer.
 * Rendered only on mobile (md:hidden) via Tailwind classes.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      {/* Hamburger / close button — visible only below md */}
      <button
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={handleToggle}
        className="fixed left-4 top-[14px] z-[70] flex h-[24px] w-[24px] flex-col items-center justify-center gap-[4px] md:hidden"
      >
        <span
          className={`block h-[2px] w-[18px] rounded-full bg-[#ff6b35] transition-all duration-200 ${
            isOpen ? 'translate-y-[6px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-[2px] w-[18px] rounded-full bg-[#ff6b35] transition-all duration-200 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-[2px] w-[18px] rounded-full bg-[#ff6b35] transition-all duration-200 ${
            isOpen ? '-translate-y-[6px] -rotate-45' : ''
          }`}
        />
      </button>

      {/* Mobile drawer overlay */}
      <MobileDrawer isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
