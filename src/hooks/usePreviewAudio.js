import { useEffect, useRef, useState } from 'react'

// Encapsulates audio playback so UI components only deal with simple callbacks.
export function usePreviewAudio({ src, startTime = 0 }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return undefined
    }

    audio.volume = 0.92

    // The UI only needs to know whether a preview is active, not playback progress.
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleEnded)
    }
  }, [src])

  const stopPreview = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    // Resetting the time keeps the next hover starting from the same moment.
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
  }

  const playPreview = () => {
    const audio = audioRef.current

    if (!audio || isPlaying) {
      return
    }

    // Metadata is needed before seeking to the chosen preview moment.
    const startPlayback = () => {
      setIsPlaying(true)
      audio.currentTime = startTime
      audio.play().catch(() => {
        setIsPlaying(false)
      })
    }

    if (audio.readyState >= 1) {
      startPlayback()
      return
    }

    // First interaction may require metadata before seeking into the preview.
    audio.addEventListener('loadedmetadata', startPlayback, { once: true })
    audio.load()
  }

  return {
    audioRef,
    isPlaying,
    playPreview,
    stopPreview,
  }
}
