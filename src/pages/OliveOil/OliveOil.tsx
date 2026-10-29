import { useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { OilGallery } from '../../components/oil/OilGallery'
import { ProductBuyRow } from '../../components/product/ProductBuyRow'
import { ProductClubNudge } from '../../components/product/ProductClubNudge'
import { ProductHeading } from '../../components/product/ProductHeading'
import { ProductHero } from '../../components/product/ProductHero'
import { ProductOptionPicker } from '../../components/product/ProductOptionPicker'
import { ProductPerks } from '../../components/product/ProductPerks'
import { ProductTags } from '../../components/product/ProductTags'
import { DEFAULT_OIL_SIZE, OIL_SIZES } from '../../constants'
import { euro } from '../../lib/euro'
import { getGrower } from '../../lib/growers'
import { getOil, oilPerks, oilPrice, oilSize, oilTags } from '../../lib/oil'
import { oilPath } from '../../lib/paths'
import { productPlace, productRegion } from '../../lib/productPlace'
import { getProductById } from '../../lib/products'
import { HOME_ROUTE, OLIVE_OILS_ROUTE } from '../../routes'
import { oilOption } from '../../state/cart/pricing'
import { useCart } from '../../state/cart/useCart'
import type { OilSize } from '../../types'
import NotFound from '../NotFound/NotFound'
import { OIL_TYPE_LABEL } from './constants'

export default function OliveOil() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const { add } = useCart()
  const [size, setSize] = useState<OilSize>(DEFAULT_OIL_SIZE)
  const oil = getOil(id)
  const product = getProductById(id)

  if (!product) return <NotFound />
  if (!oil || pathname !== oilPath(oil)) return <Navigate to={product.path} replace />

  const grower = getGrower(oil.growerId)

  return (
    <ProductHero
      crumbs={[{ label: 'Home', to: HOME_ROUTE }, { label: OIL_TYPE_LABEL, to: OLIVE_OILS_ROUTE }, { label: oil.name }]}
      gallery={<OilGallery oil={oil} size={size} where={productPlace(oil.region, grower)} />}
    >
      <ProductHeading
        meta={[OIL_TYPE_LABEL, productRegion(oil.region), oil.set ? oil.set.contents : oilSize(size).name]}
        title={oil.name}
        grower={grower}
      />
      <p className="lede">{oil.note}</p>
      <ProductTags tags={oilTags(oil)} />
      {!oil.set && (
        <ProductOptionPicker
          legend="Size"
          options={OIL_SIZES.map((z) => ({ id: z.id, name: z.name, info: euro(oilPrice(oil, z.id)) }))}
          value={size}
          onChange={setSize}
        />
      )}
      <ProductBuyRow unitPrice={oilPrice(oil, size)} onAdd={(qty) => add(oil.id, qty, oilOption(size))} />
      <ProductPerks perks={oilPerks(oil)} />
      <ProductClubNudge />
    </ProductHero>
  )
}
