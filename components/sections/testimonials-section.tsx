"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

interface TestimonialsSectionProps {
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{
      content: string;
      author: string;
      role: string;
      company: string;
      avatar: string;
      initials: string;
    }>;
  };
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )


  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">{testimonials.title}</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            {testimonials.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Carousel 
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {testimonials.items.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Card className="h-full border backdrop-blur-md">
                    <CardContent className="p-6">
                      {/* Header with Avatar and Author Info - Tweet card style */}
                      <div className="mb-4 flex items-start space-x-3">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                          <AvatarFallback className="bg-primary/10 text-sm font-semibold">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-foreground">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                      
                      {/* Quote Content */}
                      <blockquote className="text-base leading-relaxed tracking-tight">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}