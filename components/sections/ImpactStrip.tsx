import { impactStats } from "@/content/site";
import { StatTile } from "@/components/ui/StatTile";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four numbers, directly under the hero.
 *
 * This is the recruiter-scan insurance policy: if someone reads nothing else,
 * these tiles carry the strongest evidence on the page.
 */
export function ImpactStrip() {
  return (
    <section id="impact" className="scroll-mt-24 border-y border-line bg-bg-elev py-10 sm:py-14">
      <div className="container-page">
        <Reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
            Selected impact
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <Reveal key={stat.value + stat.label} delay={i * 0.07}>
              <StatTile metric={stat} size="lg" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
