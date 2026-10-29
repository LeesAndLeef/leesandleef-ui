import { COLORS } from '../../../styles/colors'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Rack({ id }: SceneContext) {
  return (
    <>
      <Sky id={id} top={COLORS.ink} bottom={COLORS.olive900} />
      <rect x="24" y="28" width="352" height="232" fill={COLORS.oak} stroke={COLORS.oakDark} strokeWidth="4" />
      {Array.from({ length: 20 }, (_, i) => {
        const cx = 66 + (i % 5) * 67
        const cy = 66 + Math.floor(i / 5) * 54
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="24" ry="20" fill={COLORS.oakDark} />
            <circle cx={cx} cy={cy} r="15" fill={COLORS.bottleDark} stroke={COLORS.bottleRim} strokeWidth="3" />
            <path
              d={`M${cx - 8} ${cy - 8} A11 11 0 0 1 ${cx + 6} ${cy - 10}`}
              stroke={COLORS.sage}
              strokeOpacity="0.6"
              strokeWidth="2"
              fill="none"
            />
          </g>
        )
      })}
      <rect y="270" width="400" height="30" fill={COLORS.ink} />
    </>
  )
}
