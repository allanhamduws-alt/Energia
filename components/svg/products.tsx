'use client'

import React from 'react'

interface ProductProps {
    className?: string
    style?: React.CSSProperties
}

// Solar Panel SVG Illustration
export const SolarPanelSVG = ({ className = '', style }: ProductProps) => (
    <svg
        viewBox="0 0 200 280"
        fill="none"
        className={className}
        style={style}
    >
        {/* Panel Frame */}
        <rect x="10" y="10" width="180" height="260" rx="4" fill="#c0c0c0" />
        <rect x="15" y="15" width="170" height="250" rx="2" fill="#1e3a5f" />

        {/* Solar Cells Grid - 6x9 */}
        {[...Array(9)].map((_, row) => (
            [...Array(6)].map((_, col) => (
                <React.Fragment key={`cell-${row}-${col}`}>
                    <rect
                        x={20 + col * 27}
                        y={20 + row * 27}
                        width="24"
                        height="24"
                        fill={`hsl(215, 50%, ${18 + (row + col) * 2}%)`}
                        rx="1"
                    />
                    {/* Cell lines */}
                    <line
                        x1={20 + col * 27}
                        y1={32 + row * 27}
                        x2={44 + col * 27}
                        y2={32 + row * 27}
                        stroke="#2a4a6f"
                        strokeWidth="0.5"
                    />
                    <line
                        x1={32 + col * 27}
                        y1={20 + row * 27}
                        x2={32 + col * 27}
                        y2={44 + row * 27}
                        stroke="#2a4a6f"
                        strokeWidth="0.5"
                    />
                </React.Fragment>
            ))
        ))}

        {/* Reflection highlight */}
        <rect x="15" y="15" width="170" height="250" rx="2" fill="url(#panelGlare)" />

        <defs>
            <linearGradient id="panelGlare" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                <stop offset="50%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
        </defs>
    </svg>
)

// Inverter SVG Illustration
export const InverterSVG = ({ className = '', style }: ProductProps) => (
    <svg
        viewBox="0 0 160 200"
        fill="none"
        className={className}
        style={style}
    >
        {/* Main body */}
        <rect x="10" y="20" width="140" height="170" rx="8" fill="#f5f5f5" />
        <rect x="10" y="20" width="140" height="170" rx="8" stroke="#e0e0e0" strokeWidth="2" />

        {/* Top ventilation */}
        <rect x="30" y="30" width="100" height="15" rx="2" fill="#e8e8e8" />
        {[...Array(8)].map((_, i) => (
            <rect key={`vent-${i}`} x={35 + i * 12} y="33" width="8" height="9" rx="1" fill="#d0d0d0" />
        ))}

        {/* Display Screen */}
        <rect x="30" y="60" width="100" height="50" rx="4" fill="#1a1a1a" />
        <rect x="35" y="65" width="90" height="40" rx="2" fill="#0a2810" />

        {/* Display content - power reading */}
        <text x="45" y="95" fill="#22c55e" fontSize="24" fontFamily="monospace" fontWeight="bold">
            6.2
        </text>
        <text x="95" y="95" fill="#22c55e" fontSize="12" fontFamily="monospace">
            kW
        </text>
        <text x="45" y="78" fill="#16a34a" fontSize="8" fontFamily="sans-serif">
            ACTIVE POWER
        </text>

        {/* Status LED */}
        <circle cx="125" y="130" r="6" fill="#22c55e" />
        <circle cx="125" y="130" r="6" fill="url(#ledGlow)" />

        {/* Control buttons */}
        <rect x="40" y="145" width="30" height="12" rx="2" fill="#e0e0e0" />
        <rect x="80" y="145" width="40" height="12" rx="2" fill="#e0e0e0" />

        {/* Bottom section */}
        <rect x="30" y="165" width="100" height="15" rx="2" fill="#e8e8e8" />

        <defs>
            <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
        </defs>
    </svg>
)

// Battery Storage SVG Illustration
export const BatterySVG = ({ className = '', style }: ProductProps) => (
    <svg
        viewBox="0 0 120 240"
        fill="none"
        className={className}
        style={style}
    >
        {/* Main body */}
        <rect x="10" y="10" width="100" height="220" rx="8" fill="#2d3748" />
        <rect x="10" y="10" width="100" height="220" rx="8" stroke="#1a202c" strokeWidth="2" />

        {/* Top section with vents */}
        <rect x="20" y="20" width="80" height="25" rx="4" fill="#1a202c" />
        {[...Array(6)].map((_, i) => (
            <rect key={`bvent-${i}`} x={25 + i * 12} y="25" width="8" height="15" rx="1" fill="#0f1419" />
        ))}

        {/* LED indicators */}
        <circle cx="30" cy="60" r="4" fill="#22c55e" />
        <circle cx="45" cy="60" r="4" fill="#22c55e" />
        <circle cx="60" cy="60" r="4" fill="#22c55e" />
        <circle cx="75" cy="60" r="4" fill="#22c55e" />
        <circle cx="90" cy="60" r="4" fill="#22c55e" opacity="0.3" />

        {/* Battery level indicator text */}
        <text x="30" y="85" fill="#a0aec0" fontSize="10" fontFamily="sans-serif">
            80% CHARGED
        </text>

        {/* Main panel area */}
        <rect x="20" y="95" width="80" height="120" rx="4" fill="#1a202c" />

        {/* Energia branding area */}
        <rect x="30" y="140" width="60" height="30" rx="2" fill="#2d3748" />

        {/* Bottom section */}
        <rect x="20" y="185" width="80" height="35" rx="4" fill="#1a202c" />

        {/* Side accent */}
        <rect x="10" y="50" width="4" height="100" fill="#16a34a" />
    </svg>
)

// Combined floating products component for Hero
export const HeroProducts = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '400px',
        }}
    >
        {/* Solar Panel - largest, top right */}
        <div
            className="float-slow"
            style={{
                position: 'absolute',
                right: '0',
                top: '0',
                width: '220px',
                transform: 'rotate(15deg)',
                filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))',
            }}
        >
            <SolarPanelSVG />
        </div>

        {/* Battery - left side */}
        <div
            className="float"
            style={{
                position: 'absolute',
                left: '20px',
                bottom: '20px',
                width: '100px',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                animationDelay: '0.5s',
            }}
        >
            <BatterySVG />
        </div>

        {/* Inverter - center */}
        <div
            className="float"
            style={{
                position: 'absolute',
                left: '130px',
                bottom: '60px',
                width: '130px',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                animationDelay: '1s',
            }}
        >
            <InverterSVG />
        </div>
    </div>
)
