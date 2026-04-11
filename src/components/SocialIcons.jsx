// Minimal inline SVG set used by CTA buttons.
// These are drawn with clean strokes so they stay sharp at small sizes inside rounded buttons.

export function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7.7 9.35c2.65-.7 5.83-.42 8.4.83"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path
        d="M8.38 12.15c1.98-.46 4.14-.24 5.88.62"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
      <path
        d="M8.98 14.8c1.35-.28 2.82-.12 4.02.42"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M15.8 4.5v10.05a2.65 2.65 0 1 1-1.35-2.3V7.7l-5.9 1.15v7.1a2.65 2.65 0 1 1-1.35-2.3V6.58c0-.65.46-1.21 1.09-1.33z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="4.25"
        y="4.25"
        width="15.5"
        height="15.5"
        rx="4.35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3.75" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.15" cy="6.85" r="1.05" fill="currentColor" />
    </svg>
  )
}
