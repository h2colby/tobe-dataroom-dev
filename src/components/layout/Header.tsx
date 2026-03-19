'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const navLinks = [
  { href: '/technology', label: 'Technology' },
  { href: '/mission', label: 'Mission' },
  { href: '/whitepapers', label: 'Whitepapers' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.svg"
              alt="TOBE.ENERGY"
              width={180}
              height={24}
              className="h-6 md:h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link href="/calculator" className="btn btn-primary text-sm py-2 px-4">
              Price a System
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              animate={shouldReduceMotion
                ? undefined
                : mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white origin-center"
              style={shouldReduceMotion && mobileMenuOpen ? { transform: 'rotate(45deg) translateY(6px)' } : undefined}
            />
            <motion.span
              animate={shouldReduceMotion
                ? undefined
                : mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white"
              style={shouldReduceMotion && mobileMenuOpen ? { opacity: 0 } : undefined}
            />
            <motion.span
              animate={shouldReduceMotion
                ? undefined
                : mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white origin-center"
              style={shouldReduceMotion && mobileMenuOpen ? { transform: 'rotate(-45deg) translateY(-6px)' } : undefined}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
            className="md:hidden overflow-hidden bg-black border-t border-white/5"
          >
            <nav className="container py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={shouldReduceMotion ? false : { x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg font-medium text-gray-300 hover:text-accent py-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={shouldReduceMotion ? false : { x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
                className="pt-4"
              >
                <Link
                  href="/calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Price a System
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
