'use client'

import Link from 'next/link'
import { useScrollAnimation, useScrollAnimationGroup } from '@/lib/useScrollAnimation'

const values = [
  {
    icon: '🎯',
    title: 'B2B-Fokus',
    description: 'Wir sind spezialisiert auf die Bedürfnisse von Installateuren, Händlern und Projektentwicklern. 100% Geschäftskunden.',
    color: 'var(--green-600)',
  },
  {
    icon: '🌐',
    title: 'Starkes Netzwerk',
    description: 'Durch unser Netzwerk haben wir Zugang zu einem breiten Spektrum an Produkten und Herstellern europaweit.',
    color: 'var(--blue-600)',
  },
  {
    icon: '🤝',
    title: 'Langfristige Partnerschaften',
    description: 'Wir setzen auf nachhaltige Geschäftsbeziehungen statt kurzfristiger Gewinne. Vertrauen steht an erster Stelle.',
    color: 'var(--emerald-600)',
  },
  {
    icon: '⚡',
    title: 'Flexible Lösungen',
    description: 'Ob kleine Mengen oder Großprojekte – wir finden die passende Lösung für Ihren individuellen Bedarf.',
    color: 'var(--gold-500)',
  },
]

const timeline = [
  { year: '2020', title: 'Gründung', description: 'Start als spezialisierter B2B-Solarhandel in Hannover' },
  { year: '2021', title: 'Netzwerk-Aufbau', description: 'Partnerschaften mit führenden Herstellern etabliert' },
  { year: '2022', title: 'Expansion', description: 'Erweiterung des Portfolios auf Speicher und Wechselrichter' },
  { year: '2023', title: 'Europa', description: 'Ausbau der europaweiten Lieferkapazitäten' },
  { year: '2024', title: 'Wachstum', description: '50+ MW verbaut, 200+ zufriedene Kunden' },
]

const features = [
  { icon: '📦', label: 'Schnelle Lieferung', value: '24-48h' },
  { icon: '🔒', label: 'Sicherer Versand', value: 'Versichert' },
  { icon: '💬', label: 'Persönlicher Support', value: 'Direkt' },
  { icon: '📄', label: 'Flexible Zahlungen', value: 'B2B-Konditionen' },
]

export default function UeberUnsPage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [valuesRef, valuesVisible] = useScrollAnimationGroup(values.length, { threshold: 0.1 })
  const [timelineRef, timelineVisible] = useScrollAnimationGroup(timeline.length, { threshold: 0.1 })
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
            top: '-50px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(22, 163, 74, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
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
              Über Energia • Ihr B2B-Partner
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
              Energia{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Supply Solution
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
              Ihr zuverlässiger B2B-Partner für Photovoltaik-Produkte in Deutschland und Europa.
              Großhandel, Beschaffung und flexible Lösungen aus einer Hand.
            </p>
          </div>
        </div>
      </section>

      {/* About Section with Team */}
      <section
        style={{
          padding: '100px 0',
          background: 'white',
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
            {/* Left - Text Content */}
            <div>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--gray-900)',
                  marginBottom: '24px',
                }}
              >
                Wer wir sind
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  color: 'var(--gray-600)',
                  lineHeight: 1.8,
                  fontSize: '1.0625rem',
                }}
              >
                <p>
                  <strong style={{ color: 'var(--gray-900)' }}>Energia Supply Solution</strong> ist Ihr spezialisierter B2B-Handelspartner für
                  Photovoltaik-Produkte. Wir verstehen uns als Bindeglied zwischen
                  Herstellern und professionellen Anwendern – Händler, Installateure und
                  Projektentwickler.
                </p>
                <p>
                  Durch unser <strong style={{ color: 'var(--gray-900)' }}>Netzwerk</strong> und unsere Erfahrung im Solarmarkt können wir
                  Ihnen nicht nur Standardprodukte, sondern auch individuelle
                  Beschaffungslösungen anbieten. Was nicht auf unserer Website steht,
                  können wir oft über unser Netzwerk beschaffen.
                </p>
                <p>
                  Unser Fokus liegt auf <strong style={{ color: 'var(--gray-900)' }}>Qualität, Zuverlässigkeit und persönlichem
                    Service</strong>. Wir arbeiten ausschließlich mit etablierten Herstellern und legen
                  Wert auf langfristige Geschäftsbeziehungen.
                </p>
              </div>

              {/* Quick Features */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginTop: '40px',
                }}
              >
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: 'var(--gray-50)',
                      borderRadius: '12px',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                    <div>
                      <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>{feature.label}</p>
                      <p style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{feature.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Contact Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--slate-900) 0%, var(--slate-800) 100%)',
                borderRadius: '24px',
                padding: '40px',
                color: 'white',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  background: 'rgba(22, 163, 74, 0.2)',
                  borderRadius: '999px',
                  color: 'var(--green-400)',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '24px',
                }}
              >
                Ihr Ansprechpartner
              </div>

              {/* Contact Person */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '32px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  OB
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                    Ouissam Benabbou
                  </h3>
                  <p style={{ color: 'var(--green-400)', fontWeight: 500 }}>Geschäftsführer & B2B-Leitung</p>
                </div>
              </div>

              <p style={{ color: 'var(--gray-300)', marginBottom: '28px', lineHeight: 1.7 }}>
                Ihr direkter Ansprechpartner für alle Anfragen rund um Photovoltaik-Produkte,
                Preise und Verfügbarkeiten.
              </p>

              {/* Contact Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <a
                  href="tel:016373736363"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '14px 18px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--green-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>Telefon</p>
                    <p style={{ fontWeight: 600 }}>0163 73 73 663</p>
                  </div>
                </a>
                <a
                  href="mailto:connect@energia-b2b.de"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '14px 18px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--green-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>E-Mail</p>
                    <p style={{ fontWeight: 600 }}>connect@energia-b2b.de</p>
                  </div>
                </a>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: 'white',
                    padding: '14px 18px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--green-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>Standort</p>
                    <p style={{ fontWeight: 600 }}>Schäferweg 6, 30952 Hannover</p>
                  </div>
                </div>
              </div>

              <Link
                href="/termin"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px 24px',
                  background: 'var(--green-600)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                }}
              >
                Telefontermin vereinbaren →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
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
              Unsere Werte
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-600)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Was uns antreibt und wie wir mit unseren Partnern zusammenarbeiten
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {values.map((value, index) => (
              <div
                key={value.title}
                className="card-hover"
                style={{
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '20px',
                  padding: '32px',
                  opacity: valuesVisible[index] ? 1 : 0,
                  transform: valuesVisible[index] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: `${value.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '20px',
                  }}
                >
                  {value.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--gray-900)',
                    marginBottom: '12px',
                  }}
                >
                  {value.title}
                </h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.7 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        ref={timelineRef}
        style={{
          padding: '100px 0',
          background: 'white',
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
              Unsere Geschichte
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-600)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Von der Gründung bis heute
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              maxWidth: '700px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            {/* Timeline Line */}
            <div
              style={{
                position: 'absolute',
                left: '23px',
                top: '24px',
                bottom: '24px',
                width: '2px',
                background: 'var(--gray-200)',
              }}
            />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '24px 0',
                  opacity: timelineVisible[index] ? 1 : 0,
                  transform: timelineVisible[index] ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.6s ease-out ${index * 0.15}s`,
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: index === timeline.length - 1 ? 'var(--green-600)' : 'white',
                    border: `3px solid ${index === timeline.length - 1 ? 'var(--green-600)' : 'var(--green-500)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {index === timeline.length - 1 ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  ) : (
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: 'var(--green-500)',
                      }}
                    />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--green-600)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.year}
                  </p>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--gray-900)',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>
                    {item.description}
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
            Bereit für die{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Zusammenarbeit?
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
            Kontaktieren Sie uns für ein unverbindliches Gespräch. Wir freuen uns,
            Sie kennenzulernen und Ihre Anforderungen zu besprechen.
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
