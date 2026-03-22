# VISUAL AUDIT — FIX PLAN

**Generated:** 2026-03-22
**Source:** VISUAL_AUDIT_REPORT.md
**Total Items:** 28 fixes across 4 tiers
**Recommended Execution:** 5 waves, ~3-5 sessions

---

## WAVE 1: CRITICAL FIXES (Tier 0)
*Goal: Make the site usable on mobile and fix all broken assets*
*Dependencies: None*
*Estimated effort: 1 session*

### T0-1: Mobile Responsive Sidebar
**Priority:** P0 — BLOCKING
**Files:**
- `src/components/Sidebar.tsx` — Add mobile hamburger toggle, slide-out drawer
- `src/app/layout.tsx` — Add responsive flex layout, conditional sidebar rendering
- `src/app/globals.css` — Add drawer animation keyframes (if not using Framer Motion)

**Approach:**
1. Add `MobileNav` component: hamburger button (visible below `md:`), slide-out drawer with backdrop
2. Make Sidebar hidden below `md:` breakpoint: `hidden md:flex`
3. Drawer contains same navigation categories as Sidebar
4. Add backdrop overlay on drawer open
5. Close drawer on route change (usePathname listener)
6. Close drawer on backdrop click and Escape key

**Acceptance Criteria:**
- [ ] At 375px: hamburger icon visible, sidebar hidden, full-width content
- [ ] Hamburger opens drawer overlay with all nav categories
- [ ] Drawer closes on route navigation
- [ ] At 768px+: sidebar visible as before, no hamburger
- [ ] Tab navigation works on mobile nav items
- [ ] Chat widget doesn't overlap mobile nav

---

### T0-2: Fix Logo Image
**Priority:** P1
**Files:**
- `public/images/tobe-logo.svg` — Create or copy the SVG logo file

**Approach:**
1. Check if logo exists elsewhere in repo or parent directories
2. If not found, create simple SVG wordmark: "TOBE ENERGY" in JetBrains Mono, #ff6b35
3. Place in `public/images/tobe-logo.svg`
4. Verify renders on all pages

**Acceptance Criteria:**
- [ ] Logo renders correctly on every page
- [ ] No 404 in network tab for logo request
- [ ] Logo scales appropriately at all viewports

---

### T0-3: Fix NODE-01 Hero Image
**Priority:** P1
**Files:**
- `src/app/projects/node-01/page.tsx` — Update image source or add fallback
- `public/images/` — Add the hero image

**Approach:**
1. Locate `showroom-inspo.jpg` in parent project or assets
2. If unavailable, replace with a technical diagram placeholder or remove the broken img tag
3. Add `next/image` with proper sizing and alt text

**Acceptance Criteria:**
- [ ] /projects/node-01 loads with a visible hero image or no broken placeholder
- [ ] Image is optimized via next/image

---

### T0-4: Fix Video File 404s
**Priority:** P2
**Files:**
- `public/videos/` — Add missing video files or update references
- `src/app/technology/cell/page.tsx` — Update video paths or add fallback

**Approach:**
1. Locate missing videos: `cnc-electrolysis-housing.webm`, `transformer-winding.webm`
2. If unavailable, remove video references and replace with static images or remove section
3. Ensure `AutoplayVideo` component handles missing source gracefully (it already has fallback logic)

**Acceptance Criteria:**
- [ ] No 404 errors for video files in network tab
- [ ] Technology/cell page shows either working videos or clean fallback

---

## WAVE 2: DESIGN SYSTEM FOUNDATION (Tier 1)
*Goal: Create centralized design tokens and shared components*
*Dependencies: Wave 1 (so mobile nav is working before refactoring)*
*Estimated effort: 1-2 sessions*

### T1-1: Create Design Tokens
**Priority:** High
**Files:**
- `src/lib/design-tokens.ts` — NEW FILE: centralized tokens
- `src/app/globals.css` — Add CSS custom properties
- All component files — Gradual migration to tokens (can be incremental)

**Approach:**
Create `design-tokens.ts`:
```typescript
export const colors = {
  bg: {
    primary: '#0a0a0f',
    surface1: '#0f0f17',
    surface2: '#12121a',
    surface3: '#16161f',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255,255,255,0.6)',
    muted: 'rgba(255,255,255,0.4)',
  },
  accent: {
    orange: '#ff6b35',
    orangeDim: 'rgba(255,107,53,0.08)',
    orangeGlow: 'rgba(255,107,53,0.25)',
    orangeBorder: 'rgba(255,107,53,0.2)',
  },
  semantic: {
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
    info: '#3b82f6',
  },
  border: {
    subtle: 'rgba(255,255,255,0.05)',
    light: 'rgba(255,255,255,0.1)',
    medium: 'rgba(255,255,255,0.2)',
  },
} as const;

export const typography = {
  display: '2.5rem',    // 40px — page titles
  heading1: '1.875rem', // 30px — section headers
  heading2: '1.5rem',   // 24px — subsection headers
  heading3: '1.25rem',  // 20px — card titles
  body: '0.875rem',     // 14px — default text
  caption: '0.75rem',   // 12px — labels, metadata
  micro: '0.65rem',     // 10.4px — timestamps
} as const;

export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
} as const;
```

Also add CSS custom properties in globals.css for use in Tailwind:
```css
:root {
  --color-bg: #0a0a0f;
  --color-surface-1: #0f0f17;
  --color-surface-2: #12121a;
  --color-accent: #ff6b35;
  /* ... */
}
```

**Acceptance Criteria:**
- [ ] design-tokens.ts exists with all token categories
- [ ] CSS custom properties defined in globals.css
- [ ] InvestorDashboard.tsx `COLORS` and FinancialDashboard.tsx `C` import from tokens
- [ ] No visual changes (refactor only)

---

### T1-2: Fix Chart Semantic Colors
**Priority:** High
**Files:**
- `src/components/InvestorDashboard.tsx` — Replace mono-orange colors
- `src/components/FinancialDashboard.tsx` — Use semantic colors from tokens

**Approach:**
1. Import `colors.semantic` from design-tokens
2. Replace `green: '#ff6b35'` with actual green (`#22c55e`)
3. Replace `blue: '#ff6b35'` with actual blue (`#3b82f6`) or secondary accent
4. Keep `orange: '#ff6b35'` as primary accent
5. Update chart legends to reflect new colors
6. Ensure color choices maintain readability on dark background

**Acceptance Criteria:**
- [ ] Financial charts show distinct colors for different data series
- [ ] Revenue vs cost vs margin use different hues
- [ ] Chart legends match displayed colors
- [ ] All chart colors pass 4.5:1 contrast on dark background

---

### T1-3: Implement Typography Scale
**Priority:** Medium
**Files:**
- `src/app/globals.css` — Add type scale utility classes
- Priority pages: `/comparison`, `/business-model`, `/financials` — Migrate to scale

**Approach:**
1. Define 7 type scale classes in globals.css (or Tailwind config):
   ```css
   .type-display { font-size: 2.5rem; letter-spacing: 0.05em; }
   .type-h1 { font-size: 1.875rem; letter-spacing: 0.05em; }
   .type-h2 { font-size: 1.5rem; letter-spacing: 0.05em; }
   .type-h3 { font-size: 1.25rem; }
   .type-body { font-size: 0.875rem; }
   .type-caption { font-size: 0.75rem; letter-spacing: 0.1em; }
   .type-micro { font-size: 0.65rem; letter-spacing: 0.1em; }
   ```
2. Replace arbitrary `text-[0.55rem]`, `text-[0.6rem]`, etc. with nearest scale class
3. Reduce letter-spacing values to 2: `normal` and `0.1em`

**Acceptance Criteria:**
- [ ] No more than 7 font size values in use
- [ ] No more than 2 letter-spacing values
- [ ] Visual hierarchy is clear on every page

---

### T1-4: Extract Shared TabNav Component
**Priority:** Medium
**Files:**
- `src/components/ui/TabNav.tsx` — NEW FILE
- `src/app/business-model/page.tsx` — Migrate inline tabs
- `src/app/financials/page.tsx` — Migrate inline tabs
- `src/app/technology/controls/page.tsx` — Migrate inline tabs

**Approach:**
```typescript
interface TabNavProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'compact';
}
```
Features:
- Horizontal scroll with overflow indicator on mobile
- Active tab: orange border-bottom + orange text
- Keyboard navigation (arrow keys)
- Animated underline transition

**Acceptance Criteria:**
- [ ] All 3 pages use shared TabNav component
- [ ] Tabs scroll horizontally on narrow viewports
- [ ] Active tab is clearly indicated
- [ ] Keyboard arrow navigation works

---

### T1-5: Extract Shared MetricCard Component
**Priority:** Medium
**Files:**
- `src/components/ui/MetricCard.tsx` — NEW FILE

**Approach:**
```typescript
interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  variant?: 'default' | 'highlight' | 'compact';
}
```
Replace inline metric displays across: home, business-model, financials, tax-credits, customers.

**Acceptance Criteria:**
- [ ] MetricCard component exists with 3 variants
- [ ] Used on at least 3 pages
- [ ] Consistent styling across all metrics site-wide

---

### T1-6: Extract Shared DataTable Component
**Priority:** Medium
**Files:**
- `src/components/ui/DataTable.tsx` — NEW FILE

**Approach:**
```typescript
interface DataTableProps {
  columns: { key: string; label: string; align?: 'left' | 'right' | 'center' }[];
  rows: Record<string, any>[];
  striped?: boolean;
  compact?: boolean;
  highlightRow?: (row: any) => boolean;
}
```
Features: zebra striping, horizontal scroll wrapper for mobile, header sticky, row hover highlight.

Replace inline tables in: efficiency, comparison, business-model.

**Acceptance Criteria:**
- [ ] DataTable component exists
- [ ] Horizontal scroll on mobile
- [ ] Zebra striping option
- [ ] Header styling consistent across all uses

---

## WAVE 3: VISUAL POLISH (Tier 2)
*Goal: Elevate the visual experience with content and UX improvements*
*Dependencies: Wave 2 (tokens and components available)*
*Estimated effort: 1-2 sessions*

### T2-1: Add Team Headshots
**Priority:** High (content-dependent)
**Files:**
- `src/app/team/page.tsx` — Add image slots in team cards
- `public/images/team/` — Team member photos

**Approach:**
1. Add photo prop to team member data structure
2. Use `next/image` with `rounded-full` circular crop
3. Fallback to initials avatar if no photo available
4. Size: 80×80px on desktop, 60×60px on mobile

**Acceptance Criteria:**
- [ ] Each team member card shows a headshot (or initials fallback)
- [ ] Photos are optimized via next/image
- [ ] Circular crop with subtle border

---

### T2-2: Add Document Search
**Priority:** Medium
**Files:**
- `src/app/documents/page.tsx` — Add search input and filter logic

**Approach:**
1. Add search input at top of documents page
2. Filter document list by filename (case-insensitive)
3. Highlight matching text in results
4. Show result count
5. Clear button to reset search

**Acceptance Criteria:**
- [ ] Search input visible at top of documents page
- [ ] Typing filters documents in real-time
- [ ] Matches highlighted
- [ ] Clear button resets to full list

---

### T2-3: Unify RenPanel + DataRoomChat
**Priority:** Medium (large refactor)
**Files:**
- `src/components/RenPanel.tsx` — Merge chat logic here
- `src/components/DataRoomChat.tsx` — Deprecate or slim to wrapper
- `src/app/layout.tsx` — Update imports

**Approach:**
1. Create unified `RenChat` component with two modes:
   - `mode="overlay"` — full RenPanel with canvas (used on homepage)
   - `mode="floating"` — compact floating widget (used on all other pages)
2. Share chat logic, streaming handler, message state
3. Single canvas implementation with configurable size
4. Remove `window.__renChatSend` global in favor of React context

**Acceptance Criteria:**
- [ ] Single chat component serves both use cases
- [ ] Chat history persists between mode switches
- [ ] No global window API exposure
- [ ] Canvas rendering is identical in both modes

---

### T2-4: Add Anchor Navigation to Long Pages
**Priority:** Medium
**Files:**
- `src/app/comparison/page.tsx` — Add floating TOC
- `src/app/tax-credits/page.tsx` — Add floating TOC

**Approach:**
1. Create `TableOfContents` component: fixed position sidebar (right side, desktop only)
2. Uses IntersectionObserver to highlight current section
3. Click scrolls smoothly to section
4. Hidden on mobile (use scroll instead)

**Acceptance Criteria:**
- [ ] Long pages show floating TOC on desktop
- [ ] Current section highlighted in TOC
- [ ] Click scrolls to section
- [ ] Hidden below `lg:` breakpoint

---

### T2-5: HMI Semantic Color Ranges
**Priority:** Medium
**Files:**
- `src/app/technology/controls/page.tsx` — Add range coloring to gauges

**Approach:**
1. Define value ranges per metric: safe (green), warning (yellow), danger (red)
2. Dynamic color based on current animated value
3. Color transitions smoothly between ranges
4. Import semantic colors from design-tokens

**Acceptance Criteria:**
- [ ] Gauge colors change based on value range
- [ ] Green/yellow/red ranges are logical for each metric
- [ ] Color transitions are smooth

---

### T2-6: Boot Sequence Skip Button
**Priority:** Medium
**Files:**
- `src/app/page.tsx` — Add skip button during boot animation

**Approach:**
1. Add "SKIP →" button in bottom-right during boot sequence
2. Click instantly completes all animations
3. Sets session storage flag for future visits
4. Subtle styling (muted text, appears after 1s)

**Acceptance Criteria:**
- [ ] Skip button visible during boot sequence
- [ ] Clicking it instantly shows final state
- [ ] Future visits skip automatically (session storage)
- [ ] Button is keyboard-accessible

---

### T2-7: Rename "Pending Review" Section
**Priority:** Low
**Files:**
- `src/app/documents/page.tsx` — Rename section label

**Approach:** Change "PENDING REVIEW" to "LATEST REPORTS" or "INTELLIGENCE REPORTS"

**Acceptance Criteria:**
- [ ] Section renamed to investor-friendly label
- [ ] No references to "pending" or "review" in investor-facing content

---

## WAVE 4: ACCESSIBILITY (Tier 3)
*Goal: Meet WCAG 2.1 AA baseline*
*Dependencies: Wave 1 (mobile nav) and Wave 2 (design tokens)*
*Estimated effort: 1 session*

### T3-1: Add useReducedMotion to All Animated Components
**Files:** Every component using Framer Motion or requestAnimationFrame
**Key files:**
- `src/components/RenPanel.tsx` — Stop canvas animation
- `src/components/DataRoomChat.tsx` — Stop mini-canvas
- `src/app/page.tsx` — Instant boot sequence
- `src/app/technology/controls/page.tsx` — Static gauge values

**Acceptance Criteria:**
- [ ] `prefers-reduced-motion: reduce` stops all animations
- [ ] Content is still fully visible and usable without motion

---

### T3-2: Add ARIA Landmarks
**Files:**
- `src/components/Sidebar.tsx` — Wrap in `<nav aria-label="Main navigation">`
- `src/app/layout.tsx` — Wrap content in `<main>`
- `src/app/layout.tsx` — Add skip link: `<a href="#main-content" class="sr-only focus:not-sr-only">`

**Acceptance Criteria:**
- [ ] Screen reader announces navigation and main content regions
- [ ] Skip link works with keyboard (Tab → Enter)

---

### T3-3: Add Visible Focus Indicators
**Files:**
- `src/app/globals.css` — Add focus-visible styles

**Approach:**
```css
:focus-visible {
  outline: 2px solid #ff6b35;
  outline-offset: 2px;
}
```

**Acceptance Criteria:**
- [ ] All interactive elements show orange outline on keyboard focus
- [ ] Focus ring doesn't appear on mouse click (focus-visible, not focus)

---

### T3-4: Fix Muted Text Contrast
**Files:** Components using `#6a6a7a` or `rgba(255,255,255,0.3)` on dark background

**Approach:**
- Replace `#6a6a7a` (3.1:1) with `#8a8a9a` (~4.6:1)
- Replace `rgba(255,255,255,0.3)` with `rgba(255,255,255,0.45)` for text content
- Keep lower-contrast values only for decorative/non-essential elements

**Acceptance Criteria:**
- [ ] All text content meets 4.5:1 contrast ratio (WCAG AA)
- [ ] Decorative elements excluded from requirement

---

### T3-5: Canvas Fallback Text
**Files:**
- `src/components/RenPanel.tsx` — Add `aria-label` to canvas
- `src/components/DataRoomChat.tsx` — Add `aria-label` to canvas

**Approach:**
```jsx
<canvas
  aria-label="Animated lightning bolt visualization for Ren AI assistant"
  role="img"
/>
```

**Acceptance Criteria:**
- [ ] Screen readers announce meaningful description for canvas elements

---

### T3-6: Optimize Canvas Performance
**Files:**
- `src/components/RenPanel.tsx` — Add visibility check

**Approach:**
1. Use IntersectionObserver to detect when canvas is visible
2. Stop `requestAnimationFrame` loop when canvas is off-screen
3. Throttle to 30fps when tab is in background (`document.hidden`)
4. Add `will-change: transform` to canvas container

**Acceptance Criteria:**
- [ ] Canvas animation pauses when scrolled off-screen
- [ ] CPU usage drops when canvas not visible
- [ ] No visual change when canvas is on-screen

---

## WAVE 5: CONTENT & NARRATIVE (Tier 4)
*Goal: Fill content gaps and strengthen narrative*
*Dependencies: None (content changes only)*
*Estimated effort: 1 session (content-dependent on Colby/team input)*

### T4-1: Technology System Diagram
**Files:**
- `src/app/technology/page.tsx` — Add interconnection diagram
- `public/images/` or inline SVG — System diagram

**Approach:** Create SVG showing how Cell → Power Converter → Controls → Efficiency connect as a system. Place above the 4-card module grid.

---

### T4-2: Documents "Start Here" Flow
**Files:**
- `src/app/documents/page.tsx` — Add featured/recommended section

**Approach:** Add a "START HERE" card at top with 3-5 essential documents (pitch deck, financial model, technology whitepaper). Uses accent border and prominent styling.

---

### T4-3: Eliminate /people Hub Page
**Files:**
- `src/app/people/page.tsx` — Remove or redirect to /team
- `src/components/Sidebar.tsx` — Update nav to link directly to /team and /proof

---

### T4-4: Add Investor Quote to Proof Page
**Files:**
- `src/app/proof/page.tsx` — Add testimonial/quote block

**Approach:** Add styled quote block with investor name, firm, and brief testimonial. Needs content from Colby.

---

### T4-5: Add Zeeco Context
**Files:**
- `src/app/projects/zeeco/page.tsx` — Add "About Zeeco" section

**Approach:** Brief paragraph: who Zeeco is, why they matter (major burner manufacturer, headquartered in Tulsa, validates the technology). 2-3 sentences max.

---

### T4-6: Show Investment Sizes on Proof Page
**Files:**
- `src/app/proof/page.tsx` — Add round size to investor cards

**Approach:** Add "Pre-Seed: $1.8M" context to investor section. Show Cortado, Hurricane, Techstars with participation details.

---

### T4-7: Zeeco Hero Image
**Files:**
- `src/app/projects/zeeco/page.tsx` — Add hero section matching NODE-01 layout
- `public/images/` — Hero rendering or photo

**Approach:** Match NODE-01 page structure with a hero image/rendering of the Zeeco ARC system. Needs content asset.

---

## EXECUTION NOTES

### Recommended GSD Structure
```
/gsd:new-milestone → "Visual Polish Sprint"
  Phase 1: Wave 1 (Critical Fixes)
  Phase 2: Wave 2 (Design System)
  Phase 3: Wave 3 (Visual Polish)
  Phase 4: Wave 4 (Accessibility)
  Phase 5: Wave 5 (Content)
```

### Content Dependencies (Needs Human Input)
- T2-1: Team headshots → Colby needs to provide photos
- T4-4: Investor quote → Colby needs to source testimonial
- T4-7: Zeeco rendering → Design/engineering asset needed
- T0-3: NODE-01 hero → Need photo or rendering

### Quick Wins (< 15 min each)
- T0-2: Fix logo (locate file, copy to public/)
- T2-7: Rename "Pending Review" (one string change)
- T3-2: Add ARIA landmarks (3 small edits)
- T3-3: Focus indicators (4 lines of CSS)
- T3-5: Canvas aria-labels (2 attributes)
- T4-3: Eliminate /people page (redirect + nav update)

### Verification
After each wave, re-run the screenshot agent to capture before/after comparisons. Use the visual audit workflow to score improvements.

---

*Fix plan generated 2026-03-22 from VISUAL_AUDIT_REPORT.md findings.*
