# wax-generative-art-seed-canvas

**Generative Art Seed Canvas**

A pure HTML5 canvas wrapper that uses an NFT's unique mint transaction hash as a deterministic seed to render variable, high-performance generative art. Creates unique, reproducible visuals directly from on-chain data without any backend or external assets.

**Status:** 🔒 Private (In Development) | Target: Public when v1 complete  
**Category:** Spatial Audiovisual Web & Interactive Multi-Media Players  
**Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

> Built to the same high standard of educational excellence, production readiness, and WAX best practices as the [gkniftyheads-tracker](https://github.com/henrikpiga/gkniftyheads-tracker).

---

## Quick Start

```bash
git clone https://github.com/pixel-journey/wax-generative-art-seed-canvas.git
cd wax-generative-art-seed-canvas
npm install
npm run dev
```

The demo instantly generates unique art from sample NFT mint hashes. Connect a wallet to generate from your own assets.

---

## Why This Blueprint?

NFTs often lack dynamic, personalized visuals beyond static images. This tool turns the immutable mint transaction hash into a seed for beautiful, unique generative art that is verifiably tied to the on-chain asset — no IPFS, no external files, fully reproducible.

---

## Architecture & Data Flow

```
Fetch NFT Mint Transaction Hash (AtomicAssets)
       ↓
Use Hash as Deterministic Seed
       ↓
Generate Art Parameters (colors, shapes, patterns)
       ↓
Render on HTML5 Canvas
  - High-performance drawing loop
  - Interactive parameters (optional overrides)
  - Export as image or SVG
```

All generation is client-side and deterministic.

---

## Complete Repository Structure

Follows Pixel Journey high standards.

Key parts:
- `app/` — Main canvas interface
- `components/` — GenerativeCanvas, SeedControls, ExportPanel, AssetSelector
- `hooks/` — useMintSeed, useArtGenerator
- `lib/wax/` — seed-from-hash.ts, art-parameters.ts, canvas-renderer.ts
- `public/mock-data/` — Sample NFT mint hashes and generated art
- `.github/workflows/` — CI automation

Detailed comments on deterministic seeding and canvas rendering techniques.

---

## Key WAX Concepts Explained

- **Mint Transaction Hash as Seed**: Using the immutable tx hash from asset creation as a reliable, on-chain random seed.
- **Deterministic Generation**: Same seed always produces the same art (verifiable on-chain tie).
- **Client-Side Canvas**: High-performance generative art entirely in the browser, no external dependencies.
- **AtomicAssets Integration**: Fetching the mint tx hash directly from public APIs.

This is **WAX-primary** (AtomicAssets) but the generative seeding and canvas rendering pattern is portable to any chain with immutable mint data.

---

## Design Specifications

- Clean, modern canvas with subtle pixel-art influences where appropriate
- Smooth, high-performance rendering
- Optional interactive controls for live parameter tweaking
- Responsive canvas that adapts to screen size
- Accessible controls and export options

Aligned with Pixel Journey Design System.

---

## Technical Architecture & Best Practices

- **Stack**: Next.js 15, TypeScript, Tailwind + shadcn/ui, HTML5 Canvas
- **Data**: AtomicAssets public API for mint tx hash
- **Performance**: Optimized canvas drawing loop; efficient parameter generation
- **Demo Mode**: Full interactive canvas with sample seeds

See catalog standards for WAX rate limiting and public data best practices.

---

## Demo & Usage

- Explore pre-loaded sample NFT seeds and generated art
- Connect wallet to generate from your own assets
- Tweak parameters live (if enabled)
- Export art as PNG or SVG
- Share seeds or generated outputs

Designed for immediate creative insight.

---

## Customization

- Adjust art generation algorithms and parameter ranges
- Add new visual styles or themes
- Integrate with other media or NFT tools in the catalog
- Customize canvas behavior and export formats

---

## Roadmap

- v1: Core seed-to-canvas generation + interactive demo
- v1.1: Advanced parameter controls and multiple art styles
- Future: Deeper integration with spatial audio, 3D, and metaverse gallery tools

---

## Contributing & Credits

Built with care for creative on-chain experiences on WAX.

MIT License.

Following the production-quality educational standards from the gkniftyheads-tracker.

---

*Pixel Journey — Making Web3 interfaces pixel-perfect and delightful.*