import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  /** Opens in a new tab with the required rel hardening. */
  external?: boolean;
  /** Triggers a file download rather than navigation. */
  download?: boolean;
  /** Rendered before the label. Pass a lucide icon or one of our brand marks. */
  icon?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium " +
  "transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  // Solid accent — reserve for the single most important action per view.
  primary:
    "bg-accent text-accent-fg hover:brightness-110 hover:-translate-y-0.5 shadow-[0_4px_20px_-6px_var(--accent)]",
  secondary:
    "border border-line-strong bg-surface text-fg hover:border-accent-line hover:bg-surface-2 hover:-translate-y-0.5",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface-2",
} as const;

/** Every CTA on the site is a link, so this renders an anchor rather than a button. */
export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external = false,
  download = false,
  icon,
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}
