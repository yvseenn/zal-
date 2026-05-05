import './BioSection.css'

export function BioSection({ bio }) {
  if (!bio) return null

  return (
    <section className="section bio" id="bio" data-reveal>
      <p className="section-tag">{bio.kicker || 'BIO'}</p>
      <h2 className="bio__headline">{bio.headline}</h2>
      <p className="bio__body">{bio.body}</p>

      {Array.isArray(bio.highlights) && bio.highlights.length > 0 ? (
        <div className="bio__highlights">
          <p className="bio__highlights-title">{bio.highlightsTitle || 'Highlights'}</p>
          <ul className="bio__highlights-list">
            {bio.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

