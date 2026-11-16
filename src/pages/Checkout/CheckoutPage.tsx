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
import { PAY_NAMES } from '../../components/checkout/constants'
import type { CheckoutAddress, CheckoutDetails, Pay } from '../../components/checkout/types'
import { ErrorPage } from '../../components/layout/ErrorPage'
import { FallbackPage } from '../../components/layout/FallbackPage'
import { PageLayout } from '../../components/layout/PageLayout'
import { useCart } from '../../hooks/cart/useCart'
import { useClearCart } from '../../hooks/cart/useClearCart'
import { useShippingOptions } from '../../hooks/cart/useShippingOptions'
import { useSite } from '../../hooks/site/useSite'
import { totalWithDelivery } from '../../lib/cart'
import { formatCurrency } from '../../lib/currency'
import { newOrderNumber } from '../../lib/orderNumber'
import { shipCountryNames } from '../../lib/site'
import { CART_ROUTE } from '../../routes'
import type { Order, ShipMethod } from '../../types'

export default function CheckoutPage() {
  const cartQuery = useCart()
  const shipsQuery = useShippingOptions()
  const { mutate: clearCart } = useClearCart()
  const countries = shipCountryNames(useSite())
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
    country: countries[0],
    door: '',
  })
  const [ship, setShip] = useState<ShipMethod>('std')
  const [pay, setPay] = useState<Pay>('card')

  if (cartQuery.isError || shipsQuery.isError)
    return <ErrorPage onRetry={() => (cartQuery.refetch(), shipsQuery.refetch())} />
  if (cartQuery.isPending || shipsQuery.isPending) return <FallbackPage />

  const cart = cartQuery.data
  const ships = shipsQuery.data
  const { lines, totals } = cart
  if (!order && lines.length === 0) return <Navigate to={CART_ROUTE} replace />

  const curShip = ships.find((s) => s.id === ship) ?? ships[0]
  const total = totalWithDelivery(totals, curShip)
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
      lines,
    })
    clearCart()
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
                summary={`${curShip.name} · ${curShip.price ? formatCurrency(curShip.price, { cents: true }) : 'Free'} · ${addressLine}`}
              >
                <CheckoutDeliveryForm
                  ships={ships}
                  countries={countries}
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
            lines={order ? order.lines : lines}
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
