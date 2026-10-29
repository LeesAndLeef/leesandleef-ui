import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import type { Product } from '../../types'
import { Bottle } from '../illustrations/Bottle'
import { OilTin } from '../illustrations/OilTin'
import styles from './RelatedProductLink.module.css'

export function RelatedProductLink({
  product,
  why,
}: {
  product: Pick<Product, 'path' | 'kind' | 'name' | 'price' | 'glass' | 'cap'>
  why: string
}) {
  return (
    <Link to={product.path} className={`lnk ${styles.root}`}>
      <span className={`hatch ${styles.picture}`}>
        {product.kind === 'oil' ? (
          <OilTin body={product.glass} cap={product.cap} width={50} height={90} />
        ) : (
          <Bottle glass={product.glass} width={26} height={90} detail="label" />
        )}
      </span>
      <span className="stack" style={{ gap: 6 }}>
        <span className="mono mono-sm label-muted">{why}</span>
        <span style={{ fontWeight: 600, lineHeight: 1.3 }}>{product.name}</span>
        <span className="disp" style={{ fontSize: 20 }}>
          {euro(product.price)}
        </span>
      </span>
    </Link>
  )
}
