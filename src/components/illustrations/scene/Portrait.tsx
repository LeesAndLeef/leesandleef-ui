import { COLORS } from '../../../styles/colors'
import { DARK_TONES } from './constants'
import { ridge } from './ridge'
import type { SceneContext } from './types'

export function Portrait({ r, tone, id }: SceneContext) {
  const dark = DARK_TONES.has(tone)
  const fig = dark ? COLORS.olive300 : COLORS.olive900
  const hat = r() > 0.5
  return (
    <>
      <rect width="400" height="300" fill={tone} />
      <path d={ridge(r, 220, 14).d} fill={dark ? COLORS.wine800 : COLORS.olive500} opacity="0.55" />
      <circle cx="200" cy="140" r="96" fill={COLORS.paper} opacity={dark ? 0.12 : 0.28} />
      <path d="M92 300 C98 232 140 206 200 206 C260 206 302 232 308 300 Z" fill={fig} />
      <path d="M176 206 L200 246 L224 206 Z" fill={tone} opacity="0.7" />
      <rect x="186" y="176" width="28" height="34" fill={fig} />
      <ellipse cx="200" cy="146" rx="36" ry="44" fill={fig} />
      {hat ? (
        <>
          <ellipse cx="200" cy="114" rx="68" ry="10" fill={fig} />
          <rect x="166" y="86" width="68" height="28" rx="6" fill={fig} />
          <rect x="166" y="106" width="68" height="6" fill={COLORS.wine} />
        </>
      ) : (
        <circle cx={r() > 0.5 ? 232 : 168} cy="112" r="16" fill={fig} />
      )}
      <rect x="92" y="262" width="216" height="5" fill={COLORS.wine} opacity="0.8" />
      <defs>
        <pattern id={id('hatch')} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={COLORS.paper} strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#${id('hatch')})`} />
    </>
  )
}
