# Handoff: Portfolio Site — Peter Sotomango

## Overview

A single-page personal portfolio for a final-year Data Science & AI student
applying for engineering and research roles from mid-2026. One scrolling page:
intro, two selected projects, a horizontally scrolling career timeline with
expandable detail, a secondary project list, a GitHub contribution graph, and a
contact footer.

Its distinguishing feature is the **background**: a layered, scroll-reactive
atmosphere (aurora wash, three parallax cloud fields, drifting dot grid, film
grain, and a progressive bottom blur). That system is documented exhaustively in
**`DESIGN.md` §5** and is the part most likely to be lost in a naive port — read
it before implementing.

## About the design files

The files in this bundle are **design references created in HTML** — a working
prototype showing intended look and behavior. They are **not production code to
copy directly**.

The task is to **recreate this design in the target codebase's existing
environment** (React, Next.js, Vue, Svelte, etc.), using its established
patterns, component conventions, and styling approach. If there is no codebase
yet, choose the appropriate framework for the project and implement the design
there.

Two implementation notes specific to this prototype:

- Styling is authored **entirely inline** because of the prototyping environment's
  constraints. In a real codebase, move it to whatever the project uses (CSS
  modules, Tailwind, styled-components). The values in `DESIGN.md` are the
  contract; the delivery mechanism is yours.
- The background's `@keyframes`, the `body` dot grid/grain, and the
  `prefers-reduced-motion` block are real stylesheet rules and should stay as
  stylesheet rules.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, radii, shadows, motion
timings, and copy. Recreate the UI pixel-perfectly. Every value is specified in
`DESIGN.md` — do not re-derive or approximate.

## Configuration as shipped

This bundle is pre-set to the requested configuration:

| Setting | Value | Meaning |
| --- | --- | --- |
| Custom cursor | **off** | Use the native cursor. The ring/dot cursor code is present but inactive — you may drop it entirely. |
| Background intensity | **1.5** | Parallax travel multiplier (`--amp`). Clouds travel 1.5× the base distance: ~143vh / ~248vh / ~353vh for the near/mid/far fields. |
| Experience section | **shown** | |
| "Also built" section | **shown** | |

If you drop the tweak props, hard-code `--amp: 1.5` and omit the cursor layer.

## Screens / views

One page, one breakpoint system. Container: `max-width: 1080px`, centered,
padding `clamp(20px, 5vw, 72px)`.

### Header

Sticky-less top bar. `display: flex`, `justify-content: space-between`,
`align-items: center`, `gap: 16px`, `flex-wrap: wrap`, `padding-top: 26px`.

- Left: wordmark "Peter Sotomango", 14px/500, `letter-spacing: -.01em`.
- Right: `nav`, `display: flex`, `gap: 4px`. Links: Work (`#work`),
  Writing (`#writing`, muted `#9aa4b4` — no target yet), About (`#about`),
  and Résumé (filled accent button, opens
  `https://www.petersotomango.com/peter-yeshua-sotomango-cv.pdf` in a new tab).
- Specs: `DESIGN.md` §6 "Nav link", "Résumé button".

### Hero (`#about`)

`padding: clamp(44px,7vw,68px) 0 0`, `max-width: 730px`.

1. Memoji `memojii-mthsck2a-blw8.png`, 132×132, `object-fit: contain`,
   transparent background, `display: block`.
2. H1, `margin-top: 26px`:
   *"Engineer and researcher. I build software, then study whether it actually helps."*
   `clamp(28px,4.4vw,38px)`/600, line-height 1.22, `letter-spacing: -.032em`.
3. Lede, `margin-top: 22px`, `clamp(15px,1.6vw,16px)`/1.68, `#3f4a5e`. Contains
   two inline links to `#careerboard` and `#studygenius` (underlined via
   `border-bottom`, not `text-decoration`).
4. Contact chips, `margin-top: 26px`, `display: flex`, `flex-wrap: wrap`,
   `gap: 8px`: Email (`mailto:sotomango.23@outlook.com`),
   GitHub (`github.com/PeterTheMango`), LinkedIn (`linkedin.com/in/pysotomango`).
   Each has a 14px inline SVG icon (envelope / GitHub mark / LinkedIn mark) —
   the SVG paths are in the HTML; reuse them or the codebase's icon set.

Copy is final. **Do not rewrite it.**

### Selected work (`#work`)

Section label "SELECTED WORK" + right-aligned caption
"Two projects, written up in depth", baseline-aligned.

Grid: `repeat(auto-fit, minmax(320px, 1fr))`, gap 20px, `align-items: stretch`,
`margin-top: 18px`. Two cards:

| Card | id | Year | Status |
| --- | --- | --- | --- |
| CareerBoard | `careerboard` | 2026 | "Case study coming" / "In development" |
| StudyGenius | `studygenius` | 2026 | "Case study coming" / "In development" |

Card anatomy in `DESIGN.md` §6 "Work card". **Both card images are empty
placeholders** — 232px-tall regions awaiting real screenshots (CareerBoard
workspace view; StudyGenius practice session). Use the codebase's image
component with `object-fit: cover`.

### Experience

Section label "EXPERIENCE" + caption
"Scroll back for earlier roles · select one for detail".

A horizontally scrolling timeline of **9 items**, oldest → newest left to right:

| # | Date | Role | Org |
| --- | --- | --- | --- |
| 4 | 2018 | Freelance Web Developer | Self-employed |
| 5 | 2019 — 2020 | IT Support Intern | Example placement |
| 6 | 2020 | Robotics Team Lead | Qatar Innovation Program |
| 7 | 2021 | Backend Intern | Example placement |
| 8 | 2022 | Cloud Engineering Intern | Example placement |
| 0 | 2022 — 2026 | B.A.Sc. Data Science & AI | UDST · CGPA 3.64 |
| 1 | 2023 — Present | Student Assistant | UDST CCIT Help Center |
| 2 | 2025 | Software Engineer | Cleano LLC |
| 3 | 2025 | Research Programme | UDST & Columbia University |

Five entries are marked "Example placement" / "Example entry" — **placeholder
content the owner still needs to replace.** Flag this; don't ship it as real.

Clicking an item opens a detail panel below the rail with the full description
(exact copy is in the HTML). One panel open at a time; clicking the open item or
its "Close" affordance dismisses it. Rail behavior and panel specs:
`DESIGN.md` §6.

### Also built

Section label "ALSO BUILT". Four rows on a
`64px minmax(140px,200px) 1fr 52px` grid, each an external link:

| Thumbnail | Title | Description | Year | Link |
| --- | --- | --- | --- | --- |
| `public/tuppercare2.png` | TupperCare | Smart container with sensor-based spoilage prediction. Team lead. | 2025 | `github.com/PeterTheMango` |
| `public/SmartBand.png` | Lifelines Smartband | Firmware, app and server for a health wearable. 5th place. | 2025 | `github.com/PeterTheMango/lifelines25-smartband/tree/main` |
| `public/cleano.png` | Cleano Dashboard | Internal tool for staff, drivers and transactions. Shipped. | 2025 | `github.com/PeterTheMango` |
| `public/trackly.png` | Trackly | Landing page for a booking management platform. | 2025 | `trackly-landing.vercel.app` |

### Commit history

Section label "COMMIT HISTORY" + right-aligned link "@PeterTheMango ↗".
A 14px-radius bordered `#fbfcfe` frame, `padding: 20px`, `overflow-x: auto`,
containing `https://ghchart.rshah.org/1f3d6b/PeterTheMango` at `width: 100%`,
`min-width: 620px`. Below: 12.5px `#7b8698` note —
"Public contributions over the last year. Most client work sits in private repositories."

Consider replacing the third-party chart with a first-party GitHub API call if
the codebase can; keep the accent tint `#1f3d6b`.

### Footer

`padding-top: clamp(56px,8vw,76px)`, `border-top: 1px solid rgba(0,0,0,.1)`,
`padding-top: 26px` inside. Flex, space-between, baseline, wrapping.

- Left: 19px/500 statement, max-width 440px — "Open to full-time roles from
  mid-2026. **Say hello**." ("Say hello" → `mailto:sotomango.23@outlook.com`)
- Right: 12.5px `#9aa4b4` — "Doha, Qatar · © 2026"

## Interactions & behavior

**Scroll-driven background.** A rAF-throttled scroll listener writes two custom
properties on `<html>`:

- `--sp` = `scrollY / (scrollHeight - innerHeight)`, clamped 0–1
- `--sy` = raw `scrollY` in px

plus `--amp` = background intensity (1.5). Five effects read them: global
`hue-rotate`, cloud-field parallax, footer veil opacity, dot-grid drift, and
bottom-blur fade-out. Exact bindings: `DESIGN.md` §5 "Scroll response".

Implementation requirements:
- Throttle with `requestAnimationFrame`; register `scroll` as `{ passive: true }`.
- Recompute on `resize`.
- Remove both listeners and cancel the pending frame on unmount.
- Never animate layout properties — the effects are `transform`, `opacity`,
  `filter`, and `background-position` only.

**Experience rail auto-pin.** On mount, scroll the rail fully right so the
newest role is in view. Layout settles over several frames, so retry each frame
until `scrollLeft` reaches max (within 2px) or 2.5s elapses; also re-pin on
`ResizeObserver` fire, `resize`, and `document.fonts.ready`. **Any genuine user
input** (`wheel`, `touchstart`, `pointerdown`, `keydown` on the rail)
permanently cancels auto-pinning — a programmatic scroll must not trip it.
Set `scroll-behavior: auto` around the programmatic jump and restore it after,
so the initial pin doesn't animate.

**Timeline detail panels.** Single `open: number | null` state. Clicking item *i*
sets `open = i`, or `null` if already open. "Close" sets `null`.

**Bottom blur fade.** The blur stack's opacity is
`clamp(0, calc((0.99 - var(--sp)) * 5.5), 1)` with
`transition: opacity .7s cubic-bezier(.4,0,.2,1)` — it eases out across the last
~18% of scroll and eases back in on the way up. It must not snap.

**Hover states.** Nav links, contact chips, work cards, timeline items, and
"Also built" rows all have hover treatments — see `DESIGN.md` §6.

**Responsive.** Fluid throughout via `clamp()` and `auto-fit` grids; no media
queries except `prefers-reduced-motion`. Work cards collapse to one column below
~360px of available width. The experience rail and commit graph scroll
horizontally on narrow screens. Cloud sizes are in `vw`, so the atmosphere scales
with the viewport.

**No loading, error, or form states** — the page is static.

## State management

| State | Type | Trigger |
| --- | --- | --- |
| `open` | `number \| null` | Timeline item click / Close |
| `--sp`, `--sy` | CSS custom props on `<html>` | `scroll`, `resize` |
| `--amp` | CSS custom prop | `bgIntensity` config (1.5) |
| rail auto-pin flags | internal (`touched`, `pinned`) | mount retries; cancelled by user input |
| cursor lerp state | internal | disabled in this configuration |

No data fetching. The only remote resources are the Google Fonts stylesheet and
the contribution-graph image.

## Design tokens

Full token set — colors, type scale, spacing, radii, shadows, motion — is in
**`DESIGN.md` §2–§4**. Do not restate or re-derive values; that file is the
source of truth.

Quick reference: ink `#12192b` · muted `#5c6779` · accent `#1f3d6b` ·
surface `#fbfcfe` · page `#f2f5fa` · Inter 400/500/600/700 · radii 7/8/10/14 ·
container 1080px.

## Assets

| File | Notes |
| --- | --- |
| `memojii-mthsck2a-blw8.png` | Hero memoji, transparent PNG |
| `public/tuppercare2.png` | Provided by the owner |
| `public/SmartBand.png` | Provided by the owner |
| `public/cleano.png` | Provided by the owner |
| `public/trackly.png` | Provided by the owner |
| Inter | Google Fonts, weights 400;500;600;700 — self-host if the project prefers |
| GitHub chart | `https://ghchart.rshah.org/1f3d6b/PeterTheMango` (third-party) |

**Still needed from the owner:** CareerBoard and StudyGenius screenshots, and
real content for the five "Example placement" timeline entries.

The grain texture is an inline SVG data URI (`feTurbulence`) — no image file.
All other background art is CSS gradients; nothing to export.

## Files

| Path | What it is |
| --- | --- |
| `Portfolio.dc.html` | The complete design prototype. Open directly in a browser. Configured as described above. |
| `DESIGN.md` | Full branding and design-system documentation. **Read §5 before porting the background.** |
| `support.js` | Prototyping-environment runtime. **Not part of the design** — do not port it. |
| `image-slot.js` | Placeholder-image web component used for the two unfilled work-card images. Replace with the codebase's image component. |
| `memojii-mthsck2a-blw8.png`, `public/*.png` | Image assets |

To view: open `Portfolio.dc.html` in a browser and scroll the full page — the
background system only makes sense in motion.
