# CLAUDE.md - Development Guidelines

## Project Structure

This is the **Tobe Energy Data Room** development repo. It contains:
- `/src/components/PipelineNetwork/` — Interactive pipeline visualization
- `/tobe-dataroom/` — NERV-style data room (password protected)
- `/tobe-dataroom-nerv/` — Alternative NERV version

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animations

## Key Rules

### Hydration Safety
- **Always round floating point values** in SVG coordinates to avoid SSR/client mismatch
- Use `Math.round()` on any calculated positions
- Avoid `Date.now()`, `Math.random()` in render

### Git Workflow
- This repo syncs between Mac Studio (Ren) and MacBook (Colby)
- Push to `main` directly — no feature branches needed yet
- Always commit with clear messages

### Files to Never Commit
- `node_modules/`
- `.env*.local`
- `.vercel/`
- `.next/`
- Nested `.git/` directories

### Styling
- Use NERV/EVA aesthetic: dark backgrounds (#0a0a0f), orange accents (#ff6b35), cyan (#00d4ff)
- JetBrains Mono for monospace text
- Subtle grid backgrounds, scanlines optional

### Mobile
- Always test mobile responsiveness
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`
- Stack layouts vertically on mobile

## Tailscale Dev Access

When dev server runs on Mac Studio:
```
http://100.69.95.38:3000
```

## Data Files

Pipeline opportunities are in:
```
/src/components/PipelineNetwork/pipelineData.ts
```

Update this file to add/modify opportunities. No code changes needed.

## For Claude Code Specifically

### Before Making Changes
- Read this file first
- Check `pipelineData.ts` for opportunity data structure
- Run `npm run dev` to test locally

### Common Tasks

**Add a new opportunity:**
Edit `/src/components/PipelineNetwork/pipelineData.ts` — follow the existing format

**Fix styling issues:**
Use Tailwind classes, check mobile with browser dev tools

**Deploy preview:**
Dev server on Mac Studio is accessible via Tailscale at http://100.69.95.38:3000

### Don't
- Commit node_modules, .env files, or .vercel/
- Create nested git repos
- Use unrounded floats in SVG coordinates (causes hydration errors)
- Push breaking changes without testing
