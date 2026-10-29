import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import { site } from '../../lib/site'
import { CART_ROUTE } from '../../routes'
import { eur } from '../../state/cart/pricing'
import type { Totals } from '../../state/cart/types'
import { COLORS } from '../../styles/colors'
import type { PricedLine } from '../../types'
import { ProductThumb } from '../product/ProductThumb'
import { SummaryRow } from '../ui/SummaryRow'
import type { ShipOption } from './types'
import styles from './CheckoutSummary.module.css'

export function CheckoutSummary({
  lines,
  placed,
  totals,
  promo,
  delivery,
  total,
}: {
  lines: PricedLine[]
  placed: boolean
  totals: Pick<Totals, 'subtotal' | 'mixDiscount' | 'promoDiscount'>
  promo: string | null
  delivery: Pick<ShipOption, 'name' | 'price'>
  total: number
}) {
  return (
    <>
      <div className={styles.summaryHead}>
        <span className="disp" style={{ fontSize: 26 }}>
          In the box
        </span>
        {!placed && (
          <Link to={CART_ROUTE} style={{ fontWeight: 600, fontSize: 14 }}>
            Edit cart
          </Link>
        )}
      </div>
      <ul className={styles.boxLines}>
        {lines.map((l) => (
          <li key={l.key}>
            <span className={`hatch ${styles.boxLineImg}`}>
              <ProductThumb line={l} size="sm" />
              <span className={`mono ${styles.boxLineQty}`}>{l.qty}</span>
            </span>
            <span className="stack" style={{ gap: 2, flexGrow: 1, minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{l.name}</span>
              <span className="label-muted" style={{ fontSize: 13 }}>
                {l.meta}
              </span>
            </span>
            <span className="num" style={{ fontSize: 14 }}>
              {euro(l.total)}
            </span>
          </li>
        ))}
      </ul>
      {!placed && (
        <div className="stack" style={{ fontSize: 15 }}>
          <SummaryRow variant="checkout" label="Subtotal" value={eur(totals.subtotal)} />
          {totals.mixDiscount > 0 && (
            <SummaryRow variant="checkout" label="Mix 6 · −10% wine" value={'−' + eur(totals.mixDiscount)} />
          )}
          {totals.promoDiscount > 0 && (
            <SummaryRow variant="checkout" label={`Promo ${promo}`} value={'−' + eur(totals.promoDiscount)} />
          )}
          <SummaryRow
            variant="checkout"
            label={`Delivery · ${delivery.name}`}
            value={delivery.price ? eur(delivery.price) : 'Free'}
          />
        </div>
      )}
      <div className={styles.total}>
        <span style={{ fontWeight: 600 }}>Total</span>
        <span className="disp">{eur(total)}</span>
      </div>
      <span className="mono label-muted" style={{ fontSize: 10, marginTop: -14 }}>
        VAT included
      </span>
      <div className={`hatch ${styles.insideBox}`}>
        <div className={`block ${styles.insideBoxB}`} />
        <div className={`glass ${styles.insideBoxInner}`}>
          <span className="mono mono-sm" style={{ color: COLORS.sage }}>
            Inside your box
          </span>
          <span style={{ fontSize: 15, lineHeight: 1.5 }}>
            The grower's handwritten notes on the harvest, and tasting cards for every bottle.
          </span>
        </div>
      </div>
      <ul className="square-list" style={{ fontSize: 13, gap: 10, color: COLORS.inkBody }}>
        <li>
          <span className="accent" aria-hidden="true">
            ■
          </span>
          Need help? <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <span className="accent" aria-hidden="true">
            ■
          </span>
          Free replacement for corked bottles
        </li>
      </ul>
    </>
  )
}
