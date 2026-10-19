export type Role = {
  company: string;
  role: string;
  dates: string;
  location: string;
  live: boolean;
  left: number;
  width: number;
  blurb: string;
  tags: string[];
};

// Card order: reverse-chronological, newest first.
// The timeline axis spans Jan 2022 → now; left/width are percentages of that
// span, one month = 100 / 56.
export const ROLES: Role[] = [
  {
    company: "Dawrati",
    role: "Funnel Developer",
    dates: "Jul 2026 — Present",
    location: "United Arab Emirates · Remote",
    live: true,
    left: 96.42857142857143,
    width: 3.5714285714285694,
    blurb:
      "Build and optimize sales funnels and automations while providing daily technical support, troubleshooting, and training sessions to clients.",
    tags: ["Funnels", "Automation", "CRM", "Technical Support", "Client Training"],
  },
  {
    company: "TG Mena",
    role: "Project Manager",
    dates: "Apr 2024 — Sep 2026",
    location: "Saudi Arabia · Remote",
    live: false,
    left: 48.214285714285715,
    width: 51.785714285714285,
    blurb:
      "Managed projects end-to-end, coordinated remote teams, assigned tasks, attended client meetings, and ensured timely delivery using Agile methodologies.",
    tags: ["Project Management", "Agile", "Jira"],
  },
  {
    company: "Exa / Redeemly (by Likecard)",
    role: "Part-Time Flutter Developer",
    dates: "Jan 2026 — Present",
    location: "Saudi Arabia · Remote",
    live: true,
    left: 85.71428571428571,
    width: 14.285714285714292,
    blurb:
      "Building a Flutter SDK/package for a SaaS platform and developing a scalable B2B application.",
    tags: ["Flutter", "Dart", "SDK", "B2B"],
  },
  {
    company: "Goma Plus",
    role: "Flutter Developer",
    dates: "Sep 2023 — Mar 2024",
    location: "Saudi Arabia · Remote",
    live: false,
    left: 35.714285714285715,
    width: 12.5,
    blurb:
      "Developed Flutter applications using GetX, Firebase, and clean architecture, delivering efficient and user-friendly mobile experiences.",
    tags: ["Flutter", "GetX", "Firebase", "Clean Architecture"],
  },
  {
    company: "Independent",
    role: "Freelance Developer",
    dates: "Jan 2022 — Present",
    location: "Remote",
    live: true,
    left: 0,
    width: 100,
    blurb:
      "Built and published cross-platform applications for clients, taking projects from development through deployment on the App Store and Google Play.",
    tags: ["Flutter", "Dart", "Mobile Development", "App Store", "Google Play"],
  },
];
