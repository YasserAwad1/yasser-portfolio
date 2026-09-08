import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

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

export function About() {
  return (
    <section id="about" className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionEyebrow className="mb-6">// 01 — about</SectionEyebrow>

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
                className="font-mono text-[11px] px-2.5 py-1 rounded border border-line text-muted-foreground"
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
              <span className="text-ink">
                Information Technology Engineering — AI specialization
              </span>
              <br />
              <span className="text-muted-foreground">
                Damascus University · Graduated 2025
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4" delay={0.1}>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line">
            <Image
              src="/yasser.png"
              alt="Yasser Awad"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
