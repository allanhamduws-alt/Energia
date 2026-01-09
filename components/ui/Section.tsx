'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: 'default' | 'secondary' | 'tertiary' | 'energia'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { className, background = 'default', padding = 'lg', children, ...props },
    ref
  ) => {
    const backgrounds = {
      default: 'bg-background',
      secondary: 'bg-background-secondary',
      tertiary: 'bg-background-tertiary',
      energia: 'bg-energia-bg',
    }
    
    const paddings = {
      sm: 'py-6 sm:py-8 md:py-12',
      md: 'py-8 sm:py-12 md:py-16',
      lg: 'py-10 sm:py-14 md:py-20 lg:py-24',
      xl: 'py-12 sm:py-16 md:py-24 lg:py-32',
    }

    return (
      <section
        className={cn(backgrounds[background], paddings[padding], className)}
        ref={ref}
        {...props}
      >
        <div className="container">{children}</div>
      </section>
    )
  }
)

Section.displayName = 'Section'

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  centered?: boolean
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, centered = true, ...props }, ref) => {
    return (
      <div
        className={cn(
          'mb-8 sm:mb-10 md:mb-12',
          centered && 'text-center',
          className
        )}
        ref={ref}
        {...props}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto px-4 sm:px-0">
            {subtitle}
          </p>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'

export { Section, SectionHeader }

