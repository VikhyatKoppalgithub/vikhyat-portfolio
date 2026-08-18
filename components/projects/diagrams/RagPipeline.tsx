import { Arrow, Defs, DiagramCaption, DiagramFrame, Group, Node } from "./primitives";

const ID = "rag";

/**
 * HR assistant — two-stage retrieval, with the eval harness that justified it.
 *
 * The harness is drawn as a first-class part of the system rather than a
 * footnote, because measuring the retrieval is what the project is actually
 * about.
 */
export function RagPipeline() {
  return (
    <>
      <DiagramFrame
        title="Two-stage retrieval pipeline and evaluation harness"
        desc="An employee question is answered by retrieving twenty candidate passages with dense embeddings, then reordering them with a cross-encoder to produce the top five. An evaluation harness scores five competing strategies against thirty-one graded questions on Hit at 5, MRR, and Recall at 5, which is how the two-stage design was chosen."
        viewBox="0 0 880 370"
        minWidth={740}
      >
        <Defs id={ID} />

        {/* retrieval pipeline */}
        <Node x={20} y={50} w={160} h={56} label="Employee question" tone="input" dashed />
        <Arrow id={ID} x1={180} y1={78} x2={212} y2={78} />

        <Node
          x={215}
          y={50}
          w={200}
          h={56}
          label="Stage 1 · dense"
          sub="retrieve top 20 — recall"
        />
        <Arrow id={ID} x1={415} y1={78} x2={447} y2={78} accent />

        <Node
          x={450}
          y={50}
          w={200}
          h={56}
          label="Stage 2 · rerank"
          sub="reorder → top 5 — precision"
          tone="accent"
        />
        <Arrow id={ID} x1={650} y1={78} x2={682} y2={78} />

        <Node x={685} y={50} w={175} h={56} label="Grounded answer" sub="or declines" />

        {/* the harness measures the pipeline */}
        <path
          d="M 550 188 V 110"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          strokeDasharray="5 4"
          markerEnd={`url(#${ID}-arrow-accent)`}
        />
        <text x={566} y={152} fill="var(--accent)" fontSize={10} fontFamily="var(--font-mono)">
          chosen by measurement
        </text>

        {/* evaluation harness */}
        <Group id={ID} x={20} y={190} w={655} h={150} label="evaluation harness" />

        <Node
          x={45}
          y={250}
          w={150}
          h={54}
          label="31 questions"
          sub="28 real + 3 unanswerable"
          tone="muted"
        />
        <Arrow id={ID} x1={195} y1={277} x2={226} y2={277} />

        <Node
          x={229}
          y={250}
          w={180}
          h={54}
          label="5 strategies scored"
          sub="Hit@5 · MRR · Recall@5"
          tone="muted"
        />
        <Arrow id={ID} x1={409} y1={277} x2={440} y2={277} accent />

        <Node
          x={443}
          y={250}
          w={205}
          h={54}
          label="dense + rerank wins"
          sub="1.000 Hit@5 · 0.964 MRR"
          tone="accent"
        />
      </DiagramFrame>

      <DiagramCaption>
        Hybrid retrieval — the conventional default — lost to plain dense
        retrieval on MRR here, because fusing in BM25&rsquo;s weaker ranking
        pushed correct passages down. Without the harness on the bottom row,
        that would have shipped as the better system.
      </DiagramCaption>
    </>
  );
}
