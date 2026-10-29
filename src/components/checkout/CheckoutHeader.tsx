import { Link } from 'react-router-dom'
import { CART_ROUTE } from '../../routes'
import { HeaderBar } from '../layout/HeaderBar'
import { Logo } from '../layout/Logo'
import styles from './CheckoutHeader.module.css'

export function CheckoutHeader({ showBackToCart }: { showBackToCart: boolean }) {
  return (
    <HeaderBar>
      <Logo />
      <div className={styles.headerActions}>
        <span className={`mono ${styles.secure}`}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="4" y="10" width="16" height="11" />
            <path d="M8 10V6h8v4" />
          </svg>
          Secure checkout
        </span>
        {showBackToCart && (
          <Link to={CART_ROUTE} style={{ fontWeight: 600, fontSize: 14 }}>
            ← Back to cart
          </Link>
        )}
      </div>
    </HeaderBar>
  )
}
