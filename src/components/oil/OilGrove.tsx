import type { OilDetail } from '../../types'
import { ProductDetailRows } from '../product/ProductDetailRows'
import styles from './OilGrove.module.css'

export function OilGrove({ grove, grovePhoto }: Pick<OilDetail, 'grove' | 'grovePhoto'>) {
  return (
    <div className={styles.root}>
      <div className={styles.rows}>
        <ProductDetailRows rows={grove} />
      </div>
      <div className={`hatch ${styles.picture}`}>
        <img src={grovePhoto.img} alt={grovePhoto.alt} />
      </div>
    </div>
  )
}
