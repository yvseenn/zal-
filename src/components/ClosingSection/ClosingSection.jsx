import './ClosingSection.css'

// Closing CTA block for contact-style actions and external platform links.
export function ClosingSection({ instagramUrl, spotifyUrl }) {
  return (
    <section className="section closing" data-reveal>
      <div className="closing__panel">
        <p className="section-tag">Contacto</p>
        <h2>Listo para ampliar en directo, social y colaboración.</h2>
        <p>
          Este portfolio está diseñado como una base clara para presentar a ZALØ
          a promotores, creativos, marcas y prensa digital.
        </p>

        <div className="hero__actions">
          <a className="button" href={spotifyUrl} target="_blank" rel="noreferrer">
            Abrir Spotify
          </a>
          <a
            className="button button--secondary"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Contactar por Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
