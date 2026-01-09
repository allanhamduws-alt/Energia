'use client'

import Link from 'next/link'

const values = [
  {
    title: 'B2B-Fokus',
    description: 'Wir sind spezialisiert auf die Bedürfnisse von Installateuren, Händlern und Projektentwicklern.',
  },
  {
    title: 'Starkes Netzwerk',
    description: 'Durch unser Netzwerk haben wir Zugang zu einem breiten Spektrum an Produkten und Herstellern.',
  },
  {
    title: 'Langfristige Partnerschaften',
    description: 'Wir setzen auf nachhaltige Geschäftsbeziehungen statt kurzfristiger Gewinne.',
  },
  {
    title: 'Flexible Lösungen',
    description: 'Ob kleine Mengen oder Großprojekte – wir finden die passende Lösung für Ihren Bedarf.',
  },
]

export default function UeberUnsPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Energia Supply Solution
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#525252', lineHeight: 1.7 }}>
            Ihr zuverlässiger B2B-Partner für Photovoltaik-Produkte in Deutschland und Europa. 
            Großhandel, Beschaffung und flexible Lösungen aus einer Hand.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section style={{ paddingTop: '40px', paddingBottom: '120px' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Text Content */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
                Wer wir sind
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#525252', lineHeight: 1.8 }}>
                <p>
                  <strong style={{ color: '#171717' }}>Energia Supply Solution</strong> ist Ihr spezialisierter B2B-Handelspartner für 
                  Photovoltaik-Produkte. Wir verstehen uns als Bindeglied zwischen 
                  Herstellern und professionellen Anwendern – Händler, Installateure und 
                  Projektentwickler.
                </p>
                <p>
                  Durch unser <strong style={{ color: '#171717' }}>Netzwerk</strong> und unsere Erfahrung im Solarmarkt können wir 
                  Ihnen nicht nur Standardprodukte, sondern auch individuelle 
                  Beschaffungslösungen anbieten. Was nicht auf unserer Website steht, 
                  können wir oft über unser Netzwerk beschaffen.
                </p>
                <p>
                  Unser Fokus liegt auf <strong style={{ color: '#171717' }}>Qualität, Zuverlässigkeit und persönlichem 
                  Service</strong>. Wir arbeiten ausschließlich mit etablierten Herstellern und legen 
                  Wert auf langfristige Geschäftsbeziehungen.
                </p>
              </div>
            </div>

            {/* Right - Contact Card */}
            <div
              style={{
                background: '#fafafa',
                borderRadius: '16px',
                padding: '40px',
              }}
            >
              {/* Contact Person */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #e5e5e5' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    background: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  OB
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717' }}>
                    Ouissam Benabbou
                  </h3>
                  <p style={{ color: '#16a34a', fontWeight: 500 }}>Leitung B2B</p>
                </div>
              </div>

              <p style={{ color: '#525252', marginBottom: '24px', lineHeight: 1.7 }}>
                Ihr direkter Ansprechpartner für alle Anfragen rund um Photovoltaik-Produkte, 
                Preise und Verfügbarkeiten.
              </p>

              {/* Contact Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#525252' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>0163 73 73 663</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#525252' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>connect@energia-b2b.de</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#525252' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Schäferweg 6, 30952 Hannover</span>
                </div>
              </div>

              <Link
                href="/termin"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 24px',
                  background: '#16a34a',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '8px',
                }}
              >
                Telefontermin vereinbaren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingTop: '80px', paddingBottom: '120px', background: '#fafafa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
              Unsere Werte
            </h2>
            <p style={{ color: '#525252', maxWidth: '600px', margin: '0 auto' }}>
              Was uns antreibt und wie wir mit unseren Partnern zusammenarbeiten
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                style={{
                  background: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '32px',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#171717', marginBottom: '12px' }}>
                  {value.title}
                </h3>
                <p style={{ color: '#737373', lineHeight: 1.6 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
