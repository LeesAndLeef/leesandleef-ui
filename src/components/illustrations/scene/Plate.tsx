import { poolPath } from '../../../lib/scene/poolPath'
import { COLORS } from '../../../styles/colors'
import { POUR_BACKDROPS } from './constants'
import type { SceneContext } from './types'

export function Plate({ r, tone }: SceneContext) {
  const shift = Math.round((r() - 0.5) * 32)
  const backdrop = POUR_BACKDROPS[Math.floor(r() * POUR_BACKDROPS.length)]
  const blockX = shift < 0 ? 220 + r() * 60 : 40 + r() * 60
  const breadLeft = r() > 0.5
  const drizzle = r() > 0.4
  const crumbs = Array.from({ length: 6 }, () => [120 + r() * 160, 236 + r() * 40])

  return (
    <>
      <rect width="400" height="300" fill={COLORS.bone} />
      <rect x={blockX} y="36" width="110" height="110" fill={backdrop} />
      <rect y="168" width="400" height="132" fill={COLORS.paper} />
      <line x1="0" x2="400" y1="168" y2="168" stroke={COLORS.inkA20} />
      <g transform={`translate(${shift} 0)`}>
        <ellipse cx="200" cy="222" rx="98" ry="32" fill={COLORS.inkA10} />
        <ellipse cx="200" cy="214" rx="96" ry="30" fill={COLORS.paper} stroke={COLORS.inkA30} strokeWidth="1.5" />
        <ellipse cx="200" cy="214" rx="70" ry="21" fill={COLORS.bone} />
        <path d={poolPath(r, 200, 214)} fill={tone} />
        <ellipse cx="184" cy="209" rx="18" ry="4" fill={COLORS.paper} opacity="0.4" />
        {drizzle && (
          <path d="M214 40 C212 110 216 160 212 206" fill="none" stroke={tone} strokeWidth="3" strokeLinecap="round" />
        )}
        <g transform={breadLeft ? 'translate(-72 22)' : 'translate(72 22)'}>
          <rect x="166" y="190" width="68" height="44" rx="14" fill={COLORS.oak} />
          <rect x="172" y="195" width="56" height="34" rx="10" fill={COLORS.woodPale} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={182 + i * 12} cy={207 + (i % 2) * 8} r="1.6" fill={COLORS.oak} opacity="0.6" />
          ))}
        </g>
      </g>
      {crumbs.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill={COLORS.woodPale} />
      ))}
    </>
  )
}
