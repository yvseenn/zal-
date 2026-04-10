import { useEffect, useState } from 'react'
import './styles/app-shell.css'
import { ClosingSection } from './components/ClosingSection/ClosingSection.jsx'
import { HeroSection } from './components/HeroSection/HeroSection.jsx'
import { ProfileSection } from './components/ProfileSection/ProfileSection.jsx'
import { ReleasesSection } from './components/ReleasesSection/ReleasesSection.jsx'
import { TimelineSection } from './components/TimelineSection/TimelineSection.jsx'
import { TopBar } from './components/TopBar/TopBar.jsx'
import { VideoSection } from './components/VideoSection/VideoSection.jsx'
import {
  facts,
  highlightPreview,
  instagramProfileImage,
  instagramUrl,
  latestVideo,
  profileCards,
  releases,
  spotifyUrl,
  timeline,
} from './data/artistData.js'
import { usePreviewAudio } from './hooks/usePreviewAudio.js'
import { useRevealOnScroll } from './hooks/useRevealOnScroll.js'

function App() {
  // Tracks scroll so the header and hero artwork can react to the page position.
  const [scrollValue, setScrollValue] = useState(0)

  // Centralized preview control so header hover and hero visuals stay in sync.
  const { audioRef, isPlaying, playPreview, stopPreview } = usePreviewAudio({
    src: highlightPreview.previewUrl,
    startTime: highlightPreview.startTime,
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
        instagramProfileImage={instagramProfileImage}
        isPreviewActive={isPlaying}
        isScrolled={scrollValue > 24}
        onPreviewStart={playPreview}
        onPreviewStop={stopPreview}
      />

      <main className="page-main">
        {/* Sections stay isolated so future edits can be made one block at a time. */}
        <HeroSection
          facts={facts}
          instagramUrl={instagramUrl}
          isPreviewActive={isPlaying}
          spotifyUrl={spotifyUrl}
        />
        <ProfileSection profileCards={profileCards} />
        <TimelineSection timeline={timeline} />
        <ReleasesSection
          highlightTitle={highlightPreview.title}
          isPreviewActive={isPlaying}
          releases={releases}
        />
        <VideoSection latestVideo={latestVideo} />
        <ClosingSection instagramUrl={instagramUrl} spotifyUrl={spotifyUrl} />
      </main>

      {/* A single hidden audio element powers the hover interaction globally. */}
      <audio ref={audioRef} preload="none" src={highlightPreview.previewUrl} />
    </div>
  )
}

export default App
