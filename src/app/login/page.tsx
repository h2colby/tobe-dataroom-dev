'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(true);
        setPassword('');
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0f] flex items-center justify-center">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[201]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-[202] w-full max-w-md px-6">
        {/* Card */}
        <div className="relative border border-[#ff6b35]/20 bg-[#0a0a0f]/95 p-10">
          {/* Corner marks */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#ff6b35]/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#ff6b35]/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#ff6b35]/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#ff6b35]/40" />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/images/tobe-logo.svg" alt="Tobe Energy" className="h-10" />
          </div>

          {/* Titles */}
          <div className="text-center mb-8">
            <h1 className="font-mono text-2xl tracking-[0.2em] text-[#ff6b35] glow-orange mb-2">
              DATA ROOM
            </h1>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase">
              Restricted Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase mb-2">
                Access Code
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter access code"
                autoFocus
                disabled={loading}
                className="w-full bg-[#0a0a0f] border border-[#ff6b35]/20 px-4 py-3 font-mono text-sm text-white placeholder-[#8a8a9a]/50 focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/30 transition-colors disabled:opacity-50"
              />
            </div>

            {error && (
              <div className="font-mono text-[0.65rem] tracking-[0.2em] text-red-500 text-center uppercase">
                ● Invalid Access Code
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#ff6b35]/10 border border-[#ff6b35]/30 px-4 py-3 font-mono text-[0.75rem] tracking-[0.2em] text-[#ff6b35] uppercase hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="animate-pulse">●</span> Authenticating...
                </span>
              ) : (
                'Access Data Room'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#ff6b35]/10 text-center space-y-2">
            <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a]/60">
              Have an invite link? It will grant you direct access.
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a]/60">
              For investor access, contact{' '}
              <a
                href="mailto:colby@tobe.energy"
                className="text-[#ff6b35]/60 hover:text-[#ff6b35] transition-colors"
              >
                colby@tobe.energy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
