import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PROFILE } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="px-6 py-10 max-w-7xl mx-auto">
      <div className="hairline pt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
        <div>
          <span className="text-ink">yasser awad</span> · software &amp; funnel
          developer · © 2026
        </div>
        <div className="flex items-center gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent transition-colors"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent transition-colors"
          >
            <LinkedinIcon size={15} />
          </a>
          <a href={PROFILE.cv} className="hover:text-accent transition-colors">
            cv
          </a>
          <span className="opacity-50">·</span>
          <span>built from scratch.</span>
        </div>
        <a href="#top" className="hover:text-accent transition-colors">
          ↑ back to top
        </a>
      </div>
    </footer>
  );
}
