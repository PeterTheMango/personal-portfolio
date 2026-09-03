import Image from "next/image";
import { profile } from "./content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function Hero() {
  return (
    <section id="about" className="pf-hero">
      <Image
        className="pf-memoji"
        src="/memoji.png"
        alt="Memoji of Peter waving"
        width={132}
        height={132}
        priority
      />
      <h1 className="pf-h1">
        Engineer and researcher. I build software, then study whether it actually
        helps.
      </h1>
      <p className="pf-lede">
        Final-year Data Science and AI at the University of Doha for Science
        &amp; Technology. Currently building{" "}
        <a className="pf-link" href="#careerboard">
          CareerBoard
        </a>{" "}
        and{" "}
        <a className="pf-link" href="#studygenius">
          StudyGenius
        </a>
        . Previously shipped internal tooling at Cleano and led a hardware team
        at the Qatar Innovation Program. Based in Doha, open to roles from
        mid-2026.
      </p>
      <div className="pf-chips">
        <a className="pf-chip" href={`mailto:${profile.email}`}>
          <MailIcon />
          Email
        </a>
        <a
          className="pf-chip"
          href={profile.github}
          target="_blank"
          rel="noopener"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          className="pf-chip"
          href={profile.linkedin}
          target="_blank"
          rel="noopener"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
    </section>
  );
}
