import { Link } from 'react-router-dom'
import { getProductById } from '../../lib/products'
import { WINES_ROUTE } from '../../routes'
import type { WineDetail } from '../../types'
import { RelatedProductLink } from './RelatedProductLink'
import styles from './RelatedProducts.module.css'

export function RelatedProducts({ items }: { items: WineDetail['related'] }) {
  if (items.length === 0) return null
  return (
    <section className="section">
      <div className={`container ${styles.root}`}>
        <div className="section-head">
          <h2 className="disp" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}>
            If you like this
          </h2>
          <Link to={WINES_ROUTE} style={{ fontWeight: 600 }}>
            Back to the cellar →
          </Link>
        </div>
        <div className={`ledger ${styles.grid}`}>
          {items.map((r) => {
            const product = getProductById(r.id)
            return product && <RelatedProductLink key={r.id} product={product} why={r.why} />
          })}
        </div>
      </div>
    </section>
  )
}
