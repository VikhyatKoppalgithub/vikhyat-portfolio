import { Arrow, Defs, DiagramCaption, DiagramFrame, Node } from "./primitives";

const ID = "incr";

/**
 * Promotion incrementality.
 *
 * The diagram exists to show two routes to an answer from the same data, and
 * that the gap between them *is* the finding. The pre-trend gate is drawn as a
 * gate because it is what makes the right-hand number trustworthy.
 */
export function IncrementalityDesign() {
  return (
    <>
      <DiagramFrame
        title="Promotion incrementality: naive comparison versus a credible counterfactual"
        desc="The same grocery panel is measured two ways. Comparing targeted against untargeted households reports 37.91 dollars of weekly lift, but those households already outspent the comparison group 5.67 times before any campaign was mailed. A stacked difference-in-differences design using not-yet-treated households as controls, gated on a joint parallel-trends test, returns negative 1.28 dollars. The difference of 39.20 dollars per household-week is the overstatement in the reported metric."
        viewBox="0 0 880 400"
        minWidth={760}
      >
        <Defs id={ID} />

        <Node
          x={340}
          y={16}
          w={200}
          h={54}
          label="dunnhumby panel"
          sub="2,469 HH · 22.8M rows"
          tone="input"
          dashed
        />

        {/* same data, two routes */}
        <path
          d="M 440 70 V 100 H 200 V 124"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />
        <path
          d="M 440 70 V 100 H 680 V 124"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow-accent)`}
        />

        <Node x={60} y={128} w={280} h={58} label="Targeted vs untargeted" sub="reports $37.91 / week" />
        <Node x={540} y={128} w={280} h={58} label="Stacked DiD" sub="controls = not-yet-treated" />

        <Arrow id={ID} x1={200} y1={186} x2={200} y2={204} />
        <Arrow id={ID} x1={680} y1={186} x2={680} y2={204} accent />

        <Node
          x={60}
          y={206}
          w={280}
          h={52}
          label="5.67x gap already existed"
          sub="before any coupon was mailed"
          tone="muted"
        />
        <Node
          x={540}
          y={206}
          w={280}
          h={52}
          label="Joint Wald pre-trend gate"
          sub="4 of 5 campaigns pass"
          tone="accent"
        />

        {/* the gap between the two answers is the result */}
        <path
          d="M 200 258 V 288 H 440 V 312"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />
        <path
          d="M 680 258 V 288 H 440 V 312"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow-accent)`}
        />

        <Node
          x={250}
          y={314}
          w={380}
          h={64}
          label="Overstated by $39.20 / household-week"
          sub="$37.91 reported  vs  −$1.28 incremental (p=0.383)"
          tone="accent"
        />
      </DiagramFrame>

      <DiagramCaption>
        The gate on the right is the part that changed answers. Campaign 13 was
        the only campaign with a positive, significant effect and zero
        individually significant pre-treatment coefficients — every week-by-week
        check passed. Only the joint test, which uses the covariance between
        those coefficients rather than inspecting them one at a time, detected
        the drift that disqualified it.
      </DiagramCaption>
    </>
  );
}
