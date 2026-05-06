import './ReleasesSection.css'
import { useEffect, useMemo, useRef, useState } from 'react'

// Editorial release carousel with stacked artwork and oversized navigation.
export function ReleasesSection({ highlightTitle, isPreviewActive, releases }) {
  const hoverTimeoutRef = useRef(null)
  const hoverUnlockTimeoutRef = useRef(null)
  const hoverLockedRef = useRef(false)
  const releaseCount = releases.length

  const highlightIndex = useMemo(() => {
    const matchIndex = releases.findIndex((release) => release.title === highlightTitle)
    return matchIndex >= 0 ? matchIndex : 0
  }, [highlightTitle, releases])

  const [activeIndex, setActiveIndex] = useState(highlightIndex)

  useEffect(() => (
    () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      if (hoverUnlockTimeoutRef.current) {
        clearTimeout(hoverUnlockTimeoutRef.current)
      }
    }
  ), [])

  if (releaseCount === 0) {
    return null
  }

  const currentIndex = activeIndex >= releaseCount ? highlightIndex : activeIndex

  const goToIndex = (nextIndex) => {
    setActiveIndex((nextIndex + releaseCount) % releaseCount)
  }

  const activeRelease = releases[currentIndex]
  const previousIndex = (currentIndex - 1 + releaseCount) % releaseCount
  const nextIndex = (currentIndex + 1) % releaseCount

  const handleCardClick = (event, index, hasUrl) => {
    if (index !== currentIndex) {
      event.preventDefault()
      goToIndex(index)
      return
    }

    if (!hasUrl) {
      event.preventDefault()
    }
  }

  const queueHoverChange = (index, isSelected) => {
    if (isSelected) {
      return
    }

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    if (hoverLockedRef.current) {
      return
    }

    hoverTimeoutRef.current = setTimeout(() => {
      hoverLockedRef.current = true
      goToIndex(index)
      hoverTimeoutRef.current = null

      hoverUnlockTimeoutRef.current = setTimeout(() => {
        hoverLockedRef.current = false
        hoverUnlockTimeoutRef.current = null
      }, 420)
    }, 220)
  }

  const clearHoverChange = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const visibleCards = [
    releaseCount > 1 ? { index: previousIndex, slot: 'prev' } : null,
    { index: currentIndex, slot: 'current' },
    releaseCount > 1 ? { index: nextIndex, slot: 'next' } : null,
  ]
    .filter(Boolean)
    .filter((card, index, array) => array.findIndex((item) => item.index === card.index) === index)

  return (
    <section className="section releases" id="works">
      <div className="releases__pill" data-reveal>
        <span>Works</span>
      </div>

      <div className="releases__intro" data-reveal>
        <h2>Selección</h2>
      </div>

      <div className="releases__carousel" data-reveal>
        <div
          className="releases__stage"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              goToIndex(currentIndex - 1)
            }

            if (event.key === 'ArrowRight') {
              event.preventDefault()
              goToIndex(currentIndex + 1)
            }
          }}
          tabIndex={0}
          aria-label="Carrusel de releases"
        >
          <button
            type="button"
            className="releases__hitzone releases__hitzone--prev"
            aria-label="Release anterior"
            onClick={() => goToIndex(currentIndex - 1)}
          />

          <button
            type="button"
            className="releases__hitzone releases__hitzone--next"
            aria-label="Siguiente release"
            onClick={() => goToIndex(currentIndex + 1)}
          />

          <div className="releases__track">
            {visibleCards.map(({ index, slot }) => {
              const release = releases[index]
              const isSelected = slot === 'current'
              const isHighlighted = isPreviewActive && release.title === highlightTitle
              const CardTag = release.url ? 'a' : 'article'

              return (
                <CardTag
                  className={`release-card release-card--${slot}${isSelected ? ' is-spotlight' : ''}${isHighlighted ? ' is-highlighted' : ''}`}
                  key={release.title}
                  href={release.url || undefined}
                  target={release.url ? '_blank' : undefined}
                  rel={release.url ? 'noreferrer' : undefined}
                  onClick={(event) => handleCardClick(event, index, Boolean(release.url))}
                  onMouseEnter={() => queueHoverChange(index, isSelected)}
                  onMouseLeave={clearHoverChange}
                  onFocus={() => {
                    if (!isSelected) goToIndex(index)
                  }}
                  aria-label={`${release.title} · ${release.year}`}
                >
                  <div className="release-card__art">
                    <img
                      src={release.artwork}
                      alt={`Portada del single ${release.title}`}
                      loading={isSelected ? 'eager' : 'lazy'}
                    />
                  </div>

                  <div className="release-card__overlay">
                    <div className="release-card__meta">
                      <span>{release.tag}</span>
                      <span>{release.year}</span>
                    </div>
                    <h3>{release.title}</h3>
                  </div>
                </CardTag>
              )
            })}
          </div>
        </div>
      </div>

      <div className="releases__footer" data-reveal>
        <div className="releases__dots" aria-label="Selector de releases">
          {releases.map((release, index) => (
            <button
              key={release.title}
              type="button"
              className={`releases__dot${index === currentIndex ? ' is-active' : ''}`}
              aria-label={`Ir a ${release.title}`}
              aria-pressed={index === currentIndex}
              onClick={() => goToIndex(index)}
            />
          ))}
        </div>

        <div className="releases__active-copy">
          <p>{activeRelease.title}</p>
          {activeRelease.title === highlightTitle ? (
            <span className={`releases__preview-pill${isPreviewActive ? ' is-active' : ''}`}>
              {isPreviewActive ? 'Preview activa' : 'Preview destacada'}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}
