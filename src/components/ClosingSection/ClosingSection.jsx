import './ClosingSection.css'
import { AppleMusicIcon, InstagramIcon, SpotifyIcon } from '../SocialIcons.jsx'

// Closing CTA block for contact-style actions and external platform links.
// Reuses the same button variants as the hero so both CTA rows stay consistent.
export function ClosingSection({ appleMusicUrl, instagramUrl, spotifyUrl }) {
  return (
    <section className="section closing" data-reveal>
      <div className="closing__panel">
        <p className="section-tag">Contacto</p>
        <h2>Listo para ampliar en directo, social y colaboración.</h2>
        <p>
          Este portfolio está diseñado como una base clara para presentar a ZALØ
          a promotores, creativos, marcas y prensa digital.
        </p>

        <div className="hero__actions">
          <a
            className="button button--spotify"
            href={spotifyUrl}
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
            href={appleMusicUrl}
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
            href={instagramUrl}
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
