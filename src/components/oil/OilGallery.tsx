import { oilShots } from '../../lib/oil'
import { contrastingTone } from '../../lib/tone'
import type { Oil, OilSize } from '../../types'
import { OilTin } from '../illustrations/OilTin'
import { ProductGallery } from '../product/ProductGallery'
import { STAGE_ACCENT_TONE, STAGE_FALLBACK_TONE, STAGE_FIELD_TONE, STAGE_TIN_SIZES } from './constants'
import { OilStageFact } from './OilStageFact'
import { OilStageTag } from './OilStageTag'
import styles from './OilGallery.module.css'

export function OilGallery({
  oil,
  size,
}: {
  oil: Pick<
    Oil,
    'name' | 'glass' | 'cap' | 'growerName' | 'origin' | 'level' | 'cultivar' | 'harvest' | 'set' | 'detail'
  >
  size: OilSize
}) {
  const tinSize = oil.set ? STAGE_TIN_SIZES['250'] : STAGE_TIN_SIZES[size]
  return (
    <ProductGallery
      pattern="hatch"
      tone={oil.glass}
      title={oil.name}
      shots={oilShots(oil, size)}
      coverLabel="Tin front"
      coverThumb={<OilTin body={oil.glass} cap={oil.cap} width={45} height={75} />}
      cover={
        <>
          <div
            className={`block ${styles.field}`}
            style={{ background: contrastingTone(STAGE_FIELD_TONE, STAGE_FALLBACK_TONE, oil.glass) }}
          />
          <div
            className={`block ${styles.accent}`}
            style={{ background: contrastingTone(STAGE_ACCENT_TONE, STAGE_FALLBACK_TONE, oil.glass) }}
          />
          <OilTin body={oil.glass} cap={oil.cap} {...tinSize} label={`Tin of ${oil.name}`} />
          <OilStageTag level={oil.level} harvest={oil.harvest} />
          <OilStageFact {...oil.detail.stageFact} />
        </>
      }
    />
  )
}
