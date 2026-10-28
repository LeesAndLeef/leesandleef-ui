import { type FormEvent, type ReactNode, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../cart/context'
import { eur, type PricedLine } from '../cart/pricing'
import { ProductThumb } from '../components/CartBits'
import { Logo } from '../components/Logo'
import { euro } from '../data/products'
import { site } from '../data/site'
import './Cart.css'
import './Checkout.css'

type Ship = 'std' | 'sat' | 'pick'
type Pay = 'card' | 'wallet' | 'bank'

const payNames: Record<Pay, string> = { card: 'Card', wallet: 'Apple / Google Pay', bank: 'Bank transfer' }
const countries = site.shipCountries.map((c) => c.replace(/^the /, ''))

const newOrderNumber = () => 'LL-' + Date.now().toString(36).toUpperCase()

interface Order {
  number: string
  firstName: string
  email: string
  shipName: string
  payName: string
  total: number
  lines: PricedLine[]
}

export default function Checkout() {
  const cart = useCart()
  const { priced, totals } = cart

  const [step, setStep] = useState(1)
  const [order, setOrder] = useState<Order | null>(null)
  const [details, setDetails] = useState({ first: '', last: '', email: '', phone: '', age: false, news: false })
  const [address, setAddress] = useState({ street: '', postcode: '', city: '', country: countries[0], door: '' })
  const [ship, setShip] = useState<Ship>('std')
  const [pay, setPay] = useState<Pay>('card')
  const [ageErr, setAgeErr] = useState(false)

  if (!order && priced.length === 0) return <Navigate to="/cart" replace />

  const ships: { id: Ship; name: string; desc: string; price: number }[] = [
    {
      id: 'std',
      name: 'Standard courier',
      desc: 'Packed Friday · 2–5 working days · adult signature',
      price: totals.shipping,
    },
    {
      id: 'sat',
      name: 'Saturday delivery',
      desc: 'Major cities only · 08:00–14:00 window',
      price: totals.shipping + 9,
    },
    { id: 'pick', name: 'Collect at the cellar', desc: 'Thu–Sat, 12:00–20:00 · we’ll pour you a glass', price: 0 },
  ]
  const curShip = ships.find((s) => s.id === ship)!
  const total = totals.total - totals.shipping + curShip.price
  const fullName = `${details.first} ${details.last}`.trim()
  const addressLine =
    ship === 'pick'
      ? 'Collect at the cellar'
      : `${address.street}, ${address.postcode} ${address.city}, ${address.country}`

  const submit = (fn: () => void) => (e: FormEvent) => {
    e.preventDefault()
    fn()
  }

  function placeOrder() {
    setOrder({
      number: newOrderNumber(),
      firstName: details.first || 'friend',
      email: details.email,
      shipName: curShip.name,
      payName: payNames[pay],
      total,
      lines: priced,
    })
    cart.clear()
    window.scrollTo(0, 0)
  }

  const lines = order ? order.lines : priced
  const stepLabels = ['Details', 'Delivery', 'Payment', 'Review']

  return (
    <div className="page">
      <header className="site-header">
        <div className="container site-header-row">
          <Logo />
          <div className="checkout-header-actions">
            <span className="mono secure">
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
            {!order && (
              <Link to="/cart" style={{ fontWeight: 600, fontSize: 14 }}>
                ← Back to cart
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="page-main">
        <div className="section gridbg">
          <div className="container checkout-head">
            <h1 className="disp" style={{ fontSize: 'clamp(40px, 5.4vw, 80px)' }}>
              {order ? 'Order placed' : 'Checkout'}
            </h1>
            <ol aria-label="Checkout progress" className="checkout-progress">
              {stepLabels.map((label, i) => {
                const n = i + 1
                const cur = !order && step === n
                const past = !!order || step > n
                return (
                  <li
                    key={label}
                    aria-current={cur ? 'step' : undefined}
                    className={cur ? 'is-current' : past ? 'is-past' : undefined}
                  >
                    <span className="mono mono-sm">0{n}</span>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{label}</span>
                    <span className="progress-bar" aria-hidden="true" />
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <section className="section cart-body-wrap">
          <div className="cart-body">
            <div className="cart-main checkout-main">
              {order ? (
                <Confirmation order={order} />
              ) : (
                <>
                  <Step
                    n={1}
                    title="Your details"
                    step={step}
                    onEdit={() => setStep(1)}
                    summary={`${fullName} · ${details.email} · 18+ confirmed`}
                  >
                    <form
                      className="step-form"
                      onSubmit={submit(() => {
                        if (!details.age) return setAgeErr(true)
                        setStep(2)
                      })}
                    >
                      <div className="field-grid">
                        <label className="fld">
                          First name
                          <input
                            className="input"
                            required
                            autoComplete="given-name"
                            value={details.first}
                            onChange={(e) => setDetails({ ...details, first: e.target.value })}
                          />
                        </label>
                        <label className="fld">
                          Last name
                          <input
                            className="input"
                            required
                            autoComplete="family-name"
                            value={details.last}
                            onChange={(e) => setDetails({ ...details, last: e.target.value })}
                          />
                        </label>
                        <label className="fld">
                          Email
                          <input
                            className="input"
                            type="email"
                            required
                            autoComplete="email"
                            value={details.email}
                            onChange={(e) => setDetails({ ...details, email: e.target.value })}
                          />
                        </label>
                        <label className="fld">
                          <span>
                            Phone <span className="hint">For the courier only</span>
                          </span>
                          <input
                            className="input"
                            type="tel"
                            placeholder="+385 …"
                            autoComplete="tel"
                            value={details.phone}
                            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                          />
                        </label>
                      </div>
                      <label className={'age-check' + (ageErr ? ' has-error' : '')}>
                        <input
                          type="checkbox"
                          checked={details.age}
                          aria-invalid={ageErr}
                          aria-describedby={ageErr ? 'age-err' : undefined}
                          onChange={() => {
                            setDetails({ ...details, age: !details.age })
                            setAgeErr(false)
                          }}
                        />
                        <span>
                          <strong>I confirm I am 18 or older.</strong> The courier will check ID on delivery and can’t
                          leave wine with a neighbour.
                        </span>
                      </label>
                      {ageErr && (
                        <span id="age-err" role="alert" className="field-error">
                          Please confirm your age to continue.
                        </span>
                      )}
                      <label className="check">
                        <input
                          type="checkbox"
                          checked={details.news}
                          onChange={() => setDetails({ ...details, news: !details.news })}
                        />{' '}
                        Send me one email per release (no spam)
                      </label>
                      <button className="btn btn-primary btn-lg">Continue to delivery →</button>
                    </form>
                  </Step>

                  <Step
                    n={2}
                    title="Delivery"
                    step={step}
                    onEdit={() => setStep(2)}
                    summary={`${curShip.name} · ${curShip.price ? eur(curShip.price) : 'Free'} · ${addressLine}`}
                  >
                    <form className="step-form" onSubmit={submit(() => setStep(3))}>
                      <fieldset>
                        <legend className="mono label-muted" style={{ marginBottom: 12 }}>
                          Delivery method
                        </legend>
                        {ships.map((s) => (
                          <label key={s.id} className={'ship-option' + (ship === s.id ? ' is-selected' : '')}>
                            <input type="radio" name="ship" checked={ship === s.id} onChange={() => setShip(s.id)} />
                            <span className="stack" style={{ gap: 4, flexGrow: 1 }}>
                              <span style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</span>
                              <span className="label-muted" style={{ fontSize: 14 }}>
                                {s.desc}
                              </span>
                            </span>
                            <span className="disp" style={{ fontSize: 20 }}>
                              {s.price ? euro(s.price) : 'Free'}
                            </span>
                          </label>
                        ))}
                      </fieldset>
                      {ship !== 'pick' && (
                        <div className="field-grid">
                          <label className="fld" style={{ gridColumn: '1 / -1' }}>
                            Street and number
                            <input
                              className="input"
                              required
                              autoComplete="street-address"
                              value={address.street}
                              onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            />
                          </label>
                          <label className="fld">
                            Postcode
                            <input
                              className="input"
                              required
                              autoComplete="postal-code"
                              value={address.postcode}
                              onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                            />
                          </label>
                          <label className="fld">
                            City
                            <input
                              className="input"
                              required
                              autoComplete="address-level2"
                              value={address.city}
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            />
                          </label>
                          <label className="fld">
                            Country
                            <select
                              className="input"
                              autoComplete="country-name"
                              value={address.country}
                              onChange={(e) => setAddress({ ...address, country: e.target.value })}
                            >
                              {countries.map((c) => (
                                <option key={c}>{c}</option>
                              ))}
                            </select>
                          </label>
                          <label className="fld">
                            <span>
                              Floor / door code <span className="hint">Optional</span>
                            </span>
                            <input
                              className="input"
                              value={address.door}
                              onChange={(e) => setAddress({ ...address, door: e.target.value })}
                            />
                          </label>
                        </div>
                      )}
                      <div className="note-row">
                        <span className="mono label-wine">Heat</span>
                        <span>
                          If it’s above 28 °C on your packing day, we hold the box and email you. Wine hates hot vans.
                        </span>
                      </div>
                      <button className="btn btn-primary btn-lg">Continue to payment →</button>
                    </form>
                  </Step>

                  <Step n={3} title="Payment" step={step} onEdit={() => setStep(3)} summary={payNames[pay]}>
                    <form className="step-form" onSubmit={submit(() => setStep(4))}>
                      <div role="radiogroup" aria-label="Payment method" className="pay-tabs">
                        {(Object.keys(payNames) as Pay[]).map((p) => (
                          <button key={p} type="button" role="radio" aria-checked={pay === p} onClick={() => setPay(p)}>
                            {payNames[p]}
                          </button>
                        ))}
                      </div>
                      {pay === 'card' && (
                        <>
                          <div className="hatch-w card-panel">
                            <div className="block card-panel-b" />
                            <div className="glass card-fields">
                              <label className="fld" style={{ gridColumn: '1 / -1' }}>
                                Card number
                                <input
                                  className="input"
                                  inputMode="numeric"
                                  autoComplete="cc-number"
                                  placeholder="0000 0000 0000 0000"
                                />
                              </label>
                              <label className="fld">
                                Expiry
                                <input className="input" autoComplete="cc-exp" placeholder="MM / YY" />
                              </label>
                              <label className="fld">
                                CVC
                                <input className="input" inputMode="numeric" autoComplete="cc-csc" placeholder="123" />
                              </label>
                              <label className="fld" style={{ gridColumn: '1 / -1' }}>
                                Name on card
                                <input className="input" autoComplete="cc-name" />
                              </label>
                            </div>
                          </div>
                          <span className="mono mono-sm label-muted">
                            Encrypted and processed by our payment provider — we never see or store your card number.
                          </span>
                        </>
                      )}
                      {pay === 'wallet' && (
                        <div className="pay-note">
                          <span>
                            You’ll confirm with your device on the next step. No card details are stored by us.
                          </span>
                          <span className="mono label-muted">
                            Apple Pay · Google Pay · on supported devices and browsers
                          </span>
                        </div>
                      )}
                      {pay === 'bank' && (
                        <div className="pay-note">
                          <span>
                            We reserve your bottles for 5 days. IBAN and reference arrive by email; the order ships
                            after payment clears.
                          </span>
                          <span className="mono label-muted">Use your order number as the payment reference</span>
                        </div>
                      )}
                      <label className="check">
                        <input type="checkbox" defaultChecked /> Billing address same as delivery
                      </label>
                      <button className="btn btn-primary btn-lg">Review order →</button>
                    </form>
                  </Step>

                  <Step n={4} title="Review & pay" step={step} last>
                    <div className="step-form">
                      <dl className="review-rows">
                        <div>
                          <dt className="mono label-muted">Contact</dt>
                          <dd>
                            {fullName} · {details.email}
                          </dd>
                        </div>
                        <div>
                          <dt className="mono label-muted">Ship to</dt>
                          <dd>
                            {addressLine} — {curShip.name}
                          </dd>
                        </div>
                        <div>
                          <dt className="mono label-muted">Payment</dt>
                          <dd>{payNames[pay]}</dd>
                        </div>
                        {cart.giftNote && (
                          <div>
                            <dt className="mono label-muted">Gift card</dt>
                            <dd>“{cart.giftNote}”</dd>
                          </div>
                        )}
                      </dl>
                      <p className="label-muted" style={{ fontSize: 13, lineHeight: 1.55 }}>
                        By placing the order you agree to our terms of sale and confirm you are of legal drinking age in
                        the destination country.
                      </p>
                      <button className="btn btn-primary place-btn" onClick={placeOrder}>
                        <span>Place order</span>
                        <span className="disp">{eur(total)}</span>
                      </button>
                    </div>
                  </Step>
                </>
              )}
            </div>

            <aside aria-label="Order summary" className="cart-summary">
              <div className="summary-head">
                <span className="disp" style={{ fontSize: 26 }}>
                  In the box
                </span>
                {!order && (
                  <Link to="/cart" style={{ fontWeight: 600, fontSize: 14 }}>
                    Edit cart
                  </Link>
                )}
              </div>
              <ul className="box-lines">
                {lines.map((l) => (
                  <li key={l.key}>
                    <span className="hatch box-line-img">
                      <ProductThumb line={l} size="sm" />
                      <span className="mono box-line-qty">{l.qty}</span>
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
              {!order && (
                <div className="stack" style={{ fontSize: 15 }}>
                  <Row label="Subtotal" value={eur(totals.subtotal)} />
                  {totals.mixDiscount > 0 && <Row label="Mix 6 · −10% wine" value={'−' + eur(totals.mixDiscount)} />}
                  {totals.promoDiscount > 0 && (
                    <Row label={`Promo ${cart.promo}`} value={'−' + eur(totals.promoDiscount)} />
                  )}
                  <Row label={`Delivery · ${curShip.name}`} value={curShip.price ? eur(curShip.price) : 'Free'} />
                </div>
              )}
              <div className="checkout-total">
                <span style={{ fontWeight: 600 }}>Total</span>
                <span className="disp">{eur(order ? order.total : total)}</span>
              </div>
              <span className="mono label-muted" style={{ fontSize: 10, marginTop: -14 }}>
                VAT included
              </span>
              <div className="hatch inside-box">
                <div className="block inside-box-b" />
                <div className="glass inside-box-inner">
                  <span className="mono mono-sm" style={{ color: 'var(--sage)' }}>
                    Inside your box
                  </span>
                  <span style={{ fontSize: 15, lineHeight: 1.5 }}>
                    The grower’s handwritten notes on the harvest, and tasting cards for every bottle.
                  </span>
                </div>
              </div>
              <ul className="square-list" style={{ fontSize: 13, gap: 10, color: 'var(--ink-body)' }}>
                <li>
                  <span className="accent" aria-hidden="true">
                    ■
                  </span>
                  Need help? <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
                </li>
                <li>
                  <span className="accent" aria-hidden="true">
                    ■
                  </span>
                  Free replacement for corked bottles
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </main>

      <footer className="mini-footer">
        <div className="container mono mono-sm">
          <span>© 2026 Lees &amp; Leaf — concept project</span>
          <span>Privacy · Terms of sale</span>
          <span>Sale of alcohol to persons over 18 only</span>
        </div>
      </footer>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 0' }}>
      <span>{label}</span>
      <span className="num">{value}</span>
    </div>
  )
}

function Step({
  n,
  title,
  step,
  summary,
  onEdit,
  last,
  children,
}: {
  n: number
  title: string
  step: number
  summary?: string
  onEdit?: () => void
  last?: boolean
  children: ReactNode
}) {
  const open = step === n
  const done = step > n
  return (
    <div className={'step' + (last ? ' is-last' : '')}>
      <div className="step-head">
        <h2>
          <span className={'disp step-badge' + (open ? ' is-open' : done ? ' is-done' : '')}>0{n}</span>
          {title}
        </h2>
        {done && onEdit && (
          <button className="text-btn" onClick={onEdit} aria-label={`Edit ${title.toLowerCase()}`}>
            Edit
          </button>
        )}
      </div>
      {done && summary && <p className="step-summary">{summary}</p>}
      {open && children}
    </div>
  )
}

function Confirmation({ order }: { order: Order }) {
  return (
    <div className="stack" style={{ gap: 28 }}>
      <div className="hatch on-dark confirm-hero">
        <div className="block confirm-b1" />
        <div className="block confirm-b2" />
        <span className="mono" style={{ color: 'var(--sage)', position: 'relative' }}>
          Order {order.number}
        </span>
        <h2 className="disp" style={{ fontSize: 'clamp(40px, 5vw, 72px)', position: 'relative' }}>
          Živjeli, {order.firstName}.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--bone)', maxWidth: 560, position: 'relative' }}>
          Your wine is reserved and will be packed on Friday. A confirmation is on its way to {order.email}.
        </p>
        <dl className="glass confirm-facts">
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
              {eur(order.total)}
            </dd>
          </div>
        </dl>
      </div>
      <ol className="cells confirm-timeline">
        {[
          ['Today', 'Order confirmed'],
          ['Friday', 'Packed by hand'],
          ['+1 day', 'Tracking link emailed'],
          ['2–5 days', 'At your door, adult signature'],
        ].map(([when, what]) => (
          <li key={when}>
            <span className="mono">{when}</span>
            <span style={{ fontWeight: 600 }}>{what}</span>
          </li>
        ))}
      </ol>
      <div className="btn-row">
        <Link to="/" className="btn btn-primary btn-lg">
          Back to the shop
        </Link>
        <Link to="/club" className="btn btn-outline btn-lg">
          Turn this into a Club box →
        </Link>
      </div>
    </div>
  )
}
