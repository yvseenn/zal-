import './VideoSection.css'

// Latest videoclip section fed by the JSON content files in src/content/.
export function VideoSection({ latestVideo }) {
  return (
    <section className="section video">
      <div className="video__copy" data-reveal>
        <p className="section-tag">Videoclip</p>
        <h2>{latestVideo.title}</h2>
        <p>{latestVideo.note}</p>
      </div>

      <div className="video__frame" data-reveal>
        {/* Keep this as a plain YouTube embed so swapping videos is just a data change. */}
        <iframe
          src={`https://www.youtube.com/embed/${latestVideo.youtubeId}`}
          title={latestVideo.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  )
}
