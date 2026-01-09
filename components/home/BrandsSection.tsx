'use client'

const brands = [
  'SMA',
  'Sungrow',
  'Huawei',
  'Aiko',
  'BYD',
  'Kostal',
  'JA Solar',
  'Trina',
  'LONGi',
  'Canadian Solar',
]

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
        <div className="marquee">
          <div className="marquee-content">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                style={{
                  flexShrink: 0,
                  padding: '14px 36px',
                  background: '#fafafa',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0',
                }}
              >
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#737373',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {brand}
                </span>
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`dup-${brand}-${index}`}
                style={{
                  flexShrink: 0,
                  padding: '14px 36px',
                  background: '#fafafa',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0',
                }}
              >
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#737373',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          display: flex;
          overflow: hidden;
          gap: 24px;
        }
        
        .marquee-content {
          display: flex;
          gap: 24px;
          animation: scroll 40s linear infinite;
        }
        
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        
        .marquee:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
