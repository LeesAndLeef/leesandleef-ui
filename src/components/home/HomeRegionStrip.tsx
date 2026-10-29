import { REGIONS } from './constants'
import styles from './HomeRegionStrip.module.css'

export function HomeRegionStrip() {
  return (
    <div className={`${styles.regionStrip} disp`}>
      {REGIONS.map((r, i) => (
        <span key={r}>
          {i > 0 && (
            <span className="accent" aria-hidden="true">
              ■{' '}
            </span>
          )}
          {r}
        </span>
      ))}
    </div>
  )
}
