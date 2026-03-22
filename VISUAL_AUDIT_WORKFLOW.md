# VISUAL AUDIT WORKFLOW — Reusable Prompt & Process

**Purpose:** A repeatable workflow for conducting comprehensive visual design audits on any Next.js/React web application. Designed to run with Claude Code + Superpowers skills.

---

## WHEN TO RUN THIS AUDIT

- Before a major investor demo or launch
- After completing a design sprint
- When onboarding a new designer to understand current state
- Quarterly health check on visual consistency
- After merging 20+ PRs to catch drift

---

## PREREQUISITES

- Claude Code with Superpowers skills installed
- Playwright MCP server available (for screenshots)
- Dev server accessible (localhost or Tailscale)
- ~30 minutes for full audit

---

## THE WORKFLOW

### PHASE 1: CODEBASE EXPLORATION (Parallel — 4 Agents)

Launch 4 parallel Explore agents simultaneously:

#### Agent 1: Site Map
```
Very thorough exploration of [PROJECT_PATH].

Map every page/route in this Next.js App Router project:
1. Every route/page file (page.tsx, layout.tsx) in src/app/
2. Every layout wrapper and what it provides
3. What each page renders (main components used)
4. Navigation structure — how pages link to each other
5. Dynamic routes, route groups, protected routes
6. For each page: route path, key component imports, own layout, loading/error states

Produce a complete site map.
```

#### Agent 2: Component Inventory
```
Very thorough exploration of component architecture at [PROJECT_PATH].

Map every UI component:
1. File path and name
2. What it renders (brief description)
3. Props it accepts
4. Client-side features ('use client')
5. Component dependencies (tree)
6. Animations (Framer Motion usage)
7. Size/complexity assessment

Identify: shared vs page-specific, component patterns, duplications, inconsistencies.
```

#### Agent 3: Design System Extraction
```
Very thorough exploration of design system and styling at [PROJECT_PATH].

Analyze:
1. Color palette — every hex, RGB, HSL, Tailwind color class, CSS variable
2. Typography — font families, sizes, weights, line heights, letter spacing
3. Spacing — padding/margin patterns, container widths, gaps
4. Tailwind config — custom theme extensions
5. Global styles — globals.css, CSS variables, keyframes
6. Animation patterns — Framer Motion variants, CSS transitions
7. Responsive breakpoints — mobile/tablet/desktop handling
8. Theme/dark mode implementation

Produce a complete design system inventory with inconsistencies highlighted.
```

#### Agent 4: Visual Screenshots
```
Capture screenshots of every page of the Next.js site.

1. Start or verify dev server at [DEV_URL]
2. For EACH page found:
   - Screenshot at 1440px (desktop)
   - Screenshot at 375px (mobile)
   - DOM snapshot
   - Note interactive elements, modals, dropdowns
3. Describe each page visually: layout, colors, typography, spacing, impression
4. Note anything inconsistent, broken, or improvable
5. Check for broken images, 404s, missing assets
```

### PHASE 2: FORMAL SKILL AUDITS (Sequential)

After Phase 1 completes, run these skills:

#### Audit A: 6-Pillar UI Review
```
/gsd:ui-review
```
Produces scored `UI-REVIEW.md` covering:
- Layout (structure, alignment, grid)
- Typography (hierarchy, readability, consistency)
- Color (palette adherence, contrast, semantics)
- Spacing (rhythm, density, whitespace)
- Interaction (hover, focus, animation, feedback)
- Responsiveness (breakpoints, mobile, scaling)

#### Audit B: Web Design Guidelines
```
/web-design-guidelines
```
Reviews against Web Interface Guidelines for:
- Accessibility (ARIA, focus, keyboard, screen reader)
- Forms (labels, validation, error states)
- Animation (motion preferences, performance)
- Typography (scale, readability, hierarchy)
- Performance (bundle size, lazy loading, rendering)
- UI patterns (consistency, platform conventions)

#### Audit C: Frontend Design Quality
```
/frontend-design
```
Evaluates:
- Creative distinctiveness (does it look like "yet another template"?)
- Polish level (investor-grade? MVP-grade?)
- Design system coherence
- Visual rhythm and composition
- Aesthetic identity strength

### PHASE 3: CONSOLIDATION

Synthesize all findings into a single `VISUAL_AUDIT_REPORT.md`:

```markdown
# [PROJECT NAME] — Visual Audit Report

## Executive Summary
- Overall score (X/10)
- Top 3 critical issues
- Top 3 strengths
- Recommended priority order

## Critical Issues (P0–P1)
[Blocking issues that must be fixed immediately]

## Page-by-Page Deep Dive
[For each page:]
### Page: [Name] ([Route])
- Layout analysis
- Typography usage
- Color application
- Spacing/alignment
- Animation/interaction
- Mobile responsiveness
- Accessibility
- Issues found
- Recommendations
- Score: X/10

## Design System Audit
### Colors
[Full inventory, inconsistencies, recommendations]
### Typography
[Scale analysis, inconsistencies, recommendations]
### Spacing
[Grid analysis, inconsistencies, recommendations]
### Components
[Pattern analysis, duplications, missing components]
### Animations
[Consistency, performance, accessibility]

## Cross-Cutting Concerns
### Mobile Responsiveness
### Accessibility
### Performance

## 6-Pillar Scored Rubric
| Pillar | Score | Assessment |
|--------|-------|------------|
[Scored table]

## Prioritized Fix List
### Tier 0 — Critical (must fix before next demo)
### Tier 1 — Design System Foundation
### Tier 2 — Visual Polish
### Tier 3 — Accessibility & Performance
### Tier 4 — Content & Narrative
```

### PHASE 4: FIX PLANNING

Generate `VISUAL_AUDIT_FIX_PLAN.md`:

```markdown
# Fix Plan

For each fix item:
- Task ID and description
- Files to modify
- Approach (what to do)
- Dependencies (what must be done first)
- Estimated complexity (S/M/L)
- Acceptance criteria
```

Group fixes into implementation waves that can be executed with `/gsd:plan-phase` or `/gsd:execute-phase`.

---

## COPY-PASTE ORCHESTRATION PROMPT

Use this prompt to kick off the full audit in one shot:

```
I need a comprehensive visual design audit of this Next.js site. Run the full
audit workflow:

1. Launch 4 parallel exploration agents:
   - Agent 1: Map all pages/routes (site map)
   - Agent 2: Inventory all components (architecture)
   - Agent 3: Extract full design system (colors, typography, spacing, animations)
   - Agent 4: Capture screenshots of every page (desktop 1440px + mobile 375px)

2. Once exploration is complete, run formal audits:
   - /gsd:ui-review (6-pillar scored audit)
   - /web-design-guidelines (accessibility + best practices)
   - /frontend-design (design quality assessment)

3. Consolidate everything into VISUAL_AUDIT_REPORT.md:
   - Executive summary with overall score
   - Page-by-page deep dive (every page, every section)
   - Design system audit (colors, typography, spacing, components, animations)
   - Cross-cutting concerns (mobile, accessibility, performance)
   - 6-pillar scored rubric
   - Prioritized master fix list (Tier 0 through Tier 4)

4. Generate VISUAL_AUDIT_FIX_PLAN.md:
   - Every fix item with files to modify, approach, dependencies, complexity
   - Grouped into implementation waves
   - Acceptance criteria for each fix

The audit should be extremely thorough — page by page, section by section,
component by component. Score everything. Miss nothing. This is for an investor-
facing site raising $10M.
```

---

## VARIATIONS

### Quick Audit (10 minutes)
Skip Phase 1 Agent 4 (screenshots) and Phase 2 Audit C (design quality). Focus on code analysis only.

### Design System Only
Run only Phase 1 Agent 3 (design system extraction) + Phase 2 Audit A (6-pillar). Produces focused design token recommendations.

### Mobile-Only Audit
Run Phase 1 Agent 4 at mobile widths only (320px, 375px, 428px). Focus scoring on responsiveness pillar.

### Accessibility-Only Audit
Run Phase 2 Audit B (web design guidelines) + manual ARIA/keyboard/contrast review. Produces WCAG compliance report.

### Pre-Deploy Check
Run Phase 1 Agent 4 (screenshots) only. Visual diff against previous screenshots. Flag regressions.

---

## INTEGRATION WITH GSD WORKFLOW

This audit naturally feeds into GSD phases:

```
Audit → /gsd:new-milestone (create "Visual Polish" milestone)
      → /gsd:add-phase (one phase per Tier)
      → /gsd:plan-phase (plan each phase)
      → /gsd:execute-phase (execute fixes)
      → Re-run audit (verify improvements)
```

Recommended milestone structure:
```
Milestone: Visual Polish v1
  Phase 1: Critical Fixes (Tier 0) — mobile nav, broken assets
  Phase 2: Design System Foundation (Tier 1) — tokens, typography, components
  Phase 3: Visual Polish (Tier 2) — photos, search, anchors
  Phase 4: Accessibility (Tier 3) — ARIA, focus, contrast
  Phase 5: Content (Tier 4) — diagrams, flows, context
```

---

*This workflow was generated from a live audit of the Tobe Energy Data Room on 2026-03-22.*
