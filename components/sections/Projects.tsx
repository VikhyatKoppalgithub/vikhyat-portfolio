import { additionalProjects, featuredProjects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        eyebrow="Featured projects"
        title="Business problem first. Then the data."
        description="Each card opens into the full case study: what the problem actually was, how I approached it, what came out, and why it mattered to the business."
      />

      <div className="space-y-6">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {additionalProjects.length > 0 ? (
        <>
          <Reveal>
            <h3 className="mb-6 mt-16 text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
              Technical depth — where the engineering background shows
            </h3>
          </Reveal>

          <div className="space-y-6">
            {additionalProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </>
      ) : null}
    </Section>
  );
}
