'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;

  const [valid, setValid] = useState<boolean | null>(null);
  const [label, setLabel] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firm, setFirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/invite/${code}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('invalid');
      })
      .then((data) => {
        setValid(true);
        setLabel(data.label || '');
      })
      .catch(() => setValid(false));
  }, [code]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/invite/${code}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, firm }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
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

          {valid === null && (
            <div className="text-center">
              <p className="font-mono text-sm text-[#8a8a9a] animate-pulse">
                ● Validating invite...
              </p>
            </div>
          )}

          {valid === false && (
            <div className="text-center">
              <h1 className="font-mono text-xl tracking-[0.15em] text-red-500 mb-4">
                LINK INACTIVE
              </h1>
              <p className="font-mono text-[0.7rem] text-[#8a8a9a] leading-relaxed">
                This link is no longer active. Contact{' '}
                <a
                  href="mailto:colby@tobe.energy"
                  className="text-[#ff6b35] hover:text-[#ff6b35]/80 transition-colors"
                >
                  colby@tobe.energy
                </a>{' '}
                for access.
              </p>
            </div>
          )}

          {valid === true && (
            <>
              <div className="text-center mb-8">
                <h1 className="font-mono text-2xl tracking-[0.2em] text-[#ff6b35] glow-orange mb-2">
                  DATA ROOM
                </h1>
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase">
                  Invited Access
                </p>
                {label && (
                  <p className="font-mono text-[0.6rem] text-[#8a8a9a]/60 mt-1">{label}</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase mb-2">
                    Name <span className="text-[#ff6b35]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    autoFocus
                    disabled={loading}
                    className="w-full bg-[#0a0a0f] border border-[#ff6b35]/20 px-4 py-3 font-mono text-sm text-white placeholder-[#8a8a9a]/50 focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/30 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase mb-2">
                    Email <span className="text-[#ff6b35]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="investor@firm.com"
                    required
                    disabled={loading}
                    className="w-full bg-[#0a0a0f] border border-[#ff6b35]/20 px-4 py-3 font-mono text-sm text-white placeholder-[#8a8a9a]/50 focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/30 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase mb-2">
                    Firm / Organization
                  </label>
                  <input
                    type="text"
                    value={firm}
                    onChange={(e) => setFirm(e.target.value)}
                    placeholder="Optional"
                    disabled={loading}
                    className="w-full bg-[#0a0a0f] border border-[#ff6b35]/20 px-4 py-3 font-mono text-sm text-white placeholder-[#8a8a9a]/50 focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/30 transition-colors disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="font-mono text-[0.65rem] tracking-[0.2em] text-red-500 text-center uppercase">
                    ● {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !name || !email}
                  className="w-full bg-[#ff6b35]/10 border border-[#ff6b35]/30 px-4 py-3 font-mono text-[0.75rem] tracking-[0.2em] text-[#ff6b35] uppercase hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="animate-pulse">●</span> Authenticating...
                    </span>
                  ) : (
                    'Enter Data Room'
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#ff6b35]/10 text-center">
                <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a]/60">
                  Your activity will be tracked for security purposes
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
