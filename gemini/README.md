# Grimm Fracture — Gemini Production Kit

AI-assisted web comic pipeline for **BasicHiro / Core Node**.

Upload this folder into a Gemini Gem (or paste key files into Gemini memory) so every outline, page script, and image prompt pulls from the same locked canon.

## What this kit solves

| Pain | Fix |
|------|-----|
| Characters drift between generations | Locked visual + personality sheets in `characters/` |
| Slow outlining / blank-page stall | Idea sprint + outline templates in `workflows/` |
| Inconsistent art style | Global style lock in `STYLE_GUIDE.md` |
| Slow publish cadence | Page factory loop in `workflows/PUBLISHING_PIPELINE.md` |
| Weak iteration | Feedback loops in `workflows/ITERATION_LOOPS.md` |

## Folder map

```
gemini/
  README.md                 ← you are here
  GEM_SYSTEM.md             ← paste as Gem instructions
  SERIES_BIBLE.md           ← world rules, tone, non-negotiables
  STYLE_GUIDE.md            ← art + panel language lock
  characters/               ← exact visual memory for Gemini
  leaps/                    ← per-Leap outlines + beat sheets
  prompts/                  ← copy-paste prompt blocks
  workflows/                ← how to run sessions day-to-day
```

## Quick start (15 minutes)

1. Create a Gemini Gem named **Grimm Fracture Writer**.
2. Paste the full contents of `GEM_SYSTEM.md` into the Gem instructions.
3. Attach / upload these as knowledge files (priority order):
   - `SERIES_BIBLE.md`
   - `STYLE_GUIDE.md`
   - `characters/RED.md`
   - `characters/ALICE.md`
   - `characters/IRONCLAD_SPADES.md`
   - `characters/DIAMOND_SCALE_STALKERS.md`
   - `leaps/LEAP_01_1888.md`
4. Optionally create a second Gem: **Grimm Fracture Art Director** with the same character + style files, focused on image prompts only.
5. Run session type A from `workflows/IDEA_SPRINT.md`.

## Daily publishing loop (short)

1. **Idea sprint** (10–20 min) → pick 1 angle  
2. **Beat sheet** (20–40 min) → lock page count  
3. **Script pages** (iteration loop) → approve / revise  
4. **Panel prompts** from locked character IDs  
5. **Generate → critique → regenerate** (max 3 passes)  
6. **Ship page / batch** → log what locked vs drifted

Full detail: `workflows/PUBLISHING_PIPELINE.md`

## Character IDs (always use these names in prompts)

| ID | Display | Leap 1 role |
|----|---------|-------------|
| `RED_1888` | Red | Street Enforcer Echo |
| `ALICE_1888` | Alice | Manic Botanist Echo |
| `IRONCLAD_SPADES_M323` | Ironclad Spades | Phalanx Fodder |
| `STALKER_DIAMOND` | Diamond-Scale Stalkers | Agile Assassin |

When prompting Gemini Image / Nano Banana / Imagen:  
**Reference the character ID + paste the LOCKED VISUAL BLOCK from that file.** Never paraphrase from memory.

## Canon hierarchy (what wins conflicts)

1. Character LOCKED VISUAL BLOCKS  
2. `SERIES_BIBLE.md` world rules  
3. Active Leap file (`leaps/LEAP_XX_*.md`)  
4. Style guide  
5. New ideas from a sprint (must be marked DRAFT until promoted)

## How to promote a new idea into canon

1. Generate options in an Idea Sprint.  
2. Mark winner as `CANDIDATE`.  
3. After you approve, move it into the Leap file or Series Bible.  
4. Update character locks only if appearance truly changes (rare — Echoes change by era, not mid-Leap).

## Reference art in this repo

Use these as visual anchors when uploading to Gemini:

| Asset | Path |
|-------|------|
| Red portrait | `/public/red-front.png` |
| Red model sheet | `/public/red-turnaround.png` |
| Alice portrait | `/public/alice-front.png` |
| Alice model sheet | `/public/alice-turnaround.png` |
| Ironclad Spades | `/public/ironclad.png` |
| Diamond-Scale Stalker | `/public/stalker.png` |
| Setting concepts | `/public/concept-1.png` … `concept-3.png` |
