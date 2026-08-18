import { Award, FileCheck, GraduationCap } from "lucide-react";
import type { Certification } from "@/content/types";
import { certifications, education } from "@/content/education";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Education stays compact — credentials matter, but they shouldn't outweigh
 * the projects and experience above them.
 *
 * Certifications get more room than a plain list because each one links to the
 * actual certificate PDF. A claim a recruiter can open in one click is worth
 * considerably more than the same claim as text.
 */
export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        index="05"
        eyebrow="Education & certifications"
        title="The formal grounding."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {education.map((entry, i) => (
          <Reveal key={entry.institution} delay={i * 0.07}>
            <div className="h-full rounded-xl border border-line bg-surface p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-line bg-accent-soft text-accent">
                  <GraduationCap size={16} aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-snug text-fg">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{entry.institution}</p>

                  <div className="metric mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-subtle">
                    <span>{entry.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-fg-muted">GPA {entry.gpa}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-fg-muted">
                    <span className="text-fg-subtle">Coursework: </span>
                    {entry.coursework.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mb-6 mt-14 flex flex-wrap items-center gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
            Certifications
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
            <FileCheck size={12} aria-hidden="true" />
            Certificates attached — click to view
          </span>
        </div>
      </Reveal>

      {/* 5 certificates: 2-up on small, 3-up on large (3+2), one clean row of
          5 on xl. Avoids leaving a single orphaned card on the last row. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.05}>
            <CertificationCard cert={cert} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-line bg-accent-soft text-accent">
          <Award size={17} aria-hidden="true" />
        </span>

        {cert.file ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-fg-subtle transition-colors group-hover:text-accent">
            View
            <FileCheck size={12} aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <h4 className="mt-4 text-sm font-semibold leading-snug text-fg">
        {cert.name}
      </h4>
      <p className="mt-1.5 text-xs leading-snug text-fg-muted">{cert.issuer}</p>

      {cert.issued || cert.credentialId ? (
        <div className="metric mt-4 space-y-1 border-t border-line pt-3 text-[11px] text-fg-subtle">
          {cert.issued ? (
            <div>
              Issued {cert.issued}
              {cert.expires ? ` · expires ${cert.expires}` : ""}
            </div>
          ) : null}
          {cert.credentialId ? <div>No. {cert.credentialId}</div> : null}
        </div>
      ) : null}
    </>
  );

  // The whole card is the link when a certificate PDF exists — a bigger target
  // than a trailing text link, and it makes the affordance obvious.
  if (cert.file) {
    return (
      <a
        href={cert.file}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-line hover:shadow-card"
        aria-label={`View the ${cert.name} certificate (PDF, opens in a new tab)`}
      >
        {body}
      </a>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
      {body}
    </div>
  );
}
