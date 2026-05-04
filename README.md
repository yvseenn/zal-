# ZALØ Portfolio

Single-page React/Vite portfolio for ZALØ, a local urban Spanish reggaeton artist.

The site includes:
- floating header with hover-triggered audio preview
- animated hero section
- profile / CV sections
- real release artwork
- vertical timeline
- embedded latest videoclip
- `/admin` dashboard (Decap CMS) for non-technical edits

## Stack

- React
- Vite
- Decap CMS (Git-based content editing)
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
public/
  admin/
    index.html
    config.yml
  uploads/
src/
  components/
    TopBar/
    HeroSection/
    ProfileSection/
    TimelineSection/
    ReleasesSection/
    VideoSection/
    ClosingSection/
  content/
    site.json
    songs.json
    timeline.json
    pageSections.json
    siteContent.js
  hooks/
    usePreviewAudio.js
    useRevealOnScroll.js
  styles/
    app-shell.css
  App.jsx
  index.css
  main.jsx
```

## Content Source

The public site reads from JSON files in `src/content/` via:
- `src/content/siteContent.js`

## Where To Edit Content

You can edit content in two ways:
1. Directly in JSON:
   - `src/content/site.json` (links, hero/closing copy, preview, profile cards)
   - `src/content/songs.json` (releases grid)
   - `src/content/timeline.json` (timeline)
   - `src/content/pageSections.json` (section order + visibility)
2. Via the `/admin` dashboard (recommended for non-technical edits)

## Common Edits

### Change the song that plays on hover

Edit `highlightPreview` in `src/content/site.json`:

```json
{ "highlightPreview": { "title": "DarkSide", "previewUrl": "https://...", "startTime": 8 } }
```

What each field does:
- `title`: used to highlight the matching release card
- `previewUrl`: audio preview source
- `startTime`: where the preview starts

### Add a release to "Selección"

Append a new object to `songs` in `src/content/songs.json`:

```json
{
  "title": "PLOMO PA ÉL",
  "year": "2026",
  "tag": "Single",
  "note": "Nuevo release dentro de la etapa más reciente del proyecto.",
  "artwork": "https://is1-ssl.mzstatic.com/image/thumb/.../1200x1200bb.jpg"
}
```

Notes:
- order matters: earlier items appear first

### Add a year to the timeline

Append a new object to `items` in `src/content/timeline.json`:

```json
{ "year": "2026", "title": "Plomo Pa El", "text": "Latest release." }
```

No component changes are needed.

### Reorder the public page

Edit `sections` in `src/content/pageSections.json`.

### Change the latest videoclip

Edit `latestVideo` in `src/content/site.json`:

```json
{ "latestVideo": { "youtubeId": "q_0uMxsUveU", "title": "Último videoclip", "note": "..." } }
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

## Netlify Admin Setup (Decap CMS)

This repo includes a ready-to-use Decap CMS dashboard at `/admin`:
- `public/admin/index.html`
- `public/admin/config.yml`

To enable email/password login for a friend:
1. Deploy the repo on Netlify
2. Enable `Identity`
3. Enable `Git Gateway`
4. Invite your friend via email in Netlify Identity
5. Visit `https://YOUR-SITE.netlify.app/admin/`
