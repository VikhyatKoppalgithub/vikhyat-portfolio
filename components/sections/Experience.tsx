import { experience } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { MapPin } from "lucide-react";

/**
 * Timeline of roles, newest first.
 *
 * The node colour encodes the career track (analytics vs. engineering), which
 * makes the back-and-forth of the narrative legible without a word of
 * explanation.
 */
export function Experience() {
  return (
    <Section id="experience" elevated>
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where the work happened."
        description="Three roles across analytics and engineering — each one adding a piece of how I approach problems today."
      />

      <div className="relative">
        {/* Spine. Hidden on mobile where cards stack full-width. */}
        <div
          className="absolute left-[7px] top-2 hidden h-full w-px bg-line sm:block"
          aria-hidden="true"
        />

        <div className="space-y-10">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={i * 0.08}>
              <article className="relative sm:pl-12">
                {/* Timeline node */}
                <span
                  className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] items-center justify-center rounded-full border-2 bg-bg sm:flex"
                  style={{
                    borderColor:
                      role.track === "analytics"
                        ? "var(--track-analytics)"
                        : "var(--track-engineering)",
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        role.track === "analytics"
                          ? "var(--track-analytics)"
                          : "var(--track-engineering)",
                    }}
                  />
                </span>

                <div className="rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong md:p-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-fg">
                        {role.role}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="font-medium text-accent">{role.company}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-fg-subtle">
                          <MapPin size={11} aria-hidden="true" />
                          {role.location}
                        </span>
                      </div>
                    </div>

                    <span className="metric shrink-0 text-xs text-fg-subtle">
                      {role.period}
                    </span>
                  </div>

                  <p className="mt-4 text-sm italic leading-relaxed text-fg-subtle">
                    {role.summary}
                  </p>

                  <ul className="mt-5 space-y-3.5">
                    {role.highlights.map((highlight, j) => (
                      <li key={j} className="flex gap-3">
                        <span
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-sm leading-relaxed text-fg-muted">
                            {highlight.text}
                          </p>
                          {highlight.metric ? (
                            <span className="metric mt-1.5 inline-block rounded border border-accent-line bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                              {highlight.metric}
                            </span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {role.stack.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
