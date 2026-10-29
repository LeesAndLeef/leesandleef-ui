import { COLORS } from '../../../styles/colors'

export function Barrel({ cx, cy, R, mark }: { cx: number; cy: number; R: number; mark?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill={COLORS.oak} />
      {[-0.6, -0.3, 0, 0.3, 0.6].map((t) => (
        <line
          key={t}
          x1={cx + t * R}
          x2={cx + t * R}
          y1={cy - R * Math.sqrt(1 - t * t) * 0.9}
          y2={cy + R * Math.sqrt(1 - t * t) * 0.9}
          stroke={COLORS.oakDark}
          strokeWidth="1.2"
        />
      ))}
      <circle cx={cx} cy={cy} r={R * 0.92} fill="none" stroke={COLORS.oakDark} strokeWidth="2" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={COLORS.ink} strokeWidth="4" />
      <rect x={cx - 4} y={cy + R * 0.55} width="8" height="10" fill={COLORS.ink} />
      {mark && (
        <text
          x={cx}
          y={cy - R * 0.25}
          textAnchor="middle"
          fontFamily="IBM Plex Mono, monospace"
          fontSize={R * 0.24}
          fill={COLORS.paper}
          opacity="0.85"
        >
          {mark}
        </text>
      )}
    </g>
  )
}
