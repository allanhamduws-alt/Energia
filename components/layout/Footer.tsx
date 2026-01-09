'use client'

import Link from 'next/link'
import { useState } from 'react'

const footerLinks = {
  produkte: [
    { name: 'Alle Produkte', href: '/produkte' },
    { name: 'Solarmodule', href: '/produkte#module' },
    { name: 'Wechselrichter', href: '/produkte#wechselrichter' },
    { name: 'Speicher', href: '/produkte#speicher' },
  ],
  unternehmen: [
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Marken', href: '/marken' },
    { name: 'Referenzen', href: '/referenzen' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  service: [
    { name: 'Deal der Woche', href: '/deal' },
    { name: 'Termin buchen', href: '/termin' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ],
}

// Social Media Icons
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer style={{ background: '#171717' }}>
      {/* Main Footer */}
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr',
            gap: '48px',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="14" width="36" height="28" rx="4" fill="#16a34a" />
                <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="1.5" />
                <line x1="6" y1="32" x2="42" y2="32" stroke="white" strokeWidth="1.5" />
                <line x1="18" y1="14" x2="18" y2="42" stroke="white" strokeWidth="1.5" />
                <line x1="30" y1="14" x2="30" y2="42" stroke="white" strokeWidth="1.5" />
                <circle cx="24" cy="8" r="4" fill="#15803d" />
              </svg>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>Energia</span>
            </Link>
            <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.7, marginBottom: '24px' }}>
              B2B-Großhandel für Photovoltaik-Produkte in Deutschland und Europa. Qualitätsprodukte, faire Preise, zuverlässiger Service.
            </p>
            
            {/* Social Media */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#262626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a3a3a3',
                }}
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#262626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a3a3a3',
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#262626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a3a3a3',
                }}
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Produkte */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Produkte
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.produkte.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Unternehmen
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.unternehmen.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Kontakt
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#a3a3a3' }}>
              <p>Energia Supply Solution</p>
              <p>Schäferweg 6</p>
              <p>30952 Hannover</p>
              <a href="tel:+4916373673663" style={{ color: '#16a34a', fontWeight: 500 }}>
                0163 73 73 663
              </a>
              <a href="mailto:connect@energia-b2b.de" style={{ color: '#16a34a', fontWeight: 500 }}>
                connect@energia-b2b.de
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.7, marginBottom: '16px' }}>
              Bleiben Sie informiert über aktuelle Deals, neue Produkte und Branchennews.
            </p>
            
            {subscribed ? (
              <div style={{ 
                padding: '16px', 
                background: 'rgba(22, 163, 74, 0.1)', 
                borderRadius: '8px',
                border: '1px solid rgba(22, 163, 74, 0.3)'
              }}>
                <p style={{ fontSize: '14px', color: '#16a34a', fontWeight: 500 }}>
                  ✓ Vielen Dank für Ihre Anmeldung!
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: '#262626',
                    border: '1px solid #404040',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: 'white',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px 20px',
                    background: '#16a34a',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Anmelden
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #262626' }}>
        <div
          className="container"
          style={{
            paddingTop: '24px',
            paddingBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#737373' }}>
            © {new Date().getFullYear()} Energia Supply Solution. Alle Rechte vorbehalten.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {footerLinks.rechtliches.map((link) => (
              <Link key={link.name} href={link.href} style={{ fontSize: '14px', color: '#737373' }}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
