"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { site } from "@/content/site";

/**
 * "Download Resume" dropdown.
 *
 * This was a native <details>/<summary>, which only closes by clicking the
 * summary again. Standard dropdown UX needs outside-click and Escape to close
 * it too, so it's a controlled disclosure instead. The markup and classes are
 * otherwise unchanged from the original, so it renders identically.
 */
export function ResumeDownload({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    // pointerdown rather than click: closes on press, and fires before an
    // outside element can steal focus or navigate.
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        // Return focus to the trigger so keyboard users don't lose their place.
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-controls={menuId}
        className="inline-flex w-full min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-line hover:bg-surface-2 sm:min-h-0 sm:w-auto"
      >
        <Download size={16} aria-hidden="true" />
        Download Resume
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          id={menuId}
          className="absolute left-0 top-full z-20 mt-2 w-full max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-lg border border-line bg-surface p-1 shadow-card sm:w-60"
        >
          {site.resumes.map((resume) => (
            <a
              key={resume.file}
              href={resume.file}
              download=""
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-2 rounded-md px-3 py-2.5 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-accent sm:min-h-0"
            >
              <Download size={14} aria-hidden="true" />
              {resume.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
