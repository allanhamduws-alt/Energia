'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ============================================
// BILDPFADE - Hier anpassen!
// ============================================
const PRODUCT_IMAGES = {
    // Back Layer - Das große Solarmodul
    BACK_LAYER: '/images/hero/aiko-module.png',
    // Mid Layer - Wechselrichter
    MID_LAYER: '/images/hero/sungrow-inverter.png',
    // Front Layer - Batteriespeicher
    FRONT_LAYER: '/images/hero/sma-battery.png',
}

// Fallback-Platzhalter (transparente PNGs)
const PLACEHOLDER_IMAGES = {
    BACK_LAYER: '/images/products/solar-module.png',
    MID_LAYER: '/images/products/inverter.png',
    FRONT_LAYER: '/images/products/battery.png',
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 100,
            damping: 15,
        },
    },
}

// ============================================
// KOMPONENTE
// ============================================
export function HeroProductCluster() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

    // Mouse position tracking
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animation for mouse movement
    const springConfig = { stiffness: 100, damping: 30 }
    const smoothMouseX = useSpring(mouseX, springConfig)
    const smoothMouseY = useSpring(mouseY, springConfig)

    // Parallax transforms für verschiedene Layers
    // Back Layer - langsame Bewegung (0.02)
    const backX = useTransform(smoothMouseX, [-200, 200], [-4, 4])
    const backY = useTransform(smoothMouseY, [-200, 200], [-4, 4])

    // Mid Layer - mittlere Bewegung (0.03)
    const midX = useTransform(smoothMouseX, [-200, 200], [-6, 6])
    const midY = useTransform(smoothMouseY, [-200, 200], [-6, 6])

    // Front Layer - schnelle Bewegung (0.05)
    const frontX = useTransform(smoothMouseX, [-200, 200], [-10, 10])
    const frontY = useTransform(smoothMouseY, [-200, 200], [-10, 10])

    // Handle mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            mouseX.set(e.clientX - centerX)
            mouseY.set(e.clientY - centerY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    // Image error handler - use fallback
    const handleImageError = (layer: string) => {
        setImageErrors(prev => ({ ...prev, [layer]: true }))
    }

    const getImageSrc = (layer: keyof typeof PRODUCT_IMAGES) => {
        if (imageErrors[layer]) {
            return PLACEHOLDER_IMAGES[layer]
        }
        return PRODUCT_IMAGES[layer]
    }

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full h-full min-h-[450px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Back Layer - AIKO Solarmodul */}
            <motion.div
                className="absolute"
                style={{
                    right: '0',
                    top: '0',
                    width: '280px',
                    height: '360px',
                    zIndex: 10,
                    x: backX,
                    y: backY,
                }}
                variants={itemVariants}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: 'rotate(-5deg)',
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))',
                    }}
                >
                    <Image
                        src={getImageSrc('BACK_LAYER')}
                        alt="AIKO 465W Fullblack Solarmodul"
                        fill
                        sizes="280px"
                        style={{ objectFit: 'contain' }}
                        priority
                        onError={() => handleImageError('BACK_LAYER')}
                    />
                </div>
            </motion.div>

            {/* Mid Layer - Sungrow Wechselrichter */}
            <motion.div
                className="absolute"
                style={{
                    right: '20px',
                    bottom: '60px',
                    width: '160px',
                    height: '200px',
                    zIndex: 20,
                    x: midX,
                    y: midY,
                }}
                variants={itemVariants}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
                    }}
                >
                    <Image
                        src={getImageSrc('MID_LAYER')}
                        alt="Sungrow Hybrid-Wechselrichter"
                        fill
                        sizes="160px"
                        style={{ objectFit: 'contain' }}
                        onError={() => handleImageError('MID_LAYER')}
                    />
                </div>
            </motion.div>

            {/* Front Layer - SMA/Huawei Batteriespeicher */}
            <motion.div
                className="absolute"
                style={{
                    left: '20px',
                    bottom: '20px',
                    width: '140px',
                    height: '220px',
                    zIndex: 30,
                    x: frontX,
                    y: frontY,
                }}
                variants={itemVariants}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))',
                    }}
                >
                    <Image
                        src={getImageSrc('FRONT_LAYER')}
                        alt="SMA/Huawei Batteriespeicher"
                        fill
                        sizes="140px"
                        style={{ objectFit: 'contain' }}
                        onError={() => handleImageError('FRONT_LAYER')}
                    />
                </div>
            </motion.div>

            {/* Decorative glow effect behind products */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: '50%',
                    left: '50%',
                    width: '350px',
                    height: '350px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 5,
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.div>
    )
}
