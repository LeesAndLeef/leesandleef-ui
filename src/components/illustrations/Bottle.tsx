import { COLORS } from '../../styles/colors'
import { BOTTLE } from './constants'
import type { BottleProps } from './types'

export function Bottle({ glass, cap, width, height, detail = 'full', mark, label }: BottleProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <svg width={width} height={height} viewBox="0 0 60 200" {...a11y}>
      <path d={BOTTLE} fill={glass} />
      {detail === 'full' && cap && <rect x="24" y="0" width="12" height="20" fill={cap} />}
      {detail !== 'silhouette' && <rect x="14" y="104" width="32" height="56" fill={COLORS.paper} />}
      {detail === 'full' && (
        <>
          <rect x="18" y="112" width="24" height="3" fill={cap} />
          <rect x="18" y="120" width="16" height="2" fill={COLORS.olive700} />
          {mark && <rect x="18" y="146" width="10" height="8" fill={COLORS.olive700} />}
        </>
      )}
    </svg>
  )
}
