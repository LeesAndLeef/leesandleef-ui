import { Link } from 'react-router-dom'
import { formatCurrency } from '../../lib/currency'
import { getProductById } from '../../lib/products'
import { Bottle } from '../illustrations/Bottle'
import { UPSELL_IDS } from './constants'
import styles from './CartUpsell.module.css'

export function CartUpsell({ inCartIds, onAdd }: { inCartIds: string[]; onAdd: (id: string) => void }) {
  const upsell = UPSELL_IDS.filter((id) => !inCartIds.includes(id))
    .slice(0, 3)
    .map((id) => getProductById(id)!)

  if (upsell.length === 0) return null

  return (
    <div className="stack" style={{ gap: 16, marginTop: 12 }}>
      <div className="section-head" style={{ gap: 12 }}>
        <h2 className="disp" style={{ fontSize: 28 }}>
          Complete the six
        </h2>
        <span className="mono label-muted">Picked to match your cart</span>
      </div>
      <div className={`ledger ${styles.upsellGrid}`}>
        {upsell.map((u) => (
          <div key={u.id} className={styles.upsellItem}>
            <Link to={u.path} className={`hatch ${styles.upsellImg}`} aria-label={u.name}>
              <Bottle glass={u.glass} width={20} height={68} detail="silhouette" />
            </Link>
            <div className="stack" style={{ gap: 4, flexGrow: 1, minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{u.name}</span>
              <span className="disp" style={{ fontSize: 18 }}>
                {formatCurrency(u.price)}
              </span>
            </div>
            <button className="icon-btn" aria-label={`Add ${u.name}`} onClick={() => onAdd(u.id)}>
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
