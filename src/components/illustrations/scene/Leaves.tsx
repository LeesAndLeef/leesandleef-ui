import { COLORS } from '../../../styles/colors'
import { LEAF } from './constants'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Leaves({ r, id }: SceneContext) {
  return (
    <>
      <Sky id={id} top={COLORS.sage} bottom={COLORS.olive300} />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 20 + i * 32
        return (
          <path
            key={i}
            d={`M-20 ${y} C100 ${y - 16} 220 ${y + 14} 420 ${y - 10}`}
            fill="none"
            stroke={COLORS.paper}
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeDasharray={`${40 + r() * 60} ${20 + r() * 30}`}
          />
        )
      })}
      <path
        d="M-20 250 C80 210 160 230 240 160 C290 118 340 110 420 70"
        fill="none"
        stroke={COLORS.oakDark}
        strokeWidth="6"
      />
      {[
        [70, 214, 1.2, -30],
        [170, 196, 1.5, 20],
        [262, 140, 1.3, 55],
        [338, 98, 1, 70],
        [120, 120, 0.9, -60],
        [300, 230, 1.1, 10],
      ].map(([x, y, s, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
          <path d={LEAF} fill={[COLORS.olive500, COLORS.olive700, COLORS.olive400][i % 3]} />
          {[-50, -20, 0, 20, 50].map((v) => (
            <line
              key={v}
              x1="0"
              y1="34"
              x2={Math.sin((v * Math.PI) / 180) * 32}
              y2={-Math.cos((v * Math.PI) / 180) * 32}
              stroke={COLORS.olive900}
              strokeOpacity="0.45"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}
    </>
  )
}
