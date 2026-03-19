# Tobe Energy Data Room Deployment

## Overview
Using sdamico/pitch-deck as infrastructure for a standalone data room.
- Deck stays at: tobe.energy/deck (existing Next.js site)
- Data room at: dataroom.tobe.energy (this project)

## What We're Using
- ✅ Magic link auth (passwordless)
- ✅ Data room with file uploads + download tracking
- ✅ Admin dashboard for access management
- ✅ Session tracking + analytics
- ✅ Invite links for controlled access
- ❌ Slide engine (not needed, deck is separate)

## Infrastructure Needed

### 1. Vercel (Free tier works)
- Deploy this repo
- Custom domain: dataroom.tobe.energy

### 2. Neon Postgres (Free tier: 0.5GB)
- Create database
- Run migrations in `migrations/` folder

### 3. Resend (Free tier: 100 emails/day)
- For magic link authentication
- Verify domain: tobe.energy

### 4. DNS
- Add CNAME: dataroom.tobe.energy → cname.vercel-dns.com

## Environment Variables

```env
# Database
POSTGRES_URL=postgres://...@....neon.tech/neondb?sslmode=require

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_FROM=Tobe Energy <dataroom@tobe.energy>

# Site
SITE_URL=https://dataroom.tobe.energy

# Admin
ADMIN_PASSWORD=<generate-strong-password>
```

## Data Room Structure

```
/
├── Financials/
│   ├── Financial Model v2.xlsx
│   ├── Cap Table.xlsx
│   └── Use of Funds.pdf
├── Technical/
│   ├── Efficiency Testing Data.xlsx
│   ├── UL Certification Path.pdf
│   └── System Architecture.pdf
├── Legal/
│   ├── LOIs/ (redacted samples)
│   ├── Patents/
│   └── Corporate Docs/
├── Media/
│   ├── Videos/
│   │   ├── T-25 Running.mp4
│   │   ├── Facility Tour.mp4
│   │   └── Team Intro.mp4
│   └── Photos/
└── Interactive/ (custom pages)
    ├── LOI Pipeline Map
    ├── Live Efficiency Dashboard
    └── Competitive Matrix
```

## Custom Pages to Add

### 1. LOI Pipeline Map (`/data/loi-map`)
- Mapbox GL JS embed
- Shows customer locations (anonymized)
- Aggregate stats: $100M+ pipeline

### 2. Live Dashboard (`/data/live`)
- Arduino Cloud embed
- Real-time efficiency reading
- Historical trends

### 3. Competitive Matrix (`/data/compare`)
- Interactive comparison table
- Tobe vs PEM vs Alkaline

## Access Tiers

### Pre-Meeting (Invite Link A)
- Deck link (external)
- 1-pager PDF
- Competitive matrix page

### Post-First-Meeting (Invite Link B)
- Full data room access
- All files
- Interactive pages

### Due Diligence (Individual grant)
- Everything above
- Technical deep-dive docs
- Full financial model with assumptions

## Deployment Steps

1. Create Neon database
2. Run migrations: `psql $POSTGRES_URL < migrations/*.sql`
3. Create Resend account, verify domain
4. Deploy to Vercel: `vercel --prod`
5. Set env vars in Vercel dashboard
6. Configure DNS
7. Create admin account
8. Upload initial files
9. Create invite links for each tier

## Analytics We Get

- Who accessed what files
- Download timestamps
- Time spent on each page (heartbeat)
- Which investors are actively viewing (real-time)
- Engagement patterns before meetings

## Estimated Setup Time
- Infrastructure: 1-2 hours
- File upload + organization: 2-3 hours
- Custom pages (LOI map, dashboard): 3-5 days
- Total: ~1 week to full launch
