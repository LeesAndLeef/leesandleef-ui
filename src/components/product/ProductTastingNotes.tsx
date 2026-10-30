import type { WineDetail } from '../../types'
import { TASTING_KEYS } from './constants'
import styles from './ProductTastingNotes.module.css'

export function ProductTastingNotes({ notes, variant }: { notes: WineDetail['tasting']; variant: 'wine' | 'oil' }) {
  return (
    <div className={`cells ${styles.root} ${styles[variant]}`}>
      {TASTING_KEYS.map((k) => (
        <div key={k}>
          <span className={`disp ${styles.heading}`}>{k}</span>
          <p>{notes[k]}</p>
        </div>
      ))}
    </div>
  )
}
