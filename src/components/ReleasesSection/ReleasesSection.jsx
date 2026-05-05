import './ReleasesSection.css'
import { useEffect, useMemo, useRef, useState } from 'react'

// Release grid centered on real artwork plus a highlighted preview state.
export function ReleasesSection({ highlightTitle, isPreviewActive, releases }) {
  const gridRef = useRef(null)
  const cardRefs = useRef([])
  const [spotlightTitle, setSpotlightTitle] = useState(null)

  const releaseTitles = useMemo(() => releases.map((release) => release.title), [releases])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    // Keep only mounted nodes (React can reuse refs between renders).
    const getCards = () => cardRefs.current.filter(Boolean)

    const pickSpotlight = () => {
      const cards = getCards()
      if (cards.length === 0) return

      const gridRect = grid.getBoundingClientRect()
      const centerX = gridRect.left + gridRect.width / 2

      let bestTitle = null
      let bestDistance = Number.POSITIVE_INFINITY

      for (const card of cards) {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const distance = Math.abs(cardCenter - centerX)
        if (distance < bestDistance) {
          bestDistance = distance
          bestTitle = card.dataset.releaseTitle || null
        }
      }

      if (bestTitle) setSpotlightTitle(bestTitle)
    }

    let frameId = 0
    const onScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(pickSpotlight)
    }

    pickSpotlight()
    grid.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', pickSpotlight)

    return () => {
      cancelAnimationFrame(frameId)
      grid.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', pickSpotlight)
    }
  }, [releaseTitles])

  return (
    <section className="section releases" id="works">
      <div className="releases__intro" data-reveal>
        <p className="section-tag">Works</p>
        <h2>Selección</h2>
      </div>

      <div className="releases__grid" ref={gridRef}>
        {releases.map((release, index) => {
          // The highlighted release mirrors the audio currently attached to the avatar.
          const isHighlighted = isPreviewActive && release.title === highlightTitle
          const isSpotlight = spotlightTitle === release.title

          const CardTag = release.url ? 'a' : 'article'

          return (
            <CardTag
              className={`release-card${isHighlighted ? ' is-highlighted' : ''}${isSpotlight ? ' is-spotlight' : ''}`}
              key={release.title}
              data-reveal
              href={release.url || undefined}
              target={release.url ? '_blank' : undefined}
              rel={release.url ? 'noreferrer' : undefined}
              data-release-title={release.title}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
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
            </CardTag>
          )
        })}
      </div>
    </section>
  )
}
