import type { Metric } from "@/content/types";

type StatTileProps = {
  metric: Metric;
  /** `lg` is the hero impact strip; `sm` sits inside project cards. */
  size?: "sm" | "lg";
};

/**
 * A single number with its meaning attached.
 *
 * The value uses tabular mono figures so a row of tiles stays optically
 * aligned regardless of digit widths.
 */
export function StatTile({ metric, size = "lg" }: StatTileProps) {
  const isLarge = size === "lg";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-accent-line ${
        isLarge ? "p-5 md:p-6" : "p-4"
      }`}
    >
      {/* Accent wash that fades in on hover — subtle, not a light show. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, var(--accent-soft), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <div
          className={`metric font-semibold text-gradient ${
            isLarge ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        >
          {metric.value}
        </div>

        <div
          className={`mt-2 font-medium leading-snug text-fg ${
            isLarge ? "text-sm" : "text-xs"
          }`}
        >
          {metric.label}
        </div>

        {metric.note ? (
          <div
            className={`mt-1.5 leading-snug text-fg-subtle ${
              isLarge ? "text-xs" : "text-[11px]"
            }`}
          >
            {metric.note}
          </div>
        ) : null}
      </div>
    </div>
  );
}
