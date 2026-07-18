# Workflow: Publishing Pipeline (Speed)

Optimized for frequent web comic page drops with Gemini assistance.

## Cadence options

| Mode | Write | Art | Publish |
|------|-------|-----|---------|
| **Sprint** | 4 pages / weekend | 2 pages / weekday | 2× week |
| **Steady** | 8 pages ahead | 1 page / day | 3× week |
| **Arc burst** | Full Leap outline first | Batch key frames | Weekly 4-page dump |

Pick one; don’t mix mid-Leap.

---

## Pipeline stages

### 0) Canon load (once)
Gem knowledge = bible + style + characters + active Leap.

### 1) Outline lock
`/outline` → KEEP → paste into `leaps/LEAP_01_1888.md`.

### 2) Page factory
For each page:
1. `/script N`  
2. KEEP/TWIST once  
3. Art brief → `/prompt`  
4. Generate with character locks + refs  
5. Consistency checklist (`STYLE_GUIDE.md`)  
6. Export → letter/upload  

### 3) Buffer
Never publish your only finished page. Keep **+2 pages** in buffer.

### 4) Changelog
After each drop, note in Leap file:

```
## Publish log
- YYYY-MM-DD: pages X–Y live
- Drift caught: …
- Lock updates: none / [file]
```

---

## Roles split (recommended two Gems)

| Gem | Owns |
|-----|------|
| **Writer** | ideas, outlines, scripts, critique |
| **Art Director** | prompts, consistency repair, model-sheet checks |

Same knowledge files; different `GEM_SYSTEM` emphasis (story vs image).

---

## Definition of Done (single page)

- [ ] Serves outline beat  
- [ ] Micro-cliff present  
- [ ] Character locks pass checklist  
- [ ] Readable at phone width  
- [ ] Filename convention: `GF_L01_P##.png` (or your host’s pattern)  

---

## Speed multipliers

1. Reuse establishing backgrounds.  
2. Recycle Ironclad crowd plates.  
3. Keep Alice vials as the only neon accent (faster color hierarchy).  
4. Script silent pages when dialogue stalls.  
5. Generate **expression sheets** once; crop into panels later.
