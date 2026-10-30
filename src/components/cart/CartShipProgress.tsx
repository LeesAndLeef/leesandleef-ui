import { FREE_SHIPPING_FROM, MIX_SIX } from '../../constants'
import { formatCurrency } from '../../lib/currency'
import type { Totals } from '../../state/cart/types'
import styles from './CartShipProgress.module.css'

export function CartShipProgress({ totals }: { totals: Pick<Totals, 'goodsAfter' | 'wineBottles'> }) {
  const filled = Math.min(12, Math.round((totals.goodsAfter / FREE_SHIPPING_FROM) * 12))
  const freeUnlocked = totals.goodsAfter >= FREE_SHIPPING_FROM
  const bottlesToGo = MIX_SIX - totals.wineBottles

  return (
    <div className={styles.shipProgress}>
      <div className={styles.shipProgressHead}>
        <span style={{ fontWeight: 600 }}>
          {freeUnlocked
            ? 'Free delivery unlocked.'
            : `${formatCurrency(FREE_SHIPPING_FROM - totals.goodsAfter, { cents: true })} away from free delivery`}
        </span>
        <span className="mono label-muted">Free EU delivery from {formatCurrency(FREE_SHIPPING_FROM)}</span>
      </div>
      <div className={styles.shipProgressBar} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={i < filled ? (freeUnlocked ? styles.done : styles.on) : undefined} />
        ))}
      </div>
      <div className={`mono mono-sm label-muted ${styles.shipProgressScale}`}>
        <span>€0</span>
        <span>
          {bottlesToGo <= 0
            ? '6+ bottles · mix discount on'
            : `${bottlesToGo} more bottle${bottlesToGo === 1 ? '' : 's'} for −10%`}
        </span>
        <span>{formatCurrency(FREE_SHIPPING_FROM)}</span>
      </div>
    </div>
  )
}
