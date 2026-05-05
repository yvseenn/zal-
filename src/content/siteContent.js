import site from './site.json'
import pageSections from './pageSections.json'
import releases from './songs.json'
import timeline from './timeline.json'
import theme from './theme.json'
import gallery from './gallery.json'

// Single source of truth for the public site.
// Decap CMS edits the JSON files above, and the React app imports this module.
export const siteContent = {
  spotifyUrl: site.links.spotifyUrl,
  appleMusicUrl: site.links.appleMusicUrl,
  instagramUrl: site.links.instagramUrl,
  instagramProfileImage: site.images.instagramProfileImage,
  facts: site.facts,
  highlightPreview: site.highlightPreview,
  latestVideo: site.latestVideo,
  profileCards: site.profileCards,
  pageSections: pageSections.sections,
  releases: releases.songs,
  timeline: timeline.items,
  gallery: gallery.items,
  theme,
  heroCopy: site.heroCopy,
  closingCopy: site.closingCopy,
  headerCopy: site.headerCopy,
  bio: site.bio,
  artistName: site.artistName,
  instagramHandle: site.instagramHandle
}
