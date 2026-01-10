'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ProductStats {
  module: number
  wechselrichter: number
  speicher: number
}

const products = [
  {
    id: 1,
    title: 'Solarmodule',
    description: 'Hocheffiziente Module von führenden Herstellern',
    specs: ['Bis 700W', 'N-Type & P-Type', 'Bifazial'],
    category: 'module',
    categoryLabel: 'Solarmodul',
    href: '/produkte#module',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="24" rx="2" stroke="#16a34a" strokeWidth="2"/>
        <line x1="8" y1="20" x2="40" y2="20" stroke="#16a34a" strokeWidth="1.5"/>
        <line x1="8" y1="28" x2="40" y2="28" stroke="#16a34a" strokeWidth="1.5"/>
        <line x1="18" y1="12" x2="18" y2="36" stroke="#16a34a" strokeWidth="1.5"/>
        <line x1="30" y1="12" x2="30" y2="36" stroke="#16a34a" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Wechselrichter',
    description: 'String- und Hybrid-Wechselrichter aller Leistungsklassen',
    specs: ['3-50 kW', 'Hybrid & String', 'Smart Grid'],
    category: 'wechselrichter',
    categoryLabel: 'Wechselrichter',
    href: '/produkte#wechselrichter',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="10" width="28" height="28" rx="3" stroke="#16a34a" strokeWidth="2"/>
        <path d="M20 20L24 28L28 20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="32" r="2" fill="#16a34a"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Speicher',
    description: 'Batteriespeicher für Eigenverbrauchsoptimierung',
    specs: ['5-100 kWh', 'LFP Technologie', 'Modular'],
    category: 'speicher',
    categoryLabel: 'Speicher',
    href: '/produkte#speicher',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="14" y="12" width="20" height="28" rx="2" stroke="#16a34a" strokeWidth="2"/>
        <rect x="18" y="8" width="12" height="4" rx="1" fill="#16a34a"/>
        <rect x="18" y="18" width="12" height="4" rx="1" fill="#dcfce7"/>
        <rect x="18" y="24" width="12" height="4" rx="1" fill="#dcfce7"/>
        <rect x="18" y="30" width="12" height="4" rx="1" fill="#16a34a"/>
      </svg>
    ),
  },
]

export function ProductsOverview() {
  const [stats, setStats] = useState<ProductStats>({ module: 0, wechselrichter: 0, speicher: 0 })

  // Fetch product counts from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/products')
        const productsData = await res.json()
        
        const counts: ProductStats = { module: 0, wechselrichter: 0, speicher: 0 }
        productsData.forEach((product: { category: string }) => {
          if (counts[product.category as keyof ProductStats] !== undefined) {
            counts[product.category as keyof ProductStats]++
          }
        })
        
        setStats(counts)
      } catch (error) {
        console.error('Error fetching product stats:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <section style={{ paddingTop: '100px', paddingBottom: '100px', background: '#f5f5f5' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <p
                style={{ 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: '#16a34a', 
                  marginBottom: '12px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}
              >
                Unser Angebot
              </p>
              <h2
                style={{ 
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', 
                  fontWeight: 700, 
                  color: '#171717' 
                }}
              >
                Produkte für Profis
              </h2>
            </div>
            <Link
              href="/produkte"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#16a34a',
                padding: '12px 20px',
                borderRadius: '8px',
                border: '1px solid #16a34a',
              }}
            >
              Alle Produkte
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Products Grid - 3 Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="products-grid"
        >
          {products.map((product) => {
            const productCount = stats[product.category as keyof ProductStats] || 0
            return (
              <Link
                key={product.id}
                href={product.href}
                style={{
                  display: 'block',
                  background: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '32px',
                  height: '100%',
                }}
                className="product-link"
              >
                {/* Product Icon */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    background: '#f0fdf4',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {product.icon}
                </div>

                {/* Category Badge with Count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {product.categoryLabel}
                  </span>
                  {productCount > 0 && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        background: '#f5f5f5',
                        color: '#525252',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: '4px',
                      }}
                    >
                      {productCount} Produkte
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '8px' }}>
                  {product.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#737373', marginBottom: '20px', lineHeight: 1.6 }}>
                  {product.description}
                </p>

                {/* Specs Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {product.specs.map((spec, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 12px',
                        background: '#f5f5f5',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#525252',
                        fontWeight: 500,
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ 
                  paddingTop: '20px', 
                  borderTop: '1px solid #f5f5f5', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <span style={{ fontSize: '14px', color: '#16a34a', fontWeight: 600 }}>
                    Preis anfragen
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#f0fdf4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .product-link:hover {
          border-color: #16a34a;
        }
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
