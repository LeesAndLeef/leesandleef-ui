import { Link } from 'react-router-dom'
import { CartEmpty } from '../../components/cart/CartEmpty'
import { CartExtras } from '../../components/cart/CartExtras'
import { CartLayout } from '../../components/cart/CartLayout'
import { CartLines } from '../../components/cart/CartLines'
import { CartPromoForm } from '../../components/cart/CartPromoForm'
import { CartSavedList } from '../../components/cart/CartSavedList'
import { CartShipProgress } from '../../components/cart/CartShipProgress'
import { CartSummary } from '../../components/cart/CartSummary'
import { CartUpsell } from '../../components/cart/CartUpsell'
import { CheckoutProgress } from '../../components/cart/CheckoutProgress'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { CHECKOUT_ROUTE, HOME_ROUTE, WINES_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import { CART_PAY_METHODS, CART_PROMISES } from './constants'
import styles from './CartPage.module.css'

export default function CartPage() {
  const cart = useCart()
  const { priced, savedPriced, totals } = cart
  const hasGoods = priced.some((l) => !l.isClub)

  return (
    <>
      <section className="section gridbg">
        <div className={`container ${styles.head}`}>
          <div className="stack" style={{ gap: 20 }}>
            <Breadcrumb items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'Cart' }]} />
            <h1 className="disp h-xl">
              Your cart<span className="accent">.</span>
            </h1>
          </div>
          <CheckoutProgress current={0} />
        </div>
      </section>

      <CartLayout
        main={
          <>
            {hasGoods && <CartShipProgress totals={totals} />}
            {priced.length === 0 ? (
              <CartEmpty />
            ) : (
              <>
                <CartLines
                  lines={priced}
                  onRemove={cart.remove}
                  onSaveForLater={cart.saveForLater}
                  onQtyChange={cart.setQty}
                />
                <CartExtras />
              </>
            )}
            {savedPriced.length > 0 && <CartSavedList lines={savedPriced} onMoveToCart={cart.moveToCart} />}
            <CartUpsell inCartIds={priced.map((l) => l.id)} onAdd={(id) => cart.add(id)} />
          </>
        }
        summary={
          <>
            <CartSummary totals={totals} promo={cart.promo} />
            <CartPromoForm />
            {priced.length > 0 ? (
              <Link to={CHECKOUT_ROUTE} className={`btn btn-primary ${styles.checkoutBtn}`}>
                <span>Checkout</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button className={`btn ${styles.checkoutBtn}`} disabled>
                Checkout
              </button>
            )}
            <Link to={WINES_ROUTE} className="btn btn-outline">
              Keep shopping
            </Link>
            <ul className={styles.promises}>
              {CART_PROMISES.map((t, i) => (
                <li key={t}>
                  <span className="mono label-wine" style={{ width: 28 }}>
                    0{i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className={`mono ${styles.payMethods}`}>
              {CART_PAY_METHODS.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </>
        }
      />
    </>
  )
}
