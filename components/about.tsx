import Image from "next/image";
import { GraduationCap, Globe2, Smartphone, Layers } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { PROFILE } from "@/lib/profile";

const DOMAINS = [
  "Web & Frontend",
  "Flutter & Cross-Platform",
  "Funnel Development",
  "Sales Funnels & Automation",
  "CRM & Workflow Automation",
  "AI Integration",
  "AI-Assisted Development",
  "Vibe Coding",
  "End-to-End Systems",
  "Project Management",
  "Client-Facing Technical Work",
];

const WHOAMI: [string, string][] = [
  ["role", "software developer · funnel developer"],
  ["based", `${PROFILE.location} (${PROFILE.timezone}) · remote`],
  ["building", "funnels, automations, web + mobile apps"],
  ["degree", "IT engineering — AI specialization"],
  ["status", "available for new work"],
];

const ARC = [
  { label: "Cross-platform", detail: "Flutter · Dart · Firebase" },
  { label: "Modern web", detail: "React · Next.js · Tailwind" },
  { label: "Complete systems", detail: "funnels · automation · AI" },
];

const FACTS = [
  {
    icon: Smartphone,
    title: "App Store & Google Play",
    text: "Apps published and maintained through store review.",
  },
  {
    icon: Globe2,
    title: "Web + mobile",
    text: "One developer across both surfaces, same design language.",
  },
  {
    icon: Layers,
    title: "Remote-ready",
    text: "Async-first, English & Arabic, 4+ years of remote delivery.",
  },
];

export function About() {
  return (
    <section id="about" className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionEyebrow className="mb-6">{"// 01 — about"}</SectionEyebrow>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <Reveal className="lg:col-span-8" blur>
          <div className="font-mono text-sm text-muted-foreground mb-3">
            <span className="text-accent">~</span> yasser whoami
          </div>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-snug text-ink">
            I&apos;m an Information Technology Engineer specialized in AI. I
            started in cross-platform software development and expanded into
            modern web development, funnel engineering, automation, and
            AI-assisted development. Today I build{" "}
            <em className="not-italic text-accent">complete systems</em> —
            interfaces, backend logic, APIs, databases, automations, and
            third-party integrations — rather than a single layer of the
            product.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {DOMAINS.map((domain) => (
              <span
                key={domain}
                className="font-mono text-[11px] px-2.5 py-1 rounded border border-line bg-surface/60 text-muted-foreground hover:border-accent/50 hover:text-ink transition-colors"
              >
                {domain}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3">
            <GraduationCap
              className="w-5 h-5 text-accent mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div className="font-mono text-sm leading-relaxed">
              <span className="text-ink">{PROFILE.education.degree}</span>
              <br />
              <span className="text-muted-foreground">
                {PROFILE.education.school} · Graduated {PROFILE.education.year}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4" delay={0.1}>
          <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line card-glow">
            <Image
              src="/yasser.png"
              alt="Yasser Awad"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="font-mono text-[11px] text-white/90">
                {PROFILE.name} · {PROFILE.location}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bento: terminal, the arc, fact tiles */}
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-12 gap-4">
        <Reveal
          className="lg:col-span-5 rounded-2xl bg-[var(--code-bg)] text-white p-5 md:p-6 shadow-xl shadow-black/15 ring-1 ring-white/5"
          delay={0.05}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 font-mono text-[11px] text-[var(--code-dim)]">
              ~ whoami
            </span>
          </div>
          <dl className="font-mono text-[13px] leading-7">
            {WHOAMI.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[88px_1fr] gap-3">
                <dt className="text-[var(--code-key)]">{k}</dt>
                <dd className="text-[var(--code-str)]">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal
          className="lg:col-span-4 rounded-2xl border glass p-5 md:p-6"
          delay={0.1}
        >
          <p className="mono-eyebrow mb-4">{"// the arc"}</p>
          <ol className="relative space-y-4">
            {ARC.map((step, i) => (
              <li key={step.label} className="flex items-start gap-3">
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    i === ARC.length - 1 ? "bg-accent pulse-live" : "bg-muted-foreground/40"
                  }`}
                />
                <div>
                  <div className="font-display text-lg text-ink leading-tight">
                    {step.label}
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    {step.detail}
                  </div>
                </div>
                {i < ARC.length - 1 && (
                  <span aria-hidden="true" className="ml-auto text-accent font-mono text-sm">
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {FACTS.map((f, i) => (
            <Reveal
              key={f.title}
              delay={0.15 + i * 0.05}
              className="rounded-2xl border glass p-4 flex items-start gap-3 hover:border-accent/50 transition-colors"
            >
              <f.icon className="w-4 h-4 text-accent mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <div className="font-mono text-xs text-ink">{f.title}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {f.text}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
