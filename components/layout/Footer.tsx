'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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
    { name: 'Deal der Woche', href: '/deal', hot: true },
    { name: 'Termin buchen', href: '/termin' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ],
}

const partnerBrands = ['AIKO', 'Sungrow', 'Huawei', 'JA Solar', 'SMA', 'BYD']

// SVG Icons
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
)

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const FlameIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.23.1-.47.04-.66-.12a.58.58 0 01-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5.14.6.41 1.2.71 1.73 1.08 1.73 2.95 2.97 4.96 3.22 2.14.27 4.43-.12 6.07-1.6 1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26zm-3.16 6.3c-.28.24-.74.5-1.1.6-1.12.4-2.24-.16-2.9-.82 1.19-.28 1.9-1.16 2.11-2.05.17-.8-.15-1.46-.28-2.23-.12-.74-.1-1.37.17-2.06.19.38.39.76.63 1.06.77 1 1.98 1.44 2.24 2.8.04.14.06.28.06.43.03.82-.33 1.72-.93 2.27z" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

// Energia Logo Component (same as Header)
const EnergiaLogo = () => (
  <svg width="32" height="26" viewBox="0 0 90 75" fill="none">
    <defs>
      <linearGradient id="footerLogoGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
      <linearGradient id="footerLogoGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
      <linearGradient id="footerLogoGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    <path d="M0 0 L80 0 L72 14 L0 14 Z" fill="url(#footerLogoGrad1)" />
    <path d="M0 30 L55 30 L47 44 L0 44 Z" fill="url(#footerLogoGrad2)" />
    <path d="M0 60 L80 60 L72 74 L0 74 Z" fill="url(#footerLogoGrad3)" />
  </svg>
)

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer ref={footerRef} className="footer-wrapper">
      {/* CTA Section */}
      <div className="footer-cta-section">
        <div className="container">
          <div className={`footer-cta ${isVisible ? 'animate-in' : ''}`}>
            <div className="cta-content">
              <h3>Bereit für den nächsten Schritt?</h3>
              <p>Kontaktieren Sie uns für ein unverbindliches Angebot oder vereinbaren Sie einen Beratungstermin.</p>
            </div>
            <div className="cta-buttons">
              <Link href="/kontakt" className="cta-btn-primary">
                <DocumentIcon />
                Angebot anfordern
              </Link>
              <Link href="/termin" className="cta-btn-secondary">
                <CalendarIcon />
                Termin buchen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Banner */}
      <div className="partner-banner">
        <div className="container">
          <div className={`partner-content ${isVisible ? 'animate-in' : ''}`}>
            <span className="partner-label">Premium Partner</span>
            <div className="partner-divider"></div>
            <div className="partner-brands">
              {partnerBrands.map((brand) => (
                <span key={brand} className="partner-brand">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className={`footer-grid ${isVisible ? 'animate-in' : ''}`}>
            {/* Brand Column */}
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <EnergiaLogo />
                <span>Energia</span>
              </Link>
              <p className="footer-tagline">
                B2B-Großhandel für Photovoltaik-Produkte in Deutschland und Europa. Qualitätsprodukte, faire Preise, zuverlässiger Service.
              </p>

              <div className="footer-contact-info">
                <a href="tel:+4916373673663" className="contact-item">
                  <PhoneIcon />
                  <span>0163 73 73 663</span>
                </a>
                <a href="mailto:connect@energia-b2b.de" className="contact-item">
                  <MailIcon />
                  <span>connect@energia-b2b.de</span>
                </a>
                <div className="contact-item">
                  <LocationIcon />
                  <span>Schäferweg 6, 30952 Hannover</span>
                </div>
              </div>

              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                  <YouTubeIcon />
                </a>
              </div>
            </div>

            {/* Produkte */}
            <div className="footer-links-section">
              <h4>Produkte</h4>
              <ul>
                {footerLinks.produkte.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unternehmen */}
            <div className="footer-links-section">
              <h4>Unternehmen</h4>
              <ul>
                {footerLinks.unternehmen.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service */}
            <div className="footer-links-section">
              <h4>Service</h4>
              <ul>
                {footerLinks.service.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={link.hot ? 'hot-link' : ''}>
                      {link.hot && (
                        <span className="hot-badge">
                          <FlameIcon />
                          HOT
                        </span>
                      )}
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li className="spacer"></li>
                {footerLinks.rechtliches.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h4>Newsletter</h4>
              <p>Bleiben Sie informiert über aktuelle Deals, neue Produkte und Branchennews.</p>

              {subscribed ? (
                <div className="newsletter-success">
                  <CheckCircleIcon />
                  <span>Vielen Dank für Ihre Anmeldung!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" aria-label="Newsletter abonnieren">
                    <ArrowRightIcon />
                  </button>
                </form>
              )}

              <div className="trust-badges">
                <div className="trust-badge">
                  <ShieldIcon />
                  <span>SSL-verschlüsselt</span>
                </div>
                <div className="trust-badge">
                  <CheckIcon />
                  <span>DSGVO-konform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>© {new Date().getFullYear()} Energia Supply Solution. Alle Rechte vorbehalten.</p>
            <div className="footer-bottom-links">
              <Link href="/impressum">Impressum</Link>
              <span className="divider">•</span>
              <Link href="/datenschutz">Datenschutz</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-wrapper {
          background: #0f172a;
        }

        /* CTA Section */
        .footer-cta-section {
          background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%);
          padding: 48px 0;
          position: relative;
          overflow: hidden;
        }

        .footer-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .footer-cta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.5s ease-out;
        }

        .footer-cta.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9375rem;
          max-width: 420px;
        }

        .cta-buttons {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .cta-btn-primary,
        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .cta-btn-primary {
          background: white;
          color: #15803d;
        }

        .cta-btn-primary:hover {
          background: #f0fdf4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .cta-btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(4px);
        }

        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.22);
          transform: translateY(-2px);
        }

        /* Partner Banner */
        .partner-banner {
          background: #1e293b;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .partner-content {
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0;
          transition: opacity 0.5s ease-out 0.1s;
        }

        .partner-content.animate-in {
          opacity: 1;
        }

        .partner-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          flex-shrink: 0;
        }

        .partner-divider {
          width: 1px;
          height: 16px;
          background: #334155;
        }

        .partner-brands {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .partner-brand {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          transition: color 0.25s ease;
        }

        .partner-brand:hover {
          color: #22c55e;
        }

        /* Main Footer */
        .footer-main {
          padding: 64px 0 48px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr 1.5fr;
          gap: 40px;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.5s ease-out 0.15s;
        }

        .footer-grid.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Brand Column */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
        }

        .footer-logo span {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }

        .footer-tagline {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.65;
          max-width: 280px;
        }

        .footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 4px;
        }

        .contact-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #cbd5e1;
          transition: color 0.25s ease;
          width: fit-content;
        }

        a.contact-item:hover {
          color: #22c55e;
        }

        .contact-item svg {
          flex-shrink: 0;
          color: #22c55e;
        }

        .social-links {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .social-link {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.25s ease;
        }

        .social-link:hover {
          background: #22c55e;
          color: white;
          transform: translateY(-2px);
        }

        /* Footer Links */
        .footer-links-section h4 {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .footer-links-section ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links-section a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #cbd5e1;
          transition: all 0.25s ease;
        }

        .footer-links-section a:hover {
          color: #22c55e;
          transform: translateX(3px);
        }

        .spacer {
          height: 8px;
        }

        .hot-link {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hot-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #f97316, #ef4444);
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        /* Newsletter */
        .footer-newsletter h4 {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .footer-newsletter > p {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .newsletter-form {
          display: flex;
          gap: 0;
          background: #1e293b;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid #334155;
          transition: border-color 0.25s ease;
        }

        .newsletter-form:focus-within {
          border-color: #22c55e;
        }

        .newsletter-form input {
          flex: 1;
          padding: 10px 14px;
          background: transparent;
          border: none;
          font-size: 13px;
          color: #ffffff;
          outline: none;
          min-width: 0;
        }

        .newsletter-form input::placeholder {
          color: #64748b;
        }

        .newsletter-form button {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          background: #22c55e;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .newsletter-form button:hover {
          background: #16a34a;
          transform: scale(1.05);
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(34, 197, 94, 0.12);
          border-radius: 8px;
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        .newsletter-success svg {
          color: #22c55e;
          flex-shrink: 0;
        }

        .newsletter-success span {
          font-size: 13px;
          color: #22c55e;
          font-weight: 500;
        }

        .trust-badges {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #64748b;
        }

        .trust-badge svg {
          color: #22c55e;
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #0a0f1a;
        }

        .footer-bottom-content {
          padding: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-bottom-content p {
          font-size: 12px;
          color: #64748b;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-bottom-links a {
          font-size: 12px;
          color: #64748b;
          transition: color 0.25s ease;
        }

        .footer-bottom-links a:hover {
          color: #22c55e;
        }

        .footer-bottom-links .divider {
          color: #334155;
          font-size: 10px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }

          .footer-cta {
            flex-direction: column;
            text-align: center;
          }

          .cta-content {
            text-align: center;
          }

          .cta-content p {
            max-width: none;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .footer-cta-section {
            padding: 36px 0;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-btn-primary,
          .cta-btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .partner-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .partner-divider {
            display: none;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
