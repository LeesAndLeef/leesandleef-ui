import { useState } from 'react'
import { useSetGiftNote } from '../../hooks/cart/useSetGiftNote'
import { COLORS } from '../../styles/colors'
import type { Cart } from '../../types'
import styles from './CartExtras.module.css'

export function CartExtras({ giftNote }: Pick<Cart, 'giftNote'>) {
  const { mutate: saveGiftNote } = useSetGiftNote()
  const [gift, setGift] = useState(giftNote !== null)
  const [draft, setDraft] = useState(giftNote ?? '')

  function toggleGift() {
    setGift(!gift)
    if (gift) saveGiftNote(null)
    else if (draft) saveGiftNote(draft)
  }

  function saveDraft() {
    if (draft !== (giftNote ?? '')) saveGiftNote(draft)
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
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={saveDraft}
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
