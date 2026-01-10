'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useScrollAnimation, useScrollAnimationGroup } from '@/lib/useScrollAnimation'
import { useInquiryCart } from '@/components/inquiry'

// SVG Icons for categories
const SolarIcon = () => (
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
)

const InverterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

const BatteryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="18" height="10" rx="2" ry="2"/>
    <path d="M22 11v2"/>
    <path d="M6 11v2"/>
    <path d="M10 11v2"/>
    <path d="M14 11v2"/>
  </svg>
)

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const categoryIcons: { [key: string]: React.ReactNode } = {
  module: <SolarIcon />,
  wechselrichter: <InverterIcon />,
  speicher: <BatteryIcon />,
}

const categoryMeta: { [key: string]: { name: string; icon: string; gradient: string; glowColor: string; description: string; highlight: string; image: string } } = {
  module: {
    name: 'Solarmodule',
    icon: 'module',
    image: '/images/products/solar-module.png',
    description: 'Hochwertige Solarmodule von führenden Herstellern. Monokristallin, polykristallin und bifaziale Module für alle Anwendungsbereiche.',
    highlight: 'Premium N-Type & TOPCon',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
    glowColor: 'rgba(22, 163, 74, 0.3)',
  },
  wechselrichter: {
    name: 'Wechselrichter',
    icon: 'wechselrichter',
    image: '/images/products/inverter.png',
    description: 'String- und Hybridwechselrichter für Privat- und Gewerbeanlagen. Zuverlässige Technik von Marktführern wie SMA, Huawei und Sungrow.',
    highlight: 'Hybrid & String Solutions',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  speicher: {
    name: 'Batteriespeicher',
    icon: 'speicher',
    image: '/images/products/battery.png',
    description: 'Moderne Batteriespeicher für maximale Eigenverbrauchsoptimierung. LFP-Technologie garantiert Sicherheit und Langlebigkeit.',
    highlight: 'LFP-Technologie',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    glowColor: 'rgba(245, 158, 11, 0.3)',
  },
}

interface Brand {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  categories: string[]
}

interface Product {
  id: string
  name: string
  subtitle: string
  category: string
  brandId: string
  brand: {
    id: string
    name: string
    slug: string
    logoUrl: string | null
  }
  imageUrl: string | null
  specs: string[]
  detailedSpecs: { [key: string]: string }
  unit: string
  featured: boolean
  sortOrder: number
  isActive: boolean
}

export default function ProduktePage() {
  return (
    <Suspense fallback={<ProdukteLoading />}>
      <ProdukteContent />
    </Suspense>
  )
}

function ProdukteLoading() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid var(--gray-200)',
            borderTopColor: 'var(--green-600)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: 'var(--gray-500)' }}>Produkte werden geladen...</p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </main>
  )
}

function ProdukteContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('module')
  // Hero is always visible immediately (no scroll animation needed for above-fold content)
  const heroVisible = true
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states from URL
  const selectedBrands = searchParams.get('marke')?.split(',').filter(Boolean) || []

  // Fetch products and brands
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, brandsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/brands'),
        ])
        
        const productsData = await productsRes.json()
        const brandsData = await brandsRes.json()
        
        setProducts(productsData)
        setBrands(brandsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: { [key: string]: Product[] } = {
      module: [],
      wechselrichter: [],
      speicher: [],
    }
    
    products.forEach((product) => {
      // Apply brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.slug)) {
        return
      }
      if (grouped[product.category]) {
        grouped[product.category].push(product)
      }
    })
    
    return grouped
  }, [products, selectedBrands])

  // Get brands for a specific category
  const getBrandsForCategory = (category: string) => {
    return brands.filter(brand => brand.categories.includes(category))
  }

  // Handle brand filter toggle
  const toggleBrandFilter = (brandSlug: string) => {
    const newBrands = selectedBrands.includes(brandSlug)
      ? selectedBrands.filter(b => b !== brandSlug)
      : [...selectedBrands, brandSlug]
    
    const params = new URLSearchParams(searchParams.toString())
    if (newBrands.length > 0) {
      params.set('marke', newBrands.join(','))
    } else {
      params.delete('marke')
    }
    
    router.push(`/produkte?${params.toString()}`, { scroll: false })
  }

  // Clear all filters
  const clearFilters = () => {
    router.push('/produkte', { scroll: false })
  }

  const categories = Object.keys(categoryMeta)
  // Categories grid is always visible immediately (no scroll animation needed for above-fold content)
  const gridVisible = [true, true, true]

  if (loading) {
    return (
      <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '3px solid var(--gray-200)',
              borderTopColor: 'var(--green-600)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ color: 'var(--gray-500)' }}>Produkte werden geladen...</p>
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Hero Section with Gradient Background */}
      <section
        style={{
          position: 'relative',
          paddingTop: '100px',
          paddingBottom: '80px',
          background: 'linear-gradient(180deg, var(--slate-900) 0%, #1a1f2e 50%, var(--slate-900) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Gradient Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(22, 163, 74, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
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
              B2B Solarhandel • Premium Produkte
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
              Unser{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--green-500), var(--emerald-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Produktportfolio
              </span>
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--gray-300)',
                lineHeight: 1.7,
                maxWidth: '600px',
                margin: '0 auto 40px',
              }}
            >
              Qualitätsprodukte für Ihren B2B-Bedarf – von Modulen über Wechselrichter bis zu
              Speicherlösungen. Alle Top-Marken aus einer Hand.
            </p>

            {/* Quick Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {categories.map((catId) => {
                const cat = categoryMeta[catId]
                const isActive = activeCategory === catId
                return (
                  <button
                    key={catId}
                    onClick={() => {
                      setActiveCategory(catId)
                      document.getElementById(catId)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      background: isActive ? 'rgba(22, 163, 74, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                      border: isActive ? '1px solid rgba(22, 163, 74, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '999px',
                      color: isActive ? 'white' : 'var(--gray-200)',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>{categoryIcons[cat.icon]}</span>
                    {cat.name}
                    <span style={{ 
                      padding: '2px 8px', 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '999px', 
                      fontSize: '12px',
                      marginLeft: '4px',
                    }}>
                      {productsByCategory[catId]?.length || 0}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section
        style={{
          padding: '24px 0',
          background: 'white',
          borderBottom: '1px solid var(--gray-200)',
          position: 'sticky',
          top: '80px',
          zIndex: 40,
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: showFilters ? 'var(--green-50)' : 'var(--gray-100)',
                  border: showFilters ? '1px solid var(--green-300)' : '1px solid var(--gray-200)',
                  borderRadius: '10px',
                  color: showFilters ? 'var(--green-700)' : 'var(--gray-700)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <FilterIcon />
                Marken filtern
                {selectedBrands.length > 0 && (
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      background: 'var(--green-600)',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {selectedBrands.length}
                  </span>
                )}
              </button>

              {/* Active Filter Tags */}
              {selectedBrands.length > 0 && (
                <>
                  {selectedBrands.map((slug) => {
                    const brand = brands.find(b => b.slug === slug)
                    if (!brand) return null
                    return (
                      <span
                        key={slug}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          background: 'var(--green-50)',
                          border: '1px solid var(--green-200)',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--green-700)',
                        }}
                      >
                        {brand.name}
                        <button
                          onClick={() => toggleBrandFilter(slug)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '16px',
                            height: '16px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            color: 'var(--green-600)',
                          }}
                        >
                          <XIcon />
                        </button>
                      </span>
                    )
                  })}
                  <button
                    onClick={clearFilters}
                    style={{
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--gray-500)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Filter zurücksetzen
                  </button>
                </>
              )}
            </div>

            <div style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
              {products.filter(p => selectedBrands.length === 0 || selectedBrands.includes(p.brand.slug)).length} Produkte
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div
              style={{
                marginTop: '20px',
                padding: '24px',
                background: 'var(--gray-50)',
                borderRadius: '12px',
                border: '1px solid var(--gray-200)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
                {['module', 'wechselrichter', 'speicher'].map((category) => {
                  const categoryBrands = getBrandsForCategory(category)
                  if (categoryBrands.length === 0) return null
                  return (
                    <div key={category}>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                        {categoryMeta[category].name}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {categoryBrands.map((brand) => (
                          <label
                            key={brand.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '8px 12px',
                              background: selectedBrands.includes(brand.slug) ? 'var(--green-50)' : 'white',
                              border: selectedBrands.includes(brand.slug) ? '1px solid var(--green-300)' : '1px solid var(--gray-200)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand.slug)}
                              onChange={() => toggleBrandFilter(brand.slug)}
                              style={{ display: 'none' }}
                            />
                            <span
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '4px',
                                border: selectedBrands.includes(brand.slug) ? '2px solid var(--green-600)' : '2px solid var(--gray-300)',
                                background: selectedBrands.includes(brand.slug) ? 'var(--green-600)' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {selectedBrands.includes(brand.slug) && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              )}
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--gray-700)', fontWeight: 500 }}>
                              {brand.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview Grid */}
      <section
        style={{
          paddingTop: '100px',
          paddingBottom: '40px',
          background: 'var(--white)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px',
            }}
          >
            {categories.map((catId, index) => {
              const category = categoryMeta[catId]
              const productCount = productsByCategory[catId]?.length || 0
              return (
                <a
                  key={catId}
                  href={`#${catId}`}
                  className="card-hover"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--gray-200)',
                    textDecoration: 'none',
                    opacity: gridVisible[index] ? 1 : 0,
                    transform: gridVisible[index] ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease-out ${index * 0.15}s`,
                  }}
                >
                  {/* Category Image Container with Premium Effects */}
                  <div
                    style={{
                      position: 'relative',
                      height: '200px',
                      background: `radial-gradient(ellipse at center, ${category.glowColor.replace('0.3', '0.15')} 0%, transparent 70%), ${category.gradient}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Geometric Pattern Lines */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `
                          linear-gradient(30deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
                          linear-gradient(150deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%)
                        `,
                        backgroundSize: '60px 60px',
                      }}
                    />

                    {/* Product Image with Glow */}
                    <div
                      className="product-image-hover"
                      style={{
                        position: 'relative',
                        width: '160px',
                        height: '160px',
                        zIndex: 1,
                      }}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        style={{
                          objectFit: 'contain',
                          filter: `drop-shadow(0 20px 40px ${category.glowColor})`,
                          mixBlendMode: 'multiply',
                        }}
                      />
                    </div>

                    {/* Highlight Badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '6px 12px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '999px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {category.highlight}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '28px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: category.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        {categoryIcons[category.icon]}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: 'var(--gray-900)',
                        }}
                      >
                        {category.name}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: '15px',
                        color: 'var(--gray-600)',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                      }}
                    >
                      {category.description}
                    </p>

                    {/* Quick Stats */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        paddingTop: '20px',
                        borderTop: '1px solid var(--gray-100)',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gray-900)' }}>
                          {productCount}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                          Produkte
                        </p>
                      </div>
                      <div style={{ width: '1px', height: '32px', background: 'var(--gray-200)' }} />
                      <div>
                        <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gray-900)' }}>
                          {new Set(productsByCategory[catId]?.map(p => p.brand.slug) || []).size}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>
                          Marken
                        </p>
                      </div>
                    </div>

                    {/* View More Link */}
                    <div
                      style={{
                        marginTop: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--green-600)',
                        fontSize: '15px',
                        fontWeight: 600,
                      }}
                    >
                      Alle Produkte ansehen
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed Category Sections with Expandable Cards */}
      {categories.map((catId, catIndex) => {
        const category = categoryMeta[catId]
        const categoryProducts = productsByCategory[catId] || []
        return (
          <CategorySection 
            key={catId} 
            categoryId={catId}
            category={category} 
            products={categoryProducts}
            index={catIndex} 
          />
        )
      })}

      {/* CTA Section */}
      <section
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

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '20px',
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
                Bestellung?
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
              Kontaktieren Sie uns für individuelle Angebote, Mengenrabatte und persönliche Beratung.
              Wir sind Ihr zuverlässiger B2B-Partner für Solarprodukte.
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
                className="btn-pulse"
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
                Anfrage stellen
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/termin"
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
                Termin vereinbaren
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Separate component for category sections with expandable product cards
function CategorySection({ 
  categoryId,
  category, 
  products,
  index 
}: { 
  categoryId: string
  category: { name: string; icon: string; gradient: string; glowColor: string; description: string; highlight: string; image: string }
  products: Product[]
  index: number 
}) {
  const [sectionRef, sectionVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)

  // Calculate category specs from products
  const categorySpecs = useMemo(() => {
    if (products.length === 0) return {}
    
    // Generic specs based on category
    if (categoryId === 'module') {
      return {
        'Leistung': '400W - 700W+',
        'Technologie': 'Mono, Bifazial, TOPCon',
        'Garantie': 'Bis zu 30 Jahre',
        'Wirkungsgrad': 'Bis zu 22.8%',
      }
    }
    if (categoryId === 'wechselrichter') {
      return {
        'Leistung': '3kW - 250kW+',
        'Typen': 'String, Hybrid, Zentral',
        'Phasen': '1-phasig & 3-phasig',
        'Wirkungsgrad': 'Bis zu 98.6%',
      }
    }
    return {
      'Kapazität': '5kWh - 100kWh+',
      'Technologie': 'LFP (LiFePO4)',
      'Lebensdauer': '6000+ Zyklen',
      'Garantie': 'Bis zu 15 Jahre',
    }
  }, [categoryId, products.length])

  if (products.length === 0) {
    return null
  }

  return (
    <section
      id={categoryId}
      ref={sectionRef}
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        background: index % 2 === 0 ? 'var(--gray-50)' : 'white',
      }}
    >
      <div className="container">
        <div
          className="product-section-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Left - Category Info */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
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
                  borderRadius: '16px',
                  background: category.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {category.icon === 'module' && (
                    <>
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2"/>
                      <path d="M12 20v2"/>
                      <path d="M4.93 4.93l1.41 1.41"/>
                      <path d="M17.66 17.66l1.41 1.41"/>
                      <path d="M2 12h2"/>
                      <path d="M20 12h2"/>
                      <path d="M6.34 17.66l-1.41 1.41"/>
                      <path d="M19.07 4.93l-1.41 1.41"/>
                    </>
                  )}
                  {category.icon === 'wechselrichter' && (
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  )}
                  {category.icon === 'speicher' && (
                    <>
                      <rect x="2" y="7" width="18" height="10" rx="2" ry="2"/>
                      <path d="M22 11v2"/>
                      <path d="M6 11v2"/>
                      <path d="M10 11v2"/>
                      <path d="M14 11v2"/>
                    </>
                  )}
                </svg>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--gray-900)',
                }}
              >
                {category.name}
              </h2>
            </div>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--gray-600)',
                marginBottom: '40px',
                lineHeight: 1.7,
              }}
            >
              {category.description}
            </p>

            {/* Products List with Expandable Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {products.map((product, i) => (
                <ExpandableProductCard
                  key={product.id}
                  product={product}
                  category={category}
                  index={i}
                  isExpanded={expandedProduct === product.id}
                  onToggle={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                  sectionVisible={sectionVisible}
                />
              ))}
            </div>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--gray-500)',
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Weitere Produkte auf Anfrage verfügbar
            </p>
          </div>

          {/* Right - Specs Card with Image */}
          <div
            style={{
              position: 'sticky',
              top: '180px',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            {/* Product Showcase with Enhanced Effects */}
            <div
              style={{
                background: `radial-gradient(ellipse at center, ${category.glowColor.replace('0.3', '0.2')} 0%, transparent 60%), ${category.gradient}`,
                borderRadius: '24px',
                padding: '40px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '280px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Geometric Pattern */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    linear-gradient(30deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
                    linear-gradient(-30deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              <div
                className="float-slow"
                style={{
                  position: 'relative',
                  width: '220px',
                  height: '220px',
                }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{
                    objectFit: 'contain',
                    filter: `drop-shadow(0 25px 50px ${category.glowColor})`,
                  }}
                />
              </div>
            </div>

            {/* Specs Card */}
            <div
              style={{
                background: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: '20px',
                padding: '32px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--gray-900)',
                  marginBottom: '24px',
                }}
              >
                Technische Übersicht
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {Object.entries(categorySpecs).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--gray-100)',
                    }}
                  >
                    <span style={{ color: 'var(--gray-600)' }}>{key}</span>
                    <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{value}</span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--gray-500)',
                  marginTop: '24px',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}
              >
                Individuelle Anfrage? Kontaktieren Sie uns für spezifische Produktanforderungen und Mengenrabatte.
              </p>
              <Link
                href="/kontakt"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px 24px',
                  background: category.gradient,
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                }}
              >
                Anfrage stellen →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .product-section-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// Expandable Product Card Component
function ExpandableProductCard({ 
  product, 
  category, 
  index, 
  isExpanded, 
  onToggle,
  sectionVisible 
}: { 
  product: Product
  category: { name: string; icon: string; gradient: string; glowColor: string; description: string; highlight: string; image: string }
  index: number
  isExpanded: boolean
  onToggle: () => void
  sectionVisible: boolean
}) {
  const { addItem } = useInquiryCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToInquiry = () => {
    addItem({
      name: product.name,
      subtitle: product.subtitle,
      category: product.category,
      categoryName: category.name,
      quantity,
      unit: product.unit,
      specs: product.specs,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className="product-hover"
      style={{
        background: 'white',
        borderRadius: '16px',
        border: product.featured ? `2px solid ${category.glowColor.replace('0.3', '0.6')}` : '1px solid var(--gray-200)',
        overflow: 'hidden',
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `all 0.5s ease-out ${index * 0.1}s`,
        position: 'relative',
      }}
    >
      {/* Main Card Content - Clickable */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          cursor: 'pointer',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Featured Badge */}
        {product.featured && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '4px 10px',
              background: category.gradient,
              color: 'white',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Empfohlen
          </span>
        )}

        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <p style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--gray-900)' }}>
              {product.name}
            </p>
            {product.brand.logoUrl && (
              <Image
                src={product.brand.logoUrl}
                alt={product.brand.name}
                width={60}
                height={20}
                style={{ height: '16px', width: 'auto', objectFit: 'contain', opacity: 0.7 }}
                unoptimized
              />
            )}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '4px' }}>
            {product.subtitle}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {product.specs.map((spec, j) => (
            <span
              key={j}
              style={{
                padding: '6px 14px',
                background: 'var(--gray-100)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--gray-700)',
              }}
            >
              {spec}
            </span>
          ))}
          <span
            className="transition-transform"
            style={{
              marginLeft: '8px',
              color: 'var(--gray-400)',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronDown />
          </span>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div
          className="expand-content"
          style={{
            borderTop: '1px solid var(--gray-100)',
            background: 'var(--gray-50)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '32px',
              padding: '24px',
            }}
          >
            {/* Product Image */}
            <div
              style={{
                position: 'relative',
                height: '180px',
                background: `radial-gradient(ellipse at center, ${category.glowColor.replace('0.3', '0.1')} 0%, transparent 70%)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--gray-200)',
              }}
            >
              <Image
                src={product.imageUrl || category.image}
                alt={product.name}
                width={140}
                height={140}
                style={{
                  objectFit: 'contain',
                  filter: `drop-shadow(0 10px 20px ${category.glowColor})`,
                }}
              />
            </div>

            {/* Detailed Specs */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '16px' }}>
                Technische Daten
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {Object.entries(product.detailedSpecs).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid var(--gray-200)',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{key}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-900)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Inquiry Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              padding: '20px 24px',
              borderTop: '1px solid var(--gray-200)',
              background: 'white',
              flexWrap: 'wrap',
            }}
          >
            {/* Quantity Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>Menge ({product.unit}):</span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0',
                  background: 'var(--gray-100)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid var(--gray-200)',
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuantity(Math.max(1, quantity - 1))
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--gray-600)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <MinusIcon />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  onClick={(e) => e.stopPropagation()}
                  className="quantity-input"
                  style={{
                    width: '70px',
                    height: '40px',
                    textAlign: 'center',
                    border: 'none',
                    background: 'white',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--gray-900)',
                  }}
                  min="1"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuantity(quantity + 1)
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--gray-600)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>

            {/* Add to Inquiry Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleAddToInquiry()
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: added ? 'var(--green-600)' : category.gradient,
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '200px',
                justifyContent: 'center',
              }}
            >
              {added ? (
                <>
                  <CheckIcon />
                  Hinzugefügt!
                </>
              ) : (
                <>
                  <PlusIcon />
                  Zur Anfrage hinzufügen
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
