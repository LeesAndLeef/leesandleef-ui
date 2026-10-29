import { wineShots } from '../../lib/wine'
import type { Grower, Wine } from '../../types'
import { Bottle } from '../illustrations/Bottle'
import { ProductGallery } from '../product/ProductGallery'
import { ProductStageBlock } from '../product/ProductStageBlock'
import { ProductStageTag } from '../product/ProductStageTag'
import { WineDrinkWindow } from './WineDrinkWindow'

export function WineGallery({
  wine,
  title,
  grower,
  where,
}: {
  wine: Wine
  title: string
  grower?: Pick<Grower, 'shortName' | 'profile'>
  where: string
}) {
  const drinkWindow = wine.detail?.drinkWindow
  return (
    <ProductGallery
      pattern="hatch"
      tone={wine.glass}
      title={title}
      shots={wineShots(wine, title, grower, where)}
      coverLabel="Bottle"
      coverThumb={<Bottle glass={wine.glass} width={24} height={80} detail="label" />}
      cover={
        <>
          <ProductStageBlock tone="wine" />
          <ProductStageBlock tone="olive" />
          <Bottle glass={wine.glass} cap={wine.cap} width={170} height={560} mark label={`Bottle of ${title}`} />
          <ProductStageTag badge={wine.badge} left={wine.left} />
          {drinkWindow && <WineDrinkWindow {...drinkWindow} />}
        </>
      }
    />
  )
}
