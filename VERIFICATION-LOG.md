# Verification log

**Trust label:** educational-reference  
**Updated:** 2026-10-20

| Claim | Evidence | State |
| --- | --- | --- |
| Case and 0x do not change the seed | `src/seed.test.ts` | verified (unit) |
| Different hashes are not forced to the same hue/rings/spokes together | same | verified (unit) |
| Ranges for hue, rings, spokes | same | verified (unit) |
| Scene counts match rings and spokes | same | verified (unit) |
| paintScene is stable on a fake context | same | verified (unit) |
| Canvas demo draws that command list | `CanvasArt.tsx` calls `paintScene` | partial (inspection) |
| AtomicAssets mint tx lookup | none | untested |
| Identical PNG across GPUs | not claimed | not claimed |
