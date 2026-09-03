"use client";

import { useEffect } from "react";

/**
 * The background system (DESIGN.md §5).
 *
 * Five fixed, pointer-events-none layers: the aurora wash, three parallax cloud
 * fields, the footer cool-down veil and the progressive bottom blur. The dot
 * grid and film grain live on `body` in portfolio.css.
 *
 * Scroll writes two custom properties on <html>, rAF-throttled:
 *   --sp  scroll progress, 0 → 1 across the document
 *   --sy  raw scrollY in px
 * `--amp` (background intensity, 1.5 as shipped) is a static token.
 *
 * Nothing here animates a layout property — only transform, opacity, filter and
 * background-position.
 */

type Cloud = {
  top: string;
  left: string;
  width: string;
  height: string;
  color: string;
  opacity: number;
  drift: "omdrift" | "omdrift2";
  /** Staggered 21s–38s; neighbours never match, so nothing moves in unison. */
  duration: string;
};

const WHITE = "#ffffff";

const NEAR: Cloud[] = [
  { top: "1%", left: "2%", width: "48vw", height: "28vw", color: WHITE, opacity: 0.82, drift: "omdrift", duration: "34s" },
  { top: "11%", left: "40%", width: "36vw", height: "22vw", color: WHITE, opacity: 0.55, drift: "omdrift2", duration: "38s" },
  { top: "25%", left: "58%", width: "46vw", height: "26vw", color: "oklch(0.9 0.05 240)", opacity: 0.5, drift: "omdrift", duration: "30s" },
  { top: "41%", left: "-8%", width: "54vw", height: "28vw", color: WHITE, opacity: 0.5, drift: "omdrift2", duration: "36s" },
  { top: "57%", left: "44%", width: "50vw", height: "26vw", color: "oklch(0.91 0.045 225)", opacity: 0.55, drift: "omdrift", duration: "32s" },
  { top: "74%", left: "6%", width: "46vw", height: "24vw", color: WHITE, opacity: 0.5, drift: "omdrift2", duration: "34s" },
];

const MID: Cloud[] = [
  { top: "7%", left: "64%", width: "30vw", height: "18vw", color: "oklch(0.89 0.055 250)", opacity: 0.5, drift: "omdrift2", duration: "28s" },
  { top: "29%", left: "10%", width: "34vw", height: "20vw", color: WHITE, opacity: 0.5, drift: "omdrift", duration: "26s" },
  { top: "49%", left: "56%", width: "32vw", height: "18vw", color: "oklch(0.9 0.05 215)", opacity: 0.5, drift: "omdrift2", duration: "32s" },
  { top: "67%", left: "18%", width: "36vw", height: "20vw", color: WHITE, opacity: 0.45, drift: "omdrift", duration: "30s" },
  { top: "85%", left: "58%", width: "34vw", height: "18vw", color: "oklch(0.89 0.05 245)", opacity: 0.5, drift: "omdrift2", duration: "27s" },
];

const FAR: Cloud[] = [
  { top: "17%", left: "30%", width: "22vw", height: "13vw", color: "oklch(0.88 0.07 240)", opacity: 0.4, drift: "omdrift", duration: "22s" },
  { top: "43%", left: "72%", width: "24vw", height: "14vw", color: "oklch(0.89 0.06 210)", opacity: 0.38, drift: "omdrift2", duration: "24s" },
  { top: "61%", left: "4%", width: "20vw", height: "12vw", color: "oklch(0.88 0.065 255)", opacity: 0.38, drift: "omdrift", duration: "21s" },
  { top: "81%", left: "40%", width: "24vw", height: "13vw", color: "oklch(0.89 0.06 235)", opacity: 0.4, drift: "omdrift2", duration: "25s" },
];

function CloudField({ className, clouds }: { className: string; clouds: Cloud[] }) {
  return (
    <div className={`om-field ${className}`}>
      {clouds.map((c, i) => (
        <div
          key={i}
          className="om-cloud"
          style={{
            top: c.top,
            left: c.left,
            width: c.width,
            height: c.height,
            background: `radial-gradient(closest-side,${c.color},rgba(255,255,255,0))`,
            opacity: c.opacity,
            animation: `${c.drift} ${c.duration} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export function Atmosphere() {
  useEffect(() => {
    let frame: number | null = null;

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const y = window.scrollY || window.pageYOffset || 0;
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const p = Math.min(1, Math.max(0, y / max));
        const root = document.documentElement.style;
        root.setProperty("--sp", p.toFixed(4));
        root.setProperty("--sy", `${y.toFixed(1)}px`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="om-atmos" aria-hidden="true">
        <div className="om-wash" />
        <CloudField className="om-f1" clouds={NEAR} />
        <CloudField className="om-f2" clouds={MID} />
        <CloudField className="om-f3" clouds={FAR} />
      </div>
      <div className="om-veil" aria-hidden="true" />
      <div className="om-blur-stack" aria-hidden="true">
        <div className="om-blur om-blur-1" />
        <div className="om-blur om-blur-2" />
        <div className="om-blur om-blur-3" />
      </div>
    </>
  );
}
