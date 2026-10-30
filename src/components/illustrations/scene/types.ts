import type { Random } from '../../../lib/scene/types'
import type { LabelCopy } from '../../../types'

export interface SceneContext {
  r: Random
  cue: string
  id: (name: string) => string
  tone: string
  text?: string
  labelCopy?: LabelCopy
}
