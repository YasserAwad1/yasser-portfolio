"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Action = {
  id: string;
  label: string;
  group: string;
  icon: ReactNode;
  run: () => void;
};

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Selected work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const LINKS = [
  { label: "Email", href: "mailto:yasser.awad1@hotmail.com", icon: <Mail size={15} /> },
  { label: "WhatsApp", href: "https://wa.me/963948524047", icon: <MessageCircle size={15} /> },
  { label: "GitHub", href: "https://github.com/YasserAwad1", icon: <GithubIcon /> },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yasser-awad-713374204",
    icon: <LinkedinIcon />,
  },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      // Release the modal scroll-lock BEFORE scrolling, otherwise the page is
      // frozen (lenis stopped + body overflow hidden) and scrollTo is a no-op.
      document.body.style.overflow = "";
      if (lenis) {
        lenis.start();
        lenis.scrollTo(el, { offset: -64 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  const actions = useMemo<Action[]>(() => {
    const isDark = resolvedTheme !== "light";
    return [
      ...SECTIONS.map((s) => ({
        id: `go-${s.id}`,
        label: `Go to ${s.label}`,
        group: "Navigate",
        icon: <ArrowRight size={15} />,
        run: () => scrollTo(s.id),
      })),
      {
        id: "theme",
        label: isDark ? "Switch to light mode" : "Switch to dark mode",
        group: "Theme",
        icon: isDark ? <Sun size={15} /> : <Moon size={15} />,
        run: () => setTheme(isDark ? "light" : "dark"),
      },
      ...LINKS.map((l) => ({
        id: `link-${l.label}`,
        label: l.label,
        group: "Links",
        icon: l.icon,
        run: () => {
          if (l.href.startsWith("http")) window.open(l.href, "_blank", "noopener");
          else window.location.href = l.href;
        },
      })),
    ];
  }, [resolvedTheme, scrollTo, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q),
    );
  }, [actions, query]);

  useEffect(() => setActive(0), [query]);

  // Global open/close shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  // Lock scroll + focus the input while open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open, lenis]);

  const run = (a: Action) => {
    a.run();
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const a = filtered[active];
      if (a) run(a);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            aria-label="Close command menu"
            onClick={close}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
          />
          <motion.div
            className="relative w-full max-w-lg rounded-2xl border border-line bg-surface shadow-2xl shadow-black/30 overflow-hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 px-4 border-b border-line">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, toggle theme, open a link…"
                aria-label="Command menu search"
                className="flex-1 bg-transparent py-4 font-mono text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="font-mono text-[10px] text-muted-foreground border border-line rounded px-1.5 py-0.5 shrink-0">
                esc
              </kbd>
            </div>

            <div data-lenis-prevent className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
                  No matches.
                </p>
              ) : (
                filtered.map((a, i) => {
                  const showHeader =
                    i === 0 || filtered[i - 1].group !== a.group;
                  const isActive = i === active;
                  return (
                    <div key={a.id}>
                      {showHeader && (
                        <div className="px-4 pt-3 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {a.group}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => run(a)}
                        onMouseMove={() => setActive(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left font-mono text-sm transition-colors ${
                          isActive ? "bg-[var(--accent-soft)]" : ""
                        }`}
                      >
                        <span
                          className={isActive ? "text-accent" : "text-muted-foreground"}
                        >
                          {a.icon}
                        </span>
                        <span className="flex-1 text-ink">{a.label}</span>
                        {isActive && (
                          <span className="text-[10px] text-muted-foreground">↵</span>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
