'use client'

import Image from 'next/image'

// Brand data with colors and logo paths
const brands = [
  { name: 'SMA', color: '#CC0000', hasImage: false },
  { name: 'Sungrow', color: '#E31937', hasImage: false },
  { name: 'Huawei', color: '#E31937', hasImage: true, logo: '/images/brands/huawei-logo.svg' },
  { name: 'AIKO', color: '#00A651', hasImage: false },
  { name: 'BYD', color: '#E31937', hasImage: false, isOval: true },
  { name: 'Kostal', color: '#003087', hasImage: false },
  { name: 'JA Solar', color: '#F7931E', hasImage: false },
  { name: 'Trina Solar', color: '#1E3799', hasImage: false },
  { name: 'LONGi', color: '#00A950', hasImage: false },
  { name: 'Canadian Solar', color: '#003366', hasImage: false, hasStar: true },
]

// Brand Logo Component - uses real logos where available, styled text for others
function BrandLogo({ brand }: { brand: typeof brands[0] }) {
  if (brand.hasImage && brand.logo) {
    return (
      <div style={{ height: 32, display: 'flex', alignItems: 'center' }}>
        <Image
          src={brand.logo}
          alt={brand.name}
          width={120}
          height={32}
          style={{ height: 28, width: 'auto', objectFit: 'contain' }}
          unoptimized
        />
      </div>
    )
  }

  // Special styling for certain brands
  if (brand.name === 'SMA') {
    return (
      <div style={{
        background: brand.color,
        padding: '8px 20px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '2px',
        }}>
          SMA
        </span>
      </div>
    )
  }

  if (brand.name === 'BYD') {
    return (
      <div style={{
        background: brand.color,
        padding: '6px 24px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '1px',
        }}>
          BYD
        </span>
      </div>
    )
  }

  if (brand.name === 'Canadian Solar') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#E31937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        </div>
        <span style={{
          color: brand.color,
          fontSize: '16px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          Canadian Solar
        </span>
      </div>
    )
  }

  // Default text logo with brand color
  return (
    <span style={{
      color: brand.color,
      fontSize: '18px',
      fontWeight: 700,
      whiteSpace: 'nowrap',
      letterSpacing: brand.name === 'SUNGROW' ? '1px' : '0',
    }}>
      {brand.name}
    </span>
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
          transform: scale(1.03);
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
