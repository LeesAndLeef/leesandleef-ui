import { submitHandler } from '../../lib/submitHandler'
import { CheckoutForm } from './CheckoutForm'
import { PAY_NAMES } from './constants'
import type { Pay } from './types'
import styles from './CheckoutPaymentForm.module.css'

export function CheckoutPaymentForm({
  pay,
  onPayChange,
  onContinue,
}: {
  pay: Pay
  onPayChange: (pay: Pay) => void
  onContinue: () => void
}) {
  return (
    <CheckoutForm onSubmit={submitHandler(onContinue)}>
      <div role="radiogroup" aria-label="Payment method" className={styles.payTabs}>
        {(Object.keys(PAY_NAMES) as Pay[]).map((p) => (
          <button key={p} type="button" role="radio" aria-checked={pay === p} onClick={() => onPayChange(p)}>
            {PAY_NAMES[p]}
          </button>
        ))}
      </div>
      {pay === 'card' && (
        <>
          <div className={`hatch-w ${styles.cardPanel}`}>
            <div className={`block ${styles.cardPanelB}`} />
            <div className={`glass ${styles.cardFields}`}>
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
        <div className={styles.payNote}>
          <span>You'll confirm with your device on the next step. No card details are stored by us.</span>
          <span className="mono label-muted">Apple Pay · Google Pay · on supported devices and browsers</span>
        </div>
      )}
      {pay === 'bank' && (
        <div className={styles.payNote}>
          <span>
            We reserve your bottles for 5 days. IBAN and reference arrive by email; the order ships after payment
            clears.
          </span>
          <span className="mono label-muted">Use your order number as the payment reference</span>
        </div>
      )}
      <label className="check">
        <input type="checkbox" defaultChecked /> Billing address same as delivery
      </label>
      <button className="btn btn-primary btn-lg">Review order →</button>
    </CheckoutForm>
  )
}
