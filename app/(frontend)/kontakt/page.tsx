'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const contactMethods = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Telefon',
    value: '0163 73 73 663',
    href: 'tel:+4916373736363',
    description: 'Mo-Fr 9:00-18:00 Uhr',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'E-Mail',
    value: 'connect@energia-b2b.de',
    href: 'mailto:connect@energia-b2b.de',
    description: 'Antwort binnen 24h',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Standort',
    value: 'Schäferweg 6, 30952 Hannover',
    href: 'https://maps.google.com/?q=Schäferweg+6,+30952+Hannover',
    description: 'Deutschland',
  },
]

export default function KontaktPage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [formRef, formVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    interest: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormState({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          message: '',
          interest: '',
        })
      }
    } catch {
      console.error('Error submitting form')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyles = {
    width: '100%',
    padding: '16px 18px',
    border: '1px solid var(--gray-200)',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
    background: 'white',
  }

  const labelStyles = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--gray-700)',
    marginBottom: '8px',
  }

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
              maxWidth: '700px',
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
              Kontakt aufnehmen
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
              Bereit für Ihre{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Anfrage?
              </span>
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--gray-300)',
                lineHeight: 1.7,
              }}
            >
              Haben Sie Fragen zu unseren Produkten oder möchten Sie eine Anfrage stellen?
              Wir freuen uns auf Ihre Nachricht.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Bar */}
      <section
        style={{
          padding: '40px 0',
          background: 'white',
          borderBottom: '1px solid var(--gray-200)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.label === 'Standort' ? '_blank' : undefined}
                rel={method.label === 'Standort' ? 'noopener noreferrer' : undefined}
                className="card-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '24px',
                  background: 'var(--gray-50)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  border: '1px solid transparent',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, var(--green-600), var(--emerald-600))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0,
                  }}
                >
                  {method.icon}
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '4px' }}>
                    {method.label}
                  </p>
                  <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '2px' }}>
                    {method.value}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                    {method.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        ref={formRef}
        style={{
          padding: '100px 0',
          background: 'var(--gray-50)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
              gap: '60px',
              alignItems: 'start',
            }}
          >
            {/* Left - Contact Form */}
            <div
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid var(--gray-200)',
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.8s ease-out',
              }}
            >
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--gray-900)',
                  marginBottom: '8px',
                }}
              >
                Nachricht senden
              </h2>
              <p
                style={{
                  color: 'var(--gray-500)',
                  marginBottom: '32px',
                }}
              >
                Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.
              </p>

              {isSubmitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 40px',
                    background: 'var(--green-50)',
                    borderRadius: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'var(--green-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '12px' }}>
                    Nachricht gesendet!
                  </h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '24px' }}>
                    Vielen Dank für Ihre Anfrage. Wir melden uns binnen 24 Stunden bei Ihnen.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    style={{
                      padding: '12px 24px',
                      background: 'var(--green-600)',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Neue Nachricht
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div>
                      <label style={labelStyles}>Vorname *</label>
                      <input
                        type="text"
                        required
                        value={formState.firstName}
                        onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                        style={inputStyles}
                        placeholder="Max"
                      />
                    </div>
                    <div>
                      <label style={labelStyles}>Nachname *</label>
                      <input
                        type="text"
                        required
                        value={formState.lastName}
                        onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                        style={inputStyles}
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyles}>Unternehmen *</label>
                    <input
                      type="text"
                      required
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      style={inputStyles}
                      placeholder="Ihr Firmenname"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div>
                      <label style={labelStyles}>E-Mail *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        style={inputStyles}
                        placeholder="max@firma.de"
                      />
                    </div>
                    <div>
                      <label style={labelStyles}>Telefon</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        style={inputStyles}
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyles}>Interesse</label>
                    <select
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                      style={{ ...inputStyles, cursor: 'pointer' }}
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="module">Solarmodule</option>
                      <option value="wechselrichter">Wechselrichter</option>
                      <option value="speicher">Batteriespeicher</option>
                      <option value="projekt">Projektanfrage</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyles}>Nachricht *</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{ ...inputStyles, resize: 'vertical' }}
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '18px 32px',
                      background: isSubmitting ? 'var(--gray-400)' : 'var(--green-600)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="shimmer" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        Nachricht senden
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right - Contact Info */}
            <div
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.8s ease-out 0.2s',
              }}
            >
              {/* Contact Person Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--slate-900) 0%, var(--slate-800) 100%)',
                  borderRadius: '24px',
                  padding: '36px',
                  color: 'white',
                  marginBottom: '24px',
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    OB
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                      Ouissam Benabbou
                    </h3>
                    <p style={{ color: 'var(--green-400)', fontWeight: 500 }}>Geschäftsführer & B2B-Leitung</p>
                  </div>
                </div>

                <p style={{ color: 'var(--gray-300)', marginBottom: '24px', lineHeight: 1.7, fontSize: '15px' }}>
                  Ihr direkter Ansprechpartner für alle Anfragen rund um Photovoltaik-Produkte,
                  Preise und Verfügbarkeiten.
                </p>

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

              {/* Quick Info Cards */}
              <div style={{ display: 'grid', gap: '16px' }}>
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid var(--gray-200)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>⚡</span>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--gray-900)', marginBottom: '4px' }}>
                      Schnelle Antwort
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                      Antwort binnen 24 Stunden garantiert
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid var(--gray-200)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>🤝</span>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--gray-900)', marginBottom: '4px' }}>
                      Persönliche Beratung
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                      Direkt vom Experten – kein Callcenter
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid var(--gray-200)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>🎯</span>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--gray-900)', marginBottom: '4px' }}>
                      B2B-Fokus
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                      Spezialisiert auf Geschäftskunden
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
