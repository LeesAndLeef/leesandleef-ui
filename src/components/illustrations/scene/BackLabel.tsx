import { fitFontSize } from '../../../lib/scene/fitFontSize'
import { splitInTwo } from '../../../lib/scene/splitInTwo'
import { COLORS } from '../../../styles/colors'
import { LABEL_TEXT_WIDTH } from './constants'
import type { SceneContext } from './types'

export function BackLabel({ tone, text = '', labelCopy }: SceneContext) {
  const [first, second] = splitInTwo(text.toUpperCase())
  const nameSize = fitFontSize([first, second], 13, LABEL_TEXT_WIDTH)
  return (
    <>
      <rect width="400" height="300" fill={COLORS.bone} />
      <rect x="110" y="-40" width="180" height="380" rx="34" fill={tone} />
      <rect x="128" y="0" width="12" height="300" fill={COLORS.paper} opacity="0.12" />
      <rect x="132" y="58" width="136" height="196" fill={COLORS.paper} />
      <g
        fontFamily="Archivo, Arial Narrow, sans-serif"
        fontWeight="800"
        fontSize={nameSize}
        fill={COLORS.ink}
        textAnchor="middle"
      >
        <text x="200" y="86">
          {first}
        </text>
        <text x="200" y="102">
          {second}
        </text>
      </g>
      {labelCopy && (
        <g fontFamily="IBM Plex Mono, monospace" fontSize="6.4" fill={COLORS.muted} textAnchor="middle">
          <text x="200" y="120">
            {labelCopy.lines[0].toUpperCase()}
          </text>
          <text x="200" y="130">
            {labelCopy.lines[1].toUpperCase()}
          </text>
        </g>
      )}
      {[146, 154, 162, 170, 178, 186].map((y, i) => (
        <rect key={y} x="146" y={y} width={i % 3 === 2 ? 76 : 108} height="3" fill={COLORS.olive300} />
      ))}
      {labelCopy && (
        <g fontFamily="IBM Plex Mono, monospace" fontSize="6.4" fill={COLORS.ink}>
          <text x="146" y="206">
            {labelCopy.size.toUpperCase()}
          </text>
          <text x="254" y="206" textAnchor="end">
            {labelCopy.note.toUpperCase()}
          </text>
        </g>
      )}
      {Array.from({ length: 22 }, (_, i) => (
        <rect key={i} x={160 + i * 3.6} y="216" width={i % 3 ? 1.4 : 2.4} height="26" fill={COLORS.ink} />
      ))}
    </>
  )
}
