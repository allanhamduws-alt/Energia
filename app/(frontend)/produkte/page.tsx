'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useScrollAnimation, useScrollAnimationGroup } from '@/lib/useScrollAnimation'

const categories = [
  {
    id: 'module',
    name: 'Solarmodule',
    icon: '☀️',
    image: '/images/products/solar-module.png',
    description: 'Hochwertige Solarmodule von führenden Herstellern. Monokristallin, polykristallin und bifaziale Module für alle Anwendungsbereiche.',
    highlight: 'Premium N-Type & TOPCon',
    products: [
      { name: 'AIKO 475W', subtitle: 'AIKO-A475-MAH54Dw', specs: ['475W', 'Fullblack', 'N-Type'], featured: true },
      { name: 'Trina Solar 445W', subtitle: 'TSM-445NEG9R.28', specs: ['445W', 'Black frame', 'TOPCon'] },
      { name: 'JA Solar 535W', subtitle: 'JAM72D30-535/MB', specs: ['535W', 'Bifazial', 'N-Type'] },
      { name: 'LONGi 450W', subtitle: 'LR5-72HPH-450M', specs: ['450W', 'Hi-MO 5', 'Mono'] },
    ],
    specs: {
      'Leistung': '400W - 700W+',
      'Technologie': 'Mono, Bifazial, TOPCon',
      'Garantie': 'Bis zu 30 Jahre',
      'Wirkungsgrad': 'Bis zu 22.8%',
    },
    gradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
  },
  {
    id: 'wechselrichter',
    name: 'Wechselrichter',
    icon: '⚡',
    image: '/images/products/inverter.png',
    description: 'String- und Hybridwechselrichter für Privat- und Gewerbeanlagen. Zuverlässige Technik von Marktführern wie SMA, Huawei und Sungrow.',
    highlight: 'Hybrid & String Solutions',
    products: [
      { name: 'Sungrow SH5.0RS', subtitle: 'Hybrid Wechselrichter', specs: ['5kW', '1-Phase', 'Hybrid'], featured: true },
      { name: 'SMA Sunny Tripower', subtitle: 'STP 10.0-3AV-40', specs: ['10kW', '3-Phasen', 'Smart'] },
      { name: 'Huawei SUN2000', subtitle: 'SUN2000-10KTL-M1', specs: ['10kW', 'High Efficiency', 'AI'] },
      { name: 'Kostal PLENTICORE', subtitle: 'PLENTICORE plus 10', specs: ['10kW', 'Made in Germany', 'Hybrid'] },
    ],
    specs: {
      'Leistung': '3kW - 250kW+',
      'Typen': 'String, Hybrid, Zentral',
      'Phasen': '1-phasig & 3-phasig',
      'Wirkungsgrad': 'Bis zu 98.6%',
    },
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  },
  {
    id: 'speicher',
    name: 'Batteriespeicher',
    icon: '🔋',
    image: '/images/products/battery.png',
    description: 'Moderne Batteriespeicher für maximale Eigenverbrauchsoptimierung. LFP-Technologie garantiert Sicherheit und Langlebigkeit.',
    highlight: 'LFP-Technologie',
    products: [
      { name: 'SMA Sunny Boy Storage', subtitle: 'Home Storage', specs: ['5.0 kWh', 'LFP', 'Modular'], featured: true },
      { name: 'BYD Battery-Box', subtitle: 'HVS 10.2', specs: ['10.2 kWh', 'LFP', 'Premium'] },
      { name: 'Huawei LUNA2000', subtitle: 'LUNA2000-10-S0', specs: ['10 kWh', 'LFP', 'Smart'] },
      { name: 'Sungrow SBR', subtitle: 'SBR128', specs: ['12.8 kWh', 'Modular', 'Stackable'] },
    ],
    specs: {
      'Kapazität': '5kWh - 100kWh+',
      'Technologie': 'LFP (LiFePO4)',
      'Lebensdauer': '6000+ Zyklen',
      'Garantie': 'Bis zu 15 Jahre',
    },
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
]

export default function ProduktePage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridVisible] = useScrollAnimationGroup(categories.length, { threshold: 0.1 })

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Hero Section with Gradient Background */}
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
        {/* Decorative Gradient Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(22, 163, 74, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
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
              B2B Solarhandel • Premium Produkte
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
              Unser{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Produktportfolio
              </span>
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--gray-300)',
                lineHeight: 1.7,
                maxWidth: '600px',
                margin: '0 auto 40px',
              }}
            >
              Qualitätsprodukte für Ihren B2B-Bedarf – von Modulen über Wechselrichter bis zu
              Speicherlösungen. Alle Top-Marken aus einer Hand.
            </p>

            {/* Quick Navigation Pills */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '999px',
                    color: 'var(--gray-200)',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(22, 163, 74, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(22, 163, 74, 0.4)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.color = 'var(--gray-200)'
                  }}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview Grid */}
      <section
        style={{
          paddingTop: '100px',
          paddingBottom: '40px',
          background: 'var(--white)',
        }}
      >
        <div className="container">
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {categories.map((category, index) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="card-hover"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid var(--gray-200)',
                  textDecoration: 'none',
                  opacity: gridVisible[index] ? 1 : 0,
                  transform: gridVisible[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.15}s`,
                }}
              >
                {/* Category Image Container */}
                <div
                  style={{
                    position: 'relative',
                    height: '200px',
                    background: category.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative Pattern */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                      opacity: 0.5,
                    }}
                  />

                  {/* Product Image */}
                  <div
                    className="product-image-hover"
                    style={{
                      position: 'relative',
                      width: '160px',
                      height: '160px',
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                      }}
                    />
                  </div>

                  {/* Highlight Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '6px 12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '999px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {category.highlight}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '28px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{category.icon}</span>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--gray-900)',
                      }}
                    >
                      {category.name}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: '15px',
                      color: 'var(--gray-600)',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    {category.description}
                  </p>

                  {/* Quick Stats */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      paddingTop: '20px',
                      borderTop: '1px solid var(--gray-100)',
                    }}
                  >
                    {Object.entries(category.specs).slice(0, 2).map(([key, value]) => (
                      <div key={key}>
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>
                          {key}
                        </p>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-900)' }}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* View More Link */}
                  <div
                    style={{
                      marginTop: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--green-600)',
                      fontSize: '15px',
                      fontWeight: 600,
                    }}
                  >
                    Alle Produkte ansehen
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Category Sections */}
      {categories.map((category, catIndex) => (
        <CategorySection key={category.id} category={category} index={catIndex} />
      ))}

      {/* CTA Section */}
      <section
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

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '20px',
              }}
            >
              Bereit für Ihre{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Bestellung?
              </span>
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-300)',
                marginBottom: '40px',
                lineHeight: 1.7,
              }}
            >
              Kontaktieren Sie uns für individuelle Angebote, Mengenrabatte und persönliche Beratung.
              Wir sind Ihr zuverlässiger B2B-Partner für Solarprodukte.
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
                className="btn-pulse"
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
                Anfrage stellen
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/termin"
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
                Termin vereinbaren
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Separate component for category sections to use hooks properly
function CategorySection({ category, index }: { category: typeof categories[0]; index: number }) {
  const [sectionRef, sectionVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [productsRef, productsVisible] = useScrollAnimationGroup(category.products.length, { threshold: 0.1 })

  return (
    <section
      id={category.id}
      ref={sectionRef}
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        background: index % 2 === 0 ? 'var(--gray-50)' : 'white',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Left - Category Info */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: category.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}
              >
                {category.icon}
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--gray-900)',
                }}
              >
                {category.name}
              </h2>
            </div>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-600)',
                marginBottom: '40px',
                lineHeight: 1.7,
              }}
            >
              {category.description}
            </p>

            {/* Products List */}
            <div
              ref={productsRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {category.products.map((product, i) => (
                <div
                  key={i}
                  className="product-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    background: 'white',
                    borderRadius: '16px',
                    border: product.featured ? '2px solid var(--green-500)' : '1px solid var(--gray-200)',
                    flexWrap: 'wrap',
                    gap: '16px',
                    opacity: productsVisible[i] ? 1 : 0,
                    transform: productsVisible[i] ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${i * 0.1}s`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Featured Badge */}
                  {product.featured && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '4px 10px',
                        background: 'var(--green-500)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: '999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Empfohlen
                    </span>
                  )}

                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--gray-900)' }}>
                      {product.name}
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '4px' }}>
                      {product.subtitle}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.specs.map((spec, j) => (
                      <span
                        key={j}
                        style={{
                          padding: '6px 14px',
                          background: 'var(--gray-100)',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--gray-700)',
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--gray-500)',
                marginTop: '24px',
              }}
            >
              ✓ Weitere Produkte auf Anfrage verfügbar
            </p>
          </div>

          {/* Right - Specs Card with Image */}
          <div
            style={{
              position: 'sticky',
              top: '120px',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            {/* Product Showcase */}
            <div
              style={{
                background: category.gradient,
                borderRadius: '24px',
                padding: '40px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '280px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative Pattern */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.5,
                }}
              />

              <div
                className="float-slow"
                style={{
                  position: 'relative',
                  width: '220px',
                  height: '220px',
                }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                  }}
                />
              </div>
            </div>

            {/* Specs Card */}
            <div
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: '20px',
                padding: '32px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--gray-900)',
                  marginBottom: '24px',
                }}
              >
                Technische Übersicht
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {Object.entries(category.specs).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--gray-100)',
                    }}
                  >
                    <span style={{ color: 'var(--gray-600)' }}>{key}</span>
                    <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{value}</span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--gray-500)',
                  marginTop: '24px',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}
              >
                Individuelle Anfrage? Kontaktieren Sie uns für spezifische Produktanforderungen und Mengenrabatte.
              </p>
              <Link
                href="/kontakt"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px 24px',
                  background: category.gradient,
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                }}
              >
                Anfrage stellen →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
