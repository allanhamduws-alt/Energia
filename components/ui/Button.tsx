'use client'

import { cn } from '@/lib/utils'
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantStyles = {
      primary: 'rounded-full shadow-md hover:shadow-lg',
      secondary: 'rounded-full',
      outline: 'border-2 rounded-full',
      ghost: 'rounded-xl',
      link: 'underline-offset-4 hover:underline',
    }

    const variantColors: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: '#10b981',
        color: '#ffffff',
      },
      secondary: {
        backgroundColor: '#1e293b',
        color: '#ffffff',
      },
      outline: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: '#475569',
        color: '#f1f5f9',  // Hell für Dark Mode Lesbarkeit
      },
      ghost: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#e2e8f0',  // Hell für Dark Mode Lesbarkeit
      },
      link: {
        backgroundColor: 'transparent',
        color: '#10b981',
      },
    }
    
    const sizes = {
      sm: 'h-9 px-4 text-sm gap-1.5',
      md: 'h-11 px-6 text-sm gap-2',
      lg: 'h-12 px-8 text-base gap-2.5',
    }

    return (
      <button
        className={cn(baseStyles, variantStyles[variant], sizes[size], className)}
        style={{ ...variantColors[variant], ...style }}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
