import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CartLayout } from '../../components/cart/CartLayout'
import { CheckoutConfirmation } from '../../components/checkout/CheckoutConfirmation'
import { CheckoutDeliveryForm } from '../../components/checkout/CheckoutDeliveryForm'
import { CheckoutDetailsForm } from '../../components/checkout/CheckoutDetailsForm'
import { CheckoutFooter } from '../../components/checkout/CheckoutFooter'
import { CheckoutHeader } from '../../components/checkout/CheckoutHeader'
import { CheckoutHeading } from '../../components/checkout/CheckoutHeading'
import { CheckoutPaymentForm } from '../../components/checkout/CheckoutPaymentForm'
import { CheckoutReview } from '../../components/checkout/CheckoutReview'
import { CheckoutStep } from '../../components/checkout/CheckoutStep'
import { CheckoutSummary } from '../../components/checkout/CheckoutSummary'
import { COUNTRIES, PAY_NAMES } from '../../components/checkout/constants'
import type { CheckoutAddress, CheckoutDetails, Pay, Ship, ShipOption } from '../../components/checkout/types'
import { PageLayout } from '../../components/layout/PageLayout'
import { newOrderNumber } from '../../lib/orderNumber'
import { CART_ROUTE } from '../../routes'
import { eur } from '../../state/cart/pricing'
import { useCart } from '../../state/cart/useCart'
import type { Order } from '../../types'

export default function Checkout() {
  const cart = useCart()
  const { priced, totals } = cart
  const [order, setOrder] = useState<Order | null>(null)
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState<CheckoutDetails>({
    first: '',
    last: '',
    email: '',
    phone: '',
    age: false,
    news: false,
  })
  const [address, setAddress] = useState<CheckoutAddress>({
    street: '',
    postcode: '',
    city: '',
    country: COUNTRIES[0],
    door: '',
  })
  const [ship, setShip] = useState<Ship>('std')
  const [pay, setPay] = useState<Pay>('card')

  if (!order && priced.length === 0) return <Navigate to={CART_ROUTE} replace />

  const ships: ShipOption[] = [
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

  function placeOrder() {
    setOrder({
      number: newOrderNumber(),
      firstName: details.first || 'friend',
      email: details.email,
      shipName: curShip.name,
      payName: PAY_NAMES[pay],
      total,
      lines: priced,
    })
    cart.clear()
    window.scrollTo(0, 0)
  }

  return (
    <PageLayout header={<CheckoutHeader showBackToCart={!order} />} footer={<CheckoutFooter />}>
      <CheckoutHeading step={step} placed={!!order} />
      <CartLayout
        variant="checkout"
        main={
          order ? (
            <CheckoutConfirmation order={order} />
          ) : (
            <>
              <CheckoutStep
                n={1}
                title="Your details"
                step={step}
                onEdit={() => setStep(1)}
                summary={`${fullName} · ${details.email} · 18+ confirmed`}
              >
                <CheckoutDetailsForm details={details} onChange={setDetails} onContinue={() => setStep(2)} />
              </CheckoutStep>
              <CheckoutStep
                n={2}
                title="Delivery"
                step={step}
                onEdit={() => setStep(2)}
                summary={`${curShip.name} · ${curShip.price ? eur(curShip.price) : 'Free'} · ${addressLine}`}
              >
                <CheckoutDeliveryForm
                  ships={ships}
                  ship={ship}
                  onShipChange={setShip}
                  address={address}
                  onAddressChange={setAddress}
                  onContinue={() => setStep(3)}
                />
              </CheckoutStep>
              <CheckoutStep n={3} title="Payment" step={step} onEdit={() => setStep(3)} summary={PAY_NAMES[pay]}>
                <CheckoutPaymentForm pay={pay} onPayChange={setPay} onContinue={() => setStep(4)} />
              </CheckoutStep>
              <CheckoutStep n={4} title="Review & pay" step={step} last>
                <CheckoutReview
                  contact={`${fullName} · ${details.email}`}
                  shipTo={`${addressLine} — ${curShip.name}`}
                  payment={PAY_NAMES[pay]}
                  giftNote={cart.giftNote}
                  total={total}
                  onPlaceOrder={placeOrder}
                />
              </CheckoutStep>
            </>
          )
        }
        summary={
          <CheckoutSummary
            lines={order ? order.lines : priced}
            placed={!!order}
            totals={totals}
            promo={cart.promo}
            delivery={curShip}
            total={order ? order.total : total}
          />
        }
      />
    </PageLayout>
  )
}
