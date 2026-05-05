import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import './styles/app-shell.css'
import { ClosingSection } from './components/ClosingSection/ClosingSection.jsx'
import { HeroSection } from './components/HeroSection/HeroSection.jsx'
import { ReleasesSection } from './components/ReleasesSection/ReleasesSection.jsx'
import { TopBar } from './components/TopBar/TopBar.jsx'
import { VideoSection } from './components/VideoSection/VideoSection.jsx'
import { BioSection } from './components/BioSection/BioSection.jsx'
import { GallerySection } from './components/GallerySection/GallerySection.jsx'
import { usePreviewAudio } from './hooks/usePreviewAudio.js'
import { useRevealOnScroll } from './hooks/useRevealOnScroll.js'
import { siteContent } from './content/siteContent.js'
import { useLocalStorageState } from './hooks/useLocalStorageState.js'
import { EntryScreen } from './components/EntryScreen/EntryScreen.jsx'

// Central section router: the public page order comes from content JSON so the
// admin CMS can reorder sections without touching React code.
function renderPageSection(section, siteContent, isPlaying) {
  switch (section.sectionKey) {
    case 'intro':
      return (
        <HeroSection
          content={siteContent}
          isPreviewActive={isPlaying}
        />
      )
    case 'bio':
      return <BioSection bio={siteContent.bio} />
    case 'works':
      return (
        <ReleasesSection
          highlightTitle={siteContent.highlightPreview.title}
          isPreviewActive={isPlaying}
          releases={siteContent.releases}
        />
      )
    case 'gallery':
      return <GallerySection gallery={siteContent.gallery} latestVideo={siteContent.latestVideo} />
    case 'contact':
      return (
        <ClosingSection content={siteContent} />
      )
    default:
      return null
  }
}

function App() {
  // Horizontal scroll container for the whole site (Henri-style section swipes).
  const mainRef = useRef(null)

  // Page panels need refs so nav clicks can snap directly to a section.
  const panelRefs = useRef(new Map())

  // Tracks horizontal scroll so the header and hero artwork can react to the page position.
  const [scrollX, setScrollX] = useState(0)
  const [activePanelIndex, setActivePanelIndex] = useState(0)
  const [activePanelScrollY, setActivePanelScrollY] = useState(0)
  const [hasEntered, setHasEntered] = useLocalStorageState('zalo_entered', false)

  // Centralized preview control so header hover and hero visuals stay in sync.
  const { audioRef, isPlaying, playPreview, stopPreview } = usePreviewAudio({
    src: siteContent.highlightPreview.previewUrl,
    startTime: siteContent.highlightPreview.startTime,
  })

  // One observer for all scroll-reveal blocks keeps section components simple.
  useRevealOnScroll()

  const theme = siteContent.theme || {}

  // Visible sections are controlled by CMS (pageSections.json).
  const orderedSections = useMemo(
    () => siteContent.pageSections.filter((section) => section.isVisible),
    [siteContent.pageSections]
  )

  useEffect(() => {
    const scroller = mainRef.current
    if (!scroller) return

    let frameId = 0

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setScrollX(scroller.scrollLeft)

        const width = scroller.clientWidth || 1
        const nextIndex = Math.round(scroller.scrollLeft / width)
        setActivePanelIndex(Math.max(0, Math.min(nextIndex, orderedSections.length - 1)))
      })
    }

    handleScroll()
    scroller.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      scroller.removeEventListener('scroll', handleScroll)
    }
  }, [orderedSections.length])

  useEffect(() => {
    const scroller = mainRef.current
    if (!scroller) return

    const sectionKey = orderedSections[activePanelIndex]?.sectionKey
    const panel = sectionKey ? panelRefs.current.get(sectionKey) : null
    if (!panel) return

    let frameId = 0

    const handlePanelScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setActivePanelScrollY(panel.scrollTop || 0)
      })
    }

    handlePanelScroll()
    panel.addEventListener('scroll', handlePanelScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      panel.removeEventListener('scroll', handlePanelScroll)
    }
  }, [activePanelIndex, orderedSections])

  // Subtle parallax on the hero stage. In horizontal mode we tie it to the first swipe,
  // and also allow vertical scroll inside the active panel to contribute a bit.
  const heroShift = Math.min((scrollX * 0.02) + (activePanelScrollY * 0.12), 120)
  const glowShift = Math.min((scrollX * 0.012) + (activePanelScrollY * 0.08), 90)
  const isHeaderScrolled = scrollX > 24 || activePanelScrollY > 24

  const handleNavigate = (href) => {
    const targetId = (href || '').replace('#', '')
    if (!targetId) return

    const scroller = mainRef.current
    const panel = panelRefs.current.get(targetId)
    if (!scroller || !panel) return

    scroller.scrollTo({ left: panel.offsetLeft, behavior: 'smooth' })
  }

  if (!hasEntered) {
    return (
      <div className="page-shell">
        <EntryScreen
          title={`${siteContent.artistName} — 2026`}
          subtitle="BIO / WORKS / GALLERY / CONTACT"
          onEnter={() => setHasEntered(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="page-shell"
      style={{
        // CSS variables keep parallax tuning in CSS while the values stay in React.
        '--hero-shift': `${heroShift}px`,
        '--glow-shift': `${glowShift}px`,
        '--theme-accent': theme.accent,
        '--theme-accent-strong': theme.accentStrong,
        '--theme-text-strong': theme.textStrong,
        '--theme-text': theme.text,
        '--theme-text-soft': theme.textSoft,
        '--theme-text-dim': theme.textDim,
        '--theme-border': theme.border,
        '--theme-border-strong': theme.borderStrong,
        '--theme-surface-tint': theme.surfaceTint,
        '--theme-surface-highlight': theme.surfaceHighlight,
      }}
    >
      <TopBar
        content={siteContent}
        isPreviewActive={isPlaying}
        isScrolled={isHeaderScrolled}
        onPreviewStart={playPreview}
        onPreviewStop={stopPreview}
        onNavigate={handleNavigate}
      />

      <main className="page-main page-main--horizontal" ref={mainRef}>
        {/* Horizontal section rail: each panel is a viewport-sized snap point. */}
        {orderedSections.map((section) => (
          <div
            key={section.sectionKey}
            className="page-panel"
            ref={(node) => {
              if (node) panelRefs.current.set(section.sectionKey, node)
              else panelRefs.current.delete(section.sectionKey)
            }}
            data-section={section.sectionKey}
          >
            <Fragment>{renderPageSection(section, siteContent, isPlaying)}</Fragment>
          </div>
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
