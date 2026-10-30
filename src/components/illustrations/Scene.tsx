import { useId } from 'react'
import { rng } from '../../lib/scene/random'
import { sceneFor } from '../../lib/scene/sceneFor'
import { COLORS } from '../../styles/colors'
import { SCENES_BY_KIND } from './constants'
import type { SceneContext } from './scene/types'
import type { SceneProps } from './types'

export function Scene({ kind, cue, tone = COLORS.olive700, text, labelCopy, label, className }: SceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ctx: SceneContext = { r: rng(cue), cue: cue.toLowerCase(), id: (n) => `${uid}-${n}`, tone, text, labelCopy }
  return (
    <svg
      className={'scene' + (className ? ' ' + className : '')}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {SCENES_BY_KIND[kind ?? sceneFor(cue)](ctx)}
    </svg>
  )
}
