"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

/** Section ids must match the `id` prop passed to each <Section>. */
const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Solidify the bar once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight whichever section currently owns the upper viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      // Band across the top third of the screen — a section counts as "active"
      // when its content sits where the reader is actually looking.
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // While the mobile sheet is open: lock body scroll, close on an outside
  // press, and close on Escape. All listeners are torn down on close.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Keyboard users land here first. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          className="container-page flex h-16 items-center justify-between"
          aria-label="Main"
        >
          <a
            href="#top"
            className="group flex min-h-11 items-center gap-2.5 text-sm font-semibold tracking-tight text-fg md:min-h-0"
          >
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-accent-line bg-accent-soft text-[11px] font-bold text-accent"
              aria-hidden="true"
            >
              {site.initials}
            </span>
            <span className="hidden sm:inline">{site.shortName}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeId === id ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeId === id
                      ? "text-accent"
                      : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {label}
                  {activeId === id ? (
                    <span
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {site.links.github ? (
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="hidden h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-accent-line hover:text-accent sm:inline-flex md:h-9 md:w-9"
              >
                <GitHubIcon size={16} />
              </a>
            ) : null}

            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-accent-line hover:text-accent sm:inline-flex md:h-9 md:w-9"
            >
              <LinkedInIcon size={16} />
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:text-fg md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        {menuOpen ? (
          <div
            id="mobile-menu"
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-11 items-center rounded-lg px-3 py-3 text-sm transition-colors ${
                      activeId === id ? "text-accent" : "text-fg-muted"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </header>
    </>
  );
}
