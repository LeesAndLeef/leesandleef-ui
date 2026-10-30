import type { Random } from './types'

export function poolPath(r: Random, cx: number, cy: number) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2
    const k = 0.78 + r() * 0.3
    return [cx + Math.cos(a) * 52 * k, cy + Math.sin(a) * 16 * k]
  })
  return `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`
}
