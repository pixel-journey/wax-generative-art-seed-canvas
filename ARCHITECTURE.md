# Architecture

```
hex string --> normalizeTxHash --> paramsFromSeed --> sceneFromParams --> paintScene
                                                                      |
                                                               <canvas> or tests
```

## Decisions

**Command list before pixels.** Two machines can disagree on canvas rasterization. They should not disagree on “12 circles, these centers.” Tests assert the list.

**Slices, not a hash library.** The tx id is already a hash. Reading big-endian uint32 windows keeps the example readable. Changing the window layout is a breaking change for anyone who snapshot the pictures; document it in `spec.yaml` if you do.

**No fetch.** A wrong but deterministic picture is an honest teaching tool. A picture that sometimes depends on an API is not deterministic.

## Live path (not shipped)

```
asset id --> AtomicAssets asset --> mint transaction id --> paramsFromSeed
```

Confirm the JSON field before coding the client. Do not guess `data.seed` exists.
