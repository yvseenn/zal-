import './TopBar.css'

// Floating navigation surface with the profile-driven preview trigger.
export function TopBar({
  instagramProfileImage,
  isPreviewActive,
  isScrolled,
  onPreviewStart,
  onPreviewStop,
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
              src={instagramProfileImage}
              alt="Foto de perfil de ZALØ en Instagram"
            />
          </button>

          <div className="topbar__identity">
            <div className="topbar__brand-row">
              <div className="topbar__brand">ZALØ</div>
              <span className={`topbar__status${isPreviewActive ? ' is-active' : ''}`}>
                {isPreviewActive ? 'DarkSide on' : 'Hover to play'}
              </span>
            </div>
            <p className="topbar__handle">@zalo_wav</p>
          </div>
        </div>

        <div className="topbar__meta">
          {/* Short tags keep the header informative without turning it into navigation. */}
          <span>Madrid</span>
          <span>Urbano</span>
          <span>Reggaeton</span>
        </div>
      </header>
    </div>
  )
}
