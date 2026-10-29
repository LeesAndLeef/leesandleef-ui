import { COLORS } from '../../../styles/colors'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Soil({ r, id }: SceneContext) {
  const clods = Array.from({ length: 40 }, () => {
    const a = r() * Math.PI
    const d = r()
    return [200 + Math.cos(a) * 100 * d, 196 - Math.sin(a) * 46 * d, 3 + r() * 7]
  })
  return (
    <>
      <Sky id={id} top={COLORS.soilDeep} bottom={COLORS.terra} />
      {Array.from({ length: 60 }, (_, i) => (
        <circle
          key={i}
          cx={r() * 400}
          cy={r() * 300}
          r={1 + r() * 3}
          fill={i % 4 ? COLORS.clod : COLORS.stone}
          opacity="0.5"
        />
      ))}
      <ellipse cx="200" cy="262" rx="150" ry="22" fill={COLORS.ink} opacity="0.3" />
      <path d="M62 196 C66 262 140 284 204 276 L204 214 C150 222 96 214 62 196 Z" fill={COLORS.skin} />
      <path d="M338 196 C334 262 260 284 196 276 L196 214 C250 222 304 214 338 196 Z" fill={COLORS.skinShade} />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${70 + i * 8} ${206 + i * 14} q-14 6 -10 18`}
          stroke={COLORS.skinCrease}
          strokeWidth="1.5"
          fill="none"
        />
      ))}
      <path
        d="M92 204 C118 146 178 136 210 146 C252 136 292 158 310 204 C250 222 150 222 92 204 Z"
        fill={COLORS.terra}
      />
      {clods.map(([x, y, s], i) => (
        <circle key={i} cx={x} cy={y} r={s} fill={i % 7 === 0 ? COLORS.stone : i % 2 ? COLORS.clod : COLORS.clodDark} />
      ))}
    </>
  )
}
