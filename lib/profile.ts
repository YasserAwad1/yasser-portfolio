/** Single source of truth for identity, contact and social links. */
export const PROFILE = {
  name: "Yasser Awad",
  handle: "yasser.awad",
  title: "Software Developer · Funnel Developer · AI-Assisted Builder",
  tagline:
    "From high-converting funnels and automated workflows to web and mobile applications — complete, production-ready systems.",
  location: "Damascus, Syria",
  timezone: "UTC+3",
  email: "y.awad1232002@gmail.com",
  whatsapp: "https://wa.me/963948524047",
  github: "https://github.com/YasserAwad1",
  githubHandle: "YasserAwad1",
  linkedin: "https://linkedin.com/in/yasser-awad-713374204",
  cv: "/cv",
  education: {
    degree: "Information Technology Engineering — AI specialization",
    school: "Damascus University",
    year: "2025",
  },
} as const;

/** Companies and products that appear in the "worked with" strip. */
export const WORKED_WITH = [
  "Dawrati",
  "TG Mena",
  "Exa / Redeemly",
  "Goma Plus",
  "Momenta",
  "Dr. Diet",
  "Toddily",
  "Arhebo",
] as const;

/** Hero proof strip — short, verifiable facts. */
export const PROOF = [
  { value: "4+", label: "years shipping software" },
  { value: "2 stores", label: "apps live on App Store & Google Play" },
  { value: "2h / day", label: "live technical sessions with clients" },
  { value: "100%", label: "remote · Damascus → worldwide" },
] as const;
