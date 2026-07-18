# Grimm Fracture — Comic strips

Host the same vertical Webtoon files here that you upload to Webtoon / Tapas / other platforms.

## Folder layout

```
public/comics/
  leap-1/
    001.webp
    002.webp
    003.webp
    ...
  leap-2/
    001.webp
    ...
```

## Naming

- Prefer zero-padded numbers: `001`, `002`, `010`…
- Formats: `.webp` (best), `.png`, `.jpg`, `.gif`, `.avif`
- Natural sort is used — `page-1.png` also works

## Webtoon export tips

- Vertical scroll strips, full-width art
- Typical Webtoon width ~800px (reader max-width matches)
- Keep file sizes lean for mobile scroll

## Register new Leaps

Add an entry in `src/lib/comics.ts` (`EPISODES`), create `public/comics/<slug>/`, drop files, deploy.
