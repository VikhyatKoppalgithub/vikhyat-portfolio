import { Arrow, Defs, DiagramCaption, DiagramFrame, Group, Node } from "./primitives";

const ID = "ensemble";

/**
 * Bankruptcy prediction pipeline.
 *
 * The story the diagram tells is that the hard work is on the left — cutting
 * 16,000 features to 350 — and the ensemble on the right is what that
 * discipline made possible.
 */
export function EnsemblePipeline() {
  return (
    <>
      <DiagramFrame
        title="Bankruptcy prediction: feature reduction and 3-stage stacked ensemble"
        desc="Over sixteen thousand raw financial features per firm are reduced to 350 high-signal predictors. Those feed three base learners whose outputs are combined by a meta learner, producing a final solvent-or-bankrupt prediction scoring 0.95 ROC AUC on holdout data."
        viewBox="0 0 860 320"
        minWidth={740}
      >
        <Defs id={ID} />

        <Node
          x={20}
          y={125}
          w={168}
          h={62}
          label="16,000+ raw features"
          sub="per firm"
          tone="input"
          dashed
        />
        <Arrow id={ID} x1={188} y1={156} x2={220} y2={156} />

        <Node
          x={220}
          y={125}
          w={168}
          h={62}
          label="Feature selection"
          sub="16K → 350"
          tone="accent"
        />
        <Arrow id={ID} x1={388} y1={156} x2={422} y2={156} accent />

        <Group id={ID} x={424} y={38} w={262} h={246} label="3-stage stacked ensemble" />

        {/* stage 1 — base learners */}
        <text x={444} y={76} fill="var(--fg-subtle)" fontSize={9} fontFamily="var(--font-mono)">
          STAGE 1 · BASE LEARNERS
        </text>
        <Node x={444} y={86} w={104} h={30} label="Model A" tone="muted" />
        <Node x={444} y={124} w={104} h={30} label="Model B" tone="muted" />
        <Node x={444} y={162} w={104} h={30} label="Model C" tone="muted" />

        {/* stage 2 — meta learner */}
        <text x={574} y={128} fill="var(--fg-subtle)" fontSize={9} fontFamily="var(--font-mono)">
          STAGE 2
        </text>
        <Node x={572} y={136} w={100} h={30} label="Meta learner" tone="muted" />

        <Arrow id={ID} x1={548} y1={101} x2={570} y2={145} />
        <Arrow id={ID} x1={548} y1={139} x2={570} y2={149} />
        <Arrow id={ID} x1={548} y1={177} x2={570} y2={157} />

        {/* stage 3 — final blend */}
        <text x={444} y={218} fill="var(--fg-subtle)" fontSize={9} fontFamily="var(--font-mono)">
          STAGE 3
        </text>
        <Node
          x={444}
          y={226}
          w={228}
          h={38}
          label="Final prediction"
          sub="solvent / bankrupt"
          tone="accent"
        />
        <path
          d="M 622 166 V 198 H 558 V 224"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />

        <Arrow id={ID} x1={686} y1={245} x2={716} y2={245} accent />
        <Node x={716} y={219} w={110} h={52} label="0.95" sub="ROC AUC" tone="accent" />
      </DiagramFrame>

      <DiagramCaption>
        Stacking works only when the base learners fail differently — the meta
        learner has nothing to correct if they all make the same mistakes. That
        is also why feature reduction came first: 16,000 correlated features
        produce 16,000 versions of the same model.
      </DiagramCaption>
    </>
  );
}
