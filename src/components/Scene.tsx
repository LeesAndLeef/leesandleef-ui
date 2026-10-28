import { type ReactNode, useId } from 'react'

export type SceneKind =
  | 'landscape'
  | 'grove'
  | 'soil'
  | 'amphora'
  | 'casks'
  | 'vat'
  | 'press'
  | 'crates'
  | 'walls'
  | 'leaves'
  | 'rack'
  | 'portrait'
  | 'map'
  | 'backlabel'

const C = {
  ink: '#1B1D14',
  muted: '#4A4D3C',
  olive9: '#262A16',
  olive7: '#3F4622',
  olive5: '#6B733A',
  olive3: '#A9AD7A',
  sage: '#D9D9C0',
  wine: '#6E1C2B',
  wine8: '#4E1220',
  wine2: '#E3C9CD',
  bone: '#E3DFD2',
  paper: '#EFECE3',
  terra: '#8A3B22',
  clod: '#A5482A',
  stone: '#BDB6A4',
  oak: '#7A4E2D',
  oakDark: '#5E3B20',
  sea: '#33433F',
  skin: '#C49A7A',
}

function sceneFor(caption: string): SceneKind {
  const c = caption.toLowerCase()
  const rules: [RegExp, SceneKind][] = [
    [/amphora/, 'amphora'],
    [/punching|fermenter|vat/, 'vat'],
    [/press/, 'press'],
    [/disgorg|pét-nat|riddl/, 'rack'],
    [/cask|barrel|cellar/, 'casks'],
    [/crate|basket/, 'crates'],
    [/wall|terrace/, 'walls'],
    [/leaves|leaf|bura/, 'leaves'],
    [/olive|net|grove/, 'grove'],
    [/soil|terra rossa in hand/, 'soil'],
    [/portrait/, 'portrait'],
  ]
  return rules.find(([re]) => re.test(c))?.[1] ?? 'landscape'
}

function rng(seed: string) {
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

type R = () => number

function ridge(r: R, y: number, amp: number) {
  const p1 = r() * 6
  const p2 = r() * 6
  const f1 = 0.006 + r() * 0.008
  const f2 = 0.018 + r() * 0.02
  const at = (x: number) => y + amp * (Math.sin(x * f1 + p1) * 0.65 + Math.sin(x * f2 + p2) * 0.35)
  let d = `M0 300 L0 ${at(0).toFixed(1)}`
  for (let x = 10; x <= 400; x += 10) d += ` L${x} ${at(x).toFixed(1)}`
  return { d: d + ' L400 300 Z', at }
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
}

interface Ctx {
  r: R
  cue: string
  id: (name: string) => string
  tone: string
  text?: string
}

function Sky({ id, top, bottom }: { id: Ctx['id']; top: string; bottom: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id('sky')})`} />
    </>
  )
}

function Landscape({ r, cue, id }: Ctx) {
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
    ? { top: C.sage, bottom: C.paper, far: C.sage, mid: C.bone, near: C.paper, rows: C.olive7, sun: C.paper }
    : dusk
      ? { top: C.wine8, bottom: C.wine2, far: '#7A5A60', mid: C.olive7, near: C.olive9, rows: C.ink, sun: C.wine2 }
      : {
          top: C.bone,
          bottom: C.paper,
          far: C.olive3,
          mid: C.olive5,
          near: red ? C.terra : C.olive7,
          rows: C.olive9,
          sun: C.paper,
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
          <rect y="172" width="400" height="128" fill={C.sea} />
          {[184, 196, 210].map((y, i) => (
            <line key={y} x1={30 + i * 50} x2={140 + i * 70} y1={y} y2={y} stroke={C.paper} strokeOpacity="0.25" />
          ))}
        </>
      )}
      {fog && (
        <>
          <defs>
            <linearGradient id={id('fog')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C.paper} stopOpacity="0" />
              <stop offset="0.5" stopColor={C.paper} stopOpacity="0.85" />
              <stop offset="1" stopColor={C.paper} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect y="160" width="400" height="60" fill={`url(#${id('fog')})`} />
        </>
      )}
      <path d={sea ? cape : mid.d} fill={pal.mid} />
      {town && (
        <g fill={dusk ? C.ink : C.sage} stroke={C.olive9} strokeOpacity="0.4" strokeWidth="0.6">
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
            stroke={C.stone}
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

function Tree({ x, y, s, seed }: { x: number; y: number; s: number; seed: string }) {
  const r = rng(seed)
  const blobs = Array.from({ length: 7 }, () => [
    x + (r() - 0.5) * 70 * s,
    y - 70 * s + (r() - 0.5) * 34 * s,
    (18 + r() * 14) * s,
  ])
  const fills = [C.olive3, '#8C9461', C.sage, C.olive5]
  return (
    <g>
      <path
        d={`M${x - 7 * s} ${y} C${x - 2 * s} ${y - 20 * s} ${x - 12 * s} ${y - 34 * s} ${x - 4 * s} ${y - 56 * s} L${x + 4 * s} ${y - 56 * s} C${x + 8 * s} ${y - 36 * s} ${x + 2 * s} ${y - 18 * s} ${x + 8 * s} ${y} Z`}
        fill={C.olive9}
      />
      {blobs.map(([bx, by, br], i) => (
        <ellipse key={i} cx={bx} cy={by} rx={br} ry={br * 0.8} fill={fills[i % fills.length]} opacity="0.92" />
      ))}
    </g>
  )
}

function Grove({ r, cue: seed, id }: Ctx) {
  const far = ridge(r, 150, 14)
  const trees = [
    [70, 214, 0.75],
    [210, 206, 0.6],
    [330, 222, 0.85],
    [140, 268, 1.15],
  ] as const
  return (
    <>
      <Sky id={id} top={C.bone} bottom={C.paper} />
      <path d={far.d} fill={C.olive3} opacity="0.8" />
      <rect y="190" width="400" height="110" fill={C.olive5} />
      <defs>
        <pattern id={id('net')} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <path d="M0 0 L6 0 M0 0 L0 6" stroke={C.wine2} strokeWidth="0.8" />
        </pattern>
      </defs>
      {trees.map(([x, y, s]) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx={72 * s} ry={13 * s} fill={C.wine} opacity="0.55" />
          <ellipse cx={x} cy={y} rx={72 * s} ry={13 * s} fill={`url(#${id('net')})`} />
          {Array.from({ length: 9 }, (_, i) => (
            <circle
              key={i}
              cx={x + (r() - 0.5) * 100 * s}
              cy={y + (r() - 0.5) * 12 * s}
              r={1.6 * s}
              fill={i % 3 ? C.olive9 : C.wine8}
            />
          ))}
          <Tree x={x} y={y - 2 * s} s={s} seed={`${seed}-${x}`} />
        </g>
      ))}
    </>
  )
}

function Soil({ r, id }: Ctx) {
  const clods = Array.from({ length: 40 }, () => {
    const a = r() * Math.PI
    const d = r()
    return [200 + Math.cos(a) * 100 * d, 196 - Math.sin(a) * 46 * d, 3 + r() * 7]
  })
  return (
    <>
      <Sky id={id} top="#5A2416" bottom={C.terra} />
      {Array.from({ length: 60 }, (_, i) => (
        <circle key={i} cx={r() * 400} cy={r() * 300} r={1 + r() * 3} fill={i % 4 ? C.clod : C.stone} opacity="0.5" />
      ))}
      <ellipse cx="200" cy="262" rx="150" ry="22" fill={C.ink} opacity="0.3" />
      <path d="M62 196 C66 262 140 284 204 276 L204 214 C150 222 96 214 62 196 Z" fill={C.skin} />
      <path d="M338 196 C334 262 260 284 196 276 L196 214 C250 222 304 214 338 196 Z" fill="#B88C6C" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${70 + i * 8} ${206 + i * 14} q-14 6 -10 18`}
          stroke="#A57A5C"
          strokeWidth="1.5"
          fill="none"
        />
      ))}
      <path d="M92 204 C118 146 178 136 210 146 C252 136 292 158 310 204 C250 222 150 222 92 204 Z" fill={C.terra} />
      {clods.map(([x, y, s], i) => (
        <circle key={i} cx={x} cy={y} r={s} fill={i % 7 === 0 ? C.stone : i % 2 ? C.clod : '#6E2A18'} />
      ))}
    </>
  )
}

function Amphora({ r, id }: Ctx) {
  const rows = [
    { y: 186, s: 0.6, xs: [70, 160, 250, 340] },
    { y: 222, s: 0.85, xs: [40, 160, 280, 400] },
    { y: 272, s: 1.15, xs: [100, 280] },
  ]
  return (
    <>
      <Sky id={id} top={C.ink} bottom={C.wine8} />
      <defs>
        <radialGradient id={id('lamp')} cx="0.5" cy="0.15" r="0.6">
          <stop offset="0" stopColor={C.paper} stopOpacity="0.4" />
          <stop offset="1" stopColor={C.paper} stopOpacity="0" />
        </radialGradient>
      </defs>
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d={`M${-40 + k * 30} 170 Q200 ${-20 + k * 30} ${440 - k * 30} 170`}
          fill="none"
          stroke={C.stone}
          strokeOpacity={0.12 + k * 0.06}
          strokeWidth="3"
        />
      ))}
      <rect width="400" height="300" fill={`url(#${id('lamp')})`} />
      <rect y="168" width="400" height="132" fill={C.olive9} />
      {Array.from({ length: 50 }, (_, i) => (
        <circle key={i} cx={r() * 400} cy={170 + r() * 130} r={0.8 + r() * 1.6} fill={C.stone} opacity="0.25" />
      ))}
      {rows.map(({ y, s, xs }) =>
        xs.map((x, i) => (
          <g key={`${y}-${x}`}>
            <ellipse cx={x} cy={y + 6 * s} rx={48 * s} ry={18 * s} fill="#6A2C1A" />
            <ellipse cx={x} cy={y} rx={32 * s} ry={12 * s} fill={C.terra} />
            <ellipse cx={x} cy={y} rx={23 * s} ry={8 * s} fill={(i + y) % 3 ? C.ink : C.oak} />
          </g>
        )),
      )}
    </>
  )
}

function Barrel({ cx, cy, R, mark }: { cx: number; cy: number; R: number; mark?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill={C.oak} />
      {[-0.6, -0.3, 0, 0.3, 0.6].map((t) => (
        <line
          key={t}
          x1={cx + t * R}
          x2={cx + t * R}
          y1={cy - R * Math.sqrt(1 - t * t) * 0.9}
          y2={cy + R * Math.sqrt(1 - t * t) * 0.9}
          stroke={C.oakDark}
          strokeWidth="1.2"
        />
      ))}
      <circle cx={cx} cy={cy} r={R * 0.92} fill="none" stroke={C.oakDark} strokeWidth="2" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.ink} strokeWidth="4" />
      <rect x={cx - 4} y={cy + R * 0.55} width="8" height="10" fill={C.ink} />
      {mark && (
        <text
          x={cx}
          y={cy - R * 0.25}
          textAnchor="middle"
          fontFamily="IBM Plex Mono, monospace"
          fontSize={R * 0.24}
          fill={C.paper}
          opacity="0.85"
        >
          {mark}
        </text>
      )}
    </g>
  )
}

function Casks({ r, cue, id }: Ctx) {
  const single = /single/.test(cue)
  const garage = /garage/.test(cue)
  return (
    <>
      <Sky id={id} top={C.ink} bottom={C.olive9} />
      {garage
        ? Array.from({ length: 16 }, (_, i) => (
            <line key={i} x1="0" x2="400" y1={i * 11} y2={i * 11} stroke={C.stone} strokeOpacity="0.18" />
          ))
        : Array.from({ length: 30 }, (_, i) => (
            <rect
              key={i}
              x={(i % 6) * 70 - (Math.floor(i / 6) % 2) * 35}
              y={Math.floor(i / 6) * 34}
              width="66"
              height="30"
              fill="none"
              stroke={C.stone}
              strokeOpacity={0.08 + r() * 0.1}
            />
          ))}
      <rect y="262" width="400" height="38" fill={C.ink} />
      {single ? (
        <Barrel cx={200} cy={170} R={96} mark="BRIJEG ’23" />
      ) : garage ? (
        <>
          <rect x="34" y="70" width="90" height="192" rx="10" fill={C.sage} opacity="0.85" />
          <rect x="34" y="96" width="90" height="4" fill={C.stone} />
          <line x1="250" y1="0" x2="250" y2="44" stroke={C.stone} />
          <circle cx="250" cy="50" r="7" fill={C.paper} />
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

function Vat({ r, id }: Ctx) {
  return (
    <>
      <Sky id={id} top={C.oak} bottom={C.oakDark} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1="0" x2="400" y1={i * 32} y2={i * 32} stroke={C.ink} strokeOpacity="0.3" />
      ))}
      <circle cx="190" cy="160" r="142" fill={C.oakDark} stroke={C.ink} strokeWidth="6" />
      <circle cx="190" cy="160" r="126" fill={C.wine8} />
      {Array.from({ length: 140 }, (_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * 118
        return (
          <circle
            key={i}
            cx={190 + Math.cos(a) * d}
            cy={160 + Math.sin(a) * d}
            r={3 + r() * 6}
            fill={['#3A0C18', C.wine, '#8E3346', C.wine8][i % 4]}
          />
        )
      })}
      <line x1="230" y1="150" x2="440" y2="-60" stroke={C.oakDark} strokeWidth="14" strokeLinecap="round" />
      <circle cx="230" cy="150" r="30" fill={C.oakDark} stroke={C.ink} strokeWidth="2" />
    </>
  )
}

function Press({ id }: Ctx) {
  return (
    <>
      <Sky id={id} top={C.bone} bottom={C.stone} />
      {Array.from({ length: 24 }, (_, i) => (
        <rect
          key={i}
          x={(i % 6) * 70 - (Math.floor(i / 6) % 2) * 35}
          y={Math.floor(i / 6) * 50}
          width="66"
          height="46"
          fill="none"
          stroke={C.olive9}
          strokeOpacity="0.12"
        />
      ))}
      <rect y="262" width="400" height="38" fill={C.olive7} />
      <rect x="96" y="236" width="208" height="26" fill={C.oakDark} />
      <path d="M300 246 L330 250 L330 256 L300 256 Z" fill={C.oakDark} />
      <path d="M326 256 C328 270 324 280 326 300" stroke={C.wine} strokeWidth="5" fill="none" />
      <rect x="128" y="124" width="144" height="112" fill={C.wine8} />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={128 + i * 14.6} y="124" width="9" height="112" fill={C.oak} />
      ))}
      <rect x="122" y="138" width="156" height="7" fill={C.ink} />
      <rect x="122" y="214" width="156" height="7" fill={C.ink} />
      <rect x="132" y="108" width="136" height="16" fill={C.oak} />
      <rect x="194" y="22" width="12" height="86" fill={C.ink} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="194" x2="206" y1={26 + i * 9} y2={31 + i * 9} stroke={C.stone} strokeWidth="1.2" />
      ))}
      <rect x="120" y="78" width="160" height="9" fill={C.ink} transform="rotate(-14 200 82)" />
    </>
  )
}

function Crate({
  x,
  y,
  w,
  h,
  grape,
  seed,
}: {
  x: number
  y: number
  w: number
  h: number
  grape: string[]
  seed: string
}) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: Math.round(w / 9) }, (_, i) => (
        <circle
          key={i}
          cx={x + 8 + r() * (w - 16)}
          cy={y + 4 + r() * 10}
          r={4 + r() * 3}
          fill={grape[i % grape.length]}
        />
      ))}
      <rect x={x} y={y + 8} width={w} height={h - 8} fill="#B98A5A" stroke={C.oakDark} strokeWidth="1.5" />
      {[0.33, 0.66].map((t) => (
        <line
          key={t}
          x1={x}
          x2={x + w}
          y1={y + 8 + (h - 8) * t}
          y2={y + 8 + (h - 8) * t}
          stroke={C.oakDark}
          strokeWidth="1.5"
        />
      ))}
      <rect x={x + w / 2 - 10} y={y + 14} width="20" height="6" fill={C.oakDark} />
    </g>
  )
}

function Crates({ r, cue, id }: Ctx) {
  const ferry = /ferry|boat/.test(cue)
  const scree = /scree|slope/.test(cue)
  const white = /pošip|žlahtina|malvazija|graševina|white/.test(cue)
  const grape = white ? ['#C9C48A', C.olive3, '#B4B06A'] : ['#3A0C18', C.wine8, C.wine]

  if (scree)
    return (
      <>
        <Sky id={id} top={C.bone} bottom={C.paper} />
        <rect y="40" width="400" height="60" fill={C.sea} />
        <path d="M0 70 L400 120 L400 300 L0 300 Z" fill="#9E9888" />
        {Array.from({ length: 70 }, (_, i) => (
          <ellipse
            key={i}
            cx={r() * 400}
            cy={110 + r() * 190}
            rx={2 + r() * 6}
            ry={1.5 + r() * 3}
            fill={i % 3 ? C.stone : '#7E796B'}
          />
        ))}
        {[
          [70, 170, 1],
          [220, 210, 1.3],
          [330, 160, 0.9],
        ].map(([x, y, s]) => (
          <g key={x}>
            {Array.from({ length: 12 }, (_, i) => (
              <circle key={i} cx={x + (r() - 0.5) * 60 * s} cy={y - 6 * s + r() * 6} r={5 * s} fill={grape[i % 3]} />
            ))}
            <path
              d={`M${x - 34 * s} ${y} L${x + 34 * s} ${y} L${x + 26 * s} ${y + 40 * s} L${x - 26 * s} ${y + 40 * s} Z`}
              fill="#A47A4A"
              stroke={C.oakDark}
            />
            {[0.3, 0.6].map((t) => (
              <line
                key={t}
                x1={x - 32 * s}
                x2={x + 32 * s}
                y1={y + 40 * s * t}
                y2={y + 40 * s * t}
                stroke={C.oakDark}
                strokeOpacity="0.7"
              />
            ))}
          </g>
        ))}
      </>
    )

  return (
    <>
      <Sky id={id} top={ferry ? C.bone : C.stone} bottom={C.paper} />
      {ferry && (
        <>
          <path d={ridge(r, 104, 8).d} fill={C.olive3} opacity="0.7" />
          <rect y="112" width="400" height="80" fill={C.sea} />
          <line x1="0" x2="400" y1="150" y2="150" stroke={C.paper} strokeWidth="3" />
          <line x1="0" x2="400" y1="176" y2="176" stroke={C.paper} strokeWidth="3" />
          {[20, 100, 180, 260, 340].map((x) => (
            <line key={x} x1={x} x2={x} y1="150" y2="192" stroke={C.paper} strokeWidth="3" />
          ))}
        </>
      )}
      <rect y="192" width="400" height="108" fill={ferry ? '#9A9486' : C.olive7} />
      {[
        [40, 226],
        [150, 226],
        [260, 226],
        [95, 176],
        [205, 176],
        [315, 236],
      ].map(([x, y]) => (
        <Crate key={`${x}-${y}`} x={x} y={y} w={100} h={56} grape={grape} seed={`${cue}-${x}-${y}`} />
      ))}
    </>
  )
}

function Walls({ r, id }: Ctx) {
  return (
    <>
      <Sky id={id} top={C.bone} bottom={C.paper} />
      <rect y="30" width="400" height="60" fill={C.sea} />
      <path d={ridge(r, 34, 6).d.replace(/L400 300 Z$/, 'L400 40 L0 40 Z')} fill={C.olive3} opacity="0.6" />
      <path d="M0 76 C120 60 260 92 400 70 L400 300 L0 300 Z" fill={C.olive5} />
      {[0, 1, 2, 3, 4, 5, 6].map((k) => {
        const y0 = 96 + k * 30 + k * k * 1.5
        const stones: ReactNode[] = []
        for (let x = -10; x < 410; ) {
          const w = 10 + r() * 14 + k * 1.5
          stones.push(
            <rect
              key={x}
              x={x}
              y={y0 + Math.sin(x / 60 + k) * 6}
              width={w - 1.5}
              height={7 + k * 1.4}
              rx="2"
              fill={r() > 0.5 ? C.stone : '#A8A190'}
              stroke={C.olive9}
              strokeOpacity="0.35"
              strokeWidth="0.6"
            />,
          )
          x += w
        }
        return (
          <g key={k}>
            {Array.from({ length: 14 }, (_, i) => (
              <circle
                key={i}
                cx={i * 30 + 10 + (k % 2) * 15}
                cy={y0 - 8 - k * 0.6}
                r={3 + k * 0.5}
                fill={i % 2 ? C.olive9 : C.olive7}
              />
            ))}
            {stones}
          </g>
        )
      })}
    </>
  )
}

const LEAF =
  'M0 -40 C12 -30 30 -34 34 -18 C46 -12 44 4 30 8 C34 22 22 34 8 28 L0 40 L-8 28 C-22 34 -34 22 -30 8 C-44 4 -46 -12 -34 -18 C-30 -34 -12 -30 0 -40 Z'

function Leaves({ r, id }: Ctx) {
  return (
    <>
      <Sky id={id} top={C.sage} bottom={C.olive3} />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 20 + i * 32
        return (
          <path
            key={i}
            d={`M-20 ${y} C100 ${y - 16} 220 ${y + 14} 420 ${y - 10}`}
            fill="none"
            stroke={C.paper}
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeDasharray={`${40 + r() * 60} ${20 + r() * 30}`}
          />
        )
      })}
      <path
        d="M-20 250 C80 210 160 230 240 160 C290 118 340 110 420 70"
        fill="none"
        stroke={C.oakDark}
        strokeWidth="6"
      />
      {[
        [70, 214, 1.2, -30],
        [170, 196, 1.5, 20],
        [262, 140, 1.3, 55],
        [338, 98, 1, 70],
        [120, 120, 0.9, -60],
        [300, 230, 1.1, 10],
      ].map(([x, y, s, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
          <path d={LEAF} fill={[C.olive5, C.olive7, '#8C9461'][i % 3]} />
          {[-50, -20, 0, 20, 50].map((v) => (
            <line
              key={v}
              x1="0"
              y1="34"
              x2={Math.sin((v * Math.PI) / 180) * 32}
              y2={-Math.cos((v * Math.PI) / 180) * 32}
              stroke={C.olive9}
              strokeOpacity="0.45"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}
    </>
  )
}

function Rack({ id }: Ctx) {
  return (
    <>
      <Sky id={id} top={C.ink} bottom={C.olive9} />
      <rect x="24" y="28" width="352" height="232" fill={C.oak} stroke={C.oakDark} strokeWidth="4" />
      {Array.from({ length: 20 }, (_, i) => {
        const cx = 66 + (i % 5) * 67
        const cy = 66 + Math.floor(i / 5) * 54
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="24" ry="20" fill={C.oakDark} />
            <circle cx={cx} cy={cy} r="15" fill="#1F2416" stroke="#4A5A2E" strokeWidth="3" />
            <path
              d={`M${cx - 8} ${cy - 8} A11 11 0 0 1 ${cx + 6} ${cy - 10}`}
              stroke={C.sage}
              strokeOpacity="0.6"
              strokeWidth="2"
              fill="none"
            />
          </g>
        )
      })}
      <rect y="270" width="400" height="30" fill={C.ink} />
    </>
  )
}

function Portrait({ r, tone, id }: Ctx) {
  const dark = luminance(tone) < 0.2
  const fig = dark ? C.olive3 : C.olive9
  const hat = r() > 0.5
  return (
    <>
      <rect width="400" height="300" fill={tone} />
      <path d={ridge(r, 220, 14).d} fill={dark ? C.wine8 : C.olive5} opacity="0.55" />
      <circle cx="200" cy="140" r="96" fill={C.paper} opacity={dark ? 0.12 : 0.28} />
      <path d="M92 300 C98 232 140 206 200 206 C260 206 302 232 308 300 Z" fill={fig} />
      <path d="M176 206 L200 246 L224 206 Z" fill={tone} opacity="0.7" />
      <rect x="186" y="176" width="28" height="34" fill={fig} />
      <ellipse cx="200" cy="146" rx="36" ry="44" fill={fig} />
      {hat ? (
        <>
          <ellipse cx="200" cy="114" rx="68" ry="10" fill={fig} />
          <rect x="166" y="86" width="68" height="28" rx="6" fill={fig} />
          <rect x="166" y="106" width="68" height="6" fill={C.wine} />
        </>
      ) : (
        <circle cx={r() > 0.5 ? 232 : 168} cy="112" r="16" fill={fig} />
      )}
      <rect x="92" y="262" width="216" height="5" fill={C.wine} opacity="0.8" />
      <defs>
        <pattern id={id('hatch')} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={C.paper} strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#${id('hatch')})`} />
    </>
  )
}

function MapScene({ r }: Ctx) {
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
      <rect width="400" height="300" fill={C.bone} />
      {Array.from({ length: 9 }, (_, k) => (
        <path
          key={k}
          d={contour(k)}
          fill="none"
          stroke={C.olive5}
          strokeOpacity={k % 4 === 3 ? 0.7 : 0.35}
          strokeWidth={k % 4 === 3 ? 1.4 : 0.8}
        />
      ))}
      <path
        d="M-10 280 C80 250 120 290 200 270 C280 250 320 290 410 262"
        fill="none"
        stroke={C.olive3}
        strokeWidth="9"
      />
      <path
        d="M-10 280 C80 250 120 290 200 270 C280 250 320 290 410 262"
        fill="none"
        stroke={C.paper}
        strokeWidth="2"
      />
      <path
        d={`M0 ${cy + 70} C100 ${cy + 40} ${cx} ${cy - 20} 400 40`}
        fill="none"
        stroke={C.ink}
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />
      <path
        d={`M${px} ${py} L${px + 46} ${py - 8} L${px + 54} ${py + 26} L${px + 6} ${py + 34} Z`}
        fill={C.wine}
        fillOpacity="0.65"
        stroke={C.ink}
        strokeWidth="1.5"
      />
      <circle cx={cx} cy={cy} r="3" fill={C.ink} />
      <g transform="translate(366 34)">
        <path d="M0 -14 L7 8 L0 3 L-7 8 Z" fill={C.ink} />
        <text y="22" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill={C.ink}>
          N
        </text>
      </g>
      <g transform="translate(20 276)">
        <rect width="30" height="5" fill={C.ink} />
        <rect x="30" width="30" height="5" fill={C.paper} stroke={C.ink} strokeWidth="0.8" />
        <text y="-4" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill={C.ink}>
          200 m
        </text>
      </g>
    </>
  )
}

function BackLabel({ tone, text = '' }: Ctx) {
  const words = text.toUpperCase().split(' ')
  const half = Math.ceil(words.length / 2)
  return (
    <>
      <rect width="400" height="300" fill={C.bone} />
      <rect x="110" y="-40" width="180" height="380" rx="34" fill={tone} />
      <rect x="128" y="0" width="12" height="300" fill={C.paper} opacity="0.12" />
      <rect x="132" y="58" width="136" height="196" fill={C.paper} />
      <g fontFamily="Archivo, Arial Narrow, sans-serif" fontWeight="800" fontSize="13" fill={C.ink} textAnchor="middle">
        <text x="200" y="86">
          {words.slice(0, half).join(' ')}
        </text>
        <text x="200" y="102">
          {words.slice(half).join(' ')}
        </text>
      </g>
      <g fontFamily="IBM Plex Mono, monospace" fontSize="6.4" fill={C.muted} textAnchor="middle">
        <text x="200" y="120">
          NATURAL WINE · PRODUCT OF CROATIA
        </text>
        <text x="200" y="130">
          UNFINED · UNFILTERED
        </text>
      </g>
      {[146, 154, 162, 170, 178, 186].map((y, i) => (
        <rect key={y} x="146" y={y} width={i % 3 === 2 ? 76 : 108} height="3" fill={C.olive3} />
      ))}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="6.4" fill={C.ink}>
        <text x="146" y="206">
          750 ML
        </text>
        <text x="254" y="206" textAnchor="end">
          CONTAINS SULPHITES
        </text>
      </g>
      {Array.from({ length: 22 }, (_, i) => (
        <rect key={i} x={160 + i * 3.6} y="216" width={i % 3 ? 1.4 : 2.4} height="26" fill={C.ink} />
      ))}
    </>
  )
}

const draw: Record<SceneKind, (ctx: Ctx) => ReactNode> = {
  landscape: Landscape,
  grove: Grove,
  soil: Soil,
  amphora: Amphora,
  casks: Casks,
  vat: Vat,
  press: Press,
  crates: Crates,
  walls: Walls,
  leaves: Leaves,
  rack: Rack,
  portrait: Portrait,
  map: MapScene,
  backlabel: BackLabel,
}

interface SceneProps {
  kind?: SceneKind
  cue: string
  tone?: string
  text?: string
  label?: string
  className?: string
}

export function Scene({ kind, cue, tone = C.olive7, text, label, className }: SceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ctx: Ctx = { r: rng(cue), cue: cue.toLowerCase(), id: (n) => `${uid}-${n}`, tone, text }
  return (
    <svg
      className={'scene' + (className ? ' ' + className : '')}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {draw[kind ?? sceneFor(cue)](ctx)}
    </svg>
  )
}
