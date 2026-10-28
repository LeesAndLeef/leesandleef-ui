import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../cart/context'

export function CartToast() {
  const { notice, dismissNotice, totals } = useCart()
  const { pathname } = useLocation()
  const onCartPage = pathname === '/cart' || pathname === '/checkout'

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(dismissNotice, 4000)
    return () => clearTimeout(t)
  }, [notice, dismissNotice])

  return (
    <div aria-live="polite" role="status">
      {notice && !onCartPage && (
        <div className="toast">
          <span className="toast-text">
            <span className="mono mono-sm label-olive">Added to cart · {totals.count} in total</span>
            <span>{notice.text}</span>
          </span>
          <Link to="/cart" onClick={dismissNotice}>
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
