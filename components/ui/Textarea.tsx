'use client'

import { cn } from '@/lib/utils'
import { forwardRef, TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground mb-3"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'w-full min-h-[120px] px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted',
            'transition-all duration-200 resize-y',
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

Textarea.displayName = 'Textarea'

export { Textarea }

