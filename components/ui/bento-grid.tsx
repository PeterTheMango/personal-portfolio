"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface BentoGridProps {
  className?: string
  children?: React.ReactNode
}

interface BentoCardProps {
  className?: string
  children?: React.ReactNode
  title?: string
  description?: string
  icon?: React.ReactNode
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {children}
      </div>
    )
  }
)
BentoGrid.displayName = "BentoGrid"

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, children, title, description, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="mb-2 font-semibold text-card-foreground">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    )
  }
)
BentoCard.displayName = "BentoCard"

export { BentoGrid, BentoCard }