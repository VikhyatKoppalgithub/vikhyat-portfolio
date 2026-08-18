import { Arrow, Defs, DiagramCaption, DiagramFrame, Node } from "./primitives";

const ID = "agent";

/**
 * AI marketing budget allocation agent.
 *
 * The point this diagram has to make: the LLM is the *interface*, not the
 * decision maker. The allocation comes out of a constrained optimizer whose
 * answer is checked against the KKT conditions before anyone sees it.
 */
export function AgentArchitecture() {
  return (
    <>
      <DiagramFrame
        title="AI marketing budget allocation agent architecture"
        desc="A stakeholder question enters through a Gemini LLM interface. Five years of eCommerce data feeds a Bayesian optimization search, which passes candidate allocations to a constrained solver maximizing conversions subject to a fixed total budget. The solver's output is verified against the Karush-Kuhn-Tucker conditions before the weekly allocation and its rationale are returned."
        viewBox="0 0 680 530"
        minWidth={560}
      >
        <Defs id={ID} />

        {/* interface layer */}
        <Node x={240} y={20} w={200} h={52} label="Stakeholder question" sub="plain English" tone="input" dashed />
        <Arrow id={ID} x1={340} y1={72} x2={340} y2={100} />

        <Node x={240} y={100} w={200} h={54} label="Gemini LLM interface" sub="natural-language I/O" tone="accent" />
        <Arrow id={ID} x1={340} y1={154} x2={340} y2={192} />

        {/* data input feeding the search */}
        <Node x={20} y={192} w={178} h={54} label="5 yrs eCommerce data" sub="132K+ rows" tone="input" dashed />
        <Arrow id={ID} x1={198} y1={219} x2={240} y2={219} />

        {/* optimization core */}
        <Node x={240} y={192} w={200} h={54} label="Bayesian Optimization" sub="searches allocations" />
        <Arrow id={ID} x1={340} y1={246} x2={340} y2={284} />

        <Node x={240} y={284} w={200} h={54} label="Constrained solver" sub="max conv.  s.t. Σ = B" />
        <Arrow id={ID} x1={340} y1={338} x2={340} y2={376} accent />

        <Node x={240} y={376} w={200} h={54} label="KKT verification" sub="provably optimal" tone="accent" />
        <Arrow id={ID} x1={340} y1={430} x2={340} y2={462} accent />

        <Node x={225} y={462} w={230} h={50} label="Weekly allocation + rationale" tone="accent" />

        {/* bracket marking the optimization core */}
        <path
          d="M 462 192 H 480 V 430 H 462"
          fill="none"
          stroke="var(--accent-line)"
          strokeWidth={1}
        />
        <text
          transform="translate(500, 311) rotate(90)"
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={10.5}
          fontWeight={600}
          letterSpacing={1.4}
          fontFamily="var(--font-mono)"
        >
          OPTIMIZATION CORE
        </text>

        {/* bracket marking the interface layer */}
        <path
          d="M 462 100 H 480 V 154 H 462"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1}
        />
        <text
          transform="translate(500, 127) rotate(90)"
          textAnchor="middle"
          fill="var(--fg-subtle)"
          fontSize={10}
          letterSpacing={1.2}
          fontFamily="var(--font-mono)"
        >
          INTERFACE
        </text>
      </DiagramFrame>

      <DiagramCaption>
        The LLM never decides the budget — it takes the question and explains the
        result. The allocation itself comes from a constrained optimizer, and the
        KKT check is what turns &ldquo;the best split we found&rdquo; into
        &ldquo;the best split that exists under this budget.&rdquo;
      </DiagramCaption>
    </>
  );
}
