// Brand Logo SVG Components with official brand colors
// Reusable across BrandsSection and Marken page

export const BrandLogos = {
    SMA: ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 24, md: 32, lg: 48 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <rect width="100" height="36" rx="4" fill="#CC0000" />
                <text x="50" y="24" fill="white" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="Arial, sans-serif">SMA</text>
            </svg>
        )
    },

    Sungrow: ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 20, md: 28, lg: 40 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 130 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <text x="0" y="24" fill="#E31937" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">SUNGROW</text>
            </svg>
        )
    },

    Huawei: ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 18, md: 26, lg: 38 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <path d="M8 16C8 10 13 5 20 5C27 5 32 10 32 16" stroke="#E31937" strokeWidth="2.5" fill="none" />
                <path d="M12 16C12 12 16 8 22 8C28 8 32 12 32 16" stroke="#E31937" strokeWidth="1.5" fill="none" />
                <text x="38" y="24" fill="#E31937" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">HUAWEI</text>
            </svg>
        )
    },

    AIKO: ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 20, md: 28, lg: 40 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <text x="0" y="24" fill="#00A651" fontSize="22" fontWeight="700" fontFamily="Arial, sans-serif">AIKO</text>
            </svg>
        )
    },

    BYD: ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 22, md: 30, lg: 44 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <ellipse cx="40" cy="15" rx="38" ry="14" fill="#E31937" />
                <text x="40" y="21" fill="white" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="Arial, sans-serif">BYD</text>
            </svg>
        )
    },

    Kostal: ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 20, md: 28, lg: 40 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 110 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <text x="0" y="24" fill="#003087" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">KOSTAL</text>
            </svg>
        )
    },

    'JA Solar': ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 20, md: 28, lg: 40 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <text x="0" y="24" fill="#F7931E" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">JA Solar</text>
            </svg>
        )
    },

    'Trina Solar': ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 20, md: 28, lg: 40 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <text x="0" y="24" fill="#1E3799" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">Trina Solar</text>
            </svg>
        )
    },

    LONGi: ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 20, md: 28, lg: 40 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <text x="0" y="24" fill="#00A950" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">LONGi</text>
            </svg>
        )
    },

    'Canadian Solar': ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
        const heights = { sm: 20, md: 28, lg: 40 }
        const h = heights[size]
        return (
            <svg viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: h, width: 'auto' }}>
                <circle cx="12" cy="15" r="11" fill="#E31937" />
                <path d="M12 5L14 10H19L15 14L17 19L12 15L7 19L9 14L5 10H10L12 5Z" fill="white" />
                <text x="28" y="22" fill="#003366" fontSize="16" fontWeight="700" fontFamily="Arial, sans-serif">Canadian Solar</text>
            </svg>
        )
    },
}

// Alias for shorter names used in some components
export const BrandLogoAliases: { [key: string]: keyof typeof BrandLogos } = {
    'Trina': 'Trina Solar',
    'Canadian': 'Canadian Solar',
    'JASolar': 'JA Solar',
}

// Get logo component by name (with alias support)
export function getBrandLogo(name: string) {
    const aliasedName = BrandLogoAliases[name] || name
    return BrandLogos[aliasedName as keyof typeof BrandLogos]
}

// Brand colors for reference
export const BrandColors = {
    SMA: '#CC0000',
    Sungrow: '#E31937',
    Huawei: '#E31937',
    AIKO: '#00A651',
    BYD: '#E31937',
    Kostal: '#003087',
    'JA Solar': '#F7931E',
    'Trina Solar': '#1E3799',
    LONGi: '#00A950',
    'Canadian Solar': '#003366',
}
