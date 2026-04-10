import './ProfileSection.css'

// Secondary profile block for positioning, usage and presentation context.
export function ProfileSection({ profileCards }) {
  return (
    <>
      <section className="section info-block">
        <div className="info-block__intro" data-reveal>
          <p className="section-tag">Perfil</p>
          <h2>Un dossier visual para bookings, prensa y oportunidades.</h2>
          <p>
            El proyecto funciona como una marca artística compacta: canciones
            cortas, identidad reconocible, presencia en plataformas y un tono
            contemporáneo que encaja en el circuito urbano español.
          </p>
        </div>

        <div className="info-block__cards">
          {/* Cards stay generic so new capabilities can be added without layout changes. */}
          {profileCards.map((card, index) => (
            <article
              className="glass-card"
              key={card.title}
              data-reveal
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <p className="glass-card__eyebrow">0{index + 1}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section band" data-reveal>
        <p>
          Catálogo activo con foco en <strong>singles</strong>, imagen de marca y
          continuidad en <strong>Spotify</strong> + <strong>Instagram</strong>.
        </p>
      </section>
    </>
  )
}
