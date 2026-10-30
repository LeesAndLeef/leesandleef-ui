import type { GalleryShot } from '../../types'
import { Scene } from '../illustrations/Scene'

export function ProductGalleryPicture({
  shot,
  tone,
  title,
  decorative = false,
}: {
  shot: GalleryShot
  tone: string
  title: string
  decorative?: boolean
}) {
  return (
    <Scene
      kind={shot.kind}
      cue={shot.cue}
      tone={shot.tone ?? tone}
      text={shot.text ?? title}
      labelCopy={shot.labelCopy}
      label={decorative ? undefined : shot.caption}
    />
  )
}
