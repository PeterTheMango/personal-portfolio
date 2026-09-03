"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { experience } from "./content";

const USER_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
const PANEL_ID = "experience-detail";

export function ExperienceRail() {
  const [open, setOpen] = useState<number | null>(null);
  // The panel collapses rather than unmounting, so its copy has to outlive the
  // close — otherwise it would blank out on the first frame of the transition.
  const [last, setLast] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  // Only real input hands control over; a programmatic scroll must not latch this.
  const touched = useRef(false);
  const pinned = useRef(false);

  // Newest role sits at the right end; land there so current work is seen first.
  const pinEnd = useCallback(() => {
    const el = railRef.current;
    if (!el || touched.current) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = max;
    el.style.scrollBehavior = prev;
    if (Math.abs(el.scrollLeft - max) < 2) pinned.current = true;
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const markTouched = () => {
      touched.current = true;
    };
    USER_EVENTS.forEach((t) =>
      el.addEventListener(t, markTouched, { passive: true }),
    );

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(pinEnd);
      observer.observe(el);
    }
    window.addEventListener("resize", pinEnd);
    document.fonts?.ready.then(pinEnd);

    // Grid column layout can settle over several frames; retry until the rail
    // actually reaches its right edge, or the window expires.
    let raf: number | null = null;
    const deadline = Date.now() + 2500;
    const tick = () => {
      pinEnd();
      if (!pinned.current && !touched.current && Date.now() < deadline) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      USER_EVENTS.forEach((t) => el.removeEventListener(t, markTouched));
      observer?.disconnect();
      window.removeEventListener("resize", pinEnd);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [pinEnd]);

  useEffect(() => {
    if (open !== null) setLast(open);
  }, [open]);

  const isOpen = open !== null;
  const shown = last === null ? null : experience[last];

  return (
    <section className="pf-section">
      <div className="pf-section-head" data-reveal>
        <h2 className="pf-label">Experience</h2>
        <span className="pf-caption">
          Scroll back for earlier roles · select one for detail
        </span>
      </div>

      <div className="pf-rail" ref={railRef} data-reveal>
        {experience.map((item, i) => (
          <button
            key={`${item.role}-${item.date}`}
            type="button"
            className="pf-rail-item"
            aria-expanded={open === i}
            aria-controls={PANEL_ID}
            onClick={() => setOpen((current) => (current === i ? null : i))}
          >
            <span className="pf-rail-date">{item.date}</span>
            <span
              className={[
                "pf-rail-rule",
                i === 0 ? "pf-rail-rule--first" : "",
                i === experience.length - 1 ? "pf-rail-rule--last" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <span className="pf-rail-role">{item.role}</span>
            <span className="pf-rail-org">{item.org}</span>
          </button>
        ))}
      </div>

      <div
        id={PANEL_ID}
        className="pf-panel-wrap"
        data-open={isOpen ? "true" : "false"}
        // Collapsed copy stays in the DOM; hide it from assistive tech and from
        // the tab order until the panel is actually open.
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="pf-panel-clip">
          {shown ? (
            <div className="pf-panel">
              <div className="pf-panel-head">
                <span className="pf-panel-title">{shown.panelTitle}</span>
                <button
                  type="button"
                  className="pf-panel-close"
                  onClick={() => setOpen(null)}
                  tabIndex={isOpen ? undefined : -1}
                >
                  Close
                </button>
              </div>
              <span className="pf-panel-meta">{shown.meta}</span>
              <p className="pf-panel-body">{shown.body}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
