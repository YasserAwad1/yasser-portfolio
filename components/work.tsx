"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { AppleIcon, GooglePlayIcon, GithubIcon } from "@/components/icons";
import { PROFILE } from "@/lib/profile";

type StoreLink = { kind: "appstore" | "googleplay"; href: string };

/**
 * Case-study shape. Hiring managers read portfolios for the problem, what
 * was actually built, the outcome, and the decisions behind it — not just a
 * screenshot and a tag list.
 */
type Project = {
  name: string;
  kind: string;
  role: string;
  summary: string;
  problem: string;
  built: string;
  outcome: string;
  decisions: string[];
  tags: string[];
  href?: string;
  repo?: string;
  stores?: StoreLink[];
};

const DR_DIET: Project = {
  name: "Dr. Diet",
  kind: "Web · Landing page",
  role: "Design to code · frontend",
  summary: "Conversion-focused landing page for a nutrition brand.",
  problem:
    "A nutrition brand needed a page that turns visitors into consultation requests — fast, mobile-first, and clearly on-brand.",
  built:
    "A single-page Next.js site with a clear offer hierarchy, scroll-driven motion, and CTAs placed around the offer rather than the layout.",
  outcome:
    "Shipped and live on Vercel: a lightweight page the brand can point campaigns at.",
  decisions: [
    "Static-first Next.js for speed and simple hosting",
    "Framer Motion limited to purposeful, scroll-triggered reveals",
    "Mobile layout designed first, desktop expanded from it",
  ],
  tags: ["Next.js", "Tailwind", "Framer Motion"],
  href: "https://drdiet.vercel.app/",
};

const MOMENTA: Project = {
  name: "Momenta",
  kind: "Web & Mobile · Platform",
  role: "Full build · web + mobile",
  summary: "Premium event-memory platform for weddings and luxury occasions.",
  problem:
    "Hosts of weddings and luxury events wanted one place to collect, relive, and share the memories of the day — in Arabic, on web and on phones.",
  built:
    "The web platform and the mobile experience: landing, event pages, guest flows, and a fully right-to-left Arabic interface with a premium visual language.",
  outcome:
    "Live at momentaapp.com across web and mobile — an Arabic-first product built for a high-ticket audience.",
  decisions: [
    "RTL-first layout system instead of mirroring an LTR design",
    "Shared design tokens across the web and mobile surfaces",
    "Imagery and motion tuned for a premium, luxury feel",
  ],
  tags: ["Next.js", "Tailwind", "RTL Arabic"],
  href: "https://momentaapp.com/",
};

const ARHEBO: Project = {
  name: "Arhebo",
  kind: "Mobile · Cross-platform",
  role: "Flutter developer",
  summary: "Event invitations and RSVP experience.",
  problem:
    "Event hosts needed digital invitations that guests can open, respond to, and keep — without printing or chasing RSVPs by hand.",
  built:
    "A cross-platform Flutter app covering invitation creation, delivery, and RSVP tracking from one codebase.",
  outcome: "One Dart codebase shipped to both iOS and Android.",
  decisions: [
    "Flutter for a single codebase across both platforms",
    "Reusable widget structure for fast iteration on screens",
  ],
  tags: ["Flutter", "Dart"],
};

const TODDILY: Project = {
  name: "Toddily",
  kind: "Mobile · Cross-platform",
  role: "Flutter developer · store release",
  summary: "Preschool management app — live on the App Store and Google Play.",
  problem:
    "Preschools needed one app to run day-to-day operations and keep parents in the loop, on whatever phone families already own.",
  built:
    "A Flutter + Firebase app for staff and parents, taken through store review and published on both platforms.",
  outcome: "Live on the App Store and Google Play.",
  decisions: [
    "Firebase for auth and realtime sync without a custom backend",
    "Separate flows for staff and parents from the same codebase",
    "Store compliance and releases handled end to end",
  ],
  tags: ["Flutter", "Firebase"],
  stores: [
    {
      kind: "appstore",
      href: "https://apps.apple.com/us/app/toddily/id6468933836",
    },
    {
      kind: "googleplay",
      href: "https://play.google.com/store/apps/details?id=com.toddilypre.toddilyPreschool",
    },
  ],
};

export function Work() {
  return (
    <section id="work" className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--accent-soft),transparent_70%)] opacity-70"
      />
      <div className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <SectionEyebrow className="mb-3">{"// 02 — selected work"}</SectionEyebrow>
            <Reveal as="h2" blur className="font-display text-4xl md:text-5xl text-ink">
              Fewer projects, deeper write-ups.
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-3 text-muted-foreground max-w-xl">
              Each one as a short case study: the problem, what I built, what
              came out of it, and the decisions behind it.
            </Reveal>
          </div>
          <Reveal as="p" className="font-mono text-xs text-muted-foreground">
            2022 — 2026
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-6 gap-6">
          {/* Dr. Diet — web landing, full width */}
          <TiltCard span="lg:col-span-6" delay={0}>
            <BrowserMock
              image="/work/drdiet.png"
              url="drdiet.vercel.app"
              alt="Dr. Diet landing page"
              heightClass="h-64 sm:h-80"
            />
            <CaseStudy project={DR_DIET} />
          </TiltCard>

          {/* Momenta — special: landing page + mobile mockup, full width */}
          <TiltCard span="lg:col-span-6" delay={0.05}>
            <div className="grid md:grid-cols-[1.6fr_1fr] gap-6 items-center">
              <BrowserMock
                image="/work/momenta-web.png"
                url="momentaapp.com"
                alt="Momenta web app"
                heightClass="h-64 sm:h-80"
              />
              <div className="flex justify-center">
                <PhoneMock image="/work/momenta-mobile.png" alt="Momenta on mobile" />
              </div>
            </div>
            <CaseStudy project={MOMENTA} />
          </TiltCard>

          {/* Arhebo — mobile (Flutter) */}
          <TiltCard span="lg:col-span-3" delay={0.1}>
            <PhoneMock image="/work/arhebo.png" alt="Arhebo mobile app" />
            <CaseStudy project={ARHEBO} compact />
          </TiltCard>

          {/* Toddily — mobile (Flutter) */}
          <TiltCard span="lg:col-span-3" delay={0.15}>
            <PhoneMock image="/work/toddily.png" alt="Toddily mobile app" />
            <CaseStudy project={TODDILY} compact />
          </TiltCard>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-line px-6 py-5">
          <p className="font-mono text-xs text-muted-foreground">
            More code, commits, and experiments live on GitHub.
          </p>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border border-line bg-surface text-ink hover:border-ink hover:text-accent transition-colors"
          >
            <GithubIcon size={14} />
            github.com/{PROFILE.githubHandle}
            <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function TiltCard({
  children,
  span,
  delay,
}: {
  children: ReactNode;
  span: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });

  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 5);
    rx.set(-py * 5);
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={`group relative glass spotlight border rounded-2xl p-5 sm:p-7 card-glow hover:border-accent/40 transition-colors ${span}`}
    >
      {children}
    </motion.article>
  );
}

/** Problem → built → outcome, plus key decisions and links. */
function CaseStudy({ project, compact = false }: { project: Project; compact?: boolean }) {
  const p = project;
  const blocks: [string, string][] = [
    ["the problem", p.problem],
    ["what I built", p.built],
    ["outcome", p.outcome],
  ];

  return (
    <div className={`mt-6 ${compact ? "" : "grid lg:grid-cols-12 gap-8"}`}>
      {/* Identity + links */}
      <div className={compact ? "" : "lg:col-span-4"}>
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h3 className="font-display text-2xl md:text-3xl text-ink">{p.name}</h3>
          <span className="font-mono text-[11px] text-muted-foreground">{p.kind}</span>
        </div>
        <p className="mt-1 font-mono text-[11px] text-accent">{p.role}</p>
        <p className="mt-2 text-muted-foreground">{p.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 rounded border border-line text-ink"
            >
              {tag}
            </span>
          ))}
        </div>
        <Links project={p} />
      </div>

      {/* Case study */}
      <div className={compact ? "mt-6" : "lg:col-span-8"}>
        <dl
          className={`grid gap-5 ${
            compact ? "grid-cols-1" : "sm:grid-cols-3"
          }`}
        >
          {blocks.map(([label, text]) => (
            <div
              key={label}
              className={`${
                compact ? "border-l border-line pl-4" : "border-t border-line pt-4"
              }`}
            >
              <dt className="mono-eyebrow mb-1.5">{label}</dt>
              <dd className="text-sm text-ink/90 leading-relaxed">{text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <p className="mono-eyebrow mb-2">key decisions</p>
          <ul
            className={`grid gap-x-6 gap-y-1.5 ${
              compact ? "grid-cols-1" : "sm:grid-cols-2"
            }`}
          >
            {p.decisions.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2 font-mono text-xs text-muted-foreground leading-relaxed"
              >
                <span className="text-accent shrink-0" aria-hidden="true">
                  ▸
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Links({ project: p }: { project: Project }) {
  const live = !!p.href && p.href !== "#";
  if (!live && !p.repo && !p.stores) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {live && (
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-full bg-accent text-white hover:opacity-90 transition-opacity"
        >
          Visit live site <span aria-hidden="true">↗</span>
        </a>
      )}
      {p.stores?.map((store) => (
        <a
          key={store.kind}
          href={store.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-full border border-line text-ink hover:border-ink hover:text-accent transition-colors"
        >
          {store.kind === "appstore" ? <AppleIcon /> : <GooglePlayIcon />}
          {store.kind === "appstore" ? "App Store" : "Google Play"}
        </a>
      ))}
      {p.repo && (
        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-full border border-line text-ink hover:border-ink hover:text-accent transition-colors"
        >
          <GithubIcon size={13} />
          Source
        </a>
      )}
    </div>
  );
}

function BrowserMock({
  image,
  url,
  alt,
  heightClass = "h-56 sm:h-64",
}: {
  image: string;
  url: string;
  alt: string;
  heightClass?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-line bg-white shadow-xl shadow-black/5">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8F9FB] border-b border-line">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="ml-3 text-[10px] font-mono text-muted-foreground bg-white rounded px-2 py-0.5 border border-line">
          {url}
        </div>
      </div>
      <div className={`relative ${heightClass} overflow-hidden bg-white`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover object-top transition-[object-position] duration-[3000ms] ease-out group-hover:object-bottom"
        />
      </div>
    </div>
  );
}

function PhoneMock({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="mx-auto w-[180px] sm:w-[200px] rounded-[34px] border-[10px] border-[#15171C] bg-[#15171C] shadow-xl shadow-black/20 overflow-hidden">
      <div className="relative h-[320px] overflow-hidden">
        <div className="absolute inset-x-1/2 top-1 -translate-x-1/2 z-10 h-4 w-20 bg-[#15171C] rounded-b-2xl" />
        <Image
          src={image}
          alt={alt}
          fill
          sizes="200px"
          className="object-cover object-top transition-[object-position] duration-[3000ms] ease-out group-hover:object-bottom"
        />
      </div>
    </div>
  );
}
