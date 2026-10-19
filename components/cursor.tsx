"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor ring that trails the native pointer and grows over links/buttons.
 * The native cursor stays visible. Only rendered on fine-pointer devices
 * (mouse/trackpad), never on touch, and skipped under reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 400, damping: 32, mass: 0.3 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setActive(!!t?.closest("a, button, [role='button'], input, textarea"));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden pointer-fine:block rounded-full border border-accent/70"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: active ? 44 : 26,
        height: active ? 44 : 26,
        opacity: visible ? 1 : 0,
        backgroundColor: active
          ? "color-mix(in oklab, var(--accent) 14%, transparent)"
          : "color-mix(in oklab, var(--accent) 0%, transparent)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    />
  );
}
