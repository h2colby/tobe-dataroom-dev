'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="font-mono text-[0.65rem] tracking-[0.1em] text-[#8a8a9a] hover:text-[#ff6b35] transition-colors cursor-pointer"
    >
      LOGOUT
    </button>
  );
}
