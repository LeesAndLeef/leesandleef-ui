import { COLORS } from '../../../styles/colors'
import { rng } from './random'

export function Crate({
  x,
  y,
  w,
  h,
  grape,
  seed,
}: {
  x: number
  y: number
  w: number
  h: number
  grape: string[]
  seed: string
}) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: Math.round(w / 9) }, (_, i) => (
        <circle
          key={i}
          cx={x + 8 + r() * (w - 16)}
          cy={y + 4 + r() * 10}
          r={4 + r() * 3}
          fill={grape[i % grape.length]}
        />
      ))}
      <rect x={x} y={y + 8} width={w} height={h - 8} fill={COLORS.woodPale} stroke={COLORS.oakDark} strokeWidth="1.5" />
      {[0.33, 0.66].map((t) => (
        <line
          key={t}
          x1={x}
          x2={x + w}
          y1={y + 8 + (h - 8) * t}
          y2={y + 8 + (h - 8) * t}
          stroke={COLORS.oakDark}
          strokeWidth="1.5"
        />
      ))}
      <rect x={x + w / 2 - 10} y={y + 14} width="20" height="6" fill={COLORS.oakDark} />
    </g>
  )
}
