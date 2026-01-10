'use client'

import { useInquiryCart } from './InquiryCartContext'
import { useEffect, useState } from 'react'

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)

export function InquiryCartButton() {
  const { totalItems, openDrawer } = useInquiryCart()
  const [animate, setAnimate] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button when there are items
    if (totalItems > 0 && !isVisible) {
      setIsVisible(true)
    }
    // Animate on count change
    if (totalItems > 0) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 300)
      return () => clearTimeout(timer)
    }
  }, [totalItems, isVisible])

  if (!isVisible && totalItems === 0) return null

  return (
    <button
      onClick={openDrawer}
      className={totalItems > 0 ? 'cart-button-appear' : ''}
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '24px',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--green-600) 0%, var(--emerald-600) 100%)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(22, 163, 74, 0.4)',
        zIndex: 1000,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: animate ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(22, 163, 74, 0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(22, 163, 74, 0.4)'
      }}
      aria-label={`Anfrageliste öffnen (${totalItems} Produkte)`}
    >
      <CartIcon />
      
      {/* Badge with count */}
      {totalItems > 0 && (
        <span
          className={animate ? 'badge-pop' : ''}
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            minWidth: '24px',
            height: '24px',
            borderRadius: '12px',
            background: 'var(--gold-500)',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {totalItems}
        </span>
      )}
      
      {/* Label text */}
      <span
        style={{
          position: 'absolute',
          bottom: '-28px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--gray-700)',
          background: 'white',
          padding: '4px 12px',
          borderRadius: '999px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        Anfrage
      </span>
    </button>
  )
}

