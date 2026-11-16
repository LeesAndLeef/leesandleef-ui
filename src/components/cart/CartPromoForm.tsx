import { useState } from 'react'
import { useApplyPromo } from '../../hooks/cart/useApplyPromo'
import { formatCurrency } from '../../lib/currency'
import { COLORS } from '../../styles/colors'
import type { Cart } from '../../types'
import styles from './CartPromoForm.module.css'

export function CartPromoForm({ promo }: Pick<Cart, 'promo'>) {
  const [promoInput, setPromoInput] = useState(promo ?? '')
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const { mutate: applyPromo, isPending } = useApplyPromo({
    onSuccess: (cart) =>
      setPromoMsg({
        ok: true,
        text: `${cart.promo} applied — ${formatCurrency(cart.totals.promoDiscount, { cents: true })} off.`,
      }),
    onError: (error) => setPromoMsg({ ok: false, text: error.message }),
  })

  function apply() {
    const code = promoInput.trim()
    if (!code) return setPromoMsg({ ok: false, text: 'Enter a code first.' })
    applyPromo(code)
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
        <button className={`btn btn-ink ${styles.promoBtn}`} onClick={apply} disabled={isPending}>
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
