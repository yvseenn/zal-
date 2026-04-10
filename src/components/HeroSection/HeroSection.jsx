import './HeroSection.css'

// Main landing block: core artist pitch on the left, animated stage on the right.
export function HeroSection({
  facts,
  instagramUrl,
  isPreviewActive,
  spotifyUrl,
}) {
  return (
    <section className="hero section">
      <div className="hero__copy" data-reveal>
        <p className="eyebrow">Portfolio / artista urbano español</p>
        <h1 className="hero__title">
          ZALØ
          <span>presencia local, estética global.</span>
        </h1>
        <p className="hero__lead">
          Artista urbano de Madrid con un proyecto centrado en reggaeton,
          melodía y una identidad visual pensada para impactar en digital,
          escenario y colaboración creativa.
        </p>

        <div className="hero__actions">
          <a className="button" href={spotifyUrl} target="_blank" rel="noreferrer">
            Escuchar en Spotify
          </a>
          <a
            className="button button--secondary"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ver Instagram
          </a>
        </div>

        <ul className="fact-list">
          {/* Facts are data-driven so they can be edited from artistData.js only. */}
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      <div className="hero__stage" data-reveal>
        <div className="hero__halo" />
        <div className="hero__grid" />
        {/* The vinyl reacts to the same hover state as the profile avatar. */}
        <div className={`hero__vinyl${isPreviewActive ? ' is-active' : ''}`} />
        <div className="hero__badge">
          <span>CV musical</span>
          <strong>2024-2025</strong>
        </div>
        <div className="hero__note hero__note--top">
          <span>Highlights</span>
          <strong>DarkSide / MI SELLO / RICOTA</strong>
        </div>
        <div className="hero__note hero__note--bottom">
          <span>Interaction</span>
          <strong>hover en el avatar para activar DarkSide</strong>
        </div>
        <div className="hero__title-shadow">ZALØ</div>
      </div>
    </section>
  )
}
