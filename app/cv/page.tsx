import type { Metadata } from "next";
import Link from "next/link";
import { ROLES } from "@/lib/experience-data";
import { PROFILE } from "@/lib/profile";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "CV",
  description: `${PROFILE.name} — ${PROFILE.title}. Résumé: experience, selected projects, skills, and education.`,
};

const SUMMARY =
  "Information Technology Engineer (AI specialization) who builds complete digital systems: sales funnels and automations, web applications, and cross-platform mobile apps. Started in Flutter, expanded into modern web (React, Next.js, Tailwind) and AI-assisted development. Comfortable owning a product end to end — interface, backend logic, APIs, data, integrations, and the daily client-facing work that keeps it running.";

const PROJECTS = [
  {
    name: "Momenta",
    line: "Premium event-memory platform, web + mobile, Arabic-first (RTL).",
    href: "https://momentaapp.com/",
  },
  {
    name: "Toddily",
    line: "Preschool management app, Flutter + Firebase, live on the App Store and Google Play.",
    href: "https://apps.apple.com/us/app/toddily/id6468933836",
  },
  {
    name: "Dr. Diet",
    line: "Conversion-focused landing page for a nutrition brand, Next.js + Tailwind.",
    href: "https://drdiet.vercel.app/",
  },
  {
    name: "Arhebo",
    line: "Event invitations and RSVP app, Flutter, iOS + Android.",
  },
];

const SKILLS: [string, string[]][] = [
  ["Web", ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS"]],
  ["Mobile", ["Flutter", "Dart", "Firebase", "GetX", "Clean Architecture", "App Store & Play releases"]],
  ["Systems", ["REST APIs", "Integrations", "CRM", "Workflow automation", "Sales funnels", "Docker"]],
  ["Ways of working", ["AI-assisted development", "Agile / Jira", "Project management", "Client training & support", "Git"]],
];

export default function CvPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Screen-only toolbar */}
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
          <Link href="/" className="hover:text-accent transition-colors">
            ← back to portfolio
          </Link>
          <PrintButton />
        </div>

        {/* Header */}
        <header className="border-b border-line pb-6">
          <h1 className="font-display text-4xl md:text-5xl text-ink">{PROFILE.name}</h1>
          <p className="mt-2 text-muted-foreground">{PROFILE.title}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
            <li>{PROFILE.location} · remote worldwide</li>
            <li>
              <a href={`mailto:${PROFILE.email}`} className="hover:text-accent">
                {PROFILE.email}
              </a>
            </li>
            <li>
              <a href={PROFILE.github} className="hover:text-accent">
                github.com/{PROFILE.githubHandle}
              </a>
            </li>
            <li>
              <a href={PROFILE.linkedin} className="hover:text-accent">
                linkedin.com/in/yasser-awad-713374204
              </a>
            </li>
          </ul>
        </header>

        <Section title="Summary">
          <p className="text-sm leading-relaxed text-ink/90">{SUMMARY}</p>
        </Section>

        <Section title="Experience">
          <ol className="space-y-6">
            {ROLES.map((r) => (
              <li key={r.company} className="grid sm:grid-cols-[140px_1fr] gap-x-6 gap-y-1">
                <div className="font-mono text-[11px] text-muted-foreground pt-0.5">
                  {r.dates}
                </div>
                <div>
                  <h3 className="font-display text-xl text-ink leading-tight">
                    {r.role}{" "}
                    <span className="text-muted-foreground font-sans text-sm">
                      — {r.company}
                    </span>
                  </h3>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    {r.location}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/90">{r.blurb}</p>
                  <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                    {r.tags.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Selected projects">
          <ul className="space-y-3">
            {PROJECTS.map((p) => (
              <li key={p.name} className="text-sm leading-relaxed">
                <span className="font-display text-base text-ink">{p.name}</span>
                <span className="text-muted-foreground"> — {p.line}</span>{" "}
                {p.href && (
                  <a
                    href={p.href}
                    className="font-mono text-[11px] text-accent hover:underline"
                  >
                    {p.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="grid sm:grid-cols-[140px_1fr] gap-x-6 gap-y-2 text-sm">
            {SKILLS.map(([group, items]) => (
              <div key={group} className="contents">
                <dt className="font-mono text-[11px] text-muted-foreground pt-0.5">{group}</dt>
                <dd className="text-ink/90">{items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Education">
          <div className="grid sm:grid-cols-[140px_1fr] gap-x-6 gap-y-1 text-sm">
            <div className="font-mono text-[11px] text-muted-foreground pt-0.5">
              {PROFILE.education.year}
            </div>
            <div>
              <div className="font-display text-base text-ink">{PROFILE.education.degree}</div>
              <div className="text-muted-foreground">{PROFILE.education.school}</div>
            </div>
          </div>
        </Section>

        <Section title="Languages">
          <p className="text-sm text-ink/90">Arabic (native) · English (professional)</p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="mono-eyebrow mb-3 flex items-center gap-3">
        <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
        {title.toLowerCase()}
      </h2>
      {children}
    </section>
  );
}
