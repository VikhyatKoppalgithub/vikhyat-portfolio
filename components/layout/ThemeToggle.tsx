"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Dark ⇄ light toggle.
 *
 * Dark is the default and no class is present for it; light is opt-in via a
 * `.light` class on <html>. The choice persists in localStorage and is applied
 * by the inline script in app/layout.tsx before first paint, so there's no
 * flash of the wrong theme on reload.
 */
export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next = !isLight;
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // Private browsing or storage disabled — the toggle still works for
      // this session, it just won't be remembered.
    }
    setIsLight(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors hover:border-accent-line hover:text-accent md:h-9 md:w-9"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      {/* Render nothing until mounted so the icon matches the real theme. */}
      {mounted ? (
        isLight ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
