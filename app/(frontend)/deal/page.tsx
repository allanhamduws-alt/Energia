'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useScrollAnimation, useScrollAnimationGroup } from '@/lib/useScrollAnimation'

interface Deal {
  id: string
  title: string
  name: string
  subtitle: string
  description: string
  imageUrl: string
  specs: { label: string; value: string }[]
  minOrder: string
  validUntil: string
  isActive: boolean
}

const fallbackDeal: Deal = {
  id: 'default',
  title: 'Deal der Woche',
  name: 'AIKO Neostar 2S 465W',
  subtitle: 'N-Type ABC Modul • Fullblack',
  description: 'Premium N-Type Solarmodul mit ABC-Technologie für maximale Leistung und Ästhetik. Dieses hocheffiziente Modul bietet exzellente Schattentoleranz und ist ideal für anspruchsvolle Installationen.',
  imageUrl: '/images/products/solar-module.png',
  specs: [
    { label: 'Leistung', value: '465W' },
    { label: 'Typ', value: 'N-Type ABC' },
    { label: 'Design', value: 'Fullblack' },
    { label: 'Wirkungsgrad', value: '22.6%' },
  ],
  minOrder: '100 Stück',
  validUntil: '2025-12-31',
  isActive: true,
}

const dealFeatures = [
  { icon: '📅', title: 'Jeden Montag neu', description: 'Wöchentlich wechselnde Angebote für verschiedene Produktkategorien.' },
  { icon: '💼', title: 'B2B-Konditionen', description: 'Attraktive Preise exklusiv für Gewerbetreibende und Händler.' },
  { icon: '⚡', title: 'Begrenzte Stückzahl', description: 'Schnell sein lohnt sich – Angebote gelten solange der Vorrat reicht.' },
]

export default function DealPage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [featuresRef, featuresVisible] = useScrollAnimationGroup(dealFeatures.length, { threshold: 0.1 })
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await fetch('/api/deals?active=true')
        if (response.ok) {
          const data = await response.json()
          if (data.deals && data.deals.length > 0) {
            const activeDeal = data.deals[0]
            setDeal({
              id: activeDeal.id,
              title: 'Deal der Woche',
              name: activeDeal.name,
              subtitle: activeDeal.subtitle || '',
              description: activeDeal.description,
              imageUrl: activeDeal.imageUrl || '/images/products/solar-module.png',
              specs: activeDeal.specs || [],
              minOrder: activeDeal.minOrder || '',
              validUntil: activeDeal.validUntil,
              isActive: activeDeal.isActive,
            })
          } else {
            setDeal(fallbackDeal)
          }
        } else {
          setDeal(fallbackDeal)
        }
      } catch {
        setDeal(fallbackDeal)
      } finally {
        setLoading(false)
      }
    }
    fetchDeal()
  }, [])

  const currentDeal = deal || fallbackDeal

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Hero Section with Gold Accents */}
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
        {/* Decorative Gold Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
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
            background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, transparent 70%)',
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
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '999px',
                color: 'var(--gold-400)',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '24px',
              }}
            >
              🔥 Hot Deal • Limitiertes Angebot
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
              Wöchentliche{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--gold-400), var(--gold-500))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sonderangebote
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
              Jeden Montag neue Angebote mit attraktiven B2B-Konditionen
              für ausgewählte Photovoltaik-Produkte.
            </p>
          </div>
        </div>
      </section>

      {/* Current Deal Section */}
      <section
        style={{
          padding: '100px 0',
          background: 'white',
        }}
      >
        <div className="container">
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px',
              }}
            >
              <div className="shimmer" style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto' }} />
              <p style={{ marginTop: '20px', color: 'var(--gray-500)' }}>Lade aktuelles Angebot...</p>
            </div>
          ) : (
            <div
              style={{
                background: 'linear-gradient(135deg, var(--slate-900) 0%, var(--slate-800) 100%)',
                borderRadius: '32px',
                overflow: 'hidden',
                padding: '60px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '60px',
                alignItems: 'center',
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  borderRadius: '24px',
                  padding: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                }}
              >
                {/* Hot Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, var(--gold-400), var(--gold-500))',
                    borderRadius: '999px',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  🔥 HOT DEAL
                </div>

                <div
                  className="float-slow"
                  style={{
                    position: 'relative',
                    width: '300px',
                    height: '300px',
                  }}
                >
                  <Image
                    src={currentDeal.imageUrl}
                    alt={currentDeal.name}
                    fill
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))',
                    }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div style={{ color: 'white' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    background: 'rgba(22, 163, 74, 0.2)',
                    borderRadius: '999px',
                    color: 'var(--green-400)',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '20px',
                  }}
                >
                  Aktuelles Angebot
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '8px',
                  }}
                >
                  {currentDeal.name}
                </h2>
                <p
                  style={{
                    fontSize: '1.125rem',
                    color: 'var(--gold-400)',
                    marginBottom: '24px',
                    fontWeight: 500,
                  }}
                >
                  {currentDeal.subtitle}
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--gray-300)',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                  }}
                >
                  {currentDeal.description}
                </p>

                {/* Specs Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '32px',
                  }}
                >
                  {currentDeal.specs.map((spec, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                      }}
                    >
                      <p style={{ fontSize: '12px', color: 'var(--gray-400)', marginBottom: '4px' }}>
                        {spec.label}
                      </p>
                      <p style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Min Order Info */}
                {currentDeal.minOrder && (
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--gray-400)',
                      marginBottom: '24px',
                    }}
                  >
                    Mindestabnahme: <strong style={{ color: 'white' }}>{currentDeal.minOrder}</strong>
                  </p>
                )}

                {/* CTAs */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link
                    href="/kontakt"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '16px 32px',
                      background: 'linear-gradient(135deg, var(--gold-400), var(--gold-500))',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Jetzt anfragen
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+4916373736363"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '16px 32px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Anrufen
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        style={{
          padding: '100px 0',
          background: 'var(--slate-900)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {dealFeatures.map((feature, index) => (
              <div
                key={feature.title}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '20px',
                  padding: '36px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                  opacity: featuresVisible[index] ? 1 : 0,
                  transform: featuresVisible[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.15}s`,
                }}
              >
                <span style={{ fontSize: '40px', marginBottom: '20px', display: 'block' }}>
                  {feature.icon}
                </span>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '12px',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--gray-400)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup CTA */}
      <section
        style={{
          padding: '80px 0',
          background: 'white',
        }}
      >
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, var(--green-600) 0%, var(--emerald-700) 100%)',
              borderRadius: '24px',
              padding: '60px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                marginBottom: '16px',
              }}
            >
              Keine Deals mehr verpassen!
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                opacity: 0.9,
                marginBottom: '32px',
                maxWidth: '500px',
                margin: '0 auto 32px',
              }}
            >
              Kontaktieren Sie uns, um über zukünftige Angebote informiert zu werden.
            </p>
            <Link
              href="/kontakt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: 'white',
                color: 'var(--green-700)',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '12px',
              }}
            >
              Kontakt aufnehmen
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
