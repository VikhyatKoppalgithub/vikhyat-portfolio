import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Contact() {
  return (
    <Section id="contact" elevated>
      <div className="relative overflow-hidden rounded-2xl border border-accent-line bg-surface p-6 sm:p-8 md:p-14">
        {/* Accent wash anchored to the top-right corner. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 120% at 100% 0%, var(--accent-soft), transparent 62%)",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="metric text-xs text-accent">06</span>
              <span className="h-px w-8 bg-accent-line" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
                Contact
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-section-title mt-5 max-w-2xl font-semibold tracking-tight text-fg">
              If you&rsquo;re hiring a Data or Business Analyst —{" "}
              <span className="text-gradient">let&rsquo;s talk.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
              I&rsquo;m most useful where the data is messy, the question
              isn&rsquo;t fully formed yet, and someone needs to translate
              between the stakeholders who asked and the engineers who&rsquo;ll
              build it. If that sounds like the role, I&rsquo;d like to hear
              about it.
            </p>
          </Reveal>

          {site.availability ? (
            <Reveal delay={0.16}>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3.5 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {site.availability}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={`mailto:${site.email}`}
                variant="primary"
                icon={<Mail size={16} aria-hidden="true" />}
              >
                Email me
              </ButtonLink>

              <ButtonLink
                href={site.links.linkedin}
                external
                icon={<LinkedInIcon size={16} />}
              >
                LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" className="opacity-60" />
              </ButtonLink>

              {site.links.github ? (
                <ButtonLink href={site.links.github} external icon={<GitHubIcon size={16} />}>
                  GitHub
                  <ArrowUpRight size={14} aria-hidden="true" className="opacity-60" />
                </ButtonLink>
              ) : null}

              <ButtonLink
                href={site.resumes[0].file}
                download
                variant="ghost"
                icon={<Download size={16} aria-hidden="true" />}
              >
                Resume
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <dl className="mt-10 grid gap-5 border-t border-line pt-8 sm:grid-cols-3">
              <ContactDetail
                icon={<Mail size={14} aria-hidden="true" />}
                label="Email"
                value={site.email}
                href={`mailto:${site.email}`}
              />
              <ContactDetail
                icon={<Phone size={14} aria-hidden="true" />}
                label="Phone"
                value={site.phone}
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              />
              <ContactDetail
                icon={<MapPin size={14} aria-hidden="true" />}
                label="Location"
                value={site.location}
              />
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-fg-subtle">
        {icon}
        {label}
      </dt>
      <dd className="mt-2 break-words text-sm text-fg">
        {href ? (
          <a
            href={href}
            className="inline-flex min-h-11 items-center transition-colors hover:text-accent sm:min-h-0"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
