# Education — art from a transaction id, not from Math.random

> **Rung:** `npm test` passes. The same hex always yields the same params and the same scene commands. No chain is read. No `Math.random`.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Normalize a hash and see that `0X` + the same hex is the same params |
| Intermediate | Count circles and lines, and see a second paint emit the same command list |
| Masterclass | Say what "deterministic" does not mean: not on-chain, not unique, not a mint |

---

## Beginner — one scene

```ts
normalizeTxHash(`0x${HASH.toUpperCase()}`)  // lowercase, no 0x, 64 chars
paramsFromSeed(HASH) === paramsFromSeed(`0X${HASH}`)

## The locked seed

`HASH_A` is `a11ce000c0ffee00` repeated. `paramsFromSeed(HASH_A)` is locked:

| Field | Result |
| --- | --- |
| hue | `128` |
| rings | `8` |
| spokes | `13` |
| saturation | `72` |
| lightness | `46` |
| twist | `5.64` |

A 16-hex string is padded on the left with zeros to 64. `abcdabcdabcdabcd` becomes 48 zeros and then those 16 characters. Empty, non-hex, and fewer than 16 hex characters throw.

Hue is `uint32 % 360`. Rings are `4 + (uint32 % 9)`. Spokes are `5 + (uint32 % 12)`. The ranges in the older test are the formula's bounds. The row above is this seed.

```

Accepted: 16–64 hex characters, optional `0x`, any case. Short hex is padded to 64 with leading zeros. Empty, non-hex, and strings under 16 hex characters throw.

Ranges the test locks for `HASH_A`:

| Field | Range |
| --- | --- |
| hue | 0 .. 359 |
| rings | 4 .. 12 |
| spokes | 5 .. 16 |

A different hash must change at least one of hue, rings, or spokes. The test does not require all three to change.

### Words

| Word | Meaning here |
| --- | --- |
| Seed | The normalized 64-char hex. Not a private key |
| Params | hue, rings, spokes, saturation, lightness, twist |
| Scene | A list of circle and line commands. Not pixels |
| Paint | Walks the scene into a context you pass |

### Predict, then run

```bash
npm test
```

1. `sceneFromParams(params, 320)` has one circle per ring and one line per spoke.
2. `paintScene` twice on the same params appends the same command string twice.
3. Size below 32 throws. That bound is in the source; the happy tests use 320.

---

## Intermediate — where the numbers come from

`paramsFromSeed` reads uint32 slices of the padded hex:

```text
hue        = u32(0)  % 360
rings      = 4 + u32(8)  % 9
spokes     = 5 + u32(16) % 12
saturation = 42 + u32(24) % 38
lightness  = 46 + u32(32) % 16
twist      = (u32(40) % 628) / 100
```

The scene places a circle per ring and a spoke line per spoke, then `paintScene` clears a dark hsl and issues those commands. Coordinates are rounded to 2 decimals so two paints match.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| `Math.random` for "variety" | Different art each refresh | same hash → same params | `is stable for the same transaction id` |
| Treat `0x` and uppercase as a different seed | Duplicate art | normalized equal | same |
| Accept `abc` or `zzzz` | Garbage params | throw | `rejects empty and non-hex` |
| Claim a new hash always changes every field | Over-claim | at least one of hue/rings/spokes differs | `changes when the hash changes` |
| Paint twice and get a new scene | Non-determinism | same command list | `paints the same command list twice` |

---

## Masterclass — a tx id is a string

This file does not fetch a transaction. You pass a string that looks like a tx id. Two NFTs that share a hash share the art. A made-up 64-hex string is a valid seed. Deterministic does not mean unique, scarce, or minted.

Still absent:

- A chain read of `trx_id`.
- A claim that the canvas is the NFT. The scene is a command list a canvas or SVG can both paint.
- `Math.random`. Do not add it. The seed is the whole source of variation.

Short hashes pad on the left. `abcdabcdabcdabcd` becomes 64 chars. Leading zeros change the early uint32 slices, so padding is part of the rule, not a display nicety.

### Exercise

1. Does `0X` + the same hex change params? (No. Tested.)
2. How many circles for a seed with `rings` rings? (`rings`. Tested.)
3. Is a passing 64-hex string proof of a WAX transaction? (No. It is a regex.)

---

## What this course will not teach

- A mint
- That the art is unique to an NFT
- A live Hyperion lookup
