import { Arrow, Defs, DiagramCaption, DiagramFrame, Node } from "./primitives";

const ID = "prop";

/**
 * Flight delay propagation.
 *
 * The point the diagram has to land: delay is split into what a flight caused
 * and what it merely received, and that split is checked against a number the
 * airlines report independently — so the model is falsifiable, not asserted.
 */
export function DelayPropagation() {
  return (
    <>
      <DiagramFrame
        title="Flight delay propagation model and validation"
        desc="Five years of Bureau of Transportation Statistics flights are chained by tail number into the rotation each aircraft actually flew. A turn model computes how much inbound delay survives the ground stop, splitting total delay into delay that originated with a flight and the 38.8 percent it inherited. The inherited estimate is validated against the late-aircraft minutes airlines report separately to BTS."
        viewBox="0 0 880 400"
        minWidth={760}
      >
        <Defs id={ID} />

        {/* ingest → rotation → model */}
        <Node
          x={20}
          y={40}
          w={178}
          h={58}
          label="33.7M US flights"
          sub="BTS · 2021–2025"
          tone="input"
          dashed
        />
        <Arrow id={ID} x1={198} y1={69} x2={228} y2={69} />

        <Node x={228} y={40} w={196} h={58} label="Rotation chain" sub="linked by tail number" />
        <Arrow id={ID} x1={424} y1={69} x2={454} y2={69} accent />

        <Node
          x={456}
          y={40}
          w={250}
          h={58}
          label="Turn model"
          sub="max(0, delay − slack)"
          tone="accent"
        />

        {/* split: caused vs received */}
        <path
          d="M 581 98 V 145 H 400 V 178"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />
        <path
          d="M 581 98 V 145 H 660 V 178"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow-accent)`}
        />

        <Node x={300} y={180} w={200} h={58} label="Originated" sub="61.2% of delay" />
        <Node
          x={560}
          y={180}
          w={200}
          h={58}
          label="Inherited"
          sub="38.8% of delay"
          tone="accent"
        />

        {/* what the split buys you, and the check that it is real */}
        <path
          d="M 400 238 V 264 H 210 V 288"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />
        <Arrow id={ID} x1={660} y1={238} x2={660} y2={286} accent />

        <Node
          x={60}
          y={290}
          w={300}
          h={62}
          label="08:00 delay → 0.75 more flights"
          sub="21:00 → 0.06  ·  13x the damage"
        />
        <Node
          x={480}
          y={290}
          w={320}
          h={62}
          label="Checked against BTS reporting"
          sub="23.3 predicted vs 21.2 reported · r 0.784"
          tone="accent"
        />
      </DiagramFrame>

      <DiagramCaption>
        Slack is the scheduled turn minus the fastest turn that operator has ever
        achieved at that station, so delay only passes through when the ground
        time genuinely cannot absorb it. Airlines separately report late-aircraft
        minutes to BTS, which means the feed already contains the answer the
        model is predicting — arrived at by a completely different route.
      </DiagramCaption>
    </>
  );
}
