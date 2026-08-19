import type { ReactNode } from "react";

type SectionProps = {
  /** Anchor target — must match the nav href in components/layout/Navbar.tsx. */
  id: string;
  children: ReactNode;
  className?: string;
  /** Slightly raised background, used to alternate section bands. */
  elevated?: boolean;
};

/** Consistent vertical rhythm and anchor behaviour for every top-level band. */
export function Section({ id, children, className = "", elevated = false }: SectionProps) {
  return (
    <section
      id={id}
      // scroll-mt keeps the heading clear of the fixed navbar on anchor jumps
      className={`py-14 sm:py-20 md:py-28 ${
        elevated ? "bg-bg-elev border-y border-line" : ""
      } ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
