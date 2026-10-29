import { COLORS } from '../../../styles/colors'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Vat({ r, id }: SceneContext) {
  return (
    <>
      <Sky id={id} top={COLORS.oak} bottom={COLORS.oakDark} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1="0" x2="400" y1={i * 32} y2={i * 32} stroke={COLORS.ink} strokeOpacity="0.3" />
      ))}
      <circle cx="190" cy="160" r="142" fill={COLORS.oakDark} stroke={COLORS.ink} strokeWidth="6" />
      <circle cx="190" cy="160" r="126" fill={COLORS.wine800} />
      {Array.from({ length: 140 }, (_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * 118
        return (
          <circle
            key={i}
            cx={190 + Math.cos(a) * d}
            cy={160 + Math.sin(a) * d}
            r={3 + r() * 6}
            fill={[COLORS.grapeDark, COLORS.wine, COLORS.wine600, COLORS.wine800][i % 4]}
          />
        )
      })}
      <line x1="230" y1="150" x2="440" y2="-60" stroke={COLORS.oakDark} strokeWidth="14" strokeLinecap="round" />
      <circle cx="230" cy="150" r="30" fill={COLORS.oakDark} stroke={COLORS.ink} strokeWidth="2" />
    </>
  )
}
