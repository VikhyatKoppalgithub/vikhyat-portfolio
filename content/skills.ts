import type { SkillCategory } from "./types";

/**
 * Skills, grouped so a reader can find the category they care about instead of
 * scanning one long list. No proficiency bars — a self-assigned "85%" tells a
 * recruiter nothing, and every portfolio that has them looks the same.
 *
 * `icon` is a key resolved in components/sections/Skills.tsx. If you add a new
 * category, add a matching entry to the icon map there.
 *
 * NOTE(vikhyat): every entry below appears on your resume, except where
 * entailed by it — "JavaScript" (Backbone.js → React work) and "Pull Request
 * Review Workflow" (50+ PRs reviewed). Consider adding Git/GitHub explicitly
 * to your resume; its absence is conspicuous for someone with your background.
 */

export const skillCategories: SkillCategory[] = [
  {
    title: "Data & Analytics",
    icon: "analytics",
    blurb: "Finding the signal, then proving it holds.",
    skills: [
      "Exploratory Data Analysis",
      "Root Cause Analysis",
      "Statistical Analysis",
      "Predictive Modeling",
      "Segmentation & Clustering",
      "A/B Testing",
      "Funnel Analysis",
      "KPI Reporting",
    ],
  },

  {
    title: "BI & Visualization",
    icon: "chart",
    blurb: "Making the finding self-serve so it outlives the analysis.",
    skills: [
      "Tableau",
      "Power BI",
      "Dashboard Design",
      "Data Visualization",
      "Data Storytelling",
    ],
  },

  {
    title: "Business Analysis",
    icon: "business",
    blurb: "Turning an ambiguous ask into something a team can build.",
    skills: [
      "Requirements Elicitation",
      "Functional Requirements",
      "Stakeholder Management",
      "Process Improvement",
      "Cross-Functional Collaboration",
      "Meeting Facilitation",
    ],
  },

  {
    title: "Project Management",
    icon: "project",
    blurb: "CAPM®-certified, with the delivery experience behind it.",
    skills: [
      "Agile / Scrum",
      "Sprint Planning",
      "SDLC",
      "CAPM® Certified",
      "Jira",
      "Confluence",
    ],
  },

  {
    title: "Programming",
    icon: "code",
    blurb: "Two years of production code behind the analysis.",
    skills: [
      "SQL",
      "Python",
      "pandas",
      "Streamlit",
      "JavaScript",
      "React",
      "Backbone.js",
      "Excel (Pivot Tables, XLOOKUP)",
    ],
  },

  {
    title: "AI & Advanced Analytics",
    icon: "ai",
    blurb: "Modern AI applied to business problems — a differentiator, not a job title.",
    skills: [
      "Agentic Workflow Design",
      "Gemini LLM Integration",
      "Local LLM Deployment (Ollama)",
      "RAG & Cross-Encoder Reranking",
      "Bayesian Optimization",
      "Constrained Optimization (KKT)",
      "Deterministic Eval Harnesses",
      "Azure AI Fundamentals",
    ],
  },

  {
    title: "Development Tools",
    icon: "tools",
    blurb: "The day-to-day of shipping on a real team.",
    skills: [
      "Pull Request Review Workflow",
      "ESLint / Code Standards",
      "Jira",
      "Confluence",
      "Mentoring & Code Review",
    ],
  },
];
