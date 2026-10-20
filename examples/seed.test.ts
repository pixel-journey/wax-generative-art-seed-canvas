import { describe, expect, it } from "vitest";
import { normalizeTxHash, paintScene, paramsFromSeed, sceneFromParams } from "./seed";

const HASH_A = "a11ce000c0ffee00a11ce000c0ffee00a11ce000c0ffee00a11ce000c0ffee00";
const HASH_B = "b22df111d100ff11b22df111d100ff11b22df111d100ff11b22df111d100ff11";

describe("normalizeTxHash", () => {
  it("accepts 0x, uppercase, and short hex by padding", () => {
    expect(normalizeTxHash(`0x${HASH_A.toUpperCase()}`)).toBe(HASH_A);
    expect(normalizeTxHash("abcdabcdabcdabcd")).toHaveLength(64);
  });

  it("rejects empty and non-hex", () => {
    expect(() => normalizeTxHash("")).toThrow(/hex/);
    expect(() => normalizeTxHash("zzzz")).toThrow(/hex/);
    expect(() => normalizeTxHash("abc")).toThrow(/hex/);
  });
});

describe("paramsFromSeed", () => {
  it("is stable for the same transaction id", () => {
    expect(paramsFromSeed(HASH_A)).toEqual(paramsFromSeed(`0X${HASH_A}`));
  });

  it("changes when the hash changes", () => {
    const a = paramsFromSeed(HASH_A);
    const b = paramsFromSeed(HASH_B);
    expect(a.hue === b.hue && a.rings === b.rings && a.spokes === b.spokes).toBe(false);
  });

  it("stays inside the documented ranges", () => {
    const params = paramsFromSeed(HASH_A);
    expect(params.hue).toBeGreaterThanOrEqual(0);
    expect(params.hue).toBeLessThan(360);
    expect(params.rings).toBeGreaterThanOrEqual(4);
    expect(params.rings).toBeLessThanOrEqual(12);
    expect(params.spokes).toBeGreaterThanOrEqual(5);
    expect(params.spokes).toBeLessThanOrEqual(16);
  });
});

describe("sceneFromParams", () => {
  it("emits one circle per ring and one line per spoke", () => {
    const params = paramsFromSeed(HASH_A);
    const scene = sceneFromParams(params, 320);
    expect(scene.filter((shape) => shape.kind === "circle")).toHaveLength(params.rings);
    expect(scene.filter((shape) => shape.kind === "line")).toHaveLength(params.spokes);
  });

  it("paints the same command list twice", () => {
    const params = paramsFromSeed(HASH_A);
    const seen: string[] = [];
    const ctx = {
      clear(color: string) {
        seen.push(`clear:${color}`);
      },
      circle(x: number, y: number, r: number, stroke: string, width: number) {
        seen.push(`c:${x}:${y}:${r}:${stroke}:${width}`);
      },
      line(x1: number, y1: number, x2: number, y2: number, stroke: string, width: number) {
        seen.push(`l:${x1}:${y1}:${x2}:${y2}:${stroke}:${width}`);
      },
    };
    const first = paintScene(ctx, params, 320);
    const mark = seen.join("|");
    const second = paintScene(ctx, params, 320);
    expect(second).toEqual(first);
    expect(seen.join("|")).toBe(`${mark}|${mark}`);
  });
});
