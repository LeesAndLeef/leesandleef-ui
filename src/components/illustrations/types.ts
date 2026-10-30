import type { LabelCopy, SceneKind } from '../../types'

export interface SceneProps {
  kind?: SceneKind
  cue: string
  tone?: string
  text?: string
  labelCopy?: LabelCopy
  label?: string
  className?: string
}

export interface OilTinProps {
  width: number
  height: number
  body?: string
  cap?: string
  label?: string
}

export interface BottleProps {
  glass: string
  cap?: string
  width: number
  height: number
  detail?: 'full' | 'label' | 'silhouette'
  mark?: boolean
  label?: string
}
