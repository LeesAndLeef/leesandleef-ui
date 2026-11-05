import { useState } from 'react'
import { useOils } from '../../hooks/oil/useOils'
import { formatCurrency } from '../../lib/currency'
import { pickByIds } from '../../lib/pickByIds'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import { OilTin } from '../illustrations/OilTin'
import { SET_ID, SET_TIN_IDS } from './constants'
import styles from './OilTastingSet.module.css'

export function OilTastingSet() {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const oils = useOils()
  const set = oils.find((o) => o.id === SET_ID)

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
          {pickByIds(oils, SET_TIN_IDS).map((o) => (
            <OilTin key={o.id} body={o.glass} cap={o.cap} width={56} height={92} />
          ))}
        </div>
        <div className={styles.setFoot}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span className="disp" style={{ fontSize: 40 }}>
              {formatCurrency(set.price)}
            </span>
            <span className="mono" style={{ fontSize: 11, color: COLORS.wine200, textDecoration: 'line-through' }}>
              {formatCurrency(set.set!.was)}
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
