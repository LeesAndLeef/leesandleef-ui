import { useState } from 'react'
import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import { CART_ROUTE } from '../../routes'
import { QtyStepper } from '../ui/QtyStepper'
import styles from './ProductBuyRow.module.css'

export function ProductBuyRow({ unitPrice, onAdd }: { unitPrice: number; onAdd: (qty: number) => void }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const addToCart = () => {
    onAdd(qty)
    setAdded(true)
  }

  return (
    <>
      <div className={styles.row}>
        <QtyStepper value={qty} onChange={setQty} size="lg" className={styles.qty} />
        <button className={`btn btn-primary ${styles.button}`} onClick={addToCart}>
          <span>Add to cart</span>
          <span className="disp">{euro(unitPrice * qty)}</span>
        </button>
      </div>

      {added && (
        <div className={`status ${styles.added}`} role="status">
          <span>Added to cart. Six bottles or more ship free.</span>
          <Link to={CART_ROUTE}>View cart →</Link>
        </div>
      )}
    </>
  )
}
