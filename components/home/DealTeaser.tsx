'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set target to next Sunday
    const getNextSunday = () => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek
      const nextSunday = new Date(now)
      nextSunday.setDate(now.getDate() + daysUntilSunday)
      nextSunday.setHours(23, 59, 59, 999)
      return nextSunday
    }

    const target = getNextSunday()

    const timer = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {[
        { value: timeLeft.days, label: 'Tage' },
        { value: timeLeft.hours, label: 'Std' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Sek' },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            textAlign: 'center',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            minWidth: '60px',
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
            {item.value.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export function DealTeaser() {
  return (
    <section
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
          }}
          className="deal-grid"
        >
          {/* Left Content */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(74, 222, 128, 0.2)',
                borderRadius: '100px',
                marginBottom: '24px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#4ade80" stroke="none">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#4ade80' }}>
                Wöchentliche Sonderangebote
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              Unschlagbare Deals von führenden Marken
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#94a3b8',
                marginBottom: '32px',
              }}
            >
              Entdecken Sie unsere wöchentlich wechselnden Angebote mit attraktiven 
              B2B-Konditionen für ausgewählte Produkte.
            </p>

            {/* Countdown */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Deal endet in:
              </p>
              <CountdownTimer />
            </div>

            <Link
              href="/deal"
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
              Zum aktuellen Deal
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right Content - Deal Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '36px',
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#fef3c7',
                color: '#b45309',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '4px',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#b45309" stroke="none">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Hot Deal
            </div>

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
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#171717' }}>
                  Deal der Woche
                </h3>
                <p style={{ fontSize: '14px', color: '#737373' }}>
                  Nur noch begrenzt verfügbar
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#525252',
                marginBottom: '24px',
              }}
            >
              Schauen Sie vorbei und entdecken Sie die aktuellen Angebote der Woche. 
              Täglich neue Deals mit bis zu <strong style={{ color: '#16a34a' }}>15% Rabatt</strong> auf ausgewählte Produkte.
            </p>

            <Link
              href="/deal"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '14px',
                background: '#f0fdf4',
                color: '#16a34a',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
              }}
            >
              Details ansehen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .deal-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
