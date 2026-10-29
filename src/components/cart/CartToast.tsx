import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CART_ROUTE, CHECKOUT_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import styles from './CartToast.module.css'

export function CartToast() {
  const { notice, dismissNotice, totals } = useCart()
  const { pathname } = useLocation()
  const onCartPage = pathname === CART_ROUTE || pathname === CHECKOUT_ROUTE

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(dismissNotice, 4000)
    return () => clearTimeout(t)
  }, [notice, dismissNotice])

  return (
    <div aria-live="polite" role="status">
      {notice && !onCartPage && (
        <div className={styles.root}>
          <span className={styles.text}>
            <span className="mono mono-sm label-olive">Added to cart · {totals.count} in total</span>
            <span>{notice.text}</span>
          </span>
          <Link to={CART_ROUTE} onClick={dismissNotice}>
            View cart →
          </Link>
          <button className="icon-btn" aria-label="Dismiss" onClick={dismissNotice}>
            ×
          </button>
        </div>
      )}
    </div>
  )
}
