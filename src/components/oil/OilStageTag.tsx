import type { Oil } from '../../types'
import styles from './OilStageTag.module.css'

export function OilStageTag({ level, harvest }: Pick<Oil, 'level' | 'harvest'>) {
  return (
    <div className={`glass ${styles.root}`}>
      <span className="mono">{level} intensity</span>
      <span className={`mono ${styles.harvest}`}>Harvest {harvest}</span>
    </div>
  )
}
