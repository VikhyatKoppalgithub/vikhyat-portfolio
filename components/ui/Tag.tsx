import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  /** `accent` is for the one or two tags that should actually draw the eye. */
  variant?: "default" | "accent" | "outline";
  className?: string;
};

const variants = {
  default: "bg-surface-2 text-fg-muted border-line",
  accent: "bg-accent-soft text-accent border-accent-line",
  outline: "bg-transparent text-fg-subtle border-line",
} as const;

/** Small pill used for tech stack items, categories, and status chips. */
export function Tag({ children, variant = "default", className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
