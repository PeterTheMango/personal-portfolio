"use client";

import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { AnimatedList } from "@/components/magicui/animated-list";
import { IconCloud } from "@/components/magicui/icon-cloud";
import BounceCards from "@/components/ui/bounce-cards";
import CurvedLoop from "@/components/ui/curved-loop";
import { User, Code, Trophy, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  about: {
    title: string;
    subtitle: string;
    techSlugs: string[];
    bounceImages: string[];
    features: Array<{
      name: string;
      description: string;
      href: string;
      cta: string;
      icon: string;
      className: string;
      marqueeText?: string;
      achievements?: Array<{
        title: string;
        event: string;
        year: string;
        description: string;
      }>;
    }>;
  };
}

// Achievement notification component
const AchievementNotification = ({ 
  title, 
  event, 
  year, 
  description 
}: { 
  title: string; 
  event: string; 
  year: string; 
  description: string; 
}) => {
  const getAchievementIcon = (title: string) => {
    if (title.includes("Winner") || title.includes("Place")) return "🏆";
    if (title.includes("Finalist") || title.includes("Innovation")) return "🎯";
    if (title.includes("Dean's List") || title.includes("Academic")) return "📊";
    return "🏅";
  };

  const getAchievementColor = (title: string) => {
    if (title.includes("Winner") || title.includes("Place")) return "#FFD700";
    if (title.includes("Finalist") || title.includes("Innovation")) return "#00C9A7";
    if (title.includes("Dean's List") || title.includes("Academic")) return "#FF6B6B";
    return "#8B5CF6";
  };

  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: getAchievementColor(title),
          }}
        >
          <span className="text-lg">{getAchievementIcon(title)}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{title}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{year}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {event}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AboutSection({ about }: AboutSectionProps) {
  const techImages = about.techSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  const transformStyles = [
    "rotate(8deg) translate(-150px)",
    "rotate(-5deg) translate(-75px)",
    "rotate(3deg) translate(75px)",
    "rotate(-8deg) translate(150px)",
  ];

  const getIcon = (iconName: string) => {
    const icons = { User, Code, Trophy, Coffee };
    return icons[iconName as keyof typeof icons] || User;
  };

  const getBackground = (feature: typeof about.features[0]) => {
    const backgrounds = {
      "About Me": (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-90 transition-opacity duration-300 -translate-y-5">
            <BounceCards
              images={about.bounceImages}
              containerWidth={450}
              containerHeight={280}
              animationDelay={3}
              animationStagger={0.2}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
              className="scale-100"
            />
          </div>
        </div>
      ),
      "Skills & Expertise": (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20" />
          <div className="absolute inset-0 flex items-center justify-center scale-100 opacity-80 group-hover:opacity-100 transition-all duration-300">
            <IconCloud images={techImages} />
          </div>
        </div>
      ),
      "Beyond Code": (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20" />
          <div className="absolute inset-0 flex items-center justify-center scale-125 opacity-90 group-hover:opacity-60 transition-opacity duration-300 -translate-y-16">
            <CurvedLoop
              marqueeText={feature.marqueeText || ""}
              speed={2.5}
              curveAmount={400}
              interactive={false}
              className="fill-black dark:fill-white"
            />
          </div>
        </div>
      ),
      "Achievements": (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20" />
          <div className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90">
            <div className="relative flex h-[500px] w-full flex-col overflow-hidden p-2">
              <AnimatedList>
                {feature.achievements?.map((achievement, idx) => (
                  <AchievementNotification key={idx} {...achievement} />
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      ),
    };
    return backgrounds[feature.name as keyof typeof backgrounds] || backgrounds["About Me"];
  };

  const features = about.features.map((feature) => ({
    Icon: getIcon(feature.icon),
    name: feature.name,
    description: feature.description,
    href: feature.href,
    cta: feature.cta,
    className: feature.className,
    background: getBackground(feature),
  }));

  return (
    <section id="about" className="py-12 md:py-24 safe-area-insets">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">{about.title}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base px-2 sm:px-0">
            {about.subtitle}
          </p>
        </div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
