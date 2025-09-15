"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsContents,
} from "@/components/animate-ui/components/animate/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Building2, Calendar, ChevronDown } from "lucide-react";

interface ExperienceItem {
  id: string;
  org: string;
  logo?: string;
  position: string;
  from: string;
  to: string | "Present";
  bullets: string[];
}

interface ExperienceData {
  professional: ExperienceItem[];
  hackathon: ExperienceItem[];
  education: ExperienceItem[];
}

interface ExperienceSectionProps {
  experience: {
    title: string;
    subtitle: string;
    tabs: ExperienceData;
  };
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const [selectedOrg, setSelectedOrg] = useState<string>("google");


  return (
    <section id="experience" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <BlurFade delay={0.1} inView>
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">{experience.title}</h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              {experience.subtitle}
            </p>
          </div>
        </BlurFade>

        <Tabs defaultValue="professional" className="w-full">
          <BlurFade delay={0.2} inView>
            <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="hackathon">Hackathon</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
          </BlurFade>

          <TabsContents>
            <TabsContent value="professional">
              <BlurFade delay={0.3} direction="down" inView>
                <ExperienceTabContent
                  data={experience.tabs.professional}
                  selectedOrg={selectedOrg}
                  onSelectOrg={setSelectedOrg}
                />
              </BlurFade>
            </TabsContent>

            <TabsContent value="hackathon">
              <BlurFade delay={0.3} direction="down" inView>
                <ExperienceTabContent
                  data={experience.tabs.hackathon}
                  selectedOrg={selectedOrg}
                  onSelectOrg={setSelectedOrg}
                />
              </BlurFade>
            </TabsContent>

            <TabsContent value="education">
              <BlurFade delay={0.3} direction="down" inView>
                <ExperienceTabContent
                  data={experience.tabs.education}
                  selectedOrg={selectedOrg}
                  onSelectOrg={setSelectedOrg}
                />
              </BlurFade>
            </TabsContent>
          </TabsContents>
        </Tabs>
      </div>
    </section>
  );
}

interface ExperienceTabContentProps {
  data: ExperienceItem[];
  selectedOrg: string;
  onSelectOrg: (orgId: string) => void;
}

function ExperienceTabContent({
  data,
  selectedOrg,
  onSelectOrg,
}: ExperienceTabContentProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const selectedData = data.find((item) => item.id === selectedOrg) || data[0];

  return (
    <div className="grid lg:grid-cols-[320px_auto_1fr] gap-8 lg:gap-6">
      {/* Desktop Organization List */}
      <div className="hidden lg:block">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {data.map((item, idx) => (
              <BlurFade key={item.id} delay={0.1 + idx * 0.05} inView>
                <Button
                  variant={selectedOrg === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start h-auto p-4 text-left ${
                    selectedOrg === item.id ? "border-l-4 border-primary" : ""
                  }`}
                  onClick={() => onSelectOrg(item.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Building2 className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm">{item.org}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.from} - {item.to}
                      </div>
                    </div>
                  </div>
                </Button>
              </BlurFade>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Vertical Separator - Desktop Only */}
      <div className="hidden lg:flex justify-center">
        <Separator orientation="vertical" className="h-[500px]" />
      </div>

      {/* Mobile Organization Accordion */}
      <div className="lg:hidden">
        <Collapsible open={mobileExpanded} onOpenChange={setMobileExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {selectedData.org}
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  mobileExpanded ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mb-4">
            <BlurFade delay={0.1} inView>
              {data.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onSelectOrg(item.id);
                    setMobileExpanded(false);
                  }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {item.org}
                </Button>
              ))}
            </BlurFade>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Detail Panel */}
      <BlurFade key={selectedData.id} delay={0.1} direction="left" inView>
        <Card className="h-fit">
          <CardHeader>
            <div className="space-y-3">
              <CardTitle className="text-xl lg:text-2xl">
                {selectedData.position}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {selectedData.org}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {selectedData.from} - {selectedData.to}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {selectedData.bullets.map((bullet, idx) => (
                <BlurFade key={idx} delay={0.15 + idx * 0.05} inView>
                  <li className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {bullet}
                    </p>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
