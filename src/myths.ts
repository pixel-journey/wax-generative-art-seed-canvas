export const SEED_CANVAS_MYTHS = [
  {
    myth: "This canvas is automatically the AtomicAssets media",
    reality:
      "It is a deterministic renderer. A project must choose to attach it.",
  },
  {
    myth: "Asset id and mint transaction id are the same field",
    reality:
      "Often not. Hyperion lookup of the mint tx is not implemented in this repo.",
  },
  {
    myth: "The demo uses Math.random under the hood",
    reality:
      "Params come from hex slices of the seed. Same input → same scene.",
  },
] as const;
