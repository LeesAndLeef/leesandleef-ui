import { Link } from 'react-router-dom'
import { GROWERS_ROUTE } from '../../routes'
import type { Grower } from '../../types'
import styles from './ProductHeading.module.css'

export function ProductHeading({
  meta,
  title,
  grower,
}: {
  meta: string[]
  title: string
  grower?: Pick<Grower, 'id' | 'name' | 'place'>
}) {
  return (
    <div className="stack" style={{ gap: 14 }}>
      <div className={`mono label-muted ${styles.meta}`}>
        {meta.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <h1 className={`disp ${styles.title}`}>{title}</h1>
      {grower && (
        <Link to={`${GROWERS_ROUTE}/${grower.id}`} className={styles.grower}>
          by {grower.name}, {grower.place.split(',')[0]} →
        </Link>
      )}
    </div>
  )
}
