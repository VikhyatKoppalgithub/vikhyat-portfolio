/**
 * Global site content: identity, links, SEO, and the hero copy.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS IS THE FIRST FILE TO EDIT. Everything marked TODO is a placeholder.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * POSITIONING (read before editing copy):
 * The target roles are Data Analyst and Business Analyst — treated as one
 * combined identity, not two. Software engineering and AI are framed as
 * *differentiators* that give more technical depth than a typical analyst
 * candidate, never as the headline career direction. Keep that balance when
 * you rewrite anything here.
 */

export const site = {
  name: "Vikhyat Yashvanth Koppal",
  shortName: "Vikhyat Koppal",
  initials: "VK",

  /** Used in <title>, OG tags, and the JSON-LD Person schema. */
  role: "Data Analyst & Business Analyst",

  hero: {
    eyebrow: "Data Analyst · Business Analyst",
    headline: "Turning data, business requirements, and technology into",
    headlineAccent: "actionable decisions.",
    valueProp:
      "I find what's actually going wrong inside messy operational data, translate it into requirements a team can build, and explain it to engineers and stakeholders in their own language. Two years shipping production software before my analytics master's means I understand the systems the data comes from.",

    /** Skill strip under the headline — makes the target unmistakable in ~5 seconds. */
    skills: [
      "SQL",
      "Python",
      "Excel",
      "Tableau",
      "Power BI",
      "Business Analysis",
      "Agile",
      "AI",
    ],

    /** Credibility chips. Facts only. */
    chips: [
      "U.S. Citizen",
      "MS-BAIM, Purdue — 2026 graduate",
      "CAPM® Certified",
    ],
  },

  /**
   * Headshot shown in the hero. Drop the file in /public and point here.
   * Set to "" to hide the portrait card and return to a single-column hero.
   */
  portrait: "/vikhyat-koppal.jpeg",

  location: "West Lafayette, IN, USA",
  email: "vykoppal@gmail.com",
  phone: "+1 (765) 479-9966",
  workAuthorization: "U.S. Citizen — authorized to work in the United States",

  links: {
    linkedin: "https://www.linkedin.com/in/vikhyat-koppal-843303220",
    github: "https://github.com/VikhyatKoppalgithub",
  },

  /** Files live in /public/resume/. Add or rename freely. */
  resumes: [
    {
      label: "Data Analyst Resume",
      file: "/resume/Vikhyat_Koppal_Data_Analyst.pdf",
    },
    {
      label: "Business Analyst Resume",
      file: "/resume/Vikhyat_Koppal_Business_Analyst.pdf",
    },
  ],

  /** Shown in the hero and contact section. Set to "" to hide it entirely. */
  availability:
    "MS-BAIM graduate — available now for Data Analyst and Business Analyst roles",

  /**
   * Live production URL. Feeds og:url, the JSON-LD Person schema, sitemap.xml
   * and robots.txt. If you later add a custom domain in Vercel, change this
   * line and push — everything SEO-facing follows from it.
   */
  url: "https://vikhyat-koppal-portfolio.vercel.app",

  seo: {
    title: "Vikhyat Yashvanth Koppal — Data Analyst & Business Analyst",
    description:
      "Data Analyst and Business Analyst with a software engineering foundation. SQL root cause analysis, KPI reporting, Tableau and Power BI dashboards, requirements elicitation, and stakeholder communication. Master of Science in Business Analytics and Information Management, Purdue University.",
    keywords: [
      "Data Analyst",
      "Business Analyst",
      "Business Operations",
      "Analytics",
      "SQL",
      "Python",
      "Tableau",
      "Power BI",
      "Requirements Elicitation",
      "Root Cause Analysis",
      "Agile",
      "Purdue Business Analytics",
    ],
  },
} as const;

/**
 * The four numbers a recruiter should absorb in the first four seconds.
 * Deliberately weighted toward analyst work: two from data analysis, one from
 * business impact, one that establishes the technical differentiator.
 */
export const impactStats = [
  {
    value: "12.4M RU",
    label: "projected monthly CosmosDB saving",
    note: "SQL root cause analysis · PartnerLinQ",
  },
  {
    value: "33.7M",
    label: "flight records analyzed in SQL",
    note: "DuckDB star schema · delay propagation",
  },
  {
    value: "$39.20",
    label: "per-household-week of reported lift shown to be non-incremental",
    note: "Stacked difference-in-differences · dunnhumby",
  },
  {
    value: "2 yrs",
    label: "shipping production software before analytics",
    note: "Technical depth most analyst candidates don't have",
  },
] as const;

/** About section. Narrative, not a resume restatement. */
export const about = {
  paragraphs: [
    "I analyze operational data to find the expensive problems hiding inside it, then turn what I find into requirements, dashboards, and recommendations that a business can actually act on. Most recently that meant root cause analysis on cloud telemetry at PartnerLinQ, where SQL across 225M+ daily log entries mapped 65,000+ errors that had been dismissed as background noise and quantified 12.4M CosmosDB request units a month in projected saving.",
    "I got here from the other side. I spent two years as a software engineer at Versa Networks translating requirements from product managers into shipped features, reviewing pull requests, and mentoring interns. That taught me how systems fail, how developers estimate, and why requirements go wrong. I then went to Purdue's Daniels School of Business for a Master of Science in Business Analytics and Information Management to learn the business half properly.",
    "The combination is the point. I can sit in a stakeholder review and a sprint planning session and be useful in both, because I have done both jobs. And when a problem needs more than a dashboard, I can build the thing myself, whether that is an optimization model, an AI system, or automated analysis, rather than writing a ticket and waiting.",
  ],
  interests: [
    "Root cause analysis on messy operational data",
    "Turning an ambiguous business question into a measurable one",
    "Making findings self-serve so they outlive the analysis",
    "Translating between engineering and business in both directions",
  ],
} as const;
