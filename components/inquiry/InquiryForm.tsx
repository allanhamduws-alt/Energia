'use client'

import { useState } from 'react'
import { useInquiryCart } from './InquiryCartContext'

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

interface InquiryFormProps {
  onBack: () => void
  onSuccess: () => void
}

export function InquiryForm({ onBack, onSuccess }: InquiryFormProps) {
  const { items } = useInquiryCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/product-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          products: items.map(item => ({
            name: item.name,
            subtitle: item.subtitle,
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
            specs: item.specs,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Anfrage konnte nicht gesendet werden')
      }

      setIsSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--green-600) 0%, var(--emerald-600) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'white',
          }}
        >
          <CheckIcon />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '12px' }}>
          Anfrage gesendet!
        </h3>
        <p style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>
          Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'var(--gray-100)',
          border: 'none',
          borderRadius: '8px',
          color: 'var(--gray-600)',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          marginBottom: '24px',
        }}
      >
        <ArrowLeftIcon />
        Zurück zur Liste
      </button>

      {/* Product summary */}
      <div
        style={{
          padding: '16px',
          background: 'var(--gray-50)',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid var(--gray-200)',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '8px' }}>
          Ausgewählte Produkte:
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid var(--gray-200)',
                fontSize: '14px',
              }}
            >
              <span style={{ color: 'var(--gray-900)', fontWeight: 500 }}>{item.name}</span>
              <span style={{ color: 'var(--gray-600)' }}>{item.quantity} {item.unit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Form fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Name row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '8px' }}>
              Vorname *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--gray-300)',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-500)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--gray-300)'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '8px' }}>
              Nachname *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--gray-300)',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-500)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--gray-300)'}
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '8px' }}>
            Firma *
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--gray-300)',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-500)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* Email */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '8px' }}>
            E-Mail *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--gray-300)',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-500)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* Phone */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '8px' }}>
            Telefon *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--gray-300)',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-500)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* Message */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '8px' }}>
            Nachricht (optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Besondere Anforderungen, gewünschte Lieferzeit, etc."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--gray-300)',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--green-500)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* Error message */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              color: '#dc2626',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: isSubmitting 
              ? 'var(--gray-400)' 
              : 'linear-gradient(135deg, var(--green-600) 0%, var(--emerald-600) 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '12px',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          {isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}
        </button>

        <p style={{ fontSize: '12px', color: 'var(--gray-500)', textAlign: 'center', marginTop: '8px' }}>
          Mit dem Absenden stimmen Sie unserer{' '}
          <a href="/datenschutz" style={{ color: 'var(--green-600)', textDecoration: 'underline' }}>
            Datenschutzerklärung
          </a>{' '}
          zu.
        </p>
      </div>
    </form>
  )
}

