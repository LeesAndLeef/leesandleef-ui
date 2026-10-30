import { fitFontSize } from '../../../lib/scene/fitFontSize'
import { splitInTwo } from '../../../lib/scene/splitInTwo'
import { COLORS } from '../../../styles/colors'
import { LABEL_TEXT_WIDTH } from './constants'
import type { SceneContext } from './types'

export function FrontLabel({ tone, text = '', labelCopy }: SceneContext) {
  const [first, second] = splitInTwo(text.toUpperCase())
  const nameSize = fitFontSize([first, second], 14, LABEL_TEXT_WIDTH)
  return (
    <>
      <rect width="400" height="300" fill={COLORS.bone} />
      <rect x="110" y="-40" width="180" height="380" rx="34" fill={tone} />
      <rect x="128" y="0" width="12" height="300" fill={COLORS.paper} opacity="0.12" />
      <rect x="132" y="58" width="136" height="196" fill={COLORS.paper} />
      <rect x="146" y="74" width="108" height="8" fill={labelCopy?.accent ?? COLORS.wine} />
      <g
        fontFamily="Archivo, Arial Narrow, sans-serif"
        fontWeight="800"
        fontSize={nameSize}
        fill={COLORS.ink}
        textAnchor="middle"
      >
        <text x="200" y="108">
          {first}
        </text>
        <text x="200" y="125">
          {second}
        </text>
      </g>
      <rect x="146" y="138" width="72" height="3" fill={COLORS.olive700} />
      {labelCopy && (
        <>
          <g fontFamily="IBM Plex Mono, monospace" fontSize="6.4" fill={COLORS.muted}>
            <text x="146" y="158">
              {labelCopy.lines[0].toUpperCase()}
            </text>
            <text x="146" y="168">
              {labelCopy.lines[1].toUpperCase()}
            </text>
            <text x="146" y="184" fill={COLORS.ink}>
              {labelCopy.note.toUpperCase()}
            </text>
          </g>
          <text
            x="254"
            y="238"
            textAnchor="end"
            fontFamily="Archivo, Arial Narrow, sans-serif"
            fontWeight="800"
            fontSize="26"
            fill={COLORS.ink}
          >
            {labelCopy.size}
          </text>
        </>
      )}
      <rect x="146" y="226" width="14" height="12" fill={COLORS.olive700} />
    </>
  )
}
