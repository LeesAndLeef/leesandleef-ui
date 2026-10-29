import { type ReactNode, useState } from 'react'
import type { GalleryShot } from '../../types'
import { Scene } from '../illustrations/Scene'
import type { GalleryView } from './types'
import styles from './ProductGallery.module.css'

export function ProductGallery({
  pattern,
  tone,
  title,
  cover,
  coverThumb,
  coverLabel,
  shots,
}: {
  pattern: 'hatch' | 'hatch-w'
  tone: string
  title: string
  cover: ReactNode
  coverThumb: ReactNode
  coverLabel: string
  shots: GalleryShot[]
}) {
  const [view, setView] = useState<GalleryView>('cover')
  const shot = shots.find((s) => s.id === view)

  return (
    <div className={styles.root}>
      <div className={`${pattern} ${styles.stage}`}>
        {shot ? (
          <>
            <Scene kind={shot.kind} cue={shot.cue} tone={tone} text={title} label={shot.caption} />
            <span className="mono scene-cap">{shot.caption}</span>
          </>
        ) : (
          cover
        )}
      </div>
      <div className={styles.thumbs} role="group" aria-label="Pictures">
        <button
          type="button"
          className={view === 'cover' ? styles.isCurrent : undefined}
          aria-pressed={view === 'cover'}
          aria-label={coverLabel}
          onClick={() => setView('cover')}
        >
          {coverThumb}
        </button>
        {shots.map((s) => (
          <button
            key={s.id}
            type="button"
            className={view === s.id ? styles.isCurrent : undefined}
            aria-pressed={view === s.id}
            aria-label={s.name}
            onClick={() => setView(s.id)}
          >
            <Scene kind={s.kind} cue={s.cue} tone={tone} text={title} />
          </button>
        ))}
      </div>
    </div>
  )
}
