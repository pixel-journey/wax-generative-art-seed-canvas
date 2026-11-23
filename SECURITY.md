# Security — seed canvas

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Bad hex | throws |
| Same hash | same params and the same paint list twice |
| `Math.random` | not used |

## Attack angles

1. Claiming the string is a confirmed WAX transaction.  
2. Claiming the picture is unique to an NFT.  
3. Seeding the scene with `Math.random`.

## Honesty limits

Pure commands. Nothing is fetched or minted.
