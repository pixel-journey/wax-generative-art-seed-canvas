# AI handoff — seed canvas

## Non-negotiables

1. `normalizeTxHash` strips `0x` / `0X` and lowercases. Short hex `abcdabcdabcdabcd` is padded to 64. Empty, `zzzz`, and `abc` throw.
2. Same hash → same params. A different hash changes at least one of hue, rings, or spokes.
3. Hue 0..359. Rings 4..12. Spokes 5..16.
4. Scene at size 320: one circle per ring, one line per spoke. `paintScene` twice → the same command list.
5. No `Math.random`. No chain read. A passing hex string is **not** proof of a WAX transaction, and the art is not unique to an NFT.

## Do not

- Fetch a transaction or mint from unit tests.
- Add randomness and still cite the locked scene.
