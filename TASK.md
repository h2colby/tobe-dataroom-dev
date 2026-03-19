# Task: Integrate Pipeline Dashboard into NERV Data Room

## Goal
Merge the HTML pipeline dashboard (from the screenshot) into the NERV data room as a "Customers/Pipeline" section accessible from the main navigation.

## Current State
- `/src/components/PipelineNetwork/` — React component (basic, needs enhancement)
- `/tobe-dataroom/` — Full NERV data room with auth, slides, etc.
- `/tobe-dataroom-nerv/` — Simpler NERV HTML version
- `~/clawd/dataroom-assets/pipeline/pipeline-map-v2.html` — Reference HTML with the full dashboard layout

## Requirements

### 1. Full Dashboard Layout (like the HTML version)
The React version should match the HTML dashboard:
- **Header bar**: "TOBE ENERGY // PIPELINE COMMAND" with live indicator
- **Stats row**: 5 cards (Total Pipeline $100M+, Signed/LOI $20M+, Active Quotes $32M, Scale Potential $75M, Opportunities 12)
- **Main area**: Network visualization on left (60-70% width)
- **Right sidebar**: 
  - TOP OPPORTUNITIES BY VALUE (sorted list)
  - PIPELINE BY SECTOR (horizontal bars: Transit, Industrial, Steel, E-Fuels, Mobility)
- **Oklahoma inset box** in bottom-left of network area
- **Legend** at bottom

### 2. Visual Styling
Match the NERV aesthetic exactly:
- Background: #0a0a0f
- Cards: #1a1a24 with colored bottom borders
- Orange accent: #ff6b35
- Cyan: #00d4ff  
- Green (contracted): #00ff88
- Yellow (quoting): #ffcc00
- Purple: #a855f7
- Grid background with subtle cyan lines
- JetBrains Mono for all monospace text

### 3. Navigation Integration
Add "CUSTOMERS" or "PIPELINE" to the NERV data room navigation that links to this dashboard.

### 4. Data
Use the existing `pipelineData.ts` — all 12 opportunities are already defined with:
- codename, location, status, value, capacity, sector, vertical, region, notes

### 5. Reference Files
- Look at `~/clawd/dataroom-assets/pipeline/pipeline-map-v2.html` for the complete HTML/CSS
- The current React component is at `/src/components/PipelineNetwork/PipelineNetwork.tsx`

## Technical Notes
- Use Framer Motion for animations
- Round all SVG coordinates to integers (avoid hydration errors)
- Test mobile responsiveness
- Keep the network diagram interactive (hover tooltips)

## Success Criteria
- Pipeline dashboard accessible from NERV data room navigation
- Matches the HTML dashboard layout and styling
- All 12 opportunities displayed with correct data
- Sector breakdown bars showing accurate percentages
- Mobile responsive
- No hydration errors
