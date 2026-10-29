import type { ProductPerk } from '../../types'
import { SHIPPING_PERK } from './constants'
import styles from './ProductPerks.module.css'

export function ProductPerks({ perks }: { perks: ProductPerk[] }) {
  return (
    <div className={`cells ${styles.root}`}>
      {[SHIPPING_PERK, ...perks].map((p) => (
        <div key={p.label}>
          <span className="mono mono-sm label-wine">{p.label}</span>
          <span>{p.text}</span>
        </div>
      ))}
    </div>
  )
}
