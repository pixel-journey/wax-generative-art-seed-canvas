/**
 * Deterministic art from a transaction id.
 *
 * Simple: normalize hex, read uint32 slices.
 * Recommended: paramsFromSeed — same string always yields the same params.
 * Advanced: sceneFromParams — a command list a canvas or SVG can both paint.
 *
 * Do not use Math.random. The seed is the whole source of variation.
 */

export interface ArtParams {
  seed: string;
  hue: number;
  rings: number;
  spokes: number;
  saturation: number;
  lightness: number;
  twist: number;
}

export interface SceneShape {
  kind: "circle" | "line";
  x: number;
  y: number;
  x2?: number;
  y2?: number;
  r?: number;
  stroke: string;
  width: number;
}

export function normalizeTxHash(input: string): string {
  const hex = input.trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]{16,64}$/.test(hex)) {
    throw new Error("Expected 16–64 hex characters, optional 0x prefix.");
  }
  return hex.padStart(64, "0");
}

function u32(hex: string, offset: number): number {
  return Number.parseInt(hex.slice(offset, offset + 8), 16) >>> 0;
}

export function paramsFromSeed(input: string): ArtParams {
  const seed = normalizeTxHash(input);
  return {
    seed,
    hue: u32(seed, 0) % 360,
    rings: 4 + (u32(seed, 8) % 9),
    spokes: 5 + (u32(seed, 16) % 12),
    saturation: 42 + (u32(seed, 24) % 38),
    lightness: 46 + (u32(seed, 32) % 16),
    twist: (u32(seed, 40) % 628) / 100,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function sceneFromParams(params: ArtParams, size: number): SceneShape[] {
  if (!Number.isFinite(size) || size < 32) {
    throw new Error("size must be a finite number >= 32");
  }
  const cx = size / 2;
  const cy = size / 2;
  const shapes: SceneShape[] = [];

  for (let ring = 1; ring <= params.rings; ring += 1) {
    const radius = (size * 0.42 * ring) / params.rings;
    const hue = (params.hue + ring * 18) % 360;
    shapes.push({
      kind: "circle",
      x: round2(cx + Math.cos(params.twist + ring) * size * 0.02),
      y: round2(cy + Math.sin(params.twist + ring) * size * 0.02),
      r: round2(radius),
      stroke: `hsl(${hue} ${params.saturation}% ${params.lightness}%)`,
      width: ring === params.rings ? 2.5 : 1.25,
    });
  }

  for (let spoke = 0; spoke < params.spokes; spoke += 1) {
    const angle = params.twist + (Math.PI * 2 * spoke) / params.spokes;
    shapes.push({
      kind: "line",
      x: round2(cx + Math.cos(angle) * size * 0.08),
      y: round2(cy + Math.sin(angle) * size * 0.08),
      x2: round2(cx + Math.cos(angle) * size * 0.4),
      y2: round2(cy + Math.sin(angle) * size * 0.4),
      stroke: `hsl(${(params.hue + 40) % 360} ${params.saturation}% ${Math.max(22, params.lightness - 12)}%)`,
      width: 1,
    });
  }

  return shapes;
}

export interface PaintContext {
  clear(color: string): void;
  circle(x: number, y: number, r: number, stroke: string, width: number): void;
  line(x1: number, y1: number, x2: number, y2: number, stroke: string, width: number): void;
}

export function paintScene(ctx: PaintContext, params: ArtParams, size: number): SceneShape[] {
  const scene = sceneFromParams(params, size);
  ctx.clear(`hsl(${params.hue} 18% 10%)`);
  for (const shape of scene) {
    if (shape.kind === "circle" && shape.r !== undefined) {
      ctx.circle(shape.x, shape.y, shape.r, shape.stroke, shape.width);
    } else if (shape.kind === "line" && shape.x2 !== undefined && shape.y2 !== undefined) {
      ctx.line(shape.x, shape.y, shape.x2, shape.y2, shape.stroke, shape.width);
    }
  }
  return scene;
}
