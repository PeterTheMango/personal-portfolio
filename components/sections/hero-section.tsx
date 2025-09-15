"use client";

import { TypingAnimation } from "@/components/ui/typing-animation";
import { AuroraText } from "@/components/ui/aurora-text";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

interface HeroSectionProps {
  personal: {
    name: string;
    greeting: string;
    roles: string;
    tagline: string;
  };
  hero: {
    ctas: Array<{
      text: string;
      targetSection: string;
      variant: string;
    }>;
  };
}

export function HeroSection({ personal, hero }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-4 sm:px-0"
    >
      <InteractiveGridPattern
        width={50}
        height={50}
        squares={[50, 30]}
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full skew-y-3 opacity-40"
        )}
      />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-4 text-sm font-medium text-muted-foreground sm:text-base md:text-lg lg:text-2xl">
          {personal.greeting}
        </div>

        <h1 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <AuroraText>{personal.name}</AuroraText>
        </h1>

        <div className="mb-8">
          <TypingAnimation
            text={personal.roles}
            duration={50}
            className="text-lg text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          />
        </div>

        <p className="mx-auto mb-8 max-w-2xl px-4 text-base text-muted-foreground sm:max-w-3xl sm:text-lg md:text-xl lg:text-2xl">
          {personal.tagline}
        </p>

        <div className="flex flex-col gap-4 px-4 sm:flex-row sm:justify-center sm:gap-6">
          {hero.ctas.map((cta, index) => (
            <Button
              key={index}
              size="lg"
              variant={cta.variant as "default" | "outline"}
              onClick={() => scrollToSection(cta.targetSection)}
              className="shadow-lg text-sm sm:text-base md:text-lg px-6 py-3 md:px-8 md:py-4"
            >
              {cta.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
