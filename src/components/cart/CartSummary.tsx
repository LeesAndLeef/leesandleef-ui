import { eur } from '../../state/cart/pricing'
import type { Totals } from '../../state/cart/types'
import { SummaryRow } from '../ui/SummaryRow'
import styles from './CartSummary.module.css'

export function CartSummary({
  totals,
  promo,
}: {
  totals: Pick<Totals, 'count' | 'subtotal' | 'mixDiscount' | 'promoDiscount' | 'shipping' | 'total'>
  promo: string | null
}) {
  return (
    <div className={`hatch-w ${styles.summaryCard}`}>
      <div className={`block ${styles.summaryCardB}`} />
      <div className={`glass ${styles.summaryInner}`}>
        <span className="disp" style={{ fontSize: 26, marginBottom: 16 }}>
          Summary
        </span>
        <SummaryRow
          variant="cart"
          label={`Subtotal (${totals.count} item${totals.count === 1 ? '' : 's'})`}
          value={eur(totals.subtotal)}
        />
        <SummaryRow
          variant="cart"
          label="Mix 6 · −10% wine"
          value={totals.mixDiscount ? '−' + eur(totals.mixDiscount) : '—'}
        />
        <SummaryRow
          variant="cart"
          label={`Promo ${promo ?? ''}`}
          value={totals.promoDiscount ? '−' + eur(totals.promoDiscount) : '—'}
        />
        <SummaryRow variant="cart" label="Delivery (EU)" value={totals.shipping ? eur(totals.shipping) : 'Free'} />
        <div className={styles.summaryTotal}>
          <span style={{ fontWeight: 600 }}>Total</span>
          <span className="disp">{eur(totals.total)}</span>
        </div>
        <span className="mono label-rose" style={{ fontSize: 10 }}>
          VAT included · Excise paid in destination
        </span>
      </div>
    </div>
  )
}
