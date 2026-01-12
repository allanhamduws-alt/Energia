'use client'

import Link from 'next/link'

// Professional SVG Icons for Info-Leiste
const icons = {
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  star: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

const stats = [
  { value: 'B2B', label: 'Spezialisiert', icon: 'target' },
  { value: 'EU', label: 'Liefergebiet', icon: 'globe' },
  { value: '6+', label: 'Premium-Marken', icon: 'star' },
  { value: '24h', label: 'Reaktionszeit', icon: 'clock' },
]

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Main Area with Gradient Blobs */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Gradient Blob Background - Bold & Prominent */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#fafafa',
            zIndex: 0,
          }}
        />
        
        {/* Big Green Blob - Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '70%',
            height: '90%',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.55) 0%, rgba(34, 197, 94, 0.3) 40%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
        
        {/* Teal/Cyan Blob - Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-15%',
            width: '65%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(16, 185, 129, 0.25) 50%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
        
        {/* Green Blob - Bottom Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-30%',
            right: '10%',
            width: '60%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(34, 197, 94, 0.2) 50%, transparent 70%)',
            filter: 'blur(70px)',
            zIndex: 0,
          }}
        />
        
        {/* Accent Blob - Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '50%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div 
          className="container" 
          style={{ 
            position: 'relative', 
            zIndex: 1, 
            paddingTop: '40px', 
            paddingBottom: '60px',
            textAlign: 'center',
          }}
        >
          {/* Headline */}
          <h1
            className="animate-on-scroll is-visible"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#171717',
              marginBottom: '24px',
              letterSpacing: '-0.025em',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Wir versorgen Großhändler,
            <br />
            Reseller und Installateure.
          </h1>

          {/* Subheadline */}
          <p
            className="animate-on-scroll is-visible delay-100"
            style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: '#525252',
              marginBottom: '40px',
              maxWidth: '550px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Keine Warteschlangen, direkte Kommunikation, sofortige Verfügbarkeit.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-on-scroll is-visible delay-200"
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/produkte"
              className="btn-pulse"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: '#16a34a',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              Produkte ansehen
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/kontakt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                color: '#171717',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </div>

      {/* Info-Leiste - Static, Horizontal with Icons */}
      <div
        style={{
          background: '#ffffff',
          borderTop: '1px solid #f0f0f0',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: '#f0f0f0',
            }}
            className="info-grid"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card-hover"
                style={{
                  background: 'white',
                  padding: '28px 20px',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Icon */}
                <div
                  className="icon-hover"
                  style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto 12px',
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                  }}
                >
                  {icons[stat.icon as keyof typeof icons]}
                </div>

                {/* Value */}
                <div
                  className="stat-number"
                  style={{
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    color: '#171717',
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div style={{ fontSize: '13px', color: '#737373', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .info-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
