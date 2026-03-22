# Document Content Audit - Tobe Energy Data Room

**Audit Date:** 2026-03-22  
**Total Documents Reviewed:** 49 PDFs  
**Critical Issues Found:** 5 documents  
**High Priority Issues:** 1 document  

---

## CRITICAL ISSUES (Immediate Action Required)

### 1. ENG_GRANT_NavySBIR_N242-070_v2.pdf
**Location:** `engineering/grants/`  
**Pages:** ~14  
**Issues:**
- ❌ **Lou Mounsey reference** — Letter of Support section contains "Louis Mounsey, PMP, Arkema" with email and full signature
- ⚠️ Possible incomplete sentences detected

**Investor Impact:** HIGH — Former co-founder appearing in recent grant application creates confusion about current team composition. Investors will question when this was written and whether team info is current.

**Recommendation:** Replace letter of support with current team member or external partner endorsement. Update all team references.

---

### 2. ENG_Circuit_Efficiency_Testing_Diagram_v2.pdf
**Location:** `engineering/specifications/`  
**Pages:** ~1  
**Issues:**
- ❌ **Draft marker** — Contains "First Draft" and "DRAFTSMAN" text
- ❌ **Lou Mounsey reference** — Shows "L Mounsey" as draftsman

**Investor Impact:** CRITICAL — Technical diagram labeled as "First Draft" signals incomplete engineering documentation. Investor will assume specs aren't finalized.

**Recommendation:** Replace with final version or remove file. Update draftsman field.

---

### 3. ENG_BlockFlowDiagram_Final_v2.pdf
**Location:** `engineering/specifications/`  
**Pages:** ~1  
**Issues:**
- ❌ **Lou Mounsey reference** — Shows "L Mounsey" attribution

**Investor Impact:** MEDIUM — Name appears in diagram metadata/attribution only, not prominent, but creates team continuity questions.

**Recommendation:** Update diagram attribution to current team member.

---

### 4. TOBE-FEED-PKG-001.pdf (Zeeco ARC)
**Location:** `engineering/zeeco-arc/`  
**Pages:** ~12  
**Issues:**
- ❌ **Lou Mounsey reference** — "Louis Mounsey" appears in engineering package

**Investor Impact:** MEDIUM-HIGH — Zeeco partnership is a key validation point. Outdated team member in engineering deliverables raises questions about document currency and partnership status.

**Recommendation:** Verify with Zeeco if updated version exists. If this is the official deliverable, consider adding a cover note explaining team transition.

---

### 5. OU_Case_Study_Final_Report.pdf
**Location:** `market/case-studies/`  
**Pages:** ~38  
**Issues:**
- ❌ **Lou Mounsey references** — Multiple mentions:
  - "Interview with Louis Mousney [sic], Co-founder of Tobe"
  - "Louis Mousney is based in Paris and currently works at Arkema..."
  - References to Mounsey's role as "CFO and Co-Founder"
- ⚠️ Possible incomplete sentences

**Investor Impact:** CRITICAL — This is a substantial case study prominently featuring a departed co-founder as current team. Investors will immediately notice the discrepancy. The misspelling ("Mousney" vs "Mounsey") adds to the unprofessional appearance.

**Recommendation:** Either (1) remove this document entirely, (2) add a prominent disclaimer note explaining Lou's departure and when this was authored, or (3) commission an updated version with current team interviews.

---

## HIGH PRIORITY ISSUES

### 6. MKRT_OTH_OCAST_ScienceInnovationPlan_v2.pdf
**Location:** `market/research/`  
**Pages:** ~41  
**Issues:**
- ⚠️ **Draft markers** — Contains "DRAFT" and "REVIEW" text in multiple locations
- ⚠️ Possible incomplete sentences

**Investor Impact:** MEDIUM — Draft markers in 41-page strategic plan suggest document isn't finalized. However, context suggests these are action items ("Draft legislation..."), not document status markers.

**Recommendation:** Manual review to confirm. If "DRAFT" refers to document status, finalize or remove. If it's part of content (e.g., "draft legislation"), context is acceptable.

---

## MEDIUM PRIORITY ISSUES

### General Pattern: Incomplete Sentences
**Affected:** 42 out of 49 documents  
**Issue:** PDF text extraction detected lines ending with conjunctions, prepositions, or commas, suggesting possible sentence breaks or formatting artifacts.

**Analysis:** This is likely a **pdftotext extraction artifact** rather than actual document errors. PDFs with multi-column layouts, tables, or text wrapping often produce false positives.

**Recommendation:** 
- **LOW PRIORITY** — Manual spot-check 3-5 documents in PDF viewer to confirm
- If confirmed as extraction issue, ignore
- If actual incomplete sentences found, prioritize critical investor-facing docs (overview/, market/research/)

---

## NO ISSUES DETECTED

The following documents passed all checks cleanly:

- `engineering/zeeco-arc/TOBE-EL-001.pdf`
- `engineering/zeeco-arc/TOBE-PFD-001.pdf`
- `engineering/zeeco-arc/TOBE-PID-001.pdf`
- `legal/ip/Patent_Figures.pdf`
- `legal/regulatory/_SUMMARY.pdf`

---

## SEARCH RESULTS: No Issues Found

- ✅ **No placeholder text** `[TODO]`, `[FILL]`, `[TBD]`, `[INSERT]` found in any document
- ✅ **No outdated figures** — Did not find $466M, $5.25, $2M pre-seed, or "3 LOIs"
- ✅ **No comment artifacts** — No "Jane:", "Comment:", or obvious review thread text
- ✅ **No corrupted/empty PDFs** — All documents contained substantial content (>100 characters)

---

## IMMEDIATE ACTION ITEMS (Priority Order)

1. **CRITICAL:** Remove or update **OU_Case_Study_Final_Report.pdf** — Most investor-facing, most prominent Lou references
2. **CRITICAL:** Replace **ENG_Circuit_Efficiency_Testing_Diagram_v2.pdf** — Remove "Draft" marker
3. **CRITICAL:** Update **ENG_GRANT_NavySBIR_N242-070_v2.pdf** — Replace letter of support
4. **HIGH:** Manually verify **MKRT_OTH_OCAST_ScienceInnovationPlan_v2.pdf** — Confirm DRAFT context
5. **MEDIUM:** Update diagrams (**ENG_BlockFlowDiagram_Final_v2.pdf***, **TOBE-FEED-PKG-001.pdf**) — Remove Mounsey attribution

---

## SUMMARY STATS

| Category | Count |
|----------|-------|
| Total PDFs Audited | 49 |
| Critical Issues | 5 |
| High Priority | 1 |
| Medium Priority | 42 (likely false positives) |
| Clean Documents | 5 |
| Documents with Lou References | 5 |
| Documents with Draft Markers | 2 |
| Documents with Placeholders | 0 |
| Documents with Outdated Figures | 0 |

---

## AUDIT METHODOLOGY

**Tools Used:**
- `pdftotext` for text extraction
- Pattern matching for: placeholders, Lou/Louis/Mounsey, draft markers, outdated figures, comment artifacts
- Character count validation for corruption detection
- Regex-based sentence completion analysis

**Known Limitations:**
- "Incomplete sentence" detection has high false-positive rate due to PDF formatting artifacts
- Cannot detect visual/design issues (only text content)
- Cannot verify numerical accuracy within context (e.g., efficiency claims in paragraphs)
- Manual review recommended for final verification of critical documents

---

**Next Steps:** Address all CRITICAL issues before sharing data room with investors. The Lou Mounsey references are the highest-impact problem.
