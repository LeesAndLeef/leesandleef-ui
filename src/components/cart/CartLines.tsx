import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import type { PricedLine } from '../../types'
import { ProductThumb } from '../product/ProductThumb'
import { QtyStepper } from '../ui/QtyStepper'
import styles from './CartLines.module.css'

export function CartLines({
  lines,
  onRemove,
  onSaveForLater,
  onQtyChange,
}: {
  lines: PricedLine[]
  onRemove: (key: string) => void
  onSaveForLater: (key: string) => void
  onQtyChange: (key: string, qty: number) => void
}) {
  return (
    <div className={styles.lines}>
      <div className={`mono mono-sm label-muted ${styles.line} ${styles.lineHead}`} aria-hidden="true">
        <span>Product</span>
        <span>Quantity</span>
        <span style={{ textAlign: 'right' }}>Total</span>
      </div>
      <ul>
        {lines.map((l) => (
          <li key={l.key} className={styles.line}>
            <div className={styles.lineProduct}>
              <Link to={l.item.path} className={`hatch ${styles.lineImg}`} aria-label={l.name}>
                <ProductThumb line={l} />
              </Link>
              <div className="stack" style={{ gap: 6, minWidth: 0 }}>
                <span className="mono mono-sm label-muted">{l.meta}</span>
                <Link to={l.item.path} className={`lnk ${styles.lineName}`}>
                  {l.name}
                </Link>
                <span className="label-muted" style={{ fontSize: 14 }}>
                  {'growerName' in l.item && l.item.growerName ? `${l.item.growerName} · ` : ''}
                  {euro(l.unit)} each
                </span>
                {'left' in l.item && l.item.left !== undefined && l.item.left < 30 && (
                  <span className="mono badge" style={{ alignSelf: 'flex-start', fontSize: 10 }}>
                    Only {l.item.left} left
                  </span>
                )}
                <div className={styles.lineActions}>
                  <button className="link-btn" onClick={() => onRemove(l.key)}>
                    Remove
                  </button>
                  {!l.isClub && (
                    <button className="link-btn" onClick={() => onSaveForLater(l.key)}>
                      Save for later
                    </button>
                  )}
                </div>
              </div>
            </div>
            {l.maxQty > 1 ? (
              <QtyStepper value={l.qty} max={l.maxQty} onChange={(n) => onQtyChange(l.key, n)} size="sm" />
            ) : (
              <span className="mono label-muted">1 box</span>
            )}
            <span className={`disp ${styles.lineTotal}`}>{euro(l.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
