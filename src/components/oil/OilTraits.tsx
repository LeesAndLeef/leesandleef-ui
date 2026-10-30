import type { Oil } from '../../types'
import { OIL_TRAIT_MAX, OIL_TRAITS } from './constants'
import styles from './OilTraits.module.css'

export function OilTraits({ oil }: { oil: Pick<Oil, 'fruit' | 'bitter' | 'pepper' | 'detail'> }) {
  return (
    <dl className={styles.root}>
      {OIL_TRAITS.map(({ key, label, tone }) => (
        <div key={key} className={styles.trait}>
          <dt className="mono mono-sm label-muted">{label}</dt>
          <dd className={styles.value}>
            <span className={styles.bar} role="img" aria-label={`${label} ${oil[key]} of ${OIL_TRAIT_MAX}`}>
              {Array.from({ length: OIL_TRAIT_MAX }, (_, i) => (
                <span key={i} className={i < oil[key] ? styles[tone] : undefined} />
              ))}
            </span>
            <span className={styles.word}>{oil.detail.traits[key]}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
