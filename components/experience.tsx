"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

type Role = {
  company: string;
  role: string;
  dates: string;
  location: string;
  live: boolean;
  left: number;
  width: number;
  blurb: string;
  tags: string[];
};

// Card order: reverse-chronological, newest first.
// The timeline axis spans Jan 2022 → now; left/width are percentages of that
// span, one month = 100 / 56.
const ROLES: Role[] = [
  {
    company: "Dawrati",
    role: "Funnel Developer",
    dates: "Jul 2026 — Present",
    location: "United Arab Emirates · Remote",
    live: true,
    left: 96.42857142857143,
    width: 3.5714285714285694,
    blurb:
      "Build and optimize sales funnels and automations while providing daily technical support, troubleshooting, and training sessions to clients.",
    tags: ["Funnels", "Automation", "CRM", "Technical Support", "Client Training"],
  },
  {
    company: "TG Mena",
    role: "Project Manager",
    dates: "Apr 2024 — Sep 2026",
    location: "Saudi Arabia · Remote",
    live: false,
    left: 48.214285714285715,
    width: 51.785714285714285,
    blurb:
      "Managed projects end-to-end, coordinated remote teams, assigned tasks, attended client meetings, and ensured timely delivery using Agile methodologies.",
    tags: ["Project Management", "Agile", "Jira"],
  },
  {
    company: "Exa / Redeemly (by Likecard)",
    role: "Part-Time Flutter Developer",
    dates: "Jan 2026 — Present",
    location: "Saudi Arabia · Remote",
    live: true,
    left: 85.71428571428571,
    width: 14.285714285714292,
    blurb:
      "Building a Flutter SDK/package for a SaaS platform and developing a scalable B2B application.",
    tags: ["Flutter", "Dart", "SDK", "B2B"],
  },
  {
    company: "Goma Plus",
    role: "Flutter Developer",
    dates: "Sep 2023 — Mar 2024",
    location: "Saudi Arabia · Remote",
    live: false,
    left: 35.714285714285715,
    width: 12.5,
    blurb:
      "Developed Flutter applications using GetX, Firebase, and clean architecture, delivering efficient and user-friendly mobile experiences.",
    tags: ["Flutter", "GetX", "Firebase", "Clean Architecture"],
  },
  {
    company: "Independent",
    role: "Freelance Developer",
    dates: "Jan 2022 — Present",
    location: "Remote",
    live: true,
    left: 0,
    width: 100,
    blurb:
      "Built and published cross-platform applications for clients, taking projects from development through deployment on the App Store and Google Play.",
    tags: ["Flutter", "Dart", "Mobile Development", "App Store", "Google Play"],
  },
];

// Bars run oldest-start first so the overlapping tracks read left → right.
const TRACKS = [...ROLES].sort((a, b) => a.left - b.left);

const YEARS = [
  { label: "2022", pos: 0 },
  { label: "2023", pos: 21.428571428571427 },
  { label: "2024", pos: 42.857142857142854 },
  { label: "2025", pos: 64.28571428571429 },
  { label: "2026", pos: 85.71428571428571 },
  { label: "NOW", pos: 100 },
];

const CLIENT_SESSIONS = [
  "Use and configure their software systems",
  "Troubleshoot technical issues",
  "Understand workflows and automations",
  "Solve implementation problems",
  "Get the most out of the systems they run",
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

export function Experience() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(ROLES[0].company);

  return (
    <section id="experience" className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionEyebrow className="mb-3">// 04 — experience</SectionEyebrow>
      <Reveal as="h2" blur className="font-display text-4xl md:text-5xl text-ink mb-3">
        Parallel tracks, on purpose.
      </Reveal>
      <Reveal as="p" className="text-muted-foreground max-w-xl mb-12">
        Several roles overlap — funnel development, freelancing, full-time
        delivery, and a Flutter SDK side track running in parallel.
      </Reveal>

      {/* Desktop timeline */}
      <div className="hidden md:block">
        <div className="relative rounded-2xl border border-line bg-surface p-6">
          {/* Year labels */}
          <div className="relative h-6 mb-2">
            {YEARS.map((y) => (
              <div
                key={y.label}
                style={{ left: `${y.pos}%` }}
                className="absolute -translate-x-1/2 top-0 font-mono text-[11px] text-muted-foreground"
              >
                {y.label}
              </div>
            ))}
          </div>

          {/* Time axis with ticks + drawing accent line */}
          <div className="relative h-px bg-line mb-4">
            {YEARS.map((y) => (
              <div
                key={y.label}
                style={{ left: `${y.pos}%` }}
                className="absolute -translate-x-1/2 -top-1 h-2 w-px bg-line"
              />
            ))}
            <motion.div
              className="absolute left-0 top-0 h-px w-full bg-accent"
              style={{ transformOrigin: "left" }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </div>

          {/* Role bars */}
          <div className="relative">
            {TRACKS.map((r, i) => {
              const isActive = r.company === selected;
              // Bars are positioned by date range, but the label must never be
              // clipped — let the bar grow to fit its text (min-width). Ongoing
              // roles anchor from the right so they grow left (no overflow);
              // finished roles anchor from their start date.
              const barStyle = r.live
                ? {
                    right: `${Math.max(0, 100 - (r.left + r.width))}%`,
                    width: `${r.width}%`,
                    minWidth: "max-content",
                    transformOrigin: "right",
                  }
                : {
                    left: `${r.left}%`,
                    width: `${r.width}%`,
                    minWidth: "max-content",
                    transformOrigin: "left",
                  };
              return (
                <div key={r.company} className="relative h-14">
                  <motion.button
                    type="button"
                    onClick={() => setSelected(r.company)}
                    aria-pressed={isActive}
                    style={barStyle}
                    initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
                    className={`absolute top-2 h-9 rounded-lg border text-left px-3 flex items-center gap-2 whitespace-nowrap focus:outline-none ${
                      isActive
                        ? "border-accent bg-[var(--accent-soft)] text-ink"
                        : r.live
                          ? "border-accent/40 bg-[var(--accent-soft)]/70 text-ink hover:border-accent"
                          : "border-line bg-canvas text-ink hover:border-ink"
                    }`}
                  >
                    <span className="font-mono text-[11px]">
                      <span className="text-ink">{r.company}</span>
                      <span className="text-muted-foreground"> · {r.role}</span>
                    </span>
                    <StatusFlag live={r.live} className="ml-auto" />
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* One detail card per role, newest first */}
        <div className="mt-6 space-y-4">
          {ROLES.map((r, i) => (
            <Reveal
              as="article"
              key={r.company}
              delay={i * 0.05}
              className={`rounded-xl border bg-surface p-6 transition-colors ${
                r.company === selected ? "border-accent" : "border-line"
              }`}
            >
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <h3 className="font-display text-2xl text-ink">
                  {r.role}{" "}
                  <span className="text-muted-foreground font-sans text-base">
                    — {r.company}
                  </span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {r.dates}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {r.location}
                </span>
                <StatusFlag live={r.live} />
              </div>
              <p className="mt-3 text-muted-foreground max-w-2xl">{r.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2.5 py-1 rounded border border-line text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {ROLES.map((r) => (
          <Reveal as="article" key={r.company} className="rounded-xl border border-line bg-surface p-5">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <h3 className="font-display text-lg text-ink">{r.role}</h3>
              <StatusFlag live={r.live} />
            </div>
            <div className="font-mono text-[11px] text-muted-foreground mt-1">
              {r.company} · {r.dates}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground/80">
              {r.location}
            </div>
            <div className="relative h-1.5 mt-3 rounded-full bg-line overflow-hidden">
              <div
                className={`absolute top-0 h-full rounded-full ${
                  r.live ? "bg-accent" : "bg-muted-foreground/40"
                }`}
                style={{ left: `${r.left}%`, width: `${r.width}%` }}
              />
            </div>
            <div className="relative h-3 mt-1">
              <span className="absolute left-0 font-mono text-[9px] text-muted-foreground">
                2022
              </span>
              <span className="absolute right-0 font-mono text-[9px] text-muted-foreground">
                NOW
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{r.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded border border-line text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Client-facing technical work */}
      <Reveal className="mt-10 rounded-2xl border border-line bg-surface p-6 md:p-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mono-eyebrow mb-3">{"// client-facing"}</p>
            <h3 className="font-display text-2xl md:text-3xl text-ink leading-snug">
              Two hours a day,{" "}
              <span className="text-accent">live with clients.</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              I run daily 2-hour technical sessions — walking clients through
              their systems, unblocking them in real time, and turning technical
              detail into decisions they can act on.
            </p>
          </div>

          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 self-center">
            {CLIENT_SESSIONS.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 font-mono text-xs text-muted-foreground leading-relaxed"
              >
                <span className="text-accent mt-px shrink-0" aria-hidden="true">
                  ▸
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/** Live pulse for ongoing roles, muted "ended" marker for finished ones. */
function StatusFlag({ live, className = "" }: { live: boolean; className?: string }) {
  return live ? (
    <span
      className={`flex items-center gap-1.5 font-mono text-[10px] text-accent ${className}`}
    >
      <span className="pulse-live h-2 w-2 rounded-full bg-accent" />
      live
    </span>
  ) : (
    <span
      className={`flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
      ended
    </span>
  );
}
