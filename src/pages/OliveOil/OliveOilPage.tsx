import { Navigate, useLocation, useParams } from 'react-router-dom'
import { OilDetails } from '../../components/oil/OilDetails'
import { OilGallery } from '../../components/oil/OilGallery'
import { OilTraits } from '../../components/oil/OilTraits'
import { ProductBuyRow } from '../../components/product/ProductBuyRow'
import { ProductGrowerQuote } from '../../components/product/ProductGrowerQuote'
import { ProductHeading } from '../../components/product/ProductHeading'
import { ProductHero } from '../../components/product/ProductHero'
import { ProductOptionPicker } from '../../components/product/ProductOptionPicker'
import { ProductPerks } from '../../components/product/ProductPerks'
import { ProductTags } from '../../components/product/ProductTags'
import { RelatedProducts } from '../../components/product/RelatedProducts'
import { DEFAULT_OIL_SIZE } from '../../constants'
import { useKeyedState } from '../../hooks/useKeyedState'
import { oilOption } from '../../lib/cart'
import { getGrower } from '../../lib/growers'
import { getOil, oilKeeping, oilPrice, oilSizeOptions, oilTags } from '../../lib/oil'
import { oilPath } from '../../lib/paths'
import { productPlace } from '../../lib/productPlace'
import { getProductById } from '../../lib/products'
import { HOME_ROUTE, OLIVE_OILS_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import type { OilSize } from '../../types'
import NotFoundPage from '../NotFound/NotFoundPage'
import {
  OIL_ADDED_NOTE,
  OIL_GRADE_LABEL,
  OIL_LIST_ANCHOR,
  OIL_RELATED_LINK,
  OIL_TYPE_LABEL,
  SET_CRUMB_LABEL,
} from './constants'

export default function OliveOilPage() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const { add } = useCart()
  const [size, setSize] = useKeyedState<OilSize>(id ?? '', DEFAULT_OIL_SIZE)
  const oil = getOil(id)
  const product = getProductById(id)

  if (!product) return <NotFoundPage />
  if (!oil || pathname !== oilPath(oil)) return <Navigate to={product.path} replace />

  const { detail } = oil
  const grower = getGrower(oil.growerId)

  return (
    <>
      <ProductHero
        key={oil.id}
        crumbs={[
          { label: 'Home', to: HOME_ROUTE },
          { label: OIL_TYPE_LABEL, to: OLIVE_OILS_ROUTE },
          { label: oil.set ? SET_CRUMB_LABEL : oil.level, to: OIL_LIST_ANCHOR },
          { label: oil.name },
        ]}
        gallery={<OilGallery oil={oil} size={size} />}
      >
        <ProductHeading
          meta={[OIL_GRADE_LABEL, oil.origin, detail.style]}
          title={oil.name}
          grower={grower}
          producer={oil.growerName}
        />
        <p className="lede">{detail.story}</p>
        <ProductTags tags={oilTags(oil)} />
        <OilTraits oil={oil} />
        {!oil.set && (
          <ProductOptionPicker legend="Size" options={oilSizeOptions(oil)} value={size} onChange={setSize} />
        )}
        <ProductBuyRow
          unitPrice={oilPrice(oil, size)}
          addedNote={OIL_ADDED_NOTE}
          onAdd={(qty) => add(oil.id, qty, oilOption(size))}
        />
        <ProductPerks perks={oilKeeping(oil)} />
      </ProductHero>

      <OilDetails key={oil.id} oil={oil} />
      {detail.quote && grower && (
        <ProductGrowerQuote quote={detail.quote} grower={grower} where={productPlace(oil.region, grower)} />
      )}
      <RelatedProducts title="Compare with" link={OIL_RELATED_LINK} items={detail.related} />
    </>
  )
}
