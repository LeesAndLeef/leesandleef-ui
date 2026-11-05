import { ASSETS_BASE_URL } from '../constants'
import type { Article, Grower, RawOil } from '../types'

export const assetUrl = (path: string) => `${ASSETS_BASE_URL}${path}`

export const withGrowerAssets = (grower: Grower): Grower => ({
  ...grower,
  portrait: grower.portrait && assetUrl(grower.portrait),
  profile: grower.profile && {
    ...grower.profile,
    heroImg: assetUrl(grower.profile.heroImg),
    photos: grower.profile.photos.map((photo) => ({ ...photo, img: assetUrl(photo.img) })),
  },
})

export const withOilAssets = <T extends Pick<RawOil, 'detail'>>(oil: T): T => ({
  ...oil,
  detail: { ...oil.detail, grovePhoto: { ...oil.detail.grovePhoto, img: assetUrl(oil.detail.grovePhoto.img) } },
})

export const withArticleAssets = (article: Article): Article => ({
  ...article,
  img: assetUrl(article.img),
  authorImg: assetUrl(article.authorImg),
})
