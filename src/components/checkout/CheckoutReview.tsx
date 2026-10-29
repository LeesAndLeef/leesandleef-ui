import { eur } from '../../state/cart/pricing'
import styles from './CheckoutReview.module.css'

export function CheckoutReview({
  contact,
  shipTo,
  payment,
  giftNote,
  total,
  onPlaceOrder,
}: {
  contact: string
  shipTo: string
  payment: string
  giftNote: string | null
  total: number
  onPlaceOrder: () => void
}) {
  return (
    <div className={styles.stepForm}>
      <dl className={styles.reviewRows}>
        <div>
          <dt className="mono label-muted">Contact</dt>
          <dd>{contact}</dd>
        </div>
        <div>
          <dt className="mono label-muted">Ship to</dt>
          <dd>{shipTo}</dd>
        </div>
        <div>
          <dt className="mono label-muted">Payment</dt>
          <dd>{payment}</dd>
        </div>
        {giftNote && (
          <div>
            <dt className="mono label-muted">Gift card</dt>
            <dd>“{giftNote}”</dd>
          </div>
        )}
      </dl>
      <p className="label-muted" style={{ fontSize: 13, lineHeight: 1.55 }}>
        By placing the order you agree to our terms of sale and confirm you are of legal drinking age in the destination
        country.
      </p>
      <button className={`btn btn-primary ${styles.placeBtn}`} onClick={onPlaceOrder}>
        <span>Place order</span>
        <span className="disp">{eur(total)}</span>
      </button>
    </div>
  )
}
