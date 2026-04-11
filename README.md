# ZALØ Portfolio

Single-page React/Vite portfolio for ZALØ, a local urban Spanish reggaeton artist.

The site includes:
- floating header with hover-triggered audio preview
- animated hero section
- profile / CV sections
- real release artwork
- vertical timeline
- embedded latest videoclip

## Stack

- React
- Vite
- Supabase client bootstrap ready
- Plain CSS split by component

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    TopBar/
    HeroSection/
    ProfileSection/
    TimelineSection/
    ReleasesSection/
    VideoSection/
    ClosingSection/
  data/
    artistData.js
  hooks/
    usePreviewAudio.js
    useRevealOnScroll.js
    useSiteContent.js
  lib/
    supabase/
    site-content/
  styles/
    app-shell.css
  App.jsx
  index.css
  main.jsx
```

## Content Source

The app currently works in two modes:

1. Local fallback mode
   - content comes from [src/data/artistData.js](/Users/yvseennn/Documents/zalo/src/data/artistData.js)
2. Supabase mode
   - if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present, the app tries to load content from Supabase first
   - if Supabase fails, it falls back to the local content automatically

## Supabase Setup

1. Create a Supabase project
2. Copy [.env.example](/Users/yvseennn/Documents/zalo/.env.example) to `.env.local`
3. Fill in:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Open the Supabase SQL editor
5. Paste and run:
   - [supabase/schema.sql](/Users/yvseennn/Documents/zalo/supabase/schema.sql)

Current integration files:
- [src/lib/supabase/env.js](/Users/yvseennn/Documents/zalo/src/lib/supabase/env.js)
- [src/lib/supabase/client.js](/Users/yvseennn/Documents/zalo/src/lib/supabase/client.js)
- [src/lib/site-content/loadSiteContent.js](/Users/yvseennn/Documents/zalo/src/lib/site-content/loadSiteContent.js)
- [src/hooks/useSiteContent.js](/Users/yvseennn/Documents/zalo/src/hooks/useSiteContent.js)

## Where To Edit Content

Most editable content lives in:

- [src/data/artistData.js](/Users/yvseennn/Documents/zalo/src/data/artistData.js)

This file controls:
- Spotify link
- Instagram link
- Instagram profile image URL
- hero facts
- hover preview song
- latest videoclip
- profile cards
- timeline items
- release list and artwork

Once Supabase is configured, those same concepts will live in:
- `site_settings`
- `timeline_items`
- `songs`
- `albums`
- `page_sections`

Layout order and visibility now also support a database-backed model:
- `page_sections` decides the render order of the public sections
- if `page_sections` is empty or unavailable, the app falls back to the local default order in [src/data/artistData.js](/Users/yvseennn/Documents/zalo/src/data/artistData.js)

## Common Edits

### Change the song that plays on hover

Edit `highlightPreview` in `src/data/artistData.js`:

```js
export const highlightPreview = {
  title: 'DarkSide',
  previewUrl: 'https://...',
  startTime: 8,
}
```

What each field does:
- `title`: used to highlight the matching release card
- `previewUrl`: audio preview source
- `startTime`: where the preview starts

### Add a release to "Selección"

Append a new object to `releases` in `src/data/artistData.js`:

```js
{
  title: 'PLOMO PA ÉL',
  year: '2026',
  tag: 'Single',
  note: 'Nuevo release dentro de la etapa más reciente del proyecto.',
  artwork: art('https://is1-ssl.mzstatic.com/image/thumb/.../100x100bb.jpg'),
}
```

Notes:
- `art()` converts Apple’s `100x100` artwork URL into a larger image
- order matters: earlier items appear first

### Add a year to the timeline

Append a new object to `timeline` in `src/data/artistData.js`:

```js
{
  year: '2026',
  title: 'Plomo Pa El',
  text: 'Latest release.',
}
```

No component changes are needed.

### Reorder the public page

Edit or import rows into `page_sections` with these keys:

```text
hero
profile
timeline
releases
video
closing
```

The public app sorts them by `display_order` and hides any row where `is_visible = false`.

Reference:
- [supabase/import/page_sections.csv](/Users/yvseennn/Documents/zalo/supabase/import/page_sections.csv)
- [docs/page-sections-admin.md](/Users/yvseennn/Documents/zalo/docs/page-sections-admin.md)

### Change the latest videoclip

Edit `latestVideo` in `src/data/artistData.js`:

```js
export const latestVideo = {
  youtubeId: 'q_0uMxsUveU',
  title: 'Último videoclip',
  note: 'Añadido desde el enlace que compartiste para presentar la etapa visual más reciente.',
}
```

### Change the tab icon

The favicon is loaded from:

- [public/zalo-tab-logo.svg](/Users/yvseennn/Documents/zalo/public/zalo-tab-logo.svg)

Referenced in:

- [index.html](/Users/yvseennn/Documents/zalo/index.html)

## Styling

CSS is separated by area:

- global tokens and resets in [src/index.css](/Users/yvseennn/Documents/zalo/src/index.css)
- shared layout and animations in [src/styles/app-shell.css](/Users/yvseennn/Documents/zalo/src/styles/app-shell.css)
- component-specific styles inside each component folder

Examples:
- [src/components/TopBar/TopBar.css](/Users/yvseennn/Documents/zalo/src/components/TopBar/TopBar.css)
- [src/components/HeroSection/HeroSection.css](/Users/yvseennn/Documents/zalo/src/components/HeroSection/HeroSection.css)
- [src/components/TimelineSection/TimelineSection.css](/Users/yvseennn/Documents/zalo/src/components/TimelineSection/TimelineSection.css)

## Interaction Notes

Audio hover behavior lives in:

- [src/hooks/usePreviewAudio.js](/Users/yvseennn/Documents/zalo/src/hooks/usePreviewAudio.js)

Scroll reveal behavior lives in:

- [src/hooks/useRevealOnScroll.js](/Users/yvseennn/Documents/zalo/src/hooks/useRevealOnScroll.js)

## Important Note About Remote Assets

The current project uses remote URLs for:
- Instagram profile image
- Apple Music release artwork
- Apple preview audio

That works, but it means the site depends on third-party URLs staying available.

If you want a more stable deploy, the next step is to download those assets into `public/` and reference them locally.
