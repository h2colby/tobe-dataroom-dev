# PDF Document Generator — CLAUDE.md

## Overview
Generate investor-grade PDF documents from HTML templates using Playwright, then iteratively review and fix formatting issues using screenshot-based QA.

## Design System
- Background: #0a0a0f (near-black)
- Primary accent: #ff6b35 (orange)
- Success/highlight: #00ff88 (green)
- Info/secondary: #00d4ff (cyan)
- Font: system monospace for headers, system sans-serif for body
- Logo: /public/images/tobe-logo.svg
- Page size: US Letter (8.5" x 11")
- Margins: 0.75" all sides
- Footer on every page: "TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024 — CONFIDENTIAL"
- Page numbers: bottom right

## CSS Rules for Print
- `page-break-inside: avoid` on all cards, tables, stat blocks
- `page-break-before: always` on major section headers (after first page)
- `orphans: 3; widows: 3` on all paragraph text
- Tables: if a table won't fit on the current page, break before it (never mid-row)
- Images: never split across pages
- Minimum 1" of content must remain on a page after a break (no orphaned headers)

## Review Agent Loop
1. Render HTML → PDF via Playwright
2. Convert each PDF page to PNG (pdftoppm or Playwright screenshot)
3. For each page image, check:
   - Is any text cut off at the bottom of the page?
   - Is any table row split across the page boundary?
   - Is the footer present and properly positioned?
   - Is there excessive whitespace (>40% of page is blank)?
   - Are margins consistent?
   - Is the page number correct?
4. If issues found → adjust CSS → re-render → re-check
5. Max 5 iterations
6. Output: final PDF + QA report

## Documents to Generate

### Document 1: Hydrogen Pricing Transparency Report
Source: ~/clawd/hydrogen-pricing-transparency.md
Sections:
- Cover page (logo, title, confidential stamp, date)
- Why Hydrogen Pricing Is Confusing
- Tobe's Platts-Published Cost Breakdown (table)
- Market Comparison (table with color coding)
- Key Insight callout

### Document 2: Competitive Landscape Report  
Source: ~/clawd/competitive-landscape-report.md
Sections:
- Cover page
- Executive Summary
- Company Profiles (Advanced Ionics, Fourier, HGen)
- Comparison Table
- Capital Efficiency Analysis (stat cards)
- Timeline
- Key Takeaways
