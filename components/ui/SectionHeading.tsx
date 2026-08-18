import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Zero-padded section index, e.g. "02". Rendered in mono — part of the
   *  "instrument panel" feel and doubles as a scanning aid. */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3">
        <span className="metric text-xs text-accent">{index}</span>
        <span className="h-px w-8 bg-accent-line" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-section-title mt-4 font-semibold tracking-tight text-fg">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
