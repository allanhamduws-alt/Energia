'use client'

import Link from 'next/link'

export default function DealPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: '#f0fdf4',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#16a34a',
              marginBottom: '24px',
            }}
          >
            Deal der Woche
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Wöchentliche Sonderangebote
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#525252', lineHeight: 1.7 }}>
            Jeden Montag neue Angebote mit attraktiven B2B-Konditionen 
            für ausgewählte Photovoltaik-Produkte.
          </p>
        </div>
      </section>

      {/* Current Deal */}
      <section style={{ paddingBottom: '120px' }}>
        <div className="container">
          <div
            style={{
              background: '#fafafa',
              borderRadius: '16px',
              padding: '60px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: '#16a34a',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '32px',
              }}
            >
              Aktuelles Angebot
            </div>

            {/* Product Placeholder */}
            <div
              style={{
                maxWidth: '400px',
                margin: '0 auto 40px',
                aspectRatio: '4/3',
                background: '#e5e5e5',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="64" height="64" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.3 }}>
                <rect x="8" y="12" width="32" height="24" rx="2" stroke="#737373" strokeWidth="2"/>
                <line x1="8" y1="20" x2="40" y2="20" stroke="#737373" strokeWidth="1.5"/>
                <line x1="8" y1="28" x2="40" y2="28" stroke="#737373" strokeWidth="1.5"/>
                <line x1="18" y1="12" x2="18" y2="36" stroke="#737373" strokeWidth="1.5"/>
                <line x1="30" y1="12" x2="30" y2="36" stroke="#737373" strokeWidth="1.5"/>
              </svg>
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
              Aktuelle Sonderaktion
            </h2>
            <p style={{ color: '#525252', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Kontaktieren Sie uns für Informationen zum aktuellen Deal der Woche. 
              Die Angebote sind zeitlich begrenzt und gelten solange der Vorrat reicht.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/kontakt"
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
                }}
              >
                Jetzt anfragen
              </Link>
              <a
                href="tel:+4916373673663"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  background: 'white',
                  color: '#171717',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Anrufen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Info */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: '#171717' }}>
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>
                Jeden Montag neu
              </h3>
              <p style={{ color: '#a3a3a3' }}>
                Wöchentlich wechselnde Angebote für verschiedene Produktkategorien.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>
                B2B-Konditionen
              </h3>
              <p style={{ color: '#a3a3a3' }}>
                Attraktive Preise exklusiv für Gewerbetreibende und Händler.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>
                Begrenzte Stückzahl
              </h3>
              <p style={{ color: '#a3a3a3' }}>
                Schnell sein lohnt sich – Angebote gelten solange der Vorrat reicht.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
