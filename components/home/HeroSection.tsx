'use client'

import Link from 'next/link'

// Professional SVG Icons for Info-Leiste
const icons = {
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  star: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
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
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Main Area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.9) 100%)',
          backgroundImage: 'url(/images/hero/solar-panel.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Light Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.6) 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '80px' }}>
          {/* Text Content - Left Aligned */}
          <div style={{ maxWidth: '600px' }}>
            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#171717',
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}
            >
              Wir versorgen Großhändler,
              <br />
              Reseller und Installateure.
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: '#525252',
                marginBottom: '36px',
                maxWidth: '520px',
              }}
            >
              Keine Warteschlangen, direkte Kommunikation, sofortige Verfügbarkeit.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/produkte"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: '#16a34a',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '8px',
                }}
              >
                Produkte ansehen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="/kontakt"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  background: 'white',
                  color: '#171717',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                }}
              >
                Kontakt aufnehmen
              </Link>
            </div>
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
                style={{
                  background: 'white',
                  padding: '28px 20px',
                  textAlign: 'center',
                }}
              >
                {/* Icon */}
                <div
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
