'use client'

import Link from 'next/link'

const benefits = [
  'Persönliche Beratung zu Ihrem Bedarf',
  'Aktuelle Preise und Verfügbarkeiten',
  'Individuelle Projektanfragen',
  'Keine Wartezeiten',
]

// Professional Icons
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export function AppointmentSection() {
  return (
    <section
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        background: 'linear-gradient(135deg, #faf5ff 0%, #eff6ff 50%, #f0fdf4 100%)',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
          }}
          className="contact-grid"
        >
          {/* Left Content */}
          <div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#16a34a',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Kontakt
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: '#171717',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              Ihr direkter Ansprechpartner für B2B-Solarhandel
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#525252',
                marginBottom: '32px',
              }}
            >
              Lassen Sie uns in einem unverbindlichen Gespräch Ihre Anforderungen besprechen.
            </p>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href="tel:+4916373673663"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PhoneIcon />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#737373', marginBottom: '2px' }}>Telefon</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#171717' }}>0163 73 73 663</div>
                </div>
              </a>

              <a
                href="mailto:connect@energia-b2b.de"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MailIcon />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#737373', marginBottom: '2px' }}>E-Mail</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#171717' }}>connect@energia-b2b.de</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Appointment Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid #e5e5e5',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#f0fdf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <CalendarIcon />
            </div>

            <h3
              style={{
                fontSize: '1.375rem',
                fontWeight: 700,
                color: '#171717',
                marginBottom: '12px',
              }}
            >
              Telefontermin vereinbaren
            </h3>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#525252',
                marginBottom: '24px',
              }}
            >
              Sie möchten Preise, Verfügbarkeit oder größere Projekte besprechen? 
              Wählen Sie einfach einen passenden Telefontermin.
            </p>

            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {benefits.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#f0fdf4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckIcon />
                  </div>
                  <span style={{ fontSize: '14px', color: '#525252' }}>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/termin"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '16px',
                background: '#16a34a',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '8px',
              }}
            >
              Jetzt Termin buchen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
