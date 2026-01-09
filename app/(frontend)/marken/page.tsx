'use client'

import Link from 'next/link'
import { useScrollAnimation, useScrollAnimationGroup } from '@/lib/useScrollAnimation'

const brands = [
  {
    name: 'SMA',
    category: 'Wechselrichter & Speicher',
    logo: 'SMA',
    color: '#cc0000',
    description: 'Deutscher Premium-Hersteller für Wechselrichter und Energiemanagement-Systeme. Weltmarktführer mit über 40 Jahren Erfahrung.',
    highlights: ['Made in Germany', 'Weltmarktführer', '40+ Jahre Erfahrung'],
    products: ['Sunny Tripower', 'Sunny Boy Storage', 'CORE2'],
  },
  {
    name: 'Sungrow',
    category: 'Wechselrichter & Speicher',
    logo: 'Sungrow',
    color: '#ed1c24',
    description: 'Einer der weltweit größten Hersteller von Wechselrichtern und Speichersystemen. Innovative Lösungen für alle Anlagengrößen.',
    highlights: ['Global Player', 'Innovation Leader', 'Breites Portfolio'],
    products: ['SH5.0RS', 'SG10RT', 'SBR128 Speicher'],
  },
  {
    name: 'Huawei',
    category: 'Wechselrichter & Speicher',
    logo: 'HUAWEI',
    color: '#cf0a2c',
    description: 'Technologieführer mit intelligenten PV-Lösungen. Bekannt für höchste Wirkungsgrade und Smart-PV-Integration.',
    highlights: ['Höchste Effizienz', 'Smart Integration', 'KI-Optimierung'],
    products: ['SUN2000', 'LUNA2000', 'Smart Logger'],
  },
  {
    name: 'AIKO',
    category: 'Solarmodule',
    logo: 'AIKO',
    color: '#00a651',
    description: 'Innovativer Modulhersteller mit Fokus auf hocheffiziente Solarzellen. ABC-Technologie für maximale Leistung.',
    highlights: ['ABC-Technologie', 'N-Type Zellen', 'Premium Qualität'],
    products: ['Neostar 2S', 'A475-MAH54Dw', 'Fullblack Module'],
  },
  {
    name: 'BYD',
    category: 'Batteriespeicher',
    logo: 'BYD',
    color: '#1a63b1',
    description: 'Führender Hersteller von Batteriespeichern mit LiFePO4-Technologie. Bekannt für Sicherheit und Langlebigkeit.',
    highlights: ['LiFePO4', 'Höchste Sicherheit', 'Modular skalierbar'],
    products: ['Battery-Box Premium HVS', 'Battery-Box LV Flex', 'HVM Series'],
  },
  {
    name: 'Kostal',
    category: 'Wechselrichter',
    logo: 'KOSTAL',
    color: '#004990',
    description: 'Deutscher Hersteller für Wechselrichter und Energiemanagement. Kompakte Lösungen mit hoher Effizienz.',
    highlights: ['Made in Germany', 'Kompakt', 'Smart Energy'],
    products: ['PLENTICORE plus', 'PIKO MP plus', 'Smart Energy Meter'],
  },
  {
    name: 'JA Solar',
    category: 'Solarmodule',
    logo: 'JA Solar',
    color: '#f7931e',
    description: 'Einer der weltweit größten Modulhersteller. Bekannt für zuverlässige Qualität und hervorragendes Preis-Leistungs-Verhältnis.',
    highlights: ['Top 3 Weltweit', 'DeepBlue Serie', 'Bifazial Experte'],
    products: ['JAM72D30', 'DeepBlue 4.0', 'Tiger Neo'],
  },
  {
    name: 'Trina Solar',
    category: 'Solarmodule',
    logo: 'Trina',
    color: '#1e3799',
    description: 'Globaler Technologieführer in der PV-Branche. Vertex-Module setzen neue Maßstäbe in Effizienz und Leistung.',
    highlights: ['Vertex Technologie', 'Tier 1 Hersteller', '25+ Jahre Erfahrung'],
    products: ['Vertex S+', 'Vertex N', 'TSM-NEG9R.28'],
  },
]

export default function MarkenPage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [logoGridRef, logoGridVisible] = useScrollAnimationGroup(brands.length, { threshold: 0.1 })
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          paddingTop: '100px',
          paddingBottom: '80px',
          background: 'linear-gradient(180deg, var(--slate-900) 0%, #1a1f2e 50%, var(--slate-900) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(22, 163, 74, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'rgba(22, 163, 74, 0.15)',
                border: '1px solid rgba(22, 163, 74, 0.3)',
                borderRadius: '999px',
                color: 'var(--green-500)',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '24px',
              }}
            >
              Premium Partner • Qualität garantiert
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '24px',
                lineHeight: 1.1,
              }}
            >
              Unsere{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Partnermarken
              </span>
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--gray-300)',
                lineHeight: 1.7,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Wir arbeiten mit führenden Herstellern der Solarbranche zusammen.
              Qualität und Zuverlässigkeit, auf die Sie sich verlassen können.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Showcase Banner */}
      <section
        style={{
          padding: '60px 0',
          background: 'white',
          borderBottom: '1px solid var(--gray-200)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '40px',
            }}
          >
            {brands.slice(0, 6).map((brand) => (
              <a
                key={brand.name}
                href={`#${brand.name.toLowerCase()}`}
                className="brand-logo"
                style={{
                  padding: '20px 30px',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brand.color
                  e.currentTarget.style.filter = 'grayscale(0%)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--gray-700)'
                  e.currentTarget.style.filter = 'grayscale(100%)'
                }}
              >
                {brand.logo}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section
        ref={logoGridRef}
        style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          background: 'var(--gray-50)',
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--gray-900)',
                marginBottom: '16px',
              }}
            >
              Partner für Qualität & Innovation
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-600)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Alle Top-Marken aus einer Hand – für Module, Wechselrichter und Speichersysteme.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '28px',
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                id={brand.name.toLowerCase()}
                className="card-hover"
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  opacity: logoGridVisible[index] ? 1 : 0,
                  transform: logoGridVisible[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.08}s`,
                }}
              >
                {/* Brand Header with Logo */}
                <div
                  style={{
                    padding: '32px',
                    background: `linear-gradient(135deg, ${brand.color}15 0%, ${brand.color}05 100%)`,
                    borderBottom: '1px solid var(--gray-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    {/* Logo Text */}
                    <div
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: brand.color,
                        letterSpacing: '-0.5px',
                      }}
                    >
                      {brand.logo}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '6px 14px',
                      background: 'white',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--gray-600)',
                      border: '1px solid var(--gray-200)',
                    }}
                  >
                    {brand.category}
                  </span>
                </div>

                {/* Brand Content */}
                <div style={{ padding: '28px 32px' }}>
                  <p
                    style={{
                      fontSize: '15px',
                      color: 'var(--gray-600)',
                      lineHeight: 1.7,
                      marginBottom: '24px',
                    }}
                  >
                    {brand.description}
                  </p>

                  {/* Highlights */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '24px',
                    }}
                  >
                    {brand.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          background: 'var(--green-50)',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--green-700)',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Products */}
                  <div
                    style={{
                      paddingTop: '20px',
                      borderTop: '1px solid var(--gray-100)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--gray-500)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px',
                      }}
                    >
                      Top Produkte
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      {brand.products.map((product, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '6px 12px',
                            background: 'var(--gray-100)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: 'var(--gray-700)',
                          }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        style={{
          padding: '80px 0',
          background: 'white',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              textAlign: 'center',
            }}
          >
            <StatItem value="8+" label="Premium Marken" />
            <StatItem value="100+" label="Produkte verfügbar" />
            <StatItem value="50+" label="MW verbaut" />
            <StatItem value="10+" label="Jahre Erfahrung" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        style={{
          padding: '100px 0',
          background: 'var(--slate-900)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Gradient */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(22, 163, 74, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '20px',
            }}
          >
            Weitere{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Marken
            </span>{' '}
            über unser Netzwerk
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--gray-300)',
              marginBottom: '40px',
              lineHeight: 1.7,
            }}
          >
            Sie suchen eine bestimmte Marke oder ein spezielles Produkt? Über unser Netzwerk
            haben wir Zugang zu weiteren Herstellern und können auch spezifische Anfragen bedienen.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/kontakt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: 'var(--green-600)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              Jetzt anfragen
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/produkte"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              Produkte ansehen
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// StatItem Component
function StatItem({ value, label }: { value: string; label: string }) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
      }}
    >
      <p
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 700,
          background: 'linear-gradient(135deg, var(--green-600), var(--emerald-600))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: '1rem',
          color: 'var(--gray-600)',
          fontWeight: 500,
        }}
      >
        {label}
      </p>
    </div>
  )
}
