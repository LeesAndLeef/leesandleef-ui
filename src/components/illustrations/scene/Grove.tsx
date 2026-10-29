import { COLORS } from '../../../styles/colors'
import { GROVE_TREES } from './constants'
import { ridge } from './ridge'
import { Sky } from './Sky'
import { Tree } from './Tree'
import type { SceneContext } from './types'

export function Grove({ r, cue: seed, id }: SceneContext) {
  const far = ridge(r, 150, 14)
  return (
    <>
      <Sky id={id} top={COLORS.bone} bottom={COLORS.paper} />
      <path d={far.d} fill={COLORS.olive300} opacity="0.8" />
      <rect y="190" width="400" height="110" fill={COLORS.olive500} />
      <defs>
        <pattern id={id('net')} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <path d="M0 0 L6 0 M0 0 L0 6" stroke={COLORS.wine200} strokeWidth="0.8" />
        </pattern>
      </defs>
      {GROVE_TREES.map(([x, y, s]) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx={72 * s} ry={13 * s} fill={COLORS.wine} opacity="0.55" />
          <ellipse cx={x} cy={y} rx={72 * s} ry={13 * s} fill={`url(#${id('net')})`} />
          {Array.from({ length: 9 }, (_, i) => (
            <circle
              key={i}
              cx={x + (r() - 0.5) * 100 * s}
              cy={y + (r() - 0.5) * 12 * s}
              r={1.6 * s}
              fill={i % 3 ? COLORS.olive900 : COLORS.wine800}
            />
          ))}
          <Tree x={x} y={y - 2 * s} s={s} seed={`${seed}-${x}`} />
        </g>
      ))}
    </>
  )
}
