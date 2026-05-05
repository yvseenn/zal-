import './ClosingSection.css'
import { AppleMusicIcon, InstagramIcon, SpotifyIcon } from '../SocialIcons.jsx'

// Closing CTA block for contact-style actions and external platform links.
// Reuses the same button variants as the hero so both CTA rows stay consistent.
export function ClosingSection({ content }) {
  const booking = content.closingCopy?.booking

  return (
    <section className="section closing" id="contact" data-reveal>
      <div className="closing__panel">
        <p className="section-tag">{content.closingCopy.tag}</p>
        <h2>{content.closingCopy.title}</h2>
        <p>{content.closingCopy.body}</p>

        {booking ? (
          <div className="closing__booking">
            <p className="closing__booking-title">Booking</p>
            <div className="closing__booking-grid">
              {booking.email ? (
                <a className="closing__booking-link" href={`mailto:${booking.email}`}>
                  {booking.email}
                </a>
              ) : null}
              {booking.phone ? (
                <a className="closing__booking-link" href={`tel:${booking.phone}`}>
                  {booking.phone}
                </a>
              ) : null}
              {booking.location ? (
                <span className="closing__booking-meta">{booking.location}</span>
              ) : null}
              {booking.pressKitUrl ? (
                <a
                  className="closing__booking-link"
                  href={booking.pressKitUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Press kit
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

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
