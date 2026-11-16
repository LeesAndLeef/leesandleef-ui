import { useState } from 'react'
import { useAddToCart } from '../../hooks/cart/useAddToCart'
import { useOils } from '../../hooks/oil/useOils'
import { formatCurrency } from '../../lib/currency'
import { pickByIds } from '../../lib/pickByIds'
import { COLORS } from '../../styles/colors'
import { OilTin } from '../illustrations/OilTin'
import { SET_ID, SET_TIN_IDS } from './constants'
import styles from './OilTastingSet.module.css'

export function OilTastingSet() {
  const addToCart = useAddToCart()
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
          <span className="disp" style={{ fontSize: 40 }}>
            {formatCurrency(set.price)}
          </span>
          <button
            className="btn btn-paper btn-lg"
            onClick={() => {
              addToCart([{ id: set.sellableId }])
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
