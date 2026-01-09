'use client'

import Link from 'next/link'

const brands = [
  {
    name: 'SMA',
    category: 'Wechselrichter',
    description: 'Deutscher Premium-Hersteller für Wechselrichter und Energiemanagement-Systeme. Weltmarktführer mit über 40 Jahren Erfahrung.',
    highlights: ['Made in Germany', 'Weltmarktführer', '40+ Jahre Erfahrung'],
  },
  {
    name: 'Sungrow',
    category: 'Wechselrichter & Speicher',
    description: 'Einer der weltweit größten Hersteller von Wechselrichtern und Speichersystemen. Innovative Lösungen für alle Anlagengrößen.',
    highlights: ['Global Player', 'Innovation Leader', 'Breites Portfolio'],
  },
  {
    name: 'Huawei',
    category: 'Module & Wechselrichter',
    description: 'Technologieführer mit intelligenten PV-Lösungen. Bekannt für höchste Wirkungsgrade und Smart-PV-Integration.',
    highlights: ['Höchste Effizienz', 'Smart Integration', 'KI-Optimierung'],
  },
  {
    name: 'Aiko',
    category: 'Module',
    description: 'Innovativer Modulhersteller mit Fokus auf hocheffiziente Solarzellen. ABC-Technologie für maximale Leistung.',
    highlights: ['ABC-Technologie', 'N-Type Zellen', 'Premium Qualität'],
  },
  {
    name: 'BYD',
    category: 'Batteriespeicher',
    description: 'Führender Hersteller von Batteriespeichern mit LiFePO4-Technologie. Bekannt für Sicherheit und Langlebigkeit.',
    highlights: ['LiFePO4', 'Höchste Sicherheit', 'Modular skalierbar'],
  },
  {
    name: 'Kostal',
    category: 'Wechselrichter',
    description: 'Deutscher Hersteller für Wechselrichter und Energiemanagement. Kompakte Lösungen mit hoher Effizienz.',
    highlights: ['Made in Germany', 'Kompakt', 'Smart Energy'],
  },
]

export default function MarkenPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Unsere Marken
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#525252', lineHeight: 1.7 }}>
            Wir arbeiten mit führenden Herstellern der Solarbranche zusammen. 
            Qualität und Zuverlässigkeit, auf die Sie sich verlassen können.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section style={{ paddingTop: '40px', paddingBottom: '160px' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                style={{
                  background: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '32px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a' }}>
                    {brand.name}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#737373' }}>{brand.category}</span>
                </div>
                <p style={{ color: '#525252', marginBottom: '24px', lineHeight: 1.7 }}>
                  {brand.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {brand.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: '#f0fdf4',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#16a34a',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

      {/* CTA */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: '#fafafa' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
            Weitere Marken über unser Netzwerk
          </h2>
          <p style={{ color: '#525252', marginBottom: '32px' }}>
            Sie suchen eine bestimmte Marke oder ein spezielles Produkt? Über unser Netzwerk 
            haben wir Zugang zu weiteren Herstellern und können auch spezifische Anfragen bedienen.
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
            Jetzt anfragen
          </Link>
        </div>
      </section>
    </main>
  )
}
