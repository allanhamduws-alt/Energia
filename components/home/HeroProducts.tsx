'use client'

import Image from 'next/image'

export function HeroProducts() {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '400px',
            }}
        >
            {/* Solar Panel - largest, top right with floating animation */}
            <div
                className="float-slow"
                style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: '240px',
                    height: '320px',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,253,244,0.95))',
                    transform: 'rotate(8deg)',
                }}
            >
                <Image
                    src="/images/products/solar-module.png"
                    alt="AIKO 465W Fullblack Solarmodul"
                    fill
                    sizes="240px"
                    style={{
                        objectFit: 'contain',
                        padding: '12px',
                    }}
                    priority
                />
            </div>

            {/* Battery Storage - left side with floating animation */}
            <div
                className="float"
                style={{
                    position: 'absolute',
                    left: '10px',
                    bottom: '10px',
                    width: '120px',
                    height: '200px',
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))',
                    animationDelay: '0.5s',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,253,244,0.9))',
                }}
            >
                <Image
                    src="/images/products/battery.png"
                    alt="Huawei LUNA Batteriespeicher"
                    fill
                    sizes="120px"
                    style={{
                        objectFit: 'contain',
                        padding: '8px',
                    }}
                />
            </div>

            {/* Inverter - center with floating animation */}
            <div
                className="float"
                style={{
                    position: 'absolute',
                    left: '140px',
                    bottom: '50px',
                    width: '140px',
                    height: '180px',
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))',
                    animationDelay: '1s',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,253,244,0.9))',
                }}
            >
                <Image
                    src="/images/products/inverter.png"
                    alt="Sungrow Hybrid-Wechselrichter"
                    fill
                    sizes="140px"
                    style={{
                        objectFit: 'contain',
                        padding: '8px',
                    }}
                />
            </div>

            {/* Decorative floating particles for tech feel */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
                className="pulse-glow"
            />
        </div>
    )
}
