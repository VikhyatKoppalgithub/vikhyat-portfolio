import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

/**
 * Compact availability CTA.
 *
 * Sizes to its own content — no pinned edges — so it reads as a pill rather
 * than a bar. Links to the contact section, which is what the arrow promises.
 *
 * `className` carries the placement and surface: translucent over the photo on
 * desktop, tinted against the page on smaller screens.
 */
export function AvailabilityPill({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={
        // NOTE: no display utility here — the caller supplies it, otherwise
        // it would conflict with `hidden` and both variants would show.
        "group w-fit max-w-full items-center gap-2 rounded-full border " +
        "border-accent-line py-1 pl-1 pr-3 text-[10.5px] font-medium leading-tight " +
        "text-accent transition-colors hover:border-accent sm:text-[11px] " +
        className
      }
    >
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform group-hover:scale-105">
        <ArrowUpRight size={12} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="min-w-0">{site.hero.availabilityBadge}</span>
    </a>
  );
}
