import type { WineLayout, WineSort } from '../../types'
import styles from './WineResultsTools.module.css'

export function WineResultsTools({
  sort,
  onSortChange,
  view,
  onViewChange,
}: {
  sort: WineSort
  onSortChange: (sort: WineSort) => void
  view: WineLayout
  onViewChange: (view: WineLayout) => void
}) {
  return (
    <div className={styles.resultsTools}>
      <label htmlFor="sort" className="mono label-muted">
        Sort
      </label>
      <select id="sort" className="input" value={sort} onChange={(e) => onSortChange(e.target.value as WineSort)}>
        <option value="newest">Newest release</option>
        <option value="price-asc">Price, low to high</option>
        <option value="price-desc">Price, high to low</option>
        <option value="left">Fewest bottles left</option>
      </select>
      <div role="group" aria-label="View" className={styles.viewToggle}>
        <button aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => onViewChange('grid')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <rect width="7" height="7" />
            <rect x="9" width="7" height="7" />
            <rect y="9" width="7" height="7" />
            <rect x="9" y="9" width="7" height="7" />
          </svg>
        </button>
        <button aria-label="List view" aria-pressed={view === 'list'} onClick={() => onViewChange('list')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <rect width="16" height="3" />
            <rect y="6.5" width="16" height="3" />
            <rect y="13" width="16" height="3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
