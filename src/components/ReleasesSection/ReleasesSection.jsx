import './ReleasesSection.css'

// Release grid centered on real artwork plus a highlighted preview state.
export function ReleasesSection({ highlightTitle, isPreviewActive, releases }) {
  return (
    <section className="section releases">
      <div className="releases__intro" data-reveal>
        <p className="section-tag">Selección</p>
        <h2>Singles que definen la propuesta.</h2>
      </div>

      <div className="releases__grid">
        {releases.map((release, index) => {
          // The highlighted release mirrors the audio currently attached to the avatar.
          const isHighlighted = isPreviewActive && release.title === highlightTitle

          return (
            <article
              className={`release-card${isHighlighted ? ' is-highlighted' : ''}`}
              key={release.title}
              data-reveal
              style={{
                transitionDelay: `${index * 90}ms`,
                '--release-delay': `${index * 0.45}s`,
              }}
            >
              <div className="release-card__art">
                <img
                  src={release.artwork}
                  alt={`Portada del single ${release.title}`}
                  loading="lazy"
                />
              </div>
              <div className="release-card__meta">
                <span>{release.tag}</span>
                <span>{release.year}</span>
              </div>
              {release.title === highlightTitle ? (
                <p className="release-card__status">
                  {/* This label explains why DarkSide reacts when the avatar is hovered. */}
                  {isPreviewActive
                    ? 'Preview DarkSide activa'
                    : 'Se activa al hover en la foto de perfil'}
                </p>
              ) : null}
              <h3>{release.title}</h3>
              <p>{release.note}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
