# Design System — Peter Sotomango Portfolio

The complete branding and design language for this project. Everything below is
extracted from the built design; there are no aspirational values.

---

## 1. Brand

**Who it's for.** A final-year Data Science & AI student in Doha, applying for
engineering and research roles from mid-2026. The site is a credibility document,
not a marketing page.

**Positioning line.** "Engineer and researcher. I build software, then study
whether it actually helps."

**Voice.**

- Plain, declarative, past-tense for shipped work; present-tense for current work.
- States what was built and what happened. No adjectives doing the work of evidence.
- Numbers only where they're real ("200+ students", "CGPA 3.64", "5th place").
- Honest status labels over hype: "In development", "Case study coming", "Shipped".
- Never uses "passionate", "innovative", "leverage", or exclamation marks.
- Sentence case everywhere except the uppercase micro-labels (§4).

**Visual character.** A quiet, near-white document sitting on a slow-moving
atmospheric sky. Content is flat and typographic; motion lives entirely behind
it. Restraint is the point — the background is the only expressive element, and
it never competes with text.

---

## 2. Color

All colors are authored in either hex or `oklch()`. Keep `oklch()` where listed —
the background wash relies on its perceptual uniformity when hue-rotated.

### Core palette

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#12192b` | Primary text, headings, body default |
| `--ink-2` | `#333e52` | Detail-panel body copy |
| `--ink-3` | `#3f4a5e` | Lede and card body copy |
| `--muted` | `#5c6779` | Nav labels, secondary descriptions |
| `--muted-2` | `#7b8698` | Section captions, footnotes |
| `--muted-3` | `#9aa4b4` | Dates, years, "Close", disabled-feel labels |
| `--accent` | `#1f3d6b` | Résumé button, uppercase labels, timeline dots, links on hover |
| `--accent-deep` | `#152b4d` | Résumé button hover |
| `--surface` | `#fbfcfe` | Cards, panels, button text on accent |
| `--page` | `#f2f5fa` | Page base color under the atmosphere |

### Derived / alpha values

Written as `oklch(L C H / a)` in the source:

| Purpose | Value |
| --- | --- |
| Card & panel border | `oklch(0.4 0.06 255 / .16)` — `.18` on detail panels |
| Image-frame border | `oklch(0.4 0.06 255 / .14)` |
| Hover row / nav tint | `oklch(0.36 0.09 255 / .09)` — `.07` on large rows |
| Inline link underline | `oklch(0.36 0.09 255 / .55)` — `.6` in footer |
| Dot-grid dot | `oklch(0.4 0.06 250 / .08)` |
| Cursor ring border | `oklch(0.36 0.09 255 / .45)` |
| Cursor ring fill | `oklch(0.36 0.09 255 / .05)` |
| Footer rule | `rgba(0,0,0,.1)` |
| Scroll veil (footer cool-down) | `oklch(0.64 0.05 255 / .5)` |

### Atmosphere hues

The background wash and clouds use a narrow blue band, **hue 210–255**, at high
lightness (`L 0.87–0.91`) and low chroma (`C 0.045–0.07`). Any new background
element must stay inside that band — that constraint is what keeps the page calm
while the hue rotates.

**Rule:** never introduce a color outside this palette. If a new accent is
needed, derive it in `oklch()` by moving hue within 210–255 and matching the
existing L/C, rather than picking a new hex.

---

## 3. Typography

**Family.** Inter (Google Fonts), weights 400 / 500 / 600 / 700.
Fallback stack: `Inter, system-ui, sans-serif`.
`-webkit-font-smoothing: antialiased` on `body`.

Negative letter-spacing scales with size — the larger the type, the tighter.
`text-wrap: pretty` on every multi-line text block.

| Role | Size | Weight | Line height | Letter-spacing |
| --- | --- | --- | --- | --- |
| H1 / hero | `clamp(28px, 4.4vw, 38px)` | 600 | 1.22 | `-.032em` |
| Lede paragraph | `clamp(15px, 1.6vw, 16px)` | 400 | 1.68 | — |
| Footer statement | 19px | 500 | 1.45 | `-.02em` |
| Card / panel title | 17px (cards), 16px (panels) | 600 | — | `-.02em` |
| Body copy | 14.5px | 400 | 1.62 | — |
| Timeline role | 14.5px | 500 | — | `-.012em` |
| List item title | 14.5px | 500 | — | — |
| Wordmark | 14px | 500 | — | `-.01em` |
| Nav link | 13.5px | 400 | — | — |
| List description | 13.5px | 400 | — | — |
| Timeline org / panel meta | 13px | 400 | 1.45 | — |
| Chip label | 13px | 400 | — | — |
| Caption / date | 12.5px | 400 | — | — |
| **Section label** | **12px** | **600** | — | **`.09em`, uppercase** |
| Right-aligned year | 12px | 400 | — | — |

The section label is the only uppercase, positive-tracking, accent-colored text
in the system. It marks every section boundary and nothing else.

---

## 4. Layout & spacing

**Container.** `max-width: 1080px`, centered, horizontal padding
`clamp(20px, 5vw, 72px)`, bottom padding 56px.
**Prose measure.** Hero section capped at 730px; lede at 440px in the footer.

**Vertical rhythm.** Sections are separated by fluid top padding, never margins:

| Context | Padding-top |
| --- | --- |
| Header | 26px |
| Hero | `clamp(44px, 7vw, 68px)` |
| Selected work | `clamp(56px, 8vw, 80px)` |
| Experience / Also built / Commit history | `clamp(48px, 7vw, 64px)` |
| Footer | `clamp(56px, 8vw, 76px)` |

**Spacing scale in use.** 3, 4, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 26 px.
Prefer these steps; don't invent intermediate values.

**Grids.**

- Work cards: `repeat(auto-fit, minmax(320px, 1fr))`, gap 20px, `align-items: stretch`.
- Experience rail: `grid-auto-flow: column`, `grid-auto-columns: minmax(210px, 1fr)`, `overflow-x: auto`.
- "Also built" rows: `64px minmax(140px, 200px) 1fr 52px`, gap 16px.

**Rule:** all sibling groups use flex/grid with `gap`. No margin-based spacing
between siblings, no inline-flow spacing.

### Radii

| Value | Applied to |
| --- | --- |
| 7px | Nav links, thumbnail frames |
| 8px | Contact chips |
| 10px | Hover rows, timeline hit areas |
| 14px | Cards, detail panels, commit-graph frame |
| 16px | Cursor ring (rest state) |
| 50% | Timeline dots, status dots, cursor dot, clouds |

### Elevation

Only two shadows exist:

- **Card:** `0 1px 2px oklch(0.4 0.06 255 / .06), 0 12px 28px -18px oklch(0.4 0.06 255 / .3)`
- **Résumé button:** `0 1px 2px oklch(0.36 0.09 255 / .35)`

Everything else is defined by a 1px border. Don't add shadows to new elements.

---

## 5. The background system

The signature of the design. Five fixed layers, all `pointer-events: none`.

### Layer stack

| z-index | Layer | Behavior |
| --- | --- | --- |
| `-1` | `.om-atmos` — wash + three cloud fields | Hue-rotates with scroll |
| `-1` | `.om-veil` — cool gradient | Fades in toward footer |
| `0` | `body` dot grid | Drifts with scroll |
| `1` | Content | Static |
| `2` | `body::before` — film grain | Static |
| `4` | Bottom blur stack | Fades out at page end |
| `9998/9999` | Cursor ring / dot | Optional, off by default |

### Base

- `background-color: #f2f5fa`
- Dot grid: `radial-gradient(oklch(0.4 0.06 250 / .08) 1px, transparent 1.4px)`,
  `background-size: 22px 22px`, `background-attachment: fixed`,
  `background-position: 0 calc(var(--sy) * 0.045)` — a 4.5% parallax against scroll.
- Grain: inline SVG `feTurbulence` (`baseFrequency 0.85`, 3 octaves, desaturated),
  180×180 tile, `opacity: .5`, `mix-blend-mode: multiply`.

### Aurora wash

Three stacked radial gradients (`.om-wash`), soft and atmospheric — no defined
edges:

```
radial-gradient(120% 70% at  8% -10%, oklch(0.87 0.06  240 / .85), transparent 60%)
radial-gradient( 90% 55% at 95%   4%, oklch(0.9  0.045 215 / .75), transparent 60%)
radial-gradient( 80% 50% at 50% 112%, oklch(0.88 0.05  250 / .6 ), transparent 65%)
```

Animated by `@keyframes omhue`, **30s ease-in-out infinite alternate**:
`hue-rotate(-12deg) saturate(.92)` → `8deg/1.16` at 35% → `20deg/1.02` at 70% →
`-4deg/1.2`.

### Parallax cloud fields

Three fields (`.om-field`), each `left/right: -22%`, `top: -24vh`, `height: 340vh`,
`will-change: transform`. Scroll translates them at different rates, which is what
produces depth:

| Field | Travel | Clouds | Blur | Opacity |
| --- | --- | --- | --- | --- |
| `.om-f1` (near) | `-95vh` | 6, 36–54vw wide | 46px | .5–.82 |
| `.om-f2` (mid) | `-165vh` | 5, 30–36vw wide | 46px | .45–.5 |
| `.om-f3` (far) | `-235vh` | 4, 20–24vw wide | 46px | .38–.4 |

Formula: `translate3d(0, calc(var(--sp) * var(--amp) * -<travel>), 0)`.

Each cloud is a `border-radius: 50%` div with a
`radial-gradient(closest-side, <color>, transparent)` fill — white, or a hue from
the 210–255 band. Two drift keyframes alternate between clouds so nothing moves
in unison:

- `omdrift`: `translate3d(-7%, -1.5%, 0)` → `translate3d(7%, 1.5%, 0)`
- `omdrift2`: `translate3d(6%, 1.5%, 0)` → `translate3d(-6%, -1.5%, 0)`

Durations are staggered **21s–38s** (never equal between neighbours),
`ease-in-out infinite alternate`.

Clouds are distributed down the full 340vh of each field, not clustered in the
hero — this is deliberate: the lower page must have background events too.

### Scroll response

Two CSS custom properties are written to `<html>` on scroll, rAF-throttled:

- `--sp` — scroll progress, `0`→`1` across the document.
- `--sy` — raw `scrollY` in px.
- `--amp` — background intensity multiplier, from the `bgIntensity` prop.

Driven by:

| Effect | Binding |
| --- | --- |
| Global hue shift | `.om-atmos { filter: hue-rotate(calc(var(--sp) * 16deg)) }` |
| Cloud parallax | field `translate3d` (above) |
| Footer cool-down | `.om-veil { opacity: calc(var(--sp) * 0.85) }` over `linear-gradient(180deg, transparent 34%, oklch(0.64 0.05 255 / .5) 100%)` |
| Dot-grid drift | `background-position: 0 calc(var(--sy) * 0.045)` |
| Bottom blur | `opacity: clamp(0, calc((0.99 - var(--sp)) * 5.5), 1)` |

### Bottom blur (progressive reveal)

Three stacked fixed layers at `bottom: 0`, each masked with
`linear-gradient(to top, #000 0%, #000 <n>%, transparent 100%)` so the blur
strengthens toward the bottom edge:

| Height | `backdrop-filter` | Mask solid-to | Extra |
| --- | --- | --- | --- |
| 150px | `blur(3px)` | 34% | — |
| 100px | `blur(8px)` | 25% | — |
| 56px | `blur(16px)` | 20% | `linear-gradient(to top, oklch(0.96 0.008 250 / .55), transparent)` |

The whole stack sits in a wrapper whose opacity eases out over the final ~18% of
scroll (`transition: opacity .7s cubic-bezier(.4,0,.2,1)`), so the haze dissolves
gradually at the page end and returns the same way on the way up — it must never
snap off.

### Reduced motion

`@media (prefers-reduced-motion: reduce)` disables cloud and wash animations and
zeroes the field transforms. The static composition must remain legible.

---

## 6. Components

### Nav link

13.5px, `#5c6779`, no underline, `padding: 6px 11px`, `border-radius: 7px`.
Hover: `background: oklch(0.36 0.09 255 / .09)`, color → `#12192b`.
Disabled variant ("Writing"): color `#9aa4b4`, hover color `#5c6779`.

### Résumé button

Same geometry as a nav link. `background: #1f3d6b`, color `#fbfcfe`,
shadow `0 1px 2px oklch(0.36 0.09 255 / .35)`. Hover: `background: #152b4d`.

### Contact chip

Inline-flex, `gap: 7px`, `padding: 7px 13px`, 1px border
`oklch(0.4 0.06 255 / .18)`, `border-radius: 8px`, 13px `#5c6779`, with a 14px
inline SVG icon. Hover: border → `#1f3d6b`, color → `#12192b`.

### Work card

Column flex. 1px border `oklch(0.4 0.06 255 / .16)`, `border-radius: 14px`,
`overflow: hidden`, `background: #fbfcfe`, card shadow.
232px image region with a 1px bottom border. Body `padding: 18px 20px 16px`.
Title row: 17px/600 name, baseline-aligned 12.5px `#9aa4b4` year.
Footer row pinned with `margin-top: auto`, `padding-top: 16px` — 13.5px/500
`#9aa4b4` status on the left, and on the right a 5px accent dot + 12.5px
`#7b8698` state. Hover: border → `#1f3d6b`.

### Experience rail

Horizontally scrolling column grid. Each item is centered: 12.5px `#9aa4b4`
date, a 1px horizontal rule with a 9px `#fbfcfe` dot ringed `1.5px #1f3d6b`
centered on it (`margin: 12px 0 16px`), then 14.5px/500 role and 13px `#5c6779`
organization. First and last rules fade out at the outer edge with a
`linear-gradient` so the timeline reads as continuing. Hover:
`background: oklch(0.36 0.09 255 / .07)`, `border-radius: 10px`.

Behavior: the rail auto-scrolls to its **right** end on mount (newest role first
in view), retried across frames until it lands or 2.5s elapses; any real user
input (`wheel`, `touchstart`, `pointerdown`, `keydown`) permanently cancels the
auto-pin.

### Detail panel

Opens below the rail when a timeline item is clicked; only one is open at a time,
and clicking the active item closes it. `margin-top: 18px`, 1px border
`oklch(0.4 0.06 255 / .18)`, `border-radius: 14px`, `background: #fbfcfe`,
`padding: 22px 24px`. 16px/600 title with a 12.5px `#9aa4b4` "Close" affordance
right-aligned on the same baseline, a 13px `#7b8698` meta line, then 14.5px/1.62
`#333e52` body.

### "Also built" row

A link laid out on the 4-column grid, `padding: 12px 10px` with `margin: 0 -10px`
so the hover tint bleeds past the text edge. 44px-tall thumbnail,
`border-radius: 7px`, 1px border, `object-fit: cover`. Hover:
`background: oklch(0.36 0.09 255 / .07)`.

### Inline link

Inherits `#12192b`, no `text-decoration`, and instead a
`border-bottom: 1.5px solid oklch(0.36 0.09 255 / .55)` (`.6` in the footer).
Global default: `a { color: #12192b } a:hover { color: #1f3d6b }`.

### Custom cursor (off by default)

When enabled and `(pointer:fine)` matches, the native cursor is hidden and
replaced by two elements driven by a rAF lerp loop:

- **Ring** — 32px, `border-radius: 16px`, 1.5px border
  `oklch(0.36 0.09 255 / .45)`, fill `oklch(0.36 0.09 255 / .05)`.
  On hovering `a, [role=button], button, image-slot, [data-snap]` it morphs to the
  target's bounding box + 6px padding and adopts the target's border-radius.
  Easing 0.22 when snapped, 0.14 when free; size/radius lerp 0.2.
- **Dot** — 6px `#1f3d6b`, lerp 0.42, tracks the pointer closely.

Both fade in on first pointer move and out on `pointerleave` (`.25s ease`).

---

## 7. Motion principles

1. **Motion belongs to the background.** Content does not animate in or out —
   only hover tints and the cursor respond to input.
2. **Slow tempo.** Ambient cycles run 21–38s. Nothing in the background completes
   a cycle fast enough to read as a loop.
3. **Nothing moves in unison.** Neighbouring clouds always differ in duration and
   direction; the three fields always differ in parallax rate.
4. **Depth through rate, not contrast.** Distance is expressed by slower travel
   and lower opacity, never by stronger color.
5. **Scroll pays off.** Moving down the page shifts hue and cools the palette
   toward the footer. The bottom is visibly a different time of day from the top.
6. **Never snap.** Any state that fades in must fade out on the same curve
   (`cubic-bezier(.4,0,.2,1)`, 0.7s for the blur stack).
7. **Interaction transitions are short.** Hover states are instant or ≤ 0.25s.
8. **Honor `prefers-reduced-motion`.**

---

## 8. Configuration (as shipped in this handoff)

| Prop | Value | Effect |
| --- | --- | --- |
| `customCursor` | `false` | Native cursor; the ring/dot layer is inert |
| `bgIntensity` | `1.5` | Multiplies cloud parallax travel (`--amp`) |
| `showExperience` | `true` | Experience rail + detail panels visible |
| `showSecondary` | `true` | "Also built" list visible |

`bgIntensity` accepts 0–2 in 0.1 steps. `0` freezes the parallax (the wash and
drift still run); `2` roughly doubles the travel distance.

---

## 9. Accessibility

- Body text on `#f2f5fa` at `#12192b` — well above 7:1.
- The lightest text in use, `#9aa4b4`, is reserved for dates and non-essential
  metadata only. Do not use it for anything a reader must read.
- All decorative background layers carry `aria-hidden="true"` and
  `pointer-events: none`.
- The commit-graph image and memoji have real `alt` text.
- External links use `target="_blank" rel="noopener"`.
- Hover states change background or border, never color alone as the sole signal.
- Reduced-motion media query is respected.
- If the custom cursor is enabled, `body { cursor: none }` must be reverted on
  teardown and never applied on coarse pointers.

---

## 10. Assets

| File | Use |
| --- | --- |
| `memojii-mthsck2a-blw8.png` | Hero memoji, 132px, `object-fit: contain`, transparent |
| `public/tuppercare2.png` | TupperCare thumbnail |
| `public/SmartBand.png` | Lifelines Smartband thumbnail |
| `public/cleano.png` | Cleano Dashboard thumbnail |
| `public/trackly.png` | Trackly thumbnail |
| `https://ghchart.rshah.org/1f3d6b/PeterTheMango` | GitHub contribution graph, tinted with the accent hex |

Two work-card images are unfilled placeholders (`<image-slot>`): CareerBoard
("workspace view") and StudyGenius ("practice session"). Both need real
screenshots at 232px tall, full card width, `object-fit: cover`.
