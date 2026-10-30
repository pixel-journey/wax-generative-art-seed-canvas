"use client";

import { useState } from "react";
import { CanvasArt } from "./CanvasArt";
import { paramsFromSeed } from "./seed";
import { SEED_CANVAS_MYTHS } from "./myths";

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
          The picture is a pure function of a transaction id. It does not look up the
          chain, and it is not the NFT’s artwork unless a project explicitly chooses this
          renderer.
        </p>
      </header>

      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #a855f744",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Myths vs reality</h2>
        {SEED_CANVAS_MYTHS.map((m) => (
          <div key={m.myth} style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            <p style={{ margin: 0 }}>
              <strong>Myth:</strong> {m.myth}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              <strong>Reality:</strong> {m.reality}
            </p>
          </div>
        ))}
      </section>

      <label>
        Transaction id
        <input
          value={seed}
          onChange={(event) => setSeed(event.target.value)}
          spellCheck={false}
        />
      </label>
      <p className="summary">{summary}</p>
      <CanvasArt seed={seed} size={360} />
      <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See POLICY.md · no Math.random · no mint-tx lookup
      </p>
    </main>
  );
}
