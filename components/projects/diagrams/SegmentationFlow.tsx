import { Arrow, Defs, DiagramCaption, DiagramFrame, Node } from "./primitives";

const ID = "seg";

/** Customer segmentation → dashboards → targeted recommendations. */
export function SegmentationFlow() {
  return (
    <>
      <DiagramFrame
        title="Customer segmentation and reporting workflow"
        desc="Customer behavioral and transaction data is clustered with K-means into four or more behavioral segments. Those segments are profiled into targeted marketing recommendations and published as three Tableau dashboards, improving stakeholder reporting efficiency by 25 percent."
        viewBox="0 0 800 310"
        minWidth={640}
      >
        <Defs id={ID} />

        <Node
          x={20}
          y={100}
          w={166}
          h={60}
          label="Customer data"
          sub="behavioral + txn"
          tone="input"
          dashed
        />
        <Arrow id={ID} x1={186} y1={130} x2={220} y2={130} />

        <Node
          x={220}
          y={100}
          w={176}
          h={60}
          label="K-means clustering"
          sub="groups discovered"
        />
        <Arrow id={ID} x1={396} y1={130} x2={430} y2={130} accent />

        <Node
          x={430}
          y={100}
          w={170}
          h={60}
          label="4+ segments"
          sub="profiled + named"
          tone="accent"
        />
        <Arrow id={ID} x1={600} y1={130} x2={634} y2={130} />

        <Node x={634} y={100} w={146} h={60} label="3 dashboards" sub="Tableau · self-serve" />

        {/* efficiency annotation on the dashboards */}
        <text
          x={707}
          y={182}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={11}
          fontWeight={600}
          fontFamily="var(--font-mono)"
        >
          +25% reporting efficiency
        </text>

        {/* segments → recommendations */}
        <path
          d="M 515 160 V 210 H 400 V 236"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow-accent)`}
        />

        <Node
          x={290}
          y={236}
          w={220}
          h={54}
          label="Targeted marketing recs"
          tone="accent"
        />
      </DiagramFrame>

      <DiagramCaption>
        Letting K-means find the groupings — rather than splitting customers by
        assumed demographics — is what made the segments worth targeting: they
        reflect how people actually behaved.
      </DiagramCaption>
    </>
  );
}
