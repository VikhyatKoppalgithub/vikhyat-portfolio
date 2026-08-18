"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink, Lock } from "lucide-react";
import type { Project } from "@/content/types";
import { Tag } from "@/components/ui/Tag";
import { StatTile } from "@/components/ui/StatTile";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { DiagramSwitch } from "./diagrams/DiagramSwitch";

/**
 * A project as a collapsed summary that expands in place into the full
 * Problem → Approach → Stack → Results → Impact case study.
 *
 * Expanding in place (rather than routing to a new page) is deliberate: a
 * recruiter skimming for 30 seconds never loses their position on the page.
 */
export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();

  return (
    <article
      id={project.slug}
      className={`scroll-mt-24 overflow-hidden rounded-2xl border bg-surface transition-colors duration-300 ${
        open ? "border-accent-line" : "border-line hover:border-line-strong"
      }`}
    >
      {/* ── Collapsed summary ─────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Tag variant="accent">{project.category}</Tag>
          <Tag variant="outline">{project.kind}</Tag>
          <span className="metric ml-auto text-xs text-fg-subtle">
            {project.period}
          </span>
        </div>

        <h3 className="text-card-title mt-4 font-semibold tracking-tight text-fg">
          {project.title}
        </h3>

        <p className="mt-1.5 text-sm text-fg-subtle">{project.context}</p>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg-muted">
          {project.tagline}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {project.headlineMetrics.map((metric) => (
            <StatTile key={metric.label} metric={metric} size="sm" />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent-line hover:text-accent sm:min-h-0 sm:w-auto sm:justify-start"
          >
            {open ? "Hide case study" : "Read the case study"}
            <ChevronDown
              size={15}
              aria-hidden="true"
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:text-accent sm:min-h-0"
            >
              <GitHubIcon size={15} />
              Code
            </a>
          ) : null}

          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:text-accent sm:min-h-0"
            >
              <ExternalLink size={15} aria-hidden="true" />
              Live demo
            </a>
          ) : null}

          {/* Professional work is usually under NDA — say so rather than
              leaving an empty space that reads as an omission. */}
          {!project.links.github && !project.links.demo && project.kind === "Professional" ? (
            <span className="inline-flex items-center gap-2 px-3 py-2 text-xs text-fg-subtle">
              <Lock size={13} aria-hidden="true" />
              Client work — details shared on request
            </span>
          ) : null}
        </div>
      </div>

      {/* ── Expanded case study ───────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line bg-bg-elev p-5 sm:p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <CaseBlock label="Problem" body={project.problem} />
                <CaseBlock label="Data & context" body={project.dataset} />
              </div>

              <div className="mt-8">
                <BlockLabel>Approach</BlockLabel>
                <ol className="mt-4 space-y-3">
                  {project.approach.map((step, i) => (
                    <li key={i} className="flex gap-3.5">
                      <span
                        className="metric mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-accent-line bg-accent-soft text-[10px] font-semibold text-accent"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-fg-muted">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {project.diagram ? (
                <div className="mt-8">
                  <BlockLabel>How it works</BlockLabel>
                  <div className="mt-4">
                    <DiagramSwitch diagram={project.diagram} />
                  </div>
                </div>
              ) : null}

              <div className="mt-8">
                <BlockLabel>Tools & technologies</BlockLabel>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tool) => (
                    <Tag key={tool}>{tool}</Tag>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <BlockLabel>Results</BlockLabel>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.results.map((metric) => (
                    <StatTile key={metric.label} metric={metric} size="sm" />
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-accent-line bg-accent-soft p-5 md:p-6">
                <BlockLabel accent>Business impact</BlockLabel>
                <p className="mt-3 text-sm leading-relaxed text-fg md:text-[0.95rem]">
                  {project.businessImpact}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function BlockLabel({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <h4
      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
        accent ? "text-accent" : "text-fg-subtle"
      }`}
    >
      {children}
    </h4>
  );
}

function CaseBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <BlockLabel>{label}</BlockLabel>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{body}</p>
    </div>
  );
}
