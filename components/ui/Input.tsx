'use client'

import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type = 'text', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-3"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-energia-primary focus:border-energia-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-error focus:ring-error focus:border-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && !error && (
          <p className="mt-2.5 text-sm text-foreground-muted">{hint}</p>
        )}
        {error && (
          <p className="mt-2.5 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }

