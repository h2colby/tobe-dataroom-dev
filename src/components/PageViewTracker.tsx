'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const DEBOUNCE_MS = 5000;

export function PageViewTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<{ slug: string; time: number }>({ slug: '', time: 0 });

  useEffect(() => {
    // Skip tracking for admin, login, join pages
    if (pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/join')) {
      return;
    }

    const now = Date.now();
    if (lastTracked.current.slug === pathname && now - lastTracked.current.time < DEBOUNCE_MS) {
      return;
    }

    lastTracked.current = { slug: pathname, time: now };

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_slug: pathname }),
    }).then((res) => {
      // If session is revoked, the track endpoint returns 401 — redirect to login
      if (res.status === 401) {
        window.location.href = '/login';
      }
    }).catch(() => {
      // Silently fail — tracking shouldn't break the app
    });
  }, [pathname]);

  return null;
}
