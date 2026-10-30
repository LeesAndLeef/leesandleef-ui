import { formatCurrency } from '../../lib/currency'
import { submitHandler } from '../../lib/submitHandler'
import { CheckoutFieldGrid } from './CheckoutFieldGrid'
import { CheckoutForm } from './CheckoutForm'
import { COUNTRIES } from './constants'
import type { CheckoutAddress, Ship, ShipOption } from './types'
import styles from './CheckoutDeliveryForm.module.css'

export function CheckoutDeliveryForm({
  ships,
  ship,
  onShipChange,
  address,
  onAddressChange,
  onContinue,
}: {
  ships: ShipOption[]
  ship: Ship
  onShipChange: (ship: Ship) => void
  address: CheckoutAddress
  onAddressChange: (address: CheckoutAddress) => void
  onContinue: () => void
}) {
  return (
    <CheckoutForm onSubmit={submitHandler(onContinue)}>
      <fieldset>
        <legend className="mono label-muted" style={{ marginBottom: 12 }}>
          Delivery method
        </legend>
        {ships.map((s) => (
          <label key={s.id} className={`${styles.shipOption} ${ship === s.id ? styles.isSelected : ''}`}>
            <input type="radio" name="ship" checked={ship === s.id} onChange={() => onShipChange(s.id)} />
            <span className="stack" style={{ gap: 4, flexGrow: 1 }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</span>
              <span className="label-muted" style={{ fontSize: 14 }}>
                {s.desc}
              </span>
            </span>
            <span className="disp" style={{ fontSize: 20 }}>
              {s.price ? formatCurrency(s.price) : 'Free'}
            </span>
          </label>
        ))}
      </fieldset>
      {ship !== 'pick' && (
        <CheckoutFieldGrid>
          <label className="fld" style={{ gridColumn: '1 / -1' }}>
            Street and number
            <input
              className="input"
              required
              autoComplete="street-address"
              value={address.street}
              onChange={(e) => onAddressChange({ ...address, street: e.target.value })}
            />
          </label>
          <label className="fld">
            Postcode
            <input
              className="input"
              required
              autoComplete="postal-code"
              value={address.postcode}
              onChange={(e) => onAddressChange({ ...address, postcode: e.target.value })}
            />
          </label>
          <label className="fld">
            City
            <input
              className="input"
              required
              autoComplete="address-level2"
              value={address.city}
              onChange={(e) => onAddressChange({ ...address, city: e.target.value })}
            />
          </label>
          <label className="fld">
            Country
            <select
              className="input"
              autoComplete="country-name"
              value={address.country}
              onChange={(e) => onAddressChange({ ...address, country: e.target.value })}
            >
              {COUNTRIES.map((c) => (
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
              onChange={(e) => onAddressChange({ ...address, door: e.target.value })}
            />
          </label>
        </CheckoutFieldGrid>
      )}
      <div className={styles.noteRow}>
        <span className="mono label-wine">Heat</span>
        <span>If it's above 28 °C on your packing day, we hold the box and email you. Wine hates hot vans.</span>
      </div>
      <button className="btn btn-primary btn-lg">Continue to payment →</button>
    </CheckoutForm>
  )
}
