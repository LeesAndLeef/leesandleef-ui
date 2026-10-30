import { Link } from 'react-router-dom'
import { getProductById } from '../../lib/products'
import type { RelatedProduct } from '../../types'
import { RelatedProductLink } from './RelatedProductLink'
import styles from './RelatedProducts.module.css'

export function RelatedProducts({
  title,
  link,
  items,
}: {
  title: string
  link: { label: string; to: string }
  items: RelatedProduct[]
}) {
  if (items.length === 0) return null
  return (
    <section className="section">
      <div className={`container ${styles.root}`}>
        <div className="section-head">
          <h2 className="disp" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}>
            {title}
          </h2>
          <Link to={link.to} style={{ fontWeight: 600 }}>
            {link.label}
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
