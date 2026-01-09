'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showSubtitle?: boolean
}

export function Logo({ className, size = 'md', showSubtitle = false }: LogoProps) {
  const sizes = {
    sm: { logo: 'h-8', text: 'text-xl', subtitle: 'text-[10px]' },
    md: { logo: 'h-10', text: 'text-2xl', subtitle: 'text-xs' },
    lg: { logo: 'h-14', text: 'text-3xl', subtitle: 'text-sm' },
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* SVG Logo Icon */}
      <svg
        className={cn(sizes[size].logo, 'w-auto')}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Solar Panel Base */}
        <rect
          x="6"
          y="14"
          width="36"
          height="28"
          rx="4"
          fill="#10b981"
        />
        {/* Panel Grid Lines */}
        <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="1.5" />
        <line x1="6" y1="32" x2="42" y2="32" stroke="white" strokeWidth="1.5" />
        <line x1="18" y1="14" x2="18" y2="42" stroke="white" strokeWidth="1.5" />
        <line x1="30" y1="14" x2="30" y2="42" stroke="white" strokeWidth="1.5" />
        {/* Sun Rays */}
        <circle cx="24" cy="8" r="4" fill="#047857" />
        <line x1="24" y1="0" x2="24" y2="2" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="4" x2="30.5" y2="5.5" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="4" x2="17.5" y2="5.5" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
        {/* Energy Flow Arrow */}
        <path
          d="M38 46L42 42L38 38"
          stroke="#059669"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className={cn(sizes[size].text, 'font-bold text-slate-900 leading-none')}>
          Energia
        </span>
        {showSubtitle && (
          <span className={cn(sizes[size].subtitle, 'text-slate-500 tracking-wider uppercase mt-0.5')}>
            Supply Solution
          </span>
        )}
      </div>
    </div>
  )
}
