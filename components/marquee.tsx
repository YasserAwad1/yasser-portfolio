import { WORKED_WITH } from "@/lib/profile";

/**
 * "Worked with" strip — companies and products, scrolling continuously.
 * The list is rendered twice so translateX(-50%) loops seamlessly.
 * Pauses on hover; static under prefers-reduced-motion.
 */
export function Marquee() {
  const items = [...WORKED_WITH, ...WORKED_WITH];
  return (
    <div
      className="border-y border-line bg-surface/40"
      aria-label="Companies and products I have worked with"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-6 md:gap-10">
        <span className="mono-eyebrow shrink-0 whitespace-nowrap">
          {"// worked with"}
        </span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="group flex w-max marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= WORKED_WITH.length}
                className="flex items-center gap-8 pr-8 font-display text-lg md:text-xl text-ink/75 whitespace-nowrap"
              >
                {name}
                <span className={`h-1 w-1 rounded-full ${i % 2 ? "bg-accent-2/70" : "bg-accent/60"}`} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
