import { COLORS } from '../../../styles/colors'
import { ridge } from './ridge'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Landscape({ r, cue, id }: SceneContext) {
  const has = (re: RegExp) => re.test(cue)
  const dusk = has(/dusk|evening/)
  const snow = has(/snow/)
  const fog = has(/fog|mist/)
  const sea = has(/sea|coast|primošten|kaštela|vrbnik|cliff/)
  const town = has(/town|castle|ruin|motovun/)
  const red = has(/terra rossa|red soil/)
  const terraces = has(/terrace|wall/)

  const far = ridge(r, sea ? 170 : 150, sea ? 8 : 18)
  const mid = ridge(r, 196, 16)
  const capeY = 178 + r() * 14
  const cape = `M0 300 L0 ${capeY.toFixed(1)} C90 ${capeY - 10} 170 ${capeY + 10} 250 240 L400 240 L400 300 Z`
  const capeAt = (x: number) => (x < 250 ? capeY + (240 - capeY) * (x / 250) ** 2 : 240)
  const near = ridge(r, 234, 7)
  const vp = 160 + r() * 80
  const horizon = near.at(vp) - 6

  const pal = snow
    ? {
        top: COLORS.sage,
        bottom: COLORS.paper,
        far: COLORS.sage,
        mid: COLORS.bone,
        near: COLORS.paper,
        rows: COLORS.olive700,
        sun: COLORS.paper,
      }
    : dusk
      ? {
          top: COLORS.wine800,
          bottom: COLORS.wine200,
          far: COLORS.duskHaze,
          mid: COLORS.olive700,
          near: COLORS.olive900,
          rows: COLORS.ink,
          sun: COLORS.wine200,
        }
      : {
          top: COLORS.bone,
          bottom: COLORS.paper,
          far: COLORS.olive300,
          mid: COLORS.olive500,
          near: red ? COLORS.terra : COLORS.olive700,
          rows: COLORS.olive900,
          sun: COLORS.paper,
        }
  const townX = sea ? 50 + r() * 60 : 250 + r() * 70
  const townY = sea ? capeAt(townX) : mid.at(townX)

  return (
    <>
      <Sky id={id} top={pal.top} bottom={pal.bottom} />
      <circle cx={70 + r() * 260} cy={60 + r() * 30} r="26" fill={pal.sun} opacity={dusk ? 0.8 : 0.9} />
      <path d={far.d} fill={pal.far} opacity={sea ? 0.7 : 0.9} />
      {sea && (
        <>
          <rect y="172" width="400" height="128" fill={COLORS.sea} />
          {[184, 196, 210].map((y, i) => (
            <line key={y} x1={30 + i * 50} x2={140 + i * 70} y1={y} y2={y} stroke={COLORS.paper} strokeOpacity="0.25" />
          ))}
        </>
      )}
      {fog && (
        <>
          <defs>
            <linearGradient id={id('fog')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={COLORS.paper} stopOpacity="0" />
              <stop offset="0.5" stopColor={COLORS.paper} stopOpacity="0.85" />
              <stop offset="1" stopColor={COLORS.paper} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect y="160" width="400" height="60" fill={`url(#${id('fog')})`} />
        </>
      )}
      <path d={sea ? cape : mid.d} fill={pal.mid} />
      {town && (
        <g fill={dusk ? COLORS.ink : COLORS.sage} stroke={COLORS.olive900} strokeOpacity="0.4" strokeWidth="0.6">
          {[-22, -12, -2, 8, 18].map((dx, i) => (
            <rect key={dx} x={townX + dx} y={townY - 8 - ((i * 5) % 9)} width="10" height={14 + ((i * 5) % 9)} />
          ))}
          <rect x={townX - 4} y={townY - 34} width="7" height="34" />
          <path d={`M${townX - 6} ${townY - 34} L${townX - 0.5} ${townY - 44} L${townX + 5} ${townY - 34} Z`} />
        </g>
      )}
      {terraces && (
        <defs>
          <clipPath id={id('mid')}>
            <path d={sea ? cape : mid.d} />
          </clipPath>
        </defs>
      )}
      {terraces &&
        [0, 1, 2, 3, 4].map((k) => (
          <path
            key={k}
            d={Array.from(
              { length: 41 },
              (_, i) => `${i ? 'L' : 'M'}${i * 10} ${((sea ? capeAt(i * 10) : mid.at(i * 10)) + 8 + k * 8).toFixed(1)}`,
            ).join(' ')}
            fill="none"
            stroke={COLORS.stone}
            strokeWidth="2.2"
            opacity="0.85"
            clipPath={`url(#${id('mid')})`}
          />
        ))}
      <defs>
        <clipPath id={id('near')}>
          <path d={near.d} />
        </clipPath>
      </defs>
      <path d={near.d} fill={pal.near} />
      <g
        clipPath={`url(#${id('near')})`}
        stroke={pal.rows}
        strokeWidth="2.6"
        strokeDasharray="1.5 5"
        strokeLinecap="round"
      >
        {Array.from({ length: 28 }, (_, i) => -420 + i * 46).map((x) => (
          <line key={x} x1={x} y1="320" x2={vp} y2={horizon} />
        ))}
      </g>
    </>
  )
}
