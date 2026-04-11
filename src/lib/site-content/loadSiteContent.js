import { defaultSiteContent } from '../../data/artistData.js'
import { getSupabaseBrowserClient } from '../supabase/client.js'
import { isSupabaseConfigured } from '../supabase/env.js'

// Normalizes database rows into the shape expected by the current React UI.
// Keeping these mappers isolated avoids leaking database column names into JSX.
function mapSongsToReleases(rows) {
  return rows.map((row) => ({
    title: row.title,
    year: String(row.year),
    tag: row.tag || 'Single',
    note: row.note || '',
    artwork: row.cover_url,
  }))
}

function mapTimelineRows(rows) {
  return rows.map((row) => ({
    year: String(row.year),
    title: row.title,
    text: row.text,
  }))
}

function mapPageSectionRows(rows) {
  return rows.map((row) => ({
    sectionKey: row.section_key,
    displayOrder: row.display_order,
    isVisible: row.is_visible !== false,
    variant: row.variant || 'default',
    config: row.config && typeof row.config === 'object' ? row.config : {},
  }))
}

// Site settings are stored flatter in the database than in the UI, so this
// function rebuilds the nested object structure consumed by the components.
function mapSettingsToContent(settings, songs, timeline, pageSections) {
  return {
    ...defaultSiteContent,
    spotifyUrl: settings.spotify_url || defaultSiteContent.spotifyUrl,
    appleMusicUrl: settings.apple_music_url || defaultSiteContent.appleMusicUrl,
    instagramUrl: settings.instagram_url || defaultSiteContent.instagramUrl,
    instagramProfileImage:
      settings.instagram_profile_image || defaultSiteContent.instagramProfileImage,
    facts:
      Array.isArray(settings.hero_facts) && settings.hero_facts.length > 0
        ? settings.hero_facts
        : defaultSiteContent.facts,
    profileCards:
      Array.isArray(settings.profile_cards) && settings.profile_cards.length > 0
        ? settings.profile_cards
        : defaultSiteContent.profileCards,
    latestVideo: {
      youtubeId:
        settings.latest_video_youtube_id || defaultSiteContent.latestVideo.youtubeId,
      title: settings.latest_video_title || defaultSiteContent.latestVideo.title,
      note: settings.latest_video_note || defaultSiteContent.latestVideo.note,
    },
    highlightPreview: {
      title:
        settings.highlight_preview_title || defaultSiteContent.highlightPreview.title,
      previewUrl:
        settings.highlight_preview_url ||
        defaultSiteContent.highlightPreview.previewUrl,
      startTime:
        typeof settings.highlight_preview_start_time === 'number'
          ? settings.highlight_preview_start_time
          : defaultSiteContent.highlightPreview.startTime,
    },
    pageSections:
      pageSections.length > 0 ? pageSections : defaultSiteContent.pageSections,
    releases: songs.length > 0 ? songs : defaultSiteContent.releases,
    timeline: timeline.length > 0 ? timeline : defaultSiteContent.timeline,
  }
}

// Loads content from Supabase when configured, otherwise keeps the local fallback.
export async function loadSiteContent() {
  if (!isSupabaseConfigured) {
    return defaultSiteContent
  }

  const supabase = getSupabaseBrowserClient()

  if (!supabase) {
    return defaultSiteContent
  }

  const [
    { data: settingsRows, error: settingsError },
    { data: songRows, error: songsError },
    { data: timelineRows, error: timelineError },
    { data: pageSectionRows, error: pageSectionsError },
  ] =
    await Promise.all([
      supabase
        .from('site_settings')
        .select('*')
        .eq('slug', 'primary')
        .limit(1),
      supabase
        .from('songs')
        .select('title, year, tag, note, cover_url, display_order, status')
        .eq('status', 'published')
        .order('display_order', { ascending: true }),
      supabase
        .from('timeline_items')
        .select('year, title, text, display_order')
        .order('display_order', { ascending: true }),
      supabase
        .from('page_sections')
        .select('section_key, display_order, is_visible, variant, config')
        .order('display_order', { ascending: true }),
    ])

  if (settingsError || songsError || timelineError || pageSectionsError) {
    console.warn('Supabase content fallback active.', {
      settingsError,
      songsError,
      timelineError,
      pageSectionsError,
    })
    return defaultSiteContent
  }

  const settings = settingsRows?.[0] ?? {}
  const songs = mapSongsToReleases(songRows ?? [])
  const timeline = mapTimelineRows(timelineRows ?? [])
  const pageSections = mapPageSectionRows(pageSectionRows ?? [])

  // If some collections are still empty in Supabase, the UI keeps local
  // defaults so the portfolio remains presentable while data is being seeded.
  return mapSettingsToContent(settings, songs, timeline, pageSections)
}
