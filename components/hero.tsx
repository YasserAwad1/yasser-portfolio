"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type Kind = "key" | "ident" | "str" | "dim";

// The yasser.ts snippet, tokenised for syntax colouring + typewriter reveal.
const CODE: [string, Kind][] = [
  ["const ", "key"],
  ["yasser ", "ident"],
  ["= {\n", "dim"],
  ["  roles: [", "ident"],
  ['"Software Developer"', "str"],
  [", ", "dim"],
  ['"Funnel Developer"', "str"],
  [", ", "dim"],
  ['"AI-Assisted Builder"', "str"],
  ["],\n", "dim"],
  ["  builds: [", "ident"],
  ['"funnels"', "str"],
  [", ", "dim"],
  ['"automations"', "str"],
  [", ", "dim"],
  ['"web + mobile apps"', "str"],
  ["],\n", "dim"],
  ["  background: [", "ident"],
  ['"Frontend"', "str"],
  [", ", "dim"],
  ['"Flutter"', "str"],
  ["],\n", "dim"],
  ["  ships: ", "ident"],
  ['"complete systems, not single layers"', "str"],
  [",\n", "dim"],
  ["}", "dim"],
];

const TOTAL = CODE.reduce((n, [t]) => n + t.length, 0);

const COLOR: Record<Kind, string> = {
  key: "text-[var(--code-key)]",
  ident: "text-white",
  str: "text-[var(--code-str)]",
  dim: "text-[var(--code-dim)]",
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "compiling" | "done">("typing");

  useEffect(() => {
    if (reduce) {
      setCount(TOTAL);
      setPhase("done");
      return;
    }
    if (phase !== "typing") return;
    if (count >= TOTAL) {
      setPhase("compiling");
      const t = setTimeout(() => setPhase("done"), 650);
      return () => clearTimeout(t);
    }
    const id = setTimeout(
      () => setCount((c) => Math.min(TOTAL, c + 1)),
      count === 0 ? 350 : 19,
    );
    return () => clearTimeout(id);
  }, [reduce, phase, count]);

  const revealed = phase !== "typing";

  // Build the visible, coloured code up to `count` characters.
  let offset = 0;
  const code: ReactNode[] = [];
  for (let i = 0; i < CODE.length; i++) {
    const [text, kind] = CODE[i];
    const start = offset;
    offset += text.length;
    const visible = Math.max(0, Math.min(text.length, count - start));
    if (visible <= 0) break;
    code.push(
      <span key={i} className={COLOR[kind]}>
        {text.slice(0, visible)}
      </span>,
    );
  }

  return (
    <section className="relative px-6 pt-28 pb-20 md:pt-36 md:pb-28 max-w-7xl mx-auto">
      <motion.p
        className="mono-eyebrow mb-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        // software developer · funnel developer · ai-assisted builder
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Code panel — solid dark panel; the purple bar draws in on compile and stays */}
        <div className="relative rounded-2xl bg-[var(--code-bg)] shadow-2xl shadow-black/20 overflow-hidden order-1">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono text-[11px] text-[var(--code-dim)]">
              yasser.ts
            </span>
          </div>
          <pre className="font-mono text-[13px] md:text-sm leading-relaxed p-5 md:p-7 text-white whitespace-pre-wrap min-h-[220px]">
            {code}
            {phase === "typing" && (
              <span
                aria-hidden="true"
                className="inline-block w-[2px] -mb-[2px] h-[1.05em] bg-[var(--code-key)] align-middle"
                style={{ animation: "caret-blink 1s steps(1) infinite" }}
              />
            )}
          </pre>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--code-key)]"
            style={{ transformOrigin: "left center" }}
            initial={false}
            animate={{ scaleX: phase === "typing" ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Hero copy */}
        <motion.div
          className="order-2"
          initial={reduce ? "show" : "hidden"}
          animate={revealed ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
        >
          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.02] tracking-tight text-ink"
          >
            I build complete
            <br />
            <span className="text-accent">digital systems.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl"
          >
            From high-converting funnels and automated workflows to web and
            mobile applications — I use modern development tools and AI-assisted
            workflows to turn ideas into complete, production-ready systems.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Magnetic disabled={!!reduce}>
              <a
                href="#work"
                className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium font-mono transition-colors bg-accent text-white hover:opacity-90"
              >
                See selected work →
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium font-mono transition-colors border border-line bg-surface text-ink hover:border-ink"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Magnetic hover wrapper — pulls its child toward the cursor. */
function Magnetic({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.4 }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}
