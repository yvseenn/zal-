import './EntryScreen.css'

export function EntryScreen({ title, subtitle, onEnter }) {
  return (
    <div className="entry">
      <button type="button" className="entry__button" onClick={onEnter}>
        <span className="entry__title">{title}</span>
        <span className="entry__subtitle">{subtitle}</span>
        <span className="entry__cta">Click to enter</span>
      </button>
    </div>
  )
}

