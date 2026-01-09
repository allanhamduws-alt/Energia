import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz | Energia Supply Solution',
}

export default function DatenschutzPage() {
  return (
    <main style={{ paddingTop: '120px' }}>
      <section style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#171717', marginBottom: '48px' }}>
            Datenschutzerklärung
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', color: '#525252', lineHeight: 1.8 }}>
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                1. Datenschutz auf einen Blick
              </h2>
              <h3 style={{ fontWeight: 600, color: '#171717', marginTop: '24px', marginBottom: '8px' }}>
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit 
                denen Sie persönlich identifiziert werden können.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                2. Verantwortlicher
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
                Energia Supply Solution<br />
                Ouissam Benabbou<br />
                Schäferweg 6<br />
                30952 Hannover<br /><br />
                Telefon: 0163 73 73 663<br />
                E-Mail: connect@energia-b2b.de
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                3. Datenerfassung auf dieser Website
              </h2>
              <h3 style={{ fontWeight: 600, color: '#171717', marginTop: '24px', marginBottom: '8px' }}>
                Kontaktformular
              </h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>

              <h3 style={{ fontWeight: 600, color: '#171717', marginTop: '24px', marginBottom: '8px' }}>
                Cookies
              </h3>
              <p>
                Diese Website verwendet Cookies. Bei Cookies handelt es sich um kleine Textdateien, die Ihr 
                Browser automatisch erstellt und die auf Ihrem Gerät gespeichert werden. Wir verwenden 
                technisch notwendige Cookies, um unsere Website funktionsfähig zu halten.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                4. Ihre Rechte
              </h2>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
                personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung 
                sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
              <p style={{ marginTop: '16px' }}>
                Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit 
                an uns wenden.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                5. SSL-Verschlüsselung
              </h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber 
                senden, eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass 
                die Adresszeile des Browsers von http:// auf https:// wechselt.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
