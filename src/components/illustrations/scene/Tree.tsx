import { rng } from '../../../lib/scene/random'
import { COLORS } from '../../../styles/colors'
import { TREE_FILLS } from './constants'

export function Tree({ x, y, s, seed }: { x: number; y: number; s: number; seed: string }) {
  const r = rng(seed)
  const blobs = Array.from({ length: 7 }, () => [
    x + (r() - 0.5) * 70 * s,
    y - 70 * s + (r() - 0.5) * 34 * s,
    (18 + r() * 14) * s,
  ])
  return (
    <g>
      <path
        d={`M${x - 7 * s} ${y} C${x - 2 * s} ${y - 20 * s} ${x - 12 * s} ${y - 34 * s} ${x - 4 * s} ${y - 56 * s} L${x + 4 * s} ${y - 56 * s} C${x + 8 * s} ${y - 36 * s} ${x + 2 * s} ${y - 18 * s} ${x + 8 * s} ${y} Z`}
        fill={COLORS.olive900}
      />
      {blobs.map(([bx, by, br], i) => (
        <ellipse
          key={i}
          cx={bx}
          cy={by}
          rx={br}
          ry={br * 0.8}
          fill={TREE_FILLS[i % TREE_FILLS.length]}
          opacity="0.92"
        />
      ))}
    </g>
  )
}
