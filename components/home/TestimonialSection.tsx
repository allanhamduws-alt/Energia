'use client'

const testimonials = [
  {
    id: 1,
    quote: 'Seit Jahren zufriedener Kunde bei Energia. Ehrliche Produkte und guter Service. Klare und angenehme Plattform.',
    author: 'G. Stolk',
    company: 'Solar Solutions GmbH',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Zuverlässig, technisch versiert, proaktiv und hält sich strikt an Vereinbarungen. Ein toller Partner für die Zusammenarbeit.',
    author: 'M. el Harbachi',
    company: 'EnergieTech Nord',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Termine werden eingehalten und bei Fragen ist man direkt telefonisch erreichbar. Auch bei der Lieferung verschiedener Solarmodultypen werden alle Fragen gerne beantwortet.',
    author: 'S. Pieters',
    company: 'SunPower Installation',
    rating: 5,
  },
]

// Star Icon SVG
const StarIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="#fbbf24" 
    stroke="#fbbf24" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

// Quote Icon SVG
const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
)

export function TestimonialSection() {
  return (
    <section
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        background: 'linear-gradient(180deg, #f8faf8 0%, #f0fdf4 100%)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#16a34a',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Kundenstimmen
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: '#171717',
            }}
          >
            Was unsere Partner sagen
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #e5e5e5',
                position: 'relative',
              }}
            >
              {/* Quote icon */}
              <div style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0.5 }}>
                <QuoteIcon />
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: '#525252',
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#171717' }}>
                    {testimonial.author}
                  </p>
                  <p style={{ fontSize: '13px', color: '#737373' }}>
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
