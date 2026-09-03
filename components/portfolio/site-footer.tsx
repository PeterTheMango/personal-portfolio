import { profile } from "./content";

export function SiteFooter() {
  return (
    <footer className="pf-footer">
      <div className="pf-footer-inner" data-reveal>
        <p className="pf-footer-statement">
          Open to full-time roles from mid-2026.{" "}
          <a className="pf-link pf-link--footer" href={`mailto:${profile.email}`}>
            Say hello
          </a>
          .
        </p>
        <span className="pf-footer-meta">{profile.location}</span>
      </div>
    </footer>
  );
}
