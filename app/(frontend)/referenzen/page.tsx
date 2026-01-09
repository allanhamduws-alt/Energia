'use client'

import Link from 'next/link'

const stats = [
  { value: 'B2B', label: 'Fokussiert' },
  { value: 'EU', label: 'Liefergebiet' },
  { value: '6+', label: 'Top-Marken' },
  { value: '100%', label: 'Engagement' },
]

const projects = [
  {
    title: 'Großhandelsbelieferung Deutschland',
    type: 'Großhandel',
    description: 'Regelmäßige Belieferung eines etablierten PV-Großhändlers mit Modulen und Wechselrichtern verschiedener Hersteller.',
    highlights: ['Mehrere MW Modulleistung', 'Diverse Marken', 'Langfristige Partnerschaft'],
  },
  {
    title: 'Installationsbetrieb Versorgung',
    type: 'Installation',
    description: 'Kontinuierliche Versorgung eines Installationsbetriebs mit Wechselrichtern und Speichersystemen für Privatkundenanlagen.',
    highlights: ['Wechselrichter & Speicher', 'Schnelle Lieferung', 'Flexible Mengen'],
  },
  {
    title: 'Projektbeschaffung Europa',
    type: 'Projekt',
    description: 'Beschaffung von Modulen und Komponenten für Großprojekte im europäischen Ausland über unser Netzwerk.',
    highlights: ['Europaweite Lieferung', 'Großvolumen', 'Projektbasiert'],
  },
  {
    title: 'Spezialbeschaffung über Netzwerk',
    type: 'Netzwerk',
    description: 'Erfolgreiche Beschaffung spezifischer Produkte und Marken über unser Partnernetzwerk für individuelle Kundenanfragen.',
    highlights: ['Sonderanfragen', 'Netzwerk-Beschaffung', 'Individuelle Lösungen'],
  },
]

const testimonials = [
  {
    quote: 'Zuverlässige Abwicklung, faire Preise und immer erreichbar. Die Zusammenarbeit läuft unkompliziert und professionell.',
    author: 'PV-Installationsbetrieb',
    location: 'Norddeutschland',
  },
  {
    quote: 'Schnelle Reaktionszeiten und flexibel bei der Mengenbeschaffung. Genau das, was wir als Händler brauchen.',
    author: 'Solargroßhandel',
    location: 'Deutschland',
  },
  {
    quote: 'Auch bei speziellen Anfragen wird eine Lösung gefunden. Das Netzwerk macht den Unterschied.',
    author: 'Projektentwickler',
    location: 'Europa',
  },
]

export default function ReferenzenPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Vertrauen durch Erfahrung
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#525252', lineHeight: 1.7 }}>
            Erfahren Sie, wie wir B2B-Kunden in Deutschland und Europa mit 
            Qualitätsprodukten und zuverlässigem Service unterstützen.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div className="flex flex-wrap justify-center gap-16 lg:gap-20">
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#16a34a' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: '#737373', marginTop: '8px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: '#fafafa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
              Unsere Projekte & Kunden
            </h2>
            <p style={{ color: '#525252', maxWidth: '600px', margin: '0 auto' }}>
              Ein Auszug aus unseren Geschäftsbeziehungen und Projekten
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                style={{
                  background: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '32px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717' }}>
                    {project.title}
                  </h3>
                  <span
                    style={{
                      padding: '4px 12px',
                      background: '#f0fdf4',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#16a34a',
                    }}
                  >
                    {project.type}
                  </span>
                </div>
                <p style={{ color: '#525252', marginBottom: '20px', lineHeight: 1.7 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: '#fafafa',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#525252',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#171717' }}>
              Was unsere Kunden sagen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: '#fafafa',
                  borderRadius: '12px',
                  padding: '32px',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: '20px' }}>
                  <path d="M12 8H6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4v4c0 2.2-1.8 4-4 4v2c3.3 0 6-2.7 6-6V10c0-1.1-.9-2-2-2zm16 0h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4v4c0 2.2-1.8 4-4 4v2c3.3 0 6-2.7 6-6V10c0-1.1-.9-2-2-2z" fill="#16a34a"/>
                </svg>
                <p style={{ color: '#404040', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p style={{ fontWeight: 600, color: '#171717' }}>{testimonial.author}</p>
                  <p style={{ fontSize: '14px', color: '#737373' }}>{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: '#171717' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
            Werden Sie Teil unserer Erfolgsgeschichte
          </h2>
          <p style={{ color: '#a3a3a3', marginBottom: '32px' }}>
            Starten Sie eine Zusammenarbeit mit Energia und profitieren Sie von 
            zuverlässiger Qualität und persönlichem Service.
          </p>
          <Link
            href="/kontakt"
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
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </main>
  )
}
