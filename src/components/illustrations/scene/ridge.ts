import type { Random } from './types'

export function ridge(r: Random, y: number, amp: number) {
  const p1 = r() * 6
  const p2 = r() * 6
  const f1 = 0.006 + r() * 0.008
  const f2 = 0.018 + r() * 0.02
  const at = (x: number) => y + amp * (Math.sin(x * f1 + p1) * 0.65 + Math.sin(x * f2 + p2) * 0.35)
  let d = `M0 300 L0 ${at(0).toFixed(1)}`
  for (let x = 10; x <= 400; x += 10) d += ` L${x} ${at(x).toFixed(1)}`
  return { d: d + ' L400 300 Z', at }
}
