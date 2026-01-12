'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrollAnimation, useScrollAnimationGroup } from '@/lib/useScrollAnimation'

const benefits = [
  {
    icon: '💬',
    title: 'Persönliche Beratung',
    description: 'Wir nehmen uns Zeit für Ihre individuellen Anforderungen und Fragen.',
  },
  {
    icon: '💰',
    title: 'Aktuelle Preise & Verfügbarkeit',
    description: 'Erhalten Sie direkt Informationen zu Preisen und Lieferzeiten.',
  },
  {
    icon: '📋',
    title: 'Projektbesprechung',
    description: 'Besprechen Sie größere Projekte und erhalten Sie maßgeschneiderte Angebote.',
  },
  {
    icon: '✅',
    title: 'Unverbindlich & Kostenlos',
    description: 'Kein Kaufzwang – wir beraten Sie gerne ohne Verpflichtung.',
  },
]

export default function TerminPage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [benefitsRef, benefitsVisible] = useScrollAnimationGroup(benefits.length, { threshold: 0.1 })
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormState({ name: '', company: '', email: '', phone: '', preferredTime: '', message: '' })
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
              📞 Kostenlose Beratung
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
              Telefontermin{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                vereinbaren
              </span>
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--gray-300)',
                lineHeight: 1.7,
              }}
            >
              Vereinbaren Sie einen unverbindlichen Telefontermin mit unserem B2B-Team.
              Wir besprechen Ihre Anforderungen und finden die passende Lösung.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section style={{ padding: '100px 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
              gap: '60px',
              alignItems: 'start',
            }}
          >
            {/* Left - Benefits */}
            <div ref={benefitsRef}>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--gray-900)',
                  marginBottom: '32px',
                }}
              >
                Das erwartet Sie
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '40px',
                }}
              >
                {benefits.map((item, i) => (
                  <div
                    key={item.title}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '20px',
                      background: 'white',
                      borderRadius: '16px',
                      border: '1px solid var(--gray-200)',
                      opacity: benefitsVisible[i] ? 1 : 0,
                      transform: benefitsVisible[i] ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s ease-out ${i * 0.1}s`,
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'var(--green-50)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--gray-900)',
                          marginBottom: '4px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ color: 'var(--gray-600)', lineHeight: 1.6, fontSize: '15px' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Person */}
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--slate-900) 0%, var(--slate-800) 100%)',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  OB
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: 'white', fontSize: '1.125rem' }}>
                    Ouissam Benabbou
                  </p>
                  <p style={{ color: 'var(--green-400)', fontWeight: 500 }}>
                    Ihr persönlicher Ansprechpartner
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Booking Form */}
            <div
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid var(--gray-200)',
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
                Termin anfragen
              </h2>
              <p style={{ color: 'var(--gray-500)', marginBottom: '32px' }}>
                Wir rufen Sie zum vereinbarten Zeitpunkt an.
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
                    Termin angefragt!
                  </h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '24px' }}>
                    Vielen Dank! Wir melden uns binnen 24 Stunden bei Ihnen zur Terminbestätigung.
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
                    Weiteren Termin anfragen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={inputStyles}
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>
                      Unternehmen
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      style={inputStyles}
                      placeholder="Ihr Firmenname"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>
                        E-Mail *
                      </label>
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
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        style={inputStyles}
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>
                      Bevorzugte Uhrzeit
                    </label>
                    <select
                      value={formState.preferredTime}
                      onChange={(e) => setFormState({ ...formState, preferredTime: e.target.value })}
                      style={{ ...inputStyles, cursor: 'pointer' }}
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="morning">Vormittag (9-12 Uhr)</option>
                      <option value="afternoon">Nachmittag (12-17 Uhr)</option>
                      <option value="flexible">Flexibel</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>
                      Worum geht es? (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{ ...inputStyles, resize: 'vertical' }}
                      placeholder="Kurze Beschreibung Ihres Anliegens..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      marginTop: '8px',
                      padding: '18px 32px',
                      background: isSubmitting ? 'var(--gray-400)' : 'var(--green-600)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isSubmitting ? 'Wird gesendet...' : (
                      <>
                        Termin anfragen
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}

              <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '20px', textAlign: 'center' }}>
                🔒 Ihre Daten werden vertraulich behandelt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '16px' }}>
            Lieber direkt anrufen?
          </h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '24px' }}>
            Wenn Sie nicht warten möchten, erreichen Sie uns auch direkt telefonisch.
          </p>
          <a
            href="tel:+4916373736363"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: 'var(--slate-900)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '12px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            0163 73 73 663
          </a>
        </div>
      </section>
    </main>
  )
}
