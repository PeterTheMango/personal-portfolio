"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github as GithubIcon } from "lucide-react";
import TiltedCard from "@/components/ui/tilted-card";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

interface ProjectsSectionProps {
  projects: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      tech: string[];
      liveUrl: string;
      githubUrl: string;
      media: {
        type: string;
        src: string;
        poster?: string;
        alt?: string;
      };
    }>;
  };
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">{projects.title}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            {projects.subtitle}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, index) => (
            <TiltedCard
              key={index}
              containerHeight="450px"
              containerWidth="100%"
              imageHeight="450px"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
              className="group"
            >
              <div className="flex h-full flex-col">
                {/* Media Section */}
                <div className="relative h-48 overflow-hidden rounded-t-[15px]">
                  {project.media.type === "video" ? (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={project.media.poster}
                    >
                      <source src={project.media.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={project.media.src}
                      alt={project.media.alt || project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Header Section */}
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                {/* Tech Stack Marquee */}
                <div className="my-4 rounded-lg bg-secondary/50 p-2">
                  <Marquee pauseOnHover className="[--duration:20s]">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="mx-1">
                        {tech}
                      </Badge>
                    ))}
                  </Marquee>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                </div>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
