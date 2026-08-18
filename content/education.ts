import type { Certification, EducationEntry } from "./types";

export const education: EducationEntry[] = [
  {
    institution: "Purdue University, Daniels School of Business",
    degree: "Master of Science in Business Analytics and Information Management",
    location: "West Lafayette, IN",
    period: "Aug 2025 – Aug 2026",
    gpa: "3.63 / 4.00",
    coursework: [
      "Business Analytics",
      "IT Project Management",
      "AI for Business Decisions",
      "Spreadsheet Modeling & Simulation",
    ],
  },
  {
    institution: "Visvesvaraya Technological University",
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    location: "Belagavi, India",
    period: "Jun 2019 – Jul 2023",
    gpa: "3.38 / 4.00",
    coursework: [
      "Data Analytics",
      "AI & Machine Learning",
      "Operating Systems",
      "Management & Entrepreneurship for IT",
      "Social Innovation & Business",
    ],
  },
];

/**
 * Certifications, each backed by the actual certificate PDF in
 * /public/certificates/. Every field below was read off the certificate
 * itself — dates, credential numbers, and exact course titles.
 *
 * To add one: drop the PDF into /public/certificates/ and append an entry.
 * `file` is what turns the card into a link to the document.
 */
export const certifications: Certification[] = [
  {
    name: "CAPM® — Certified Associate in Project Management",
    issuer: "Project Management Institute (PMI)",
    issued: "May 2026",
    expires: "May 2029",
    credentialId: "4376382",
    file: "/certificates/Vikhyat_Koppal_CAPM_PMI.pdf",
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft · Certiport",
    issued: "December 2025",
    file: "/certificates/Vikhyat_Koppal_Azure_AI_900.pdf",
  },
  {
    name: "Business Analyst Course",
    issuer: "Analyst Club",
    issued: "September 2025",
    file: "/certificates/Vikhyat_Koppal_Business_Analyst_Course.pdf",
  },
  {
    name: "100 Days of Code: The Complete Python Pro Bootcamp",
    issuer: "Udemy · 56.5 hours",
    issued: "December 2024",
    file: "/certificates/Vikhyat_Koppal_Python_Bootcamp_Udemy.pdf",
    url: "https://ude.my/UC-f6bad360-707a-489d-a3ad-89722f0e1fd4",
  },
  {
    name: "Tableau 2024 A-Z: Hands-On Tableau Training for Data Science",
    issuer: "Udemy · 8.5 hours",
    issued: "December 2024",
    file: "/certificates/Vikhyat_Koppal_Tableau_AZ_Udemy.pdf",
    url: "https://ude.my/UC-822044ff-db73-4efc-ba89-bf8c99c633c4",
  },
];
