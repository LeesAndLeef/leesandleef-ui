import type { OilDetail } from '../../types'
import styles from './OilStageFact.module.css'

export function OilStageFact({ label, value, text }: OilDetail['stageFact']) {
  return (
    <div className={`glass ${styles.root}`}>
      <span className={`mono mono-sm ${styles.label}`}>{label}</span>
      <span className={`disp ${styles.value}`}>{value}</span>
      <span className={styles.text}>{text}</span>
    </div>
  )
}
