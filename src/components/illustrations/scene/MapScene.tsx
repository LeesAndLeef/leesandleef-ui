import { COLORS } from '../../../styles/colors'
import type { SceneContext } from './types'

export function MapScene({ r }: SceneContext) {
  const cx = 150 + r() * 100
  const cy = 120 + r() * 60
  const contour = (k: number) => {
    const base = 18 + k * 24
    const ph = r() * 6
    let d = ''
    for (let i = 0; i <= 36; i++) {
      const a = (i / 36) * Math.PI * 2
      const rad = base * (1 + 0.16 * Math.sin(a * 3 + ph) + 0.08 * Math.sin(a * 5 + k))
      d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rad * 1.3).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)} `
    }
    return d + 'Z'
  }
  const px = cx + 30
  const py = cy + 34
  return (
    <>
      <rect width="400" height="300" fill={COLORS.bone} />
      {Array.from({ length: 9 }, (_, k) => (
        <path
          key={k}
          d={contour(k)}
          fill="none"
          stroke={COLORS.olive500}
          strokeOpacity={k % 4 === 3 ? 0.7 : 0.35}
          strokeWidth={k % 4 === 3 ? 1.4 : 0.8}
        />
      ))}
      <path
        d="M-10 280 C80 250 120 290 200 270 C280 250 320 290 410 262"
        fill="none"
        stroke={COLORS.olive300}
        strokeWidth="9"
      />
      <path
        d="M-10 280 C80 250 120 290 200 270 C280 250 320 290 410 262"
        fill="none"
        stroke={COLORS.paper}
        strokeWidth="2"
      />
      <path
        d={`M0 ${cy + 70} C100 ${cy + 40} ${cx} ${cy - 20} 400 40`}
        fill="none"
        stroke={COLORS.ink}
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />
      <path
        d={`M${px} ${py} L${px + 46} ${py - 8} L${px + 54} ${py + 26} L${px + 6} ${py + 34} Z`}
        fill={COLORS.wine}
        fillOpacity="0.65"
        stroke={COLORS.ink}
        strokeWidth="1.5"
      />
      <circle cx={cx} cy={cy} r="3" fill={COLORS.ink} />
      <g transform="translate(366 34)">
        <path d="M0 -14 L7 8 L0 3 L-7 8 Z" fill={COLORS.ink} />
        <text y="22" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill={COLORS.ink}>
          N
        </text>
      </g>
      <g transform="translate(20 276)">
        <rect width="30" height="5" fill={COLORS.ink} />
        <rect x="30" width="30" height="5" fill={COLORS.paper} stroke={COLORS.ink} strokeWidth="0.8" />
        <text y="-4" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill={COLORS.ink}>
          200 m
        </text>
      </g>
    </>
  )
}
