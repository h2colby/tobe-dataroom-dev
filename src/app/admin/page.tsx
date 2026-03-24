'use client';

import { useState, useEffect, FormEvent } from 'react';

interface InviteLink {
  id: number;
  code: string;
  label: string | null;
  expires_at: string | null;
  max_uses: number | null;
  use_count: number;
  revoked: number;
  created_at: string;
  session_count: number;
}

interface Session {
  id: string;
  name: string;
  email: string;
  firm: string | null;
  invite_code: string | null;
  invite_label: string | null;
  ip: string;
  user_agent: string;
  created_at: string;
  last_seen: string;
  revoked: number;
  page_view_count: number;
  last_activity: string | null;
}

interface Analytics {
  pageViews: { page_slug: string; views: number; unique_viewers: number }[];
  dailyViews: { date: string; views: number }[];
  activeInvestors: { name: string; email: string; firm: string; total_views: number; last_active: string }[];
  stats: { totalSessions: number; totalPageViews: number; activeLinks: number };
}

type Tab = 'links' | 'sessions' | 'analytics';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const [tab, setTab] = useState<Tab>('links');
  const [links, setLinks] = useState<InviteLink[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [sessionPageViews, setSessionPageViews] = useState<Record<string, { page_slug: string; created_at: string }[]>>({});

  // New link form
  const [showNewLink, setShowNewLink] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newMaxUses, setNewMaxUses] = useState('');
  const [createdUrl, setCreatedUrl] = useState('');
  const [creating, setCreating] = useState(false);

  // Check auth on mount
  useEffect(() => {
    fetch('/api/admin/invite-links')
      .then(res => {
        if (res.ok) { setAuthed(true); }
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  async function handleAuth(e: FormEvent) {
    e.preventDefault();
    setAuthError(false);
    setAuthLoading(true);

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthed(true);
    } else {
      setAuthError(true);
      setPassword('');
    }
    setAuthLoading(false);
  }

  // Fetch data when authed or tab changes
  useEffect(() => {
    if (!authed) return;
    if (tab === 'links') fetchLinks();
    if (tab === 'sessions') fetchSessions();
    if (tab === 'analytics') fetchAnalytics();
  }, [authed, tab]);

  async function fetchLinks() {
    const res = await fetch('/api/admin/invite-links');
    if (res.ok) {
      const data = await res.json();
      setLinks(data.links);
    }
  }

  async function fetchSessions(inviteCode?: string) {
    const url = inviteCode ? `/api/admin/sessions?invite_code=${inviteCode}` : '/api/admin/sessions';
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setSessions(data.sessions);
    }
  }

  async function fetchAnalytics() {
    const res = await fetch('/api/admin/analytics');
    if (res.ok) {
      const data = await res.json();
      setAnalytics(data);
    }
  }

  async function createLink(e: FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreatedUrl('');

    const res = await fetch('/api/admin/invite-links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: newLabel,
        expires_at: newExpiry || undefined,
        max_uses: newMaxUses ? parseInt(newMaxUses) : undefined,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setCreatedUrl(data.url);
      setNewLabel('');
      setNewExpiry('');
      setNewMaxUses('');
      fetchLinks();
    }
    setCreating(false);
  }

  async function revokeLink(id: number) {
    await fetch(`/api/admin/invite-links?id=${id}`, { method: 'DELETE' });
    fetchLinks();
  }

  async function revokeSession(id: string) {
    await fetch(`/api/admin/sessions?id=${id}`, { method: 'DELETE' });
    fetchSessions();
  }

  function copyToClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function getLinkStatus(link: InviteLink): { label: string; color: string } {
    if (link.revoked) return { label: 'REVOKED', color: 'text-red-500' };
    if (link.expires_at && new Date(link.expires_at) < new Date()) return { label: 'EXPIRED', color: 'text-amber-500' };
    if (link.max_uses && link.use_count >= link.max_uses) return { label: 'EXHAUSTED', color: 'text-[#8a8a9a]' };
    return { label: 'ACTIVE', color: 'text-green-500' };
  }

  function formatDate(d: string | null): string {
    if (!d) return '—';
    return new Date(d + 'Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  if (checking) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center">
        <p className="font-mono text-sm text-[#8a8a9a] animate-pulse">● Loading...</p>
      </div>
    );
  }

  // Auth screen
  if (!authed) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#0a0a0f] flex items-center justify-center">
        <div className="pointer-events-none fixed inset-0 z-[201]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }} />
        <div className="pointer-events-none fixed inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-[202] w-full max-w-md px-6">
          <div className="relative border border-[#ff6b35]/20 bg-[#0a0a0f]/95 p-10">
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#ff6b35]/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#ff6b35]/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#ff6b35]/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#ff6b35]/40" />

            <div className="text-center mb-8">
              <h1 className="font-mono text-2xl tracking-[0.2em] text-[#ff6b35] glow-orange mb-2">ADMIN ACCESS</h1>
              <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase">Control Panel Authentication</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block font-mono text-[0.65rem] tracking-[0.2em] text-[#8a8a9a] uppercase mb-2">Admin Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
                  placeholder="Enter admin password"
                  autoFocus
                  disabled={authLoading}
                  className="w-full bg-[#0a0a0f] border border-[#ff6b35]/20 px-4 py-3 font-mono text-sm text-white placeholder-[#8a8a9a]/50 focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/30 transition-colors disabled:opacity-50"
                />
              </div>
              {authError && (
                <div className="font-mono text-[0.65rem] tracking-[0.2em] text-red-500 text-center uppercase">● Invalid Password</div>
              )}
              <button
                type="submit"
                disabled={authLoading || !password}
                className="w-full bg-[#ff6b35]/10 border border-[#ff6b35]/30 px-4 py-3 font-mono text-[0.75rem] tracking-[0.2em] text-[#ff6b35] uppercase hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {authLoading ? <span className="animate-pulse">● Authenticating...</span> : 'Authenticate'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="fixed inset-0 bg-[#0a0a0f] overflow-auto">
      <div className="pointer-events-none fixed inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-mono text-2xl tracking-[0.2em] text-[#ff6b35] glow-orange">ADMIN CONTROL</h1>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] text-[#8a8a9a] mt-1">Data Room Management</p>
          </div>
          <a href="/" className="font-mono text-[0.7rem] text-[#8a8a9a] hover:text-[#ff6b35] transition-colors">← Back to Data Room</a>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-white/10">
          {(['links', 'sessions', 'analytics'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-mono text-[0.7rem] tracking-[0.15em] uppercase border-b-2 transition-colors ${
                tab === t
                  ? 'border-[#ff6b35] text-[#ff6b35]'
                  : 'border-transparent text-[#8a8a9a] hover:text-white'
              }`}
            >
              {t === 'links' ? 'Invite Links' : t === 'sessions' ? 'Sessions' : 'Analytics'}
            </button>
          ))}
        </div>

        {/* INVITE LINKS TAB */}
        {tab === 'links' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-mono text-sm tracking-[0.1em] text-white">Invite Links</h2>
              <button
                onClick={() => { setShowNewLink(!showNewLink); setCreatedUrl(''); }}
                className="bg-[#ff6b35]/10 border border-[#ff6b35]/30 px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-[#ff6b35] uppercase hover:bg-[#ff6b35]/20 transition-colors"
              >
                {showNewLink ? 'Cancel' : '+ Generate New Link'}
              </button>
            </div>

            {/* New Link Form */}
            {showNewLink && (
              <div className="border border-[#ff6b35]/20 bg-[#0a0a0f] p-6 mb-6">
                <form onSubmit={createLink} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase mb-1">Label *</label>
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Jane Smith - Sequoia"
                      required
                      className="w-full bg-[#0a0a0f] border border-white/10 px-3 py-2 font-mono text-sm text-white placeholder-[#8a8a9a]/50 focus:outline-none focus:border-[#ff6b35] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase mb-1">Expires</label>
                    <input
                      type="datetime-local"
                      value={newExpiry}
                      onChange={(e) => setNewExpiry(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-white/10 px-3 py-2 font-mono text-sm text-white focus:outline-none focus:border-[#ff6b35] transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase mb-1">Max Uses</label>
                      <input
                        type="number"
                        value={newMaxUses}
                        onChange={(e) => setNewMaxUses(e.target.value)}
                        placeholder="∞"
                        min="1"
                        className="w-full bg-[#0a0a0f] border border-white/10 px-3 py-2 font-mono text-sm text-white placeholder-[#8a8a9a]/50 focus:outline-none focus:border-[#ff6b35] transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={creating || !newLabel}
                      className="bg-[#ff6b35]/20 border border-[#ff6b35]/40 px-6 py-2 font-mono text-[0.7rem] text-[#ff6b35] uppercase hover:bg-[#ff6b35]/30 transition-colors disabled:opacity-40"
                    >
                      {creating ? '...' : 'Create'}
                    </button>
                  </div>
                </form>

                {createdUrl && (
                  <div className="mt-4 p-3 border border-green-500/30 bg-green-500/5">
                    <div className="flex items-center justify-between gap-4">
                      <code className="font-mono text-sm text-green-400 break-all">{createdUrl}</code>
                      <button
                        onClick={() => copyToClipboard(createdUrl)}
                        className="shrink-0 font-mono text-[0.65rem] text-[#ff6b35] hover:text-[#ff6b35]/80 uppercase"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Links Table */}
            <div className="border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Label</th>
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Code</th>
                    <th className="px-4 py-3 text-center font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Uses</th>
                    <th className="px-4 py-3 text-center font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Status</th>
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Created</th>
                    <th className="px-4 py-3 text-right font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => {
                    const status = getLinkStatus(link);
                    return (
                      <tr
                        key={link.id}
                        onClick={() => setExpandedLink(expandedLink === link.code ? null : link.code)}
                        className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-sm text-white">{link.label || '—'}</td>
                        <td className="px-4 py-3 font-mono text-[0.7rem] text-[#8a8a9a]">{link.code.slice(0, 12)}...</td>
                        <td className="px-4 py-3 text-center font-mono text-sm text-white">
                          {link.use_count}{link.max_uses ? `/${link.max_uses}` : ''}
                          <span className="text-[#8a8a9a] text-[0.6rem] ml-1">({link.session_count} sessions)</span>
                        </td>
                        <td className={`px-4 py-3 text-center font-mono text-[0.65rem] tracking-[0.1em] ${status.color}`}>● {status.label}</td>
                        <td className="px-4 py-3 font-mono text-[0.7rem] text-[#8a8a9a]">{formatDate(link.created_at)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => copyToClipboard(`${window.location.origin}/join/${link.code}`)}
                              className="font-mono text-[0.6rem] text-[#ff6b35] hover:text-[#ff6b35]/80 uppercase"
                            >
                              Copy URL
                            </button>
                            {!link.revoked && (
                              <button
                                onClick={() => revokeLink(link.id)}
                                className="font-mono text-[0.6rem] text-red-500 hover:text-red-400 uppercase"
                              >
                                Revoke
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {links.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center font-mono text-sm text-[#8a8a9a]">
                        No invite links yet. Generate one above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SESSIONS TAB */}
        {tab === 'sessions' && (
          <div>
            <h2 className="font-mono text-sm tracking-[0.1em] text-white mb-6">Active Sessions</h2>

            <div className="border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Name</th>
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Email</th>
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Firm</th>
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Invite</th>
                    <th className="px-4 py-3 text-center font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Pages</th>
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">First Visit</th>
                    <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Last Active</th>
                    <th className="px-4 py-3 text-right font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr
                      key={s.id}
                      className={`border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors ${s.revoked ? 'opacity-50' : ''}`}
                      onClick={() => setExpandedSession(expandedSession === s.id ? null : s.id)}
                    >
                      <td className="px-4 py-3 font-mono text-sm text-white">{s.name}</td>
                      <td className="px-4 py-3 font-mono text-[0.7rem] text-[#8a8a9a]">{s.email}</td>
                      <td className="px-4 py-3 font-mono text-[0.7rem] text-white">{s.firm || '—'}</td>
                      <td className="px-4 py-3 font-mono text-[0.65rem] text-[#8a8a9a]">{s.invite_label || s.invite_code?.slice(0, 8) || '—'}</td>
                      <td className="px-4 py-3 text-center font-mono text-sm text-[#ff6b35]">{s.page_view_count}</td>
                      <td className="px-4 py-3 font-mono text-[0.65rem] text-[#8a8a9a]">{formatDate(s.created_at)}</td>
                      <td className="px-4 py-3 font-mono text-[0.65rem] text-[#8a8a9a]">{formatDate(s.last_activity || s.last_seen)}</td>
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        {!s.revoked && s.id !== 'password-user' && (
                          <button
                            onClick={() => revokeSession(s.id)}
                            className="font-mono text-[0.6rem] text-red-500 hover:text-red-400 uppercase"
                          >
                            Revoke
                          </button>
                        )}
                        {s.revoked ? <span className="font-mono text-[0.6rem] text-red-500">REVOKED</span> : null}
                      </td>
                    </tr>
                  ))}
                  {sessions.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center font-mono text-sm text-[#8a8a9a]">
                        No sessions yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === 'analytics' && analytics && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Active Sessions', value: analytics.stats.totalSessions, color: 'text-green-500' },
                { label: 'Total Page Views', value: analytics.stats.totalPageViews, color: 'text-[#ff6b35]' },
                { label: 'Active Links', value: analytics.stats.activeLinks, color: 'text-blue-400' },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/[0.02] p-6">
                  <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase mb-2">{stat.label}</p>
                  <p className={`font-mono text-3xl ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Top Pages */}
            <div>
              <h3 className="font-mono text-sm tracking-[0.1em] text-white mb-4">Top Pages</h3>
              <div className="border border-white/10">
                {analytics.pageViews.map((pv, i) => {
                  const maxViews = analytics.pageViews[0]?.views || 1;
                  const width = (pv.views / maxViews) * 100;
                  return (
                    <div key={pv.page_slug} className="flex items-center gap-4 px-4 py-3 border-b border-white/5 hover:bg-white/[0.02]">
                      <span className="font-mono text-[0.7rem] text-white w-48 shrink-0 truncate">{pv.page_slug}</span>
                      <div className="flex-1 h-4 bg-white/5 relative">
                        <div className="absolute inset-y-0 left-0 bg-[#ff6b35]/30" style={{ width: `${width}%` }} />
                      </div>
                      <span className="font-mono text-[0.7rem] text-[#ff6b35] w-16 text-right">{pv.views}</span>
                      <span className="font-mono text-[0.6rem] text-[#8a8a9a] w-20 text-right">{pv.unique_viewers} unique</span>
                    </div>
                  );
                })}
                {analytics.pageViews.length === 0 && (
                  <div className="px-4 py-8 text-center font-mono text-sm text-[#8a8a9a]">No page views yet.</div>
                )}
              </div>
            </div>

            {/* Daily Activity */}
            <div>
              <h3 className="font-mono text-sm tracking-[0.1em] text-white mb-4">Daily Activity (Last 30 Days)</h3>
              <div className="border border-white/10 p-4">
                {analytics.dailyViews.length > 0 ? (
                  <div className="flex items-end gap-1 h-32">
                    {analytics.dailyViews.map((d) => {
                      const maxDaily = Math.max(...analytics.dailyViews.map((x) => x.views));
                      const height = (d.views / maxDaily) * 100;
                      return (
                        <div key={d.date} className="flex-1 flex flex-col items-center justify-end" title={`${d.date}: ${d.views} views`}>
                          <div className="w-full bg-[#ff6b35]/40 hover:bg-[#ff6b35]/60 transition-colors" style={{ height: `${height}%`, minHeight: '2px' }} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center font-mono text-sm text-[#8a8a9a]">No data yet.</div>
                )}
              </div>
            </div>

            {/* Most Active Investors */}
            <div>
              <h3 className="font-mono text-sm tracking-[0.1em] text-white mb-4">Most Active Investors</h3>
              <div className="border border-white/10 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Name</th>
                      <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Email</th>
                      <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Firm</th>
                      <th className="px-4 py-3 text-center font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Views</th>
                      <th className="px-4 py-3 text-left font-mono text-[0.6rem] tracking-[0.15em] text-[#8a8a9a] uppercase">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.activeInvestors.map((inv) => (
                      <tr key={inv.email} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-mono text-sm text-white">{inv.name}</td>
                        <td className="px-4 py-3 font-mono text-[0.7rem] text-[#8a8a9a]">{inv.email}</td>
                        <td className="px-4 py-3 font-mono text-[0.7rem] text-white">{inv.firm || '—'}</td>
                        <td className="px-4 py-3 text-center font-mono text-sm text-[#ff6b35]">{inv.total_views}</td>
                        <td className="px-4 py-3 font-mono text-[0.65rem] text-[#8a8a9a]">{formatDate(inv.last_active)}</td>
                      </tr>
                    ))}
                    {analytics.activeInvestors.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center font-mono text-sm text-[#8a8a9a]">No investor activity yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'analytics' && !analytics && (
          <div className="text-center py-12 font-mono text-sm text-[#8a8a9a] animate-pulse">● Loading analytics...</div>
        )}
      </div>
    </div>
  );
}
