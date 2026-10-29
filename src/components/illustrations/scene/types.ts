export type Random = () => number

export interface SceneContext {
  r: Random
  cue: string
  id: (name: string) => string
  tone: string
  text?: string
}
