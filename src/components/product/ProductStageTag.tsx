import type { WineVintage } from '../../types'
import styles from './ProductStageTag.module.css'

export function ProductStageTag({ left }: Pick<WineVintage, 'left'>) {
  if (left === undefined) return null
  return (
    <div className={`glass ${styles.root}`}>
      <span className="mono label-rose">{left} bottles left</span>
    </div>
  )
}
