import { site } from "@/content/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-elev">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <div className="text-sm font-medium text-fg">{site.name}</div>
          <div className="mt-1 text-xs text-fg-subtle">
            {site.role} · {site.location}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-accent-line hover:text-accent md:h-9 md:w-9"
          >
            <Mail size={16} aria-hidden="true" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-accent-line hover:text-accent md:h-9 md:w-9"
          >
            <LinkedInIcon size={16} />
          </a>
          {site.links.github ? (
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-accent-line hover:text-accent md:h-9 md:w-9"
            >
              <GitHubIcon size={16} />
            </a>
          ) : null}
        </div>

        <div className="metric text-xs text-fg-subtle">© {year}</div>
      </div>
    </footer>
  );
}
