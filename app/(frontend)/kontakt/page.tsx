'use client'

export default function KontaktPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Kontakt
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#525252', lineHeight: 1.7 }}>
            Haben Sie Fragen zu unseren Produkten oder möchten Sie eine Anfrage stellen? 
            Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ paddingBottom: '160px' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Contact Form */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#171717', marginBottom: '32px' }}>
                Nachricht senden
              </h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                      Vorname
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                      Nachname
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                  </div>
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
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    E-Mail
                  </label>
                  <input
                    type="email"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#171717', marginBottom: '8px' }}>
                    Nachricht
                  </label>
                  <textarea
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
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
                  Nachricht senden
                </button>
              </form>
            </div>

            {/* Right - Contact Info */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#171717', marginBottom: '32px' }}>
                Direkter Kontakt
              </h2>

              {/* Contact Card */}
              <div
                style={{
                  background: '#fafafa',
                  borderRadius: '12px',
                  padding: '32px',
                  marginBottom: '32px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
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
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#171717' }}>
                      Ouissam Benabbou
                    </h3>
                    <p style={{ color: '#16a34a', fontWeight: 500, fontSize: '14px' }}>Leitung B2B</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a
                    href="tel:+4916373673663"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: '12px', color: '#737373' }}>Telefon</p>
                      <p style={{ fontWeight: 600, color: '#171717' }}>0163 73 73 663</p>
                    </div>
                  </a>
                  <a
                    href="mailto:connect@energia-b2b.de"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: '12px', color: '#737373' }}>E-Mail</p>
                      <p style={{ fontWeight: 600, color: '#171717' }}>connect@energia-b2b.de</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Address */}
              <div
                style={{
                  background: '#fafafa',
                  borderRadius: '12px',
                  padding: '32px',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                  Adresse
                </h3>
                <p style={{ color: '#525252', lineHeight: 1.8 }}>
                  Energia Supply Solution<br />
                  Schäferweg 6<br />
                  30952 Hannover<br />
                  Deutschland
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
