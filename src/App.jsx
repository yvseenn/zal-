import { Fragment, useEffect, useState } from 'react'
import './styles/app-shell.css'
import { ClosingSection } from './components/ClosingSection/ClosingSection.jsx'
import { HeroSection } from './components/HeroSection/HeroSection.jsx'
import { ProfileSection } from './components/ProfileSection/ProfileSection.jsx'
import { ReleasesSection } from './components/ReleasesSection/ReleasesSection.jsx'
import { TimelineSection } from './components/TimelineSection/TimelineSection.jsx'
import { TopBar } from './components/TopBar/TopBar.jsx'
import { VideoSection } from './components/VideoSection/VideoSection.jsx'
import { usePreviewAudio } from './hooks/usePreviewAudio.js'
import { useRevealOnScroll } from './hooks/useRevealOnScroll.js'
import { siteContent } from './content/siteContent.js'

// Central section router: the public page order comes from content JSON so the
// admin CMS can reorder sections without touching React code.
function renderPageSection(section, siteContent, isPlaying) {
  switch (section.sectionKey) {
    case 'hero':
      return (
        <HeroSection
          content={siteContent}
          isPreviewActive={isPlaying}
        />
      )
    case 'profile':
      return <ProfileSection profileCards={siteContent.profileCards} />
    case 'timeline':
      return <TimelineSection timeline={siteContent.timeline} />
    case 'releases':
      return (
        <ReleasesSection
          highlightTitle={siteContent.highlightPreview.title}
          isPreviewActive={isPlaying}
          releases={siteContent.releases}
        />
      )
    case 'video':
      return <VideoSection latestVideo={siteContent.latestVideo} />
    case 'closing':
      return (
        <ClosingSection content={siteContent} />
      )
    default:
      return null
  }
}

function App() {
  // Tracks scroll so the header and hero artwork can react to the page position.
  const [scrollValue, setScrollValue] = useState(0)

  // Centralized preview control so header hover and hero visuals stay in sync.
  const { audioRef, isPlaying, playPreview, stopPreview } = usePreviewAudio({
    src: siteContent.highlightPreview.previewUrl,
    startTime: siteContent.highlightPreview.startTime,
  })

  // One observer for all scroll-reveal blocks keeps section components simple.
  useRevealOnScroll()

  useEffect(() => {
    let frameId = 0

    // requestAnimationFrame keeps scroll-driven transforms smooth.
    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setScrollValue(window.scrollY)
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const heroShift = Math.min(scrollValue * 0.18, 120)
  const glowShift = Math.min(scrollValue * 0.12, 90)
  // The live layout comes from pageSections, so drag-and-drop admin work can
  // eventually reorder the page without touching this component again.
  const orderedSections = [...siteContent.pageSections]
    .filter((section) => section.isVisible)
    .sort((left, right) => left.displayOrder - right.displayOrder)

  return (
    <div
      className="page-shell"
      style={{
        // CSS variables keep parallax tuning in CSS while the values stay in React.
        '--hero-shift': `${heroShift}px`,
        '--glow-shift': `${glowShift}px`,
      }}
    >
      <TopBar
        content={siteContent}
        isPreviewActive={isPlaying}
        isScrolled={scrollValue > 24}
        onPreviewStart={playPreview}
        onPreviewStop={stopPreview}
      />

      <main className="page-main">
        {/* Layout now comes from content data, which is what the future admin will edit. */}
        {orderedSections.map((section) => (
          <Fragment key={section.sectionKey}>
            {renderPageSection(section, siteContent, isPlaying)}
          </Fragment>
        ))}
      </main>

      {/* A single hidden audio element powers the hover interaction globally. */}
      <audio
        ref={audioRef}
        preload="none"
        src={siteContent.highlightPreview.previewUrl}
      />
    </div>
  )
}

export default App
