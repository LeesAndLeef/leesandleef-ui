import { useId } from 'react'
import { COLORS } from '../../styles/colors'
import type { SceneKind } from '../../types'
import { SCENE_RULES, SCENES_BY_KIND } from './constants'
import { rng } from './scene/random'
import type { SceneContext } from './scene/types'
import type { SceneProps } from './types'

function sceneFor(caption: string): SceneKind {
  const c = caption.toLowerCase()
  return SCENE_RULES.find(([re]) => re.test(c))?.[1] ?? 'landscape'
}

export function Scene({ kind, cue, tone = COLORS.olive700, text, label, className }: SceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ctx: SceneContext = { r: rng(cue), cue: cue.toLowerCase(), id: (n) => `${uid}-${n}`, tone, text }
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
