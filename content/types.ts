/**
 * Shared content types.
 *
 * Everything rendered on the site is typed here, so if you add a project or a
 * job and miss a field, TypeScript tells you at build time instead of the page
 * silently rendering blank.
 */

/** A single headline number. `value` is rendered in the mono display face. */
export type Metric = {
  /** The number itself, pre-formatted. e.g. "12.4M", "0.95", "+162%" */
  value: string;
  /** What the number measures. Keep under ~40 chars so tiles stay balanced. */
  label: string;
  /** Optional clarifier shown smaller beneath the label. */
  note?: string;
};

/** Which hand-drawn SVG diagram to render inside an expanded project. */
export type DiagramKey =
  | "agent"
  | "hybrid"
  | "incrementality"
  | "propagation"
  | "rag"
  | "rca"
  | "segmentation";

export type ProjectLinks = {
  /** Full URL. Leave undefined to render a muted "link coming soon" chip. */
  github?: string;
  demo?: string;
  writeup?: string;
};

export type Project = {
  /** Stable id used for the DOM id and React key. */
  slug: string;
  title: string;
  /** One-line hook shown on the collapsed card. */
  tagline: string;
  /** Where the work happened — company or academic program. */
  context: string;
  period: string;
  /** Short badge, e.g. "AI / Agentic". Drives the accent treatment. */
  category: string;
  /**
   * How the work came about. Also decides which group the card lands in:
   * "Professional" heads the section, everything else follows under
   * personal projects.
   */
  kind: "Professional" | "Academic" | "Personal";
  /** 2–3 metrics shown on the collapsed card. Keep the strongest first. */
  headlineMetrics: Metric[];
  /** The story, in the order a reader should meet it. */
  problem: string;
  dataset: string;
  approach: string[];
  stack: string[];
  results: Metric[];
  businessImpact: string;
  diagram?: DiagramKey;
  links: ProjectLinks;
};

export type ExperienceHighlight = {
  text: string;
  /** Optional pull-quote metric rendered beside the bullet. */
  metric?: string;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  /** Drives the timeline node colour: analytics vs. engineering chapters. */
  track: "analytics" | "engineering";
  /** One sentence framing what this role was for, in career-narrative terms. */
  summary: string;
  highlights: ExperienceHighlight[];
  stack: string[];
};

export type SkillCategory = {
  title: string;
  /** lucide-react icon name, resolved in components/sections/Skills.tsx */
  icon: string;
  /** One line explaining how this category shows up in real work. */
  blurb: string;
  skills: string[];
};

export type EducationEntry = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa: string;
  coursework: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  /** When it was awarded, e.g. "May 2026". */
  issued?: string;
  /** Expiry, for credentials that have one. */
  expires?: string;
  /**
   * Path to the certificate PDF under /public — renders the card as a link
   * that opens the actual document. This is what makes the claim checkable.
   */
  file?: string;
  /** Public credential / verification number printed on the certificate. */
  credentialId?: string;
  /** Issuer's own verification page, if there is a public one. */
  url?: string;
};
