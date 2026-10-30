import type { SceneKind } from '../../types'
import { SCENE_RULES } from './constants'

export function sceneFor(caption: string): SceneKind {
  const c = caption.toLowerCase()
  return SCENE_RULES.find(([re]) => re.test(c))?.[1] ?? 'landscape'
}
