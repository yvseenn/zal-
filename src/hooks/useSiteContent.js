import { useEffect, useState } from 'react'
import { defaultSiteContent } from '../data/artistData.js'
import { loadSiteContent } from '../lib/site-content/loadSiteContent.js'

// Keeps the current static site working while enabling a Supabase-backed content source.
export function useSiteContent() {
  const [siteContent, setSiteContent] = useState(defaultSiteContent)

  useEffect(() => {
    let isActive = true

    async function hydrateContent() {
      const nextContent = await loadSiteContent()

      if (!isActive) {
        return
      }

      setSiteContent(nextContent)
    }

    hydrateContent()

    return () => {
      isActive = false
    }
  }, [])

  return siteContent
}
