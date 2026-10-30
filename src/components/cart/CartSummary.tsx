import { formatCurrency } from '../../lib/currency'
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
          value={formatCurrency(totals.subtotal, { cents: true })}
        />
        <SummaryRow
          variant="cart"
          label="Mix 6 · −10% wine"
          value={totals.mixDiscount ? '−' + formatCurrency(totals.mixDiscount, { cents: true }) : '—'}
        />
        <SummaryRow
          variant="cart"
          label={`Promo ${promo ?? ''}`}
          value={totals.promoDiscount ? '−' + formatCurrency(totals.promoDiscount, { cents: true }) : '—'}
        />
        <SummaryRow
          variant="cart"
          label="Delivery (EU)"
          value={totals.shipping ? formatCurrency(totals.shipping, { cents: true }) : 'Free'}
        />
        <div className={styles.summaryTotal}>
          <span style={{ fontWeight: 600 }}>Total</span>
          <span className="disp">{formatCurrency(totals.total, { cents: true })}</span>
        </div>
        <span className="mono label-rose" style={{ fontSize: 10 }}>
          VAT included · Excise paid in destination
        </span>
      </div>
    </div>
  )
}
