# Character Lock Prompt Pack

Copy these when generating with Gemini image tools. Always attach reference art if the UI allows.

---

## Universal wrapper

```
SERIES: Grimm Fracture web comic by BasicHiro.
STYLE LOCK: Frenetic comic illustration style: scratchy ink outlines, heavy
cross-hatching, gritty Victorian fairy-tale noir, aged parchment texture,
muted earthy palette (oxblood red, dirty teal, soot brown, parchment tan),
dramatic exhausted faces, high contrast shadows. NOT clean anime, NOT Disney,
NOT photoreal CGI, NOT chibi.

[PASTE CHARACTER LOCKED VISUAL BLOCK HERE]

SCENE: [describe action, camera, emotion]
CAMERA: [portrait / full body / 3/4 action / rooftop wide]
CONSISTENCY: keep all identity anchors; forbid drift list from character file.
```

---

## Red — portrait

```
[UNIVERSAL WRAPPER]
[PASTE RED_1888 LOCKED VISUAL BLOCK]
SCENE: Close portrait of Red, exhausted defiant glare, oxblood coat collar up,
soot under eyes, parchment background, face detail sharp.
```

## Red — armed full body

```
[UNIVERSAL WRAPPER]
[PASTE RED_1888 LOCKED VISUAL BLOCK]
SCENE: Full body, standing on wet Victorian cobblestones, holding bloodstained
steam-train fire axe, coat pleats visible, steel-toed boots planted, ready stance.
```

## Alice — portrait

```
[UNIVERSAL WRAPPER]
[PASTE ALICE_1888 LOCKED VISUAL BLOCK]
SCENE: Close portrait, manic glare, keyhole cheek brands, scar through right
eyebrow, teacup choker, black bow headband, stained apron collar edge visible.
```

## Alice — flask action

```
[UNIVERSAL WRAPPER]
[PASTE ALICE_1888 LOCKED VISUAL BLOCK]
SCENE: 3/4 action lunge, raising bubbling toxic-green flask, taped hands,
vial belt glowing, overgrown Victorian alley behind her.
```

## Duo shot (highest consistency risk — use both locks)

```
[UNIVERSAL WRAPPER]
[PASTE RED_1888 LOCKED VISUAL BLOCK]
[PASTE ALICE_1888 LOCKED VISUAL BLOCK]
SCENE: Red and Alice back-to-back in Overgrown Wonderland street; Red with axe,
Alice with green flask; mutated vines on brick; smog; tense readiness.
Keep both face locks accurate; do not blend their costumes.
```

## Ironclad shield wall

```
[UNIVERSAL WRAPPER]
[PASTE IRONCLAD_SPADES_M323 LOCKED VISUAL BLOCK]
SCENE: Eight Ironclad Spades in shield-wall formation blocking a narrow alley,
white-iron chest slabs forming a continuous black-spade wall, steam batons ready.
```

## Stalker rooftop

```
[UNIVERSAL WRAPPER]
[PASTE STALKER_DIAMOND LOCKED VISUAL BLOCK]
SCENE: Diamond-Scale Stalker crouched on cathedral ridge, porcelain mask with
blood-red diamond eye, fanning serrated razor-cards, smog city behind.
```

---

## Consistency repair prompt

Use when a generation almost works:

```
Same character and scene, CORRECT these drifts only: [list misses].
Do not redesign. Keep pose and composition. Match LOCKED VISUAL BLOCK exactly
for: [anchors missed].
```
