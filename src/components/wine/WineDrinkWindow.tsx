import { COLORS } from '../../styles/colors'
import type { WineDetail } from '../../types'
import styles from './WineDrinkWindow.module.css'

export function WineDrinkWindow({ label, cells }: WineDetail['drinkWindow']) {
  return (
    <div className={`glass ${styles.root}`}>
      <span className="mono mono-sm" style={{ color: COLORS.sage }}>
        Drink window
      </span>
      <div className={styles.bar} aria-hidden="true">
        {cells.map((c, i) => (
          <span key={i} data-level={c} />
        ))}
      </div>
      <span style={{ fontSize: 13 }}>{label}</span>
    </div>
  )
}
