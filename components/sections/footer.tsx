import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/ui/aurora-text";
import { Github, Linkedin, Mail, Download } from "lucide-react";

interface FooterProps {
  personal: {
    name: string;
    footerName: string;
    availability: string;
    copyright: string;
  };
  footer: {
    social: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
    navigation: Array<{
      name: string;
      href: string;
    }>;
    resources: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
  };
}

export function Footer({ personal, footer }: FooterProps) {
  const getIcon = (iconName: string) => {
    const icons = { Github, Linkedin, Mail, Download };
    return icons[iconName as keyof typeof icons] || Mail;
  };
  return (
    <footer id="footer" className="w-full bg-background">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 md:py-16">
        {/* Two-column layout on lg; stacked on mobile with full width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 w-full">
          {/* Left Column - Left aligned */}
          <div className="space-y-4 text-left">
            {/* Name (heading) */}
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              <AuroraText>{personal.footerName}</AuroraText>
            </h2>

            {/* Subtext (short bio/availability) */}
            <p className="text-muted-foreground max-w-md">
              {personal.availability}
            </p>

            {/* Copyright under name */}
            <p className="text-sm text-muted-foreground">
              {personal.copyright}
            </p>
          </div>

          {/* Right Column - Right aligned */}
          <div className="space-y-8 text-right lg:flex lg:flex-col lg:items-end">
            {/* Social links */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex gap-2 justify-end">
                {footer.social.map((social, index) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.name} Profile`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {social.name}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Section anchors */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Navigate
              </h3>
              <div className="flex flex-wrap gap-2 justify-end">
                {footer.navigation.map((nav, index) => (
                  <Button
                    key={index}
                    variant="link"
                    size="sm"
                    asChild
                    className="text-muted-foreground hover:text-foreground p-0 h-auto"
                  >
                    <a href={nav.href}>{nav.name}</a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Misc links */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Resources
              </h3>
              <div className="flex gap-2 justify-end">
                {footer.resources.map((resource, index) => {
                  const Icon = getIcon(resource.icon);
                  const isDownload = resource.name === "Resume";
                  return (
                    <Button
                      key={index}
                      variant={isDownload ? "outline" : "ghost"}
                      size="sm"
                      asChild
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <a
                        href={resource.url}
                        target={isDownload ? "_blank" : undefined}
                        rel={isDownload ? "noopener noreferrer" : undefined}
                        aria-label={
                          isDownload
                            ? `Download ${resource.name}`
                            : `Send ${resource.name}`
                        }
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {resource.name}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
