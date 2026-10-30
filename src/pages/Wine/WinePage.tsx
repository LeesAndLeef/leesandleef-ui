import { useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { ProductBuyRow } from '../../components/product/ProductBuyRow'
import { ProductClubNudge } from '../../components/product/ProductClubNudge'
import { ProductGrowerQuote } from '../../components/product/ProductGrowerQuote'
import { ProductHeading } from '../../components/product/ProductHeading'
import { ProductHero } from '../../components/product/ProductHero'
import { ProductOptionPicker } from '../../components/product/ProductOptionPicker'
import { ProductPerks } from '../../components/product/ProductPerks'
import { ProductTags } from '../../components/product/ProductTags'
import { RelatedProducts } from '../../components/product/RelatedProducts'
import { WineDetails } from '../../components/wine/WineDetails'
import { WineGallery } from '../../components/wine/WineGallery'
import { DEFAULT_WINE_VOLUME } from '../../constants'
import { getGrower } from '../../lib/growers'
import { winePath } from '../../lib/paths'
import { productPlace, productRegion } from '../../lib/productPlace'
import { getProductById } from '../../lib/products'
import { getWine, vintagePrice, wineNameWithoutYear, wineTitle, wineTypePath } from '../../lib/wine'
import { HOME_ROUTE, WINES_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import NotFoundPage from '../NotFound/NotFoundPage'
import { WINE_ADDED_NOTE, WINE_PERKS, WINE_RELATED_LINK } from './constants'

export default function WinePage() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const { add } = useCart()
  const wine = getWine(id)
  const product = getProductById(id)
  const [vintage, setVintage] = useState(wine?.detail.defaultVintage)

  if (!product) return <NotFoundPage />
  if (!wine || pathname !== winePath(wine)) return <Navigate to={product.path} replace />

  const { detail } = wine
  const grower = getGrower(wine.growerId)
  const where = productPlace(wine.region, grower)
  const title = wineTitle(wine.name, vintage)

  return (
    <>
      <ProductHero
        crumbs={[
          { label: 'Home', to: HOME_ROUTE },
          { label: 'Wine', to: WINES_ROUTE },
          { label: wine.type, to: wineTypePath(wine.type) },
          { label: wineNameWithoutYear(wine.name) },
        ]}
        gallery={<WineGallery wine={wine} title={title} />}
      >
        <ProductHeading
          meta={[wine.type, productRegion(wine.region), wine.volume ?? DEFAULT_WINE_VOLUME, `${wine.abv} abv`]}
          title={title}
          grower={grower}
          producer={wine.growerName}
        />
        <p className="lede">{detail.story}</p>
        <ProductTags tags={detail.tags} />
        {detail.vintages && (
          <ProductOptionPicker
            legend="Vintage"
            options={detail.vintages.map((v) => ({ id: v.year, name: v.year, info: v.info }))}
            value={vintage}
            onChange={setVintage}
          />
        )}
        <ProductBuyRow
          unitPrice={vintagePrice(wine, vintage)}
          addedNote={WINE_ADDED_NOTE}
          onAdd={(qty) => add(wine.id, qty, vintage)}
        />
        <ProductPerks perks={WINE_PERKS} />
        <ProductClubNudge />
      </ProductHero>

      <WineDetails detail={detail} />
      {grower && <ProductGrowerQuote quote={detail.quote} grower={grower} where={where} />}
      <RelatedProducts title="If you like this" link={WINE_RELATED_LINK} items={detail.related} />
    </>
  )
}
