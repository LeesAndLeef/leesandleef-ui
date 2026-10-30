import type { OilDetail } from '../../types'
import styles from './OilUses.module.css'

export function OilUses({ uses }: Pick<OilDetail, 'uses'>) {
  return (
    <div className="stack" style={{ gap: 16 }}>
      <h3 className="mono label-muted">Use it for</h3>
      <ul className={styles.list}>
        {uses.map((u) => (
          <li key={u.dish}>
            <span>{u.dish}</span>
            <span className="mono label-muted">{u.kind}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
