# wax-generative-art-seed-canvas

**Trust label:** `educational-reference`  
**Status:** Private. Seed normalization, parameters, and the paint command list are tested offline.

One-sentence goal: turn a hex transaction id into a small picture that is the same in every browser, without `Math.random`, IPFS, or a backend.

Parent catalog: [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

## Quick start

```bash
git clone https://github.com/pixel-journey/wax-generative-art-seed-canvas.git
cd wax-generative-art-seed-canvas
npm install
npm test
npm run dev
```

Paste another 64-character hex string. The canvas redraws once. There is no animation.

## Why this exists

“Generative NFT” demos often hide a `random()` call or a server seed. A mint transaction id is already unique and public. Using it as a seed is easy to explain and easy to test: same input, same scene.

This picture is **not** automatically the media for an AtomicAssets template. It is a renderer you can choose to attach.

## Concepts

| Piece | Rule |
| --- | --- |
| Normalize | Trim, strip one `0x`, lowercase, require 16–64 hex chars, pad to 64 |
| Params | Five `uint32` slices pick hue, rings (4–12), spokes (5–16), saturation, lightness, twist |
| Scene | Circles and lines with coordinates rounded to 2 decimals |
| Paint | `paintScene` replays that list onto any tiny canvas-like interface |

`Math.cos` / `Math.sin` are deterministic for the same inputs in JS. The tests lock the command list, not a PNG hash (canvas anti-aliasing can differ by GPU).

## Patterns

**Simple.** `paramsFromSeed(txId)` and show the numbers.

**Recommended.** `sceneFromParams(params, size)` and draw it. The React demo uses a real `<canvas>` plus a text caption so the seed is not only visual.

**Advanced.** Implement `PaintContext` for SVG if you need a file export without reading pixels back. The command list is the interchange format.

## Demo

Default seed `a11ce000c0ffee00…`. The caption prints hue, ring count, and spoke count. An invalid string shows the parser error and does not clear a previous successful interpretation inside the canvas component — the alert replaces the canvas.

## Integration

```ts
import { paintScene, paramsFromSeed } from "./examples/seed";

const params = paramsFromSeed(asset.mintTxId);
paintScene(yourCanvasAdapter, params, 640);
```

Where to get `mintTxId` on WAX: AtomicAssets asset objects often include a `minted_at_time` but the **transaction id** may require a Hyperion lookup around the mint action. That lookup is **not** implemented or verified here. Until it is, pass a hash you already have.

## Best practices and anti-patterns

Do:

- Pad and lowercase before slicing so `0xABC` and `abc` cannot diverge.
- Round coordinates before compare or snapshot.
- Describe the picture in text.

Do not:

- Seed with `Date.now()` or `Math.random()` and still say “on-chain.”
- Claim the asset id and the mint transaction id are the same field.
- Hash the string with a locale-sensitive formatter.
- Animate on a loop unless you also honor `prefers-reduced-motion`. This demo does not animate.

## Edge cases

| Input | Result |
| --- | --- |
| `0x` + 64 hex | Same params as bare lowercase |
| 16 hex chars | Pad start with zeros, then slice |
| 15 hex chars, or non-hex | Throw |
| `size < 32` | Throw |
| Same params painted twice | Identical command list |

## Safety and accessibility

No wallet. Canvas is `role="img"` with a caption that states the parameters. Contrast of the lines depends on the seed; the caption does not. Not an axe-certified audit.

## Antelope portability

Any chain with a hex transaction id can use the same functions. Only the lookup of “which tx minted this asset” is WAX/AtomicAssets-specific.

## Verification

Unit tests cover normalization, stability, ranges, shape counts, and a fake painter. No live mint lookup. No screenshot hash.

## Related

- `wax-ipfs-gateway-speed-test-matrix` — when the art is a CID instead of a seed
- `wax-atomic-template-and-schema-explorer`

## Roadmap

- Fixture: one real AtomicAssets asset JSON plus the tx id field you actually found
- Optional SVG export from the same command list
- Still no randomness

## License

MIT.
