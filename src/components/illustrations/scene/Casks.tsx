import { COLORS } from '../../../styles/colors'
import { Barrel } from './Barrel'
import { Sky } from './Sky'
import type { SceneContext } from './types'

export function Casks({ r, cue, id }: SceneContext) {
  const single = /single/.test(cue)
  const garage = /garage/.test(cue)
  return (
    <>
      <Sky id={id} top={COLORS.ink} bottom={COLORS.olive900} />
      {garage
        ? Array.from({ length: 16 }, (_, i) => (
            <line key={i} x1="0" x2="400" y1={i * 11} y2={i * 11} stroke={COLORS.stone} strokeOpacity="0.18" />
          ))
        : Array.from({ length: 30 }, (_, i) => (
            <rect
              key={i}
              x={(i % 6) * 70 - (Math.floor(i / 6) % 2) * 35}
              y={Math.floor(i / 6) * 34}
              width="66"
              height="30"
              fill="none"
              stroke={COLORS.stone}
              strokeOpacity={0.08 + r() * 0.1}
            />
          ))}
      <rect y="262" width="400" height="38" fill={COLORS.ink} />
      {single ? (
        <Barrel cx={200} cy={170} R={96} mark="BRIJEG ’23" />
      ) : garage ? (
        <>
          <rect x="34" y="70" width="90" height="192" rx="10" fill={COLORS.sage} opacity="0.85" />
          <rect x="34" y="96" width="90" height="4" fill={COLORS.stone} />
          <line x1="250" y1="0" x2="250" y2="44" stroke={COLORS.stone} />
          <circle cx="250" cy="50" r="7" fill={COLORS.paper} />
          <Barrel cx={220} cy={214} R={48} mark="GRAŠ 24" />
          <Barrel cx={330} cy={214} R={48} />
        </>
      ) : (
        <>
          <Barrel cx={80} cy={214} R={52} mark="T 23" />
          <Barrel cx={200} cy={214} R={52} />
          <Barrel cx={320} cy={214} R={52} mark="M 24" />
          <Barrel cx={140} cy={112} R={52} />
          <Barrel cx={260} cy={112} R={52} mark="T 22" />
        </>
      )}
    </>
  )
}
