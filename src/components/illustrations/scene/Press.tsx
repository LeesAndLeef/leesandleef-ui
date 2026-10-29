import { COLORS } from '../../../styles/colors'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Press({ id }: SceneContext) {
  return (
    <>
      <Sky id={id} top={COLORS.bone} bottom={COLORS.stone} />
      {Array.from({ length: 24 }, (_, i) => (
        <rect
          key={i}
          x={(i % 6) * 70 - (Math.floor(i / 6) % 2) * 35}
          y={Math.floor(i / 6) * 50}
          width="66"
          height="46"
          fill="none"
          stroke={COLORS.olive900}
          strokeOpacity="0.12"
        />
      ))}
      <rect y="262" width="400" height="38" fill={COLORS.olive700} />
      <rect x="96" y="236" width="208" height="26" fill={COLORS.oakDark} />
      <path d="M300 246 L330 250 L330 256 L300 256 Z" fill={COLORS.oakDark} />
      <path d="M326 256 C328 270 324 280 326 300" stroke={COLORS.wine} strokeWidth="5" fill="none" />
      <rect x="128" y="124" width="144" height="112" fill={COLORS.wine800} />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={128 + i * 14.6} y="124" width="9" height="112" fill={COLORS.oak} />
      ))}
      <rect x="122" y="138" width="156" height="7" fill={COLORS.ink} />
      <rect x="122" y="214" width="156" height="7" fill={COLORS.ink} />
      <rect x="132" y="108" width="136" height="16" fill={COLORS.oak} />
      <rect x="194" y="22" width="12" height="86" fill={COLORS.ink} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="194" x2="206" y1={26 + i * 9} y2={31 + i * 9} stroke={COLORS.stone} strokeWidth="1.2" />
      ))}
      <rect x="120" y="78" width="160" height="9" fill={COLORS.ink} transform="rotate(-14 200 82)" />
    </>
  )
}
