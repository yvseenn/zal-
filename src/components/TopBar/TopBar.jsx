import './TopBar.css'

// Floating navigation surface with the profile-driven preview trigger.
// The image has a fallback because third-party avatar URLs can expire or rate-limit.
export function TopBar({
  content,
  isPreviewActive,
  isScrolled,
  onPreviewStart,
  onPreviewStop,
  onNavigate,
}) {
  return (
    <div className={`topbar-shell${isScrolled ? ' is-scrolled' : ''}`}>
      <header className={`topbar${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="topbar__profile">
          <button
            type="button"
            className={`topbar__avatar-button${isPreviewActive ? ' is-active' : ''}`}
            // Avatar hover is the main trigger for the DarkSide preview.
            onMouseEnter={onPreviewStart}
            onMouseLeave={onPreviewStop}
            onFocus={onPreviewStart}
            onBlur={onPreviewStop}
            aria-label="Reproducir preview de DarkSide"
          >
            <img
              className="topbar__avatar"
              src={content.instagramProfileImage}
              alt={`Foto de perfil de ${content.artistName} en Instagram`}
              onError={(event) => {
                event.currentTarget.onerror = null
                // Local fallback so the header never renders broken if the CDN blocks hotlinking.
                event.currentTarget.src = '/zalo-tab-logo.svg'
              }}
            />
          </button>

          <div className="topbar__identity">
            <div className="topbar__brand-row">
              <div className="topbar__brand">{content.artistName}</div>
              <span className={`topbar__status${isPreviewActive ? ' is-active' : ''}`}>
                {isPreviewActive ? content.headerCopy.statusPlaying : content.headerCopy.statusIdle}
              </span>
            </div>
            <p className="topbar__handle">{content.instagramHandle}</p>
          </div>
        </div>

        <nav className="topbar__nav" aria-label="Primary">
          {content.headerCopy.nav?.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="topbar__nav-link"
              onClick={(event) => {
                if (!onNavigate) return
                event.preventDefault()
                onNavigate(item.href)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    </div>
  )
}
