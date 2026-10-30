import { wineShots } from '../../lib/wine'
import type { Wine } from '../../types'
import { Bottle } from '../illustrations/Bottle'
import { ProductGallery } from '../product/ProductGallery'
import { ProductStageBlock } from '../product/ProductStageBlock'
import { ProductStageTag } from '../product/ProductStageTag'
import { WineDrinkWindow } from './WineDrinkWindow'

export function WineGallery({ wine, title }: { wine: Wine; title: string }) {
  const { drinkWindow } = wine.detail
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
          <ProductStageTag badge={wine.badge} left={wine.left} />
          <WineDrinkWindow {...drinkWindow} />
        </>
      }
    />
  )
}
