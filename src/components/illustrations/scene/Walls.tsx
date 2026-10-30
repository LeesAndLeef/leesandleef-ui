import type { ReactNode } from 'react'
import { ridge } from '../../../lib/scene/ridge'
import { COLORS } from '../../../styles/colors'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Walls({ r, id }: SceneContext) {
  return (
    <>
      <Sky id={id} top={COLORS.bone} bottom={COLORS.paper} />
      <rect y="30" width="400" height="60" fill={COLORS.sea} />
      <path d={ridge(r, 34, 6).d.replace(/L400 300 Z$/, 'L400 40 L0 40 Z')} fill={COLORS.olive300} opacity="0.6" />
      <path d="M0 76 C120 60 260 92 400 70 L400 300 L0 300 Z" fill={COLORS.olive500} />
      {[0, 1, 2, 3, 4, 5, 6].map((k) => {
        const y0 = 96 + k * 30 + k * k * 1.5
        const stones: ReactNode[] = []
        for (let x = -10; x < 410; ) {
          const w = 10 + r() * 14 + k * 1.5
          stones.push(
            <rect
              key={x}
              x={x}
              y={y0 + Math.sin(x / 60 + k) * 6}
              width={w - 1.5}
              height={7 + k * 1.4}
              rx="2"
              fill={r() > 0.5 ? COLORS.stone : COLORS.stoneShade}
              stroke={COLORS.olive900}
              strokeOpacity="0.35"
              strokeWidth="0.6"
            />,
          )
          x += w
        }
        return (
          <g key={k}>
            {Array.from({ length: 14 }, (_, i) => (
              <circle
                key={i}
                cx={i * 30 + 10 + (k % 2) * 15}
                cy={y0 - 8 - k * 0.6}
                r={3 + k * 0.5}
                fill={i % 2 ? COLORS.olive900 : COLORS.olive700}
              />
            ))}
            {stones}
          </g>
        )
      })}
    </>
  )
}
