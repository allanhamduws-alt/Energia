'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'

interface ProductStats {
  module: number
  wechselrichter: number
  speicher: number
}

interface BrandCount {
  module: number
  wechselrichter: number
  speicher: number
}

interface Category {
  id: keyof ProductStats
  title: string
  description: string
  specs: string[]
  image: string
  gradient: string
  glowColor: string
  icon: React.ReactNode
}

const categories: Category[] = [
  {
    id: 'module',
    title: 'Solarmodule',
    description: 'Hocheffiziente Module von führenden Herstellern. Monokristallin, polykristallin und bifaziale Module für alle Anwendungsbereiche.',
    specs: ['Bis 700W', 'N-Type & P-Type', 'Bifazial', 'TOPCon'],
    image: '/images/products/solar-module.png',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
    glowColor: 'rgba(22, 163, 74, 0.4)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="M4.93 4.93l1.41 1.41"/>
        <path d="M17.66 17.66l1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="M6.34 17.66l-1.41 1.41"/>
        <path d="M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
  },
  {
    id: 'wechselrichter',
    title: 'Wechselrichter',
    description: 'String- und Hybrid-Wechselrichter für Privat- und Gewerbeanlagen. Zuverlässige Technik von Marktführern wie SMA, Huawei und Sungrow.',
    specs: ['3-50 kW', 'Hybrid & String', 'Smart Grid', '3-phasig'],
    image: '/images/products/inverter.png',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: 'speicher',
    title: 'Batteriespeicher',
    description: 'Moderne Batteriespeicher für maximale Eigenverbrauchsoptimierung. LFP-Technologie garantiert Sicherheit und Langlebigkeit.',
    specs: ['5-100 kWh', 'LFP Technologie', 'Modular', '6000+ Zyklen'],
    image: '/images/products/battery.png',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="18" height="10" rx="2" ry="2"/>
        <path d="M22 11v2"/>
        <path d="M6 11v2"/>
        <path d="M10 11v2"/>
        <path d="M14 11v2"/>
      </svg>
    ),
  },
]

export function ProductsOverview() {
  const [activeCategory, setActiveCategory] = useState<keyof ProductStats>('module')
  const [stats, setStats] = useState<ProductStats>({ module: 0, wechselrichter: 0, speicher: 0 })
  const [brandCounts, setBrandCounts] = useState<BrandCount>({ module: 0, wechselrichter: 0, speicher: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [contentKey, setContentKey] = useState(0)

  // Fetch product counts and brand counts from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, brandsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/brands'),
        ])
        const productsData = await productsRes.json()
        const brandsData = await brandsRes.json()
        
        const counts: ProductStats = { module: 0, wechselrichter: 0, speicher: 0 }
        productsData.forEach((product: { category: string }) => {
          if (counts[product.category as keyof ProductStats] !== undefined) {
            counts[product.category as keyof ProductStats]++
          }
        })
        
        // Count brands per category
        const brandCountsObj: BrandCount = { module: 0, wechselrichter: 0, speicher: 0 }
        brandsData.forEach((brand: { categories: string[] }) => {
          brand.categories.forEach((cat: string) => {
            if (brandCountsObj[cat as keyof BrandCount] !== undefined) {
              brandCountsObj[cat as keyof BrandCount]++
            }
          })
        })
        
        setStats(counts)
        setBrandCounts(brandCountsObj)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  const handleCategoryChange = useCallback((categoryId: keyof ProductStats) => {
    if (categoryId === activeCategory || isAnimating) return
    
    setIsAnimating(true)
    setContentKey(prev => prev + 1)
    
    // Brief delay for exit animation
    setTimeout(() => {
      setActiveCategory(categoryId)
      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 150)
  }, [activeCategory, isAnimating])

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0]
  const productCount = stats[activeCategory] || 0
  const brandCount = brandCounts[activeCategory] || 0

  return (
    <section 
      className="products-overview-section"
      style={{ 
        position: 'relative',
        minHeight: '600px',
        overflow: 'hidden',
      }}
    >
      {/* Background with Diagonal Split */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0f172a',
        }}
      />
      
      {/* Colored diagonal section */}
      <div 
        className="diagonal-bg"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          background: currentCategory.gradient,
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
          transition: 'background 0.5s ease-out',
        }}
      >
        {/* Geometric pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(30deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
              linear-gradient(-30deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${currentCategory.glowColor} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transition: 'background 0.5s ease-out',
          }}
        />
      </div>

      {/* Main content container */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header - Compact */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '40px',
            paddingBottom: '16px',
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '4px',
            }}
          >
            Unser Sortiment
          </h3>
          <p
            style={{ 
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
            }}
          >
            Wählen Sie eine Kategorie
          </p>
        </div>

        {/* Tab Navigation - Enhanced */}
        <div 
          className="tabs-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            paddingBottom: '32px',
          }}
        >
          {categories.map((category, index) => {
            const isActive = category.id === activeCategory
            const categoryColors: Record<string, string> = {
              module: '#22c55e',
              wechselrichter: '#3b82f6',
              speicher: '#f59e0b',
            }
            const accentColor = categoryColors[category.id] || '#22c55e'
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`category-tab ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  background: isActive 
                    ? `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)` 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isActive 
                    ? `2px solid ${accentColor}` 
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  minWidth: '120px',
                }}
              >
                {/* Pulse animation for non-active tabs */}
                {!isActive && (
                  <span
                    className="pulse-ring"
                    style={{
                      position: 'absolute',
                      inset: '-2px',
                      borderRadius: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      animation: 'pulse 2s ease-in-out infinite',
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />
                )}
                
                {/* Icon container */}
                <span 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: isActive ? accentColor : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {category.icon}
                </span>
                
                <span className="tab-label" style={{ fontWeight: isActive ? 700 : 500 }}>
                  {category.title}
                </span>
                
                {/* Active checkmark */}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '20px',
                      height: '20px',
                      background: accentColor,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Main Split Content */}
        <div 
          className="split-content"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
            minHeight: '380px',
          }}
        >
          {/* Left: Content Area */}
          <div 
            key={`content-${contentKey}`}
            className="content-area"
            style={{
              animation: 'slideInLeft 0.5s ease-out forwards',
            }}
          >
            {/* Category Badge */}
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '999px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
              }}
            >
              Unser Angebot
            </span>

            {/* Title */}
            <h2
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: 'white',
                marginBottom: '12px',
                lineHeight: 1.1,
              }}
            >
              {currentCategory.title}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.6,
                marginBottom: '20px',
                maxWidth: '480px',
              }}
            >
              {currentCategory.description}
            </p>

            {/* Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              {currentCategory.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                marginBottom: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div>
                <p 
                  className="stat-number"
                  style={{ 
                    fontSize: '2rem', 
                    fontWeight: 800, 
                    color: 'white',
                    lineHeight: 1,
                  }}
                >
                  {productCount}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                  Produkte
                </p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.15)' }} />
              <div>
                <p 
                  className="stat-number"
                  style={{ 
                    fontSize: '2rem', 
                    fontWeight: 800, 
                    color: 'white',
                    lineHeight: 1,
                  }}
                >
                  {brandCount}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                  Marken
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={`/produkte#${activeCategory}`}
              className="cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 22px',
                background: 'white',
                color: '#0f172a',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              <span>Alle Produkte ansehen</span>
              <svg 
                className="arrow-icon"
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ transition: 'transform 0.3s ease' }}
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Right: Image Area */}
          <div 
            key={`image-${contentKey}`}
            className="image-area"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '380px',
              animation: 'slideInRight 0.5s ease-out forwards',
            }}
          >
            {/* Product Image with Float Animation */}
            <div
              className="product-image-container"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '340px',
                height: '340px',
              }}
            >
              <Image
                src={currentCategory.image}
                alt={currentCategory.title}
                fill
                style={{
                  objectFit: 'contain',
                  filter: `drop-shadow(0 30px 60px ${currentCategory.glowColor})`,
                }}
                priority
              />
            </div>

            {/* Floating decorative elements */}
            <div
              className="floating-element"
              style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
              }}
            />
            <div
              className="floating-element-2"
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '5%',
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            />
          </div>
        </div>

        {/* Bottom Navigation Indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            paddingTop: '24px',
            paddingBottom: '40px',
          }}
        >
          {/* Progress dots with labels */}
          <div
                style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {categories.map((category, index) => {
              const isActive = category.id === activeCategory
              const categoryColors: Record<string, string> = {
                module: '#22c55e',
                wechselrichter: '#3b82f6',
                speicher: '#f59e0b',
              }
              const accentColor = categoryColors[category.id] || '#22c55e'
              
              return (
                <button
                  key={`dot-${category.id}`}
                  onClick={() => handleCategoryChange(category.id)}
                  className="nav-dot"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: isActive ? '8px 16px' : '8px',
                    background: isActive ? `${accentColor}22` : 'transparent',
                    border: isActive ? `1px solid ${accentColor}` : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Zu ${category.title} wechseln`}
                >
                  <span
                    style={{
                      width: isActive ? '10px' : '8px',
                      height: isActive ? '10px' : '8px',
                      borderRadius: '50%',
                      background: isActive ? accentColor : 'rgba(255, 255, 255, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {isActive && (
                    <span
                      style={{
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {category.title}
                    </span>
                  )}
                </button>
              )
            })}
                </div>

          {/* Swipe hint for mobile */}
          <p
            className="swipe-hint"
                      style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <span className="hint-text">Kategorie wechseln</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        .product-image-container {
          animation: float 4s ease-in-out infinite;
        }

        .floating-element {
          animation: floatSlow 5s ease-in-out infinite;
        }

        .floating-element-2 {
          animation: floatSlow 6s ease-in-out infinite reverse;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        .category-tab:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        .category-tab.active:hover {
          transform: translateY(-3px);
        }

        .category-tab:hover .pulse-ring {
          animation: none !important;
          opacity: 0 !important;
        }

        .nav-dot:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
        }

        .swipe-hint {
          animation: fadeInOut 3s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .split-content {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }

          .content-area {
            order: 2;
          }

          .image-area {
            order: 1;
            height: 300px !important;
          }

          .diagonal-bg {
            width: 100% !important;
            height: 50% !important;
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%) !important;
          }
        }

        @media (max-width: 768px) {
          .tab-label {
            display: none;
          }

          .category-tab {
            padding: 16px !important;
            min-width: auto !important;
          }

          .tabs-container {
            gap: 8px !important;
          }

          .image-area {
            height: 250px !important;
          }

          .product-image-container {
            max-width: 280px !important;
            height: 280px !important;
          }

          .hint-text {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
