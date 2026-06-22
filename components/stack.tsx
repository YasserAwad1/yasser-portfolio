"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

type Plane = 0 | 1 | 2;

type Tool = { name: string; left: number; top: number; plane: Plane };

const TOOLS: Tool[] = [
  // daily — front plane
  { name: "React", left: 10, top: 59.86, plane: 0 },
  { name: "Next.js", left: 30, top: 60.78, plane: 0 },
  { name: "TypeScript", left: 50, top: 61.69, plane: 0 },
  { name: "Tailwind CSS", left: 70, top: 62.61, plane: 0 },
  { name: "HTML/CSS", left: 90, top: 63.53, plane: 0 },
  // often — mid plane
  { name: "Framer Motion", left: 10, top: 39.09, plane: 1 },
  { name: "Flutter", left: 30, top: 40.16, plane: 1 },
  { name: "Dart", left: 50, top: 41.24, plane: 1 },
  { name: "Firebase", left: 70, top: 42.32, plane: 1 },
  { name: "Git", left: 90, top: 43.39, plane: 1 },
  // now and then — back plane
  { name: "REST APIs", left: 16.67, top: 18.64, plane: 2 },
  { name: "Docker", left: 50, top: 19.6, plane: 2 },
  { name: "Jira", left: 83.33, top: 20.55, plane: 2 },
];

const PLANE = {
  0: { z: 20, opacity: 1, scale: 1, blur: 0, shift: 28, text: "text-sm md:text-base" },
  1: { z: 10, opacity: 0.85, scale: 0.78, blur: 0, shift: 18, text: "text-xs md:text-sm" },
  2: { z: 5, opacity: 0.55, scale: 0.6, blur: 1.2, shift: 9, text: "text-[11px]" },
} as const;

const MOBILE_GROUPS = [
  { label: "In my hands daily", size: "text-base", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { label: "Often", size: "text-sm opacity-90", tools: ["Framer Motion", "Flutter", "Dart", "Firebase", "Git"] },
  { label: "Now and then", size: "text-xs opacity-70", tools: ["REST APIs", "Docker", "Jira"] },
];

export function Stack() {
  return (
    <section id="stack" className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionEyebrow className="mb-3">// 03 — capabilities</SectionEyebrow>
      <Reveal as="h2" blur className="font-display text-4xl md:text-5xl text-ink mb-4">
        Tools I reach for, ranked by where I live.
      </Reveal>
      <Reveal as="p" className="font-mono text-xs text-muted-foreground mb-10">
        closer = daily · further = now and then
      </Reveal>

      {/* Desktop: parallax depth field */}
      <DepthField />

      {/* Mobile: grouped chips */}
      <div className="sm:hidden space-y-8">
        {MOBILE_GROUPS.map((group) => (
          <Reveal key={group.label}>
            <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center gap-3">
              <span className="text-accent">▸</span> {group.label}
              <span className="flex-1 hairline" />
            </div>
            <div className="flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <span
                  key={tool}
                  className={`font-mono border border-line bg-surface rounded-lg px-3.5 py-2 text-ink ${group.size}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DepthField() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });

  return (
    <motion.div
      onPointerMove={
        reduce
          ? undefined
          : (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }
      }
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="hidden sm:block relative h-[460px] md:h-[520px] rounded-2xl border border-line bg-[radial-gradient(circle_at_50%_120%,var(--accent-soft),transparent_60%)] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-3 flex flex-col justify-between py-4 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
        <span>· rarely</span>
        <span>· often</span>
        <span>· daily</span>
      </div>
      <div className="pointer-events-none absolute top-3 right-4 font-mono text-[10px] text-muted-foreground">
        depth →
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[28%] hairline opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-[55%] hairline opacity-60" />

      {TOOLS.map((tool, i) => (
        <ToolNode key={tool.name} tool={tool} index={i} sx={sx} sy={sy} reduce={!!reduce} />
      ))}
    </motion.div>
  );
}

function ToolNode({
  tool,
  index,
  sx,
  sy,
  reduce,
}: {
  tool: Tool;
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean;
}) {
  const cfg = PLANE[tool.plane];
  const [hover, setHover] = useState(false);
  const x = useTransform(sx, (v) => v * cfg.shift);
  const y = useTransform(sy, (v) => v * cfg.shift);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${tool.left}%`, top: `${tool.top}%`, zIndex: hover ? 40 : cfg.z }}
    >
      <motion.div
        style={reduce ? undefined : { x, y }}
        animate={{
          scale: hover ? Math.min(cfg.scale + 0.22, 1.12) : cfg.scale,
          opacity: hover ? 1 : cfg.opacity,
          filter: hover ? "blur(0px)" : `blur(${cfg.blur}px)`,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div
          className={reduce ? "" : "drift-slow"}
          style={reduce ? undefined : { animationDelay: `${-index * 0.7}s` }}
        >
          <button
            type="button"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            className={`font-mono px-3.5 py-2 rounded-lg border border-line bg-surface text-ink whitespace-nowrap will-change-transform focus:outline-none ${cfg.text}`}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
              {tool.name}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
