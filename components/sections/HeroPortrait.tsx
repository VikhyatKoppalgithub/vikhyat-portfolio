import { site } from "@/content/site";

/** Pulsing availability dot, reused by both badge placements. */
function LiveDot() {
  return (
    <span className="relative mt-1 flex h-1.5 w-1.5 shrink-0 lg:mt-0" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}

function CredentialList({ items, className }: { items: readonly string[]; className: string }) {
  return (
    <ul className={`divide-y divide-line border-t border-line ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 px-3 py-2 text-[11px] leading-snug text-fg-muted lg:gap-2.5 lg:px-4 lg:py-3 lg:text-xs"
        >
          <span
            className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent lg:mt-1.5"
            aria-hidden="true"
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Hero portrait card.
 *
 * Two layouts from one markup tree:
 *  - below lg the card is horizontal — photo on the left at 38%, everything
 *    else in a column beside it. A narrow vertical card cannot hold this much
 *    text without clipping.
 *  - from lg up it is the original vertical card in the hero's right column.
 *
 * Renders nothing if `site.portrait` is empty, so the hero falls back to its
 * single-column layout rather than breaking.
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

      <figure className="relative flex overflow-hidden rounded-2xl border border-line bg-surface shadow-card lg:flex-col">
        {/* Photo. Stretches to the card's height beside the text on mobile;
            becomes a 4:5 block on top from lg up. object-cover crops rather
            than distorting, so the aspect ratio is always preserved. */}
        <div className="relative w-[38%] shrink-0 self-stretch overflow-hidden lg:aspect-4/5 lg:w-full lg:self-auto">
          <img
            src={site.portrait}
            alt={site.name}
            width={880}
            height={1100}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-top"
          />

          {/* Overlaid on the photo only on desktop, where it has room. */}
          <span className="absolute bottom-3 left-3 right-3 hidden items-center gap-2 rounded-full border border-accent-line bg-bg/75 px-3 py-1.5 text-[11px] font-medium leading-snug text-accent backdrop-blur-sm lg:inline-flex">
            <LiveDot />
            {site.hero.availabilityBadge}
          </span>
        </div>

        {/* Information column — beside the photo on mobile, stacked beneath it
            on desktop. min-w-0 lets long strings wrap instead of overflowing. */}
        <div className="flex min-w-0 flex-1 flex-col lg:flex-none">
          <div className="flex items-start gap-2 px-3 py-2.5 text-[11px] font-medium leading-snug text-accent lg:hidden">
            <LiveDot />
            <span className="min-w-0">{site.hero.availabilityBadge}</span>
          </div>

          <div className="border-t border-line px-3 py-2.5 lg:flex lg:items-baseline lg:gap-2.5 lg:px-4 lg:py-3">
            <span className="metric text-gradient block text-lg font-semibold leading-tight lg:text-xl">
              {site.hero.experience.value}
            </span>
            <span className="mt-0.5 block text-[11px] leading-tight text-fg-subtle lg:mt-0">
              {site.hero.experience.label}
            </span>
          </div>

          <CredentialList items={site.hero.chipsCompact} className="lg:hidden" />
          <CredentialList items={site.hero.chips} className="hidden lg:block" />
        </div>
      </figure>
    </div>
  );
}
