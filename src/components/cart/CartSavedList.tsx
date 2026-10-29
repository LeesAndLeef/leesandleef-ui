import { euro } from '../../lib/euro'
import type { PricedLine } from '../../types'
import { ProductThumb } from '../product/ProductThumb'
import styles from './CartSavedList.module.css'

export function CartSavedList({ lines, onMoveToCart }: { lines: PricedLine[]; onMoveToCart: (key: string) => void }) {
  return (
    <div className="stack" style={{ gap: 12 }}>
      <h2 className="disp" style={{ fontSize: 24 }}>
        Saved for later
      </h2>
      <ul className={styles.savedList}>
        {lines.map((l) => (
          <li key={l.key}>
            <span className={`hatch ${styles.thumb}`}>
              <ProductThumb line={l} size="sm" />
            </span>
            <span className="stack" style={{ gap: 4, flexGrow: 1, minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{l.name}</span>
              <span className="disp" style={{ fontSize: 18 }}>
                {euro(l.unit)}
              </span>
            </span>
            <button className="btn btn-outline btn-sm" onClick={() => onMoveToCart(l.key)}>
              Move to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
