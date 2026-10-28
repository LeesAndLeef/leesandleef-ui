import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/context'
import { eur, FREE_SHIPPING_FROM, MIX_SIX } from '../cart/pricing'
import { Bottle } from '../components/Bottle'
import { CheckoutSteps, ProductThumb } from '../components/CartBits'
import { MiniFooter } from '../components/Footer'
import { Breadcrumb, QtyStepper } from '../components/ui'
import { euro, getProduct, productPath } from '../data/products'
import './Cart.css'

const upsellIds = ['grasevina-pet-nat-pjena', 'zlahtina-bura', 'opolo-svila', 'posip-kamen', 'skrlet-mahovina']

export default function Cart() {
  const cart = useCart()
  const { priced, savedPriced, totals } = cart
  const [promoInput, setPromoInput] = useState(cart.promo ?? '')
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [gift, setGift] = useState(cart.giftNote !== null)

  const filled = Math.min(12, Math.round((totals.goodsAfter / FREE_SHIPPING_FROM) * 12))
  const freeUnlocked = totals.goodsAfter >= FREE_SHIPPING_FROM
  const hasGoods = priced.some((l) => !l.isClub)
  const bottlesToGo = MIX_SIX - totals.wineBottles

  const upsell = upsellIds
    .filter((id) => !priced.some((l) => l.id === id))
    .slice(0, 3)
    .map((id) => getProduct(id)!)

  function applyPromo() {
    const code = promoInput.trim()
    if (!code) return setPromoMsg({ ok: false, text: 'Enter a code first.' })
    const ok = cart.applyPromo(code)
    setPromoMsg(
      ok
        ? { ok, text: `${code.toUpperCase()} applied — 10% off.` }
        : { ok, text: 'That code isn’t valid. Check spelling or expiry date.' },
    )
  }

  function toggleGift() {
    setGift(!gift)
    cart.setGiftNote(gift ? null : (cart.giftNote ?? ''))
  }

  return (
    <>
      <section className="section gridbg">
        <div className="container cart-head">
          <div className="stack" style={{ gap: 20 }}>
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
            <h1 className="disp h-xl">
              Your cart<span className="accent">.</span>
            </h1>
          </div>
          <CheckoutSteps current={0} />
        </div>
      </section>

      <section className="section cart-body-wrap">
        <div className="cart-body">
          <div className="cart-main">
            {hasGoods && (
              <div className="ship-progress">
                <div className="ship-progress-head">
                  <span style={{ fontWeight: 600 }}>
                    {freeUnlocked
                      ? 'Free delivery unlocked.'
                      : `${eur(FREE_SHIPPING_FROM - totals.goodsAfter)} away from free delivery`}
                  </span>
                  <span className="mono label-muted">Free EU delivery from €{FREE_SHIPPING_FROM}</span>
                </div>
                <div className="ship-progress-bar" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className={i < filled ? (freeUnlocked ? 'done' : 'on') : undefined} />
                  ))}
                </div>
                <div className="mono mono-sm label-muted ship-progress-scale">
                  <span>€0</span>
                  <span>
                    {bottlesToGo <= 0
                      ? '6+ bottles · mix discount on'
                      : `${bottlesToGo} more bottle${bottlesToGo === 1 ? '' : 's'} for −10%`}
                  </span>
                  <span>€{FREE_SHIPPING_FROM}</span>
                </div>
              </div>
            )}

            {priced.length === 0 ? (
              <div className="hatch cart-empty">
                <div className="block cart-empty-b" />
                <h2 className="disp">The cart is empty.</h2>
                <p>The cellar isn’t. Twelve wines from the autumn release are waiting.</p>
                <div className="btn-row" style={{ position: 'relative' }}>
                  <Link to="/shop" className="btn btn-paper btn-lg">
                    Browse the cellar →
                  </Link>
                  <Link to="/quiz" className="btn btn-ghost-light btn-lg">
                    Take the taste quiz
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="cart-lines">
                  <div className="mono mono-sm label-muted cart-line cart-line-head" aria-hidden="true">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span style={{ textAlign: 'right' }}>Total</span>
                  </div>
                  <ul>
                    {priced.map((l) => (
                      <li key={l.key} className="cart-line">
                        <div className="cart-line-product">
                          <Link
                            to={l.item.kind === 'club' ? '/club' : productPath(l.item)}
                            className="hatch cart-line-img"
                            aria-label={l.name}
                          >
                            <ProductThumb line={l} />
                          </Link>
                          <div className="stack" style={{ gap: 6, minWidth: 0 }}>
                            <span className="mono mono-sm label-muted">{l.meta}</span>
                            <Link
                              to={l.item.kind === 'club' ? '/club' : productPath(l.item)}
                              className="lnk cart-line-name"
                            >
                              {l.name}
                            </Link>
                            <span className="label-muted" style={{ fontSize: 14 }}>
                              {'growerName' in l.item && l.item.growerName ? `${l.item.growerName} · ` : ''}
                              {euro(l.unit)} each
                            </span>
                            {'left' in l.item && l.item.left !== undefined && l.item.left < 30 && (
                              <span className="mono badge" style={{ alignSelf: 'flex-start', fontSize: 10 }}>
                                Only {l.item.left} left
                              </span>
                            )}
                            <div className="cart-line-actions">
                              <button className="link-btn" onClick={() => cart.remove(l.key)}>
                                Remove
                              </button>
                              {!l.isClub && (
                                <button className="link-btn" onClick={() => cart.saveForLater(l.key)}>
                                  Save for later
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {l.maxQty > 1 ? (
                          <QtyStepper value={l.qty} max={l.maxQty} onChange={(n) => cart.setQty(l.key, n)} size="sm" />
                        ) : (
                          <span className="mono label-muted">1 box</span>
                        )}
                        <span className="disp cart-line-total">{euro(l.total)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="cart-extras">
                  <div className="cart-extra">
                    <label className="check" style={{ fontWeight: 600 }}>
                      <input type="checkbox" checked={gift} onChange={toggleGift} /> This is a gift
                    </label>
                    {gift && (
                      <label className="fld">
                        Handwritten card message <span className="hint">Prices are hidden on the packing slip.</span>
                        <textarea
                          className="input"
                          rows={3}
                          maxLength={280}
                          placeholder="Happy birthday — drink the orange one first."
                          value={cart.giftNote ?? ''}
                          onChange={(e) => cart.setGiftNote(e.target.value)}
                        />
                      </label>
                    )}
                  </div>
                  <div className="cart-extra" style={{ background: 'var(--bone)' }}>
                    <span className="mono label-wine">Mix &amp; save</span>
                    <span style={{ fontSize: 15, lineHeight: 1.5 }}>
                      Any 6 bottles of wine take 10% off the wine. Olive oil doesn’t count toward the six — but it does
                      count toward free delivery.
                    </span>
                  </div>
                </div>
              </>
            )}

            {savedPriced.length > 0 && (
              <div className="stack" style={{ gap: 12 }}>
                <h2 className="disp" style={{ fontSize: 24 }}>
                  Saved for later
                </h2>
                <ul className="saved-list">
                  {savedPriced.map((l) => (
                    <li key={l.key}>
                      <span className="hatch upsell-img">
                        <ProductThumb line={l} size="sm" />
                      </span>
                      <span className="stack" style={{ gap: 4, flexGrow: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{l.name}</span>
                        <span className="disp" style={{ fontSize: 18 }}>
                          {euro(l.unit)}
                        </span>
                      </span>
                      <button className="btn btn-outline btn-sm" onClick={() => cart.moveToCart(l.key)}>
                        Move to cart
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {upsell.length > 0 && (
              <div className="stack" style={{ gap: 16, marginTop: 12 }}>
                <div className="section-head" style={{ gap: 12 }}>
                  <h2 className="disp" style={{ fontSize: 28 }}>
                    Complete the six
                  </h2>
                  <span className="mono label-muted">Picked to match your cart</span>
                </div>
                <div className="ledger upsell-grid">
                  {upsell.map((u) => (
                    <div key={u.id} className="upsell-item">
                      <Link to={productPath(u)} className="hatch upsell-img" aria-label={u.name}>
                        <Bottle glass={u.glass} width={20} height={68} detail="silhouette" />
                      </Link>
                      <div className="stack" style={{ gap: 4, flexGrow: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{u.name}</span>
                        <span className="disp" style={{ fontSize: 18 }}>
                          {euro(u.price)}
                        </span>
                      </div>
                      <button className="icon-btn" aria-label={`Add ${u.name}`} onClick={() => cart.add(u.id)}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside aria-label="Order summary" className="cart-summary">
            <div className="hatch-w summary-card">
              <div className="block summary-card-b" />
              <div className="glass summary-inner">
                <span className="disp" style={{ fontSize: 26, marginBottom: 16 }}>
                  Summary
                </span>
                <SummaryRow
                  label={`Subtotal (${totals.count} item${totals.count === 1 ? '' : 's'})`}
                  value={eur(totals.subtotal)}
                />
                <SummaryRow
                  label="Mix 6 · −10% wine"
                  value={totals.mixDiscount ? '−' + eur(totals.mixDiscount) : '—'}
                />
                <SummaryRow
                  label={`Promo ${cart.promo ?? ''}`}
                  value={totals.promoDiscount ? '−' + eur(totals.promoDiscount) : '—'}
                />
                <SummaryRow label="Delivery (EU)" value={totals.shipping ? eur(totals.shipping) : 'Free'} />
                <div className="summary-total">
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span className="disp">{eur(totals.total)}</span>
                </div>
                <span className="mono label-rose" style={{ fontSize: 10 }}>
                  VAT included · Excise paid in destination
                </span>
              </div>
            </div>

            <div className="stack" style={{ gap: 8 }}>
              <label htmlFor="promo" className="mono label-muted">
                Promo or gift code
              </label>
              <div style={{ display: 'flex' }}>
                <input
                  id="promo"
                  className="input promo-input"
                  type="text"
                  value={promoInput}
                  placeholder="Try HARVEST10"
                  onChange={(e) => setPromoInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                />
                <button className="btn btn-ink promo-btn" onClick={applyPromo}>
                  Apply
                </button>
              </div>
              {promoMsg && (
                <span role="status" style={{ fontSize: 13, color: promoMsg.ok ? 'var(--olive-700)' : 'var(--wine)' }}>
                  {promoMsg.text}
                </span>
              )}
            </div>

            {priced.length > 0 ? (
              <Link to="/checkout" className="btn btn-primary checkout-btn">
                <span>Checkout</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button className="btn checkout-btn" disabled>
                Checkout
              </button>
            )}
            <Link to="/shop" className="btn btn-outline">
              Keep shopping
            </Link>

            <ul className="cart-promises">
              {[
                'Packed Friday, delivered in 2–5 working days',
                'Plastic-free pulp packaging',
                'Corked or broken? Replaced from a photo',
              ].map((t, i) => (
                <li key={t}>
                  <span className="mono label-wine" style={{ width: 28 }}>
                    0{i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mono pay-methods">
              {['Card', 'Apple Pay', 'Google Pay', 'Bank transfer'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <MiniFooter />
    </>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <span className="num">{value}</span>
    </div>
  )
}
