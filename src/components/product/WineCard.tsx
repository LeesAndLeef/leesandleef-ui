import { Link } from 'react-router-dom'
import { formatCurrency } from '../../lib/currency'
import { winePath } from '../../lib/paths'
import type { Wine, WineLayout } from '../../types'
import { Bottle } from '../illustrations/Bottle'
import styles from './WineCard.module.css'

export function WineCard({ wine, layout = 'grid', onAdd }: { wine: Wine; layout?: WineLayout; onAdd: () => void }) {
  return (
    <article className={`${styles.root} ${layout === 'list' ? styles.list : ''}`}>
      <Link to={winePath(wine)} className={`${styles.img} hatch`} aria-label={wine.name}>
        <span className={`mono mono-sm glass ${styles.type}`}>{wine.type}</span>
        {wine.left !== undefined && <span className={`mono badge ${styles.left}`}>{wine.left} left</span>}
        <Bottle glass={wine.glass} cap={wine.cap} width={74} height={240} />
      </Link>
      <div className={styles.body}>
        <div className={`mono mono-sm ${styles.meta}`}>
          <span>{wine.region}</span>
          <span>{wine.abv}</span>
        </div>
        <h2>
          <Link to={winePath(wine)} className="lnk">
            {wine.name}
          </Link>
        </h2>
        <p className={styles.grower}>
          {wine.growerName} · {wine.grape}
        </p>
        <p className={styles.note}>{wine.note}</p>
        <div className={styles.foot}>
          <span className="disp">{formatCurrency(wine.price)}</span>
          <button className="icon-btn" aria-label={`Add ${wine.name} to cart`} onClick={onAdd}>
            +
          </button>
        </div>
      </div>
    </article>
  )
}
