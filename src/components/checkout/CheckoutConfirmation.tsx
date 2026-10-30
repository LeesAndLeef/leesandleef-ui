import { Link } from 'react-router-dom'
import { formatCurrency } from '../../lib/currency'
import { CLUB_ROUTE, HOME_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import type { Order } from '../../types'
import styles from './CheckoutConfirmation.module.css'

export function CheckoutConfirmation({ order }: { order: Order }) {
  return (
    <div className="stack" style={{ gap: 28 }}>
      <div className={`hatch on-dark ${styles.hero}`}>
        <div className={`block ${styles.b1}`} />
        <div className={`block ${styles.b2}`} />
        <span className="mono" style={{ color: COLORS.sage, position: 'relative' }}>
          Order {order.number}
        </span>
        <h2 className="disp" style={{ fontSize: 'clamp(40px, 5vw, 72px)', position: 'relative' }}>
          Živjeli, {order.firstName}.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: COLORS.bone, maxWidth: 560, position: 'relative' }}>
          Your wine is reserved and will be packed on Friday. A confirmation is on its way to {order.email}.
        </p>
        <dl className={`glass ${styles.facts}`}>
          <div>
            <dt className="mono mono-sm">Delivery</dt>
            <dd>{order.shipName}</dd>
          </div>
          <div>
            <dt className="mono mono-sm">Paid with</dt>
            <dd>{order.payName}</dd>
          </div>
          <div>
            <dt className="mono mono-sm">Total</dt>
            <dd className="disp" style={{ fontSize: 24 }}>
              {formatCurrency(order.total, { cents: true })}
            </dd>
          </div>
        </dl>
      </div>
      <ol className={`cells ${styles.timeline}`}>
        {[
          ['Today', 'Order confirmed'],
          ['Friday', 'Packed by hand'],
          ['+1 day', 'Tracking link emailed'],
          ['2-5 days', 'At your door, adult signature'],
        ].map(([when, what]) => (
          <li key={when}>
            <span className="mono">{when}</span>
            <span style={{ fontWeight: 600 }}>{what}</span>
          </li>
        ))}
      </ol>
      <div className="btn-row">
        <Link to={HOME_ROUTE} className="btn btn-primary btn-lg">
          Back to the shop
        </Link>
        <Link to={CLUB_ROUTE} className="btn btn-outline btn-lg">
          Turn this into a Club box →
        </Link>
      </div>
    </div>
  )
}
