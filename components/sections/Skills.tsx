import {
  BrainCircuit,
  ChartColumn,
  ClipboardList,
  Code2,
  Database,
  KanbanSquare,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Maps the `icon` key in content/skills.ts to a component. */
const ICONS: Record<string, LucideIcon> = {
  analytics: Database,
  code: Code2,
  chart: ChartColumn,
  ai: BrainCircuit,
  business: ClipboardList,
  project: KanbanSquare,
  tools: Wrench,
};

export function Skills() {
  return (
    <Section id="skills" elevated>
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="Grouped by the kind of problem they solve."
        description="No proficiency bars — a self-assigned percentage tells you nothing. These are grouped so you can find the category you're hiring for."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => {
          const Icon = ICONS[category.icon] ?? Database;

          return (
            <Reveal key={category.title} delay={i * 0.05}>
              <div className="group h-full rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent-line">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-line bg-accent-soft text-accent">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold text-fg">{category.title}</h3>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
                  {category.blurb}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-line bg-surface-2 px-2 py-1 text-xs text-fg-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
