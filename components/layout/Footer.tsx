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
    { name: 'Deal der Woche', href: '/deal' },
    { name: 'Termin buchen', href: '/termin' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ],
}

// Partner Marken
const partnerBrands = [
  'AIKO', 'Sungrow', 'Huawei', 'JA Solar', 'SMA', 'BYD'
]

// Social Media Icons
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

// Phone Icon
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
)

// Mail Icon
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
)

// Location Icon
const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
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
      {/* Top CTA Section */}
      <div className="footer-cta-section">
        <div className="container">
          <div className={`footer-cta ${isVisible ? 'animate-in' : ''}`}>
            <div className="cta-content">
              <h3>Bereit für den nächsten Schritt?</h3>
              <p>Kontaktieren Sie uns für ein unverbindliches Angebot oder vereinbaren Sie einen Beratungstermin.</p>
            </div>
            <div className="cta-buttons">
              <Link href="/kontakt" className="cta-btn-primary">
                Angebot anfordern
              </Link>
              <Link href="/termin" className="cta-btn-secondary">
                Termin buchen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Brands Banner */}
      <div className="partner-banner">
        <div className="container">
          <div className={`partner-content ${isVisible ? 'animate-in delay-100' : ''}`}>
            <span className="partner-label">Premium Partner</span>
            <div className="partner-brands">
              {partnerBrands.map((brand, index) => (
                <span
                  key={brand}
                  className="partner-brand"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
          <div className={`footer-grid ${isVisible ? 'animate-in delay-200' : ''}`}>
            {/* Brand */}
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="14" width="36" height="28" rx="4" fill="#16a34a" />
                  <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="1.5" />
                  <line x1="6" y1="32" x2="42" y2="32" stroke="white" strokeWidth="1.5" />
                  <line x1="18" y1="14" x2="18" y2="42" stroke="white" strokeWidth="1.5" />
                  <line x1="30" y1="14" x2="30" y2="42" stroke="white" strokeWidth="1.5" />
                  <circle cx="24" cy="8" r="4" fill="#15803d" />
                </svg>
                <span>Energia</span>
              </Link>
              <p className="footer-tagline">
                B2B-Großhandel für Photovoltaik-Produkte in Deutschland und Europa. Qualitätsprodukte, faire Preise, zuverlässiger Service.
              </p>

              {/* Contact Info */}
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

              {/* Social Media */}
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
                    <Link href={link.href}>
                      {link.href === '/deal' && <span className="hot-badge">HOT</span>}
                      {link.name}
                    </Link>
                  </li>
                ))}
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
              <p>
                Bleiben Sie informiert über aktuelle Deals, neue Produkte und Branchennews.
              </p>

              {subscribed ? (
                <div className="newsletter-success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
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
                  <button type="submit">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>SSL-verschlüsselt</span>
                </div>
                <div className="trust-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
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
              <span className="divider">|</span>
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
          padding: 60px 0;
          position: relative;
          overflow: hidden;
        }

        .footer-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .footer-cta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .footer-cta.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-content h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.85);
          font-size: 1rem;
          max-width: 500px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          flex-shrink: 0;
        }

        .cta-btn-primary,
        .cta-btn-secondary {
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .cta-btn-primary {
          background: white;
          color: #15803d;
        }

        .cta-btn-primary:hover {
          background: #f0fdf4;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .cta-btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        /* Partner Banner */
        .partner-banner {
          background: #1e293b;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .partner-content {
          display: flex;
          align-items: center;
          gap: 32px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease-out;
        }

        .partner-content.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .partner-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }

        .partner-brands {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .partner-brand {
          font-size: 14px;
          font-weight: 600;
          color: #94a3b8;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .partner-brand:hover {
          color: #16a34a;
          opacity: 1;
        }

        /* Main Footer */
        .footer-main {
          background: #0f172a;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
          gap: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .footer-grid.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-logo span {
          font-size: 22px;
          font-weight: 700;
          color: white;
        }

        .footer-tagline {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.7;
        }

        .footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #94a3b8;
          transition: color 0.3s ease;
        }

        a.contact-item:hover {
          color: #16a34a;
        }

        .contact-item svg {
          flex-shrink: 0;
          color: #16a34a;
        }

        .social-links {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .social-link {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #16a34a;
          color: white;
          transform: translateY(-3px);
        }

        /* Footer Links */
        .footer-links-section h4 {
          font-size: 14px;
          font-weight: 600;
          color: white;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links-section ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-section a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #94a3b8;
          transition: all 0.3s ease;
        }

        .footer-links-section a:hover {
          color: #16a34a;
          transform: translateX(4px);
        }

        .hot-badge {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          color: #0f172a;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Newsletter */
        .footer-newsletter h4 {
          font-size: 14px;
          font-weight: 600;
          color: white;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-newsletter > p {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .newsletter-form {
          display: flex;
          gap: 0;
          background: #1e293b;
          border-radius: 10px;
          padding: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease;
        }

        .newsletter-form:focus-within {
          border-color: #16a34a;
        }

        .newsletter-form input {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: none;
          font-size: 14px;
          color: white;
          outline: none;
        }

        .newsletter-form input::placeholder {
          color: #64748b;
        }

        .newsletter-form button {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: #16a34a;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-form button:hover {
          background: #15803d;
          transform: scale(1.05);
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(22, 163, 74, 0.15);
          border-radius: 10px;
          border: 1px solid rgba(22, 163, 74, 0.3);
        }

        .newsletter-success svg {
          color: #16a34a;
          flex-shrink: 0;
        }

        .newsletter-success span {
          font-size: 14px;
          color: #16a34a;
          font-weight: 500;
        }

        .trust-badges {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
        }

        .trust-badge svg {
          color: #16a34a;
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: #0a0f1a;
        }

        .footer-bottom-content {
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-bottom-content p {
          font-size: 14px;
          color: #64748b;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-bottom-links a {
          font-size: 14px;
          color: #64748b;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #16a34a;
        }

        .footer-bottom-links .divider {
          color: #334155;
        }

        /* Delay classes */
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
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
            grid-template-columns: 1fr !important;
          }

          .footer-cta-section {
            padding: 40px 0;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-btn-primary,
          .cta-btn-secondary {
            width: 100%;
            text-align: center;
            justify-content: center;
          }

          .partner-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
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
