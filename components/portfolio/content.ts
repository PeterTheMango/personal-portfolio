/**
 * Copy is final per the handoff — do not rewrite it.
 *
 * Experience entries mirror peter-yeshua-sotomango-cv.pdf in /public.
 * Work cards flagged with a `placeholderLabel` still await a real screenshot.
 */

export const profile = {
  name: "Peter Sotomango",
  email: "sotomango.23@outlook.com",
  github: "https://github.com/PeterTheMango",
  githubHandle: "PeterTheMango",
  linkedin: "https://www.linkedin.com/in/pysotomango",
  resume: "https://www.petersotomango.com/peter-yeshua-sotomango-cv.pdf",
  location: "Doha, Qatar · © 2026",
};

export type WorkCard = {
  id: string;
  title: string;
  year: string;
  description: string;
  status: string;
  state: string;
  imageSrc?: string;
  imageAlt: string;
  placeholderLabel: string;
};

export const selectedWork: WorkCard[] = [
  {
    id: "careerboard",
    title: "CareerBoard",
    year: "2026",
    description:
      "Track every opportunity, keep employer context close, and turn scattered job-search activity into clear next steps—with an AI copilot grounded in your own workspace.",
    status: "Case study coming",
    state: "In development",
    imageSrc: "/cb_ss.png",
    imageAlt: "CareerBoard dashboard showing quick-capture actions, application counts and a weekly progress chart",
    placeholderLabel: "CareerBoard — workspace view",
  },
  {
    id: "studygenius",
    title: "StudyGenius",
    year: "2026",
    description:
      "An AI-assisted study platform where users upload PDF study material, let the platform process and summarize the content asynchronously, then generate questions to help you practice.",
    status: "Case study coming",
    state: "In development",
    imageSrc: "/sg_ss.png",
    imageAlt: "StudyGenius dashboard showing quiz stats, an accuracy ring and a score history chart",
    placeholderLabel: "StudyGenius — practice session",
  },
];

export type ExperienceItem = {
  date: string;
  role: string;
  org: string;
  panelTitle: string;
  meta: string;
  body: string;
};

/** Oldest → newest, left to right. The rail pins to its right end on mount. */
export const experience: ExperienceItem[] = [
  {
    date: "2022 — 2026",
    role: "B.Sc. Data Science & AI",
    org: "UDST · CGPA 3.63",
    panelTitle: "B.Sc. in Data Science and Artificial Intelligence",
    meta: "University of Doha for Science and Technology · July 2022 — July 2026 · CGPA 3.63/4",
    body: "Coursework across machine learning, deep learning, applied data mining, parallel and distributed computing, IoT application development, and data visualisation and analytics.",
  },
  {
    date: "2022 — 2024",
    role: "Student Volunteer",
    org: "UDST",
    panelTitle: "Student Volunteer",
    meta: "University of Doha for Science and Technology · 2022 — 2024 · Doha, QA",
    body: "Supported 10+ large-scale university events — Open Day, Orientation, Graduation, Career Fair — assisting over 1,000 attendees with registration, campus tours, logistics and guest services. Led and coordinated 15+ volunteers at an international AI symposium, delegating tasks across multiple venues, and curated official social media content alongside front-of-house work with university leaders, prospective students and parents.",
  },
  {
    date: "2023",
    role: "Hardware Lab Assistant",
    org: "UDST",
    panelTitle: "Hardware Lab Assistant",
    meta: "University of Doha for Science and Technology · March 2023 — Sep. 2023 · Doha, QA",
    body: "Upgraded hardware on 100+ CCIT lab systems, installing RAM, processors and peripherals to keep machines at optimal performance. Maintained software across the same fleet by applying OS updates and standardising configurations for reliability.",
  },
  {
    date: "2023 — 2026",
    role: "Student Assistant",
    org: "UDST CCIT Help Center",
    panelTitle: "Student Assistant",
    meta: "CCIT Help Center, University of Doha for Science and Technology · Sep. 2023 — Apr. 2026 · Doha, QA",
    body: "Supported students during lab sessions with 1:1 guidance on course concepts and assignments, plus peer tutoring — 500+ students served. Ran the Help Center's bookings, walk-ins and appointments, and led recap sessions for 100+ students to reinforce key topics.",
  },
  {
    date: "2025",
    role: "Full Stack Developer",
    org: "Cleano L.L.C",
    panelTitle: "Full Stack Developer",
    meta: "Cleano L.L.C · Feb. 2025 — June 2025 · Doha, QA",
    body: "Built an internal admin-management system in Next.js and Firebase handling partner integrations, version control, maintenance-mode toggles and role-based admin access. Established GitHub Actions CI/CD to build, lint and test on every push to production, cutting deployment errors by around 80%, and rewrote the API authentication flow with token caching to halve average latency.",
  },
  {
    date: "2025",
    role: "Research Assistant",
    org: "Columbia University & UDST",
    panelTitle: "Research Assistant",
    meta: "Columbia University & University of Doha for Science and Technology · July 2025 — Oct. 2025 · Doha, QA",
    body: "Conducted desk research on AI adoption in Qatar's healthcare sector, analysing adoption trends, infrastructure readiness and regulatory context. Evaluated the region's digital infrastructure — health data exchange platforms, cloud providers, training centres — with an international research team to produce insights on how emerging technology can improve healthcare delivery and policy.",
  },
  {
    date: "2025 — 2026",
    role: "Research Assistant",
    org: "CCIT Student Research Program",
    panelTitle: "Research Assistant",
    meta: "CCIT Student Research Program, University of Doha for Science and Technology · Nov. 2025 — Apr. 2026 · Doha, QA",
    body: "Reviewed the literature on privacy vulnerabilities in large language models, synthesising current research into actionable guidance for privacy-preserving AI. Built a working computer vision prototype for livestock weight prediction — a non-invasive estimation approach — combining image processing models, large-dataset analysis, machine learning and experimental methodology across both research domains.",
  },
  {
    date: "2025 — 2026",
    role: "Full Stack Developer",
    org: "UDST CCIT Help Center",
    panelTitle: "Full Stack Developer",
    meta: "CCIT Help Center, University of Doha for Science and Technology · Dec. 2025 — Apr. 2026 · Doha, QA",
    body: "Built a scalable multi-tenant room booking platform in TypeScript, Bun, Next.js and Supabase serving 500+ students, with separate student and admin frontends behind a centralised API. Added real-time synchronisation through Supabase so bookings update instantly across both interfaces, reducing scheduling conflicts by 40%.",
  },
  {
    date: "2026 — Present",
    role: "AI and Software Engineer",
    org: "Sports Vector LLC",
    panelTitle: "AI and Software Engineer",
    meta: "Sports Vector LLC, Qatar Science and Technology Park · Jan. 2026 — Present · Doha, QA",
    body: "Implemented observability and error monitoring across platforms, reducing errors by 80% and speeding up incident detection. Architected backend improvements for scalability and maintainability, aligned system architecture and UX between the React web app and React Native mobile app for feature parity, and built internal tooling that cut manual administrative overhead by 40%.",
  },
];

export type SecondaryProject = {
  title: string;
  description: string;
  year: string;
  href: string;
  image: string;
};

export const alsoBuilt: SecondaryProject[] = [
  {
    title: "TupperCare",
    description:
      "Smart container with sensor-based spoilage prediction. Team lead.",
    year: "2025",
    href: "https://github.com/PeterTheMango",
    image: "/tuppercare2.png",
  },
  {
    title: "Lifelines Smartband",
    description: "Firmware, app and server for a health wearable. 5th place.",
    year: "2025",
    href: "https://github.com/PeterTheMango/lifelines25-smartband/tree/main",
    image: "/SmartBand.png",
  },
  {
    title: "Cleano Dashboard",
    description: "Internal tool for staff, drivers and transactions. Shipped.",
    year: "2025",
    href: "https://github.com/PeterTheMango",
    image: "/cleano.png",
  },
  {
    title: "Trackly",
    description: "Landing page for a booking management platform.",
    year: "2025",
    href: "https://trackly-landing.vercel.app/",
    image: "/trackly.png",
  },
];
