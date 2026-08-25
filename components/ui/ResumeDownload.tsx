"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { site } from "@/content/site";

/** Shared trigger styling so the single-file button and the dropdown match. */
const TRIGGER =
  "inline-flex w-full min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg " +
  "border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-fg " +
  "transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-line " +
  "hover:bg-surface-2 sm:min-h-0 sm:w-auto";

/**
 * "Download Resume".
 *
 * With a single resume this is a plain download link — a disclosure holding one
 * item is a control that does nothing. With two or more it becomes a dropdown
 * that closes on outside press and Escape, since a native <details> only closes
 * by clicking its own summary again.
 */
export function ResumeDownload({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const single = site.resumes.length === 1 ? site.resumes[0] : null;

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

  if (single) {
    return (
      <a href={single.file} download="" className={`${TRIGGER} ${className}`}>
        <Download size={16} aria-hidden="true" />
        Download Resume
      </a>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-controls={menuId}
        className={TRIGGER}
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
