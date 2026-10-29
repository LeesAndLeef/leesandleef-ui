import { useState } from 'react'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import styles from './CartPromoForm.module.css'

export function CartPromoForm() {
  const { promo, applyPromo } = useCart()
  const [promoInput, setPromoInput] = useState(promo ?? '')
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null)

  function apply() {
    const code = promoInput.trim()
    if (!code) return setPromoMsg({ ok: false, text: 'Enter a code first.' })
    const ok = applyPromo(code)
    setPromoMsg(
      ok
        ? { ok, text: `${code.toUpperCase()} applied — 10% off.` }
        : { ok, text: 'That code isn’t valid. Check spelling or expiry date.' },
    )
  }

  return (
    <div className="stack" style={{ gap: 8 }}>
      <label htmlFor="promo" className="mono label-muted">
        Promo or gift code
      </label>
      <div style={{ display: 'flex' }}>
        <input
          id="promo"
          className={`input ${styles.promoInput}`}
          type="text"
          value={promoInput}
          placeholder="Try HARVEST10"
          onChange={(e) => setPromoInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && apply()}
        />
        <button className={`btn btn-ink ${styles.promoBtn}`} onClick={apply}>
          Apply
        </button>
      </div>
      {promoMsg && (
        <span role="status" style={{ fontSize: 13, color: promoMsg.ok ? COLORS.olive700 : COLORS.wine }}>
          {promoMsg.text}
        </span>
      )}
    </div>
  )
}
