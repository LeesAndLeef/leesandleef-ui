import { COLORS } from '../../../styles/colors'
import { AMPHORA_ROWS } from './constants'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Amphora({ r, id }: SceneContext) {
  return (
    <>
      <Sky id={id} top={COLORS.ink} bottom={COLORS.wine800} />
      <defs>
        <radialGradient id={id('lamp')} cx="0.5" cy="0.15" r="0.6">
          <stop offset="0" stopColor={COLORS.paper} stopOpacity="0.4" />
          <stop offset="1" stopColor={COLORS.paper} stopOpacity="0" />
        </radialGradient>
      </defs>
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d={`M${-40 + k * 30} 170 Q200 ${-20 + k * 30} ${440 - k * 30} 170`}
          fill="none"
          stroke={COLORS.stone}
          strokeOpacity={0.12 + k * 0.06}
          strokeWidth="3"
        />
      ))}
      <rect width="400" height="300" fill={`url(#${id('lamp')})`} />
      <rect y="168" width="400" height="132" fill={COLORS.olive900} />
      {Array.from({ length: 50 }, (_, i) => (
        <circle key={i} cx={r() * 400} cy={170 + r() * 130} r={0.8 + r() * 1.6} fill={COLORS.stone} opacity="0.25" />
      ))}
      {AMPHORA_ROWS.map(({ y, s, xs }) =>
        xs.map((x, i) => (
          <g key={`${y}-${x}`}>
            <ellipse cx={x} cy={y + 6 * s} rx={48 * s} ry={18 * s} fill={COLORS.clayShadow} />
            <ellipse cx={x} cy={y} rx={32 * s} ry={12 * s} fill={COLORS.terra} />
            <ellipse cx={x} cy={y} rx={23 * s} ry={8 * s} fill={(i + y) % 3 ? COLORS.ink : COLORS.oak} />
          </g>
        )),
      )}
    </>
  )
}
