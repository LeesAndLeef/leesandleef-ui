import { oilShots } from '../../lib/oil'
import type { Oil, OilSize } from '../../types'
import { OilTin } from '../illustrations/OilTin'
import { ProductGallery } from '../product/ProductGallery'
import { ProductStageBlock } from '../product/ProductStageBlock'
import { ProductStageTag } from '../product/ProductStageTag'
import { STAGE_TIN_SIZES } from './constants'

export function OilGallery({
  oil,
  size,
  where,
}: {
  oil: Pick<Oil, 'name' | 'glass' | 'cap' | 'cultivar' | 'left'>
  size: OilSize
  where: string
}) {
  return (
    <ProductGallery
      pattern="hatch-w"
      tone={oil.glass}
      title={oil.name}
      shots={oilShots(oil, oil.name, where)}
      coverLabel="Tin"
      coverThumb={<OilTin body={oil.glass} cap={oil.cap} width={45} height={80} />}
      cover={
        <>
          <ProductStageBlock tone="olive" />
          <OilTin body={oil.glass} cap={oil.cap} {...STAGE_TIN_SIZES[size]} label={`Tin of ${oil.name}`} />
          <ProductStageTag left={oil.left} />
        </>
      }
    />
  )
}
