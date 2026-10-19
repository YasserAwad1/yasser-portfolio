import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import { PROFILE } from "@/lib/profile";

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/85d52742-e4bd-4453-a3f7-f7518011dd47/id-preview-fa7dc4ca--0df56559-1f72-44e7-b333-9575411e3207.lovable.app-1782036966039.png";

const TITLE = "Yasser Awad — Software Developer & Funnel Developer";
const DESCRIPTION =
  "Software developer · funnel developer · AI-assisted builder. From high-converting funnels and automations to web and mobile apps — built end to end, on a frontend and Flutter background. Based in Damascus, available worldwide.";
const SHORT_DESCRIPTION =
  "Software developer, funnel developer, and AI-assisted builder — funnels, automations, and web & mobile apps, built end to end.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s · Yasser Awad",
  },
  description: DESCRIPTION,
  authors: [{ name: PROFILE.name }],
  keywords: [
    "Yasser Awad",
    "software developer",
    "funnel developer",
    "Flutter developer",
    "Next.js developer",
    "React developer",
    "automation",
    "AI-assisted development",
    "Damascus",
    "remote developer",
  ],
  openGraph: {
    type: "website",
    title: TITLE,
    description: SHORT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHORT_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// Structured data so search results and recruiter tooling can read the
// profile: name, role, location, and the same social links the site shows.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: "Software Developer & Funnel Developer",
  description: SHORT_DESCRIPTION,
  email: `mailto:${PROFILE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Damascus", addressCountry: "SY" },
  alumniOf: { "@type": "CollegeOrUniversity", name: PROFILE.education.school },
  sameAs: [PROFILE.github, PROFILE.linkedin],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Flutter",
    "Dart",
    "Firebase",
    "Sales funnels",
    "Workflow automation",
    "AI integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          precedence="default"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            {children}
            <CommandPalette />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
