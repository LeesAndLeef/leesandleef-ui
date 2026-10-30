import { COLORS } from '../../../styles/colors'
import { GLASS_BOWL, POUR_BACKDROPS } from './constants'
import type { SceneContext } from './types'

export function Pour({ r, cue, id, tone }: SceneContext) {
  const shift = Math.round((r() - 0.5) * 80)
  const level = 104 + Math.round(r() * 26)
  const backdrop = POUR_BACKDROPS[Math.floor(r() * POUR_BACKDROPS.length)]
  const blockX = shift < 0 ? 210 + r() * 60 : 40 + r() * 60
  const sparkling = /sparkling|pét-nat|brut/.test(cue)
  const bubbles = sparkling
    ? Array.from({ length: 14 }, () => [176 + r() * 48, level + 8 + r() * 56, 1 + r() * 1.6])
    : []

  return (
    <>
      <rect width="400" height="300" fill={COLORS.bone} />
      <rect x={blockX} y="46" width="110" height="110" fill={backdrop} />
      <rect y="228" width="400" height="72" fill={COLORS.paper} />
      <line x1="0" x2="400" y1="228" y2="228" stroke={COLORS.inkA20} />
      <g transform={`translate(${shift} 0)`}>
        <ellipse cx="200" cy="244" rx="46" ry="7" fill={COLORS.inkA15} />
        <defs>
          <clipPath id={id('bowl')}>
            <path d={GLASS_BOWL} />
          </clipPath>
        </defs>
        <path d={GLASS_BOWL} fill={COLORS.paperA50} />
        <g clipPath={`url(#${id('bowl')})`}>
          <rect x="150" y={level} width="100" height="120" fill={tone} />
          <rect x="150" y={level} width="100" height="2" fill={COLORS.paper} opacity="0.35" />
          {bubbles.map(([x, y, size]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={size} fill={COLORS.paper} opacity="0.7" />
          ))}
        </g>
        <path d={GLASS_BOWL} fill="none" stroke={COLORS.inkA35} strokeWidth="1.5" />
        <path d="M170 84 C168 116 174 146 186 160" fill="none" stroke={COLORS.paper} strokeWidth="4" opacity="0.55" />
        <rect x="197" y="176" width="6" height="64" fill={COLORS.inkA30} />
        <ellipse cx="200" cy="240" rx="34" ry="5" fill={COLORS.inkA30} />
      </g>
    </>
  )
}
