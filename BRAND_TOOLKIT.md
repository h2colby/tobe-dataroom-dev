# TOBE ENERGY — Brand Toolkit

> **Version:** 1.0 | **Date:** March 2026 | **Status:** Active
> This document governs all visual and verbal output for Tobe Energy.

---

## 1. COLOR PALETTE

### Primary
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Brand Orange** | ████ | `#ff6b35` | Headers, accents, highlights, CTAs, logo, brand moments |
| **White** | ████ | `#ffffff` | Primary text on dark backgrounds |
| **Dark** | ████ | `#0a0a0f` | Background canvas — all documents and pages |

### Text Hierarchy (white at varying opacities)
| Role | Value | Usage |
|------|-------|-------|
| Primary text | `white/90` or `#e5e5e5` | Body text, key information |
| Secondary text | `white/60` or `#999999` | Descriptions, supporting info |
| Tertiary text | `white/40` or `#666666` | Captions, labels, notes |
| Subtle | `white/20` or `#333333` | Borders, dividers, background elements |

### Orange Hierarchy
| Role | Value | Usage |
|------|-------|-------|
| Full orange | `#ff6b35` | Headlines, stat values, primary accents |
| Orange/70 | `rgba(255,107,53,0.7)` | Secondary accents, links, hover states |
| Orange/30 | `rgba(255,107,53,0.3)` | Borders, glows, subtle emphasis |
| Orange/10 | `rgba(255,107,53,0.1)` | Card backgrounds, hover fills |

### Comparison Tables Only
| Role | Color | Usage |
|------|-------|-------|
| Tobe row highlight | `#ff6b35` (orange) | Our data in comparison tables |
| Competitor row | `white/40` | Competitor data — neutral, muted |

### Retired Colors — DO NOT USE
| Color | Hex | Was Used For | Replacement |
|-------|-----|-------------|-------------|
| ~~Green~~ | ~~#00ff88~~ | ~~Tobe advantages, stats~~ | Orange or bold white |
| ~~Cyan~~ | ~~#00d4ff~~ | ~~Secondary info, links~~ | White/70 or orange/70 |
| ~~Purple~~ | ~~#c084fc~~ | ~~45V credit~~ | Orange |

---

## 2. TYPOGRAPHY

### Font Stack
| Context | Font | Fallback |
|---------|------|----------|
| Headlines & labels | `JetBrains Mono`, monospace | `SF Mono`, `Menlo`, `Consolas` |
| Body text | System sans-serif | `-apple-system`, `Segoe UI`, `Helvetica Neue` |

### Size Scale (data room / web)
| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Page title (h1) | `text-4xl` / `text-5xl` | Bold | `tracking-tight` |
| Section header (h2) | `text-2xl` | Bold | `tracking-tight` |
| Section label | `text-[0.7rem]` | Normal | `tracking-[0.2em]` |
| Body text | `text-[0.95rem]` | Normal | Normal |
| Small body | `text-sm` (14px) | Normal | Normal |
| Caption / label | `text-xs` (12px) | Normal | `tracking-[0.1em]` |
| Tiny label | `text-[0.6rem]` | Normal | `tracking-[0.15em]` |

### Size Scale (PDF documents)
| Element | Size |
|---------|------|
| Document title | 32px |
| Section header | 22px |
| Sub-header | 16px |
| Body | 13px |
| Caption | 11px |
| Footer | 9px |

---

## 3. LOGO

### Primary Logo
- File: `/public/images/tobe-logo.svg`
- Atom mark (teal) + "TOBE." (teal-to-blue gradient) + "ENERGY" (white)
- Use on dark backgrounds only

### Usage Rules
- **Minimum height:** 24px (digital), 0.5" (print)
- **Clear space:** Minimum 1x the height of the atom mark on all sides
- **Never:** Stretch, rotate, recolor, add effects, place on busy backgrounds
- **Dark backgrounds only** — do not place on white or light backgrounds without inverting

### Logo Placement
- **Data room:** Top-left header bar, `h-7` (28px)
- **PDFs:** Centered on cover page, 180px wide
- **Emails:** Not required in body, appears in email signature

---

## 4. COMPONENT PATTERNS

### Cards
```
Border-left accent (3px, orange):
- border-l-[3px] border-[#ff6b35]
- bg-[#12121a] (slightly lighter than canvas)
- border-top/right/bottom: 1px solid rgba(255,255,255,0.04)
- px-5 py-4 or px-6 py-5
```

### Stat Cards
```
Large number in orange (#ff6b35) with text-shadow glow
Label in white/40, uppercase, tracking-[0.15em]
Optional sub-label in white/30
```

### Tables
```
Header row: bg-[#0e0e16], text white/40, uppercase, tracking
Alternating rows: bg-[#12121a] / bg-[#0f0f17]
Tobe row (in comparisons): text-[#ff6b35], bold
Competitor rows: text-white/40
Border: border-white/5 between columns
```

### Section Headers (ASCII style)
```
Short format only: ┌─── SECTION NAME ───┐
Color: text-[#ff6b35]
Size: text-[0.7rem] tracking-[0.2em]
```

### Section Dividers
```
my-4 flex items-center gap-4
Gradient lines: from-transparent via-[#ff6b35]/20 to-transparent
Center ornament: ═══════ in orange/30
```

### Buttons / Links
```
Primary: border-[#ff6b35]/30 bg-[#ff6b35]/10 text-[#ff6b35]
Hover: bg-[#ff6b35]/20
Text links: text-[#ff6b35]/70 hover:text-[#ff6b35]
```

### Glows and Shadows
```
Text glow: textShadow: '0 0 12px rgba(255,107,53,0.3)'
Card glow: boxShadow: '0 0 30px rgba(255,107,53,0.08)'
Active indicator: 2px dot, bg-[#ff6b35], animate-pulse
```

### Footer
```
Text: "TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024"
Color: text-[#ff6b35]/20 with textShadow
Border-top: border-white/10
Padding: px-6 py-6
```

---

## 5. VOICE & TONE

### Core Principles
- **Direct.** Say it in one sentence if you can.
- **Confident, not arrogant.** Let the numbers speak. Don't oversell.
- **Technical but accessible.** An investor should understand it. An engineer should respect it.
- **No corporate BS.** No "leveraging," "cutting-edge," "revolutionizing," "game-changing."
- **No hedging.** Don't say "we believe" or "we think" — say what it is.

### Banned Phrases
- "Cutting-edge" / "state-of-the-art" / "world-class"
- "Leveraging" / "utilizing"  
- "Revolutionizing" / "disrupting" (unless backed by specific data)
- "Game-changing" / "paradigm shift"
- "We believe" / "We think" (just state the fact)
- "Excited to announce" / "Thrilled to share"

### Preferred Voice
- "We make hydrogen. It's cheaper and cleaner than anything else on the market."
- "Every competitor uses membranes. Every membrane degrades. We eliminated the membrane."
- "$7.05/kg delivered. 30% margin. No subsidies. Published in Platts."
- "Founded in 2024. Deploying commercially in 2026. While others are still in the lab."

---

## 6. APPLICATION CHECKLIST

When creating any new page, document, or material:

- [ ] Only orange + white + dark background (no green, cyan, purple)
- [ ] Orange for Tobe highlights, white/40 for competitors
- [ ] Text hierarchy uses opacity scale (white/90 → white/20)
- [ ] Monospace for headers/labels, sans-serif for body
- [ ] Logo placed correctly with clear space
- [ ] No banned phrases in copy
- [ ] ASCII headers use short format (┌─── TITLE ───┐)
- [ ] Cards use border-l-[3px] orange pattern
- [ ] Footer matches standard format
- [ ] PDF backgrounds go edge-to-edge (no white borders)
