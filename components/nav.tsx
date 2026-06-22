"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#stack", label: "stack" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Default theme is light (matches SSR) until mounted.
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-colors ${
        scrolled
          ? "bg-canvas/80 border-line"
          : "bg-canvas/70 border-line/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <a href="#top" className="font-mono text-sm text-ink">
          <span className="text-accent">●</span> yasser.awad
        </a>

        <nav className="hidden md:flex items-center gap-7 font-mono text-xs text-muted-foreground">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            aria-label="Open command menu"
            className="hidden md:inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1.5 rounded-full border border-line text-muted-foreground hover:border-ink hover:text-ink transition-colors"
          >
            <span className="text-[13px] leading-none">⌘</span>K
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-flex font-mono text-xs px-3 py-1.5 rounded-full border border-line hover:border-ink transition-colors"
          >
            say hi
          </a>
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-line bg-surface text-ink hover:border-ink overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "moon" : "sun"}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {isDark ? (
                  <Moon size={15} aria-hidden="true" />
                ) : (
                  <Sun size={15} aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}
