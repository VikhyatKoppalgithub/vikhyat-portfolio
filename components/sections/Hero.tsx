import { ArrowRight, ChevronDown, Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { ResumeDownload } from "@/components/ui/ResumeDownload";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The 20-second section.
 *
 * A recruiter should leave this screen knowing five things: the roles being
 * targeted, that the toolkit is analyst-standard, that there's a software
 * engineering foundation underneath it, what the measurable impact has been,
 * and how to get in touch. Order below follows exactly that.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-24 pb-14 sm:pb-16"
    >
      {/* Drafting grid, masked so it fades out toward the bottom. */}
      <div
        className="bg-grid pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 78%)",
        }}
        aria-hidden="true"
      />

      {/* Accent glow, upper-left, very restrained. */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="max-w-4xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {site.hero.eyebrow}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-fg-subtle">
                <MapPin size={12} aria-hidden="true" />
                {site.location}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-display mt-6 font-semibold tracking-tight text-fg">
              {site.hero.headline}{" "}
              <span className="text-gradient">{site.hero.headlineAccent}</span>
            </h1>
          </Reveal>

          {/* Toolkit at a glance. This is the five-second answer to
              "what kind of analyst is this?" */}
          <Reveal delay={0.12}>
            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              {site.hero.skills.map((skill, i) => (
                <li key={skill} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span className="text-line-strong" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                  <span className="font-medium text-fg-muted">{skill}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* The one-line career story that runs through the whole site. */}
          <Reveal delay={0.16}>
            <p className="metric mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-fg-subtle sm:text-xs">
              <span>Software Engineering Foundation</span>
              <span className="text-accent" aria-hidden="true">
                →
              </span>
              <span>Business Analytics</span>
              <span className="text-accent" aria-hidden="true">
                →
              </span>
              <span className="text-accent">Data-Driven Business Problem Solving</span>
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {site.hero.valueProp}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink
                href="#projects"
                variant="primary"
                className="min-h-11 w-full sm:min-h-0 sm:w-auto"
                icon={<ArrowRight size={16} aria-hidden="true" />}
              >
                View Projects
              </ButtonLink>

              <ResumeDownload className="w-full sm:w-auto" />

              <ButtonLink
                href="#contact"
                icon={<Mail size={16} aria-hidden="true" />}
                className="min-h-11 w-full sm:min-h-0 sm:w-auto"
              >
                Contact Me
              </ButtonLink>

              {/* Social links stay on one row on mobile rather than
                  stacking into two more full-width buttons. */}
              <div className="flex items-center gap-2 [&>a]:min-h-11 sm:contents sm:[&>a]:min-h-0">
                <ButtonLink
                  href={site.links.linkedin}
                  external
                  variant="ghost"
                  icon={<LinkedInIcon size={16} />}
                  aria-label="LinkedIn profile"
                >
                  LinkedIn
                </ButtonLink>

                {site.links.github ? (
                  <ButtonLink
                    href={site.links.github}
                    external
                    variant="ghost"
                    icon={<GitHubIcon size={16} />}
                    aria-label="GitHub profile"
                  >
                    GitHub
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-fg-subtle">
              {site.hero.chips.map((chip) => (
                <span key={chip} className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#impact"
        aria-label="Scroll to impact highlights"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-fg-subtle transition-colors hover:text-accent md:block"
      >
        <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
