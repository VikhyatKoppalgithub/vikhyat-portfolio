import type { ReactNode } from "react";

/**
 * Shared SVG building blocks for the project diagrams.
 *
 * Design rules these enforce:
 *  - every colour comes from a CSS variable, so diagrams re-theme with the site
 *  - the frame scrolls horizontally on narrow screens instead of squashing
 *  - each diagram carries <title>/<desc> so it isn't invisible to a screen reader
 */

type DiagramFrameProps = {
  /** Accessible name, announced by screen readers. */
  title: string;
  /** Accessible longer description of what the diagram shows. */
  desc: string;
  /** Intrinsic coordinate space, e.g. "0 0 760 420". */
  viewBox: string;
  /** Minimum px width before the container starts scrolling. */
  minWidth?: number;
  children: ReactNode;
};

export function DiagramFrame({
  title,
  desc,
  viewBox,
  minWidth = 680,
  children,
}: DiagramFrameProps) {
  return (
    <figure className="scroll-x -mx-1 rounded-xl border border-line bg-bg-elev p-1">
      <svg
        viewBox={viewBox}
        role="img"
        aria-label={title}
        style={{ minWidth, width: "100%", height: "auto", display: "block" }}
        className="font-sans"
      >
        <title>{title}</title>
        <desc>{desc}</desc>
        {children}
      </svg>
    </figure>
  );
}

/** Arrowhead + soft glow definitions. `id` must be unique per diagram. */
export function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-arrow`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--line-strong)" />
      </marker>

      <marker
        id={`${id}-arrow-accent`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
      </marker>

      <linearGradient id={`${id}-accent-fill`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
        <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.06" />
      </linearGradient>
    </defs>
  );
}

type Tone = "default" | "accent" | "muted" | "input";

const toneStyles: Record<Tone, { fill: string; stroke: string; text: string }> = {
  default: { fill: "var(--surface)", stroke: "var(--line-strong)", text: "var(--fg)" },
  accent: { fill: "var(--accent-soft)", stroke: "var(--accent)", text: "var(--accent)" },
  muted: { fill: "var(--surface-2)", stroke: "var(--line)", text: "var(--fg-muted)" },
  input: { fill: "transparent", stroke: "var(--line)", text: "var(--fg-muted)" },
};

type NodeProps = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  /** Optional second line, rendered smaller and dimmer. */
  sub?: string;
  tone?: Tone;
  /** Dashed border — used for inputs and external systems. */
  dashed?: boolean;
};

/** A labelled box. Keep `label` under ~26 chars so it doesn't overflow. */
export function Node({
  x,
  y,
  w = 168,
  h = 54,
  label,
  sub,
  tone = "default",
  dashed = false,
}: NodeProps) {
  const s = toneStyles[tone];
  const cx = x + w / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={1.25}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={s.text}
        fontSize={12.5}
        fontWeight={550}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 13}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--fg-subtle)"
          fontSize={10.5}
          fontFamily="var(--font-mono)"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

type ArrowProps = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent?: boolean;
  /** Text rendered beside the midpoint. */
  label?: string;
  /** Nudges the label off the line. */
  labelDx?: number;
  labelDy?: number;
  dashed?: boolean;
};

export function Arrow({
  id,
  x1,
  y1,
  x2,
  y2,
  accent = false,
  label,
  labelDx = 0,
  labelDy = -7,
  dashed = false,
}: ArrowProps) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={accent ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth={1.25}
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd={`url(#${id}-arrow${accent ? "-accent" : ""})`}
      />
      {label ? (
        <text
          x={(x1 + x2) / 2 + labelDx}
          y={(y1 + y2) / 2 + labelDy}
          textAnchor="middle"
          fill="var(--fg-subtle)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

/** A grouping container with a caption in the top-left. */
export function Group({
  x,
  y,
  w,
  h,
  label,
  id,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  id: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={`url(#${id}-accent-fill)`}
        stroke="var(--accent-line)"
        strokeWidth={1}
        strokeDasharray="5 4"
      />
      <text
        x={x + 14}
        y={y + 18}
        fill="var(--accent)"
        fontSize={10.5}
        fontWeight={600}
        letterSpacing={1.2}
        fontFamily="var(--font-mono)"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/** Small caption under a diagram. */
export function DiagramCaption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-xs leading-relaxed text-fg-subtle">{children}</p>
  );
}
