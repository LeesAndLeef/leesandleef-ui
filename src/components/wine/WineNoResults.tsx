import styles from './WineNoResults.module.css'

export function WineNoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className={`hatch ${styles.noResults}`}>
      <h2 className="disp">Nothing matches.</h2>
      <p>Try removing a filter — runs are small, and some combinations simply don’t exist yet.</p>
      <button className="btn btn-paper" onClick={onClear}>
        Clear all filters
      </button>
    </div>
  )
}
