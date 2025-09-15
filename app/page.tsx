import { FloatingDock } from "@/components/floating-dock"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/sections/footer"
import { ScrollArea } from "@/components/ui/scroll-area"
import portfolioData from "@/portfolio_data.json"

export default function Home() {
  return (
    <div className="relative">
      <FloatingDock />
      <ScrollArea className="h-screen">
        <main>
          <HeroSection 
            personal={portfolioData.personal}
            hero={portfolioData.hero}
          />
          <AboutSection 
            about={portfolioData.about}
          />
          <ExperienceSection 
            experience={portfolioData.experience}
          />
          <ProjectsSection 
            projects={portfolioData.projects}
          />
          <TestimonialsSection 
            testimonials={portfolioData.testimonials}
          />
          <ContactSection 
            contact={portfolioData.contact}
          />
          <Footer 
            personal={portfolioData.personal}
            footer={portfolioData.footer}
          />
        </main>
      </ScrollArea>
    </div>
  );
}
