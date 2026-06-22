"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const line: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const text: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE, delay: 0.12 } },
};

/** Section label with an accent line that draws in as the section enters view. */
export function SectionEyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      className={`mono-eyebrow flex items-center gap-3 ${className}`}
      initial={reduce ? undefined : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <motion.span
        aria-hidden="true"
        className="inline-block h-px w-8 bg-accent origin-left"
        variants={reduce ? undefined : line}
      />
      <motion.span variants={reduce ? undefined : text}>{children}</motion.span>
    </motion.p>
  );
}
