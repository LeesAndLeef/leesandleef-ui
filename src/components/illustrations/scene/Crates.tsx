import { COLORS } from '../../../styles/colors'
import { Crate } from './Crate'
import { ridge } from './ridge'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Crates({ r, cue, id }: SceneContext) {
  const ferry = /ferry|boat/.test(cue)
  const scree = /scree|slope/.test(cue)
  const white = /pošip|žlahtina|malvazija|graševina|white/.test(cue)
  const grape = white
    ? [COLORS.glassStraw, COLORS.olive300, COLORS.grapeGreen]
    : [COLORS.grapeDark, COLORS.wine800, COLORS.wine]

  if (scree)
    return (
      <>
        <Sky id={id} top={COLORS.bone} bottom={COLORS.paper} />
        <rect y="40" width="400" height="60" fill={COLORS.sea} />
        <path d="M0 70 L400 120 L400 300 L0 300 Z" fill={COLORS.scree} />
        {Array.from({ length: 70 }, (_, i) => (
          <ellipse
            key={i}
            cx={r() * 400}
            cy={110 + r() * 190}
            rx={2 + r() * 6}
            ry={1.5 + r() * 3}
            fill={i % 3 ? COLORS.stone : COLORS.stoneDark}
          />
        ))}
        {[
          [70, 170, 1],
          [220, 210, 1.3],
          [330, 160, 0.9],
        ].map(([x, y, s]) => (
          <g key={x}>
            {Array.from({ length: 12 }, (_, i) => (
              <circle key={i} cx={x + (r() - 0.5) * 60 * s} cy={y - 6 * s + r() * 6} r={5 * s} fill={grape[i % 3]} />
            ))}
            <path
              d={`M${x - 34 * s} ${y} L${x + 34 * s} ${y} L${x + 26 * s} ${y + 40 * s} L${x - 26 * s} ${y + 40 * s} Z`}
              fill={COLORS.wood}
              stroke={COLORS.oakDark}
            />
            {[0.3, 0.6].map((t) => (
              <line
                key={t}
                x1={x - 32 * s}
                x2={x + 32 * s}
                y1={y + 40 * s * t}
                y2={y + 40 * s * t}
                stroke={COLORS.oakDark}
                strokeOpacity="0.7"
              />
            ))}
          </g>
        ))}
      </>
    )

  return (
    <>
      <Sky id={id} top={ferry ? COLORS.bone : COLORS.stone} bottom={COLORS.paper} />
      {ferry && (
        <>
          <path d={ridge(r, 104, 8).d} fill={COLORS.olive300} opacity="0.7" />
          <rect y="112" width="400" height="80" fill={COLORS.sea} />
          <line x1="0" x2="400" y1="150" y2="150" stroke={COLORS.paper} strokeWidth="3" />
          <line x1="0" x2="400" y1="176" y2="176" stroke={COLORS.paper} strokeWidth="3" />
          {[20, 100, 180, 260, 340].map((x) => (
            <line key={x} x1={x} x2={x} y1="150" y2="192" stroke={COLORS.paper} strokeWidth="3" />
          ))}
        </>
      )}
      <rect y="192" width="400" height="108" fill={ferry ? COLORS.quay : COLORS.olive700} />
      {[
        [40, 226],
        [150, 226],
        [260, 226],
        [95, 176],
        [205, 176],
        [315, 236],
      ].map(([x, y]) => (
        <Crate key={`${x}-${y}`} x={x} y={y} w={100} h={56} grape={grape} seed={`${cue}-${x}-${y}`} />
      ))}
    </>
  )
}
