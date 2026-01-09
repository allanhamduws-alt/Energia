'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Flame, ArrowRight } from 'lucide-react'

export function DealPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Nur auf der Startseite anzeigen
    if (!isMounted || pathname !== '/') return

    // Prüfe ob Popup schon gezeigt wurde (in dieser Session)
    const hasSeenDeal = sessionStorage.getItem('energia-deal-popup-v2')
    
    if (!hasSeenDeal) {
      // Verzögere das Popup etwas für bessere UX
      const timer = setTimeout(() => {
        setIsOpen(true)
        setIsAnimating(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [isMounted, pathname])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsOpen(false)
      sessionStorage.setItem('energia-deal-popup-v2', 'true')
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // Nicht rendern während SSR oder wenn nicht offen
  if (!isMounted || !isOpen) return null

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: isAnimating ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: isAnimating ? 'blur(4px)' : 'blur(0px)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: isAnimating ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Hot Badge - oben links */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 700,
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
          }}
        >
          <Flame size={14} />
          Deal der Woche
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            color: '#525252',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'white'
            e.currentTarget.style.color = '#171717'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.color = '#525252'
          }}
        >
          <X size={18} />
        </button>

        {/* Produkt-Bild Platzhalter */}
        <div
          style={{
            width: '100%',
            aspectRatio: '4/3',
            background: 'linear-gradient(145deg, #f5f5f5 0%, #e5e5e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.3 }}>
            <rect x="8" y="12" width="32" height="24" rx="2" stroke="#737373" strokeWidth="2"/>
            <line x1="8" y1="20" x2="40" y2="20" stroke="#737373" strokeWidth="1.5"/>
            <line x1="8" y1="28" x2="40" y2="28" stroke="#737373" strokeWidth="1.5"/>
            <line x1="18" y1="12" x2="18" y2="36" stroke="#737373" strokeWidth="1.5"/>
            <line x1="30" y1="12" x2="30" y2="36" stroke="#737373" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Produkt-Details */}
        <div style={{ padding: '24px' }}>
          {/* Kategorie Badge */}
          <div
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              background: '#f0fdf4',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#16a34a',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '12px',
            }}
          >
            Sonderangebot
          </div>

          {/* Produktname */}
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#171717',
              marginBottom: '6px',
              lineHeight: 1.2,
            }}
          >
            Aktueller Deal
          </h3>

          {/* Modellnummer / Beschreibung */}
          <p
            style={{
              fontSize: '15px',
              color: '#737373',
              marginBottom: '16px',
            }}
          >
            Wöchentlich wechselnde B2B-Angebote
          </p>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                padding: '6px 12px',
                background: '#fafafa',
                border: '1px solid #e5e5e5',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#525252',
              }}
            >
              Begrenzt
            </span>
            <span
              style={{
                padding: '6px 12px',
                background: '#fafafa',
                border: '1px solid #e5e5e5',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#525252',
              }}
            >
              Bis zu 15% Rabatt
            </span>
            <span
              style={{
                padding: '6px 12px',
                background: '#fafafa',
                border: '1px solid #e5e5e5',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#525252',
              }}
            >
              B2B
            </span>
          </div>

          {/* Trennlinie */}
          <div
            style={{
              height: '1px',
              background: '#e5e5e5',
              marginBottom: '16px',
            }}
          />

          {/* Preis und CTA */}
          <Link
            href="/deal"
            onClick={handleClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#16a34a',
              }}
            >
              Preis auf Anfrage
            </span>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#f0fdf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowRight size={18} color="#16a34a" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
