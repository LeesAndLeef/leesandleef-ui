import { useState } from 'react'
import { euro } from '../../lib/euro'
import { getOil } from '../../lib/oil'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import { OilTin } from '../illustrations/OilTin'
import { SET_ID } from './constants'
import styles from './OilTastingSet.module.css'

export function OilTastingSet() {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const set = getOil(SET_ID)

  if (!set) return null

  return (
    <div className={`hatch-w on-dark ${styles.set}`}>
      <div className={`block ${styles.setB1}`} aria-hidden="true" />
      <div className={`block ${styles.setB2}`} aria-hidden="true" />
      <div className={`glass ${styles.setPanel}`}>
        <span className="mono" style={{ color: COLORS.wine200 }}>
          Gift · tasting set
        </span>
        <h2 className={`disp ${styles.setTitle}`}>One of each intensity.</h2>
        <p style={{ color: COLORS.wine100, lineHeight: 1.6 }}>{set.note}</p>
        <div className={styles.setTins} aria-hidden="true">
          {['oblica-island-blend', 'buza-grove-14', 'istarska-bjelica'].map((id) => {
            const o = getOil(id)
            return o ? <OilTin key={id} body={o.glass} cap={o.cap} width={56} height={92} /> : null
          })}
        </div>
        <div className={styles.setFoot}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span className="disp" style={{ fontSize: 40 }}>
              {euro(set.price)}
            </span>
            <span className="mono" style={{ fontSize: 11, color: COLORS.wine200, textDecoration: 'line-through' }}>
              {euro(set.set!.was)}
            </span>
          </span>
          <button
            className="btn btn-paper btn-lg"
            onClick={() => {
              add(SET_ID)
              setAdded(true)
            }}
          >
            {added ? 'Added ✓' : 'Add the set'}
          </button>
        </div>
      </div>
    </div>
  )
}
