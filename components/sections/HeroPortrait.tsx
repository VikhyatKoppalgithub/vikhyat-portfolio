import { site } from "@/content/site";

/** Pulsing availability dot, reused by both badge placements. */
function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}

/**
 * Hero portrait card.
 *
 * The credential chips live here rather than under the headline: the card
 * needs a reason to exist beyond decoration, and the left column reads
 * cleaner without them. Renders nothing if `site.portrait` is empty, so the
 * hero falls back to its single-column layout rather than breaking.
 */
export function HeroPortrait({ className = "" }: { className?: string }) {
  if (!site.portrait) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Accent bloom behind the card, same language as the hero glow. */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 25%, var(--accent-soft), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <figure className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="relative aspect-4/5 w-full overflow-hidden">
          {/* Plain <img>: the site is a static export with image optimization
              off, and this is the LCP element, so it must not lazy-load. */}
          <img
            src={site.portrait}
            alt={site.name}
            width={880}
            height={1100}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-top"
          />

          {/* Overlaid only where the photo is wide enough to carry the full
              sentence without covering the face — below lg it moves to its own
              row underneath. */}
          <span className="absolute bottom-3 left-3 right-3 hidden items-center gap-2 rounded-full border border-accent-line bg-bg/75 px-3 py-1.5 text-[11px] font-medium leading-snug text-accent backdrop-blur-sm lg:inline-flex">
            <LiveDot />
            {site.hero.availabilityBadge}
          </span>
        </div>

        {/* Same badge, stacked placement for small screens. */}
        <div className="flex items-center gap-2 border-t border-line px-4 py-2.5 text-[11px] font-medium leading-snug text-accent lg:hidden">
          <LiveDot />
          {site.hero.availabilityBadgeShort}
        </div>

        {/* Always visible, including mobile where the credential rows below
            are hidden — years of experience is the one stat worth the space. */}
        <div className="flex items-baseline gap-2.5 border-t border-line px-4 py-3">
          <span className="metric text-gradient text-xl font-semibold">
            {site.hero.experience.value}
          </span>
          <span className="text-[11px] leading-tight text-fg-subtle">
            {site.hero.experience.label}
          </span>
        </div>

        {/* Desktop only — on mobile these render as chips in the text
            column instead, so the headline is not pushed below the fold. */}
        <ul className="hidden divide-y divide-line border-t border-line lg:block">
          {site.hero.chips.map((chip) => (
            <li
              key={chip}
              className="flex items-start gap-2.5 px-4 py-3 text-xs leading-snug text-fg-muted"
            >
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {chip}
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
