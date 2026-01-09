'use client'

export default function TerminPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Telefontermin vereinbaren
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#525252', lineHeight: 1.7 }}>
            Vereinbaren Sie einen unverbindlichen Telefontermin mit unserem B2B-Team. 
            Wir besprechen Ihre Anforderungen und finden die passende Lösung.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section style={{ paddingBottom: '160px' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Benefits */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#171717', marginBottom: '32px' }}>
                Das erwartet Sie
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
                {[
                  {
                    title: 'Persönliche Beratung',
                    description: 'Wir nehmen uns Zeit für Ihre individuellen Anforderungen und Fragen.',
                  },
                  {
                    title: 'Aktuelle Preise & Verfügbarkeit',
                    description: 'Erhalten Sie direkt Informationen zu Preisen und Lieferzeiten.',
                  },
                  {
                    title: 'Projektbesprechung',
                    description: 'Besprechen Sie größere Projekte und erhalten Sie maßgeschneiderte Angebote.',
                  },
                  {
                    title: 'Unverbindlich & Kostenlos',
                    description: 'Kein Kaufzwang – wir beraten Sie gerne ohne Verpflichtung.',
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#16a34a',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#171717', marginBottom: '4px' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: '#737373', lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Person */}
              <div
                style={{
                  background: '#fafafa',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                  }}
                >
                  OB
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#171717' }}>Ouissam Benabbou</p>
                  <p style={{ fontSize: '14px', color: '#16a34a' }}>Ihr Ansprechpartner</p>
                </div>
              </div>
            </div>

            {/* Right - Booking Form */}
            <div
              style={{
                background: '#fafafa',
                borderRadius: '16px',
                padding: '40px',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '32px' }}>
                Termin anfragen
              </h2>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    Bevorzugte Uhrzeit
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  >
                    <option value="">Bitte auswählen</option>
                    <option value="morning">Vormittag (9-12 Uhr)</option>
                    <option value="afternoon">Nachmittag (12-17 Uhr)</option>
                    <option value="flexible">Flexibel</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    Nachricht (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Worum geht es in dem Gespräch?"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    marginTop: '8px',
                    padding: '16px 32px',
                    background: '#16a34a',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Termin anfragen
                </button>
              </form>

              <p style={{ fontSize: '13px', color: '#737373', marginTop: '20px' }}>
                Wir melden uns innerhalb von 24 Stunden bei Ihnen zurück.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
