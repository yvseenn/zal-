import './HeroSection.css'
import { AppleMusicIcon, InstagramIcon, SpotifyIcon } from '../SocialIcons.jsx'

// Main landing block: core artist pitch on the left, animated stage on the right.
// The three CTAs below intentionally map to platform-specific button variants
// so the social links stay visually distinct without custom markup per page.
export function HeroSection({ content, isPreviewActive }) {
  const featuredRelease = content.heroCopy?.featuredRelease

  return (
    <section className="hero section" id="intro">
      <div className="hero__copy" data-reveal>
        {featuredRelease?.url ? (
          <a
            className="hero__featured"
            href={featuredRelease.url}
            target="_blank"
            rel="noreferrer"
          >
            {featuredRelease.artwork ? (
              <span className="hero__featured-art" aria-hidden="true">
                <img src={featuredRelease.artwork} alt="" loading="eager" />
              </span>
            ) : null}
            <span className="hero__featured-meta">
              <span className="hero__featured-label">
                {featuredRelease.label || 'Nuevo'}
              </span>
              <span className="hero__featured-title">{featuredRelease.title || ''}</span>
              <span className="hero__featured-sub">Spotify</span>
            </span>
          </a>
        ) : null}
        <p className="eyebrow">{content.heroCopy.eyebrow}</p>
        <h1 className="hero__title hero__title--editorial">
          <span className="hero__title-main">{content.artistName}</span>
          <span className="hero__title-subline">{content.heroCopy.tagline}</span>
        </h1>
        <p className="hero__lead">{content.heroCopy.lead}</p>

        <div className="hero__actions hero__actions--compact">
          <a
            className="button button--spotify"
            href={content.spotifyUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="button__icon" aria-hidden="true">
              <SpotifyIcon />
            </span>
            <span>Spotify</span>
          </a>
          <a
            className="button button--secondary button--apple"
            href={content.appleMusicUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="button__icon" aria-hidden="true">
              <AppleMusicIcon />
            </span>
            <span>Apple Music</span>
          </a>
          <a
            className="button button--secondary button--instagram"
            href={content.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="button__icon" aria-hidden="true">
              <InstagramIcon />
            </span>
            <span>Instagram</span>
          </a>
        </div>

        <ul className="fact-list fact-list--editorial">
          {content.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      <div className="hero__stage hero__stage--editorial" data-reveal>
        <div className={`hero__vinyl hero__vinyl--editorial${isPreviewActive ? ' is-active' : ''}`}>
          <img src="/hero-vinyl.svg" alt="" aria-hidden="true" />
        </div>
        <div className="hero__note hero__note--editorial">
          <span>{content.heroCopy.topNote.label}</span>
          <strong>{content.heroCopy.topNote.value}</strong>
        </div>
      </div>
    </section>
  )
}
