"use client";

import { useEffect } from "react";

/**
 * Scroll reveal for elements marked `data-reveal` (experiment — see config.ts).
 *
 * One observer for the whole page, so the sections stay server components;
 * `CommitHistory` in particular is an async server component and could not be
 * converted. The hidden state itself lives in CSS behind `data-reveal-root`,
 * which the boot script in layout.tsx sets before first paint — so there is no
 * flash of visible content, and with JS off nothing is ever hidden.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.revealRoot !== "on") return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer, no reveal — show everything rather than hiding it forever.
      root.removeAttribute("data-reveal-root");
      return;
    }

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    // The first callback reports every target at once. Anything already on
    // screen resolves during that pass with transitions suppressed, so the fold
    // never animates and LCP is not deferred behind an opacity ramp.
    let booting = true;
    root.setAttribute("data-reveal-boot", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
        if (booting) {
          booting = false;
          requestAnimationFrame(() => root.removeAttribute("data-reveal-boot"));
        }
      },
      // Fires once the element is ~10% past the bottom edge, not the instant it
      // touches it, so a reveal is never still running when it is read.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.removeAttribute("data-reveal-boot");
    };
  }, []);

  return null;
}
