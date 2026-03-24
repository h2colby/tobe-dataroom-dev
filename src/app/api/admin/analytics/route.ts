import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();

  // Views per page
  const pageViews = db.prepare(`
    SELECT page_slug, COUNT(*) as views, COUNT(DISTINCT session_id) as unique_viewers
    FROM page_views
    GROUP BY page_slug
    ORDER BY views DESC
  `).all();

  // Views per day (last 30 days)
  const dailyViews = db.prepare(`
    SELECT date(created_at) as date, COUNT(*) as views
    FROM page_views
    WHERE created_at >= datetime('now', '-30 days')
    GROUP BY date(created_at)
    ORDER BY date ASC
  `).all();

  // Most active investors
  const activeInvestors = db.prepare(`
    SELECT 
      s.name, s.email, s.firm,
      COUNT(pv.id) as total_views,
      MAX(pv.created_at) as last_active
    FROM sessions s
    JOIN page_views pv ON pv.session_id = s.id
    WHERE s.revoked = 0
    GROUP BY s.id
    ORDER BY total_views DESC
    LIMIT 20
  `).all();

  // Summary stats
  const totalSessions = (db.prepare('SELECT COUNT(*) as count FROM sessions WHERE revoked = 0').get() as { count: number }).count;
  const totalPageViews = (db.prepare('SELECT COUNT(*) as count FROM page_views').get() as { count: number }).count;
  const activeLinks = (db.prepare('SELECT COUNT(*) as count FROM invite_links WHERE revoked = 0').get() as { count: number }).count;

  return NextResponse.json({
    pageViews,
    dailyViews,
    activeInvestors,
    stats: {
      totalSessions,
      totalPageViews,
      activeLinks,
    },
  });
}
