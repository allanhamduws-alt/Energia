'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Flame, ChevronDown } from 'lucide-react'

const navigation = [
  { name: 'Startseite', href: '/' },
  { 
    name: 'Produkte', 
    href: '/produkte',
    dropdown: [
      { name: 'Solarmodule', href: '/produkte#module' },
      { name: 'Wechselrichter', href: '/produkte#wechselrichter' },
      { name: 'Speicher', href: '/produkte#speicher' },
    ]
  },
  { name: 'Marken', href: '/marken' },
  { name: 'Referenzen', href: '/referenzen' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'white',
        borderBottom: isScrolled ? '1px solid #e5e5e5' : '1px solid transparent',
        height: '80px',
      }}
    >
      <div className="container" style={{ height: '100%' }}>
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="14" width="36" height="28" rx="4" fill="#16a34a" />
              <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="1.5" />
              <line x1="6" y1="32" x2="42" y2="32" stroke="white" strokeWidth="1.5" />
              <line x1="18" y1="14" x2="18" y2="42" stroke="white" strokeWidth="1.5" />
              <line x1="30" y1="14" x2="30" y2="42" stroke="white" strokeWidth="1.5" />
              <circle cx="24" cy="8" r="4" fill="#15803d" />
            </svg>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#171717', fontFamily: 'var(--font-sans)' }}>
              Energia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="hidden lg:flex"
          >
            {navigation.map((item) => (
              item.dropdown ? (
                <div 
                  key={item.name}
                  ref={dropdownRef}
                  style={{ position: 'relative' }}
                >
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: pathname.startsWith('/produkte') ? '#16a34a' : '#525252',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {item.name}
                    <ChevronDown 
                      size={16} 
                      style={{ 
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }} 
                    />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '12px',
                        background: 'white',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        padding: '8px 0',
                        minWidth: '180px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          style={{
                            display: 'block',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#525252',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f5f5f5'
                            e.currentTarget.style.color = '#16a34a'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = '#525252'
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: pathname === item.href ? '#16a34a' : '#525252',
                  }}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden lg:flex">
            <Link
              href="/deal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '100px',
              }}
            >
              <Flame size={16} />
              Hot Deal
            </Link>
            <Link
              href="/termin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: '#16a34a',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '8px',
              }}
            >
              Termin buchen
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
            style={{
              padding: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '80px',
            background: 'white',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto',
          }}
          className="lg:hidden"
        >
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '16px 0',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: pathname === item.href ? '#16a34a' : '#171717',
                  borderBottom: '1px solid #e5e5e5',
                }}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div style={{ paddingLeft: '16px' }}>
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#525252',
                      }}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/deal"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 20px',
              marginTop: '16px',
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
            }}
          >
            <Flame size={18} />
            Hot Deal der Woche
          </Link>
          <Link
            href="/termin"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
              padding: '16px',
              background: '#16a34a',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
            }}
          >
            Termin buchen
          </Link>
        </div>
      )}
    </header>
  )
}
