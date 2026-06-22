import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/85d52742-e4bd-4453-a3f7-f7518011dd47/id-preview-fa7dc4ca--0df56559-1f72-44e7-b333-9575411e3207.lovable.app-1782036966039.png";

export const metadata: Metadata = {
  title: "Yasser Awad — Frontend Developer",
  description:
    "Frontend developer crafting fast, animated, pixel-tight web and mobile experiences. Based in Damascus, available worldwide.",
  authors: [{ name: "Yasser Awad" }],
  openGraph: {
    type: "website",
    title: "Yasser Awad — Frontend Developer",
    description:
      "Frontend developer crafting fast, animated, pixel-tight web and mobile experiences.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Yasser Awad — Frontend Developer",
    description:
      "Frontend developer crafting fast, animated, pixel-tight web and mobile experiences.",
    images: [OG_IMAGE],
  },
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
