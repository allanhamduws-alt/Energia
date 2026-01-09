'use client'

import Link from 'next/link'

const benefits = [
  { text: 'Immer der schärfste Preis', icon: 'price' },
  { text: 'Echtzeit-Bestand und Verfügbarkeit', icon: 'chart' },
  { text: 'Kauf auf Rechnung möglich', icon: 'document' },
  { text: 'Direkte Kontakte zu Distributoren', icon: 'handshake' },
  { text: '10.000+ Installateure vertrauen uns', icon: 'users' },
  { text: 'Persönliche Beratung', icon: 'message' },
]

// Check Icon for benefits
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export function TrustSection() {
  return (
    <section
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        background: '#2563eb',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="trust-grid"
        >
          {/* Left Content */}
          <div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Warum Energia?
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              Warum uns Installateure und Händler vertrauen
            </h2>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '32px',
              }}
            >
              Werden Sie Teil unseres Netzwerks smarter Installateure, die effizient einkaufen 
              und erfolgreich arbeiten.
            </p>
            <Link
              href="/kontakt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: 'white',
                color: '#2563eb',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '8px',
              }}
            >
              Jetzt registrieren
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right Content - Benefits Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
            className="benefits-grid"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '20px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon />
                </div>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: 500, 
                  color: 'white', 
                  lineHeight: 1.5, 
                  paddingTop: '6px' 
                }}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .trust-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 640px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
