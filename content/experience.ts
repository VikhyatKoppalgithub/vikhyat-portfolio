import type { Experience } from "./types";

/**
 * Professional experience, newest first.
 *
 * Bullets are written impact-first: what changed, not what the job description
 * said. `track` colours the timeline node so the analytics ↔ engineering
 * chapters of the career narrative are visible at a glance.
 */

export const experience: Experience[] = [
  {
    company: "PartnerLinQ",
    role: "Data Analyst — Graduate Industry Practicum",
    location: "Cranbury, NJ",
    period: "Jan 2026 – May 2026",
    track: "analytics",
    summary:
      "Enterprise-scale root cause analysis on cloud telemetry, delivered directly to client decision makers.",
    highlights: [
      {
        text: "Performed root cause analysis on Azure telemetry using SQL, quantifying CosmosDB request-unit exhaustion and mapping system errors to recurring causes across a 31-step EDI transaction pipeline.",
        metric: "12.4M RU/mo projected · 65K+ errors",
      },
      {
        text: "Mapped failure patterns and process bottlenecks across cloud data pipelines, delivering recommendations that prioritized process improvements by operational impact.",
      },
      {
        text: "Translated cloud operational data into functional requirements supporting an AI-driven predictive maintenance solution, delivered on schedule.",
      },
      {
        text: "Presented findings to client decision makers through structured stakeholder reviews, aligning analytical insight with business priorities.",
      },
    ],
    stack: ["SQL", "Root Cause Analysis", "Requirements Elicitation", "Stakeholder Management"],
  },

  {
    company: "Versa Networks",
    role: "Software Engineer",
    location: "Bangalore, India",
    period: "Jul 2023 – Jul 2025",
    track: "engineering",
    summary:
      "Two years shipping production features on an enterprise platform — the engineering credibility behind the analytics work.",
    highlights: [
      {
        text: "Collaborated with product managers, QA engineers, and designers to translate business requirements into production-ready UI features delivered through Agile sprints.",
        metric: "15+ features",
      },
      {
        text: "Migrated application modules from Backbone.js to React, reducing technical debt and improving the long-term maintainability of an enterprise platform.",
        metric: "10+ modules",
      },
      {
        text: "Reviewed pull requests and mentored two interns, cutting lint errors by enforcing ESLint standards across the codebase.",
        metric: "50+ PRs · 80% fewer lint errors",
      },
    ],
    stack: ["React", "Backbone.js", "JavaScript", "ESLint", "Agile / Scrum", "Code Review"],
  },

  {
    company: "Tequed Labs",
    role: "Data Analyst Intern",
    location: "Bangalore, India",
    period: "Sept 2022 – Dec 2022",
    track: "analytics",
    summary:
      "First analytics role — clustering, dashboards, and translating findings into recommendations stakeholders acted on.",
    highlights: [
      {
        text: "Applied K-means clustering to customer data to identify behavioral segments, delivering targeted marketing recommendations to business stakeholders.",
        metric: "4+ segments",
      },
      {
        text: "Built Tableau dashboards that improved stakeholder reporting efficiency through self-serve data visualization.",
        metric: "3 dashboards · 25% efficiency gain",
      },
      {
        text: "Documented analytical insights and translated findings into actionable recommendations, supporting data-driven decision making across teams.",
      },
    ],
    stack: ["Python", "K-Means Clustering", "Tableau", "Data Storytelling"],
  },
];
