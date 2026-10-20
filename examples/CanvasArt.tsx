"use client";

import { useEffect, useId, useRef } from "react";
import { paintScene, paramsFromSeed, type PaintContext } from "./seed";

export function CanvasArt({ seed, size }: { seed: string; size: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const titleId = useId();
  let params: ReturnType<typeof paramsFromSeed> | null = null;
  let error: string | null = null;
  try {
    params = paramsFromSeed(seed);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Invalid seed";
  }

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !params) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const painter: PaintContext = {
      clear(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, size, size);
      },
      circle(x, y, r, stroke, width) {
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.lineWidth = width;
        context.strokeStyle = stroke;
        context.stroke();
      },
      line(x1, y1, x2, y2, stroke, width) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = width;
        context.strokeStyle = stroke;
        context.stroke();
      },
    };
    paintScene(painter, params, size);
  }, [params, size]);

  if (!params || error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <figure>
      <canvas
        ref={ref}
        width={size}
        height={size}
        role="img"
        aria-labelledby={titleId}
      />
      <figcaption id={titleId}>
        Seed {params.seed.slice(0, 16)}… · hue {params.hue} · {params.rings} rings · {params.spokes}{" "}
        spokes. Same transaction id redraws the same picture. No animation.
      </figcaption>
    </figure>
  );
}
