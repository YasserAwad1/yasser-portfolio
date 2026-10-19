"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts the leading number of a stat up from 0 when it scrolls into view.
 * "4+" → 0…4 then "+", "2h / day" → 0…2 then "h / day". Strings with no
 * leading digits render as-is.
 */
export function CountUp({
  value,
  delay = 0,
  className,
}: {
  value: string;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : value;
  const [n, setN] = useState(() => (reduce && target !== null ? target : 0));

  useEffect(() => {
    if (target === null) return;
    if (reduce) return;
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.1,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, delay]);

  return (
    <span ref={ref} className={className}>
      {target === null ? suffix : `${n}${suffix}`}
    </span>
  );
}
