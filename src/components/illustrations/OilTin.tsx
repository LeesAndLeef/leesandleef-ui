import { COLORS } from '../../styles/colors'
import type { OilTinProps } from './types'

export function OilTin({ width, height, body = COLORS.olive500, cap = COLORS.ink, label }: OilTinProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <svg width={width} height={height} viewBox="0 0 120 200" {...a11y}>
      <rect x="10" y="30" width="100" height="170" fill={body} />
      <rect x="42" y="8" width="36" height="22" fill={COLORS.ink} />
      <rect x="22" y="78" width="76" height="76" fill={COLORS.paper} />
      <rect x="30" y="88" width="50" height="5" fill={cap} />
      <rect x="30" y="100" width="34" height="3" fill={COLORS.olive700} />
      <rect x="30" y="136" width="16" height="10" fill={cap} />
    </svg>
  )
}
