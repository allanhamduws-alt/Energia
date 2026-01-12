'use client'

import Link from 'next/link'
import { useScrollAnimation, useScrollAnimationGroup, useCountAnimation } from '@/lib/useScrollAnimation'

const stats = [
  { value: 50, suffix: '+', label: 'MW Verbaut', icon: '⚡' },
  { value: 200, suffix: '+', label: 'Projekte', icon: '📦' },
  { value: 100, suffix: '%', label: 'B2B Fokus', icon: '🤝' },
  { value: 10, suffix: '+', label: 'Jahre Erfahrung', icon: '🏆' },
]

const projects = [
  {
    title: 'Großhandelsbelieferung Deutschland',
    type: 'Großhandel',
    icon: '🏭',
    description: 'Regelmäßige Belieferung eines etablierten PV-Großhändlers mit Modulen und Wechselrichtern verschiedener Hersteller. Langfristige Partnerschaft mit flexiblen Liefermengen.',
    highlights: ['Mehrere MW Modulleistung', 'Diverse Marken', 'Langfristige Partnerschaft'],
    metrics: { volume: '5+ MW', duration: '3+ Jahre', products: '6 Marken' },
  },
  {
    title: 'Installationsbetrieb Versorgung',
    type: 'Installation',
    icon: '🔧',
    description: 'Kontinuierliche Versorgung eines wachsenden Installationsbetriebs mit Wechselrichtern und Speichersystemen für Privat- und Gewerbeanlagen.',
    highlights: ['Wechselrichter & Speicher', 'Schnelle Lieferung', 'Flexible Mengen'],
    metrics: { volume: '200+ Anlagen', duration: '2+ Jahre', products: 'SMA, Sungrow' },
  },
  {
    title: 'Projektbeschaffung Europa',
    type: 'Projekt',
    icon: '🌍',
    description: 'Beschaffung von Modulen und Komponenten für Großprojekte im europäischen Ausland über unser erweitertes Partnernetzwerk.',
    highlights: ['Europaweite Lieferung', 'Großvolumen', 'Projektbasiert'],
    metrics: { volume: '10+ MW', duration: 'Laufend', products: 'AIKO, Trina' },
  },
  {
    title: 'Spezialbeschaffung über Netzwerk',
    type: 'Netzwerk',
    icon: '🔗',
    description: 'Erfolgreiche Beschaffung spezifischer Produkte und Marken über unser Partnernetzwerk für individuelle Kundenanfragen und Sonderprojekte.',
    highlights: ['Sonderanfragen', 'Netzwerk-Beschaffung', 'Individuelle Lösungen'],
    metrics: { volume: 'Variabel', duration: 'Projekt', products: '20+ Marken' },
  },
]

const testimonials = [
  {
    quote: 'Zuverlässige Abwicklung, faire Preise und immer erreichbar. Die Zusammenarbeit läuft unkompliziert und professionell. Energia ist unser bevorzugter Lieferant.',
    author: 'Geschäftsführer',
    company: 'PV-Installationsbetrieb',
    location: 'Norddeutschland',
    rating: 5,
  },
  {
    quote: 'Schnelle Reaktionszeiten und flexibel bei der Mengenbeschaffung. Genau das, was wir als Händler brauchen. Top-Service!',
    author: 'Einkaufsleiter',
    company: 'Solargroßhandel',
    location: 'Baden-Württemberg',
    rating: 5,
  },
  {
    quote: 'Auch bei speziellen Anfragen wird eine Lösung gefunden. Das Netzwerk macht den Unterschied. Sehr empfehlenswert.',
    author: 'Projektmanager',
    company: 'Projektentwickler',
    location: 'Europa',
    rating: 5,
  },
]

const partners = ['SMA', 'Sungrow', 'Huawei', 'AIKO', 'BYD', 'Trina Solar', 'JA Solar', 'Kostal']

export default function ReferenzenPage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [statsRef, statsVisible] = useScrollAnimationGroup(stats.length, { threshold: 0.2 })
  const [projectsRef, projectsVisible] = useScrollAnimationGroup(projects.length, { threshold: 0.1 })
  const [testimonialsRef, testimonialsVisible] = useScrollAnimationGroup(testimonials.length, { threshold: 0.1 })
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <main>
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
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(22, 163, 74, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
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
              Case Studies • Erfolgsgeschichten
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
              Vertrauen durch{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Erfahrung
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
              Erfahren Sie, wie wir B2B-Kunden in Deutschland und Europa mit
              Qualitätsprodukten und zuverlässigem Service unterstützen.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        style={{
          padding: '80px 0',
          background: 'white',
          borderBottom: '1px solid var(--gray-200)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
            }}
          >
            {stats.map((stat, index) => (
              <StatCounter
                key={stat.label}
                stat={stat}
                isVisible={statsVisible[index]}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        style={{
          padding: '100px 0',
          background: 'var(--gray-50)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--gray-900)',
                marginBottom: '16px',
              }}
            >
              Unsere Projekte & Kunden
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-600)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Ein Auszug aus unseren Geschäftsbeziehungen und erfolgreichen Projekten
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '28px',
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="card-hover"
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  opacity: projectsVisible[index] ? 1 : 0,
                  transform: projectsVisible[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                }}
              >
                {/* Project Header */}
                <div
                  style={{
                    padding: '28px 32px',
                    background: 'linear-gradient(135deg, var(--green-600) 0%, var(--emerald-600) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '32px' }}>{project.icon}</span>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'white',
                        }}
                      >
                        {project.title}
                      </h3>
                      <span
                        style={{
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {project.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div style={{ padding: '28px 32px' }}>
                  <p
                    style={{
                      fontSize: '15px',
                      color: 'var(--gray-600)',
                      lineHeight: 1.7,
                      marginBottom: '24px',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '16px',
                      padding: '20px',
                      background: 'var(--gray-50)',
                      borderRadius: '12px',
                      marginBottom: '24px',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 700, color: 'var(--green-600)', fontSize: '1.125rem' }}>
                        {project.metrics.volume}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Volumen</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 700, color: 'var(--green-600)', fontSize: '1.125rem' }}>
                        {project.metrics.duration}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Dauer</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 700, color: 'var(--green-600)', fontSize: '1.125rem' }}>
                        {project.metrics.products}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Produkte</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.highlights.map((highlight, i) => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section
        style={{
          padding: '60px 0',
          background: 'white',
          borderBottom: '1px solid var(--gray-200)',
        }}
      >
        <div className="container">
          <p
            style={{
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '32px',
            }}
          >
            Produkte unserer Partner
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '40px',
            }}
          >
            {partners.map((partner) => (
              <span
                key={partner}
                className="brand-logo"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--gray-400)',
                  padding: '12px 24px',
                  transition: 'all 0.3s ease',
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        style={{
          padding: '100px 0',
          background: 'var(--gray-50)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--gray-900)',
                marginBottom: '16px',
              }}
            >
              Was unsere Kunden sagen
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-600)',
              }}
            >
              Feedback von unseren Geschäftspartnern
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '28px',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-hover"
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '36px',
                  border: '1px solid var(--gray-200)',
                  opacity: testimonialsVisible[index] ? 1 : 0,
                  transform: testimonialsVisible[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.15}s`,
                }}
              >
                {/* Quote Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>

                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--gold-500)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--gray-700)',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: '24px',
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div
                  style={{
                    paddingTop: '20px',
                    borderTop: '1px solid var(--gray-100)',
                  }}
                >
                  <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '4px' }}>
                    {testimonial.author}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                    {testimonial.company} • {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
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
            Werden Sie Teil unserer{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Erfolgsgeschichte
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
            Starten Sie eine Zusammenarbeit mit Energia und profitieren Sie von
            zuverlässiger Qualität und persönlichem Service.
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
              Kontakt aufnehmen
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
      </section>
    </main>
  )
}

// StatCounter Component with animated number
function StatCounter({ stat, isVisible, delay }: { stat: typeof stats[0]; isVisible: boolean; delay: number }) {
  const [ref, count] = useCountAnimation(stat.value, 2000)

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '24px',
        borderRadius: '16px',
        background: 'var(--gray-50)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease-out ${delay}s`,
      }}
    >
      <span style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }}>{stat.icon}</span>
      <span
        ref={ref}
        style={{
          display: 'block',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 700,
          background: 'linear-gradient(135deg, var(--green-600), var(--emerald-600))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}
      >
        {isVisible ? count : 0}{stat.suffix}
      </span>
      <p
        style={{
          fontSize: '1rem',
          color: 'var(--gray-600)',
          fontWeight: 500,
        }}
      >
        {stat.label}
      </p>
    </div>
  )
}
