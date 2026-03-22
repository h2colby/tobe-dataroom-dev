# Data Room Content Prep — Local Model Task

## Goal
Extract, organize, and format all data room content into a single reference file that Claude Code can use directly when building pages. This eliminates the need to read PDFs/xlsx files during UI development.

## Output Files

### 1. DATAROOM_CONTENT.md
Single master content file organized by page:

#### /overview
- Company one-liner and key metrics (>92% HHV, <$2/kg, $100M+ pipeline, 7 sectors)
- 4-card summary linking to Technology, Business, Team, Resources

#### /technology
- How the electrolyzer works (capacitive electrolysis, pulsed waveform, no membrane)
- Key specs: 46 kWh/kg measured, 27-28°C operating temp, no rare earths, no cooling
- Comparison table vs PEM/alkaline (from TEA deep research report benchmarks)
- Wall-to-plug efficiency distinction (critical differentiator)

#### /technology/system
- Process flow description: Power → Power Electronics → Controls → Electrolyzer → Gas Sep → H2 + O2
- Specs for each block (from H&MB: pressures, temps, flows)
- Interactive diagram content/labels

#### /hmi
- Already built — just note what exists

#### /business/pipeline
- Full pipeline data (from TEA_PIPELINE_NARRATIVE.md)
- All 12 opportunities with codenames, capacity, sector, status
- Revenue breakdown: system sales vs offtake
- Geographic distribution

#### /business/model
- Dual revenue streams: hardware sales + hydrogen offtake (HaaS)
- Unit economics at each price point
- The on-site advantage story (75-85% of delivered H2 cost is transport)

#### /financials
- Key projections from financial model v8.5.3 / v4.3.0
- Revenue ramp, EBITDA, margins
- Burn rate, runway, funding history ($1.8M pre-seed)
- Cap table summary

#### /tax-credits
- 45V production tax credit ($3/kg for clean H2)
- GREET pathway analysis
- PPA ROI scenarios
- Already built — extract key content

#### /team
- Colby DeWeese bio (from resume in memory/colby-resume.md)
- Dr. Caleb Lareau bio
- Company background

#### /resources
- Pitch deck link: tobe.energy/deck (pw: investor2026)
- Patent/IP status summary
- Media assets inventory

### 2. ASSET_INVENTORY.md
List every file in ~/clawd/dataroom-assets/ with:
- File path
- File type (PDF, image, video, spreadsheet)
- Size
- Which data room page it belongs on
- Brief description of contents

### 3. COMPONENT_SPECS.md
Extract from H&MB and operating data:
- T-25 unit specs (25 kg/day, power, water, temp, pressure)
- T-125 unit specs (if available)
- System energy consumption breakdown
- Water consumption per kg H2
- Operating conditions summary table

## Source Files
All in ~/clawd/dataroom-assets/ and ~/clawd/tea-agent-inputs/

## Instructions
- Extract REAL data only — no fabrication
- Include source file path for every number
- Format in clean markdown ready for a React developer to consume
- Tables where appropriate
- Keep it factual and concise — this is reference material, not prose
