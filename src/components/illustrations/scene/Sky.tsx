import type { SceneContext } from './types'

export function Sky({ id, top, bottom }: { id: SceneContext['id']; top: string; bottom: string }) {
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
