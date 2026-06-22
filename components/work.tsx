"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

export function Work() {
  return (
    <section id="work" className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <SectionEyebrow className="mb-3">// 02 — selected work</SectionEyebrow>
          <Reveal as="h2" blur className="font-display text-4xl md:text-5xl text-ink">
            A curated showcase.
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
          <CardFooter
            name="Dr. Diet"
            kind="Frontend · Web"
            blurb="Conversion-focused landing page for a nutrition brand."
            tags={["Next.js", "Tailwind", "Framer Motion"]}
            href="https://drdiet.vercel.app/"
          />
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
          <CardFooter
            name="Momenta"
            kind="Frontend · Web & Mobile"
            blurb="Premium event-memory platform for weddings and luxury occasions."
            tags={["Next.js", "Tailwind", "RTL Arabic"]}
            href="https://momentaapp.com/"
          />
        </TiltCard>

        {/* Arhebo — mobile (Flutter) */}
        <TiltCard span="lg:col-span-3" delay={0.1}>
          <PhoneMock image="/work/arhebo.png" alt="Arhebo mobile app" />
          <CardFooter
            name="Arhebo"
            kind="Mobile · Cross-platform"
            blurb="Event invitations and RSVP experience."
            tags={["Flutter", "Dart"]}
          />
        </TiltCard>

        {/* Toddily — mobile (Flutter) */}
        <TiltCard span="lg:col-span-3" delay={0.15}>
          <PhoneMock image="/work/toddily.png" alt="Toddily mobile app" />
          <CardFooter
            name="Toddily"
            kind="Mobile · Cross-platform"
            blurb="Preschool management app — live on the App Store and Google Play."
            tags={["Flutter", "Firebase"]}
            stores={[
              {
                kind: "appstore",
                href: "https://apps.apple.com/us/app/toddily/id6468933836",
              },
              {
                kind: "googleplay",
                href: "https://play.google.com/store/apps/details?id=com.toddilypre.toddilyPreschool",
              },
            ]}
          />
        </TiltCard>
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
    ry.set(px * 8);
    rx.set(-py * 8);
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
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group relative bg-surface border border-line rounded-2xl p-5 sm:p-7 ${span}`}
    >
      {children}
    </motion.article>
  );
}

type StoreLink = { kind: "appstore" | "googleplay"; href: string };

function CardFooter({
  name,
  kind,
  blurb,
  tags,
  href,
  stores,
}: {
  name: string;
  kind: string;
  blurb: string;
  tags: string[];
  href?: string;
  stores?: StoreLink[];
}) {
  const external = !!href && href !== "#";
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h3 className="font-display text-2xl md:text-3xl text-ink">{name}</h3>
        <span className="font-mono text-[11px] text-muted-foreground">{kind}</span>
      </div>
      <p className="mt-2 text-muted-foreground">{blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-2.5 py-1 rounded border border-line text-ink"
          >
            {tag}
          </span>
        ))}
      </div>

      {stores ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {stores.map((store) => (
            <a
              key={store.kind}
              href={store.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-full border border-line text-ink hover:border-ink hover:text-accent transition-colors"
            >
              {store.kind === "appstore" ? (
                <AppleIcon className="w-3.5 h-3.5" />
              ) : (
                <GooglePlayIcon className="w-3.5 h-3.5" />
              )}
              {store.kind === "appstore" ? "App Store" : "Google Play"}
            </a>
          ))}
        </div>
      ) : external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-ink relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent after:transition-all group-hover:after:w-full group-hover:text-accent"
        >
          Visit live site <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
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
