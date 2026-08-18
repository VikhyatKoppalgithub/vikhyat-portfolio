import { about, site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "lucide-react";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="An engineer who went looking for the why."
      />

      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-fg-muted md:text-[1.05rem]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="rounded-xl border border-line bg-surface p-6">
            <h3 className="text-sm font-semibold text-fg">
              Problems I like working on
            </h3>

            <ul className="mt-4 space-y-3">
              {about.interests.map((interest) => (
                <li key={interest} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {interest}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-line pt-5">
              <div className="text-xs text-fg-subtle">Work authorization</div>
              <div className="mt-1 text-sm font-medium text-fg">
                {site.workAuthorization}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
