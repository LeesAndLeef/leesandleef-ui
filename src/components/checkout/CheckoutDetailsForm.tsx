import { useState } from 'react'
import { submitHandler } from '../../lib/submitHandler'
import { CheckoutFieldGrid } from './CheckoutFieldGrid'
import { CheckoutForm } from './CheckoutForm'
import type { CheckoutDetails } from './types'
import styles from './CheckoutDetailsForm.module.css'

export function CheckoutDetailsForm({
  details,
  onChange,
  onContinue,
}: {
  details: CheckoutDetails
  onChange: (details: CheckoutDetails) => void
  onContinue: () => void
}) {
  const [ageErr, setAgeErr] = useState(false)

  return (
    <CheckoutForm
      onSubmit={submitHandler(() => {
        if (!details.age) return setAgeErr(true)
        onContinue()
      })}
    >
      <CheckoutFieldGrid>
        <label className="fld">
          First name
          <input
            className="input"
            required
            autoComplete="given-name"
            value={details.first}
            onChange={(e) => onChange({ ...details, first: e.target.value })}
          />
        </label>
        <label className="fld">
          Last name
          <input
            className="input"
            required
            autoComplete="family-name"
            value={details.last}
            onChange={(e) => onChange({ ...details, last: e.target.value })}
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
            onChange={(e) => onChange({ ...details, email: e.target.value })}
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
            onChange={(e) => onChange({ ...details, phone: e.target.value })}
          />
        </label>
      </CheckoutFieldGrid>
      <label className={`${styles.ageCheck} ${ageErr ? styles.hasError : ''}`}>
        <input
          type="checkbox"
          checked={details.age}
          aria-invalid={ageErr}
          aria-describedby={ageErr ? 'age-err' : undefined}
          onChange={() => {
            onChange({ ...details, age: !details.age })
            setAgeErr(false)
          }}
        />
        <span>
          <strong>I confirm I am 18 or older.</strong> The courier will check ID on delivery and can't leave wine with a
          neighbour.
        </span>
      </label>
      {ageErr && (
        <span id="age-err" role="alert" className={styles.fieldError}>
          Please confirm your age to continue.
        </span>
      )}
      <label className="check">
        <input type="checkbox" checked={details.news} onChange={() => onChange({ ...details, news: !details.news })} />{' '}
        Send me one email per release (no spam)
      </label>
      <button className="btn btn-primary btn-lg">Continue to delivery →</button>
    </CheckoutForm>
  )
}
