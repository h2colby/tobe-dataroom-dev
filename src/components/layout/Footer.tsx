'use client';

import Link from 'next/link';
import Image from 'next/image';
import { claims } from '@/lib/claims';

const footerLinks = {
  company: [
    { href: '/technology', label: 'Technology' },
    { href: '/mission', label: 'Mission' },
    { href: '/whitepapers', label: 'Whitepapers' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
  connect: [
    { href: 'https://twitter.com/h2colby', label: 'Twitter' },
    { href: 'https://linkedin.com/company/tobe-energy', label: 'LinkedIn' },
    { href: 'https://www.youtube.com/@Tobe.Energy', label: 'YouTube' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black" style={{ zIndex: 1 }}>
      {/* Top accent line */}
      <div className="h-[2px] bg-accent mb-12" />

      <div className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="TOBE.ENERGY"
                width={180}
                height={24}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
              Industrial-grade hydrogen production at unprecedented efficiency.
              {claims.efficiency} system efficiency. No rare earth materials. Built in America.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                {claims.location}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="square"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Contact
              </h4>
              <a
                href="mailto:founders@tobe.energy"
                className="text-sm text-accent hover:text-white transition-colors"
              >
                founders@tobe.energy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Tobe Energy. All rights reserved.
          </div>
          <div className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
            {claims.taglines.short}
          </div>
        </div>
      </div>
    </footer>
  );
}
