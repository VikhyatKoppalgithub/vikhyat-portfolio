"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before animating. Stagger siblings with 0.06–0.1 steps. */
  delay?: number;
  /** Distance in px to travel upward. Keep it small — this should be felt, not seen. */
  y?: number;
  className?: string;
};

/**
 * Fades content up as it scrolls into view, once.
 *
 * If the visitor has "reduce motion" enabled at the OS level, this renders a
 * plain div and the content is simply there — no animation, no delay, nothing
 * that depends on JS having run.
 */
export function Reveal({ children, delay = 0, y = 18, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
