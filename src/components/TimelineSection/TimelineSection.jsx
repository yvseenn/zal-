import './TimelineSection.css'

// Timeline keeps the project history readable and easy to extend year by year.
export function TimelineSection({ timeline }) {
  return (
    <section className="section timeline-layout">
      <div className="timeline-layout__headline" data-reveal>
        <p className="section-tag">CV</p>
        <h2>Trayectoria reciente</h2>
        <p>
          La narrativa se apoya en el crecimiento del catálogo y en una
          comunicación visual coherente con el universo urbano actual.
        </p>
      </div>

      <div className="timeline-layout__list">
        {/* Each milestone is rendered from data to avoid hardcoding more markup later. */}
        {timeline.map((item, index) => (
          <article
            className="timeline-item"
            key={item.year}
            data-reveal
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <div className="timeline-item__rail" aria-hidden="true">
              <span className="timeline-item__dot" />
            </div>
            <div className="timeline-item__content">
              <span className="timeline-item__year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
