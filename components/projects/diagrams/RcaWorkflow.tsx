import { Arrow, Defs, DiagramCaption, DiagramFrame, Node } from "./primitives";

const ID = "rca";

/**
 * PartnerLinQ root cause analysis workflow.
 *
 * Top row is the analysis; bottom row is what the analysis became. The
 * connector between them is the whole point — findings that turn into
 * requirements rather than stopping at a deck.
 */
export function RcaWorkflow() {
  return (
    <>
      <DiagramFrame
        title="Azure telemetry root cause analysis workflow"
        desc="Azure telemetry is analyzed with SQL, splitting into 12.4 million CosmosDB request units per month of projected saving and 65,000-plus system errors. Both feed a mapping of failure patterns and process bottlenecks, which becomes a ranked remediation list, then functional requirements, then an AI-driven predictive maintenance solution."
        viewBox="0 0 880 440"
        minWidth={760}
      >
        <Defs id={ID} />

        {/* ── analysis row ─────────────────────────────────────────────── */}
        <Node
          x={20}
          y={90}
          w={152}
          h={60}
          label="Azure telemetry"
          sub="225M+ entries / day"
          tone="input"
          dashed
        />
        <Arrow id={ID} x1={172} y1={120} x2={206} y2={120} />

        <Node x={206} y={90} w={152} h={60} label="SQL analysis" sub="isolate + quantify" />

        {/* fan out into the two quantified findings */}
        <path
          d="M 358 120 H 390 V 63 H 420"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow-accent)`}
        />
        <path
          d="M 358 120 H 390 V 173 H 420"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow-accent)`}
        />

        <Node
          x={420}
          y={35}
          w={182}
          h={56}
          label="RU exhaustion"
          sub="12.4M RU / mo saving"
          tone="accent"
        />
        <Node
          x={420}
          y={145}
          w={182}
          h={56}
          label="System errors"
          sub="65K+ characterized"
          tone="accent"
        />

        {/* fan back in */}
        <path
          d="M 602 63 H 634 V 120 H 666"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />
        <path
          d="M 602 173 H 634 V 120 H 666"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          markerEnd={`url(#${ID}-arrow)`}
        />

        <Node x={666} y={90} w={190} h={60} label="Failure patterns" sub="+ bottlenecks" />

        {/* ── connector down to the delivery row ───────────────────────── */}
        <path
          d="M 761 150 V 232 H 175 V 320"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          strokeDasharray="5 4"
          markerEnd={`url(#${ID}-arrow)`}
        />
        {/* knocked-out background so the dashed connector doesn't run through
            the label */}
        <rect x={388} y={222} width={160} height={16} rx={3} fill="var(--bg-elev)" />
        <text
          x={468}
          y={234}
          textAnchor="middle"
          fill="var(--fg-subtle)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          findings → requirements
        </text>

        {/* ── delivery row ─────────────────────────────────────────────── */}
        <Node
          x={85}
          y={320}
          w={180}
          h={60}
          label="Ranked remediation"
          sub="prioritized by impact"
        />
        <Arrow id={ID} x1={265} y1={350} x2={299} y2={350} />

        <Node
          x={299}
          y={320}
          w={196}
          h={60}
          label="Functional requirements"
          sub="handed to the build"
        />
        <Arrow id={ID} x1={495} y1={350} x2={529} y2={350} accent />

        <Node
          x={529}
          y={320}
          w={216}
          h={60}
          label="AI predictive maintenance"
          sub="delivered on schedule"
          tone="accent"
        />
      </DiagramFrame>

      <DiagramCaption>
        The valuable step is the fan-in, not the fan-out: 65,000 errors are
        noise until they collapse into a small number of named, recurring
        causes that can actually be assigned to someone.
      </DiagramCaption>
    </>
  );
}
