import type { Experience } from "./types";

/**
 * Professional experience, newest first.
 *
 * Bullets are written impact-first: what changed, not what the job description
 * said. `track` colours the timeline node so the analytics ↔ engineering
 * chapters of the career narrative are visible at a glance.
 *
 * Every line below tracks the resume in /public/resume. When the resume
 * changes, change this file in the same pass — the hero links straight to the
 * PDF, so a recruiter can read both within about ten seconds of each other.
 *
 * One deliberate exception: the Versa role reads "Software Engineer (Technical
 * Analyst)" here and on LinkedIn, while the resume shortens it to "Technical
 * Analyst" to save a line. That divergence is intentional — do not "correct"
 * this back to match the PDF.
 */

export const experience: Experience[] = [
  {
    company: "PartnerLinQ",
    role: "Data Analyst — Industry Practicum",
    location: "Cranbury, NJ",
    period: "Jan 2026 – May 2026",
    track: "analytics",
    summary:
      "Enterprise-scale root cause analysis on Azure telemetry, delivered directly to client decision makers.",
    highlights: [
      {
        text: "Performed root cause analysis on Azure telemetry using SQL, identifying monthly Cosmos DB request units in projected resource waste and mapping system errors to recurring causes across a 31-step EDI transaction pipeline.",
        metric: "12.4M RU/mo · 65K+ errors",
      },
      {
        text: "Ranked pipeline failure patterns and process bottlenecks by operational impact using Excel, presenting prioritized fixes to client decision makers through structured stakeholder reviews.",
      },
      {
        text: "Translated error-cause mapping and Cosmos DB usage analysis into functional requirements for an AI-driven predictive maintenance solution, delivered on schedule.",
      },
    ],
    stack: [
      "SQL",
      "Excel",
      "Azure · Cosmos DB",
      "Root Cause Analysis",
      "Requirements Elicitation",
      "Stakeholder Management",
    ],
  },

  {
    company: "Versa Networks",
    role: "Software Engineer (Technical Analyst)",
    location: "Bangalore, India",
    period: "Jul 2023 – Jul 2025",
    track: "engineering",
    summary:
      "Two years shipping production features on an enterprise platform — the engineering credibility behind the analytics work.",
    highlights: [
      {
        text: "Built production UI features that surfaced device and traffic data from REST APIs, delivered in Agile sprints alongside product managers, QA, and designers.",
        metric: "15+ features",
      },
      {
        text: "Migrated application modules from Backbone.js to React, reducing technical debt and improving the maintainability and scalability of an enterprise platform.",
        metric: "20+ modules",
      },
      {
        text: "Maintained GitLab CI build pipelines with automated tests, reviewed pull requests, and cut lint errors by enforcing ESLint standards across the codebase.",
        metric: "90+ PRs · 80% fewer lint errors",
      },
    ],
    stack: [
      "React",
      "Backbone.js",
      "JavaScript",
      "REST APIs",
      "GitLab CI",
      "ESLint",
      "Agile / Scrum",
    ],
  },

  {
    company: "Tequed Labs",
    role: "Data Analyst Intern",
    location: "Bangalore, India",
    period: "Sep 2022 – Dec 2022",
    track: "analytics",
    summary:
      "First analytics role — clustering, dashboards, and the data preparation underneath both.",
    highlights: [
      {
        text: "Segmented customers into behavioral groups using K-means clustering in Python, informing targeted marketing recommendations for business stakeholders.",
        metric: "4 segments",
      },
      {
        text: "Designed Tableau dashboards that improved stakeholder reporting efficiency through self-serve data visualization.",
        metric: "3 dashboards · 25% efficiency gain",
      },
      {
        text: "Cleaned, transformed, and validated raw customer data in Python to prepare it for clustering and dashboard reporting.",
      },
    ],
    stack: ["Python", "pandas", "K-Means Clustering", "Tableau", "Data Cleaning"],
  },
];
