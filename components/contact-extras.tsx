"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/** Live "available for work" badge showing the current time in Damascus. */
export function ContactStatus() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Damascus",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-xs text-muted-foreground rounded-full border border-line bg-surface px-4 py-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Available for new work
      {time && (
        <span className="text-ink/70" suppressHydrationWarning>
          · {time} in Damascus
        </span>
      )}
    </span>
  );
}

type Channel = {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
  copy?: boolean;
};

const CHANNELS: Channel[] = [
  {
    label: "email",
    value: "yasser.awad1@hotmail.com",
    href: "mailto:yasser.awad1@hotmail.com",
    icon: <Mail size={16} />,
    copy: true,
  },
  {
    label: "github",
    value: "github.com/YasserAwad1",
    href: "https://github.com/YasserAwad1",
    icon: <GithubIcon />,
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/yasser-awad-713374204",
    href: "https://linkedin.com/in/yasser-awad-713374204",
    icon: <LinkedinIcon />,
  },
  {
    label: "location",
    value: "Damascus, Syria · open to remote, worldwide",
    icon: <MapPin size={16} />,
  },
];

export function ContactChannels() {
  return (
    <ul className="flex flex-col divide-y divide-line border-y border-line">
      {CHANNELS.map((channel, i) => (
        <Reveal as="li" key={channel.label} delay={i * 0.05}>
          <ChannelRow channel={channel} />
        </Reveal>
      ))}
    </ul>
  );
}

function ChannelRow({ channel }: { channel: Channel }) {
  const [copied, setCopied] = useState(false);
  const isWeb = channel.href?.startsWith("http");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group flex items-center gap-3 sm:gap-4 py-4 px-3 -mx-3 rounded-lg transition-colors hover:bg-[var(--accent-soft)]/50">
      <span className="text-muted-foreground group-hover:text-accent transition-colors shrink-0">
        {channel.icon}
      </span>
      <span className="font-mono text-xs text-muted-foreground w-16 sm:w-20 shrink-0">
        {channel.label}
      </span>
      {channel.href ? (
        <a
          href={channel.href}
          {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex-1 min-w-0 font-mono text-sm text-ink group-hover:text-accent transition-colors"
        >
          {channel.value}
        </a>
      ) : (
        <span className="flex-1 min-w-0 font-mono text-sm text-ink">
          {channel.value}
        </span>
      )}
      {channel.copy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy email address"}
          className="shrink-0 text-muted-foreground hover:text-accent transition-colors"
        >
          {copied ? (
            <Check size={15} className="text-emerald-500" />
          ) : (
            <Copy size={15} />
          )}
        </button>
      )}
      {isWeb && (
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="shrink-0 text-muted-foreground group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </div>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}
