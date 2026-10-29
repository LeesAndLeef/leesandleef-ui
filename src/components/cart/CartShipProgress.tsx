import { FREE_SHIPPING_FROM, MIX_SIX } from '../../constants'
import { eur } from '../../state/cart/pricing'
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
            : `${eur(FREE_SHIPPING_FROM - totals.goodsAfter)} away from free delivery`}
        </span>
        <span className="mono label-muted">Free EU delivery from €{FREE_SHIPPING_FROM}</span>
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
        <span>€{FREE_SHIPPING_FROM}</span>
      </div>
    </div>
  )
}
