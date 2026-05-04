import './ClosingSection.css'
import { AppleMusicIcon, InstagramIcon, SpotifyIcon } from '../SocialIcons.jsx'

// Closing CTA block for contact-style actions and external platform links.
// Reuses the same button variants as the hero so both CTA rows stay consistent.
export function ClosingSection({ content }) {
  return (
    <section className="section closing" data-reveal>
      <div className="closing__panel">
        <p className="section-tag">{content.closingCopy.tag}</p>
        <h2>{content.closingCopy.title}</h2>
        <p>{content.closingCopy.body}</p>

        <div className="hero__actions">
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
      </div>
    </section>
  )
}
