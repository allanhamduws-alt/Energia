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
      sm: 'py-8 sm:py-10 md:py-14',
      md: 'py-10 sm:py-14 md:py-20',
      lg: 'py-12 sm:py-16 md:py-24 lg:py-28',
      xl: 'py-16 sm:py-20 md:py-28 lg:py-36',
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
          'mb-10 sm:mb-12 md:mb-16',
          centered && 'text-center',
          className
        )}
        ref={ref}
        {...props}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5">
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

