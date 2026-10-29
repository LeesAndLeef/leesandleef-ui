import { site } from '../../lib/site'
import styles from './HomeAnnouncement.module.css'

export function HomeAnnouncement() {
  return (
    <div className={`${styles.announce} mono`}>
      <span>Autumn release Nº 07 ships from {site.releaseShipDate}</span>
      <span aria-hidden="true">■</span>
      <span>Free EU delivery over €120</span>
      <span aria-hidden="true">■</span>
      <span>Every box carries the grower's handwritten notes</span>
    </div>
  )
}
