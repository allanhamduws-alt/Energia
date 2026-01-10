'use client'

import { useInquiryCart } from './InquiryCartContext'
import { useState } from 'react'
import { InquiryForm } from './InquiryForm'

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
)

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const categoryColors: { [key: string]: string } = {
  module: 'var(--green-600)',
  wechselrichter: '#3b82f6',
  speicher: '#f59e0b',
}

export function InquiryCartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, clearCart, totalItems } = useInquiryCart()
  const [showForm, setShowForm] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeDrawer()
      setIsClosing(false)
      setShowForm(false)
    }, 280)
  }

  if (!isDrawerOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="drawer-overlay"
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1001,
          opacity: isClosing ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Drawer */}
      <div
        className={isClosing ? 'drawer-exit' : 'drawer-enter'}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          background: 'white',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)' }}>
              {showForm ? 'Angebot anfordern' : 'Ihre Anfrageliste'}
            </h2>
            {!showForm && (
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '4px' }}>
                {totalItems} {totalItems === 1 ? 'Produkt' : 'Produkte'} ausgewählt
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--gray-100)',
              color: 'var(--gray-600)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {showForm ? (
            <InquiryForm 
              onBack={() => setShowForm(false)} 
              onSuccess={() => {
                clearCart()
                handleClose()
              }}
            />
          ) : items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--gray-500)',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--gray-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p style={{ fontWeight: 600, marginBottom: '8px' }}>Ihre Anfrageliste ist leer</p>
              <p style={{ fontSize: '14px' }}>
                Fügen Sie Produkte hinzu, um ein Angebot anzufordern
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '20px',
                    background: 'var(--gray-50)',
                    borderRadius: '16px',
                    border: '1px solid var(--gray-200)',
                  }}
                >
                  {/* Category badge & remove button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        background: `${categoryColors[item.category]}15`,
                        color: categoryColors[item.category],
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {item.categoryName}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--gray-400)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
                        e.currentTarget.style.color = '#ef4444'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--gray-400)'
                      }}
                      aria-label="Produkt entfernen"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  {/* Product info */}
                  <h3 style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '4px' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '12px' }}>
                    {item.subtitle}
                  </p>

                  {/* Specs */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {item.specs.map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '4px 10px',
                          background: 'white',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: 'var(--gray-600)',
                          border: '1px solid var(--gray-200)',
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Quantity controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--gray-200)',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                      Menge ({item.unit})
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'white',
                        borderRadius: '10px',
                        padding: '4px',
                        border: '1px solid var(--gray-200)',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'var(--gray-100)',
                          color: 'var(--gray-600)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MinusIcon />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="quantity-input"
                        style={{
                          width: '60px',
                          height: '32px',
                          textAlign: 'center',
                          border: 'none',
                          background: 'transparent',
                          fontSize: '15px',
                          fontWeight: 600,
                          color: 'var(--gray-900)',
                        }}
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'var(--gray-100)',
                          color: 'var(--gray-600)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!showForm && items.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid var(--gray-200)',
              background: 'white',
            }}
          >
            <button
              onClick={() => setShowForm(true)}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: 'linear-gradient(135deg, var(--green-600) 0%, var(--emerald-600) 100%)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              Angebot anfordern
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button
              onClick={clearCart}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '12px',
                background: 'transparent',
                color: 'var(--gray-500)',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Liste leeren
            </button>
          </div>
        )}
      </div>
    </>
  )
}

