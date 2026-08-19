import type { Project } from "@/content/types";
import { personalProjects, professionalProjects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

/** One labelled block of project cards. */
function ProjectGroup({
  label,
  note,
  items,
  className = "",
}: {
  label: string;
  note: string;
  items: Project[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <Reveal>
        <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {label}
          </h3>
          <span className="text-xs text-fg-subtle">{note}</span>
        </div>
      </Reveal>

      <div className="space-y-6">
        {items.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title="Business problem first. Then the data."
        description="Each card opens into the full case study: what the problem actually was, how I approached it, what came out, and why it mattered to the business."
      />

      {/* Paid client and industry work leads; self-directed work follows. */}
      <ProjectGroup
        label="Professional"
        note="Client and industry engagements"
        items={professionalProjects}
      />

      <ProjectGroup
        label="Personal"
        note="Self-directed and academic projects"
        items={personalProjects}
        className="mt-16"
      />
    </Section>
  );
}
