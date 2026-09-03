import { profile } from "./content";

export function SiteHeader() {
  return (
    <header className="pf-header">
      <span className="pf-wordmark">{profile.name}</span>
      <nav className="pf-nav">
        <a className="pf-nav-link" href="#work">
          Work
        </a>
        {/* No target yet — muted variant. */}
        <a className="pf-nav-link pf-nav-link--disabled" href="#writing">
          Writing
        </a>
        <a className="pf-nav-link" href="#about">
          About
        </a>
        <a
          className="pf-resume"
          href={profile.resume}
          target="_blank"
          rel="noopener"
        >
          Résumé
        </a>
      </nav>
    </header>
  );
}
