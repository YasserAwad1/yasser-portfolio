"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tag = "div" | "p" | "h2" | "h3" | "span" | "article" | "ul" | "li";

/**
 * Scroll reveal: fades + rises ~16px, once on enter.
 * Renders as the requested semantic tag; skips motion under reduced-motion.
 */
export function Reveal({
  as = "div",
  children,
  className,
  style,
  delay = 0,
  y = 16,
  blur = false,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, ...(blur ? { filter: "blur(12px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: blur ? 0.7 : 0.5, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}
