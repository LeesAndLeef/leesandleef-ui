import { wineShots } from '../../lib/wine'
import type { Wine, WineVintage } from '../../types'
import { Bottle } from '../illustrations/Bottle'
import { ProductGallery } from '../product/ProductGallery'
import { ProductStageBlock } from '../product/ProductStageBlock'
import { ProductStageTag } from '../product/ProductStageTag'
import { WineDrinkWindow } from './WineDrinkWindow'

export function WineGallery({ wine, vintage }: { wine: Wine; vintage: Pick<WineVintage, 'name' | 'left'> }) {
  const { drinkWindow } = wine.detail
  const title = vintage.name
  return (
    <ProductGallery
      pattern="hatch"
      tone={wine.glass}
      title={title}
      shots={wineShots(wine, title)}
      coverLabel="Bottle"
      coverThumb={<Bottle glass={wine.glass} width={24} height={80} detail="label" />}
      cover={
        <>
          <ProductStageBlock tone="wine" />
          <ProductStageBlock tone="olive" />
          <Bottle glass={wine.glass} cap={wine.cap} width={170} height={560} mark label={`Bottle of ${title}`} />
          <ProductStageTag left={vintage.left} />
          <WineDrinkWindow {...drinkWindow} />
        </>
      }
    />
  )
}
