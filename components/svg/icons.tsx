'use client'

import React from 'react'

interface IconProps {
    size?: number
    className?: string
    color?: string
}

// B2B Focus Icon - Target/Bullseye with connected nodes
export const IconB2BFocus = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill={color} />
        <path d="M12 3V1M12 23v-2M3 12H1M23 12h-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Network Icon - Connected nodes
export const IconNetwork = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="5" r="2.5" stroke={color} strokeWidth="1.5" />
        <circle cx="5" cy="19" r="2.5" stroke={color} strokeWidth="1.5" />
        <circle cx="19" cy="19" r="2.5" stroke={color} strokeWidth="1.5" />
        <path d="M12 7.5V12M12 12L6.5 17M12 12l5.5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Partnership Icon - Handshake
export const IconPartnership = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M7 11l2.5 2.5L12 11l2.5 2.5L17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11l4-4h3M21 11l-4-4h-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14l-4 4M17 14l4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Flexibility Icon - Modular blocks
export const IconFlexibility = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
        <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
)

// Quality Icon - Diamond/Gem
export const IconQuality = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L2 9l10 13 10-13L12 2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 9h20M12 2v20M7 9l5 13M17 9l-5 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Service Icon - Headset
export const IconService = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 17V12a8 8 0 1116 0v5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="2" y="14" width="4" height="6" rx="1" stroke={color} strokeWidth="1.5" />
        <rect x="18" y="14" width="4" height="6" rx="1" stroke={color} strokeWidth="1.5" />
        <path d="M18 20a4 4 0 01-4 4h-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Availability Icon - Clock with checkmark
export const IconAvailability = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="4" fill="white" stroke={color} strokeWidth="1.5" />
        <path d="M16.5 18l1 1 2-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Euro/Price Icon
export const IconPrice = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <path d="M15 8.5a4 4 0 00-5.5 0 3.5 3.5 0 000 5 4 4 0 005.5 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6.5 10.5h6M6.5 13.5h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Guarantee Icon - Shield with check
export const IconGuarantee = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L4 5v6c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V5l-8-3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Delivery Icon - Truck
export const IconDelivery = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="1" y="6" width="14" height="10" rx="1" stroke={color} strokeWidth="1.5" />
        <path d="M15 10h4l3 4v2a1 1 0 01-1 1h-6" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="6" cy="17" r="2" stroke={color} strokeWidth="1.5" />
        <circle cx="18" cy="17" r="2" stroke={color} strokeWidth="1.5" />
    </svg>
)

// Support Icon - Chat bubble with question
export const IconSupport = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 12a9 9 0 01-9 9c-1.5 0-2.9-.4-4.1-1L3 21l1-4.9A9 9 0 1121 12z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 16v.01M12 13a2 2 0 002-2 2 2 0 00-4 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Consultation Icon - Two people talking
export const IconConsultation = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="8" cy="7" r="3" stroke={color} strokeWidth="1.5" />
        <circle cx="16" cy="7" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M4 21v-2a4 4 0 014-4M20 21v-2a4 4 0 00-4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 13v4M10 15h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Solar Panel Icon
export const IconSolarPanel = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="2" y="4" width="20" height="14" rx="1" stroke={color} strokeWidth="1.5" />
        <path d="M2 9h20M2 13h20M8 4v14M16 4v14" stroke={color} strokeWidth="1.5" />
        <path d="M12 18v4M8 22h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

// Inverter Icon
export const IconInverter = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M7 9h4M7 12h4M7 15h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="12" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M14.5 10.5l3 3M17.5 10.5l-3 3" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
)

// Battery Icon
export const IconBattery = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="6" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M20 10h2v4h-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="6" y="9" width="3" height="6" rx="0.5" fill={color} />
        <rect x="10.5" y="9" width="3" height="6" rx="0.5" fill={color} opacity="0.6" />
        <rect x="15" y="9" width="3" height="6" rx="0.5" fill={color} opacity="0.3" />
    </svg>
)

// EU Flag Icon
export const IconEU = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <g fill={color}>
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="5" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="7" cy="7" r="1" />
            <circle cx="17" cy="7" r="1" />
            <circle cx="7" cy="17" r="1" />
            <circle cx="17" cy="17" r="1" />
        </g>
    </svg>
)

// Lightning/Energy Icon for Hot Deals
export const IconLightning = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
)

// Star Icon for Ratings
export const IconStar = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
)

// Checkmark Icon
export const IconCheck = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Arrow Right Icon
export const IconArrowRight = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Export all icons as a map for dynamic usage
export const icons = {
    b2bFocus: IconB2BFocus,
    network: IconNetwork,
    partnership: IconPartnership,
    flexibility: IconFlexibility,
    quality: IconQuality,
    service: IconService,
    availability: IconAvailability,
    price: IconPrice,
    guarantee: IconGuarantee,
    delivery: IconDelivery,
    support: IconSupport,
    consultation: IconConsultation,
    solarPanel: IconSolarPanel,
    inverter: IconInverter,
    battery: IconBattery,
    eu: IconEU,
    lightning: IconLightning,
    star: IconStar,
    check: IconCheck,
    arrowRight: IconArrowRight,
}

export type IconName = keyof typeof icons
