## Single Page Personal Portfolio — UX Structure Plan

├── Global
│ ├── App-Shell
│ │ ├── Single Page Application (SPA) container (hash/history routing for deep-links to sections)
│ │ ├── Sections stack (vertical, snap/scroll-jacking disabled; smooth-scrolling enabled)
│ │ └── Max-width content container (e.g., 1200–1320px) with responsive gutters
│ ├── Theming
│ │ ├── Theme tokens (light/dark): background, surface, text, muted, accent, accent-contrast
│ │ ├── Elevation: shadow-sm/md/lg; blur for dock
│ │ ├── Radius scale: xs(4) / sm(8) / md(12) / lg(16) / pill(full)
│ │ ├── Motion: duration-100/200/400, ease-out for entry, spring for micro-interactions
│ │ └── System preference detection (prefers-color-scheme) + persisted user override (localStorage)
│ ├── Grid & Breakpoints
│ │ ├── xs <480 • sm 480–767 • md 768–1023 • lg 1024–1439 • xl ≥1440
│ │ └── 12-col CSS grid with fluid columns and fixed gutters
│ ├── Typography
│ │ ├── Display, Heading, Body, Mono (variable fonts preferred)
│ │ └── Scale: 64/48/32/24/20/16/14/12 with responsive clamp()
│ ├── Accessibility
│ │ ├── Color contrast ≥ WCAG AA (4.5:1 body, 3:1 large text/icons)
│ │ ├── Keyboard support: Tab/Shift+Tab, Arrow keys in carousels & tabs, Enter/Space on controls
│ │ ├── ARIA: role=“navigation” for dock, aria-current=“page” on active section link
│ │ ├── Reduced motion mode (prefers-reduced-motion)
│ │ └── Focus-visible outlines & skip-to-content link
│ ├── Performance
│ │ ├── Lazy-load media (projects/testimonials), priority-load hero fonts & logo
│ │ ├── IntersectionObserver for in-view animations and active-section syncing
│ │ └── Image/video optimization (srcset, sizes, preload key poster)
│ └── Analytics & Events
│ ├── Section view events (on 60% viewport intersection)
│ ├── Project CTA clicks (source code / live demo)
│ └── Contact submit & validation errors
├── Floating Dock (Global Navigation)
│ ├── Pattern
│ │ ├── Floating vertical dock, bottom-left on desktop; bottom center pill on mobile
│ │ ├── Frosted surface, md radius, shadow, 12–16px inner padding
│ │ └── Item size 40–48px (touch target ≥44px)
│ ├── Sections (4 groups separated by visual separator)
│ │ ├── Group 1 — Personal Logo
│ │ │ ├── Logo button (Home): onClick scrollTo(Hero) center; long-press easter-egg ripple
│ │ │ └── Tooltip: “Home”
│ │ ├── Separator
│ │ ├── Group 2 — Section Navigation Icons
│ │ │ ├── About (id=”#about”) • icon: user-outline • tooltip: “About”
│ │ │ ├── Experience (id=”#experience”) • icon: layers/timeline • tooltip: “Experience”
│ │ │ ├── Projects (id=”#projects”) • icon: grid/code • tooltip: “Projects”
│ │ │ ├── Testimonials (id=”#testimonials”) • icon: chat-quote • tooltip: “Testimonials”
│ │ │ └── Contact (id=”#contact”) • icon: mail-plane • tooltip: “Contact”
│ │ ├── Separator
│ │ ├── Group 3 — Social Links
│ │ │ ├── GitHub (new tab) • icon: github-mark
│ │ │ └── LinkedIn (new tab) • icon: linkedin
│ │ ├── Separator
│ │ └── Group 4 — Theme Switch
│ │ ├── Icon: sun/moon toggle with long-press to “Auto”
│ │ └── Tooltip: “Toggle theme”
│ ├── Interaction
│ │ ├── Smooth scroll to section; section is vertically centered in viewport
│ │ ├── Active state synced via IntersectionObserver • aria-current & selected styles
│ │ ├── Hover: subtle lift; Focus: ring; Press: compress
│ │ └── Keyboard: 1(Home), 2(About), 3(Experience), 4(Projects), 5(Testimonials), 6(Contact), T(Theme)
│ └── States
│ ├── Default / Hover / Focus-visible / Active / Disabled (N/A) / Reduced motion
│ └── Mobile collapsed (auto-hide on scroll down, reveal on scroll up)
├── Section 01 — Hero (Full Screen)
│ ├── Layout
│ │ ├── Full-viewport height (min-height: 100dvh), center stack; decorative background shapes
│ │ └── Safe area insets respected (mobile)
│ ├── Content
│ │ ├── Welcome Banner (Hello, I’m — role/keywords)
│ │ ├── Animated Text (typewriter / morphing roles with reduced-motion fallback)
│ │ ├── Micro-copy subtitle (value proposition)
│ │ ├── CTA buttons: “Explore Projects” (scroll to #projects), “Contact Me” (#contact)
│ │ └── Accent visual: looping subtle Lottie/SVG; optional portrait w/ parallax (reduced-motion off)
│ ├── Interactions
│ │ ├── Scroll indicator (chevron) jumps one section
│ │ └── Keyboard: ArrowDown/PageDown to About
│ └── States
│ ├── Initial load animation (staggered fade/slide)
│ └── Reduced-motion: fade-only
├── Section 02 — About (Bento Grid)
│ ├── Layout
│ │ ├── Bento grid (3×2 on lg, 2×3 on md, 1×6 on sm), variable tile sizes
│ │ └── Card surfaces with icons/illustrations and concise copy
│ ├── Tiles (examples)
│ │ ├── Summary (who I am; 2–3 sentences)
│ │ ├── Expertise (chips: UX, Frontend, ML, HRM, etc.)
│ │ ├── Toolstack (icons: Figma, React, TS, Node, Python…)
│ │ ├── Achievements (badges; e.g., awards, finalist mentions)
│ │ ├── Interests (human touch; hobbies)
│ │ └── Fun stat/metric (years, shipped projects)
│ ├── Interactions
│ │ ├── Hover tilt/parallax on desktop; tap to expand on mobile
│ │ └── Tooltips for icon labels
│ └── States
│ ├── Empty (fallback text if data missing)
│ └── Reduced motion (no tilt)
├── Section 03 — Experience (Tabs + Two-Column Detail)
│ ├── Layout
│ │ ├── Tabs across top: Professional • Hackathon • Education
│ │ ├── Two-column content
│ │ │ ├── Left column (sticky on lg): Organization list (e.g., “Google”, “Startup X”)
│ │ │ └── Right column: Details panel for selected org/role
│ │ └── Mobile: Tabs horizontal scroll; left list collapses into accordion
│ ├── Left Column (Organization Selector)
│ │ ├── Items: org logo + name + date range chip
│ │ ├── Active item: highlight rail indicator
│ │ └── Keyboard: Up/Down moves selection; Enter loads details
│ ├── Right Column (Detail Template)
│ │ ├── Header: Position @ Place (e.g., “Senior UX Engineer @ Google”)
│ │ ├── Meta: From–Until (Month YYYY – Month YYYY)
│ │ └── Bullets (max 3)
│ │ ├── Impact metric bullet (quantified outcome)
│ │ ├── Process bullet (method, tools)
│ │ └── Collaboration/leadership bullet
│ ├── Interactions
│ │ ├── Selecting tab filters the left list with animation
│ │ ├── Selecting org updates right detail with crossfade
│ │ └── Deep-link: #experience?tab=professional&org=google
│ └── States
│ ├── Empty tab (placeholder copy)
│ ├── Loading skeleton for detail panel
│ └── Error state (retry)
├── Section 04 — Projects (Responsive Grid Cards)
│ ├── Layout
│ │ ├── Responsive grid (max 3 cards per row on lg; 2 on md; 1 on sm)
│ │ ├── Auto-centering alignment for uneven counts
│ │ └── Consistent card heights via CSS aspect ratios
│ ├── Project Card
│ │ ├── Media area
│ │ │ ├── Inline looping muted video (autoplay; hover to unmute button; focus controls)
│ │ │ └── Or image with lazy-load and blur-up
│ │ ├── Title row
│ │ │ ├── Left: CTA buttons
│ │ │ │ ├── Source (GitHub icon) — optional
│ │ │ │ └── Live Demo (browser icon) — optional
│ │ │ └── Right: Project title
│ │ ├── Description (2–3 lines, clamped)
│ │ └── Tech Stack Marquee (icon chips auto-scroll; pause on hover/focus)
│ ├── Interactions
│ │ ├── Hover: elevate card; show subtle media zoom
│ │ ├── Keyboard: Left/Right cycles marquee; Enter activates primary CTA
│ │ └── Analytics: track source vs live clicks
│ └── States
│ ├── Empty (call-to-action to add projects)
│ ├── Loading skeleton grid
│ └── Error (retry grid)
├── Section 05 — Testimonials (Carousel)
│ ├── Layout
│ │ ├── Carousel with viewport showing up to 2 cards per slide (1 on mobile)
│ │ └── Card content: testimonial text, author name, profession/avatar
│ ├── Controls
│ │ ├── Prev/Next arrows; pagination dots (clickable/aria-controls)
│ │ └── Auto-advance with pause on hover/focus (disabled in reduced motion)
│ ├── Interactions
│ │ ├── Drag/swipe on touch
│ │ ├── Keyboard: Left/Right arrows
│ │ └── Focus trapping inside slide while tabbing
│ └── States
│ ├── Empty (placeholder quote)
│ └── Loading skeleton cards
├── Section 06 — Contact (CTA + Email Input + Interactive Hover Button)
│ ├── Layout
│ │ ├── Centered CTA block with accent background
│ │ └── Copy stack + inline input/button on lg; vertical on mobile
│ ├── Content
│ │ ├── Tagline: “Want to collaborate? Just reach out!”
│ │ ├── Email input (type=“email”, placeholder, validation, aria-describedby for errors)
│ │ └── Interactive Hover Button: “Send Email!”
│ │ ├── Hover: magnetic/tilt, particle sparkle (reduced-motion fallback)
│ │ └── Press: ripple + optimistic sending state
│ ├── Behavior
│ │ ├── On submit: client-side validate -> send via mailto: or API endpoint
│ │ ├── Success: toast “Thanks! I’ll reply soon.” + clear field
│ │ └── Error: inline message with retry
│ └── Privacy
│ └── Anti-spam honeypot + rate limit; no auto-subscribe
├── Section 07 — Footer (Simple)
│ ├── Layout
│ │ ├── Two-column on lg; stacked on mobile
│ │ └── Thin divider from content above
│ ├── Left
│ │ ├── Name (heading)
│ │ └── Subtext (short bio/availability)
│ └── Right
│ ├── Social links (GitHub, LinkedIn)
│ ├── Section anchors (About, Experience, Projects, Testimonials, Contact)
│ └── Misc links (Resume, Email)
├── Content Model (CMS/Config-ready)
│ ├── Hero
│ │ ├── title: string
│ │ ├── animatedRoles: string[]
│ │ └── ctas: [{label, targetId}]
│ ├── About
│ │ ├── summary: markdown
│ │ ├── expertise: string[]
│ │ ├── tools: string[] (icon keys)
│ │ ├── achievements: [{label, year, link?}]
│ │ ├── interests: string[]
│ │ └── stats: [{label, value}]
│ ├── Experience
│ │ └── tabs:
│ │ ├── professional: [experienceItem]
│ │ ├── hackathon: [experienceItem]
│ │ └── education: [experienceItem]
│ │ └── experienceItem:
│ │ ├── org: string
│ │ ├── logo: asset
│ │ ├── position: string
│ │ ├── from: ISODate
│ │ ├── to: ISODate | “Present”
│ │ └── bullets: string[≤3]
│ ├── Projects
│ │ └── items:
│ │ ├── title: string
│ │ ├── description: markdown (≤240 chars)
│ │ ├── media: {type: “video”|“image”, src, poster?}
│ │ ├── tech: string[] (icon keys)
│ │ ├── sourceUrl?: url
│ │ └── liveUrl?: url
│ ├── Testimonials
│ │ └── items: [{quote, author, role, avatar?}]
│ └── Contact
│ ├── tagline: string
│ └── submitEndpoint?: url
├── IDs & Navigation Targets
│ ├── #hero
│ ├── #about
│ ├── #experience
│ ├── #projects
│ ├── #testimonials
│ ├── #contact
│ └── #footer
├── Micro-interactions (Key)
│ ├── Dock buttons: hover lift (4px), focus ring, active compress
│ ├── Theme switch: icon morph sun↔moon with spring
│ ├── Tabs: underline slide + content crossfade
│ ├── Project marquee: auto-scroll pause on hover/focus
│ ├── Testimonials: snap + easing; card shadow pulse on focus
│ └── Contact button: magnetic hover + ripple on press
├── Smooth Scrolling Behavior
│ ├── Trigger: Dock icon click or anchor link
│ ├── Duration: 400–700ms (user setting aware)
│ ├── Easing: easeInOutQuad
│ └── Target alignment: section block centered in viewport (scrollMargin to account for header spacing)
├── Keyboard Map
│ ├── Global: Home(1), About(2), Experience(3), Projects(4), Testimonials(5), Contact(6), T(Theme)
│ ├── Tabs (Experience): Arrow keys cycle; Enter select
│ ├── Carousel (Testimonials): Left/Right navigate
│ └── Hero: ArrowDown moves to About
├── Error/Empty States
│ ├── Projects: “Projects coming soon.” placeholder cards
│ ├── Experience: “No entries yet” per tab
│ ├── Testimonials: single wide card layout if only one
│ └── Contact: API fail → inline guidance and mailto fallback
├── Data Privacy & SEO
│ ├── Minimal PII; explicit consent for analytics cookies (if used)
│ ├── SEO: semantic landmarks (header/main/nav/footer), section headings (h2)
│ └── Open Graph & Twitter cards for homepage
└── QA Checklist (Acceptance)
├── Dock navigation scrolls each section to center; active state accurate
├── Theme toggle persists; respects system preference
├── Hero animations respect reduced-motion
├── About bento responsive across breakpoints
├── Experience: tabs keyboard-accessible; two-column sync works
├── Projects: max 3 per row; uneven rows auto-center; media plays inline & muted
├── Testimonials: shows ≤2 cards per slide; swipe/keys functional
├── Contact: email validated; hover button interactive; success/error flows
├── Footer: left name+subtext; right links to socials/sections/extra
├── A11y: focus-visible on all controls; ARIA roles/labels present
└── Performance: LCP ≤2.5s on 3G Fast; CLS <0.1; lazy media verified
