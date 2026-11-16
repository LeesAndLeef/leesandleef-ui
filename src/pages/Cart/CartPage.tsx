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
import { ErrorPage } from '../../components/layout/ErrorPage'
import { FallbackPage } from '../../components/layout/FallbackPage'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { useAddToCart } from '../../hooks/cart/useAddToCart'
import { useCart } from '../../hooks/cart/useCart'
import { useMoveToCart } from '../../hooks/cart/useMoveToCart'
import { useRemoveCartLine } from '../../hooks/cart/useRemoveCartLine'
import { useSaveForLater } from '../../hooks/cart/useSaveForLater'
import { useSetCartQty } from '../../hooks/cart/useSetCartQty'
import { CHECKOUT_ROUTE, HOME_ROUTE, WINES_ROUTE } from '../../routes'
import { CART_PAY_METHODS, CART_PROMISES } from './constants'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { data: cart, isPending, isError, refetch } = useCart()
  const addToCart = useAddToCart()
  const { mutate: setQty } = useSetCartQty()
  const { mutate: remove } = useRemoveCartLine()
  const { mutate: saveForLater } = useSaveForLater()
  const { mutate: moveToCart } = useMoveToCart()

  if (isPending) return <FallbackPage />
  if (isError) return <ErrorPage onRetry={() => refetch()} />

  const { lines, saved, totals, promo, giftNote } = cart
  const hasGoods = lines.some((l) => !l.isClub)

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
            {lines.length === 0 ? (
              <CartEmpty />
            ) : (
              <>
                <CartLines
                  lines={lines}
                  onRemove={remove}
                  onSaveForLater={saveForLater}
                  onQtyChange={(key, qty) => setQty({ key, qty })}
                />
                <CartExtras giftNote={giftNote} />
              </>
            )}
            {saved.length > 0 && <CartSavedList lines={saved} onMoveToCart={moveToCart} />}
            <CartUpsell inCartIds={lines.map((l) => l.item.id)} onAdd={(id) => addToCart([{ id }])} />
          </>
        }
        summary={
          <>
            <CartSummary totals={totals} promo={promo} />
            <CartPromoForm promo={promo} />
            {lines.length > 0 ? (
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
