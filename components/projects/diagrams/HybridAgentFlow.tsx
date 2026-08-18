import { Arrow, Defs, DiagramCaption, DiagramFrame, Node } from "./primitives";

const ID = "hybrid";

/**
 * AI Data Analyst — hybrid routing.
 *
 * The idea the diagram has to carry: there are two answering paths with
 * *different guarantees*, and the system surfaces which one produced the
 * number rather than blending them into one confident-sounding answer.
 */
export function HybridAgentFlow() {
  return (
    <>
      <DiagramFrame
        title="Hybrid verified data analyst architecture"
        desc="A spreadsheet is profiled into a compact summary — the raw rows never reach the model. A router then sends the question down one of two paths: a deterministic contribution engine whose arithmetic is exact and reconciled, or a sandboxed code path that runs model-written Python. The model narrates the finished numbers, and the answer is labelled with which path produced it."
        viewBox="0 0 780 470"
        minWidth={660}
      >
        <Defs id={ID} />

        {/* ingest */}
        <Node x={20} y={60} w={160} h={56} label="Messy spreadsheet" sub="CSV upload" tone="input" dashed />
        <Arrow id={ID} x1={180} y1={88} x2={208} y2={88} />

        <Node x={210} y={60} w={180} h={56} label="Profiler" sub="37K rows → 580 tokens" />
        <Arrow id={ID} x1={390} y1={88} x2={418} y2={88} />

        <Node x={420} y={60} w={130} h={56} label="Router" tone="accent" />

        {/* the constraint that makes the whole thing work */}
        <text
          x={300}
          y={137}
          textAnchor="middle"
          fill="var(--fg-subtle)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          raw rows never reach the model
        </text>

        {/* split into two guarantees */}
        <path
          d="M 485 116 V 150 H 350 V 178"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow-accent)`}
        />
        <path
          d="M 485 116 V 150 H 620 V 178"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />

        <Node
          x={250}
          y={180}
          w={200}
          h={64}
          label="Change engine"
          sub="deterministic · verified"
          tone="accent"
        />
        <Node
          x={520}
          y={180}
          w={200}
          h={64}
          label="Generated code"
          sub="sandboxed · unverified"
        />

        {/* merge into narration */}
        <path
          d="M 350 244 V 282 H 485 V 306"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />
        <path
          d="M 620 244 V 282 H 485 V 306"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />

        <Node x={380} y={308} w={210} h={54} label="Narration" sub="model writes prose only" />
        <Arrow id={ID} x1={485} y1={362} x2={485} y2={394} accent />

        <Node
          x={355}
          y={396}
          w={260}
          h={52}
          label="Answer + route label"
          sub="verified, or flagged"
          tone="accent"
        />
      </DiagramFrame>

      <DiagramCaption>
        The model does two jobs, and neither is arithmetic: it picks columns at
        the start and writes prose at the end. Everything in between is either
        exact and reconciled, or explicitly flagged as unverified — the two are
        never blended into one confident answer.
      </DiagramCaption>
    </>
  );
}
