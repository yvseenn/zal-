import './ReleasesSection.css'
import { useEffect, useMemo, useRef, useState } from 'react'

// Release grid centered on real artwork plus a highlighted preview state.
export function ReleasesSection({ highlightTitle, isPreviewActive, releases }) {
  // Horizontal scroller element (the releases track).
  const gridRef = useRef(null)

  // Stores DOM refs for each card so we can calculate which one is closest to center.
  const cardRefs = useRef(new Map())

  // "Spotlight" is the release currently closest to the center of the scroller.
  // This makes the scroll feel more dynamic (the centered item becomes the focus).
  const [spotlightTitle, setSpotlightTitle] = useState(highlightTitle)

  // Hover should temporarily override spotlight (so it reacts instantly),
  // but we snap back to the centered item on mouse leave.
  const [hoveredTitle, setHoveredTitle] = useState(null)

  const releaseTitles = useMemo(() => releases.map((release) => release.title), [releases])

  useEffect(() => {
    const scroller = gridRef.current
    if (!scroller) return

    let frameId = 0

    const updateSpotlight = () => {
      frameId = 0

      const scrollerRect = scroller.getBoundingClientRect()
      const scrollerCenterX = scrollerRect.left + scrollerRect.width / 2

      let bestTitle = null
      let bestDistance = Number.POSITIVE_INFINITY

      for (const release of releases) {
        const node = cardRefs.current.get(release.title)
        if (!node) continue

        const rect = node.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const distance = Math.abs(centerX - scrollerCenterX)

        if (distance < bestDistance) {
          bestDistance = distance
          bestTitle = release.title
        }
      }

      if (bestTitle && bestTitle !== spotlightTitle) {
        setSpotlightTitle(bestTitle)
      }
    }

    const onScroll = () => {
      if (frameId) return
      frameId = requestAnimationFrame(updateSpotlight)
    }

    // Initialize on mount so we pick a spotlight even before interaction.
    onScroll()

    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frameId)
    }
  }, [releases, spotlightTitle])

  const activeTitle = hoveredTitle ?? spotlightTitle ?? highlightTitle

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
          const isSelected = activeTitle === release.title

          const CardTag = release.url ? 'a' : 'article'

          return (
            <CardTag
              className={`release-card${isHighlighted ? ' is-highlighted' : ''}${isSelected ? ' is-spotlight' : ''}`}
              key={release.title}
              data-reveal
              href={release.url || undefined}
              target={release.url ? '_blank' : undefined}
              rel={release.url ? 'noreferrer' : undefined}
              ref={(node) => {
                if (node) {
                  cardRefs.current.set(release.title, node)
                } else {
                  cardRefs.current.delete(release.title)
                }
              }}
              onMouseEnter={() => setHoveredTitle(release.title)}
              onMouseLeave={() => setHoveredTitle(null)}
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
              <div className="release-card__copy">
                <div className="release-card__meta">
                  <span>{release.tag}</span>
                  <span>{release.year}</span>
                </div>
                <h3>{release.title}</h3>
                <p>{release.note}</p>
              </div>
            </CardTag>
          )
        })}
      </div>
    </section>
  )
}
