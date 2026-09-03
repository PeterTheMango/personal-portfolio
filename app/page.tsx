import { AlsoBuilt } from "@/components/portfolio/also-built";
import { Atmosphere } from "@/components/portfolio/atmosphere";
import { CommitHistory } from "@/components/portfolio/commit-history";
import { ExperienceRail } from "@/components/portfolio/experience-rail";
import { Hero } from "@/components/portfolio/hero";
import { Reveal } from "@/components/portfolio/reveal";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";

export default function Home() {
  return (
    <>
      <Atmosphere />
      <Reveal />
      <div className="pf-root">
        <div className="pf-container">
          <SiteHeader />
          <main>
            <Hero />
            <SelectedWork />
            <ExperienceRail />
            <AlsoBuilt />
            <CommitHistory />
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
