'use client'

import Image from 'next/image'

// Brand data with logo paths
const brands = [
  { name: 'SMA', logo: '/images/brands/Logo_SMA..png' },
  { name: 'Sungrow', logo: '/images/brands/sungrow.svg' },
  { name: 'Huawei', logo: '/images/brands/huawei-logo.svg' },
  { name: 'AIKO', logo: '/images/brands/Aiko.png' },
  { name: 'BYD', logo: '/images/brands/BYD.svg' },
  { name: 'Kostal', logo: '/images/brands/kostal.png' },
  { name: 'JA Solar', logo: '/images/brands/JA_Solar.png' },
  { name: 'Trina Solar', logo: '/images/brands/Trina_Solar.png' },
  { name: 'LONGi', logo: '/images/brands/longi-solar.png' },
  { name: 'Canadian Solar', logo: '/images/brands/Canadian_Solar.svg' },
]

// Brand Logo Component - uses real logo images
function BrandLogo({ brand }: { brand: typeof brands[0] }) {
  return (
    <div style={{ height: 36, display: 'flex', alignItems: 'center' }}>
      <Image
        src={brand.logo}
        alt={brand.name}
        width={140}
        height={36}
        style={{ height: 32, width: 'auto', objectFit: 'contain', maxWidth: '140px' }}
        unoptimized
      />
    </div>
  )
}

export function BrandsSection() {
  return (
    <section
      style={{
        paddingTop: '48px',
        paddingBottom: '48px',
        background: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div className="container" style={{ marginBottom: '32px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 500,
          color: '#a3a3a3',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Vertrauensvolle Partnerschaften mit führenden Herstellern
        </p>
      </div>

      {/* Marquee Container */}
      <div style={{ position: 'relative' }}>
        {/* Fade Left */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '100px',
            background: 'linear-gradient(90deg, #ffffff 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Fade Right */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '100px',
            background: 'linear-gradient(270deg, #ffffff 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling Logos */}
        <div className="brand-marquee">
          <div className="brand-marquee-content">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="brand-item"
              >
                <BrandLogo brand={brand} />
              </div>
            ))}
          </div>
          <div className="brand-marquee-content" aria-hidden="true">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`dup-${brand.name}-${index}`}
                className="brand-item"
              >
                <BrandLogo brand={brand} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .brand-marquee {
          display: flex;
          overflow: hidden;
          gap: 32px;
        }
        
        .brand-marquee-content {
          display: flex;
          gap: 32px;
          animation: brand-scroll 35s linear infinite;
        }
        
        .brand-item {
          flex-shrink: 0;
          padding: 16px 28px;
          background: #fafafa;
          border-radius: 12px;
          border: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 140px;
          min-height: 60px;
          transition: all 0.3s ease;
        }
        
        .brand-item:hover {
          background: #ffffff;
          border-color: #e0e0e0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        
        @keyframes brand-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        
        .brand-marquee:hover .brand-marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

// Export brands data for use in other components
export { brands as brandsList }
