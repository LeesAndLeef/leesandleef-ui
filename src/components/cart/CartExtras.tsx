import { useState } from 'react'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import styles from './CartExtras.module.css'

export function CartExtras() {
  const { giftNote, setGiftNote } = useCart()
  const [gift, setGift] = useState(giftNote !== null)

  function toggleGift() {
    setGift(!gift)
    setGiftNote(gift ? null : (giftNote ?? ''))
  }

  return (
    <div className={styles.extras}>
      <div className={styles.extra}>
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
              value={giftNote ?? ''}
              onChange={(e) => setGiftNote(e.target.value)}
            />
          </label>
        )}
      </div>
      <div className={styles.extra} style={{ background: COLORS.bone }}>
        <span className="mono label-wine">Mix &amp; save</span>
        <span style={{ fontSize: 15, lineHeight: 1.5 }}>
          Any 6 bottles of wine take 10% off the wine. Olive oil doesn't count toward the six — but it does count toward
          free delivery.
        </span>
      </div>
    </div>
  )
}
