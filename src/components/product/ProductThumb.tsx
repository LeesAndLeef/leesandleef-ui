import { COLORS } from '../../styles/colors'
import type { PricedLine } from '../../types'
import { Bottle } from '../illustrations/Bottle'
import { OilTin } from '../illustrations/OilTin'
import styles from './ProductThumb.module.css'

export function ProductThumb({ line, size = 'md' }: { line: PricedLine; size?: 'sm' | 'md' }) {
  if (line.isClub) {
    return (
      <span className={`${styles.clubThumb} ${styles[size]}`} aria-hidden="true">
        {[COLORS.glassRed, COLORS.glassAmber, COLORS.olive500, COLORS.glassGarnet, COLORS.olive300, COLORS.wine].map(
          (c) => (
            <span key={c} style={{ background: c }} />
          ),
        )}
      </span>
    )
  }
  const [w, h] = size === 'md' ? [30, 100] : [18, 60]
  if (line.item.kind === 'oil') return <OilTin body={line.glass} cap={line.item.cap} width={w * 1.4} height={h * 0.7} />
  return <Bottle glass={line.glass} width={w} height={h} detail="label" />
}
