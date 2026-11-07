# Art from a transaction id — the same string, the same scene

> **Trust:** `educational-reference`  
> **Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** Teach a pure seed: normalize 16–64 hex, derive params, emit a scene of circles and lines, and paint the same command list twice. No `Math.random`. No chain read.

**Real code:** `npm test`. **Does not** fetch a transaction or mint an NFT.

The course is [EDUCATION.md](EDUCATION.md).

## What is true (executed)

| Rule | Result |
| --- | --- |
| `normalizeTxHash` with `0x` and uppercase | lowercase 64-char hex |
| short hex `abcdabcdabcdabcd` | padded to 64 |
| empty, `zzzz`, `abc` | throw |
| same hash with `0X` prefix | same params |
| different hash | at least one of hue, rings, spokes differs |
| hue | 0 .. 359 |
| rings | 4 .. 12 |
| spokes | 5 .. 16 |
| scene at size 320 | one circle per ring, one line per spoke |
| `paintScene` twice | same command list |

## What is in the repo

| Piece | Role |
| --- | --- |
| `src/seed.ts` | normalize, params, scene, paint |
| `src/seed.test.ts` | the executed rule |
| `src/CanvasArt.tsx` / `Demo.tsx` | interactive canvas |
| Docs | EDUCATION · POLICY · ARCHITECTURE · VERIFICATION-LOG |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** treat the tx id as a string you already have.  
**Do** keep the scene as commands so canvas and SVG can share it.  
**Do** re-paint and expect the same list.

**Do not** call `Math.random`.  
**Do not** claim a passing hex string is a WAX transaction.  
**Do not** claim the art is unique to an NFT. Same hash, same params.

## Related

- `wax-drops-and-pack-opening-experience`
- `wax-seizure-safe-animations` (if the canvas animates, respect reduced motion)

MIT — Pixel Journey
