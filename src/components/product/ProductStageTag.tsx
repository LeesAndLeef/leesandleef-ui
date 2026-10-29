import type { Wine } from '../../types'
import styles from './ProductStageTag.module.css'

export function ProductStageTag({ badge, left }: Pick<Wine, 'badge' | 'left'>) {
  if (!badge && left === undefined) return null
  return (
    <div className={`glass ${styles.root}`}>
      {badge && <span className="mono">{badge}</span>}
      {left !== undefined && <span className="mono label-rose">{left} bottles left</span>}
    </div>
  )
}
