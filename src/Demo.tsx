"use client";

import { useState } from "react";
import { CanvasArt } from "./CanvasArt";
import { paramsFromSeed } from "./seed";

const SAMPLE =
  "a11ce000c0ffee00a11ce000c0ffee00a11ce000c0ffee00a11ce000c0ffee00";

export function Demo() {
  const [seed, setSeed] = useState(SAMPLE);
  let summary = "Enter a hex transaction id.";
  try {
    const params = paramsFromSeed(seed);
    summary = `hue ${params.hue}, saturation ${params.saturation}, lightness ${params.lightness}, twist ${params.twist}`;
  } catch (caught) {
    summary = caught instanceof Error ? caught.message : "Invalid seed";
  }

  return (
    <main className="wrap">
      <header>
        <p className="kicker">educational-reference · deterministic, not random</p>
        <h1>Seed canvas</h1>
        <p className="lede">
          The picture is a pure function of a transaction id. It does not look up the chain, and
          it is not the NFT’s artwork unless a project explicitly chooses this renderer.
        </p>
      </header>
      <label>
        Transaction id
        <input value={seed} onChange={(event) => setSeed(event.target.value)} spellCheck={false} />
      </label>
      <p className="summary">{summary}</p>
      <CanvasArt seed={seed} size={360} />
    </main>
  );
}
