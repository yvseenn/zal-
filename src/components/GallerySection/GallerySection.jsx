import './GallerySection.css'

export function GallerySection({ gallery, latestVideo }) {
  return (
    <section className="section gallery" id="gallery">
      <div className="gallery__intro" data-reveal>
        <p className="section-tag">Gallery</p>
        <h2>Visuales</h2>
      </div>

      {latestVideo?.youtubeId ? (
        <div className="gallery__video" data-reveal>
          <iframe
            src={`https://www.youtube.com/embed/${latestVideo.youtubeId}`}
            title={latestVideo.title || 'Videoclip'}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : null}

      {Array.isArray(gallery) && gallery.length > 0 ? (
        <div className="gallery__grid">
          {gallery.map((item, index) => (
            <figure
              className="gallery__item"
              key={`${item.image}-${index}`}
              data-reveal
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="gallery__media">
                <img src={item.image} alt={item.alt || ''} loading="lazy" />
              </div>
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : (
        <p className="gallery__empty" data-reveal>
          Añade fotos desde el CMS para que aparezcan aquí.
        </p>
      )}
    </section>
  )
}
