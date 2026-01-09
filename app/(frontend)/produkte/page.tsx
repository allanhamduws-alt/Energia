'use client'

import Link from 'next/link'

const categories = [
  {
    id: 'module',
    name: 'Solarmodule',
    description: 'Hochwertige Solarmodule von führenden Herstellern. Monokristallin, polykristallin und bifaziale Module für alle Anwendungsbereiche.',
    products: [
      { name: 'Trina Solar 445W', subtitle: 'TSM-445NEG9R.28', specs: ['445W', 'Black frame', 'N-Type'] },
      { name: 'JA Solar 535W', subtitle: 'JAM72D30-535/MB', specs: ['535W', 'Bifazial', 'N-Type'] },
      { name: 'AIKO 475W', subtitle: 'AIKO-A475-MAH54Dw', specs: ['475W', 'Silver frame', 'Glass-Glass'] },
      { name: 'LONGi 450W', subtitle: 'LR5-72HPH-450M', specs: ['450W', 'Hi-MO 5', 'Mono'] },
    ],
    specs: {
      'Leistung': '400W - 700W+',
      'Technologie': 'Mono, Bifazial, TOPCon',
      'Garantie': 'Herstellergarantie',
    },
  },
  {
    id: 'wechselrichter',
    name: 'Wechselrichter',
    description: 'String- und Hybridwechselrichter für Privat- und Gewerbeanlagen. Zuverlässige Technik von Marktführern.',
    products: [
      { name: 'SMA Sunny Tripower', subtitle: 'STP 10.0-3AV-40', specs: ['10kW', '3-Phasen', 'Hybrid'] },
      { name: 'Huawei SUN2000', subtitle: 'SUN2000-10KTL-M1', specs: ['10kW', 'High Efficiency', 'Smart'] },
      { name: 'Sungrow SG10RT', subtitle: 'SG10RT', specs: ['10kW', '3-Phasen', 'Hybrid'] },
      { name: 'Kostal PLENTICORE', subtitle: 'PLENTICORE plus 10', specs: ['10kW', 'Hybrid', 'Made in Germany'] },
    ],
    specs: {
      'Leistung': '3kW - 250kW+',
      'Typen': 'String, Hybrid, Zentral',
      'Phasen': '1-phasig & 3-phasig',
    },
  },
  {
    id: 'speicher',
    name: 'Batteriespeicher',
    description: 'Moderne Batteriespeicher für maximale Eigenverbrauchsoptimierung. LFP-Technologie für Sicherheit und Langlebigkeit.',
    products: [
      { name: 'BYD Battery-Box', subtitle: 'HVS 10.2', specs: ['10.2 kWh', 'LFP', 'Modular'] },
      { name: 'Huawei LUNA2000', subtitle: 'LUNA2000-10-S0', specs: ['10 kWh', 'LFP', 'Stackable'] },
      { name: 'Sungrow SBR', subtitle: 'SBR128', specs: ['12.8 kWh', 'LFP', 'Modular'] },
    ],
    specs: {
      'Kapazität': '5kWh - 100kWh+',
      'Technologie': 'LFP (LiFePO4)',
      'Installation': 'Modular erweiterbar',
    },
  },
]

export default function ProduktePage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Unser Produktportfolio
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#525252', lineHeight: 1.7 }}>
            Qualitätsprodukte für Ihren B2B-Bedarf – von Modulen über Wechselrichter bis zu 
            Speicherlösungen. Alle Top-Marken aus einer Hand.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          style={{
            paddingTop: '100px',
            paddingBottom: '100px',
            borderTop: '1px solid #e5e5e5',
          }}
        >
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Left - Category Info */}
              <div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
                  {category.name}
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#525252', marginBottom: '32px', lineHeight: 1.7 }}>
                  {category.description}
                </p>

                {/* Products List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {category.products.map((product, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        background: '#fafafa',
                        borderRadius: '8px',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 600, color: '#171717' }}>{product.name}</p>
                        <p style={{ fontSize: '14px', color: '#737373' }}>{product.subtitle}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {product.specs.slice(0, 2).map((spec, j) => (
                          <span
                            key={j}
                            style={{
                              padding: '4px 10px',
                              background: 'white',
                              border: '1px solid #e5e5e5',
                              borderRadius: '4px',
                              fontSize: '12px',
                              color: '#525252',
                            }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: '#737373' }}>
                  Weitere Produkte auf Anfrage verfügbar.
                </p>
              </div>

              {/* Right - Specs Card */}
              <div
                style={{
                  background: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '32px',
                  height: 'fit-content',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#171717', marginBottom: '24px' }}>
                  Technische Übersicht
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(category.specs).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f5f5f5' }}>
                      <span style={{ color: '#737373' }}>{key}</span>
                      <span style={{ fontWeight: 600, color: '#171717' }}>{value}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#737373', marginTop: '24px', marginBottom: '24px' }}>
                  Individuelle Anfrage? Kontaktieren Sie uns für spezifische Produktanforderungen und Mengenrabatte.
                </p>
                <Link
                  href="/kontakt"
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
                  Anfrage stellen
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
