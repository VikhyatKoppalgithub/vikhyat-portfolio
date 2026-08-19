import type { Project } from "./types";

/**
 * Featured projects — the strongest section of the site.
 *
 * ── HOW TO ADD A PROJECT ────────────────────────────────────────────────
 * Append an object to the array below. Nothing else needs to change: the
 * grid, the expansion behaviour, the metric tiles and the anchor links are
 * all generated from this data.
 *
 * Set `featured: true` for the ones that should render first, above the
 * "More work" divider. Set `diagram` only if you also add a matching
 * component in components/projects/diagrams/ and register it in
 * DiagramSwitch.tsx.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * SOURCES. The incrementality, flight-delay and three AI projects are described
 * from their own repository READMEs — every metric below appears there. The PartnerLinQ and Tequed Labs
 * entries come from the resume bullets. Where a sentence explains *how* a named
 * technique works, it is describing the technique, not adding new claims.
 */

export const projects: Project[] = [
  {
    slug: "cloud-telemetry-rca",
    title: "Azure Telemetry Root Cause Analysis",
    tagline:
      "225M+ log entries a day, and the ops team only learned about failures after they had cascaded. I found where the money and the failures actually were.",
    context: "PartnerLinQ · Graduate Industry Practicum",
    period: "Jan 2026 – May 2026",
    featured: true,
    category: "Data Analysis · Root Cause Analysis",
    kind: "Professional",
    headlineMetrics: [
      { value: "225M+", label: "daily log entries analyzed" },
      { value: "12.4M RU", label: "projected monthly CosmosDB saving" },
      { value: "65K+", label: "system errors mapped to causes" },
    ],
    problem:
      "A B2B integration platform ran EDI transaction pipelines for logistics partners on Azure — CosmosDB, Service Bus, and Azure Functions behind a 31-step pipeline. Failures didn't surface immediately, they compounded: a throughput throttle became a timeout, a timeout became a stuck transaction, and a stuck transaction became a 2am support ticket. The tooling was reactive by design, alerting when transactions failed rather than when the conditions for failure were forming. The problem was never a shortage of data — it was that 225M+ daily log entries contained no usable signal ahead of the noise.",
    dataset:
      "Production Azure telemetry across the EDI transaction pipeline — 225M+ daily log entries covering transaction volume, step-level latencies, failure records, and CosmosDB request-unit consumption.",
    approach: [
      "Wrote SQL against raw telemetry to quantify CosmosDB request-unit consumption and isolate where provisioned throughput was being exhausted without corresponding transaction value.",
      "Mapped failure patterns and process bottlenecks across the 31-step pipeline, grouping an undifferentiated error count into recurring, nameable causes tied to specific steps and partners.",
      "Ranked findings by remediation impact so engineering effort could go to the largest contributors first rather than to whichever alert fired most recently.",
      "Translated the operational findings into functional requirements for the AI-driven predictive maintenance system the practicum team went on to build — defining what the detection layer needed to watch, which conditions justified escalation, and what a recommendation had to cite to be actionable.",
      "Presented to client decision makers through structured stakeholder reviews, framing analytical findings against business priorities rather than as a metrics dump.",
    ],
    stack: [
      "SQL",
      "Azure (CosmosDB, Service Bus, Functions)",
      "Azure Telemetry Analysis",
      "Root Cause Analysis",
      "Requirements Elicitation",
      "Stakeholder Reporting",
    ],
    results: [
      {
        value: "12.4M RU",
        label: "projected monthly saving",
        note: "from preventing CosmosDB RU exhaustion",
      },
      { value: "65K+", label: "system errors mapped", note: "grouped into recurring failure patterns" },
      { value: "On schedule", label: "predictive maintenance solution", note: "requirements delivered to spec" },
    ],
    businessImpact:
      "Gave the client something they did not have: a defensible number attached to a known problem, broken down by cause and ordered by what to fix first. Quantifying request-unit exhaustion turned \"our cloud costs feel high\" into a specific, addressable figure — 12.4M RU a month in projected saving once the failure conditions were caught before they cascaded. The analysis then became the requirements baseline for the predictive maintenance system, so the findings didn't stop at a slide deck. My contribution was the analysis and the requirements; the detection and agent system itself was built by my practicum partner.",
    diagram: "rca",
    links: {},
  },

  {
    slug: "promo-incrementality",
    title: "Promotion Incrementality Analysis",
    tagline:
      "A grocery chain's coupon programme reported a $37.91 weekly lift. Measured properly the effect was zero \u2014 and the one campaign that still looked like a winner was the one whose effect couldn't be established.",
    context: "Personal project \u00b7 22.8M rows, dunnhumby Complete Journey",
    period: "2026",
    featured: true,
    category: "Causal Analysis \u00b7 Marketing Analytics",
    kind: "Personal",
    headlineMetrics: [
      { value: "$37.91", label: "reported weekly lift" },
      { value: "\u2212$1.28", label: "actual incremental lift" },
      { value: "4 of 5", label: "campaigns with a valid counterfactual" },
    ],
    problem:
      "The retailer measured its coupon campaigns by comparing targeted households against untargeted ones, which showed a 4.39x difference in weekly spend. The same two groups already differed 5.67x before any campaign was mailed \u2014 the retailer targets its best customers, so the measurement was crediting campaigns with a gap that predated them. Every decision about which campaigns to repeat was being made on that number.",
    dataset:
      "dunnhumby The Complete Journey: 2,469 households of a US grocery retailer over 2017 \u2014 1.47M transaction lines, 20.9M product-store-week promotion records, 27 campaigns, 6,589 sends and 2,102 redemptions. 22.8M rows modelled into a DuckDB star schema.",
    approach: [
      "Recovered the operating timezone from the data before trusting any join: source timestamps are UTC while the retailer's week boundary is local midnight, so a naive date cast misassigns 1.16M of 1.47M transactions across campaign windows. Converting to America/New_York reproduces the source week for all 1,469,307 rows exactly.",
      "Rejected never-targeted households as a control group \u2014 their median pre-period spend was $5.99 against $154.99 for targeted households, a gap no matching can repair \u2014 and used not-yet-treated households instead, drawn from the same targeted population by the same selection process.",
      "Stacked the campaigns rather than pooling them, avoiding the known bias in two-way fixed effects under staggered rollout, with household and stack-week fixed effects and standard errors clustered on household.",
      "Replaced the parallel-trends check after finding the first one was a multiple-comparisons trap: screening on whether any single pre-period coefficient is significant rejects a valid design roughly 30% of the time at seven pre-periods. A joint Wald test on the full covariance matrix reversed three campaigns \u2014 admitting two that had been wrongly excluded and rejecting the programme's apparent best performer.",
      "Falsified every estimate on fake launch dates inside the pre-period, where the true effect is zero by construction. The main design passed; the baseline-quintile heterogeneity analysis failed and was withdrawn from the findings rather than published with a caveat.",
      "Packaged it as a BA deliverable set \u2014 business case, BRD with user stories and acceptance criteria, KPI dictionary separating descriptive from causal metrics, methodology, findings, recommendations, data dictionary and an assumptions register \u2014 plus a live Excel scenario model, documented Power BI extracts, and an interactive explorer that lets a reader switch the measurement and validation rules and watch the verdict move.",
    ],
    stack: [
      "SQL",
      "DuckDB",
      "Python",
      "Difference-in-Differences",
      "statsmodels",
      "Power BI",
      "Excel",
      "pytest",
    ],
    results: [
      {
        value: "$39.20",
        label: "overstatement per household-week",
        note: "in the metric the business was acting on",
      },
      {
        value: "\u2212$10,129",
        label: "margin destroyed",
        note: "across campaigns that could be measured",
      },
      {
        value: "26",
        label: "tests",
        note: "including estimator verification against the dummy-variable model",
      },
    ],
    businessImpact:
      "The finding that makes this worth discussing is the one that cost me the good headline. Campaign 13 was the programme's only positive, significant result \u2014 +$8.04 per household-week, p=0.003, worth $14,539 in modelled margin. It has zero individually significant pre-treatment coefficients, so every week-by-week check passes and the standard eyeball of an event-study plot would have cleared it. Only the joint test, using the covariance between those coefficients rather than reading them one at a time, catches the drift. Reporting it would have handed the retailer a campaign to scale on evidence that doesn't hold. The recommendation is therefore not \u201cstop couponing\u201d \u2014 it is that a programme spending on 6,589 sends with a 12% redemption rate should reserve a randomised holdout, which turns a contested statistical reconstruction into a subtraction, and re-run campaign 13 properly rather than discard it. Failing a parallel-trends test is evidence that the data cannot tell, not evidence of no effect.",
    diagram: "incrementality",
    links: {
      github:
        "https://github.com/VikhyatKoppalgithub/Trade-promotion-incrementality",
    },
  },

  {
    slug: "flight-delay-propagation",
    title: "Flight Delay Propagation Analysis",
    tagline:
      "38.8% of delay in US aviation isn't caused by the flight reporting it — it arrived on the aircraft. Finding that changes where you'd intervene.",
    context: "Personal project · 33.7M flights, BTS open data",
    period: "2026",
    featured: true,
    category: "Data Analysis · SQL & Warehousing",
    kind: "Personal",
    headlineMetrics: [
      { value: "33.7M", label: "flights analyzed" },
      { value: "38.8%", label: "of delay is inherited, not caused" },
      { value: "$459M", label: "annual opportunity identified" },
    ],
    problem:
      "Airlines measure delay against the flight that reports it, which quietly assumes each flight is responsible for its own lateness. If a large share of delay is actually inherited from the aircraft's previous leg, then every operational decision built on that measure — where to add buffer, which delays to prioritize — is being made against the wrong cause.",
    dataset:
      "Five years of US Bureau of Transportation Statistics on-time data, 2021–2025: 33.7 million domestic flights, 60 monthly extracts, ~1.7 GB raw compressed to 0.76 GB of typed parquet feeding a DuckDB star schema.",
    approach: [
      "Reconstructed every aircraft rotation by chaining flights on tail number into the sequence each airframe actually flew, which is what makes 'delay that arrived here' a measurable quantity rather than an assumption.",
      "Modelled each turn as inherited = max(0, inbound delay − slack), where slack is the scheduled turn minus the fastest turn that operator has ever achieved at that station — so delay only propagates when the ground time genuinely cannot absorb it.",
      "Validated against an independent source rather than asserting the model: airlines separately report late-aircraft minutes to BTS, so the same quantity exists in the feed computed a completely different way. Across 5.4M turns receiving an aircraft 15+ minutes late, the model predicted 23.3 minutes passed on against 21.2 reported, correlating at 0.784.",
      "Simulated the obvious fix — more morning ground time — and found it doesn't pay: buffer only earns where late aircraft actually are, and by the afternoon amplification has already fallen from 2.44x to 1.34x. No hour reaches break-even.",
      "Reported the places the data doesn't behave: the dose-response between slack and on-time departure isn't strictly monotonic, a composition effect from those turns skewing Southwest and mid-cascade. Controlling for cascade position narrows it without removing it, so it's documented rather than smoothed away.",
      "Packaged the analysis as a BA deliverable set — business case, KPI definitions, findings, recommendations, data dictionary, and an assumptions-and-limitations register — with every figure in the docs regenerated from the warehouse rather than typed, so no number in the write-up can drift from the data behind it.",
      "Built two front ends over the same warehouse: a self-contained dashboard that opens as a single HTML file with no server, and a Streamlit explorer that re-queries all 33.7M rows live against whatever carrier, airport and date range you pick — DuckDB returns a filtered aggregate in under a tenth of a second, so nothing is pre-computed.",
      "Added a rotation inspector that draws one airframe's scheduled day against the day it actually flew, so a cascade can be watched leg by leg instead of read as a statistic. It surfaces what the aggregates hide: on a bad day several legs are not continuations at all — the aircraft was booked out before its inbound was due in, a tail-chain break from an aircraft swap or a maintenance leg missing from the feed.",
    ],
    stack: [
      "SQL",
      "DuckDB",
      "Python",
      "Star Schema Modeling",
      "pandas",
      "Streamlit",
      "Plotly",
      "pytest",
      "Streamlit",
      "Power BI / Tableau extracts",
    ],
    results: [
      { value: "0.784", label: "correlation vs. independent source", note: "5.4M turns, validated not asserted" },
      { value: "13x", label: "more damage from an 08:00 delay", note: "0.75 flights delayed vs 0.06 at 21:00" },
      { value: "28", label: "data quality tests", note: "every figure regenerated from the warehouse" },
    ],
    businessImpact:
      "The recommendation runs against intuition, which is what makes it worth having. Protecting the morning bank with schedule buffer looks obviously right and simulates as close to worthless, because aircraft turning at 06:00 slept at the station and aren't late yet — slack has nothing to absorb. What does pay is preventing carrier-controllable delay in that morning bank, worth roughly $459M a year in direct operating cost at a 20% reduction — costed at the Airlines for America 2025 rate of $98.41 per block minute, and scoped with a pilot design rather than proposed as a blanket change. The December 2022 Southwest collapse is the same thesis at full scale: every carrier flew into the same storm, the control group had recovered by the 26th, and Southwest peaked at 77.5% cancellations. The weather stopped; the cascade did not.",
    diagram: "propagation",
    links: {
      github: "https://github.com/VikhyatKoppalgithub/Flight-Delay-Analytics",
    },
  },

  {
    slug: "customer-segmentation",
    title: "Customer Segmentation & Targeted Marketing",
    tagline:
      "Broke a single undifferentiated customer base into 4+ behavioral segments, then made the findings self-serve.",
    context: "Tequed Labs · Data Analyst Intern",
    period: "Sept 2022 – Dec 2022",
    featured: true,
    category: "Customer Analytics · BI Reporting",
    kind: "Professional",
    headlineMetrics: [
      { value: "4+", label: "behavioral segments identified" },
      { value: "25%", label: "reporting efficiency gain" },
      { value: "3", label: "Tableau dashboards shipped" },
    ],
    problem:
      "Marketing was addressing the customer base as if it were one audience, which meant every campaign was tuned to an average customer who didn't exist. Stakeholders also had no self-serve view of performance — every question required an analyst.",
    dataset: "Customer behavioral and transaction data.",
    approach: [
      "Applied K-means clustering to customer behavioral data to identify natural groupings rather than imposing predetermined demographic buckets.",
      "Profiled the resulting 4+ segments into descriptions a marketing stakeholder could act on.",
      "Built 3 Tableau dashboards so recurring questions could be answered without an analyst in the loop.",
      "Documented the analytical findings and translated them into targeted marketing recommendations.",
    ],
    stack: ["Python", "K-Means Clustering", "Tableau", "Segmentation Analysis", "Data Storytelling"],
    results: [
      { value: "4+", label: "behavioral segments", note: "each with actionable profiles" },
      { value: "25%", label: "reporting efficiency improvement", note: "via self-serve dashboards" },
      { value: "3", label: "dashboards delivered", note: "adopted by business stakeholders" },
    ],
    businessImpact:
      "Moved marketing from one-size-fits-all to segment-specific targeting, and moved reporting from request-driven to self-serve. The second change compounds: every hour not spent rebuilding the same report is an hour available for the next analysis.",
    diagram: "segmentation",
    links: {},
  },

  {
    slug: "ai-marketing-budget-agent",
    title: "AI-Powered Marketing Budget Allocation Agent",
    tagline:
      "An agent that decides where the weekly ad budget goes — and can prove the split is optimal, not just plausible.",
    context: "Purdue University · Daniels School of Business",
    period: "2025 – 2026",
    featured: false,
    category: "Marketing Analytics · Optimization",
    kind: "Academic",
    headlineMetrics: [
      { value: "+162%", label: "predicted conversion lift" },
      { value: "132K+", label: "rows of eCommerce data" },
      { value: "KKT", label: "verified optimal solution" },
    ],
    problem:
      "Weekly digital marketing budgets are usually split by habit — last quarter's allocation, adjusted by instinct. With five years of eCommerce history sitting unused, the question was whether an agent could make that call better than a rule of thumb, and whether it could show its answer was actually optimal rather than merely confident.",
    dataset:
      "Five years of eCommerce marketing and conversion history — 132,000+ rows of weekly spend and performance data.",
    approach: [
      "Framed weekly budget allocation as a constrained optimization problem: maximize conversions subject to a fixed total spend across channels.",
      "Used Bayesian Optimization to search the allocation space efficiently, rather than brute-forcing a high-dimensional grid of possible splits.",
      "Verified the solver's output against the Karush-Kuhn-Tucker (KKT) conditions — so the recommended allocation carries a mathematical optimality guarantee under the budget constraint, instead of being the best option the search happened to sample.",
      "Wrapped the system in a Gemini LLM interface so a stakeholder can ask in plain language and get back both the allocation and the reasoning behind it.",
    ],
    stack: [
      "Python",
      "Bayesian Optimization",
      "KKT / Constrained Optimization",
      "SciPy",
      "scikit-learn",
      "Google Gemini",
      "Streamlit",
      "Plotly",
    ],
    results: [
      { value: "+162%", label: "predicted conversion lift", note: "vs. baseline allocation" },
      { value: "132K+", label: "rows processed", note: "5 years of weekly history" },
      { value: "KKT", label: "optimality verified", note: "not just sampled-best" },
    ],
    businessImpact:
      "Turns a recurring judgment call into a repeatable, auditable decision. The KKT verification is the part that matters commercially: it separates an agent whose recommendation you can act on from one whose output you have to independently double-check. That distinction is the difference between an LLM demo and a system a marketing team can actually put in the loop.",
    diagram: "agent",
    links: {
      github:
        "https://github.com/VikhyatKoppalgithub/AI-Powered-Marketing-Budget-Allocation-Agent",
    },
  },

  {
    slug: "ai-data-analyst",
    title: "AI Data Analyst — Hybrid Verified Agent",
    tagline:
      "Upload a messy spreadsheet, ask a business question, and get an answer whose every number was computed and checked — not generated.",
    context: "Personal project · runs fully local",
    period: "2026",
    featured: false,
    category: "Analytics Automation · AI",
    kind: "Personal",
    headlineMetrics: [
      { value: "98%", label: "on a 306-assertion eval" },
      { value: "1.1M", label: "payroll rows stress-tested" },
      { value: "$0.00", label: "per query — no API key" },
    ],
    problem:
      "Language models cannot do arithmetic reliably, and they hide it well. Asked to split a 16% revenue decline across two segments, qwen2.5-coder:14b answered 13pp and 3pp — the true values were 15.4pp and 0.61pp, wrong by 5x on the smaller one and neatly back-fitted to sum to 16. Asked for a correlation, it reported −0.1468 with a confident interpretation attached, before any code had run. The real value was −0.0033: no relationship at all.",
    dataset:
      "Two synthetic fixtures built to have known ground truth — 9,596 rows of retail sales (revenue falling 16.1%) and 37,166 support tickets (SLA breaches rising 48.4%) — each seeded with a decoy slice that moves dramatically but explains almost nothing. Later hardened against two real government exports — New Zealand's Annual Enterprise Survey and NYC's Citywide Payroll, the second of which stress-tested the pipeline at 1.1M rows.",
    approach: [
      "Profile rather than dump: the raw rows never reach the model. A 37,000-row file is rendered into roughly 580 tokens carrying dtypes, semantic types where they disagree with storage, null and duplicate counts, cardinality, and trap flags — an int64 ticket_id is reported as 'numeric but reads as an identifier — do not aggregate'.",
      "Split answering into two paths with different guarantees, and surface the difference instead of blending it: a deterministic contribution engine whose arithmetic is exact and reconciled, and a sandboxed code path that runs model-written Python and iterates on real tracebacks.",
      "Make the arithmetic self-checking. Contributions are computed as a share of the total change, so they must sum to that total — if they don't, the grouping is silently dropping rows. This also guards against the classic error of reporting the largest percentage move instead of the largest actual contributor.",
      "Refuse prose until something has actually executed. The code loop discards an answer if the model tries to respond without a successful run; a failed execution doesn't count.",
      "Grade it deterministically: 16 cases across 2 datasets, 102 assertions, no model judging another model — so a score is reproducible and free to produce. Assertions are grouped into routing, interpretation, correctness, and communication, which separates reading the question from deciding how to answer it from reporting honestly.",
    ],
    stack: [
      "Python",
      "Ollama · qwen2.5-coder",
      "pandas",
      "Streamlit",
      "pytest",
      "Sandboxed Execution",
      "Deterministic Evals",
    ],
    results: [
      { value: "98%", label: "eval score", note: "301/306 assertions · qwen2.5-coder:14b" },
      { value: "0.6 pp", label: "standard deviation", note: "across three full passes" },
      { value: "$0.00", label: "cost per query", note: "96 runs, 53 min, local only" },
    ],
    businessImpact:
      "The value isn't that it answers questions — it's that it tells you which answers you can trust. Verified arithmetic and model-written code are labelled differently rather than presented with equal confidence, which is the difference between a tool an analyst can put in front of a stakeholder and one they have to re-check by hand. Running locally also removes the per-query cost and the data-leaves-the-building problem that blocks most LLM tooling in regulated settings.",
    diagram: "hybrid",
    links: {
      github: "https://github.com/VikhyatKoppalgithub/AI_DATA_ANALYST_HYBRID_AGENT",
    },
  },

  {
    slug: "hr-rag-assistant",
    title: "Northwind HR Assistant — RAG with an Evaluation Harness",
    tagline:
      "Five retrieval strategies, scored on 31 questions — and a result that overturned the choice I would otherwise have shipped.",
    context: "Personal project · no framework dependencies",
    period: "2026",
    featured: false,
    category: "Knowledge Retrieval · AI",
    kind: "Personal",
    headlineMetrics: [
      { value: "1.000", label: "Hit@5 with two-stage rerank" },
      { value: "5", label: "strategies benchmarked" },
      { value: "~60", label: "lines of BM25, from scratch" },
    ],
    problem:
      "Most RAG projects ship a pipeline and assert that it works. Without measurement there's no way to tell whether a change helped or just felt better — and the intuitive architecture choice is not always the right one. The harder question isn't 'can I build retrieval', it's 'can I prove which retrieval is better on my data'.",
    dataset:
      "An employee handbook indexed into 51 chunks, evaluated against 28 questions with known correct answers plus 3 deliberately unanswerable ones — so the system is scored on knowing when to decline, not only on recall.",
    approach: [
      "Built without LangChain, LlamaIndex, or a vector database — BM25 is implemented from scratch in roughly 60 lines so the ranking formula is visible and inspectable rather than hidden behind an abstraction.",
      "Benchmarked five strategies on the same question set: BM25, dense embeddings, hybrid fusion, and two-stage variants that retrieve 20 candidates then reorder them with a cross-encoder.",
      "Scored every strategy on Hit@5, MRR, and Recall@5, so ranking quality is separated from raw retrieval — a strategy can find the right passage and still bury it.",
      "Diagnosed the failures rather than just tallying them: BM25 missed every paraphrase ('I'm having a baby soon' never says 'parental'), while dense retrieval missed a question where three near-identical stipend sections sat almost on top of each other in vector space.",
    ],
    stack: [
      "Python",
      "BM25 (from scratch)",
      "Dense Embeddings",
      "Cross-Encoder Reranking",
      "Hybrid Retrieval",
      "Evaluation Harness",
    ],
    results: [
      { value: "1.000", label: "Hit@5 and Recall@5", note: "dense + rerank, perfect on the set" },
      { value: "0.964", label: "MRR", note: "vs. 0.911 dense, 0.846 hybrid" },
      { value: "31", label: "graded questions", note: "28 answerable + 3 that shouldn't be" },
    ],
    businessImpact:
      "The headline finding is a negative one, and that's the useful part: hybrid retrieval — the conventional default — scored worse on MRR than plain dense retrieval, because fusing in BM25's weaker ranking pushed correct passages down. Two-stage reranking then recovered an answer that no single-stage strategy could find at all. Without the eval harness, hybrid would have shipped and been reported as the better system. That is the argument for measuring retrieval instead of assuming it.",
    diagram: "rag",
    links: {
      github: "https://github.com/VikhyatKoppalgithub/HR_Chatbot_Assistant",
    },
  },
];

/** Convenience selectors used by the Projects section. */
export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);
