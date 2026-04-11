// Apple Music / iTunes exposes artwork URLs like artworkUrl100.
// Keep the original 100x100 URL here and this helper upgrades it for the UI.
const art = (url) => url.replace('/100x100bb.jpg', '/1200x1200bb.jpg')

// External profile links used by CTAs and metadata blocks across the site.
// When Supabase is connected, these become the fallback values only.
export const spotifyUrl = 'https://open.spotify.com/intl-es/artist/4dLT2geeIDFaQTqOY140qC'
export const appleMusicUrl = 'https://music.apple.com/es/artist/zal%C3%B8/1647227091'
export const instagramUrl = 'https://www.instagram.com/zalo_wav/'
export const instagramProfileImage =
  'https://scontent-mad2-1.cdninstagram.com/v/t51.82787-19/658964957_18415910443123861_8858687036493441465_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=108&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy42NTQuQzMifQ%3D%3D&_nc_ohc=h29fgLxacR4Q7kNvwGHxttv&_nc_oc=AdpDJklHE9bLK5T8YqrdASy9QTI1HRhU5fGy-eUqlRBVtCYULl72TvcAmJlIkzyqAds&_nc_zt=24&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_gid=LVohy9ObixZsPyOb81_0Rg&_nc_ss=7a20f&oh=00_Af0tf5aPh2aEKg-hOOCNdoABkVhalzywLM678jz6tH1_XQ&oe=69DF475C'

// Small hero labels. Add or remove items here and the hero updates automatically.
export const facts = [
  'Madrid, España',
  'Urbano / Reggaeton',
  'Portfolio social-first',
  'Spotify + Instagram',
]

// This controls which song preview plays when the avatar is hovered.
export const highlightPreview = {
  title: 'DarkSide',
  previewUrl:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2a/35/93/2a35935c-26d1-97cb-6d9b-cbc27d95a41b/mzaf_8398050832062977486.plus.aac.p.m4a',
  // Start a few seconds in so the hook hits a stronger section of the preview.
  startTime: 8,
}

// The latest video section only needs a YouTube id and some supporting copy.
export const latestVideo = {
  youtubeId: 'q_0uMxsUveU',
  title: 'Último videoclip',
  note: 'Añadido desde el enlace que compartiste para presentar la etapa visual más reciente.',
}

// Profile cards shown in the middle of the page.
export const profileCards = [
  {
    title: 'Sonido',
    text: 'Reggaeton y urbano melódico con una dirección nocturna, hooks directos y foco en el single.',
  },
  {
    title: 'Identidad',
    text: 'Proyecto visual pensado para destacar en social media, portadas, videoclips y campañas digitales.',
  },
  {
    title: 'Uso',
    text: 'Portfolio preparado para salas, festivales, colaboraciones creativas, prensa y brand-facing decks.',
  },
]

// Page sections drive the public layout order. This becomes the bridge between
// the future drag-and-drop admin and the live page renderer.
export const pageSections = [
  { sectionKey: 'hero', displayOrder: 0, isVisible: true, variant: 'default', config: {} },
  { sectionKey: 'profile', displayOrder: 1, isVisible: true, variant: 'default', config: {} },
  { sectionKey: 'timeline', displayOrder: 2, isVisible: true, variant: 'default', config: {} },
  { sectionKey: 'releases', displayOrder: 3, isVisible: true, variant: 'default', config: {} },
  { sectionKey: 'video', displayOrder: 4, isVisible: true, variant: 'default', config: {} },
  { sectionKey: 'closing', displayOrder: 5, isVisible: true, variant: 'default', config: {} },
]

// Timeline entries feed the "Trayectoria reciente" section in order.
// Add new years as new objects in this array; no component changes are needed.
export const timeline = [
  {
    year: '2022',
    title: 'Inicio del proyecto',
    text: 'Arranque de ZALØ como propuesta urbana local con base en Madrid y una estrategia de crecimiento release by release.',
  },
  {
    year: '2024',
    title: 'Definición de la era',
    text: 'Lanzamientos como MI SELLO, DarkSide y MAREAO\' consolidan un imaginario más claro y reconocible.',
  },
  {
    year: '2025',
    title: 'Aceleración del catálogo',
    text: 'Nueva racha de singles con títulos como RICOTA, inDIRECTAS, KAWASAKI, LOCO y PLAN B.',
  },
  {
    year: '2026',
    title: 'Plomo Pa El',
    text: 'Latest release.',
  },
]

// Release ordering matters: the first visible rows define the current era of the site.
// Add more songs by appending new objects with:
// title, year, tag, note, and artwork: art('APPLE_ARTWORK_URL_100x100').
export const releases = [
  {
    title: 'DarkSide',
    year: '2024',
    tag: 'Single',
    note: 'La preview activa del portfolio ahora sale de este lanzamiento.',
    artwork: art(
      'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/11/80/ed/1180ed5e-8037-680c-7596-e020207eaece/artwork.jpg/100x100bb.jpg',
    ),
  },
  {
    title: 'MI SELLO',
    year: '2024',
    tag: 'Single',
    note: 'Track de identidad y statement del proyecto.',
    artwork: art(
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c9/00/c6/c900c686-cc84-db47-15ce-036b4df983e3/artwork.jpg/100x100bb.jpg',
    ),
  },
  {
    title: "MAREAO'",
    year: '2024',
    tag: 'Single',
    note: 'Otro release clave de la etapa que consolidó el proyecto.',
    artwork: art(
      'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ae/f1/17/aef117e6-a847-fe41-0662-532e6d5fef7f/artwork.jpg/100x100bb.jpg',
    ),
  },
  {
    title: 'RICOTA',
    year: '2025',
    tag: 'Single',
    note: 'Nuevo impulso para la etapa reciente del proyecto.',
    artwork: art(
      'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/19/30/57/1930574c-c591-009e-cd3d-cf8877c0cf8c/artwork.jpg/100x100bb.jpg',
    ),
  },
  {
    title: 'inDIRECTAS',
    year: '2025',
    tag: 'Single',
    note: 'Continuidad de la narrativa visual y social-first de ZALØ.',
    artwork: art(
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c6/45/05/c64505bc-122c-07ad-1897-b5525d4603ab/artwork.jpg/100x100bb.jpg',
    ),
  },
  {
    title: 'PLAN B',
    year: '2025',
    tag: 'Single',
    note: 'Otro corte de la nueva tanda de releases.',
    artwork: art(
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4f/29/e7/4f29e778-5839-0cdf-9117-5d89e3f7f000/artwork.jpg/100x100bb.jpg',
    ),
  },
  {
    title: 'PLOMO PA ÉL',
    year: '2026',
    tag: 'Single',
    note: 'Nuevo release dentro de la etapa más reciente del proyecto.',
    artwork: art(
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/12/59/14/125914a0-d750-36db-1647-a4660e7c6182/artwork.jpg/100x100bb.jpg',
    ),
  },
]

// Local fallback content used before Supabase is configured or when it fails.
// Keep this object in sync with the shape returned by loadSiteContent().
export const defaultSiteContent = {
  spotifyUrl,
  appleMusicUrl,
  instagramUrl,
  instagramProfileImage,
  facts,
  highlightPreview,
  latestVideo,
  profileCards,
  pageSections,
  timeline,
  releases,
}
