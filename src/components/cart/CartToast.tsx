import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/cart/useCart'
import { CART_ROUTE, CHECKOUT_ROUTE } from '../../routes'
import { useCartNotice } from '../../state/useCartNotice'
import { CART_NOTICE_MS } from './constants'
import styles from './CartToast.module.css'

export function CartToast() {
  const { notice, dismiss } = useCartNotice()
  const count = useCart().data?.totals.count ?? 0
  const { pathname } = useLocation()
  const onCartPage = pathname === CART_ROUTE || pathname === CHECKOUT_ROUTE
  const visible = notice && (notice.tone === 'error' || !onCartPage)

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(dismiss, CART_NOTICE_MS)
    return () => clearTimeout(timer)
  }, [notice, dismiss])

  return (
    <div aria-live="polite" role="status">
      {visible && (
        <div className={styles.root}>
          <span className={styles.text}>
            {notice.tone === 'added' ? (
              <span className="mono mono-sm label-olive">Added to cart · {count} in total</span>
            ) : (
              <span className="mono mono-sm label-wine">Your cart wasn’t updated</span>
            )}
            <span>{notice.text}</span>
          </span>
          {notice.tone === 'added' && (
            <Link to={CART_ROUTE} onClick={dismiss}>
              View cart →
            </Link>
          )}
          <button className="icon-btn" aria-label="Dismiss" onClick={dismiss}>
            ×
          </button>
        </div>
      )}
    </div>
  )
}
